"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { GOVERNOR_SPEC } from "@/lib/governor-spec";

interface SimulationResult {
  martingaleRuinPct: number;
  enforcerRuinPct: number;
  martingaleAvgTradesToRuin: number;
  enforcerAvgTradesToRuin: number;
  runs: number;
}

function runMonteCarlo(
  balance: number,
  baseStake: number,
  winProb: number,
  payoutPct: number,
  maxTrades: number = 200,
  runs: number = 5000
): SimulationResult {
  let martingaleRuins = 0;
  let enforcerRuins = 0;
  let martingaleTradesSum = 0;
  let enforcerTradesSum = 0;

  for (let r = 0; r < runs; r++) {
    // 1. Simulate 2.0x Martingale
    let balM = balance;
    let stakeM = baseStake;
    let ruinedM = false;

    for (let t = 1; t <= maxTrades; t++) {
      if (stakeM > balM || balM < 2.0) {
        martingaleRuins++;
        martingaleTradesSum += t;
        ruinedM = true;
        break;
      }
      const win = Math.random() < winProb;
      if (win) {
        balM += stakeM * (payoutPct / 100);
        stakeM = baseStake;
      } else {
        balM -= stakeM;
        stakeM *= 2.0;
      }
    }
    if (!ruinedM) {
      martingaleTradesSum += maxTrades;
    }

    // 2. Simulate SoftPip 1.3x Capped Ladder with 2-loss cooloff reset
    let balE = balance;
    let stepE = 1;
    let consecutiveLosses = 0;
    let ruinedE = false;
    const ladder = [0.35, 0.46, 0.59, 0.77, 1.00];

    for (let t = 1; t <= maxTrades; t++) {
      const stakeE = ladder[stepE - 1];
      if (stakeE > balE || balE <= 2.0) {
        enforcerRuins++;
        enforcerTradesSum += t;
        ruinedE = true;
        break;
      }
      const win = Math.random() < winProb;
      if (win) {
        balE += stakeE * (payoutPct / 100);
        stepE = 1;
        consecutiveLosses = 0;
      } else {
        balE -= stakeE;
        consecutiveLosses++;
        if (consecutiveLosses >= 2) {
          // Cool-off triggers: reset ladder back to step 1
          stepE = 1;
          consecutiveLosses = 0;
        } else {
          stepE = Math.min(stepE + 1, 5);
        }
      }
    }
    if (!ruinedE) {
      enforcerTradesSum += maxTrades;
    }
  }

  return {
    martingaleRuinPct: Math.round((martingaleRuins / runs) * 1000) / 10,
    enforcerRuinPct: Math.round((enforcerRuins / runs) * 1000) / 10,
    martingaleAvgTradesToRuin: Math.round(martingaleTradesSum / runs),
    enforcerAvgTradesToRuin: Math.round(enforcerTradesSum / runs),
    runs,
  };
}

