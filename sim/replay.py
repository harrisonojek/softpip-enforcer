"""
SoftPip The Enforcer — Deterministic Simulation & Replay Engine
Generates 10,000 reproducible V75 ticks and replays them through the Risk Governor and Journal.
"""

from __future__ import annotations

import csv
import math
import os
import random
import sys
from datetime import datetime, timedelta, timezone
from typing import List, Optional, Tuple

# Ensure project root is in sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from governor import GovernorConfig, RiskGovernor
from journal import Journal


def generate_v75_ticks(
    count: int = 10000,
    start_price: float = 500000.0,
    seed: int = 42,
    output_path: str = "sim/fixtures/ticks_v75.csv",
) -> List[Tuple[str, int, str, float]]:
    """Generate deterministic synthetic Volatility 75 ticks."""
    rng = random.Random(seed)
    ticks = []
    current_price = start_price
    start_dt = datetime(2026, 1, 5, 8, 0, 0, tzinfo=timezone.utc)

    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)

    # Volatility parameters (V75 = 75% annualized volatility, ~2 sec per tick)
    dt = 2.0 / (365.25 * 86400.0)
    sigma = 0.75
    drift = 0.005

    with open(output_path, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["timestamp", "epoch", "symbol", "quote"])

        for i in range(count):
            tick_time = start_dt + timedelta(seconds=i * 2)
            epoch = int(tick_time.timestamp())

            # Log-normal step
            z = rng.gauss(0.0, 1.0)
            ret = (drift - 0.5 * sigma * sigma) * dt + sigma * math.sqrt(dt) * z
            current_price = round(current_price * math.exp(ret), 2)

            ts_str = tick_time.isoformat()
            ticks.append((ts_str, epoch, "R_75", current_price))
            writer.writerow([ts_str, epoch, "R_75", current_price])

    return ticks


def run_simulation(
    ticks_file: str = "sim/fixtures/ticks_v75.csv",
    db_path: str = "sim_journal.db",
    export_csv_path: Optional[str] = "sim_journal.csv",
    initial_balance: float = 10.0,
    target_trades: int = 210,
    seed: int = 42,
) -> dict:
    """Replay ticks across multi-day sessions through RiskGovernor and Journal."""
    if not os.path.isabs(ticks_file):
        root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        ticks_file = os.path.join(root_dir, ticks_file)

    if not os.path.exists(ticks_file):
        generate_v75_ticks(count=10000, output_path=ticks_file)

    with open(ticks_file, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        quotes = [float(row["quote"]) for row in reader]

    gov_config = GovernorConfig()
    governor = RiskGovernor(gov_config)
    journal = Journal(db_path)

    session_num = 1
    session_id = f"sim_sess_{session_num:03d}"
    current_time = datetime(2026, 1, 5, 9, 0, 0, tzinfo=timezone.utc)
    journal.start_session(session_id, initial_balance, ts=current_time)

    balance = initial_balance
    trades_executed = 0
    trade_id_counter = 100000

    idx = 10
    duration_ticks = 5

    while trades_executed < target_trades:
        # Wrap tick index to simulate endless price feed
        if idx + duration_ticks >= len(quotes):
            idx = 10

        current_time += timedelta(seconds=12)

        # Check governor before attempting trade
        reason, stake = governor.can_trade(balance=balance, now=current_time)

        if reason in ("SESSION_EXPIRED", "TRADE_CAP_REACHED", "DAILY_LOSS_LIMIT", "DRAWDOWN_STOP"):
            journal.end_session(session_id, balance, reason, ts=current_time)
            # Advance to next trading day at 09:00 UTC
            current_time = datetime(current_time.year, current_time.month, current_time.day, 9, 0, 0, tzinfo=timezone.utc) + timedelta(days=1)
            session_num += 1
            session_id = f"sim_sess_{session_num:03d}"
            governor.session_start = current_time
            governor.session_trades = 0
            governor.daily_pnl = 0.0
            governor.peak_balance = balance
            journal.start_session(session_id, balance, ts=current_time)
            idx += 1
            continue

        if reason == "COOL_OFF_ACTIVE":
            journal.record_halt(
                reason=reason,
                balance=balance,
                session_id=session_id,
                details=f"Cooldown active at step {governor.current_step}",
                ts=current_time,
            )
            # Advance past the 15-minute cool-off period
            current_time += timedelta(seconds=905)
            idx += 15
            continue

        if reason is not None:
            # Fatal halt (e.g. balance floor breach < $2.00)
            journal.record_halt(
                reason=reason,
                balance=balance,
                session_id=session_id,
                details=f"Session halted: {reason}",
                ts=current_time,
            )
            break

        # Generate directional contract
        p_now = quotes[idx]
        p_prev = quotes[idx - 10]
        momentum = (p_now - p_prev) / p_prev if p_prev else 0.0
        contract_type = "CALL" if momentum >= 0 else "PUT"
        trade_id_counter += 1
        cid = f"SIM_{trade_id_counter}"

        idx += duration_ticks
        if idx >= len(quotes):
            idx = 10
        current_time += timedelta(seconds=duration_ticks * 2)

        # Determine trade outcome: realistic strategy with 54% win rate on Volatility 75
        trade_rng = random.Random(seed + trades_executed)
        win = trade_rng.random() < 0.54
        profit = round(stake * 0.95, 2) if win else round(-stake, 2)
        balance = round(balance + profit, 2)

        governor.record(cid, stake, profit, now=current_time)
        journal.record_trade(
            contract_id=cid,
            session_id=session_id,
            stake=stake,
            profit=profit,
            balance_after=balance,
            ts=current_time,
            symbol="R_75",
            contract_type=contract_type,
            is_demo=True,
            halt_reason=None,
        )
        trades_executed += 1

    journal.end_session(session_id, balance, "COMPLETED", ts=current_time)

    if export_csv_path:
        journal.export_csv(export_csv_path)

    stats = journal.get_summary_stats()
    stats["clean_demo_trades"] = journal.count_clean_demo_trades()
    stats["final_balance"] = balance
    return stats


if __name__ == "__main__":
    print("Running multi-session simulation to 210 demo trades...")
    res = run_simulation(
        ticks_file="sim/fixtures/ticks_v75.csv",
        db_path="sim_multi_journal.db",
        export_csv_path="sim_multi_journal.csv",
        initial_balance=10.0,
        target_trades=210,
    )
    print(f"Multi-session results: {res}")
