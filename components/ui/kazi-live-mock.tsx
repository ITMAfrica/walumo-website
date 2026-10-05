"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Icon3D } from "@/components/ui/icon-3d";
import { useLang } from "@/components/ui/locale";
import { cn } from "@/components/ui/primitives";
import { tr } from "@/lib/i18n";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Animated Kazi Pro leave card: sways in 3D, a request gets approved in a loop, counters follow. Illustrative data. */
export function KaziLiveMock({ className }: { className?: string }) {
  const lang = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState<{ rx: number; ry: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduced()) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % 7), 1400);
    return () => window.clearInterval(id);
  }, [visible]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduced()) return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ rx: -((e.clientY - r.top) / r.height - 0.5) * 8, ry: ((e.clientX - r.left) / r.width - 0.5) * 12 });
  };

  // 0-2: one request pending, 3: it gets approved, 4-6: hold, then the loop restarts.
  const approved = step >= 3;
  const rows = [
    { type: tr(lang, "Annual leave", "Congé annuel"), days: tr(lang, "3 days", "3 jours"), ok: true },
    { type: tr(lang, "Sick leave", "Congé maladie"), days: tr(lang, "1 day", "1 jour"), ok: approved },
    { type: tr(lang, "Remote work", "Télétravail"), days: tr(lang, "2 days", "2 jours"), ok: true },
  ];
  const stats = [
    [String(approved ? 17 : 18), tr(lang, "Available", "Disponibles")],
    [String(approved ? 0 : 1), tr(lang, "Pending", "En attente")],
    [String(approved ? 6 : 5), tr(lang, "Taken", "Pris")],
  ];
  const focus = step % 3;

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => setTilt(null)}
      className={cn("stage-3d relative w-full max-w-[340px]", className)}
      role="img"
      aria-label={tr(lang, "Illustration of Kazi Pro leave management", "Illustration de la gestion des congés dans Kazi Pro")}
    >
      <div className={cn("tilt-3d relative", !tilt && "tilt-idle")} style={tilt ? { transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` } : undefined}>
        <div className="rounded-2xl bg-white p-5 shadow-float">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-ink">{tr(lang, "Leave requests", "Demandes de congé")}</p>
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-bold text-accent-strong">Kazi Pro</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {stats.map(([v, l], i) => (
              <div
                key={i}
                className={cn("rounded-xl bg-surface px-2 py-2.5 transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", focus === i && "-translate-y-1 bg-[#eef3fd]")}
              >
                <p className="font-serif text-2xl text-ink tabular-nums">
                  <span key={v} className="demo-pop inline-block">
                    {v}
                  </span>
                </p>
                <p className="text-[10.5px] text-muted">{l}</p>
              </div>
            ))}
          </div>
          <ul className="mt-4 space-y-2">
            {rows.map((r) => (
              <li
                key={`${r.type}-${r.ok}`}
                className={cn("flex items-center justify-between rounded-xl border border-line px-3 py-2.5", r.ok && r.type === rows[1].type && "demo-flash")}
              >
                <div>
                  <p className="text-[12.5px] font-bold text-ink">{r.type}</p>
                  <p className="text-[11px] text-muted">{r.days}</p>
                </div>
                <span className={cn("demo-pop rounded-md px-2 py-0.5 text-[10.5px] font-bold", r.ok ? "bg-[#e3f6ea] text-[#1f7a45]" : "bg-[#fff3dc] text-[#9a6700]")}>
                  {r.ok ? tr(lang, "Approved", "Approuvé") : tr(lang, "Pending", "En attente")}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="float-z z-10 -right-6 -top-7" style={{ "--z": "70px" } as CSSProperties}>
          <div className="float-in" style={{ animationDelay: "250ms" }}>
            <div className="float-bob">
              <div className="flex items-center gap-2.5 rounded-2xl bg-white/90 px-3.5 py-2.5 shadow-card ring-1 ring-white/80 backdrop-blur">
                <Icon3D name="users" className="w-8" />
                <div>
                  <p key={String(approved)} className="demo-pop text-[13px] font-bold leading-tight text-ink-soft">
                    {approved ? tr(lang, "Approved", "Approuvé") : tr(lang, "To review", "À valider")}
                  </p>
                  <p key={`${approved}t`} className="demo-pop text-[11.5px] text-muted">
                    {approved ? tr(lang, "in 1 tap", "en un clic") : tr(lang, "1 pending", "1 en attente")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
