import React from "react";
import { CountUpNumber } from "@/components/reveal";
import { GOVERNOR_SPEC } from "@/lib/governor-spec";

export interface StatCell {
  prefix?: string;
  target: number;
  suffix?: string;
  label: string;
  detail: string;
  highlightMint?: boolean;
}

const THREE_HOME_STATS: StatCell[] = [
  {
    prefix: "₦",
    target: 32.45,
    suffix: "M",
    label: "lost",
    detail: "₦32,450,000 (≈$21,600) lost across 10 months of unaudited trades in 2025.",
    highlightMint: true,
  },
  {
    target: 28,
    label: "floor trades at minimum equity ($10)",
    detail: `At the $10 floor, flat minimum stakes survive 28 losses; martingale wipes it in 5.`,
  },
  {
    prefix: "$",
    target: 0,
    label: "cost to you",
    detail: "The curriculum and the Enforcer are free permanently. Anything paid later sits alongside them, never in place of them.",
  },
];

export function StatRow({ stats = THREE_HOME_STATS }: { stats?: StatCell[] }) {
  return (
    <div className="surface-card overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {stats.map((cell, idx) => {
          const borderClasses = idx > 0 ? "md:border-l md:border-[var(--rule)] max-md:border-t max-md:border-[var(--rule)]" : "";

          return (
            <div
              key={cell.label}
              className={`min-h-[96px] min-w-0 p-5 sm:p-6 lg:p-7 flex flex-col justify-between gap-2 ${borderClasses}`}
            >
              <p
                className={`type-h2 m-0 tabular-nums break-words whitespace-normal ${
                  cell.highlightMint
                    ? "text-[var(--mint-text)]"
                    : "text-[var(--text)]"
                }`}
              >
                <CountUpNumber
                  target={cell.target}
                  prefix={cell.prefix}
                  suffix={cell.suffix}
                />
              </p>
              <div>
                <p className="type-caption text-[var(--text-45)] m-0 font-medium">
                  {cell.label}
                </p>
                <p className="type-detail text-[var(--text-45)] m-0 mt-0.5 line-clamp-2">
                  {cell.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
