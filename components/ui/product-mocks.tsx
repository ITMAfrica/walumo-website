"use client";

import Image from "next/image";
import { cn } from "./primitives";
import { Check, FeatureIcon } from "./icons";
import { LogoMark } from "./logo";
import { Count, enter, useDemo } from "./demo";

/**
 * Product visuals. Real screenshots are shown in a browser frame; where no
 * screenshot exists yet, a coded UI illustration stands in (no real data).
 *
 * The illustrations play a short, realistic scenario once they are in view
 * (a leave request gets approved, a follow-up is logged...), and replay the
 * next time they scroll back into view.
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
    <figure className={cn("overflow-hidden rounded-2xl border border-line bg-white shadow-float", className)}>
      <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-2.5" aria-hidden="true">
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
        "absolute left-8 top-10 w-[170%] overflow-hidden rounded-tl-2xl border border-line bg-white shadow-float transition-[translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-4 group-hover:-translate-y-2 sm:left-12 sm:top-12 lg:w-[150%]",
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
export function SalesPipelineMock({
  className,
  compact,
  delay = 0,
}: {
  className?: string;
  compact?: boolean;
  delay?: number;
}) {
  // 1: the board fills in · 2: today's call to Kilimani Hardware is logged · 3: highlight fades
  const [ref, step] = useDemo<HTMLDivElement>([150, 2100, 3300], delay);
  const columns = Object.entries(deals);
  let index = 0;
  return (
    <div
      ref={ref}
      className={cn("w-full rounded-2xl border border-line bg-white p-4 shadow-float", className)}
      role="img"
      aria-label="Illustration of the Sales Tracker pipeline board"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-ink text-accent">
            <FeatureIcon name="chart" size={15} />
          </span>
          <p className="text-sm font-bold text-ink">Pipeline · This quarter</p>
        </div>
        <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent-strong">
          <Count value={step >= 2 ? 2 : 3} duration={400} /> follow-ups due
        </span>
      </div>
      <div className={cn("mt-4 grid gap-2.5", compact ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 md:grid-cols-4")}>
        {columns.map(([stage, items], c) => (
          <div
            key={stage}
            className={cn("rounded-xl bg-surface p-2", enter(step >= 1))}
            style={{ transitionDelay: step === 1 ? `${c * 80}ms` : "0ms" }}
          >
            <p className="flex items-center justify-between px-1 text-[11px] font-bold uppercase tracking-wide text-muted">
              {stage}
              <span className="text-ink/50">{items.length}</span>
            </p>
            <ul className="mt-2 space-y-2">
              {items.map((d) => {
                const i = index++;
                const logged = d.name === "Kilimani Hardware" && step >= 2;
                return (
                  <li
                    key={d.name}
                    className={cn(
                      "rounded-lg bg-white p-2.5 shadow-card",
                      enter(step >= 1),
                      d.name === "Kilimani Hardware" && step === 2 && "ring-2 ring-[#bfe5cc]",
                    )}
                    style={{ transitionDelay: step === 1 ? `${250 + i * 90}ms` : "0ms" }}
                  >
                    <p className="truncate text-[12px] font-bold text-ink">{d.name}</p>
                    <p className="mt-0.5 text-[11px] text-accent-strong">{d.value}</p>
                    <p
                      className={cn(
                        "mt-1.5 inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] transition-colors duration-500",
                        stage === "Won" || logged ? "bg-[#e3f6ea] text-[#1f7a45]" : "bg-[#fff3dc] text-[#9a6700]",
                      )}
                    >
                      {logged && <Check size={10} strokeWidth={2.4} />}
                      {logged ? "Called" : d.due}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Kazi Pro leave-request card (illustrative data). */
