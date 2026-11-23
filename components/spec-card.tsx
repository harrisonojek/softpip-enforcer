import React from "react";

export interface GuardianRuleItem {
  parameter: string;
  limit: string;
  enforcement: string;
}

export const GUARDIAN_SPECS: GuardianRuleItem[] = [
  {
    parameter: "Max stake",
    limit: "$0.35 flat",
    enforcement: "Hard floor default; rejects oversized manual overrides.",
  },
  {
    parameter: "Recovery ladder",
    limit: "1.3× ladder capped at 5 steps",
    enforcement: "Resets to $0.35 base after step 5 or any win.",
  },
  {
    parameter: "Daily loss cap",
    limit: "$1.00",
    enforcement: "Locks execution until 00:00 UTC rollover.",
  },
  {
    parameter: "Session trade cap",
    limit: "40 trades per session",
    enforcement: "Prevents over-trading through low-volatility drift.",
  },
  {
    parameter: "Loss cool-off",
    limit: "15 min cool-off after 3 losses",
    enforcement: "Pauses socket order dispatch for 900 seconds.",
  },
  {
    parameter: "Drawdown stop",
    limit: "20% drawdown stop",
    enforcement: "Halts session if equity drops 20% from peak.",
  },
  {
    parameter: "Balance floor",
    limit: "$2.00 balance floor",
    enforcement: "Refuses new contracts when equity reaches $2.00.",
  },
  {
    parameter: "Kill switch",
    limit: "Disconnect, token error, margin error",
    enforcement: "Immediate process termination and Telegram alert.",
  },
  {
    parameter: "Session timer",
    limit: "60 min session timer",
    enforcement: "Auto-stops run at 3,600 seconds elapsed.",
  },
];

export function SpecCard() {
  return (
    <div className="surface-card overflow-hidden">
      <div className="px-6 py-4 hairline-b flex flex-wrap items-center justify-between gap-2 bg-[var(--slate)]">
        <div className="flex items-center gap-2.5">
          <span
            className="inline-block w-2 h-2 rounded-full bg-[var(--mint)]"
            aria-hidden="true"
          />
          <span className="type-micro uppercase text-[var(--text)]">
            Guardian Spec · governor.py
          </span>
        </div>
        <span className="type-micro text-[var(--text-45)]">
          Enforced in can_trade() gate
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {GUARDIAN_SPECS.map((item, idx) => (
          <div
            key={item.parameter}
            className={`p-5 sm:p-6 flex flex-col gap-1 border-b border-[var(--rule)] ${
              idx % 3 !== 0 ? "lg:border-l lg:border-[var(--rule)]" : ""
            } ${idx % 2 !== 0 ? "sm:max-lg:border-l sm:max-lg:border-[var(--rule)]" : ""}`}
          >
            <span className="type-micro uppercase text-[var(--text-45)]">
              {item.parameter}
            </span>
            <p className="type-h3 m-0 text-[var(--text)] tabular-nums">
              {item.limit}
            </p>
            <p className="type-small text-[var(--text-70)] m-0">
              {item.enforcement}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RustCaveatCard() {
  return (
    <div
      className="rounded-[14px] p-5 sm:p-6 border"
      style={{
        backgroundColor: "rgba(232, 115, 90, 0.07)",
        borderColor: "rgba(232, 115, 90, 0.32)",
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p
          className="type-h3 m-0"
          style={{ color: "var(--rust)" }}
        >
          No edge over the market. An edge over you.
        </p>
        <span
          className="type-micro uppercase"
          style={{ color: "var(--rust)" }}
        >
          Risk Governor Caveat
        </span>
      </div>
      <p className="type-small text-[var(--text-70)] m-0 mt-1.5 prose-col">
        The Enforcer does not predict ticks or guarantee profitable sessions. It
        exists solely to enforce stake ceilings, cool-offs, and daily loss caps
        when impulse tells you to double down.
      </p>
    </div>
  );
}