export function RuinCalculator() {
  const [balance, setBalance] = useState<number>(10);
  const [winRate, setWinRate] = useState<number>(54);
  const [isPending, startTransition] = useTransition();

  const [results, setResults] = useState<SimulationResult>(() =>
    runMonteCarlo(10, 0.35, 0.54, 95, 200, 5000)
  );

  const handleRecalculate = (newBalance: number, newWinRate: number) => {
    startTransition(() => {
      const res = runMonteCarlo(newBalance, 0.35, newWinRate / 100, 95, 200, 5000);
      setResults(res);
    });
  };

  return (
    <div className="surface-card p-6 sm:p-8 rounded-2xl border border-[var(--border)] flex flex-col gap-8">
      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-[var(--border)]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="balance-slider" className="type-small font-medium text-[var(--foreground)]">
              Starting Balance (USD)
            </label>
            <span className="font-mono text-sm font-bold text-[var(--mint-text)]">
              ${balance}
            </span>
          </div>
          <input
            id="balance-slider"
            type="range"
            min={10}
            max={200}
            step={5}
            value={balance}
            onChange={(e) => {
              const val = Number(e.target.value);
              setBalance(val);
              handleRecalculate(val, winRate);
            }}
            className="w-full accent-[var(--mint)] cursor-pointer"
          />
          <span className="text-[11px] text-[var(--muted)] font-mono">
            {balance === 10 ? "Stage 1 ($10 Trial account)" : balance >= 100 ? "Stage 4 (Institutional 1% mode)" : "Stage 2/3 (Buffer & Transition)"}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="winrate-slider" className="type-small font-medium text-[var(--foreground)]">
              Signal Win Rate (%)
            </label>
            <span className="font-mono text-sm font-bold text-[var(--mint-text)]">
              {winRate}%
            </span>
          </div>
          <input
            id="winrate-slider"
            type="range"
            min={45}
            max={65}
            step={1}
            value={winRate}
            onChange={(e) => {
              const val = Number(e.target.value);
              setWinRate(val);
              handleRecalculate(balance, val);
            }}
            className="w-full accent-[var(--mint)] cursor-pointer"
          />
          <span className="text-[11px] text-[var(--muted)] font-mono">
            Standard synthetic momentum sits between 50%–55% without martingale
          </span>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Unconstrained Martingale */}
        <div className="p-6 rounded-xl border border-[var(--rust)]/30 bg-[var(--rust)]/5 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="type-micro uppercase text-[var(--rust)] font-bold">
                2.0× Martingale Doubling
              </span>
              <span className="type-micro font-mono text-[var(--muted)]">5,000 Runs</span>
            </div>
            <h4 className="type-h2 m-0 text-[var(--rust)] font-mono pt-1">
              {results.martingaleRuinPct}%
            </h4>
            <span className="type-caption text-[var(--rust)] font-medium">
              Probability of Account Ruin (200 trades)
            </span>
          </div>
          <div className="pt-3 border-t border-[var(--rust)]/20 text-xs text-[var(--muted)] flex flex-col gap-1">
            <span>• Average survival: {results.martingaleAvgTradesToRuin} trades</span>
            <span>• Step 5 demands $5.60 ($10.85 cumulative &gt; ${balance})</span>
            <span className="text-[var(--rust)] font-semibold">• Liquidation guarantee on normal chop</span>
          </div>
        </div>

        {/* SoftPip Enforcer */}
        <div className="p-6 rounded-xl border border-[var(--mint)]/40 bg-[var(--mint)]/5 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="type-micro uppercase text-[var(--mint-text)] font-bold">
                SoftPip 1.3× Capped Ladder
              </span>
              <span className="type-micro font-mono text-[var(--muted)]">5,000 Runs</span>
            </div>
            <h4 className="type-h2 m-0 text-[var(--mint-text)] font-mono pt-1">
              {results.enforcerRuinPct}%
            </h4>
            <span className="type-caption text-[var(--mint-text)] font-medium">
              Probability of Account Ruin (200 trades)
            </span>
          </div>
          <div className="pt-3 border-t border-[var(--mint)]/20 text-xs text-[var(--muted)] flex flex-col gap-1">
            <span>• Average survival: {results.enforcerAvgTradesToRuin} trades</span>
            <span>• Max 5-step risk: $3.17 (capped)</span>
            <span className="text-[var(--mint-text)] font-semibold">• 15-min cool-off resets ladder to $0.35 after 2 losses</span>
          </div>
        </div>
      </div>

      {/* Narrative Footer */}
      <div className="p-4 rounded-xl bg-[var(--void)] border border-[var(--border)] text-xs text-[var(--muted)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="font-semibold text-[var(--foreground)] block">
            Why Martingale Guarantees Account Destruction on Deriv:
          </span>
          <span className="block mt-0.5">
            On Volatility 75, streaks of 5 consecutive opposite ticks happen on average every 64 trades. A 2.0x doubler on a $10 account cannot survive streak #1.
          </span>
        </div>
        <Link
          href="/labs/enforcer"
          className="btn-mint text-xs py-2 px-3.5 shrink-0 self-start sm:self-auto"
        >
          Inspect The Enforcer Bot →
        </Link>
      </div>
    </div>
  );
}
