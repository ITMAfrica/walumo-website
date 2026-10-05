import type { Metadata } from "next";
import Link from "@/components/ui/link";
import { Hero } from "@/components/sections/hero";
import { TrustedStrip } from "@/components/sections/social-proof";
import { CtaBanner, StatsBand, Steps } from "@/components/sections/blocks";
import { Button, CheckList, Container, Eyebrow, Section, SectionHeading, cn } from "@/components/ui/primitives";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import { KaziMiniMock, SalesPipelineMock, SuiteHub, TalentMiniMock } from "@/components/ui/product-mocks";
import { notFound } from "next/navigation";
import { hasLocale, tr } from "@/lib/i18n";
import { contentFor, siteFor } from "@/lib/i18n-data";

export async function generateMetadata({ params }: PageProps<"/[lang]/products">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { site } = siteFor(lang);
  return {
    title: tr(lang, "Product ecosystem", "Écosystème de produits"),
    description: tr(
      lang,
      "One suite for people, hiring and sales. Kazi Pro, Talent Pro and Sales Tracker connect HR, recruitment and commercial operations in one African-built business software ecosystem.",
      "Une seule suite pour les équipes, le recrutement et les ventes. Kazi Pro, Talent Pro et Sales Tracker relient RH, recrutement et opérations commerciales dans un écosystème logiciel conçu en Afrique.",
    ),
    alternates: {
      canonical: site.url + (lang === "fr" ? "/fr" : "") + "/products",
      languages: { en: site.url + "/products", fr: site.url + "/fr" + "/products", "x-default": site.url + "/products" },
    },
  };
}

const visuals = {
  "kazi-pro": <KaziMiniMock />,
  "talent-pro": <TalentMiniMock />,
  "sales-tracker": <SalesPipelineMock compact />,
};

