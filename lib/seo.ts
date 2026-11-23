import type { Metadata } from "next";

export const SITE_URL = "https://softpip.com";
export const SITE_NAME = "SoftPip";

export const DERIV_AFFILIATE_URL = "https://t.deriv.link?t=B9FG9YL4HJVF";
export const INSTAGRAM_URL = "https://www.instagram.com/soft.pip";
export const CONTACT_EMAIL = "softpip.contact@gmail.com";
export const TELEGRAM_COMMUNITY_URL = "https://t.me/+UbVnSmaiazlhY2Nk";
export const GITHUB_REPO_URL = "https://github.com/harrisonojek/softpip-enforcer";
export const WEB3FORMS_ACCESS_KEY = "87ef4130-07a8-496c-bf8c-f69b2cf77bb6";

export const VERBATIM_AFFILIATE_DISCLOSURE =
  "I earn commission from Deriv when you trade through my links. It costs you nothing extra.";

export const VERBATIM_RISK_WARNING =
  'The products offered on the trade.deriv.com website include Options, Contracts for Difference ("CFDs"), and other complex derivatives. Trading Options may not be suitable for everyone. Trading CFDs carries a high level of risk since leverage can work both to your advantage and disadvantage. As a result, the products offered on the website may not be suitable for all investors because of the risk of losing all of your invested capital. You should never invest money that you cannot afford to lose and never trade with borrowed money. Before trading in the complex products offered, please be sure to understand the risks involved.';

export const VERBATIM_COPYRIGHT =
  "© 2026 SoftPip. Not a broker. Trading involves risk.";

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonicalUrl = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "en_NG",
      type: "website",
      images: [
        {
          url: "/images/og-default.png",
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-default.png"],
    },
  };
}
