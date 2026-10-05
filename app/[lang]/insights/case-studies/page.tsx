import type { Metadata } from "next";
import { Testimonials, TrustedStrip } from "@/components/sections/social-proof";
import { CtaBanner, StatsBand } from "@/components/sections/blocks";
import { Avatar, CheckList, Container, Eyebrow, Section, SectionHeading } from "@/components/ui/primitives";
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
    title: tr(lang, "Case studies", "Études de cas"),
    description: tr(
      lang,
      "Customer stories from organisations running Walumo's Kazi Pro, Talent Pro and Sales Tracker.",
      "Témoignages d'organisations qui utilisent Kazi Pro, Talent Pro et Sales Tracker de Walumo.",
    ),
    alternates: alternates("/insights/case-studies", lang),
  };
}

export default async function CaseStudiesPage() {
  const lang = await getLang();
  const { caseStudies, proofStats } = contentFor(lang);
  return (
    <>
      <section className="fluted">
        <Container size="narrow" className="py-16 text-center sm:py-20">
          <Eyebrow>{tr(lang, "Case studies", "Études de cas")}</Eyebrow>
          <h1 className="mt-6 animate-fade-up font-serif text-5xl tracking-[-0.02em] text-ink sm:text-6xl">
            {tr(lang, "Results from teams ", "Les résultats des équipes ")}<em className="not-italic">{tr(lang, "running Walumo", "qui utilisent Walumo")}</em>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg">
            {tr(
              lang,
              "Kazi Pro was proven inside the ITM Holding group before external rollout. Here is what changed for the teams using it.",
              "Kazi Pro a fait ses preuves au sein du groupe ITM Holding avant son déploiement externe. Voici ce qui a changé pour les équipes qui l'utilisent.",
            )}
          </p>
        </Container>
      </section>

      {caseStudies.map((c) => (
        <Section key={c.slug} id={c.slug} className="scroll-mt-24">
          <Container>
            <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <Eyebrow>
                  {c.client} · {c.product}
                </Eyebrow>
                <h2 className="mt-5 font-serif text-[2.2rem] leading-[1.15] tracking-[-0.02em] text-ink sm:text-5xl">{c.title}</h2>
                <p className="mt-5 text-base leading-7 text-muted sm:text-lg">{c.summary}</p>

                <h3 className="mt-10 text-lg font-bold text-ink">{tr(lang, "The challenge", "Le défi")}</h3>
                <p className="mt-2 text-[15px] leading-7 text-muted">{c.challenge}</p>

                <h3 className="mt-8 text-lg font-bold text-ink">{tr(lang, "What Walumo did", "Ce qu'a fait Walumo")}</h3>
                <CheckList items={c.solution} className="mt-4" />

                <h3 className="mt-8 text-lg font-bold text-ink">{tr(lang, "The results", "Les résultats")}</h3>
                <CheckList items={c.results} className="mt-4" />
              </div>

              <div className="space-y-6 lg:sticky lg:top-28">
                <PhotoPlaceholder
                  src={c.image}
                  alt={tr(lang, `${c.client} team working with Walumo`, `L'équipe de ${c.client} travaillant avec Walumo`)}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="aspect-[4/3] rounded-[var(--radius-card)]"
                />
                <dl className="grid grid-cols-3 gap-4 rounded-[var(--radius-card)] bg-mint p-6">
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="sr-only">{m.label}</dt>
                      <dd className="font-serif text-4xl tracking-[-0.03em] text-ink">{m.value}</dd>
                      <dd className="mt-1 text-[13.5px] text-muted">{m.label}</dd>
                    </div>
                  ))}
                </dl>
                <figure className="rounded-[var(--radius-card)] bg-ink p-7 text-white">
                  <blockquote className="font-serif text-xl leading-snug">“{c.quote.quote}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <Avatar name={c.quote.name} size={42} />
                    <div>
                      <p className="text-[14px] font-bold">{c.quote.name}</p>
                      <p className="text-[13px] text-white/60">
                        {c.quote.role} · {c.quote.company}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow={tr(lang, "In their words", "Leurs mots")} title={tr(lang, "What teams say about Walumo", "Ce que les équipes disent de Walumo")} />
          <Testimonials className="mt-12" />
        </Container>
      </Section>

      <TrustedStrip />

      <Section tone="fade">
        <StatsBand title={tr(lang, "Where Walumo runs today", "Où Walumo est utilisé aujourd'hui")} stats={proofStats} />
      </Section>

      <CtaBanner
        title={tr(lang, "Want to see Walumo on a real operation?", "Envie de voir Walumo dans une vraie activité ?")}
        text={tr(
          lang,
          "Request a demo and ask for a reference call with a team already using our products.",
          "Demandez une démonstration et un échange avec une équipe qui utilise déjà nos produits.",
        )}
      />
    </>
  );
}
