import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/pages/legal/legal-page";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: "How the Walumo website uses cookies and how to manage your preferences.",
};

const sections: LegalSection[] = [
  {
    id: "what",
    title: "What cookies are",
    body: <p>Cookies are small files stored on your device when you visit a website. They help the site work and help us understand how it is used.</p>,
  },
  {
    id: "which",
    title: "Cookies we use",
    body: (
      <ul>
        <li>
          <strong>Strictly necessary</strong> — required for the website to function; they cannot be switched off.
        </li>
        <li>
          <strong>Analytics</strong> — help us measure visits and improve pages; only set with your consent. [List the analytics
          tool used.]
        </li>
      </ul>
    ),
  },
  {
    id: "manage",
    title: "Managing your preferences",
    body: <p>You can accept or refuse non-essential cookies at any time, and delete cookies from your browser settings.</p>,
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: <p>We may update this policy when our use of cookies changes. The date at the top of the page shows the latest version.</p>,
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie policy"
      updated="30 September 2026"
      intro={<p>How and why the Walumo website uses cookies.</p>}
      sections={sections}
    />
  );
}
