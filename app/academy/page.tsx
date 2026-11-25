import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { getAllCurriculumModules } from "@/lib/content";
import { buildMetadata, DERIV_AFFILIATE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Ten modules. Free. Built backwards from the failures. — SoftPip Academy",
  description:
    "Most courses teach entries. These start at the thing that kills accounts and work outward. Ten free modules on risk, synthetic PRNGs, and bot governance.",
  path: "/academy",
});

export default async function AcademyPage() {
  const modules = await getAllCurriculumModules();

  return (
    <div className="section-pad min-h-screen">
      <div className="container-shell flex flex-col gap-12">
        {/* Header */}
        <Reveal className="flex flex-col gap-4 max-w-[800px]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
            <span className="type-micro uppercase text-[var(--mint-text)] tracking-wider">
              Pillar 01 · SoftPip Academy · Ten Modules
            </span>
          </div>

          <h1 className="type-h1 m-0">
            Ten modules. Free. Built backwards from the failures.
          </h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            Most courses teach entries. These start at the thing that kills
            accounts and work outward.
          </p>
        </Reveal>

        {/* Module Rows (Ten modules, nothing locked) */}
        <div className="flex flex-col gap-3">
          {modules.map((m, idx) => (
            <Reveal key={m.slug} delayMs={Math.min(idx, 4) * 60}>
              <Link
                href={`/academy/${m.slug}`}
                className="surface-card-interactive p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-underline group"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <span
                    className="type-h3 font-mono font-medium tabular-nums text-[var(--text-45)] group-hover:text-[var(--mint-text)] transition-colors pt-0.5 shrink-0"
                  >
                    {m.index}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h2 className="type-h3 m-0 text-[var(--text)] group-hover:text-[var(--mint-text)] transition-colors">
                      {m.title}
                    </h2>
                    <p className="type-small text-[var(--text-70)] m-0 prose-col">
                      {m.outcome}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5 pl-10 sm:pl-0 shrink-0">
                  <span className="type-micro text-[var(--text-45)] tabular-nums">
                    {m.duration}
                  </span>
                  <span
                    className="type-small text-[var(--text-45)] group-hover:text-[var(--mint-text)] transition-colors"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Pathway Card: Capital Scaling Ladder */}
        <Reveal>
          <Link
            href="/scaling"
            className="surface-card-interactive p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 no-underline group"
          >
            <div className="flex flex-col gap-2 max-w-[680px]">
              <div className="inline-flex items-center gap-2">
                <span className="type-micro uppercase text-[var(--mint-text)] font-semibold tracking-wider">
                  Next Pathway · Capital Progression
                </span>
              </div>
              <h2 className="type-h2 m-0 text-xl text-[var(--text)] group-hover:text-[var(--mint-text)] transition-colors">
                The Capital Scaling Ladder: $10 to $1,000 →
              </h2>
              <p className="type-small text-[var(--text-70)] m-0 prose-col">
                A mathematical progression model that scales from $10 to $1,000+: 30-trade batches, mechanical drawdown floors, and graduation criteria that protect capital as balance increases.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[var(--mint-text)] group-hover:translate-x-1 transition-transform shrink-0 font-medium type-small">
              <span>Explore ladder</span>
              <span aria-hidden="true">→</span>
            </div>
          </Link>
        </Reveal>

        {/* Bottom Callout & Link */}
        <div className="pt-8 hairline-t">
          <Reveal>
            <div className="surface-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex flex-col gap-1.5">
                <span className="type-micro uppercase text-[var(--text-45)]">
                  Prerequisite
                </span>
                <p className="type-body text-[var(--text)] m-0 font-medium">
                  Have you read the full autopsy first?
                </p>
                <p className="type-small text-[var(--text-70)] m-0">
                  Every module references the specific failure mechanics from the ₦32M loss.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link href="/autopsy" className="btn-ghost">
                  Read the autopsy
                </Link>
                <a
                  href={DERIV_AFFILIATE_URL}
                  rel="sponsored noopener"
                  target="_blank"
                  className="btn-mint"
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
