import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "./primitives";
import { FeatureIcon } from "./icons";
import { LogoMark } from "./logo";
import { KaziLiveMock } from "./kazi-live-mock";
import { getLang } from "@/lib/i18n-server";
import { tr, type Locale } from "@/lib/i18n";

/**
 * Product visuals. Real screenshots are shown in a browser frame; where no
 * screenshot exists yet, a coded UI illustration stands in (no real data).
 */

export function BrowserFrame({
  src,
  alt,
  url,
  className,
  priority,
}: {
  src: string;
  alt: string;
  url: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border border-white/70 bg-white shadow-lift ring-1 ring-ink/[0.06]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface/90 px-4 py-2.5 backdrop-blur" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex items-center gap-1.5 truncate rounded-md bg-white px-3 py-1 text-[11px] text-muted">
          <svg viewBox="0 0 16 16" className="size-3 text-accent-strong" fill="currentColor">
            <path d="M8 1a3.5 3.5 0 0 0-3.5 3.5V6H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-.5V4.5A3.5 3.5 0 0 0 8 1Zm2 5H6V4.5a2 2 0 1 1 4 0V6Z" />
          </svg>
          {url}
        </span>
      </div>
      <div className="relative aspect-[2000/1000] w-full">
        <Image src={src} alt={alt} fill preload={priority} sizes="(max-width: 1024px) 100vw, 900px" className="object-cover object-top" />
      </div>
    </figure>
  );
}

/**
 * A real screenshot that "peeks" into a card from the top-left and runs off
 * the right and bottom edges. Slides slightly when the parent `.group` is hovered.
 */
export function ScreenshotPeek({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute left-8 top-10 w-[170%] overflow-hidden rounded-tl-2xl border border-white/80 bg-white shadow-lift ring-1 ring-ink/[0.06] transition-[translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-4 group-hover:-translate-y-2 sm:left-12 sm:top-12 lg:w-[150%]",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-line bg-surface px-3 py-2" aria-hidden="true">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
      </div>
      <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 1024px) 170vw, 1000px" className="h-auto w-full" />
    </div>
  );
}

/* ------------------------------------------------------------------ */

const deals = {
  "New lead": [
    { name: "Kilimani Hardware", value: "KES 180K", due: "Call today" },
    { name: "Lakeside Clinics", value: "KES 95K", due: "Tomorrow" },
  ],
  Qualified: [{ name: "Savanna Foods", value: "KES 420K", due: "Visit Thu" }],
  Proposal: [
    { name: "Upperhill Logistics", value: "KES 760K", due: "Follow up" },
    { name: "Mara Distributors", value: "KES 310K", due: "Fri" },
  ],
  Won: [{ name: "Coast Pharma", value: "KES 540K", due: "Closed" }],
} as const;

const stageLabels = (lang: Locale): Record<string, string> => ({
  "New lead": tr(lang, "New lead", "Nouveau prospect"),
  Qualified: tr(lang, "Qualified", "Qualifié"),
  Proposal: tr(lang, "Proposal", "Proposition"),
  Won: tr(lang, "Won", "Gagné"),
});

const dealsFr: Record<string, string> = {
  "Call today": "Appel aujourd'hui",
  Tomorrow: "Demain",
  "Visit Thu": "Visite jeu.",
  "Follow up": "À relancer",
  Fri: "Ven.",
  Closed: "Conclu",
};

