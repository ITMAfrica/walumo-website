import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "./primitives";
import { FeatureIcon } from "./icons";
import { LogoMark } from "./logo";

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

/** Sales Tracker pipeline board (illustrative data). */
export function SalesPipelineMock({ className, compact }: { className?: string; compact?: boolean }) {
  const columns = Object.entries(deals);
  return (
    <div
      className={cn("sales-pipeline-motion relative isolate w-full rounded-2xl border border-line bg-white p-4 shadow-float", className)}
      role="img"
      aria-label="Illustration of the Sales Tracker pipeline board"
    >
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-ink text-accent">
            <FeatureIcon name="chart" size={15} />
          </span>
          <p className="text-sm font-bold text-ink">Pipeline · This quarter</p>
        </div>
        <span className="sales-pipeline-alert rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent-strong">3 follow-ups due</span>
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
              {stage}
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
                    {d.due}
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

/** Kazi Pro leave-request card (illustrative data). */
export function KaziMiniMock({ className }: { className?: string }) {
  const rows = [
    { type: "Annual leave", days: "3 days", state: "Approved", ok: true },
    { type: "Sick leave", days: "1 day", state: "Pending", ok: null },
    { type: "Remote work", days: "2 days", state: "Approved", ok: true },
  ];
  return (
    <div className={cn("w-full max-w-[340px] rounded-2xl bg-white p-5 shadow-float", className)} role="img" aria-label="Illustration of Kazi Pro leave management">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-ink">Leave requests</p>
        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-bold text-accent-strong">Kazi Pro</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          ["18", "Available"],
          ["1", "Pending"],
          ["5", "Taken"],
        ].map(([v, l]) => (
          <div key={l} className="rounded-xl bg-surface px-2 py-2.5">
            <p className="font-serif text-2xl text-ink">{v}</p>
            <p className="text-[10.5px] text-muted">{l}</p>
          </div>
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {rows.map((r) => (
          <li key={r.type} className="flex items-center justify-between rounded-xl border border-line px-3 py-2.5">
            <div>
              <p className="text-[12.5px] font-bold text-ink">{r.type}</p>
              <p className="text-[11px] text-muted">{r.days}</p>
            </div>
            <span className={cn("rounded-md px-2 py-0.5 text-[10.5px] font-bold", r.ok ? "bg-[#e3f6ea] text-[#1f7a45]" : "bg-[#fff3dc] text-[#9a6700]")}>{r.state}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Talent Pro pipeline column (illustrative data). */
export function TalentMiniMock({ className }: { className?: string }) {
  const stages = [
    { name: "Applied", count: 48, width: "100%" },
    { name: "Screening", count: 21, width: "62%" },
    { name: "Interview", count: 9, width: "38%" },
    { name: "Offer", count: 3, width: "18%" },
  ];
  return (
    <div className={cn("w-full max-w-[340px] rounded-2xl bg-white p-5 shadow-float", className)} role="img" aria-label="Illustration of the Talent Pro hiring funnel">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-ink">Hiring funnel · Sales rep</p>
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
        12 applications received via WhatsApp this week
      </p>
    </div>
  );
}

/** "One login, one design, one source of truth" hub diagram. */
export function SuiteHub({ className }: { className?: string }) {
  const nodes = [
    { name: "Kazi Pro", sub: "People", icon: "users" as const, pos: "left-0 top-1/2 -translate-y-1/2" },
    { name: "Talent Pro", sub: "Hiring", icon: "search" as const, pos: "left-1/2 top-0 -translate-x-1/2" },
    { name: "Sales Tracker", sub: "Revenue", icon: "chart" as const, pos: "right-0 top-1/2 -translate-y-1/2" },
  ];
  const shared = ["Single sign-on", "Shared profiles", "Common admin & permissions", "Shared reports"];
  return (
    <div className={cn("relative mx-auto w-full max-w-3xl", className)}>
      <div className="relative hidden aspect-[16/9] sm:block">
        <svg viewBox="0 0 640 360" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="hub-line" x1="0" x2="1">
              <stop offset="0" stopColor="#2570C8" stopOpacity="0.15" />
              <stop offset="0.5" stopColor="#2570C8" stopOpacity="0.6" />
              <stop offset="1" stopColor="#2570C8" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <path d="M110 190 Q 220 190 320 205" stroke="url(#hub-line)" strokeWidth="2" strokeDasharray="6 6" fill="none" />
          <path d="M530 190 Q 420 190 320 205" stroke="url(#hub-line)" strokeWidth="2" strokeDasharray="6 6" fill="none" />
          <path d="M320 70 L 320 150" stroke="url(#hub-line)" strokeWidth="2" strokeDasharray="6 6" fill="none" />
          <circle cx="320" cy="210" r="92" fill="#e6f0fb" />
        </svg>
        <div className="absolute left-1/2 top-[58%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
          <span className="flex size-16 items-center justify-center rounded-2xl bg-white shadow-float">
            <LogoMark size={36} />
          </span>
          <p className="mt-3 font-serif text-xl text-ink">One source of truth</p>
          <p className="text-[12.5px] text-muted">One login · one design</p>
        </div>
        {nodes.map((n) => (
          <div key={n.name} className={`absolute w-44 rounded-2xl bg-white p-4 text-center shadow-float ${n.pos}`}>
            <span className="mx-auto flex size-10 items-center justify-center rounded-xl bg-ink text-accent">
              <FeatureIcon name={n.icon} size={19} />
            </span>
            <p className="mt-2.5 font-bold text-ink">{n.name}</p>
            <p className="text-[12.5px] text-muted">{n.sub}</p>
          </div>
        ))}
      </div>
      <ul className="grid gap-3 sm:hidden">
        {nodes.map((n) => (
          <li key={n.name} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card">
            <span className="flex size-10 items-center justify-center rounded-xl bg-ink text-accent">
              <FeatureIcon name={n.icon} size={19} />
            </span>
            <span>
              <span className="block font-bold text-ink">{n.name}</span>
              <span className="block text-[13px] text-muted">{n.sub}</span>
            </span>
          </li>
        ))}
      </ul>
      <ul className="mt-6 flex flex-wrap justify-center gap-2">
        {shared.map((s) => (
          <li key={s} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] text-ink-soft">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
