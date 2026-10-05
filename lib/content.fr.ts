/**
 * Contenu du site Walumo — version française.
 * Même structure et mêmes types que ./content (slugs, liens, images, icônes et tons inchangés).
 *
 * ⚠️ Avant publication : faire valider chaque chiffre et chaque affirmation par Walumo / ITM.
 */
import type { IconName } from "./site";
import type {
  Article,
  CaseStudy,
  EventItem,
  Product,
  Report,
  Solution,
  Testimonial,
} from "./content";

export type {
  Article,
  CaseStudy,
  EventItem,
  InsightCategory,
  Product,
  Report,
  Solution,
  Testimonial,
} from "./content";

/* ------------------------------------------------------------------ */
/* Preuves (uniquement les chiffres fournis dans le cahier des charges) */
/* ------------------------------------------------------------------ */

export const proofStats = [
  { value: "20+", label: "pays africains couverts par ITM Holding" },
  { value: "4.8K+", label: "dossiers d'employés gérés dans Kazi Pro" }, // chiffre EXEMPLE
  { value: "23+", label: "entreprises qui utilisent Kazi Pro" },
];

/* ------------------------------------------------------------------ */
/* ⚠️ CONTENU EXEMPLE — chiffres, citations et étude de cas fictifs      */
/* à remplacer par des données réelles et validées avant le lancement.   */
/* Rechercher "SAMPLE" / "EXEMPLE" dans le code pour tout retrouver.     */
/* ------------------------------------------------------------------ */

/** Chiffres de preuve de la page d'accueil. EXEMPLE : "4.8K+" et "3x" sont illustratifs. */
export const homeProofStats = [
  { value: "23+", label: "entreprises qui utilisent Kazi Pro au quotidien" },
  { value: "4.8K+", label: "dossiers d'employés gérés dans Kazi Pro" },
  { value: "3x", label: "plus vite pour approuver un congé qu'avec e-mails et papier" },
  { value: "20+", label: "pays africains couverts par ITM Holding" },
];

/** EXEMPLE : citations fictives — à remplacer par des citations approuvées par écrit. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Les demandes de congé restaient des jours dans les boîtes mail. Aujourd'hui, les managers approuvent depuis leur téléphone et les RH disposent enfin de soldes fiables.",
    name: "Grace M.",
    role: "Responsable RH",
    company: "ITM Kenya",
  },
  {
    quote:
      "Nous gérons les RH de plusieurs entités dans différents pays. Avoir chaque dossier d'employé et chaque approbation au même endroit a changé notre façon de rendre compte à la direction.",
    name: "Patrick K.",
    role: "Coordinateur RH Groupe",
    company: "ITM RDC",
  },
  {
    quote:
      "Talent Pro a donné à nos recruteurs un seul pipeline au lieu de CV dispersés entre e-mails et WhatsApp. Nous présélectionnons en quelques jours, non en quelques semaines.",
    name: "Aline N.",
    role: "Responsable acquisition de talents",
    company: "ITM Rwanda",
  },
];

/** EXEMPLE : étude de cas illustrative fondée sur le déploiement de Kazi Pro chez ITM Holding. */
export const caseStudies: CaseStudy[] = [
  {
    slug: "itm-holding-kazi-pro",
    client: "ITM Holding",
    product: "Kazi Pro",
    title: "Comment ITM Holding a réuni les RH de 23+ entreprises sur une seule plateforme",
    summary:
      "Congés, approbations et dossiers d'employés étaient éparpillés entre e-mails, papier et tableurs dans chaque pays. Kazi Pro les a réunis dans un espace de travail unique pour tout le groupe.",
    metrics: [
      { value: "3x", label: "approbations de congé plus rapides" },
      { value: "4.8K+", label: "dossiers d'employés centralisés" },
      { value: "20+", label: "pays sur une seule plateforme RH" },
    ],
    challenge:
      "Chaque entité gérait les RH à sa façon : demandes de congé par e-mail ou sur papier, soldes reconstitués chaque mois dans des tableurs, et aucune vue consolidée des effectifs pour la direction du groupe.",
    solution: [
      "Kazi Pro configuré par entité, avec les politiques de congé locales et les circuits d'approbation",
      "Dossiers d'employés migrés depuis les tableurs et vérifiés avec chaque équipe RH",
      "Managers et employés formés pour demander et approuver depuis n'importe quel appareil",
      "Mise en service progressive, pays par pays, avec l'appui de Walumo sur place",
    ],
    results: [
      "Approbations de congé ramenées d'environ 4 jours à environ 1 jour en moyenne",
      "Une source unique et fiable pour les soldes de congé et les dossiers d'employés",
      "Rapports RH mensuels produits en quelques minutes au lieu de plusieurs jours",
    ],
    quote: {
      quote:
        "Pour la première fois, la direction du groupe voit les mêmes chiffres d'effectifs que les équipes RH de chaque pays, sans que personne ait à reconstruire un tableur.",
      name: "Patrick K.",
      role: "Coordinateur RH Groupe",
      company: "ITM RDC",
    },
    image: "/images/team-workshop.jpg",
  },
];

