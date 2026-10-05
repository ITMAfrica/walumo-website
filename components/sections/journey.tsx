"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Icon3D } from "@/components/ui/icon-3d";
import { cn } from "@/components/ui/primitives";
import { useLang } from "@/components/ui/locale";
import { tr } from "@/lib/i18n";
import type { IconName } from "@/lib/site";

const stepIcons: IconName[] = ["search", "layers", "database", "graduation", "rocket", "handshake"];
const tones = ["blue", "teal", "violet", "peach", "green", "rose"] as const;

/** One palette per step, so the scenes alternate colour as you scroll. */
const palettes = [
  { c1: "#3a55c8", c2: "#5b8def", c3: "#35c4d8", soft: "#dbe6fd", panel: "#c9d6fb", ripple: "#5b8def" },
  { c1: "#0f8f7d", c2: "#2fbfa6", c3: "#7ee0c9", soft: "#d3f1ea", panel: "#bfeee3", ripple: "#2fbfa6" },
  { c1: "#5b3fd0", c2: "#8b6ff0", c3: "#c4b2fa", soft: "#e4dcfb", panel: "#d3c8f8", ripple: "#8b6ff0" },
  { c1: "#c25a2d", c2: "#f08a5d", c3: "#f6bd9f", soft: "#fbe2d4", panel: "#f9d3bf", ripple: "#f08a5d" },
  { c1: "#2e8b57", c2: "#4cbf80", c3: "#a5e3bf", soft: "#d9f2e4", panel: "#c6ecd5", ripple: "#4cbf80" },
  { c1: "#c0397a", c2: "#ec6aa6", c3: "#f6b3d2", soft: "#f9dcea", panel: "#f6c9de", ripple: "#ec6aa6" },
];


/* ------------------------------------------------------------------ */
/* Motion scenes (illustrative)                                         */
/* ------------------------------------------------------------------ */

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function Check({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path className="mo-draw" style={d(delay)} d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

function Pill({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <span className={cn("mo-pop inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[13px] font-bold text-ink-soft shadow-card ring-1 ring-line/60", className)} style={d(delay)}>
      {children}
    </span>
  );
}

function SceneAssess() {
  const lang = useLang();
  const rows = [
    tr(lang, "Leave approvals", "Validation des congés"),
    tr(lang, "Hiring pipeline", "Processus de recrutement"),
    tr(lang, "Sales follow-ups", "Relances commerciales"),
  ];
  return (
    <>
      <ul className="space-y-2.5">
        {rows.map((r, i) => (
          <li key={r} className="mo-pop flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 shadow-card ring-1 ring-line/60" style={d(0.1 + i * 0.25)}>
            <span className="flex size-6 items-center justify-center rounded-full bg-[var(--c1)] text-white">
              <Check delay={0.35 + i * 0.25} />
            </span>
            <span className="text-[13.5px] font-bold text-ink-soft">{r}</span>
          </li>
        ))}
      </ul>
      <Pill className="absolute -right-3 -top-3" delay={1}>{tr(lang, "Workflows mapped", "Processus cartographiés")}</Pill>
    </>
  );
}

function SceneConfigure() {
  const lang = useLang();
  const rows = [
    [tr(lang, "Entity: Kenya", "Entité : Kenya"), 0.1],
    [tr(lang, "Role: HR manager", "Rôle : responsable RH"), 0.35],
    [tr(lang, "Approval chain", "Circuit de validation"), 0.6],
  ] as const;
  return (
    <>
      <ul className="space-y-2.5">
        {rows.map(([r, t]) => (
          <li key={r} className="mo-pop flex items-center justify-between rounded-xl bg-white px-3 py-2.5 shadow-card ring-1 ring-line/60" style={d(t)}>
            <span className="text-[13.5px] font-bold text-ink-soft">{r}</span>
            <span className="relative h-5 w-9 rounded-full bg-surface-2">
              <span className="mo-bar absolute inset-0 rounded-full bg-[linear-gradient(90deg,var(--c2),var(--c3))]" style={d(t + 0.5)} />
              <span className="mo-slide absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow" style={{ ...d(t + 0.5), "--x": "16px" } as CSSProperties} />
            </span>
          </li>
        ))}
      </ul>
      <Pill className="absolute -right-3 -top-3" delay={1.3}>{tr(lang, "Set up around you", "Configuré selon vos besoins")}</Pill>
    </>
  );
}

function SceneMigrate() {
  const lang = useLang();
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <div className="mo-pop w-[38%] space-y-1.5 rounded-xl bg-white p-3 shadow-card ring-1 ring-line/60" style={d(0.1)}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="block h-1.5 rounded-full bg-surface-2" style={{ width: `${90 - i * 15}%` }} />
          ))}
        </div>
        <svg viewBox="0 0 40 12" className="w-10 shrink-0 text-[var(--c1)]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path className="mo-draw" style={d(0.5)} d="M2 6h32M28 1.5 34 6l-6 4.5" />
        </svg>
        <div className="mo-pop flex w-[38%] flex-col items-center gap-1.5 rounded-xl bg-white p-3 shadow-card ring-1 ring-line/60" style={d(0.9)}>
          <span className="block h-5 w-8 rounded-md bg-[linear-gradient(135deg,var(--c2),var(--c1))]" />
          <span className="text-[11px] font-bold text-muted">Kazi Pro</span>
        </div>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-surface-2">
        <span className="mo-bar block h-full w-full rounded-full bg-[linear-gradient(90deg,var(--c2),var(--c3))]" style={d(1.1)} />
      </div>
      <Pill className="absolute -right-3 -top-3" delay={1.8}>{tr(lang, "1,248 records moved", "1 248 enregistrements migrés")}</Pill>
    </>
  );
}

