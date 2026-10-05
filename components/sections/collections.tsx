import type { ReactNode } from "react";
import Link from "@/components/ui/link";
import type { Article, EventItem, Report } from "@/lib/content";
import { getContent, getLang } from "@/lib/i18n-server";
import { tr } from "@/lib/i18n";
import { Container, Eyebrow, Section, SectionHeading, TextLink, cn } from "@/components/ui/primitives";
import { ArrowUpRight, FeatureIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { ArticleIllustration, EventIllustration, ReportIllustration } from "@/components/ui/article-mocks";
import { PhotoPlaceholder } from "@/components/ui/visuals";

/* ------------------------------------------------------------------ */
/* Insight cards                                                       */
/* ------------------------------------------------------------------ */

/** Shared card shell: label, title, text, then a motion-design illustration bleeding off the bottom. */
function ResourceCard({
  href,
  label,
  title,
  text,
  cta,
  illustration,
}: {
  href: string;
  label: string;
  title: string;
  text: string;
  cta?: string;
  illustration: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-gradient-to-b from-white to-surface/60 shadow-card ring-1 ring-line/70 transition-shadow duration-300 hover:shadow-float"
    >
      <div className="flex flex-1 flex-col px-7 pt-8 sm:px-9">
        <p className="text-[15px] font-bold text-accent-strong">{label}</p>
        <h3 className="mt-3 text-[1.6rem] font-medium leading-[1.2] tracking-[-0.02em] text-ink transition-colors group-hover:text-accent-strong">{title}</h3>
        <p className="mt-4 line-clamp-3 text-base leading-7 text-muted">{text}</p>
        {cta ? (
          <span className="mb-8 mt-5 inline-flex items-center gap-1 text-sm font-bold text-accent-strong">
            {cta} <ArrowUpRight size={14} />
          </span>
        ) : (
          <div className="mb-8" />
        )}
      </div>
      {illustration}
    </Link>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <ResourceCard
      href={`/insights/${article.slug}`}
      label={article.topic}
      title={article.title}
      text={article.excerpt}
      illustration={<ArticleIllustration topic={article.topic} />}
    />
  );
}

export async function ReportCard({ report }: { report: Report }) {
  const lang = await getLang();
  return (
    <ResourceCard
      href={`/insights/reports/${report.slug}`}
      label={`${tr(lang, "Report", "Rapport")} · ${report.status}`}
      title={report.title}
      text={report.summary}
      cta={tr(lang, "Get the report", "Obtenir le rapport")}
      illustration={<ReportIllustration chapters={report.chapters} />}
    />
  );
}

export async function EventCard({ event }: { event: EventItem }) {
  const lang = await getLang();
  return (
    <ResourceCard
      href={`/insights/events/${event.slug}`}
      label={`${tr(lang, "Event", "Événement")} · ${event.status}`}
      title={event.title}
      text={event.summary}
      cta={tr(lang, "See the highlights", "Voir les temps forts")}
      illustration={<EventIllustration highlights={event.highlights ?? []} />}
    />
  );
}

/** "Insights for leaders" strip used on the home and product pages. */
export async function InsightsGrid({
  title: titleProp,
  text: textProp,
  limit = 3,
  tone = "white",
}: {
  title?: string;
  text?: string;
  limit?: number;
  tone?: "white" | "surface";
}) {
  const lang = await getLang();
  const { articles } = await getContent();
  const title = titleProp ?? tr(lang, "Ideas and evidence for African business leaders", "Idées et données pour les dirigeants d'entreprise africains");
  const text =
    textProp ??
    tr(
      lang,
      "Practical guidance, research and points of view on running and scaling a business in Africa.",
      "Conseils pratiques, études et points de vue sur la gestion et le développement d'une entreprise en Afrique.",
    );
  return (
    <Section tone={tone}>
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading title={title} text={text} align="left" />
          <TextLink href="/insights" className="shrink-0">
            {tr(lang, "All insights", "Tous les articles")}
          </TextLink>
        </div>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {articles.slice(0, limit).map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 80}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/** Compact list of the other resource types (reports + events). */
export async function MoreResources() {
  const lang = await getLang();
  const { events, reports } = await getContent();
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {reports.slice(0, 1).map((r) => (
        <ReportCard key={r.slug} report={r} />
      ))}
      {events.slice(0, 1).map((e) => (
        <Link
          key={e.slug}
          href={`/insights/events/${e.slug}`}
          className="group flex items-center gap-5 rounded-[var(--radius-card)] bg-white p-5 shadow-card transition-shadow hover:shadow-float"
        >
          <PhotoPlaceholder src={e.cover} alt="" sizes="160px" className="aspect-square w-28 shrink-0 rounded-xl sm:w-36" />
          <div>
            <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.08em] text-accent-strong">
              <FeatureIcon name="sparkles" size={14} /> {tr(lang, "Event", "Événement")}
            </p>
            <h3 className="mt-1 text-lg font-bold text-ink group-hover:text-accent-strong">{e.title}</h3>
            <p className="mt-1 line-clamp-2 text-[14px] leading-6 text-muted">{e.summary}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
