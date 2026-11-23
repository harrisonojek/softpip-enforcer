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

  const spotlightStyle: React.CSSProperties =
    coords && isDesktop && !shouldReduceMotion
      ? {
          backgroundImage: `radial-gradient(550px circle at ${coords.x}px ${coords.y}px, rgba(138, 245, 206, 0.10) 0%, rgba(8, 11, 15, 0) 70%)`,
          transition: "background-image 400ms ease",
        }
      : {};

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative surface-card overflow-hidden ${className}`}
      style={spotlightStyle}
    >
      {children}
    </div>
  );
}
