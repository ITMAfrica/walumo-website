import type { Metadata } from "next";
import { Suspense } from "react";
import { TrustBadge, TrustedStrip } from "@/components/sections/social-proof";
import { Steps } from "@/components/sections/blocks";
import { Button, CheckList, Container, Eyebrow, Section, SectionHeading } from "@/components/ui/primitives";
import { Mail, MapPin, SocialIcon } from "@/components/ui/icons";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import { DemoForm } from "@/components/pages/forms/demo-form";
import { tr, type Locale } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { siteFor } from "@/lib/i18n-data";
import { socials } from "@/lib/site";

function alternates(path: string, lang: Locale) {
  const en = `${siteFor("en").site.url}${path}`;
  const fr = `${siteFor("en").site.url}/fr${path}`;
  return { canonical: lang === "fr" ? fr : en, languages: { en, fr, "x-default": en } };
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
    title: tr(lang, "Request a demo", "Demander une démo"),
    description: tr(
      lang,
      "Tell us what you want to solve. We will connect you with the right Walumo product or implementation expert — or message us on WhatsApp.",
      "Dites-nous ce que vous voulez résoudre. Nous vous mettrons en relation avec le bon expert produit ou déploiement Walumo — ou écrivez-nous sur WhatsApp.",
    ),
    alternates: alternates("/contact", lang),
  };
}

export default async function ContactPage() {
  const lang = await getLang();
  const { site } = siteFor(lang);
  return (
    <>
      <section className="fluted">
        <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_1.05fr] lg:py-20">
          <div className="animate-fade-up">
            <TrustBadge />
            <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[3.4rem]">
              {tr(lang, "Request a demo, ", "Demandez une démo, ")}<em className="not-italic">{tr(lang, "or reach us", "ou contactez-nous")}</em>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-lg">
              {tr(
                lang,
                "Tell us what you want to solve. We will connect you with the right Walumo product or implementation expert.",
                "Dites-nous ce que vous voulez résoudre. Nous vous mettrons en relation avec le bon expert produit ou déploiement Walumo.",
              )}
            </p>
            <CheckList
              className="mt-8"
              items={[
                tr(lang, "A walkthrough of Kazi Pro, Talent Pro or Sales Tracker on your use case", "Une présentation de Kazi Pro, Talent Pro ou Sales Tracker adaptée à votre cas d'usage"),
                tr(lang, "A clear implementation path: migration, training and support", "Un parcours de déploiement clair : migration, formation et accompagnement"),
                tr(lang, "A proposal adapted to your organisation and next step", "Une proposition adaptée à votre organisation, avec la prochaine étape"),
              ]}
            />

            <div id="whatsapp" className="mt-10 scroll-mt-28 rounded-[var(--radius-card)] bg-ink p-6 text-white">
              <p className="font-serif text-2xl">{tr(lang, "Prefer to chat?", "Vous préférez discuter ?")}</p>
              <p className="mt-2 text-[15px] text-white/70">
                {tr(lang, "Message us on WhatsApp and talk to a real person today.", "Écrivez-nous sur WhatsApp et échangez dès aujourd'hui avec une vraie personne.")}
              </p>
              {site.whatsappCta.href.startsWith("https://wa.me") ? (
                <Button href={site.whatsappCta.href} variant="light" className="mt-5" arrow>
                  {tr(lang, "Chat on WhatsApp", "Discuter sur WhatsApp")}
                </Button>
              ) : (
                <p className="mt-5 text-[13.5px] text-white/60">
                  {tr(lang, "Our WhatsApp line is being set up. In the meantime, email us at", "Notre ligne WhatsApp est en cours de mise en place. En attendant, écrivez-nous à")}{" "}
                  <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-2">
                    {site.email}
                  </a>
                  .
                </p>
              )}
            </div>

            <ul className="mt-10 space-y-3 text-[15px] text-ink-soft">
              <li className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-accent-strong" />
                {site.address}
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-accent-strong" />
                <a href={`mailto:${site.email}`} className="hover:text-ink">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-4 pt-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={tr(lang, `${site.name} on ${s.label}`, `${site.name} sur ${s.label}`)}
                    className="flex size-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:bg-ink hover:text-white"
                  >
                    <SocialIcon name={s.icon} size={17} />
                  </a>
                ))}
              </li>
            </ul>
          </div>
          <div className="animate-fade-up [animation-delay:120ms] lg:pt-4">
            <div className="rounded-[1.5rem] bg-white p-6 shadow-float sm:p-8 lg:sticky lg:top-28">
              <Eyebrow>{tr(lang, "Request a demo", "Demander une démo")}</Eyebrow>
              <p className="mt-3 text-[15px] text-muted">{tr(lang, "Required fields are marked with *.", "Les champs obligatoires sont indiqués par *.")}</p>
              <div className="mt-6">
                <Suspense fallback={<div className="h-[560px]" aria-hidden="true" />}>
                  <DemoForm />
                </Suspense>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <TrustedStrip />

      <Section>
        <Container>
          <SectionHeading eyebrow={tr(lang, "What happens next", "La suite")} title={tr(lang, "From first message to your demo", "De votre premier message à votre démo")} />
          <div className="mt-14">
            <Steps
              steps={[
                {
                  title: tr(lang, "We read your request", "Nous lisons votre demande"),
                  text: tr(lang, "Your request is routed to the right product or implementation team.", "Votre demande est transmise à l'équipe produit ou déploiement concernée."),
                },
                {
                  title: tr(lang, "We schedule a call", "Nous planifions un appel"),
                  text: tr(lang, "A member of the Walumo team contacts you to agree on a time.", "Un membre de l'équipe Walumo vous contacte pour convenir d'un créneau."),
                },
                {
                  title: tr(lang, "We show you the product", "Nous vous présentons le produit"),
                  text: tr(lang, "A demo on your use case, followed by a clear proposal and next step.", "Une démo sur votre cas d'usage, suivie d'une proposition claire et de la prochaine étape."),
                },
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section tone="surface" className="pt-0 sm:pt-0">
        <Container>
          <div className="grid overflow-hidden rounded-[var(--radius-card)] bg-white shadow-card lg:grid-cols-2">
            <PhotoPlaceholder src="/images/office-nairobi.jpg" alt={tr(lang, "Walumo office in Nairobi", "Bureau de Walumo à Nairobi")} sizes="(max-width: 1024px) 100vw, 50vw" className="min-h-[280px]" />
            <div className="p-8 sm:p-10">
              <Eyebrow>{tr(lang, "Office", "Bureau")}</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl text-ink">{tr(lang, "Nairobi Headquarters", "Siège de Nairobi")}</h2>
              <p className="mt-3 text-[15px] leading-7 text-muted">{site.addressShort}</p>
              <Button
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Highway Heights, Marcus Garvey Road, Kilimani, Nairobi")}`}
                variant="outline"
                size="sm"
                className="mt-6"
              >
                {tr(lang, "Open in Google Maps", "Ouvrir dans Google Maps")}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
