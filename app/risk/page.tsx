import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ScrollProgress } from "@/components/scroll-progress";
import { buildMetadata, DERIV_AFFILIATE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Risk Warning & Protocol Disclosures | SoftPip",
  description:
    "Deriv regulatory risk warning, synthetic index derivative characteristics, capital loss exposure, and 5 mandatory disclosures for $10 accounts.",
  path: "/risk",
});

export default function RiskPage() {
  return (
    <div className="section-pad min-h-screen">
      <ScrollProgress />
      <div className="container-shell flex flex-col gap-12">
        {/* Header */}
        <Reveal className="flex flex-col gap-5 max-w-[800px]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--rust)]" aria-hidden="true" />
            <span className="type-micro uppercase text-[var(--rust)] tracking-wider">
              Mandatory Regulatory & System Risk Notice
            </span>
          </div>

          <h1 className="type-h1 m-0">Risk.</h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            Trading financial instruments involves significant mathematical risk of total capital loss. SoftPip provides open-source risk architecture, an educational curriculum, and post-loss analysis. We do not provide financial advice, signal subscriptions, or investment management.
          </p>
        </Reveal>

        {/* 64ch body column */}
        <div className="flex flex-col gap-10 prose-col">
          {/* Statutory Deriv Risk Warning */}
          <Reveal delayMs={0} className="flex flex-col gap-4">
            <h2 className="type-h3 text-[var(--text)] m-0">Deriv Official Risk Warning</h2>
            <div className="surface-card p-6 sm:p-8 rounded-[16px] border-[var(--rust)]/30 bg-[var(--navy)]">
              <p className="type-body text-[var(--text)] m-0 leading-relaxed italic">
                &ldquo;The products offered on the trade.deriv.com website include Options, Contracts for Difference (&quot;CFDs&quot;), and other complex derivatives. Trading Options may not be suitable for everyone. Trading CFDs carries a high level of risk since leverage can work both to your advantage and disadvantage. As a result, the products offered on the website may not be suitable for all investors because of the risk of losing all of your invested capital. You should never invest money that you cannot afford to lose and never trade with borrowed money. Before trading in the complex products offered, please be sure to understand the risks involved.&rdquo;
              </p>
            </div>
          </Reveal>

          {/* Five Blunt Bullets */}
          <Reveal delayMs={70} className="flex flex-col gap-5">
            <h2 className="type-h3 text-[var(--text)] m-0">Five Operational Disclosures</h2>
            <p className="type-small text-[var(--text-70)] m-0">
              Read these five statements before connecting an API token to The Enforcer or opening a funded contract:
            </p>

            <ul className="list-disc pl-5 space-y-4 text-[var(--text-70)] type-body m-0">
              <li>
                <strong className="text-[var(--text)]">Minimum stake is 3.5% of a $10 account.</strong>{" "}
                Deriv enforces a $0.35 floor on Volatility 75 index options. Sizing at $0.35 on a $10 balance leaves exactly 28 trades before complete exhaustion. In professional asset management, 3.5% per trade is considered aggressive high-risk exposure; it is not a conservative baseline.
              </li>
              <li>
                <strong className="text-[var(--text)]">You can lose the whole $10.</strong>{" "}
                Synthetic index price action exhibits kurtosis, clustering, and adverse micro-runs. A streak of five to six consecutive loss ticks will occur regularly within any sample of 200 trades. If your capital is required for living expenses, do not deposit it.
              </li>
              <li>
                <strong className="text-[var(--text)]">No bot survives every regime.</strong>{" "}
                The Enforcer is a risk governor, not a predictive oracle. It monitors equity drawdown, consecutive losses, and time-in-market to pull execution brakes. It does not alter tick distributions or predict contract outcomes. In an extreme regime, the bot will hit its hard kill-switch and stop; it cannot make a losing thesis profitable.
              </li>
              <li>
                <strong className="text-[var(--text)]">Commission is not a recommendation.</strong>{" "}
                SoftPip is funded solely via Deriv partner affiliate commissions (40% net revenue on options). The existence of an affiliate relationship does not constitute an endorsement of specific contracts, trade frequency, or market participation. You trade entirely at your own discretion.
              </li>
              <li>
                <strong className="text-[var(--text)]">Past weeks are not forecasts.</strong>{" "}
                Historical performance data, seed logs, and backtests presented across SoftPip demonstrate mathematical risk mechanics and governor activation thresholds. They are not guarantees or probabilistic indicators of future yields.
              </li>
            </ul>
          </Reveal>

          {/* Software Disclaimer */}
          <Reveal delayMs={140} className="flex flex-col gap-4">
            <h2 className="type-h3 text-[var(--text)] m-0">Open-Source Code & No Liability</h2>
            <p className="type-small text-[var(--text-70)] m-0 leading-relaxed">
              The Enforcer software (<code>governor.py</code>) is provided under the MIT License on an &ldquo;as is&rdquo; basis, without warranty of any kind, express or implied. Under no circumstances shall Oghenerioborue Harrison Ekuetafia or SoftPip contributors be liable for any claims, financial damages, network latency drops, Deriv API outages, or monetary losses arising from the use or execution of this repository.
            </p>
          </Reveal>

          {/* Action Row */}
          <Reveal delayMs={200} className="pt-6 hairline-t flex flex-wrap items-center gap-4">
            <Link href="/autopsy" className="btn-secondary">
              Read the ₦32M Autopsy
            </Link>
            <Link href="/academy" className="btn-secondary">
              Review Module 01: Ruin Probability
            </Link>
            <a
              href={DERIV_AFFILIATE_URL}
              target="_blank"
              rel="sponsored noopener"
              className="btn-primary"
            >
              Open $10 Deriv Account →
            </a>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
