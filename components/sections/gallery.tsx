import Link from "next/link";
import { Container, Section, SectionHeading, TextLink, cn } from "@/components/ui/primitives";
import { ArrowUpRight } from "@/components/ui/icons";
import { Reveal, ScrollLine } from "@/components/ui/reveal";
import { LogoMark } from "@/components/ui/logo";
import { PhotoPlaceholder } from "@/components/ui/visuals";

/* ------------------------------------------------------------------ */
/* "Walumo in action": bento grid of real photos                       */
/* ------------------------------------------------------------------ */

type Tile = {
  src: string;
  alt: string;
  label: string;
  caption: string;
  href?: string;
  className: string;
};

const tiles: Tile[] = [
  {
    src: "/images/team-workshop.jpg",
    alt: "A Walumo implementation workshop with a client team",
    label: "Implementation",
    caption: "Workshops with client teams, from first login to full adoption",
    className: "sm:col-span-2 lg:row-span-2",
  },
  {
    src: "/images/hackathon/img_1897.jpg",
    alt: "Walumo Hacklab participants in front of the Hacklab backdrop",
    label: "Walumo Hacklab",
    caption: "Spotlighting Africa's emerging tech talent",
    href: "/insights/events/walumo-hacklab",
    className: "sm:col-span-2",
  },
  {
    src: "/images/hackathon/img_1798.jpg",
    alt: "Hacklab participants building on a laptop",
    label: "Build",
    caption: "Teams building real solutions",
    href: "/insights/events/walumo-hacklab",
    className: "",
  },
  {
    src: "/images/hackathon/img_2546.jpg",
    alt: "A Hacklab participant pitching a solution on stage",
    label: "Pitch",
    caption: "Ideas pitched and demoed live",
    href: "/insights/events/walumo-hacklab",
    className: "",
  },
  {
    src: "/images/hackathon/img_2043.jpg",
    alt: "Three people smiling in front of the Walumo Hacklab backdrop",
    label: "Hacklab",
    caption: "Celebrating the builders and their ideas",
    href: "/insights/events/walumo-hacklab",
    className: "",
  },
  {
    src: "/images/hackathon/img_1866.jpg",
    alt: "A Hacklab team in Walumo t-shirts",
    label: "Community",
    caption: "Developers, designers and product thinkers",
    href: "/insights/events/walumo-hacklab",
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
        <span className="w-fit rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">
          {tile.label}
        </span>
        <p className="mt-3 max-w-sm translate-y-1 text-[15px] font-bold leading-snug text-white transition-[translate] duration-500 group-hover:translate-y-0">
          {tile.caption}
        </p>
      </div>
      {tile.href && (
        <span className="absolute right-4 top-4 flex size-10 scale-75 items-center justify-center rounded-full bg-white text-ink opacity-0 shadow-float transition-[opacity,scale] duration-500 group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight size={16} />
        </span>
      )}
    </PhotoPlaceholder>
  );

  return (
    <Reveal as="li" variant="scale" delay={delay} className={cn("h-full", tile.className)}>
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
            eyebrow="Walumo in action"
            title="People first,"
            accent="then software"
            text="Real teams, real workshops, real builders. Walumo is a team on the ground — implementing with clients and growing the next generation of African tech talent."
          />
          <TextLink href="/insights/events/walumo-hacklab" className="shrink-0">
            See the Hacklab
          </TextLink>
        </div>
        <ul className="mt-12 grid auto-rows-[240px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[260px]">
          {tiles.slice(0, 4).map((t, i) => (
            <PhotoTile key={t.src} tile={t} delay={i * 90} />
          ))}
          <Reveal as="li" variant="scale" delay={360} className="h-full">
            <Link
              href="/contact"
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-card)] bg-ink p-6 text-white"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-accent/25 blur-3xl transition-[scale] duration-700 group-hover:scale-150"
                aria-hidden="true"
              />
              <LogoMark size={34} className="relative" />
              <div className="relative">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent">Headquartered in Nairobi</p>
                <p className="mt-2 font-serif text-[1.65rem] leading-tight">Built in Africa, for African organisations</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-accent">
                  Visit us
                  <ArrowUpRight size={14} className="transition-[translate] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
          {tiles.slice(4).map((t, i) => (
            <PhotoTile key={t.src} tile={t} delay={450 + i * 90} />
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Delivery timeline: a line draws itself as the steps scroll past     */
/* ------------------------------------------------------------------ */

export function Timeline({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <div className="relative">
      {/* track + animated fill */}
      <div className="absolute bottom-6 left-[23px] top-6 w-px bg-line" aria-hidden="true">
        <ScrollLine />
      </div>
      <ol className="relative">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.title} variant="left" delay={i * 60} className="relative pb-6 pl-16 last:pb-0">
            <span className="absolute left-0 top-1 flex size-12 items-center justify-center rounded-full border border-line bg-white font-serif text-lg text-accent-strong shadow-card">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="rounded-[var(--radius-card)] border border-transparent p-5 transition-[background-color,border-color,box-shadow] duration-300 hover:border-line hover:bg-white hover:shadow-card">
              <h3 className="text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-1.5 text-[15px] leading-6 text-muted">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
