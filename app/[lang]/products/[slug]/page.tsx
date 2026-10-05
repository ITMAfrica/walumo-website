import { hasLocale, locales, tr } from "@/lib/i18n";
import { contentFor, siteFor } from "@/lib/i18n-data";
import type { Metadata } from "next";
import Link from "@/components/ui/link";
import { notFound } from "next/navigation";
import { TrustBadge, TrustedStrip } from "@/components/sections/social-proof";
import { CtaBanner, Faq, FeatureGrid, PainGrid, ProductLinks, Steps } from "@/components/sections/blocks";
import { Button, Container, Eyebrow, Section, SectionHeading } from "@/components/ui/primitives";
import { FeatureIcon } from "@/components/ui/icons";
import { Reveal, ScrollRise, SplitWords, Spotlight } from "@/components/ui/reveal";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import { BrowserFrame, KaziMiniMock, SalesPipelineMock, TalentMiniMock } from "@/components/ui/product-mocks";
import { products as productsEn } from "@/lib/content";

export function generateStaticParams() {
  return locales.flatMap((lang) => productsEn.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/products/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const { site } = siteFor(lang);
  const p = contentFor(lang).products.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.tagline}`,
    description: p.body,
    alternates: {
      canonical: site.url + (lang === "fr" ? "/fr" : "") + `/products/${slug}`,
      languages: { en: site.url + `/products/${slug}`, fr: site.url + "/fr" + `/products/${slug}`, "x-default": site.url + `/products/${slug}` },
    },
  };
}

const faqsEn: Record<string, { q: string; a: string }[]> = {
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

const faqsFr: Record<string, { q: string; a: string }[]> = {
  "kazi-pro": [
    { q: "Kazi Pro peut-il gérer plusieurs entités et plusieurs pays ?", a: "Oui. Kazi Pro a fait ses preuves au sein des entités d’ITM Holding : les dossiers employés, les règles de congés et les circuits de validation peuvent être organisés par entité." },
    { q: "Pouvons-nous migrer nos tableurs existants ?", a: "Oui. La migration des données fait partie de chaque mise en œuvre : nous nettoyons et importons vos dossiers employés et soldes existants, puis nous les vérifions avec vous." },
    { q: "Les managers peuvent-ils valider des demandes depuis leur téléphone ?", a: "Oui. Les demandes et validations sont conçues pour être traitées rapidement, depuis n’importe quel appareil." },
  ],
  "talent-pro": [
    { q: "En quoi Talent Pro diffère-t-il d’un site d’offres d’emploi ?", a: "Talent Pro est un système de suivi des candidatures et un CRM de recrutement : il gère tout le parcours — postes, candidats, collaboration et intégration — et pas seulement l’annonce." },
    { q: "Les candidats peuvent-ils postuler via WhatsApp ou par cooptation ?", a: "Talent Pro est conçu pour les marchés de talents africains, y compris les réseaux informels et les candidatures par WhatsApp : chaque candidat arrive dans un seul et même parcours." },
    { q: "Améliore-t-il l’expérience candidat ?", a: "Oui. Un statut clair pour chaque candidat facilite les relances, les retours et évite de redemander les mêmes documents." },
  ],
  "sales-tracker": [
    { q: "Sales Tracker est-il un CRM lourd ?", a: "Non. Il est conçu pour être simple à adopter par les PME africaines et les équipes commerciales, centré sur le pipeline, les relances et le reporting." },
    { q: "Les équipes commerciales terrain peuvent-elles l’utiliser ?", a: "Oui. La vente terrain, la distribution, les pipelines B2B et le suivi en magasin sont des cas d’usage essentiels." },
    { q: "Comment la tarification est-elle structurée ?", a: "Le tarif dépend de la taille de votre équipe et de votre configuration. Demandez une démo et nous vous enverrons une proposition adaptée à votre organisation." },
  ],
};

export default async function ProductPage({ params }: PageProps<"/[lang]/products/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const { deliverySteps, products, solutions } = contentFor(lang);
  const { site } = siteFor(lang);
  const faqs = lang === "fr" ? faqsFr : faqsEn;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const solution = solutions.find((s) => s.products.length === 1 && s.products[0] === product.slug);
  const mock =
    product.slug === "kazi-pro" ? <KaziMiniMock /> : product.slug === "talent-pro" ? <TalentMiniMock /> : <SalesPipelineMock compact />;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-white">
        <Container className="relative pb-16 pt-14 text-center sm:pt-20">
          <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
            <Link href="/products" className="hover:text-ink">
              {tr(lang, "Products", "Produits")}
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
          <h1 className="mx-auto mt-4 max-w-4xl font-serif text-[2.5rem] leading-[1.1] tracking-[-0.02em] text-ink sm:text-6xl">
            <SplitWords text={product.headline} />{" "}
            <em className="not-italic">
              <SplitWords
                text={product.accent}
                delay={product.headline.split(" ").length * 70}
                wordClassName="text-shimmer pr-[0.06em]"
              />
            </em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">{product.body}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href={`/contact?interest=${product.slug}`} arrow>
              {product.cta}
            </Button>
            <Button href="/contact?interest=implementation" variant="outline">
              {tr(lang, "Talk to the implementation team", "Parler à l’équipe de mise en œuvre")}
            </Button>
          </div>
        </Container>
        <Container className="relative pb-20">
          <div className="relative mx-auto max-w-5xl">
            <div
              className="absolute inset-x-[6%] -top-8 bottom-[12%] rounded-[3rem] bg-gradient-to-b from-accent/55 via-accent-strong/25 to-transparent blur-3xl"
              aria-hidden="true"
            />
            <ScrollRise>
              {product.screenshot ? (
                <BrowserFrame src={product.screenshot} alt={tr(lang, `${product.name} dashboard`, `Tableau de bord ${product.name}`)} url={`app.walumo — ${product.name}`} priority />
              ) : (
                <SalesPipelineMock />
              )}
            </ScrollRise>
          </div>
        </Container>
      </section>

      <TrustedStrip />

      {/* Pains */}
      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow={tr(lang, "The problem", "Le problème")} title={tr(lang, `What ${product.name} fixes`, `Ce que ${product.name} résout`)} />
          <div className="mt-14">
            <PainGrid items={product.pains.map((p) => ({ ...p, icon: "target" as const }))} />
          </div>
        </Container>
      </Section>

      {/* Modules */}
      <Section>
        <Container>
          <SectionHeading eyebrow={tr(lang, "Key modules", "Modules clés")} title={tr(lang, `Everything in ${product.name}`, `Tout ce que contient ${product.name}`)} text={product.tagline + "."} />
          <div className="mt-14">
            <FeatureGrid items={product.modules} />
          </div>
          {product.useCases && (
            <div className="mt-12 text-center">
              <p className="text-sm font-bold text-ink">{tr(lang, "Built for", "Conçu pour")}</p>
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
            <Eyebrow>{tr(lang, "Who it’s for", "À qui il s’adresse")}</Eyebrow>
            <h2 className="mt-5 font-serif text-[2.2rem] leading-[1.15] tracking-[-0.02em] text-ink sm:text-5xl">
              {tr(lang, "Value for every role", "Une valeur pour chaque rôle")}
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
              <Eyebrow dark>{tr(lang, "The outcome", "Le résultat")}</Eyebrow>
              <p className="mt-5 font-serif text-[1.8rem] leading-snug">{product.outcome}</p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-line p-8 sm:p-10">
              <Eyebrow>{tr(lang, "Proof", "La preuve")}</Eyebrow>
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
            eyebrow={tr(lang, "Implementation", "Mise en œuvre")}
            title={tr(lang, `How we roll out ${product.name}`, `Comment nous déployons ${product.name}`)}
            text={tr(
              lang,
              "Data migration, training and support are included — you are never left alone with a licence.",
              "La migration des données, la formation et le support sont inclus : vous n’êtes jamais seul face à une simple licence.",
            )}
          />
          <div className="mt-14">
            <Steps steps={deliverySteps} />
          </div>
          {solution && (
            <div className="mt-12 flex flex-col items-center gap-3 text-center">
              <p className="text-[15px] text-muted">
                {lang === "fr" ? (
                  <>
                    Vous cherchez l’offre complète ? Découvrez la solution <strong className="text-ink">{solution.name}</strong> :{" "}
                    {solution.included.slice(0, 3).join(", ").toLowerCase()} et plus encore.
                  </>
                ) : (
                  <>
                    Looking for the full package? See the <strong className="text-ink">{solution.name}</strong> solution:{" "}
                    {solution.included.slice(0, 3).join(", ").toLowerCase()} and more.
                  </>
                )}
              </p>
              <Button href={`/solutions/${solution.slug}`} variant="outline" size="sm">
                {solution.cta}
              </Button>
            </div>
          )}
        </Container>
      </Section>

      <Faq items={faqs[product.slug]} />

      <ProductLinks title={tr(lang, "Works even better with", "Fonctionne encore mieux avec")} exclude={product.slug} />

      <CtaBanner
        title={tr(lang, product.cta.replace("Request a", "Book your"), `Réservez votre démo ${product.name}`)}
        text={tr(
          lang,
          "Tell us about your team and we will show you the right setup, implementation path and next step.",
          "Parlez-nous de votre équipe : nous vous présenterons la configuration, le parcours de mise en œuvre et la prochaine étape adaptés.",
        )}
        primary={{ label: product.cta, href: `/contact?interest=${product.slug}` }}
        secondary={site.whatsappCta}
      />
    </>
  );
}

