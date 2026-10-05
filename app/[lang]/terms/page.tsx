import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage, legalMetadata, type LegalSection } from "@/components/pages/legal/legal-page";
import { hasLocale, tr, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/terms">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return legalMetadata(
    lang,
    "/terms",
    tr(lang, "Terms of use", "Conditions d'utilisation"),
    tr(lang, "The terms that govern the use of the Walumo website.", "Les conditions qui régissent l'utilisation du site web de Walumo."),
  );
}

function getSections(lang: Locale): LegalSection[] {
  if (lang === "fr") {
    return [
      {
        id: "scope",
        title: "Champ d'application",
        body: (
          <p>
            Les présentes conditions régissent votre utilisation de ce site web. L&apos;utilisation des produits Walumo (Kazi Pro,
            Talent Pro, Sales Tracker) est régie par le contrat distinct signé avec chaque client.
          </p>
        ),
      },
      {
        id: "publisher",
        title: "Éditeur",
        body: <p>Ce site web est édité par Walumo, [raison sociale, numéro d&apos;immatriculation et adresse du siège].</p>,
      },
      {
        id: "use",
        title: "Utilisation du site web",
        body: (
          <p>
            Vous vous engagez à utiliser le site web de manière licite et à ne pas en perturber le fonctionnement. Nous pouvons
            modifier ou interrompre le site web à tout moment, par exemple pour des opérations de maintenance.
          </p>
        ),
      },
      {
        id: "ip",
        title: "Propriété intellectuelle",
        body: (
          <p>
            Le nom Walumo, le logo, les noms de produits, les textes, les visuels et les logiciels présentés sur ce site web sont
            protégés. Ils ne peuvent être reproduits sans autorisation écrite préalable.
          </p>
        ),
      },
      {
        id: "liability",
        title: "Responsabilité",
        body: (
          <p>
            Les informations figurant sur ce site web sont fournies à titre général. Walumo n&apos;est pas responsable des sites
            web de tiers vers lesquels ce site renvoie.
          </p>
        ),
      },
      {
        id: "law",
        title: "Droit applicable",
        body: (
          <p>
            Les présentes conditions sont régies par le droit de [pays]. Tout litige sera soumis aux tribunaux de [ville].
          </p>
        ),
      },
    ];
  }
  return [
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
}

export default async function TermsPage({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <LegalPage
      lang={lang}
      eyebrow={tr(lang, "Legal", "Mentions légales")}
      title={tr(lang, "Terms of use", "Conditions d'utilisation")}
      updated={tr(lang, "30 September 2026", "30 septembre 2026")}
      intro={<p>{tr(lang, "Please read these terms before using the website.", "Veuillez lire les présentes conditions avant d'utiliser le site web.")}</p>}
      sections={getSections(lang)}
    />
  );
}
