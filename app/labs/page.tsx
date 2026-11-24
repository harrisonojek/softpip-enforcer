import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Labs — SoftPip",
  description:
    "Open-source execution containers, risk calculators, and algorithmic safety tools for synthetic options traders.",
  path: "/labs",
});

interface ToolCard {
  title: string;
  badge: string;
  status: "live" | "beta" | "planned";
  description: string;
  href: string;
  cta: string;
  specs: readonly string[];
}

const LABS_TOOLS: readonly ToolCard[] = [
  {
    title: "The Enforcer",
    badge: "v0.1.0 · Risk Governor",
    status: "live",
    description:
      "Autonomous Python 3.13 execution container and strict 8-step risk governor for Deriv Synthetic Options. Gated by session timers, cool-off disconnects, and daily loss floors.",
    href: "/bot",
    cta: "Inspect Enforcer & Setup →",
    specs: ["Python 3.13", "Async WebSocket", "Docker Compose", "SQLite WAL Journal"],
  },
  {
    title: "Risk of Ruin Calculator",
    badge: "Monte Carlo Engine",
    status: "live",
    description:
      "Simulate 5,000 multi-session trading trials across 200 consecutive orders. Contrasts 2× Martingale liquidation against SoftPip's capped 1.3× recovery ladder.",
    href: "/calculator",
    cta: "Launch Ruin Simulator →",
    specs: ["5,000 Trial Runs", "Empirical Payouts", "Dynamic Win Rate", "Ladder Comparison"],
  },
  {
    title: "Martingale Calculator",
    badge: "5-Step Progression Audit",
    status: "live",
    description:
      "Step-by-step mathematical breakdown showing why unconstrained doubling guarantees ruin on small balances and how The Enforcer caps loss exposure to preserve equity.",
    href: "/martingale-calculator",
    cta: "Audit 5-Step Math →",
    specs: ["$10 Account Benchmark", "31.7% Max 5-Step Risk", "2-Loss Cool-Off", "Zero Wipeout"],
  },
];

export default function LabsPage() {
  return (
    <div className="section-pad min-h-screen">
      <div className="container-shell flex flex-col gap-12">
        {/* Header */}
        <Reveal className="flex flex-col gap-4 max-w-[800px]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
            <span className="type-micro uppercase text-[var(--mint-text)] tracking-wider">
              Pillar 02 · SoftPip Labs
            </span>
          </div>

          <h1 className="type-h1 m-0">Labs.</h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            Open-source execution containers, risk calculators, and algorithmic safety tools for synthetic options traders.
          </p>
        </Reveal>

        {/* Three Tool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LABS_TOOLS.map((tool, idx) => (
            <Reveal
              key={tool.title}
              delayMs={idx * 70}
              className="surface-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="type-micro font-mono text-[var(--mint-text)]">
                    {tool.badge}
                  </span>
                  <span className="type-micro px-2 py-0.5 rounded-full bg-[var(--mint)]/10 text-[var(--mint-text)] border border-[var(--mint)]/30 font-medium">
                    {tool.status}
                  </span>
                </div>

                <h2 className="type-h2 m-0 text-[var(--foreground)] text-xl">
                  {tool.title}
                </h2>

                <p className="type-body text-[var(--text-70)] m-0 text-sm leading-relaxed">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tool.specs.map((spec) => (
                    <span
                      key={spec}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--slate)] text-[var(--text-70)] border border-[var(--rule)]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--rule)]">
                <Link
                  href={tool.href}
                  className="btn-mint w-full text-center text-sm py-2.5 block"
                >
                  {tool.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
