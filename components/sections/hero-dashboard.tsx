"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { FeatureIcon } from "@/components/ui/icons";
import { LogoMark } from "@/components/ui/logo";
import { useLang } from "@/components/ui/locale";
import { cn } from "@/components/ui/primitives";
import { tr } from "@/lib/i18n";
import type { IconName } from "@/lib/site";

/**
 * Hero visual: one connected Walumo workspace in a gradient frame. A navy sidebar, a white dashboard,
 * and cards that overlap it (approvals queue, candidate sources, a team photo, a violet call-out).
 * Drawn at 1000 × 520 and scaled to the available width; illustrative data only.
 */
const W = 1000;
const H = 552;

const pop = (d: number) => ({ "--d": `${d}s` }) as CSSProperties;

function Pop({ d, className, children, style }: { d: number; className?: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <div className={cn("mo-pop", className)} style={{ ...pop(d), ...style }}>
      {children}
    </div>
  );
}

export function HeroDashboard() {
  const lang = useLang();
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => {
      setScale(el.clientWidth / W);
      setReady(true);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const nav: { icon: IconName; label: string; active?: boolean }[] = [
    { icon: "layers", label: tr(lang, "Home", "Accueil") },
    { icon: "chart", label: tr(lang, "Reports", "Rapports") },
    { icon: "users", label: "Kazi Pro", active: true },
    { icon: "search", label: "Talent Pro" },
    { icon: "briefcase", label: "Sales Tracker" },
  ];
  const queue = [
    { who: "Amina K.", what: tr(lang, "Annual leave · 3 days", "Congé annuel · 3 jours"), tag: "Kazi Pro", tone: "#e2f6f1", color: "#0b6f61" },
    { who: "Brian O.", what: tr(lang, "Offer · Sales rep", "Offre · Commercial"), tag: "Talent Pro", tone: "#ece7fb", color: "#5b3fd0" },
    { who: "Savanna Foods", what: tr(lang, "Proposal · KES 1.2M", "Proposition · KES 1,2 M"), tag: "Sales Tracker", tone: "#fbe9df", color: "#c25a2d" },
  ];
  const sources: [string, string, string][] = [
    [tr(lang, "WhatsApp", "WhatsApp"), "28%", "#5b8def"],
    [tr(lang, "Referral", "Recommandation"), "18%", "#35c4d8"],
    [tr(lang, "Website", "Site web"), "17%", "#8b6ff0"],
    ["LinkedIn", "14%", "#f08a5d"],
    [tr(lang, "Email", "E-mail"), "13%", "#4cbf80"],
    [tr(lang, "Other", "Autres"), "10%", "#ec6aa6"],
  ];

  return (
    <div
      ref={wrap}
      data-on={ready ? "true" : "false"}
      role="img"
      aria-label={tr(
        lang,
        "Illustration of a Walumo workspace: HR, hiring and sales in one dashboard, with an approvals queue and a team photo",
        "Illustration d'un espace Walumo : RH, recrutement et ventes dans un seul tableau de bord, avec une file d'approbation et une photo d'équipe",
      )}
      className={cn("relative mx-auto w-full max-w-[1100px] transition-opacity duration-500", ready ? "opacity-100" : "opacity-0")}
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${scale})` }}>
        {/* gradient frame */}
        <div
          className="absolute left-0 top-0 h-[394px] w-full rounded-[34px] shadow-[0_40px_90px_-30px_rgb(58_70_190/0.55)]"
          style={{ background: "linear-gradient(112deg, #a07fc9 0%, #7367c9 34%, #4a5ccb 68%, #2f49b8 100%)" }}
        />

        {/* navy sidebar */}
        <Pop d={0.1} className="absolute left-[36px] top-[36px] h-[452px] w-[232px] rounded-[22px] bg-[#1c2a62] p-4 text-white shadow-[0_20px_40px_-20px_rgb(10_20_70/0.7)]">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-white">
              <LogoMark size={20} />
            </span>
            <span className="text-[17px] font-bold">Walumo</span>
          </div>
          <ul className="mt-5 space-y-1">
            {nav.map((n) => (
              <li key={n.label} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px]", n.active ? "bg-white/12 font-bold" : "text-white/80")}>
                <FeatureIcon name={n.icon} size={18} />
                {n.label}
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-3 px-3">
            <span className="flex items-center gap-3">
              <span className="size-5 rounded-full bg-white/15" />
              <span className="h-2 w-24 rounded-full bg-white/15" />
            </span>
            <span className="flex items-center gap-3">
              <span className="size-5 rounded-full bg-white/15" />
              <span className="h-2 w-16 rounded-full bg-white/15" />
            </span>
          </div>
        </Pop>

        {/* white dashboard */}
        <Pop d={0.2} className="absolute left-[288px] top-[36px] h-[318px] w-[676px] rounded-[22px] bg-[#e9edf7] p-4">
          <div className="flex h-[56px] items-center justify-between rounded-xl bg-white px-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-[#dbe6fd] text-[#3a55c8]">
                <FeatureIcon name="briefcase" size={18} />
              </span>
              <span className="text-[17px] font-bold text-ink">Savanna Foods</span>
            </div>
            <div className="flex items-center gap-2 text-[12px] font-bold text-ink-soft">
              <span className="rounded-md bg-[#f1f3f9] px-3 py-1.5">{tr(lang, "Edit", "Modifier")}</span>
              <span className="rounded-md bg-[#f1f3f9] px-3 py-1.5">{tr(lang, "Save report", "Enregistrer")}</span>
              <span className="rounded-md bg-[#f1f3f9] px-2.5 py-1.5">•••</span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="flex h-[84px] items-center justify-between rounded-xl bg-white px-4">
              <div className="flex items-center gap-3">
                <span className="size-11 rounded-full bg-gradient-to-br from-[#cfe0f7] to-[#a9b8f5]" />
                <div>
                  <p className="text-[10.5px] text-muted">{tr(lang, "Welcome!", "Bienvenue !")}</p>
                  <p className="text-[14.5px] font-bold text-ink">Amina Kamau</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10.5px] text-muted">{tr(lang, "Completed", "Terminé")}</p>
                <p className="text-[17px] font-bold text-ink">
                  3 762 <span className="text-[13px] text-[#1f9d63]">▲ 100%</span>
                </p>
              </div>
            </div>
            <div className="flex h-[84px] flex-col justify-center rounded-xl bg-white px-4">
              <p className="text-[11.5px] text-muted">{tr(lang, "My open tasks", "Mes tâches ouvertes")}</p>
              <div className="mt-1 grid grid-cols-3 gap-2 text-[10px] text-muted">
                <span>{tr(lang, "Subject", "Sujet")}</span>
                <span>{tr(lang, "Due", "Échéance")}</span>
                <span>{tr(lang, "Priority", "Priorité")}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[12.5px] font-bold text-ink">
                <span className="truncate">{tr(lang, "Client demo", "Démo client")}</span>
                <span>{tr(lang, "Oct 12", "12 oct.")}</span>
                <span className="text-[#c25a2d]">{tr(lang, "High", "Haute")}</span>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[
              [tr(lang, "Open roles", "Postes ouverts"), "12", tr(lang, "3 interviews today", "3 entretiens aujourd'hui")],
              [tr(lang, "Pending leave", "Congés en attente"), "5", tr(lang, "2 over 3 days", "2 de plus de 3 jours")],
              [tr(lang, "New revenue", "Nouveau chiffre d'affaires"), "KES 4,2M", "▲ 99,7%"],
              [tr(lang, "Target · year", "Objectif · année"), "KES 38M", "78%"],
            ].map(([l, v, sub], i) => (
              <div key={l} className="h-[104px] rounded-xl bg-white px-3.5 py-3">
                <p className="truncate text-[11px] text-muted">{l}</p>
                <p className="mt-1.5 text-[18px] font-bold text-ink">{v}</p>
                {i === 3 ? (
                  <span className="mt-2 block h-2.5 rounded-full bg-[#e8ecf5]">
                    <span className="block h-full w-[78%] rounded-full bg-[#9fe0bd]" />
                  </span>
                ) : (
                  <p className={cn("mt-1 text-[10.5px]", sub.startsWith("▲") ? "text-[#1f9d63]" : "text-muted")}>{sub}</p>
                )}
              </div>
            ))}
          </div>
        </Pop>

        {/* approvals queue (overlaps the dashboard) */}
        <Pop d={0.55} className="absolute left-[206px] top-[322px] h-[198px] w-[486px] rounded-[24px] bg-[#f1f4fb] p-4 shadow-[0_26px_60px_-24px_rgb(30_40_110/0.55)] ring-4 ring-white">
          <p className="text-[16px] font-bold text-ink">{tr(lang, "Approvals queue", "File d'approbation")}</p>
          <ul className="mt-3 space-y-2">
            {queue.map((q) => (
              <li key={q.who} className="flex h-[40px] items-center justify-between rounded-lg bg-white px-4">
                <span className="text-[13.5px] text-ink">
                  <b>{q.who}</b> <span className="text-muted">· {q.what}</span>
                </span>
                <span className="rounded-md px-2 py-0.5 text-[10.5px] font-bold" style={{ background: q.tone, color: q.color }}>
                  {q.tag}
                </span>
              </li>
            ))}
          </ul>
        </Pop>

        {/* candidate sources donut */}
        <Pop d={0.7} className="absolute left-[690px] top-[312px] h-[208px] w-[286px] rounded-[24px] bg-white p-4 shadow-[0_26px_60px_-24px_rgb(30_40_110/0.5)]">
          <p className="text-[16px] font-bold text-ink">{tr(lang, "Candidates by source", "Candidats par source")}</p>
          <div className="mt-2 flex items-center gap-3">
            <div className="relative size-[112px] shrink-0 rounded-full" style={{ background: `conic-gradient(${[28, 46, 63, 77, 90, 100].map((p, i, a) => `${sources[i][2]} ${i ? a[i - 1] : 0}% ${p}%`).join(", ")})` }}>
              <span className="absolute inset-[26px] rounded-full bg-white" />
            </div>
            <ul className="grid flex-1 gap-1.5 text-[11.5px]">
              {sources.map(([l, p, c]) => (
                <li key={l} className="flex items-center gap-2 text-ink-soft">
                  <span className="size-2 rounded-full" style={{ background: c }} />
                  <span className="flex-1 truncate">{l}</span>
                  <b className="tabular-nums text-ink">{p}</b>
                </li>
              ))}
            </ul>
          </div>
        </Pop>

        {/* team photo: an arch standing in front of the dashboard, like a cut-out */}
        <Pop d={0.4} className="absolute left-[412px] top-[176px] h-[312px] w-[232px] overflow-hidden rounded-b-[26px] rounded-t-[116px] shadow-[0_34px_70px_-22px_rgb(20_30_90/0.7)]">
          <Image
            src="/images/team-workshop.jpg"
            alt={tr(lang, "A Walumo implementation workshop with a client team", "Un atelier de mise en œuvre Walumo avec une équipe cliente")}
            fill
            sizes="260px"
            priority
            className="object-cover object-[46%_42%]"
          />
          <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1c2a62]/45 to-transparent" aria-hidden="true" />
        </Pop>

        {/* violet call-out */}
        <Pop d={0.9} className="absolute left-[470px] top-[476px] h-[68px] w-[262px] rounded-[20px] px-5 py-3 text-white shadow-[0_24px_50px_-18px_rgb(60_50_160/0.7)]" style={{ ...pop(0.9), background: "linear-gradient(135deg, #7a62c6, #3d55c4)" }}>
          <p className="text-[16px] font-bold leading-snug">{tr(lang, "One workspace for your people, hiring and sales", "Un espace pour vos équipes, votre recrutement et vos ventes")}</p>
        </Pop>
        <Pop d={1.05} className="float-bob absolute left-[704px] top-[456px] flex size-[44px] items-center justify-center rounded-xl bg-white text-[#7a62c6] shadow-[0_14px_30px_-12px_rgb(60_50_160/0.6)] ring-2 ring-[#d9cff5]">
          <FeatureIcon name="sparkles" size={22} />
        </Pop>
      </div>
    </div>
  );
}
