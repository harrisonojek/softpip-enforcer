import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SITE_NAME, SITE_URL, CONTACT_EMAIL, INSTAGRAM_URL } from "@/lib/seo";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#080B0F",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Trade with rules, not feelings. | SoftPip",
    template: "%s | SoftPip",
  },
  description:
    "In 2025 I lost ₦32M trading. The full autopsy, ten-module curriculum, and open-source risk governor bot are free. Start with a $10 account.",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "SoftPip — Trade with rules, not feelings.",
    description:
      "In 2025 I lost ₦32M trading. The full autopsy, ten-module curriculum, and open-source risk governor bot are free.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "SoftPip — Free trading autopsy, curriculum, and risk bot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SoftPip — Trade with rules, not feelings.",
    description:
      "In 2025 I lost ₦32M trading. The full autopsy, ten-module curriculum, and open-source risk governor bot are free.",
    images: ["/og-default.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  email: CONTACT_EMAIL,
  founder: {
    "@type": "Person",
    name: "Oghenerioborue Harrison Ekuetafia",
  },
  sameAs: [INSTAGRAM_URL],
  description:
    "Free trading-education platform and open-source risk governor built after a ₦32M trading loss in 2025.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NG">
      <body className="bg-[var(--void)] text-[var(--text)] antialiased">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <Nav />
        <main id="main" className="pt-16">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
