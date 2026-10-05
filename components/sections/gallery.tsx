import Link from "@/components/ui/link";
import { Container, Section, SectionHeading, TextLink, cn } from "@/components/ui/primitives";
import { ArrowUpRight } from "@/components/ui/icons";
import { Reveal, ScrollLine } from "@/components/ui/reveal";
import { getLang } from "@/lib/i18n-server";
import { tr, type Locale } from "@/lib/i18n";
import { LogoMark } from "@/components/ui/logo";
import { PhotoShowcase } from "@/components/sections/photo-showcase";

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

const tilesFor = (lang: Locale): Tile[] => [
  {
    src: "/images/team-workshop.jpg",
    alt: tr(lang, "A Walumo implementation workshop with a client team", "Un atelier de mise en œuvre Walumo avec l'équipe d'un client"),
    label: tr(lang, "Implementation", "Mise en œuvre"),
    caption: tr(lang, "Workshops with client teams, from first login to full adoption", "Des ateliers avec les équipes clientes, de la première connexion à l'adoption complète"),
    href: "/what-we-do",
    className: "sm:col-span-2 lg:row-span-2",
  },
  {
    src: "/images/hackathon/img_1897.jpg",
    alt: tr(lang, "Walumo Hacklab participants in front of the Hacklab backdrop", "Des participants du Walumo Hacklab devant le fond Hacklab"),
    label: "Walumo Hacklab",
    caption: tr(lang, "Spotlighting Africa's emerging tech talent", "Mettre en lumière les talents tech émergents d'Afrique"),
    href: "/insights/events/walumo-hacklab",
    className: "sm:col-span-2",
  },
  {
    src: "/images/hackathon/img_1798.jpg",
    alt: tr(lang, "Hacklab participants building on a laptop", "Des participants du Hacklab au travail sur un ordinateur portable"),
    label: tr(lang, "Build", "Création"),
    caption: tr(lang, "Teams building real solutions", "Des équipes qui créent de vraies solutions"),
    href: "/insights/events/walumo-hacklab",
    className: "",
  },
  {
    src: "/images/hackathon/img_2546.jpg",
    alt: tr(lang, "A Hacklab participant pitching a solution on stage", "Un participant du Hacklab présente sa solution sur scène"),
    label: tr(lang, "Pitch", "Pitch"),
    caption: tr(lang, "Ideas pitched and demoed live", "Des idées présentées et démontrées en direct"),
    href: "/insights/events/walumo-hacklab",
    className: "",
  },
  {
    src: "/images/hackathon/img_2043.jpg",
    alt: tr(lang, "Three people smiling in front of the Walumo Hacklab backdrop", "Trois personnes souriantes devant le fond du Walumo Hacklab"),
    label: "Hacklab",
    caption: tr(lang, "Celebrating the builders and their ideas", "Célébrer ceux qui construisent et leurs idées"),
    href: "/insights/events/walumo-hacklab",
    className: "",
  },
  {
    src: "/images/hackathon/img_1866.jpg",
    alt: tr(lang, "A Hacklab team in Walumo t-shirts", "Une équipe du Hacklab en t-shirts Walumo"),
    label: tr(lang, "Community", "Communauté"),
    caption: tr(lang, "Developers, designers and product thinkers", "Développeurs, designers et experts produit"),
    href: "/insights/events/walumo-hacklab",
    className: "sm:col-span-2",
  },
];

export async function PeopleBento() {
  const lang = await getLang();
  const tiles = tilesFor(lang);
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow={tr(lang, "Walumo in action", "Walumo en action")}
            title={tr(lang, "People first,", "Les personnes d'abord,")}
            accent={tr(lang, "then software", "le logiciel ensuite")}
            text={tr(
              lang,
              "Real teams, real workshops, real builders. Walumo is a team on the ground — implementing with clients and growing the next generation of African tech talent.",
              "De vraies équipes, de vrais ateliers, de vrais bâtisseurs. Walumo est une équipe de terrain : elle déploie ses solutions avec ses clients et forme la prochaine génération de talents tech africains.",
            )}
          />
          <TextLink href="/insights/events/walumo-hacklab" className="shrink-0">
            {tr(lang, "See the Hacklab", "Découvrir le Hacklab")}
          </TextLink>
        </div>
      </Container>
        <PhotoShowcase
          cta={tr(lang, "See more", "En savoir plus")}
          slides={tiles.map((t) => ({ src: t.src, alt: t.alt, title: t.label, text: t.caption, href: t.href }))}
        />
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
