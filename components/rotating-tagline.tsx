"use client";

import React, { useState, useEffect, useRef } from "react";

const PHRASES = [
  "Rules over predictions.",
  "Small accounts. Hard limits.",
  "No signals. No screenshots.",
  "Every limit enforced in code.",
  "Read the autopsy before you fund.",
  "Two losses. Fifteen minutes off.",
  "The bot has no edge. It has brakes.",
] as const;

export function RotatingTagline() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");
  const [isPaused, setIsPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const holdStartRef = useRef<number>(0);
  const remainingHoldRef = useRef<number>(3200);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    let timer: NodeJS.Timeout;

    if (phase === "enter") {
      if (!isPaused) {
        timer = setTimeout(() => {
          setPhase("hold");
          holdStartRef.current = Date.now();
          remainingHoldRef.current = 3200;
        }, 400);
      }
    } else if (phase === "hold") {
      if (!isPaused) {
        timer = setTimeout(() => {
          setPhase("exit");
        }, remainingHoldRef.current);
      }
    } else if (phase === "exit") {
      if (!isPaused) {
        timer = setTimeout(() => {
          setIndex((prev) => (prev + 1) % PHRASES.length);
          setPhase("enter");
        }, 300);
      }
    }

    return () => clearTimeout(timer);
  }, [phase, isPaused, isReducedMotion]);

  const handleMouseEnter = () => {
    if (phase === "hold") {
      const elapsed = Date.now() - holdStartRef.current;
      remainingHoldRef.current = Math.max(200, remainingHoldRef.current - elapsed);
    }
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (phase === "hold") {
      holdStartRef.current = Date.now();
    }
    setIsPaused(false);
  };

  if (isReducedMotion) {
    return (
      <div className="font-mono text-sm text-[var(--text-70)] min-h-[1.75rem] flex items-center select-none">
        {PHRASES[0]}
      </div>
    );
  }

  const animationStyle: React.CSSProperties = {
    animation:
      phase === "enter"
        ? "taglineFadeUpIn 400ms cubic-bezier(0.22, 1, 0.36, 1) forwards"
        : phase === "exit"
        ? "taglineFadeUpOut 300ms ease-in forwards"
        : "none",
    animationPlayState: isPaused ? "paused" : "running",
    transform: phase === "hold" ? "translateY(0)" : undefined,
    opacity: phase === "hold" ? 1 : undefined,
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="font-mono text-sm text-[var(--text-70)] min-h-[1.75rem] flex items-center overflow-hidden select-none cursor-default"
      aria-live="polite"
    >
      <span
        key={`${index}-${phase}`}
        style={animationStyle}
        className="inline-block"
      >
        {PHRASES[index]}
      </span>
    </div>
  );
}
