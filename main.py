"""
SoftPip The Enforcer — Main Execution Supervisor
Command-line entrypoint with dry-run mode, 200-trade demo graduation enforcement,
scope verification, reconciliation, and fail-closed risk governance.
"""

from __future__ import annotations

import argparse
import asyncio
import logging
import os
import signal
import sys
from datetime import datetime, timezone
from typing import Any, Dict, Optional

import yaml

from deriv.client import DerivClient, ScopeViolationError, mask_token
from deriv.reconcile import Reconciler
from governor import GovernorConfig, RiskGovernor
from journal import Journal
from telegram.bot import TelegramBot
from watchdog import Watchdog

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("softpip.enforcer")


def load_config(config_path: str) -> Dict[str, Any]:
    """Load and validate configuration YAML."""
    if not os.path.exists(config_path):
        fallback = "config.example.yaml"
        if os.path.exists(fallback):
            logger.warning(f"Config '{config_path}' not found. Falling back to template '{fallback}'.")
            config_path = fallback
        else:
            raise FileNotFoundError(f"Configuration file not found: {config_path}")

    with open(config_path, "r", encoding="utf-8") as f:
        cfg = yaml.safe_load(f)
    return cfg or {}


class EnforcerSupervisor:
    """Production supervisor orchestrating Deriv execution and Governor gates."""

    def __init__(self, config: Dict[str, Any], is_dry_run: bool = False) -> None:
        self.config = config
        self.is_dry_run = is_dry_run
        self.running = False
        self.paused = False

        risk_cfg_data = config.get("risk", {})
        self.gov_config = GovernorConfig(
            base_stake_usd=float(risk_cfg_data.get("base_stake", 0.35)),
            sizing_mode=risk_cfg_data.get("sizing_mode", "fixed"),
            stake_pct_of_equity=float(risk_cfg_data.get("stake_pct_of_equity", 0.01)),
            multiplier=float(risk_cfg_data.get("multiplier", 1.3)),
            max_ladder_steps=int(risk_cfg_data.get("max_ladder_steps", 5)),
            max_consecutive_losses=int(risk_cfg_data.get("max_consecutive_losses", 2)),
            cool_off_seconds=int(risk_cfg_data.get("cool_off_seconds", 900)),
            reset_ladder_on_cooloff=bool(risk_cfg_data.get("reset_ladder_on_cooloff", True)),
            daily_loss_limit_floor_usd=float(risk_cfg_data.get("daily_loss_limit_floor", 1.00)),
            daily_loss_limit_pct_of_equity=float(risk_cfg_data.get("daily_loss_limit_pct", 0.10)),
            max_drawdown_pct_of_peak=float(risk_cfg_data.get("max_drawdown_pct", 0.20)),
            balance_floor_usd=float(risk_cfg_data.get("balance_floor", 2.00)),
            max_session_trades=int(risk_cfg_data.get("max_session_trades", 40)),
            session_timeout_seconds=int(risk_cfg_data.get("session_timeout_seconds", 3600)),
        )
        self.governor = RiskGovernor(self.gov_config)

        journal_cfg = config.get("journal", {})
        db_path = journal_cfg.get("db_path", "journal.db")
        self.journal = Journal(db_path=db_path)

        deriv_cfg = config.get("deriv", {})
        self.app_id = int(deriv_cfg.get("app_id", 1089))
        self.api_token = os.environ.get("DERIV_API_TOKEN", deriv_cfg.get("api_token", ""))
        self.endpoint = deriv_cfg.get("endpoint", "wss://ws.derivws.com/websockets/v3")

        self.client = DerivClient(app_id=self.app_id, endpoint=self.endpoint)
        self.reconciler = Reconciler(self.client, self.journal)

        tg_token = os.environ.get("TELEGRAM_BOT_TOKEN", journal_cfg.get("telegram_bot_token", ""))
        tg_chat = os.environ.get("TELEGRAM_CHAT_ID", journal_cfg.get("telegram_chat_id", ""))
        tg_enabled = bool(journal_cfg.get("telegram_alerts", False)) and bool(tg_token and tg_chat)

        self.telegram = TelegramBot(bot_token=tg_token, chat_id=tg_chat, enabled=tg_enabled)
        self._register_telegram_commands()

        self.watchdog = Watchdog(
            max_stall_seconds=30.0,
            on_stall_callback=self._on_watchdog_stall,
        )

        self.session_id: Optional[str] = None
        self.current_balance: float = 10.0

    def _register_telegram_commands(self) -> None:
        self.telegram.register_command("start", self._cmd_start)
        self.telegram.register_command("stop", self._cmd_stop)
        self.telegram.register_command("pause", self._cmd_pause)
        self.telegram.register_command("status", self._cmd_status)
        self.telegram.register_command("stats", self._cmd_stats)
        self.telegram.register_command("ladder", self._cmd_ladder)
        self.telegram.register_command("export", self._cmd_export)

    def _cmd_start(self) -> str:
        self.paused = False
        return "▶️ SoftPip trading execution resumed."

    def _cmd_stop(self) -> str:
        self.running = False
        return "🛑 SoftPip trading stopped by operator."

    def _cmd_pause(self) -> str:
        self.paused = True
        return "⏸️ SoftPip trading paused."

    def _cmd_status(self) -> str:
        now = datetime.now(timezone.utc)
        reason, stake = self.governor.can_trade(self.current_balance, now)
        status_txt = f"HALTED ({reason})" if reason else "ACTIVE (Ready to trade)"
        return (
            f"📊 *SoftPip Enforcer Status:*\n"
            f"State: {status_txt}\n"
            f"Balance: ${self.current_balance:.2f}\n"
            f"Peak Balance: ${self.governor.peak_balance:.2f}\n"
            f"Session Trades: {self.governor.session_trades}/{self.gov_config.max_session_trades}\n"
            f"Current Ladder Step: {self.governor.current_step}/{self.gov_config.max_ladder_steps}\n"
            f"Next Stake: ${stake:.2f}\n"
            f"Mode: {'DRY RUN' if self.is_dry_run else 'LIVE'}"
        )

    def _cmd_stats(self) -> str:
        s = self.journal.get_summary_stats()
        return (
            f"📈 *Lifetime Execution Stats:*\n"
            f"Total Trades: {s['total_trades']}\n"
            f"Wins: {s['wins']} | Losses: {s['losses']}\n"
            f"Win Rate: {s['win_rate_pct']}%\n"
            f"Net P&L: ${s['net_profit_usd']:.2f}\n"
            f"Volume: ${s['total_volume_usd']:.2f}"
        )

    def _cmd_ladder(self) -> str:
        steps = ", ".join(f"${s:.2f}" for s in self.gov_config.ladder_steps_usd)
        return (
            f"🪜 *Recovery Ladder:*\n"
            f"Steps: [{steps}]\n"
            f"Current Step: {self.governor.current_step}\n"
            f"Consecutive Losses: {self.governor.consecutive_losses}/3\n"
            f"Reset on Cool-off: {self.gov_config.reset_ladder_on_cooloff}"
        )

    def _cmd_export(self) -> str:
        export_path = "journal_export.csv"
        self.journal.export_csv(export_path)
        return f"📁 Journal exported to `{export_path}`."

    def _on_watchdog_stall(self, msg: str) -> None:
        logger.critical(f"Watchdog trigger: {msg}")
        self.telegram.send_alert("Watchdog Stall", msg)
        self.running = False

    async def verify_demo_graduation(self) -> None:
        """Enforce 200 clean demo trades graduation gate before live execution."""
        clean_trades = self.journal.count_clean_demo_trades()
        if clean_trades < 200:
            err_msg = (
                f"LIVE TRADING BLOCKED BY GOVERNOR GATE:\n"
                f"You have completed {clean_trades}/200 clean demo trades in journal.\n"
                f"SoftPip The Enforcer strictly enforces a 200-trade demo graduation requirement "
                f"to prove rule discipline before risking live capital.\n"
                f"Run in demo mode or dry-run until 200 trades are logged."
            )
            logger.critical(err_msg)
            self.telegram.send_alert("Live Trading Blocked", err_msg)
            raise PermissionError(err_msg)
        logger.info(f"Demo graduation requirement met ({clean_trades}/200 clean demo trades recorded).")

    async def start(self) -> None:
        """Main startup sequence."""
        logger.info("==================================================")
        logger.info(" SoftPip The Enforcer — Autonomous Risk Governor  ")
        logger.info(f" Mode: {'DRY RUN (Simulation)' if self.is_dry_run else 'LIVE EXECUTION'} ")
        logger.info("==================================================")

        now = datetime.now(timezone.utc)
        self.session_id = f"sess_{int(now.timestamp())}"

        if not self.is_dry_run:
            # Enforce graduation gate
            await self.verify_demo_graduation()

            if not self.api_token or self.api_token == "YOUR_DERIV_API_TOKEN":
                raise ValueError("Deriv API token not set. Configure config.yaml or DERIV_API_TOKEN.")

            # Connect and authorize
            await self.client.connect()
            auth = await self.client.authorize(self.api_token)
            self.current_balance = float(auth.get("balance", 0.0))

            if self.current_balance < 10.0:
                logger.warning(
                    f"Account balance ${self.current_balance:.2f} is below $10.00 recommended threshold."
                )

            # Reconcile portfolio before starting session
            is_clear, block_reason = await self.reconciler.reconcile_before_dispatch()
            if not is_clear:
                raise RuntimeError(f"Startup aborted due to open contracts: {block_reason}")
        else:
            self.current_balance = 10.0
            logger.info("Dry-run mode: Simulating market environment ($10.00 start balance).")

        self.journal.start_session(self.session_id, self.current_balance, ts=now)
        await self.telegram.start_polling()
        await self.watchdog.start()

        self.running = True
        logger.info(f"Session {self.session_id} initialized successfully.")

    async def run_loop(self) -> None:
        """Main evaluation and dispatch loop."""
        contract_cfg = self.config.get("contract", {})
        symbol = contract_cfg.get("symbol", "R_10")
        contract_type = contract_cfg.get("contract_type", "CALL")
        duration = int(contract_cfg.get("duration", 5))
        duration_unit = contract_cfg.get("duration_unit", "t")
        currency = contract_cfg.get("currency", "USD")

        trade_seq = 0

        try:
            while self.running:
                self.watchdog.touch()
                await asyncio.sleep(2.0)

                if self.paused:
                    continue

                now = datetime.now(timezone.utc)

                # 1. Evaluate Governor Gate
                reason, stake = self.governor.can_trade(self.current_balance, now)
                if reason is not None:
                    self.journal.record_halt(
                        reason=reason,
                        balance=self.current_balance,
                        session_id=self.session_id,
                        details=f"Governor halted trade dispatch: {reason}",
                        ts=now,
                    )
                    if reason in ("DAILY_LOSS_LIMIT", "DRAWDOWN_STOP", "BALANCE_FLOOR_BREACH", "SESSION_EXPIRED"):
                        logger.warning(f"Governor hard-stop triggered ({reason}). Ending session.")
                        break
                    elif reason == "COOL_OFF_ACTIVE":
                        logger.info(f"Cool-off active ({reason}). Waiting 15s before next check...")
                        await asyncio.sleep(15.0)
                        continue

                # 2. Reconcile Open Contracts
                if not self.is_dry_run:
                    is_clear, block_msg = await self.reconciler.reconcile_before_dispatch()
                    if not is_clear:
                        logger.warning(f"Reconciliation blocked dispatch: {block_msg}")
                        await asyncio.sleep(5.0)
                        continue

                # 3. Dry-Run Execution Simulation
                if self.is_dry_run:
                    trade_seq += 1
                    cid = f"DRY_{int(now.timestamp())}_{trade_seq}"
                    logger.info(
                        f"[DRY-RUN] Simulating trade #{trade_seq}: {symbol} {contract_type} stake=${stake:.2f}"
                    )

                    # Simulate 54% win rate
                    import random
                    win = random.random() < 0.54
                    profit = round(stake * 0.95, 2) if win else round(-stake, 2)
                    self.current_balance = round(self.current_balance + profit, 2)

                    self.governor.record(cid, stake, profit, now=now)
                    self.journal.record_trade(
                        contract_id=cid,
                        session_id=self.session_id or "dry_run",
                        stake=stake,
                        profit=profit,
                        balance_after=self.current_balance,
                        ts=now,
                        symbol=symbol,
                        contract_type=contract_type,
                        is_demo=True,
                    )
                    logger.info(
                        f"[DRY-RUN] Settle #{trade_seq}: {'WIN' if win else 'LOSS'} profit=${profit:.2f} "
                        f"balance=${self.current_balance:.2f} (Ladder step={self.governor.current_step})"
                    )
                    await asyncio.sleep(3.0)

                    # In dry run mode, demonstrate 5 clean cycles then pause or prompt
                    if trade_seq >= 5 and self.is_dry_run:
                        logger.info("Dry-run demonstration of 5 trades completed successfully.")
                        break
                else:
                    # LIVE ORDER DISPATCH
                    # Fetch fresh proposal
                    proposal = await self.client.get_proposal(
                        symbol=symbol,
                        contract_type=contract_type,
                        amount=stake,
                        duration=duration,
                        duration_unit=duration_unit,
                        currency=currency,
                    )
                    proposal_id = proposal.get("id")
                    ask_price = float(proposal.get("ask_price", stake))

                    # Re-verify governor immediately before dispatch with fresh balance
                    fresh_balance = await self.client.get_balance()
                    self.current_balance = fresh_balance
                    recheck_reason, _ = self.governor.can_trade(fresh_balance, now)
                    if recheck_reason is not None:
                        logger.warning(f"Last-millisecond governor check blocked order: {recheck_reason}")
                        continue

                    # Execute purchase
                    buy_resp = await self.client.buy(proposal_id, ask_price)
                    contract_id = buy_resp.get("contract_id")
                    logger.info(f"Order dispatched: contract_id={contract_id}, stake=${ask_price:.2f}")

                    # Await settlement
                    settle = await self.reconciler.wait_for_settlement(contract_id)
                    profit = float(settle.get("profit", 0.0))

                    # Update governor & journal idempotently
                    self.governor.record(contract_id, ask_price, profit, now=datetime.now(timezone.utc))
                    fresh_balance = await self.client.get_balance()
                    self.current_balance = fresh_balance

                    self.journal.record_trade(
                        contract_id=str(contract_id),
                        session_id=self.session_id or "live",
                        stake=ask_price,
                        profit=profit,
                        balance_after=self.current_balance,
                        symbol=symbol,
                        contract_type=contract_type,
                        is_demo=self.client.account_info.get("is_virtual", True),
                    )

        finally:
            await self.shutdown()

    async def shutdown(self) -> None:
        """Orderly shutdown of supervisor."""
        logger.info("Shutting down Enforcer Supervisor...")
        self.running = False
        await self.watchdog.stop()
        await self.telegram.stop()
        if not self.is_dry_run:
            await self.client.disconnect()

        now = datetime.now(timezone.utc)
        if self.session_id:
            self.journal.end_session(self.session_id, self.current_balance, "SESSION_TERMINATED", ts=now)

        logger.info("Enforcer shutdown complete.")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="SoftPip The Enforcer — Autonomous Risk Governor for Deriv Options"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Run in local simulation mode without real Deriv orders",
    )
    parser.add_argument(
        "--live",
        action="store_true",
        help="Run in live trading mode (enforces 200 demo trade graduation gate)",
    )
    parser.add_argument(
        "--config",
        default="config.yaml",
        help="Path to YAML configuration file (default: config.yaml)",
    )
    return parser.parse_args()


async def main() -> None:
    args = parse_args()
    config = load_config(args.config)
    is_dry = args.dry_run or (not args.live)

    supervisor = EnforcerSupervisor(config=config, is_dry_run=is_dry)

    # Setup signal handlers where supported
    loop = asyncio.get_running_loop()
    for sig in (signal.SIGINT, signal.SIGTERM):
        try:
            loop.add_signal_handler(sig, lambda: asyncio.create_task(supervisor.shutdown()))
        except NotImplementedError:
            # Windows compatibility for signal handlers
            pass

    try:
        await supervisor.start()
        await supervisor.run_loop()
    except Exception as e:
        logger.critical(f"Fatal error in supervisor: {e}", exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
