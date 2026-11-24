"""
SoftPip The Enforcer — Execution Watchdog & Supervisor Heartbeat
Monitors loop health with a heartbeat timestamp. If heartbeats stall > 30s, triggers fail-closed halt.
"""

from __future__ import annotations

import asyncio
import logging
import os
import time
from typing import Callable, Optional

logger = logging.getLogger("softpip.watchdog")


class Watchdog:
    """
    Heartbeat watchdog.
    Touches a file or in-memory timestamp every loop iteration.
    A background monitor detects execution hangs exceeding threshold.
    """

    def __init__(
        self,
        heartbeat_file: str = ".heartbeat",
        max_stall_seconds: float = 30.0,
        on_stall_callback: Optional[Callable[[str], None]] = None,
    ) -> None:
        self.heartbeat_file = heartbeat_file
        self.max_stall_seconds = max_stall_seconds
        self.on_stall_callback = on_stall_callback
        self._last_heartbeat: float = time.monotonic()
        self._running = False
        self._task: Optional[asyncio.Task[None]] = None

    def touch(self) -> None:
        """Update heartbeat timestamp."""
        now = time.monotonic()
        self._last_heartbeat = now
        try:
            with open(self.heartbeat_file, "w", encoding="utf-8") as f:
                f.write(f"{time.time():.4f}\n")
        except Exception:
            pass

    async def start(self) -> None:
        """Start watchdog supervision task."""
        self._running = True
        self.touch()
        self._task = asyncio.create_task(self._monitor_loop())
        logger.info(f"Watchdog initialized (timeout={self.max_stall_seconds}s)")

    async def stop(self) -> None:
        """Stop watchdog monitoring."""
        self._running = False
        if self._task and not self._task.done():
            self._task.cancel()
            try:
                await self._task
            except asyncio.CancelledError:
                pass
        if os.path.exists(self.heartbeat_file):
            try:
                os.remove(self.heartbeat_file)
            except Exception:
                pass
        logger.info("Watchdog stopped.")

    async def _monitor_loop(self) -> None:
        while self._running:
            await asyncio.sleep(5.0)
            stalled_for = time.monotonic() - self._last_heartbeat
            if stalled_for > self.max_stall_seconds:
                msg = (
                    f"CRITICAL: Watchdog heartbeat stalled for {stalled_for:.1f}s "
                    f"(limit: {self.max_stall_seconds}s). Triggering emergency fail-closed stop!"
                )
                logger.critical(msg)
                if self.on_stall_callback:
                    try:
                        self.on_stall_callback(msg)
                    except Exception as e:
                        logger.error(f"Error in watchdog stall callback: {e}")
                self._running = False
                break
