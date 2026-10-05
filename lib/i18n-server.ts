import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n";

/** Current locale from the `[lang]` root segment (Server Components only). */
export async function getLang(): Promise<Locale> {
  const value = await lang();
  if (!value || !hasLocale(value)) notFound();
  return value;
}

import { contentFor, siteFor } from "@/lib/i18n-data";

/** Structured content for the current locale (Server Components only). */
export async function getContent() {
  return contentFor(await getLang());
}

/** Site config / navigation for the current locale (Server Components only). */
export async function getSite() {
  return siteFor(await getLang());
}
