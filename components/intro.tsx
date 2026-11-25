"use client";

import React, { useEffect, useState } from "react";

export function Intro() {
  const [unmounted, setUnmounted] = useState(false);
  const [previewState, setPreviewState] = useState<"none" | "mid" | "tagline" | "held">("none");

  useEffect(() => {
    // Check preview params for deterministic visual verification
    const params = new URLSearchParams(window.location.search);
    const introParam = params.get("intro");
    if (introParam === "held") {
      setPreviewState("held");
      return;
    }
    if (introParam === "mid") {
      setPreviewState("mid");
      return;
    }
    if (introParam === "tagline") {
      setPreviewState("tagline");
      return;
    }

    try {
      if (sessionStorage.getItem("softpip_intro")) {
        setUnmounted(true);
        return;
      }
    } catch {
      setUnmounted(true);
      return;
    }

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = isReduced ? 1200 : 2400;

    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem("softpip_intro", "1");
      } catch {}
      setUnmounted(true);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  if (unmounted) return null;

  const isHeld = previewState === "held";
  const isMid = previewState === "mid";
  const isTagline = previewState === "tagline";
  const isPreview = isHeld || isMid || isTagline;

  return (
    <div
      id="softpip-intro"
      aria-hidden="true"
      className={`fixed inset-0 z-90 bg-[var(--void)] flex items-center justify-center pointer-events-none ${
        isPreview ? "opacity-100" : "intro-overlay"
      }`}
    >
      <div className="flex flex-col items-center gap-3.5 relative px-4">
        {/* Horizontal Lockup: Mark + Wordmark */}
        <div className="flex items-center gap-[12px] relative">
          {/* Mark at 56px - relative z-10 so wordmark emerges from under it */}
          <div
            className={`w-[56px] h-[56px] shrink-0 relative z-10 ${
              isPreview ? "" : "intro-mark"
            }`}
            style={
              isHeld || isMid || isTagline
                ? { opacity: 1, transform: "scale(1)" }
                : undefined
            }
          >
            <img
              src="/icon-192.png"
              alt="SoftPip"
              width={56}
              height={56}
              className="rounded-[22%] object-cover shrink-0"
              style={{ width: "56px", height: "56px" }}
            />
          </div>

          {/* Wordmark Geist 600 at 32px, --mint - relative z-0 */}
          <span
            className={`font-[family-name:var(--font-geist)] font-semibold text-[32px] text-[var(--mint)] leading-none select-none tracking-tight shrink-0 relative z-0 ${
              isPreview ? "" : "intro-wordmark"
            }`}
            style={
              isHeld || isTagline
                ? {
                    opacity: 1,
                    transform: "translateX(0)",
                    clipPath: "inset(0 0 0 0)",
                    WebkitClipPath: "inset(0 0 0 0)",
                  }
                : isMid
                ? {
                    opacity: 1,
                    transform: "translateX(-5px)",
                    clipPath: "inset(0 50% 0 0)",
                    WebkitClipPath: "inset(0 50% 0 0)",
                  }
                : undefined
            }
          >
            SoftPip
          </span>
        </div>

        {/* Tagline: beneath lockup, centred, mono micro, --text-45, tracking .04em */}
        <p
          className={`font-mono text-center text-[var(--text-45)] tracking-[0.04em] m-0 select-none type-micro ${
            isPreview ? "" : "intro-tagline"
          }`}
          style={
            isHeld
              ? { opacity: 1, transform: "translateY(0)" }
              : isTagline
              ? { opacity: 0.5, transform: "translateY(3px)" }
              : isMid
              ? { opacity: 0, transform: "translateY(6px)" }
              : undefined
          }
        >
          Markets move. Knowledge evolves. Discipline remains.
        </p>
      </div>
    </div>
  );
}
