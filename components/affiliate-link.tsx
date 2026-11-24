import React from "react";
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
  ...props
}: AffiliateLinkProps) {
  return (
    <a
      href={DERIV_AFFILIATE_URL}
      target="_blank"
      rel="sponsored noopener"
      className={className}
      data-placement={placement}
      data-track="affiliate_click"
      {...props}
    >
      {children}
    </a>
  );
}
