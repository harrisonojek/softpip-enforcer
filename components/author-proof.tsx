import React from "react";
import Image from "next/image";
import { GITHUB_REPO_URL } from "@/lib/seo";

export function AuthorProofBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex flex-col sm:flex-row items-center sm:items-start gap-6 ${className}`}
    >
      <div className="relative shrink-0">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[var(--mint)] bg-[var(--void)] relative">
          <Image
            src="/author/harrison.jpg"
            alt="Oghenerioborue Harrison Ekuetafia"
            width={112}
            height={112}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="absolute -bottom-2 -right-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--void)] border border-[var(--rule)] text-[var(--text-45)]">
          Author
        </span>
      </div>

      <div className="flex flex-col gap-3 text-center sm:text-left">
        <div>
          <h3 className="type-h3 m-0 text-[var(--foreground)] font-semibold">
            Oghenerioborue Harrison Ekuetafia
          </h3>
          <p className="text-xs font-mono text-[var(--mint-text)] m-0 mt-0.5">
            Creator of SoftPip &amp; The Enforcer · Lagos, Nigeria
          </p>
        </div>

        <p className="type-body text-[var(--text-70)] m-0 text-sm leading-relaxed max-w-[60ch]">
          Software engineer and synthetic indices researcher. After documenting a ₦32,450,000 personal loss across eight months of discretionary options trading in 2025, Harrison designed and released The Enforcer as an open-source risk governor to mechanically enforce position sizing and loss limits.
        </p>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs font-mono">
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--mint-text)] hover:underline inline-flex items-center gap-1.5"
          >
            GitHub (@harrisonojek) →
          </a>
          <a
            href="https://t.me/softpip_support"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-70)] hover:text-[var(--text)] transition-colors inline-flex items-center gap-1.5"
          >
            Telegram (@softpip_support)
          </a>
          <span className="text-[var(--text-45)] text-[10px]">
            [Photo: PLACEHOLDER — confirm headshot]
          </span>
        </div>
      </div>
    </div>
  );
}