export default async function ProductsPage({ params }: PageProps<"/[lang]/products">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { deliverySteps, products, proofStats, roadmap } = contentFor(lang);
  const { site } = siteFor(lang);
  return (
    <>
      <Hero
        eyebrow={tr(lang, "Product ecosystem", "Écosystème de produits")}
        title={tr(lang, "One suite for people,", "Une seule suite pour vos équipes,")}
        accent={tr(lang, "hiring and sales", "votre recrutement et vos ventes")}
        text={tr(
          lang,
          "Walumo connects HR, recruitment and commercial operations in one African-built business software ecosystem — three products that share one login, one design and one source of truth.",
          "Walumo relie les RH, le recrutement et les opérations commerciales dans un écosystème logiciel conçu en Afrique : trois produits qui partagent une même connexion, un même design et une même source de vérité.",
        )}
        secondary={{ label: tr(lang, "Talk to our team", "Parler à notre équipe"), href: site.whatsappCta.href }}
      >
        <Container className="pb-16">
          <SuiteHub />
        </Container>
      </Hero>

      <TrustedStrip />

      <Section tone="surface">
        <Container>
          <SectionHeading
            title={tr(lang, "Three products, one way of working", "Trois produits, une seule façon de travailler")}
            text={tr(
              lang,
              "Each product solves a painful business problem on its own, and works better with the others.",
              "Chaque produit résout seul un vrai problème métier, et fonctionne encore mieux avec les autres.",
            )}
          />
          <div className="mt-14 space-y-6">
            {products.map((p, i) => (
              <Reveal key={p.slug}>
                <article className="grid overflow-hidden rounded-[var(--radius-card)] bg-white shadow-card lg:grid-cols-[1.1fr_1fr]">
                  <div className={cn("p-8 sm:p-10 lg:p-12", i % 2 === 1 && "lg:order-2")}>
                    <Eyebrow>{p.category}</Eyebrow>
                    <h2 className="mt-5 text-[1.8rem] font-bold leading-tight tracking-[-0.02em] text-ink">{p.name}</h2>
                    <p className="mt-1 text-[15px] font-bold text-accent-strong">{p.tagline}</p>
                    <dl className="mt-6 space-y-4 text-[15px] leading-6">
                      <div>
                        <dt className="font-bold text-ink">{tr(lang, "The problem", "Le problème")}</dt>
                        <dd className="text-muted">{p.pains[0].text}</dd>
                      </div>
                      <div>
                        <dt className="font-bold text-ink">{tr(lang, "The result", "Le résultat")}</dt>
                        <dd className="text-muted">{p.outcome}</dd>
                      </div>
                    </dl>
                    <CheckList className="mt-6" items={p.modules.slice(0, 4).map((m) => m.title)} />
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button href={`/products/${p.slug}`} arrow>
                        {tr(lang, `Discover ${p.name}`, `Découvrir ${p.name}`)}
                      </Button>
                      <Button href={`/contact?interest=${p.slug}`} variant="outline">
                        {p.cta}
                      </Button>
                    </div>
                  </div>
                  <PhotoPlaceholder tone={p.tone} className={cn("min-h-[360px]", i % 2 === 1 && "lg:order-1")}>
                    <div className="flex h-full items-center justify-center p-8">{visuals[p.slug]}</div>
                  </PhotoPlaceholder>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow={tr(lang, "How the suite connects", "Comment la suite s’articule")}
            title={tr(lang, "Built to work together from day one", "Conçus pour fonctionner ensemble dès le premier jour")}
            text={tr(
              lang,
              "The same employee, candidate or customer record flows between products, so information is entered once and trusted everywhere.",
              "La même fiche employé, candidat ou client circule d’un produit à l’autre : l’information est saisie une seule fois et reste fiable partout.",
            )}
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: tr(lang, "Shared login", "Connexion unique"), d: tr(lang, "One account and single sign-on across Kazi Pro, Talent Pro and Sales Tracker.", "Un seul compte et une authentification unique pour Kazi Pro, Talent Pro et Sales Tracker.") },
              { t: tr(lang, "Shared profiles", "Profils partagés"), d: tr(lang, "A candidate hired in Talent Pro becomes an employee in Kazi Pro, without re-typing.", "Un candidat recruté dans Talent Pro devient un employé dans Kazi Pro, sans ressaisie.") },
              { t: tr(lang, "Common admin & permissions", "Administration et droits communs"), d: tr(lang, "Manage users, roles and entities in one place.", "Gérez utilisateurs, rôles et entités au même endroit.") },
              { t: tr(lang, "Shared reports", "Rapports partagés"), d: tr(lang, "See people, hiring and revenue side by side.", "Visualisez côte à côte vos équipes, votre recrutement et votre chiffre d’affaires.") },
            ].map((x, i) => (
              <Reveal as="li" key={x.t} delay={i * 60}>
                <div className="h-full rounded-[var(--radius-card)] border border-line p-6">
                  <span className="font-serif text-3xl text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-bold text-ink">{x.t}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-muted">{x.d}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="fade">
        <StatsBand title={tr(lang, "Proof, not promises", "Des preuves, pas des promesses")} stats={proofStats} />
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow={tr(lang, "Implementation", "Mise en œuvre")}
            title={tr(lang, "Every product comes with a delivery team", "Chaque produit s’accompagne d’une équipe de déploiement")}
            text={tr(
              lang,
              "Migration, training and support are part of every rollout — not optional extras.",
              "La migration, la formation et le support font partie de chaque déploiement, ce ne sont pas des options.",
            )}
          />
          <div className="mt-14">
            <Steps steps={deliverySteps} />
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>{tr(lang, "Roadmap direction", "Orientations de la feuille de route")}</Eyebrow>
            <h2 className="mt-5 font-serif text-[2.2rem] leading-[1.15] tracking-[-0.02em] text-ink sm:text-5xl">{tr(lang, "The suite is growing", "La suite s’agrandit")}</h2>
            <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
              {tr(
                lang,
                "Kazi Pro, Talent Pro and Sales Tracker are the start. Walumo is building toward a complete operating suite for African business: more platforms, deeper integration and AI working quietly in the background to save your teams time.",
                "Kazi Pro, Talent Pro et Sales Tracker ne sont qu’un début. Walumo construit une suite opérationnelle complète pour les entreprises africaines : davantage de plateformes, une intégration plus poussée et une IA qui travaille discrètement en arrière-plan pour faire gagner du temps à vos équipes.",
              )}
            </p>
            <Button href="/contact?interest=early-access" className="mt-8" arrow>
              {tr(lang, "Get early-access updates", "Recevoir les actualités en avant-première")}
            </Button>
          </div>
          <ul className="space-y-3">
            {roadmap.map((r) => (
              <li key={r} className="flex items-start justify-between gap-4 rounded-2xl bg-white p-5 shadow-card">
                <span className="text-[15px] leading-6 text-ink">{r}</span>
                <span className="shrink-0 rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-muted">
                  {tr(lang, "Upcoming", "À venir")}
                </span>
              </li>
            ))}
            <li>
              <Link href="/solutions" className="inline-flex items-center gap-1.5 px-1 text-sm font-bold text-accent-strong hover:text-ink">
                {tr(lang, "See solutions by outcome", "Voir les solutions par objectif")} <ArrowRight size={14} />
              </Link>
            </li>
          </ul>
        </Container>
      </Section>

      <CtaBanner title={tr(lang, "See Kazi Pro, Talent Pro and Sales Tracker in action", "Voyez Kazi Pro, Talent Pro et Sales Tracker en action")} />
    </>
  );
}
