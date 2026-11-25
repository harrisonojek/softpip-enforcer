"use client";

import React, { useEffect, useState } from "react";

export function Intro() {
  const [unmounted, setUnmounted] = useState(false);
  const [isMid, setIsMid] = useState(false);

  useEffect(() => {
    // Check if test mid-sequence freeze requested via ?intro=mid
    const params = new URLSearchParams(window.location.search);
    if (params.get("intro") === "mid") {
      setIsMid(true);
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
    const duration = isReduced ? 300 : 1950;

    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem("softpip_intro", "1");
      } catch {}
      setUnmounted(true);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  if (unmounted) return null;

  return (
    <div
      id="softpip-intro"
      aria-hidden="true"
      className={`fixed inset-0 z-90 bg-[var(--void)] flex items-center justify-center pointer-events-none ${
        isMid ? "opacity-100" : "intro-overlay"
      }`}
    >
      <div className="flex items-center gap-[12px]">
        {/* Mark at 56px */}
        <div
          className={`w-[56px] h-[56px] shrink-0 ${
            isMid ? "" : "intro-mark"
          }`}
          style={
            isMid
              ? { opacity: 0.5, transform: "scale(1)" }
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

        {/* Wordmark Geist 600 at 32px, --mint */}
        <span
          className={`font-[family-name:var(--font-geist)] font-semibold text-[32px] text-[var(--mint)] leading-none select-none tracking-tight shrink-0 ${
            isMid ? "" : "intro-wordmark"
          }`}
          style={
            isMid
              ? {
                  opacity: 0.5,
                  transform: "translateX(-4px)",
                  clipPath: "inset(0 45% 0 0)",
                  WebkitClipPath: "inset(0 45% 0 0)",
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
