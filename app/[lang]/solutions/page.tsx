import { Icon3D } from "@/components/ui/icon-3d";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { TrustedStrip } from "@/components/sections/social-proof";
import { CtaBanner, Steps } from "@/components/sections/blocks";
import { Button, CheckList, Container, Section, SectionHeading } from "@/components/ui/primitives";
import { FeatureIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { notFound } from "next/navigation";
import { hasLocale, tr } from "@/lib/i18n";
import { contentFor, siteFor } from "@/lib/i18n-data";

export async function generateMetadata({ params }: PageProps<"/[lang]/solutions">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { site } = siteFor(lang);
  return {
    title: tr(lang, "Solutions", "Solutions"),
    description: tr(
      lang,
      "Walumo solutions by outcome: HR, talent acquisition, commercial operations and digital transformation. Each pairs the right platform with the services to make it work.",
      "Les solutions Walumo par objectif : RH, recrutement, opérations commerciales et transformation digitale. Chacune associe la bonne plateforme aux services nécessaires pour qu’elle fonctionne.",
    ),
    alternates: {
      canonical: site.url + (lang === "fr" ? "/fr" : "") + "/solutions",
      languages: { en: site.url + "/solutions", fr: site.url + "/fr" + "/solutions", "x-default": site.url + "/solutions" },
    },
  };
}

export default async function SolutionsPage({ params }: PageProps<"/[lang]/solutions">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { deliverySteps, products, solutions } = contentFor(lang);
  const productName = (slug: string) => products.find((p) => p.slug === slug)?.name ?? slug;
  return (
    <>
      <Hero
        eyebrow={tr(lang, "Solutions", "Solutions")}
        title={tr(lang, "Start from the outcome,", "Partez de l’objectif,")}
        accent={tr(lang, "not the product", "pas du produit")}
        text={tr(
          lang,
          "Each Walumo solution pairs the right platform with the implementation, migration, training and support to make it work in your organisation.",
          "Chaque solution Walumo associe la bonne plateforme à la mise en œuvre, à la migration, à la formation et au support nécessaires pour qu’elle fonctionne dans votre organisation.",
        )}
        secondary={{ label: tr(lang, "Explore products", "Explorer les produits"), href: "/products" }}
      />

      <TrustedStrip />

      <Section tone="surface">
        <Container>
          <SectionHeading
            title={tr(lang, "Four solutions, one partner", "Quatre solutions, un seul partenaire")}
            text={tr(
              lang,
              "Choose where you want to start. Every solution can grow into the full suite.",
              "Choisissez par où commencer. Chaque solution peut évoluer vers la suite complète.",
            )}
          />
          <ul className="mt-14 grid gap-6 lg:grid-cols-2">
            {solutions.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 2) * 80}>
                <article id={s.slug} className="flex h-full scroll-mt-28 flex-col rounded-[var(--radius-card)] bg-white p-8 shadow-card sm:p-10">
                  <div className="flex items-center gap-3">
                    <Icon3D name={s.icon} className="w-11" />
                    <h2 className="text-2xl font-bold text-ink">{s.name}</h2>
                  </div>
                  <dl className="mt-6 flex-1 space-y-4 text-[15px] leading-6">
                    <div>
                      <dt className="font-bold text-ink">{tr(lang, "Problem", "Problème")}</dt>
                      <dd className="text-muted">{s.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-ink">{tr(lang, "Walumo solution", "La solution Walumo")}</dt>
                      <dd className="text-muted">{s.solution}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-ink">{tr(lang, "What changes", "Ce qui change")}</dt>
                      <dd>
                        <CheckList items={s.changes} className="mt-2 space-y-2" />
                      </dd>
                    </div>
                    <div>
                      <dt className="font-bold text-ink">{tr(lang, "Best for", "Idéal pour")}</dt>
                      <dd className="text-muted">{s.bestFor}</dd>
                    </div>
                  </dl>
                  <p className="mt-6 text-[13px] text-muted">{tr(lang, "Platform", "Plateforme")}{tr(lang, ": ", " : ")}{s.products.map(productName).join(" · ")}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href={`/solutions/${s.slug}`} arrow>
                      {s.cta}
                    </Button>
                    <Button href={`/contact?interest=${s.slug}`} variant="outline">
                      {tr(lang, "Request a demo", "Demander une démo")}
                    </Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow={tr(lang, "Delivery model", "Modèle de déploiement")}
            title={tr(lang, "How every solution is delivered", "Comment chaque solution est déployée")}
            text={tr(
              lang,
              "Assess, configure, migrate, train, launch, support — the same proven path for every engagement.",
              "Évaluer, configurer, migrer, former, lancer, accompagner : le même parcours éprouvé pour chaque mission.",
            )}
          />
          <div className="mt-14">
            <Steps steps={deliverySteps} />
          </div>
        </Container>
      </Section>

      <CtaBanner
        title={tr(lang, "Not sure where to start?", "Vous ne savez pas par où commencer ?")}
        text={tr(
          lang,
          "Tell us what you want to solve and we will connect you with the right Walumo product or implementation expert.",
          "Dites-nous ce que vous voulez résoudre et nous vous mettrons en relation avec le bon produit Walumo ou le bon expert de mise en œuvre.",
        )}
      />
    </>
  );
}
