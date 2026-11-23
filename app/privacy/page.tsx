import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ScrollProgress } from "@/components/scroll-progress";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy | SoftPip",
  description:
    "Data collection, lead management via Web3Forms, analytics, and privacy commitments at SoftPip.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="section-pad min-h-screen">
      <ScrollProgress />
      <div className="container-shell flex flex-col gap-12">
        {/* Header */}
        <Reveal className="flex flex-col gap-5 max-w-[800px]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
            <span className="type-micro uppercase text-[var(--mint-text)] tracking-wider">
              Data Protection & Privacy Policy
            </span>
          </div>

          <h1 className="type-h1 m-0">Privacy Policy.</h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            Effective Date: November 2025. Last updated: November 2026.
          </p>
        </Reveal>

        {/* Plain 64ch body */}
        <div className="flex flex-col gap-8 prose-col text-[var(--text-70)] type-body leading-relaxed">
          <Reveal delayMs={0} className="flex flex-col gap-3">
            <h2 className="type-h3 text-[var(--text)] m-0">1. Data Philosophy</h2>
            <p className="m-0">
              SoftPip does not monetize personal data, sell subscriber lists to third-party advertisers, or use intrusive tracking pixels. We collect only the minimal information required to transmit requested educational materials, deliver community onboarding links, or process partner program applications.
            </p>
          </Reveal>

          <Reveal delayMs={40} className="flex flex-col gap-3">
            <h2 className="type-h3 text-[var(--text)] m-0">2. Information We Collect</h2>
            <p className="m-0">
              Depending on how you interact with SoftPip, we may process:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 m-0 type-small">
              <li>
                <strong>Form Submissions:</strong> When accessing the autopsy download gate or applying to the partner network, you submit your email address and WhatsApp contact number. Form payloads are processed securely via Web3Forms and delivered directly to the founder&apos;s administrative inbox.
              </li>
              <li>
                <strong>API Keys &amp; Credentials:</strong> Your Deriv API tokens and Telegram bot tokens remain strictly on your local computer or private VPS in your <code>config.yaml</code> file. SoftPip servers never receive, transmit, or store your trading credentials.
              </li>
              <li>
                <strong>Privacy-Preserving Analytics:</strong> We use Vercel Analytics to monitor aggregate site performance, page response times, and geographic traffic clusters. Vercel Analytics does not log IP addresses, store cookies, or track visitors across independent domains.
              </li>
            </ul>
          </Reveal>

          <Reveal delayMs={80} className="flex flex-col gap-3">
            <h2 className="type-h3 text-[var(--text)] m-0">3. How Information is Used</h2>
            <p className="m-0">
              Information collected through form submissions is used solely to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 m-0 type-small">
              <li>Provide direct access to the autopsy PDF and private Telegram onboarding room.</li>
              <li>Review partner program eligibility for community leaders.</li>
              <li>Distribute critical security notices regarding Deriv API protocol revisions or The Enforcer code updates.</li>
            </ul>
            <p className="m-0">
              We will never send unsolicited marketing promotions, third-party broker advertisements, or paid signal offers.
            </p>
          </Reveal>

          <Reveal delayMs={120} className="flex flex-col gap-3">
            <h2 className="type-h3 text-[var(--text)] m-0">4. Third-Party Services</h2>
            <p className="m-0">
              This website interfaces with select third-party services:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 m-0 type-small">
              <li>
                <strong>Web3Forms:</strong> Encrypted form submission processing. Form inputs are discarded after transmission according to their data retention policy.
              </li>
              <li>
                <strong>Deriv:</strong> When you click outbound referral links to <code>t.deriv.link</code> or <code>trade.deriv.com</code>, Deriv sets standard session cookies governed by their independent privacy policy.
              </li>
              <li>
                <strong>GitHub:</strong> Hosting for The Enforcer source repository governed by GitHub&apos;s privacy statement.
              </li>
            </ul>
          </Reveal>

          <Reveal delayMs={160} className="flex flex-col gap-3">
            <h2 className="type-h3 text-[var(--text)] m-0">5. Data Subject Rights & Deletion</h2>
            <p className="m-0">
              You may request immediate deletion of your email address or contact history from our inbox at any time. To request removal, transmit an email from your registered address to <code>softpip.contact@gmail.com</code> with the subject line &ldquo;Data Deletion Request&rdquo;.
            </p>
          </Reveal>

          <Reveal delayMs={200} className="pt-6 hairline-t flex items-center justify-between">
            <span className="type-small text-[var(--text-45)]">
              Inquiries: softpip.contact@gmail.com
            </span>
            <Link href="/" className="btn-secondary">
              ← Return Home
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
