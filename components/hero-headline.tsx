"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const HEADLINE_WORDS = ["Trade", "with", "rules,", "not", "feelings."];

export function HeroBloom() {
  const shouldReduceMotion = useReducedMotion();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

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
      className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] max-w-[90vw] h-[450px] pointer-events-none -z-10 overflow-visible"
      style={{
        transform: `translate3d(-50%, ${parallaxY}px, 0)`,
        transition: shouldReduceMotion ? "none" : "transform 75ms linear",
      }}
    >
      <div
        className="w-full h-full hero-bloom-drift rounded-full"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(138, 245, 206, 0.08) 0%, rgba(8, 11, 15, 0) 100%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}

export function HeroHeadline() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <h1 className="type-display m-0 max-w-[16ch] flex flex-wrap gap-x-[0.3em]">
      {HEADLINE_WORDS.map((word, index) => (
        <motion.span
          key={index}
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
            delay: index * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}
