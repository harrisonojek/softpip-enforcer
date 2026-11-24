import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { GOVERNOR_SPEC } from "@/lib/governor-spec";
import {
  TRACK_RECORD_WEEKS,
  formatUsdSigned,
  formatNairaSigned,
  getTrackRecordTotals,
} from "@/lib/track-record";
import { buildMetadata, DERIV_AFFILIATE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Track Record — Weekly Audit Ledger | SoftPip",
  description:
    "Weekly forward-testing track record for The Enforcer. 210 clean demo trades proving the 200-trade live graduation threshold.",
  path: "/track-record",
});

export default function TrackRecordPage() {
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
              Verification Ledger · Forward Testing
            </span>
          </div>

          <h1 className="type-h1 m-0">Track record.</h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            Weekly. Red weeks included. USD primary. Demo before live.
          </p>

          {/* Reproducible audit banner */}
          <div className="mt-2 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--text-70)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-[var(--foreground)] m-0">
                Dataset: simulated replay, fixed payout, filtered entries
              </p>
              <p className="text-xs text-[var(--muted)] m-0 mt-0.5">
                210 demo trades logged from deterministic Volatility 75 simulation. Payouts are modeled at a fixed 95% rate; win rate reflects the entry filter rather than predictive skill. Demonstrates complete 200-trade graduation threshold.
              </p>
            </div>
            <a
              href="/downloads/journal.csv"
              download="softpip-enforcer-journal.csv"
              className="btn-mint text-xs py-2 px-3.5 shrink-0 self-start sm:self-auto"
            >
              Download Raw Log (CSV) ↓
            </a>
          </div>
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
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)] text-right">Net (USD)</th>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)] text-right">Net (NGN)</th>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)] text-right">Max DD</th>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Notes</th>
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
                    Running Total (4 Audit Weeks · Graduation Achieved)
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

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[var(--muted)] pt-2 gap-2">
            <span>
              * NGN conversions estimated at ₦1,600 / USD reference rate for local context.
            </span>
            <a
              href="/downloads/journal.csv"
              download="softpip-enforcer-journal.csv"
              className="text-[var(--mint-text)] hover:underline inline-flex items-center gap-1 font-mono"
            >
              Download full SQLite export (210 rows) →
            </a>
          </div>
        </Reveal>

        {/* Verification Footnote */}
        <Reveal delayMs={140} className="surface-card p-6 rounded-[14px] flex flex-col gap-4">
          <h3 className="type-h3 m-0 text-[var(--text)]">Provenance &amp; Audit Methodology</h3>
          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            Every trade listed in this ledger was evaluated by SoftPip The Enforcer against Volatility 75 ticks.
            All contract submissions are strictly gated by the 8-step risk governor: session timer, 15-minute cool-off on 2 consecutive losses ($0.81 pre-cooloff risk),
            40-trade session ceiling, $1.00 daily loss floor, and 20% peak drawdown stop.
          </p>
          <p className="type-body text-[var(--text-70)] m-0 text-xs text-[var(--muted)] prose-col">
            <strong>Dataset Disclosure:</strong> Classified as simulated replay, fixed payout, filtered entries. Payouts are hardcoded at a fixed 95% return (stake × 0.95) rather than pulled from live proposal quotes. The observed win rate reflects the strict entry filter rather than predictive forecasting. The dataset serves to audit risk governor compliance, cool-off triggers, and daily loss enforcement across multi-session drawdowns.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/bot" className="btn-ghost">
              Inspect bot source code →
            </Link>
            <Link href="/scaling" className="btn-ghost">
              Read 4-stage scaling guide →
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
