import React from "react";
import Image from "next/image";
import { CONTACT_EMAIL } from "@/lib/seo";

export function AuthorProofBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex flex-col sm:flex-row items-center sm:items-start gap-6 ${className}`}
    >
      <div className="relative shrink-0 flex flex-col items-center">
        <div className="w-[96px] h-[96px] rounded-[22%] overflow-hidden border-2 border-[var(--mint)] bg-[var(--void)] relative">
          <Image
            src="/images/author-face.png"
            alt=""
            width={96}
            height={96}
            className="w-full h-full object-cover"
            style={{ objectPosition: "50% 16%" }}
          />
        </div>
        <span className="absolute -bottom-1 -right-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--void)] border border-[var(--rule)] text-[var(--text-45)]">
          Author
        </span>
      </div>

      <div className="flex flex-col gap-3 text-center sm:text-left">
        <div>
          <h3 className="type-h3 m-0 text-[var(--foreground)] font-semibold">
            Harrison Ekuetafia Oghenerioborue
          </h3>
          <p className="text-xs font-mono text-[var(--mint-text)] m-0 mt-0.5">
            Founder, SoftPip · FCT Abuja, Nigeria
          </p>
        </div>

        <p className="type-body text-[var(--text-70)] m-0 text-sm leading-relaxed max-w-[60ch]">
          I&apos;m Harrison Ekuetafia Oghenerioborue. Six years trading synthetic indices, three of them building risk systems and positioning for founders and public figures. In 2025 I lost ₦32,450,000 across ten months. The Enforcer is what I built so the same account couldn&apos;t happen twice.
        </p>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 type-small text-[var(--text-70)] font-normal">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[var(--text-70)] hover:text-[var(--text)] transition-colors no-underline font-normal"
          >
            {CONTACT_EMAIL}
          </a>
          <span className="text-[var(--text-45)] select-none" aria-hidden="true">
            ·
          </span>
          <a
            href="https://t.me/softpip_support"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-70)] hover:text-[var(--text)] transition-colors no-underline font-normal"
          >
            Telegram @softpip_support
          </a>
        </div>
      </div>
    </div>
  );
}
