"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { Icon3DBase } from "@/components/ui/icon-3d";
import { useLang } from "@/components/ui/locale";
import { cn } from "@/components/ui/primitives";
import { tr } from "@/lib/i18n";

/*
 * Motion-design illustrations for article cards. Same language as the product demos: a pale stage
 * with drifting light, an interface that sways in 3D (and follows the pointer), layers floating in
 * front, and a looping script that changes the data (counters, statuses, bars). Illustrative data only.
 */

type Glyph = "shield" | "user" | "calendar" | "trend" | "doc" | "spark";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Steps through 0..n-1 on a timer, only while the stage is on screen. */
function useStep(n: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduced()) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % n), ms);
    return () => window.clearInterval(id);
  }, [visible, n, ms]);

  return { ref, step };
}

/* ------------------------------------------------------------------ */
/* Glossy 3D icon                                                      */
/* ------------------------------------------------------------------ */

const glyphs: Record<Glyph, ReactNode> = {
  shield: <path d="m18 27 6 6 12-13" />,
  user: (
    <>
      <circle cx="28" cy="21" r="5.5" />
      <path d="M17.5 38c1-6 5-9 10.5-9s9.5 3 10.5 9" />
    </>
  ),
  calendar: (
    <>
      <rect x="17" y="20" width="22" height="19" rx="4" />
      <path d="M17 26.5h22M23 17v6M33 17v6M23.5 32.5l3 3 5.5-6" />
    </>
  ),
  trend: <path d="m17 37 8-9 6 5 9-13M33 20h7v7" />,
  doc: <path d="M21 17h10l6 6v16H21V17ZM31 17v6h6M25.5 29h7M25.5 34h7" />,
  spark: <path d="M28 16v8M28 32v8M16 28h8M32 28h8M21 21l3.5 3.5M31.5 31.5 35 35M35 21l-3.5 3.5M24.5 31.5 21 35" />,
};

function Icon3D({ glyph, className, style }: { glyph: Glyph; className?: string; style?: CSSProperties }) {
  const isShield = glyph === "shield";
  return (
    <Icon3DBase shield={isShield} className={cn("drop-shadow-[0_14px_14px_rgba(37,70,160,0.35)]", className)} style={style}>
      <g transform={isShield ? "translate(0 -1)" : undefined}>{glyphs[glyph]}</g>
    </Icon3DBase>
  );
}

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

