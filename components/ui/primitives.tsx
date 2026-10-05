import Link from "@/components/ui/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, Check, Star } from "./icons";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

export function Container({
  className,
  size = "default",
  ...rest
}: ComponentProps<"div"> & { size?: "narrow" | "default" | "wide" }) {
  const max = size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-[1400px]" : "max-w-[1280px]";
  return <div className={cn("mx-auto w-full px-5 sm:px-8 lg:px-10", max, className)} {...rest} />;
}

export function Section({
  className,
  tone = "white",
  ...rest
}: ComponentProps<"section"> & { tone?: "white" | "surface" | "fade" | "dark" }) {
  const tones = {
    white: "bg-white",
    surface: "bg-surface",
    fade: "bg-surface",
    dark: "bg-ink text-white",
  };
  return <section className={cn("py-20 sm:py-24 lg:py-28", tones[tone], className)} {...rest} />;
}

/* ------------------------------------------------------------------ */
/* Typography                                                          */
/* ------------------------------------------------------------------ */

export function Eyebrow({ children, className, dark }: { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <span className={cn("inline-flex w-fit items-center gap-3 text-[15px] font-bold", dark ? "text-accent" : "text-accent-strong", className)}>
      <span className="h-px w-6 bg-current opacity-60" aria-hidden="true" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  text,
  align = "center",
  className,
  dark,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  accent?: ReactNode;
  text?: ReactNode;
  align?: "center" | "left";
  className?: string;
  dark?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl", className)}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          "font-serif text-[2.25rem] leading-[1.15] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem]",
          eyebrow && "mt-5",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
        {accent && (
          <>
            {" "}
            <em className="not-italic">{accent}</em>
          </>
        )}
      </Tag>
      {text && (
        <p className={cn("mt-5 text-base leading-7 sm:text-lg", dark ? "text-white/70" : "text-muted")}>{text}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Actions                                                             */
/* ------------------------------------------------------------------ */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "light" | "ghost";
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
  className?: string;
};

export function Button({ href, children, variant = "primary", size = "md", arrow = false, className }: ButtonProps) {
  const variants = {
    primary: "btn-shine bg-ink text-white hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-glow",
    outline: "border border-ink/80 text-ink hover:-translate-y-0.5 hover:bg-ink hover:text-white",
    light: "btn-shine bg-white text-ink hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgb(107_191_232/0.55)]",
    ghost: "border border-white/30 text-white backdrop-blur-sm hover:-translate-y-0.5 hover:bg-white/10",
  };
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-12 px-6 text-[15px]",
    lg: "h-14 px-7 text-base",
  };
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[color,background-color,border-color,translate,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-0 active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
      {arrow && (
        <ArrowRight
          size={16}
          className={cn(
            "transition-[translate] duration-300 group-hover:translate-x-1",
            variant === "primary" ? "text-accent" : "",
          )}
        />
      )}
    </Link>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong hover:text-ink",
        className,
      )}
    >
      {children}
      <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Small UI                                                            */
/* ------------------------------------------------------------------ */

export function CheckList({ items, className, dark }: { items: ReactNode[]; className?: string; dark?: boolean }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item, i) => (
        <li key={i} className={cn("flex gap-3 text-[15px] leading-6", dark ? "text-white/80" : "text-ink-soft")}>
          <Check size={18} className={cn("mt-[3px] shrink-0", dark ? "text-accent" : "text-accent-strong")} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Stars({ count = 5, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("flex gap-0.5 text-star", className)} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={16} />
      ))}
    </div>
  );
}

export function Avatar({ name, size = 48, tone = 0 }: { name: string; size?: number; tone?: number }) {
  const palettes = [
    "bg-mint text-accent-strong",
    "bg-[#f3ebe1] text-[#8a5a2b]",
    "bg-[#e5edf6] text-[#305a86]",
    "bg-[#efe8f3] text-[#6d4a86]",
    "bg-[#f6e9e6] text-[#9a4b3c]",
  ];
  const initials = name
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-serif",
        palettes[tone % palettes.length],
      )}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

/** Fictional wordmark used in logo strips and cards. Replace with real client logos. */
export function PlaceholderLogo({ name, className }: { name: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-semibold tracking-tight text-ink/60", className)}>
      <span className="inline-block size-5 rounded-[6px] bg-current opacity-80" aria-hidden="true" />
      {name}
    </span>
  );
}

export function Card({ className, ...rest }: ComponentProps<"div">) {
  return <div className={cn("rounded-[var(--radius-card)] bg-white shadow-card", className)} {...rest} />;
}