function SceneTrain() {
  const lang = useLang();
  const people = ["var(--c3)", "var(--c2)", "var(--soft)", "var(--c1)"];
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex -space-x-3">
          {people.map((c, i) => (
            <span key={i} className="mo-pop size-11 rounded-full ring-[3px] ring-white" style={{ ...d(0.1 + i * 0.18), background: c }} />
          ))}
        </div>
        <span className="mo-pop text-[13px] font-bold text-ink-soft" style={d(0.9)}>{tr(lang, "+ your team", "+ votre équipe")}</span>
      </div>
      <div className="mt-5 space-y-2.5">
        {[[tr(lang, "Administrators", "Administrateurs"), "92%"], [tr(lang, "Managers", "Managers"), "78%"]].map(([l, w], i) => (
          <div key={l}>
            <p className="mo-pop text-[12px] font-bold text-muted" style={d(0.8 + i * 0.2)}>{l}</p>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-2">
              <span className="mo-bar block h-full rounded-full bg-[linear-gradient(90deg,var(--c2),var(--c3))]" style={{ ...d(1 + i * 0.2), width: w }} />
            </div>
          </div>
        ))}
      </div>
      <Pill className="absolute -right-3 -top-3" delay={1.6}>{tr(lang, "Hands-on sessions", "Sessions pratiques")}</Pill>
    </>
  );
}

