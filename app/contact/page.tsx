import type { Metadata } from "next";
import { Suspense } from "react";
import { TrustBadge, TrustedStrip } from "@/components/sections/social-proof";
import { Steps } from "@/components/sections/blocks";
import { Button, CheckList, Container, Eyebrow, Section, SectionHeading } from "@/components/ui/primitives";
import { Mail, MapPin, SocialIcon } from "@/components/ui/icons";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import { DemoForm } from "@/components/pages/forms/demo-form";
import { site, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a demo",
  description:
    "Tell us what you want to solve. We will connect you with the right Walumo product or implementation expert — or message us on WhatsApp.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-white via-surface to-surface">
        <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_1.05fr] lg:py-20">
          <div className="animate-fade-up">
            <TrustBadge />
            <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[3.4rem]">
              Request a demo, <em className="italic text-accent-strong">or reach us</em>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-lg">
              Tell us what you want to solve. We will connect you with the right Walumo product or implementation expert.
            </p>
            <CheckList
              className="mt-8"
              items={[
                "A walkthrough of Kazi Pro, Talent Pro or Sales Tracker on your use case",
                "A clear implementation path: migration, training and support",
                "A proposal adapted to your organisation and next step",
              ]}
            />

            <div id="whatsapp" className="mt-10 scroll-mt-28 rounded-[var(--radius-card)] bg-ink p-6 text-white">
              <p className="font-serif text-2xl">Prefer to chat?</p>
              <p className="mt-2 text-[15px] text-white/70">Message us on WhatsApp and talk to a real person today.</p>
              {site.whatsappCta.href.startsWith("https://wa.me") ? (
                <Button href={site.whatsappCta.href} variant="light" className="mt-5" arrow>
                  Chat on WhatsApp
                </Button>
              ) : (
                <p className="mt-5 text-[13.5px] text-white/60">
                  Our WhatsApp line is being set up. In the meantime, email us at{" "}
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
                    aria-label={`${site.name} on ${s.label}`}
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
              <Eyebrow>Request a demo</Eyebrow>
              <p className="mt-3 text-[15px] text-muted">Required fields are marked with *.</p>
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
          <SectionHeading eyebrow="What happens next" title="From first message to your demo" />
          <div className="mt-14">
            <Steps
              steps={[
                { title: "We read your request", text: "Your request is routed to the right product or implementation team." },
                { title: "We schedule a call", text: "A member of the Walumo team contacts you to agree on a time." },
                { title: "We show you the product", text: "A demo on your use case, followed by a clear proposal and next step." },
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section tone="surface" className="pt-0 sm:pt-0">
        <Container>
          <div className="grid overflow-hidden rounded-[var(--radius-card)] bg-white shadow-card lg:grid-cols-2">
            <PhotoPlaceholder src="/images/office-nairobi.jpg" alt="Walumo office in Nairobi" sizes="(max-width: 1024px) 100vw, 50vw" className="min-h-[280px]" />
            <div className="p-8 sm:p-10">
              <Eyebrow>Office</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl text-ink">Nairobi Headquarters</h2>
              <p className="mt-3 text-[15px] leading-7 text-muted">{site.addressShort}</p>
              <Button
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Highway Heights, Marcus Garvey Road, Kilimani, Nairobi")}`}
                variant="outline"
                size="sm"
                className="mt-6"
              >
                Open in Google Maps
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
