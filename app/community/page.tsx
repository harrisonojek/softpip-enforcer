import React from "react";
import { Reveal } from "@/components/reveal";
import { buildMetadata, TELEGRAM_COMMUNITY_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Community — SoftPip",
  description:
    "An open community for $10 beginners and systematic traders on Deriv. Post your first five trades publicly, audit losses as readily as wins, and trade with rules.",
  path: "/community",
});

interface HouseRule {
  number: string;
  title: string;
  rationale: string;
  enforcement: string;
}

const HOUSE_RULES: readonly HouseRule[] = [
  {
    number: "01",
    title: "Zero signals or trade copying",
    rationale:
      "Discussion of entry predictions, 'sure bets', copy-trading bots, or speculative calls is strictly prohibited. SoftPip exists to eliminate discretionary hope and build systematic independence.",
    enforcement:
      "Instant ban. No warnings. Every trader must execute their own mathematical rules or rely on audited code filters.",
  },
  {
    number: "02",
    title: "Verification before assertion (losses posted as readily as wins)",
    rationale:
      "Claims regarding strategy profitability or performance must be backed by reproducible logs: raw journal records (`journal.db`), CSV exports, or broker statements. Losses are shared openly for analysis.",
    enforcement:
      "Unverified P&L screenshots without execution logs or governor parameter disclosures are removed immediately.",
  },
  {
    number: "03",
    title: "Risk hygiene is mandatory",
    rationale:
      "We do not celebrate Martingale doubling, revenge trading streaks, or oversized margin allocations. A red month executed in 100% compliance with governor cool-offs is an engineering success.",
    enforcement:
      "Promoting unconstrained Martingale progression or bypassing balance floors leads to immediate community suspension.",
  },
];

export default function CommunityPage() {
  return (
    <div className="section-pad min-h-screen">
      <div className="container-shell flex flex-col gap-12">
        {/* Header */}
        <Reveal className="flex flex-col gap-4 max-w-[800px]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
            <span className="type-micro uppercase text-[var(--mint-text)] tracking-wider">
              Pillar 04 · Trader Community
            </span>
          </div>

          <h1 className="type-h1 m-0">Community.</h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            Whether you are funding your very first $10 account or compiling automated execution gates in Python, this is a room built for transparency. Post your first five trades publicly, share losses as readily as wins, and build unbreakable risk habits without signal-room noise.
          </p>
        </Reveal>

        {/* What the Channel is For */}
        <Reveal delayMs={70} className="surface-card p-6 sm:p-8 rounded-2xl flex flex-col gap-5 max-w-[860px]">
          <h2 className="type-h2 m-0 text-[var(--foreground)] text-xl">
            What the Telegram Community is For
          </h2>

          <div className="flex flex-col gap-3 text-sm text-[var(--text-70)] leading-relaxed">
            <p className="m-0">
              The SoftPip Telegram channel is built for anyone trading synthetic index options with rules instead of emotion. If you are starting with just $10, this is the place to post your very first five trades publicly, ask questions without fear of being pitched a paid mentorship, and learn how to audit your losses with complete honesty.
            </p>
            <p className="m-0">
              We keep the technical bar high—members review SQLite execution journals (<code>journal.db</code>), audit losing weeks using the 4-week framework, and troubleshoot Docker container setups for <strong>The Enforcer</strong>—but the door is wide open for beginners taking their first disciplined steps.
            </p>
            <p className="m-0 text-[var(--foreground)] font-medium">
              Here, a trader who honors the $1.00 daily loss floor on a difficult red day receives more respect than someone posting an unverified 100× gain. Losses are posted as readily as wins. Zero signals, zero hype, zero hidden upsells.
            </p>
          </div>

          <div className="pt-2">
            <a
              href={TELEGRAM_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-mint inline-flex items-center gap-2 text-sm py-3 px-6"
            >
              Join Telegram Community →
            </a>
          </div>
        </Reveal>

        {/* Three House Rules */}
        <Reveal delayMs={140} className="flex flex-col gap-6 max-w-[860px]">
          <div>
            <h2 className="type-h2 m-0 text-[var(--foreground)] text-xl">
              Three Non-Negotiable House Rules
            </h2>
            <p className="type-small text-[var(--text-70)] m-0 mt-1">
              Active membership requires unconditional compliance with our three operating principles.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {HOUSE_RULES.map((rule) => (
              <div
                key={rule.number}
                className="surface-card p-6 rounded-xl flex flex-col sm:flex-row gap-5 items-start"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--slate)] border border-[var(--rule)] flex items-center justify-center shrink-0">
                  <span className="font-mono text-xs font-semibold text-[var(--mint-text)]">
                    {rule.number}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="type-h3 m-0 text-[var(--foreground)] text-base font-semibold">
                    Rule {rule.number}: {rule.title}
                  </h3>
                  <p className="type-body text-[var(--text-70)] m-0 text-sm leading-relaxed">
                    {rule.rationale}
                  </p>
                  <p className="type-micro text-[var(--text-45)] m-0 font-mono pt-1">
                    <strong className="text-[var(--rust)]">Enforcement:</strong> {rule.enforcement}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Final CTA Bar */}
        <Reveal delayMs={200} className="p-6 rounded-2xl border border-[var(--mint)]/20 bg-[var(--surface)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-[860px]">
          <div className="flex flex-col gap-1">
            <p className="type-body font-semibold text-[var(--foreground)] m-0 text-sm">
              Ready to submit your first clean 200 demo trades?
            </p>
            <p className="type-small text-[var(--text-70)] m-0 text-xs">
              Direct access to maintainers, peer journal reviews, and real-time release alerts.
            </p>
          </div>
          <a
            href={TELEGRAM_COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-mint text-xs py-2.5 px-5 shrink-0"
          >
            Enter Community Group →
          </a>
        </Reveal>
      </div>
    </div>
  );
}
