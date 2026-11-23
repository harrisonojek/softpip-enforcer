import React from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service | SoftPip",
  description:
    "Terms of service, open-source software license limitations, educational disclaimers, and user obligations for SoftPip.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="section-pad min-h-screen">
      <div className="container-shell flex flex-col gap-12">
        {/* Header */}
        <Reveal className="flex flex-col gap-5 max-w-[800px]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
            <span className="type-micro uppercase text-[var(--mint-text)] tracking-wider">
              Legal & Usage Terms
            </span>
          </div>

          <h1 className="type-h1 m-0">Terms of Service.</h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            Effective Date: November 2025. Last updated: January 2026.
          </p>
        </Reveal>

        {/* Plain 64ch body */}
        <div className="flex flex-col gap-8 prose-col text-[var(--text-70)] type-body leading-relaxed">
          <Reveal delayMs={0} className="flex flex-col gap-3">
            <h2 className="type-h3 text-[var(--text)] m-0">1. Acceptance of Terms</h2>
            <p className="m-0">
              By accessing the website at softpip.org, downloading educational materials, cloning or running The Enforcer software repository, or participating in the SoftPip Telegram community, you agree to be bound by these Terms of Service. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </Reveal>

          <Reveal delayMs={40} className="flex flex-col gap-3">
            <h2 className="type-h3 text-[var(--text)] m-0">2. Educational & Non-Advisory Nature</h2>
            <p className="m-0">
              All content provided on SoftPip—including the ₦32M autopsy report, the ten-module curriculum, risk ladder calculators, and software documentation—is published strictly for educational, informational, and software engineering purposes.
            </p>
            <p className="m-0">
              SoftPip and its founder, Oghenerioborue Harrison Ekuetafia, are not licensed financial advisors, brokers, dealers, or asset managers under the Nigerian Securities and Exchange Commission (SEC), the UK Financial Conduct Authority (FCA), or any other regulatory jurisdiction. Nothing on this website constitutes investment advice, financial planning, or a recommendation to purchase or sell any derivative contract.
            </p>
          </Reveal>

          <Reveal delayMs={80} className="flex flex-col gap-3">
            <h2 className="type-h3 text-[var(--text)] m-0">3. Open-Source Software License & Disclaimer</h2>
            <p className="m-0">
              The Enforcer (<code>governor.py</code>) and accompanying scripts are distributed under the terms of the MIT License:
            </p>
            <div className="surface-card p-5 rounded-[12px] bg-[var(--navy)] border border-[var(--line)] font-mono text-xs text-[var(--text-70)] leading-relaxed">
              THE SOFTWARE IS PROVIDED &ldquo;AS IS&rdquo;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            </div>
            <p className="m-0">
              You assume full responsibility for running, auditing, configuring, and verifying any code prior to linking it with live capital or API tokens.
            </p>
          </Reveal>

          <Reveal delayMs={120} className="flex flex-col gap-3">
            <h2 className="type-h3 text-[var(--text)] m-0">4. Affiliate Relationship & Disclosures</h2>
            <p className="m-0">
              SoftPip participates in the Deriv Affiliate and Master Partner programs. When you register a Deriv account using referral links published on this website, SoftPip receives commission revenue directly from Deriv based on your trading volume. You acknowledge that:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 m-0 type-small">
              <li>This commission is funded entirely by Deriv&apos;s revenue margins, not deducted from your account balance.</li>
              <li>Affiliate compensation creates an inherent incentive to encourage market participation, though SoftPip explicitly mandates strict capital limits and conservative sizing.</li>
              <li>You are under no legal obligation to use the referral link to access the open-source software repository.</li>
            </ul>
          </Reveal>

          <Reveal delayMs={160} className="flex flex-col gap-3">
            <h2 className="type-h3 text-[var(--text)] m-0">5. Limitation of Liability</h2>
            <p className="m-0">
              Under no legal theory (whether in contract, tort, negligence, or strict liability) shall SoftPip, Oghenerioborue Harrison Ekuetafia, or contributors be held liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, or punitive damages—including financial trading losses, lost profits, margin liquidation, loss of data, internet connectivity drops, or Deriv platform service disruptions—resulting from your reliance on this site or execution of its software.
            </p>
          </Reveal>

          <Reveal delayMs={200} className="pt-6 hairline-t flex items-center justify-between">
            <span className="type-small text-[var(--text-45)]">
              Questions regarding these terms? Contact softpip.contact@gmail.com
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
