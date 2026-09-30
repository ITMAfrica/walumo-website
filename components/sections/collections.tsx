import Link from "next/link";
import { articles, events, reports, type Article, type EventItem, type Report } from "@/lib/content";
import { Container, Eyebrow, Section, SectionHeading, TextLink, cn } from "@/components/ui/primitives";
import { ArrowUpRight, Clock, FeatureIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { PhotoPlaceholder } from "@/components/ui/visuals";

/* ------------------------------------------------------------------ */
/* Insight cards                                                       */
/* ------------------------------------------------------------------ */

export function ArticleCard({ article, large }: { article: Article; large?: boolean }) {
  return (
    <Link href={`/insights/${article.slug}`} className="group flex h-full flex-col">
      <PhotoPlaceholder
        tone="sky"
        src={article.image}
        alt=""
        sizes={large ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 768px) 100vw, 33vw"}
        className={cn("rounded-[var(--radius-card)]", large ? "aspect-[16/9]" : "aspect-[16/10]")}
      >
        <div className="flex h-full items-end p-5">
          <Eyebrow className="bg-white/90 text-ink">{article.topic}</Eyebrow>
        </div>
      </PhotoPlaceholder>
      <h3
        className={cn(
          "mt-5 font-bold leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-accent-strong",
          large ? "text-2xl sm:text-[1.7rem]" : "text-lg",
        )}
      >
        {article.title}
      </h3>
      {large && <p className="mt-3 text-[15px] leading-6 text-muted">{article.excerpt}</p>}
      <p className="mt-3 flex items-center gap-3 text-[13px] text-muted">
        <span>{article.date}</span>
        <span className="inline-flex items-center gap-1">
          <Clock size={13} /> {article.readTime}
        </span>
      </p>
    </Link>
  );
}

export function ReportCard({ report }: { report: Report }) {
  return (
    <Link
      href={`/insights/reports/${report.slug}`}
      className="group grid h-full overflow-hidden rounded-[var(--radius-card)] bg-white shadow-card transition-shadow hover:shadow-float sm:grid-cols-[180px_1fr]"
    >
      <PhotoPlaceholder tone="ink" className="min-h-[200px]">
        <div className="flex h-full flex-col justify-between p-5">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/60">Walumo · Report</span>
          <p className="font-serif text-xl leading-tight text-white">{report.title}</p>
        </div>
      </PhotoPlaceholder>
      <div className="flex flex-col p-6">
        <Eyebrow className="w-fit bg-accent-soft text-accent-strong">{report.status}</Eyebrow>
        <h3 className="mt-4 text-lg font-bold leading-snug text-ink group-hover:text-accent-strong">{report.title}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-6 text-muted">{report.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent-strong">
          Get the report <ArrowUpRight size={14} />
        </span>
      </div>
    </Link>
  );
}

export function EventCard({ event }: { event: EventItem }) {
  return (
    <Link href={`/insights/events/${event.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-card transition-shadow hover:shadow-float">
      <PhotoPlaceholder src={event.cover} alt="" overlay sizes="(max-width: 768px) 100vw, 50vw" className="aspect-[16/9]">
        <div className="flex h-full items-end p-5">
          <Eyebrow className="bg-white/90 text-ink">{event.status}</Eyebrow>
        </div>
      </PhotoPlaceholder>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-ink group-hover:text-accent-strong">{event.title}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-6 text-muted">{event.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent-strong">
          See the highlights <ArrowUpRight size={14} />
        </span>
      </div>
    </Link>
  );
}

/** "Insights for leaders" strip used on the home and product pages. */
export function InsightsGrid({
  title = "Ideas and evidence for African business leaders",
  text = "Practical guidance, research and points of view on running and scaling a business in Africa.",
  limit = 3,
  tone = "white",
}: {
  title?: string;
  text?: string;
  limit?: number;
  tone?: "white" | "surface";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading title={title} text={text} align="left" />
          <TextLink href="/insights" className="shrink-0">
            All insights
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
export function MoreResources() {
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
              <FeatureIcon name="sparkles" size={14} /> Event
            </p>
            <h3 className="mt-1 text-lg font-bold text-ink group-hover:text-accent-strong">{e.title}</h3>
            <p className="mt-1 line-clamp-2 text-[14px] leading-6 text-muted">{e.summary}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
