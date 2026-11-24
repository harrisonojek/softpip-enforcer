import React from "react";
import { Reveal } from "@/components/reveal";
import {
  TRACK_RECORD_WEEKS,
  formatUsdSigned,
  formatNairaSigned,
  getTrackRecordTotals,
} from "@/lib/track-record";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Research — SoftPip Academy",
  description:
    "Empirical post-mortems, volatility index studies, and algorithmic execution audits. Becomes an independent division upon four published studies.",
  path: "/academy/research",
});

interface ResearchPaper {
  id: string;
  number: string;
  status: "in-build" | "planned";
  title: string;
  summary: string;
  tag: string;
}

const RESEARCH_PAPERS: readonly ResearchPaper[] = [
  {
    id: "paper-01",
    number: "01",
    status: "in-build",
    title: "The ₦32,450,000 Post-Mortem: Anatomical Analysis of an Options Wipeout",
    summary:
      "A forensic autopsy of an 8-month discretionary options trading collapse in Nigeria. Deconstructs how the 3.5% minimum stake floor, Martingale doubling, and absent circuit breakers caused complete liquidation.",
    tag: "Forensic Case Study",
  },
  {
    id: "paper-02",
    number: "02",
    status: "planned",
    title: "The Enforcer Forward Audit: 210-Trade Mechanical Graduation Baseline",
    summary:
      "Reproducible simulation testing 210 continuous Volatility 75 trades against an 8-step risk governor. Demonstrates how a 2-loss cool-off and $1.00 daily loss floor prevent account ruin across drawdowns.",
    tag: "Execution Audit",
  },
  {
    id: "paper-03",
    number: "03",
    status: "planned",
    title: "PRNG Kurtosis & Regime Clustering in Synthetic Volatility Indices",
    summary:
      "Investigating tick generation frequencies, non-normal distribution tails, and adverse micro-run clustering across Volatility 10 and 75 indices on Deriv.",
    tag: "Statistical Analysis",
  },
  {
    id: "paper-04",
    number: "04",
    status: "planned",
    title: "Asymmetric Ruin Dynamics: 1.3× Capped Ladders vs 2.0× Martingale Doubling",
    summary:
      "A mathematical proof contrasting geometric stake escalation with capped progression slopes. Proves that surviving small accounts require hard-capped linear sequences under 35% total risk.",
    tag: "Risk Modeling",
  },
];

