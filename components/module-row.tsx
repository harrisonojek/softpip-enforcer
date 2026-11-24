import React from "react";
import Link from "next/link";

export interface CurriculumModuleSummary {
  index: string;
  slug: string;
  title: string;
  outcome: string;
  duration: string;
}

export const CURRICULUM_MODULES_PREVIEW: CurriculumModuleSummary[] = [
  {
    index: "01",
    slug: "01-the-autopsy-line-by-line",
    title: "The autopsy, line by line",
    outcome: "Map the exact structural errors behind a ₦32M drawdown before placing a trade.",
    duration: "18 min",
  },
  {
    index: "02",
    slug: "02-how-synthetic-indices-are-actually-generated",
    title: "How synthetic indices are actually generated",
    outcome: "Understand cryptographic RNG feeds, fixed volatility steps, and why chart patterns fail.",
    duration: "15 min",
  },
  {
    index: "03",
    slug: "03-risk-of-ruin-and-drawdown-math",
    title: "Risk of ruin and drawdown math",
    outcome: "Calculate streak probabilities and recovery asymmetry across 100-trade samples.",
    duration: "20 min",
  },
  {
    index: "04",
    slug: "04-position-sizing-from-10-up",
    title: "Position sizing, from $10 up",
    outcome: "Work around the $0.35 minimum stake constraint when your starting equity is $10.",
    duration: "16 min",
  },
];

export function ModuleRow({ module }: { module: CurriculumModuleSummary }) {
  return (
    <Link
      href={`/academy/${module.slug}`}
      className="surface-card-interactive p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-underline group"
    >
      <div className="flex items-start gap-4 sm:gap-5">
        <span
          className="type-small font-medium tabular-nums text-[var(--text-45)] group-hover:text-[var(--mint-text)] transition-colors pt-0.5 shrink-0"
          style={{ fontFamily: "var(--font-geist), system-ui, sans-serif" }}
        >
          {module.index}
        </span>
        <div className="flex flex-col gap-1">
          <h3 className="type-h3 m-0 text-[var(--text)] group-hover:text-[var(--mint-text)] transition-colors">
            {module.title}
          </h3>
          <p className="type-small text-[var(--text-70)] m-0 prose-col">
            {module.outcome}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4 pl-8 sm:pl-0 shrink-0">
        <span className="type-micro text-[var(--text-45)] tabular-nums">
          {module.duration}
        </span>
        <span
          className="type-small text-[var(--text-45)] group-hover:text-[var(--mint-text)] transition-colors"
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </Link>
  );
}
