import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { TrustedStrip } from "@/components/sections/social-proof";
import { CtaBanner, StatsBand, Steps } from "@/components/sections/blocks";
import { Button, CheckList, Container, Eyebrow, Section, SectionHeading, cn } from "@/components/ui/primitives";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import { KaziMiniMock, SalesPipelineMock, SuiteHub, TalentMiniMock } from "@/components/ui/product-mocks";
import { deliverySteps, products, proofStats, roadmap } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Product ecosystem",
  description:
    "One suite for people, hiring and sales. Kazi Pro, Talent Pro and Sales Tracker connect HR, recruitment and commercial operations in one African-built business software ecosystem.",
};

const visuals = {
  "kazi-pro": <KaziMiniMock />,
  "talent-pro": <TalentMiniMock />,
  "sales-tracker": <SalesPipelineMock compact />,
};

export default function ProductsPage() {
  return (
    <>
      <Hero
        eyebrow="Product ecosystem"
        title="One suite for people,"
        accent="hiring and sales"
        text="Walumo connects HR, recruitment and commercial operations in one African-built business software ecosystem — three products that share one login, one design and one source of truth."
        secondary={{ label: "Talk to our team", href: site.whatsappCta.href }}
      >
        <Container className="pb-16">
          <SuiteHub />
        </Container>
      </Hero>

      <TrustedStrip />

      <Section tone="surface">
        <Container>
          <SectionHeading
            title="Three products, one way of working"
            text="Each product solves a painful business problem on its own, and works better with the others."
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
                        <dt className="font-bold text-ink">The problem</dt>
                        <dd className="text-muted">{p.pains[0].text}</dd>
                      </div>
                      <div>
                        <dt className="font-bold text-ink">The result</dt>
                        <dd className="text-muted">{p.outcome}</dd>
                      </div>
                    </dl>
                    <CheckList className="mt-6" items={p.modules.slice(0, 4).map((m) => m.title)} />
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button href={`/products/${p.slug}`} arrow>
                        Discover {p.name}
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
            eyebrow="How the suite connects"
            title="Built to work together from day one"
            text="The same employee, candidate or customer record flows between products, so information is entered once and trusted everywhere."
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Shared login", d: "One account and single sign-on across Kazi Pro, Talent Pro and Sales Tracker." },
              { t: "Shared profiles", d: "A candidate hired in Talent Pro becomes an employee in Kazi Pro, without re-typing." },
              { t: "Common admin & permissions", d: "Manage users, roles and entities in one place." },
              { t: "Shared reports", d: "See people, hiring and revenue side by side." },
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
        <StatsBand title="Proof, not promises" stats={proofStats} />
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Implementation"
            title="Every product comes with a delivery team"
            text="Migration, training and support are part of every rollout — not optional extras."
          />
          <div className="mt-14">
            <Steps steps={deliverySteps} />
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>Roadmap direction</Eyebrow>
            <h2 className="mt-5 font-serif text-[2.2rem] leading-[1.15] tracking-[-0.02em] text-ink sm:text-5xl">The suite is growing</h2>
            <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
              Kazi Pro, Talent Pro and Sales Tracker are the start. Walumo is building toward a complete operating suite for African
              business: more platforms, deeper integration and AI working quietly in the background to save your teams time.
            </p>
            <Button href="/contact?interest=early-access" className="mt-8" arrow>
              Get early-access updates
            </Button>
          </div>
          <ul className="space-y-3">
            {roadmap.map((r) => (
              <li key={r} className="flex items-start justify-between gap-4 rounded-2xl bg-white p-5 shadow-card">
                <span className="text-[15px] leading-6 text-ink">{r}</span>
                <span className="shrink-0 rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-muted">
                  Upcoming
                </span>
              </li>
            ))}
            <li>
              <Link href="/solutions" className="inline-flex items-center gap-1.5 px-1 text-sm font-bold text-accent-strong hover:text-ink">
                See solutions by outcome <ArrowRight size={14} />
              </Link>
            </li>
          </ul>
        </Container>
      </Section>

      <CtaBanner title="See Kazi Pro, Talent Pro and Sales Tracker in action" />
    </>
  );
}
