import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SpecCard } from "@/components/spec-card";
import { EquityRiskTable } from "@/components/equity-risk-table";
import { buildMetadata, DERIV_AFFILIATE_URL, GITHUB_REPO_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Deriv Bot: The Free Open-Source Risk Governor Alternative — SoftPip",
  description:
    "Stop buying scam Telegram Martingale bots that blow your account. The Enforcer is a free, MIT-licensed Python risk governor built for $10 Deriv accounts.",
  path: "/deriv-bot",
});

export default function DerivBotPage() {
  return (
    <div className="section-pad min-h-screen">
      <div className="container-shell flex flex-col gap-12">
        <Reveal className="flex flex-col gap-4 max-w-[800px]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
            <span className="type-micro uppercase text-[var(--mint-text)] tracking-wider">
              Open Source Alternative · Deriv Bot Guide
            </span>
          </div>

          <h1 className="type-h1 m-0">The free, open-source Deriv bot that stops blowups.</h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            Every commercial Deriv bot sold on Telegram is a hidden 2.0x Martingale machine.
            They show 98% win rates until five consecutive losses wipe 100% of your wallet.
            The Enforcer is free, MIT-licensed, and built for survival.
          </p>
        </Reveal>

        {/* Comparison Table */}
        <Reveal delayMs={70} className="max-w-[860px]">
          <div className="surface-card p-6 sm:p-8 rounded-2xl border border-[var(--border)] flex flex-col gap-6">
            <h3 className="type-h3 m-0 text-[var(--foreground)]">
              Telegram &quot;Guaranteed&quot; Bots vs. SoftPip The Enforcer
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm font-mono">
                <thead>
                  <tr className="border-b border-[var(--border)] text-xs uppercase text-[var(--muted)]">
                    <th className="py-3 px-4">Feature</th>
                    <th className="py-3 px-4 text-[var(--rust)]">Commercial Telegram Bots</th>
                    <th className="py-3 px-4 text-[var(--mint-text)]">SoftPip The Enforcer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-[var(--foreground)]">Cost</td>
                    <td className="py-3.5 px-4 text-[var(--rust)]">$50 – $300 upfront / VIP subs</td>
                    <td className="py-3.5 px-4 text-[var(--mint-text)]">100% Free &amp; Open Source (MIT)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-[var(--foreground)]">Recovery Model</td>
                    <td className="py-3.5 px-4 text-[var(--rust)]">2.0× Martingale doubling (unbounded)</td>
                    <td className="py-3.5 px-4 text-[var(--mint-text)]">1.3× slope capped strictly at 5 steps</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-[var(--foreground)]">Cool-Off Trigger</td>
                    <td className="py-3.5 px-4 text-[var(--rust)]">None (spins until liquidation)</td>
                    <td className="py-3.5 px-4 text-[var(--mint-text)]">15-minute socket disconnect on 2 losses</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-[var(--foreground)]">Daily Loss Cap</td>
                    <td className="py-3.5 px-4 text-[var(--rust)]">None (wipes entire account balance)</td>
                    <td className="py-3.5 px-4 text-[var(--mint-text)]">10% of equity ($1.00 hard floor)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-[var(--foreground)]">Source Code Audit</td>
                    <td className="py-3.5 px-4 text-[var(--rust)]">Obfuscated XML / locked binaries</td>
                    <td className="py-3.5 px-4 text-[var(--mint-text)]">Pure Python 3.13 on GitHub</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* Guardian Specs */}
        <Reveal delayMs={120} className="max-w-[860px]">
          <SpecCard />
        </Reveal>

        {/* Equity Table */}
        <Reveal delayMs={160} className="max-w-[860px]">
          <EquityRiskTable />
        </Reveal>

        {/* Quickstart Action */}
        <Reveal delayMs={200} className="surface-card p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 max-w-[860px] border border-[var(--mint)]/20">
          <div className="flex flex-col gap-2 max-w-[500px]">
            <h3 className="type-h3 m-0 text-[var(--foreground)]">Deploy The Enforcer on your machine</h3>
            <p className="type-body text-[var(--text-70)] m-0 text-sm">
              Read the documentation, clone the repo, and run the 60-second dry run simulator on demo before risking live capital.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/bot" className="btn-mint">
              Inspect Bot Docs →
            </Link>
            <a
              href={DERIV_AFFILIATE_URL}
              target="_blank"
              rel="sponsored noopener"
              className="btn-ghost"
            >
              Open $10 Account
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
