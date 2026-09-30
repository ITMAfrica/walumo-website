import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrustedStrip } from "@/components/sections/social-proof";
import { ReportCard } from "@/components/sections/collections";
import { CheckList, Container, Eyebrow, Section } from "@/components/ui/primitives";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import { LeadForm } from "@/components/pages/forms/lead-form";
import { reports } from "@/lib/content";

export function generateStaticParams() {
  return reports.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/reports/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const r = reports.find((x) => x.slug === slug);
  if (!r) return {};
  return { title: r.title, description: r.summary };
}

export default async function ReportPage({ params }: PageProps<"/insights/reports/[slug]">) {
  const { slug } = await params;
  const report = reports.find((r) => r.slug === slug);
  if (!report) notFound();
  const others = reports.filter((r) => r.slug !== report.slug);

  return (
    <>
      <section className="bg-gradient-to-b from-white via-surface to-surface">
        <Container className="grid gap-12 py-14 lg:grid-cols-[1.2fr_1fr] lg:py-20">
          <div className="animate-fade-up">
            <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
              <Link href="/insights#reports" className="hover:text-ink">
                Reports
              </Link>
            </nav>
            <Eyebrow className="mt-8 bg-accent-soft text-accent-strong">{report.status}</Eyebrow>
            <h1 className="mt-5 font-serif text-[2.5rem] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[3.4rem]">{report.title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{report.summary}</p>
            <div className="mt-10 grid gap-8 sm:grid-cols-[200px_1fr]">
              <PhotoPlaceholder tone="ink" className="aspect-[4/5] rounded-[var(--radius-card)] shadow-float">
                <div className="flex h-full flex-col justify-between p-5">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/60">Walumo · Report</span>
                  <p className="font-serif text-xl leading-tight text-white">{report.title}</p>
                </div>
              </PhotoPlaceholder>
              <div>
                <h2 className="text-sm font-bold text-ink">What&apos;s inside</h2>
                <ol className="mt-3 space-y-2">
                  {report.chapters.map((c, i) => (
                    <li key={c} className="flex gap-3 text-[15px] text-ink-soft">
                      <span className="font-serif text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
                      {c}
                    </li>
                  ))}
                </ol>
                <h2 className="mt-8 text-sm font-bold text-ink">Who it&apos;s for</h2>
                <CheckList items={report.audience} className="mt-3" />
              </div>
            </div>
          </div>
          <div className="lg:pt-10">
            <div className="rounded-[1.5rem] bg-white p-6 shadow-float sm:p-8 lg:sticky lg:top-28">
              <h2 className="text-xl font-bold text-ink">Be the first to receive it</h2>
              <p className="mt-1 text-sm text-muted">We will email you the report as soon as it is published.</p>
              <div className="mt-6">
                <LeadForm
                  idPrefix="report"
                  submitLabel="Download the report"
                  successTitle="You're on the list"
                  successText="We will send the report to your inbox as soon as it is published."
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <TrustedStrip />

      {others.length > 0 && (
        <Section tone="surface">
          <Container>
            <h2 className="font-serif text-4xl tracking-[-0.02em] text-ink">More reports</h2>
            <ul className="mt-10 grid gap-6 lg:grid-cols-2">
              {others.map((r) => (
                <li key={r.slug}>
                  <ReportCard report={r} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}
    </>
  );
}
