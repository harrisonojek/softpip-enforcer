"use client";

import React from "react";
import { CountUpNumber } from "@/components/reveal";

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
    detail: "At the $0.35 minimum stake floor with zero wins.",
  },
  {
    target: 5,
    label: "steps martingale can't complete",
    detail: "A 2× ladder demands $10.85 by step five.",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((cell, idx) => {
          const borderClasses = [
            idx > 0 ? "border-t border-[var(--rule)]" : "",
            idx % 2 === 1 ? "sm:border-l sm:border-[var(--rule)]" : "",
            idx < 2 ? "sm:border-t-0" : "",
            idx > 0 ? "lg:border-t-0 lg:border-l lg:border-[var(--rule)]" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div key={cell.label} className={`p-6 sm:p-7 flex flex-col gap-1.5 ${borderClasses}`}>
              <p
                className={`type-h2 m-0 tabular-nums ${
                  cell.highlightMint ? "text-[var(--mint-text)]" : "text-[var(--text)]"
                }`}
              >
                <CountUpNumber
                  target={cell.target}
                  prefix={cell.prefix}
                  suffix={cell.suffix}
                  durationMs={500}
                />{" "}
                <span className="type-h3 text-[var(--text)] font-medium">
                  {cell.label}
                </span>
              </p>
              <p className="type-small text-[var(--text-70)] m-0">
                {cell.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
