import Link from "next/link";
import { footerGroups, legalLinks, site, socials } from "@/lib/site";
import { Logo } from "@/components/ui/logo";
import { Mail, MapPin, SocialIcon } from "@/components/ui/icons";
import { NewsletterForm } from "./newsletter-form";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        {/* Newsletter */}
        <div className="flex flex-col gap-6 border-b border-white/10 py-14 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="font-serif text-3xl leading-tight sm:text-[2.1rem]">
              Ideas and evidence for African business leaders.
            </p>
            <p className="mt-3 text-[15px] text-white/60">
              Practical guidance on running and scaling a business in Africa. Unsubscribe in one click.
            </p>
          </div>
          <NewsletterForm dark />
        </div>

        {/* Link groups */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:grid-cols-3 lg:grid-cols-6">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="text-[13px] text-white/50">{group.title}</p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="text-[15px] text-white/90 transition-colors hover:text-accent">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <p className="text-[13px] text-white/50">Contact</p>
            <ul className="mt-4 space-y-3 text-[15px] text-white/90">
              <li className="flex gap-2">
                <MapPin size={17} className="mt-0.5 shrink-0 text-accent" />
                <span className="text-white/70">{site.address}</span>
              </li>
              <li className="flex gap-2">
                <Mail size={17} className="mt-0.5 shrink-0 text-accent" />
                <a href={`mailto:${site.email}`} className="hover:text-accent">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.whatsappCta.href} className="font-medium text-accent hover:text-white">
                  Chat on WhatsApp →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-6 border-t border-white/10 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <Logo light />
            {legalLinks.map((l) => (
              <span key={l.href} className="flex items-center gap-4 text-sm">
                <span className="text-white/30" aria-hidden="true">
                  +
                </span>
                <Link href={l.href} className="text-white/80 hover:text-white">
                  {l.label}
                </Link>
              </span>
            ))}
          </div>
          <ul className="flex items-center gap-5">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={`${site.name} on ${s.label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 transition-colors hover:text-accent"
                >
                  <SocialIcon name={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="pb-10 text-[13px] text-white/45">
          © {new Date().getFullYear()} {site.name}. The technology arm of ITM Holding.
        </p>
      </div>
    </footer>
  );
}
