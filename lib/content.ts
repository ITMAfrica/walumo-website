/**
 * Walumo site content.
 * Source: "Walumo Website Content Blueprint" + "Brand & Positioning Audit" (developer handoff),
 * with the audit's corrections applied (typos, unverified claims, placeholder testimonial removed).
 *
 * ⚠️ Before publishing: confirm every figure and claim with Walumo / ITM leadership.
 */
import type { IconName } from "./site";

/* ------------------------------------------------------------------ */
/* Proof (only figures provided in the blueprint)                      */
/* ------------------------------------------------------------------ */

export const proofStats = [
  { value: "20+", label: "African countries across the ITM Holding footprint" },
  { value: "3", label: "connected enterprise platforms" },
  { value: "23+", label: "companies running Kazi Pro" },
];

/** ITM Holding group entities — logo wall (logos in /public/logos). */
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
/* Products                                                            */
/* ------------------------------------------------------------------ */

export type Product = {
  slug: "kazi-pro" | "talent-pro" | "sales-tracker";
  name: string;
  category: string;
  tagline: string;
  headline: string;
  accent: string;
  body: string;
  pains: { title: string; text: string }[];
  modules: { icon: IconName; title: string; text: string }[];
  roles: { role: string; value: string }[];
  outcome: string;
  proof: string;
  useCases?: string[];
  screenshot?: string;
  cta: string;
  tone: "mint" | "sky" | "sand";
};

