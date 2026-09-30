import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/pages/legal/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Walumo collects, uses and protects personal data submitted through this website.",
};

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <p>
        This website is operated by Walumo, the technology arm of ITM Holding, [legal entity name and registration number],
        with its headquarters at {site.address}.
      </p>
    ),
  },
  {
    id: "data-we-collect",
    title: "Data we collect",
    body: (
      <>
        <p>Depending on how you use the website, we may collect:</p>
        <ul>
          <li>contact details you submit in our forms: name, work email, company, role and company size;</li>
          <li>the content of your message and the product or solution you are interested in;</li>
          <li>technical data such as pages visited and device type, collected with your consent where required.</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use your data",
    body: (
      <ul>
        <li>to respond to your demo request or enquiry and route it to the right team;</li>
        <li>to send you reports or newsletters you have asked for;</li>
        <li>to understand how the website is used and improve it;</li>
        <li>to meet our legal obligations.</li>
      </ul>
    ),
  },
  {
    id: "legal-basis",
    title: "Legal basis",
    body: (
      <p>
        We rely on your consent, on steps taken at your request before entering into a contract, on our legitimate interest in
        running and improving our website, or on legal obligations — depending on the processing concerned.
      </p>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: (
      <p>
        Your data is accessed by authorised Walumo and ITM Holding staff and, where necessary, by service providers acting on our
        behalf (hosting, email, customer relationship management). We do not sell your personal data.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: <p>We keep enquiry data for [retention period] after our last contact, unless a longer period is required by law.</p>,
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <p>
        Subject to applicable law, you can request access to, correction or deletion of your personal data, object to its
        processing or withdraw your consent at any time by writing to <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        For any privacy question, contact [data protection contact] at <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      updated="30 September 2026"
      intro={<p>We use your details only to respond to your enquiry and to provide the services you ask for.</p>}
      sections={sections}
    />
  );
}
