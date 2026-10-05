import { hasLocale, locales, tr } from "@/lib/i18n";
import { contentFor, siteFor } from "@/lib/i18n-data";
import { Icon3D } from "@/components/ui/icon-3d";
import type { Metadata } from "next";
import Link from "@/components/ui/link";
import { notFound } from "next/navigation";
import { TrustedStrip } from "@/components/sections/social-proof";
import { CtaBanner, StatsBand, Steps } from "@/components/sections/blocks";
import { Button, CheckList, Container, Eyebrow, Section, SectionHeading, cn } from "@/components/ui/primitives";
import { ArrowRight, FeatureIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import { KaziMiniMock, SalesPipelineMock, SuiteHub, TalentMiniMock } from "@/components/ui/product-mocks";
import { solutions as solutionsEn } from "@/lib/content";

export function generateStaticParams() {
  return locales.flatMap((lang) => solutionsEn.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/solutions/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const { site } = siteFor(lang);
  const s = contentFor(lang).solutions.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: tr(lang, `${s.name} solution`, `Solution ${s.name}`),
    description: `${s.headline} ${s.accent}. ${s.solution}`,
    alternates: {
      canonical: site.url + (lang === "fr" ? "/fr" : "") + `/solutions/${slug}`,
      languages: { en: site.url + `/solutions/${slug}`, fr: site.url + "/fr" + `/solutions/${slug}`, "x-default": site.url + `/solutions/${slug}` },
    },
  };
}

export default async function SolutionPage({ params }: PageProps<"/[lang]/solutions/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const { deliverySteps, products, proofStats, solutions } = contentFor(lang);
  const { site } = siteFor(lang);
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) notFound();

  const bundle = products.filter((p) => solution.products.includes(p.slug));
  const visual =
    solution.slug === "hr" ? (
      <KaziMiniMock />
    ) : solution.slug === "talent-acquisition" ? (
      <TalentMiniMock />
    ) : solution.slug === "commercial-operations" ? (
      <SalesPipelineMock compact />
    ) : null;
  const others = solutions.filter((s) => s.slug !== solution.slug);

  return (
    <>
      <section className="fluted">
        <Container className="grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-20">
          <div className="animate-fade-up">
            <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
              <Link href="/solutions" className="hover:text-ink">
                {tr(lang, "Solutions", "Solutions")}
              </Link>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <span>{solution.name}</span>
            </nav>
            <Eyebrow className="mt-8">{tr(lang, `${solution.name} solution`, `Solution ${solution.name}`)}</Eyebrow>
            <h1 className="mt-5 font-serif text-[2.5rem] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[3.4rem]">
              {solution.headline} <em className="not-italic">{solution.accent}</em>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">{solution.solution}</p>
            <p className="mt-4 text-[15px] text-ink">
              <strong>{tr(lang, "Best for:", "Idéal pour :")}</strong> <span className="text-muted">{solution.bestFor}</span>
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={`/contact?interest=${solution.slug}`} arrow>
                {solution.cta}
              </Button>
              <Button href={site.whatsappCta.href} variant="outline">
                {site.whatsappCta.label}
              </Button>
            </div>
          </div>
          <div className="animate-fade-up [animation-delay:150ms]">
            {visual ? (
              <PhotoPlaceholder tone={bundle[0]?.tone ?? "sky"} className="min-h-[420px] rounded-[1.5rem]">
                <div className="flex h-full items-center justify-center p-8">{visual}</div>
              </PhotoPlaceholder>
            ) : (
              <SuiteHub />
            )}
          </div>
        </Container>
      </section>

      <TrustedStrip />

      <Section tone="surface">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[var(--radius-card)] bg-white p-8 shadow-card sm:p-10">
              <Eyebrow>{tr(lang, "The problem", "Le problème")}</Eyebrow>
              <p className="mt-5 font-serif text-[1.6rem] leading-snug text-ink">{solution.problem}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="h-full rounded-[var(--radius-card)] bg-ink p-8 text-white sm:p-10">
              <Eyebrow dark>{tr(lang, "What changes", "Ce qui change")}</Eyebrow>
              <CheckList items={solution.changes} dark className="mt-6" />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            align="left"
            eyebrow={tr(lang, "What’s included", "Ce qui est inclus")}
            title={tr(lang, "Product and services, in one package", "Produit et services, dans une seule offre")}
            text={tr(
              lang,
              "Walumo does not stop at the licence: implementation, migration, training and support are part of the solution.",
              "Walumo ne s’arrête pas à la licence : la mise en œuvre, la migration, la formation et le support font partie de la solution.",
            )}
          />
          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {solution.included.map((i) => (
                <li key={i} className="flex items-center gap-3 rounded-2xl border border-line p-4 text-[15px] text-ink">
                  <Icon3D name="shield" className="w-8" />
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm font-bold text-ink">
              {lang === "fr"
                ? `Plateforme${bundle.length > 1 ? "s" : ""} de cette solution`
                : `Platform${bundle.length > 1 ? "s" : ""} in this solution`}
            </p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {bundle.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-sm font-bold text-accent-strong hover:bg-accent-strong hover:text-white"
                  >
                    {p.name} <ArrowRight size={14} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow={tr(lang, "Delivery", "Déploiement")} title={tr(lang, "From first workshop to full adoption", "Du premier atelier à l’adoption complète")} />
          <div className="mt-14">
            <Steps steps={deliverySteps} />
          </div>
        </Container>
      </Section>

      <Section tone="fade">
        <StatsBand title={tr(lang, "Backed by ITM Holding", "Soutenu par ITM Holding")} stats={proofStats} />
      </Section>

      <Section>
        <Container>
          <h2 className="font-serif text-4xl tracking-[-0.02em] text-ink">{tr(lang, "Other solutions", "Autres solutions")}</h2>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`/solutions/${s.slug}`} className="group grid items-center gap-3 py-6 transition-colors hover:bg-surface/60 sm:grid-cols-[2.5rem_1fr_1.4fr_auto] sm:gap-8 sm:px-3">
                  <Icon3D name={s.icon} className="w-10" />
                  <h3 className="text-lg font-bold text-ink">{s.name}</h3>
                  <p className="text-[15px] leading-6 text-muted">{s.bestFor}</p>
                  <span className="text-sm font-bold text-accent-strong transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink">{s.cta} →</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBanner
        title={tr(lang, `${solution.cta} with Walumo`, `${solution.cta} avec Walumo`)}
        primary={{ label: solution.cta, href: `/contact?interest=${solution.slug}` }}
      />
    </>
  );
}
