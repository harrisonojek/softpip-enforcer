"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
  staggerChildren?: boolean;
}

export function Reveal({
  children,
  delayMs = 0,
  className,
  staggerChildren = false,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const cappedDelayMs = delayMs > 0 ? Math.min(Math.round(delayMs / 60), 4) * 60 : 0;

  if (staggerChildren) {
    const childArray = React.Children.toArray(children);
    return (
      <div className={className}>
        {childArray.map((child, index) => {
          const itemDelayMs = cappedDelayMs + Math.min(index, 4) * 60;
          return (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: itemDelayMs / 1000,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {child}
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : 12,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: cappedDelayMs / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface CountUpNumberProps {
  target: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

export function CountUpNumber({
  target,
  prefix = "",
  suffix = "",
  durationMs = 500,
  className,
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();
  const [value, setValue] = useState<number>(target);
  const hasCompleted = useRef(false);

  useEffect(() => {
    if (!isInView || hasCompleted.current) return;

    if (shouldReduceMotion || document.visibilityState !== "visible") {
      setValue(target);
      hasCompleted.current = true;
      return;
    }

    let startTimestamp: number | null = null;
    let rafId: number;

    const step = (timestamp: number) => {
      if (startTimestamp === null) {
        startTimestamp = timestamp;
        setValue(0);
      }
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / durationMs, 1);
      // cubic-bezier(.22,1,.36,1) approximation
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        rafId = window.requestAnimationFrame(step);
      } else {
        setValue(target);
        hasCompleted.current = true;
      }
    };

    rafId = window.requestAnimationFrame(step);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      setValue(target);
    };
  }, [isInView, shouldReduceMotion, target, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerMs?: number;
  maxStagger?: number;
}

export function RevealGroup({
  children,
  className,
  staggerMs = 60,
  maxStagger = 5,
}: RevealGroupProps) {
  const shouldReduceMotion = useReducedMotion();
  const childArray = React.Children.toArray(children);

  return (
    <div className={className}>
      {childArray.map((child, index) => {
        const cappedIndex = Math.min(index, maxStagger - 1);
        const delay = (cappedIndex * staggerMs) / 1000;
        return (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.6,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
}

