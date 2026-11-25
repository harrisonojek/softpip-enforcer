import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ScrollProgress } from "@/components/scroll-progress";
import { AuthorProofBlock } from "@/components/author-proof";
import { StatusLine } from "@/components/status-line";
import { GOVERNOR_SPEC } from "@/lib/governor-spec";
import { buildMetadata, DERIV_AFFILIATE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Harrison Ekuetafia Oghenerioborue & SoftPip — Trade with Rules",
  description:
    "Harrison Ekuetafia Oghenerioborue built SoftPip after losing ₦32,450,000 trading in 2025. Read the story of what happened, what survived, and why every tool is free.",
  path: "/about",
});

const WILL_NOT_DO_YET = [
  {
    title: "Paid tier",
    detail: "The curriculum and the Enforcer are free permanently. Anything paid later sits alongside them, never in place of them.",
  },
  {
    title: "Signals",
    detail: "No entry alerts, no Telegram call channels, and no predictions. Discretionary signals create dependence and hide process failures.",
  },
  {
    title: "Copy trading",
    detail: "No account pooling or master-slave mirrors. Every trader must control their own execution socket and understand their risk parameters.",
  },
  {
    title: "A second broker",
    detail: "Deriv is currently our sole supported platform. We will not dilute risk governor compatibility across multiple venues until Deriv execution is mastered.",
  },
  {
    title: "An Intelligence division",
    detail: "Research remains an incubation track within SoftPip Academy until four empirical, peer-reviewed market papers are completed and published.",
  },
  {
    title: "A newsletter",
    detail: "We do not run email marketing blasts or weekly commentary. All communications happen publicly via the Telegram group and documentation.",
  },
  {
    title: "A mobile app",
    detail: "The Enforcer runs as a resilient Python daemon on VPS or Docker. We prioritize socket stability and circuit breaker reliability over mobile app gimmicks.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="section-pad min-h-screen">
      <ScrollProgress />
      <div className="container-shell flex flex-col gap-12">
        {/* Header Hero Section: Left column portrait on desktop, full width above text on mobile */}
        <Reveal className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Portrait Left */}
          <div className="w-full max-w-[420px] shrink-0">
            <div className="relative aspect-[4/5] w-full rounded-[20px] overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
              <Image
                src="/images/about-portrait.png"
                alt="Harrison Ekuetafia Oghenerioborue, photographed against a plain background."
                width={800}
                height={1000}
                priority
                className="w-full h-full object-cover"
                style={{ objectPosition: "50% 22%" }}
              />
            </div>
          </div>

          {/* Right Column: Bio Narrative */}
          <div className="flex flex-col gap-5 max-w-[700px]">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
              <span className="type-micro uppercase text-[var(--mint-text)] tracking-wider">
                Background · Founder &amp; Architecture
              </span>
            </div>

            <h1 className="type-h1 m-0">The engineer behind the autopsy.</h1>

            <div className="flex flex-col gap-4 type-body text-[var(--text-70)] prose-col leading-relaxed">
              <p className="m-0 text-[var(--text)] font-medium">
                I&apos;m Harrison Ekuetafia Oghenerioborue. I&apos;ve traded synthetic indices for six years.
              </p>
              <p className="m-0">
                That&apos;s long enough to have a method, and long enough to know a method isn&apos;t a system. Venture building, risk architecture and positioning took up the other three years, for founders and public figures across Nigeria. Two hundred operators protected is a number I can point at. The lesson that survived all of it was the one I ignored in my own trading: a decision without a system is just a mood.
              </p>
              <p className="m-0">
                In 2025 that cost me ₦32,450,000 <span className="text-[var(--text-45)]">(≈$21,600)</span> across ten months. Not one bad call. A ratchet on position size, stops I moved, and a bot I never audited.
              </p>
              <p className="m-0 text-[var(--mint-text)] font-medium">
                So I wrote the rules down, put them in code, and gave both away. That&apos;s SoftPip.
              </p>
            </div>

            <div className="pt-2">
              <StatusLine className="mx-0" />
            </div>
          </div>
        </Reveal>

        {/* Author Proof Block */}
        <Reveal delayMs={70} className="max-w-[800px]">
          <AuthorProofBlock />
        </Reveal>

        {/* 700+ Words Narrative in 3 Distinct Sections */}
        <div className="flex flex-col gap-12 prose-col pt-4">
          {/* Section 1: Before */}
          <Reveal delayMs={140} className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="type-micro font-mono text-[var(--mint-text)] px-2 py-0.5 rounded bg-[var(--slate)] border border-[var(--line)]">
                PART 01
              </span>
              <h2 className="type-h2 m-0 text-[var(--text)]">Before</h2>
            </div>

            <p className="type-body text-[var(--text-70)] m-0 leading-relaxed">
              Before 2025, I believed that software engineering skill transferred directly into financial trading edge. I have spent years writing backend code, architecting microservices, and debugging distributed databases across client applications in Nigeria and remote engineering contracts abroad. I understood data structures, network latency, asynchronous event loops, and mathematical probability.
            </p>

            <p className="type-body text-[var(--text-70)] m-0 leading-relaxed">
              When I began exploring synthetic indices on Deriv in late 2024, the proposition seemed clean. Unlike currency pairs or traditional equities, synthetic indices like Volatility 75 and Volatility 100 are not subject to central bank rate surprises, geopolitical shocks, or illiquid bank holidays. The price tick feeds are generated cryptographically with constant volatility parameters around the clock. To a software engineer, this looked like an orderly, deterministic environment ideally suited for automated rule enforcement and algorithmic execution.
            </p>

            <p className="type-body text-[var(--text-70)] m-0 leading-relaxed">
              In January 2025, I deposited ₦4,500,000 into my primary Deriv account. For the first two months, the system appeared to work flawlessly. Trading 5-tick Rise/Fall contracts with disciplined 1.5% stakes, my equity expanded to ₦9,180,000 by late March across 382 logged positions. My win rate was 58.4%. The early success was the worst thing that could have happened: it convinced me that I possessed an analytical edge over the synthetic price feed, blinding me to the reality that my initial run was simply a positive variance cluster in a random walk.
            </p>
          </Reveal>

          {/* Section 2: The ₦32M */}
          <Reveal className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="type-micro font-mono text-[var(--rust)] px-2 py-0.5 rounded bg-[var(--slate)] border border-[var(--line)]">
                PART 02
              </span>
              <h2 className="type-h2 m-0 text-[var(--text)]">The ₦32M</h2>
            </div>

            <p className="type-body text-[var(--text-70)] m-0 leading-relaxed">
              The unraveling was not instantaneous; it was a seven-month progressive failure across multiple layers of sizing, tooling, and psychology. In April 2025, when account equity dropped from ₦9.18M to ₦7.4M during a normal drawdown regime, I made the classic fatal error: I refused to reduce my stake size. To accelerate recovery, I elevated base stakes from $44 to $150 per contract. When you elevate your stake in the middle of a drawdown, you turn a manageable pullback into an existential threat.
            </p>

            <p className="type-body text-[var(--text-70)] m-0 leading-relaxed">
              By May, I attempted to automate execution using a Node.js WebSocket script. The script was unaudited. It contained catastrophic architectural defects: unchecked reconnect loops that re-fired orders on dropped socket frames, absence of account margin polling before proposal dispatch, and an in-memory 2.0× Martingale multiplier. On July 12, during an intermittent internet disruption in Warri, the script executed 14 duplicate $200 contracts in 800 milliseconds, wiping out ₦8.6M of equity in under two seconds.
            </p>

            <p className="type-body text-[var(--text-70)] m-0 leading-relaxed">
              Instead of shutting down the operation and conducting a forensic review, I entered the psychological spiral of revenge trading. I funded an ₦11.2M reload wire on July 16, and on October 22, I deposited a final ₦16.75M in an attempt to recover the cumulative drawdown before the close of October. The terminal sequence occurred between the evening of October 27 and the early morning of October 28, 2025. Over a seven-hour period, the bot encountered a 19-trade losing streak on Volatility 75. Doubling stakes at each step, the capital requirement reached $3,200 on step eight. With only $2,840 remaining in the wallet, I manually intervened, overrode the system, and placed the entire balance on a final contract. At 01:14:48 UTC on October 28, the contract expired out of the money.
            </p>

            <p className="type-body text-[var(--text-70)] m-0 leading-relaxed">
              The account balance stood at $1.42. Across 2025, I had deposited and lost exactly ₦32,450,000. It represented 14 months of engineering income, savings earmarked for launching an independent software studio in Nigeria, and the trust of family members.
            </p>
          </Reveal>

          {/* Section 3: What survived */}
          <Reveal className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="type-micro font-mono text-[var(--mint-text)] px-2 py-0.5 rounded bg-[var(--slate)] border border-[var(--line)]">
                PART 03
              </span>
              <h2 className="type-h2 m-0 text-[var(--text)]">What survived</h2>
            </div>

            <p className="type-body text-[var(--text-70)] m-0 leading-relaxed">
              After losing ₦32M, every illusion about trading was stripped away. I recognized that retail trading culture in Nigeria—and across the globe—is fundamentally predatory. It is dominated by influencers renting luxury cars for Instagram photos, selling $500 VIP signal channels that blow accounts within weeks, and peddling Martingale bots that promise guaranteed passive income.
            </p>

            <p className="type-body text-[var(--text-70)] m-0 leading-relaxed">
              What survived that devastation was an engineering realization: you cannot solve human psychological frailty with willpower. When you are on trade four of a losing streak, your brain is flooded with cortisol. You cannot trust yourself to respect a mental stop loss, close the laptop, or avoid doubling your stake. The only solution is to remove execution authority from human hands and delegate it to a deterministic software governor.
            </p>

            <p className="type-body text-[var(--text-70)] m-0 leading-relaxed">
              I wrote <strong>The Enforcer</strong> in Python to serve as an uncompromising risk container. It enforces hard process-level constraints: a flat ${GOVERNOR_SPEC.base_stake_usd.toFixed(2)} stake floor, a maximum {GOVERNOR_SPEC.multiplier}× ladder capped strictly at {GOVERNOR_SPEC.max_ladder_steps} steps (${GOVERNOR_SPEC.ladder_total_risk_usd.toFixed(2)} total risk), a {Math.round(GOVERNOR_SPEC.daily_loss_limit_pct_of_equity * 100)}% daily loss cap with a ${GOVERNOR_SPEC.daily_loss_limit_floor_usd.toFixed(2)} floor, an automated {Math.round(GOVERNOR_SPEC.cool_off_seconds / 60)}-minute socket cool-off after {GOVERNOR_SPEC.max_consecutive_losses} consecutive losses, and a {Math.round(GOVERNOR_SPEC.session_timeout_seconds / 60)}-minute session kill switch. When the limit is reached, the process exits. There is no manual override button.
            </p>

            <p className="type-body text-[var(--text-70)] m-0 leading-relaxed">
              I also authored the ten-module curriculum to teach the mathematics of synthetic index PRNG feeds, drawdown asymmetry, and position sizing. Everything is documented backwards from the actual technical errors of the ₦32M autopsy.
            </p>

            <h3 className="type-h3 text-[var(--text)] pt-4 m-0">Why everything is free</h3>

            <p className="type-body text-[var(--text-70)] m-0 leading-relaxed">
              Visitors frequently ask what the catch is. The autopsy is free, the curriculum is free, the open-source bot is free, and the Telegram community is free. Why?
            </p>

            <p className="type-body text-[var(--text-70)] m-0 leading-relaxed">
              Because upfront fees corrupt incentives. If I charge you ₦50,000 for a course or $200 for a trading bot, my economic incentive is satisfied the moment you make payment. It does not matter to my bank account whether you survive 30 days or blow your balance on Monday morning.
            </p>

            <p className="type-body text-[var(--text-70)] m-0 leading-relaxed">
              The curriculum and the Enforcer are free permanently. Anything paid later sits alongside them, never in place of them.
            </p>

            <p className="type-body text-[var(--text-70)] m-0 leading-relaxed">
              SoftPip operates on a Deriv affiliate revenue share model: 40% net revenue on Options volume, plus a 7.5% override on sub-partner commissions as a Master Partner. Under this model, my economic interest is 100% aligned with your long-term survival. If you blow up your $10 account in 30 minutes through Martingale doubling, I earn zero and lose a community member. I only earn when you stay disciplined, enforce your daily loss cap, survive month after month, and trade with mathematical restraint.
            </p>

            <p className="type-body text-[var(--text-70)] m-0 leading-relaxed">
              The only requirement asked of any visitor is to open and fund a segregated $10 Deriv account using the link, and to follow the guardian limits.
            </p>
          </Reveal>
        </div>

        {/* What SoftPip will not do yet */}
        <Reveal delayMs={160} className="surface-card p-8 sm:p-10 rounded-2xl flex flex-col gap-6 max-w-[800px] border border-[var(--border)]">
          <div className="flex flex-col gap-2">
            <span className="type-micro uppercase text-[var(--rust)] font-semibold tracking-wider">
              Boundaries &amp; Scope
            </span>
            <h2 className="type-h2 m-0 text-[var(--text)]">
              What SoftPip will not do yet
            </h2>
            <p className="type-small text-[var(--text-70)] m-0">
              To preserve architectural integrity and avoid the predatory traps of retail forex marketing, we hold firm non-negotiable boundaries:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {WILL_NOT_DO_YET.map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-xl bg-[var(--slate)] border border-[var(--rule)] flex flex-col gap-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--rust)] shrink-0" aria-hidden="true" />
                  <span className="type-small font-semibold text-[var(--text)]">
                    {item.title}
                  </span>
                </div>
                <p className="type-micro text-[var(--text-70)] m-0 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Closing CTAs */}
        <div className="pt-8 hairline-t">
          <Reveal>
            <div className="surface-card p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex flex-col gap-2">
                <span className="type-micro uppercase text-[var(--mint-text)] font-semibold">
                  Start Learning
                </span>
                <h3 className="type-h3 m-0 text-[var(--text)]">
                  Read the ten-module curriculum
                </h3>
                <p className="type-small text-[var(--text-70)] m-0 max-w-[50ch]">
                  Understand how synthetic indices are generated and why disciplined risk containment is your only mathematical defense.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link href="/academy" className="btn-mint">
                  Explore curriculum →
                </Link>
                <Link href="/labs/enforcer" className="btn-ghost">
                  Inspect the bot
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
    </div>
  );
}
