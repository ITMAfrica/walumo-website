import Link from "next/link";
import { Button, Container } from "@/components/ui/primitives";
import { ArrowRight } from "@/components/ui/icons";

const popular = [
  { label: "Product ecosystem", href: "/products" },
  { label: "Kazi Pro", href: "/products/kazi-pro" },
  { label: "Solutions", href: "/solutions" },
  { label: "Insights", href: "/insights" },
];

export default function NotFound() {
  return (
    <section className="bg-gradient-to-b from-white to-surface">
      <Container size="narrow" className="py-24 text-center sm:py-32">
        <p className="font-serif text-[7rem] leading-none tracking-[-0.04em] text-ink sm:text-[10rem]">
          4<em className="italic text-accent-strong">0</em>4
        </p>
        <h1 className="mt-6 font-serif text-3xl text-ink sm:text-4xl">This page could not be found</h1>
        <p className="mx-auto mt-4 max-w-md text-base text-muted">
          The link may be wrong or the page may have moved. Here are a few places to continue.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/" arrow>
            Back to home
          </Button>
          <Button href="/contact" variant="outline">
            Contact us
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
