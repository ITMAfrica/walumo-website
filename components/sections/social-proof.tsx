import Image from "next/image";
import { itmEntities } from "@/lib/content";
import { site } from "@/lib/site";
import { Container, cn } from "@/components/ui/primitives";
import { LogoMark } from "@/components/ui/logo";

/** Small pill: "Built by Walumo. Backed by ITM Holding." */
export function TrustBadge({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-bold",
        dark ? "border-white/15 bg-white/5 text-white/85" : "border-line bg-white text-ink-soft shadow-card",
        className,
      )}
    >
      <LogoMark size={16} />
      {site.trustBadge}
    </span>
  );
}

/**
 * Infinite strip of ITM Holding group logos. The source logos are white,
 * so the strip always sits on a dark background.
 */
export function LogoMarquee({ className }: { className?: string }) {
  const logos = [...itmEntities, ...itmEntities];
  return (
    <div className={cn("relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]", className)}>
      <ul className="flex w-max animate-marquee items-center gap-14 hover:[animation-play-state:paused]">
        {logos.map((e, i) => (
          <li key={i} className="shrink-0" aria-hidden={i >= itmEntities.length}>
            <Image
              src={e.logo}
              alt={i < itmEntities.length ? e.name : ""}
              width={150}
              height={46}
              className="h-10 w-auto max-w-[150px] object-contain opacity-80 transition-opacity hover:opacity-100"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Dark band: "Trusted by organisations building Africa's digital future". */
export function TrustedStrip({
  title = "Trusted by organisations building Africa's digital future",
  text = "Kazi Pro was proven inside the ITM Holding group before external rollout.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-ink py-12 text-white" aria-label="ITM Holding group companies">
      <Container>
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <p className="text-[15px] font-bold text-white/90">{title}</p>
          {text && <p className="text-[13.5px] text-white/55">{text}</p>}
        </div>
        <LogoMarquee />
      </Container>
    </section>
  );
}

/** Honest placeholder until verified customer quotes are approved. */
export function StoriesComingSoon({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-[var(--radius-card)] border border-dashed border-accent-strong/40 bg-accent-soft/40 p-8 text-center", className)}>
      <p className="font-serif text-2xl text-ink">Customer stories coming soon</p>
      <p className="mx-auto mt-2 max-w-md text-[15px] leading-6 text-muted">
        We only publish stories our customers have approved. In the meantime, ask us for a reference call with a team already
        running Walumo.
      </p>
    </div>
  );
}
