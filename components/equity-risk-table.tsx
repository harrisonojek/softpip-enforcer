import Link from "next/link";
import { EQUITY_RISK_TABLE } from "@/lib/governor-spec";

export function EquityRiskTable() {
  return (
    <div className="w-full my-8 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[var(--border)] gap-2">
        <div>
          <h3 className="text-lg font-semibold text-[var(--foreground)] tracking-tight">
            Account Equity &amp; Progression Risk
          </h3>
          <p className="text-sm text-[var(--muted)]">
            How Deriv&apos;s $0.35 synthetic contract floor impacts account survival as balance scales.
          </p>
        </div>
        <Link
          href="/scaling"
          className="text-xs font-mono text-[var(--mint-text)] hover:underline inline-flex items-center gap-1 self-start md:self-auto"
        >
          View 4-Stage Scaling Guide &rarr;
        </Link>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left text-sm font-mono border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] text-[var(--muted)] text-xs uppercase tracking-wider">
              <th className="py-3 px-4 font-medium">Balance</th>
              <th className="py-3 px-4 font-medium">Base Stake Floor ($0.35)</th>
              <th className="py-3 px-4 font-medium">Full Ladder Risk ($3.17)</th>
              <th className="py-3 px-4 font-medium">Risk Regime &amp; Stage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {EQUITY_RISK_TABLE.map((row) => (
              <tr key={row.balanceUsd} className="hover:bg-[var(--surface-hover)] transition-colors">
                <td className="py-3.5 px-4 font-semibold text-[var(--foreground)]">
                  ${row.balanceUsd}
                </td>
                <td className="py-3.5 px-4 text-[var(--foreground)]">
                  {row.floorPct}
                  {row.balanceUsd === 10 && (
                    <span className="ml-2 text-xs text-[var(--coral)] bg-[var(--coral)]/10 px-1.5 py-0.5 rounded">
                      High Exposure
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-[var(--foreground)]">
                  {row.fullLadderPct}
                </td>
                <td className="py-3.5 px-4 text-xs text-[var(--muted)]">
                  {row.stageNote}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--border)] text-xs text-[var(--muted)] leading-relaxed">
        <strong>Rule of Scale:</strong> At a $10 starting balance, The Enforcer runs in fixed mode ($0.35 minimum) where discipline proves rules hold. Above $100, institutional 1% risk sizing unlocks, dropping the full recovery ladder exposure to just 3.2% of equity.
      </div>
    </div>
  );
}