/** Entités du groupe ITM Holding — mur de logos (logos dans /public/logos). */
export const itmEntities: { name: string; logo: string }[] = [
  { name: "ITM Holding", logo: "/logos/itm-holding.png" },
  { name: "ITM Kenya", logo: "/logos/itm-kenya.png" },
  { name: "ITM RDC", logo: "/logos/itm-rdc.png" },
  { name: "ITM Rwanda", logo: "/logos/itm-rwanda.png" },
  { name: "ITM Tanzania", logo: "/logos/itm-tanzania.png" },
  { name: "ITM Uganda", logo: "/logos/itm-uganda.png" },
  { name: "ITM Nigeria", logo: "/logos/itm-nigeria.png" },
  { name: "ITM Congo", logo: "/logos/itm-congo.png" },
  { name: "ITM Togo", logo: "/logos/itm-togo.png" },
  { name: "ITM Cameroon", logo: "/logos/itm-cameroon.png" },
  { name: "ITM Gabon", logo: "/logos/itm-gabon.png" },
  { name: "ITM Angola", logo: "/logos/itm-angola.png" },
  { name: "ITM Burundi", logo: "/logos/itm-burundi.png" },
  { name: "ITM Zambia", logo: "/logos/itm-zambia.png" },
  { name: "ITM South Africa", logo: "/logos/itm-south-africa.png" },
  { name: "ITM HR", logo: "/logos/itm-hr.png" },
  { name: "ITM Maintenance", logo: "/logos/itm-maintenance.png" },
  { name: "ITM Nexus", logo: "/logos/itm-nexus.png" },
  { name: "ITM Environnement", logo: "/logos/itm-environnement.png" },
  { name: "IBS", logo: "/logos/ibs.png" },
  { name: "Jamon", logo: "/logos/jamon.png" },
  { name: "Vendis", logo: "/logos/vendis.png" },
  { name: "Geo Katanga", logo: "/logos/geo-katanga.png" },
];

/* ------------------------------------------------------------------ */
/* Produits                                                            */
/* ------------------------------------------------------------------ */

