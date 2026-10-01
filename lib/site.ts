/**
 * Global site configuration: brand, navigation, footer.
 * Copy comes from the Walumo Website Content Blueprint and the Brand & Positioning Audit.
 */

export type IconName =
  | "code"
  | "layers"
  | "rocket"
  | "database"
  | "target"
  | "search"
  | "cpu"
  | "graduation"
  | "users"
  | "compass"
  | "briefcase"
  | "book"
  | "newspaper"
  | "sparkles"
  | "shield"
  | "globe"
  | "chart"
  | "handshake";

export type MegaLink = {
  label: string;
  description: string;
  href: string;
  icon: IconName;
};

export type NavItem = {
  label: string;
  href: string;
  links: MegaLink[];
  promo: {
    title: string;
    text: string;
    cta: string;
    href: string;
    tone: "mint" | "sand" | "sky";
  };
  footerLink: { label: string; href: string };
};

/**
 * WhatsApp number in international format without "+" or spaces (e.g. "254700000000").
 * TODO: add Walumo's WhatsApp business number. While empty, WhatsApp buttons become
 * "Talk to our team" (contact page) and WhatsApp-only links are hidden.
 */
const WHATSAPP_NUMBER = "";
const WHATSAPP_MESSAGE = "Hello Walumo, I'd like to talk about your products.";

export const hasWhatsapp = WHATSAPP_NUMBER !== "";

export const whatsappHref = hasWhatsapp
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  : "/contact#whatsapp";

export const site = {
  name: "Walumo",
  tagline: "Business software built for African scale",
  description:
    "Walumo builds and implements connected business software for African organisations — starting with HR, hiring and commercial operations — so teams can move from scattered tools to one reliable way of working.",
  url: "https://walumoafrica.com",
  email: "info@walumoafrica.com",
  address: "Nairobi Headquarters, Highway Heights, 7th Floor, Marcus Garvey Road, Kilimani",
  addressShort: "Highway Heights, 7th Floor, Marcus Garvey Road, Kilimani, Nairobi",
  trustBadge: "Built by Walumo. Backed by ITM Holding.",
  primaryCta: { label: "Request a Demo", href: "/contact" },
  secondaryCta: { label: "Explore Products", href: "/products" },
  whatsappCta: hasWhatsapp
    ? { label: "WhatsApp Us", href: whatsappHref }
    : { label: "Talk to our team", href: "/contact" },
  announcement: {
    date: "Hacklab",
    text: "Highlights from the Walumo Hacklab, our build event for Africa's emerging tech talent",
    cta: "See the event",
    href: "/insights/events/walumo-hacklab",
  },
};

