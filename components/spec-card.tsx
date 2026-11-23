import React from "react";
import {
  GOVERNOR_CONTROL_GROUPS,
  GOVERNOR_CORROBORATION_NOTE,
} from "@/lib/governor-spec";

export function SpecCard() {
  return (
    <div className="surface-card overflow-hidden">
      <div className="px-5 sm:px-6 py-4 hairline-b flex flex-wrap items-center justify-between gap-2 bg-[var(--slate)]">
        <div className="flex items-center gap-2.5">
          <span
            className="inline-block w-2 h-2 rounded-full bg-[var(--mint)]"
            aria-hidden="true"
          />
          <a
            href="https://github.com/harrisonojek/softpip-enforcer/blob/main/governor.py"
            rel="noopener noreferrer"
            target="_blank"
            className="type-micro uppercase text-[var(--text)] hover:text-[var(--mint-text)] transition-colors no-underline"
          >
            Guardian Spec · governor.py
          </a>
        </div>
        <span className="type-micro text-[var(--text-45)]">
          Enforced in can_trade() gate
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        {GOVERNOR_CONTROL_GROUPS.map((group, groupIdx) => (
          <div
            key={group.id}
            className={`flex flex-col ${
              groupIdx > 0 ? "border-t lg:border-t-0 lg:border-l border-[var(--rule)]" : ""
            }`}
          >
            <div className="px-5 sm:px-6 py-3.5 bg-[var(--slate)]/50 hairline-b flex flex-col gap-0.5">
              <h3 className="type-small font-semibold uppercase tracking-wider text-[var(--mint-text)] m-0">
                {group.heading}
              </h3>
              <p className="type-micro text-[var(--text-45)] m-0">
                {group.summary}
              </p>
            </div>

            <div className="flex flex-col divide-y divide-[var(--rule)]">
              {group.controls.map((item) => (
                <div
                  key={item.parameter}
                  className="min-h-[44px] px-5 py-4 sm:p-6 flex flex-col justify-center gap-1"
                >
                  <span className="type-micro uppercase text-[var(--text-45)] block">
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
        ))}
      </div>

      <div className="px-5 sm:px-6 py-3.5 bg-[var(--slate)]/40 hairline-t">
        <p className="type-small text-[var(--text-70)] m-0">
          {GOVERNOR_CORROBORATION_NOTE}
        </p>
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
        <p className="type-h3 m-0" style={{ color: "var(--rust)" }}>
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
