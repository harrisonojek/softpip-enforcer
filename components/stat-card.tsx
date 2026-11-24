"use client";

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

const DEFAULT_HOME_STATS: StatCell[] = [
  {
    prefix: "₦",
    target: 32.45,
    suffix: "M",
    label: "real loss that forced this",
    detail: "₦32,450,000 lost across 8 months of unaudited trades in 2025.",
    highlightMint: true,
  },
  {
    target: 28,
    label: "days to account liquidation",
    detail: `A $10 account survives 28 flat losses at $${GOVERNOR_SPEC.base_stake_usd.toFixed(2)}; martingale wipes it in 5.`,
  },
  {
    prefix: "$",
    target: GOVERNOR_SPEC.martingale_total_risk_usd,
    label: "5-step 2× martingale risk",
    detail: `A 2× ladder demands $${GOVERNOR_SPEC.martingale_total_risk_usd.toFixed(2)} on a $10 account (complete liquidation on step 5).`,
  },
  {
    prefix: "$",
    target: 0,
    label: "100% free & open-source",
    detail: "No VIP signals, no course sales, zero subscriptions. Free forever under MIT.",
  },
];

export function StatRow({ stats = DEFAULT_HOME_STATS }: { stats?: StatCell[] }) {
  return (
    <div className="surface-card overflow-hidden">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {stats.map((cell, idx) => {
          const borderClasses = [
            idx % 2 === 1 ? "border-l border-[var(--rule)]" : "",
            idx >= 2 ? "max-lg:border-t max-lg:border-[var(--rule)]" : "",
            idx === 2 ? "lg:border-l lg:border-[var(--rule)]" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div
              key={cell.label}
              className={`min-h-[96px] min-w-0 p-4 sm:p-6 lg:p-7 flex flex-col justify-between gap-2 ${borderClasses}`}
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
