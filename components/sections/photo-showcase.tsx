"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "@/components/ui/link";
import { ArrowRight } from "@/components/ui/icons";
import { useLang } from "@/components/ui/locale";
import { cn } from "@/components/ui/primitives";
import { tr } from "@/lib/i18n";

export type Slide = { src: string; alt: string; title: string; text: string; href?: string };

/**
 * Big rounded photo cards with the title set over the picture and a centred pill button.
 * The next card peeks in from the right; caption and arrows sit below the active card.
 */
export function PhotoShowcase({ slides, cta }: { slides: Slide[]; cta: string }) {
  const lang = useLang();
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const items = Array.from(el.children) as HTMLElement[];
        const left = el.scrollLeft + el.clientWidth * 0.1;
        let best = 0;
        items.forEach((it, i) => {
          if (it.offsetLeft - items[0].offsetLeft <= left) best = i;
        });
        setActive(best);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    const next = Math.min(items.length - 1, Math.max(0, active + dir));
    el.scrollTo({ left: items[next].offsetLeft - items[0].offsetLeft, behavior: "smooth" });
  };

  const current = slides[active] ?? slides[0];

  return (
    <div className="mt-12">
      <ul
        ref={track}
        aria-label={tr(lang, "Walumo in photos", "Walumo en photos")}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-8 scroll-pl-5 [scrollbar-width:none] sm:scroll-pl-8 sm:px-8 lg:scroll-pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] lg:px-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((s, i) => (
          <li
            key={s.src}
            className={cn(
              "group relative aspect-[4/5] w-[86%] shrink-0 snap-start overflow-hidden rounded-[2rem] bg-surface-2 sm:aspect-[16/10] sm:w-[68%] lg:w-[62%]",
              "transition-opacity duration-500",
              i === active ? "opacity-100" : "opacity-90",
            )}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="(max-width: 640px) 86vw, 62vw"
              priority={i === 0}
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent" aria-hidden="true" />
            <h3 className="absolute bottom-8 left-7 right-[45%] font-medium leading-[1.05] tracking-[-0.03em] text-white [text-wrap:balance] text-[2rem] sm:bottom-auto sm:right-auto sm:top-1/2 sm:max-w-[34%] sm:-translate-y-1/2 sm:left-10 sm:text-[2.6rem] lg:text-5xl">
              {s.title}
            </h3>
            {s.href && (
              <Link
                href={s.href}
                className="absolute left-1/2 top-1/2 flex h-14 -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-full bg-white px-6 text-[15px] font-medium text-ink shadow-float transition-[scale,box-shadow] duration-300 hover:scale-105 active:scale-95 sm:left-[64%]"
              >
                <ArrowRight size={16} />
                {cta}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <div className="mx-auto flex max-w-[1280px] items-start justify-between gap-8 px-5 sm:px-8 lg:px-10">
        <div key={active} className="max-w-xl animate-fade-up">
          <p className="font-medium text-ink">{current.title}</p>
          <p className="mt-1 text-base leading-7 text-muted">{current.text}</p>
        </div>
        <div className="flex shrink-0 rounded-full bg-surface px-1.5 py-1.5">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => go(dir)}
              disabled={dir === -1 ? active === 0 : active === slides.length - 1}
              aria-label={dir === -1 ? tr(lang, "Previous photo", "Photo précédente") : tr(lang, "Next photo", "Photo suivante")}
              className="flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ArrowRight size={18} className={cn(dir === -1 && "rotate-180")} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
