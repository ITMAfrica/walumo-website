"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CheckList, Eyebrow, TextLink, cn } from "@/components/ui/primitives";
import styles from "./product-tabs.module.css";

export type ProductTab = {
  id: string;
  name: string;
  category: string;
  title: string;
  text: string;
  items: string[];
  href: string;
  linkLabel: string;
  visual: ReactNode;
};

const DURATION = 7000;

/**
 * Product switcher: tabs rotate automatically with a progress bar (like a story),
 * pause on hover, and stop once the visitor picks a tab.
 */
export function ProductTabs({ tabs }: { tabs: ProductTab[] }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [inView, setInView] = useState(false);
  const [manual, setManual] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const paused = hovered || focusWithin || !inView;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.18 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (manual || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      elapsed.current += t - last;
      last = t;
      if (elapsed.current >= DURATION) {
        elapsed.current = 0;
        setActive((a) => (a + 1) % tabs.length);
      }
      setProgress(elapsed.current / DURATION);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [manual, paused, tabs.length]);

  const select = (i: number) => {
    setActive(i);
    setManual(true);
    setProgress(1);
  };

  const tab = tabs[active];

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusWithin(false);
      }}
    >
      <div role="tablist" aria-label="Walumo products" className="grid gap-2 sm:grid-cols-3">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${t.id}`}
            onClick={() => select(i)}
            className={cn(
              styles.tab,
              "group relative overflow-hidden rounded-2xl px-5 py-4 text-left transition-[background-color,box-shadow,transform] duration-300",
              i === active ? cn(styles.activeTab, "bg-white shadow-card") : "hover:bg-white/60",
            )}
          >
            <span className="block text-[12px] font-bold uppercase tracking-[0.08em] text-muted">{t.category}</span>
            <span className={cn("mt-1 block text-lg font-bold", i === active ? "text-ink" : "text-ink/60 group-hover:text-ink")}>
              {t.name}
            </span>
            <span className="absolute inset-x-0 bottom-0 h-[3px] bg-line" aria-hidden="true">
              <span
                className={cn(styles.progress, "block h-full origin-left bg-accent-strong")}
                style={{
                  transform: `scaleX(${
                    i === active ? (manual ? 1 : progress) : i < active && !manual ? 1 : 0
                  })`,
                }}
              />
            </span>
          </button>
        ))}
      </div>

      <div
        key={tab.id}
        role="tabpanel"
        id={`panel-${tab.id}`}
        aria-labelledby={`tab-${tab.id}`}
        className={cn(
          styles.panel,
          "mt-6 grid overflow-hidden rounded-[var(--radius-card)] bg-white shadow-card lg:grid-cols-[1fr_1.2fr]",
          inView && styles.inView,
        )}
      >
        <div className={cn(styles.copy, "flex flex-col justify-center p-8 sm:p-10 lg:p-12")}>
          <Eyebrow className="self-start">{tab.category}</Eyebrow>
          <h3 className="mt-5 text-[1.65rem] font-medium leading-[1.25] tracking-[-0.02em] text-ink sm:text-[1.9rem]">
            {tab.title}
          </h3>
          <p className="mt-4 text-[15px] leading-6 text-muted">{tab.text}</p>
          <CheckList items={tab.items} className="mt-6" />
          <TextLink href={tab.href} className="mt-8">
            {tab.linkLabel}
          </TextLink>
        </div>
        <div className={cn(styles.visual, "relative min-h-[320px] lg:min-h-[440px]")}>{tab.visual}</div>
      </div>
    </div>
  );
}
