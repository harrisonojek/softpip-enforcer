"""
Parity test between softpip-site/lib/governor-spec.ts and softpip-enforcer/governor.py.
Ensures that marketing claims, curriculum parameters, and Python engine defaults never drift.
"""

import os
import re
import unittest

from governor import GovernorConfig


class TestSpecParity(unittest.TestCase):
    def test_spec_parity_with_site(self):
        # Locate governor-spec.ts
        possible_paths = [
            os.path.join(os.path.dirname(__file__), "..", "..", "softpip-site", "lib", "governor-spec.ts"),
            r"C:\Users\harry\.gemini\antigravity\scratch\softpip-site\lib\governor-spec.ts",
        ]
        spec_file = None
        for p in possible_paths:
            if os.path.exists(p):
                spec_file = p
                break

        self.assertIsNotNone(spec_file, f"governor-spec.ts not found in {possible_paths}")

        with open(spec_file, "r", encoding="utf-8") as f:
            content = f.read()

        # Extract values via regex from GOVERNOR_SPEC object
        def extract_num(pattern: str) -> float:
            m = re.search(pattern, content)
            self.assertIsNotNone(m, f"Pattern {pattern} not matched in {spec_file}")
            return float(m.group(1))

        def extract_bool(pattern: str) -> bool:
            m = re.search(pattern, content)
            self.assertIsNotNone(m, f"Pattern {pattern} not matched in {spec_file}")
            return m.group(1).lower() == "true"

        base_stake = extract_num(r"base_stake_usd:\s*([0-9.]+)")
        multiplier = extract_num(r"multiplier:\s*([0-9.]+)")
        max_ladder_steps = int(extract_num(r"max_ladder_steps:\s*([0-9]+)"))
        max_consecutive_losses = int(extract_num(r"max_consecutive_losses:\s*([0-9]+)"))
        cool_off_seconds = int(extract_num(r"cool_off_seconds:\s*([0-9]+)"))
        reset_ladder_on_cooloff = extract_bool(r"reset_ladder_on_cooloff:\s*(true|false)")
        daily_loss_limit_floor = extract_num(r"daily_loss_limit_floor_usd:\s*([0-9.]+)")
        daily_loss_limit_pct = extract_num(r"daily_loss_limit_pct_of_equity:\s*([0-9.]+)")
        max_drawdown_pct = extract_num(r"max_drawdown_pct_of_peak:\s*([0-9.]+)")
        balance_floor = extract_num(r"balance_floor_usd:\s*([0-9.]+)")
        max_session_trades = int(extract_num(r"max_session_trades:\s*([0-9]+)"))
        session_timeout = int(extract_num(r"session_timeout_seconds:\s*([0-9]+)"))

        cfg = GovernorConfig()

        self.assertEqual(cfg.base_stake_usd, base_stake, "base_stake_usd drift")
        self.assertEqual(cfg.multiplier, multiplier, "multiplier drift")
        self.assertEqual(cfg.max_ladder_steps, max_ladder_steps, "max_ladder_steps drift")
        self.assertEqual(cfg.max_consecutive_losses, max_consecutive_losses, "max_consecutive_losses drift")
        self.assertEqual(cfg.cool_off_seconds, cool_off_seconds, "cool_off_seconds drift")
        self.assertEqual(cfg.reset_ladder_on_cooloff, reset_ladder_on_cooloff, "reset_ladder_on_cooloff drift")
        self.assertEqual(cfg.daily_loss_limit_floor_usd, daily_loss_limit_floor, "daily_loss_limit_floor_usd drift")
        self.assertEqual(cfg.daily_loss_limit_pct_of_equity, daily_loss_limit_pct, "daily_loss_limit_pct drift")
        self.assertEqual(cfg.max_drawdown_pct_of_peak, max_drawdown_pct, "max_drawdown_pct drift")
        self.assertEqual(cfg.balance_floor_usd, balance_floor, "balance_floor_usd drift")
        self.assertEqual(cfg.max_session_trades, max_session_trades, "max_session_trades drift")
        self.assertEqual(cfg.session_timeout_seconds, session_timeout, "session_timeout_seconds drift")


if __name__ == "__main__":
    unittest.main()
