"use client";

import React, { useState } from "react";
import { WEB3FORMS_ACCESS_KEY } from "@/lib/seo";

export function PartnerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [communityDetails, setCommunityDetails] = useState("");
  const [derivAffiliateId, setDerivAffiliateId] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const cleanPhone = whatsapp.replace(/[\s\-\+\(\)]/g, "");
    if (!whatsapp.trim() || cleanPhone.length < 8) {
      setErrorMessage("Please enter a valid WhatsApp phone number (minimum 8 digits).");
      return;
    }

    if (!communityDetails.trim()) {
      setErrorMessage("Please provide a brief description of your audience or community channels.");
      return;
    }

    if (!agreedTerms) {
      setErrorMessage("You must commit to teaching risk governance and never guaranteeing profits.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New partner application",
          from_name: "SoftPip Partner",
          full_name: name.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim(),
          community_details: communityDetails.trim(),
          deriv_affiliate_id: derivAffiliateId.trim() || "Not yet registered",
          agreed_to_partner_commitments: agreedTerms ? "Yes" : "No",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.message || "Failed to submit. Please check your connection and retry.");
      }
    } catch {
      setErrorMessage("Network error occurred. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="surface-card p-6 sm:p-8 flex flex-col gap-5 border-[var(--mint)]"
        aria-live="polite"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
          <span className="type-micro uppercase text-[var(--mint-text)]">
            Application Received
          </span>
        </div>

        <h3 className="type-h3 m-0 text-[var(--text)]">
          Your partner application is being audited.
        </h3>

        <p className="type-small text-[var(--text-70)] m-0">
          We review applications within 48 hours. If accepted into this month&apos;s ten partner slots, Harrison will reach out directly on WhatsApp with your Master Partner sub-network linking instructions.
        </p>

        <div className="pt-2">
          <p className="type-micro text-[var(--text-45)] m-0">
            You earn your own commission. I earn 7.5% of it as a Master Partner. It comes from Deriv, not you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="surface-card p-6 sm:p-8 flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--mint)]" aria-hidden="true" />
          <span className="type-micro uppercase text-[var(--mint-text)]">
            Apply for Sub-Partner Network
          </span>
        </div>
        <h3 className="type-h3 m-0 text-[var(--text)]">
          Master Partner Application
        </h3>
        <p className="type-small text-[var(--text-70)] m-0">
          Ten partners accepted per calendar month. Zero upfront fee.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {/* Hidden Web3Forms fields */}
        <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
        <input type="hidden" name="subject" value="New partner application" />
        <input type="hidden" name="from_name" value="SoftPip Partner" />

        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="partner-name" className="type-micro uppercase text-[var(--text-70)]">
            Full name <span className="text-[var(--rust)]">*</span>
          </label>
          <input
            id="partner-name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-[10px] bg-[var(--slate)] border border-[var(--line)] text-[var(--text)] type-small placeholder:text-[var(--text-45)] focus:border-[var(--mint)] focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="partner-email" className="type-micro uppercase text-[var(--text-70)]">
            Email address <span className="text-[var(--rust)]">*</span>
          </label>
          <input
            id="partner-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-[10px] bg-[var(--slate)] border border-[var(--line)] text-[var(--text)] type-small placeholder:text-[var(--text-45)] focus:border-[var(--mint)] focus:outline-none"
          />
        </div>

        {/* WhatsApp */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="partner-whatsapp" className="type-micro uppercase text-[var(--text-70)]">
            WhatsApp phone number <span className="text-[var(--rust)]">*</span>
          </label>
          <input
            id="partner-whatsapp"
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            required
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="+234 800 000 0000"
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-[10px] bg-[var(--slate)] border border-[var(--line)] text-[var(--text)] type-small placeholder:text-[var(--text-45)] focus:border-[var(--mint)] focus:outline-none"
          />
        </div>

        {/* Community details */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="partner-community" className="type-micro uppercase text-[var(--text-70)]">
            Audience / Channels / Community Details <span className="text-[var(--rust)]">*</span>
          </label>
          <textarea
            id="partner-community"
            name="communityDetails"
            rows={3}
            required
            value={communityDetails}
            onChange={(e) => setCommunityDetails(e.target.value)}
            placeholder="Tell us about your audience size, telegram channels, youtube, or current affiliate volume..."
            className="w-full px-3.5 py-2.5 rounded-[10px] bg-[var(--slate)] border border-[var(--line)] text-[var(--text)] type-small placeholder:text-[var(--text-45)] focus:border-[var(--mint)] focus:outline-none resize-none"
          />
        </div>

        {/* Deriv Affiliate ID (optional) */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="partner-affiliate-id" className="type-micro uppercase text-[var(--text-70)]">
            Existing Deriv Affiliate ID (if any)
          </label>
          <input
            id="partner-affiliate-id"
            name="derivAffiliateId"
            type="text"
            value={derivAffiliateId}
            onChange={(e) => setDerivAffiliateId(e.target.value)}
            placeholder="e.g. CR123456 or leave blank"
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-[10px] bg-[var(--slate)] border border-[var(--line)] text-[var(--text)] type-small placeholder:text-[var(--text-45)] focus:border-[var(--mint)] focus:outline-none"
          />
        </div>

        {/* Commitment checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              required
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-[var(--line)] bg-[var(--slate)] text-[var(--mint)] focus:ring-[var(--mint)] accent-[var(--mint)] shrink-0 cursor-pointer"
            />
            <span className="type-small text-[var(--text-70)] leading-snug">
              I commit to teaching risk governance, enforcing $10 account segregation, and never promising profit guarantees to students.
            </span>
          </label>
        </div>

        {/* aria-live error notice */}
        <div
          role="alert"
          aria-live="polite"
          className={`type-small text-[var(--rust)] ${errorMessage ? "block pt-1" : "sr-only"}`}
        >
          {errorMessage || ""}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="btn-mint w-full flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <span>Submitting Application...</span>
            ) : (
              <>
                <span>Submit Partner Application</span>
                <span aria-hidden="true">→</span>
              </>
            )}
          </button>
        </div>

        {/* Disclosure line verbatim */}
        <p className="type-micro text-[var(--text-45)] m-0 text-center pt-1">
          You earn your own commission. I earn 7.5% of it as a Master Partner. It comes from Deriv, not you.
        </p>
      </form>
    </div>
  );
}
