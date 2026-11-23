"""SoftPip The Enforcer — Risk Governor.

Automated risk enforcement container for Deriv Synthetic Index Options.
Guarantees mechanical adherence to sizing limits, loss ladders, and circuit breakers.
"""

from __future__ import annotations

import math
from dataclasses import dataclass
from datetime import date, datetime, timezone
from typing import Optional, Tuple


@dataclass
class GovernorConfig:
    """Dataclass holding all nine process-level risk controls."""

    base_stake: float = 0.35  # Deriv minimum stake floor for synthetic options
    multiplier: float = 1.3  # Controlled loss progression multiplier
    max_ladder_steps: int = 5  # Max ladder progression steps before capping
    max_consecutive_losses: int = 3  # Consecutive loss ceiling before cool-off
    cool_off_seconds: int = 900  # 15-minute socket disconnect cooling duration
    daily_loss_limit: float = 1.00  # Absolute daily loss ceiling ($1.00 on $10)
    balance_floor: float = 9.00  # Minimum account balance preservation floor
    session_timeout_seconds: int = 3600  # 60-minute hard session kill switch
    max_session_trades: int = 20  # Max contract executions per session
    max_drawdown: float = 1.00  # Peak-to-trough drawdown threshold


class RiskGovernor:
    """Stateful risk execution governor.

    Enforces all process-level risk controls before any order is submitted to
    the Deriv WebSocket API.
    """

    def __init__(self, config: Optional[GovernorConfig] = None) -> None:
        self.config = config or GovernorConfig()
        self.session_start: datetime = datetime.now(timezone.utc)
        self.last_trade_date: date = self.session_start.date()

        self.session_trades: int = 0
        self.daily_pnl: float = 0.0
        self.current_step: int = 1
        self.consecutive_losses: int = 0
        self.cool_off_until: Optional[datetime] = None
        self.peak_balance: float = 0.0

    def _rollover_day_if_needed(self) -> None:
        """Roll over daily metrics when the UTC calendar date advances."""
        now_date = datetime.now(timezone.utc).date()
        if now_date != self.last_trade_date:
            self.daily_pnl = 0.0
            self.last_trade_date = now_date

    def get_current_stake(self) -> float:
        """Compute stake from ladder progression step, rounded and capped."""
        # Predefined 1.3x steps for base 0.35: 0.35, 0.46, 0.59, 0.77, 1.00 (Total = $3.17)
        if (
            self.config.base_stake == 0.35
            and self.config.multiplier == 1.3
            and 1 <= self.current_step <= 5
        ):
            ladder = [0.35, 0.46, 0.59, 0.77, 1.00]
            return ladder[self.current_step - 1]
        raw = self.config.base_stake * (self.config.multiplier ** (self.current_step - 1))
        return round(raw, 2)

    def can_trade(self, balance: float) -> Tuple[Optional[str], float]:
        """Evaluate trading eligibility across all risk constraints in strict order.

        Order of evaluation:
        1. session timer
        2. cool-off
        3. trade cap
        4. daily loss cap
        5. balance floor
        6. drawdown stop
        7. stake affordability

        Returns:
            Tuple[Optional[str], float]: (halt_reason, stake)
            If trading is permitted, halt_reason is None and stake is > 0.
            If halted, halt_reason explains the circuit breaker and stake is 0.0.
        """
        self._rollover_day_if_needed()
        now = datetime.now(timezone.utc)

        # Initialize peak balance tracking
        if self.peak_balance == 0.0 or balance > self.peak_balance:
            self.peak_balance = balance

        # 1. Session timer
        elapsed = (now - self.session_start).total_seconds()
        if elapsed >= self.config.session_timeout_seconds:
            return (
                f"SESSION_EXPIRED: elapsed {elapsed:.0f}s >= {self.config.session_timeout_seconds}s limit",
                0.0,
            )

        # 2. Cool-off
        if self.cool_off_until is not None:
            if now < self.cool_off_until:
                remaining = (self.cool_off_until - now).total_seconds()
                return (
                    f"COOL_OFF_ACTIVE: cooling off for {remaining:.0f}s after consecutive losses",
                    0.0,
                )
            else:
                self.cool_off_until = None

        # 3. Trade cap
        if self.session_trades >= self.config.max_session_trades:
            return (
                f"TRADE_CAP_REACHED: {self.session_trades} trades executed >= {self.config.max_session_trades} limit",
                0.0,
            )

        # 4. Daily loss cap
        if self.daily_pnl <= -abs(self.config.daily_loss_limit):
            return (
                f"DAILY_LOSS_LIMIT: daily PnL ${self.daily_pnl:.2f} <= -${self.config.daily_loss_limit:.2f}",
                0.0,
            )

        # 5. Balance floor
        if balance < self.config.balance_floor:
            return (
                f"BALANCE_FLOOR_BREACH: balance ${balance:.2f} < ${self.config.balance_floor:.2f} floor",
                0.0,
            )

        # 6. Drawdown stop
        drawdown = self.peak_balance - balance
        if drawdown >= self.config.max_drawdown:
            return (
                f"DRAWDOWN_STOP: peak-to-trough drawdown ${drawdown:.2f} >= ${self.config.max_drawdown:.2f}",
                0.0,
            )

        # 7. Stake affordability
        proposed_stake = self.get_current_stake()
        if (balance - proposed_stake) < self.config.balance_floor:
            return (
                f"INSUFFICIENT_MARGIN: balance ${balance:.2f} minus stake ${proposed_stake:.2f} breaches floor ${self.config.balance_floor:.2f}",
                0.0,
            )

        if proposed_stake > balance:
            return (
                f"INSUFFICIENT_BALANCE: stake ${proposed_stake:.2f} exceeds total balance ${balance:.2f}",
                0.0,
            )

        return (None, proposed_stake)

    def record(self, stake: float, profit: float) -> None:
        """Record trade execution outcome and advance or reset internal state.

        On win (profit > 0):
        - Reset ladder step to 1
        - Reset consecutive losses to 0

        On loss (profit <= 0):
        - Advance ladder step up to max_ladder_steps (capped at 5)
        - Increment consecutive losses
        - Trigger cool-off if consecutive losses reach threshold (3)

        Always:
        - Increment session trades
        - Accumulate daily P&L
        """
        self._rollover_day_if_needed()
        self.session_trades += 1
        self.daily_pnl += profit

        if profit > 0:
            # Win: reset ladder and loss count
            self.current_step = 1
            self.consecutive_losses = 0
        else:
            # Loss: advance ladder capped at max_ladder_steps
            if self.current_step < self.config.max_ladder_steps:
                self.current_step += 1
            self.consecutive_losses += 1

            if self.consecutive_losses >= self.config.max_consecutive_losses:
                now = datetime.now(timezone.utc)
                from datetime import timedelta

                self.cool_off_until = now + timedelta(seconds=self.config.cool_off_seconds)
                self.consecutive_losses = 0


if __name__ == "__main__":
    # Self-test demonstration of governor mechanics
    governor = RiskGovernor()
    print("SoftPip Enforcer Risk Governor initialized.")
    status, stake = governor.can_trade(balance=10.00)
    print(f"Can trade: {status is None}, Stake: ${stake:.2f}")

    # Simulate 3 consecutive losses
    for i in range(1, 4):
        stk = governor.get_current_stake()
        print(f"Trade {i}: Step={governor.current_step}, Stake=${stk:.2f}")
        governor.record(stake=stk, profit=-stk)

    status, stake = governor.can_trade(balance=8.50)
    print(f"Post-loss check: Status={status}, Stake=${stake:.2f}")
