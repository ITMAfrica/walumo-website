import { Hero } from "@/components/sections/hero";
import { ProofSplit, TrustBadge, TrustedStrip } from "@/components/sections/social-proof";
import { CtaBanner, PainGrid, Steps } from "@/components/sections/blocks";
import { PeopleBento } from "@/components/sections/gallery";
import { InsightsGrid } from "@/components/sections/collections";
import { HacklabSection } from "@/components/sections/community";
import { CtaPair } from "@/components/ui/cta-pair";
import { Container, Section, SectionHeading, TextLink } from "@/components/ui/primitives";
import { FeatureIcon } from "@/components/ui/icons";
import { Reveal, ScrollStatement, Spotlight } from "@/components/ui/reveal";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import { TalentMiniMock } from "@/components/ui/product-mocks";
import { HeroFollowUps, HeroLeaveCard } from "@/components/sections/interactive-hero";
import { KaziLeaveDemo, SalesDemo, TalentDemo } from "@/components/sections/motion-demos";
import { ProductTabs } from "@/components/sections/product-tabs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, tr } from "@/lib/i18n";
import { contentFor, siteFor } from "@/lib/i18n-data";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { site } = siteFor(lang);
  return {
    alternates: {
      canonical: site.url + (lang === "fr" ? "/fr" : ""),
      languages: { en: site.url, fr: site.url + "/fr", "x-default": site.url },
    },
  };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { deliverySteps, painPoints, products } = contentFor(lang);
  const { site } = siteFor(lang);
  const [kazi, talent, sales] = products;
  return (
    <>
      <Hero
        title={tr(lang, "Run HR, hiring and sales", "Pilotez RH, recrutement et ventes")}
        accent={tr(lang, "on one connected platform", "sur une seule plateforme connectée")}
        text={tr(
          lang,
          "Built in Nairobi for African organisations, Walumo connects HR, hiring and commercial operations so your teams move from spreadsheets and WhatsApp threads to one reliable way of working.",
          "Conçu à Nairobi pour les organisations africaines, Walumo relie les RH, le recrutement et les opérations commerciales, pour que vos équipes passent des tableurs et des conversations WhatsApp à une méthode de travail unique et fiable.",
        )}
        primary={site.primaryCta}
        secondary={site.secondaryCta}
        eyebrowNode={<TrustBadge />}
      >
        <Container className="pb-20">
          <div className="relative mx-auto max-w-5xl">
            <div className="pointer-events-none absolute -top-16 left-2 hidden -rotate-3 items-end gap-1 lg:flex" aria-hidden="true">
              <p className="font-hand text-[1.7rem] leading-none text-ink-soft">{lang === "fr" ? <>un vrai atelier,<br />avec une équipe cliente</> : <>a real workshop,<br />with a client team</>}</p>
              <svg viewBox="0 0 80 60" className="mb-[-2.6rem] h-14 w-20 text-ink-soft" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8c26-6 52 6 56 36" />
                <path d="m52 38 11 8 5-13" />
              </svg>
            </div>
            <PhotoPlaceholder
              src="/images/team-tech-africa.jpg"
              alt={tr(lang, "A team of African engineers and designers building software together", "Une équipe d'ingénieurs et de designers africains qui construisent un logiciel ensemble")}
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
              className="aspect-[4/3] rounded-[1.5rem] shadow-float sm:aspect-[16/9]"
            />
            <HeroLeaveCard className="relative z-10 mx-auto -mt-16 lg:hidden" />
            <div className="absolute -bottom-12 -left-4 hidden w-[300px] animate-float hover:[animation-play-state:paused] lg:block lg:-left-12">
              <HeroLeaveCard />
            </div>
            <div className="absolute -right-4 top-10 hidden w-[290px] animate-float hover:[animation-play-state:paused] [animation-delay:-3s] lg:-right-12 lg:block">
              <HeroFollowUps />
            </div>
            <div className="absolute -bottom-12 right-10 hidden w-[290px] animate-float hover:[animation-play-state:paused] [animation-delay:-1.5s] xl:block">
              <TalentMiniMock />
            </div>
          </div>
        </Container>
      </Hero>

      <TrustedStrip />

      {/* Pain */}
      <Section tone="fade">
        <Container size="narrow" className="text-center">
          <ScrollStatement
            text={tr(
              lang,
              "African teams are still running critical operations through spreadsheets, WhatsApp and disconnected tools. Walumo gives them one reliable way of working.",
              "Les équipes africaines gèrent encore des opérations critiques avec des tableurs, WhatsApp et des outils déconnectés. Walumo leur offre une méthode de travail unique et fiable.",
            )}
          />
        </Container>
        <Container>
          <div className="mt-16">
            <PainGrid items={painPoints} />
          </div>
        </Container>
      </Section>

      {/* Product ecosystem */}
      <Section tone="surface" id="products">
        <Container>
          <SectionHeading
            eyebrow={tr(lang, "Product ecosystem", "Écosystème de produits")}
            title={tr(lang, "One suite for people,", "Une seule suite pour vos équipes,")}
            accent={tr(lang, "hiring and sales", "votre recrutement et vos ventes")}
            text={tr(
              lang,
              "Kazi Pro, Talent Pro and Sales Tracker share one login, one design and one source of truth — so your people, your hiring and your sales all work together.",
              "Kazi Pro, Talent Pro et Sales Tracker partagent une même connexion, un même design et une même source de vérité : vos équipes, votre recrutement et vos ventes travaillent ensemble.",
            )}
          />
          <div className="mt-14">
            <ProductTabs
              tabs={[
                {
                  id: kazi.slug,
                  name: kazi.name,
                  category: kazi.category,
                  title: `${kazi.headline} ${kazi.accent}`,
                  text: kazi.body,
                  items: kazi.modules.slice(0, 4).map((m) => m.title),
                  href: "/products/kazi-pro",
                  linkLabel: tr(lang, "Discover Kazi Pro", "Découvrir Kazi Pro"),
                  visual: (
                    <KaziLeaveDemo />
                  ),
                },
                {
                  id: talent.slug,
                  name: talent.name,
                  category: talent.category,
                  title: `${talent.headline} ${talent.accent}`,
                  text: talent.body,
                  items: talent.modules.slice(0, 4).map((m) => m.title),
                  href: "/products/talent-pro",
                  linkLabel: tr(lang, "Discover Talent Pro", "Découvrir Talent Pro"),
                  visual: (
                    <TalentDemo />
                  ),
                },
                {
                  id: sales.slug,
                  name: sales.name,
                  category: sales.category,
                  title: `${sales.headline} ${sales.accent}`,
                  text: sales.body,
                  items: sales.modules.slice(0, 4).map((m) => m.title),
                  href: "/products/sales-tracker",
                  linkLabel: tr(lang, "Discover Sales Tracker", "Découvrir Sales Tracker"),
                  visual: (
                    <SalesDemo />
                  ),
                },
              ]}
            />
          </div>
          <CtaPair className="mt-12" primary={site.primaryCta} secondary={{ label: tr(lang, "Explore the full ecosystem", "Explorer tout l’écosystème"), href: "/products" }} />
        </Container>
      </Section>

      {/* Real people and places */}
      <PeopleBento />

      {/* Proof */}
      <Section tone="fade">
        <ProofSplit />
      </Section>

      {/* How Walumo delivers — software + services in one section */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow={tr(lang, "How Walumo delivers", "Comment Walumo déploie")}
            title={tr(lang, "Software, and the people to make it work", "Des logiciels, et les équipes pour les faire fonctionner")}
            text={tr(
              lang,
              "Every product comes with consulting, implementation, data migration, training and support. One partner, from first login to full transformation.",
              "Chaque produit s’accompagne de conseil, de mise en œuvre, de migration de données, de formation et de support. Un seul partenaire, de la première connexion à la transformation complète.",
            )}
          />
          <div className="mt-14">
            <Steps steps={deliverySteps} />
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <TextLink href="/what-we-do#services">{tr(lang, "See our services", "Découvrir nos services")}</TextLink>
            <TextLink href="/what-we-do#why-walumo">{tr(lang, "Why Walumo", "Pourquoi Walumo")}</TextLink>
          </div>
        </Container>
      </Section>

      <HacklabSection />

      <InsightsGrid />

      <CtaBanner title={tr(lang, "Ready to run your business on software built for Africa?", "Prêt à piloter votre entreprise avec un logiciel conçu pour l’Afrique ?")} />
    </>
  );
}
