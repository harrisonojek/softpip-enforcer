import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SpecCard, RustCaveatCard } from "@/components/spec-card";
import { EquityRiskTable } from "@/components/equity-risk-table";
import { AffiliateLink } from "@/components/affiliate-link";
import { GOVERNOR_SPEC } from "@/lib/governor-spec";
import { buildMetadata, DERIV_AFFILIATE_URL, GITHUB_REPO_URL, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "The Enforcer — Open Source Risk Governor | SoftPip",
  description:
    "Most bots optimise entries. This one optimises survival. Open source, MIT, free risk governor for $10 Deriv accounts.",
  path: "/bot",
});

const TELEGRAM_COMMANDS = [
  {
    command: "/start",
    description: "Launch execution session and connect to Deriv WebSocket.",
    output: `Governor active · Stake $${GOVERNOR_SPEC.base_stake_usd.toFixed(2)} · Daily loss floor $${GOVERNOR_SPEC.daily_loss_limit_floor_usd.toFixed(2)} (${Math.round(GOVERNOR_SPEC.daily_loss_limit_pct_of_equity * 100)}%)`,
  },
  {
    command: "/stop",
    description: "Immediately halt trading, close active proposals, and drop socket.",
    output: "Session stopped · Disconnected safely · 0 orders pending",
  },
  {
    command: "/pause",
    description: "Temporarily pause new order dispatch without resetting session stats.",
    output: "Governor paused · Timer running · Type /start to resume",
  },
  {
    command: "/status",
    description: "Inspect live account balance, current socket state, and uptime.",
    output: "Balance: $10.42 · Socket: CONNECTED · Latency: 42ms",
  },
  {
    command: "/stats",
    description: "Display lifetime execution stats, clean demo trade count, and net P/L.",
    output: `Total: 210 demo trades · Wins: 122 (58.1%) · Net: +$11.39 · Graduation: PASSED`,
  },
  {
    command: "/ladder",
    description: `Query current position in the ${GOVERNOR_SPEC.multiplier}× recovery ladder and next stake.`,
    output: `Ladder step: 1 of ${GOVERNOR_SPEC.max_ladder_steps} · Next stake: $${GOVERNOR_SPEC.base_stake_usd.toFixed(2)} · Reset at win, cool-off, or step ${GOVERNOR_SPEC.max_ladder_steps}`,
  },
  {
    command: "/export",
    description: "Generate and export local CSV of all journaled trades for open auditing.",
    output: "Journal exported to journal_export.csv (210 executions logged)",
  },
  {
    command: "/help",
    description: "Print Telegram command reference and operational instructions.",
    output: "SoftPip Enforcer commands: /start /stop /pause /status /stats /ladder /export /help",
  },
];

const INSTALL_STEPS = [
  {
    number: "01",
    title: "Register app ID at developers.deriv.com",
    body: "Navigate to Deriv Developer Portal, log in with your Deriv account, and register a new application. Note your numerical App ID (or use 1089 for shared test).",
    code: null,
  },
  {
    number: "02",
    title: "Create read-and-trade scoped API token",
    body: "In your Deriv account settings, generate a new API token. Check 'Read' and 'Trade' ONLY. Never check 'Payments' or 'Admin' scopes (The Enforcer fails-closed and refuses tokens with admin or payment capabilities).",
    code: null,
  },
  {
    number: "03",
    title: "Clone repository from GitHub",
    body: "Clone the official open-source repository to your local machine or VPS.",
    code: "git clone https://github.com/harrisonojek/softpip-enforcer.git\ncd softpip-enforcer",
  },
  {
    number: "04",
    title: "Configure credentials in config.yaml & .env",
    body: "Copy the template configuration file and supply your API token and Telegram Bot credentials.",
    code: "cp config.example.yaml config.yaml\ncp .env.example .env\nchmod 600 .env",
  },
  {
    number: "05",
    title: "Run 60-second dry run first, then deploy",
    body: "Verify governor constraints immediately in simulation mode. Live trading remains locked until 200 clean demo trades are recorded in journal.db.",
    code: "# 1. 60-second local dry run (zero risk, no credentials required):\npython main.py --dry-run --config config.example.yaml\n\n# 2. Production container launch (Docker Compose):\ndocker compose up -d\n\n# 3. Or native Python live mode (after 200 demo trades):\npython main.py --live --config config.yaml",
  },
];

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "The Enforcer",
  operatingSystem: "Linux, macOS, Windows, Docker",
  applicationCategory: "FinanceApplication",
  license: "https://opensource.org/licenses/MIT",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Open-source risk governor and trade executor for Deriv synthetic index accounts, designed for $10 account survival.",
  url: `${SITE_URL}/bot`,
};

