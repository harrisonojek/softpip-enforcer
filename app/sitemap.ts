import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
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

  const now = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/track-record" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/autopsy" ? 0.9 : 0.8,
  }));
}
