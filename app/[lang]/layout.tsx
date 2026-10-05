import type { Metadata } from "next";
import localFont from "next/font/local";
import { Caveat, Noto_Serif } from "next/font/google";
import { AnnouncementBar, Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LocaleProvider } from "@/components/ui/locale";
import { hasLocale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { siteFor } from "@/lib/i18n-data";
import "../globals.css";

// Walumo brand typeface (same files as the current Walumo website).
const candara = localFont({
  variable: "--font-candara",
  src: [
    { path: "../fonts/Candara.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Candara_Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
});

// Editorial display face for headings (kept from the Nova layout).
const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400"],
});

// Handwriting face, used sparingly for human notes and annotations.
const caveat = Caveat({ variable: "--font-hand", subsets: ["latin"], weight: ["500"] });

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { site } = siteFor(lang);
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${site.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    openGraph: {
      siteName: site.name,
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_GB",
      images: [{ url: "/images/og-walumo.jpg", width: 1200, height: 630, alt: site.tagline }],
    },
    twitter: { card: "summary_large_image" },
    icons: { icon: "/favicon.svg" },
  };
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} className={`${candara.variable} ${notoSerif.variable} ${caveat.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <LocaleProvider lang={lang}>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
          >
            {lang === "fr" ? "Aller au contenu" : "Skip to content"}
          </a>
          <AnnouncementBar />
          <Header />
          <main id="content" className="flex-1">
            {children}
          </main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
