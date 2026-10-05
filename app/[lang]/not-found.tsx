import Link from "@/components/ui/link";
import { Button, Container } from "@/components/ui/primitives";
import { ArrowRight } from "@/components/ui/icons";
import { tr } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";

export default async function NotFound() {
  const lang = await getLang();
  const popular = [
    { label: tr(lang, "Product ecosystem", "Écosystème de produits"), href: "/products" },
    { label: "Kazi Pro", href: "/products/kazi-pro" },
    { label: tr(lang, "Solutions", "Solutions"), href: "/solutions" },
    { label: tr(lang, "Insights", "Analyses"), href: "/insights" },
  ];
  return (
    <section className="fluted">
      <Container size="narrow" className="py-24 text-center sm:py-32">
        <p className="font-serif text-[7rem] leading-none tracking-[-0.04em] text-ink sm:text-[10rem]">
          4<em className="not-italic">0</em>4
        </p>
        <h1 className="mt-6 font-serif text-3xl text-ink sm:text-4xl">{tr(lang, "This page could not be found", "Cette page est introuvable")}</h1>
        <p className="mx-auto mt-4 max-w-md text-base text-muted">
          {tr(
            lang,
            "The link may be wrong or the page may have moved. Here are a few places to continue.",
            "Le lien est peut-être incorrect ou la page a peut-être été déplacée. Voici quelques pistes pour poursuivre.",
          )}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/" arrow>
            {tr(lang, "Back to home", "Retour à l'accueil")}
          </Button>
          <Button href="/contact" variant="outline">
            {tr(lang, "Contact us", "Nous contacter")}
          </Button>
        </div>
        <ul className="mx-auto mt-14 grid max-w-lg gap-2 text-left sm:grid-cols-2">
          {popular.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="group flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink hover:border-ink"
              >
                {p.label}
                <ArrowRight size={15} className="text-accent-strong transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
