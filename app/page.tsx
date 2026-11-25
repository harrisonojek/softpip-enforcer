import React from "react";
import Link from "next/link";
import { IconMark } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { StatusLine } from "@/components/status-line";
import { EquityRiskTable } from "@/components/equity-risk-table";
import { HeroBloom, HeroHeadline } from "@/components/hero-headline";
import { AffiliateLink } from "@/components/affiliate-link";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { Accordion, type AccordionItem } from "@/components/accordion";
import { GOVERNOR_SPEC } from "@/lib/governor-spec";
import {
  TRACK_RECORD_WEEKS,
  formatNairaSigned,
} from "@/lib/track-record";
import { DERIV_AFFILIATE_URL, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SoftPip — Trade with rules, not feelings.",
  description:
    "In 2025 I lost ₦32.45M trading. The full autopsy is free. So is the ten-module curriculum and the risk bot. You need $10 to start.",
  path: "/",
});

const ANCHOR_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Autopsy", href: "#autopsy" },
  { label: "Enforcer", href: "#enforcer" },
  { label: "Ledger", href: "#ledger" },
  { label: "Pillars", href: "#pillars" },
  { label: "FAQ", href: "#faq" },
];

const WORKFLOW_STEPS = [
  {
    number: "01",
    title: "Read the autopsy",
    body: "Study the 8-part forensic breakdown and understand the structural ruin mechanics of synthetic indices before risking capital.",
    ctaLabel: "Read publication →",
    ctaHref: "/autopsy",
    external: false,
  },
  {
    number: "02",
    title: "Run the Enforcer on demo",
    body: `Clone the open-source Python governor, configure your demo token, and verify that the $${GOVERNOR_SPEC.daily_loss_limit_floor_usd.toFixed(2)} daily loss floor and ${Math.round(GOVERNOR_SPEC.cool_off_seconds / 60)}m cool-off fire accurately.`,
    ctaLabel: "Inspect the bot →",
    ctaHref: "/labs/enforcer",
    external: false,
  },
  {
    number: "03",
    title: "Fund $10 on Deriv",
    body: `Open a segregated options account with $10 (~₦15,000) using our verified partner link. Risk no more than $${GOVERNOR_SPEC.base_stake_usd.toFixed(2)} per contract.`,
    ctaLabel: "Open $10 account →",
    ctaHref: DERIV_AFFILIATE_URL,
    external: true,
  },
];

interface PillarItem {
  name: string;
  href: string;
  status: "live" | "in build";
  line: string;
}

