"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "./primitives";

/**
 * Helpers shared by the animated product illustrations (product-mocks.tsx)
 * and the problem scenes (pain-visuals.tsx).
 */

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Drives a demo sequence: `step` goes from 0 to `delays.length`, one step per
 * delay (ms after the card is at least 40% visible). Resets once the card has
 * left the viewport. With reduced motion the last step is shown at once.
 */
export function useDemo<T extends Element>(delays: number[], offset = 0) {
  const ref = useRef<T>(null);
  const [step, setStep] = useState(0);
  const key = delays.map((d) => d + offset).join(",");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const times = key.split(",").map(Number);
    let timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          if (timers.length) return; // already playing or played
          if (prefersReducedMotion()) {
            setStep(times.length);
            return;
          }
          timers = times.map((t, i) => setTimeout(() => setStep(i + 1), t));
        } else if (!entry.isIntersecting) {
          timers.forEach(clearTimeout);
          timers = [];
          setStep(0);
        }
      },
      { threshold: [0, 0.4] },
    );
    io.observe(el);
    return () => {
      timers.forEach(clearTimeout);
      io.disconnect();
    };
  }, [key]);

  return [ref, step] as const;
}

/** A number that eases towards `value` whenever it changes. */
export function Count({ value, duration = 900, delay = 0 }: { value: number; duration?: number; delay?: number }) {
  const [shown, setShown] = useState(value);
  const current = useRef(value);

  useEffect(() => {
    const from = current.current;
    if (from === value) return;
    if (prefersReducedMotion()) {
      current.current = value;
      setShown(value);
      return;
    }
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const k = Math.min(1, Math.max(0, (now - start) / duration));
      current.current = from + (value - from) * (1 - Math.pow(1 - k, 3));
      setShown(current.current);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, delay]);

  return <>{Math.round(shown)}</>;
}

/** Staggered entrance shared by the rows and cards of the illustrations. */
export function enter(visible: boolean) {
  return cn(
    "transition-[opacity,translate,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
    visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
  );
}

/** Types `text` out one character at a time while `active`; empties again when it stops. */
export function Typed({
  text,
  active,
  delay = 0,
  speed = 45,
}: {
  text: string;
  active: boolean;
  delay?: number;
  speed?: number;
}) {
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (!active) {
      setLength(0);
      return;
    }
    if (prefersReducedMotion()) {
      setLength(text.length);
      return;
    }
    let count = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        count += 1;
        setLength(count);
        if (count >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [active, text, delay, speed]);

  return <>{text.slice(0, length)}</>;
}
