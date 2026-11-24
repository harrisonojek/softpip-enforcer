import React from "react";
import { Reveal } from "@/components/reveal";
import { buildMetadata, TELEGRAM_COMMUNITY_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Community — SoftPip",
  description:
    "Private engineering and risk governance community for systematic Deriv options traders. Zero signals, mandatory log auditing, and strict house rules.",
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
    title: "Verification before assertion",
    rationale:
      "Claims regarding strategy profitability, win rates, or edge must be backed by reproducible evidence: raw SQLite journal logs (`journal.db`), CSV exports, or broker contract statements.",
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
            A private engineering circle for systematic Deriv traders dedicated to code-governed risk, empirical journal audits, and tilt prevention.
          </p>
        </Reveal>

        {/* What the Channel is For */}
        <Reveal delayMs={70} className="surface-card p-6 sm:p-8 rounded-2xl flex flex-col gap-5 max-w-[860px]">
          <h2 className="type-h2 m-0 text-[var(--foreground)] text-xl">
            What the Telegram Community is For
          </h2>

          <div className="flex flex-col gap-3 text-sm text-[var(--text-70)] leading-relaxed">
            <p className="m-0">
              The SoftPip Telegram channel is not a signal group, trading chatroom, or speculative discussion forum. It exists exclusively to support traders who deploy mechanical risk controls and run <strong>The Enforcer</strong> on synthetic index options.
            </p>
            <p className="m-0">
              Within the community, members share and review SQLite execution journals (<code>journal.db</code>), audit losing months using the 4-week framework, troubleshoot VPS and Docker container setups, and propose improvements to open-source risk governor state machines.
            </p>
            <p className="m-0 text-[var(--foreground)] font-medium">
              If you are looking for trading signals, secret indicators, or overnight wealth, this group will disappoint you. If you want engineering accountability to never blow an account again, welcome.
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
