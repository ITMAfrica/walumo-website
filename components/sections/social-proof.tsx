import Image from "next/image";
import Link from "next/link";
import { caseStudies, homeProofStats, itmEntities, testimonials, type CaseStudy } from "@/lib/content";
import { site } from "@/lib/site";
import { Avatar, Button, Container, Eyebrow, cn } from "@/components/ui/primitives";
import { LogoMark } from "@/components/ui/logo";
import { CountUp, Reveal } from "@/components/ui/reveal";
import { PhotoPlaceholder } from "@/components/ui/visuals";

/** Small pill: "Built by Walumo. Backed by ITM Holding." */
export function TrustBadge({ className, dark }: { className?: string; dark?: boolean }) {
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
export function LogoMarquee({ className }: { className?: string }) {
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
export function TrustedStrip({
  title = "Running every day across the ITM Holding group",
  text = "23+ companies in 20+ African countries use Kazi Pro, proven in-house before external rollout.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-ink py-12 text-white" aria-label="ITM Holding group companies">
      <Container>
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <p className="text-[15px] font-bold text-white/90">{title}</p>
          {text && <p className="text-[13.5px] text-white/55">{text}</p>}
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
export function ProofSplit() {
  return (
    <Container>
      <Reveal>
        <div className="grid overflow-hidden rounded-[1.5rem] bg-ink text-white lg:grid-cols-[1fr_1.1fr]">
          <PhotoPlaceholder
            src="/images/hackathon/img_1866.jpg"
            alt="Members of the Walumo community at the Walumo Hacklab"
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
            <Eyebrow dark className="relative self-start">Proven inside ITM Holding</Eyebrow>
            <h2 className="relative mt-5 font-serif text-3xl leading-tight sm:text-4xl">
              Kazi Pro already runs HR across the <em className="italic text-accent">ITM Holding group</em>
            </h2>
            <p className="relative mt-4 text-[15px] leading-6 text-white/70">
              Walumo is the technology and product division of ITM Holding, headquartered in Nairobi. Our platforms were
              deployed and refined inside the group before being offered to other African organisations.
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
                Ask for a reference call
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
export function Testimonials({ className }: { className?: string }) {
  if (testimonials.length === 0) return null;
  return (
    <ul className={cn("grid gap-5 md:grid-cols-2 lg:grid-cols-3", className)}>
      {testimonials.map((t, i) => (
        <Reveal as="li" key={t.name} delay={i * 80}>
          <figure className="flex h-full flex-col rounded-[var(--radius-card)] bg-white p-7 shadow-card">
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
export function CaseStudyCard({ study, className }: { study: CaseStudy; className?: string }) {
  return (
    <Reveal className={className}>
      <article className="grid overflow-hidden rounded-[var(--radius-card)] bg-white shadow-card lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col justify-center p-8 sm:p-10">
          <Eyebrow className="self-start">Case study · {study.product}</Eyebrow>
          <h3 className="mt-5 text-[1.6rem] font-medium leading-[1.25] tracking-[-0.02em] text-ink sm:text-[1.85rem]">
            {study.title}
          </h3>
          <p className="mt-4 text-[15px] leading-6 text-muted">{study.summary}</p>
          <Link
            href={`/insights/case-studies#${study.slug}`}
            className="mt-7 text-sm font-bold text-accent-strong hover:text-ink"
          >
            Read the case study →
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
