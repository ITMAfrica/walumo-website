import { events } from "@/lib/content";
import { Button, Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { PhotoPlaceholder } from "@/components/ui/visuals";

const hacklab = events[0];

/** Real Hacklab photos: the human side of Walumo on the home page. */
const collage = [
  { src: "/images/hackathon/img_2026.jpg", alt: "Participants of the Walumo Hacklab gathered for a group photo", span: "col-span-2 aspect-[16/8]" },
  { src: "/images/hackathon/img_1888.jpg", alt: "A team demoing their project at the Walumo Hacklab", span: "aspect-[4/3]" },
  { src: "/images/hackathon/img_2043.jpg", alt: "Walumo Hacklab organisers and participants", span: "aspect-[4/3]" },
];

export function HacklabSection() {
  return (
    <Section tone="surface">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Walumo Hacklab"
            title="Building Africa's next generation of"
            accent="tech talent"
            text={hacklab.summary}
          />
          {hacklab.highlights && (
            <dl className="mt-8 grid max-w-md grid-cols-3 gap-4">
              {hacklab.highlights.map((h) => (
                <div key={h.label} className="border-l border-line pl-4">
                  <dt className="sr-only">{h.label}</dt>
                  <dd className="font-serif text-4xl tracking-[-0.03em] text-ink">{h.value}</dd>
                  <dd className="mt-1 text-[14px] text-muted">{h.label}</dd>
                </div>
              ))}
            </dl>
          )}
          <Button href={`/insights/events/${hacklab.slug}`} variant="outline" arrow className="mt-8">
            See the Hacklab highlights
          </Button>
        </div>
        <Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {collage.map((p, i) => (
              <PhotoPlaceholder
                key={p.src}
                src={p.src}
                alt={p.alt}
                sizes={i === 0 ? "(max-width: 1024px) 100vw, 55vw" : "(max-width: 1024px) 50vw, 28vw"}
                className={`${p.span} rounded-[var(--radius-card)] transition-transform duration-500 hover:scale-[1.02] [&_img]:transition-transform [&_img]:duration-700 hover:[&_img]:scale-105`}
              />
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
