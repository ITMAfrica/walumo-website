/**
 * Version française de lib/site.ts : mêmes exports, mêmes formes.
 * Les href restent identiques (le composant Link ajoute le préfixe /fr).
 */
import { hasWhatsapp, whatsappPhone, socials, type NavItem } from "./site";

export { hasWhatsapp, whatsappPhone, socials };
export type { IconName, MegaLink, NavItem } from "./site";

const WHATSAPP_MESSAGE = "Bonjour Walumo, je souhaite échanger au sujet de vos produits.";

export const whatsappHref = hasWhatsapp
  ? `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  : "/contact#whatsapp";

export const site = {
  name: "Walumo",
  tagline: "Des logiciels d'entreprise conçus pour l'échelle africaine",
  description:
    "Walumo conçoit et déploie des logiciels de gestion connectés pour les organisations africaines, en commençant par les RH, le recrutement et les opérations commerciales, afin que les équipes passent d'outils dispersés à une méthode de travail unique et fiable.",
  url: "https://walumoafrica.com",
  email: "info@walumoafrica.com",
  address: "Siège de Nairobi, Highway Heights, 7e étage, Marcus Garvey Road, Kilimani",
  addressShort: "Highway Heights, 7e étage, Marcus Garvey Road, Kilimani, Nairobi",
  trustBadge: "Conçu par Walumo. Soutenu par ITM Holding.",
  primaryCta: { label: "Demander une démo", href: "/contact" },
  secondaryCta: { label: "Découvrir les produits", href: "/products" },
  whatsappCta: hasWhatsapp
    ? { label: "Écrivez-nous sur WhatsApp", href: whatsappHref }
    : { label: "Parler à notre équipe", href: "/contact" },
  announcement: {
    date: "Hacklab",
    text: "Les temps forts du Walumo Hacklab, notre événement de création pour les jeunes talents technologiques d'Afrique",
    cta: "Voir l'événement",
    href: "/insights/events/walumo-hacklab",
  },
};

export const mainNav: NavItem[] = [
  {
    label: "Produits",
    href: "/products",
    links: [
      {
        label: "Écosystème de produits",
        description: "Une connexion, un design, une source de vérité",
        href: "/products",
        icon: "layers",
      },
      {
        label: "Kazi Pro",
        description: "Gestion des RH et des effectifs",
        href: "/products/kazi-pro",
        icon: "users",
      },
      {
        label: "Talent Pro",
        description: "Recrutement et intégration",
        href: "/products/talent-pro",
        icon: "search",
      },
      {
        label: "Sales Tracker",
        description: "Opérations commerciales et pipeline",
        href: "/products/sales-tracker",
        icon: "chart",
      },
    ],
    promo: {
      title: "Une seule suite pour les équipes, le recrutement et les ventes",
      text: "Trois plateformes connectées, déployées et accompagnées par un seul partenaire.",
      cta: "Demander une démo",
      href: "/contact",
      tone: "sky",
    },
    footerLink: { label: "Voir tout l'écosystème", href: "/products" },
  },
  {
    label: "Solutions",
    href: "/solutions",
    links: [
      {
        label: "RH",
        description: "Numérisez les RH, des congés aux présences",
        href: "/solutions/hr",
        icon: "briefcase",
      },
      {
        label: "Recrutement",
        description: "Recrutez plus vite, bâtissez des équipes plus solides",
        href: "/solutions/talent-acquisition",
        icon: "target",
      },
      {
        label: "Opérations commerciales",
        description: "Pilotez votre pipeline, du premier contact à la signature",
        href: "/solutions/commercial-operations",
        icon: "chart",
      },
      {
        label: "Transformation numérique",
        description: "Connectez équipes, recrutement et ventes",
        href: "/solutions/digital-transformation",
        icon: "rocket",
      },
    ],
    promo: {
      title: "Des solutions par résultat",
      text: "Chaque solution associe la bonne plateforme aux services qui la font fonctionner.",
      cta: "Comparer les solutions",
      href: "/solutions",
      tone: "mint",
    },
    footerLink: { label: "Toutes les solutions", href: "/solutions" },
  },
  {
    label: "Notre activité",
    href: "/what-we-do",
    links: [
      {
        label: "À propos de Walumo",
        description: "Vision, mission et piliers stratégiques",
        href: "/what-we-do",
        icon: "compass",
      },
      {
        label: "Services",
        description: "Formation, conseil, support, systèmes",
        href: "/what-we-do#services",
        icon: "handshake",
      },
      {
        label: "Notre méthode",
        description: "Notre façon de travailler, de la découverte à la montée en charge",
        href: "/what-we-do#method",
        icon: "sparkles",
      },
      {
        label: "Pourquoi Walumo",
        description: "Ce qui nous distingue",
        href: "/what-we-do#why-walumo",
        icon: "shield",
      },
      {
        label: "Le soutien d'ITM",
        description: "Le bras technologique d'ITM Holding",
        href: "/what-we-do#itm",
        icon: "globe",
      },
    ],
    promo: {
      title: "Là où l'ingéniosité africaine rencontre l'excellence mondiale",
      text: "Nous concevons, déployons et accompagnons les logiciels que les équipes africaines utilisent pour mieux gérer leur entreprise.",
      cta: "En savoir plus",
      href: "/what-we-do",
      tone: "sand",
    },
    footerLink: { label: "À propos de Walumo", href: "/what-we-do" },
  },
  {
    label: "Ressources",
    href: "/insights",
    links: [
      {
        label: "Analyses",
        description: "Idées et données pour les dirigeants africains",
        href: "/insights",
        icon: "book",
      },
      {
        label: "Rapports",
        description: "Guides et études fondés sur les données",
        href: "/insights#reports",
        icon: "newspaper",
      },
      {
        label: "Événements",
        description: "Hacklab et événements communautaires",
        href: "/insights#events",
        icon: "globe",
      },
      {
        label: "Études de cas",
        description: "Témoignages et résultats de nos clients",
        href: "/insights/case-studies",
        icon: "target",
      },
    ],
    promo: {
      title: "Walumo Hacklab",
      text: "Développeurs, designers et profils produit qui créent ensemble.",
      cta: "Voir les temps forts",
      href: "/insights/events/walumo-hacklab",
      tone: "sky",
    },
    footerLink: { label: "Toutes les analyses", href: "/insights" },
  },
];

export const footerGroups: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Produits",
    links: [
      { label: "Écosystème de produits", href: "/products" },
      { label: "Kazi Pro", href: "/products/kazi-pro" },
      { label: "Talent Pro", href: "/products/talent-pro" },
      { label: "Sales Tracker", href: "/products/sales-tracker" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "RH", href: "/solutions/hr" },
      { label: "Recrutement", href: "/solutions/talent-acquisition" },
      { label: "Opérations commerciales", href: "/solutions/commercial-operations" },
      { label: "Transformation numérique", href: "/solutions/digital-transformation" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "Notre activité", href: "/what-we-do" },
      { label: "Services", href: "/what-we-do#services" },
      { label: "Pourquoi Walumo", href: "/what-we-do#why-walumo" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Analyses", href: "/insights" },
      { label: "Rapports", href: "/insights#reports" },
      { label: "Événements", href: "/insights#events" },
      { label: "Études de cas", href: "/insights/case-studies" },
    ],
  },
  {
    title: "Confiance",
    links: [
      { label: "Sécurité", href: "/security" },
      { label: "Assistance", href: "/support" },
      { label: "Politique de confidentialité", href: "/privacy-policy" },
      { label: "Conditions d'utilisation", href: "/terms" },
      { label: "Politique relative aux cookies", href: "/cookie-policy" },
    ],
  },
];

export const legalLinks = [
  { label: "Confidentialité", href: "/privacy-policy" },
  { label: "Conditions", href: "/terms" },
  { label: "Cookies", href: "/cookie-policy" },
  { label: "Sécurité", href: "/security" },
];
