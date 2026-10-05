import type { Metadata } from "next";
import Link from "@/components/ui/link";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { ArticleCard, EventCard, ReportCard } from "@/components/sections/collections";
import { CaseStudyCard, Testimonials } from "@/components/sections/social-proof";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
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
    title: tr(lang, "Insights", "Analyses"),
    description: tr(
      lang,
      "Ideas and evidence for African business leaders: practical guidance, reports, events and case studies on running and scaling a business in Africa.",
      "Des idées et des données pour les dirigeants d'entreprise africains : conseils pratiques, rapports, événements et études de cas sur la gestion et la croissance d'une entreprise en Afrique.",
    ),
    alternates: alternates("/insights", lang),
  };
}

export default async function InsightsPage() {
  const lang = await getLang();
  const { articles, caseStudies, events, reports } = contentFor(lang);
  const categories = [
    { label: tr(lang, "Articles", "Articles"), href: "#articles", count: articles.length },
    { label: tr(lang, "Reports", "Rapports"), href: "#reports", count: reports.length },
    { label: tr(lang, "Events", "Événements"), href: "#events", count: events.length },
    { label: tr(lang, "Case studies", "Études de cas"), href: "/insights/case-studies", count: 0 },
  ];
  return (
    <>
      <section className="fluted">
        <Container className="py-16 text-center sm:py-20">
          <Eyebrow>{tr(lang, "Insights", "Analyses")}</Eyebrow>
          <h1 className="mx-auto mt-6 max-w-3xl animate-fade-up font-serif text-5xl tracking-[-0.02em] text-ink sm:text-6xl">
            {tr(lang, "Ideas and evidence for ", "Des idées et des données pour les ")}<em className="not-italic">{tr(lang, "African business leaders", "dirigeants d'entreprise africains")}</em>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted sm:text-lg">
            {tr(
              lang,
              "Practical guidance, research and points of view on running and scaling a business in Africa — the home of Walumo's thinking.",
              "Conseils pratiques, recherches et points de vue sur la gestion et la croissance d'une entreprise en Afrique — l'espace d'expression de Walumo.",
            )}
          </p>
          <nav aria-label={tr(lang, "Insight categories", "Catégories d'analyses")} className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-bold text-ink-soft transition-colors hover:border-ink"
              >
                {c.label}
                {c.count > 0 && <span className="rounded-full bg-surface-2 px-2 text-[12px] text-muted">{c.count}</span>}
              </Link>
            ))}
          </nav>
        </Container>
      </section>

      <Section id="articles" className="scroll-mt-20 pt-12 sm:pt-16">
        <Container>
          <SectionHeading
            align="left"
            eyebrow={tr(lang, "Articles", "Articles")}
            title={tr(lang, "Thought leadership", "Points de vue")}
            text={tr(lang, "Short, practical articles from Walumo's leaders and product team.", "Des articles courts et pratiques de la direction et de l'équipe produit de Walumo.")}
          />
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {articles.map((a, i) => (
              <Reveal as="li" key={a.slug} delay={(i % 2) * 80}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="reports" tone="surface" className="scroll-mt-20">
        <Container>
          <SectionHeading
            align="left"
            eyebrow={tr(lang, "Reports", "Rapports")}
            title={tr(lang, "Data-driven reports and guides", "Rapports et guides fondés sur les données")}
            text={tr(
              lang,
              "In-depth research and practical guides, free to download in exchange for your email.",
              "Des études approfondies et des guides pratiques, à télécharger gratuitement en échange de votre e-mail.",
            )}
          />
          <ul className="mt-10 grid gap-6 lg:grid-cols-2">
            {reports.map((r) => (
              <li key={r.slug}>
                <ReportCard report={r} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="events" className="scroll-mt-20">
        <Container>
          <SectionHeading
            align="left"
            eyebrow={tr(lang, "Events", "Événements")}
            title={tr(lang, "Hackathons and community events", "Hackathons et événements communautaires")}
            text={tr(lang, "How Walumo invests in Africa's emerging tech talent.", "Comment Walumo investit dans les talents tech émergents d'Afrique.")}
          />
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {events.map((e) => (
              <li key={e.slug}>
                <EventCard event={e} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="surface" id="case-studies" className="scroll-mt-20">
        <Container>
          <SectionHeading eyebrow={tr(lang, "Case studies", "Études de cas")} title={tr(lang, "Results from teams running Walumo", "Les résultats des équipes qui utilisent Walumo")} />
          <CaseStudyCard study={caseStudies[0]} className="mt-12" />
          <Testimonials className="mt-6" />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col items-center rounded-[1.5rem] bg-mint px-6 py-14 text-center sm:px-12">
            <h2 className="max-w-2xl font-serif text-[2rem] leading-tight tracking-[-0.02em] text-ink sm:text-[2.6rem]">
              {tr(lang, "Get new insights in your inbox", "Recevez nos nouvelles analyses par e-mail")}
            </h2>
            <p className="mt-4 max-w-lg text-base text-ink-soft">
              {tr(lang, "Guides, reports and event news for African business leaders.", "Guides, rapports et actualités des événements pour les dirigeants d'entreprise africains.")}
            </p>
            <NewsletterForm className="mt-8" />
          </div>
        </Container>
      </Section>
    </>
  );
}
