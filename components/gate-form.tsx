"use client";

import React, { useState } from "react";
import { TELEGRAM_COMMUNITY_URL, WEB3FORMS_ACCESS_KEY } from "@/lib/seo";
import { AUTOPSEY_PDF_READY } from "@/lib/site";

export function GateForm() {
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [confirmedAccount, setConfirmedAccount] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side validation
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

    if (!confirmedAccount) {
      setErrorMessage("You must confirm you have or will fund a $10 account through the link.");
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
          subject: "New autopsy lead",
          from_name: "SoftPip Autopsy Gate",
          email: email.trim(),
          whatsapp: whatsapp.trim(),
          confirmed_ten_dollar_account: confirmedAccount ? "Yes" : "No",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.message || "Failed to submit. Please check your connection and retry.");
      }
    } catch {
      setErrorMessage("Network error occurred. Please check your internet connection and try again.");
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
          <span
            className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]"
            aria-hidden="true"
          />
          <span className="type-micro uppercase text-[var(--mint-text)]">
            Access unlocked
          </span>
        </div>

        <h3 className="type-h3 m-0 text-[var(--text)]">
          The full autopsy is ready below.
        </h3>

        <p className="type-small text-[var(--text-70)] m-0">
          Your details have been received. You can read the complete report in
          full below and join the private Telegram risk channel.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Scroll to autopsy body link */}
          <a
            href="#report-body"
            className="btn-mint inline-flex items-center gap-2"
          >
            <span>Read 8-page autopsy</span>
            <span aria-hidden="true">↓</span>
          </a>

          {/* 
            Autopsy PDF download button (gated by AUTOPSEY_PDF_READY in lib/site.ts).
            When enabled, drops in from: public/downloads/autopsy.pdf
          */}
          {AUTOPSEY_PDF_READY && (
            <a
              href="/downloads/autopsy.pdf"
              download="SoftPip-Autopsy-Report.pdf"
              className="btn-ghost inline-flex items-center gap-2"
            >
              <span>Download PDF</span>
              <span aria-hidden="true">↓</span>
            </a>
          )}

          {/* Telegram private community link */}
          <a
            href={TELEGRAM_COMMUNITY_URL}
            rel="noopener noreferrer"
            target="_blank"
            className="btn-ghost inline-flex items-center gap-2"
          >
            <span>Join Telegram community</span>
            <span aria-hidden="true">→</span>
          </a>
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
            Instant Access
          </span>
        </div>
        <h3 className="type-h3 m-0 text-[var(--text)]">
          Download the autopsy and join the group
        </h3>
        <p className="type-small text-[var(--text-70)] m-0">
          Enter your contact details to access the full 8-page breakdown and private telegram risk channel.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {/* Hidden Web3Forms parameters */}
        <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
        <input type="hidden" name="subject" value="New autopsy lead" />
        <input type="hidden" name="from_name" value="SoftPip Autopsy Gate" />

        {/* Email Field */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="autopsy-email" className="type-micro uppercase text-[var(--text-70)]">
            Email address <span className="text-[var(--rust)]">*</span>
          </label>
          <input
            id="autopsy-email"
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

        {/* WhatsApp Field */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="autopsy-whatsapp" className="type-micro uppercase text-[var(--text-70)]">
            WhatsApp number <span className="text-[var(--rust)]">*</span>
          </label>
          <input
            id="autopsy-whatsapp"
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

        {/* Required Confirmation Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              name="confirmed_account"
              required
              checked={confirmedAccount}
              onChange={(e) => setConfirmedAccount(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-[var(--line)] bg-[var(--slate)] text-[var(--mint)] focus:ring-[var(--mint)] accent-[var(--mint)] shrink-0 cursor-pointer"
            />
            <span className="type-small text-[var(--text-70)] leading-snug">
              I confirm I have or will fund a $10 account through the link.
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
              <span>Unlocking autopsy...</span>
            ) : (
              <>
                <span>Unlock the full autopsy</span>
                <span aria-hidden="true">→</span>
              </>
            )}
          </button>
        </div>

        <p className="type-micro text-[var(--text-45)] m-0 text-center pt-1">
          No spam. Only the autopsy download and community link.
        </p>
      </form>
    </div>
  );
}