export const products: Product[] = [
  {
    slug: "kazi-pro",
    name: "Kazi Pro",
    category: "RH et effectifs",
    tagline: "La plateforme RH pratique pour les entreprises africaines",
    headline: "Pilotez les RH en toute clarté,",
    accent: "du dossier de l'employé à l'approbation",
    body: "Kazi Pro aide les équipes RH et opérations à gérer dossiers d'employés, congés, présences, approbations et visibilité sur les effectifs, dans une plateforme pratique pensée pour les organisations africaines.",
    pains: [
      { title: "Des approbations à relancer", text: "Les demandes de congé et de paiement circulent par e-mail, papier et WhatsApp, et personne ne sait où elles sont bloquées." },
      { title: "Des soldes auxquels personne ne croit", text: "Les soldes de congé et les rapports de présence sont reconstitués à la main dans des tableurs chaque mois." },
      { title: "Des dossiers d'employés dispersés", text: "Contrats, documents et informations de paie sont rangés à des endroits différents, par entité et par pays." },
    ],
    modules: [
      { icon: "users", title: "Dossiers des employés", text: "Un seul endroit pour chaque dossier, contrat et document, entre entités et pays." },
      { icon: "compass", title: "Congés et approbations", text: "Demandes de congé en libre-service, circuits d'approbation clairs et soldes en temps réel." },
      { icon: "target", title: "Temps et présences", text: "Suivi des présences, y compris pointage géolocalisé, sans rapprochement manuel." },
      { icon: "briefcase", title: "Demandes de paiement et bulletins de paie", text: "Demandes de paiement structurées et accès aux bulletins de paie depuis le même espace." },
      { icon: "graduation", title: "Intégration et départs", text: "Des listes de contrôle homogènes pour que chaque arrivée et chaque départ soient bien gérés." },
      { icon: "chart", title: "Rapports et visibilité sur les effectifs", text: "Rapports d'effectifs, de congés et de présences lisibles en un coup d'œil par les dirigeants." },
    ],
    roles: [
      { role: "Directeur RH", value: "Une vue fiable des effectifs, toutes entités confondues." },
      { role: "Finance", value: "Des données de présence et de paiement plus propres avant la paie." },
      { role: "Manager", value: "Approuvez les demandes en quelques secondes, depuis n'importe quel appareil." },
      { role: "Employé", value: "Demandez un congé et retrouvez vos documents sans relancer les RH." },
    ],
    outcome: "Les équipes RH cessent de courir après le papier et les tableurs, et les dirigeants obtiennent une vue en direct et fiable de leurs effectifs.",
    proof: "Éprouvé au sein des entités d'ITM Holding avant son déploiement externe — 23+ entreprises utilisent déjà Kazi Pro.",
    screenshot: "/images/product-kazipro.jpg",
    cta: "Demander une démo de Kazi Pro",
    tone: "sky",
  },
  {
    slug: "talent-pro",
    name: "Talent Pro",
    category: "Acquisition de talents",
    tagline: "La plateforme de recrutement africaine pour recruter plus vite",
    headline: "Recrutez plus vite",
    accent: "sans perdre le contact humain",
    body: "Talent Pro offre aux recruteurs et aux équipes RH un pipeline structuré pour gérer candidats, postes, communication et intégration, pensé pour la réalité des marchés de l'emploi africains.",
    pains: [
      { title: "Pour les entreprises", text: "Présélections lentes, CV dispersés, candidats manqués et aucune vision claire de l'avancement de chaque poste." },
      { title: "Pour les recruteurs", text: "Relances manuelles, fiches candidats en double, collaboration fragile et aucune vue en direct du recrutement." },
      { title: "Pour les candidats", text: "Postuler sans visibilité, renvoyer sans cesse les mêmes documents et ne jamais recevoir de retour." },
    ],
    modules: [
      { icon: "layers", title: "Pipeline de candidats structuré", text: "Tous les candidats dans un seul pipeline, avec des étapes claires et sans doublons." },
      { icon: "newspaper", title: "Publication et suivi des postes", text: "Publiez vos postes et suivez candidatures, consultations et avancement pour chaque offre." },
      { icon: "chart", title: "Centre de pilotage du recruteur", text: "Un tableau de bord en direct des offres actives, des candidats en cours et des embauches." },
      { icon: "handshake", title: "Collaboration entre recruteurs", text: "Notes partagées, changements de statut et passages de relais entre recruteurs et managers." },
      { icon: "graduation", title: "Parcours d'intégration du candidat", text: "Un parcours structuré, de l'offre au premier jour." },
      { icon: "globe", title: "Conçu pour les marchés de talents africains", text: "S'adapte aux réseaux informels, aux candidatures par WhatsApp et aux diplômes locaux." },
    ],
    roles: [
      { role: "Équipes RH et talents", value: "Un pipeline net et une vue en direct de chaque poste ouvert." },
      { role: "Cabinets de recrutement", value: "Collaboration et responsabilité partagée entre recruteurs." },
      { role: "Entreprises en croissance", value: "De la structure pour recruter en volume sans perdre de candidats." },
      { role: "ONG et universités", value: "Un processus équitable et transparent pour chaque candidat." },
    ],
    outcome: "Structure, visibilité et rapidité dans le recrutement — pour ne plus perdre de bons candidats à cause d'un processus lent et dispersé.",
    proof: "Un système de suivi des candidatures (ATS) et un CRM de recrutement en un, conçus pour les équipes africaines qui ont besoin de visibilité, de collaboration et de suivi des candidats.",
    screenshot: "/images/product-talentpro.jpg",
    cta: "Demander une démo de Talent Pro",
    tone: "mint",
  },
  {
    slug: "sales-tracker",
    name: "Sales Tracker",
    category: "Opérations commerciales",
    tagline: "L'outil de maîtrise du chiffre d'affaires pour les équipes commerciales africaines",
    headline: "Gardez chaque opportunité visible",
    accent: "et chaque relance sous contrôle",
    body: "Sales Tracker aide les équipes commerciales à gérer prospects, affaires, relances, activité et rapports de pipeline, pour que les managers voient ce qui avance et ce qui demande de l'attention.",
    pains: [
      { title: "Les relances passent à la trappe", text: "Les commerciaux oublient de rappeler, et les opportunités refroidissent en silence." },
      { title: "Aucune visibilité sur le pipeline", text: "Les managers ne voient pas ce qui avance sans relancer chaque commercial pour un point." },
      { title: "Des affaires dans des carnets", text: "Les opportunités vivent dans des carnets, des téléphones personnels et des conversations WhatsApp." },
    ],
    modules: [
      { icon: "target", title: "Suivi des prospects et des affaires", text: "Chaque prospect et chaque affaire au même endroit, du premier contact à la vente conclue." },
      { icon: "layers", title: "Étapes de pipeline visuelles", text: "Un tableau de pipeline qui montre où en est chaque opportunité." },
      { icon: "compass", title: "Rappels de relance", text: "Des rappels pour que la prochaine action soit toujours planifiée." },
      { icon: "book", title: "Journal d'activité", text: "Appels, visites et messages consignés pour chaque client." },
      { icon: "chart", title: "Rapports commerciaux", text: "Valeur du pipeline, conversion et activité de l'équipe pour les managers." },
      { icon: "rocket", title: "Simple à adopter", text: "Pensé pour les PME africaines et les équipes commerciales, pas pour de lourds projets CRM." },
    ],
    roles: [
      { role: "Fondateurs et dirigeants", value: "Voyez le chiffre d'affaires arriver avant qu'il n'arrive." },
      { role: "Responsables commerciaux et développement", value: "Coachez l'équipe avec de vraies données de pipeline." },
      { role: "Directeurs des opérations", value: "Reliez l'activité commerciale à la livraison et aux stocks." },
      { role: "PME avec une équipe commerciale", value: "De la rigueur commerciale sans CRM coûteux." },
    ],
    outcome: "Des relances plus régulières, des prévisions plus claires et une meilleure maîtrise du chiffre d'affaires.",
    proof: "La voie la plus rapide vers un retour sur investissement visible dans la suite Walumo.",
    useCases: ["Vente terrain", "Distribution", "Pipeline B2B", "Suivi des points de vente et des clients", "Rapports pour les managers"],
    cta: "Voir Sales Tracker en action",
    tone: "sand",
  },
];

