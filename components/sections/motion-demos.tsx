"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode, type RefObject } from "react";
import { Icon3D } from "@/components/ui/icon-3d";
import { FeatureIcon } from "@/components/ui/icons";
import { LogoMark } from "@/components/ui/logo";
import { useLang } from "@/components/ui/locale";
import { cn } from "@/components/ui/primitives";
import { tr } from "@/lib/i18n";
import type { IconName } from "@/lib/site";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Layout position of `el` inside `root` (ignores CSS transforms, so it is stable while the camera moves). */
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

const centreOf = (el: HTMLElement | null, root: HTMLElement | null, dx = 0, dy = 0) => {
  const o = offsetIn(el, root);
  return o ? { x: o.x + o.w / 2 - 3 + dx, y: o.y + o.h / 2 - 2 + dy } : null;
};

/**
 * Continuous director: phases play on a timeline, then the next cycle starts straight away with
 * new data (no reset). The visitor can take over: autoplay stops and `play()` runs scripted steps.
 */
function useDirector(times: number[], loopAt: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [auto, setAuto] = useState(true);
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);
  const manual = useRef<number[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen || !auto) return;
    if (reduced()) {
      setPhase(times.length);
      return;
    }
    const ids = times.map((t, i) => window.setTimeout(() => setPhase(i + 1), t));
    ids.push(
      window.setTimeout(() => {
        setCycle((c) => c + 1);
        setPhase(0);
      }, loopAt),
    );
    return () => ids.forEach(window.clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen, auto, cycle]);

  useEffect(() => () => manual.current.forEach(window.clearTimeout), []);

  /** Visitor takes over: optionally move on to the next item, then run `steps` ([phase, delayMs]). */
  const play = useCallback((steps: [number, number][], nextItem = false) => {
    setAuto(false);
    manual.current.forEach(window.clearTimeout);
    if (nextItem) setCycle((c) => c + 1);
    manual.current = steps.map(([p, d]) => window.setTimeout(() => setPhase(p), d));
  }, []);

  const replay = useCallback(() => {
    manual.current.forEach(window.clearTimeout);
    setCycle((c) => c + 1);
    setPhase(0);
    setAuto(true);
  }, []);

  return { ref, phase, cycle, auto, play, replay };
}

/** Camera that pushes the whole window towards a target (stage-level zoom, clipped by the stage). */
function useStageCamera(stage: RefObject<HTMLDivElement | null>, target: HTMLElement | null, zoom: number, fx = 0.5): CSSProperties {
  const [style, setStyle] = useState<CSSProperties>({ transform: "scale(1)", transformOrigin: "50% 50%" });
  useEffect(() => {
    const root = stage.current;
    const o = target && zoom !== 1 ? offsetIn(target, root) : null;
    if (!o) {
      setStyle((s) => ({ ...s, transform: "scale(1)" }));
      return;
    }
    // Pull the zoom origin towards the stage centre so nothing is pushed out of the stage.
    const cx = (root?.offsetWidth ?? 0) / 2;
    const cy = (root?.offsetHeight ?? 0) / 2;
    const ox = (o.x + o.w * fx) * 0.45 + cx * 0.55;
    const oy = (o.y + o.h / 2) * 0.25 + cy * 0.75;
    setStyle({ transform: `scale(${zoom})`, transformOrigin: `${ox}px ${oy}px` });
  }, [stage, target, zoom, fx]);
  return style;
}

function useTyped(text: string, active: boolean, ms = 70) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) {
      setN(0);
      return;
    }
    if (reduced()) {
      setN(text.length);
      return;
    }
    const id = window.setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), ms);
    return () => window.clearInterval(id);
  }, [active, text, ms]);
  return text.slice(0, n);
}

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

