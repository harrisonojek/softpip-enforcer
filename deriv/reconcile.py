"""
SoftPip The Enforcer — Portfolio & Execution Reconciler
Safeguard against phantom orders, in-flight disconnects, and unconfirmed buys.
"""

from __future__ import annotations

import asyncio
import logging
from typing import Any, Dict, List, Optional, Tuple

from deriv.client import DerivClient
from journal import Journal

logger = logging.getLogger("softpip.reconcile")


class ReconcileError(Exception):
    """Raised when portfolio reconciliation detects an unresolvable in-flight conflict."""
    pass


class Reconciler:
    """
    Reconciles open Deriv contracts against local journal records.
    Ensures that no new contract is dispatched while previous orders remain unsettled.
    """

    def __init__(self, client: DerivClient, journal: Journal) -> None:
        self.client = client
        self.journal = journal

    async def get_open_contracts(self) -> List[Dict[str, Any]]:
        """Fetch open contracts from Deriv portfolio."""
        data = await self.client.portfolio()
        contracts = data.get("contracts", [])
        return contracts

    async def reconcile_before_dispatch(self) -> Tuple[bool, Optional[str]]:
        """
        Verify that no unsettled or pending contracts exist before governor allows dispatch.
        Returns:
            (is_clear: bool, reason_if_blocked: Optional[str])
        """
        try:
            open_contracts = await self.get_open_contracts()
            if open_contracts:
                cids = [str(c.get("contract_id")) for c in open_contracts]
                msg = f"Cannot dispatch: {len(open_contracts)} unsettled contract(s) active in portfolio: {', '.join(cids)}"
                logger.warning(msg)
                return False, msg

            return True, None
        except Exception as e:
            msg = f"Reconciliation query failed: {e}"
            logger.error(msg)
            return False, msg

    async def wait_for_settlement(
        self,
        contract_id: str | int,
        poll_interval: float = 1.0,
        max_timeout: float = 60.0,
    ) -> Dict[str, Any]:
        """
        Poll until contract is settled.
        Returns the final settlement record with profit, payout, and exit tick.
        """
        elapsed = 0.0
        while elapsed < max_timeout:
            data = await self.client.proposal_open_contract(contract_id)
            is_settled = bool(data.get("is_settled", 0))
            is_expired = bool(data.get("is_expired", 0))
            is_sold = bool(data.get("is_sold", 0))

            if is_settled or is_sold or (is_expired and "profit" in data):
                profit = float(data.get("profit", 0.0))
                payout = float(data.get("payout", 0.0))
                buy_price = float(data.get("buy_price", 0.0))
                status = data.get("status", "lost" if profit <= 0 else "won")
                logger.info(
                    f"Contract {contract_id} settled: status={status}, buy_price=${buy_price:.2f}, "
                    f"profit=${profit:.2f}, payout=${payout:.2f}"
                )
                return {
                    "contract_id": str(contract_id),
                    "status": status,
                    "profit": profit,
                    "buy_price": buy_price,
                    "payout": payout,
                    "raw": data,
                }

            await asyncio.sleep(poll_interval)
            elapsed += poll_interval

        raise TimeoutError(f"Contract {contract_id} did not settle within {max_timeout}s")
