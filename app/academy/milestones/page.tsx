import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { buildMetadata, DERIV_AFFILIATE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "The $10 Ladder — Account Milestones | SoftPip",
  description:
    "A $10 account dies in about 28 trades at minimum stake. The ladder gets you past that. Four operational rungs with unlocks and honest failure notes.",
  path: "/academy/milestones",
});

const MILESTONE_RUNGS = [
  {
    rung: "01",
    title: "Fund $10 → first 5 trades logged",
    target: "Fund $10 through the link and log your first 5 trades strictly at $0.35 flat stake.",
    unlocks: [
      "Access to SoftPip Trade Journal logging spreadsheet",
      "Private Telegram community entry and trade log verification",
      "Baseline sanity confirmation: 0 skipped stops, 0 manual overrides",
    ],
    failureNote:
      "At $10, the $0.35 minimum stake is 3.5% of total capital. Impatience and doubling stakes after loss 1 or loss 2 will wipe the account in under 30 minutes.",
  },
  {
    rung: "02",
    title: "Reach $50 → preset config",
    target: "Grow balance from $10 to $50 using flat $0.35 staking and The Enforcer's default daily limits.",
    unlocks: [
      "1.3× ladder preset config unlock in config.yaml",
      "Optimized Volatility 75 (1s) timing profiles",
      "Stake ceiling raised to $0.46 base with max $1.50 daily loss cap",
    ],
    failureNote:
      "Traders frequently increase base stake prematurely to $1.50 or $2.00 here, resetting their risk back to a dangerous 3%–4% per trade instead of letting margin breathe.",
  },
  {
    rung: "03",
    title: "Reach $100 → 1-on-1 review",
    target: "Cross the $100 milestone while maintaining an execution compliance ratio of 100%.",
    unlocks: [
      "30-minute direct trade journal audit with Oghenerioborue Harrison Ekuetafia",
      "Custom risk governor parameter tuning for multi-session execution",
      "Early invitation to become a SoftPip Master Partner affiliate",
    ],
    failureNote:
      "Euphoria and overconfidence. Traders feel they have 'figured out the market' and introduce manual discretionary trades on MT5 that bypass The Enforcer.",
  },
  {
    rung: "04",
    title: "Hold $100 for 30 days → operator badge",
    target: "Maintain account balance at or above $100 across 30 consecutive calendar days without liquidation.",
    unlocks: [
      "Certified SoftPip Operator badge and directory listing",
      "Master Partner network access with 7.5% override tier",
      "Production multi-instance VPS deployment blueprint",
    ],
    failureNote:
      "Boredom during low-volatility regimes. Breaking the 40-trade daily session cap to 'make things happen' erodes equity through dealer spread friction.",
  },
];

export default function MilestonesPage() {
  return (
    <div className="section-pad min-h-screen">
      <div className="container-shell flex flex-col gap-14">
        {/* Header */}
        <Reveal className="flex flex-col gap-5 max-w-[800px]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
            <span className="type-micro uppercase text-[var(--mint-text)] tracking-wider">
              Progression Ladder · Capital Preservation
            </span>
          </div>

          <h1 className="type-h1 m-0">The $10 ladder.</h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            A $10 account dies in about 28 trades at minimum stake. The ladder gets you past that.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={DERIV_AFFILIATE_URL}
              rel="sponsored noopener"
              target="_blank"
              className="btn-mint"
            >
              Open $10 account
            </a>
            <Link href="/academy" className="btn-ghost">
              Read curriculum
            </Link>
          </div>
        </Reveal>

        {/* The Four Rung Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MILESTONE_RUNGS.map((rung, idx) => (
            <Reveal key={rung.rung} delayMs={idx * 70}>
              <div className="surface-card p-6 sm:p-8 h-full flex flex-col justify-between gap-6 border-[var(--line)]">
                <div className="flex flex-col gap-4">
                  {/* Rung Badge & Title */}
                  <div className="flex items-start justify-between gap-3">
                    <span className="type-h3 font-mono font-medium text-[var(--mint-text)] px-2.5 py-1 rounded bg-[var(--slate)] border border-[var(--line)] tabular-nums">
                      RUNG {rung.rung}
                    </span>
                    <span className="type-micro uppercase text-[var(--text-45)]">
                      Level {idx + 1}
                    </span>
                  </div>

                  <h2 className="type-h3 m-0 text-[var(--text)]">
                    {rung.title}
                  </h2>

                  <p className="type-small text-[var(--text-70)] m-0">
                    {rung.target}
                  </p>

                  {/* What Unlocks */}
                  <div className="pt-2 flex flex-col gap-2">
                    <span className="type-micro uppercase text-[var(--mint-text)] font-semibold">
                      What Unlocks:
                    </span>
                    <ul className="list-disc pl-5 space-y-1.5 text-[var(--text-70)] type-small m-0">
                      {rung.unlocks.map((u, i) => (
                        <li key={i}>{u}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Honest Failure Note */}
                <div
                  className="rounded-[10px] p-4 border flex flex-col gap-1 mt-2"
                  style={{
                    backgroundColor: "rgba(232, 115, 90, 0.08)",
                    borderColor: "rgba(232, 115, 90, 0.35)",
                  }}
                >
                  <span
                    className="type-micro uppercase font-semibold"
                    style={{ color: "var(--rust)" }}
                  >
                    Honest failure risk at this size:
                  </span>
                  <p className="type-small text-[var(--text)] m-0 leading-relaxed">
                    {rung.failureNote}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom Callout */}
        <Reveal>
          <div className="surface-card p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-[var(--rule)]">
            <div className="flex flex-col gap-2">
              <span className="type-micro uppercase text-[var(--mint-text)] font-semibold">
                Start at Rung 01
              </span>
              <h3 className="type-h3 m-0 text-[var(--text)]">
                Ready to fund your $10 test account?
              </h3>
              <p className="type-small text-[var(--text-70)] m-0 max-w-[50ch]">
                Segregate this capital on a dedicated sub-account and run The Enforcer on demo before executing live contracts.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={DERIV_AFFILIATE_URL}
                rel="sponsored noopener"
                target="_blank"
                className="btn-mint"
              >
                Open $10 account
              </a>
              <Link href="/labs/enforcer" className="btn-ghost">
                Inspect bot spec
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
