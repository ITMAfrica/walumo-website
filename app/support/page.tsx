import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CtaBanner, FeatureGrid, Steps } from "@/components/sections/blocks";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { deliverySteps } from "@/lib/content";
import { hasWhatsapp, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description: "Implementation, training and ongoing support for Kazi Pro, Talent Pro and Sales Tracker.",
};

export default function SupportPage() {
  return (
    <>
      <Hero
        eyebrow="Support"
        title="We stay until"
        accent="the outcomes land"
        text="Walumo supports you through implementation, adoption and beyond — with people you can reach, not just a ticket number."
        primary={{ label: "Contact support", href: "/contact" }}
        secondary={site.whatsappCta}
      />

      <Section tone="surface">
        <Container>
          <SectionHeading title="How we support you" />
          <div className="mt-14">
            <FeatureGrid
              columns={4}
              items={[
                { icon: "rocket", title: "Implementation", text: "Configuration, data migration and go-live with your team." },
                { icon: "graduation", title: "Training", text: "Sessions for administrators, managers and everyday users." },
                { icon: "handshake", title: "Adoption", text: "Close support in the first weeks so the new way of working sticks." },
                { icon: "shield", title: "Managed services", text: "Continuous optimisation, technical support and enterprise service agreements." },
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Delivery" title="From first workshop to ongoing support" />
          <div className="mt-14">
            <Steps steps={deliverySteps} />
          </div>
        </Container>
      </Section>

      <CtaBanner title="Need help with your Walumo setup?" text={`Email ${site.email}${hasWhatsapp ? " or message us on WhatsApp" : " or use the contact form"} — a real person will answer.`} />
    </>
  );
}
