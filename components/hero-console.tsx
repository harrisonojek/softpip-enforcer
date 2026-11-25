"use client";

import React, { useState, useEffect, useRef } from "react";
import { GOVERNOR_SPEC } from "@/lib/governor-spec";

const CYCLE_DURATION_MS = 12000;
const COUNTDOWN_DURATION_MS = 8000;
const TOTAL_COUNTDOWN_SECONDS = 900; // 15:00 in seconds

const LADDER_STAGES = [
  { step: 1, stake: "$0.35" },
  { step: 2, stake: "$0.46" },
  { step: 3, stake: "$0.59" },
  { step: 4, stake: "$0.77" },
  { step: 5, stake: "$1.00" },
];

export function HeroConsole() {
  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    let animId: number;

    const tick = (now: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      if (!isPaused) {
        setElapsed((prev) => (prev + delta) % CYCLE_DURATION_MS);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      lastTimeRef.current = null;
    };
  }, [isPaused, isReducedMotion]);

  // Compute Liveness values based on elapsed time (0 to 12000 ms)
  const currentElapsed = isReducedMotion ? 0 : elapsed;

  // 1. Cell 1 progress bar: 0 to 100% across 12s cycle
  const progressPct = isReducedMotion ? 0 : Math.min(100, (currentElapsed / CYCLE_DURATION_MS) * 100);

  // 2. Cell 3 ladder step: cycles "Step 1 of 5 · $0.35" up through step 5 at $1.00 across 12s
  const stageIndex = isReducedMotion
    ? 0
    : Math.min(
        LADDER_STAGES.length - 1,
        Math.floor((currentElapsed / CYCLE_DURATION_MS) * LADDER_STAGES.length)
      );
  const currentStage = LADDER_STAGES[stageIndex];
  const ladderDisplay = `Step ${currentStage.step} of 5 · ${currentStage.stake}`;

  // 3. Cell 4 cool-off countdown: 15:00 to 0:00 over 8s, then "Armed" for 4s
  let countdownDisplay = "15:00";
  if (!isReducedMotion) {
    if (currentElapsed < COUNTDOWN_DURATION_MS) {
      const countdownProgress = currentElapsed / COUNTDOWN_DURATION_MS;
      const secondsLeft = Math.max(0, Math.round(TOTAL_COUNTDOWN_SECONDS * (1 - countdownProgress)));
      const mins = Math.floor(secondsLeft / 60);
      const secs = secondsLeft % 60;
      countdownDisplay = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    } else {
      countdownDisplay = "Armed";
    }
  }

  // 4. State chip: ACTIVE (0-4s) → COOLING (4-8s) → HALTED (8-12s) → ACTIVE
  let chipState = "ACTIVE";
  if (!isReducedMotion) {
    if (currentElapsed < 4000) {
      chipState = "ACTIVE";
    } else if (currentElapsed < 8000) {
      chipState = "COOLING";
    } else {
      chipState = "HALTED";
    }
  }

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative group w-full"
    >
      {/* Radial Mint Glow behind console */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 bg-[radial-gradient(circle_at_60%_30%,rgba(122,243,198,0.14)_0%,transparent_70%)] rounded-2xl blur-xl pointer-events-none"
      />

      <div className="relative rounded-xl border border-[var(--rule)] bg-[var(--navy)]/90 backdrop-blur-md overflow-hidden p-5 sm:p-6 shadow-2xl flex flex-col gap-5 font-mono">
        {/* Top bar: State chip inline at grid's top-left */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[var(--mint-text)] px-2.5 py-1 rounded-full border border-[var(--mint)]/30 bg-[var(--mint)]/10 transition-colors">
            <span
              className={`w-1.5 h-1.5 rounded-full bg-[var(--mint)] ${
                isPaused || isReducedMotion ? "" : "animate-pulse"
              }`}
            />
            <span className="font-semibold tracking-wider">{chipState}</span>
          </div>

          <span className="text-[10px] text-[var(--text-45)]">
            GOVERNOR_CORE
          </span>
        </div>

        {/* 2x2 Grid inside the hairline border */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Cell 1: Daily Loss Floor with 2px animated mint bar */}
          <div className="p-4 rounded-lg border border-[var(--rule)] bg-[var(--void)]/60 flex flex-col justify-between gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-[var(--text-45)] uppercase tracking-wider">
                Daily Loss Floor
              </span>
              <span className="text-base font-semibold text-[var(--text)] tabular-nums">
                ${GOVERNOR_SPEC.daily_loss_limit_floor_usd.toFixed(2)}
              </span>
            </div>

            {/* 2px mint bar filling 0 to 100% across the 12s cycle */}
            <div className="w-full">
              <div className="w-full h-[2px] bg-[var(--rule)] rounded-full overflow-hidden my-1">
                <div
                  className="h-full bg-[var(--mint)] transition-all duration-75"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="text-[10px] text-[var(--mint-text)] block pt-0.5">
                10% equity ceiling
              </span>
            </div>
          </div>

          {/* Cell 2: Base Stake */}
          <div className="p-4 rounded-lg border border-[var(--rule)] bg-[var(--void)]/60 flex flex-col justify-between gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-[var(--text-45)] uppercase tracking-wider">
                Base Stake
              </span>
              <span className="text-base font-semibold text-[var(--text)] tabular-nums">
                ${GOVERNOR_SPEC.base_stake_usd.toFixed(2)}
              </span>
            </div>
            <span className="text-[10px] text-[var(--text-70)]">
              Floor contract size
            </span>
          </div>

          {/* Cell 3: Ladder Step (cycles Step 1 of 5 · $0.35 through Step 5 at $1.00) */}
          <div className="p-4 rounded-lg border border-[var(--rule)] bg-[var(--void)]/60 flex flex-col justify-between gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-[var(--text-45)] uppercase tracking-wider">
                Ladder Step
              </span>
              <span className="text-base font-semibold text-[var(--text)] tabular-nums">
                {ladderDisplay}
              </span>
            </div>
            <span className="text-[10px] text-[var(--text-70)]">
              {GOVERNOR_SPEC.multiplier}× geometric
            </span>
          </div>

          {/* Cell 4: Cool-Off State (countdown 15:00 to 0:00 over 8s, then Armed for 4s) */}
          <div className="p-4 rounded-lg border border-[var(--rule)] bg-[var(--void)]/60 flex flex-col justify-between gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-[var(--text-45)] uppercase tracking-wider">
                Cool-Off State
              </span>
              <span
                className={`text-base font-semibold tabular-nums ${
                  countdownDisplay === "Armed"
                    ? "text-[var(--mint-text)]"
                    : "text-[var(--text)]"
                }`}
              >
                {countdownDisplay}
              </span>
            </div>
            <span className="text-[10px] text-[var(--text-70)]">
              {GOVERNOR_SPEC.max_consecutive_losses} losses trigger
            </span>
          </div>
        </div>

        {/* Bottom-left micro footnote */}
        <div className="pt-1 type-micro text-[var(--text-45)] font-mono">
          Sample session
        </div>
      </div>
    </div>
  );
}
