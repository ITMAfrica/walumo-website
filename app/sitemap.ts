import type { MetadataRoute } from "next";
import { articles, events, products, reports, solutions } from "@/lib/content";
import { site } from "@/lib/site";

const staticRoutes = [
  "",
  "/products",
  "/solutions",
  "/what-we-do",
  "/insights",
  "/insights/case-studies",
  "/contact",
  "/security",
  "/support",
  "/privacy-policy",
  "/terms",
  "/cookie-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number) => ({ url: `${site.url}${path}`, lastModified: now, priority });
  return [
    ...staticRoutes.map((p) => entry(p, p === "" ? 1 : 0.7)),
    ...products.map((p) => entry(`/products/${p.slug}`, 0.9)),
    ...solutions.map((s) => entry(`/solutions/${s.slug}`, 0.8)),
    ...articles.map((a) => entry(`/insights/${a.slug}`, 0.6)),
    ...reports.map((r) => entry(`/insights/reports/${r.slug}`, 0.5)),
    ...events.map((e) => entry(`/insights/events/${e.slug}`, 0.5)),
  ];
}
