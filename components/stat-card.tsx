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
    target: 32,
    suffix: "M",
    label: "lost",
    detail: "₦32M lost across unaudited positions in 2025.",
    highlightMint: true,
  },
  {
    target: 28,
    label: "trades a $10 account survives",
    detail: `At the $${GOVERNOR_SPEC.base_stake_usd.toFixed(2)} minimum stake floor with zero wins.`,
  },
  {
    target: GOVERNOR_SPEC.max_ladder_steps,
    label: "steps martingale can't complete",
    detail: `A 2× ladder demands $${GOVERNOR_SPEC.martingale_total_risk_usd.toFixed(2)} by step ${GOVERNOR_SPEC.max_ladder_steps}.`,
  },
  {
    target: 40,
    suffix: "%",
    label: "of revenue funds this",
    detail: "Monthly Deriv Options commission keeps every tool free.",
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
                  durationMs={500}
                />{" "}
                <span className="type-h3 text-[var(--text)] font-medium break-words whitespace-normal">
                  {cell.label}
                </span>
              </p>
              <p className="type-small text-[var(--text-70)] m-0 break-words whitespace-normal">
                {cell.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