/** Layer floating in front of the interface (translateZ), entering then bobbing. */
function Floating({ z = 60, className, delay = 0, children }: { z?: number; className?: string; delay?: number; children: ReactNode }) {
  return (
    <div className={cn("float-z z-10", className)} style={{ "--z": `${z}px` } as CSSProperties}>
      <div className="float-in" style={{ animationDelay: `${delay}ms` }}>
        <div className="float-bob" style={{ animationDelay: `${-delay}ms` }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/** Main interface card, anchored low and bleeding off the bottom edge. */
function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "absolute bottom-[-32px] left-[7%] right-[13%] top-[30%] rounded-t-[1.4rem] bg-white p-5 shadow-[0_2px_4px_rgb(6_20_51/0.04),0_18px_40px_-14px_rgb(60_70_160/0.28)] ring-1 ring-line/60",
        "transition-transform duration-500 ease-out group-hover:-translate-y-1.5",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Frosted chip with a ghost shadow box behind it, overlapping the panel corner. */
function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Floating z={55} delay={250} className={cn("right-[4%] top-[8%]", className)}>
      <div className="relative">
        <div className="absolute -inset-1.5 rounded-[1.1rem] bg-white/40 shadow-[0_10px_30px_-8px_rgb(60_70_160/0.25)] backdrop-blur-sm" aria-hidden="true" />
        <div className="relative flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-card ring-1 ring-white/80 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
          {children}
        </div>
      </div>
    </Floating>
  );
}

function ChipText({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p key={title} className="demo-pop text-[15px] font-bold leading-tight text-ink-soft">
        {title}
      </p>
      <p key={text} className="demo-pop text-[12.5px] text-muted">
        {text}
      </p>
    </div>
  );
}

function Stat({ value, label, tone = "blue", active }: { value: string; label: string; tone?: "blue" | "cyan" | "violet"; active?: boolean }) {
  const dot = { blue: "bg-[#3a68d4]", cyan: "bg-[#35c4d8]", violet: "bg-[#7c6cf0]" }[tone];
  return (
    <div className="text-center">
      <span
        className={cn(
          "mx-auto mb-2 block size-6 rounded-lg shadow-[inset_0_-3px_5px_rgb(0_0_0/0.18),inset_0_2px_3px_rgb(255_255_255/0.5)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          dot,
          active && "-translate-y-1 scale-125",
        )}
      />
      <p className="text-[1.45rem] font-bold leading-none tracking-tight text-ink-soft">
        <span key={value} className="demo-pop inline-block">
          {value}
        </span>
      </p>
      <p className="mt-1.5 text-[12.5px] text-muted">{label}</p>
    </div>
  );
}

function Bar({ pct, className }: { pct: number; className?: string }) {
  return (
    <span className="block h-2 rounded-full bg-surface-2">
      <span
        className={cn("block h-full rounded-full transition-[width] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]", className ?? "bg-[#8fb0ea]")}
        style={{ width: `${pct}%` }}
      />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Topic illustrations                                                 */
/* ------------------------------------------------------------------ */

const FILES = [4, 7, 9, 11, 12, 12];
const SYNC = [20, 45, 70, 90, 100, 100];

function OperationsMock({ step }: { step: number }) {
  const lang = useLang();
  const sync = SYNC[step];
  return (
    <>
      <Panel>
        <p className="text-[1.35rem] font-bold tracking-tight text-ink-soft">{tr(lang, "Operations", "Opérations")}</p>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <Stat value={String(FILES[step])} label={tr(lang, "Files merged", "Fichiers fusionnés")} active={step % 3 === 0} />
          <Stat value={`${sync}%`} label={tr(lang, "In sync", "Synchronisé")} tone="cyan" active={step % 3 === 1} />
          <Stat value="0" label={tr(lang, "Duplicates", "Doublons")} tone="violet" active={step % 3 === 2} />
        </div>
        <div className="mt-5">
          <Bar pct={sync} className="bg-gradient-to-r from-[#5b8def] to-[#35c4d8]" />
        </div>
      </Panel>
      <Floating z={80} delay={150} className="right-[9%] top-[8%]">
        <Icon3D glyph="shield" className="w-[76px]" />
      </Floating>
    </>
  );
}

const LEVELS = [
  [2, 2, 3, 3, 3, 3],
  [1, 1, 1, 2, 2, 3],
  [0, 0, 1, 1, 1, 2],
];

function HiringMock({ step }: { step: number }) {
  const lang = useLang();
  const stages = [tr(lang, "Applied", "Candidature"), tr(lang, "Screening", "Présélection"), tr(lang, "Interview", "Entretien"), tr(lang, "Hired", "Recruté")];
  const names = ["Amara O.", "Kevin M.", "Fatou D."];
  const strong = Math.max(1, LEVELS.filter((l) => l[step] >= 2).length);
  return (
    <>
      <Panel>
        <p className="text-[13px] font-bold text-muted">{tr(lang, "Candidates · 48", "Candidats · 48")}</p>
        <ul className="mt-4 space-y-3.5">
          {names.map((n, i) => {
            const lvl = LEVELS[i][step];
            return (
              <li key={n} className="flex items-center gap-3">
                <span className="size-8 shrink-0 rounded-full bg-gradient-to-br from-[#cfe0f7] to-[#a9b8f5] ring-2 ring-white" />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between text-[12.5px]">
                    <span className="font-bold text-ink-soft">{n}</span>
                    <span key={lvl} className="demo-pop text-muted">
                      {stages[lvl]}
                    </span>
                  </div>
                  <div className="mt-1.5">
                    <Bar pct={((lvl + 1) / 4) * 100} className="bg-gradient-to-r from-[#5b8def] to-[#35c4d8]" />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Panel>
      <Chip>
        <Icon3D glyph="user" className="w-9" />
        <ChipText
          title={tr(lang, "Shortlisted", "Présélectionnés")}
          text={tr(lang, `${strong} strong ${strong > 1 ? "matches" : "match"}`, `${strong} ${strong > 1 ? "profils très pertinents" : "profil très pertinent"}`)}
        />
      </Chip>
    </>
  );
}

function HrMock({ step }: { step: number }) {
  const lang = useLang();
  const rows = [
    { t: tr(lang, "Annual leave", "Congé annuel"), d: tr(lang, "3 days", "3 jours"), ok: true },
    { t: tr(lang, "Sick leave", "Congé maladie"), d: tr(lang, "1 day", "1 jour"), ok: step >= 3 },
    { t: tr(lang, "Remote work", "Télétravail"), d: tr(lang, "2 days", "2 jours"), ok: step >= 1 },
  ];
  const pending = rows.filter((r) => !r.ok).length;
  return (
    <>
      <Panel>
        <p className="text-[13px] font-bold text-muted">{tr(lang, "Leave requests", "Demandes de congé")}</p>
        <ul className="mt-3 space-y-2.5">
          {rows.map((r) => (
            <li
              key={`${r.t}-${r.ok}`}
              className={cn("-mx-2 flex items-center justify-between rounded-lg border-b border-line px-2 pb-2.5 last:border-0", r.ok && step > 0 && "demo-flash")}
            >
              <div>
                <p className="text-[13.5px] font-bold text-ink-soft">{r.t}</p>
                <p className="text-[12px] text-muted">{r.d}</p>
              </div>
              <span className={cn("demo-pop rounded-lg px-2.5 py-1 text-[11px] font-bold", r.ok ? "bg-[#e3f6ea] text-[#1f7a45]" : "bg-[#fff3dc] text-[#9a6700]")}>
                {r.ok ? tr(lang, "Approved", "Approuvé") : tr(lang, "Pending", "En attente")}
              </span>
            </li>
          ))}
        </ul>
      </Panel>
      <Chip>
        <Icon3D glyph="calendar" className="w-9" />
        {pending ? (
          <ChipText title={tr(lang, "To review", "À valider")} text={tr(lang, `${pending} pending`, `${pending} en attente`)} />
        ) : (
          <ChipText title={tr(lang, "Approved", "Approuvé")} text={tr(lang, "in 1 tap", "en un clic")} />
        )}
      </Chip>
    </>
  );
}

const PIPE = [
  [38, 44, 50, 40, 46, 38],
  [58, 50, 62, 66, 54, 58],
  [46, 54, 50, 62, 70, 46],
  [30, 46, 60, 74, 86, 86],
];
const GROWTH = [8, 12, 16, 20, 24, 24];

function SalesMock({ step }: { step: number }) {
  const lang = useLang();
  const labels = [tr(lang, "Lead", "Prospect"), tr(lang, "Qualified", "Qualifié"), tr(lang, "Proposal", "Proposition"), tr(lang, "Won", "Gagné")];
  return (
    <>
      <Panel>
        <p className="text-[13px] font-bold text-muted">{tr(lang, "Pipeline", "Pipeline")}</p>
        <div className="mt-3 flex h-[84px] items-end gap-3">
          {labels.map((l, i) => (
            <div
              key={l}
              className={cn(
                "flex-1 rounded-t-lg transition-[height] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                i === labels.length - 1 ? "bg-gradient-to-t from-[#3a55c8] to-[#5b8def] shadow-[0_8px_16px_-6px_rgb(58_85_200/0.6)]" : "bg-gradient-to-t from-[#cfe0f7] to-[#e5effa]",
              )}
              style={{ height: `${PIPE[i][step]}%` }}
            />
          ))}
        </div>
        <div className="mt-2 flex gap-3 text-[11px] text-muted">
          {labels.map((l) => (
            <span key={l} className="flex-1 text-center">
              {l}
            </span>
          ))}
        </div>
      </Panel>
      <Chip>
        <Icon3D glyph="trend" className="w-9" />
        <ChipText title={tr(lang, "Deal won", "Affaire gagnée")} text={tr(lang, `+${GROWTH[step]}% this month`, `+${GROWTH[step]} % ce mois-ci`)} />
      </Chip>
    </>
  );
}

function ReportMock({ chapters, step }: { chapters: string[]; step: number }) {
  const lang = useLang();
  const shown = chapters.slice(0, 3);
  const active = step % Math.max(1, shown.length);
  return (
    <>
      <Panel>
        <p className="text-[13px] font-bold text-muted">
          {tr(lang, "What's inside", "Au sommaire")} · {chapters.length} {tr(lang, "chapters", "chapitres")}
        </p>
        <ol className="mt-3.5 space-y-2">
          {shown.map((c, i) => (
            <li
              key={c}
              className={cn(
                "-mx-2 flex items-center gap-3 rounded-xl px-2 py-1.5 transition-[background-color,transform] duration-500",
                i === active ? "translate-x-1 bg-[#eef3fd]" : "bg-transparent",
              )}
            >
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold transition-colors duration-500",
                  i === active ? "bg-gradient-to-br from-[#5b8def] to-[#3a55c8] text-white" : "bg-gradient-to-br from-[#cfe0f7] to-[#a9b8f5] text-ink-soft",
                )}
              >
                {i + 1}
              </span>
              <span className="truncate text-[13.5px] font-bold text-ink-soft">{c}</span>
            </li>
          ))}
        </ol>
      </Panel>
      <Chip>
        <Icon3D glyph="doc" className="w-9" />
        <ChipText title={tr(lang, "Free report", "Rapport gratuit")} text={tr(lang, "PDF download", "Téléchargement PDF")} />
      </Chip>
    </>
  );
}

function EventMock({ highlights, step }: { highlights: { value: string; label: string }[]; step: number }) {
  const tones = ["blue", "cyan", "violet"] as const;
  return (
    <>
      <Panel>
        <p className="text-[1.35rem] font-bold tracking-tight text-ink-soft">Hacklab</p>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {highlights.slice(0, 3).map((h, i) => (
            <Stat key={h.label} value={h.value} label={h.label} tone={tones[i % 3]} active={step % 3 === i} />
          ))}
        </div>
      </Panel>
      <Floating z={80} delay={150} className="right-[9%] top-[8%]">
        <Icon3D glyph="spark" className="w-[76px]" />
      </Floating>
    </>
  );
}

const mocks: Record<string, (props: { step: number }) => ReactNode> = {
  Operations: OperationsMock,
  "Opérations": OperationsMock,
  Hiring: HiringMock,
  Recrutement: HiringMock,
  HR: HrMock,
  RH: HrMock,
  Sales: SalesMock,
  Ventes: SalesMock,
};

/** One soft gradient per topic, so neighbouring cards never share the same backdrop. */
const tones = {
  lavender: "bg-[radial-gradient(95%_85%_at_0%_100%,#c9bcf7_0%,rgba(190,203,248,0.55)_34%,rgba(229,239,250,0)_72%)]",
  sky: "bg-[radial-gradient(95%_85%_at_100%_100%,#b9dff7_0%,rgba(190,225,248,0.55)_34%,rgba(229,243,250,0)_72%)]",
  mint: "bg-[radial-gradient(95%_85%_at_20%_100%,#dcf4e8_0%,rgba(224,246,236,0.5)_30%,rgba(240,250,245,0)_65%)]",
  peach: "bg-[radial-gradient(95%_85%_at_90%_100%,#fbd2b4_0%,rgba(251,222,204,0.55)_34%,rgba(253,242,234,0)_72%)]",
  rose: "bg-[radial-gradient(95%_85%_at_50%_100%,#f6c3dc_0%,rgba(248,208,228,0.55)_34%,rgba(252,238,245,0)_72%)]",
  sun: "bg-[radial-gradient(95%_85%_at_0%_100%,#fbe7a5_0%,rgba(250,236,184,0.55)_34%,rgba(253,247,224,0)_72%)]",
};
type Tone = keyof typeof tones;
const topicTone: Record<string, Tone> = {
  Operations: "lavender",
  "Opérations": "lavender",
  Hiring: "sky",
  Recrutement: "sky",
  HR: "mint",
  RH: "mint",
  Sales: "peach",
  Ventes: "peach",
};

/** Pale stage; the interface sways in 3D and follows the pointer. */
function Stage({ children, className, tone = "lavender", steps = 6, ms = 1500 }: { children: (step: number) => ReactNode; className?: string; tone?: Tone; steps?: number; ms?: number }) {
  const { ref, step } = useStep(steps, ms);
  const [tilt, setTilt] = useState<{ rx: number; ry: number } | null>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduced()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 8, ry: px * 12 });
  };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      onPointerMove={onMove}
      onPointerLeave={() => setTilt(null)}
      className={cn(
        "relative h-[300px] overflow-hidden",
        tones[tone],
        className,
      )}
    >
      <div className="stage-3d absolute inset-0">
        <div
          className={cn("tilt-3d absolute inset-0", !tilt && "tilt-idle")}
          style={tilt ? { transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` } : undefined}
        >
          {children(step)}
        </div>
      </div>
    </div>
  );
}

export function ArticleIllustration({ topic, className }: { topic: string; className?: string }) {
  const Mock = mocks[topic] ?? OperationsMock;
  return <Stage className={className} tone={topicTone[topic] ?? "lavender"}>{(step) => <Mock step={step} />}</Stage>;
}

export function ReportIllustration({ chapters, className }: { chapters: string[]; className?: string }) {
  return (
    <Stage className={className} tone="rose" steps={3} ms={1800}>
      {(step) => <ReportMock chapters={chapters} step={step} />}
    </Stage>
  );
}

export function EventIllustration({ highlights, className }: { highlights: { value: string; label: string }[]; className?: string }) {
  return (
    <Stage className={className} tone="sun" steps={3} ms={1600}>
      {(step) => <EventMock highlights={highlights} step={step} />}
    </Stage>
  );
}