export const roadmap = [
  "Des liens plus étroits entre RH, talents et ventes — une seule fiche, plusieurs outils.",
  "Une expérience dédiée aux candidats pour Talent Pro : profils et recherche d'offres.",
  "Davantage de modules de finance et d'opérations sous le même toit.",
  "Des fonctions assistées par l'IA dans toute la suite — rédiger, résumer et faire ressortir l'essentiel.",
];

/* ------------------------------------------------------------------ */
/* Solutions (par résultat)                                            */
/* ------------------------------------------------------------------ */

export const solutions: Solution[] = [
  {
    slug: "hr",
    name: "RH",
    icon: "briefcase",
    headline: "Digitalisez votre système RH,",
    accent: "des congés aux présences",
    problem: "Les RH tournent sur des tableurs, des formulaires papier et des messages. Les approbations se perdent, les soldes sont faux et les rapports demandent des jours.",
    solution: "Kazi Pro, mis en place avec vos politiques, vos entités et vos données.",
    included: ["Licence Kazi Pro", "Mise en œuvre et configuration", "Migration des données depuis les tableurs", "Formation des équipes", "Support continu"],
    changes: ["Les dossiers des employés au même endroit", "Congés et présences sans rapprochement manuel", "Des approbations qui avancent en heures, pas en semaines"],
    bestFor: "Les entreprises qui passent des tableurs à un système RH structuré.",
    products: ["kazi-pro"],
    cta: "Digitaliser les RH",
  },
  {
    slug: "talent-acquisition",
    name: "Acquisition de talents",
    icon: "target",
    headline: "Recrutez plus vite et bâtissez des équipes plus solides,",
    accent: "à la manière dont l'Afrique recrute vraiment",
    problem: "Les CV arrivent par e-mail et WhatsApp, les présélections prennent des semaines et les bons candidats partent ailleurs pendant que le processus s'enlise.",
    solution: "Talent Pro, avec conseil sur le processus de recrutement et mise en place de l'intégration.",
    included: ["Licence Talent Pro", "Conseil sur le processus de recrutement", "Configuration des pipelines et des postes", "Mise en place de l'intégration", "Formation des recruteurs"],
    changes: ["Un pipeline de candidats unique et structuré", "Une visibilité en direct pour les managers recruteurs", "Une expérience candidat meilleure et plus équitable"],
    bestFor: "Les organisations qui font croître leurs effectifs ou recrutent en volume.",
    products: ["talent-pro"],
    cta: "Améliorer le recrutement",
  },
  {
    slug: "commercial-operations",
    name: "Opérations commerciales",
    icon: "chart",
    headline: "Prenez le contrôle de votre pipeline,",
    accent: "du prospect à la signature",
    problem: "Les opportunités dorment dans des carnets et des conversations, les relances sont manquées et les managers font leurs prévisions de mémoire.",
    solution: "Sales Tracker, avec conseil sur le processus de vente et mise en place des rapports.",
    included: ["Licence Sales Tracker", "Conseil sur le processus de vente", "Définition des étapes du pipeline", "Mise en place des rapports", "Formation des équipes"],
    changes: ["Moins de relances manquées", "Chaque opportunité visible", "Des prévisions plus claires pour les managers"],
    bestFor: "Les PME orientées vente et les équipes commerciales au sein de grandes organisations.",
    products: ["sales-tracker"],
    cta: "Maîtriser votre pipeline",
  },
  {
    slug: "digital-transformation",
    name: "Transformation digitale",
    icon: "rocket",
    headline: "Modernisez le fonctionnement de toute votre organisation,",
    accent: "sur une seule suite opérationnelle",
    problem: "Les ressources humaines, le recrutement et la vente tournent sur des outils déconnectés, et chaque programme de changement échoue sur l'adoption.",
    solution: "La suite Walumo complète et toute la couche de services : conseil, intégration de systèmes, mise en œuvre, conduite du changement et support continu.",
    included: ["Conseil en transformation", "Intégration de systèmes", "Mise en œuvre sur toute la suite", "Conduite du changement", "Support continu et services managés"],
    changes: ["Équipes, recrutement et ventes reliés sur un même système", "Des équipes qui adoptent réellement les outils", "Un partenaire qui grandit avec vous, d'un site à plusieurs pays"],
    bestFor: "Les grandes entreprises, les administrations et programmes publics, et les ONG.",
    products: ["kazi-pro", "talent-pro", "sales-tracker"],
    cta: "Planifier votre transformation",
  },
];