export function KaziMiniMock({ className, delay = 0 }: { className?: string; delay?: number }) {
  // 1: the card fills in · 2: the pending sick-leave request is approved · 3: highlight fades
  const [ref, step] = useDemo<HTMLDivElement>([150, 2000, 3200], delay);
  const approved = step >= 2;
  const stats = [
    { label: "Available", value: step === 0 ? 0 : approved ? 17 : 18 },
    { label: "Pending", value: step === 0 ? 0 : approved ? 0 : 1 },
    { label: "Taken", value: step === 0 ? 0 : approved ? 6 : 5 },
  ];
  const rows = [
    { type: "Annual leave", days: "3 days", ok: true },
    { type: "Sick leave", days: "1 day", ok: approved },
    { type: "Remote work", days: "2 days", ok: true },
  ];
  return (
    <div
      ref={ref}
      className={cn("w-full max-w-[340px] rounded-2xl bg-white p-5 shadow-float", className)}
      role="img"
      aria-label="Illustration of Kazi Pro leave management"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-ink">Leave requests</p>
        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-bold text-accent-strong">Kazi Pro</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-surface px-2 py-2.5">
            <p className="font-serif text-2xl text-ink">
              <Count value={s.value} duration={step >= 2 ? 500 : 900} />
            </p>
            <p className="text-[10.5px] text-muted">{s.label}</p>
          </div>
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {rows.map((r, i) => (
          <li
            key={r.type}
            className={cn(
              "flex items-center justify-between rounded-xl border px-3 py-2.5",
              enter(step >= 1),
              i === 1 && step === 2 ? "border-[#bfe5cc] bg-[#f1faf4]" : "border-line bg-white",
            )}
            style={{ transitionDelay: step === 1 ? `${200 + i * 120}ms` : "0ms" }}
          >
            <div>
              <p className="text-[12.5px] font-bold text-ink">{r.type}</p>
              <p className="text-[11px] text-muted">{r.days}</p>
            </div>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10.5px] font-bold transition-colors duration-500",
                r.ok ? "bg-[#e3f6ea] text-[#1f7a45]" : "bg-[#fff3dc] text-[#9a6700]",
              )}
            >
              {i === 1 && approved && <Check size={11} strokeWidth={2.4} />}
              {r.ok ? "Approved" : "Pending"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Talent Pro hiring funnel (illustrative data). */
export function TalentMiniMock({ className, delay = 0 }: { className?: string; delay?: number }) {
  // 1: the funnel fills · 2: this week's WhatsApp applications come in
  const [ref, step] = useDemo<HTMLDivElement>([150, 1500], delay);
  const stages = [
    { name: "Applied", count: 48, width: "100%" },
    { name: "Screening", count: 21, width: "62%" },
    { name: "Interview", count: 9, width: "38%" },
    { name: "Offer", count: 3, width: "18%" },
  ];
  return (
    <div
      ref={ref}
      className={cn("w-full max-w-[340px] rounded-2xl bg-white p-5 shadow-float", className)}
      role="img"
      aria-label="Illustration of the Talent Pro hiring funnel"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-ink">Hiring funnel · Sales rep</p>
        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-bold text-accent-strong">Talent Pro</span>
      </div>
      <ul className="mt-4 space-y-3">
        {stages.map((s, i) => (
          <li key={s.name}>
            <div className="flex justify-between text-[12px]">
              <span className="font-bold text-ink">{s.name}</span>
              <span className="text-muted">
                <Count value={step >= 1 ? s.count : 0} delay={i * 120} />
              </span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-navy to-accent-strong transition-[width] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ width: step >= 1 ? s.width : "0%", transitionDelay: step >= 1 ? `${i * 120}ms` : "0ms" }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className={cn("mt-4 flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-[11.5px] text-ink-soft", enter(step >= 2))}>
        <FeatureIcon name="handshake" size={14} className="text-accent-strong" />
        <span>
          <Count value={step >= 2 ? 12 : 0} duration={700} /> applications received via WhatsApp this week
        </span>
      </p>
    </div>
  );
}

/** Sales Tracker "follow-ups today" list (illustrative data). */
export function FollowUpsMock({ className, delay = 0 }: { className?: string; delay?: number }) {
  // 1: the list fills in · 2: the first call is ticked off
  const [ref, step] = useDemo<HTMLDivElement>([150, 2000], delay);
  const items = ["Call Savanna Foods", "Send proposal to Mara Distributors", "Visit Kilimani Hardware"];
  return (
    <div
      ref={ref}
      className={cn("rounded-2xl bg-white p-4 shadow-float", className)}
      role="img"
      aria-label="Illustration of the Sales Tracker follow-up list"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-muted">Follow-ups today</p>
        <p className="text-[11.5px] font-bold text-accent-strong">
          <Count value={step >= 2 ? 1 : 0} duration={300} />/{items.length} done
        </p>
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((t, i) => {
          const done = i === 0 && step >= 2;
          return (
            <li
              key={t}
              className={cn("flex items-center gap-2 text-[13px]", enter(step >= 1))}
              style={{ transitionDelay: step === 1 ? `${i * 120}ms` : "0ms" }}
            >
              <span
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                  done ? "border-[#28c840] bg-[#28c840] text-white" : "border-accent-strong/40 bg-white",
                )}
                aria-hidden="true"
              >
                {done && <Check size={10} strokeWidth={2.6} />}
              </span>
              <span className={cn("transition-colors duration-300", done ? "text-muted line-through" : "text-ink")}>{t}</span>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-[11.5px] text-muted">Sales Tracker · illustrative data</p>
    </div>
  );
}

/** "One login, one design, one source of truth" hub diagram. */
export function SuiteHub({ className }: { className?: string }) {
  // 1: hub and products appear · 2: the links and shared features follow
  const [ref, step] = useDemo<HTMLDivElement>([100, 750]);
  const nodes = [
    { name: "Kazi Pro", sub: "People", icon: "users" as const, pos: "left-0 top-1/2 -translate-y-1/2" },
    { name: "Talent Pro", sub: "Hiring", icon: "search" as const, pos: "left-1/2 top-0 -translate-x-1/2" },
    { name: "Sales Tracker", sub: "Revenue", icon: "chart" as const, pos: "right-0 top-1/2 -translate-y-1/2" },
  ];
  const shared = ["Single sign-on", "Shared profiles", "Common admin & permissions", "Shared reports"];
  // Positioning uses `translate`, so the nodes only fade and scale in.
  const pop = (visible: boolean) =>
    cn(
      "transition-[opacity,scale] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
      visible ? "scale-100 opacity-100" : "scale-95 opacity-0",
    );
  return (
    <div ref={ref} className={cn("relative mx-auto w-full max-w-3xl", className)}>
      <div className="relative hidden aspect-[16/9] sm:block">
        <svg
          viewBox="0 0 640 360"
          className={cn("absolute inset-0 h-full w-full transition-opacity duration-700", step >= 2 ? "opacity-100" : "opacity-0")}
          aria-hidden="true"
        >
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
        <div
          className={cn(
            "absolute left-1/2 top-[58%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center",
            pop(step >= 1),
          )}
        >
          <span className="flex size-16 items-center justify-center rounded-2xl bg-white shadow-float">
            <LogoMark size={36} />
          </span>
          <p className="mt-3 font-serif text-xl text-ink">One source of truth</p>
          <p className="text-[12.5px] text-muted">One login · one design</p>
        </div>
        {nodes.map((n, i) => (
          <div
            key={n.name}
            className={cn("absolute w-44 rounded-2xl bg-white p-4 text-center shadow-float", n.pos, pop(step >= 1))}
            style={{ transitionDelay: step === 1 ? `${150 + i * 120}ms` : "0ms" }}
          >
            <span className="mx-auto flex size-10 items-center justify-center rounded-xl bg-ink text-accent">
              <FeatureIcon name={n.icon} size={19} />
            </span>
            <p className="mt-2.5 font-bold text-ink">{n.name}</p>
            <p className="text-[12.5px] text-muted">{n.sub}</p>
          </div>
        ))}
      </div>
      <ul className="grid gap-3 sm:hidden">
        {nodes.map((n, i) => (
          <li
            key={n.name}
            className={cn("flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card", enter(step >= 1))}
            style={{ transitionDelay: step === 1 ? `${i * 120}ms` : "0ms" }}
          >
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
        {shared.map((s, i) => (
          <li
            key={s}
            className={cn("rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] text-ink-soft", enter(step >= 2))}
            style={{ transitionDelay: step === 2 ? `${i * 80}ms` : "0ms" }}
          >
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
