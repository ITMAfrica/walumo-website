import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { TrustedStrip } from "@/components/sections/social-proof";
import { CtaBanner, Steps } from "@/components/sections/blocks";
import { Button, CheckList, Container, Section, SectionHeading } from "@/components/ui/primitives";
import { FeatureIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { deliverySteps, products, solutions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Walumo solutions by outcome: HR, talent acquisition, commercial operations and digital transformation. Each pairs the right platform with the services to make it work.",
};

const productName = (slug: string) => products.find((p) => p.slug === slug)?.name ?? slug;

export default function SolutionsPage() {
  return (
    <>
      <Hero
        eyebrow="Solutions"
        title="Start from the outcome,"
        accent="not the product"
        text="Each Walumo solution pairs the right platform with the implementation, migration, training and support to make it work in your organisation."
        secondary={{ label: "Explore products", href: "/products" }}
      />

      <TrustedStrip />

      <Section tone="surface">
        <Container>
          <SectionHeading title="Four solutions, one partner" text="Choose where you want to start. Every solution can grow into the full suite." />
          <ul className="mt-14 grid gap-6 lg:grid-cols-2">
            {solutions.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 2) * 80}>
                <article id={s.slug} className="flex h-full scroll-mt-28 flex-col rounded-[var(--radius-card)] bg-white p-8 shadow-card sm:p-10">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-ink text-accent">
                      <FeatureIcon name={s.icon} size={20} />
                    </span>
                    <h2 className="text-2xl font-bold text-ink">{s.name}</h2>
                  </div>
                  <dl className="mt-6 flex-1 space-y-4 text-[15px] leading-6">
                    <div>
                      <dt className="font-bold text-ink">Problem</dt>
                      <dd className="text-muted">{s.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-ink">Walumo solution</dt>
                      <dd className="text-muted">{s.solution}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-ink">What changes</dt>
                      <dd>
                        <CheckList items={s.changes} className="mt-2 space-y-2" />
                      </dd>
                    </div>
                    <div>
                      <dt className="font-bold text-ink">Best for</dt>
                      <dd className="text-muted">{s.bestFor}</dd>
                    </div>
                  </dl>
                  <p className="mt-6 text-[13px] text-muted">Platform: {s.products.map(productName).join(" · ")}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href={`/solutions/${s.slug}`} arrow>
                      {s.cta}
                    </Button>
                    <Button href={`/contact?interest=${s.slug}`} variant="outline">
                      Request a demo
                    </Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Delivery model"
            title="How every solution is delivered"
            text="Assess, configure, migrate, train, launch, support — the same proven path for every engagement."
          />
          <div className="mt-14">
            <Steps steps={deliverySteps} />
          </div>
        </Container>
      </Section>

      <CtaBanner title="Not sure where to start?" text="Tell us what you want to solve and we will connect you with the right Walumo product or implementation expert." />
    </>
  );
}
