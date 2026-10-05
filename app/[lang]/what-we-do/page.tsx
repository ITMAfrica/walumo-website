import { Icon3D } from "@/components/ui/icon-3d";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { LogoMarquee } from "@/components/sections/social-proof";
import { CtaBanner, FeatureGrid, ProductLinks, StatsBand } from "@/components/sections/blocks";
import { Button, Container, Eyebrow, Section, SectionHeading, TextLink, cn } from "@/components/ui/primitives";
import { FeatureIcon } from "@/components/ui/icons";
import { Reveal, ScrollStatement } from "@/components/ui/reveal";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import { tr, type Locale } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { contentFor } from "@/lib/i18n-data";
import { site } from "@/lib/site";

function alternates(path: string, lang: Locale) {
  const en = `${site.url}${path}`;
  const fr = `${site.url}/fr${path}`;
  return { canonical: lang === "fr" ? fr : en, languages: { en, fr, "x-default": en } };
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
    title: tr(lang, "What we do", "Ce que nous faisons"),
    description: tr(
      lang,
      "Walumo builds, implements and supports the software African teams use to run better businesses — the technology arm of ITM Holding.",
      "Walumo conçoit, déploie et accompagne les logiciels que les équipes africaines utilisent pour mieux gérer leur entreprise — le bras technologique d'ITM Holding.",
    ),
    alternates: alternates("/what-we-do", lang),
  };
}

