export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Prefix an internal href with the locale (English stays unprefixed). */
export function localizeHref(href: string, lang: Locale): string {
  if (lang === defaultLocale) return href;
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  if (href === "/fr" || href.startsWith("/fr/") || href.startsWith("/fr#") || href.startsWith("/fr?")) return href;
  return href === "/" ? "/fr" : `/fr${href}`;
}

/** Swap the locale of a pathname (used by the language switcher). */
export function switchLocalePath(pathname: string, to: Locale): string {
  const bare = pathname.replace(/^\/fr(?=\/|$)/, "") || "/";
  return localizeHref(bare, to);
}

/** Inline bilingual literal: `tr(lang, "Hello", "Bonjour")`. */
export function tr<T>(lang: Locale, en: T, fr: T): T {
  return lang === "fr" ? fr : en;
}
