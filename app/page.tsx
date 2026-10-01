import { Hero } from "@/components/sections/hero";
import { TrustBadge, TrustedStrip } from "@/components/sections/social-proof";
import { CtaBanner, FeatureGrid, PillarCard, StatsBand } from "@/components/sections/blocks";
import { PeopleBento, Timeline } from "@/components/sections/gallery";
import { InsightsGrid } from "@/components/sections/collections";
import { Button, Container, CtaPair, Section, SectionHeading } from "@/components/ui/primitives";
import { FeatureIcon } from "@/components/ui/icons";
import { Parallax, Reveal, ScrollStatement } from "@/components/ui/reveal";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import { BrowserFrame, FollowUpsMock, SalesPipelineMock, ScreenshotPeek, TalentMiniMock } from "@/components/ui/product-mocks";
import { advantages, deliverySteps, painPoints, products, proofStats, services } from "@/lib/content";
import { site } from "@/lib/site";

export default function HomePage() {
  const [kazi, talent, sales] = products;
  return (
    <>
      <Hero
        title="Business software"
        accent="built for African scale"
        text="Walumo builds and implements connected platforms for HR, hiring and commercial operations, helping African organisations move from scattered tools to one reliable way of working."
        checks={["Kazi Pro · HR & workforce", "Talent Pro · Talent acquisition", "Sales Tracker · Commercial operations"]}
        primary={site.secondaryCta}
        secondary={site.primaryCta}
        eyebrowNode={<TrustBadge />}
      >
        <Container className="pb-16">
          <div className="relative mx-auto max-w-5xl animate-fade-up [animation-delay:320ms]">
            <BrowserFrame
              src="/images/product-kazipro.jpg"
              alt="Kazi Pro leave management dashboard"
              url="app.walumo — Kazi Pro"
              priority
            />
            <TalentMiniMock delay={500} className="absolute -bottom-10 -left-4 hidden lg:block lg:-left-12" />
            <FollowUpsMock delay={800} className="absolute -right-4 top-10 hidden w-[300px] lg:-right-12 lg:block" />
          </div>
        </Container>
      </Hero>

      <TrustedStrip />

      {/* Pain */}
      <Section tone="fade">
        <Container size="narrow" className="text-center">
          <ScrollStatement text="African teams are still running critical operations through spreadsheets, WhatsApp and disconnected tools. Walumo gives them one reliable way of working." />
        </Container>
        <Container>
          <ul className="mt-16 grid gap-5 md:grid-cols-3">
            {painPoints.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 80} className="h-full">
                <div className="h-full rounded-[var(--radius-card)] bg-white p-7 shadow-card transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-[#fdecec] text-[#b3412e]">
                    <FeatureIcon name={p.icon} size={20} />
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Product ecosystem */}
      <Section tone="surface" id="products">
        <Container>
          <SectionHeading
            eyebrow="Product ecosystem"
            title="One suite for people,"
            accent="hiring and sales"
            text="Kazi Pro, Talent Pro and Sales Tracker share one login, one design and one source of truth — so your people, your hiring and your sales all work together."
          />
          <div className="mt-14 space-y-6">
            <PillarCard
              eyebrow={kazi.category}
              title={`${kazi.headline} ${kazi.accent}`}
              text={kazi.body}
              items={kazi.modules.slice(0, 4).map((m) => m.title)}
              href="/products/kazi-pro"
              linkLabel="Discover Kazi Pro"
              visual={
                <PhotoPlaceholder tone="sky" className="absolute inset-0">
                  <ScreenshotPeek src="/images/product-kazipro.jpg" alt="Kazi Pro dashboard" width={2000} height={977} />
                </PhotoPlaceholder>
              }
            />
            <PillarCard
              reverse
              eyebrow={talent.category}
              title={`${talent.headline} ${talent.accent}`}
              text={talent.body}
              items={talent.modules.slice(0, 4).map((m) => m.title)}
              href="/products/talent-pro"
              linkLabel="Discover Talent Pro"
              visual={
                <PhotoPlaceholder tone="mint" className="absolute inset-0">
                  <ScreenshotPeek src="/images/product-talentpro.jpg" alt="Talent Pro command centre" width={2000} height={1087} />
                </PhotoPlaceholder>
              }
            />
            <PillarCard
              eyebrow={sales.category}
              title={`${sales.headline} ${sales.accent}`}
              text={sales.body}
              items={sales.modules.slice(0, 4).map((m) => m.title)}
              href="/products/sales-tracker"
              linkLabel="Discover Sales Tracker"
              visual={
                <PhotoPlaceholder tone="sand" className="absolute inset-0">
                  <div className="flex h-full items-center justify-center p-6">
                    <SalesPipelineMock compact />
                  </div>
                </PhotoPlaceholder>
              }
            />
          </div>
          <CtaPair className="mt-12" primary={site.primaryCta} secondary={{ label: "Explore the full ecosystem", href: "/products" }} />
        </Container>
      </Section>

      {/* Hacklab photos */}
      <PeopleBento />

      {/* Proof */}
      <Section tone="fade" className="pt-0 sm:pt-0 lg:pt-0">
        <StatsBand
          title="Backed by ITM Holding, built and run from within Africa"
          stats={proofStats}
          image="/images/hackathon/img_1888.jpg"
        >
          <p className="text-center text-[15px] text-white/70">
            Walumo is the technology and product division of ITM Holding · Headquartered in Nairobi.
          </p>
          <CtaPair dark className="mt-6" primary={site.primaryCta} secondary={{ label: "Why Walumo", href: "/what-we-do#why-walumo" }} />
        </StatsBand>
      </Section>

      {/* How Walumo delivers */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="How Walumo delivers"
              title="Software, and the people to make it work"
              text="Every product comes with implementation, data migration, training and support. One partner, from first login to full transformation."
            />
            <Button href="/contact?interest=implementation" variant="outline" className="mt-8">
              Talk to the implementation team
            </Button>
          </div>
          <Timeline steps={deliverySteps} />
        </Container>
      </Section>

      {/* Why Walumo */}
      <Section tone="dark">
        <Container>
          <SectionHeading dark eyebrow="Why Walumo" title="What sets Walumo apart" />
          <div className="mt-14">
            <FeatureGrid items={advantages} dark />
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Services"
              title="World-class software, and the people to run it"
              text="Consulting, implementation, training and support around the products — so the software is adopted, not just installed."
            />
            <ul className="mt-8 space-y-5">
              {services.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 80} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mint text-accent-strong">
                    <FeatureIcon name={s.icon} size={19} />
                  </span>
                  <div>
                    <h3 className="font-bold text-ink">{s.title}</h3>
                    <p className="mt-1 text-[15px] leading-6 text-muted">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Button href="/what-we-do#services" variant="outline" className="mt-8">
              See our services
            </Button>
          </div>
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] sm:aspect-square lg:aspect-[4/5]">
              <Parallax speed={0.08} className="absolute -inset-y-10 inset-x-0">
                <PhotoPlaceholder
                  src="/images/hackathon/img_2433.jpg"
                  alt="A Walumo Hacklab participant presenting a solution"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="absolute inset-0"
                />
              </Parallax>
            </div>
          </Reveal>
        </Container>
      </Section>

      <InsightsGrid tone="surface" />

      <CtaBanner title="Ready to run your business on software built for Africa?" />
    </>
  );
}