export default function BotPage() {
  return (
    <div className="section-pad min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareJsonLd),
        }}
      />

      <div className="container-shell flex flex-col gap-14">
        {/* Header */}
        <Reveal className="flex flex-col gap-5 max-w-[800px]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
            <span className="type-micro uppercase text-[var(--mint-text)] tracking-wider">
              Open Source · MIT License · Free
            </span>
          </div>

          <h1 className="type-h1 m-0">The Enforcer.</h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            Most bots optimise entries. This one optimises survival. Open source, MIT, free.
          </p>

          {/* Status Banner */}
          <div className="p-4 rounded-xl border border-[var(--mint-text)]/30 bg-[var(--mint)]/5 text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="font-mono text-xs text-[var(--mint-text)] font-semibold uppercase tracking-wider block">
                Deployment Gate: Demo Only Until 200 Clean Trades
              </span>
              <span className="text-xs text-[var(--text-70)] block mt-0.5">
                The Enforcer strictly refuses live execution until 200 clean trades are logged in journal.db.
              </span>
            </div>
            <a
              href="https://github.com/harrisonojek/softpip-enforcer/releases/tag/v0.1.0"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-mint text-xs py-1.5 px-3 shrink-0"
            >
              Release v0.1.0 →
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={GITHUB_REPO_URL}
              rel="noopener noreferrer"
              target="_blank"
              className="btn-mint inline-flex items-center gap-2"
            >
              <span>View GitHub repository</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={`${GITHUB_REPO_URL}/blob/main/README.md`}
              rel="noopener noreferrer"
              target="_blank"
              className="btn-ghost"
            >
              Read README.md
            </a>
            <a
              href={`${GITHUB_REPO_URL}/blob/main/governor.py`}
              rel="noopener noreferrer"
              target="_blank"
              className="btn-ghost"
            >
              Inspect governor.py
            </a>
            <a
              href="https://github.com/harrisonojek/softpip-enforcer/releases/tag/v0.1.0"
              rel="noopener noreferrer"
              target="_blank"
              className="btn-ghost"
            >
              Release v0.1.0
            </a>
          </div>
        </Reveal>

        {/* Rust Caveat Card */}
        <Reveal delayMs={70}>
          <RustCaveatCard />
        </Reveal>

        {/* Guardian Spec Card */}
        <Reveal delayMs={140} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="type-micro uppercase text-[var(--text-45)]">
              Core Architecture
            </span>
            <h2 className="type-h2 m-0">Guardian Controls: Stake, Time, and Capital</h2>
            <p className="type-small text-[var(--text-70)] m-0 prose-col">
              Hardcoded risk constraints enforced inside <code>can_trade()</code> before any contract proposal is dispatched.
            </p>
          </div>
          <SpecCard />
        </Reveal>

        {/* Equity Risk Scaling Table */}
        <Reveal delayMs={180}>
          <EquityRiskTable />
        </Reveal>

        {/* Stake Ladder Comparison Table */}
        <Reveal className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="type-micro uppercase text-[var(--text-45)]">
              Capital Conservation
            </span>
            <h2 className="type-h2 m-0">Stake Ladder Comparison</h2>
            <p className="type-small text-[var(--text-70)] m-0 prose-col">
              Capital consumption and survival limits across a starting ${GOVERNOR_SPEC.min_live_balance_usd} bankroll.
            </p>
          </div>

          <div className="overflow-x-auto surface-card p-0 rounded-[14px]">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-[var(--slate)] hairline-b text-[var(--text)]">
                <tr>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Strategy</th>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Base Stake</th>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Escalation Rule</th>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Total Risked</th>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Survival on $10</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--rule)]">
                <tr className="hover:bg-[var(--slate)]/40 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-[var(--rust)] font-semibold">
                    Unconstrained 2.0× Martingale
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-[var(--text)]">$0.35</td>
                  <td className="px-5 py-4 type-small text-[var(--text-70)]">
                    Double stake after every loss (0.35 → 0.70 → 1.40 → 2.80 → 5.60)
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-[var(--rust)] font-semibold">
                    ${GOVERNOR_SPEC.martingale_total_risk_usd.toFixed(2)} across 5 steps
                  </td>
                  <td className="px-5 py-4">
                    <span className="type-micro px-2 py-0.5 rounded-full border border-[var(--rust)] text-[var(--rust)] bg-[var(--rust)]/10">
                      Wipes out on step 5 ($10.85 &gt; $10)
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-[var(--slate)]/40 transition-colors bg-[var(--mint)]/5">
                  <td className="px-5 py-4 font-mono text-xs text-[var(--mint-text)] font-semibold">
                    SoftPip 1.3× Recovery Ladder
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-[var(--text)]">
                    ${GOVERNOR_SPEC.base_stake_usd.toFixed(2)}
                  </td>
                  <td className="px-5 py-4 type-small text-[var(--text-70)]">
                    {GOVERNOR_SPEC.multiplier}× progression capped at {GOVERNOR_SPEC.max_ladder_steps} steps ($0.35 → $0.46 → $0.59 → $0.77 → $1.00)
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-[var(--mint-text)] font-semibold">
                    ${GOVERNOR_SPEC.ladder_total_risk_usd.toFixed(2)} across 5 steps
                  </td>
                  <td className="px-5 py-4">
                    <span className="type-micro px-2 py-0.5 rounded-full border border-[var(--mint)] text-[var(--mint-text)] bg-[var(--mint)]/10">
                      Survives ($6.83 equity preserved)
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Installation Steps */}
        <Reveal className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="type-micro uppercase text-[var(--text-45)]">
              Deployment Guide
            </span>
            <h2 className="type-h2 m-0">Setup &amp; Installation</h2>
            <p className="type-small text-[var(--text-70)] m-0 prose-col">
              Five steps to get The Enforcer running in dry-run simulation or on a background VPS.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {INSTALL_STEPS.map((step) => (
              <div
                key={step.number}
                className="surface-card p-6 rounded-[14px] flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="type-micro font-mono text-[var(--mint-text)]">
                    {step.number}
                  </span>
                  <h3 className="type-h3 m-0 text-[var(--text)]">{step.title}</h3>
                </div>
                <p className="type-body text-[var(--text-70)] m-0 prose-col">
                  {step.body}
                </p>
                {step.code && (
                  <pre className="p-4 rounded-lg bg-[var(--void)] border border-[var(--border)] font-mono text-xs text-[var(--mint-text)] overflow-x-auto whitespace-pre">
                    <code>{step.code}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Telegram Commands */}
        <Reveal className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="type-micro uppercase text-[var(--text-45)]">
              Remote Telemetry
            </span>
            <h2 className="type-h2 m-0">Telegram Control Commands</h2>
            <p className="type-small text-[var(--text-70)] m-0 prose-col">
              Send commands from your smartphone to monitor and control execution remotely.
            </p>
          </div>

          <div className="overflow-x-auto surface-card p-0 rounded-[14px]">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-[var(--slate)] hairline-b text-[var(--text)]">
                <tr>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Command</th>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Function</th>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Telemetry Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--rule)]">
                {TELEGRAM_COMMANDS.map((c) => (
                  <tr key={c.command} className="hover:bg-[var(--slate)]/40 transition-colors">
                    <td className="px-5 py-4 font-mono text-xs text-[var(--mint-text)] font-semibold whitespace-nowrap">
                      {c.command}
                    </td>
                    <td className="px-5 py-4 type-small text-[var(--text-70)]">
                      {c.description}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-[var(--text)]">
                      {c.output}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* CTA Banner */}
        <Reveal>
          <div className="surface-card p-8 rounded-[14px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-[var(--mint)]/20">
            <div className="flex flex-col gap-2 max-w-[540px]">
              <h3 className="type-h2 m-0 text-[var(--text)]">
                Need a segregated account to start?
              </h3>
              <p className="type-body text-[var(--text-70)] m-0">
                Never connect The Enforcer to your main manual account. Open a dedicated $10 sub-account through the official link to keep your balances strictly segregated.
              </p>
            </div>
            <AffiliateLink
              placement="bot"
              className="btn-mint shrink-0 self-start sm:self-auto"
            >
              Open segregated $10 account →
            </AffiliateLink>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
