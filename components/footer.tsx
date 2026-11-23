import React from "react";
import Link from "next/link";
import {
  CONTACT_EMAIL,
  DERIV_AFFILIATE_URL,
  INSTAGRAM_URL,
  VERBATIM_AFFILIATE_DISCLOSURE,
  VERBATIM_COPYRIGHT,
  VERBATIM_RISK_WARNING,
} from "@/lib/seo";

const PLATFORM_ROUTES = [
  { label: "Home", href: "/" },
  { label: "Autopsy", href: "/autopsy" },
  { label: "Curriculum", href: "/curriculum" },
  { label: "Bot", href: "/bot" },
  { label: "Track record", href: "/track-record" },
  { label: "Milestones", href: "/milestones" },
];

const REFERENCE_ROUTES = [
  { label: "Partner", href: "/partner" },
  { label: "About", href: "/about" },
  { label: "Risk", href: "/risk" },
  { label: "FAQ", href: "/faq" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="hairline-t bg-[var(--void)] pt-16 pb-16 max-[879px]:pb-28">
      <div className="container-shell">
        {/* Four columns, stacked mobile */}
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
              <a
                href={DERIV_AFFILIATE_URL}
                rel="sponsored noopener"
                target="_blank"
                className="inline-flex items-center min-h-[44px] type-small text-[var(--mint-text)] hover:underline font-medium"
              >
                Open $10 account →
              </a>
            </div>
          </div>

          {/* Column 2: Platform Routes */}
          <div>
            <p className="type-micro uppercase text-[var(--text-45)] m-0 mb-3">
              Platform
            </p>
            <ul className="list-none p-0 m-0 flex flex-col gap-1">
              {PLATFORM_ROUTES.map((route) => (
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

          {/* Column 3: Reference & Legal Routes */}
          <div>
            <p className="type-micro uppercase text-[var(--text-45)] m-0 mb-3">
              Directory
            </p>
            <ul className="list-none p-0 m-0 flex flex-col gap-1">
              {REFERENCE_ROUTES.map((route) => (
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

          {/* Column 4: Contact & Social */}
          <div>
            <p className="type-micro uppercase text-[var(--text-45)] m-0 mb-3">
              Contact
            </p>
            <ul className="list-none p-0 m-0 flex flex-col gap-1">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center min-h-[44px] type-small text-[var(--text-70)] hover:text-[var(--text)] transition-colors break-all"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  rel="noopener me"
                  target="_blank"
                  className="inline-flex items-center min-h-[44px] type-small text-[var(--text-70)] hover:text-[var(--text)] transition-colors"
                >
                  Instagram (@soft.pip)
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