export const products: Product[] = [
  {
    slug: "kazi-pro",
    name: "Kazi Pro",
    category: "HR & workforce",
    tagline: "The practical HR platform for African businesses",
    headline: "Run HR with clarity,",
    accent: "from employee records to approvals",
    body: "Kazi Pro helps HR and operations teams manage employee records, leave, attendance, approvals and workforce visibility in one practical platform built for African organisations.",
    pains: [
      { title: "Chasing approvals", text: "Leave and payment requests move by email, paper and WhatsApp, and nobody knows where they are stuck." },
      { title: "Balances nobody trusts", text: "Leave balances and attendance reports are rebuilt by hand in spreadsheets every month." },
      { title: "Scattered employee files", text: "Contracts, documents and payroll information live in different places, per entity and per country." },
    ],
    modules: [
      { icon: "users", title: "Employee records", text: "One place for every employee file, contract and document, across entities and countries." },
      { icon: "compass", title: "Leave & approvals", text: "Self-service leave requests with clear approval chains and live balances." },
      { icon: "target", title: "Time & attendance", text: "Attendance tracking, including location-aware check-ins, without manual reconciliation." },
      { icon: "briefcase", title: "Payment requests & payslips", text: "Structured payment requests and access to payslips from the same workspace." },
      { icon: "graduation", title: "Onboarding & offboarding", text: "Consistent checklists so every arrival and departure is handled properly." },
      { icon: "chart", title: "Reporting & workforce visibility", text: "Headcount, leave and attendance reports that leaders can read at a glance." },
    ],
    roles: [
      { role: "HR director", value: "One reliable view of the workforce across entities." },
      { role: "Finance", value: "Cleaner attendance and payment data before payroll." },
      { role: "Line manager", value: "Approve requests in seconds, from any device." },
      { role: "Employee", value: "Request leave and find documents without chasing HR." },
    ],
    outcome: "HR teams stop chasing paper and spreadsheets, and leaders get a live, trustworthy view of their workforce.",
    proof: "Proven inside ITM Holding entities before external rollout — 23+ companies already run Kazi Pro.",
    screenshot: "/images/product-kazipro.jpg",
    cta: "Request a Kazi Pro demo",
    tone: "sky",
  },
  {
    slug: "talent-pro",
    name: "Talent Pro",
    category: "Talent acquisition",
    tagline: "Africa's recruitment platform for faster hiring",
    headline: "Hire faster",
    accent: "without losing the human touch",
    body: "Talent Pro gives recruiters and HR teams a structured pipeline to manage candidates, roles, communication and onboarding, built around the realities of African talent markets.",
    pains: [
      { title: "For companies", text: "Slow shortlisting, scattered CVs, missed candidates and no clear view of where each role stands." },
      { title: "For recruiters", text: "Manual follow-ups, duplicated candidate records, weak collaboration and no live hiring view." },
      { title: "For candidates", text: "Applying without visibility, sending the same documents again and again, and no feedback loop." },
    ],
    modules: [
      { icon: "layers", title: "Structured candidate pipeline", text: "Every candidate in one pipeline, with clear stages and no duplicates." },
      { icon: "newspaper", title: "Role posting & tracking", text: "Publish roles and follow applications, views and progress per job." },
      { icon: "chart", title: "Recruiter command centre", text: "A live dashboard of active jobs, candidates in pipeline and hires." },
      { icon: "handshake", title: "Recruiter collaboration", text: "Shared notes, status changes and hand-offs between recruiters and hiring managers." },
      { icon: "graduation", title: "Candidate onboarding flow", text: "A structured path from offer to first day." },
      { icon: "globe", title: "Built for African talent markets", text: "Works with informal networks, WhatsApp-friendly applications and local qualifications." },
    ],
    roles: [
      { role: "HR & talent teams", value: "A clean pipeline and a live view of every open role." },
      { role: "Recruitment agencies", value: "Collaboration and accountability across recruiters." },
      { role: "Fast-growing companies", value: "Structure for high-volume hiring without losing candidates." },
      { role: "NGOs & universities", value: "A fair, transparent process for every applicant." },
    ],
    outcome: "Structure, visibility and speed in hiring — so you stop losing good candidates to a slow, scattered process.",
    proof: "An applicant tracking system and recruitment CRM in one, built for African hiring teams that need visibility, collaboration and candidate follow-through.",
    screenshot: "/images/product-talentpro.jpg",
    cta: "Request a Talent Pro demo",
    tone: "mint",
  },
  {
    slug: "sales-tracker",
    name: "Sales Tracker",
    category: "Commercial operations",
    tagline: "The revenue control tool for African sales teams",
    headline: "Keep every opportunity visible",
    accent: "and every follow-up on track",
    body: "Sales Tracker helps sales-led teams manage leads, deals, follow-ups, activity and pipeline reporting so managers can see what is moving and what needs attention.",
    pains: [
      { title: "Follow-ups slip", text: "Sales reps forget to call back, and opportunities quietly go cold." },
      { title: "No pipeline visibility", text: "Managers can't see what is moving without chasing every rep for an update." },
      { title: "Deals in notebooks", text: "Opportunities live in notebooks, personal phones and WhatsApp chats." },
    ],
    modules: [
      { icon: "target", title: "Lead & deal tracking", text: "Every lead and deal in one place, from first contact to closed sale." },
      { icon: "layers", title: "Visual pipeline stages", text: "A pipeline board that shows where every opportunity stands." },
      { icon: "compass", title: "Follow-up reminders", text: "Reminders so the next action is always scheduled." },
      { icon: "book", title: "Activity logging", text: "Calls, visits and messages logged against each customer." },
      { icon: "chart", title: "Sales reporting", text: "Pipeline value, conversion and team activity for managers." },
      { icon: "rocket", title: "Simple to adopt", text: "Designed for African SMEs and sales-led teams, not heavy CRM projects." },
    ],
    roles: [
      { role: "Founders & owners", value: "See revenue coming before it lands." },
      { role: "Sales managers & BD leads", value: "Coach the team with real pipeline data." },
      { role: "Operations directors", value: "Connect sales activity to delivery and stock." },
      { role: "SMEs with a sales team", value: "Sales discipline without an expensive CRM." },
    ],
    outcome: "More consistent follow-up, clearer forecasting and better revenue control.",
    proof: "The fastest route to a clear return on investment in the Walumo suite.",
    useCases: ["Field sales", "Distribution", "B2B pipeline", "Store & customer follow-up", "Manager reporting"],
    cta: "See Sales Tracker in action",
    tone: "sand",
  },
];

export const roadmap = [
  "Deeper connections between HR, talent and sales — one record, many tools.",
  "A candidate-facing experience for Talent Pro: profiles and job discovery.",
  "More finance and operations modules under the same roof.",
  "AI-assisted features across the suite — drafting, summarising and surfacing what matters.",
];

