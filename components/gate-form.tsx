"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TELEGRAM_COMMUNITY_URL } from "@/lib/seo";

export function GateForm({ isUnlocked = false }: { isUnlocked?: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [confirmedAccount, setConfirmedAccount] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [unlockedState, setUnlockedState] = useState(isUnlocked);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage fallback
    if (!unlockedState && typeof window !== "undefined") {
      if (localStorage.getItem("softpip_unlocked") === "1") {
        setUnlockedState(true);
      }
    }
  }, [unlockedState]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

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
      setErrorMessage("Please confirm you have or will fund a $10 account through the link.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          whatsapp: whatsapp.trim(),
          confirmed_account: confirmedAccount,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Set client-side cookies and storage
        document.cookie = "softpip_unlocked=1; path=/; max-age=31536000; SameSite=Lax";
        if (typeof window !== "undefined") {
          localStorage.setItem("softpip_unlocked", "1");
        }
        setUnlockedState(true);
        router.refresh();
      } else {
        setErrorMessage(data.message || "Failed to unlock. Please check connection and retry.");
      }
    } catch {
      setErrorMessage("Network error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (unlockedState) {
    return (
      <div
        className="surface-card p-6 sm:p-7 rounded-2xl border border-[var(--mint)]/40 bg-[var(--mint)]/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        aria-live="polite"
      >
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)] shrink-0" aria-hidden="true" />
          <div>
            <span className="font-mono text-xs uppercase text-[var(--mint-text)] font-semibold block">
              Forensic Report Unlocked
            </span>
            <span className="text-xs text-[var(--text-70)] block mt-0.5">
              Sections 5–7 (The exact sequence, psychological costs, and rules that changed) are active below.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
          <a
            href={TELEGRAM_COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-mint text-xs py-2 px-3.5"
          >
            Join Telegram Channel →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="surface-card p-6 sm:p-8 rounded-2xl border border-[var(--rule)] flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--rust)]" aria-hidden="true" />
          <span className="type-micro uppercase text-[var(--rust)]">
            Sections 5–7 Gated
          </span>
        </div>
        <h3 className="type-h3 m-0 text-[var(--text)]">
          Unlock the final 3 sections &amp; join the Telegram channel
        </h3>
        <p className="type-small text-[var(--text-70)] m-0">
          Sections 1–4 are readable above. Enter your details to reveal the raw terminal sequence, the psychological costs, and the governance rules that stopped it.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
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
            aria-describedby="autopsy-error"
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
            aria-describedby="autopsy-error"
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-[10px] bg-[var(--slate)] border border-[var(--line)] text-[var(--text)] type-small placeholder:text-[var(--text-45)] focus:border-[var(--mint)] focus:outline-none"
          />
        </div>

        {/* Confirmation Checkbox */}
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

        {/* Error Notice */}
        <div
          id="autopsy-error"
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
                <span>Unlock Sections 5–7 Now</span>
                <span aria-hidden="true">→</span>
              </>
            )}
          </button>
        </div>

        <p className="type-micro text-[var(--text-45)] m-0 text-center pt-1">
          No spam. Unlocks instant access on this device and sets a persistent access cookie.
        </p>
      </form>
    </div>
  );
}
