import React from "react";

export function StatusLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`type-micro font-mono py-2 px-4 rounded-full border border-[var(--line)] bg-[var(--navy)] text-[var(--text-70)] flex items-center justify-center text-center gap-2 max-w-fit mx-auto ${className}`}
      role="status"
    >
      <span
        className="w-1.5 h-1.5 rounded-full bg-[var(--mint)] shrink-0"
        aria-hidden="true"
      />
      <span>
        Live: the autopsy, the curriculum, the Enforcer. In build: community, research. Revenue: Deriv commission only.
      </span>
    </div>
  );
}
