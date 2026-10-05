"use client";

import { useState } from "react";
import { cn } from "@/components/ui/primitives";
import { useLang } from "@/components/ui/locale";
import { tr } from "@/lib/i18n";

/**
 * Hero product cards visitors can play with (illustrative data):
 * approve or decline a pending leave request, tick off sales follow-ups.
 */

type LeaveState = "Approved" | "Pending" | "Declined";

export function HeroLeaveCard({ className }: { className?: string }) {
  const lang = useLang();
  const [rows, setRows] = useState<{ type: string; days: string; state: LeaveState }[]>([
    { type: "Annual leave", days: "3 days", state: "Approved" },
    { type: "Sick leave", days: "1 day", state: "Pending" },
    { type: "Remote work", days: "2 days", state: "Approved" },
  ]);
  const typeLabel: Record<string, string> = {
    "Annual leave": tr(lang, "Annual leave", "Congé annuel"),
    "Sick leave": tr(lang, "Sick leave", "Congé maladie"),
    "Remote work": tr(lang, "Remote work", "Télétravail"),
  };
  const daysLabel: Record<string, string> = {
    "3 days": tr(lang, "3 days", "3 jours"),
    "1 day": tr(lang, "1 day", "1 jour"),
    "2 days": tr(lang, "2 days", "2 jours"),
  };
  const stateLabel: Record<LeaveState, string> = {
    Approved: tr(lang, "Approved", "Approuvé"),
    Pending: tr(lang, "Pending", "En attente"),
    Declined: tr(lang, "Declined", "Refusé"),
  };
  const pending = rows.filter((r) => r.state === "Pending").length;
  // Approving the 1-day sick leave moves one day from "Available" to "Taken".
  const approvedNow = rows[1].state === "Approved" ? 1 : 0;
  const taken = 5 + approvedNow;
  const available = 18 - approvedNow;

  const decide = (i: number, state: LeaveState) =>
    setRows((rs) => rs.map((r, j) => (j === i ? { ...r, state } : r)));
  const reset = () => setRows((rs) => rs.map((r, j) => (j === 1 ? { ...r, state: "Pending" } : r)));

  return (
    <div className={cn("w-full max-w-[320px] rounded-2xl bg-white p-5 text-left shadow-float", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-ink">{tr(lang, "Leave requests", "Demandes de congé")}</p>
        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-bold text-accent-strong">Kazi Pro</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          [available, tr(lang, "Available", "Disponibles")],
          [pending, tr(lang, "Pending", "En attente")],
          [taken, tr(lang, "Taken", "Pris")],
        ].map(([v, l]) => (
          <div key={l} className="rounded-xl bg-surface px-2 py-2.5">
            <p className="font-serif text-2xl text-ink tabular-nums transition-all">{v}</p>
            <p className="text-[10.5px] text-muted">{l}</p>
          </div>
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {rows.map((r, i) => (
          <li
            key={r.type}
            className={cn(
              "rounded-xl border px-3 py-2.5 transition-colors duration-300",
              r.state === "Pending" ? "border-accent-strong/40 bg-accent-soft/40" : "border-line",
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12.5px] font-bold text-ink">{typeLabel[r.type]}</p>
                <p className="text-[11px] text-muted">{daysLabel[r.days]}</p>
              </div>
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-[10.5px] font-bold transition-colors",
                  r.state === "Approved" && "bg-[#e3f6ea] text-[#1f7a45]",
                  r.state === "Pending" && "bg-[#fff3dc] text-[#9a6700]",
                  r.state === "Declined" && "bg-[#fdecec] text-[#b3412e]",
                )}
              >
                {stateLabel[r.state]}
              </span>
            </div>
            {r.state === "Pending" && (
              <div className="mt-2.5 flex gap-2">
                <button
                  type="button"
                  onClick={() => decide(i, "Approved")}
                  className="flex-1 rounded-lg bg-ink py-1.5 text-[11.5px] font-bold text-white transition-colors hover:bg-accent-strong"
                >
                  {tr(lang, "Approve", "Approuver")}
                </button>
                <button
                  type="button"
                  onClick={() => decide(i, "Declined")}
                  className="flex-1 rounded-lg border border-line py-1.5 text-[11.5px] font-bold text-ink transition-colors hover:border-ink/40"
                >
                  {tr(lang, "Decline", "Refuser")}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-3 flex items-center justify-between gap-3 text-[11px] text-muted">
        {pending ? (
          <span className="flex items-center gap-1.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-strong opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent-strong" />
            </span>
            {tr(lang, "Try it: approve the request", "Essayez : approuvez la demande")}
          </span>
        ) : (
          <button type="button" onClick={reset} className="font-bold text-accent-strong hover:text-ink">
            {tr(lang, "Replay ↺", "Rejouer ↺")}
          </button>
        )}
        <span>{tr(lang, "Illustrative data", "Données illustratives")}</span>
      </p>
    </div>
  );
}

export function HeroFollowUps({ className }: { className?: string }) {
  const lang = useLang();
  const [done, setDone] = useState<string[]>([]);
  const items = [
    tr(lang, "Call Savanna Foods", "Appeler Savanna Foods"),
    tr(lang, "Send proposal to Mara Distributors", "Envoyer la proposition à Mara Distributors"),
    tr(lang, "Visit Kilimani Hardware", "Rendre visite à Kilimani Hardware"),
  ];
  const toggle = (t: string) => setDone((d) => (d.includes(t) ? d.filter((x) => x !== t) : [...d, t]));
  const left = items.length - done.length;

  return (
    <div className={cn("rounded-2xl bg-white p-4 text-left shadow-float", className)}>
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-muted">{tr(lang, "Follow-ups today", "Relances du jour")}</p>
        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-bold text-accent-strong tabular-nums">
          {left} {tr(lang, "left", left > 1 ? "restantes" : "restante")}
        </span>
      </div>
      <ul className="mt-3 space-y-1">
        {items.map((t) => {
          const checked = done.includes(t);
          return (
            <li key={t}>
              <button
                type="button"
                onClick={() => toggle(t)}
                aria-pressed={checked}
                className="flex w-full items-center gap-2.5 rounded-lg px-1.5 py-1.5 text-left text-[13px] text-ink transition-colors hover:bg-surface"
              >
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded border transition-colors",
                    checked ? "border-accent-strong bg-accent-strong text-white" : "border-ink/25",
                  )}
                  aria-hidden="true"
                >
                  {checked && (
                    <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 6.5 5 9l5-6" />
                    </svg>
                  )}
                </span>
                <span className={cn("transition-colors", checked && "text-muted line-through")}>{t}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-2 text-[11.5px] text-muted">
        {left === 0 ? tr(lang, "All caught up — nice work.", "Tout est à jour — bon travail.") : tr(lang, "Sales Tracker · tick a task", "Sales Tracker · cochez une tâche")}
      </p>
    </div>
  );
}
