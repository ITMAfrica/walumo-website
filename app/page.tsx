import { Hero } from "@/components/sections/hero";
import { ProofSplit, TrustBadge, TrustedStrip } from "@/components/sections/social-proof";
import { CtaBanner, Steps } from "@/components/sections/blocks";
import { InsightsGrid } from "@/components/sections/collections";
import { HacklabSection } from "@/components/sections/community";
import { Container, CtaPair, Section, SectionHeading, TextLink } from "@/components/ui/primitives";
import { FeatureIcon } from "@/components/ui/icons";
import { Reveal, ScrollStatement } from "@/components/ui/reveal";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import { KaziMiniMock, SalesPipelineMock, TalentMiniMock } from "@/components/ui/product-mocks";
import { HeroFollowUps, HeroLeaveCard } from "@/components/sections/interactive-hero";
import { ProductTabs } from "@/components/sections/product-tabs";
import { deliverySteps, painPoints, products } from "@/lib/content";
import { site } from "@/lib/site";

export default function HomePage() {
  const [kazi, talent, sales] = products;
  return (
    <>
      <Hero
        title="Run HR, hiring and sales"
        accent="on one connected platform"
        text="Built in Nairobi for African organisations, Walumo connects HR, hiring and commercial operations so your teams move from spreadsheets and WhatsApp threads to one reliable way of working."
        checks={["Kazi Pro · HR & workforce", "Talent Pro · Talent acquisition", "Sales Tracker · Commercial operations"]}
        primary={site.primaryCta}
        secondary={site.secondaryCta}
        eyebrowNode={<TrustBadge />}
      >
        <Container className="pb-20">
          <div className="relative mx-auto max-w-5xl">
            <PhotoPlaceholder
              src="/images/team-workshop.jpg"
              alt="A Walumo implementation workshop with a client team"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
              className="aspect-[4/3] rounded-[1.5rem] shadow-float sm:aspect-[16/9]"
            />
            <HeroLeaveCard className="relative z-10 mx-auto -mt-16 lg:hidden" />
            <div className="absolute -bottom-12 -left-4 hidden w-[300px] animate-float hover:[animation-play-state:paused] lg:block lg:-left-12">
              <HeroLeaveCard />
            </div>
            <div className="absolute -right-4 top-10 hidden w-[290px] animate-float hover:[animation-play-state:paused] [animation-delay:-3s] lg:-right-12 lg:block">
              <HeroFollowUps />
            </div>
            <div className="absolute -bottom-12 right-10 hidden w-[290px] animate-float hover:[animation-play-state:paused] [animation-delay:-1.5s] xl:block">
              <TalentMiniMock />
            </div>
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
              <Reveal as="li" key={p.title} delay={i * 80}>
                <div className="h-full rounded-[var(--radius-card)] bg-white p-7 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-float">
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
          <div className="mt-14">
            <ProductTabs
              tabs={[
                {
                  id: kazi.slug,
                  name: kazi.name,
                  category: kazi.category,
                  title: `${kazi.headline} ${kazi.accent}`,
                  text: kazi.body,
                  items: kazi.modules.slice(0, 4).map((m) => m.title),
                  href: "/products/kazi-pro",
                  linkLabel: "Discover Kazi Pro",
                  visual: (
                    <PhotoPlaceholder tone="sky" className="absolute inset-0">
                      <div className="flex h-full items-center justify-center p-8">
                        <KaziMiniMock />
                      </div>
                    </PhotoPlaceholder>
                  ),
                },
                {
                  id: talent.slug,
                  name: talent.name,
                  category: talent.category,
                  title: `${talent.headline} ${talent.accent}`,
                  text: talent.body,
                  items: talent.modules.slice(0, 4).map((m) => m.title),
                  href: "/products/talent-pro",
                  linkLabel: "Discover Talent Pro",
                  visual: (
                    <PhotoPlaceholder tone="mint" className="absolute inset-0">
                      <div className="flex h-full items-center justify-center p-8">
                        <TalentMiniMock />
                      </div>
                    </PhotoPlaceholder>
                  ),
                },
                {
                  id: sales.slug,
                  name: sales.name,
                  category: sales.category,
                  title: `${sales.headline} ${sales.accent}`,
                  text: sales.body,
                  items: sales.modules.slice(0, 4).map((m) => m.title),
                  href: "/products/sales-tracker",
                  linkLabel: "Discover Sales Tracker",
                  visual: (
                    <PhotoPlaceholder tone="sand" className="absolute inset-0">
                      <div className="flex h-full items-center justify-center p-6">
                        <SalesPipelineMock compact />
                      </div>
                    </PhotoPlaceholder>
                  ),
                },
              ]}
            />
          </div>
          <CtaPair className="mt-12" primary={site.primaryCta} secondary={{ label: "Explore the full ecosystem", href: "/products" }} />
        </Container>
      </Section>

      {/* Proof */}
      <Section tone="fade">
        <ProofSplit />
      </Section>

      {/* How Walumo delivers — software + services in one section */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="How Walumo delivers"
            title="Software, and the people to make it work"
            text="Every product comes with consulting, implementation, data migration, training and support. One partner, from first login to full transformation."
          />
          <div className="mt-14">
            <Steps steps={deliverySteps} />
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <TextLink href="/what-we-do#services">See our services</TextLink>
            <TextLink href="/what-we-do#why-walumo">Why Walumo</TextLink>
          </div>
        </Container>
      </Section>

      <HacklabSection />

      <InsightsGrid />

      <CtaBanner title="Ready to run your business on software built for Africa?" />
    </>
  );
}
