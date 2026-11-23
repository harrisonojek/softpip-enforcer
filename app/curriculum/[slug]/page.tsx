import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Reveal } from "@/components/reveal";
import { ScrollProgress } from "@/components/scroll-progress";
import {
  getAllCurriculumModules,
  getCurriculumModuleBySlug,
} from "@/lib/content";
import { buildMetadata, DERIV_AFFILIATE_URL, SITE_URL } from "@/lib/seo";

interface ModulePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const modules = await getAllCurriculumModules();
  return modules.map((m) => ({
    slug: m.slug,
  }));
}

export async function generateMetadata({ params }: ModulePageProps) {
  const { slug } = await params;
  const moduleData = await getCurriculumModuleBySlug(slug);

  if (!moduleData) {
    return {
      title: "Module Not Found — SoftPip",
    };
  }

  const { metadata } = moduleData;
  return buildMetadata({
    title: `${metadata.index}. ${metadata.title} — SoftPip Curriculum`,
    description: metadata.outcome,
    path: `/curriculum/${slug}`,
  });
}

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
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="p-5 my-6 rounded-[14px] bg-[var(--slate)] border border-[var(--line)] overflow-x-auto text-xs font-mono text-[var(--text)] leading-relaxed"
      {...props}
    />
  ),
};

export default async function CurriculumDetailPage({ params }: ModulePageProps) {
  const { slug } = await params;
  const moduleData = await getCurriculumModuleBySlug(slug);

  if (!moduleData) {
    notFound();
  }

  const { metadata, content, prevModule, nextModule } = moduleData;

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: metadata.title,
    description: metadata.outcome,
    provider: {
      "@type": "Organization",
      name: "SoftPip",
      url: SITE_URL,
    },
    educationalLevel: "Beginner to Intermediate",
    timeRequired: `PT${parseInt(metadata.duration, 10) || 20}M`,
  };

  return (
    <article className="section-pad min-h-screen">
      <ScrollProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd),
        }}
      />

      <div className="container-shell flex flex-col gap-10">
        {/* Navigation Breadcrumb */}
        <Reveal>
          <div className="flex items-center gap-2 type-micro text-[var(--text-45)]">
            <Link
              href="/curriculum"
              className="text-[var(--text-70)] hover:text-[var(--text)] transition-colors no-underline"
            >
              Curriculum
            </Link>
            <span>/</span>
            <span className="font-mono text-[var(--mint-text)]">{metadata.index}</span>
          </div>
        </Reveal>

        {/* Title & Index Header */}
        <Reveal className="flex flex-col gap-4 max-w-[800px]">
          <div className="flex items-center gap-3">
            <span
              className="type-display font-mono text-[var(--text-45)] select-none tabular-nums"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              {metadata.index}
            </span>
            <div className="flex flex-col">
              <span className="type-micro uppercase text-[var(--text-45)]">
                Module {metadata.index} of 10
              </span>
              <span className="type-micro text-[var(--mint-text)] tabular-nums">
                {metadata.duration} read
              </span>
            </div>
          </div>

          <h1 className="type-h1 m-0">{metadata.title}</h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col">
            {metadata.outcome}
          </p>
        </Reveal>

        {/* Rust "failure this corrects" Callout */}
        <Reveal delayMs={70} className="max-w-[800px]">
          <div
            className="rounded-[14px] p-5 sm:p-6 border flex flex-col gap-1.5"
            style={{
              backgroundColor: "rgba(232, 115, 90, 0.08)",
              borderColor: "rgba(232, 115, 90, 0.35)",
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "var(--rust)" }}
                aria-hidden="true"
              />
              <span
                className="type-micro uppercase tracking-wider font-semibold"
                style={{ color: "var(--rust)" }}
              >
                Failure this corrects
              </span>
            </div>
            <p className="type-small text-[var(--text)] m-0 leading-relaxed">
              {metadata.failureCorrects}
            </p>
          </div>
        </Reveal>

        {/* 64ch MDX Content Body */}
        <div className="pt-6 hairline-t">
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

        {/* Prev / Next Pagination Links */}
        <div className="pt-10 hairline-t">
          <Reveal>
            <nav
              aria-label="Module pagination"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[800px]"
            >
              {prevModule ? (
                <Link
                  href={`/curriculum/${prevModule.slug}`}
                  className="surface-card-interactive p-5 flex flex-col gap-1.5 no-underline group"
                >
                  <span className="type-micro text-[var(--text-45)] group-hover:text-[var(--mint-text)] transition-colors">
                    ← Previous · Module {prevModule.index}
                  </span>
                  <span className="type-small text-[var(--text)] font-medium group-hover:text-[var(--mint-text)] transition-colors">
                    {prevModule.title}
                  </span>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}

              {nextModule ? (
                <Link
                  href={`/curriculum/${nextModule.slug}`}
                  className="surface-card-interactive p-5 flex flex-col sm:items-end sm:text-right gap-1.5 no-underline group"
                >
                  <span className="type-micro text-[var(--text-45)] group-hover:text-[var(--mint-text)] transition-colors">
                    Next · Module {nextModule.index} →
                  </span>
                  <span className="type-small text-[var(--text)] font-medium group-hover:text-[var(--mint-text)] transition-colors">
                    {nextModule.title}
                  </span>
                </Link>
              ) : (
                <Link
                  href="/bot"
                  className="surface-card-interactive p-5 flex flex-col sm:items-end sm:text-right gap-1.5 no-underline group"
                >
                  <span className="type-micro text-[var(--mint-text)] font-medium">
                    Curriculum Complete →
                  </span>
                  <span className="type-small text-[var(--text)] font-medium group-hover:text-[var(--mint-text)] transition-colors">
                    Examine The Enforcer Bot
                  </span>
                </Link>
              )}
            </nav>
          </Reveal>
        </div>

        {/* Account Setup Callout */}
        <div className="pt-6">
          <Reveal>
            <div className="surface-card p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 max-w-[800px]">
              <div className="flex flex-col gap-1">
                <span className="type-micro uppercase text-[var(--mint-text)]">
                  Ready to practice?
                </span>
                <p className="type-small text-[var(--text-70)] m-0">
                  Open a segregated $10 Deriv account to test these constraints on demo first.
                </p>
              </div>
              <a
                href={DERIV_AFFILIATE_URL}
                rel="sponsored noopener"
                target="_blank"
                className="btn-mint shrink-0"
              >
                Open $10 account
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
