import type { MetadataRoute } from "next";
import { articles, events, products, reports, solutions } from "@/lib/content";
import { locales, localizeHref } from "@/lib/i18n";
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
  // One entry per page and language, each pointing at its translations (hreflang).
  const entry = (path: string, priority: number) =>
    locales.map((lang) => ({
      url: `${site.url}${localizeHref(path || "/", lang)}`.replace(/\/$/, ""),
      lastModified: now,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${localizeHref(path || "/", l)}`.replace(/\/$/, "")])),
      },
    }));
  return [
    ...staticRoutes.flatMap((p) => entry(p, p === "" ? 1 : 0.7)),
    ...products.flatMap((p) => entry(`/products/${p.slug}`, 0.9)),
    ...solutions.flatMap((s) => entry(`/solutions/${s.slug}`, 0.8)),
    ...articles.flatMap((a) => entry(`/insights/${a.slug}`, 0.6)),
    ...reports.flatMap((r) => entry(`/insights/reports/${r.slug}`, 0.5)),
    ...events.flatMap((e) => entry(`/insights/events/${e.slug}`, 0.5)),
  ];
}