/** Modèle de mise en œuvre commun à toutes les solutions (audit : évaluer → accompagner). */
export const deliverySteps = [
  { title: "Évaluer", text: "Nous cartographions la façon dont le travail se fait aujourd'hui, les outils utilisés et ce à quoi doit ressembler la réussite." },
  { title: "Configurer", text: "Nous paramétrons la plateforme selon vos politiques, vos entités, vos rôles et vos circuits d'approbation." },
  { title: "Migrer", text: "Nous reprenons vos données existantes depuis les tableurs et les anciens outils, et nous les vérifions avec vous." },
  { title: "Former", text: "Nous formons administrateurs, managers et utilisateurs aux processus qu'ils utiliseront chaque jour." },
  { title: "Lancer", text: "Nous mettons en service par étapes, avec l'équipe à vos côtés pendant les premières semaines." },
  { title: "Accompagner et améliorer", text: "Nous restons pour soutenir l'adoption et continuer d'améliorer le paramétrage au fil de votre croissance." },
];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const services: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "graduation",
    title: "Formation aux talents technologiques",
    text: "Donnez à vos équipes des compétences numériques concrètes et tournées vers l'avenir grâce à une formation structurée, une intégration fluide et une adoption accélérée.",
  },
  {
    icon: "compass",
    title: "Conseil en transformation digitale",
    text: "Modernisez le fonctionnement de votre organisation grâce à la technologie, à l'automatisation et à des stratégies digitales évolutives.",
  },
  {
    icon: "shield",
    title: "Support et services managés",
    text: "Assurez la performance dans la durée grâce à l'optimisation continue, au support technique et à des contrats de service pour entreprises.",
  },
  {
    icon: "cpu",
    title: "Développement de systèmes de vente et d'opérations",
    text: "Concevez et déployez des systèmes intelligents qui simplifient les opérations et soutiennent la croissance de l'entreprise.",
  },
];

/* ------------------------------------------------------------------ */
/* Ce que nous faisons                                                 */
/* ------------------------------------------------------------------ */

// Les constantes anglaises ont un type littéral ; on les contourne par un cast de type.
export const vision = (
  "Devenir la première rampe de lancement de l'Afrique pour la transformation portée par la technologie, en créant un impact durable grâce à l'innovation, à la création d'emplois et à l'excellence numérique."
) as unknown as typeof import("./content").vision;
export const mission = (
  "Accélérer la transformation digitale de l'Afrique grâce à une technologie de classe mondiale, en favorisant la collaboration entre frontières, fonctions et générations."
) as unknown as typeof import("./content").mission;

