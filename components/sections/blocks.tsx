import Link from "@/components/ui/link";
import type { ReactNode } from "react";
import {
  Button,
  CheckList,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
  TextLink,
  cn,
} from "@/components/ui/primitives";
import { CtaPair } from "@/components/ui/cta-pair";
import { Journey } from "@/components/sections/journey";
import { Icon3D } from "@/components/ui/icon-3d";
import { PastelArt, SpreadsheetArt } from "@/components/ui/pastel-art";
import { Plus } from "@/components/ui/icons";
import { CountUp, Reveal, Spotlight } from "@/components/ui/reveal";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import type { Product } from "@/lib/content";
import { hasWhatsapp } from "@/lib/site";
import type { IconName } from "@/lib/site";
import { getContent, getLang, getSite } from "@/lib/i18n-server";
import { tr } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/* Pillar card: copy on the left, visual on the right (or reversed).   */
/* ------------------------------------------------------------------ */

export async function PillarCard({
  id,
  eyebrow,
  title,
  items,
  href,
  linkLabel: linkLabelProp,
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
  const lang = await getLang();
  const linkLabel = linkLabelProp ?? tr(lang, "En savoir plus", "En savoir plus");
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
            <Icon3D name={f.icon} className="w-12 transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110" />
            <h3 className={cn("mt-4 text-lg font-semibold", dark ? "text-white" : "text-ink")}>{f.title}</h3>
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
  return <Journey steps={steps} />;
}

/* ------------------------------------------------------------------ */
/* FAQ accordion (native <details>, no JS needed)                      */
/* ------------------------------------------------------------------ */

export async function Faq({
  items,
  title: titleProp,
  id,
}: {
  items: { q: string; a: string }[];
  title?: string;
  id?: string;
}) {
  const lang = await getLang();
  const title = titleProp ?? tr(lang, "Frequently asked questions", "Questions fréquentes");
  return (
    <Section id={id} className="scroll-mt-24">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading title={title} align="left" text={tr(lang, "Can't find your answer? Talk to our team.", "Vous ne trouvez pas votre réponse ? Parlez à notre équipe.")} />
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

export async function CtaBanner({
  title: titleProp,
  text: textProp,
  primary: primaryProp,
  secondary: secondaryProp,
  image = "/images/office-nairobi.jpg",
}: {
  title?: ReactNode;
  text?: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Background photo, tinted navy. */
  image?: string;
}) {
  const lang = await getLang();
  const { site } = await getSite();
  const title = titleProp ?? tr(lang, "Ready to see how Walumo can support your organisation?", "Prêt à voir comment Walumo peut accompagner votre organisation ?");
  const text =
    textProp ??
    (hasWhatsapp
      ? tr(
          lang,
          "Book a demo and we will show you the right product, implementation path and next step — or message us on WhatsApp and talk to a real person today.",
          "Réservez une démo : nous vous présenterons le bon produit, le parcours de mise en œuvre et la prochaine étape — ou écrivez-nous sur WhatsApp et parlez dès aujourd'hui à un vrai interlocuteur.",
        )
      : tr(
          lang,
          "Book a demo and we will show you the right product, implementation path and next step — or talk to a real person on our team today.",
          "Réservez une démo : nous vous présenterons le bon produit, le parcours de mise en œuvre et la prochaine étape — ou parlez dès aujourd'hui à un membre de notre équipe.",
        ));
  const primary = primaryProp ?? site.primaryCta;
  const secondary = secondaryProp ?? site.whatsappCta;
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
            <div className="px-6 py-20 text-center sm:px-12 lg:py-28">
              <h2 className="mx-auto max-w-3xl font-serif text-[2.2rem] leading-[1.15] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.5rem]">
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

/** Asymmetric problem layout: one large lead item, the others stacked beside it. */
export function PainGrid({ items }: { items: { title: string; text: string; icon?: IconName }[] }) {
  const [lead, ...rest] = items;
  return (
    <ul className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
      <Reveal as="li" className="lg:row-span-2">
        <Spotlight className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-card)] bg-ink p-8 text-white sm:p-10">
          <PastelArt kind="rows" icon={lead.icon ?? "target"} dark className="max-w-xs" />
          <SpreadsheetArt className="pointer-events-none absolute hidden w-[43%] sm:block" style={{ bottom: -10, right: -10 }} />
          <div className="relative z-10 mt-16">
            <h3 className="font-serif text-3xl leading-tight tracking-[-0.01em] sm:text-4xl">{lead.title}</h3>
            <p className="mt-4 max-w-md text-base leading-7 text-white/70 sm:max-w-[54%]">{lead.text}</p>
          </div>
        </Spotlight>
      </Reveal>
      {rest.map((p, i) => (
        <Reveal as="li" key={p.title} delay={(i + 1) * 90}>
          <Spotlight className="group h-full rounded-[var(--radius-card)] bg-white/70 p-7 ring-1 ring-ink/[0.06] transition-colors duration-300 hover:bg-white">
            <PastelArt kind={i === 0 ? "bubbles" : "tile"} icon={p.icon ?? "target"} />
            <h3 className="mt-5 text-lg font-bold text-accent-strong">{p.title}</h3>
            <p className="mt-2 text-[15px] leading-6 text-muted">{p.text}</p>
          </Spotlight>
        </Reveal>
      ))}
    </ul>
  );
}

export async function ProductLinks({
  title: titleProp,
  exclude,
  tone = "surface",
}: {
  title?: string;
  exclude?: Product["slug"];
  tone?: "surface" | "white";
}) {
  const lang = await getLang();
  const { products } = await getContent();
  const title = titleProp ?? tr(lang, "Explore the Walumo suite", "Découvrez la suite Walumo");
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
                  <Icon3D name={productIcon[p.slug]} className="w-12 transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110" />
                  <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.08em] text-accent-strong">{p.category}</p>
                  <h3 className="mt-1 text-xl font-bold text-ink">{p.name}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-6 text-muted">{p.tagline}.</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-accent-strong group-hover:text-ink">
                    {tr(lang, "Discover", "Découvrir")} {p.name}
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
