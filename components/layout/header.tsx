"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav, site, type NavItem } from "@/lib/site";
import { Logo } from "@/components/ui/logo";
import { ArrowRight, ChevronDown, Close, FeatureIcon, Menu, Plus } from "@/components/ui/icons";
import { Button, cn } from "@/components/ui/primitives";
import { PhotoPlaceholder } from "@/components/ui/visuals";
import { ScrollProgress } from "@/components/ui/reveal";

export function AnnouncementBar() {
  const a = site.announcement;
  return (
    <div className="bg-ink-deep text-white">
      <Link
        href={a.href}
        className="mx-auto flex max-w-[1280px] items-center justify-center gap-3 px-5 py-2.5 text-[13px]"
      >
        <span className="hidden size-6 items-center justify-center rounded-full bg-accent/20 text-accent sm:inline-flex">
          <FeatureIcon name="sparkles" size={14} />
        </span>
        <span className="hidden text-white/60 sm:inline">+</span>
        <span className="font-medium">{a.date}</span>
        <span className="hidden h-3.5 w-px bg-white/30 sm:inline-block" />
        <span className="line-clamp-1 text-white/90">{a.text}</span>
        <span className="hidden text-white/60 sm:inline">+</span>
        <span className="hidden shrink-0 items-center gap-1 text-accent md:inline-flex">
          {a.cta} <ArrowRight size={14} />
        </span>
      </Link>
    </div>
  );
}

function MegaPanel({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const promoTone = item.promo.tone === "sand" ? "sand" : item.promo.tone === "sky" ? "sky" : "mint";
  const twoCols = item.links.length > 4;
  return (
    <div className="grid w-[min(820px,calc(100vw-40px))] grid-cols-[1fr_280px] overflow-hidden rounded-2xl border border-line bg-white shadow-float">
      <div className="p-4">
        <ul className={cn("grid gap-1", twoCols && "grid-cols-2")}>
          {item.links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={onNavigate}
                className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-ink-soft">
                  <FeatureIcon name={l.icon} size={18} />
                </span>
                <span>
                  <span className="block text-[14.5px] font-medium text-ink">{l.label}</span>
                  <span className="block text-[13px] text-muted">{l.description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={item.footerLink.href}
          onClick={onNavigate}
          className="mt-3 inline-flex items-center gap-1.5 px-3 text-[13px] font-medium text-accent-strong hover:text-ink"
        >
          {item.footerLink.label} <ArrowRight size={13} />
        </Link>
      </div>
      <PhotoPlaceholder tone={promoTone} className="m-2 rounded-xl">
        <div className="flex h-full flex-col p-5">
          <p className="font-serif text-xl leading-snug text-ink">{item.promo.title}</p>
          <p className="mt-2 text-[13px] leading-5 text-ink-soft">{item.promo.text}</p>
          <Link
            href={item.promo.href}
            onClick={onNavigate}
            className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[13px] font-medium text-ink shadow-card hover:bg-ink hover:text-white"
          >
            {item.promo.cta} <ArrowRight size={13} />
          </Link>
        </div>
      </PhotoPlaceholder>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close the mega menu when clicking anywhere outside the navigation.
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change.
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMenu = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(i);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[border-color,box-shadow] duration-300",
        scrolled ? "border-line/70 shadow-[0_8px_30px_-12px_rgb(6_20_51/0.18)]" : "border-transparent",
      )}
    >
      {/*
       * Frosted background on its own layer: a backdrop-filter on <header> itself
       * would become the containing block of the fixed mobile menu below.
       */}
      <div
        className={cn(
          "absolute inset-0 -z-10 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300",
          scrolled ? "bg-white/85" : "bg-white/95",
        )}
        aria-hidden="true"
      />
      <ScrollProgress className="absolute inset-x-0 bottom-[-1px]" />
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <Logo />

        <nav ref={navRef} aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item, i) => {
              const active = pathname.startsWith(item.href);
              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => openMenu(i)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-expanded={open === i}
                    aria-haspopup="true"
                    onClick={() => openMenu(i)}
                    onFocus={() => openMenu(i)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3 py-2 text-[14px] transition-colors",
                      open === i || active ? "text-accent-strong" : "text-ink hover:text-accent-strong",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      size={15}
                      className={cn("transition-transform duration-200", open === i && "rotate-180")}
                    />
                  </button>
                  <div
                    className={cn(
                      "absolute left-1/2 top-full pt-3 transition-[opacity,translate] duration-200",
                      i >= 3 ? "-translate-x-[70%]" : "-translate-x-[35%]",
                      open === i
                        ? "visible translate-y-0 opacity-100"
                        : "invisible pointer-events-none -translate-y-1 opacity-0",
                    )}
                  >
                    <MegaPanel item={item} onNavigate={() => setOpen(null)} />
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href={site.whatsappCta.href} variant="outline" size="sm" className="border-ink/30">
            {site.whatsappCta.label}
          </Button>
          <Button href={site.primaryCta.href} size="sm">
            {site.primaryCta.label}
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 flex size-11 items-center justify-center rounded-full lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <Close size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-white px-5 pb-10 pt-2 transition-[opacity,visibility] duration-200 lg:hidden",
          mobileOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <ul className="divide-y divide-line">
          {mainNav.map((item, i) => (
            <li key={item.label}>
              <button
                type="button"
                className="flex w-full items-center justify-between py-4 text-left text-[17px] font-medium"
                aria-expanded={mobileSection === i}
                onClick={() => setMobileSection(mobileSection === i ? null : i)}
              >
                {item.label}
                <Plus
                  size={18}
                  className={cn("transition-transform duration-200", mobileSection === i && "rotate-45")}
                />
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300",
                  mobileSection === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <ul className="overflow-hidden">
                  {item.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="flex items-center gap-3 py-2.5 pl-1">
                        <FeatureIcon name={l.icon} size={18} className="text-muted" />
                        <span>
                          <span className="block text-[15px] text-ink">{l.label}</span>
                          <span className="block text-[13px] text-muted">{l.description}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li className="pb-4" />
                </ul>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-3">
          <Button href={site.primaryCta.href} arrow>
            {site.primaryCta.label}
          </Button>
          <Button href={site.whatsappCta.href} variant="outline">
            {site.whatsappCta.label}
          </Button>
        </div>
      </div>
    </header>
  );
}