/* ------------------------------------------------------------------ */
/* Solutions (by outcome)                                              */
/* ------------------------------------------------------------------ */

export type Solution = {
  slug: "hr" | "talent-acquisition" | "commercial-operations" | "digital-transformation";
  name: string;
  icon: IconName;
  headline: string;
  accent: string;
  problem: string;
  solution: string;
  included: string[];
  changes: string[];
  bestFor: string;
  products: Product["slug"][];
  cta: string;
};

export const solutions: Solution[] = [
  {
    slug: "hr",
    name: "HR",
    icon: "briefcase",
    headline: "Digitise your HR system,",
    accent: "from leave to attendance",
    problem: "HR runs on spreadsheets, paper forms and messages. Approvals get lost, balances are wrong and reports take days to build.",
    solution: "Kazi Pro, implemented with your policies, your entities and your data.",
    included: ["Kazi Pro licence", "Implementation and configuration", "Data migration from spreadsheets", "Team training", "Ongoing support"],
    changes: ["Employee records in one place", "Leave and attendance without manual reconciliation", "Approvals that move in hours, not weeks"],
    bestFor: "Businesses moving from spreadsheets to a structured HR system.",
    products: ["kazi-pro"],
    cta: "Digitise HR",
  },
  {
    slug: "talent-acquisition",
    name: "Talent acquisition",
    icon: "target",
    headline: "Hire faster and build stronger teams,",
    accent: "the way African hiring really works",
    problem: "CVs arrive by email and WhatsApp, shortlists take weeks and good candidates go elsewhere while the process stalls.",
    solution: "Talent Pro, with recruitment-process advisory and onboarding setup.",
    included: ["Talent Pro licence", "Recruitment-process advisory", "Pipeline and role configuration", "Onboarding setup", "Recruiter training"],
    changes: ["A single, structured candidate pipeline", "Live visibility for hiring managers", "A better, fairer candidate experience"],
    bestFor: "Organisations scaling headcount or running high-volume hiring.",
    products: ["talent-pro"],
    cta: "Improve hiring",
  },
  {
    slug: "commercial-operations",
    name: "Commercial operations",
    icon: "chart",
    headline: "Take control of your pipeline,",
    accent: "from lead to close",
    problem: "Opportunities sit in notebooks and chats, follow-ups are missed and managers forecast from memory.",
    solution: "Sales Tracker, with sales-process consulting and reporting setup.",
    included: ["Sales Tracker licence", "Sales-process consulting", "Pipeline stage design", "Reporting setup", "Team training"],
    changes: ["Fewer missed follow-ups", "Every opportunity visible", "Clearer forecasting for managers"],
    bestFor: "Sales-led SMEs and commercial teams inside larger organisations.",
    products: ["sales-tracker"],
    cta: "Control your pipeline",
  },
  {
    slug: "digital-transformation",
    name: "Digital transformation",
    icon: "rocket",
    headline: "Modernise how your whole organisation runs,",
    accent: "on one operating suite",
    problem: "People, hiring and sales run on disconnected tools, and every change programme stalls at adoption.",
    solution: "The full Walumo suite plus the complete services layer: consulting, systems integration, implementation, change management and ongoing support.",
    included: ["Transformation consulting", "Systems integration", "Implementation across the suite", "Change management", "Ongoing support and managed services"],
    changes: ["People, hiring and sales connected on one system", "Teams that actually adopt the tools", "A partner that scales with you, from one site to many countries"],
    bestFor: "Enterprises, government and public programmes, and NGOs.",
    products: ["kazi-pro", "talent-pro", "sales-tracker"],
    cta: "Plan your transformation",
  },
];