export default async function WhatWeDoPage() {
  const lang = await getLang();
  const { advantages, howWeWork, mission, pillars, proofStats, services, vision } = contentFor(lang);
  return (
    <>
      <Hero
        eyebrow={tr(lang, "What we do", "Ce que nous faisons")}
        title={tr(lang, "We build, implement and support the software", "Nous concevons, déployons et accompagnons les logiciels")}
        accent={tr(lang, "African teams use to run better businesses", "que les équipes africaines utilisent pour mieux gérer leur entreprise")}
        text={tr(
          lang,
          "Where African ingenuity meets global excellence: Walumo operates at the intersection of innovation, talent and impact, driving Africa's digital transformation through practical, scalable solutions.",
          "Là où l'ingéniosité africaine rencontre l'excellence mondiale : Walumo agit à la croisée de l'innovation, du talent et de l'impact, et accélère la transformation numérique de l'Afrique grâce à des solutions concrètes et évolutives.",
        )}
        secondary={{ label: tr(lang, "Explore products", "Découvrir les produits"), href: "/products" }}
      >
        <Container className="pb-16">
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-[1.4fr_1fr]">
            <PhotoPlaceholder
              src="/images/hackathon/img_2026.jpg"
              alt={tr(lang, "Participants of the Walumo Hacklab gathered in the Walumo office", "Les participants du Walumo Hacklab réunis dans les bureaux de Walumo")}
              priority
              sizes="(max-width: 640px) 100vw, 60vw"
              className="aspect-[4/3] rounded-[1.25rem] sm:aspect-auto sm:h-full"
            />
            <div className="grid gap-4">
              <PhotoPlaceholder src="/images/hackathon/img_1866.jpg" alt={tr(lang, "A Walumo Hacklab team on stage", "Une équipe du Walumo Hacklab sur scène")} sizes="(max-width: 640px) 100vw, 40vw" className="aspect-[4/3] rounded-[1.25rem]" />
              <PhotoPlaceholder src="/images/office-nairobi.jpg" alt={tr(lang, "Walumo team meeting", "Réunion de l'équipe Walumo")} sizes="(max-width: 640px) 100vw, 40vw" className="aspect-[4/3] rounded-[1.25rem]" />
            </div>
          </div>
        </Container>
      </Hero>

      {/* Vision & mission */}
      <Section tone="fade">
        <Container size="narrow" className="text-center">
          <ScrollStatement text={vision} />
        </Container>
        <Container>
          <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2">
            {[
              { label: tr(lang, "Our vision", "Notre vision"), text: vision, icon: "compass" as const },
              { label: tr(lang, "Our mission", "Notre mission"), text: mission, icon: "rocket" as const },
            ].map((v) => (
              <div key={v.label} className="rounded-[var(--radius-card)] bg-white p-8 shadow-card">
                <Icon3D name={v.icon} className="w-12" />
                <h2 className="mt-6 text-xl font-bold text-ink">{v.label}</h2>
                <p className="mt-2 text-[15px] leading-7 text-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Four strategic pillars */}
      <Section id="pillars" className="scroll-mt-20">
        <Container>
          <SectionHeading
            eyebrow={tr(lang, "Four strategic pillars", "Quatre piliers stratégiques")}
            title={tr(lang, "From ideation to execution, from talent to transformation", "De l'idée à l'exécution, du talent à la transformation")}
            text={tr(
              lang,
              "Each pillar is designed to create tangible impact for our clients and for Africa's tech ecosystem.",
              "Chaque pilier vise un impact concret pour nos clients et pour l'écosystème technologique africain.",
            )}
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 2) * 80}>
                <div className="h-full rounded-[var(--radius-card)] bg-white p-8 shadow-card">
                  <div className="flex items-center gap-4">
                    <Icon3D name={p.icon} className="w-12" />
                    <span className="font-serif text-3xl text-surface-2">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-muted">{p.text}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li key={t} className="rounded-full border border-line px-3 py-1 text-[13px] text-ink-soft">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Services */}
      <Section id="services" tone="surface" className="scroll-mt-20">
        <Container>
          <SectionHeading
            eyebrow={tr(lang, "Services", "Services")}
            title={tr(lang, "World-class software, and the people to run it", "Des logiciels de classe mondiale, et les équipes pour les faire fonctionner")}
            text={tr(
              lang,
              "Walumo gives African businesses an integrated suite of products and the consulting, implementation and support to make them work.",
              "Walumo offre aux entreprises africaines une suite de produits intégrée, ainsi que le conseil, le déploiement et l'accompagnement nécessaires pour qu'elle fonctionne.",
            )}
          />
          <div className="mt-14">
            <FeatureGrid columns={4} items={services} />
          </div>
          <div className="mt-10 text-center">
            <Button href="/contact?interest=services" arrow>
              {tr(lang, "Talk to our services team", "Parler à notre équipe services")}
            </Button>
          </div>
        </Container>
      </Section>

      {/* How we work */}
      <Section id="method" className="scroll-mt-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>{tr(lang, "How we work", "Notre façon de travailler")}</Eyebrow>
            <h2 className="mt-5 font-serif text-[2.2rem] leading-[1.15] tracking-[-0.02em] text-ink sm:text-5xl">
              {tr(lang, "Every step is intentional", "Chaque étape est réfléchie")}
            </h2>
            <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
              {tr(
                lang,
                "From brief to deployment, a rigorous method: transparent process, continuous delivery and support after launch.",
                "Du cahier des charges au déploiement, une méthode rigoureuse : un processus transparent, une livraison continue et un accompagnement après le lancement.",
              )}
            </p>
            <PhotoPlaceholder
              src="/images/hackathon/img_1888.jpg"
              alt={tr(lang, "A product demo at Walumo", "Une démonstration produit chez Walumo")}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="mt-8 aspect-[4/3] rounded-[var(--radius-card)]"
            />
          </div>
          <ol className="relative space-y-5">
            {howWeWork.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 70}>
                <div className="flex gap-5 rounded-[var(--radius-card)] border border-line bg-white p-6 sm:p-7">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ink font-serif text-lg text-accent">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-ink">{s.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-6 text-muted">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Why Walumo */}
      <Section id="why-walumo" tone="surface" className="scroll-mt-20">
        <Container>
          <SectionHeading eyebrow={tr(lang, "Competitive advantage", "Avantage concurrentiel")} title={tr(lang, "What sets Walumo apart", "Ce qui distingue Walumo")} />
          <div className="mt-14">
            <FeatureGrid items={advantages} />
          </div>
        </Container>
      </Section>

      {/* ITM backing */}
      <Section id="itm" tone="dark" className="scroll-mt-20">
        <Container>
          <SectionHeading
            dark
            eyebrow={tr(lang, "ITM backing", "Le soutien d'ITM")}
            title={tr(lang, "The technology arm of ITM Holding", "Le bras technologique d'ITM Holding")}
            text={tr(
              lang,
              "Walumo is the technology and product division of ITM Holding — built, owned and run from within Africa, with reach across 20+ countries.",
              "Walumo est la division technologie et produits d'ITM Holding — conçue, détenue et dirigée depuis l'Afrique, avec une présence dans plus de 20 pays.",
            )}
          />
          <dl className="mt-14 grid gap-10 text-center sm:grid-cols-3">
            {proofStats.map((s) => (
              <div key={s.label}>
                <dd className="font-serif text-6xl text-white">{s.value}</dd>
                <dt className="mx-auto mt-2 max-w-[16rem] text-[15px] text-white/65">{s.label}</dt>
              </div>
            ))}
          </dl>
          <LogoMarquee className="mt-16" />
          <p className="mt-10 text-center">
            <TextLink href="/insights/events/walumo-hacklab" className="text-accent hover:text-white">
              {tr(lang, "See how we invest in Africa's tech talent", "Découvrez comment nous investissons dans les talents tech africains")}
            </TextLink>
          </p>
        </Container>
      </Section>

      <ProductLinks />

      <CtaBanner />
    </>
  );
}
