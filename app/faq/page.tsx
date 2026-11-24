import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Accordion, type AccordionItem } from "@/components/accordion";
import { buildMetadata, DERIV_AFFILIATE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions | SoftPip",
  description:
    "Direct technical answers on pricing, the $10 minimum deposit, The Enforcer architecture, VPS hosting, Deriv affiliate commissions, and execution limits.",
  path: "/faq",
});

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: "is-it-really-free",
    question: "Is it really free?",
    answer: (
      <p className="m-0">
        Yes. The autopsy report, the ten curriculum modules, the Python source code for The Enforcer bot, and the Telegram community are 100% free with zero paywalls, locked tiers, or private subscription fees. The project is funded entirely via Deriv affiliate partner commissions when you open a new account through our referral link.
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
  {
    id: "which-vps-is-recommended",
    question: "Which VPS is recommended?",
    answer: (
      <p className="m-0">
        Any budget Linux virtual private server with 1 vCPU and 1GB RAM is sufficient. Hetzner Cloud (CX22 at ~€3.79/month) or DigitalOcean ($4–$6/month droplet) are ideal. A low-latency server located in Frankfurt or London connects to Deriv&apos;s WebSocket API endpoints in under 15ms.
      </p>
    ),
  },
  {
    id: "does-it-work-on-mt5",
    question: "Does it work on MT5?",
    answer: (
      <p className="m-0">
        No. The Enforcer connects directly to Deriv&apos;s native WebSocket API (<code>wss://ws.derivws.com/websockets/v3</code>) for Options contracts. MT5 uses Contracts for Difference (CFDs) with pip-based spread and variable lot sizing, where a $10 account can be wiped out on a single 15-pip spread spike. Options have a fixed, non-expandable risk per contract.
      </p>
    ),
  },
  {
    id: "why-must-i-use-your-referral-link",
    question: "Why must I use your referral link?",
    answer: (
      <p className="m-0">
        Because it is the economic foundation that keeps this entire platform free. Deriv pays SoftPip a 40% net revenue commission on options trade volume. It costs you nothing extra—your contract pricing, payout rates, and execution speeds are identical whether you use our link or register directly. It aligns our incentives with your survival: if you blow your account on day one, we earn nothing.
      </p>
    ),
  },
  {
    id: "what-if-i-already-have-a-deriv-account",
    question: "What if I already have a Deriv account?",
    answer: (
      <p className="m-0">
        Under Deriv affiliate compliance rules, accounts active within the last 120 days cannot be retroactively linked to an affiliate. If you traded recently on Deriv, you can either trade with your existing account using the free open-source bot directly from GitHub, or create a new dedicated sub-account via a new email address through our link to qualify for community onboarding.
      </p>
    ),
  },
  {
    id: "do-you-take-a-cut-of-my-profits",
    question: "Do you take a cut of my profits?",
    answer: (
      <p className="m-0">
        Never. 100% of your trading profits belong to you. We do not operate a profit-sharing fund, a copy-trading pool, or an account management service. SoftPip never touches your trading balance or asks for withdrawal access.
      </p>
    ),
  },
  {
    id: "whats-the-catch",
    question: "What's the catch?",
    answer: (
      <p className="m-0">
        There is no hidden trick. The catch is psychological: most traders cannot accept starting with only $10. They crave fast ₦1M windfalls and fall victim to signal vendors who promise overnight riches. SoftPip demands emotional restraint, rigorous math, and adherence to strict risk limits. If you cannot discipline yourself to manage a $10 balance, you cannot manage ₦32M.
      </p>
    ),
  },
];

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is it really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The autopsy report, the ten curriculum modules, the Python source code for The Enforcer bot, and the Telegram community are 100% free with zero paywalls or subscription fees. The project is funded entirely via Deriv affiliate partner commissions.",
        },
      },
      {
        "@type": "Question",
        name: "Why $10?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Because scaling an untested trading system before mastering risk of ruin is dangerous. A $10 deposit provides psychological skin in the game while capping downside. Deriv allows $0.35 minimum stakes on Volatility 75 index options, which gives exactly 28 trades to test execution discipline.",
        },
      },
      {
        "@type": "Question",
        name: "Is the bot profitable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No bot is inherently profitable across every market regime. The Enforcer is a risk governor, not a predictive oracle. Its purpose is to pull execution brakes: enforcing hard consecutive loss limits, capping max daily drawdowns, and terminating sessions before tilt sets in.",
        },
      },
    ],
  };

  return (
    <div className="section-pad min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <div className="container-shell flex flex-col gap-12">
        {/* Header */}
        <Reveal className="flex flex-col gap-5 max-w-[800px]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
            <span className="type-micro uppercase text-[var(--mint-text)] tracking-wider">
              Technical & Operational Reference
            </span>
          </div>

          <h1 className="type-h1 m-0">FAQ.</h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            Everything you need to know about the business model, the $10 minimum deposit, the open-source bot, and how commissions work. No evasions.
          </p>
        </Reveal>

        {/* 12 Accordion entries */}
        <Reveal delayMs={70} className="max-w-[840px]">
          <Accordion items={FAQ_ITEMS} />
        </Reveal>

        {/* Closing Callout */}
        <Reveal delayMs={140} className="max-w-[840px] pt-4 hairline-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="type-small text-[var(--text)] font-medium">
              Still have an operational or technical question?
            </span>
            <span className="type-small text-[var(--text-45)]">
              Email softpip.contact@gmail.com or join the open Telegram group.
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/academy" className="btn-secondary">
              Academy →
            </Link>
            <a
              href={DERIV_AFFILIATE_URL}
              target="_blank"
              rel="sponsored noopener"
              className="btn-primary"
            >
              Open $10 Account →
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
