"""
Unit tests for SoftPip The Enforcer — Portfolio Reconciler
Tests detection of open contracts, blocking dispatch on active in-flight trades,
and contract settlement resolution.
"""

import asyncio
import unittest
from unittest.mock import AsyncMock, MagicMock

from deriv.reconcile import Reconciler
from journal import Journal


class TestReconcile(unittest.TestCase):
    def setUp(self):
        self.mock_client = MagicMock()
        self.journal = Journal(":memory:")
        self.reconciler = Reconciler(self.mock_client, self.journal)

    def test_reconcile_clear_when_empty_portfolio(self):
        """When portfolio is empty, dispatch is allowed."""
        self.mock_client.portfolio = AsyncMock(return_value={"contracts": []})
        is_clear, reason = asyncio.run(self.reconciler.reconcile_before_dispatch())
        self.assertTrue(is_clear)
        self.assertIsNone(reason)

    def test_reconcile_blocks_when_open_contracts_exist(self):
        """When open contracts exist in portfolio, dispatch is blocked."""
        self.mock_client.portfolio = AsyncMock(
            return_value={"contracts": [{"contract_id": 998877, "symbol": "R_10"}]}
        )
        is_clear, reason = asyncio.run(self.reconciler.reconcile_before_dispatch())
        self.assertFalse(is_clear)
        self.assertIn("998877", str(reason))

    def test_wait_for_settlement_resolves(self):
        """Wait for settlement returns profit on contract expiry."""
        self.mock_client.proposal_open_contract = AsyncMock(
            return_value={
                "contract_id": 123456,
                "is_settled": 1,
                "profit": 0.33,
                "buy_price": 0.35,
                "payout": 0.68,
                "status": "won",
            }
        )
        res = asyncio.run(self.reconciler.wait_for_settlement(123456, poll_interval=0.01))
        self.assertEqual(res["contract_id"], "123456")
        self.assertEqual(res["status"], "won")
        self.assertEqual(res["profit"], 0.33)


if __name__ == "__main__":
    unittest.main()
