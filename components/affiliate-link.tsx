"use client";

import React from "react";
import { track } from "@vercel/analytics";
import { DERIV_AFFILIATE_URL } from "@/lib/seo";

export type AffiliatePlacement =
  | "hero"
  | "autopsy"
  | "curriculum"
  | "bot"
  | "calculator"
  | "scaling"
  | "footer"
  | "nav"
  | "risk_disclosure";

interface AffiliateLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  placement: AffiliatePlacement;
  children: React.ReactNode;
  className?: string;
}

export function AffiliateLink({
  placement,
  children,
  className = "",
  onClick,
  ...props
}: AffiliateLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      track("affiliate_click", { placement });
    } catch {
      // Analytics fail-safe
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a
      href={DERIV_AFFILIATE_URL}
      target="_blank"
      rel="sponsored noopener"
      onClick={handleClick}
      className={className}
      data-placement={placement}
      {...props}
    >
      {children}
    </a>
  );
}