export const pillars: { icon: IconName; title: string; text: string; tags: string[] }[] = [
  {
    icon: "code",
    title: "Développement de produits numériques",
    text: "De l'idée à la production, nous concevons et construisons des logiciels évolutifs — à commencer par Kazi Pro, Talent Pro et Sales Tracker.",
    tags: ["Applications web et mobiles", "Architecture d'API", "Infrastructure cloud"],
  },
  {
    icon: "sparkles",
    title: "Défis d'innovation",
    text: "Des hackathons et des concours numériques qui mettent en lumière les talents technologiques émergents d'Afrique, comme le Walumo Hacklab.",
    tags: ["Hackathons", "Concours de code", "Vitrines technologiques"],
  },
  {
    icon: "handshake",
    title: "Partenariats avec les start-ups et conseil en innovation",
    text: "Nous collaborons avec des start-ups et des grandes entreprises pour tester et déployer des idées numériques innovantes.",
    tags: ["Conseil stratégique", "Développement de MVP", "Stratégie de mise sur le marché"],
  },
  {
    icon: "users",
    title: "Développement des talents et construction d'écosystème",
    text: "Nous donnons aux bâtisseurs du numérique africain les outils, la formation et les opportunités pour réussir.",
    tags: ["Programmes de formation", "Mentorat", "Accès à la communauté"],
  },
];

export const howWeWork = [
  { title: "Découverte", text: "Nous nous immergeons dans votre vision, vos défis et vos objectifs, lors d'un atelier structuré qui cadre précisément la mission." },
  { title: "Architecture", text: "Conception technique, cartographie UX et choix technologiques — chaque décision est documentée, débattue et validée." },
  { title: "Construire et itérer", text: "Des sprints agiles de deux semaines avec des démos continues, pour que vous voyiez l'avancement réel à chaque étape." },
  { title: "Déployer et grandir", text: "Mise en production, suivi et feuille de route de croissance. Nous restons votre partenaire après le lancement." },
];

export const advantages: { icon: IconName; title: string; text: string }[] = [
  { icon: "layers", title: "Intégré, pas fragmenté", text: "Une suite connectée plutôt que cinq outils déconnectés." },
  { icon: "globe", title: "Standards internationaux, adaptation locale", text: "Des logiciels de niveau entreprise adaptés aux prix, à la connectivité et aux réalités du recrutement en Afrique." },
  { icon: "shield", title: "Conçu en Afrique, soutenu par ITM", text: "Nos propres produits, soutenus par l'empreinte d'ITM Holding dans 20+ pays." },
  { icon: "target", title: "Des résultats, pas seulement un logiciel", text: "Nous vous aidons à mettre en œuvre, adopter et améliorer — pas seulement à acheter une licence." },
  { icon: "rocket", title: "Un partenaire qui grandit avec vous", text: "De la PME à l'entreprise multi-pays, sur la même plateforme." },
];

export const painPoints: { icon: IconName; title: string; text: string }[] = [
  { icon: "book", title: "Des tableurs partout", text: "Les données essentielles des RH, du recrutement et des ventes vivent dans des fichiers déjà périmés au moment où ils sont partagés." },
  { icon: "handshake", title: "Un travail qui passe par WhatsApp", text: "Approbations, CV et relances clients sont éparpillés dans des conversations où personne ne peut rien retrouver." },
  { icon: "layers", title: "Des outils qui ne se parlent pas", text: "Des systèmes déconnectés obligent à ressaisir sans cesse les mêmes informations, et les dirigeants rendent compte du mois dernier." },
];

/* ------------------------------------------------------------------ */
/* Publications                                                        */
/* ------------------------------------------------------------------ */

