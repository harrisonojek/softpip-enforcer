import React from "react";

interface RevealProps {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
  staggerChildren?: boolean;
}

export function Reveal({
  children,
  className = "",
}: RevealProps) {
  return <div className={className}>{children}</div>;
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
  className = "",
}: CountUpNumberProps) {
  return (
    <span className={className}>
      {prefix}
      {target}
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
  className = "",
}: RevealGroupProps) {
  return <div className={className}>{children}</div>;
}
