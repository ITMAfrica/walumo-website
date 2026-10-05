import { hasLocale, locales, tr, type Locale } from "@/lib/i18n";
import { contentFor } from "@/lib/i18n-data";
import type { Metadata } from "next";
import Link from "@/components/ui/link";
import { notFound } from "next/navigation";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { ArticleCard } from "@/components/sections/collections";
import { Avatar, Button, Container, Eyebrow, Section } from "@/components/ui/primitives";
import { Clock, SocialIcon } from "@/components/ui/icons";
import { ArticleIllustration } from "@/components/ui/article-mocks";
import { articles as articlesEn } from "@/lib/content";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return locales.flatMap((lang) => articlesEn.map((a) => ({ lang, slug: a.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/insights/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const a = contentFor(lang).articles.find((x) => x.slug === slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt,
    alternates: alternates(`/insights/${slug}`, lang),
    openGraph: { type: "article", title: a.title, description: a.excerpt, images: [{ url: a.image }] },
  };
}

function alternates(path: string, lang: Locale) {
  const en = `${site.url}${path}`;
  const fr = `${site.url}/fr${path}`;
  return { canonical: lang === "fr" ? fr : en, languages: { en, fr, "x-default": en } };
}

const anchor = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default async function ArticlePage({ params }: PageProps<"/[lang]/insights/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const { articles, products } = contentFor(lang);
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  // Illustrations are keyed by the English topic name.
  const enTopic = articlesEn.find((a) => a.slug === slug)?.topic ?? article.topic;

  const product = products.find((p) => p.slug === article.related)!;
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
  const shareUrl = `${site.url}${lang === "fr" ? "/fr" : ""}/insights/${article.slug}`;

  return (
    <>
      <article>
        <header className="fluted">
          <Container size="narrow" className="pb-12 pt-12 sm:pt-16">
            <nav aria-label={tr(lang, "Breadcrumb", "Fil d'Ariane")} className="text-[13px] text-muted">
              <Link href="/insights" className="hover:text-ink">
                {tr(lang, "Insights", "Analyses")}
              </Link>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <span>{article.topic}</span>
            </nav>
            <Eyebrow className="mt-8">{article.topic}</Eyebrow>
            <h1 className="mt-5 font-serif text-[2.3rem] leading-[1.15] tracking-[-0.02em] text-ink sm:text-5xl">{article.title}</h1>
            <p className="mt-5 text-lg leading-8 text-muted">{article.excerpt}</p>
            <div className="mt-8 flex items-center gap-3 text-sm text-muted">
              <Avatar name="Walumo" size={40} />
              <div>
                <p className="font-bold text-ink">{article.author}</p>
                <p className="flex items-center gap-2">
                  <time>{article.date}</time>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={13} /> {article.readTime}
                  </span>
                </p>
              </div>
            </div>
          </Container>
          <Container className="pb-4">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-b from-white to-surface/60 shadow-card ring-1 ring-line/70">
              <ArticleIllustration topic={enTopic} className="h-[340px] sm:h-[400px]" />
            </div>
          </Container>
        </header>

        <Container className="grid gap-12 py-16 lg:grid-cols-[220px_minmax(0,1fr)_220px]">
          <aside className="hidden lg:block">
            <nav aria-label={tr(lang, "Contents", "Sommaire")} className="sticky top-28">
              <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted">{tr(lang, "Contents", "Sommaire")}</p>
              <ul className="mt-4 space-y-2.5 border-l border-line">
                {article.sections.map((s) => (
                  <li key={s.heading}>
                    <a href={`#${anchor(s.heading)}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-ink-soft hover:border-accent-strong hover:text-ink">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="prose-nova mx-auto w-full max-w-[680px]">
            {article.sections.map((s) => (
              <section key={s.heading}>
                <h2 id={anchor(s.heading)}>{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.list && (
                  <ul>
                    {s.list.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <div className="!mt-12 rounded-[var(--radius-card)] bg-surface p-6 not-italic">
              <p className="!mt-0 font-bold text-ink">
                {tr(lang, `See how ${product.name} helps: ${product.tagline.toLowerCase()}.`, `Découvrez comment ${product.name} peut vous aider : ${product.tagline.toLowerCase()}.`)}
              </p>
              <Button href={`/products/${product.slug}`} size="sm" className="!mt-4 !no-underline">
                {tr(lang, `Discover ${product.name}`, `Découvrir ${product.name}`)}
              </Button>
            </div>
          </div>

          <aside>
            <div className="sticky top-28 flex items-center gap-3 lg:flex-col lg:items-start">
              <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted">{tr(lang, "Share", "Partager")}</p>
              <div className="flex gap-2">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tr(lang, "Share on LinkedIn", "Partager sur LinkedIn")}
                  className="flex size-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  <SocialIcon name="linkedin" size={16} />
                </a>
                <a
                  href={`https://x.com/intent/post?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tr(lang, "Share on X", "Partager sur X")}
                  className="flex size-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  <SocialIcon name="x" size={16} />
                </a>
              </div>
            </div>
          </aside>
        </Container>
      </article>

      <Section tone="surface">
        <Container>
          <h2 className="font-serif text-4xl tracking-[-0.02em] text-ink">{tr(lang, "Related articles", "Articles similaires")}</h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {related.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col items-center rounded-[1.5rem] bg-mint px-6 py-14 text-center sm:px-12">
            <h2 className="max-w-2xl font-serif text-[2rem] leading-tight tracking-[-0.02em] text-ink sm:text-[2.6rem]">
              {tr(lang, "Get the next article in your inbox", "Recevez le prochain article par e-mail")}
            </h2>
            <NewsletterForm className="mt-8" />
          </div>
        </Container>
      </Section>
    </>
  );
}
