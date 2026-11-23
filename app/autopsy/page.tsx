import React from "react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { GateForm } from "@/components/gate-form";
import { Reveal } from "@/components/reveal";
import { ScrollProgress } from "@/components/scroll-progress";
import { getAutopsyContent } from "@/lib/content";
import { buildMetadata, DERIV_AFFILIATE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "₦32M: the full autopsy — SoftPip",
  description:
    "Every position, every mistake, dates and amounts. Eight pages. Free.",
  path: "/autopsy",
});

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="type-h2 text-[var(--text)] mt-12 mb-5 pb-3 hairline-b scroll-mt-24"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="type-h3 text-[var(--text)] mt-8 mb-3 scroll-mt-24"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="type-body text-[var(--text-70)] mb-5 prose-col leading-relaxed"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc list-outside pl-6 mb-6 space-y-2.5 text-[var(--text-70)] prose-col"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal list-outside pl-6 mb-6 space-y-2.5 text-[var(--text-70)] prose-col"
      {...props}
    />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="type-body leading-relaxed pl-1" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-[var(--text)] font-semibold" {...props} />
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href && (href.startsWith("/") || href.startsWith("#"));
    if (isInternal) {
      return (
        <Link
          href={href}
          className="text-[var(--mint-text)] font-medium hover:underline inline-flex items-center gap-1"
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        className="text-[var(--mint-text)] font-medium hover:underline inline-flex items-center gap-1"
        {...props}
      >
        {children}
      </a>
    );
  },
  hr: () => <hr className="my-10 border-0 hairline-b" />,
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 overflow-x-auto surface-card p-0 rounded-[14px]">
      <table className="w-full text-left border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-[var(--slate)] hairline-b text-[var(--text)]" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-[var(--rule)]" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-[var(--slate)]/40 transition-colors" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3.5 type-micro uppercase font-medium text-[var(--text-70)]" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3.5 type-small text-[var(--text-70)] tabular-nums" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="px-1.5 py-0.5 rounded bg-[var(--slate)] border border-[var(--line)] text-[var(--mint-text)] font-mono text-xs"
      {...props}
    />
  ),
};

export default async function AutopsyPage() {
  const { content } = await getAutopsyContent();

  return (
    <div className="section-pad min-h-screen">
      <ScrollProgress />
      <div className="container-shell flex flex-col gap-12">
        {/* Header section */}
        <Reveal className="flex flex-col gap-5 max-w-[800px]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--rust)]" aria-hidden="true" />
            <span className="type-micro uppercase text-[var(--rust)] tracking-wider">
              Forensic Report · ₦32,450,000 Loss
            </span>
          </div>

          <h1 className="type-h1 m-0">₦32M: the full autopsy.</h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            Every position, every mistake, dates and amounts. Eight pages. Free.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 type-micro text-[var(--text-45)]">
            <span>Author: Oghenerioborue Harrison Ekuetafia</span>
            <span>·</span>
            <span>Recorded: October 2025</span>
            <span>·</span>
            <span>8 min read</span>
          </div>
        </Reveal>

        {/* Gate Form */}
        <Reveal delayMs={70} className="max-w-[640px]">
          <GateForm />
        </Reveal>

        {/* Full MDX Body */}
        <div id="report-body" className="pt-6 hairline-t">
          <Reveal delayMs={140}>
            <div className="prose-col">
              <MDXRemote
                source={content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </div>
          </Reveal>
        </div>

        {/* Closing CTAs linking to /curriculum and /bot */}
        <div className="pt-10 hairline-t">
          <Reveal>
            <div className="surface-card p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex flex-col gap-2">
                <span className="type-micro uppercase text-[var(--mint-text)]">
                  Next Steps
                </span>
                <h3 className="type-h3 m-0 text-[var(--text)]">
                  Don&apos;t repeat the autopsy. Trade with rules.
                </h3>
                <p className="type-small text-[var(--text-70)] m-0 max-w-[50ch]">
                  Take the ten-module curriculum and run The Enforcer risk governor on demo before risking live capital.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link href="/curriculum" className="btn-mint">
                  Start Curriculum →
                </Link>
                <Link href="/bot" className="btn-ghost">
                  Examine Bot
                </Link>
                <a
                  href={DERIV_AFFILIATE_URL}
                  rel="sponsored noopener"
                  target="_blank"
                  className="btn-ghost"
                >
                  Open $10 account
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
