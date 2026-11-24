import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { RuinCalculator } from "@/components/ruin-calculator";
import { EquityRiskTable } from "@/components/equity-risk-table";
import { buildMetadata, DERIV_AFFILIATE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Deriv Risk of Ruin & Martingale Simulator — SoftPip",
  description:
    "Interactive Monte Carlo ruin simulator comparing 2x Martingale doubling against SoftPip's 1.3x capped recovery ladder on $10 accounts.",
  path: "/labs/calculator",
});

export default function CalculatorPage() {
  return (
    <div className="section-pad min-h-screen">
      <div className="container-shell flex flex-col gap-12">
        <Reveal className="flex flex-col gap-4 max-w-[800px]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
            <span className="type-micro uppercase text-[var(--mint-text)] tracking-wider">
              Mathematical Verification · Monte Carlo Engine
            </span>
          </div>

          <h1 className="type-h1 m-0">Risk of Ruin Calculator.</h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            Simulate 5,000 algorithmic sessions across 200 consecutive trades.
            See mathematically why standard Martingale bots destroy $10 accounts and how The Enforcer caps loss exposure.
          </p>
        </Reveal>

        {/* Live Simulator */}
        <Reveal delayMs={70}>
          <RuinCalculator />
        </Reveal>

        {/* Equity Risk Scaling */}
        <Reveal delayMs={140} className="max-w-[860px]">
          <EquityRiskTable />
        </Reveal>

        {/* Explanation Block */}
        <Reveal delayMs={180} className="surface-card p-6 sm:p-8 rounded-2xl flex flex-col gap-4 max-w-[860px]">
          <h3 className="type-h3 m-0 text-[var(--foreground)]">The Mathematics of Recovery Ladders</h3>
          <p className="type-body text-[var(--text-70)] m-0 text-sm leading-relaxed">
            In standard 2.0× Martingale, stake progression accelerates exponentially: $0.35, $0.70, $1.40, $2.80, $5.60.
            By trade five, cumulative capital risked is $10.85 — exceeding the entire bankroll of a $10 beginner account.
            When step 5 loses, the broker executes a complete account margin liquidation.
          </p>
          <p className="type-body text-[var(--text-70)] m-0 text-sm leading-relaxed">
            SoftPip replaces geometric doubling with a linear-geometric hybrid: 1.3× slope capped strictly at 5 steps:
            $0.35 → $0.46 → $0.59 → $0.77 → $1.00. The entire 5-step loss sequence consumes only $3.17 (31.7% of $10),
            leaving $6.83 preserved. Furthermore, a 15-minute cool-off triggers after two consecutive losses ($0.81 cumulative risk),
            resetting the ladder back to $0.35 before market chop can trigger step three.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link href="/labs/enforcer" className="btn-mint">
              Get The Free Enforcer Bot →
            </Link>
            <Link href="/academy" className="btn-ghost">
              Read 10-Module Curriculum
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