export default function ResearchPage() {
  const totals = getTrackRecordTotals(TRACK_RECORD_WEEKS);
  const totalIsPositive = totals.totalNetUsd >= 0;

  return (
    <div className="section-pad min-h-screen">
      <div className="container-shell flex flex-col gap-12">
        {/* Header */}
        <Reveal className="flex flex-col gap-4 max-w-[800px]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
            <span className="type-micro uppercase text-[var(--mint-text)] tracking-wider">
              Pillar 01 · SoftPip Academy · Research Division
            </span>
          </div>

          <h1 className="type-h1 m-0">Research.</h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            Empirical post-mortems, volatility index studies, and algorithmic risk audits. This section currently operates within the Academy and will transition into an independent SoftPip Research division once four formal papers are published.
          </p>
        </Reveal>

        {/* Division Roadmap Banner */}
        <Reveal delayMs={60} className="surface-card p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[var(--border)]">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="type-micro font-mono text-[var(--mint-text)] font-semibold">
                DIVISION STATUS: 0 OF 4 PUBLISHED — FIRST PAPER IN BUILD
              </span>
              <span className="type-micro px-2 py-0.5 rounded-full bg-[var(--slate)] text-[var(--text-70)] border border-[var(--rule)]">
                Incubation Stage
              </span>
            </div>
            <p className="type-small text-[var(--text-70)] m-0">
              Upon publication of four completed papers, SoftPip Research separates into an autonomous institutional publication with open datasets and peer review.
            </p>
          </div>
          <div className="shrink-0 font-mono text-xs text-[var(--text-45)]">
            0 of 4 published
          </div>
        </Reveal>

        {/* Publishing Pipeline */}
        <Reveal delayMs={100} className="flex flex-col gap-4">
          <h2 className="type-h2 m-0 text-[var(--foreground)] text-xl">
            Research Index &amp; Planned Papers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {RESEARCH_PAPERS.map((paper) => {
              const isInBuild = paper.status === "in-build";
              return (
                <div
                  key={paper.id}
                  className="surface-card p-6 rounded-xl flex flex-col justify-between gap-4"
                >
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="type-micro font-mono text-[var(--text-45)]">
                        PAPER #{paper.number}
                      </span>
                      <span
                        className={`type-micro px-2 py-0.5 rounded-full font-mono text-[10px] ${
                          isInBuild
                            ? "bg-[var(--mint)]/10 text-[var(--mint-text)] border border-[var(--mint)]/30 font-semibold"
                            : "bg-[var(--slate)] text-[var(--text-45)] border border-[var(--rule)]"
                        }`}
                      >
                        {isInBuild ? "IN BUILD" : "PLANNED"}
                      </span>
                    </div>

                    <h3 className="type-h3 m-0 text-[var(--foreground)] text-base font-semibold">
                      {paper.title}
                    </h3>

                    <p className="type-body text-[var(--text-70)] m-0 text-xs leading-relaxed">
                      {paper.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[var(--rule)] text-xs font-mono">
                    <span className="text-[var(--text-45)]">{paper.tag}</span>
                    <span className="text-[var(--text-45)] font-mono">
                      {isInBuild ? "Draft in progress" : "Planned study"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Embedded Track Record Summary */}
        <div id="ledger-summary" className="flex flex-col gap-6 pt-4">
          <Reveal delayMs={140} className="flex flex-col gap-2 max-w-[800px]">
            <span className="type-micro font-mono uppercase text-[var(--mint-text)]">
              Embedded Dataset · Paper #02
            </span>
            <h2 className="type-h2 m-0 text-[var(--foreground)] text-xl">
              Forward-Test Execution Summary
            </h2>
            <p className="type-body text-[var(--text-70)] m-0 text-sm">
              210 clean demo trades logged from deterministic Volatility 75 simulation. Payouts hardcoded at 95% return; win rate reflects entry filter rather than predictive forecasting.
            </p>
          </Reveal>

          {/* KPI Strip */}
          <Reveal delayMs={160} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="surface-card p-5 rounded-xl flex flex-col gap-1">
              <span className="type-micro uppercase text-[var(--text-45)] font-mono">
                Total Clean Trades
              </span>
              <span className="type-h2 m-0 text-[var(--foreground)] font-mono">
                {totals.totalTrades}
              </span>
              <span className="type-micro text-[var(--mint-text)] font-mono">
                0 governor breaches
              </span>
            </div>

            <div className="surface-card p-5 rounded-xl flex flex-col gap-1">
              <span className="type-micro uppercase text-[var(--text-45)] font-mono">
                Simulated Net P&amp;L
              </span>
              <span className="type-h2 m-0 text-[var(--mint-text)] font-mono">
                {formatUsdSigned(totals.totalNetUsd)}
              </span>
              <span className="type-micro text-[var(--text-45)] font-mono">
                {formatNairaSigned(totals.totalNetNaira)}
              </span>
            </div>

            <div className="surface-card p-5 rounded-xl flex flex-col gap-1">
              <span className="type-micro uppercase text-[var(--text-45)] font-mono">
                Filtered Win Rate
              </span>
              <span className="type-h2 m-0 text-[var(--foreground)] font-mono">
                58.1%
              </span>
              <span className="type-micro text-[var(--text-45)] font-mono">
                122W · 88L
              </span>
            </div>

            <div className="surface-card p-5 rounded-xl flex flex-col gap-1">
              <span className="type-micro uppercase text-[var(--text-45)] font-mono">
                Worst Session DD
              </span>
              <span className="type-h2 m-0 text-[var(--rust)] font-mono">
                {totals.worstDrawdownPct.toFixed(1)}%
              </span>
              <span className="type-micro text-[var(--text-45)] font-mono">
                Safe under 20% limit
              </span>
            </div>
          </Reveal>

          {/* Embedded Ledger Table */}
          <Reveal delayMs={180} className="flex flex-col gap-4">
            <div className="overflow-x-auto surface-card p-0 rounded-[14px]">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-[var(--slate)] hairline-b text-[var(--text)]">
                  <tr>
                    <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Week</th>
                    <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Environment</th>
                    <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Instrument</th>
                    <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)] text-right">Trades</th>
                    <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)] text-right">Net (USD)</th>
                    <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)] text-right">Net (NGN)</th>
                    <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)] text-right">Max DD</th>
                    <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Audit Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--rule)]">
                  {TRACK_RECORD_WEEKS.map((w) => {
                    const isPositive = w.netUsd >= 0;
                    return (
                      <tr key={w.id} className="track-record-row hover:bg-[var(--slate)]/40 transition-colors">
                        <td className="px-5 py-4 font-mono text-xs text-[var(--text)] whitespace-nowrap">
                          {w.week}
                        </td>
                        <td className="px-5 py-4">
                          <span className="type-micro px-2 py-0.5 rounded-full border border-[var(--line)] text-[var(--text-70)] bg-[var(--slate)]">
                            {w.environment}
                          </span>
                        </td>
                        <td className="px-5 py-4 type-small text-[var(--text-70)] whitespace-nowrap">
                          {w.instrument}
                        </td>
                        <td className="px-5 py-4 type-small text-[var(--text)] tabular-nums text-right font-mono">
                          {w.trades}
                        </td>
                        <td
                          className={`px-5 py-4 tabular-nums text-right font-semibold font-mono whitespace-nowrap ${
                            isPositive ? "text-[var(--mint-text)]" : "text-[var(--rust)]"
                          }`}
                        >
                          {formatUsdSigned(w.netUsd)}
                        </td>
                        <td className="px-5 py-4 type-small text-[var(--text-45)] tabular-nums text-right font-mono whitespace-nowrap">
                          {formatNairaSigned(w.netNaira)}
                        </td>
                        <td className="px-5 py-4 type-small text-[var(--text-70)] tabular-nums text-right font-mono">
                          {w.maxDrawdownPct.toFixed(1)}%
                        </td>
                        <td className="px-5 py-4 type-small text-[var(--text-70)] min-w-[260px]">
                          {w.notes}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-[var(--slate)] hairline-t font-medium text-[var(--text)]">
                  <tr>
                    <td className="px-5 py-4 font-semibold text-[var(--text)]" colSpan={3}>
                      Total Audit Cohort (Graduation Achieved)
                    </td>
                    <td className="px-5 py-4 tabular-nums text-right font-mono text-[var(--text)]">
                      {totals.totalTrades}
                    </td>
                    <td
                      className={`px-5 py-4 tabular-nums text-right font-bold font-mono whitespace-nowrap ${
                        totalIsPositive ? "text-[var(--mint-text)]" : "text-[var(--rust)]"
                      }`}
                    >
                      {formatUsdSigned(totals.totalNetUsd)}
                    </td>
                    <td className="px-5 py-4 tabular-nums text-right font-mono text-[var(--text-45)] whitespace-nowrap">
                      {formatNairaSigned(totals.totalNetNaira)}
                    </td>
                    <td className="px-5 py-4 tabular-nums text-right font-mono text-[var(--rust)]">
                      {totals.worstDrawdownPct.toFixed(1)}%
                    </td>
                    <td className="px-5 py-4 type-micro text-[var(--text-45)]">
                      210 demo trades logged. 0 governor breaches.
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[var(--muted)] pt-1 gap-2">
              <span>
                Classified as simulated replay, fixed payout, filtered entries. Payouts: 95% fixed.
              </span>
              <a
                href="/downloads/journal.csv"
                download="softpip-enforcer-journal.csv"
                className="btn-mint text-xs py-2 px-3.5 font-mono inline-flex items-center gap-1.5"
              >
                Download Raw Log (CSV) ↓
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
