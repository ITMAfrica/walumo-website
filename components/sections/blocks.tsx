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
import { CountUp, Reveal } from "@/components/ui/reveal";
import { PhotoPlaceholder } from "@/components/ui/visuals";
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
          "grid scroll-mt-28 overflow-hidden rounded-[var(--radius-card)] bg-white shadow-card lg:grid-cols-[1fr_1.2fr]",
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
}: {
  stats: { value: string; label: string }[];
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Container className={className}>
      <div className="relative overflow-hidden rounded-[1.5rem] bg-ink px-6 py-14 text-white sm:px-12 lg:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-10 size-96 rounded-full bg-[#2e4a57]/60 blur-3xl" />
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
              <dd className="font-serif text-6xl tracking-[-0.03em] sm:text-7xl">
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
        <Reveal as="li" key={f.title} delay={i * 60}>
          <div
            className={cn(
              "h-full rounded-[var(--radius-card)] p-7",
              dark ? "border border-white/10 bg-white/[0.04]" : "bg-white shadow-card",
            )}
          >
            <span
              className={cn(
                "flex size-11 items-center justify-center rounded-xl",
                dark ? "bg-white/10 text-accent" : "bg-mint text-accent-strong",
              )}
            >
              <FeatureIcon name={f.icon} size={20} />
            </span>
            <h3 className={cn("mt-5 text-lg font-semibold", dark ? "text-white" : "text-ink")}>{f.title}</h3>
            <p className={cn("mt-2 text-[15px] leading-6", dark ? "text-white/70" : "text-muted")}>{f.text}</p>
          </div>
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
        <Reveal as="li" key={s.title} delay={i * 60}>
          <div className="group h-full rounded-[var(--radius-card)] border border-line bg-white p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent-strong/30 hover:shadow-card">
            <span className="inline-block font-serif text-4xl text-accent-strong transition-transform duration-300 group-hover:scale-110">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-4 text-lg font-semibold text-ink">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-6 text-muted">{s.text}</p>
          </div>
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
}: {
  title?: ReactNode;
  text?: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <Section className="pt-8">
      <Container>
        <PhotoPlaceholder tone="ink" className="rounded-[1.5rem]">
          <div className="px-6 py-16 text-center sm:px-12 lg:py-24">
            <h2 className="mx-auto max-w-3xl font-serif text-[2.2rem] leading-[1.15] tracking-[-0.02em] text-white sm:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/70 sm:text-lg">{text}</p>
            <CtaPair dark className="mt-9" primary={primary} secondary={secondary} />
            <p className="mt-8 text-[13px] text-white/45">{site.address}</p>
          </div>
        </PhotoPlaceholder>
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
            <Reveal as="li" key={p.slug} delay={i * 80}>
              <Link
                href={`/products/${p.slug}`}
                className="group flex h-full flex-col rounded-[var(--radius-card)] bg-white p-7 shadow-card transition-shadow hover:shadow-float"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-ink text-accent">
                  <FeatureIcon name={productIcon[p.slug]} size={20} />
                </span>
                <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.08em] text-accent-strong">{p.category}</p>
                <h3 className="mt-1 text-xl font-bold text-ink">{p.name}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-6 text-muted">{p.tagline}.</p>
                <span className="mt-6 text-sm font-bold text-accent-strong group-hover:text-ink">Discover {p.name} →</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
