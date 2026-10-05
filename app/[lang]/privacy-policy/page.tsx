import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage, legalMetadata, type LegalSection } from "@/components/pages/legal/legal-page";
import { hasLocale, tr, type Locale } from "@/lib/i18n";
import { siteFor } from "@/lib/i18n-data";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy-policy">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return legalMetadata(
    lang,
    "/privacy-policy",
    tr(lang, "Privacy policy", "Politique de confidentialité"),
    tr(
      lang,
      "How Walumo collects, uses and protects personal data submitted through this website.",
      "Comment Walumo collecte, utilise et protège les données personnelles transmises via ce site web.",
    ),
  );
}

function getSections(lang: Locale): LegalSection[] {
  const { site } = siteFor(lang);
  if (lang === "fr") {
    return [
      {
        id: "who-we-are",
        title: "Qui sommes-nous",
        body: (
          <p>
            Ce site web est exploité par Walumo, la branche technologique d&apos;ITM Holding, [raison sociale et numéro
            d&apos;immatriculation], dont le siège est situé à l&apos;adresse suivante : {site.address}.
          </p>
        ),
      },
      {
        id: "data-we-collect",
        title: "Données que nous collectons",
        body: (
          <>
            <p>Selon l&apos;usage que vous faites du site web, nous pouvons collecter :</p>
            <ul>
              <li>
                les coordonnées que vous renseignez dans nos formulaires : nom, adresse e-mail professionnelle, entreprise,
                fonction et taille de l&apos;entreprise ;
              </li>
              <li>le contenu de votre message ainsi que le produit ou la solution qui vous intéresse ;</li>
              <li>
                des données techniques, telles que les pages consultées et le type d&apos;appareil, collectées avec votre
                consentement lorsque celui-ci est requis.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "how-we-use-it",
        title: "Utilisation de vos données",
        body: (
          <ul>
            <li>pour répondre à votre demande de démonstration ou de renseignements et la transmettre à l&apos;équipe compétente ;</li>
            <li>pour vous envoyer les rapports ou les lettres d&apos;information que vous avez demandés ;</li>
            <li>pour comprendre comment le site web est utilisé et l&apos;améliorer ;</li>
            <li>pour respecter nos obligations légales.</li>
          </ul>
        ),
      },
      {
        id: "legal-basis",
        title: "Base juridique",
        body: (
          <p>
            Nous nous fondons sur votre consentement, sur l&apos;exécution de mesures précontractuelles prises à votre demande,
            sur notre intérêt légitime à exploiter et à améliorer notre site web, ou sur le respect d&apos;obligations légales,
            selon le traitement concerné.
          </p>
        ),
      },
      {
        id: "sharing",
        title: "Destinataires de vos données",
        body: (
          <p>
            Vos données sont accessibles au personnel autorisé de Walumo et d&apos;ITM Holding et, lorsque cela est nécessaire,
            aux prestataires de services agissant pour notre compte (hébergement, messagerie électronique, gestion de la
            relation client). Nous ne vendons pas vos données personnelles.
          </p>
        ),
      },
      {
        id: "retention",
        title: "Durée de conservation",
        body: (
          <p>
            Nous conservons les données relatives aux demandes pendant [durée de conservation] après notre dernier contact, sauf
            si la loi exige une durée plus longue.
          </p>
        ),
      },
      {
        id: "your-rights",
        title: "Vos droits",
        body: (
          <p>
            Sous réserve de la loi applicable, vous pouvez demander l&apos;accès à vos données personnelles, leur rectification
            ou leur suppression, vous opposer à leur traitement ou retirer votre consentement à tout moment, en écrivant à{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        ),
      },
      {
        id: "contact",
        title: "Contact",
        body: (
          <p>
            Pour toute question relative à la protection de vos données, veuillez contacter [contact en charge de la protection
            des données] à l&apos;adresse <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        ),
      },
    ];
  }
  return [
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
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy-policy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <LegalPage
      lang={lang}
      eyebrow={tr(lang, "Legal", "Mentions légales")}
      title={tr(lang, "Privacy policy", "Politique de confidentialité")}
      updated={tr(lang, "30 September 2026", "30 septembre 2026")}
      intro={
        <p>
          {tr(
            lang,
            "We use your details only to respond to your enquiry and to provide the services you ask for.",
            "Nous utilisons vos informations uniquement pour répondre à votre demande et fournir les services que vous sollicitez.",
          )}
        </p>
      }
      sections={getSections(lang)}
    />
  );
}
