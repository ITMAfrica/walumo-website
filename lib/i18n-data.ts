import * as contentEn from "@/lib/content";
import * as contentFr from "@/lib/content.fr";
import * as siteEn from "@/lib/site";
import * as siteFr from "@/lib/site.fr";
import type { Locale } from "@/lib/i18n";

export type Content = typeof contentEn;
export type SiteData = typeof siteEn;

/** All structured content (products, solutions, articles…) in the given language. */
export function contentFor(lang: Locale): Content {
  return lang === "fr" ? contentFr : contentEn;
}

/** Site config, navigation and footer links in the given language. */
export function siteFor(lang: Locale): SiteData {
  return lang === "fr" ? siteFr : siteEn;
}
