"use client";

import React, { useRef, useState, useEffect } from "react";
import { useReducedMotion } from "motion/react";

interface CtaSpotlightProps {
  children: React.ReactNode;
  className?: string;
}

export function CtaSpotlight({ children, className = "" }: CtaSpotlightProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDesktop || shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handlePointerLeave = () => {
    setCoords(null);
  };

  const isVisible = Boolean(coords && isDesktop && !shouldReduceMotion);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative surface-card isolate overflow-hidden ${className}`}
    >
      {isDesktop && !shouldReduceMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-[640px] w-[640px] rounded-full z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(138, 245, 206, 0.10) 0%, rgba(8, 11, 15, 0) 70%)",
            transform: coords
              ? `translate3d(${coords.x - 320}px, ${coords.y - 320}px, 0)`
              : "translate3d(-320px, -320px, 0)",
            opacity: isVisible ? 1 : 0,
            transition:
              "transform 400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms ease",
          }}
        />
      )}
      <div className="relative z-10 flex flex-col items-start gap-6 w-full">
        {children}
      </div>
    </div>
  );
}
