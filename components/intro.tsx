"use client";

import React, { useEffect, useState } from "react";

export function Intro() {
  const [unmounted, setUnmounted] = useState(false);
  const [previewState, setPreviewState] = useState<"none" | "mid" | "held">("none");

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
    const duration = isReduced ? 1200 : 1950;

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
  const isPreview = isHeld || isMid;

  return (
    <div
      id="softpip-intro"
      aria-hidden="true"
      className={`fixed inset-0 z-90 bg-[var(--void)] flex items-center justify-center pointer-events-none ${
        isPreview ? "opacity-100" : "intro-overlay"
      }`}
    >
      <div className="flex items-center gap-[12px] relative">
        {/* Mark at 56px - relative z-10 so wordmark emerges from under it */}
        <div
          className={`w-[56px] h-[56px] shrink-0 relative z-10 ${
            isPreview ? "" : "intro-mark"
          }`}
          style={
            isHeld || isMid
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
            isHeld
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
    </div>
  );
}
