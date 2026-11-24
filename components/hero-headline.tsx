import React from "react";

const DEFAULT_HEADLINE_WORDS = [
  "Trade",
  "with",
  "rules,",
  "not",
  "feelings.",
];

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

export function HeroHeadline({ words = DEFAULT_HEADLINE_WORDS }: { words?: string[] }) {
  return (
    <h1 className="type-display m-0 max-w-[22ch]">
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <span
            className={word === "rules," ? "inline-block text-[var(--mint-text)]" : "inline-block"}
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </h1>
  );
}
