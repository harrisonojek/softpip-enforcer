import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { buildMetadata, CONTACT_EMAIL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Press & Media Kit — Harrison Ekuetafia Oghenerioborue | SoftPip",
  description:
    "Approved press assets, biographies, and high-resolution headshots for Harrison Ekuetafia Oghenerioborue, founder of SoftPip and creator of The Enforcer.",
  path: "/press",
});

const HEADSHOTS = [
  {
    label: "Colour",
    name: "press-colour",
    src: "/images/press-colour.png",
    filename: "harrison-ekuetafia-oghenerioborue-colour.png",
    dimensions: "800 × 1000",
    aspect: "4/5",
    alt: "Harrison Ekuetafia Oghenerioborue, colour press headshot",
  },
  {
    label: "Black & White",
    name: "press-bw",
    src: "/images/press-bw.png",
    filename: "harrison-ekuetafia-oghenerioborue-bw.png",
    dimensions: "800 × 1000",
    aspect: "4/5",
    alt: "Harrison Ekuetafia Oghenerioborue, black and white press headshot",
  },
  {
    label: "Web Crop",
    name: "press-web",
    src: "/images/press-web.png",
    filename: "harrison-ekuetafia-oghenerioborue-web.png",
    dimensions: "400 × 400",
    aspect: "1/1",
    alt: "Harrison Ekuetafia Oghenerioborue, square web crop headshot",
  },
] as const;

const BIOS = [
  {
    label: "One-line Bio",
    text: "Harrison Ekuetafia Oghenerioborue is a Nigerian risk architect, founder, and creator of SoftPip and The Enforcer open-source risk governor.",
  },
  {
    label: "Short Bio",
    text: "Harrison Ekuetafia Oghenerioborue is a Nigerian founder and risk systems architect. Over six years trading synthetic indices and three years designing risk architecture for founders and public figures across Nigeria, he built SoftPip following a documented ₦32,450,000 drawdown in 2025. SoftPip provides a free ten-module trading curriculum and an open-source risk governor bot that enforces capital limits in code.",
  },
  {
    label: "Standard Bio",
    text: "Harrison Ekuetafia Oghenerioborue has spent six years trading synthetic indices and three years architecting risk systems, positioning, and operating protocols for founders and public figures across Nigeria.\n\nIn 2025, after an unaudited automation script and progressive stake laddering caused a ₦32,450,000 loss across ten months, he open-sourced the entire post-mortem. He authored the ten-module SoftPip curriculum to teach the mathematics of synthetic index PRNG feeds and engineered The Enforcer, an open-source Python daemon that enforces hard loss ceilings, stake floors, and automated cool-off periods directly at the WebSocket layer.",
  },
] as const;

export default function PressPage() {
  return (
    <div className="section-pad min-h-screen">
      <div className="container-shell flex flex-col gap-14">
        {/* Header */}
        <Reveal className="flex flex-col gap-4 max-w-[800px]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint)]" aria-hidden="true" />
            <span className="type-micro uppercase text-[var(--mint-text)] tracking-wider">
              Press &amp; Media Kit
            </span>
          </div>

          <h1 className="type-h1 m-0">Media assets &amp; headshots.</h1>

          <p className="type-body text-[var(--text-70)] m-0 prose-col leading-relaxed">
            Approved high-resolution photography, official biographies, and media inquiry guidelines for Harrison Ekuetafia Oghenerioborue and SoftPip.
          </p>
        </Reveal>

        {/* Headshots Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="type-h2 m-0 text-[var(--text)]">Official Headshots</h2>
            <p className="type-small text-[var(--text-45)] m-0">
              High-resolution crops formatted for press publications, print media, and digital avatars.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HEADSHOTS.map((shot) => (
              <Reveal key={shot.name}>
                <div className="surface-card p-5 rounded-2xl flex flex-col gap-4 border border-[var(--border)]">
                  <div
                    className={`relative w-full overflow-hidden rounded-[14px] bg-[var(--void)] border border-[var(--line)] ${
                      shot.aspect === "1/1" ? "aspect-square" : "aspect-[4/5]"
                    }`}
                  >
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.aspect === "1/1" ? 400 : 800}
                      height={shot.aspect === "1/1" ? 400 : 1000}
                      className="w-full h-full object-cover"
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <h3 className="type-small font-semibold text-[var(--text)] m-0">
                        {shot.label}
                      </h3>
                      <span className="type-micro text-[var(--text-45)] font-mono">
                        {shot.dimensions} · {shot.name}
                      </span>
                    </div>

                    <a
                      href={shot.src}
                      download={shot.filename}
                      className="btn-ghost text-xs px-3 py-1.5 min-h-[32px] inline-flex items-center gap-1.5"
                    >
                      Download ↓
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Biographies Section */}
        <div className="flex flex-col gap-6 max-w-[800px]">
          <div className="flex flex-col gap-1">
            <h2 className="type-h2 m-0 text-[var(--text)]">Approved Biographies</h2>
            <p className="type-small text-[var(--text-45)] m-0">
              For event programs, editorial profiles, and speaking introductions.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {BIOS.map((bio) => (
              <Reveal key={bio.label}>
                <div className="surface-card p-6 sm:p-8 rounded-2xl flex flex-col gap-3 border border-[var(--border)]">
                  <span className="type-micro uppercase text-[var(--mint-text)] font-mono font-semibold">
                    {bio.label}
                  </span>
                  <p className="type-body text-[var(--text-70)] m-0 leading-relaxed whitespace-pre-line">
                    {bio.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Media Inquiries */}
        <Reveal className="surface-card p-8 sm:p-10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 max-w-[800px] border border-[var(--border)]">
          <div className="flex flex-col gap-2">
            <span className="type-micro uppercase text-[var(--mint-text)] font-semibold">
              Inquiries &amp; Speaking
            </span>
            <h3 className="type-h3 m-0 text-[var(--text)]">
              Direct Contact
            </h3>
            <p className="type-small text-[var(--text-70)] m-0 max-w-[45ch]">
              For interviews, podcast appearances, and technical inquiries regarding algorithmic risk governance.
            </p>
          </div>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="btn-mint shrink-0"
          >
            {CONTACT_EMAIL}
          </a>
        </Reveal>
      </div>
    </div>
  );
}
