import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { LogoMarquee } from "@/components/sections/social-proof";
import { CtaBanner, FeatureGrid, ProductLinks, StatsBand } from "@/components/sections/blocks";
import { Button, Container, Eyebrow, Section, SectionHeading, TextLink, cn } from "@/components/ui/primitives";
import { FeatureIcon } from "@/components/ui/icons";
import { Reveal, ScrollStatement } from "@/components/ui/reveal";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import { advantages, howWeWork, mission, pillars, proofStats, services, vision } from "@/lib/content";

export const metadata: Metadata = {
  title: "What we do",
  description:
    "Walumo builds, implements and supports the software African teams use to run better businesses — the technology arm of ITM Holding.",
};

export default function WhatWeDoPage() {
  return (
    <>
      <Hero
        eyebrow="What we do"
        title="We build, implement and support the software"
        accent="African teams use to run better businesses"
        text="Where African ingenuity meets global excellence: Walumo operates at the intersection of innovation, talent and impact, driving Africa's digital transformation through practical, scalable solutions."
        secondary={{ label: "Explore products", href: "/products" }}
      >
        <Container className="pb-16">
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-[1.4fr_1fr]">
            <PhotoPlaceholder
              src="/images/hackathon/img_2026.jpg"
              alt="Participants of the Walumo Hacklab gathered in the Walumo office"
              priority
              sizes="(max-width: 640px) 100vw, 60vw"
              className="aspect-[4/3] rounded-[1.25rem] sm:aspect-auto sm:h-full"
            />
            <div className="grid gap-4">
              <PhotoPlaceholder src="/images/hackathon/img_1866.jpg" alt="A Walumo Hacklab team on stage" sizes="(max-width: 640px) 100vw, 40vw" className="aspect-[4/3] rounded-[1.25rem]" />
              <PhotoPlaceholder src="/images/office-nairobi.jpg" alt="Walumo team meeting" sizes="(max-width: 640px) 100vw, 40vw" className="aspect-[4/3] rounded-[1.25rem]" />
            </div>
          </div>
        </Container>
      </Hero>

      {/* Vision & mission */}
      <Section tone="fade">
        <Container size="narrow" className="text-center">
          <ScrollStatement text={vision} />
        </Container>
        <Container>
          <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2">
            {[
              { label: "Our vision", text: vision, icon: "compass" as const },
              { label: "Our mission", text: mission, icon: "rocket" as const },
            ].map((v) => (
              <div key={v.label} className="rounded-[var(--radius-card)] bg-white p-8 shadow-card">
                <span className="flex size-11 items-center justify-center rounded-xl bg-mint text-accent-strong">
                  <FeatureIcon name={v.icon} size={20} />
                </span>
                <h2 className="mt-6 text-xl font-bold text-ink">{v.label}</h2>
                <p className="mt-2 text-[15px] leading-7 text-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Four strategic pillars */}
      <Section id="pillars" className="scroll-mt-20">
        <Container>
          <SectionHeading
            eyebrow="Four strategic pillars"
            title="From ideation to execution, from talent to transformation"
            text="Each pillar is designed to create tangible impact for our clients and for Africa's tech ecosystem."
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 2) * 80}>
                <div className="h-full rounded-[var(--radius-card)] bg-white p-8 shadow-card">
                  <div className="flex items-center gap-4">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-ink text-accent">
                      <FeatureIcon name={p.icon} size={22} />
                    </span>
                    <span className="font-serif text-3xl text-surface-2">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-muted">{p.text}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li key={t} className="rounded-full border border-line px-3 py-1 text-[13px] text-ink-soft">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Services */}
      <Section id="services" tone="surface" className="scroll-mt-20">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="World-class software, and the people to run it"
            text="Walumo gives African businesses an integrated suite of products and the consulting, implementation and support to make them work."
          />
          <div className="mt-14">
            <FeatureGrid columns={4} items={services} />
          </div>
          <div className="mt-10 text-center">
            <Button href="/contact?interest=services" arrow>
              Talk to our services team
            </Button>
          </div>
        </Container>
      </Section>

      {/* How we work */}
      <Section id="method" className="scroll-mt-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>How we work</Eyebrow>
            <h2 className="mt-5 font-serif text-[2.2rem] leading-[1.15] tracking-[-0.02em] text-ink sm:text-5xl">
              Every step is intentional
            </h2>
            <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
              From brief to deployment, a rigorous method: transparent process, continuous delivery and support after launch.
            </p>
            <PhotoPlaceholder
              src="/images/hackathon/img_1888.jpg"
              alt="A product demo at Walumo"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="mt-8 aspect-[4/3] rounded-[var(--radius-card)]"
            />
          </div>
          <ol className="relative space-y-5">
            {howWeWork.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 70}>
                <div className="flex gap-5 rounded-[var(--radius-card)] border border-line bg-white p-6 sm:p-7">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ink font-serif text-lg text-accent">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-ink">{s.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-6 text-muted">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Why Walumo */}
      <Section id="why-walumo" tone="surface" className="scroll-mt-20">
        <Container>
          <SectionHeading eyebrow="Competitive advantage" title="What sets Walumo apart" />
          <div className="mt-14">
            <FeatureGrid items={advantages} />
          </div>
        </Container>
      </Section>

      {/* ITM backing */}
      <Section id="itm" tone="dark" className="scroll-mt-20">
        <Container>
          <SectionHeading
            dark
            eyebrow="ITM backing"
            title="The technology arm of ITM Holding"
            text="Walumo is the technology and product division of ITM Holding — built, owned and run from within Africa, with reach across 20+ countries."
          />
          <dl className="mt-14 grid gap-10 text-center sm:grid-cols-3">
            {proofStats.map((s) => (
              <div key={s.label}>
                <dd className="font-serif text-6xl text-white">{s.value}</dd>
                <dt className="mx-auto mt-2 max-w-[16rem] text-[15px] text-white/65">{s.label}</dt>
              </div>
            ))}
          </dl>
          <LogoMarquee className="mt-16" />
          <p className="mt-10 text-center">
            <TextLink href="/insights/events/walumo-hacklab" className="text-accent hover:text-white">
              See how we invest in Africa&apos;s tech talent
            </TextLink>
          </p>
        </Container>
      </Section>

      <ProductLinks />

      <CtaBanner />
    </>
  );
}

export const dynamic = "force-static";