/** Sales Tracker pipeline board (illustrative data). */
export async function SalesPipelineMock({ className, compact }: { className?: string; compact?: boolean }) {
  const lang = await getLang();
  const stages = stageLabels(lang);
  const columns = Object.entries(deals);
  return (
    <div
      className={cn("sales-pipeline-motion relative isolate w-full rounded-2xl border border-line bg-white p-4 shadow-float", className)}
      role="img"
      aria-label={tr(lang, "Illustration of the Sales Tracker pipeline board", "Illustration du tableau de pipeline de Sales Tracker")}
    >
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-ink text-accent">
            <FeatureIcon name="chart" size={15} />
          </span>
          <p className="text-sm font-bold text-ink">{tr(lang, "Pipeline · This quarter", "Pipeline · Ce trimestre")}</p>
        </div>
        <span className="sales-pipeline-alert rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent-strong">{tr(lang, "3 follow-ups due", "3 relances à faire")}</span>
      </div>
      <span className="sales-pipeline-signal" aria-hidden="true">
        <span />
      </span>
      <div className={cn("relative z-10 mt-4 grid gap-2.5", compact ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 md:grid-cols-4")}>
        {columns.map(([stage, items], stageIndex) => (
          <div
            key={stage}
            className="sales-pipeline-stage relative overflow-hidden rounded-xl bg-surface p-2 transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-surface-2"
            style={{ "--stage-delay": `${360 + stageIndex * 90}ms` } as CSSProperties}
          >
            <p className="flex items-center justify-between px-1 text-[11px] font-bold uppercase tracking-wide text-muted">
              {stages[stage]}
              <span className="tabular-nums text-ink/50">{items.length}</span>
            </p>
            <ul className="mt-2 space-y-2">
              {items.map((d, dealIndex) => (
                <li
                  key={d.name}
                  className="sales-pipeline-deal rounded-lg bg-white p-2.5 shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-float"
                  style={{ "--deal-delay": `${520 + (stageIndex * 2 + dealIndex) * 55}ms` } as CSSProperties}
                >
                  <p className="truncate text-[12px] font-bold text-ink">{d.name}</p>
                  <p className="mt-0.5 text-[11px] tabular-nums text-accent-strong">{d.value}</p>
                  <p className={cn("mt-1.5 inline-flex rounded px-1.5 py-0.5 text-[10px]", stage === "Won" ? "bg-[#e3f6ea] text-[#1f7a45]" : "bg-[#fff3dc] text-[#9a6700]")}>
                    {lang === "fr" ? (dealsFr[d.due] ?? d.due) : d.due}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Kazi Pro leave-request card: animated (illustrative data). */
export function KaziMiniMock({ className }: { className?: string }) {
  return <KaziLiveMock className={className} />;
}

/** Talent Pro pipeline column (illustrative data). */
export async function TalentMiniMock({ className }: { className?: string }) {
  const lang = await getLang();
  const stages = [
    { name: tr(lang, "Applied", "Candidatures"), count: 48, width: "100%" },
    { name: tr(lang, "Screening", "Présélection"), count: 21, width: "62%" },
    { name: tr(lang, "Interview", "Entretien"), count: 9, width: "38%" },
    { name: tr(lang, "Offer", "Offre"), count: 3, width: "18%" },
  ];
  return (
    <div className={cn("w-full max-w-[340px] rounded-2xl bg-white p-5 shadow-float", className)} role="img" aria-label={tr(lang, "Illustration of the Talent Pro hiring funnel", "Illustration de l'entonnoir de recrutement de Talent Pro")}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-ink">{tr(lang, "Hiring funnel · Sales rep", "Entonnoir de recrutement · Commercial")}</p>
        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-bold text-accent-strong">Talent Pro</span>
      </div>
      <ul className="mt-4 space-y-3">
        {stages.map((s) => (
          <li key={s.name}>
            <div className="flex justify-between text-[12px]">
              <span className="font-bold text-ink">{s.name}</span>
              <span className="text-muted">{s.count}</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-2">
              <div className="h-full rounded-full bg-gradient-to-r from-navy to-accent-strong" style={{ width: s.width }} />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-[11.5px] text-ink-soft">
        <FeatureIcon name="handshake" size={14} className="text-accent-strong" />
        {tr(lang, "12 applications received via WhatsApp this week", "12 candidatures reçues via WhatsApp cette semaine")}
      </p>
    </div>
  );
}

export { SuiteHub } from "@/components/sections/suite-hub";
