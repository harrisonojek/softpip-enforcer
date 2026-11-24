import React from "react";
import Link from "next/link";
import { AffiliateLink } from "@/components/affiliate-link";
import {
  CONTACT_EMAIL,
  VERBATIM_AFFILIATE_DISCLOSURE,
  VERBATIM_COPYRIGHT,
  VERBATIM_RISK_WARNING,
} from "@/lib/seo";

const CANONICAL_ROUTES = [
  { label: "Academy", href: "/academy" },
  { label: "Labs", href: "/labs" },
  { label: "Enforcer", href: "/labs/enforcer" },
  { label: "Track record", href: "/labs/enforcer/track-record" },
  { label: "Calculators", href: "/labs/calculator" },
  { label: "Community", href: "/community" },
  { label: "Partners", href: "/partners" },
  { label: "Autopsy", href: "/autopsy" },
  { label: "About", href: "/about" },
  { label: "Risk", href: "/risk" },
  { label: "FAQ", href: "/faq" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
] as const;

export function Footer() {
  return (
    <footer className="relative z-10 block w-full hairline-t bg-[var(--void)] pt-16 pb-16 max-[879px]:pb-28">
      <div className="container-shell">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 hairline-b">
          {/* Column 1: Brand line */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 min-h-[44px] text-[var(--text-70)] hover:text-[var(--text)] transition-colors no-underline w-fit"
              aria-label="SoftPip Home"
            >
              <img
                src="/icon-192.png"
                alt="SoftPip"
                width={20}
                height={20}
                className="h-[20px] w-[20px] rounded-[22%] object-cover opacity-85"
              />
              <span
                className="text-[16px] tracking-tight font-semibold text-[var(--text-70)]"
                style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                }}
              >
                SoftPip
              </span>
            </Link>
            <p className="type-small text-[var(--text-70)] m-0 max-w-[34ch]">
              Free trading-education platform and open-source risk tool, built
              by Oghenerioborue Harrison Ekuetafia after losing ₦32M trading in
              2025.
            </p>
            <div className="pt-1">
              <AffiliateLink
                placement="footer"
                className="inline-flex items-center min-h-[44px] type-small text-[var(--mint-text)] hover:underline font-medium"
              >
                Open $10 account →
              </AffiliateLink>
            </div>
          </div>

          {/* Column 2 & 3: Canonical Routes */}
          <div className="sm:col-span-2 lg:col-span-2">
            <p className="type-micro uppercase text-[var(--text-45)] m-0 mb-3">
              Routes
            </p>
            <ul className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
              {CANONICAL_ROUTES.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="inline-flex items-center min-h-[44px] type-small text-[var(--text-70)] hover:text-[var(--text)] transition-colors"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Verification & Contact */}
          <div>
            <p className="type-micro uppercase text-[var(--text-45)] m-0 mb-3">
              Verification &amp; Code
            </p>
            <ul className="list-none p-0 m-0 flex flex-col gap-1">
              <li>
                <a
                  href="https://github.com/harrisonojek/softpip-enforcer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] type-small text-[var(--mint-text)] hover:underline font-medium"
                >
                  GitHub Engine (@softpip-enforcer)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/harrisonojek/softpip-enforcer/releases/tag/v0.1.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] type-small text-[var(--text-70)] hover:text-[var(--text)] transition-colors"
                >
                  Release v0.1.0 (Demo Gate)
                </a>
              </li>
              <li>
                <a
                  href="/downloads/journal.csv"
                  download="softpip-journal.csv"
                  className="inline-flex items-center min-h-[44px] type-small text-[var(--text-70)] hover:text-[var(--text)] transition-colors font-mono"
                >
                  Download Raw Log (CSV)
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/softpip_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] type-small text-[var(--text-70)] hover:text-[var(--text)] transition-colors"
                >
                  Telegram Community
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center min-h-[44px] type-small text-[var(--text-70)] hover:text-[var(--text)] transition-colors break-all"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Verbatim Affiliate & Risk Disclosures */}
        <div className="pt-8 flex flex-col gap-4 prose-col">
          <p className="type-micro text-[var(--text-45)] m-0">
            {VERBATIM_AFFILIATE_DISCLOSURE}
          </p>
          <p className="type-micro text-[var(--text-45)] m-0">
            {VERBATIM_RISK_WARNING}
          </p>
          <p className="type-micro text-[var(--text-45)] m-0 pt-2">
            {VERBATIM_COPYRIGHT}
          </p>
        </div>
      </div>
    </footer>
  );
}
