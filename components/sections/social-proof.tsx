import Image from "next/image";
import Link from "@/components/ui/link";
import type { CaseStudy } from "@/lib/content";
import { getContent, getLang, getSite } from "@/lib/i18n-server";
import { tr } from "@/lib/i18n";
import { Avatar, Button, Container, Eyebrow, cn } from "@/components/ui/primitives";
import { LogoMark } from "@/components/ui/logo";
import { CountUp, Reveal } from "@/components/ui/reveal";
import { PhotoPlaceholder } from "@/components/ui/visuals";

/** Small pill: "Built by Walumo. Backed by ITM Holding." */
export async function TrustBadge({ className, dark }: { className?: string; dark?: boolean }) {
  const { site } = await getSite();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-bold",
        dark ? "border-white/15 bg-white/5 text-white/85" : "border-line bg-white text-ink-soft shadow-card",
        className,
      )}
    >
      <LogoMark size={16} />
      {site.trustBadge}
    </span>
  );
}

/**
 * Infinite strip of ITM Holding group logos. The source logos are white,
 * so the strip always sits on a dark background.
 */
export async function LogoMarquee({ className }: { className?: string }) {
  const { itmEntities } = await getContent();
  const logos = [...itmEntities, ...itmEntities];
  return (
    <div className={cn("relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]", className)}>
      <ul className="flex w-max animate-marquee items-center gap-14 hover:[animation-play-state:paused]">
        {logos.map((e, i) => (
          <li key={i} className="flex shrink-0 flex-col items-center gap-2" aria-hidden={i >= itmEntities.length}>
            <Image
              src={e.logo}
              alt={i < itmEntities.length ? e.name : ""}
              width={150}
              height={46}
              className="h-10 w-auto max-w-[150px] object-contain opacity-80 transition-opacity hover:opacity-100"
            />
            {/* The group logos look alike at small sizes: name each entity. */}
            <span className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-white/55">{e.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Dark band: "Trusted by organisations building Africa's digital future". */
export async function TrustedStrip({ title: titleProp, text: textProp }: { title?: string; text?: string }) {
  const lang = await getLang();
  const title = titleProp ?? tr(lang, "Running every day across the ITM Holding group", "Utilisé chaque jour dans tout le groupe ITM Holding");
  const text =
    textProp ??
    tr(
      lang,
      "23+ companies in 20+ African countries use Kazi Pro, proven in-house before external rollout.",
      "Plus de 23 entreprises dans plus de 20 pays africains utilisent Kazi Pro, éprouvé en interne avant son déploiement externe.",
    );
  return (
    <section className="bg-ink py-12 text-white" aria-label={tr(lang, "ITM Holding group companies", "Sociétés du groupe ITM Holding")}>
      <Container>
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <p className="text-[15px] font-bold text-white/90">{title}</p>
          {text && <p className="text-[16px] text-white/70 sm:text-[17px]">{text}</p>}
        </div>
        <LogoMarquee />
      </Container>
    </section>
  );
}

/**
 * Proof block: real Hacklab photo + usage figures + reference-call CTA,
 * followed by approved testimonials when there are any.
 */
export async function ProofSplit() {
  const lang = await getLang();
  const { site } = await getSite();
  const { caseStudies, homeProofStats } = await getContent();
  return (
    <Container>
      <Reveal>
        <div className="grid overflow-hidden rounded-[1.5rem] bg-ink text-white lg:grid-cols-[1fr_1.1fr]">
          <PhotoPlaceholder
            src="/images/hackathon/img_1866.jpg"
            alt={tr(lang, "Members of the Walumo community at the Walumo Hacklab", "Des membres de la communauté Walumo au Walumo Hacklab")}
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="min-h-[320px] lg:min-h-[520px]"
            overlay
          >
            <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1.5 text-[12.5px] font-bold text-ink">
              Walumo Hacklab
            </span>
          </PhotoPlaceholder>
          <div className="relative flex flex-col justify-center p-8 sm:p-12 lg:p-14">
            <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-accent/10 blur-3xl" />
            <Eyebrow dark className="relative self-start">{tr(lang, "Proven inside ITM Holding", "Éprouvé au sein d'ITM Holding")}</Eyebrow>
            <h2 className="relative mt-5 font-serif text-3xl leading-tight sm:text-4xl">
              {tr(lang, "Kazi Pro already runs HR across the ", "Kazi Pro gère déjà les RH de l'ensemble du ")}
              <em className="not-italic">{tr(lang, "ITM Holding group", "groupe ITM Holding")}</em>
            </h2>
            <p className="relative mt-4 text-[15px] leading-6 text-white/70">
              {tr(
                lang,
                "Walumo is the technology and product division of ITM Holding, headquartered in Nairobi. Our platforms were deployed and refined inside the group before being offered to other African organisations.",
                "Walumo est la division technologie et produits d'ITM Holding, dont le siège est à Nairobi. Nos plateformes ont été déployées et affinées au sein du groupe avant d'être proposées à d'autres organisations africaines.",
              )}
            </p>
            <dl className="relative mt-10 grid gap-8 sm:grid-cols-2">
              {homeProofStats.map((s) => (
                <div key={s.label} className="border-l border-white/15 pl-5">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-serif text-6xl tracking-[-0.03em]">
                    <CountUp value={s.value} />
                  </dd>
                  <dd className="mt-2 text-[15px] text-white/70">{s.label}</dd>
                </div>
              ))}
            </dl>
            <div className="relative mt-10 flex flex-wrap gap-3">
              <Button href={site.primaryCta.href} variant="light" arrow>
                {site.primaryCta.label}
              </Button>
              <Button href="/contact" variant="ghost">
                {tr(lang, "Ask for a reference call", "Demander un appel de référence")}
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
      <Testimonials className="mt-6" />
      <CaseStudyCard study={caseStudies[0]} className="mt-6" />
    </Container>
  );
}

/** Approved customer quotes. Renders nothing until `testimonials` in lib/content.ts has entries. */
export async function Testimonials({ className }: { className?: string }) {
  const { testimonials } = await getContent();
  if (testimonials.length === 0) return null;
  return (
    <ul className={cn("grid gap-5 md:grid-cols-2 lg:grid-cols-3", className)}>
      {testimonials.map((t, i) => (
        <Reveal as="li" key={t.name} delay={i * 80}>
          <figure className="flex h-full flex-col rounded-[var(--radius-card)] bg-white p-7 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-float">
            <blockquote className="flex-1 text-[16px] leading-7 text-ink">“{t.quote}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
              {t.photo ? (
                <Image src={t.photo} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />
              ) : (
                <Avatar name={t.name} size={44} tone={i} />
              )}
              <div>
                <p className="text-[14px] font-bold text-ink">{t.name}</p>
                <p className="text-[13px] text-muted">
                  {t.role} · {t.company}
                </p>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </ul>
  );
}

/** Case study teaser: client, headline, three result metrics, link to the full story. */
export async function CaseStudyCard({ study, className }: { study: CaseStudy; className?: string }) {
  const lang = await getLang();
  return (
    <Reveal className={className}>
      <article className="grid overflow-hidden rounded-[var(--radius-card)] bg-white shadow-card transition-shadow duration-300 hover:shadow-float lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col justify-center p-8 sm:p-10">
          <Eyebrow className="self-start">{tr(lang, "Case study", "Étude de cas")} · {study.product}</Eyebrow>
          <h3 className="mt-5 text-[1.6rem] font-medium leading-[1.25] tracking-[-0.02em] text-ink sm:text-[1.85rem]">
            {study.title}
          </h3>
          <p className="mt-4 text-[15px] leading-6 text-muted">{study.summary}</p>
          <Link
            href={`/insights/case-studies#${study.slug}`}
            className="mt-7 text-sm font-bold text-accent-strong hover:text-ink"
          >
            {tr(lang, "Read the case study →", "Lire l'étude de cas →")}
          </Link>
        </div>
        <dl className="grid grid-cols-3 gap-4 bg-mint p-8 sm:p-10 lg:grid-cols-1 lg:gap-6">
          {study.metrics.map((m) => (
            <div key={m.label} className="lg:border-l lg:border-accent-strong/20 lg:pl-5">
              <dt className="sr-only">{m.label}</dt>
              <dd className="font-serif text-4xl tracking-[-0.03em] text-ink sm:text-5xl">
                <CountUp value={m.value} />
              </dd>
              <dd className="mt-1 text-[13.5px] text-muted sm:text-[14.5px]">{m.label}</dd>
            </div>
          ))}
        </dl>
      </article>
    </Reveal>
  );
}
