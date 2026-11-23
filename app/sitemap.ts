import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllCurriculumModules } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/autopsy",
    "/curriculum",
    "/bot",
    "/track-record",
    "/milestones",
    "/partner",
    "/about",
    "/risk",
    "/faq",
    "/terms",
    "/privacy",
  ];

  const modules = await getAllCurriculumModules();
  const curriculumRoutes = modules.map((m) => `/curriculum/${m.slug}`);

  const now = new Date();

  const allEntries: MetadataRoute.Sitemap = [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency: (route === "" || route === "/track-record" ? "weekly" : "monthly") as
        | "weekly"
        | "monthly",
      priority: route === "" ? 1.0 : route === "/autopsy" || route === "/curriculum" ? 0.9 : 0.8,
    })),
    ...curriculumRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];

  return allEntries;
}
