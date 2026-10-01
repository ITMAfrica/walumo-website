import type { ReactNode } from "react";
import { Button, CheckList, Container, Eyebrow, cn } from "@/components/ui/primitives";
import { Check } from "@/components/ui/icons";
import { site } from "@/lib/site";

/**
 * Centered hero: serif title with an italic brand-blue accent line,
 * lead paragraph, optional inline checks and CTAs.
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
  return (
    <section className={cn("relative overflow-hidden bg-gradient-to-b from-white via-white to-surface", className)}>
      <Container className="pb-16 pt-16 text-center sm:pt-20 lg:pb-20 lg:pt-24">
        {eyebrowNode && <div className="animate-fade-up">{eyebrowNode}</div>}
        {eyebrow && !eyebrowNode && <Eyebrow className="animate-fade-up">{eyebrow}</Eyebrow>}
        <h1
          className={cn(
            "mx-auto max-w-4xl animate-fade-up font-serif text-[2.6rem] leading-[1.1] tracking-[-0.02em] text-ink [animation-delay:60ms] sm:text-6xl lg:text-[4.5rem]",
            eyebrow || eyebrowNode ? "mt-6" : "",
          )}
        >
          {title}
          {accent && (
            <>
              <br />
              <em className="italic text-accent-strong">{accent}</em>
            </>
          )}
        </h1>
        {text && (
          <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-base leading-7 text-muted [animation-delay:140ms] sm:text-lg">
            {text}
          </p>
        )}
        {checks && (
          <ul className="mt-6 flex animate-fade-up flex-wrap items-center justify-center gap-x-6 gap-y-2 [animation-delay:200ms]">
            {checks.map((c) => (
              <li key={c} className="flex items-center gap-1.5 text-sm font-medium text-ink-soft">
                <Check size={16} className="text-accent-strong" />
                {c}
              </li>
            ))}
          </ul>
        )}
        {(primary || secondary) && (
          <div className="mt-9 flex animate-fade-up flex-wrap items-center justify-center gap-3 [animation-delay:260ms]">
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
      </Container>
      {children}
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
    <section className="bg-gradient-to-b from-white to-surface">
      <Container className="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
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
                <em className="italic text-accent-strong">{accent}</em>
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
        <div className="animate-fade-up [animation-delay:150ms]">{visual}</div>
      </Container>
    </section>
  );
}