/** Implementation model shared by every solution (audit: assess → support). */
export const deliverySteps = [
  { title: "Assess", text: "We map how the work actually happens today, the tools in use and what success must look like." },
  { title: "Configure", text: "We set up the platform around your policies, entities, roles and approval chains." },
  { title: "Migrate", text: "We move your existing data from spreadsheets and legacy tools, and check it with you." },
  { title: "Train", text: "We train administrators, managers and users on the workflows they will use every day." },
  { title: "Launch", text: "We go live in stages, with the team close by for the first weeks." },
  { title: "Support & improve", text: "We stay on to support adoption and keep improving the setup as you grow." },
];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const services: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "graduation",
    title: "Tech talent training",
    text: "Equip teams with practical, future-ready digital capabilities through structured training, seamless onboarding and accelerated adoption.",
  },
  {
    icon: "compass",
    title: "Digital transformation consulting",
    text: "Modernise how your organisation operates through technology, automation and scalable digital strategies.",
  },
  {
    icon: "shield",
    title: "Support & managed services",
    text: "Ensure long-term performance through continuous optimisation, technical support and enterprise service agreements.",
  },
  {
    icon: "cpu",
    title: "Sales & operations systems development",
    text: "Design and implement intelligent systems that streamline operations and drive business growth.",
  },
];

/* ------------------------------------------------------------------ */
/* What we do                                                          */
/* ------------------------------------------------------------------ */

export const vision =
  "To become Africa's premier launchpad for tech-led transformation, creating sustainable impact through innovation, job creation and digital excellence.";
export const mission =
  "To accelerate Africa's digital transformation through world-class technology, fostering collaboration across borders, functions and generations.";

export const pillars: { icon: IconName; title: string; text: string; tags: string[] }[] = [
  {
    icon: "code",
    title: "Digital product development",
    text: "From concept to production, we design and build scalable software — starting with Kazi Pro, Talent Pro and Sales Tracker.",
    tags: ["Web & mobile apps", "API architecture", "Cloud infrastructure"],
  },
  {
    icon: "sparkles",
    title: "Innovation challenges",
    text: "Hackathons and digital competitions that spotlight Africa's emerging tech talent, like the Walumo Hacklab.",
    tags: ["Hackathons", "Code competitions", "Tech showcases"],
  },
  {
    icon: "handshake",
    title: "Startup partnerships & innovation advisory",
    text: "We collaborate with startups and corporates to test and scale innovative digital ideas.",
    tags: ["Strategic advisory", "MVP development", "Go-to-market strategy"],
  },
  {
    icon: "users",
    title: "Talent development & ecosystem building",
    text: "We equip Africa's digital builders with the tools, training and opportunities to thrive.",
    tags: ["Training programmes", "Mentorship", "Community access"],
  },
];

export const howWeWork = [
  { title: "Discovery", text: "We immerse ourselves in your vision, challenges and goals, in a structured workshop that frames the mission precisely." },
  { title: "Architecture", text: "Technical design, UX mapping and technology choices — every decision documented, debated and validated." },
  { title: "Build & iterate", text: "Agile two-week sprints with continuous demos, so you see living progress at every stage." },
  { title: "Deploy & scale", text: "Production launch, monitoring and a growth roadmap. We remain your partner after launch." },
];

export const advantages: { icon: IconName; title: string; text: string }[] = [
  { icon: "layers", title: "Integrated, not fragmented", text: "One connected suite instead of five disconnected tools." },
  { icon: "globe", title: "Global standards, local fit", text: "Enterprise-grade software tuned to African pricing, connectivity and hiring realities." },
  { icon: "shield", title: "Built in Africa, backed by ITM", text: "Our own product IP, supported across the ITM Holding footprint in 20+ countries." },
  { icon: "target", title: "Outcomes, not just software", text: "We help you implement, adopt and improve — not just buy a licence." },
  { icon: "rocket", title: "A partner that scales with you", text: "From SME to multi-country enterprise, on the same platform." },
];

export type PainPoint = { icon: IconName; title: string; text: string; scene: "spreadsheets" | "chat" | "tools" };

export const painPoints: PainPoint[] = [
  { icon: "book", scene: "spreadsheets", title: "Spreadsheets everywhere", text: "Critical HR, hiring and sales data lives in files that are out of date the moment they are shared." },
  { icon: "handshake", scene: "chat", title: "Work that runs on WhatsApp", text: "Approvals, CVs and customer follow-ups are scattered across chats nobody can search." },
  { icon: "layers", scene: "tools", title: "Tools that never talk", text: "Disconnected systems mean the same information is typed again and again, and leaders report on last month." },
];

