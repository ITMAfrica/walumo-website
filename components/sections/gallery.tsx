import Link from "next/link";
import { Container, Section, SectionHeading, TextLink, cn } from "@/components/ui/primitives";
import { Reveal, ScrollLine } from "@/components/ui/reveal";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import { site } from "@/lib/site";

/* ------------------------------------------------------------------ */
/* Photo grid: Walumo Hacklab event photos                              */
/* ------------------------------------------------------------------ */

type Tile = {
  src: string;
  alt: string;
  label: string;
  caption: string;
  href?: string;
  className: string;
};

const hacklab = "/insights/events/walumo-hacklab";

const tiles: Tile[] = [
  {
    src: "/images/hackathon/img_2026.jpg",
    alt: "Walumo Hacklab participants gathered in the Walumo office",
    label: "Walumo Hacklab",
    caption: "Hacklab participants at the Walumo office",
    href: hacklab,
    className: "sm:col-span-2 lg:row-span-2",
  },
  {
    src: "/images/hackathon/img_1897.jpg",
    alt: "A Hacklab team in front of the Hacklab backdrop",
    label: "Hacklab",
    caption: "A Hacklab team",
    href: hacklab,
    className: "sm:col-span-2",
  },
  {
    src: "/images/hackathon/img_1798.jpg",
    alt: "Hacklab participants working on a laptop",
    label: "Hacklab",
    caption: "Building a solution",
    href: hacklab,
    className: "",
  },
  {
    src: "/images/hackathon/img_2546.jpg",
    alt: "A Hacklab participant presenting a solution",
    label: "Hacklab",
    caption: "Presenting a solution",
    href: hacklab,
    className: "",
  },
  {
    src: "/images/hackathon/img_2043.jpg",
    alt: "Three people in front of the Walumo Hacklab backdrop",
    label: "Hacklab",
    caption: "At the Hacklab",
    href: hacklab,
    className: "",
  },
  {
    src: "/images/hackathon/img_1956.jpg",
    alt: "A Hacklab participant pitching with a microphone",
    label: "Hacklab",
    caption: "Pitch session",
    href: hacklab,
    className: "sm:col-span-2",
  },
];

function PhotoTile({ tile, delay }: { tile: Tile; delay: number }) {
  const content = (
    <PhotoPlaceholder
      src={tile.src}
      alt={tile.alt}
      overlay
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="h-full min-h-[240px] rounded-[var(--radius-card)]"
    >
      <div className="flex h-full flex-col justify-end p-5 sm:p-6">
        <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-white/75">{tile.label}</p>
        <p className="mt-1 text-[15px] font-bold leading-snug text-white">{tile.caption}</p>
      </div>
    </PhotoPlaceholder>
  );

  return (
    <Reveal as="li" delay={delay} className={cn("h-full", tile.className)}>
      {tile.href ? (
        <Link href={tile.href} className="group block h-full rounded-[var(--radius-card)]">
          {content}
        </Link>
      ) : (
        <div className="group h-full">{content}</div>
      )}
    </Reveal>
  );
}

export function PeopleBento() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Community"
            title="Inside the"
            accent="Walumo Hacklab"
            text="Developers, designers and product thinkers came together at the Walumo office to build, pitch and demo their own solutions."
          />
          <TextLink href={hacklab} className="shrink-0">
            See the Hacklab
          </TextLink>
        </div>
        <ul className="mt-12 grid auto-rows-[240px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[260px]">
          {tiles.slice(0, 4).map((t, i) => (
            <PhotoTile key={t.src} tile={t} delay={i * 70} />
          ))}
          <Reveal as="li" delay={280} className="h-full">
            <Link
              href="/contact"
              className="group flex h-full flex-col justify-between rounded-[var(--radius-card)] bg-ink p-6 text-white transition-colors duration-300 hover:bg-navy"
            >
              <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-accent">Our office</p>
              <div>
                <p className="font-serif text-xl leading-snug">{site.addressShort}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-accent">
                  Plan a visit
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
          {tiles.slice(4).map((t, i) => (
            <PhotoTile key={t.src} tile={t} delay={350 + i * 70} />
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Delivery timeline: a line fills in as the steps scroll past          */
/* ------------------------------------------------------------------ */

export function Timeline({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <div className="relative">
      <div className="absolute bottom-6 left-[23px] top-6 w-px bg-line" aria-hidden="true">
        <ScrollLine />
      </div>
      <ol className="relative">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 50} className="relative pb-6 pl-16 last:pb-0">
            <span className="absolute left-0 top-1 flex size-12 items-center justify-center rounded-full border border-line bg-white font-serif text-lg text-accent-strong">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="p-5">
              <h3 className="text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-1.5 text-[15px] leading-6 text-muted">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