export const articles: Article[] = [
  {
    slug: "stop-running-operations-on-spreadsheets",
    category: "Articles",
    topic: "Opérations",
    title: "Pourquoi les entreprises africaines ne devraient pas piloter indéfiniment leurs opérations critiques avec des tableurs",
    excerpt: "Le tableur est un excellent point de départ et une destination dangereuse. Voici comment savoir si vous l'avez dépassé — et quoi faire ensuite.",
    date: "22 septembre 2026",
    readTime: "6 min de lecture",
    author: "Équipe éditoriale Walumo",
    image: "/images/office-1.jpg",
    related: "kazi-pro",
    sections: [
      {
        heading: "Le tableur vous a menés jusqu'ici",
        paragraphs: [
          "Presque toutes les entreprises en croissance en Afrique tiennent leurs premiers dossiers RH, listes de recrutement et pipelines commerciaux dans des tableurs. Ils sont souples, peu coûteux et tout le monde sait s'en servir.",
          "Le problème n'est pas le tableur lui-même. C'est ce qui arrive quand un fichier conçu pour une seule personne devient le système de référence de toute une organisation.",
        ],
      },
      {
        heading: "Cinq signes que vous l'avez dépassé",
        paragraphs: ["Si plusieurs de ces situations vous parlent, le tableur est devenu un risque plutôt qu'un outil :"],
        list: [
          "Plusieurs versions du même fichier circulent par e-mail ou WhatsApp.",
          "Les soldes de congé ou les chiffres de vente sont reconstitués à la main avant chaque réunion.",
          "Une seule personne comprend vraiment comment le fichier fonctionne.",
          "Les approbations se font en dehors du fichier, qui n'est donc jamais tout à fait à jour.",
          "Vous ne pouvez pas répondre à une question simple — qui est en congé, quelles affaires sont bloquées — sans demander à quelqu'un.",
        ],
      },
      {
        heading: "Quitter les tableurs sans perturber l'activité",
        paragraphs: [
          "Commencez par le processus qui fait le plus mal, pas par toute l'organisation. Nettoyez les données que vous avez déjà, décidez qui approuve quoi, et migrez un processus à la fois.",
          "Surtout, considérez-le comme un changement pour les personnes, et non comme l'installation d'un logiciel. La formation et l'accompagnement des premières semaines décident si un nouveau système est adopté ou discrètement abandonné.",
        ],
      },
    ],
  },
  {
    slug: "from-whatsapp-to-workflow-hiring",
    category: "Articles",
    topic: "Recrutement",
    title: "De WhatsApp au workflow : comment structurer le recrutement sans perdre le contact humain",
    excerpt: "Sur tout le continent, les candidats postulent par WhatsApp, par recommandation et par e-mail. Structurer ne veut pas dire fermer ces portes.",
    date: "15 septembre 2026",
    readTime: "5 min de lecture",
    author: "Équipe éditoriale Walumo",
    image: "/images/team-workshop.jpg",
    related: "talent-pro",
    sections: [
      {
        heading: "Les canaux informels sont une force",
        paragraphs: [
          "Sur de nombreux marchés africains, les meilleurs candidats arrivent par recommandation, par les réseaux communautaires et par messages WhatsApp. Les forcer à passer par un portail rigide, c'est les perdre.",
          "L'objectif n'est pas de remplacer ces canaux, mais de s'assurer que chaque candidat qui arrive par ce biais atterrit dans un pipeline unique et visible.",
        ],
      },
      {
        heading: "Ce que structurer veut vraiment dire",
        paragraphs: ["Un processus de recrutement structuré offre à chacun les mêmes garanties de base :"],
        list: [
          "Chaque candidature est enregistrée une seule fois, quel que soit le canal.",
          "Chaque candidat a un statut clair que recruteurs et managers peuvent consulter.",
          "Les relances sont planifiées, pas laissées à la mémoire.",
          "Les candidats reçoivent une réponse, même quand c'est non.",
        ],
      },
      {
        heading: "Rester humain",
        paragraphs: [
          "La structure libère les recruteurs de la chasse aux CV pour qu'ils passent du temps à parler aux gens. Un pipeline partagé permet aussi de donner plus facilement aux candidats un retour honnête et rapide — c'est ainsi que se construit la réputation d'un employeur.",
        ],
      },
    ],
  },
  {
    slug: "hr-approvals-multi-country",
    category: "Articles",
    topic: "RH",
    title: "Ce qui ralentit les approbations RH dans les organisations africaines multi-pays — et comment y remédier",
    excerpt: "Quand une demande de congé traverse entités, devises et fuseaux horaires, une simple approbation peut prendre des semaines. Ce n'est pas une fatalité.",
    date: "8 septembre 2026",
    readTime: "5 min de lecture",
    author: "Équipe éditoriale Walumo",
    image: "/images/office-nairobi.jpg",
    related: "kazi-pro",
    sections: [
      {
        heading: "Là où les approbations se bloquent",
        paragraphs: ["Dans les groupes comptant plusieurs entités, les mêmes schémas reviennent sans cesse :"],
        list: [
          "Des circuits d'approbation que personne n'a mis par écrit.",
          "Des managers en déplacement qui approuvent les demandes avec des jours de retard.",
          "Des règles locales différentes, appliquées de mémoire.",
          "Aucun endroit unique pour voir ce qui est en attente, et depuis combien de temps.",
        ],
      },
      {
        heading: "Trois solutions qui fonctionnent",
        paragraphs: [
          "D'abord, écrivez le circuit d'approbation par entité et par type de demande, puis configurez-le une fois pour toutes. Ensuite, laissez les managers approuver depuis leur téléphone, où qu'ils soient. Enfin, donnez aux RH une vue en direct des demandes en attente, pour que les blocages deviennent visibles avant de devenir des réclamations.",
        ],
      },
      {
        heading: "Pourquoi c'est important",
        paragraphs: [
          "Des approbations lentes ne sont pas qu'un problème RH. Elles pèsent sur le moral, la planification et l'exactitude de la paie. Les corriger est souvent le gain visible le plus rapide de tout projet de digitalisation RH.",
        ],
      },
    ],
  },
  {
    slug: "sales-discipline-without-heavy-crm",
    category: "Articles",
    topic: "Ventes",
    title: "Comment les PME peuvent instaurer une discipline commerciale sans acheter un CRM lourd",
    excerpt: "Inutile de lancer un projet CRM de six mois pour cesser de perdre des affaires. Il vous faut un pipeline clair, des relances régulières et un rythme hebdomadaire.",
    date: "1 septembre 2026",
    readTime: "4 min de lecture",
    author: "Équipe éditoriale Walumo",
    image: "/images/office-2.jpg",
    related: "sales-tracker",
    sections: [
      {
        heading: "La discipline avant le logiciel",
        paragraphs: [
          "La plupart des PME ne perdent pas des affaires par manque de fonctionnalités. Elles les perdent parce que les relances glissent et que personne ne voit l'ensemble du pipeline.",
        ],
      },
      {
        heading: "Un rythme commercial simple",
        paragraphs: ["Trois habitudes font l'essentiel de la différence :"],
        list: [
          "Convenez de cinq ou six étapes de pipeline que tout le monde comprend.",
          "Ne terminez jamais une conversation sans planifier la prochaine action.",
          "Passez le pipeline en revue ensemble une fois par semaine, affaire par affaire.",
        ],
      },
      {
        heading: "Choisir le bon outil",
        paragraphs: [
          "Choisissez un outil que votre équipe ouvrira vraiment chaque jour : rapide à mettre à jour depuis un téléphone, simple à exploiter pour les rapports et au prix adapté à une entreprise en croissance. Le meilleur CRM est celui que vos commerciaux utilisent.",
        ],
      },
    ],
  },
];

