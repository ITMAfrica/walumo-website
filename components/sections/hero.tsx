import type { ReactNode } from "react";
import { Button, CheckList, Container, Eyebrow, cn } from "@/components/ui/primitives";
import { Check } from "@/components/ui/icons";
import { SplitWords, Tilt } from "@/components/ui/reveal";
import { Aurora } from "@/components/ui/visuals";
import { site } from "@/lib/site";

const WORD_STEP = 70;

/**
 * Centered hero: serif title whose words rise in one by one, an italic
 * brand-blue accent line, lead paragraph, optional inline checks and CTAs,
 * over a slowly drifting aurora background.
 */
export function Hero({
  eyebrow,
  eyebrowNode,
  title,
  accent,
  text,
  checks,
  primary = site.primaryCta,
  secondary,
  children,
  className,
}: {
  eyebrow?: string;
  /** Custom element shown above the title (e.g. a trust badge). */
  eyebrowNode?: ReactNode;
  title: ReactNode;
  accent?: ReactNode;
  text?: ReactNode;
  checks?: string[];
  primary?: { label: string; href: string } | null;
  secondary?: { label: string; href: string } | null;
  children?: ReactNode;
  className?: string;
}) {
  const titleWords = typeof title === "string" ? title.split(" ").length : 3;
  const afterTitle = (typeof accent === "string" ? titleWords + accent.split(" ").length : titleWords) * WORD_STEP;

  return (
    <section className={cn("relative isolate overflow-hidden bg-gradient-to-b from-white via-white to-surface", className)}>
      <Aurora />
      <Container className="relative pb-16 pt-16 text-center sm:pt-20 lg:pb-20 lg:pt-28">
        {eyebrowNode && <div className="animate-fade-up">{eyebrowNode}</div>}
        {eyebrow && !eyebrowNode && <Eyebrow className="animate-fade-up">{eyebrow}</Eyebrow>}
        <h1
          className={cn(
            "mx-auto max-w-4xl font-serif text-[2.6rem] leading-[1.1] tracking-[-0.02em] text-ink sm:text-6xl lg:text-[4.75rem]",
            eyebrow || eyebrowNode ? "mt-7" : "",
          )}
        >
          {typeof title === "string" ? <SplitWords text={title} step={WORD_STEP} /> : title}
          {accent && (
            <>
              <br />
              <em className="italic">
                {typeof accent === "string" ? (
                  <SplitWords
                    text={accent}
                    delay={titleWords * WORD_STEP}
                    step={WORD_STEP}
                    wordClassName="text-shimmer pr-[0.06em]"
                  />
                ) : (
                  <span className="text-accent-strong">{accent}</span>
                )}
              </em>
            </>
          )}
        </h1>
        {text && (
          <p
            className="mx-auto mt-7 max-w-2xl animate-fade-up text-base leading-7 text-muted sm:text-lg"
            style={{ animationDelay: `${afterTitle}ms` }}
          >
            {text}
          </p>
        )}
        {checks && (
          <ul
            className="mt-7 flex animate-fade-up flex-wrap items-center justify-center gap-2.5"
            style={{ animationDelay: `${afterTitle + 80}ms` }}
          >
            {checks.map((c) => (
              <li
                key={c}
                className="flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-3.5 py-1.5 text-sm font-medium text-ink-soft shadow-[0_1px_2px_rgb(6_20_51/0.04)] backdrop-blur"
              >
                <Check size={15} className="text-accent-strong" />
                {c}
              </li>
            ))}
          </ul>
        )}
        {(primary || secondary) && (
          <div
            className="mt-10 flex animate-fade-up flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: `${afterTitle + 160}ms` }}
          >
            {primary && (
              <Button href={primary.href} size="lg" arrow>
                {primary.label}
              </Button>
            )}
            {secondary && (
              <Button href={secondary.href} size="lg" variant="outline">
                {secondary.label}
              </Button>
            )}
          </div>
        )}
      </Container>
      {children && <div className="relative">{children}</div>}
    </section>
  );
}

/**
 * Two-column hero used on inner pages: copy left, visual right.
 */
export function SplitHero({
  eyebrow,
  title,
  accent,
  text,
  bullets,
  primary = site.primaryCta,
  secondary,
  visual,
}: {
  eyebrow?: string;
  title: ReactNode;
  accent?: ReactNode;
  text?: ReactNode;
  bullets?: string[];
  primary?: { label: string; href: string } | null;
  secondary?: { label: string; href: string } | null;
  visual: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white to-surface">
      <Aurora />
      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div className="animate-fade-up">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1
            className={cn(
              "font-serif text-[2.5rem] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[3.4rem] lg:text-[3.9rem]",
              eyebrow && "mt-5",
            )}
          >
            {title}
            {accent && (
              <>
                {" "}
                <em className="text-shimmer pr-[0.06em] italic">{accent}</em>
              </>
            )}
          </h1>
          {text && <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">{text}</p>}
          {bullets && <CheckList items={bullets} className="mt-6" />}
          {(primary || secondary) && (
            <div className="mt-9 flex flex-wrap gap-3">
              {primary && (
                <Button href={primary.href} arrow>
                  {primary.label}
                </Button>
              )}
              {secondary && (
                <Button href={secondary.href} variant="outline">
                  {secondary.label}
                </Button>
              )}
            </div>
          )}
        </div>
        {/* The entrance animation sits on a wrapper so it doesn't override the tilt transform. */}
        <div className="animate-fade-up [animation-delay:150ms]">
          <Tilt>{visual}</Tilt>
        </div>
      </Container>
    </section>
  );
}
