"""
SoftPip The Enforcer — Telegram Controller & Telemetry Bot
Long-polling Telegram command interface strictly locked to authorized chat ID.
Supported commands: /start /stop /pause /status /stats /ladder /export /help
"""

from __future__ import annotations

import asyncio
import logging
import urllib.parse
from typing import Any, Callable, Dict, Optional

import requests

logger = logging.getLogger("softpip.telegram")


class TelegramBot:
    """
    Lightweight Telegram Bot client using HTTP long-polling.
    Restricted strictly to the configured chat_id.
    """

    def __init__(
        self,
        bot_token: str,
        chat_id: str | int,
        enabled: bool = True,
    ) -> None:
        self.bot_token = bot_token.strip()
        self.chat_id = str(chat_id).strip()
        self.enabled = bool(enabled and self.bot_token and self.chat_id)
        self.base_url = f"https://api.telegram.org/bot{self.bot_token}"
        self._last_update_id = 0
        self._running = False
        self._task: Optional[asyncio.Task[None]] = None
        self._command_handlers: Dict[str, Callable[[], str]] = {}

    def register_command(self, cmd: str, handler: Callable[[], str]) -> None:
        """Register handler for command without leading slash."""
        self._command_handlers[cmd.lower()] = handler

    def send_message(self, text: str) -> bool:
        """Send a message to authorized chat_id."""
        if not self.enabled:
            return False
        try:
            url = f"{self.base_url}/sendMessage"
            payload = {
                "chat_id": self.chat_id,
                "text": text,
                "parse_mode": "Markdown",
            }
            res = requests.post(url, json=payload, timeout=10.0)
            return res.status_code == 200
        except Exception as e:
            logger.warning(f"Telegram send_message failed: {e}")
            return False

    def send_alert(self, title: str, details: str) -> bool:
        """Format and dispatch high-priority alert."""
        msg = f"*⚠️ [SoftPip Alert: {title}]*\n\n{details}"
        return self.send_message(msg)

    async def start_polling(self) -> None:
        """Start background polling task."""
        if not self.enabled:
            logger.info("Telegram bot disabled (credentials not configured).")
            return
        self._running = True
        self._task = asyncio.create_task(self._poll_loop())
        logger.info(f"Telegram bot polling started for chat_id={self.chat_id}")

    async def stop(self) -> None:
        """Stop background polling."""
        self._running = False
        if self._task and not self._task.done():
            self._task.cancel()
            try:
                await self._task
            except asyncio.CancelledError:
                pass
        logger.info("Telegram bot polling stopped.")

    async def _poll_loop(self) -> None:
        loop = asyncio.get_running_loop()
        while self._running:
            try:
                updates = await loop.run_in_executor(None, self._get_updates)
                for update in updates:
                    self._handle_update(update)
            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.debug(f"Telegram poll error: {e}")
                await asyncio.sleep(3.0)

    def _get_updates(self) -> list[Dict[str, Any]]:
        url = f"{self.base_url}/getUpdates?offset={self._last_update_id + 1}&timeout=10"
        try:
            res = requests.get(url, timeout=15.0)
            if res.status_code == 200:
                data = res.json()
                return data.get("result", [])
        except Exception:
            pass
        return []

    def _handle_update(self, update: Dict[str, Any]) -> None:
        update_id = update.get("update_id", 0)
        if update_id > self._last_update_id:
            self._last_update_id = update_id

        msg = update.get("message", {})
        from_chat = str(msg.get("chat", {}).get("id", ""))
        text = msg.get("text", "").strip()

        # Security check: strict chat_id whitelist
        if from_chat != self.chat_id:
            logger.warning(f"Ignored Telegram message from unauthorized chat_id: {from_chat}")
            return

        if not text.startswith("/"):
            return

        # Extract command and dispatch
        cmd = text.split()[0].lstrip("/").split("@")[0].lower()
        if cmd in self._command_handlers:
            try:
                reply = self._command_handlers[cmd]()
                self.send_message(reply)
            except Exception as e:
                self.send_message(f"❌ Error executing /{cmd}: {e}")
        elif cmd == "help":
            help_text = (
                "*SoftPip The Enforcer Commands:*\n"
                "/start - Resume/start trading run\n"
                "/stop - Terminate session gracefully\n"
                "/pause - Pause execution\n"
                "/status - Current balance & governor state\n"
                "/stats - Lifetime journal performance\n"
                "/ladder - Current recovery ladder step\n"
                "/export - CSV export instruction\n"
                "/help - Show this guide"
            )
            self.send_message(help_text)
        else:
            self.send_message(f"Unknown command: `/{cmd}`. Type `/help` for commands.")
