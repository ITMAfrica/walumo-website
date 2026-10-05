import { FeatureIcon } from "@/components/ui/icons";
import { cn } from "@/components/ui/primitives";
import type { IconName } from "@/lib/site";

/**
 * Flat pastel mini-illustrations (a soft panel, an icon tile, skeleton bars and a few sparkles).
 * Three layouts so neighbouring cards never look identical. `dark` adapts them to a navy card.
 */

export type PastelKind = "tile" | "rows" | "bubbles";

function Sparkles({ className, color = "#6b4fd8" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-6 animate-float-slow", className)} fill={color} aria-hidden="true">
      <path d="M10 2c.5 4.2 2.3 6 6.5 6.5-4.2.5-6 2.3-6.5 6.5C9.5 10.800 7.700 9 3.500 8.500 7.700 8 9.500 6.200 10 2Z" />
      <path d="M19 13c.3 2.400 1.300 3.400 3.700 3.700-2.400.3-3.400 1.300-3.700 3.700-.3-2.400-1.300-3.400-3.700-3.700 2.400-.3 3.400-1.300 3.700-3.700Z" opacity=".8" />
    </svg>
  );
}

function Bar({ w, color, delay = 0, dark }: { w: string; color: string; delay?: number; dark?: boolean }) {
  return (
    <span className="block h-2 rounded-full" style={{ width: w }}>
      <span className="art-bar block h-full rounded-full" style={{ background: color, opacity: dark ? 0.85 : 1, animationDelay: `${delay}ms` }} />
    </span>
  );
}

export function PastelArt({ kind, icon, dark, className }: { kind: PastelKind; icon: IconName; dark?: boolean; className?: string }) {
  const panel = dark ? "bg-white/[0.07]" : "";
  const iconColor = dark ? "text-white" : "";

  if (kind === "rows") {
    const rows: [string, string[]][] = [
      ["1", ["#c9c1ec", "#b7e0da", "#c9c1ec"]],
      ["2", ["#ecbcc9", "#b9d9c5"]],
      ["3", ["#e8cfa9", "#b4d4ee", "#d3d8e2"]],
    ];
    const widths = [["34%", "24%", "18%"], ["30%", "40%"], ["22%", "30%", "26%"]];
    return (
      <div className={cn("relative rounded-xl p-4", dark ? panel : "bg-[#f4f6fb]", className)} aria-hidden="true">
        <ul className="space-y-3.5">
          {rows.map(([n, cols], r) => (
            <li key={n} className="flex items-center gap-3">
              <span className={cn("w-3 font-serif text-[11px]", dark ? "text-white/45" : "text-[#9aa7bd]")}>{n}</span>
              <span className="flex flex-1 gap-2.5">
                {cols.map((c, i) => (
                  <Bar key={i} w={widths[r][i]} color={c} delay={r * 120 + i * 90} dark={dark} />
                ))}
              </span>
            </li>
          ))}
        </ul>
        <Sparkles className="absolute bottom-2 right-3" color={dark ? "#b9a8ff" : "#6b4fd8"} />
      </div>
    );
  }

  if (kind === "bubbles") {
    return (
      <div className={cn("relative space-y-2", className)} aria-hidden="true">
        <div className={cn("mx-auto flex w-[76%] items-center gap-3 rounded-xl px-3 py-2.5", dark ? "bg-white/[0.09]" : "bg-[#f1f1f4]")}>
          <span className={cn("flex size-8 items-center justify-center rounded-lg", dark ? "bg-white/15 text-white" : "bg-white text-ink-soft shadow-[0_1px_2px_rgb(20_30_60/0.08)]")}>
            <FeatureIcon name={icon} size={16} />
          </span>
          <Bar w="62%" color={dark ? "#9aa7c4" : "#c3c6cf"} dark={dark} />
        </div>
        <div className={cn("flex items-center gap-3 rounded-xl px-3 py-3", dark ? "bg-[#f3c8b8]/15" : "bg-[#fbeee9]")}>
          <span className={cn("flex size-8 items-center justify-center rounded-lg", dark ? "bg-[#f3c8b8]/25 text-[#ffb394]" : "bg-[#f8dacd] text-[#d9633a]")}>
            <FeatureIcon name="sparkles" size={16} />
          </span>
          <span className="flex flex-1 flex-col gap-2">
            <Bar w="55%" color="#f3c8b8" delay={120} dark={dark} />
            <Bar w="82%" color="#f0cdbf" delay={220} dark={dark} />
          </span>
        </div>
      </div>
    );
  }

  // "tile": an icon tile with a sparkle, three lavender bars on the right
  return (
    <div className={cn("relative flex items-center gap-4 rounded-xl p-4", dark ? panel : "bg-[#f4f2fc]", className)} aria-hidden="true">
      <span className={cn("relative flex size-[3.75rem] shrink-0 items-center justify-center rounded-xl", dark ? "bg-white/12 text-white" : "bg-[#e6e1f8] text-[#5b3fd0]", iconColor)}>
        <FeatureIcon name={icon} size={28} />
        <Sparkles className="absolute -right-3 -top-3 size-5" color={dark ? "#b9a8ff" : "#6b4fd8"} />
      </span>
      <span className="flex flex-1 flex-col gap-2.5">
        <Bar w="72%" color="#d9cff5" dark={dark} />
        <Bar w="100%" color="#d4c8f2" delay={110} dark={dark} />
        <Bar w="64%" color="#dcd2f6" delay={220} dark={dark} />
      </span>
    </div>
  );
}

