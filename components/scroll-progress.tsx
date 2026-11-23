"use client";

import React, { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = window.scrollY / docHeight;
      setProgress(Math.min(1, Math.max(0, scrolled)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-16 inset-x-0 z-40 h-[2px] pointer-events-none overflow-hidden"
    >
      <div
        className="h-full bg-[var(--mint)] transition-transform duration-75 ease-out origin-left"
        style={{
          transform: `scaleX(${progress})`,
        }}
      />
    </div>
  );
}
