import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/pages/legal/legal-page";

export const metadata: Metadata = {
  title: "Security & data protection",
  description: "How Walumo approaches security, access control, data protection and support across Kazi Pro, Talent Pro and Sales Tracker.",
};

// Keep this page factual: only add specific technical claims (hosting, encryption, backups, uptime)
// once they are confirmed in writing by Walumo's IT team.
const sections: LegalSection[] = [
  {
    id: "approach",
    title: "Our approach",
    body: (
      <p>
        Walumo builds business software that holds sensitive employee, candidate and customer information. Security and data
        protection are part of how we design, implement and support every product, not an afterthought.
      </p>
    ),
  },
  {
    id: "access",
    title: "Access control",
    body: (
      <>
        <p>Across the suite, access is organised around roles and entities:</p>
        <ul>
          <li>users only see the information their role requires;</li>
          <li>approval chains are configured per organisation and per entity;</li>
          <li>administrators manage users and permissions from a common admin area.</li>
        </ul>
      </>
    ),
  },
  {
    id: "data",
    title: "Data protection",
    body: (
      <p>
        We process personal data in line with applicable data protection laws in the countries where our clients operate. Our{" "}
        <a href="/privacy-policy">privacy policy</a> explains how we handle personal data collected through this website.
      </p>
    ),
  },
  {
    id: "implementation",
    title: "Secure implementation",
    body: (
      <p>
        Data migration, configuration and user onboarding are carried out with your team during implementation, so that access
        rights and data are checked before go-live.
      </p>
    ),
  },
  {
    id: "support",
    title: "Support & incident handling",
    body: (
      <p>
        Clients can reach Walumo support through their dedicated channels. Security questions or concerns are escalated to our
        technical team. See our <a href="/support">support page</a> for details.
      </p>
    ),
  },
  {
    id: "documentation",
    title: "Security documentation",
    body: (
      <p>
        Enterprise and public-sector buyers can request our security documentation as part of their evaluation. Contact us at{" "}
        <a href="mailto:info@walumoafrica.com">info@walumoafrica.com</a>.
      </p>
    ),
  },
];

export default function SecurityPage() {
  return (
    <LegalPage
      title="Security & data protection"
      updated="30 September 2026"
      intro={<p>How we protect the people, hiring and sales data our clients trust us with.</p>}
      sections={sections}
    />
  );
}