export const reports: Report[] = [
  {
    slug: "africa-hiring-report",
    category: "Reports",
    title: "Africa Hiring Report",
    summary: "Ce qui allonge les délais de recrutement dans les organisations africaines, et comment y remédier.",
    status: "Bientôt disponible",
    chapters: ["Où se perd le temps de recrutement", "Le rôle des canaux informels", "Ce que font autrement les équipes qui recrutent vite", "Un plan d'action concret"],
    audience: ["Directeurs RH", "Équipes d'acquisition de talents", "Cabinets de recrutement"],
  },
  {
    slug: "moving-off-spreadsheets-guide",
    category: "Reports",
    title: "Guide pratique pour sortir votre entreprise des tableurs",
    summary: "Un guide pas à pas pour digitaliser les processus RH, de recrutement et de vente sans perturber l'activité.",
    status: "Bientôt disponible",
    chapters: ["Choisir par où commencer", "Nettoyer vos données", "Concevoir les circuits d'approbation", "Formation et adoption", "Mesurer le résultat"],
    audience: ["Fondateurs et directeurs généraux", "Responsables des opérations et de la finance", "Responsables RH"],
  },
];

const hacklabPhotos = [
  "img_2026", "img_1866", "img_2043", "img_1888", "img_1964", "img_2005", "img_1862", "img_1897",
  "img_1951", "img_1956", "img_2005-b", "img_2092", "img_2015", "img_2110", "img_2295", "img_2314",
  "img_2404", "img_2433", "img_2459", "img_2512", "img_2546", "img_2716", "img_2850", "img_2882",
];

export const events: EventItem[] = [
  {
    slug: "walumo-hacklab",
    category: "Events",
    title: "Walumo Hacklab",
    summary:
      "Développeurs, designers et experts produit se sont réunis pour concevoir, présenter et démontrer des solutions — dans le cadre de l'engagement de Walumo à mettre en lumière les talents technologiques émergents d'Afrique.",
    status: "Événement passé",
    cover: "/images/hackathon/img_2026.jpg",
    highlights: [
      { value: "120+", label: "participants" },
      { value: "18", label: "équipes" },
      { value: "48h", label: "de création" },
    ],
    gallery: hacklabPhotos.map((p, i) => ({
      src: `/images/hackathon/${p}.jpg`,
      alt: `Walumo Hacklab — photo ${i + 1}`,
    })),
  },
];
