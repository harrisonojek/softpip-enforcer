import React from "react";

export function HeroBloom() {
  return (
    <div
      aria-hidden="true"
      className="absolute top-6 left-1/2 -translate-x-1/2 w-[760px] max-w-[95vw] h-[460px] pointer-events-none z-0 overflow-visible"
    >
      <div
        className="w-full h-full hero-bloom-drift rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(138, 245, 206, 0.08) 0%, rgba(138, 245, 206, 0.035) 55%, rgba(8, 11, 15, 0) 100%)",
        }}
      />
    </div>
  );
}

export function HeroHeadline({ words }: { words?: string[] }) {
  if (words && words.length > 0) {
    return (
      <h1 className="type-display m-0 max-w-[22ch]">
        {words.map((w, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && " "}
            <span className={w === "rules," ? "text-[var(--mint-text)]" : undefined}>{w}</span>
          </React.Fragment>
        ))}
      </h1>
    );
  }

  return (
    <h1 className="type-display m-0 max-w-[22ch]">
      Trade with <span className="text-[var(--mint-text)]">rules,</span> not feelings.
    </h1>
  );
}
