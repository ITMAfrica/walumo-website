"use client";

import { Fragment } from "react";
import { cn } from "./primitives";
import { FeatureIcon } from "./icons";
import { Typed, enter, useDemo } from "./demo";

/**
 * Small coded scenes for the "problem" cards on the home page. Like the
 * product illustrations, each one plays once it scrolls into view and replays
 * the next time it comes back. They are decorative: the card title and text
 * carry the meaning. Names and files are made up.
 */

const spreadsheetVersions = [
  { name: "Leave tracker.xlsx", days: 12 },
  { name: "Leave tracker FINAL.xlsx", days: 9 },
  { name: "Leave tracker FINAL v2 (copy).xlsx", days: 11 },
];

/** Three copies of the same file that disagree on one person's balance. */
export function SpreadsheetsScene({ className }: { className?: string }) {
  // 1: the files come in · 2: the figures turn red and the question appears
  const [ref, step] = useDemo<HTMLDivElement>([150, 1600]);
  return (
    <div ref={ref} className={cn("w-full max-w-[300px]", className)} aria-hidden="true">
      <p className="px-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#9a4b3c]">{"Amina's leave balance"}</p>
      <ul className="mt-2 space-y-2">
        {spreadsheetVersions.map((v, i) => (
          <li
            key={v.name}
            className={cn(
              "flex items-center gap-2.5 rounded-lg border bg-white px-2.5 py-2 shadow-card",
              enter(step >= 1),
              step >= 2 ? "border-[#f0c9c1]" : "border-line",
            )}
            style={{ transitionDelay: step === 1 ? `${i * 130}ms` : "0ms" }}
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[#e3f6ea] text-[11px] font-bold text-[#1f7a45]">
              X
            </span>
            <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-ink">{v.name}</span>
            <span
              className={cn(
                "shrink-0 text-[12px] font-bold transition-colors duration-500",
                step >= 2 ? "text-[#b3412e]" : "text-ink",
              )}
            >
              {v.days} days
            </span>
          </li>
        ))}
      </ul>
      <p className={cn("mt-3 w-fit rounded-full bg-[#fbd9d3] px-2.5 py-1 text-[11px] font-bold text-[#b3412e]", enter(step >= 2))}>
        Which one is right?
      </p>
    </div>
  );
}

const chatMessages = [
  { from: "Amina", text: "Sending the CV for the sales role" },
  { from: "Brian", text: "Please approve my leave for Friday" },
  { from: "You", text: "Which Friday? Send the dates again", mine: true },
];

/** A chat thread where requests and documents pile up with no way to follow them. */
export function ChatScene({ className }: { className?: string }) {
  // 1-3: the messages arrive · 4: someone is typing again
  const [ref, step] = useDemo<HTMLDivElement>([200, 1000, 1900, 2800]);
  return (
    <div ref={ref} className={cn("w-full max-w-[300px] space-y-2", className)} aria-hidden="true">
      {chatMessages.map((m, i) => (
        <div key={m.text} className={cn("flex", m.mine && "justify-end", enter(step >= i + 1))}>
          <div
            className={cn(
              "max-w-[88%] rounded-2xl border px-3 py-2 shadow-card",
              m.mine ? "rounded-br-md border-[#c8e9d0] bg-[#dcf5e3]" : "rounded-bl-md border-line bg-white",
            )}
          >
            {!m.mine && <p className="text-[10.5px] font-bold text-accent-strong">{m.from}</p>}
            <p className="text-[12px] leading-[1.35] text-ink">{m.text}</p>
          </div>
        </div>
      ))}
      <div
        className={cn(
          "flex w-fit gap-1 rounded-2xl rounded-bl-md border border-line bg-white px-3 py-2.5 shadow-card",
          enter(step >= 4),
        )}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-1.5 animate-typing rounded-full bg-muted" style={{ animationDelay: `${i * 160}ms` }} />
        ))}
      </div>
    </div>
  );
}

const disconnectedTools = [
  { name: "HR sheet", icon: "users" },
  { name: "Hiring form", icon: "search" },
  { name: "Sales notes", icon: "chart" },
] as const;

/** The same record typed into three tools that have no link between them. */
export function DisconnectedToolsScene({ className }: { className?: string }) {
  // 1: the tools appear · 2-4: the same details are typed into each one · 5: the broken links and the note
  const [ref, step] = useDemo<HTMLDivElement>([150, 900, 2100, 3300, 4600]);
  return (
    <div ref={ref} className={cn("w-full max-w-[330px]", className)} aria-hidden="true">
      <div className="flex items-start">
        {disconnectedTools.map((t, i) => (
          <Fragment key={t.name}>
            {i > 0 && (
              <span className="relative mt-2.5 h-4 w-3 shrink-0">
                <span className="absolute inset-x-0 top-2 border-t border-dashed border-[#d9a99f]" />
                <span
                  className={cn(
                    "absolute left-1/2 top-0 -ml-2 flex size-4 items-center justify-center rounded-full bg-[#fbd9d3] text-[10px] font-bold leading-none text-[#b3412e] transition-[opacity,scale] duration-500",
                    step >= 5 ? "scale-100 opacity-100" : "scale-50 opacity-0",
                  )}
                >
                  ×
                </span>
              </span>
            )}
            <div
              className={cn("min-w-0 flex-1 rounded-xl border border-line bg-white p-2 shadow-card", enter(step >= 1))}
              style={{ transitionDelay: step === 1 ? `${i * 120}ms` : "0ms" }}
            >
              <div className="flex items-center gap-1.5">
                <span className="hidden size-5 shrink-0 items-center justify-center rounded-md bg-surface text-accent-strong min-[380px]:flex">
                  <FeatureIcon name={t.icon} size={12} />
                </span>
                <span className="truncate text-[10.5px] font-bold text-ink">{t.name}</span>
              </div>
              <div className="mt-2 space-y-1.5">
                <p className="h-6 truncate rounded-md border border-line bg-surface px-1.5 text-[10px] leading-[22px] text-ink">
                  <Typed text="Amina Otieno" active={step >= i + 2} />
                </p>
                <p className="h-6 truncate rounded-md border border-line bg-surface px-1.5 text-[10px] leading-[22px] text-ink">
                  <Typed text="Sales rep" active={step >= i + 2} delay={650} />
                </p>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <p className={cn("mt-4 text-center text-[12px] font-bold text-[#b3412e]", enter(step >= 5))}>
        Same details, typed three times
      </p>
    </div>
  );
}
