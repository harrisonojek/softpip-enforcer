import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { PartnerForm } from "@/components/partner-form";
import { buildMetadata, DERIV_AFFILIATE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Partner Program — Keep 100% of Your Commission | SoftPip",
  description:
    "Deriv pays the override, not you. Ten a month. Free. Become a SoftPip sub-partner and equip your trading community with open-source risk governance.",
  path: "/partners",
});

interface RevenuePhase {
  phase: string;
  name: string;
  status: "live" | "milestone" | "future";
  timeline: string;
  mechanism: string;
  economics: string;
}

const REVENUE_PHASES: readonly RevenuePhase[] = [
  {
    phase: "Phase 01",
    name: "Affiliate Commission",
    status: "live",
    timeline: "Current (Live)",
    mechanism: "Standard Deriv partner commission on client volume across Options contracts.",
    economics: "40% net revenue share directly to your affiliate wallet.",
  },
  {
    phase: "Phase 02",
    name: "Master Partner Override",
    status: "milestone",
    timeline: "At 10 active referrals",
    mechanism: "Sub-affiliate network override tier enabled through SoftPip master partnership.",
    economics: "7.5% net override paid directly by Deriv, not subtracted from your commission.",
  },
  {
    phase: "Phase 03",
    name: "Adjacent Paid Tooling",
    status: "future",
    timeline: "After free core proves out",
    mechanism: "Optional hosted cloud instances, multi-broker bridges, or specialized high-frequency analytics.",
    economics: "The curriculum and the Enforcer are free permanently. Anything paid later sits alongside them, never in place of them.",
  },
  {
    phase: "Phase 04",
    name: "B2B & Enterprise Licensing",
    status: "future",
    timeline: "Year two+",
    mechanism: "Institutional risk governance APIs and turnkey compliance engines for prop firms and brokerages.",
    economics: "Enterprise annual recurring licensing contracts and volume SLAs.",
  },
];

