import { useId, type CSSProperties, type ReactNode } from "react";
import { featurePaths } from "@/components/ui/icons";
import { cn } from "@/components/ui/primitives";
import type { IconName } from "@/lib/site";

export type Icon3DTone = "blue" | "teal" | "violet" | "peach" | "green" | "rose";

/** [outer frame stops, inner face stops] for each colour tone. */
const tones: Record<Icon3DTone, [[string, string, string], [string, string, string]]> = {
  blue: [["#5b8def", "#3a55c8", "#3b2f9e"], ["#7ee8f0", "#35c4d8", "#2a9fcf"]],
  teal: [["#2fbfa6", "#0f8f7d", "#0b5f6b"], ["#b3f2e2", "#4cd3b9", "#1fa58f"]],
  violet: [["#8b6ff0", "#5b3fd0", "#3b2a9e"], ["#d6c8ff", "#a48cf6", "#7b5ce0"]],
  peach: [["#f6a37a", "#e0743f", "#b84a22"], ["#ffe0c8", "#ffb68a", "#f08a5d"]],
  green: [["#56c98a", "#2e8b57", "#1f6b42"], ["#d2f5e0", "#7fdcab", "#3fbf7e"]],
  rose: [["#f27db3", "#c0397a", "#8e2459"], ["#ffd4e8", "#f6a0c8", "#ec6aa6"]],
};

/** Glossy 3D icon used across the site: a gradient tile (or shield) with a white glyph. */
export function Icon3DBase({
  children,
  shield,
  className,
  style,
  tone = "blue",
}: {
  children: ReactNode;
  shield?: boolean;
  className?: string;
  style?: CSSProperties;
  tone?: Icon3DTone;
}) {
  const id = useId();
  const [o, i] = tones[tone];
  return (
    <svg viewBox="0 0 56 62" className={cn("shrink-0 drop-shadow-[0_10px_10px_rgba(37,70,160,0.32)]", className)} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}o`} x1="8" y1="2" x2="48" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor={o[0]} />
          <stop offset="0.55" stopColor={o[1]} />
          <stop offset="1" stopColor={o[2]} />
        </linearGradient>
        <linearGradient id={`${id}i`} x1="14" y1="8" x2="44" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor={i[0]} />
          <stop offset="0.6" stopColor={i[1]} />
          <stop offset="1" stopColor={i[2]} />
        </linearGradient>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#fff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {shield ? (
        <>
          <path d="M28 2 51 10v20c0 15-10 25-23 30C15 55 5 45 5 30V10L28 2Z" fill={`url(#${id}o)`} />
          <path d="M28 8.5 45 14.5V30c0 11.5-7.5 19.5-17 23.5C18.5 49.5 11 41.5 11 30V14.5L28 8.5Z" fill={`url(#${id}i)`} />
          <path d="M28 8.5 45 14.5V24C37 27 20 27 11 24v-9.5L28 8.5Z" fill={`url(#${id}g)`} opacity="0.55" />
        </>
      ) : (
        <>
          <rect x="4" y="6" width="48" height="48" rx="15" fill={`url(#${id}o)`} />
          <rect x="9" y="11" width="38" height="38" rx="11" fill={`url(#${id}i)`} />
          <path d="M20 11h16a11 11 0 0 1 11 11v1C38 27 18 27 9 23v-1a11 11 0 0 1 11-11Z" fill={`url(#${id}g)`} opacity="0.55" />
        </>
      )}
      <g fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

/** 3D version of a site feature icon (same names as `FeatureIcon`). */
export function Icon3D({ name, className, tone }: { name: IconName; className?: string; tone?: Icon3DTone }) {
  const shield = name === "shield";
  return (
    <Icon3DBase shield={shield} className={className} tone={tone}>
      <g transform={shield ? "translate(14.3 11.3) scale(1.15)" : "translate(14.2 14.2) scale(1.12)"} strokeWidth={3.2 / 1.12}>
        {featurePaths[name]}
      </g>
    </Icon3DBase>
  );
}
