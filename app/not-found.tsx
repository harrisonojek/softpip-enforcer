import React from "react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "404 — Nothing Here | SoftPip",
  description: "The requested route does not exist.",
  path: "/404",
});

export default function NotFound() {
  return (
    <div className="section-pad min-h-[75vh] flex items-center justify-center">
      <div className="container-shell flex flex-col items-center text-center gap-6 max-w-[560px]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full surface-card border border-[var(--line)]">
          <span className="w-2 h-2 rounded-full bg-[var(--rust)]" aria-hidden="true" />
          <span className="type-micro uppercase text-[var(--rust)] tracking-wider">
            HTTP 404 · Route Not Found
          </span>
        </div>

        <h1 className="type-h1 m-0">Nothing here.</h1>

        <p className="type-body text-[var(--text-70)] m-0">
          The requested path does not exist or has been relocated.
        </p>

        <div className="pt-2">
          <Link href="/" className="btn-primary">
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
