import React from "react";
import Link from "next/link";
import { VERBATIM_AFFILIATE_DISCLOSURE } from "@/lib/seo";

export function AffiliateDisclosure({ className = "" }: { className?: string }) {
  return (
    <div className={`text-xs text-[var(--muted)] leading-relaxed flex flex-col gap-1 ${className}`}>
      <p className="m-0">
        <strong>Partner Disclosure:</strong> {VERBATIM_AFFILIATE_DISCLOSURE}{" "}
        <Link href="/risk" className="underline hover:text-[var(--foreground)] transition-colors">
          Read full risk warning
        </Link>
        .
      </p>
      <p className="m-0 text-[10px] text-[var(--text-45)]">
        Deriv synthetic options involve substantial risk of loss. The Enforcer is an open-source risk governor, not financial advice.
      </p>
    </div>
  );
}
