import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { ArticleCard } from "@/components/sections/collections";
import { Avatar, Button, Container, Eyebrow, Section } from "@/components/ui/primitives";
import { Clock, SocialIcon } from "@/components/ui/icons";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import { articles, products } from "@/lib/content";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt,
    openGraph: { type: "article", title: a.title, description: a.excerpt, images: [{ url: a.image }] },
  };
}

const anchor = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const product = products.find((p) => p.slug === article.related)!;
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
  const shareUrl = `${site.url}/insights/${article.slug}`;

  return (
    <>
      <article>
        <header className="bg-gradient-to-b from-white to-surface">
          <Container size="narrow" className="pb-12 pt-12 sm:pt-16">
            <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
              <Link href="/insights" className="hover:text-ink">
                Insights
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
            <PhotoPlaceholder
              src={article.image}
              alt=""
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="mx-auto aspect-[16/7] max-w-5xl rounded-[1.5rem]"
            />
          </Container>
        </header>

        <Container className="grid gap-12 py-16 lg:grid-cols-[220px_minmax(0,1fr)_220px]">
          <aside className="hidden lg:block">
            <nav aria-label="Contents" className="sticky top-28">
              <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted">Contents</p>
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
                See how {product.name} helps: {product.tagline.toLowerCase()}.
              </p>
              <Button href={`/products/${product.slug}`} size="sm" className="!mt-4 !no-underline">
                Discover {product.name}
              </Button>
            </div>
          </div>

          <aside>
            <div className="sticky top-28 flex items-center gap-3 lg:flex-col lg:items-start">
              <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted">Share</p>
              <div className="flex gap-2">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="flex size-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  <SocialIcon name="linkedin" size={16} />
                </a>
                <a
                  href={`https://x.com/intent/post?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
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
          <h2 className="font-serif text-4xl tracking-[-0.02em] text-ink">Related articles</h2>
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
              Get the next article in your inbox
            </h2>
            <NewsletterForm className="mt-8" />
          </div>
        </Container>
      </Section>
    </>
  );
}
