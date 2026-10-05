import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { ArticleCard, EventCard, ReportCard } from "@/components/sections/collections";
import { CaseStudyCard, Testimonials } from "@/components/sections/social-proof";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { articles, caseStudies, events, reports } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Ideas and evidence for African business leaders: practical guidance, reports, events and case studies on running and scaling a business in Africa.",
};

const categories = [
  { label: "Articles", href: "#articles", count: articles.length },
  { label: "Reports", href: "#reports", count: reports.length },
  { label: "Events", href: "#events", count: events.length },
  { label: "Case studies", href: "/insights/case-studies", count: 0 },
];

export default function InsightsPage() {
  const [featured, ...rest] = articles;
  return (
    <>
      <section className="bg-gradient-to-b from-white to-surface">
        <Container className="py-16 text-center sm:py-20">
          <Eyebrow>Insights</Eyebrow>
          <h1 className="mx-auto mt-6 max-w-3xl animate-fade-up font-serif text-5xl tracking-[-0.02em] text-ink sm:text-6xl">
            Ideas and evidence for <em className="italic text-accent-strong">African business leaders</em>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted sm:text-lg">
            Practical guidance, research and points of view on running and scaling a business in Africa — the home of Walumo&apos;s
            thinking.
          </p>
          <nav aria-label="Insight categories" className="mt-8 flex flex-wrap justify-center gap-2">
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
          <SectionHeading align="left" eyebrow="Articles" title="Thought leadership" text="Short, practical articles from Walumo's leaders and product team." />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <ArticleCard article={featured} large />
            </Reveal>
            <ul className="grid gap-10">
              {rest.slice(0, 2).map((a) => (
                <Reveal as="li" key={a.slug}>
                  <ArticleCard article={a} />
                </Reveal>
              ))}
            </ul>
          </div>
          {rest.length > 2 && (
            <ul className="mt-12 grid gap-10 md:grid-cols-3">
              {rest.slice(2).map((a) => (
                <Reveal as="li" key={a.slug}>
                  <ArticleCard article={a} />
                </Reveal>
              ))}
            </ul>
          )}
        </Container>
      </Section>

      <Section id="reports" tone="surface" className="scroll-mt-20">
        <Container>
          <SectionHeading
            align="left"
            eyebrow="Reports"
            title="Data-driven reports and guides"
            text="In-depth research and practical guides, free to download in exchange for your email."
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
          <SectionHeading align="left" eyebrow="Events" title="Hackathons and community events" text="How Walumo invests in Africa's emerging tech talent." />
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
          <SectionHeading eyebrow="Case studies" title="Results from teams running Walumo" />
          <CaseStudyCard study={caseStudies[0]} className="mt-12" />
          <Testimonials className="mt-6" />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col items-center rounded-[1.5rem] bg-mint px-6 py-14 text-center sm:px-12">
            <h2 className="max-w-2xl font-serif text-[2rem] leading-tight tracking-[-0.02em] text-ink sm:text-[2.6rem]">
              Get new insights in your inbox
            </h2>
            <p className="mt-4 max-w-lg text-base text-ink-soft">Guides, reports and event news for African business leaders.</p>
            <NewsletterForm className="mt-8" />
          </div>
        </Container>
      </Section>
    </>
  );
}
