import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllCurriculumModules } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/autopsy",
    "/academy",
    "/academy/milestones",
    "/academy/research",
    "/labs",
    "/labs/enforcer",
    "/labs/enforcer/track-record",
    "/labs/calculator",
    "/labs/martingale-calculator",
    "/labs/volatility-75",
    "/labs/deriv-bot",
    "/scaling",
    "/community",
    "/partners",
    "/about",
    "/risk",
    "/faq",
    "/terms",
    "/privacy",
  ];

  const modules = await getAllCurriculumModules();
  const academyRoutes = modules.map((m) => `/academy/${m.slug}`);

  const now = new Date();

  const allEntries: MetadataRoute.Sitemap = [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency: (route === "" || route === "/labs/enforcer/track-record" ? "weekly" : "monthly") as
        | "weekly"
        | "monthly",
      priority: route === "" ? 1.0 : route === "/autopsy" || route === "/academy" ? 0.9 : 0.8,
    })),
    ...academyRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];

  return allEntries;
}
