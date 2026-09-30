import type { Metadata } from "next";
import localFont from "next/font/local";
import { Noto_Serif } from "next/font/google";
import { AnnouncementBar, Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { site } from "@/lib/site";
import "./globals.css";

// Walumo brand typeface (same files as the current Walumo website).
const candara = localFont({
  variable: "--font-candara",
  src: [
    { path: "./fonts/Candara.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Candara_Bold.ttf", weight: "700", style: "normal" },
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_GB",
    images: [{ url: "/images/og-walumo.jpg", width: 1200, height: 630, alt: site.tagline }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${candara.variable} ${notoSerif.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