function Cursor({ x, y, click }: { x: number; y: number; click?: boolean }) {
  return (
    <span
      className="pointer-events-none absolute left-0 top-0 z-30 transition-transform duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{ transform: `translate(${x}px, ${y}px)` }}
      aria-hidden="true"
    >
      {click && <span className="absolute -left-3 -top-3 size-7 rounded-full bg-[#4f8df7]/40" style={{ animation: "demo-ripple 0.7s ease-out both" }} />}
      <svg width="20" height="22" viewBox="0 0 20 22" className={cn("drop-shadow-md transition-transform duration-150", click && "scale-90")}>
        <path d="M2 1.5v16l4.4-4 3 6.5 2.6-1.2-3-6.4H16L2 1.5Z" fill="#0b1633" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Num({ value }: { value: number | string }) {
  return (
    <span key={value} className="demo-pop inline-block">
      {value}
    </span>
  );
}

function Suggestions({ items, typed }: { items: string[]; typed: string }) {
  return (
    <ul className="absolute left-0 right-0 top-full z-20 mt-1.5 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-float">
      {items.map((o, i) => (
        <li key={o} className={cn("flex items-center gap-2 px-3 py-1.5 text-[12.5px]", i === 0 ? "bg-[#e8f0fe] text-ink" : "text-ink-soft")}>
          <FeatureIcon name="search" size={12} className="text-muted" />
          <span>
            <b>{o.slice(0, typed.length)}</b>
            {o.slice(typed.length)}
          </span>
          {i === 0 && <span className="ml-auto text-[10.5px] text-muted">↵</span>}
        </li>
      ))}
    </ul>
  );
}

/** Field that the visitor can click to start the sequence. */
function Field({
  value,
  placeholder,
  focused,
  onClick,
  label,
  children,
  innerRef,
}: {
  value: string;
  placeholder: string;
  focused: boolean;
  onClick?: () => void;
  label: string;
  children?: ReactNode;
  innerRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={innerRef} className="relative">
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={cn(
          "flex w-full items-center rounded-xl border bg-white px-3 py-2.5 text-left text-[13px] transition-[border-color,box-shadow]",
          focused ? "border-[#4f8df7] shadow-[0_0_0_3px_rgb(79_141_247/0.15)]" : "border-line hover:border-[#9dbbf7]",
        )}
      >
        {value ? <span className="font-bold text-ink">{value}</span> : <span className="text-muted">{placeholder}</span>}
        {focused && <span className="demo-caret ml-0.5 inline-block h-4 w-px bg-[#4f8df7]" />}
      </button>
      {children}
    </div>
  );
}

/** App window chrome inspired by an editor: icon rail, tabs, breadcrumb. */
function AppChrome({
  rail,
  badge,
  tabs,
  crumbs,
  children,
}: {
  rail: IconName[];
  badge?: string;
  tabs: [string, string];
  crumbs: string[];
  children: ReactNode;
}) {
  return (
    <div className="flex">
      <div className="flex w-11 shrink-0 flex-col items-center gap-3.5 border-r border-line bg-surface/60 py-4 text-muted" aria-hidden="true">
        {rail.map((icon, i) => (
          <span key={icon} className={cn("relative", i === 0 && "text-[#3a55c8]")}>
            <FeatureIcon name={icon} size={16} />
            {i === 0 && badge && (
              <span className="absolute -bottom-2 -right-2.5 rounded-full bg-[#3a55c8] px-1 text-[8.5px] font-bold leading-[13px] text-white">{badge}</span>
            )}
          </span>
        ))}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-4 border-b border-line px-4 py-2.5 text-[12px]" aria-hidden="true">
          <span className="flex items-center gap-1.5 font-bold text-ink">
            <span className="size-1.5 rounded-full bg-[#3a55c8]" />
            {tabs[0]}
          </span>
          <span className="truncate italic text-muted">{tabs[1]}</span>
        </div>
        <p className="flex items-center gap-1.5 px-4 pt-3 text-[11.5px] text-muted" aria-hidden="true">
          {crumbs.map((c, i) => (
            <span key={c} className={cn("flex items-center gap-1.5", i === crumbs.length - 1 && "text-ink")}>
              {i > 0 && <span className="text-line">›</span>}
              {c}
            </span>
          ))}
        </p>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

/** Floating card in front of the window (translateZ), bobbing gently. */
function Floating({ z = 70, className, children, show = true, interactive }: { z?: number; className?: string; children: ReactNode; show?: boolean; interactive?: boolean }) {
  if (!show) return null;
  return (
    <div className={cn("float-z z-40", className)} style={{ "--z": `${z}px` } as CSSProperties} aria-hidden={interactive ? undefined : true}>
      <div className="float-in">
        <div className="float-bob">{children}</div>
      </div>
    </div>
  );
}

/** The floating 3D icon is a real button: hover lifts it, click starts the next step of the demo. */
function IconButton({ icon, label, badge, onClick, wiggle }: { icon: IconName; label: string; badge?: number; onClick: () => void; wiggle?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group relative block rounded-2xl outline-offset-4 transition-transform duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] hover:-translate-y-1 hover:scale-110 hover:-rotate-3 active:scale-95"
    >
      <Icon3D name={icon} className={cn("w-14 transition-[filter] duration-300 group-hover:drop-shadow-[0_20px_22px_rgba(58,85,200,0.55)]", wiggle && "icon-wiggle")} />
      {!!badge && (
        <span key={badge} className="demo-pop absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-[#ff7a45] text-[10.5px] font-bold text-white ring-2 ring-white">
          {badge}
        </span>
      )}
      <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1 text-[11px] font-bold text-white opacity-0 shadow-float transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
        {label}
      </span>
    </button>
  );
}

function Toast({ icon, title, text }: { icon: IconName; title: string; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_24px_50px_-16px_rgb(40_60_140/0.45)] ring-1 ring-white backdrop-blur">
      <Icon3D name={icon} className="w-9" />
      <div>
        <p className="text-[13.5px] font-bold leading-tight text-ink">{title}</p>
        <p className="text-[11.5px] text-muted">{text}</p>
      </div>
    </div>
  );
}

/**
 * 3D stage: pale stage with drifting light. A camera layer pushes in on the action; inside it the
 * window tilts in space (idle sway, follows the pointer) with layers floating in front.
 */
function Stage3D({
  children,
  floating,
  camera,
  stageRef,
  showReplay,
  onReplay,
}: {
  children: ReactNode;
  floating?: ReactNode;
  camera?: CSSProperties;
  stageRef?: RefObject<HTMLDivElement | null>;
  showReplay?: boolean;
  onReplay?: () => void;
}) {
  const lang = useLang();
  const [tilt, setTilt] = useState<{ rx: number; ry: number } | null>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduced()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 10, ry: px * 14 });
  };

  return (
    <div className="glow-stage" onPointerMove={onMove} onPointerLeave={() => setTilt(null)}>
      <div className="glow-bg" aria-hidden="true">
        <span className="glow-orb left-[-8%] top-[-10%] size-72 bg-[#e2e8f3]" />
        <span className="glow-orb bottom-[-12%] right-[-6%] size-72 bg-[#dde4f1] [animation-delay:-4s]" />
        <span className="glow-orb bottom-[8%] left-[18%] size-56 bg-[#e8edf5] [animation-delay:-7s]" />
        <span className="glow-orb right-[10%] top-[6%] size-52 bg-[#eef2f8] [animation-delay:-2s]" />
      </div>
      <div ref={stageRef} className="camera relative h-full" style={camera}>
        <div className="stage-3d flex h-full items-center justify-center px-12 pb-12 pt-20 sm:px-20 sm:pb-14 sm:pt-24">
          <div
            className={cn("tilt-3d relative w-full max-w-[380px]", !tilt && "tilt-idle")}
            style={tilt ? { transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` } : undefined}
          >
            <div className="window-fade relative overflow-hidden rounded-[1.25rem] bg-white shadow-[0_1px_3px_rgb(120_140_190/0.10),0_28px_60px_-28px_rgb(130_150_200/0.30)]">
              {children}
            </div>
            {floating}
          </div>
        </div>
      </div>
      {showReplay && onReplay && (
        <button
          type="button"
          onClick={onReplay}
          className="absolute bottom-4 right-4 z-50 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-[12px] font-bold text-ink shadow-card ring-1 ring-line/60 backdrop-blur transition-colors hover:bg-white"
        >
          <span aria-hidden="true">↺</span> {tr(lang, "Replay", "Rejouer")}
        </button>
      )}
    </div>
  );
}

/** Kept for compatibility: a plain stage around arbitrary content. */
export function GlowStage({ children }: { children: ReactNode }) {
  return <Stage3D>{children}</Stage3D>;
}

const avatar = ["from-[#cfe0f7] to-[#a9b8f5]", "from-[#d9f2f7] to-[#8fd3e8]", "from-[#e3e0fb] to-[#b2a6f0]"];

/* ------------------------------------------------------------------ */
/* Kazi Pro: modelled on the real app (request centre → form → approvals) */
/* ------------------------------------------------------------------ */

const KAZI_BLUE = "#0a4ca8";

export function KaziLeaveDemo() {
  const lang = useLang();
  // 1 click search + typing · 2 cursor to "Introduire" · 3 form opens · 4 form fills · 5 cursor to Send
  // 6 sent · 7 cursor to Approvals · 8 approvals view · 9 approved · 10 hold
  const { ref, phase, cycle, auto, play, replay } = useDirector([650, 1450, 2300, 2750, 3700, 4500, 5200, 6100, 6800, 7800], 9800);
  const stage = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLButtonElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const sendRef = useRef<HTMLButtonElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const approveRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const people = [
    { name: "Amina K.", type: tr(lang, "Annual leave", "Congé annuel"), days: 3, dates: tr(lang, "Oct 20 – 22", "20 – 22 oct.") },
    { name: "Brian O.", type: tr(lang, "Sick leave", "Congé maladie"), days: 1, dates: tr(lang, "Oct 24", "24 oct.") },
    { name: "Chidi N.", type: tr(lang, "Special leave", "Congé spécial"), days: 2, dates: tr(lang, "Oct 27 – 28", "27 – 28 oct.") },
  ];
  const cur = people[cycle % 3];
  const prev = cycle > 0 ? people[(cycle - 1) % 3] : { name: "Grace W.", type: tr(lang, "Annual leave", "Congé annuel"), days: 2, dates: tr(lang, "Oct 13 – 14", "13 – 14 oct.") };
  const dayLabel = (d: number) => (d === 1 ? tr(lang, "1 day", "1 jour") : tr(lang, `${d} days`, `${d} jours`));

  const query = tr(lang, "leave", "congé");
  const typedQuery = useTyped(query, phase === 1, 90);
  const typedType = useTyped(cur.type, phase === 4, 55);
  const filtered = (phase === 1 && typedQuery.length >= 3) || (phase >= 2 && phase < 3);
  const view = phase >= 8 ? "approvals" : phase >= 3 ? "form" : "requests";
  const sent = phase >= 6;
  const approved = phase >= 9;
  const pendingBadge = phase >= 6 && phase < 9 ? 1 : 0;

  const camTarget = phase === 2 ? introRef.current : phase === 4 ? typeRef.current : phase >= 8 && phase <= 9 ? approveRef.current : null;
  const camera = useStageCamera(stage, camTarget, camTarget ? 1.08 : 1, 0.5);

  useEffect(() => {
    const root = content.current;
    if (!root) return;
    if (phase === 0) {
      setPos((p) => p ?? { x: root.offsetWidth * 0.88, y: root.offsetHeight * 0.9 });
      const id = window.setTimeout(() => setPos(centreOf(searchRef.current, root, 60)), 30);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => {
      const t = phase === 2 ? introRef.current : phase === 4 ? typeRef.current : phase === 5 ? sendRef.current : phase === 7 ? railRef.current : phase === 8 ? approveRef.current : null;
      if (t) setPos(centreOf(t, root));
      if (phase === 10) setPos((p) => (p ? { x: p.x - 36, y: p.y + 36 } : p));
    }, 40);
    return () => window.clearTimeout(id);
  }, [phase, cycle]);

  const startSearch = () => {
    if (view !== "requests" || (phase > 0 && phase < 10)) return;
    play([[0, 0], [1, 30], [2, 1000]], phase >= 10);
  };
  const nextRequest = () => play([[0, 0], [1, 30], [2, 1000]], true);
  const introduce = () => {
    if (view !== "requests" || phase >= 3) return;
    play([[3, 0], [4, 600]]);
  };
  const send = () => {
    if (view !== "form" || phase >= 6) return;
    play([[6, 0], [8, 1500]]);
  };
  const approve = () => {
    if (view !== "approvals" || phase >= 9) return;
    play([[9, 0], [10, 1300]]);
  };

  const rail: { icon: IconName; label: string; active?: boolean; ref?: RefObject<HTMLSpanElement | null>; badge?: number }[] = [
    { icon: "layers", label: tr(lang, "Home", "Accueil") },
    { icon: "book", label: tr(lang, "Leave", "Congés") },
    { icon: "newspaper", label: tr(lang, "Requests", "Demandes"), active: view !== "approvals" },
    { icon: "shield", label: tr(lang, "Approvals", "Approbations"), active: view === "approvals", ref: railRef, badge: pendingBadge },
  ];

  const cards = [
    { id: "leave", icon: "compass" as IconName, title: tr(lang, "Leave request", "Demande de congés"), text: tr(lang, "Annual, sick or special leave.", "Congés annuels, maladie ou exceptionnels."), tag: tr(lang, "HR", "RH"), main: true },
    { id: "pay", icon: "briefcase" as IconName, title: tr(lang, "Payment request", "Demande de paiement"), text: tr(lang, "Expense refund, advance or supplier payment.", "Remboursement de frais, avance ou règlement."), tag: tr(lang, "FINANCE", "FINANCE"), main: false },
  ];

  return (
    <div ref={ref} className="absolute inset-0">
      <Stage3D
        stageRef={stage}
        camera={camera}
        showReplay={!auto}
        onReplay={replay}
        floating={
          <>
            <Floating z={55} className="-left-2 -top-6" interactive>
              <IconButton
                icon="users"
                label={tr(lang, "Start a new request", "Lancer une nouvelle demande")}
                badge={pendingBadge || undefined}
                wiggle={phase === 9}
                onClick={nextRequest}
              />
            </Floating>
            <Floating key={`sent-${cycle}`} z={50} show={phase >= 6 && phase < 8} className="-right-3 top-24">
              <Toast icon="rocket" title={tr(lang, "Request sent", "Demande envoyée")} text={`${cur.type} · ${dayLabel(cur.days)}`} />
            </Floating>
            <Floating key={`ok-${cycle}`} z={50} show={phase >= 9} className="-right-3 top-24">
              <Toast icon="shield" title={tr(lang, "Request approved", "Demande approuvée")} text={`${cur.name} · ${dayLabel(cur.days)}`} />
            </Floating>
          </>
        }
      >
        <div ref={content} className="relative flex" role="img" aria-label={tr(lang, "Animated illustration of Kazi Pro: a leave request is searched, filled in, sent and approved", "Illustration animée de Kazi Pro : une demande de congé est recherchée, remplie, envoyée puis approuvée")}>
          {/* real-app blue navigation rail */}
          <div className="rail-fade flex w-12 shrink-0 flex-col items-center gap-3 py-3" style={{ background: KAZI_BLUE }} aria-hidden="true">
            <span className="flex size-7 items-center justify-center rounded-lg bg-white">
              <LogoMark size={15} />
            </span>
            <div className="mt-2 flex flex-col items-center gap-2.5">
              {rail.map((r) => (
                <span
                  key={r.label}
                  ref={r.ref}
                  className={cn("relative flex size-8 items-center justify-center rounded-lg text-white/70 transition-colors", r.active && "bg-white/20 text-white")}
                  title={r.label}
                >
                  {r.active && <span className="absolute -left-2 top-1.5 h-5 w-[3px] rounded-full bg-white" />}
                  <FeatureIcon name={r.icon} size={15} />
                  {!!r.badge && <span className="demo-pop absolute -right-1 -top-1 flex size-3.5 items-center justify-center rounded-full bg-[#ff7a45] text-[8px] font-bold text-white">{r.badge}</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="min-w-0 flex-1 bg-[#f6f8fc]">
            <div className="flex items-center justify-between border-b border-line/70 bg-white px-3 py-2">
              <div>
                <p className="text-[11.5px] font-bold text-ink">{tr(lang, "Good afternoon, Amina", "Bon après-midi, Amina")}</p>
                <p className="text-[9.5px] text-muted">{tr(lang, "Monday 5 October 2026", "Lundi 5 octobre 2026")}</p>
              </div>
              <span className="rounded-md bg-surface px-1.5 py-0.5 text-[9.5px] font-bold text-ink-soft">{tr(lang, "EN", "FR")}</span>
            </div>

            <div className="relative h-[372px] overflow-hidden">
              {/* VIEW 1: request centre */}
              <div className={cn("absolute inset-0 px-3 pt-3 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", view === "requests" ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0")}>
                <div className="rounded-xl p-3 text-white" style={{ background: KAZI_BLUE }}>
                  <p className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-white/60">{tr(lang, "Request centre", "Centre de demandes")}</p>
                  <p className="mt-0.5 text-[13px] font-bold leading-tight">{tr(lang, "What would you like to request?", "Que souhaitez-vous demander ?")}</p>
                </div>
                <div className="mt-2">
                  <Field
                    innerRef={searchRef}
                    value={typedQuery}
                    placeholder={tr(lang, "Search a request type…", "Rechercher un type de demande…")}
                    focused={phase === 1}
                    onClick={startSearch}
                    label={tr(lang, "Search a request type", "Rechercher un type de demande")}
                  />
                </div>
                <div className="mt-2 flex gap-1.5 text-[10px] font-bold" aria-hidden="true">
                  {[tr(lang, "All", "Tout"), "Finance", tr(lang, "HR", "RH"), tr(lang, "Logistics", "Logistique")].map((t, i) => (
                    <span key={t} className={cn("rounded-full px-2.5 py-1", i === 0 ? "bg-white text-[#0a4ca8] shadow-card" : "text-muted")}>
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-2.5 flex items-center gap-1.5 text-[11px] font-bold text-ink">
                  {tr(lang, "Available", "Disponibles")}
                  <span className="rounded-md bg-white px-1.5 text-[10px] text-muted shadow-card">{filtered ? 1 : 2}</span>
                </p>
                <div className={cn("mt-2 grid gap-2 transition-[grid-template-columns]", filtered ? "grid-cols-1" : "grid-cols-2")}>
                  {cards.filter((c) => !filtered || c.main).map((c) => (
                    <div key={c.id} className="demo-in-soft rounded-xl bg-white p-2.5 shadow-card ring-1 ring-line/60">
                      <span className="flex size-8 items-center justify-center rounded-lg bg-[#e2f6f1] text-[#0f9d8a]">
                        <FeatureIcon name={c.icon} size={16} />
                      </span>
                      <p className="mt-1.5 text-[11.5px] font-bold leading-tight text-ink">{c.title}</p>
                      <p className="mt-0.5 line-clamp-2 text-[9.5px] leading-snug text-muted">{c.text}</p>
                      <div className="mt-2 flex items-center justify-between border-t border-line/70 pt-1.5">
                        <span className="flex items-center gap-1 text-[8.5px] font-bold text-muted">
                          <span className="size-1.5 rounded-full bg-[#0f9d8a]" />
                          {c.tag}
                        </span>
                        {c.main ? (
                          <button ref={introRef} type="button" onClick={introduce} className="text-[10.5px] font-bold text-[#0f9d8a] transition-transform hover:translate-x-0.5">
                            {tr(lang, "Start", "Introduire")} →
                          </button>
                        ) : (
                          <span className="text-[10.5px] font-bold text-[#0f9d8a]">{tr(lang, "Start", "Introduire")} →</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* VIEW 2: the form */}
              <div className={cn("absolute inset-0 px-3 pt-3 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", view === "form" ? "translate-x-0 opacity-100" : view === "requests" ? "translate-x-6 opacity-0" : "-translate-x-6 opacity-0")}>
                <p className="flex items-center gap-1.5 text-[12px] font-bold text-ink">
                  <span className="text-muted">←</span> {tr(lang, "Leave request", "Demande de congés")}
                </p>
                <p className="mt-2 text-[9.5px] font-bold uppercase tracking-wide text-muted">{tr(lang, "Leave type", "Type de congé")}</p>
                <div ref={typeRef} className={cn("mt-1 flex items-center justify-between rounded-xl border bg-white px-3 py-2 text-[12.5px] transition-colors", phase === 4 ? "border-[#4f8df7] shadow-[0_0_0_3px_rgb(79_141_247/0.15)]" : "border-line")}>
                  <span className="font-bold text-ink">
                    {phase >= 5 ? cur.type : typedType}
                    {phase === 4 && <span className="demo-caret ml-0.5 inline-block h-3.5 w-px bg-[#4f8df7] align-middle" />}
                  </span>
                  <span className="text-muted">⌄</span>
                </div>
                <p className="mt-2.5 text-[9.5px] font-bold uppercase tracking-wide text-muted">{tr(lang, "Dates", "Dates")}</p>
                <div className="mt-1 flex gap-2">
                  <div className="flex-1 rounded-xl border border-line bg-white px-3 py-2 text-[12.5px] font-bold text-ink">
                    {phase >= 4 ? <span key={cycle} className="demo-pop inline-block">{cur.dates}</span> : <span className="font-normal text-muted">{tr(lang, "Pick dates", "Choisir les dates")}</span>}
                  </div>
                  {phase >= 4 && (
                    <span className="demo-pop flex items-center rounded-xl bg-[#e8f0fe] px-2.5 text-[11px] font-bold text-[#3a55c8]">{dayLabel(cur.days)}</span>
                  )}
                </div>
                <div className="mt-2.5 flex items-center justify-between rounded-xl bg-[#e2f6f1] px-3 py-2 text-[11px] text-[#0b6f61]">
                  <span>{tr(lang, "Leave balance", "Solde de congés")}</span>
                  <span className="font-bold tabular-nums">
                    18 → <Num value={phase >= 4 ? 18 - cur.days : 18} /> {tr(lang, "d", "j")}
                  </span>
                </div>
                <button
                  ref={sendRef}
                  type="button"
                  onClick={send}
                  className={cn(
                    "mt-3 ml-auto flex w-fit items-center justify-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[11px] font-bold text-white transition-[background-color,transform] hover:scale-105 active:scale-95",
                    sent ? "bg-[#1f9d63]" : "bg-[#0f9d8a]",
                  )}
                >
                  {sent ? <>✓ {tr(lang, "Request sent", "Demande envoyée")}</> : tr(lang, "Send the request", "Envoyer la demande")}
                </button>
              </div>

              {/* VIEW 3: manager approvals */}
              <div className={cn("absolute inset-0 px-3 pt-3 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", view === "approvals" ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0")}>
                <div className="flex items-center justify-between">
                  <p className="text-[12.5px] font-bold text-ink">{tr(lang, "Approvals", "Approbations")}</p>
                  <span className="rounded-md bg-white px-1.5 text-[10px] font-bold text-muted shadow-card">{approved ? 0 : 1} {tr(lang, "pending", "en attente")}</span>
                </div>
                <div className="mt-2 space-y-2">
                  <div className={cn("flex items-center justify-between rounded-xl bg-white p-2.5 shadow-card ring-1 ring-line/60", approved && "demo-flash")}>
                    <div className="flex items-center gap-2.5">
                      <span className={cn("size-8 rounded-full bg-gradient-to-br", avatar[cycle % 3])} />
                      <div>
                        <p className="text-[12px] font-bold text-ink">{cur.type}</p>
                        <p className="text-[10px] text-muted">
                          {cur.name} · {dayLabel(cur.days)} · {cur.dates}
                        </p>
                      </div>
                    </div>
                    {approved ? (
                      <span className="demo-pop rounded-md bg-[#e3f6ea] px-2 py-0.5 text-[10.5px] font-bold text-[#1f7a45]">{tr(lang, "Approved", "Approuvé")}</span>
                    ) : (
                      <button ref={approveRef} type="button" onClick={approve} className="rounded-md px-2.5 py-1 text-[10.5px] font-bold text-white transition-transform hover:scale-105 active:scale-95" style={{ background: KAZI_BLUE }}>
                        {tr(lang, "Approve", "Approuver")}
                      </button>
                    )}
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/80 p-2.5 ring-1 ring-line/50">
                    <div className="flex items-center gap-2.5">
                      <span className={cn("size-8 rounded-full bg-gradient-to-br", avatar[(cycle + 2) % 3])} />
                      <div>
                        <p className="text-[12px] font-bold text-ink">{prev.type}</p>
                        <p className="text-[10px] text-muted">
                          {prev.name} · {dayLabel(prev.days)} · {prev.dates}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-md bg-[#e3f6ea] px-2 py-0.5 text-[10.5px] font-bold text-[#1f7a45]">{tr(lang, "Approved", "Approuvé")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {auto && pos && <Cursor x={pos.x} y={pos.y} click={phase === 1 || phase === 3 || phase === 6 || phase === 7 || phase === 9} />}
        </div>
      </Stage3D>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Talent Pro: candidates move forward one after another               */
/* ------------------------------------------------------------------ */

export function TalentDemo() {
  const lang = useLang();
  // 1 typing (first time only, camera on search) · 2 bars · 3 candidate (camera on card) · 4 cursor to button · 5 moved · 6 camera out
  const { ref, phase, cycle, auto, play, replay } = useDirector([600, 1400, 2200, 2900, 3600, 4600], 6300);
  const stage = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const full = tr(lang, "Sales rep", "Commercial");
  const firstRun = cycle === 0;
  const typed = useTyped(full, firstRun && phase === 1, 75);
  const people = ["Amara O.", "Kevin M.", "Fatou D."];
  const name = people[cycle % 3];
  const moved = phase >= 5;
  const done = (cycle + (moved ? 1 : 0)) % 6;
  const stages = [
    { name: tr(lang, "Applied", "Candidatures"), count: 48 + (cycle % 4), w: 100 },
    { name: tr(lang, "Screening", "Présélection"), count: 21 - done, w: 62 - done * 3 },
    { name: tr(lang, "Interview", "Entretien"), count: 9 + done, w: 38 + done * 4 },
    { name: tr(lang, "Offer", "Offre"), count: 3, w: 18 },
  ];

  const camTarget = firstRun && phase === 1 ? field.current : phase >= 3 && phase <= 5 ? card.current : null;
  const camera = useStageCamera(stage, camTarget, firstRun && phase === 1 ? 1.14 : phase >= 3 && phase <= 5 ? 1.07 : 1, phase === 1 ? 0.4 : 0.55);

  useEffect(() => {
    const root = content.current;
    if (!root) return;
    if (phase === 0) {
      setPos((p) => p ?? { x: root.offsetWidth * 0.86, y: root.offsetHeight * 0.92 });
      const id = window.setTimeout(() => setPos(firstRun ? centreOf(field.current, root, 60) : { x: root.offsetWidth * 0.7, y: root.offsetHeight * 0.55 }), 30);
      return () => window.clearTimeout(id);
    }
    if (phase === 4) setPos(centreOf(btn.current, root));
    if (phase === 6) setPos((p) => (p ? { x: p.x - 30, y: p.y - 50 } : p));
  }, [phase, cycle, firstRun]);

  const nextCandidate = () => play([[0, 0], [2, 30], [3, 700]], true);
  const advance = () => {
    if (phase < 3 || phase >= 5) return;
    play([[5, 0], [6, 1200]]);
  };
  const search = () => {
    if (phase > 0 && phase < 5) return;
    play([[0, 0], [2, 30], [3, 700]], phase >= 5);
  };

  return (
    <div ref={ref} className="absolute inset-0">
      <Stage3D
        stageRef={stage}
        camera={camera}
        showReplay={!auto}
        onReplay={replay}
        floating={
          <>
            <Floating z={55} className="-left-2 -top-6" interactive>
              <IconButton
                icon="search"
                label={tr(lang, "Move the next candidate", "Faire avancer un candidat")}
                badge={phase >= 3 && phase < 5 ? 1 : undefined}
                wiggle={moved}
                onClick={nextCandidate}
              />
            </Floating>
            <Floating key={`ok-${cycle}`} z={50} show={moved} className="-right-3 top-24">
              <Toast icon="handshake" title={tr(lang, "Interview scheduled", "Entretien planifié")} text={`${name} · ${tr(lang, "Thu 14:00", "jeu. 14 h")}`} />
            </Floating>
          </>
        }
      >
        <AppChrome
          rail={["search", "users", "newspaper", "chart", "shield"]}
          badge={String(12 + (cycle % 5))}
          tabs={[tr(lang, "Hiring funnel", "Entonnoir de recrutement"), tr(lang, "Candidates", "Candidats")]}
          crumbs={["Talent Pro", tr(lang, "Roles", "Postes"), full]}
        >
          <div ref={content} className="relative px-4 pb-4 pt-3">
            <Field
              innerRef={field}
              value={firstRun && phase <= 1 ? typed : full}
              placeholder={tr(lang, "Search a role…", "Rechercher un poste…")}
              focused={firstRun && phase === 1}
              onClick={search}
              label={tr(lang, "Search a role", "Rechercher un poste")}
            >
              {firstRun && phase === 1 && typed.length > 0 && typed.length < full.length && (
                <Suggestions items={[`${full} · Nairobi`, `${full} · Kampala`, `${full} · Kigali`]} typed={typed} />
              )}
            </Field>
            <ul className="mt-3.5 space-y-2.5">
              {stages.map((s, i) => (
                <li key={s.name}>
                  <div className="flex justify-between text-[12px]">
                    <span className="font-bold text-ink">{s.name}</span>
                    <span className="tabular-nums text-muted">
                      <Num value={s.count} />
                    </span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#5b8def] to-[#35c4d8] transition-[width] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{ width: !firstRun || phase >= 2 ? `${s.w}%` : "0%", transitionDelay: `${i * 70}ms` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-3.5 min-h-[3.1rem]">
              {(phase >= 3 || !firstRun) && (
                <div key={cycle - (phase >= 3 ? 0 : 1)} ref={phase >= 3 ? card : undefined} className={cn("flex items-center gap-3 rounded-xl bg-[#eef3fd] px-3 py-2.5", phase >= 3 && (moved ? "demo-flash" : "demo-in"))}>
                  <span className={cn("size-8 shrink-0 rounded-full bg-gradient-to-br ring-2 ring-white", avatar[(phase >= 3 ? cycle : cycle - 1 + 3) % 3])} />
                  <div className="min-w-0 flex-1 text-[12px]">
                    <p className="font-bold text-ink">{phase >= 3 ? name : people[(cycle - 1 + 3) % 3]}</p>
                    <p className="text-muted">
                      {phase < 3 || moved ? tr(lang, "Moved to Interview", "Passé·e en entretien") : tr(lang, "Shortlisted from Screening", "Retenu·e après la présélection")}
                    </p>
                  </div>
                  {phase < 3 || moved ? (
                    <span className="demo-pop flex size-6 items-center justify-center rounded-full bg-[#1f9d63] text-[12px] text-white">✓</span>
                  ) : (
                    <button
                      ref={btn}
                      type="button"
                      onClick={advance}
                      className="shrink-0 rounded-md bg-ink px-2.5 py-1 text-[10.5px] font-bold text-white transition-transform hover:scale-105 active:scale-95"
                    >
                      {tr(lang, "Interview", "Entretien")}
                    </button>
                  )}
                </div>
              )}
            </div>
            {auto && pos && <Cursor x={pos.x} y={pos.y} click={(firstRun && phase === 1) || phase === 5} />}
          </div>
        </AppChrome>
      </Stage3D>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sales Tracker: deals keep flowing from Lead to Proposal             */
/* ------------------------------------------------------------------ */

export function SalesDemo() {
  const lang = useLang();
  // 0 cursor to the deal · 1 grab (camera in) · 2 drag (cursor rides with the card) · 3 drop · 4 reminder · 5 camera out
  const { ref, phase, cycle, auto, play, replay } = useDirector([650, 950, 1850, 2450, 3900], 5600);
  const stage = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const board = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const deals = [
    { name: "Savanna Foods", value: "KES 1.2M" },
    { name: "Mara Distributors", value: "KES 860K" },
    { name: "Kilimani Hardware", value: "KES 2.4M" },
  ];
  const cols = [tr(lang, "Lead", "Prospect"), tr(lang, "Proposal", "Proposition"), tr(lang, "Won", "Gagné")];
  const colTone = [
    { bg: "bg-[#e8f0fe]", text: "text-[#3a55c8]", dot: "bg-[#5b8def]", pill: "bg-white/70 text-[#3a55c8]" },
    { bg: "bg-[#e2f4f8]", text: "text-[#1d7f95]", dot: "bg-[#35c4d8]", pill: "bg-white/70 text-[#1d7f95]" },
    { bg: "bg-[#e5f5ec]", text: "text-[#1f7a45]", dot: "bg-[#1f9d63]", pill: "bg-white/70 text-[#1f7a45]" },
  ];
  const grabbed = phase >= 1 && phase < 3;
  const done = phase >= 4;
  const current = deals[cycle % 3];
  const camera = useStageCamera(stage, phase >= 1 && phase <= 4 ? board.current : null, 1.06);

  // Cards on the board: the current deal, the previous one (now in Proposal, slides down a slot) and the one before (fades out)
  const cards = [cycle - 2, cycle - 1, cycle].filter((k) => k >= 0).map((k) => {
    const d = deals[k % 3];
    if (k === cycle) return { k, d, col: phase >= 2 ? 1 : 0, slot: 0, visible: true };
    if (k === cycle - 1) return { k, d, col: 1, slot: phase >= 2 ? 1 : 0, visible: true };
    return { k, d, col: 1, slot: 2, visible: phase < 2 };
  });

  useEffect(() => {
    const root = content.current;
    const b = board.current;
    if (!root || !b) return;
    const o = offsetIn(b, root);
    if (!o) return;
    const colW = o.w / 3;
    const onCard = (c: number) => ({ x: o.x + c * colW + colW * 0.62, y: o.y + 34 + 30 });
    if (phase === 0) {
      setPos((p) => p ?? { x: root.offsetWidth * 0.9, y: root.offsetHeight * 0.92 });
      const id = window.setTimeout(() => setPos(onCard(0)), 30);
      return () => window.clearTimeout(id);
    }
    if (phase === 2) setPos(onCard(1));
    if (phase === 3) setPos({ x: o.x + colW * 1.62, y: o.y + 135 });
  }, [phase, cycle]);

  const nextDeal = () => play([[0, 0], [1, 30], [2, 250], [3, 1100], [4, 1650], [5, 3000]], true);
  const drag = () => {
    if (phase >= 1 && phase < 5) return;
    play([[0, 0], [1, 30], [2, 250], [3, 1100], [4, 1650], [5, 3000]], phase >= 5);
  };

  return (
    <div ref={ref} className="absolute inset-0">
      <Stage3D
        stageRef={stage}
        camera={camera}
        showReplay={!auto}
        onReplay={replay}
        floating={
          <>
            <Floating z={55} className="-left-2 -top-6" interactive>
              <IconButton
                icon="chart"
                label={tr(lang, "Move the next deal", "Faire avancer une affaire")}
                badge={done ? undefined : 3}
                wiggle={done}
                onClick={nextDeal}
              />
            </Floating>
            <Floating key={`ok-${cycle}`} z={50} show={done} className="-right-3 top-28">
              <Toast icon="handshake" title={tr(lang, "Follow-up scheduled", "Relance programmée")} text={`${current.name} · ${tr(lang, "Fri 10:00", "ven. 10 h")}`} />
            </Floating>
          </>
        }
      >
        <AppChrome
          rail={["chart", "users", "briefcase", "newspaper", "shield"]}
          badge={String(3 + (cycle % 3))}
          tabs={[tr(lang, "Pipeline", "Pipeline"), tr(lang, "Follow-ups", "Relances")]}
          crumbs={["Sales Tracker", tr(lang, "This quarter", "Ce trimestre")]}
        >
          <div ref={content} className="relative px-4 pb-4 pt-3">
            <div ref={board} className="relative">
              <div className="grid grid-cols-3 gap-2">
                {cols.map((c, i) => (
                  <div key={c} className={cn("h-[200px] rounded-xl p-2", colTone[i].bg)}>
                    <p className={cn("flex items-center justify-between px-1 text-[10.5px] font-bold uppercase tracking-wide", colTone[i].text)}>
                      <span className="flex items-center gap-1.5">
                        <span className={cn("size-1.5 rounded-full", colTone[i].dot)} />
                        {c}
                      </span>
                      <span className={cn("rounded-full px-1.5 tabular-nums", colTone[i].pill)}>
                        <Num value={i === 0 ? (phase >= 2 ? 2 : 3) : i === 1 ? (phase >= 2 ? 3 : 2) : 1 + (cycle % 4)} />
                      </span>
                    </p>
                    <div className="mt-2 space-y-2">
                      {[0, 1, 2].map((r) =>
                        (i === 0 && r === 0) || (i === 1 && r < 2) ? null : (
                          <div key={r} className="h-[50px] space-y-1.5 rounded-lg bg-white/80 p-2.5 shadow-[0_1px_2px_rgb(30_50_120/0.05)]">
                            <span className={cn("block h-1.5 w-3/4 rounded-full opacity-60", colTone[i].dot)} />
                            <span className="block h-1.5 w-1/2 rounded-full bg-ink/10" />
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {cards.map(({ k, d, col, slot, visible }) => {
                const isCurrent = k === cycle;
                return (
                  <button
                    key={k}
                    type="button"
                    tabIndex={isCurrent ? 0 : -1}
                    onClick={isCurrent ? drag : undefined}
                    aria-label={isCurrent ? tr(lang, `Move the ${d.name} deal to Proposal`, `Passer l'affaire ${d.name} en proposition`) : undefined}
                    aria-hidden={isCurrent ? undefined : true}
                    className={cn(
                      "absolute z-20 w-[calc(33.333%-0.35rem)] rounded-lg bg-white p-2.5 text-left ring-1 transition-[left,top,transform,box-shadow,opacity] duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isCurrent && phase === 0 && "float-in",
                      isCurrent && grabbed ? "scale-[1.06] -rotate-2 shadow-float ring-[#9dbbf7]" : "shadow-card ring-line/70",
                      isCurrent ? "cursor-grab hover:ring-[#9dbbf7]" : "pointer-events-none",
                      !visible && "opacity-0",
                    )}
                    style={{ left: `calc(${col * (100 / 3)}% + 0.25rem)`, top: `${34 + slot * 74}px` }}
                  >
                    <p className="truncate text-[12px] font-bold text-ink">{d.name}</p>
                    <p className="mt-0.5 text-[11px] tabular-nums text-accent-strong">{d.value}</p>
                    {(!isCurrent || done) && (
                      <p className="mt-1.5 inline-flex rounded bg-[#e3f6ea] px-1.5 py-0.5 text-[10px] text-[#1f7a45]">{tr(lang, "Fri 10:00", "Ven. 10 h")}</p>
                    )}
                  </button>
                );
              })}
            </div>
            {auto && pos && <Cursor x={pos.x} y={pos.y} click={phase === 1} />}
          </div>
        </AppChrome>
      </Stage3D>
    </div>
  );
}
