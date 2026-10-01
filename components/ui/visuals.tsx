import Image from "next/image";
import { cn, Avatar } from "./primitives";
import { FeatureIcon } from "./icons";
import type { IconName } from "@/lib/site";

/**
 * Image slots. Pass `src` (a file in /public/images) to show a real photo;
 * without it, a plain tinted panel is rendered instead.
 */

const tones = {
  mint: "from-[#e5effa] to-[#d9e6f5]",
  sand: "from-[#f6f1ea] to-[#ece3d6]",
  sky: "from-[#edf3fa] to-[#dde7f3]",
  ink: "from-[#0b1d3d] to-[#061433]",
  lilac: "from-[#ece6f2] to-[#e0d6ea]",
} as const;

export type Tone = keyof typeof tones;

export function PhotoPlaceholder({
  tone = "mint",
  label,
  className,
  children,
  src,
  alt = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  overlay,
}: {
  tone?: Tone;
  label?: string;
  className?: string;
  children?: React.ReactNode;
  /** Photo to display, e.g. "/images/hero-team.jpg". */
  src?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  /** Darken the bottom of the photo so overlaid text stays readable. */
  overlay?: boolean;
}) {
  // Keep `relative` as the default positioning unless the caller positions the element itself.
  const positioned = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className ?? "");

  if (src) {
    return (
      <div className={cn(!positioned && "relative", "overflow-hidden bg-surface-2", className)}>
        <Image
          src={src}
          alt={alt || label || ""}
          fill
          sizes={sizes}
          preload={priority}
          className="object-cover transition-[scale] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        {overlay && <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" aria-hidden="true" />}
        {children && <div className="relative h-full w-full">{children}</div>}
      </div>
    );
  }

  return (
    <div
      className={cn(!positioned && "relative", "overflow-hidden bg-gradient-to-br", tones[tone], className)}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      {children && <div className="relative h-full w-full">{children}</div>}
    </div>
  );
}

/** Portrait placeholder: stylised silhouette in a tinted frame. */
export function PortraitPlaceholder({
  tone = "mint",
  className,
  children,
  src,
  alt,
  sizes,
  priority,
}: {
  tone?: Tone;
  className?: string;
  children?: React.ReactNode;
  src?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <PhotoPlaceholder tone={tone} className={className} src={src} alt={alt} sizes={sizes} priority={priority}>
        {children}
      </PhotoPlaceholder>
    );
  }
  return (
    <PhotoPlaceholder tone={tone} className={className}>
      <svg viewBox="0 0 200 220" className="absolute bottom-0 left-1/2 h-[82%] -translate-x-1/2" aria-hidden="true">
        <circle cx="100" cy="72" r="40" fill="#fff" fillOpacity="0.75" />
        <path d="M22 220c4-52 38-86 78-86s74 34 78 86Z" fill="#fff" fillOpacity="0.75" />
      </svg>
      {children}
    </PhotoPlaceholder>
  );
}

/** Floating "profile" chip shown over portraits. */
export function ProfileChip({
  name,
  role,
  company,
  className,
}: {
  name: string;
  role: string;
  company: string;
  className?: string;
}) {
  return (
    <div className={cn("w-52 rounded-2xl bg-white p-4 shadow-float", className)}>
      <p className="text-[15px] font-semibold text-ink">{name}</p>
      <p className="text-sm text-accent-strong">{role}</p>
      <div className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-sm text-muted">
        <span className="inline-block size-5 rounded-md bg-ink/80" aria-hidden="true" />
        {company}
      </div>
    </div>
  );
}

/** Stacked "course progress" mock used for training-related visuals. */
export function CourseStackMock({
  title,
  modules,
  className,
}: {
  title: string;
  modules: { name: string; done: number; total: number }[];
  className?: string;
}) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[300px]", className)}>
      <div className="absolute inset-x-6 -top-6 h-10 rounded-t-2xl bg-ink/10" />
      <div className="absolute inset-x-3 -top-3 h-10 rounded-t-2xl bg-ink/15" />
      <div className="relative rounded-2xl bg-white p-4 shadow-float">
        <div className="border-b border-line pb-4">
          <FeatureIcon name="code" size={18} className="text-accent-strong" />
          <p className="mt-2 text-sm font-semibold text-ink">{title}</p>
          <div className="mt-3 h-1.5 w-4/5 rounded-full bg-surface-2" />
          <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-surface-2" />
        </div>
        <ul className="mt-3 space-y-2">
          {modules.map((m, i) => {
            const active = i === modules.findIndex((x) => x.done < x.total);
            return (
              <li
                key={m.name}
                className={cn(
                  "flex items-center justify-between rounded-xl border px-3 py-2.5",
                  active ? "border-accent bg-accent-soft/40" : "border-line",
                )}
              >
                <div>
                  <p className="text-[12.5px] font-medium text-ink">{m.name}</p>
                  <p className="text-[11px] text-accent-strong">
                    {m.done}/{m.total} completed
                  </p>
                </div>
                <span className="size-6 rounded-md bg-surface-2" aria-hidden="true" />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/** Pipeline/dashboard mock used for "solutions" visuals. */
export function PipelineMock({ steps, className }: { steps: { label: string; icon: IconName }[]; className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[340px] rounded-2xl bg-white p-5 shadow-float", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">Implementation plan</p>
        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent-strong">
          Live
        </span>
      </div>
      <ol className="mt-4 space-y-3">
        {steps.map((s, i) => (
          <li key={s.label} className="flex items-center gap-3">
            <span
              className={cn(
                "flex size-9 items-center justify-center rounded-xl",
                i < steps.length - 1 ? "bg-mint text-accent-strong" : "bg-ink text-accent",
              )}
            >
              <FeatureIcon name={s.icon} size={17} />
            </span>
            <div className="flex-1">
              <p className="text-[13px] font-medium text-ink">{s.label}</p>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${Math.max(35, 100 - i * 18)}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Row of overlapping avatars with a caption. */
export function AvatarStack({ names, caption }: { names: string[]; caption?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2.5">
        {names.map((n, i) => (
          <span key={n} className="rounded-full ring-2 ring-white">
            <Avatar name={n} size={34} tone={i} />
          </span>
        ))}
      </div>
      {caption && <p className="text-sm text-muted">{caption}</p>}
    </div>
  );
}
