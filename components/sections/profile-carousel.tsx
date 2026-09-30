"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { Container, cn } from "@/components/ui/primitives";

/** Horizontally scrolling photo gallery with previous/next buttons. */
export function PhotoCarousel({ photos, label }: { photos: { src: string; alt: string }[]; label: string }) {
  const track = useRef<HTMLUListElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="mt-10">
      <ul
        ref={track}
        aria-label={label}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-6 [scrollbar-width:none] sm:px-8 lg:px-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((p) => (
          <li key={p.src} className="relative h-[320px] w-[240px] shrink-0 snap-start overflow-hidden rounded-[var(--radius-card)] bg-surface-2 sm:h-[380px] sm:w-[300px]">
            <Image src={p.src} alt={p.alt} fill sizes="300px" className="object-cover" />
          </li>
        ))}
      </ul>
      <Container className="flex justify-end gap-2">
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => scroll(dir)}
            aria-label={dir === -1 ? "Previous photos" : "Next photos"}
            className="flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
          >
            <ArrowRight size={18} className={cn(dir === -1 && "rotate-180")} />
          </button>
        ))}
      </Container>
    </div>
  );
}
