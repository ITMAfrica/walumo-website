import { hasLocale, locales, tr, type Locale } from "@/lib/i18n";
import { contentFor } from "@/lib/i18n-data";
import type { Metadata } from "next";
import Link from "@/components/ui/link";
import { notFound } from "next/navigation";
import { PhotoCarousel } from "@/components/sections/profile-carousel";
import { CtaBanner } from "@/components/sections/blocks";
import { Button, CheckList, Container, Eyebrow, Section, SectionHeading } from "@/components/ui/primitives";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import { events as eventsEn } from "@/lib/content";
import { site } from "@/lib/site";

function alternates(path: string, lang: Locale) {
  const en = `${site.url}${path}`;
  const fr = `${site.url}/fr${path}`;
  return { canonical: lang === "fr" ? fr : en, languages: { en, fr, "x-default": en } };
}


export function generateStaticParams() {
  return locales.flatMap((lang) => eventsEn.map((e) => ({ lang, slug: e.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/insights/events/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const e = contentFor(lang).events.find((x) => x.slug === slug);
  if (!e) return {};
  return {
    title: e.title,
    description: e.summary,
    alternates: alternates(`/insights/events/${slug}`, lang),
    openGraph: { images: [{ url: e.cover }] },
  };
}

export default async function EventPage({ params }: PageProps<"/[lang]/insights/events/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const { events, pillars } = contentFor(lang);
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();
  const innovation = pillars.find((p) => p.icon === "sparkles");

  return (
    <>
      <section className="fluted">
        <Container className="pb-12 pt-12 text-center sm:pt-16">
          <nav aria-label={tr(lang, "Breadcrumb", "Fil d'Ariane")} className="text-[13px] text-muted">
            <Link href="/insights#events" className="hover:text-ink">
              {tr(lang, "Events", "Événements")}
            </Link>
          </nav>
          <Eyebrow className="mt-8">{event.status}</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl animate-fade-up font-serif text-5xl tracking-[-0.02em] text-ink sm:text-6xl">
            Walumo <em className="not-italic">Hacklab</em>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">{event.summary}</p>
          {event.highlights && (
            <dl className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-6">
              {event.highlights.map((h) => (
                <div key={h.label}>
                  <dt className="sr-only">{h.label}</dt>
                  <dd className="font-serif text-5xl tracking-[-0.03em] text-ink">{h.value}</dd>
                  <dd className="mt-1 text-[14px] text-muted">{h.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </Container>
        <Container className="pb-16">
          <PhotoPlaceholder
            src={event.cover}
            alt={tr(lang, "Walumo Hacklab participants gathered in the Walumo office", "Les participants du Walumo Hacklab réunis dans les bureaux de Walumo")}
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="mx-auto aspect-[16/8] max-w-6xl rounded-[1.5rem]"
          />
        </Container>
      </section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            align="left"
            eyebrow={tr(lang, "About the Hacklab", "À propos du Hacklab")}
            title={tr(lang, "Spotlighting Africa's emerging tech talent", "Mettre en lumière les talents tech émergents d'Afrique")}
            text={innovation?.text}
          />
          <div>
            <CheckList
              items={[
                tr(lang, "Teams presented their solutions on stage", "Les équipes ont présenté leurs solutions sur scène"),
                tr(lang, "Live product demos", "Démonstrations de produits en direct"),
                tr(lang, "A community of developers, designers and product thinkers", "Une communauté de développeurs, de designers et de spécialistes produit"),
              ]}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact?interest=partnership" arrow>
                {tr(lang, "Partner on the next edition", "Devenir partenaire de la prochaine édition")}
              </Button>
              <Button href="/what-we-do#pillars" variant="outline">
                {tr(lang, "Our strategic pillars", "Nos piliers stratégiques")}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="surface" className="overflow-hidden">
        <Container>
          <SectionHeading align="left" eyebrow={tr(lang, "Gallery", "Galerie")} title={tr(lang, "Highlights from the day", "Les temps forts de la journée")} />
        </Container>
        <PhotoCarousel photos={event.gallery} label={tr(lang, "Walumo Hacklab photo gallery", "Galerie photo du Walumo Hacklab")} />
      </Section>

      <CtaBanner
        title={tr(lang, "Build Africa's digital future with us", "Construisez avec nous l'avenir numérique de l'Afrique")}
        text={tr(
          lang,
          "Partner with Walumo on the next Hacklab, or talk to us about bringing our products to your organisation.",
          "Devenez partenaire de Walumo pour le prochain Hacklab, ou parlez-nous de l'adoption de nos produits dans votre organisation.",
        )}
        primary={{ label: tr(lang, "Partner with us", "Devenir partenaire"), href: "/contact?interest=partnership" }}
      />
    </>
  );
}
