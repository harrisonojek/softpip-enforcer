"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const DEFAULT_HEADLINE_WORDS = [
  "Trade",
  "with",
  "rules,",
  "not",
  "feelings.",
];

export function HeroBloom() {
  const shouldReduceMotion = useReducedMotion();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!shouldReduceMotion) return;

    const onScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [shouldReduceMotion]);

  const parallaxY = shouldReduceMotion ? 0 : scrollY * 0.15;

  return (
    <div
      aria-hidden="true"
      className="absolute top-6 left-1/2 w-[760px] max-w-[95vw] h-[460px] pointer-events-none z-0 overflow-visible"
      style={{
        transform: `translate3d(-50%, ${parallaxY}px, 0)`,
        transition: shouldReduceMotion ? "none" : "transform 75ms linear",
      }}
    >
      <div
        className="w-full h-full hero-bloom-drift rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(138, 245, 206, 0.08) 0%, rgba(138, 245, 206, 0.035) 55%, rgba(8, 11, 15, 0) 100%)",
        }}
      />
    </div>
  );
}

export function HeroHeadline({ words = DEFAULT_HEADLINE_WORDS }: { words?: string[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <h1 className="type-display m-0 max-w-[22ch]">
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <motion.span
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={word === "rules," ? "inline-block text-[var(--mint-text)]" : "inline-block"}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </h1>
  );
}
