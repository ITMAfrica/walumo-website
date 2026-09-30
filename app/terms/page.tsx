import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/pages/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The terms that govern the use of the Walumo website.",
};

const sections: LegalSection[] = [
  {
    id: "scope",
    title: "Scope",
    body: (
      <p>
        These terms govern your use of this website. Use of Walumo products (Kazi Pro, Talent Pro, Sales Tracker) is governed by
        the separate agreement signed with each client.
      </p>
    ),
  },
  {
    id: "publisher",
    title: "Publisher",
    body: <p>This website is published by Walumo, [legal entity name, registration number and registered address].</p>,
  },
  {
    id: "use",
    title: "Use of the website",
    body: (
      <p>
        You agree to use the website lawfully and not to disrupt its operation. We may update or interrupt the website at any
        time, for example for maintenance.
      </p>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <p>
        The Walumo name, logo, product names, texts, visuals and software shown on this website are protected. They may not be
        reproduced without prior written permission.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Liability",
    body: (
      <p>
        Information on this website is provided for general purposes. Walumo is not responsible for third-party websites linked
        from this site.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: <p>These terms are governed by the laws of [country]. Any dispute will be submitted to the courts of [city].</p>,
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of use"
      updated="30 September 2026"
      intro={<p>Please read these terms before using the website.</p>}
      sections={sections}
    />
  );
}