export default function PartnerPage() {
  return (
    <div className="section-pad min-h-screen">
      <div className="container-shell flex flex-col gap-14">
        {/* Header */}
        <Reveal className="flex flex-col gap-5 max-w-[800px]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
            <span className="type-micro uppercase text-[var(--mint-text)] tracking-wider">
              Pillar 05 · SoftPip Partners
            </span>
          </div>

          <h1 className="type-h1 m-0">Keep 100% of your commission.</h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            Deriv pays the override, not you. Ten a month. Free.
          </p>

          <p className="type-small text-[var(--text-45)] m-0">
            You earn your own commission. I earn 7.5% of it as a Master Partner. It comes from Deriv, not you.
          </p>
        </Reveal>

        {/* 3 Overview Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Who this is for */}
          <Reveal delayMs={0}>
            <div className="surface-card p-6 sm:p-8 h-full flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--mint)]" aria-hidden="true" />
                <h2 className="type-h3 m-0 text-[var(--text)]">Who this is for</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-[var(--text-70)] type-small m-0 prose-col">
                <li>Trading community leaders, Telegram group administrators, and YouTube creators in Nigeria.</li>
                <li>Educators who want students trading with strict risk controls rather than blowing accounts in 72 hours.</li>
                <li>Technical affiliates seeking an open-source retention tool (The Enforcer) that keeps referrals active.</li>
                <li>Affiliates generating or aiming for at least 5 to 10 active funded accounts each month.</li>
              </ul>
            </div>
          </Reveal>

          {/* What you get */}
          <Reveal delayMs={70}>
            <div className="surface-card p-6 sm:p-8 h-full flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--mint)]" aria-hidden="true" />
                <h2 className="type-h3 m-0 text-[var(--text)]">What you get</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-[var(--text-70)] type-small m-0 prose-col">
                <li><strong>100% of your own Deriv commission:</strong> 40% net revenue share on Options volume directly to your wallet.</li>
                <li><strong>Turnkey educational curriculum:</strong> Ten modules you can freely provide to your community with zero licensing fees.</li>
                <li><strong>The Enforcer bot licensing:</strong> Right to distribute the open-source Python risk governor with custom presets.</li>
                <li><strong>Master Partner onboarding support:</strong> Expedited Deriv affiliate account linking and direct operational assistance.</li>
              </ul>
            </div>
          </Reveal>

          {/* What you commit to */}
          <Reveal delayMs={140}>
            <div className="surface-card p-6 sm:p-8 h-full flex flex-col gap-4 border-[var(--rule)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--rust)]" aria-hidden="true" />
                <h2 className="type-h3 m-0 text-[var(--text)]">What you commit to</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-[var(--text-70)] type-small m-0 prose-col">
                <li><strong>Zero profit guarantees:</strong> Never use words like &quot;passive income&quot;, &quot;financial freedom&quot;, or rocket emoji.</li>
                <li><strong>Strict $10 account segregation:</strong> Insisting that beginners test strategies with $10 before scaling capital.</li>
                <li><strong>Teaching risk of ruin:</strong> Educating referrals on why 2× Martingale doubling is fatal.</li>
                <li><strong>Permanent free core:</strong> The curriculum and the Enforcer are free permanently. Anything paid later sits alongside them, never in place of them.</li>
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Four-Phase Revenue Table */}
        <Reveal delayMs={160} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5 max-w-[800px]">
            <span className="type-micro uppercase text-[var(--mint-text)] font-semibold tracking-wider">
              Monetization Roadmap
            </span>
            <h2 className="type-h2 m-0 text-[var(--text)]">
              Four-Phase Revenue Architecture
            </h2>
            <p className="type-small text-[var(--text-70)] m-0 prose-col">
              How SoftPip builds commercial viability without upfront fees or paywalls. The curriculum and the Enforcer are free permanently. Anything paid later sits alongside them, never in place of them.
            </p>
          </div>

          <div className="surface-card overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="hairline-b bg-[var(--slate)] text-[var(--text-45)] type-micro font-mono uppercase">
                  <th className="py-3.5 px-5 font-medium">Phase</th>
                  <th className="py-3.5 px-5 font-medium">Stage &amp; Timeline</th>
                  <th className="py-3.5 px-5 font-medium">Mechanism</th>
                  <th className="py-3.5 px-5 font-medium">Economics</th>
                </tr>
              </thead>
              <tbody className="type-small divide-y divide-[var(--line)]">
                {REVENUE_PHASES.map((item) => (
                  <tr key={item.phase} className="hover:bg-[var(--slate)]/40 transition-colors">
                    <td className="py-4 px-5 align-top whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${
                          item.status === "live"
                            ? "bg-[var(--mint)]"
                            : item.status === "milestone"
                            ? "bg-[var(--mint-text)]"
                            : "bg-[var(--text-45)]"
                        }`} aria-hidden="true" />
                        <span className="font-semibold text-[var(--text)]">
                          {item.name}
                        </span>
                      </div>
                      <span className="type-micro font-mono text-[var(--text-45)] block mt-0.5">
                        {item.phase}
                      </span>
                    </td>
                    <td className="py-4 px-5 align-top whitespace-nowrap">
                      <span className="type-micro font-mono px-2 py-0.5 rounded bg-[var(--slate)] border border-[var(--rule)] text-[var(--text-70)]">
                        {item.timeline}
                      </span>
                    </td>
                    <td className="py-4 px-5 align-top text-[var(--text-70)] max-w-[280px]">
                      {item.mechanism}
                    </td>
                    <td className="py-4 px-5 align-top text-[var(--text)] font-medium max-w-[300px]">
                      {item.economics}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Application Form */}
        <Reveal delayMs={200} className="max-w-[680px]">
          <PartnerForm />
        </Reveal>

        {/* Closing Footnote */}
        <div className="pt-6 hairline-t">
          <Reveal>
            <div className="surface-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex flex-col gap-1.5">
                <span className="type-micro uppercase text-[var(--text-45)]">
                  Affiliate Disclosure
                </span>
                <p className="type-small text-[var(--text-70)] m-0">
                  SoftPip earns commission when you or your referrals trade on Deriv. You earn 100% of your own commission. Deriv pays our override separately.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={DERIV_AFFILIATE_URL}
                  rel="sponsored noopener"
                  target="_blank"
                  className="btn-mint"
                >
                  Open Deriv Account
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
