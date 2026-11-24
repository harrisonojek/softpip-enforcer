"""
SoftPip The Enforcer — Execution & Risk Journal
SQLite WAL implementation with idempotent trade logging, audit stats, and CSV export.
"""

from __future__ import annotations

import csv
import os
import sqlite3
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional


class Journal:
    """Persistent execution journal with SQLite WAL and idempotency."""

    def __init__(self, db_path: str = "journal.db") -> None:
        self.db_path = db_path
        self._init_db()

    def _get_connection(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path, timeout=10.0)
        conn.row_factory = sqlite3.Row
        return conn

    def _init_db(self) -> None:
        """Initialize tables with SQLite WAL mode."""
        os.makedirs(os.path.dirname(os.path.abspath(self.db_path)), exist_ok=True)
        with self._get_connection() as conn:
            conn.execute("PRAGMA journal_mode = WAL;")
            conn.execute("PRAGMA synchronous = NORMAL;")
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS sessions (
                    session_id TEXT PRIMARY KEY,
                    start_time TEXT NOT NULL,
                    end_time TEXT,
                    start_balance REAL NOT NULL,
                    end_balance REAL,
                    total_trades INTEGER DEFAULT 0,
                    net_profit REAL DEFAULT 0.0,
                    end_reason TEXT
                );
                """
            )
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS trades (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    contract_id TEXT UNIQUE NOT NULL,
                    session_id TEXT NOT NULL,
                    ts TEXT NOT NULL,
                    symbol TEXT NOT NULL,
                    contract_type TEXT NOT NULL,
                    stake REAL NOT NULL,
                    profit REAL NOT NULL,
                    balance_after REAL NOT NULL,
                    is_demo INTEGER NOT NULL DEFAULT 1,
                    halt_reason TEXT,
                    FOREIGN KEY (session_id) REFERENCES sessions(session_id)
                );
                """
            )
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS halts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    session_id TEXT,
                    reason TEXT NOT NULL,
                    ts TEXT NOT NULL,
                    balance REAL NOT NULL,
                    details TEXT
                );
                """
            )
            conn.execute("CREATE INDEX IF NOT EXISTS idx_trades_session ON trades(session_id);")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_trades_ts ON trades(ts);")
            conn.commit()

    def start_session(self, session_id: str, start_balance: float, ts: Optional[datetime] = None) -> None:
        now_iso = (ts or datetime.now(timezone.utc)).isoformat()
        with self._get_connection() as conn:
            conn.execute(
                """
                INSERT OR IGNORE INTO sessions (session_id, start_time, start_balance)
                VALUES (?, ?, ?);
                """,
                (session_id, now_iso, float(start_balance)),
            )
            conn.commit()

    def end_session(
        self,
        session_id: str,
        end_balance: float,
        end_reason: str,
        ts: Optional[datetime] = None,
    ) -> None:
        now_iso = (ts or datetime.now(timezone.utc)).isoformat()
        with self._get_connection() as conn:
            # Aggregate session metrics
            cur = conn.execute(
                """
                SELECT COUNT(*), COALESCE(SUM(profit), 0.0)
                FROM trades WHERE session_id = ?;
                """,
                (session_id,),
            )
            trade_count, net_profit = cur.fetchone()
            conn.execute(
                """
                UPDATE sessions
                SET end_time = ?, end_balance = ?, total_trades = ?, net_profit = ?, end_reason = ?
                WHERE session_id = ?;
                """,
                (now_iso, float(end_balance), int(trade_count), float(net_profit), end_reason, session_id),
            )
            conn.commit()

    def record_trade(
        self,
        contract_id: str | int,
        session_id: str,
        stake: float,
        profit: float,
        balance_after: float,
        ts: Optional[datetime] = None,
        symbol: str = "R_10",
        contract_type: str = "CALL",
        is_demo: bool = True,
        halt_reason: Optional[str] = None,
    ) -> bool:
        """
        Record a trade execution idempotently.
        Returns True if inserted, False if contract_id is a duplicate.
        """
        cid = str(contract_id)
        now_iso = (ts or datetime.now(timezone.utc)).isoformat()
        try:
            with self._get_connection() as conn:
                conn.execute(
                    """
                    INSERT INTO trades (
                        contract_id, session_id, ts, symbol, contract_type,
                        stake, profit, balance_after, is_demo, halt_reason
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                    """,
                    (
                        cid,
                        session_id,
                        now_iso,
                        symbol,
                        contract_type,
                        float(stake),
                        float(profit),
                        float(balance_after),
                        1 if is_demo else 0,
                        halt_reason,
                    ),
                )
                conn.commit()
            return True
        except sqlite3.IntegrityError:
            # Duplicate contract_id
            return False

    def record_halt(
        self,
        reason: str,
        balance: float,
        session_id: Optional[str] = None,
        details: str = "",
        ts: Optional[datetime] = None,
    ) -> None:
        now_iso = (ts or datetime.now(timezone.utc)).isoformat()
        with self._get_connection() as conn:
            conn.execute(
                """
                INSERT INTO halts (session_id, reason, ts, balance, details)
                VALUES (?, ?, ?, ?, ?);
                """,
                (session_id, reason, now_iso, float(balance), details),
            )
            conn.commit()

    def count_clean_demo_trades(self) -> int:
        """
        Count demo trades executed cleanly without governor breach.
        Used to enforce the 200 demo trade graduation gate before live trading.
        """
        with self._get_connection() as conn:
            cur = conn.execute(
                """
                SELECT COUNT(*) FROM trades
                WHERE is_demo = 1 AND (halt_reason IS NULL OR halt_reason = '');
                """
            )
            row = cur.fetchone()
            return int(row[0]) if row else 0

    def get_summary_stats(self) -> Dict[str, Any]:
        with self._get_connection() as conn:
            cur = conn.execute(
                """
                SELECT
                    COUNT(*) as total_trades,
                    COALESCE(SUM(CASE WHEN profit > 0 THEN 1 ELSE 0 END), 0) as wins,
                    COALESCE(SUM(CASE WHEN profit <= 0 THEN 1 ELSE 0 END), 0) as losses,
                    COALESCE(SUM(stake), 0.0) as total_volume,
                    COALESCE(SUM(profit), 0.0) as net_profit,
                    COALESCE(MAX(profit), 0.0) as max_win,
                    COALESCE(MIN(profit), 0.0) as max_loss
                FROM trades;
                """
            )
            row = cur.fetchone()
            total = int(row["total_trades"])
            wins = int(row["wins"])
            losses = int(row["losses"])
            win_rate = (wins / total * 100.0) if total > 0 else 0.0
            return {
                "total_trades": total,
                "wins": wins,
                "losses": losses,
                "win_rate_pct": round(win_rate, 2),
                "total_volume_usd": round(float(row["total_volume"]), 2),
                "net_profit_usd": round(float(row["net_profit"]), 2),
                "max_win_usd": round(float(row["max_win"]), 2),
                "max_loss_usd": round(float(row["max_loss"]), 2),
            }

    def get_recent_trades(self, limit: int = 20) -> List[Dict[str, Any]]:
        with self._get_connection() as conn:
            cur = conn.execute(
                """
                SELECT contract_id, session_id, ts, symbol, contract_type,
                       stake, profit, balance_after, is_demo, halt_reason
                FROM trades
                ORDER BY id DESC LIMIT ?;
                """,
                (limit,),
            )
            return [dict(r) for r in cur.fetchall()]

    def export_csv(self, filepath: str) -> None:
        """Export all recorded trades to CSV for open audit."""
        os.makedirs(os.path.dirname(os.path.abspath(filepath)), exist_ok=True)
        with self._get_connection() as conn:
            cur = conn.execute(
                """
                SELECT id, contract_id, session_id, ts, symbol, contract_type,
                       stake, profit, balance_after, is_demo, halt_reason
                FROM trades
                ORDER BY id ASC;
                """
            )
            rows = cur.fetchall()

        with open(filepath, mode="w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow([
                "trade_id",
                "contract_id",
                "session_id",
                "timestamp",
                "symbol",
                "contract_type",
                "stake_usd",
                "profit_usd",
                "balance_after_usd",
                "is_demo",
                "halt_reason",
            ])
            for r in rows:
                writer.writerow([
                    r["id"],
                    r["contract_id"],
                    r["session_id"],
                    r["ts"],
                    r["symbol"],
                    r["contract_type"],
                    f"{r['stake']:.2f}",
                    f"{r['profit']:.2f}",
                    f"{r['balance_after']:.2f}",
                    r["is_demo"],
                    r["halt_reason"] or "",
                ])


if __name__ == "__main__":
    # Smoke test journal
    j = Journal(":memory:")
    j.start_session("test_sess", 10.0)
    ok1 = j.record_trade("c1", "test_sess", 0.35, -0.35, 9.65)
    ok2 = j.record_trade("c1", "test_sess", 0.35, -0.35, 9.65)  # duplicate
    assert ok1 is True
    assert ok2 is False
    assert j.count_clean_demo_trades() == 1
    print("Journal smoke test passed.")
