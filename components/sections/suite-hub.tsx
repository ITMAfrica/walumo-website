"use client";

import { useEffect, useRef, useState } from "react";
import { Icon3D } from "@/components/ui/icon-3d";
import { LogoMark } from "@/components/ui/logo";
import { useLang } from "@/components/ui/locale";
import { cn } from "@/components/ui/primitives";
import { tr } from "@/lib/i18n";
import type { IconName } from "@/lib/site";

type NodeId = "kazi" | "talent" | "sales";

/** Node centres as % of the stage (the hub sits in the middle). */
const POS: Record<NodeId | "hub", { x: number; y: number }> = {
  talent: { x: 50, y: 15 },
  kazi: { x: 14, y: 58 },
  sales: { x: 86, y: 58 },
  hub: { x: 50, y: 64 },
};

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Suite hub: three products around one shared core. Illustrative events travel along the links
 * (source → hub → target) so the connection is shown rather than described.
 */
export function SuiteHub({ className }: { className?: string }) {
  const lang = useLang();
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLSpanElement>(null);
  const [seen, setSeen] = useState(false);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<0 | 1>(0);

  const nodes: { id: NodeId; name: string; sub: string; icon: IconName }[] = [
    { id: "kazi", name: "Kazi Pro", sub: tr(lang, "People", "Personnes"), icon: "users" },
    { id: "talent", name: "Talent Pro", sub: tr(lang, "Hiring", "Recrutement"), icon: "search" },
    { id: "sales", name: "Sales Tracker", sub: tr(lang, "Revenue", "Ventes"), icon: "chart" },
  ];
  const events: { from: NodeId; to: NodeId; start: string; result: string }[] = [
    {
      from: "talent",
      to: "kazi",
      start: tr(lang, "Offer accepted in Talent Pro", "Offre acceptée dans Talent Pro"),
      result: tr(lang, "Employee record created in Kazi Pro", "Dossier employé créé dans Kazi Pro"),
    },
    {
      from: "sales",
      to: "kazi",
      start: tr(lang, "Deal won in Sales Tracker", "Affaire gagnée dans Sales Tracker"),
      result: tr(lang, "Onboarding task created in Kazi Pro", "Tâche d'intégration créée dans Kazi Pro"),
    },
    {
      from: "kazi",
      to: "talent",
      start: tr(lang, "New role approved in Kazi Pro", "Nouveau poste approuvé dans Kazi Pro"),
      result: tr(lang, "Job opening ready in Talent Pro", "Offre d'emploi prête dans Talent Pro"),
    },
  ];
  const shared = [
    tr(lang, "Single sign-on", "Connexion unique"),
    tr(lang, "Shared profiles", "Profils partagés"),
    tr(lang, "Common admin & permissions", "Administration et droits communs"),
    tr(lang, "Shared reports", "Rapports partagés"),
  ];
  const ev = events[index];

  // Start the choreography once the section is on screen.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Cycle through the illustrative events.
  useEffect(() => {
    if (!seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t1 = window.setTimeout(() => setPhase(1), 1250);
    const t2 = window.setTimeout(() => {
      setPhase(0);
      setIndex((i) => (i + 1) % 3);
    }, 4300);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [seen, index]);

  // Move the data packet: source → hub → target.
  useEffect(() => {
    const el = dot.current;
    if (!seen || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = POS[events[index].from];
    const b = POS.hub;
    const c = POS[events[index].to];
    const at = (p: { x: number; y: number }, extra: Keyframe = {}): Keyframe => ({ left: `${p.x}%`, top: `${p.y}%`, ...extra });
    const anim = el.animate(
      [
        at(a, { opacity: 0, transform: "translate(-50%,-50%) scale(0.4)", offset: 0 }),
        at(a, { opacity: 1, transform: "translate(-50%,-50%) scale(1)", offset: 0.08 }),
        at(b, { opacity: 1, transform: "translate(-50%,-50%) scale(1.5)", offset: 0.4 }),
        at(c, { opacity: 1, transform: "translate(-50%,-50%) scale(1)", offset: 0.82 }),
        at(c, { opacity: 0, transform: "translate(-50%,-50%) scale(0.4)", offset: 1 }),
      ],
      { duration: 2600, delay: 350, easing: "ease-in-out", fill: "both" },
    );
    return () => anim.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen, index, lang]);

  const lit = (id: NodeId) => (phase === 0 ? ev.from === id : ev.to === id);
  const active = (id: NodeId) => ev.from === id || ev.to === id;

  return (
    <div ref={root} data-seen={seen ? "true" : "false"} className={cn("suite-hub relative mx-auto w-full max-w-3xl", className)}>
      {/* Desktop: animated diagram */}
      <div className="relative hidden aspect-[16/9] sm:block">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {(["talent", "kazi", "sales"] as NodeId[]).map((id, i) => (
            <g key={id}>
              <line
                x1={POS[id].x}
                y1={POS[id].y}
                x2={POS.hub.x}
                y2={POS.hub.y}
                vectorEffect="non-scaling-stroke"
                className={cn("hub-line", active(id) ? "stroke-[#3a55c8]" : "stroke-[#2570C8]/30")}
                strokeWidth={active(id) ? 2.5 : 1.6}
                strokeDasharray="5 7"
                style={{ transitionDelay: `${i * 120}ms` }}
              />
            </g>
          ))}
        </svg>

        {/* Hub */}
        <div className="absolute left-1/2 w-[34%] -translate-x-1/2 -translate-y-1/2" style={{ top: `${POS.hub.y}%` }}>
          <div className="hub-pop relative aspect-square">
            <span className="hub-ring absolute inset-0 rounded-full border border-[#3a55c8]/25" />
            <span className="hub-ring absolute inset-0 rounded-full border border-[#3a55c8]/25 [animation-delay:1.6s]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-[#e6eefb] text-center shadow-[inset_0_0_40px_rgb(91_141_239/0.18)]">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-white shadow-float">
                <LogoMark size={32} />
              </span>
              <p className="mt-2.5 px-4 font-serif text-lg leading-tight text-ink">{tr(lang, "One source of truth", "Une seule source de vérité")}</p>
              <p className="text-[12px] text-muted">{tr(lang, "One login · one design", "Une connexion · un design")}</p>
            </div>
          </div>
        </div>

        {/* Data packet */}
        <span
          ref={dot}
          className="absolute z-20 size-3.5 rounded-full bg-gradient-to-br from-[#7ee8f0] to-[#3a55c8] opacity-0 shadow-[0_0_0_5px_rgb(91_141_239/0.25),0_6px_14px_rgb(58_85_200/0.5)]"
          style={{ left: `${POS.talent.x}%`, top: `${POS.talent.y}%`, transform: "translate(-50%,-50%)" }}
          aria-hidden="true"
        />

        {/* Product cards */}
        {nodes.map((n, i) => (
          <div
            key={n.id}
            className="absolute z-10 w-[30%] -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${POS[n.id].x}%`, top: `${POS[n.id].y}%` }}
          >
            <div className="hub-card" style={{ ["--i" as string]: i }}>
              <div
                className={cn(
                  "relative rounded-2xl bg-white p-4 text-center ring-1 transition-[box-shadow,transform,--tw-ring-color] duration-500",
                  lit(n.id)
                    ? "-translate-y-1.5 shadow-[0_22px_44px_-14px_rgb(58_85_200/0.5)] ring-[#5b8def]"
                    : "shadow-float ring-line/60",
                )}
                style={{ transitionTimingFunction: EASE }}
              >
                <Icon3D name={n.icon} className="mx-auto w-11" />
                <p className="mt-2 font-bold text-ink">{n.name}</p>
                <p className="text-[12.5px] text-muted">{n.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: stacked cards */}
      <ul className="grid gap-3 sm:hidden">
        {nodes.map((n) => (
          <li key={n.id} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card">
            <Icon3D name={n.icon} className="w-11" />
            <span>
              <span className="block font-bold text-ink">{n.name}</span>
              <span className="block text-[13px] text-muted">{n.sub}</span>
            </span>
          </li>
        ))}
      </ul>

      {/* Event ticker */}
      <div className="mt-8 flex min-h-[3.25rem] justify-center" aria-live="off">
        <div key={`${index}-${phase}`} className="hub-ticker inline-flex max-w-full items-center gap-3 rounded-full bg-white px-5 py-3 text-[14px] shadow-card ring-1 ring-line/60">
          <span className="rounded-full bg-[#e6eefb] px-2.5 py-0.5 text-[11px] font-bold text-[#3a55c8]">{tr(lang, "Example", "Exemple")}</span>
          <span className="font-bold text-ink-soft">{phase === 0 ? ev.start : ev.result}</span>
          {phase === 1 && <span className="text-[#1f9d63]" aria-hidden="true">✓</span>}
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap justify-center gap-2">
        {shared.map((s, i) => (
          <li
            key={s}
            className="hub-chip rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] text-ink-soft"
            style={{ ["--i" as string]: i }}
          >
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
