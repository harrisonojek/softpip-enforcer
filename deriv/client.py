"""
SoftPip The Enforcer — Deriv WebSocket Client
Production-grade async WebSocket client with scope verification, token masking,
and jittered exponential backoff.
"""

from __future__ import annotations

import asyncio
import json
import logging
import random
from typing import Any, Callable, Coroutine, Dict, Optional, Set

import websockets

logger = logging.getLogger("softpip.deriv")

ALLOWED_SCOPES: Set[str] = {"read", "trade"}
FORBIDDEN_SCOPES: Set[str] = {"payments", "admin"}


def mask_token(token: str) -> str:
    """Mask token so secrets never leak into logs or exceptions."""
    if not token:
        return "<EMPTY>"
    if len(token) <= 6:
        return "***"
    return f"{token[:3]}***{token[-3:]}"


class ScopeViolationError(Exception):
    """Raised when an API token contains forbidden scopes or lacks required scopes."""
    pass


class DerivClient:
    """
    Async Deriv WebSocket client.
    Handles connect, authorize with scope checks, proposals, orders, and portfolio queries.
    """

    def __init__(
        self,
        app_id: int = 1089,
        endpoint: str = "wss://ws.derivws.com/websockets/v3",
    ) -> None:
        self.app_id = app_id
        self.endpoint = f"{endpoint}?app_id={app_id}"
        self.ws: Optional[websockets.WebSocketClientProtocol] = None
        self._req_id = 0
        self._pending_requests: Dict[int, asyncio.Future[Dict[str, Any]]] = {}
        self._tick_callbacks: Dict[str, Callable[[Dict[str, Any]], Coroutine[Any, Any, None]]] = {}
        self._listener_task: Optional[asyncio.Task[None]] = None
        self._connected = False
        self._authorized = False
        self.account_info: Dict[str, Any] = {}

    @property
    def is_connected(self) -> bool:
        return self._connected and self.ws is not None and not self.ws.closed

    @property
    def is_authorized(self) -> bool:
        return self._authorized

    async def connect(self, max_retries: int = 5) -> None:
        """Connect to Deriv WebSocket with jittered exponential backoff."""
        attempt = 0
        base_delay = 1.0
        max_delay = 30.0

        while attempt < max_retries:
            try:
                logger.info(f"Connecting to Deriv WebSocket (app_id={self.app_id})...")
                self.ws = await websockets.connect(self.endpoint, ping_interval=20, ping_timeout=10)
                self._connected = True
                self._listener_task = asyncio.create_task(self._listen_loop())
                logger.info("Connected successfully to Deriv WebSocket.")
                return
            except Exception as e:
                attempt += 1
                if attempt >= max_retries:
                    logger.error(f"Failed to connect after {max_retries} attempts: {e}")
                    raise
                # Exponential backoff with full jitter
                backoff_limit = min(max_delay, base_delay * (2 ** attempt))
                sleep_sec = random.uniform(0.5, backoff_limit)
                logger.warning(
                    f"Connection failed ({e}). Retrying in {sleep_sec:.2f}s (attempt {attempt}/{max_retries})..."
                )
                await asyncio.sleep(sleep_sec)

    async def disconnect(self) -> None:
        """Gracefully disconnect and cancel background listener."""
        self._connected = False
        self._authorized = False
        if self._listener_task and not self._listener_task.done():
            self._listener_task.cancel()
        if self.ws and not self.ws.closed:
            await self.ws.close()
            logger.info("Deriv WebSocket disconnected.")

    async def _send_request(self, payload: Dict[str, Any], timeout: float = 15.0) -> Dict[str, Any]:
        """Send a JSON-RPC request and await response matched by req_id."""
        if not self.is_connected or not self.ws:
            raise ConnectionError("Deriv WebSocket is not connected.")

        self._req_id += 1
        req_id = self._req_id
        payload["req_id"] = req_id

        fut = asyncio.get_running_loop().create_future()
        self._pending_requests[req_id] = fut

        try:
            await self.ws.send(json.dumps(payload))
            response = await asyncio.wait_for(fut, timeout=timeout)
            if "error" in response:
                err = response["error"]
                code = err.get("code", "UNKNOWN_ERROR")
                message = err.get("message", "Unknown error")
                raise RuntimeError(f"Deriv API error [{code}]: {message}")
            return response
        finally:
            self._pending_requests.pop(req_id, None)

    async def _listen_loop(self) -> None:
        """Listen for incoming messages, dispatch responses and subscriptions."""
        try:
            assert self.ws is not None
            async for raw_msg in self.ws:
                try:
                    data = json.loads(raw_msg)
                except Exception:
                    continue

                req_id = data.get("req_id")
                if req_id in self._pending_requests:
                    fut = self._pending_requests[req_id]
                    if not fut.done():
                        fut.set_result(data)

                # Dispatch tick subscriptions
                msg_type = data.get("msg_type")
                if msg_type == "tick" and "tick" in data:
                    symbol = data["tick"].get("symbol")
                    if symbol and symbol in self._tick_callbacks:
                        try:
                            await self._tick_callbacks[symbol](data["tick"])
                        except Exception as cb_err:
                            logger.error(f"Error in tick callback for {symbol}: {cb_err}")

        except asyncio.CancelledError:
            pass
        except Exception as e:
            logger.warning(f"WebSocket listener loop terminated: {e}")
            self._connected = False

    async def authorize(self, token: str) -> Dict[str, Any]:
        """
        Authorize the connection.
        Enforces token security: token is masked and scopes are audited.
        Rejects forbidden scopes (payments, admin) and requires at least 'read' and 'trade'.
        """
        masked = mask_token(token)
        logger.info(f"Authorizing with token {masked}...")

        resp = await self._send_request({"authorize": token})
        auth_data = resp.get("authorize", {})
        scopes = set(auth_data.get("scopes", []))

        # Enforce scope restrictions
        forbidden_present = scopes.intersection(FORBIDDEN_SCOPES)
        if forbidden_present:
            raise ScopeViolationError(
                f"Security breach: Token {masked} holds forbidden scopes {forbidden_present}! "
                f"The Enforcer strictly refuses tokens with 'payments' or 'admin' scopes."
            )

        if not ("read" in scopes and "trade" in scopes):
            raise ScopeViolationError(
                f"Insufficient scopes for token {masked}: holds {scopes}, requires at least 'read' and 'trade'."
            )

        self._authorized = True
        self.account_info = {
            "email": auth_data.get("email"),
            "currency": auth_data.get("currency"),
            "balance": float(auth_data.get("balance", 0.0)),
            "loginid": auth_data.get("loginid"),
            "is_virtual": bool(auth_data.get("is_virtual", 1)),
            "scopes": list(scopes),
        }
        logger.info(
            f"Authorized account {self.account_info['loginid']} "
            f"(Demo={self.account_info['is_virtual']}, Balance=${self.account_info['balance']:.2f})"
        )
        return self.account_info

    async def get_balance(self) -> float:
        """Fetch fresh account balance."""
        resp = await self._send_request({"balance": 1, "subscribe": 0})
        bal = float(resp.get("balance", {}).get("balance", 0.0))
        if self.account_info:
            self.account_info["balance"] = bal
        return bal

    async def subscribe_ticks(
        self,
        symbol: str,
        callback: Callable[[Dict[str, Any]], Coroutine[Any, Any, None]],
    ) -> None:
        """Subscribe to live tick stream for a symbol."""
        self._tick_callbacks[symbol] = callback
        await self._send_request({"ticks": symbol, "subscribe": 1})
        logger.info(f"Subscribed to tick feed for {symbol}")

    async def get_proposal(
        self,
        symbol: str,
        contract_type: str,
        amount: float,
        duration: int = 5,
        duration_unit: str = "t",
        currency: str = "USD",
    ) -> Dict[str, Any]:
        """Request a contract proposal and payout."""
        payload = {
            "proposal": 1,
            "amount": round(amount, 2),
            "basis": "stake",
            "contract_type": contract_type,
            "currency": currency,
            "duration": duration,
            "duration_unit": duration_unit,
            "symbol": symbol,
        }
        resp = await self._send_request(payload)
        return resp.get("proposal", {})

    async def buy(self, proposal_id: str, price: float) -> Dict[str, Any]:
        """Execute contract purchase."""
        payload = {
            "buy": proposal_id,
            "price": round(price, 2),
        }
        resp = await self._send_request(payload)
        return resp.get("buy", {})

    async def portfolio(self) -> Dict[str, Any]:
        """Query portfolio for open/pending contracts."""
        resp = await self._send_request({"portfolio": 1})
        return resp.get("portfolio", {})

    async def proposal_open_contract(self, contract_id: str | int) -> Dict[str, Any]:
        """Query single contract status and settlement outcome."""
        payload = {"proposal_open_contract": 1, "contract_id": int(contract_id)}
        resp = await self._send_request(payload)
        return resp.get("proposal_open_contract", {})
