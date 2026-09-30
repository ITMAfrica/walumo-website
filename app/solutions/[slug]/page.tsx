import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrustedStrip } from "@/components/sections/social-proof";
import { CtaBanner, StatsBand, Steps } from "@/components/sections/blocks";
import { Button, CheckList, Container, Eyebrow, Section, SectionHeading, cn } from "@/components/ui/primitives";
import { ArrowRight, FeatureIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import { KaziMiniMock, SalesPipelineMock, SuiteHub, TalentMiniMock } from "@/components/ui/product-mocks";
import { deliverySteps, products, proofStats, solutions } from "@/lib/content";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: `${s.name} solution`, description: `${s.headline} ${s.accent}. ${s.solution}` };
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
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
      <section className="bg-gradient-to-b from-white to-surface">
        <Container className="grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-20">
          <div className="animate-fade-up">
            <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
              <Link href="/solutions" className="hover:text-ink">
                Solutions
              </Link>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <span>{solution.name}</span>
            </nav>
            <Eyebrow className="mt-8">{solution.name} solution</Eyebrow>
            <h1 className="mt-5 font-serif text-[2.5rem] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[3.4rem]">
              {solution.headline} <em className="italic text-accent-strong">{solution.accent}</em>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">{solution.solution}</p>
            <p className="mt-4 text-[15px] text-ink">
              <strong>Best for:</strong> <span className="text-muted">{solution.bestFor}</span>
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
              <Eyebrow>The problem</Eyebrow>
              <p className="mt-5 font-serif text-[1.6rem] leading-snug text-ink">{solution.problem}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="h-full rounded-[var(--radius-card)] bg-ink p-8 text-white sm:p-10">
              <Eyebrow dark>What changes</Eyebrow>
              <CheckList items={solution.changes} dark className="mt-6" />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            align="left"
            eyebrow="What's included"
            title="Product and services, in one package"
            text="Walumo does not stop at the licence: implementation, migration, training and support are part of the solution."
          />
          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {solution.included.map((i) => (
                <li key={i} className="flex items-center gap-3 rounded-2xl border border-line p-4 text-[15px] text-ink">
                  <FeatureIcon name="shield" size={18} className="shrink-0 text-accent-strong" />
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm font-bold text-ink">Platform{bundle.length > 1 ? "s" : ""} in this solution</p>
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
          <SectionHeading eyebrow="Delivery" title="From first workshop to full adoption" />
          <div className="mt-14">
            <Steps steps={deliverySteps} />
          </div>
        </Container>
      </Section>

      <Section tone="fade">
        <StatsBand title="Backed by ITM Holding" stats={proofStats} />
      </Section>

      <Section>
        <Container>
          <h2 className="font-serif text-4xl tracking-[-0.02em] text-ink">Other solutions</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/solutions/${s.slug}`}
                  className={cn("group flex h-full flex-col rounded-[var(--radius-card)] border border-line p-6 transition-shadow hover:shadow-float")}
                >
                  <FeatureIcon name={s.icon} size={22} className="text-accent-strong" />
                  <h3 className="mt-4 text-lg font-bold text-ink">{s.name}</h3>
                  <p className="mt-2 flex-1 text-[14.5px] leading-6 text-muted">{s.bestFor}</p>
                  <span className="mt-4 text-sm font-bold text-accent-strong group-hover:text-ink">{s.cta} →</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBanner
        title={`${solution.cta} with Walumo`}
        primary={{ label: solution.cta, href: `/contact?interest=${solution.slug}` }}
      />
    </>
  );
}
