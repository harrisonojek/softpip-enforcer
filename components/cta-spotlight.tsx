import React from "react";

interface CtaSpotlightProps {
  children: React.ReactNode;
  className?: string;
}

export function CtaSpotlight({ children, className = "" }: CtaSpotlightProps) {
  return (
    <div
      className={`relative surface-card isolate overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -top-24 -translate-x-1/2 h-[480px] w-[640px] max-w-full rounded-full z-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(138, 245, 206, 0.12) 0%, rgba(8, 11, 15, 0) 70%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-start gap-6 w-full">
        {children}
      </div>
    </div>
  );
}
