import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { EquityRiskTable } from "@/components/equity-risk-table";
import { GOVERNOR_SPEC } from "@/lib/governor-spec";
import { buildMetadata, DERIV_AFFILIATE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Account Scaling Guide: From $10 Trial to $100 Institutional — SoftPip",
  description:
    "Four disciplined capital stages to scale Deriv synthetic index trading without blowing accounts: $10 trial, $30 buffer, $50 transition, and $100 institutional 1% risk.",
  path: "/scaling",
});

const STAGES = [
  {
    stage: "01",
    title: "Stage 1: The $10 Trial Account",
    equity: "$10.00",
    baseStake: "$0.35 (3.5% of equity)",
    ladderRisk: "$3.17 (31.7% total)",
    purpose: "Rule proof & psychological hardening",
    body: "You begin here. The purpose of Stage 1 is NOT to get rich; it is to prove you can execute 200 consecutive trades through The Enforcer without overriding a single limit. At $10, Deriv's $0.35 minimum contract floor represents 3.5% per trade. That is aggressive exposure, which is why 2x martingale wipes it out instantly. The 1.3x ladder and 15-minute cool-off keep your $10 alive.",
    badge: "Trial Gate: 200 demo trades required",
  },
  {
    stage: "02",
    title: "Stage 2: The $30 Buffer",
    equity: "$30.00",
    baseStake: "$0.35 (1.17% of equity)",
    ladderRisk: "$3.17 (10.6% total)",
    purpose: "Cool-off tolerance & regime survival",
    body: "At $30, the single contract floor drops to 1.17% of equity. Your account now possesses the financial buffer to absorb three complete 3-loss cool-offs without falling below the $2.00 kill-switch floor. The bot operates with breathing room, allowing natural positive expectancy to compound.",
    badge: "Buffer Zone",
  },
  {
    stage: "03",
    title: "Stage 3: The $50 Transition",
    equity: "$50.00",
    baseStake: "$0.35 (0.70% of equity)",
    ladderRisk: "$3.17 (6.3% total)",
    purpose: "Sub-1% base contract exposure",
    body: "At $50, your base trade risk crosses beneath the institutional 1% mark (0.70% per contract). A full 5-step loss streak risks only 6.3% of capital. Drawdown stops and daily loss caps become operative cushions rather than frequent triggers.",
    badge: "Pre-Institutional",
  },
  {
    stage: "04",
    title: "Stage 4: $100+ Institutional Scaling",
    equity: "$100.00+",
    baseStake: "1% equity sizing ($1.00+)",
    ladderRisk: "3.2% of account equity",
    purpose: "Dynamic percent sizing & institutional risk",
    body: "The institutional threshold. At $100, The Enforcer unlocks percent sizing mode (`sizing_mode: 'percent'`). Every contract is dynamically sized to exactly 1.0% of live account equity, and the entire 5-step recovery ladder risks just 3.2% of bankroll. You trade with the same risk parameters as institutional quantitative desks.",
    badge: "Institutional Mode",
  },
];

export default function ScalingPage() {
  return (
    <div className="section-pad min-h-screen">
      <div className="container-shell flex flex-col gap-12">
        <Reveal className="flex flex-col gap-4 max-w-[800px]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
            <span className="type-micro uppercase text-[var(--mint-text)] tracking-wider">
              Capital Progression · Risk Architecture
            </span>
          </div>

          <h1 className="type-h1 m-0">The 4-stage scaling roadmap.</h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            Never fund $100 on day one. Start at $10 to prove you can honor automated limits,
            then graduate step-by-step to institutional 1% risk management.
          </p>
        </Reveal>

        {/* Equity Risk Table */}
        <Reveal delayMs={70} className="max-w-[860px]">
          <EquityRiskTable />
        </Reveal>

        {/* The 4 Stages */}
        <div className="flex flex-col gap-6 max-w-[860px]">
          {STAGES.map((s, idx) => (
            <Reveal key={s.stage} delayMs={idx * 60}>
              <div className="surface-card p-6 sm:p-8 rounded-2xl flex flex-col gap-4 border border-[var(--border)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-[var(--mint-text)] font-bold">
                      {s.stage}
                    </span>
                    <h3 className="type-h3 m-0 text-[var(--foreground)]">{s.title}</h3>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--mint-text)] self-start sm:self-auto">
                    {s.badge}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-[var(--muted)]">
                  <div>
                    <span className="block text-[var(--text-45)]">Equity Target</span>
                    <span className="font-semibold text-[var(--foreground)]">{s.equity}</span>
                  </div>
                  <div>
                    <span className="block text-[var(--text-45)]">Base Stake</span>
                    <span className="font-semibold text-[var(--foreground)]">{s.baseStake}</span>
                  </div>
                  <div>
                    <span className="block text-[var(--text-45)]">Full Ladder Exposure</span>
                    <span className="font-semibold text-[var(--foreground)]">{s.ladderRisk}</span>
                  </div>
                </div>

                <p className="type-body text-[var(--text-70)] m-0 text-sm leading-relaxed">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mandatory KYC Step */}
        <Reveal delayMs={240} className="max-w-[860px]">
          <div className="p-6 sm:p-8 rounded-2xl border border-[var(--rust)]/30 bg-[var(--rust)]/5 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--rust)]" aria-hidden="true" />
              <h3 className="type-h3 m-0 text-[var(--rust)]">
                Mandatory Deriv KYC Verification Before Stage 4
              </h3>
            </div>
            <p className="type-body text-[var(--text-70)] m-0 text-sm leading-relaxed">
              <strong>Do not scale past $50 without completing Full KYC verification on Deriv.</strong> Deriv permits low-tier deposits without passport or national identity verification, but automatically blocks withdrawals once account volume or balance crosses standard anti-money-laundering thresholds.
            </p>
            <ul className="text-xs text-[var(--text-70)] space-y-1.5 pl-5 list-disc">
              <li>Submit National Identity Number (NIN), Voter&apos;s Card, or International Passport.</li>
              <li>Submit recent Bank Statement or Utility Bill with identical residential address.</li>
              <li>Wait for verified checkmark in Deriv account settings before funding past $50.</li>
            </ul>
          </div>
        </Reveal>

        {/* Future Managed VPS Hosting Slot */}
        <Reveal delayMs={300} className="max-w-[860px]">
          <div className="surface-card p-6 sm:p-8 rounded-2xl border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 opacity-75">
            <div className="flex flex-col gap-1.5 max-w-[540px]">
              <div className="flex items-center gap-2">
                <span className="type-micro uppercase text-[var(--text-45)] font-mono">
                  Roadmap · Optional Hosting
                </span>
              </div>
              <h4 className="type-h3 m-0 text-[var(--foreground)]">
                Managed Enforcer Cloud (Coming Soon)
              </h4>
              <p className="type-small text-[var(--text-70)] m-0">
                For traders who don&apos;t want to maintain a private Linux VPS or Docker container, a managed cloud instance with zero latency to Deriv European servers will be available in 2026.
              </p>
            </div>
            <span className="text-xs font-mono text-[var(--muted)] px-3 py-1.5 rounded-lg border border-[var(--border)] shrink-0 self-start sm:self-auto">
              In Development
            </span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