const PILLARS: readonly PillarItem[] = [
  {
    name: "Academy",
    href: "/academy",
    status: "live",
    line: "Free 10-module risk curriculum.",
  },
  {
    name: "Labs",
    href: "/labs",
    status: "live",
    line: "Open-source Python execution governors.",
  },
  {
    name: "Intelligence",
    href: "/academy/research",
    status: "in build",
    line: "Empirical market risk research.",
  },
  {
    name: "Community",
    href: "/community",
    status: "live",
    line: "Discipline-first trader Telegram room.",
  },
  {
    name: "Partners",
    href: "/partners",
    status: "live",
    line: "Transparent broker affiliate network.",
  },
];

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: "is-it-really-free",
    question: "Is it really free?",
    answer: (
      <p className="m-0">
        Yes. The curriculum and the Enforcer are free permanently. Anything paid later sits alongside them, never in place of them. SoftPip operates with zero upfront paywalls, locked tiers, or private subscription fees. The project is funded entirely via Deriv affiliate partner commissions when you open a new account through our referral link.
      </p>
    ),
  },
  {
    id: "why-10-dollars",
    question: "Why $10?",
    answer: (
      <p className="m-0">
        Because ₦32M taught me that scaling an untested trading system before mastering risk of ruin is financial suicide. A $10 deposit (~₦15,000) provides genuine psychological skin in the game while capping your absolute downside at a lunch bill. Deriv allows $0.35 minimum stakes on Volatility 75 index options, which gives you exactly 28 trades to test execution discipline without risking your savings.
      </p>
    ),
  },
  {
    id: "what-experience-is-needed",
    question: "What experience is needed?",
    answer: (
      <p className="m-0">
        None. In fact, total beginners are preferred. Traders with prior experience often arrive with destructive habits like Martingale doubling, revenge trading, or paying for VIP signal channels. The curriculum begins with arithmetic: win rate, payout ratios, geometric risk, and stake sizing. If you can read a table and follow a checklist, you can complete the curriculum.
      </p>
    ),
  },
  {
    id: "is-the-bot-profitable",
    question: "Is the bot profitable?",
    answer: (
      <p className="m-0">
        No bot is inherently profitable across every market regime. The Enforcer is a <em>risk governor</em>, not a magical predictive oracle. Its sole purpose is to pull execution brakes: enforcing hard consecutive loss limits, capping max daily drawdowns, and terminating sessions before tilt sets in. Your profitability depends on whether your underlying edge possesses positive expectancy; the bot merely ensures you survive long enough to realize it.
      </p>
    ),
  },
  {
    id: "which-instrument-does-it-trade",
    question: "Which instrument does it trade?",
    answer: (
      <p className="m-0">
        The Enforcer is specifically tuned for Deriv Synthetic Indices, primarily Volatility 75 (1s) and Volatility 100 Rise/Fall Options contracts. Synthetic indices run 24/7/365 with constant volatility parameters unaffected by geopolitical events, macroeconomic announcements, or bank holidays.
      </p>
    ),
  },
  {
    id: "can-i-run-it-from-my-phone",
    question: "Can I run it from my phone?",
    answer: (
      <p className="m-0">
        You can control and monitor the bot from your phone using Telegram commands (<code>/status</code>, <code>/stop</code>, <code>/daily</code>), but the Python script itself must run on an uninterrupted server (a VPS) or a desktop computer. Mobile phones close background network connections when their screens lock, which can prevent critical stop-loss commands from firing over the WebSocket connection.
      </p>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative isolate overflow-hidden border-b border-[var(--rule)] mint-glow pt-12 pb-16 lg:py-24">
        <HeroBloom />
        <div className="container-shell relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Eyebrow, Headline, Sub, CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              <div className="flex items-center gap-3">
                <IconMark size={28} />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--mint-text)]">
                  | INCIDENT REPORT
                </span>
              </div>

              <HeroHeadline />

              <p className="type-body text-[var(--text-70)] m-0 max-w-[56ch]">
                In 2025 I lost ₦32.45M trading. The full autopsy is free. So is the ten-module curriculum and the risk bot. You need $10 to start.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link href="/autopsy" className="btn-mint">
                  Start with the autopsy
                </Link>
                <Link href="/labs/enforcer" className="btn-ghost">
                  See the Enforcer
                </Link>
              </div>
            </div>

            {/* Right Column: CSS-built Enforcer Console Frame */}
            <div className="lg:col-span-5 w-full">
              <div className="relative group">
                {/* Radial Mint Glow behind console */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 bg-[radial-gradient(circle_at_60%_30%,rgba(122,243,198,0.14)_0%,transparent_70%)] rounded-2xl blur-xl pointer-events-none"
                />

                <div className="relative rounded-xl border border-[var(--rule)] bg-[var(--navy)]/90 backdrop-blur-md overflow-hidden shadow-2xl">
                  {/* Console Top Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--rule)] bg-[var(--slate)]/80">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[var(--rust)]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]/80" />
                      <span className="font-mono text-[11px] text-[var(--text-45)] ml-2">
                        enforcer.py — v0.1.0
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--mint-text)] px-2 py-0.5 rounded-full border border-[var(--mint)]/30 bg-[var(--mint)]/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--mint)] animate-pulse" />
                      <span>ACTIVE</span>
                    </div>
                  </div>

                  {/* Static Spec Values Grid */}
                  <div className="p-4 sm:p-5 flex flex-col gap-4 font-mono">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg border border-[var(--rule)] bg-[var(--void)]/60 flex flex-col gap-1">
                        <span className="text-[10px] text-[var(--text-45)] uppercase tracking-wider">
                          Daily Loss Floor
                        </span>
                        <span className="text-base font-semibold text-[var(--text)]">
                          ${GOVERNOR_SPEC.daily_loss_limit_floor_usd.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-[var(--mint-text)]">
                          10% equity ceiling
                        </span>
                      </div>

                      <div className="p-3 rounded-lg border border-[var(--rule)] bg-[var(--void)]/60 flex flex-col gap-1">
                        <span className="text-[10px] text-[var(--text-45)] uppercase tracking-wider">
                          Base Stake
                        </span>
                        <span className="text-base font-semibold text-[var(--text)]">
                          ${GOVERNOR_SPEC.base_stake_usd.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-[var(--text-70)]">
                          Floor contract size
                        </span>
                      </div>

                      <div className="p-3 rounded-lg border border-[var(--rule)] bg-[var(--void)]/60 flex flex-col gap-1">
                        <span className="text-[10px] text-[var(--text-45)] uppercase tracking-wider">
                          Ladder Step
                        </span>
                        <span className="text-base font-semibold text-[var(--text)]">
                          Step 1 of {GOVERNOR_SPEC.max_ladder_steps}
                        </span>
                        <span className="text-[10px] text-[var(--text-70)]">
                          {GOVERNOR_SPEC.multiplier}× geometric
                        </span>
                      </div>

                      <div className="p-3 rounded-lg border border-[var(--rule)] bg-[var(--void)]/60 flex flex-col gap-1">
                        <span className="text-[10px] text-[var(--text-45)] uppercase tracking-wider">
                          Cool-Off State
                        </span>
                        <span className="text-base font-semibold text-[var(--text)]">
                          {Math.round(GOVERNOR_SPEC.cool_off_seconds / 60)}m Locked
                        </span>
                        <span className="text-[10px] text-[var(--mint-text)]">
                          {GOVERNOR_SPEC.max_consecutive_losses} losses trigger
                        </span>
                      </div>
                    </div>

                    {/* Terminal Stream Feed */}
                    <div className="p-3 rounded-lg border border-[var(--rule)] bg-[var(--void)] text-[11px] leading-relaxed flex flex-col gap-1 font-mono text-[var(--text-70)]">
                      <div className="flex items-center justify-between text-[10px] text-[var(--text-45)] pb-1 border-b border-[var(--rule)]">
                        <span>WS_FEED: wss://ws.derivws.com</span>
                        <span className="text-[var(--mint-text)]">200 OK</span>
                      </div>
                      <p className="m-0 text-[var(--text-45)]">
                        [10:14:02] <span className="text-[var(--mint-text)]">AUTH_OK</span> token: live_options_segregated
                      </p>
                      <p className="m-0 text-[var(--text-45)]">
                        [10:14:03] <span className="text-[var(--mint-text)]">SPEC_LOCK</span> floor=$1.00 · multiplier=1.3x
                      </p>
                      <p className="m-0 text-[var(--text-45)]">
                        [10:14:05] <span className="text-[var(--text)]">GOVERNOR</span> tilt breaker armed (15m lockout)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ANCHOR ROW */}
      <nav
        aria-label="Section shortcuts"
        className="border-b border-[var(--rule)] bg-[var(--navy)]/80 backdrop-blur-md sticky top-0 z-30"
      >
        <div className="container-shell flex items-center justify-center overflow-x-auto py-3.5">
          <div className="flex items-center gap-3 sm:gap-6 text-xs font-mono tracking-wider uppercase whitespace-nowrap">
            {ANCHOR_LINKS.map((link, idx) => (
              <React.Fragment key={link.href}>
                {idx > 0 && <span className="text-[var(--text-45)] select-none">·</span>}
                <a
                  href={link.href}
                  className="text-[var(--text-70)] hover:text-[var(--mint-text)] transition-colors py-1"
                >
                  {link.label}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </nav>

      {/* 3. STATUS LINE */}
      <section className="py-5 border-b border-[var(--rule)] bg-[var(--slate)]/40">
        <div className="container-shell flex justify-center">
          <StatusLine />
        </div>
      </section>

      {/* 4. STATEMENT BAND */}
      <section id="overview" className="scroll-mt-14 py-16 lg:py-24 border-b border-[var(--rule)] bg-[var(--void)] text-center">
        <div className="container-shell flex flex-col items-center justify-center">
          <Reveal>
            <p className="type-h1 m-0 text-[var(--text)] tracking-tight max-w-[34ch] mx-auto leading-tight">
              Markets move. Knowledge evolves. <span className="text-[var(--mint-text)]">Discipline remains.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5. BENTO: BUILT FOR SMALL ACCOUNTS */}
      <section id="enforcer" className="scroll-mt-14 section-pad border-b border-[var(--rule)]">
        <div className="container-shell flex flex-col gap-10">
          <Reveal className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--mint-text)]">
              | BUILT FOR SMALL ACCOUNTS
            </span>
            <h2 className="type-h2 m-0">Three hard execution limits in code.</h2>
            <p className="type-body text-[var(--text-70)] m-0 prose-col">
              Engineered specifically for small accounts where a single emotional error wipes out entire balances.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--rule)] rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[var(--rule)] bg-[var(--navy)]">
            {/* Bento Cell 1: Daily Loss Floor */}
            <div className="p-7 sm:p-8 flex flex-col justify-between gap-6 hover:bg-[var(--slate)]/40 transition-colors">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs text-[var(--text-45)] uppercase tracking-wider">
                  01 · Capital Floor
                </span>
                <h3 className="type-h3 m-0 text-[var(--text)]">Daily loss floor</h3>
                <div className="font-mono text-2xl font-semibold text-[var(--mint-text)]">
                  ${GOVERNOR_SPEC.daily_loss_limit_floor_usd.toFixed(2)}
                </div>
                <p className="type-small text-[var(--text-70)] m-0 leading-relaxed">
                  Enforced in code. Capped at 10% equity or a hard $1.00 floor on a $10 account. Once triggered, execution halts permanently for the day.
                </p>
              </div>
              <div className="font-mono text-[11px] text-[var(--text-45)] pt-4 border-t border-[var(--rule)]">
                DAILY_LOSS_LIMIT_FLOOR_USD = 1.00
              </div>
            </div>

            {/* Bento Cell 2: Two-loss cool-off */}
            <div className="p-7 sm:p-8 flex flex-col justify-between gap-6 hover:bg-[var(--slate)]/40 transition-colors">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs text-[var(--text-45)] uppercase tracking-wider">
                  02 · Tilt Interrupter
                </span>
                <h3 className="type-h3 m-0 text-[var(--text)]">Two-loss cool-off</h3>
                <div className="font-mono text-2xl font-semibold text-[var(--mint-text)]">
                  {Math.round(GOVERNOR_SPEC.cool_off_seconds / 60)} minutes
                </div>
                <p className="type-small text-[var(--text-70)] m-0 leading-relaxed">
                  Resets the ladder. Two consecutive losses trigger an automatic 15-minute WebSocket disconnection, resetting stake progression back to $0.35.
                </p>
              </div>
              <div className="font-mono text-[11px] text-[var(--text-45)] pt-4 border-t border-[var(--rule)]">
                MAX_CONSECUTIVE_LOSSES = 2
              </div>
            </div>

            {/* Bento Cell 3: Fail-closed kill switch */}
            <div className="p-7 sm:p-8 flex flex-col justify-between gap-6 hover:bg-[var(--slate)]/40 transition-colors">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs text-[var(--text-45)] uppercase tracking-wider">
                  03 · Socket Guard
                </span>
                <h3 className="type-h3 m-0 text-[var(--text)]">Fail-closed kill switch</h3>
                <div className="font-mono text-2xl font-semibold text-[var(--mint-text)]">
                  Zero exposure
                </div>
                <p className="type-small text-[var(--text-70)] m-0 leading-relaxed">
                  Disconnect, token error, margin error. If the network drops or broker APIs return unexpected payloads, all sockets terminate instantly.
                </p>
              </div>
              <div className="font-mono text-[11px] text-[var(--text-45)] pt-4 border-t border-[var(--rule)]">
                FAIL_CLOSED_KILL_SWITCH = True
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SPLIT ONE: THE AUTOPSY */}
      <section id="autopsy" className="scroll-mt-14 section-pad border-b border-[var(--rule)]">
        <div className="container-shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Narrative Left */}
            <div className="lg:col-span-6 flex flex-col items-start gap-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--rust)]">
                | THE AUTOPSY
              </span>
              <h2 className="type-h1 m-0 text-[var(--text)]">
                The ₦32M forensic breakdown.
              </h2>
              <div className="flex flex-col gap-3 text-[var(--text-70)] type-body leading-relaxed">
                <p className="m-0">
                  Across 2025, ₦32,450,000 was lost trading synthetic indices. Not in one bad session, but across repeated cascades of unchecked stake doubling and absent circuit breakers.
                </p>
                <p className="m-0">
                  Covers the 14-second liquidation cascade, the psychology of Martingale sizing on continuous 24/7 RNG feeds, and why standard retail stop-losses fail.
                </p>
                <p className="m-0">
                  Published completely free because mastering the mathematics of ruin must happen before risking live capital.
                </p>
              </div>
              <div className="pt-2">
                <Link href="/autopsy" className="btn-mint">
                  Read the autopsy — free →
                </Link>
              </div>
            </div>

            {/* Annotated Statement Fragment Right */}
            <div className="lg:col-span-6 w-full">
              <div className="relative group">
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 bg-[radial-gradient(circle_at_50%_50%,rgba(232,115,90,0.08)_0%,transparent_70%)] rounded-2xl blur-xl pointer-events-none"
                />

                <div className="relative rounded-xl border border-[var(--rule)] bg-[var(--navy)] overflow-hidden font-mono text-xs">
                  {/* Fragment Top Bar */}
                  <div className="px-5 py-3 border-b border-[var(--rule)] bg-[var(--slate)]/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--rust)]" />
                      <span className="text-[var(--text)] font-semibold">DERIV INCIDENT LOG</span>
                    </div>
                    <span className="text-[var(--text-45)] text-[11px]">2025-08-14 · SYNTHETIC 24/7</span>
                  </div>

                  {/* Fragment Body */}
                  <div className="p-5 flex flex-col gap-4">
                    <div className="flex items-center justify-between text-[11px] text-[var(--text-45)] pb-2 border-b border-[var(--rule)]">
                      <span>CONTRACT: VOLATILITY 75 (1S)</span>
                      <span className="text-[var(--rust)] font-semibold">CASCADE TRIGGERED</span>
                    </div>

                    {/* Trade sequence */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between p-2 rounded bg-[var(--void)]/60 border border-[var(--rule)]">
                        <span className="text-[var(--text-70)]">Trade #01 · 02:41:04</span>
                        <span className="text-[var(--text)]">$25.00</span>
                        <span className="text-[var(--rust)]">LOSS (-$25.00)</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-[var(--void)]/60 border border-[var(--rule)]">
                        <span className="text-[var(--text-70)]">Trade #02 · 02:41:07</span>
                        <span className="text-[var(--text)]">$50.00 (2.0×)</span>
                        <span className="text-[var(--rust)]">LOSS (-$50.00)</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-[var(--void)]/60 border border-[var(--rule)]">
                        <span className="text-[var(--text-70)]">Trade #03 · 02:41:10</span>
                        <span className="text-[var(--text)]">$100.00 (2.0×)</span>
                        <span className="text-[var(--rust)]">LOSS (-$100.00)</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-[var(--void)]/60 border border-[var(--rule)]">
                        <span className="text-[var(--text-70)]">Trade #04 · 02:41:14</span>
                        <span className="text-[var(--text)]">$200.00 (2.0×)</span>
                        <span className="text-[var(--rust)]">LOSS (-$200.00)</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-[var(--rust)]/10 border border-[var(--rust)]/30">
                        <span className="text-[var(--rust)] font-semibold">Trade #05 · 02:41:18</span>
                        <span className="text-[var(--rust)] font-semibold">$400.00 (2.0×)</span>
                        <span className="text-[var(--rust)] font-semibold">LIQUIDATED</span>
                      </div>
                    </div>

                    {/* Annotations */}
                    <div className="pt-2 flex flex-col gap-1.5 text-[11px]">
                      <div className="flex items-center gap-2 text-[var(--rust)]">
                        <span>[!]</span>
                        <span>14-second liquidation cascade window</span>
                      </div>
                      <div className="flex items-center gap-2 text-[var(--text-70)]">
                        <span>[!]</span>
                        <span>Martingale step 5: Balance zeroed at 2.0× multiplier</span>
                      </div>
                      <div className="flex items-center gap-2 text-[var(--text-70)]">
                        <span>[!]</span>
                        <span>Broker circuit breaker: Absent on continuous synthetic ticks</span>
                      </div>
                    </div>

                    {/* Summary row */}
                    <div className="pt-3 border-t border-[var(--rule)] flex items-center justify-between">
                      <span className="text-[11px] text-[var(--text-45)] uppercase">Cumulative Loss</span>
                      <span className="text-base font-semibold text-[var(--rust)] tabular-nums">
                        -₦32,450,000.00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SPLIT TWO: THE MATH */}
      <section id="math" className="scroll-mt-14 section-pad border-b border-[var(--rule)]">
        <div className="container-shell flex flex-col gap-8">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--mint-text)]">
                | THE MATH
              </span>
              <h2 className="type-h2 m-0">28 trades vs 5 trades to extinction.</h2>
              <p className="type-body text-[var(--text-70)] m-0 prose-col">
                Why a $10 account survives 28 systematic attempts under flat $0.35 stakes, but dies in under 90 seconds under standard Martingale doubling.
              </p>
            </div>
            <Link
              href="/labs/enforcer"
              className="btn-ghost shrink-0 self-start sm:self-auto"
            >
              Full bot specification →
            </Link>
          </Reveal>

          <Reveal delayMs={60}>
            <EquityRiskTable />
          </Reveal>
        </div>
      </section>

      {/* 8. THREE-STEP WORKFLOW */}
      <section id="how-it-works" className="scroll-mt-14 section-pad border-b border-[var(--rule)]">
        <div className="container-shell flex flex-col gap-10">
          <Reveal className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--mint-text)]">
              | WORKFLOW
            </span>
            <h2 className="type-h2 m-0">Three steps to disciplined execution.</h2>
            <p className="type-body text-[var(--text-70)] m-0 prose-col">
              Designed to build systematic execution habits before you risk more than minimum stake.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--rule)] rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[var(--rule)] bg-[var(--navy)]">
            {WORKFLOW_STEPS.map((step) => (
              <div key={step.number} className="p-7 sm:p-8 flex flex-col justify-between gap-6 hover:bg-[var(--slate)]/40 transition-colors">
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-xs text-[var(--mint-text)] uppercase tracking-wider">
                    Step {step.number}
                  </span>
                  <h3 className="type-h3 m-0 text-[var(--text)]">{step.title}</h3>
                  <p className="type-small text-[var(--text-70)] m-0 leading-relaxed">
                    {step.body}
                  </p>
                </div>

                <div>
                  {step.external ? (
                    <AffiliateLink
                      placement="hero"
                      className="inline-flex items-center min-h-[44px] type-small text-[var(--mint-text)] hover:underline font-medium"
                    >
                      {step.ctaLabel}
                    </AffiliateLink>
                  ) : (
                    <Link
                      href={step.ctaHref}
                      className="inline-flex items-center min-h-[44px] type-small text-[var(--mint-text)] hover:underline font-medium"
                    >
                      {step.ctaLabel}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PILLARS STRIP */}
      <section id="pillars" className="scroll-mt-14 section-pad border-b border-[var(--rule)]">
        <div className="container-shell flex flex-col gap-8">
          <Reveal className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--mint-text)]">
              | PILLARS
            </span>
            <h2 className="type-h2 m-0">The Five Pillars</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-[var(--rule)] rounded-xl overflow-hidden divide-y sm:divide-y-0 divide-[var(--rule)] bg-[var(--navy)]">
            {PILLARS.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className="p-6 flex flex-col justify-between gap-4 border-r last:border-r-0 border-[var(--rule)] no-underline group hover:bg-[var(--slate)]/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-[var(--text)] group-hover:text-[var(--mint-text)] transition-colors">
                    {p.name}
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded-full border ${
                      p.status === "live"
                        ? "border-[var(--mint)]/40 text-[var(--mint-text)] bg-[var(--mint)]/10"
                        : "border-[var(--line)] text-[var(--text-45)] bg-[var(--slate)]"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <p className="type-small text-[var(--text-70)] m-0 leading-snug">
                  {p.line}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. LEDGER STRIP */}
      <section id="ledger" className="scroll-mt-14 section-pad border-b border-[var(--rule)]">
        <div className="container-shell flex flex-col gap-10">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--mint-text)]">
                | VERIFICATION
              </span>
              <h2 className="type-h2 m-0">Last four weeks. Red weeks included.</h2>
              <p className="type-body text-[var(--text-70)] m-0 prose-col">
                Simulated replay with fixed payout and filtered entries. Win rate reflects the entry filter rather than predictive skill.
              </p>
            </div>
            <Link
              href="/labs/enforcer/track-record"
              className="btn-ghost shrink-0 self-start sm:self-auto"
            >
              Inspect full ledger →
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[var(--rule)] rounded-xl overflow-hidden divide-y sm:divide-y-0 divide-[var(--rule)] bg-[var(--navy)]">
            {TRACK_RECORD_WEEKS.map((item) => {
              const isPositive = item.netNaira >= 0;
              return (
                <div
                  key={item.id}
                  className="p-6 flex flex-col justify-between gap-5 border-r last:border-r-0 border-[var(--rule)] hover:bg-[var(--slate)]/40 transition-colors"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-[var(--text-45)]">
                        {item.week}
                      </span>
                      <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-full border border-[var(--line)] text-[var(--text-70)] bg-[var(--slate)]">
                        {item.environment}
                      </span>
                    </div>
                    <p
                      className={`type-h2 m-0 tabular-nums pt-1 ${
                        isPositive ? "text-[var(--mint-text)]" : "text-[var(--rust)]"
                      }`}
                    >
                      {formatNairaSigned(item.netNaira)}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5 pt-3 border-t border-[var(--rule)]">
                    <div className="flex items-center justify-between font-mono text-[11px] text-[var(--text-70)]">
                      <span>{item.trades} trades</span>
                      <span>Max DD {item.maxDrawdownPct.toFixed(1)}%</span>
                    </div>
                    <p className="type-small text-[var(--text-70)] m-0 pt-1">
                      {item.notes}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. FREE-FOREVER PRICING BLOCK */}
      <section id="pricing" className="scroll-mt-14 section-pad border-b border-[var(--rule)]">
        <div className="container-shell flex flex-col gap-10">
          <Reveal className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--mint-text)]">
              | PRICING
            </span>
            <h2 className="type-h2 m-0">Three core assets. Zero paywalls.</h2>
            <p className="type-body text-[var(--text-70)] m-0 prose-col">
              No subscription tiers, locked indicators, or VIP channel upsells.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--rule)] rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[var(--rule)] bg-[var(--navy)]">
            {/* Column 1: Autopsy */}
            <div className="p-7 sm:p-8 flex flex-col justify-between gap-6 hover:bg-[var(--slate)]/40 transition-colors">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs text-[var(--mint-text)] uppercase tracking-wider">
                  Publication
                </span>
                <h3 className="type-h3 m-0 text-[var(--text)]">The Autopsy</h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-semibold text-[var(--text)]">$0</span>
                  <span className="font-mono text-xs text-[var(--text-45)]">/ free forever</span>
                </div>
                <p className="type-small text-[var(--text-70)] m-0 leading-relaxed">
                  Forensic audit of ₦32.45M loss across 2025.
                </p>
              </div>
              <Link href="/autopsy" className="btn-ghost w-full text-center">
                Read autopsy →
              </Link>
            </div>

            {/* Column 2: Academy */}
            <div className="p-7 sm:p-8 flex flex-col justify-between gap-6 hover:bg-[var(--slate)]/40 transition-colors">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs text-[var(--mint-text)] uppercase tracking-wider">
                  Curriculum
                </span>
                <h3 className="type-h3 m-0 text-[var(--text)]">The Academy</h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-semibold text-[var(--text)]">$0</span>
                  <span className="font-mono text-xs text-[var(--text-45)]">/ free forever</span>
                </div>
                <p className="type-small text-[var(--text-70)] m-0 leading-relaxed">
                  Ten modules covering risk of ruin and RNG mechanics.
                </p>
              </div>
              <Link href="/academy" className="btn-ghost w-full text-center">
                Explore curriculum →
              </Link>
            </div>

            {/* Column 3: The Enforcer */}
            <div className="p-7 sm:p-8 flex flex-col justify-between gap-6 hover:bg-[var(--slate)]/40 transition-colors">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs text-[var(--mint-text)] uppercase tracking-wider">
                  Software
                </span>
                <h3 className="type-h3 m-0 text-[var(--text)]">The Enforcer</h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-semibold text-[var(--text)]">$0</span>
                  <span className="font-mono text-xs text-[var(--text-45)]">/ free forever</span>
                </div>
                <p className="type-small text-[var(--text-70)] m-0 leading-relaxed">
                  Open-source Python risk governor and kill-switch.
                </p>
              </div>
              <Link href="/labs/enforcer" className="btn-ghost w-full text-center">
                Inspect the bot →
              </Link>
            </div>
          </div>

          {/* Pricing footnote */}
          <p className="type-small text-[var(--text-70)] m-0 text-center font-mono">
            The curriculum and the Enforcer are free permanently. Anything paid later sits alongside them, never in place of them.
          </p>
        </div>
      </section>

      {/* 12. FAQ */}
      <section id="faq" className="scroll-mt-14 section-pad border-b border-[var(--rule)]">
        <div className="container-shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Sticky title left */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col items-start gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--mint-text)]">
                | COMMON QUESTIONS
              </span>
              <h2 className="type-h2 m-0 text-[var(--text)]">
                Frequently asked questions.
              </h2>
              <p className="type-body text-[var(--text-70)] m-0">
                Direct technical answers on pricing, execution limits, and the $10 minimum deposit.
              </p>
              <Link href="/faq" className="btn-ghost text-xs mt-2">
                View all 12 answers →
              </Link>
            </div>

            {/* Accordions right */}
            <div className="lg:col-span-8 w-full border border-[var(--rule)] rounded-xl overflow-hidden bg-[var(--navy)]">
              <Accordion items={FAQ_ITEMS} />
            </div>
          </div>
        </div>
      </section>

      {/* 13. FINAL CTA BANNER */}
      <section className="section-pad bg-[var(--void)]">
        <div className="container-shell">
          <Reveal>
            <div className="relative rounded-2xl border border-[var(--rule)] bg-[var(--navy)] p-8 sm:p-12 lg:p-14 overflow-hidden shadow-2xl">
              {/* Radial Mint Glow */}
              <div
                aria-hidden="true"
                className="absolute -top-24 -right-24 w-96 h-96 bg-[radial-gradient(circle,rgba(122,243,198,0.12)_0%,transparent_70%)] pointer-events-none"
              />

              <div className="relative z-10 flex flex-col items-start gap-6 max-w-[680px]">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--mint-text)]">
                  | START SMALL
                </span>
                <h2 className="type-h1 m-0 text-[var(--text)]">
                  Start with the autopsy. It&apos;s free.
                </h2>
                <p className="type-body text-[var(--text-70)] m-0 leading-relaxed">
                  Read the full breakdown of the ₦32M loss before you fund or configure a single trade. Then open a segregated $10 account and enforce the limits.
                </p>
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <Link href="/autopsy" className="btn-mint">
                    Start with the autopsy
                  </Link>
                  <AffiliateLink placement="hero" className="btn-ghost">
                    Open $10 account
                  </AffiliateLink>
                </div>
                <div className="pt-4 border-t border-[var(--rule)] w-full">
                  <AffiliateDisclosure />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}