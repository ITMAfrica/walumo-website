"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "./primitives";
import { TYPE_MS, TYPE_PAUSE, TYPE_START } from "@/lib/typewriter";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True once the element has entered the viewport (never resets). */
function useInView<T extends Element>(rootMargin = "0px 0px -8% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, inView] as const;
}

const hidden = {
  up: "translate-y-8 opacity-0",
  down: "-translate-y-8 opacity-0",
  left: "-translate-x-10 opacity-0",
  right: "translate-x-10 opacity-0",
  scale: "scale-[0.94] opacity-0",
  blur: "translate-y-4 opacity-0 blur-md",
} as const;

/** Animates children in once they enter the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: keyof typeof hidden;
  as?: "div" | "li" | "section";
}) {
  const [ref, visible] = useInView<HTMLElement>();

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={cn(
        // Tailwind v4 uses the individual `translate` / `scale` properties, not `transform`.
        "transition-[opacity,translate,scale,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        visible ? "opacity-100" : hidden[variant],
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/**
 * Splits a heading into words that rise out of a blur one after another.
 * Server-rendered text stays in the DOM, so it remains readable and indexable.
 */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  step = 70,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  step?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        // The space must sit outside the inline-block, where it would be trimmed.
        <Fragment key={i}>
          <span
            className={cn("inline-block animate-word-in pb-[0.12em] -mb-[0.12em]", wordClassName)}
            style={{ animationDelay: `${delay + i * step}ms` }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

/** Card wrapper whose glow follows the pointer (see `.spotlight` in globals.css). */
export function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={cn("spotlight", className)}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}

/** Tilts its content in 3D towards the pointer. Disabled for touch and reduced motion. */
export function Tilt({
  children,
  className,
  max = 6,
  scale = 1.01,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={ref}
      className={cn("transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform", className)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
          el.style.transform = `perspective(1200px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) scale(${scale})`;
        });
      }}
      onPointerLeave={reset}
    >
      {children}
    </div>
  );
}

/**
 * Moves its content vertically at a different speed from the page scroll.
 * `speed` is the fraction of the scroll distance (positive = slower than the page).
 */
export function Parallax({
  children,
  className,
  speed = 0.12,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let frame = 0;
    const update = () => {
      const r = el.parentElement?.getBoundingClientRect() ?? el.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

/**
 * Starts tilted back in 3D and straightens up as the user scrolls,
 * used for the product screenshot under the home hero.
 */
export function ScrollRise({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.transform = "none";
      return;
    }
    let frame = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 while the top sits at the bottom of the viewport, 1 once it reaches 30% from the top.
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.7)));
      const angle = 18 * (1 - p);
      const s = 0.92 + 0.08 * p;
      el.style.transform = `perspective(1400px) rotateX(${angle.toFixed(2)}deg) scale(${s.toFixed(3)})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("origin-top will-change-transform", className)}
      style={{ transform: "perspective(1400px) rotateX(18deg) scale(0.92)" } as CSSProperties}
    >
      {children}
    </div>
  );
}

/** Thin brand-coloured bar at the very top showing how far the page has been read. */
export function ScrollProgress({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none h-[2px] origin-left bg-gradient-to-r from-accent-strong via-accent to-accent-strong",
        className,
      )}
      style={{ transform: "scaleX(0)" }}
    />
  );
}

/**
 * Vertical line that draws itself as the section scrolls past
 * (used to connect the numbered delivery steps).
 */
export function ScrollLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.transform = "scaleY(1)";
      return;
    }
    let frame = 0;
    const update = () => {
      const track = el.parentElement;
      if (!track) return;
      const r = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      el.style.transform = `scaleY(${p.toFixed(3)})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("h-full w-full origin-top bg-gradient-to-b from-accent-strong to-accent", className)}
      style={{ transform: "scaleY(0)" }}
    />
  );
}

/**
 * Large serif statement whose words light up as the section scrolls into view.
 */
export function ScrollStatement({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the top reaches 85% of the viewport, 1 when the bottom reaches 45%.
      const start = vh * 0.85;
      const end = vh * 0.45;
      const total = rect.height + (start - end);
      const p = (start - rect.top) / total;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const words = text.split(" ");
  const lit = Math.round(progress * words.length);

  return (
    <p
      ref={ref}
      className={cn(
        "font-serif text-[1.9rem] leading-[1.3] tracking-[-0.02em] sm:text-[2.6rem] lg:text-[3.1rem]",
        className,
      )}
    >
      {words.map((w, i) => (
        <span key={i} className={cn("transition-colors duration-300", i < lit ? "text-ink" : "text-ink/25")}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

/** Counts up to a number once visible. Accepts values like "20+", "98%", "4.8". */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  const target = match ? parseFloat(match[2].replace(",", ".")) : 0;
  const decimals = match && /[.,]/.test(match[2]) ? match[2].split(/[.,]/)[1].length : 0;
  const [display, setDisplay] = useState(match ? (0).toFixed(decimals) : value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1400);
        const eased = 1 - Math.pow(1 - k, 3);
        setDisplay((target * eased).toFixed(decimals));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={ref} className={className}>
      {match ? `${match[1]}${display}${match[3]}` : value}
    </span>
  );
}

/**
 * Typewriter headline: types `title`, a short pause, then `accent` (second line, italic blue),
 * with a blinking caret that stays on at rest. Layout is reserved from the first frame: the whole text
 * is always in the flow, the not-yet-typed part is just transparent, so lines never re-wrap.
 */
export function TypedHeadline({ title, accent }: { title: string; accent?: string }) {
  const total = title.length + (accent?.length ?? 0);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setN(total);
      return;
    }
    let i = 0;
    let id = 0;
    const step = () => {
      i += 1;
      setN(i);
      if (i < total) id = window.setTimeout(step, TYPE_MS + (accent && i === title.length ? TYPE_PAUSE : 0));
    };
    id = window.setTimeout(step, TYPE_START);
    return () => window.clearTimeout(id);
  }, [title, accent, total]);

  const caret = (
    <span className="relative inline-block w-0 align-baseline" aria-hidden="true">
      <span className="demo-caret absolute left-[0.04em] top-[-0.78em] h-[0.84em] w-[3px] rounded-full bg-accent-strong" />
    </span>
  );
  const t = Math.min(n, title.length);
  const a = Math.max(0, n - title.length);

  return (
    <>
      <span className="sr-only">{accent ? `${title} ${accent}` : title}</span>
      <span aria-hidden="true">
        {title.slice(0, t)}
        {n <= title.length && caret}
        <span className="opacity-0">{title.slice(t)}</span>
        {accent && (
          <>
            <br />
            <em className="italic text-accent-strong">
              {accent.slice(0, a)}
              {n > title.length && caret}
              <span className="opacity-0">{accent.slice(a)}</span>
            </em>
          </>
        )}
      </span>
    </>
  );
}