export const mainNav: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    links: [
      {
        label: "Product ecosystem",
        description: "One login, one design, one source of truth",
        href: "/products",
        icon: "layers",
      },
      {
        label: "Kazi Pro",
        description: "HR & workforce management",
        href: "/products/kazi-pro",
        icon: "users",
      },
      {
        label: "Talent Pro",
        description: "Talent acquisition & onboarding",
        href: "/products/talent-pro",
        icon: "search",
      },
      {
        label: "Sales Tracker",
        description: "Commercial operations & pipeline",
        href: "/products/sales-tracker",
        icon: "chart",
      },
    ],
    promo: {
      title: "One suite for people, hiring and sales",
      text: "Three connected platforms, implemented and supported by one partner.",
      cta: "Request a demo",
      href: "/contact",
      tone: "sky",
    },
    footerLink: { label: "See the whole ecosystem", href: "/products" },
  },
  {
    label: "Solutions",
    href: "/solutions",
    links: [
      {
        label: "HR",
        description: "Digitise HR, from leave to attendance",
        href: "/solutions/hr",
        icon: "briefcase",
      },
      {
        label: "Talent acquisition",
        description: "Hire faster, build stronger teams",
        href: "/solutions/talent-acquisition",
        icon: "target",
      },
      {
        label: "Commercial operations",
        description: "Control your pipeline from lead to close",
        href: "/solutions/commercial-operations",
        icon: "chart",
      },
      {
        label: "Digital transformation",
        description: "Connect people, hiring and sales",
        href: "/solutions/digital-transformation",
        icon: "rocket",
      },
    ],
    promo: {
      title: "Solutions by outcome",
      text: "Each solution pairs the right platform with the services to make it work.",
      cta: "Compare solutions",
      href: "/solutions",
      tone: "mint",
    },
    footerLink: { label: "All solutions", href: "/solutions" },
  },
  {
    label: "What We Do",
    href: "/what-we-do",
    links: [
      {
        label: "About Walumo",
        description: "Vision, mission and strategic pillars",
        href: "/what-we-do",
        icon: "compass",
      },
      {
        label: "Services",
        description: "Training, consulting, support, systems",
        href: "/what-we-do#services",
        icon: "handshake",
      },
      {
        label: "Our method",
        description: "How we work, from discovery to scale",
        href: "/what-we-do#method",
        icon: "sparkles",
      },
      {
        label: "Why Walumo",
        description: "What sets us apart",
        href: "/what-we-do#why-walumo",
        icon: "shield",
      },
      {
        label: "ITM backing",
        description: "The technology arm of ITM Holding",
        href: "/what-we-do#itm",
        icon: "globe",
      },
    ],
    promo: {
      title: "Where African ingenuity meets global excellence",
      text: "We build, implement and support the software African teams use to run better businesses.",
      cta: "Learn more",
      href: "/what-we-do",
      tone: "sand",
    },
    footerLink: { label: "About Walumo", href: "/what-we-do" },
  },
  {
    label: "Resources",
    href: "/insights",
    links: [
      {
        label: "Insights",
        description: "Ideas and evidence for African business leaders",
        href: "/insights",
        icon: "book",
      },
      {
        label: "Reports",
        description: "Data-driven guides and research",
        href: "/insights#reports",
        icon: "newspaper",
      },
      {
        label: "Events",
        description: "Hacklab and community events",
        href: "/insights#events",
        icon: "globe",
      },
      {
        label: "Case studies",
        description: "Customer stories and results",
        href: "/insights/case-studies",
        icon: "target",
      },
    ],
    promo: {
      title: "Walumo Hacklab",
      text: "Developers, designers and product thinkers building together.",
      cta: "See the highlights",
      href: "/insights/events/walumo-hacklab",
      tone: "sky",
    },
    footerLink: { label: "All insights", href: "/insights" },
  },
];

export const footerGroups: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Products",
    links: [
      { label: "Product ecosystem", href: "/products" },
      { label: "Kazi Pro", href: "/products/kazi-pro" },
      { label: "Talent Pro", href: "/products/talent-pro" },
      { label: "Sales Tracker", href: "/products/sales-tracker" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "HR", href: "/solutions/hr" },
      { label: "Talent acquisition", href: "/solutions/talent-acquisition" },
      { label: "Commercial operations", href: "/solutions/commercial-operations" },
      { label: "Digital transformation", href: "/solutions/digital-transformation" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "What we do", href: "/what-we-do" },
      { label: "Services", href: "/what-we-do#services" },
      { label: "Why Walumo", href: "/what-we-do#why-walumo" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Reports", href: "/insights#reports" },
      { label: "Events", href: "/insights#events" },
      { label: "Case studies", href: "/insights/case-studies" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Security", href: "/security" },
      { label: "Support", href: "/support" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms of use", href: "/terms" },
      { label: "Cookie policy", href: "/cookie-policy" },
    ],
  },
];

export const legalLinks = [
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookie-policy" },
  { label: "Security", href: "/security" },
];

export const socials: {
  label: string;
  href: string;
  icon: "linkedin" | "x" | "github" | "youtube" | "instagram" | "facebook";
}[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/walumo", icon: "linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/walumo_africa/", icon: "instagram" },
];
