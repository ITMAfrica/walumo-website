import type { Metadata } from "next";
import { StoriesComingSoon, TrustedStrip } from "@/components/sections/social-proof";
import { CtaBanner, StatsBand } from "@/components/sections/blocks";
import { Container, Eyebrow, Section } from "@/components/ui/primitives";
import { proofStats } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case studies",
  description: "Customer stories from organisations running Walumo's Kazi Pro, Talent Pro and Sales Tracker.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-white to-surface">
        <Container size="narrow" className="py-16 text-center sm:py-20">
          <Eyebrow>Case studies</Eyebrow>
          <h1 className="mt-6 animate-fade-up font-serif text-5xl tracking-[-0.02em] text-ink sm:text-6xl">
            Results from teams <em className="italic text-accent-strong">running Walumo</em>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg">
            Kazi Pro was proven inside the ITM Holding group before external rollout. Detailed customer stories are being prepared
            with our clients.
          </p>
          <StoriesComingSoon className="mt-12 text-left sm:text-center" />
        </Container>
      </section>

      <TrustedStrip />

      <Section tone="fade">
        <StatsBand title="Where Walumo runs today" stats={proofStats} />
      </Section>

      <CtaBanner title="Want to see Walumo on a real operation?" text="Request a demo and ask for a reference call with a team already using our products." />
    </>
  );
}