function SceneLaunch() {
  const lang = useLang();
  const bars = [30, 46, 38, 64, 80];
  return (
    <>
      <div className="flex h-24 items-end gap-2.5">
        {bars.map((h, i) => (
          <span key={i} className="mo-pop flex-1 rounded-t-lg bg-[linear-gradient(0deg,var(--c1),var(--c2))]" style={{ ...d(0.1 + i * 0.12), height: `${h}%` }} />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="mo-pop text-[12px] font-bold text-muted" style={d(0.8)}>{tr(lang, "Week 1 → Week 4", "Semaine 1 → Semaine 4")}</span>
        <span className="mo-pop rounded-lg bg-[#e3f6ea] px-2.5 py-1 text-[11px] font-bold text-[#1f7a45]" style={d(1)}>{tr(lang, "Live", "En service")}</span>
      </div>
      <Pill className="mo-float absolute -right-3 -top-3" delay={1.2}>{tr(lang, "Go live in stages", "Déploiement par étapes")}</Pill>
    </>
  );
}

function SceneSupport() {
  const lang = useLang();
  return (
    <>
      <div className="space-y-2.5">
        <p className="mo-pop w-[78%] rounded-2xl rounded-bl-md bg-white px-3 py-2.5 text-[13px] text-ink-soft shadow-card ring-1 ring-line/60" style={d(0.1)}>
          {tr(lang, "Can we add a new approval step?", "Peut-on ajouter une étape de validation ?")}
        </p>
        <p className="mo-pop ml-auto w-[72%] rounded-2xl rounded-br-md bg-[linear-gradient(135deg,var(--c2),var(--c1))] px-3 py-2.5 text-[13px] font-bold text-white shadow-card" style={d(0.8)}>
          {tr(lang, "Done — it's live for your team.", "C'est fait — c'est en ligne pour votre équipe.")}
        </p>
      </div>
      <Pill className="absolute -right-3 -top-3" delay={1.5}>{tr(lang, "Resolved", "Résolu")}</Pill>
    </>
  );
}

const scenes = [SceneAssess, SceneConfigure, SceneMigrate, SceneTrain, SceneLaunch, SceneSupport];

/* Smootherstep easing (6t^5 - 15t^4 + 10t^3), sampled in many small steps so a fade has no visible start or end. */
const smoother = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const STEPS = 16;

/** Gradient stops going from `from` to `to` (alpha 0..1) along an eased curve, between two positions in %. */
function easedStops(from: number, to: number, a: number, b: number, rgb: string) {
  return Array.from({ length: STEPS + 1 }, (_, i) => {
    const t = i / STEPS;
    const alpha = from + (to - from) * smoother(t);
    return `rgb(${rgb} / ${alpha.toFixed(3)}) ${(a + (b - a) * t).toFixed(2)}%`;
  }).join(", ");
}

/** Edge mask: opaque in the middle, easing to transparent over `edge`% on both sides of an axis. */
function edgeMask(dir: string, edge: number) {
  return `linear-gradient(${dir}, ${easedStops(0, 1, 0, edge, "0 0 0")}, ${easedStops(1, 0, 100 - edge, 100, "0 0 0")})`;
}

function hexRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return `${n >> 16} ${(n >> 8) & 255} ${n & 255}`;
}

/** Tinted card backdrop with no hard border: colour and outer edges both melt away along eased curves. */
function softPanel(hex: string): CSSProperties {
  const mask = `${edgeMask("90deg", 22)}, ${edgeMask("180deg", 26)}`;
  return {
    background: `radial-gradient(120% 110% at 0% 100%, ${easedStops(1, 0.12, 0, 100, hexRgb(hex))})`,
    WebkitMaskImage: mask,
    maskImage: mask,
    WebkitMaskComposite: "source-in",
    maskComposite: "intersect",
  };
}

function Scene({ index, on, left, onPlay, sceneRef }: { index: number; on: boolean; left: boolean; onPlay: () => void; sceneRef: (el: HTMLDivElement | null) => void }) {
  const Content = scenes[index] ?? SceneAssess;
  const p = palettes[index % palettes.length];
  return (
    <div
      ref={sceneRef}
      data-on={on ? "true" : "false"}
      onClick={onPlay}
      style={{ "--c1": p.c1, "--c2": p.c2, "--c3": p.c3, "--soft": p.soft } as CSSProperties}
      className={cn(
        "relative col-start-2 mt-6 w-full max-w-[320px] cursor-pointer transition-[opacity,transform] duration-500 md:row-start-1 md:mt-0",
        on ? "opacity-100" : "opacity-60",
        left ? "md:col-start-3 md:justify-self-start" : "md:col-start-1 md:justify-self-end",
      )}
    >
      <div className="relative min-h-[8.5rem] p-5">
        <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={softPanel(p.panel)} />
        <div className="relative">
          <Content />
        </div>
      </div>
    </div>
  );
}

/** Layout position of `el` inside `root` (stable under transforms). */
function offsetIn(el: HTMLElement | null, root: HTMLElement | null) {
  if (!el || !root) return null;
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return node === root ? { x, y, w: el.offsetWidth, h: el.offsetHeight } : null;
}

/**
 * Delivery journey: a line that draws itself as you scroll, with each step lighting up
 * (3D icon + text) when the line reaches it. Alternates sides on desktop.
 */
export function Journey({ steps }: { steps: { title: string; text: string }[] }) {
  const root = useRef<HTMLOListElement>(null);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);
  const scenesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [fill, setFill] = useState(0);
  const [reached, setReached] = useState(0);
  const [clicked, setClicked] = useState<boolean[]>(() => steps.map(() => false));
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [tick, setTick] = useState(0);
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMotion(false);
      setFill(1);
      setReached(steps.length);
      setClicked(steps.map(() => true));
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = root.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mark = window.innerHeight * 0.6;
      const progress = Math.min(1, Math.max(0, (mark - rect.top) / rect.height));
      setFill(progress);
      setReached(nodes.current.filter((n) => n && n.getBoundingClientRect().top + n.offsetHeight / 2 < mark).length);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [steps.length]);

  // The mouse follows the scroll: it glides to the newest reached card, then clicks it to start its animation.
  const target = reached - 1;
  useEffect(() => {
    if (!motion || target < 0) return;
    const o = offsetIn(scenesRef.current[target], root.current);
    const place = () => {
      const m = offsetIn(scenesRef.current[target], root.current);
      if (m) setCursor({ x: m.x + m.w * 0.62, y: m.y + m.h * 0.5 });
    };
    if (o) {
      setCursor((c) => c ?? { x: o.x + o.w + 40, y: Math.max(0, o.y - 90) });
    }
    const move = window.setTimeout(place, 40);
    // anything the cursor skipped while scrolling fast plays straight away
    setClicked((prev) => (prev.some((c, i) => !c && i < target) ? prev.map((c, i) => c || i < target) : prev));
    const click = window.setTimeout(() => {
      setClicked((prev) => (prev[target] ? prev : prev.map((c, i) => c || i === target)));
      setTick((t) => t + 1);
    }, 900);
    window.addEventListener("resize", place);
    return () => {
      window.clearTimeout(move);
      window.clearTimeout(click);
      window.removeEventListener("resize", place);
    };
  }, [target, motion]);

  const palette = palettes[Math.max(0, target) % palettes.length];

  return (
    <ol ref={root} className="relative mx-auto max-w-4xl">
      <span className="absolute bottom-0 left-7 top-0 w-[3px] -translate-x-1/2 rounded-full bg-ink/10 md:left-1/2" aria-hidden="true">
        <span className="block w-full rounded-full bg-gradient-to-b from-[#5b8def] via-[#3a55c8] to-[#35c4d8]" style={{ height: `${fill * 100}%` }} />
      </span>
      {steps.map((s, i) => {
        const on = i < reached;
        const left = i % 2 === 0;
        return (
          <li key={s.title} className="relative grid grid-cols-[3.5rem_1fr] gap-x-5 py-8 md:grid-cols-[1fr_4.5rem_1fr] md:gap-x-8 md:py-10">
            <div
              ref={(n) => {
                nodes.current[i] = n;
              }}
              className={cn(
                "relative z-10 flex justify-center md:col-start-2 md:row-start-1",
                "transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                on ? "scale-100 opacity-100" : "scale-75 opacity-40 grayscale",
              )}
            >
              <Icon3D name={stepIcons[i] ?? "target"} tone={tones[i % tones.length]} className="w-12 md:w-14" />
            </div>
            <div
              className={cn(
                "transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:row-start-1",
                left ? "md:col-start-1 md:text-right" : "md:col-start-3",
                on ? "translate-y-0 opacity-100" : "translate-y-3 opacity-40",
              )}
            >
              <h3 className="font-serif text-2xl leading-snug tracking-[-0.01em] text-ink">{s.title}</h3>
              <p className={cn("mt-2 max-w-sm text-[15px] leading-7 text-muted", left && "md:ml-auto")}>{s.text}</p>
            </div>
            <Scene
              index={i}
              on={clicked[i]}
              left={left}
              sceneRef={(el) => {
                scenesRef.current[i] = el;
              }}
              onPlay={() => setClicked((prev) => (prev[i] ? prev : prev.map((c, k) => c || k === i)))}
            />
          </li>
        );
      })}

      {/* the guiding mouse */}
      {motion && cursor && target >= 0 && (
        <span
          className="pointer-events-none absolute left-0 top-0 z-30 transition-transform duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
          aria-hidden="true"
        >
          <span key={tick} className="absolute -left-4 -top-4 size-9 rounded-full" style={{ background: `${palette.ripple}59`, animation: tick ? "demo-ripple 0.75s ease-out both" : "none" }} />
          <svg width="26" height="28" viewBox="0 0 20 22" className="drop-shadow-lg">
            <path d="M2 1.5v16l4.4-4 3 6.5 2.6-1.2-3-6.4H16L2 1.5Z" fill="#0b1633" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </ol>
  );
}
