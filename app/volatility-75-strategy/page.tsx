import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { EquityRiskTable } from "@/components/equity-risk-table";
import { RuinCalculator } from "@/components/ruin-calculator";
import { buildMetadata, DERIV_AFFILIATE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Volatility 75 Index Strategy: The Math Behind the 1-Second Feed — SoftPip",
  description:
    "Why chart patterns and trendlines fail on Volatility 75 (1s). The mathematical reality of PRNG tick feeds and the only risk edge you can control.",
  path: "/volatility-75-strategy",
});

export default function Volatility75StrategyPage() {
  return (
    <div className="section-pad min-h-screen">
      <div className="container-shell flex flex-col gap-12">
        <Reveal className="flex flex-col gap-4 max-w-[800px]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
            <span className="type-micro uppercase text-[var(--mint-text)] tracking-wider">
              Synthetic Derivatives Guide · Volatility 75
            </span>
          </div>

          <h1 className="type-h1 m-0">The mathematical reality of Volatility 75.</h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            Traders spend years drawing trendlines on Volatility 75 charts.
            The index has no earnings, no central bank, and no order book.
            It runs on a cryptographic pseudo-random number generator.
            Here is how the math works and where real edge actually lives.
          </p>
        </Reveal>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[860px]">
          <Reveal delayMs={60}>
            <div className="surface-card p-6 rounded-xl flex flex-col gap-3 h-full border border-[var(--border)]">
              <span className="font-mono text-xs text-[var(--mint-text)] font-semibold">01 · PRNG Mechanics</span>
              <h3 className="type-h3 m-0 text-[var(--foreground)]">No Structural Memory</h3>
              <p className="type-body text-[var(--text-70)] m-0 text-sm leading-relaxed">
                Seven consecutive red ticks do not increase the mathematical probability of a green tick. Every 1-second price jump is statistically independent.
              </p>
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <div className="surface-card p-6 rounded-xl flex flex-col gap-3 h-full border border-[var(--border)]">
              <span className="font-mono text-xs text-[var(--mint-text)] font-semibold">02 · The Broker Edge</span>
              <h3 className="type-h3 m-0 text-[var(--foreground)]">51.3% Breakeven Line</h3>
              <p className="type-body text-[var(--text-70)] m-0 text-sm leading-relaxed">
                Deriv pays ~95% payout on a winning contract but claims 100% of stake on a loss. To stay flat over 1,000 trades, your entry signal must exceed 51.3% win rate.
              </p>
            </div>
          </Reveal>

          <Reveal delayMs={180}>
            <div className="surface-card p-6 rounded-xl flex flex-col gap-3 h-full border border-[var(--border)]">
              <span className="font-mono text-xs text-[var(--mint-text)] font-semibold">03 · The Only Controllable Edge</span>
              <h3 className="type-h3 m-0 text-[var(--foreground)]">Process Governance</h3>
              <p className="type-body text-[var(--text-70)] m-0 text-sm leading-relaxed">
                You cannot alter the PRNG. You can only control position sizing, cool-off timing, and daily loss caps. That is what The Enforcer automates.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Live Simulator */}
        <Reveal delayMs={200} className="max-w-[860px]">
          <div className="flex flex-col gap-4">
            <h2 className="type-h2 m-0 text-[var(--foreground)]">
              Test Volatility 75 Ruin Probability Live
            </h2>
            <p className="type-body text-[var(--text-70)] m-0 text-sm prose-col">
              Adjust starting balance and win rate to simulate 5,000 automated Volatility 75 runs.
            </p>
            <RuinCalculator />
          </div>
        </Reveal>

        {/* Scaling Table */}
        <Reveal delayMs={240} className="max-w-[860px]">
          <EquityRiskTable />
        </Reveal>

        {/* Next Steps */}
        <Reveal delayMs={280} className="surface-card p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 max-w-[860px]">
          <div className="flex flex-col gap-2 max-w-[500px]">
            <h3 className="type-h3 m-0 text-[var(--foreground)]">Read Module 06: Contract Mechanics</h3>
            <p className="type-body text-[var(--text-70)] m-0 text-sm">
              Deep dive into tick duration, spread costs, and payout tables for Volatility 75 synthetic index options.
            </p>
          </div>
          <Link
            href="/curriculum/06-contract-mechanics-ticks-duration-spread-cost"
            className="btn-mint shrink-0 self-start sm:self-auto"
          >
            Read Module 06 →
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
