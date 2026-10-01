import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrustBadge, TrustedStrip } from "@/components/sections/social-proof";
import { CtaBanner, Faq, FeatureGrid, ProductLinks, Steps } from "@/components/sections/blocks";
import { Button, Container, Eyebrow, Section, SectionHeading } from "@/components/ui/primitives";
import { FeatureIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import { BrowserFrame, KaziMiniMock, SalesPipelineMock, TalentMiniMock } from "@/components/ui/product-mocks";
import { deliverySteps, products, solutions } from "@/lib/content";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.name} — ${p.tagline}`, description: p.body };
}

const faqs: Record<string, { q: string; a: string }[]> = {
  "kazi-pro": [
    { q: "Can Kazi Pro handle several entities and countries?", a: "Yes. Kazi Pro was proven inside ITM Holding entities, so employee records, leave rules and approval chains can be organised per entity." },
    { q: "Can we migrate our existing spreadsheets?", a: "Yes. Data migration is part of every implementation: we clean and import your existing employee records and balances, and check them with you." },
    { q: "Can managers approve requests from their phone?", a: "Yes. Requests and approvals are designed to be handled quickly, from any device." },
  ],
  "talent-pro": [
    { q: "How is Talent Pro different from a job board?", a: "Talent Pro is an applicant tracking system and recruitment CRM: it manages the whole pipeline — roles, candidates, collaboration and onboarding — not just the job advert." },
    { q: "Can candidates apply through WhatsApp or referrals?", a: "Talent Pro is built for African talent markets, including informal networks and WhatsApp-friendly applications, so every candidate lands in one pipeline." },
    { q: "Does it help the candidate experience?", a: "Yes. A clear status for every candidate makes it easier to follow up, give feedback and avoid asking for the same documents twice." },
  ],
  "sales-tracker": [
    { q: "Is Sales Tracker a heavy CRM?", a: "No. It is designed to be simple to adopt for African SMEs and sales-led teams, focused on pipeline, follow-ups and reporting." },
    { q: "Can field sales teams use it?", a: "Yes. Field sales, distribution, B2B pipelines and store follow-up are core use cases." },
    { q: "How is pricing structured?", a: "Pricing depends on your team size and setup. Request a demo and we will share a proposal adapted to your organisation." },
  ],
};

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const solution = solutions.find((s) => s.products.length === 1 && s.products[0] === product.slug);
  const mock =
    product.slug === "kazi-pro" ? <KaziMiniMock /> : product.slug === "talent-pro" ? <TalentMiniMock /> : <SalesPipelineMock compact />;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-white via-white to-surface">
        <Container className="pb-16 pt-14 text-center sm:pt-20">
          <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
            <Link href="/products" className="hover:text-ink">
              Products
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span>{product.name}</span>
          </nav>
          <div className="mt-6 flex justify-center">
            <TrustBadge />
          </div>
          <p className="mt-8 text-[13px] font-bold uppercase tracking-[0.12em] text-accent-strong">
            {product.name} · {product.category}
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl animate-fade-up font-serif text-[2.5rem] leading-[1.1] tracking-[-0.02em] text-ink sm:text-6xl">
            {product.headline} <em className="italic text-accent-strong">{product.accent}</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">{product.body}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href={`/contact?interest=${product.slug}`} arrow>
              {product.cta}
            </Button>
            <Button href="/contact?interest=implementation" variant="outline">
              Talk to the implementation team
            </Button>
          </div>
        </Container>
        <Container className="pb-16">
          <div className="mx-auto max-w-5xl animate-fade-up [animation-delay:200ms]">
            {product.screenshot ? (
              <BrowserFrame src={product.screenshot} alt={`${product.name} dashboard`} url={`app.walumo — ${product.name}`} priority />
            ) : (
              <SalesPipelineMock />
            )}
          </div>
        </Container>
      </section>

      <TrustedStrip />

      {/* Pains */}
      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow="The problem" title={`What ${product.name} fixes`} />
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {product.pains.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 70} className="h-full">
                <div className="h-full rounded-[var(--radius-card)] bg-white p-7 shadow-card transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-[#fdecec] text-[#b3412e]">
                    <FeatureIcon name="target" size={20} />
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Modules */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Key modules" title={`Everything in ${product.name}`} text={product.tagline + "."} />
          <div className="mt-14">
            <FeatureGrid items={product.modules} />
          </div>
          {product.useCases && (
            <div className="mt-12 text-center">
              <p className="text-sm font-bold text-ink">Built for</p>
              <ul className="mt-3 flex flex-wrap justify-center gap-2">
                {product.useCases.map((u) => (
                  <li key={u} className="rounded-full border border-line px-3.5 py-1.5 text-[13.5px] text-ink-soft">
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>

      {/* Roles + outcome */}
      <Section tone="surface">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow>Who it&apos;s for</Eyebrow>
            <h2 className="mt-5 font-serif text-[2.2rem] leading-[1.15] tracking-[-0.02em] text-ink sm:text-5xl">
              Value for every role
            </h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {product.roles.map((r) => (
                <li key={r.role} className="grid gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
                  <span className="font-bold text-ink">{r.role}</span>
                  <span className="text-[15px] leading-6 text-muted">{r.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <PhotoPlaceholder tone={product.tone} className="min-h-[420px] rounded-[var(--radius-card)]">
            <div className="flex h-full items-center justify-center p-8">{mock}</div>
          </PhotoPlaceholder>
        </Container>
      </Section>

      {/* Outcome & proof */}
      <Section>
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-[var(--radius-card)] bg-ink p-8 text-white sm:p-10">
              <Eyebrow dark>The outcome</Eyebrow>
              <p className="mt-5 font-serif text-[1.8rem] leading-snug">{product.outcome}</p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-line p-8 sm:p-10">
              <Eyebrow>Proof</Eyebrow>
              <p className="mt-5 text-lg leading-8 text-ink">{product.proof}</p>
              <Button href={`/contact?interest=${product.slug}`} className="mt-8" arrow>
                {product.cta}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Implementation */}
      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="Implementation"
            title={`How we roll out ${product.name}`}
            text="Data migration, training and support are included — you are never left alone with a licence."
          />
          <div className="mt-14">
            <Steps steps={deliverySteps} />
          </div>
          {solution && (
            <div className="mt-12 flex flex-col items-center gap-3 text-center">
              <p className="text-[15px] text-muted">
                Looking for the full package? See the <strong className="text-ink">{solution.name}</strong> solution:{" "}
                {solution.included.slice(0, 3).join(", ").toLowerCase()} and more.
              </p>
              <Button href={`/solutions/${solution.slug}`} variant="outline" size="sm">
                {solution.cta}
              </Button>
            </div>
          )}
        </Container>
      </Section>

      <Faq items={faqs[product.slug]} />

      <ProductLinks title="Works even better with" exclude={product.slug} />

      <CtaBanner
        title={`${product.cta.replace("Request a", "Book your")}`}
        text="Tell us about your team and we will show you the right setup, implementation path and next step."
        primary={{ label: product.cta, href: `/contact?interest=${product.slug}` }}
        secondary={site.whatsappCta}
      />
    </>
  );
}

