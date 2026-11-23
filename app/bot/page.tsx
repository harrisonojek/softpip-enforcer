import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SpecCard, RustCaveatCard } from "@/components/spec-card";
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
    description: "Display daily session P/L, trade count, and peak drawdown.",
    output: `Session: 18 trades · Net: +$0.42 · Max DD: 4.8% · Remaining: ${GOVERNOR_SPEC.max_session_trades - 18} trades`,
  },
  {
    command: "/ladder",
    description: `Query current position in the ${GOVERNOR_SPEC.multiplier}× recovery ladder and next stake.`,
    output: `Ladder step: 1 of ${GOVERNOR_SPEC.max_ladder_steps} · Next stake: $${GOVERNOR_SPEC.base_stake_usd.toFixed(2)} · Reset at win, cool-off, or step ${GOVERNOR_SPEC.max_ladder_steps}`,
  },
];

const INSTALL_STEPS = [
  {
    number: "01",
    title: "Register app ID at developers.deriv.com",
    body: "Navigate to Deriv Developer Portal, log in with your Deriv account, and register a new application. Note your numerical App ID.",
    code: null,
  },
  {
    number: "02",
    title: "Create read-and-trade scoped API token",
    body: "In your Deriv account settings, generate a new API token. Check 'Read' and 'Trade' ONLY. Never check 'Payments' or 'Admin' scopes.",
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
    title: "Configure credentials in config.yaml",
    body: "Copy the template configuration file and supply your API token and Telegram Bot credentials.",
    code: "cp config.example.yaml config.yaml\n# Edit config.yaml: insert DERIV_TOKEN, APP_ID, and TELEGRAM_CHAT_ID",
  },
  {
    number: "05",
    title: "Launch Docker container or run natively",
    body: "Run The Enforcer in an isolated container that automatically restarts on unexpected network interrupts.",
    code: "docker compose up -d\n# Or run natively with Python 3.11+:\npython -m venv .venv && source .venv/bin/activate\npip install -r requirements.txt\npython main.py",
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
              href={`${GITHUB_REPO_URL}/releases`}
              rel="noopener noreferrer"
              target="_blank"
              className="btn-ghost"
            >
              Releases
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
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--rule)]">
                <tr className="hover:bg-[var(--slate)]/40 transition-colors">
                  <td className="px-5 py-4 font-medium text-[var(--text)]">Flat Stake</td>
                  <td className="px-5 py-4 tabular-nums text-[var(--text-70)]">${GOVERNOR_SPEC.base_stake_usd.toFixed(2)}</td>
                  <td className="px-5 py-4 text-[var(--text-70)]">None (flat throughout)</td>
                  <td className="px-5 py-4 tabular-nums text-[var(--text-70)]">${GOVERNOR_SPEC.base_stake_usd.toFixed(2)} per trade</td>
                  <td className="px-5 py-4 font-medium text-[var(--text)] tabular-nums">28 trades before exhaustion</td>
                  <td className="px-5 py-4 text-[var(--text-70)]">Sane baseline</td>
                </tr>
                <tr className="hover:bg-[var(--slate)]/40 transition-colors">
                  <td className="px-5 py-4 font-medium text-[var(--mint-text)]">{GOVERNOR_SPEC.multiplier}× Ladder (The Enforcer)</td>
                  <td className="px-5 py-4 tabular-nums text-[var(--mint-text)]">${GOVERNOR_SPEC.base_stake_usd.toFixed(2)}</td>
                  <td className="px-5 py-4 text-[var(--text-70)]">{GOVERNOR_SPEC.multiplier}× capped at {GOVERNOR_SPEC.max_ladder_steps} steps</td>
                  <td className="px-5 py-4 tabular-nums text-[var(--mint-text)] font-medium">${GOVERNOR_SPEC.ladder_total_risk_usd.toFixed(2)} across {GOVERNOR_SPEC.max_ladder_steps} steps</td>
                  <td className="px-5 py-4 font-medium text-[var(--mint-text)]">Survives (preserves 68% equity)</td>
                  <td className="px-5 py-4 text-[var(--mint-text)] font-medium">Controlled recovery</td>
                </tr>
                <tr className="bg-[var(--rust)]/5 hover:bg-[var(--rust)]/10 transition-colors border-l-2 border-[var(--rust)]">
                  <td className="px-5 py-4 font-medium text-[var(--rust)]">2.0× Martingale</td>
                  <td className="px-5 py-4 tabular-nums text-[var(--rust)]">${GOVERNOR_SPEC.base_stake_usd.toFixed(2)}</td>
                  <td className="px-5 py-4 text-[var(--rust)]">2.0× doubling after loss</td>
                  <td className="px-5 py-4 tabular-nums text-[var(--rust)] font-medium">${GOVERNOR_SPEC.martingale_total_risk_usd.toFixed(2)} across {GOVERNOR_SPEC.max_ladder_steps} steps</td>
                  <td className="px-5 py-4 font-medium text-[var(--rust)]">0% survival (exceeds balance)</td>
                  <td className="px-5 py-4 text-[var(--rust)] font-semibold">✕ Account Ruin</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Numbered Install Steps & One-Command VPS Script */}
        <Reveal className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="type-micro uppercase text-[var(--text-45)]">
              Deployment
            </span>
            <h2 className="type-h2 m-0">Installation & Setup</h2>
            <p className="type-small text-[var(--text-70)] m-0 prose-col">
              Follow these numbered steps to configure credentials and launch the governor process.
            </p>
          </div>

          {/* One-command VPS script callout */}
          <div className="surface-card p-6 flex flex-col gap-3 border-[var(--mint)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--mint)]" aria-hidden="true" />
              <span className="type-micro uppercase text-[var(--mint-text)] font-semibold">
                One-Command VPS Script (Debian / Ubuntu)
              </span>
            </div>
            <p className="type-small text-[var(--text-70)] m-0">
              Run this single command on a clean Linux server to install Docker, clone The Enforcer, and launch the setup wizard:
            </p>
            <div className="p-3.5 rounded-[10px] bg-[var(--slate)] border border-[var(--line)] overflow-x-auto">
              <code className="text-[var(--mint-text)] font-mono text-xs select-all">
                curl -sSL https://raw.githubusercontent.com/harrisonojek/softpip-enforcer/main/install.sh | bash
              </code>
            </div>
          </div>

          {/* Detailed Numbered Steps */}
          <div className="flex flex-col gap-4">
            {INSTALL_STEPS.map((step) => (
              <div
                key={step.number}
                className="surface-card p-6 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="type-micro font-mono text-[var(--mint-text)] px-2 py-0.5 rounded bg-[var(--slate)] border border-[var(--line)]">
                    STEP {step.number}
                  </span>
                  <h3 className="type-h3 m-0 text-[var(--text)]">
                    {step.title}
                  </h3>
                </div>
                <p className="type-small text-[var(--text-70)] m-0 prose-col">
                  {step.body}
                </p>
                {step.code && (
                  <pre className="p-4 rounded-[10px] bg-[var(--slate)] border border-[var(--line)] overflow-x-auto text-xs font-mono text-[var(--text)] m-0">
                    <code>{step.code}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Telegram Commands Table */}
        <Reveal className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="type-micro uppercase text-[var(--text-45)]">
              Telemetry & Control
            </span>
            <h2 className="type-h2 m-0">Telegram Commands</h2>
            <p className="type-small text-[var(--text-70)] m-0 prose-col">
              Control your running bot process securely from any phone using your configured Telegram chat.
            </p>
          </div>

          <div className="overflow-x-auto surface-card p-0 rounded-[14px]">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-[var(--slate)] hairline-b text-[var(--text)]">
                <tr>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Command</th>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Description</th>
                  <th className="px-5 py-4 type-micro uppercase font-medium text-[var(--text-70)]">Sample Governor Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--rule)]">
                {TELEGRAM_COMMANDS.map((c) => (
                  <tr key={c.command} className="hover:bg-[var(--slate)]/40 transition-colors">
                    <td className="px-5 py-4 font-mono font-medium text-[var(--mint-text)]">{c.command}</td>
                    <td className="px-5 py-4 type-small text-[var(--text-70)]">{c.description}</td>
                    <td className="px-5 py-4 font-mono text-xs text-[var(--text-45)]">{c.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Built for $10 Section */}
        <Reveal className="flex flex-col gap-6">
          <div className="surface-card p-8 sm:p-10 flex flex-col gap-5 border-[var(--rule)]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
              <span className="type-micro uppercase text-[var(--mint-text)] font-semibold">
                Architecture Rationale
              </span>
            </div>

            <h2 className="type-h2 m-0">Built for $10 Accounts</h2>

            <div className="prose-col flex flex-col gap-4 type-body text-[var(--text-70)] leading-relaxed">
              <p className="m-0">
                The Enforcer was engineered specifically around the hard constraints of a $10 bankroll. On Deriv synthetic indices, the minimum allowable contract stake on Volatility 75 Rise/Fall is ${GOVERNOR_SPEC.base_stake_usd.toFixed(2)}. That means on trade one, an operator is forced to risk exactly <strong>3.5% of their total equity</strong>.
              </p>
              <p className="m-0">
                At a 3.5% floor, conventional risk management (risking 1% per trade) is mathematically impossible. A single 18-trade losing streak wipes out 63% of the account. This is why The Enforcer eliminates 2.0× Martingale doubling entirely, triggers a {Math.round(GOVERNOR_SPEC.cool_off_seconds / 60)}-minute cool-off after {GOVERNOR_SPEC.max_consecutive_losses} consecutive losses (${GOVERNOR_SPEC.pre_cooloff_ladder_risk_usd.toFixed(2)} cumulative, resetting the ladder to step 1), and enforces a daily loss ceiling of {Math.round(GOVERNOR_SPEC.daily_loss_limit_pct_of_equity * 100)}% of equity with a ${GOVERNOR_SPEC.daily_loss_limit_floor_usd.toFixed(2)} floor.
              </p>
              <p className="m-0">
                <strong>Why CFDs are unusable on a $10 account:</strong> On MetaTrader 5 (MT5), contracts for difference (CFDs) require minimum lot sizes (e.g. 0.01 lot on Volatility 75). At standard leverage, opening a single 0.01 lot requires $2.50 to $4.00 in required margin—consuming 25% to 40% of a $10 account immediately. A single 1-second price jump of 35 points creates a floating loss of $3.50, triggering an automatic broker stop-out and account wipeout. Options contracts on binary ticks, while carrying dealer friction, allow a precise, bounded ${GOVERNOR_SPEC.base_stake_usd.toFixed(2)} risk cap that protects against negative balance liquidation.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link href="/curriculum" className="btn-mint">
                Read Module 04: Sizing from $10 up →
              </Link>
              <a
                href={DERIV_AFFILIATE_URL}
                rel="sponsored noopener"
                target="_blank"
                className="btn-ghost"
              >
                Open $10 account
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
