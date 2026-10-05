import type { Metadata } from "next";
import Link from "@/components/ui/link";
import { LegalPage, type LegalSection } from "@/components/pages/legal/legal-page";
import { tr, type Locale } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { site } from "@/lib/site";

function alternates(path: string, lang: Locale) {
  const en = `${site.url}${path}`;
  const fr = `${site.url}/fr${path}`;
  return { canonical: lang === "fr" ? fr : en, languages: { en, fr, "x-default": en } };
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
    title: tr(lang, "Security & data protection", "Sécurité et protection des données"),
    description: tr(
      lang,
      "How Walumo approaches security, access control, data protection and support across Kazi Pro, Talent Pro and Sales Tracker.",
      "L'approche de Walumo en matière de sécurité, de contrôle d'accès, de protection des données et d'assistance pour Kazi Pro, Talent Pro et Sales Tracker.",
    ),
    alternates: alternates("/security", lang),
  };
}

// Keep this page factual: only add specific technical claims (hosting, encryption, backups, uptime)
// once they are confirmed in writing by Walumo's IT team.
export default async function SecurityPage() {
  const lang = await getLang();

  const sections: LegalSection[] = [
    {
      id: "approach",
      title: tr(lang, "Our approach", "Notre approche"),
      body: (
        <p>
          {tr(
            lang,
            "Walumo builds business software that holds sensitive employee, candidate and customer information. Security and data protection are part of how we design, implement and support every product, not an afterthought.",
            "Walumo conçoit des logiciels de gestion qui contiennent des informations sensibles sur les employés, les candidats et les clients. La sécurité et la protection des données font partie de notre façon de concevoir, de déployer et d'accompagner chaque produit, et non d'un ajout de dernière minute.",
          )}
        </p>
      ),
    },
    {
      id: "access",
      title: tr(lang, "Access control", "Contrôle d'accès"),
      body: (
        <>
          <p>{tr(lang, "Across the suite, access is organised around roles and entities:", "Dans toute la suite, l'accès est organisé autour des rôles et des entités :")}</p>
          <ul>
            <li>{tr(lang, "users only see the information their role requires;", "les utilisateurs ne voient que les informations nécessaires à leur rôle ;")}</li>
            <li>{tr(lang, "approval chains are configured per organisation and per entity;", "les circuits de validation sont configurés par organisation et par entité ;")}</li>
            <li>{tr(lang, "administrators manage users and permissions from a common admin area.", "les administrateurs gèrent les utilisateurs et les autorisations depuis un espace d'administration commun.")}</li>
          </ul>
        </>
      ),
    },
    {
      id: "data",
      title: tr(lang, "Data protection", "Protection des données"),
      body: (
        <p>
          {tr(
            lang,
            "We process personal data in line with applicable data protection laws in the countries where our clients operate. Our ",
            "Nous traitons les données personnelles conformément aux lois de protection des données applicables dans les pays où nos clients exercent leur activité. Notre ",
          )}
          <Link href="/privacy-policy">{tr(lang, "privacy policy", "politique de confidentialité")}</Link>{" "}
          {tr(
            lang,
            "explains how we handle personal data collected through this website.",
            "explique comment nous traitons les données personnelles collectées via ce site.",
          )}
        </p>
      ),
    },
    {
      id: "implementation",
      title: tr(lang, "Secure implementation", "Déploiement sécurisé"),
      body: (
        <p>
          {tr(
            lang,
            "Data migration, configuration and user onboarding are carried out with your team during implementation, so that access rights and data are checked before go-live.",
            "La migration des données, la configuration et l'accueil des utilisateurs sont réalisés avec votre équipe pendant le déploiement, afin que les droits d'accès et les données soient vérifiés avant la mise en production.",
          )}
        </p>
      ),
    },
    {
      id: "support",
      title: tr(lang, "Support & incident handling", "Assistance et gestion des incidents"),
      body: (
        <p>
          {tr(
            lang,
            "Clients can reach Walumo support through their dedicated channels. Security questions or concerns are escalated to our technical team. See our ",
            "Les clients peuvent joindre l'assistance Walumo via leurs canaux dédiés. Les questions ou préoccupations de sécurité sont transmises à notre équipe technique. Consultez notre ",
          )}
          <Link href="/support">{tr(lang, "support page", "page d'assistance")}</Link>{" "}
          {tr(lang, "for details.", "pour plus de détails.")}
        </p>
      ),
    },
    {
      id: "documentation",
      title: tr(lang, "Security documentation", "Documentation de sécurité"),
      body: (
        <p>
          {tr(
            lang,
            "Enterprise and public-sector buyers can request our security documentation as part of their evaluation. Contact us at ",
            "Les acheteurs des grandes entreprises et du secteur public peuvent demander notre documentation de sécurité dans le cadre de leur évaluation. Écrivez-nous à ",
          )}
          <a href="mailto:info@walumoafrica.com">info@walumoafrica.com</a>.
        </p>
      ),
    },
  ];

  return (
    <LegalPage
      lang={lang}
      title={tr(lang, "Security & data protection", "Sécurité et protection des données")}
      updated={tr(lang, "30 September 2026", "30 septembre 2026")}
      intro={
        <p>
          {tr(
            lang,
            "How we protect the people, hiring and sales data our clients trust us with.",
            "Comment nous protégeons les données RH, de recrutement et de vente que nos clients nous confient.",
          )}
        </p>
      }
      sections={sections}
    />
  );
}