/** A spreadsheet that bleeds off a dark card: columns A–D, a broken formula, a duplicate version. */
export function SpreadsheetArt({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const cols = ["A", "B", "C", "D"];
  const rows: { cells: { v?: string; tone?: "err" | "dup" | "sel" }[] }[] = [
    { cells: [{ v: "12 400" }, { v: "8 150" }, { v: "20 550" }, {}] },
    { cells: [{ v: "9 300" }, { v: "#REF!", tone: "err" }, { v: "—" }, { v: "v2", tone: "dup" }] },
    { cells: [{ v: "15 000", tone: "sel" }, { v: "4 720" }, { v: "19 720" }, {}] },
    { cells: [{ v: "7 880" }, {}, { v: "#N/A", tone: "err" }, { v: "v3", tone: "dup" }] },
    { cells: [{ v: "11 250" }, { v: "6 400" }, { v: "17 650" }, {}] },
    { cells: [{ v: "3 960" }, { v: "—" }, { v: "3 960" }, { v: "v2", tone: "dup" }] },
  ];
  const tone = (t?: string) =>
    t === "err" ? "bg-[#ff7a6b]/20 text-[#ffb3a8]" : t === "dup" ? "bg-[#f3c8b8]/20 text-[#f6cdbd]" : t === "sel" ? "text-white ring-1 ring-inset ring-[#7ba2ff] bg-[#5b8def]/20" : "text-white/70";
  return (
    <div
      className={cn(
        "rounded-tl-2xl bg-white/[0.07] p-2.5 font-mono text-[9px] ring-1 ring-white/10 [mask-image:linear-gradient(135deg,transparent_0%,#000_26%)]",
        className,
      )}
      style={style}
      aria-hidden="true"
    >
      <div className="flex items-center gap-2 pb-2.5 text-[10.5px] font-sans">
        <span className="flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-0.5 font-bold text-white/85">
          <span className="size-1.5 rounded-full bg-[#7ee8a2]" />
          Budget_FINAL_v3.xlsx
        </span>
        <span className="rounded-md px-2 py-0.5 text-white/40">copy (2)</span>
      </div>
      <div className="grid grid-cols-[1.1rem_repeat(4,1fr)] gap-px overflow-hidden rounded-lg bg-white/10">
        <span className="bg-[#0d1a3f] py-1.5" />
        {cols.map((c) => (
          <span key={c} className="bg-[#0d1a3f] py-1.5 text-center text-white/45">
            {c}
          </span>
        ))}
        {rows.map((r, i) => (
          <div key={i} className="contents">
            <span className="bg-[#0d1a3f] py-1.5 text-center text-white/35">{i + 1}</span>
            {r.cells.map((c, j) => (
              <span
                key={j}
                className={cn("truncate bg-[#0d1a3f] px-1.5 py-1 text-right", tone(c.tone))}
                style={{ animation: "demo-pop 0.5s cubic-bezier(0.34,1.3,0.64,1) both", animationDelay: `${300 + (i * 4 + j) * 40}ms` }}
              >
                {c.v ?? " "}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
