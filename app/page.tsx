import React from "react";
import Link from "next/link";
import { IconMark } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { StatRow } from "@/components/stat-card";
import {
  CURRICULUM_MODULES_PREVIEW,
  ModuleRow,
} from "@/components/module-row";
import { RustCaveatCard, SpecCard } from "@/components/spec-card";
import { HeroBloom, HeroHeadline } from "@/components/hero-headline";
import { CtaSpotlight } from "@/components/cta-spotlight";
import {
  TRACK_RECORD_WEEKS,
  formatNairaSigned,
} from "@/lib/track-record";
import { DERIV_AFFILIATE_URL, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SoftPip — Trade with rules, not feelings.",
  description:
    "In 2025 I lost ₦32M trading. The full autopsy, ten-module curriculum, and open-source risk governor bot are free. You need $10 to start.",
  path: "/",
});

const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    title: "Fund $10 through the link",
    body: "Open a new Deriv Options account with $10. Keep that balance segregated from any manual discretionary account.",
    ctaLabel: "Open $10 account →",
    ctaHref: DERIV_AFFILIATE_URL,
    external: true,
  },
  {
    number: "02",
    title: "Take the free curriculum and bot",
    body: "Read the ten modules covering synthetic index RNG mechanics, risk-of-ruin math, and token security before deploying code.",
    ctaLabel: "Read curriculum →",
    ctaHref: "/curriculum",
    external: false,
  },
  {
    number: "03",
    title: "Follow the guardian limits",
    body: "Run The Enforcer on demo first. Let the $0.35 flat floor, $1.00 daily loss cap, and 15-minute cool-off lock out revenge trades.",
    ctaLabel: "Inspect the bot →",
    ctaHref: "/bot",
    external: false,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Module 05 broke down why my ₦45,000 balance kept dying on step five of a 2× recovery ladder. Switching to a hard $1.00 daily loss stop kept my $10 test account alive past week four for the first time.",
    author: "Tunde",
    city: "Lagos",
  },
  {
    quote:
      "The autopsy read like my own statement history. No screenshots of sports cars, just the exact math on why missing stops and unverified bots wipe small accounts.",
    author: "Chinedu",
    city: "Port Harcourt",
  },
  {
    quote:
      "The 15-minute cool-off after three consecutive losses is the only reason I still have my initial deposit. When the bot halts and messages Telegram, I close the app.",
    author: "Aisha",
    city: "Abuja",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* 1. Hero & 2. Two CTAs & 3. Stat row */}
      <section className="hero-section section-pad mint-glow hairline-b relative overflow-hidden">
        <HeroBloom />
        <div className="container-shell flex flex-col gap-12 relative z-10">
          <Reveal className="flex flex-col items-start gap-6">
            <IconMark size={28} />

            <HeroHeadline />

            <p className="type-body text-[var(--text-70)] m-0 prose-col">
              In 2025 I lost ₦32M trading. The full autopsy is free. So is the
              ten-module curriculum and the risk bot. You need $10 to start.
            </p>

            {/* 2. Two CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link href="/autopsy" className="btn-mint">
                Start with the autopsy
              </Link>
              <Link href="/bot" className="btn-ghost">
                See the bot
              </Link>
            </div>
          </Reveal>

          {/* 3. Stat row */}
          <Reveal delayMs={70}>
            <StatRow />
          </Reveal>
        </div>
      </section>

      {/* 4. How it works */}
      <section className="section-pad hairline-b">
        <div className="container-shell flex flex-col gap-10">
          <Reveal className="flex flex-col gap-3">
            <span className="type-micro uppercase text-[var(--text-45)]">
              01 · Architecture
            </span>
            <h2 className="type-h2 m-0">How it works</h2>
            <p className="type-body text-[var(--text-70)] m-0 prose-col">
              Three steps designed to stop account blowups before you scale past
              minimum stake.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <Reveal key={step.number} delayMs={idx * 70}>
                <div className="surface-card-interactive p-6 sm:p-7 h-full flex flex-col justify-between gap-6">
                  <div className="flex flex-col gap-3">
                    <span
                      className={`type-micro tabular-nums ${
                        idx === 0
                          ? "text-[var(--mint-text)]"
                          : "text-[var(--text-45)]"
                      }`}
                    >
                      {step.number}
                    </span>
                    <h3 className="type-h3 m-0 text-[var(--text)]">
                      {step.title}
                    </h3>
                    <p className="type-small text-[var(--text-70)] m-0">
                      {step.body}
                    </p>
                  </div>

                  <div>
                    {step.external ? (
                      <a
                        href={step.ctaHref}
                        rel="sponsored noopener"
                        target="_blank"
                        className="inline-flex items-center min-h-[44px] type-small text-[var(--mint-text)] hover:underline font-medium"
                      >
                        {step.ctaLabel}
                      </a>
                    ) : (
                      <Link
                        href={step.ctaHref}
                        className="inline-flex items-center min-h-[44px] type-small text-[var(--text-70)] hover:text-[var(--text)] font-medium transition-colors"
                      >
                        {step.ctaLabel}
                      </Link>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delayMs={210}>
            <p className="type-small text-[var(--text-45)] m-0 prose-col">
              Nothing is charged. I earn commission from Deriv, disclosed in the
              footer.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5. Curriculum preview */}
      <section className="section-pad hairline-b">
        <div className="container-shell flex flex-col gap-10">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-3">
              <span className="type-micro uppercase text-[var(--text-45)]">
                02 · Curriculum
              </span>
              <h2 className="type-h2 m-0">
                Ten modules. Built backwards from the failures.
              </h2>
              <p className="type-body text-[var(--text-70)] m-0 prose-col">
                Most courses teach entries. These start at the thing that kills
                accounts and work outward.
              </p>
            </div>
            <Link
              href="/curriculum"
              className="btn-ghost shrink-0 self-start sm:self-auto"
            >
              View all 10 modules →
            </Link>
          </Reveal>

          <div className="flex flex-col gap-3">
            {CURRICULUM_MODULES_PREVIEW.map((mod, idx) => (
              <Reveal key={mod.slug} delayMs={idx * 70}>
                <ModuleRow module={mod} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Bot teaser */}
      <section className="section-pad hairline-b">
        <div className="container-shell flex flex-col gap-8">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-3">
              <span className="type-micro uppercase text-[var(--text-45)]">
                03 · The Enforcer
              </span>
              <h2 className="type-h2 m-0">
                Open-source risk governor for $10 accounts.
              </h2>
              <p className="type-body text-[var(--text-70)] m-0 prose-col">
                Hard-coded position ceilings, drawdown halts, and socket
                kill-switches written in Python. MIT licensed.
              </p>
            </div>
            <Link
              href="/bot"
              className="btn-ghost shrink-0 self-start sm:self-auto"
            >
              Full bot specification →
            </Link>
          </Reveal>

          <Reveal delayMs={70}>
            <RustCaveatCard />
          </Reveal>

          <Reveal delayMs={140}>
            <SpecCard />
          </Reveal>
        </div>
      </section>

      {/* 7. Track record strip */}
      <section className="section-pad hairline-b">
        <div className="container-shell flex flex-col gap-10">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-3">
              <span className="type-micro uppercase text-[var(--text-45)]">
                04 · Verification
              </span>
              <h2 className="type-h2 m-0">Last four weeks. Red weeks included.</h2>
              <p className="type-body text-[var(--text-70)] m-0 prose-col">
                Logged weekly from demo forward-testing before any live promotion.
                Past sessions are historical records, not forecasts.
              </p>
            </div>
            <Link
              href="/track-record"
              className="btn-ghost shrink-0 self-start sm:self-auto"
            >
              Inspect full ledger →
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRACK_RECORD_WEEKS.map((item, idx) => {
              const isPositive = item.netNaira >= 0;
              return (
                <Reveal key={item.id} delayMs={idx * 70}>
                  <div className="surface-card p-6 h-full flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="type-micro text-[var(--text-45)]">
                          {item.week}
                        </span>
                        <span className="type-micro px-2 py-0.5 rounded-full border border-[var(--line)] text-[var(--text-70)] bg-[var(--slate)]">
                          {item.environment}
                        </span>
                      </div>
                      <p
                        className={`type-h2 m-0 tabular-nums pt-1 ${
                          isPositive
                            ? "text-[var(--mint-text)]"
                            : "text-[var(--rust)]"
                        }`}
                      >
                        {formatNairaSigned(item.netNaira)}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 pt-3 hairline-t">
                      <div className="flex items-center justify-between type-micro text-[var(--text-70)]">
                        <span>{item.trades} trades</span>
                        <span>Max DD {item.maxDrawdownPct.toFixed(1)}%</span>
                      </div>
                      <p className="type-small text-[var(--text-70)] m-0 pt-1">
                        {item.notes}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className="section-pad hairline-b">
        <div className="container-shell flex flex-col gap-10">
          <Reveal className="flex flex-col gap-3">
            <span className="type-micro uppercase text-[var(--text-45)]">
              05 · Field notes
            </span>
            <h2 className="type-h2 m-0">Traders using the limits</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, idx) => (
              <Reveal key={t.author} delayMs={idx * 70}>
                <div className="surface-card p-6 sm:p-7 h-full flex flex-col justify-between gap-6">
                  <p className="type-body text-[var(--text)] m-0">
                    “{t.quote}”
                  </p>
                  <div className="pt-4 hairline-t flex items-center justify-between">
                    <span className="type-small font-medium text-[var(--text)]">
                      {t.author}
                    </span>
                    <span className="type-micro text-[var(--text-45)]">
                      {t.city}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="section-pad">
        <div className="container-shell">
          <Reveal>
            <CtaSpotlight className="mint-glow p-8 sm:p-12 lg:p-14 flex flex-col items-start gap-6">
              <span className="type-micro uppercase text-[var(--mint-text)]">
                Eight pages · Dates and figures · Free
              </span>
              <h2 className="type-h1 m-0 max-w-[20ch]">
                Start with the autopsy. It&apos;s free.
              </h2>
              <p className="type-body text-[var(--text-70)] m-0 prose-col">
                Read the full breakdown of the ₦32M loss before you fund or
                configure a single trade. Then open a segregated $10 account and
                enforce the limits.
              </p>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link href="/autopsy" className="btn-mint">
                  Start with the autopsy
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
            </CtaSpotlight>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
