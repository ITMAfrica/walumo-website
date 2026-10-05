import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CtaBanner, FeatureGrid, Steps } from "@/components/sections/blocks";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { tr, type Locale } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { contentFor, siteFor } from "@/lib/i18n-data";
import { hasWhatsapp } from "@/lib/site";

function alternates(path: string, lang: Locale) {
  const en = `${siteFor("en").site.url}${path}`;
  const fr = `${siteFor("en").site.url}/fr${path}`;
  return { canonical: lang === "fr" ? fr : en, languages: { en, fr, "x-default": en } };
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
    title: tr(lang, "Support", "Assistance"),
    description: tr(
      lang,
      "Implementation, training and ongoing support for Kazi Pro, Talent Pro and Sales Tracker.",
      "Déploiement, formation et accompagnement continu pour Kazi Pro, Talent Pro et Sales Tracker.",
    ),
    alternates: alternates("/support", lang),
  };
}

export default async function SupportPage() {
  const lang = await getLang();
  const { site } = siteFor(lang);
  const { deliverySteps } = contentFor(lang);
  return (
    <>
      <Hero
        eyebrow={tr(lang, "Support", "Assistance")}
        title={tr(lang, "We stay until", "Nous restons jusqu'à ce que")}
        accent={tr(lang, "the outcomes land", "les résultats soient là")}
        text={tr(
          lang,
          "Walumo supports you through implementation, adoption and beyond — with people you can reach, not just a ticket number.",
          "Walumo vous accompagne pendant le déploiement, l'adoption et au-delà — avec des interlocuteurs joignables, pas seulement un numéro de ticket.",
        )}
        primary={{ label: tr(lang, "Contact support", "Contacter l'assistance"), href: "/contact" }}
        secondary={site.whatsappCta}
      />

      <Section tone="surface">
        <Container>
          <SectionHeading title={tr(lang, "How we support you", "Comment nous vous accompagnons")} />
          <div className="mt-14">
            <FeatureGrid
              columns={4}
              items={[
                {
                  icon: "rocket",
                  title: tr(lang, "Implementation", "Déploiement"),
                  text: tr(lang, "Configuration, data migration and go-live with your team.", "Configuration, migration des données et mise en production avec votre équipe."),
                },
                {
                  icon: "graduation",
                  title: tr(lang, "Training", "Formation"),
                  text: tr(lang, "Sessions for administrators, managers and everyday users.", "Des sessions pour les administrateurs, les managers et les utilisateurs au quotidien."),
                },
                {
                  icon: "handshake",
                  title: tr(lang, "Adoption", "Adoption"),
                  text: tr(lang, "Close support in the first weeks so the new way of working sticks.", "Un accompagnement rapproché les premières semaines pour que la nouvelle façon de travailler s'installe."),
                },
                {
                  icon: "shield",
                  title: tr(lang, "Managed services", "Services managés"),
                  text: tr(lang, "Continuous optimisation, technical support and enterprise service agreements.", "Optimisation continue, support technique et contrats de service pour les grandes organisations."),
                },
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow={tr(lang, "Delivery", "Mise en œuvre")} title={tr(lang, "From first workshop to ongoing support", "Du premier atelier à l'accompagnement continu")} />
          <div className="mt-14">
            <Steps steps={deliverySteps} />
          </div>
        </Container>
      </Section>

      <CtaBanner
        title={tr(lang, "Need help with your Walumo setup?", "Besoin d'aide pour votre configuration Walumo ?")}
        text={tr(
          lang,
          `Email ${site.email}${hasWhatsapp ? " or message us on WhatsApp" : " or use the contact form"} — a real person will answer.`,
          `Écrivez à ${site.email}${hasWhatsapp ? " ou envoyez-nous un message sur WhatsApp" : " ou utilisez le formulaire de contact"} — une vraie personne vous répondra.`,
        )}
      />
    </>
  );
}
