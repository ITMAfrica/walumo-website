import Link from "next/link";
import type { ReactNode } from "react";
import {
  Button,
  CheckList,
  Container,
  CtaPair,
  Eyebrow,
  Section,
  SectionHeading,
  TextLink,
  cn,
} from "@/components/ui/primitives";
import { FeatureIcon, Plus } from "@/components/ui/icons";
import { CountUp, Reveal, Spotlight } from "@/components/ui/reveal";
import { Aurora, PhotoPlaceholder } from "@/components/ui/visuals";
import { products, type Product } from "@/lib/content";
import { hasWhatsapp, site } from "@/lib/site";
import type { IconName } from "@/lib/site";

/* ------------------------------------------------------------------ */
/* Pillar card: copy on the left, visual on the right (or reversed).   */
/* ------------------------------------------------------------------ */

export function PillarCard({
  id,
  eyebrow,
  title,
  items,
  href,
  linkLabel = "En savoir plus",
  visual,
  reverse,
  text,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  items?: string[];
  href?: string;
  linkLabel?: string;
  visual: ReactNode;
  reverse?: boolean;
  text?: ReactNode;
}) {
  return (
    <Reveal>
      <article
        id={id}
        className={cn(
          "group grid scroll-mt-28 overflow-hidden rounded-[var(--radius-card)] bg-white shadow-card ring-1 ring-ink/[0.04] transition-shadow duration-500 hover:shadow-lift lg:grid-cols-[1fr_1.2fr]",
        )}
      >
        <div className={cn("flex flex-col justify-center p-8 sm:p-10 lg:p-12", reverse && "lg:order-2")}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h3 className="mt-5 text-[1.65rem] font-medium leading-[1.25] tracking-[-0.02em] text-ink sm:text-[1.9rem]">
            {title}
          </h3>
          {text && <p className="mt-4 text-[15px] leading-6 text-muted">{text}</p>}
          {items && <CheckList items={items} className="mt-6" />}
          {href && <TextLink href={href} className="mt-8">{linkLabel}</TextLink>}
        </div>
        <div className={cn("relative min-h-[320px] lg:min-h-[420px]", reverse && "lg:order-1")}>{visual}</div>
      </article>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Dark statistics band                                                */
/* ------------------------------------------------------------------ */

export function StatsBand({
  stats,
  title,
  children,
  className,
  image,
}: {
  stats: { value: string; label: string }[];
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** Optional background photo, heavily tinted so the figures stay readable. */
  image?: string;
}) {
  return (
    <Container className={className}>
      <div className="relative isolate overflow-hidden rounded-[1.5rem] bg-ink px-6 py-14 text-white sm:px-12 lg:py-20">
        {image && (
          <>
            <PhotoPlaceholder src={image} alt="" sizes="(max-width: 1280px) 100vw, 1280px" className="absolute inset-0 -z-10 opacity-50" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-ink/85 to-ink" aria-hidden="true" />
          </>
        )}
        <Aurora dark className="-z-10 opacity-70" />
        {title && (
          <h2 className="relative mx-auto max-w-2xl text-center font-serif text-3xl leading-tight sm:text-4xl">
            {title}
          </h2>
        )}
        <dl
          className={cn(
            "relative grid gap-10 text-center sm:grid-cols-3 sm:gap-6",
            title ? "mt-12" : "",
          )}
        >
          {stats.map((s) => (
            <div key={s.label} className="sm:border-l sm:border-white/10 sm:first:border-l-0">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-shimmer-dark font-serif text-6xl tracking-[-0.03em] sm:text-7xl">
                <CountUp value={s.value} />
              </dd>
              <dd className="mx-auto mt-3 max-w-[16rem] text-[15px] text-white/70">{s.label}</dd>
            </div>
          ))}
        </dl>
        {children && <div className="relative mt-12">{children}</div>}
      </div>
    </Container>
  );
}

/* ------------------------------------------------------------------ */
/* Feature grid (icon + title + text)                                  */
/* ------------------------------------------------------------------ */

export function FeatureGrid({
  items,
  columns = 3,
  dark,
}: {
  items: { icon: IconName; title: string; text: string }[];
  columns?: 2 | 3 | 4;
  dark?: boolean;
}) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" };
  return (
    <ul className={cn("grid gap-5", cols[columns])}>
      {items.map((f, i) => (
        <Reveal as="li" key={f.title} delay={i * 70} className="h-full">
          <Spotlight
            className={cn(
              "group h-full overflow-hidden rounded-[var(--radius-card)] p-7 transition-[translate,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5",
              dark
                ? "border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:border-white/25"
                : "bg-white shadow-card ring-1 ring-ink/[0.04] hover:shadow-lift",
            )}
          >
            <span
              className={cn(
                "flex size-12 items-center justify-center rounded-2xl transition-[scale,rotate,background-color,color] duration-500 group-hover:-rotate-6 group-hover:scale-110",
                dark
                  ? "bg-white/10 text-accent group-hover:bg-accent group-hover:text-ink"
                  : "bg-mint text-accent-strong group-hover:bg-accent-strong group-hover:text-white",
              )}
            >
              <FeatureIcon name={f.icon} size={21} />
            </span>
            <h3 className={cn("mt-5 text-lg font-semibold", dark ? "text-white" : "text-ink")}>{f.title}</h3>
            <p className={cn("mt-2 text-[15px] leading-6", dark ? "text-white/70" : "text-muted")}>{f.text}</p>
          </Spotlight>
        </Reveal>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Numbered process steps                                               */
/* ------------------------------------------------------------------ */

export function Steps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {steps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 60} className="h-full">
          <Spotlight className="group h-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-white p-7 transition-[translate,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-transparent hover:shadow-lift">
            <span className="text-shimmer font-serif text-5xl">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-4 text-lg font-semibold text-ink">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-6 text-muted">{s.text}</p>
            <span
              className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-accent-strong to-accent transition-[scale] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              aria-hidden="true"
            />
          </Spotlight>
        </Reveal>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ accordion (native <details>, no JS needed)                      */
/* ------------------------------------------------------------------ */

export function Faq({
  items,
  title = "Frequently asked questions",
  id,
}: {
  items: { q: string; a: string }[];
  title?: string;
  id?: string;
}) {
  return (
    <Section id={id} className="scroll-mt-24">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading title={title} align="left" text="Can't find your answer? Talk to our team." />
        <div className="divide-y divide-line border-y border-line">
          {items.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-bold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus size={20} className="shrink-0 transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Closing call-to-action banner                                       */
/* ------------------------------------------------------------------ */

export function CtaBanner({
  title = "Ready to see how Walumo can support your organisation?",
  text = hasWhatsapp
    ? "Book a demo and we will show you the right product, implementation path and next step — or message us on WhatsApp and talk to a real person today."
    : "Book a demo and we will show you the right product, implementation path and next step — or talk to a real person on our team today.",
  primary = site.primaryCta,
  secondary = site.whatsappCta,
  image = "/images/office-nairobi.jpg",
}: {
  title?: ReactNode;
  text?: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Background photo, tinted navy. */
  image?: string;
}) {
  return (
    <Section className="pt-8">
      <Container>
        <Reveal variant="scale">
          <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-ink">
            <PhotoPlaceholder src={image} alt="" sizes="(max-width: 1280px) 100vw, 1280px" className="absolute inset-0 -z-10" />
            <div
              className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(6_20_51/0.72),rgb(6_20_51/0.94)_70%)]"
              aria-hidden="true"
            />
            <Aurora dark className="-z-10 opacity-80" />
            <div className="px-6 py-20 text-center sm:px-12 lg:py-28">
              <span className="relative mx-auto flex size-3 items-center justify-center" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-accent" />
                <span className="relative inline-flex size-3 rounded-full bg-accent" />
              </span>
              <h2 className="mx-auto mt-8 max-w-3xl font-serif text-[2.2rem] leading-[1.15] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.5rem]">
                {title}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base text-white/75 sm:text-lg">{text}</p>
              <CtaPair dark className="mt-10" primary={primary} secondary={secondary} />
              <p className="mt-8 text-[13px] text-white/50">{site.address}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Product cards linking to the three product pages                    */
/* ------------------------------------------------------------------ */

const productIcon: Record<Product["slug"], IconName> = {
  "kazi-pro": "users",
  "talent-pro": "search",
  "sales-tracker": "chart",
};

export function ProductLinks({
  title = "Explore the Walumo suite",
  exclude,
  tone = "surface",
}: {
  title?: string;
  exclude?: Product["slug"];
  tone?: "surface" | "white";
}) {
  const list = products.filter((p) => p.slug !== exclude);
  return (
    <Section tone={tone}>
      <Container>
        <SectionHeading title={title} />
        <ul className={cn("mt-12 grid gap-5", list.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2")}>
          {list.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 80} className="h-full">
              <Spotlight className="group h-full rounded-[var(--radius-card)] bg-white shadow-card ring-1 ring-ink/[0.04] transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-lift">
                <Link href={`/products/${p.slug}`} className="flex h-full flex-col rounded-[var(--radius-card)] p-7">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-ink text-accent transition-[scale,rotate] duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <FeatureIcon name={productIcon[p.slug]} size={21} />
                  </span>
                  <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.08em] text-accent-strong">{p.category}</p>
                  <h3 className="mt-1 text-xl font-bold text-ink">{p.name}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-6 text-muted">{p.tagline}.</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-accent-strong group-hover:text-ink">
                    Discover {p.name}
                    <span className="transition-[translate] duration-300 group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </span>
                </Link>
              </Spotlight>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
