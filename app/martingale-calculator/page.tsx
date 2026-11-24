import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { RuinCalculator } from "@/components/ruin-calculator";
import { EquityRiskTable } from "@/components/equity-risk-table";
import { GOVERNOR_SPEC } from "@/lib/governor-spec";
import { buildMetadata, DERIV_AFFILIATE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Deriv Martingale Calculator: Why 2x Doubling Wipes $10 Accounts — SoftPip",
  description:
    "Free Deriv Martingale calculator showing exact stake escalation from $0.35. Compare 2x doubling against SoftPip's 1.3x capped recovery ladder.",
  path: "/martingale-calculator",
});

export default function MartingaleCalculatorPage() {
  return (
    <div className="section-pad min-h-screen">
      <div className="container-shell flex flex-col gap-12">
        <Reveal className="flex flex-col gap-4 max-w-[800px]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--rust)]" aria-hidden="true" />
            <span className="type-micro uppercase text-[var(--rust)] tracking-wider">
              Mathematical Audit · Recovery Progression
            </span>
          </div>

          <h1 className="type-h1 m-0">Deriv Martingale Calculator.</h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            Every retail trader who attempts to recover a loss on Deriv with standard 2.0x Martingale
            runs straight into the $10.85 5-step liquidation wall. Here is the step-by-step math.
          </p>
        </Reveal>

        {/* Side-by-side progression table */}
        <Reveal delayMs={70} className="max-w-[860px]">
          <div className="surface-card p-6 sm:p-8 rounded-2xl border border-[var(--border)] flex flex-col gap-6">
            <h3 className="type-h3 m-0 text-[var(--foreground)]">
              Step-by-Step Capital Consumption ($10 Starting Bankroll)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm font-mono">
                <thead>
                  <tr className="border-b border-[var(--border)] text-xs uppercase text-[var(--muted)]">
                    <th className="py-3 px-3">Step</th>
                    <th className="py-3 px-3 text-[var(--rust)]">2.0× Martingale Stake</th>
                    <th className="py-3 px-3 text-[var(--rust)]">Cumulative Risk</th>
                    <th className="py-3 px-3 text-[var(--mint-text)]">SoftPip 1.3× Stake</th>
                    <th className="py-3 px-3 text-[var(--mint-text)]">Cumulative Risk</th>
                    <th className="py-3 px-3">Enforcer Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  <tr>
                    <td className="py-3 px-3 font-semibold">1</td>
                    <td className="py-3 px-3 text-[var(--rust)]">$0.35</td>
                    <td className="py-3 px-3 text-[var(--rust)]">$0.35</td>
                    <td className="py-3 px-3 text-[var(--mint-text)]">$0.35</td>
                    <td className="py-3 px-3 text-[var(--mint-text)]">$0.35</td>
                    <td className="py-3 px-3 text-xs text-[var(--muted)]">Base contract floor</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold">2</td>
                    <td className="py-3 px-3 text-[var(--rust)]">$0.70</td>
                    <td className="py-3 px-3 text-[var(--rust)]">$1.05</td>
                    <td className="py-3 px-3 text-[var(--mint-text)]">$0.46</td>
                    <td className="py-3 px-3 text-[var(--mint-text)]">$0.81</td>
                    <td className="py-3 px-3 text-xs text-[var(--muted)]">Controlled progression</td>
                  </tr>
                  <tr className="bg-[var(--mint)]/5">
                    <td className="py-3 px-3 font-semibold">3</td>
                    <td className="py-3 px-3 text-[var(--rust)]">$1.40</td>
                    <td className="py-3 px-3 text-[var(--rust)]">$2.45</td>
                    <td className="py-3 px-3 text-[var(--mint-text)] font-semibold">$0.59</td>
                    <td className="py-3 px-3 text-[var(--mint-text)] font-semibold">$1.40</td>
                    <td className="py-3 px-3 text-xs text-[var(--mint-text)] font-bold">
                      15-min Cool-Off Trigger (resets to $0.35)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold">4</td>
                    <td className="py-3 px-3 text-[var(--rust)]">$2.80</td>
                    <td className="py-3 px-3 text-[var(--rust)]">$5.25</td>
                    <td className="py-3 px-3 text-[var(--mint-text)]">$0.77</td>
                    <td className="py-3 px-3 text-[var(--mint-text)]">$2.17</td>
                    <td className="py-3 px-3 text-xs text-[var(--muted)]">Sub-daily loss cap</td>
                  </tr>
                  <tr className="bg-[var(--rust)]/10">
                    <td className="py-3 px-3 font-semibold">5</td>
                    <td className="py-3 px-3 text-[var(--rust)] font-bold">$5.60</td>
                    <td className="py-3 px-3 text-[var(--rust)] font-bold">$10.85 (LIQUIDATION)</td>
                    <td className="py-3 px-3 text-[var(--mint-text)]">$1.00</td>
                    <td className="py-3 px-3 text-[var(--mint-text)] font-semibold">$3.17</td>
                    <td className="py-3 px-3 text-xs text-[var(--mint-text)]">
                      Ladder Ceiled ($6.83 Preserved)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 text-xs text-[var(--muted)] leading-relaxed">
              <strong>The 5-Step Reality:</strong> In 2.0x Martingale, trade 5 demands a $5.60 stake with $10.85 total risk.
              Because your starting balance is $10.00, your account is liquidated before step 5 even finishes executing.
              SoftPip caps ladder risk at $3.17 across all 5 steps and enforces a 15-minute cool-off after trade 3 ($1.40 cumulative loss).
            </div>
          </div>
        </Reveal>

        {/* Live Ruin Simulator */}
        <Reveal delayMs={140} className="max-w-[860px]">
          <div className="flex flex-col gap-4">
            <h2 className="type-h2 m-0 text-[var(--foreground)]">
              Interactive 5,000-Run Monte Carlo Simulator
            </h2>
            <RuinCalculator />
          </div>
        </Reveal>

        {/* Equity Risk Scaling */}
        <Reveal delayMs={180} className="max-w-[860px]">
          <EquityRiskTable />
        </Reveal>

        {/* Next Steps */}
        <Reveal delayMs={220} className="surface-card p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 max-w-[860px]">
          <div className="flex flex-col gap-2 max-w-[500px]">
            <h3 className="type-h3 m-0 text-[var(--foreground)]">Learn Drawdown Mathematics</h3>
            <p className="type-body text-[var(--text-70)] m-0 text-sm">
              Read Module 05 for complete mathematical proofs on recovery ladders and streak probabilities.
            </p>
          </div>
          <Link
            href="/curriculum/05-drawdown-math-recovery-ladders"
            className="btn-mint shrink-0 self-start sm:self-auto"
          >
            Read Module 05 →
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
