import type { Metadata } from "next";
import { Testimonials, TrustedStrip } from "@/components/sections/social-proof";
import { CtaBanner, StatsBand } from "@/components/sections/blocks";
import { Avatar, CheckList, Container, Eyebrow, Section, SectionHeading } from "@/components/ui/primitives";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import { caseStudies, proofStats } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case studies",
  description: "Customer stories from organisations running Walumo's Kazi Pro, Talent Pro and Sales Tracker.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-white to-surface">
        <Container size="narrow" className="py-16 text-center sm:py-20">
          <Eyebrow>Case studies</Eyebrow>
          <h1 className="mt-6 animate-fade-up font-serif text-5xl tracking-[-0.02em] text-ink sm:text-6xl">
            Results from teams <em className="italic text-accent-strong">running Walumo</em>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg">
            Kazi Pro was proven inside the ITM Holding group before external rollout. Here is what changed for the teams using it.
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

                <h3 className="mt-10 text-lg font-bold text-ink">The challenge</h3>
                <p className="mt-2 text-[15px] leading-7 text-muted">{c.challenge}</p>

                <h3 className="mt-8 text-lg font-bold text-ink">What Walumo did</h3>
                <CheckList items={c.solution} className="mt-4" />

                <h3 className="mt-8 text-lg font-bold text-ink">The results</h3>
                <CheckList items={c.results} className="mt-4" />
              </div>

              <div className="space-y-6 lg:sticky lg:top-28">
                <PhotoPlaceholder
                  src={c.image}
                  alt={`${c.client} team working with Walumo`}
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
          <SectionHeading eyebrow="In their words" title="What teams say about Walumo" />
          <Testimonials className="mt-12" />
        </Container>
      </Section>

      <TrustedStrip />

      <Section tone="fade">
        <StatsBand title="Where Walumo runs today" stats={proofStats} />
      </Section>

      <CtaBanner title="Want to see Walumo on a real operation?" text="Request a demo and ask for a reference call with a team already using our products." />
    </>
  );
}
