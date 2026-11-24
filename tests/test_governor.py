"""
Unit tests for SoftPip The Enforcer — RiskGovernor
Tests every halt reason code, evaluation order, cool-off vs daily cap math,
UTC rollover, idempotency, and config validation.
"""

import unittest
from datetime import datetime, timedelta, timezone

from governor import GovernorConfig, RiskGovernor


class TestGovernor(unittest.TestCase):
    def setUp(self):
        self.t0 = datetime(2026, 1, 5, 8, 0, 0, tzinfo=timezone.utc)
        self.config = GovernorConfig()
        self.gov = RiskGovernor(self.config, start_time=self.t0)

    def test_default_config_validation(self):
        """Ensure default GovernorConfig validates cleanly."""
        self.config.validate()
        self.assertEqual(self.config.base_stake_usd, 0.35)
        self.assertEqual(self.config.multiplier, 1.3)
        self.assertEqual(self.config.max_ladder_steps, 5)
        self.assertEqual(self.config.max_consecutive_losses, 3)
        self.assertEqual(self.config.daily_loss_limit_floor_usd, 2.00)

    def test_invalid_config_raises(self):
        """Ensure invalid configurations fail validation."""
        with self.assertRaises(ValueError):
            GovernorConfig(base_stake_usd=0.0)

        with self.assertRaises(ValueError):
            GovernorConfig(daily_loss_limit_floor_usd=-1.0)

    def test_evaluation_order_step_1_session_expired(self):
        """Session timer expiration halts trade before any other check."""
        t_expired = self.t0 + timedelta(seconds=3601)
        reason, stake = self.gov.can_trade(balance=10.0, now=t_expired)
        self.assertEqual(reason, "SESSION_EXPIRED")
        self.assertEqual(stake, 0.0)

    def test_evaluation_order_step_2_cool_off_active(self):
        """Cool-off triggers after 3 consecutive losses ($1.40 risk < $2.00 daily cap)."""
        # Loss 1: stake 0.35
        self.gov.record("c1", 0.35, -0.35, now=self.t0 + timedelta(seconds=10))
        self.assertEqual(self.gov.current_step, 2)

        # Loss 2: stake 0.46
        self.gov.record("c2", 0.46, -0.46, now=self.t0 + timedelta(seconds=20))
        self.assertEqual(self.gov.current_step, 3)

        # Loss 3: stake 0.59
        self.gov.record("c3", 0.59, -0.59, now=self.t0 + timedelta(seconds=30))
        self.assertEqual(self.gov.current_step, 4)

        # Total loss = 0.35 + 0.46 + 0.59 = 1.40. Balance = 8.60.
        # Now check can_trade at t=40s: must be COOL_OFF_ACTIVE (not DAILY_LOSS_LIMIT)
        reason, stake = self.gov.can_trade(balance=8.60, now=self.t0 + timedelta(seconds=40))
        self.assertEqual(reason, "COOL_OFF_ACTIVE")
        self.assertEqual(stake, 0.0)

    def test_cool_off_resets_ladder_after_expiry(self):
        """Once 15-minute cool-off expires, ladder resets to step 1."""
        self.gov.record("c1", 0.35, -0.35, now=self.t0 + timedelta(seconds=10))
        self.gov.record("c2", 0.46, -0.46, now=self.t0 + timedelta(seconds=20))
        self.gov.record("c3", 0.59, -0.59, now=self.t0 + timedelta(seconds=30))

        # Check after 905 seconds (15m + 5s)
        t_resume = self.t0 + timedelta(seconds=30 + 905)
        reason, stake = self.gov.can_trade(balance=8.60, now=t_resume)
        self.assertIsNone(reason)
        self.assertEqual(stake, 0.35)
        self.assertEqual(self.gov.current_step, 1)

    def test_trade_cap_reached(self):
        """Session trade cap halts trading after max_session_trades."""
        self.gov.session_trades = 40
        reason, stake = self.gov.can_trade(balance=10.0, now=self.t0 + timedelta(seconds=60))
        self.assertEqual(reason, "TRADE_CAP_REACHED")
        self.assertEqual(stake, 0.0)

    def test_daily_loss_limit(self):
        """Daily loss limit halts trade when daily loss >= limit."""
        # On $10 equity, daily loss limit is max(2.00, 10% of 10) = 2.00.
        self.gov.daily_pnl = -2.05
        reason, stake = self.gov.can_trade(balance=7.95, now=self.t0 + timedelta(seconds=60))
        self.assertEqual(reason, "DAILY_LOSS_LIMIT")
        self.assertEqual(stake, 0.0)

    def test_balance_floor_breach(self):
        """Balance floor halts trade if balance <= $2.00."""
        reason, stake = self.gov.can_trade(balance=2.00, now=self.t0 + timedelta(seconds=60))
        self.assertEqual(reason, "BALANCE_FLOOR_BREACH")
        self.assertEqual(stake, 0.0)

    def test_drawdown_stop(self):
        """Drawdown stop halts if balance drops 20% below peak."""
        self.gov.peak_balance = 20.0
        # 20% drawdown of 20.0 is 4.0 -> balance <= 16.0
        reason, stake = self.gov.can_trade(balance=15.90, now=self.t0 + timedelta(seconds=60))
        self.assertEqual(reason, "DRAWDOWN_STOP")
        self.assertEqual(stake, 0.0)

    def test_insufficient_margin(self):
        """Insufficient margin halts if balance - stake <= balance floor."""
        # Balance = 2.30, floor = 2.00, stake = 0.35 -> remaining = 1.95 <= 2.00
        reason, stake = self.gov.can_trade(balance=2.30, now=self.t0 + timedelta(seconds=60))
        self.assertEqual(reason, "INSUFFICIENT_MARGIN")
        self.assertEqual(stake, 0.0)

    def test_utc_date_rollover(self):
        """00:00 UTC rollover resets daily P&L and counters."""
        self.gov.daily_pnl = -1.80
        self.gov.session_trades = 15

        next_day_utc = datetime(2026, 1, 6, 0, 5, 0, tzinfo=timezone.utc)
        reason, stake = self.gov.can_trade(balance=10.0, now=next_day_utc)
        self.assertEqual(self.gov.daily_pnl, 0.0)

    def test_idempotent_contract_recording(self):
        """Duplicate contract_id recording is ignored."""
        first = self.gov.record("CID_999", 0.35, -0.35, now=self.t0)
        second = self.gov.record("CID_999", 0.35, -0.35, now=self.t0)
        self.assertTrue(first)
        self.assertFalse(second)
        self.assertEqual(self.gov.daily_pnl, -0.35)  # recorded only once


if __name__ == "__main__":
    unittest.main()
