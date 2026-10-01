import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { StoriesComingSoon, TrustBadge, TrustedStrip } from "@/components/sections/social-proof";
import { CtaBanner, FeatureGrid, PillarCard, StatsBand } from "@/components/sections/blocks";
import { PeopleBento, Timeline } from "@/components/sections/gallery";
import { InsightsGrid } from "@/components/sections/collections";
import { Button, Container, CtaPair, Section, SectionHeading } from "@/components/ui/primitives";
import { Check, FeatureIcon } from "@/components/ui/icons";
import { Parallax, Reveal, ScrollRise, ScrollStatement, Spotlight, Tilt } from "@/components/ui/reveal";
import { Aurora, PhotoPlaceholder } from "@/components/ui/visuals";
import {
  BrowserFrame,
  KaziMiniMock,
  SalesPipelineMock,
  ScreenshotPeek,
  TalentMiniMock,
} from "@/components/ui/product-mocks";
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
        <Container className="pb-20 lg:pb-28">
          <div className="relative mx-auto max-w-5xl">
            {/* soft brand glow behind the product */}
            <div
              className="absolute inset-x-[6%] -top-8 bottom-[12%] rounded-[3rem] bg-gradient-to-b from-accent/55 via-accent-strong/25 to-transparent blur-3xl"
              aria-hidden="true"
            />
            <ScrollRise>
              <BrowserFrame
                src="/images/product-kazipro.jpg"
                alt="Kazi Pro leave management dashboard"
                url="app.walumo — Kazi Pro"
                priority
              />
            </ScrollRise>

            {/* floating UI cards */}
            <div className="absolute -left-10 top-20 hidden animate-float-slow lg:block xl:-left-16">
              <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/90 py-3 pl-3 pr-5 shadow-lift backdrop-blur">
                <span className="relative flex size-9 items-center justify-center rounded-xl bg-[#e3f6ea] text-[#1f8a4c]">
                  <Check size={18} />
                  <span className="absolute -right-0.5 -top-0.5 flex size-2.5">
                    <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-[#28c840]" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-[#28c840]" />
                  </span>
                </span>
                <span>
                  <span className="block text-[13px] font-bold text-ink">Leave approved</span>
                  <span className="block text-[11.5px] text-muted">Kazi Pro · just now</span>
                </span>
              </div>
            </div>
            <div className="absolute -bottom-12 -left-6 hidden animate-float lg:block xl:-left-14">
              <TalentMiniMock />
            </div>
            <div className="absolute -right-6 top-10 hidden w-[290px] animate-float-slow [animation-delay:-4s] lg:block xl:-right-14">
              <div className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lift backdrop-blur">
                <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-muted">Follow-ups today</p>
                <ul className="mt-3 space-y-2">
                  {["Call Savanna Foods", "Send proposal to Mara Distributors", "Visit Kilimani Hardware"].map((t, i) => (
                    <li key={t} className="flex items-center gap-2 text-[13px] text-ink">
                      <span
                        className={i === 0 ? "size-2 rounded-full bg-[#28c840]" : "size-2 rounded-full bg-accent-strong"}
                        aria-hidden="true"
                      />
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[11.5px] text-muted">Sales Tracker · illustrative data</p>
              </div>
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
              <Reveal as="li" key={p.title} delay={i * 90} className="h-full">
                <Spotlight className="group h-full rounded-[var(--radius-card)] bg-white p-7 shadow-card ring-1 ring-ink/[0.04] transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-lift">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-[#fdecec] text-[#b3412e] transition-[scale,rotate] duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <FeatureIcon name={p.icon} size={21} />
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-muted">{p.text}</p>
                </Spotlight>
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
                  <div className="absolute bottom-6 right-6 hidden animate-float sm:block">
                    <KaziMiniMock className="w-[280px]" />
                  </div>
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
                  <div className="absolute bottom-6 right-6 hidden animate-float [animation-delay:-2s] sm:block">
                    <TalentMiniMock className="w-[270px]" />
                  </div>
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
                    <Tilt max={8} scale={1.02}>
                      <SalesPipelineMock compact />
                    </Tilt>
                  </div>
                </PhotoPlaceholder>
              }
            />
          </div>
          <CtaPair className="mt-12" primary={site.primaryCta} secondary={{ label: "Explore the full ecosystem", href: "/products" }} />
        </Container>
      </Section>

      {/* Real people and places */}
      <PeopleBento />

      {/* Proof */}
      <Section tone="fade" className="pt-0 sm:pt-0 lg:pt-0">
        <StatsBand
          title="Backed by ITM Holding, built and run from within Africa"
          stats={proofStats}
          image="/images/hackathon/img_2026.jpg"
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
              title="Software, and the people"
              accent="to make it work"
              text="Every product comes with implementation, data migration, training and support. One partner, from first login to full transformation."
            />
            <Reveal variant="scale" className="mt-10 hidden lg:block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] shadow-lift">
                <Parallax speed={0.08} className="absolute -inset-y-10 inset-x-0">
                  <PhotoPlaceholder
                    src="/images/office-1.jpg"
                    alt="A modern open-plan office with dashboards on screen"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="absolute inset-0"
                  />
                </Parallax>
              </div>
            </Reveal>
          </div>
          <Timeline steps={deliverySteps} />
        </Container>
      </Section>

      {/* Why Walumo */}
      <Section tone="dark" className="relative isolate overflow-hidden">
        <Aurora dark />
        <Container className="relative">
          <SectionHeading dark eyebrow="Why Walumo" title="What sets" accent="Walumo apart" />
          <div className="mt-14">
            <FeatureGrid items={advantages} dark />
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Services"
              title="World-class software, and"
              accent="the people to run it"
              text="Consulting, implementation, training and support around the products — so the software is adopted, not just installed."
            />
            <ul className="mt-8 space-y-3">
              {services.map((s, i) => (
                <Reveal as="li" key={s.title} variant="left" delay={i * 90}>
                  <div className="group flex gap-4 rounded-2xl p-3 transition-colors duration-300 hover:bg-surface">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-mint text-accent-strong transition-[background-color,color,rotate] duration-300 group-hover:-rotate-6 group-hover:bg-accent-strong group-hover:text-white">
                      <FeatureIcon name={s.icon} size={19} />
                    </span>
                    <div>
                      <h3 className="font-bold text-ink">{s.title}</h3>
                      <p className="mt-1 text-[15px] leading-6 text-muted">{s.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Button href="/what-we-do#services" variant="outline" className="mt-8">
              See our services
            </Button>
          </div>
          <Reveal variant="right" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-lift sm:aspect-[5/5] lg:aspect-[4/5]">
              <Parallax speed={0.1} className="absolute -inset-y-12 inset-x-0">
                <PhotoPlaceholder
                  src="/images/hackathon/img_2433.jpg"
                  alt="A Walumo Hacklab participant presenting a solution"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="absolute inset-0"
                />
              </Parallax>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 animate-float-slow sm:left-auto sm:right-8 sm:w-72">
              <div className="rounded-2xl border border-white/70 bg-white/90 p-5 shadow-lift backdrop-blur">
                <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-accent-strong">One partner</p>
                <p className="mt-1.5 font-serif text-xl leading-snug text-ink">Consulting, training and support around every product</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Customer stories — only approved quotes will be published */}
      <Section tone="surface" className="py-16 sm:py-20">
        <Container size="narrow">
          <StoriesComingSoon />
          <p className="mt-6 text-center text-[15px] text-muted">
            Want to build with us?{" "}
            <Link href="/contact" className="font-bold text-accent-strong underline underline-offset-4">
              Partner with Walumo
            </Link>
          </p>
        </Container>
      </Section>

      <InsightsGrid />

      <CtaBanner title="Ready to run your business on software built for Africa?" />
    </>
  );
}
