import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import {
  TRACK_RECORD_WEEKS,
  formatNairaSigned,
  getTrackRecordTotals,
} from "@/lib/track-record";
import { buildMetadata, DERIV_AFFILIATE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Track Record — Weekly Audit Ledger | SoftPip",
  description:
    "Weekly forward-testing track record for The Enforcer. Red weeks included. Demo before live. Seed weeks, illustrative until live data replaces them.",
  path: "/track-record",
});

export default function TrackRecordPage() {
  const totals = getTrackRecordTotals(TRACK_RECORD_WEEKS);
  const totalIsPositive = totals.totalNetNaira >= 0;

  return (
    <div className="section-pad min-h-screen">
      <div className="container-shell flex flex-col gap-12">
        {/* Header */}
        <Reveal className="flex flex-col gap-4 max-w-[800px]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
            <span className="type-micro uppercase text-[var(--mint-text)] tracking-wider">
              Verification Ledger · Forward Testing
            </span>
          </div>

          <h1 className="type-h1 m-0">Track record.</h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            Weekly. Red weeks included. Demo before live.
          </p>

          <p className="type-small text-[var(--text-45)] m-0 pt-1">
            Seed weeks, illustrative until live data replaces them.
          </p>
        </Reveal>

        {/* Ledger Table */}
        <Reveal delayMs={70} className="flex flex-col gap-4">
          <div className="overflow-x-auto surface-card p-0 rounded-[14px]">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-[var(--slate)] hairline-b text-[var(--text)]">
                <tr>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Week</th>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Environment</th>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Instrument</th>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)] text-right">Trades</th>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)] text-right">Net ₦</th>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)] text-right">Max DD</th>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--rule)]">
                {TRACK_RECORD_WEEKS.map((w) => {
                  const isPositive = w.netNaira >= 0;
                  return (
                    <tr key={w.id} className="hover:bg-[var(--slate)]/40 transition-colors">
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
                        className={`px-5 py-4 tabular-nums text-right font-medium font-mono whitespace-nowrap ${
                          isPositive ? "text-[var(--mint-text)]" : "text-[var(--rust)]"
                        }`}
                      >
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
                    Running Total (4 Seed Weeks)
                  </td>
                  <td className="px-5 py-4 tabular-nums text-right font-mono text-[var(--text)]">
                    {totals.totalTrades}
                  </td>
                  <td
                    className={`px-5 py-4 tabular-nums text-right font-mono font-semibold whitespace-nowrap ${
                      totalIsPositive ? "text-[var(--mint-text)]" : "text-[var(--rust)]"
                    }`}
                  >
                    {formatNairaSigned(totals.totalNetNaira)}
                  </td>
                  <td className="px-5 py-4 tabular-nums text-right font-mono text-[var(--text)]">
                    {totals.worstDrawdownPct.toFixed(1)}%
                  </td>
                  <td className="px-5 py-4 type-micro text-[var(--text-45)]">
                    Cumulative forward testing baseline
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Reveal>

        {/* How to read this Block */}
        <Reveal delayMs={140} className="flex flex-col gap-6">
          <div className="surface-card p-8 sm:p-10 flex flex-col gap-5 border-[var(--rule)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--mint)]" aria-hidden="true" />
              <span className="type-micro uppercase text-[var(--mint-text)] font-semibold">
                Guidance & Principles
              </span>
            </div>

            <h2 className="type-h2 m-0">How to read this record</h2>

            <div className="prose-col flex flex-col gap-4 type-body text-[var(--text-70)] leading-relaxed">
              <p className="m-0">
                <strong>1. Sample size context:</strong> A four-week sequence of 520 trades is an initial calibration sample, not a lifetime proof. In discrete PRNG feeds, a 500-trade window can contain winning regimes and losing clusters. We log every single trade to verify system compliance, not to advertise profitability.
              </p>
              <p className="m-0">
                <strong>2. Demo rows clearly labelled:</strong> Every row in this initial ledger is generated from forward-testing on a Deriv Virtual account running identical WebSocket protocol contracts. Demo forward-testing proves the execution rules, the socket kill switch, and the daily drawdown limit without capital risk before live deployment.
              </p>
              <p className="m-0">
                <strong>3. Nothing is a forecast:</strong> Past performance on synthetic indices has zero predictive power over future performance. The PRNG feed generates independent ticks with zero memory. If someone guarantees you weekly returns on Deriv, they are lying. The sole purpose of this ledger is to prove that The Enforcer limits losses to $1.00 per session when negative regimes strike.
              </p>
              <p className="m-0">
                <strong>4. Seed weeks:</strong> The four seed weeks documented above demonstrate both green weeks (+₦6,400, +₦9,200) and red weeks (-₦4,800, -₦2,150) under the exact $1.00 daily loss and 15-minute cool-off rules.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link href="/bot" className="btn-mint">
                Examine The Enforcer Bot →
              </Link>
              <a
                href={DERIV_AFFILIATE_URL}
                rel="sponsored noopener"
                target="_blank"
                className="btn-ghost"
              >
                Open $10 account
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
