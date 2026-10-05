import type { ReactNode } from "react";
import { Button, Container, Eyebrow } from "@/components/ui/primitives";
import type { Metadata } from "next";
import { siteFor } from "@/lib/i18n-data";
import { tr, type Locale } from "@/lib/i18n";

/** Localized metadata with canonical + hreflang alternates for a legal page. */
export function legalMetadata(lang: Locale, path: string, title: string, description: string): Metadata {
  const { url } = siteFor(lang).site;
  const en = `${url}${path}`;
  const fr = `${url}/fr${path}`;
  return {
    title,
    description,
    alternates: { canonical: lang === "fr" ? fr : en, languages: { en, fr, "x-default": en } },
  };
}

export type LegalSection = { id: string; title: string; body: ReactNode };

/**
 * Shared layout for trust & legal pages: header, sticky table of contents, long-form body.
 * `draft` shows a visible notice — remove it once legal counsel has approved the text.
 */
export function LegalPage({
  lang,
  eyebrow,
  title,
  updated,
  intro,
  sections,
  draft = true,
}: {
  lang: Locale;
  eyebrow?: string;
  title: string;
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
  draft?: boolean;
}) {
  const { site } = siteFor(lang);
  const eyebrowText = eyebrow ?? tr(lang, "Trust", "Confiance");
  const contents = tr(lang, "Contents", "Sommaire");
  return (
    <>
      <header className="fluted">
        <Container size="narrow" className="py-14 sm:py-20">
          <Eyebrow>{eyebrowText}</Eyebrow>
          <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.1] tracking-[-0.02em] text-ink sm:text-6xl">{title}</h1>
          <p className="mt-4 text-sm text-muted">{tr(lang, "Last updated:", "Dernière mise à jour :")} {updated}</p>
          <div className="mt-6 text-base leading-7 text-ink-soft sm:text-lg">{intro}</div>
          {draft && (
            <div role="note" className="mt-8 rounded-2xl border border-[#f0d9b5] bg-[#fdf6ea] px-5 py-4 text-[14px] leading-6 text-[#7a5a1f]">
              {lang === "fr" ? (
                <>
                  <strong className="font-bold">Version préliminaire à valider.</strong> Cette page doit être relue et approuvée par les
                  équipes juridique et informatique de Walumo avant la mise en ligne du site.
                </>
              ) : (
                <>
                  <strong className="font-bold">Draft for review.</strong> This page must be reviewed and approved by Walumo&apos;s legal
                  and IT teams before the website goes live.
                </>
              )}
            </div>
          )}
        </Container>
      </header>

      <Container className="grid gap-10 py-14 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 lg:py-20">
        <aside>
          <details className="rounded-2xl border border-line p-4 lg:hidden">
            <summary className="cursor-pointer text-sm font-bold text-ink">{contents}</summary>
            <ol className="mt-3 space-y-2">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-sm text-ink-soft hover:text-ink">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </details>
          <nav aria-label={contents} className="sticky top-28 hidden lg:block">
            <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted">{contents}</p>
            <ol className="mt-4 space-y-1 border-l border-line">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px block border-l border-transparent py-1 pl-4 text-sm leading-5 text-ink-soft hover:border-accent-strong hover:text-ink"
                  >
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="prose-nova max-w-[720px]">
          {sections.map((s, i) => (
            <section key={s.id}>
              <h2 id={s.id} className={i === 0 ? "!mt-0" : undefined}>
                {i + 1}. {s.title}
              </h2>
              {s.body}
            </section>
          ))}

          <div className="!mt-16 rounded-[var(--radius-card)] bg-surface p-6 sm:p-8">
            <p className="font-serif text-2xl text-ink">{tr(lang, "Questions?", "Des questions ?")}</p>
            <p className="!mt-2 text-[15px] text-muted">
              {lang === "fr" ? (
                <>
                  Écrivez-nous à <a href={`mailto:${site.email}`}>{site.email}</a> ou utilisez notre formulaire de contact.
                </>
              ) : (
                <>
                  Email us at <a href={`mailto:${site.email}`}>{site.email}</a> or use our contact form.
                </>
              )}
            </p>
            <Button href="/contact" size="sm" className="!mt-5 !no-underline">
              {tr(lang, "Contact Walumo", "Contacter Walumo")}
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
