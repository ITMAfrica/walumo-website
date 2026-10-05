import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage, legalMetadata, type LegalSection } from "@/components/pages/legal/legal-page";
import { hasLocale, tr, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/cookie-policy">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return legalMetadata(
    lang,
    "/cookie-policy",
    tr(lang, "Cookie policy", "Politique relative aux cookies"),
    tr(
      lang,
      "How the Walumo website uses cookies and how to manage your preferences.",
      "Comment le site web de Walumo utilise les cookies et comment gérer vos préférences.",
    ),
  );
}

function getSections(lang: Locale): LegalSection[] {
  if (lang === "fr") {
    return [
      {
        id: "what",
        title: "Qu'est-ce qu'un cookie",
        body: (
          <p>
            Les cookies sont de petits fichiers enregistrés sur votre appareil lorsque vous visitez un site web. Ils permettent
            au site de fonctionner et nous aident à comprendre comment il est utilisé.
          </p>
        ),
      },
      {
        id: "which",
        title: "Cookies que nous utilisons",
        body: (
          <ul>
            <li>
              <strong>Strictement nécessaires</strong> — indispensables au fonctionnement du site web ; ils ne peuvent pas être
              désactivés.
            </li>
            <li>
              <strong>Mesure d&apos;audience</strong> — nous aident à mesurer les visites et à améliorer les pages ; déposés
              uniquement avec votre consentement. [Indiquer l&apos;outil d&apos;analyse utilisé.]
            </li>
          </ul>
        ),
      },
      {
        id: "manage",
        title: "Gérer vos préférences",
        body: (
          <p>
            Vous pouvez accepter ou refuser les cookies non essentiels à tout moment, et supprimer les cookies depuis les
            paramètres de votre navigateur.
          </p>
        ),
      },
      {
        id: "changes",
        title: "Modifications de la présente politique",
        body: (
          <p>
            Nous pouvons mettre à jour la présente politique lorsque notre utilisation des cookies évolue. La date indiquée en
            haut de la page correspond à la dernière version.
          </p>
        ),
      },
    ];
  }
  return [
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
}

export default async function CookiePolicyPage({ params }: PageProps<"/[lang]/cookie-policy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <LegalPage
      lang={lang}
      eyebrow={tr(lang, "Legal", "Mentions légales")}
      title={tr(lang, "Cookie policy", "Politique relative aux cookies")}
      updated={tr(lang, "30 September 2026", "30 septembre 2026")}
      intro={<p>{tr(lang, "How and why the Walumo website uses cookies.", "Comment et pourquoi le site web de Walumo utilise des cookies.")}</p>}
      sections={getSections(lang)}
    />
  );
}