/* ------------------------------------------------------------------ */
/* Insights                                                            */
/* ------------------------------------------------------------------ */

export type InsightCategory = "Articles" | "Reports" | "Events" | "Case studies";

export type Article = {
  slug: string;
  category: "Articles";
  topic: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  sections: { heading: string; paragraphs: string[]; list?: string[] }[];
  related: Product["slug"];
};

export const articles: Article[] = [
  {
    slug: "stop-running-operations-on-spreadsheets",
    category: "Articles",
    topic: "Operations",
    title: "Why African businesses should not run critical operations on spreadsheets forever",
    excerpt: "Spreadsheets are a brilliant starting point and a dangerous destination. Here is how to tell when you have outgrown them — and what to do next.",
    date: "22 September 2026",
    readTime: "6 min read",
    author: "Walumo Editorial Team",
    image: "/images/office-1.jpg",
    related: "kazi-pro",
    sections: [
      {
        heading: "The spreadsheet got you here",
        paragraphs: [
          "Almost every growing business in Africa runs its first HR records, hiring lists and sales pipelines in spreadsheets. They are flexible, cheap and everyone knows how to use them.",
          "The problem is not the spreadsheet itself. It is what happens when a file built for one person becomes the system of record for a whole organisation.",
        ],
      },
      {
        heading: "Five signs you have outgrown it",
        paragraphs: ["If several of these sound familiar, the spreadsheet has become a risk rather than a tool:"],
        list: [
          "Several versions of the same file circulate by email or WhatsApp.",
          "Leave balances or sales figures are rebuilt by hand before every meeting.",
          "Only one person really understands how the file works.",
          "Approvals happen outside the file, so it is never fully up to date.",
          "You cannot answer a simple question — who is on leave, which deals are stuck — without asking someone.",
        ],
      },
      {
        heading: "Moving off spreadsheets without disruption",
        paragraphs: [
          "Start with the process that hurts the most, not the whole organisation. Clean the data you already have, agree who approves what, and move one workflow at a time.",
          "Most importantly, treat it as a change for people, not a software installation. Training and support in the first weeks decide whether a new system is adopted or quietly abandoned.",
        ],
      },
    ],
  },
  {
    slug: "from-whatsapp-to-workflow-hiring",
    category: "Articles",
    topic: "Hiring",
    title: "From WhatsApp to workflow: how to structure hiring without losing the human touch",
    excerpt: "Candidates across the continent apply through WhatsApp, referrals and email. Structure does not have to mean shutting those doors.",
    date: "15 September 2026",
    readTime: "5 min read",
    author: "Walumo Editorial Team",
    image: "/images/team-workshop.jpg",
    related: "talent-pro",
    sections: [
      {
        heading: "Informal channels are a strength",
        paragraphs: [
          "In many African markets, the best candidates arrive through referrals, community networks and WhatsApp messages. Forcing everyone through a rigid portal loses them.",
          "The goal is not to replace these channels, but to make sure every candidate who arrives through them lands in one visible pipeline.",
        ],
      },
      {
        heading: "What structure really means",
        paragraphs: ["A structured hiring process gives everyone the same basic guarantees:"],
        list: [
          "Every application is recorded once, whatever the channel.",
          "Each candidate has a clear status that recruiters and managers can see.",
          "Follow-ups are scheduled, not remembered.",
          "Candidates hear back, even when the answer is no.",
        ],
      },
      {
        heading: "Keeping it human",
        paragraphs: [
          "Structure frees recruiters from chasing CVs so they can spend time talking to people. A shared pipeline also makes it easier to give candidates honest, timely feedback — which is how employer reputations are built.",
        ],
      },
    ],
  },
  {
    slug: "hr-approvals-multi-country",
    category: "Articles",
    topic: "HR",
    title: "What slows HR approvals in multi-country African organisations — and how to fix it",
    excerpt: "When a leave request crosses entities, currencies and time zones, a simple approval can take weeks. It does not have to.",
    date: "8 September 2026",
    readTime: "5 min read",
    author: "Walumo Editorial Team",
    image: "/images/office-nairobi.jpg",
    related: "kazi-pro",
    sections: [
      {
        heading: "Where approvals get stuck",
        paragraphs: ["In group structures with several entities, the same patterns come up again and again:"],
        list: [
          "Approval chains that nobody has written down.",
          "Managers who travel and approve requests days late.",
          "Different local rules applied from memory.",
          "No single place to see what is pending, and for how long.",
        ],
      },
      {
        heading: "Three fixes that work",
        paragraphs: [
          "First, write the approval chain down per entity and per request type, then configure it once. Second, let managers approve from their phone, wherever they are. Third, give HR a live view of pending requests so bottlenecks become visible before they become complaints.",
        ],
      },
      {
        heading: "Why it matters",
        paragraphs: [
          "Slow approvals are not only an HR problem. They affect morale, planning and payroll accuracy. Fixing them is often the fastest visible win of any HR digitisation project.",
        ],
      },
    ],
  },
  {
    slug: "sales-discipline-without-heavy-crm",
    category: "Articles",
    topic: "Sales",
    title: "How SMEs can build sales discipline without buying a heavy CRM",
    excerpt: "You do not need a six-month CRM project to stop losing deals. You need a clear pipeline, consistent follow-up and a weekly rhythm.",
    date: "1 September 2026",
    readTime: "4 min read",
    author: "Walumo Editorial Team",
    image: "/images/office-2.jpg",
    related: "sales-tracker",
    sections: [
      {
        heading: "Discipline before software",
        paragraphs: [
          "Most SMEs do not lose deals because they lack features. They lose them because follow-ups slip and nobody can see the whole pipeline.",
        ],
      },
      {
        heading: "A simple sales rhythm",
        paragraphs: ["Three habits make most of the difference:"],
        list: [
          "Agree on five or six pipeline stages that everyone understands.",
          "Never close a conversation without scheduling the next action.",
          "Review the pipeline together once a week, deal by deal.",
        ],
      },
      {
        heading: "Choosing the right tool",
        paragraphs: [
          "Pick a tool your team will actually open every day: quick to update from a phone, simple to report from, and priced for a growing business. The best CRM is the one your sales team uses.",
        ],
      },
    ],
  },
];

