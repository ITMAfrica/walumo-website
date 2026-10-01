import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhotoCarousel } from "@/components/sections/profile-carousel";
import { CtaBanner } from "@/components/sections/blocks";
import { Button, CheckList, Container, Eyebrow, Section, SectionHeading } from "@/components/ui/primitives";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import { events, pillars } from "@/lib/content";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const e = events.find((x) => x.slug === slug);
  if (!e) return {};
  return { title: e.title, description: e.summary, openGraph: { images: [{ url: e.cover }] } };
}

export default async function EventPage({ params }: PageProps<"/insights/events/[slug]">) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();
  const innovation = pillars.find((p) => p.title === "Innovation challenges");

  return (
    <>
      <section className="bg-gradient-to-b from-white to-surface">
        <Container className="pb-12 pt-12 text-center sm:pt-16">
          <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
            <Link href="/insights#events" className="hover:text-ink">
              Events
            </Link>
          </nav>
          <Eyebrow className="mt-8">{event.status}</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl animate-fade-up font-serif text-5xl tracking-[-0.02em] text-ink sm:text-6xl">
            Walumo <em className="italic text-accent-strong">Hacklab</em>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">{event.summary}</p>
          {event.highlights && (
            <dl className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-6">
              {event.highlights.map((h) => (
                <div key={h.label}>
                  <dt className="sr-only">{h.label}</dt>
                  <dd className="font-serif text-5xl tracking-[-0.03em] text-ink">{h.value}</dd>
                  <dd className="mt-1 text-[14px] text-muted">{h.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </Container>
        <Container className="pb-16">
          <PhotoPlaceholder
            src={event.cover}
            alt="Walumo Hacklab participants gathered in the Walumo office"
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="mx-auto aspect-[16/8] max-w-6xl rounded-[1.5rem]"
          />
        </Container>
      </section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            align="left"
            eyebrow="About the Hacklab"
            title="Spotlighting Africa's emerging tech talent"
            text={innovation?.text}
          />
          <div>
            <CheckList
              items={[
                "Teams presented their solutions on stage",
                "Live product demos",
                "A community of developers, designers and product thinkers",
              ]}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact?interest=partnership" arrow>
                Partner on the next edition
              </Button>
              <Button href="/what-we-do#pillars" variant="outline">
                Our strategic pillars
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="surface" className="overflow-hidden">
        <Container>
          <SectionHeading align="left" eyebrow="Gallery" title="Highlights from the day" />
        </Container>
        <PhotoCarousel photos={event.gallery} label="Walumo Hacklab photo gallery" />
      </Section>

      <CtaBanner
        title="Build Africa's digital future with us"
        text="Partner with Walumo on the next Hacklab, or talk to us about bringing our products to your organisation."
        primary={{ label: "Partner with us", href: "/contact?interest=partnership" }}
      />
    </>
  );
}
