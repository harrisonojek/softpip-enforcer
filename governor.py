"""SoftPip The Enforcer — Risk Governor.

Pure, clock-injected, idempotent state machine governing trade dispatch
for Deriv Synthetic Index Options. Designed for $10 survival and $100+ scaling.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date, datetime, timedelta, timezone
from typing import Dict, List, Literal, Optional, Set, Tuple

LADDER_STEPS_USD: Tuple[float, ...] = (0.35, 0.46, 0.59, 0.77, 1.00)
assert round(sum(LADDER_STEPS_USD), 2) == 3.17, "Explicit 5-step ladder must sum to $3.17"


def _ensure_utc(dt: datetime) -> datetime:
    if dt.tzinfo is None:
        return dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc)


@dataclass
class GovernorConfig:
    """Risk configuration mirroring softpip-site/lib/governor-spec.ts."""

    base_stake_usd: float = 0.35
    sizing_mode: Literal["fixed", "percent"] = "fixed"
    stake_pct_of_equity: float = 0.01
    multiplier: float = 1.3
    max_ladder_steps: int = 5
    ladder_steps_usd: Tuple[float, ...] = LADDER_STEPS_USD
    max_consecutive_losses: int = 3
    cool_off_seconds: int = 900
    reset_ladder_on_cooloff: bool = True
    daily_loss_limit_pct_of_equity: float = 0.10
    daily_loss_limit_floor_usd: float = 2.00
    max_drawdown_pct_of_peak: float = 0.20
    balance_floor_usd: float = 2.00
    max_session_trades: int = 40
    session_timeout_seconds: int = 3600

    @property
    def ladder_total_risk(self) -> float:
        """Total risk before cool-off fires (3-step burst = $1.40 by default)."""
        n = min(self.max_consecutive_losses, self.max_ladder_steps, len(self.ladder_steps_usd))
        if (
            self.base_stake_usd == 0.35
            and self.multiplier == 1.3
            and tuple(self.ladder_steps_usd) == LADDER_STEPS_USD
        ):
            return round(sum(self.ladder_steps_usd[:n]), 2)
        total = 0.0
        for step in range(n):
            total += round(self.base_stake_usd * (self.multiplier ** step), 2)
        return round(total, 2)

    @property
    def ladder_total_risk_usd(self) -> float:
        """Full 5-step ladder total risk ($3.17)."""
        return round(sum(self.ladder_steps_usd[: self.max_ladder_steps]), 2)

    def validate(self) -> None:
        """Validate configuration invariants; raise ValueError on unsafe values."""
        if self.multiplier <= 1.0:
            raise ValueError(f"multiplier must be > 1.0, got {self.multiplier}")
        if self.max_ladder_steps < 1:
            raise ValueError(f"max_ladder_steps must be >= 1, got {self.max_ladder_steps}")
        if self.base_stake_usd < 0.35:
            raise ValueError(f"base_stake_usd must be >= 0.35, got {self.base_stake_usd}")
        if self.daily_loss_limit_floor_usd <= self.ladder_total_risk:
            raise ValueError(
                f"daily_loss_limit_floor_usd ({self.daily_loss_limit_floor_usd:.2f}) must be > "
                f"pre-cooloff ladder_total_risk ({self.ladder_total_risk:.2f}) so cool-off remains reachable"
            )
        if self.cool_off_seconds < 60:
            raise ValueError(f"cool_off_seconds must be >= 60, got {self.cool_off_seconds}")
        if self.sizing_mode not in ("fixed", "percent"):
            raise ValueError(f"sizing_mode must be 'fixed' or 'percent', got {self.sizing_mode}")
        if not (0.0 < self.stake_pct_of_equity < 1.0):
            raise ValueError(f"stake_pct_of_equity must be in (0, 1), got {self.stake_pct_of_equity}")
        if self.balance_floor_usd < 0.0:
            raise ValueError(f"balance_floor_usd must be >= 0.0, got {self.balance_floor_usd}")
        if self.max_session_trades < 1:
            raise ValueError(f"max_session_trades must be >= 1, got {self.max_session_trades}")
        if self.session_timeout_seconds < 60:
            raise ValueError(f"session_timeout_seconds must be >= 60, got {self.session_timeout_seconds}")

    def __post_init__(self) -> None:
        self.validate()


class RiskGovernor:
    """Clock-injected, idempotent execution governor for Deriv Synthetic Options."""

    EVALUATION_ORDER: Tuple[str, ...] = (
        "SESSION_EXPIRED",
        "COOL_OFF_ACTIVE",
        "TRADE_CAP_REACHED",
        "DAILY_LOSS_LIMIT",
        "BALANCE_FLOOR_BREACH",
        "DRAWDOWN_STOP",
        "INSUFFICIENT_MARGIN",
        "INSUFFICIENT_BALANCE",
    )

    def __init__(
        self,
        config: Optional[GovernorConfig] = None,
        start_time: Optional[datetime] = None,
        seen_contract_ids: Optional[Set[str]] = None,
    ) -> None:
        self.config = config or GovernorConfig()
        self.config.validate()

        self.session_start: Optional[datetime] = (
            _ensure_utc(start_time) if start_time is not None else None
        )
        self.last_trade_date: Optional[date] = (
            self.session_start.date() if self.session_start is not None else None
        )

        self.session_trades: int = 0
        self.daily_pnl: float = 0.0
        self.current_step: int = 1
        self.consecutive_losses: int = 0
        self.cool_off_until: Optional[datetime] = None
        self.peak_balance: float = 0.0
        self.recorded_contract_ids: Set[str] = set(seen_contract_ids or ())

    def _rollover_day_if_needed(self, now_utc: datetime) -> None:
        """Reset daily P&L, cool-off, consecutive losses, and ladder at 00:00 UTC."""
        current_date = now_utc.date()
        if self.last_trade_date is None:
            self.last_trade_date = current_date
            return
        if current_date != self.last_trade_date:
            self.daily_pnl = 0.0
            self.cool_off_until = None
            self.consecutive_losses = 0
            self.current_step = 1
            self.last_trade_date = current_date

    def compute_stake(self, balance: float) -> float:
        """Compute contract stake respecting fixed or percent sizing and ladder step."""
        if self.config.sizing_mode == "percent":
            cap = round(self.config.daily_loss_limit_floor_usd * 2.0, 2)
            base = max(self.config.base_stake_usd, balance * self.config.stake_pct_of_equity)
            base = round(min(base, cap), 2)
            raw = base * (self.config.multiplier ** (self.current_step - 1))
            return round(min(raw, cap), 2)

        # Fixed mode uses explicit rounded table when using canonical 0.35 / 1.3x / 5-step defaults
        if (
            self.config.base_stake_usd == 0.35
            and self.config.multiplier == 1.3
            and 1 <= self.current_step <= len(self.config.ladder_steps_usd)
        ):
            return self.config.ladder_steps_usd[self.current_step - 1]

        raw = self.config.base_stake_usd * (self.config.multiplier ** (self.current_step - 1))
        return round(raw, 2)

    def can_trade(self, balance: float, now: datetime) -> Tuple[Optional[str], float]:
        """Evaluate all constraints in strict order. Returns (reason_code, stake)."""
        now_utc = _ensure_utc(now)
        if self.session_start is None:
            self.session_start = now_utc

        self._rollover_day_if_needed(now_utc)

        if self.peak_balance == 0.0 or balance > self.peak_balance:
            self.peak_balance = balance

        # 1. SESSION_EXPIRED
        elapsed = (now_utc - self.session_start).total_seconds()
        if elapsed >= self.config.session_timeout_seconds:
            return ("SESSION_EXPIRED", 0.0)

        # 2. COOL_OFF_ACTIVE (with expiry handling)
        if self.cool_off_until is not None:
            if now_utc < self.cool_off_until:
                return ("COOL_OFF_ACTIVE", 0.0)
            # Cool-off expired
            self.cool_off_until = None
            self.consecutive_losses = 0
            if self.config.reset_ladder_on_cooloff:
                self.current_step = 1

        # 3. TRADE_CAP_REACHED
        if self.session_trades >= self.config.max_session_trades:
            return ("TRADE_CAP_REACHED", 0.0)

        # 4. DAILY_LOSS_LIMIT
        daily_cap = max(
            self.config.daily_loss_limit_floor_usd,
            self.peak_balance * self.config.daily_loss_limit_pct_of_equity,
        )
        if self.daily_pnl <= -daily_cap + 1e-9:
            return ("DAILY_LOSS_LIMIT", 0.0)

        # 5. BALANCE_FLOOR_BREACH
        if balance <= self.config.balance_floor_usd + 1e-9:
            return ("BALANCE_FLOOR_BREACH", 0.0)

        # 6. DRAWDOWN_STOP
        if self.peak_balance > 0.0:
            drawdown_pct = (self.peak_balance - balance) / self.peak_balance
            if drawdown_pct >= self.config.max_drawdown_pct_of_peak - 1e-9:
                return ("DRAWDOWN_STOP", 0.0)

        stake = self.compute_stake(balance)

        # 7. INSUFFICIENT_MARGIN (trade allowed only if post-stake balance >= balance_floor_usd)
        if balance >= stake - 1e-9 and (balance - stake) < self.config.balance_floor_usd - 1e-9:
            return ("INSUFFICIENT_MARGIN", 0.0)

        # 8. INSUFFICIENT_BALANCE
        if balance < stake - 1e-9:
            return ("INSUFFICIENT_BALANCE", 0.0)

        return (None, stake)

    def record(self, contract_id: str, stake: float, profit: float, now: datetime) -> bool:
        """Record settled contract outcome idempotently. Returns False if duplicate ID."""
        if contract_id in self.recorded_contract_ids:
            return False

        now_utc = _ensure_utc(now)
        if self.session_start is None:
            self.session_start = now_utc

        self._rollover_day_if_needed(now_utc)
        self.recorded_contract_ids.add(contract_id)

        self.session_trades += 1
        self.daily_pnl = round(self.daily_pnl + profit, 4)

        if profit < 0:
            self.consecutive_losses += 1
            if self.current_step < self.config.max_ladder_steps:
                self.current_step += 1
            else:
                self.current_step = 1

            if self.consecutive_losses >= self.config.max_consecutive_losses:
                self.cool_off_until = now_utc + timedelta(seconds=self.config.cool_off_seconds)
        else:
            self.consecutive_losses = 0
            self.current_step = 1

        return True


def _run_self_test_trace() -> None:
    """Execute self-test printing the full evaluation-order trace."""
    t0 = datetime(2026, 11, 16, 10, 0, 0, tzinfo=timezone.utc)
    cfg = GovernorConfig()
    gov = RiskGovernor(cfg, start_time=t0)
    balance = 10.00
    trace: List[Dict[str, object]] = []

    print("=== SoftPip Enforcer — Evaluation Order Self-Test ===")
    print(f"Ladder: {cfg.ladder_steps_usd} (sum=${cfg.ladder_total_risk_usd:.2f})")
    print(f"Pre-cooloff 3-step risk: ${cfg.ladder_total_risk:.2f} < Daily Cap Floor: ${cfg.daily_loss_limit_floor_usd:.2f}")
    print(f"Evaluation Order: {' -> '.join(gov.EVALUATION_ORDER)}\n")

    for i in range(1, 5):
        ts = t0 + timedelta(minutes=i)
        reason, stake = gov.can_trade(balance, ts)
        print(f"[Attempt {i}] t=+{i}m balance=${balance:.2f} -> reason={reason} stake=${stake:.2f}")
        trace.append({"attempt": i, "reason": reason, "stake": stake, "balance": balance})
        if reason is None:
            cid = f"C_{i}"
            gov.record(cid, stake, -stake, ts)
            balance = round(balance - stake, 2)
            # Verify duplicate idempotency
            dup = gov.record(cid, stake, -stake, ts)
            assert dup is False, "Duplicate contract_id must be a no-op"

    # Attempt 4 MUST be COOL_OFF_ACTIVE (not DAILY_LOSS_LIMIT)
    assert trace[-1]["reason"] == "COOL_OFF_ACTIVE", f"Expected COOL_OFF_ACTIVE, got {trace[-1]['reason']}"

    # Advance past cool-off and verify reset_ladder_on_cooloff returns stake to $0.35
    after_cooloff = t0 + timedelta(seconds=cfg.cool_off_seconds + 250)
    reason_resume, stake_resume = gov.can_trade(balance, after_cooloff)
    print(f"[Resume] t=+{cfg.cool_off_seconds + 250}s balance=${balance:.2f} -> reason={reason_resume} stake=${stake_resume:.2f}")
    assert reason_resume is None and stake_resume == 0.35, "Expected resume at $0.35 base stake"

    # UTC rollover trace
    next_day = datetime(2026, 11, 17, 0, 5, 0, tzinfo=timezone.utc)
    gov2 = RiskGovernor(cfg, start_time=next_day)
    r_exp, _ = gov2.can_trade(10.0, next_day + timedelta(seconds=3601))
    print(f"[Timer Check] +3601s -> {r_exp}")
    assert r_exp == "SESSION_EXPIRED"

    print("\nALL SELF-TEST CHECKS PASSED: 3 losses triggered COOL_OFF_ACTIVE cleanly.")


if __name__ == "__main__":
    _run_self_test_trace()