export type Report = {
  slug: string;
  category: "Reports";
  title: string;
  summary: string;
  status: string;
  chapters: string[];
  audience: string[];
};

export const reports: Report[] = [
  {
    slug: "africa-hiring-report",
    category: "Reports",
    title: "Africa Hiring Report",
    summary: "What slows time-to-hire across African organisations, and how to fix it.",
    status: "Coming soon",
    chapters: ["Where time-to-hire is lost", "The role of informal channels", "What fast hiring teams do differently", "A practical action plan"],
    audience: ["HR directors", "Talent acquisition teams", "Recruitment agencies"],
  },
  {
    slug: "moving-off-spreadsheets-guide",
    category: "Reports",
    title: "A practical guide to moving your business off spreadsheets",
    summary: "A step-by-step guide to digitising HR, hiring and sales workflows without disrupting the business.",
    status: "Coming soon",
    chapters: ["Choosing where to start", "Cleaning your data", "Designing approval chains", "Training and adoption", "Measuring the result"],
    audience: ["Founders and managing directors", "Operations and finance leads", "HR managers"],
  },
];

export type EventItem = {
  slug: string;
  category: "Events";
  title: string;
  summary: string;
  status: string;
  cover: string;
  gallery: { src: string; alt: string }[];
};

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
      "Developers, designers and product thinkers came together to build, pitch and demo solutions — part of Walumo's commitment to spotlighting Africa's emerging tech talent.",
    status: "Past event",
    cover: "/images/hackathon/img_2026.jpg",
    gallery: hacklabPhotos.map((p, i) => ({
      src: `/images/hackathon/${p}.jpg`,
      alt: `Walumo Hacklab — photo ${i + 1}`,
    })),
  },
];
