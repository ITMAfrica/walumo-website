import { Button, cn } from "@/components/ui/primitives";
import { getSite } from "@/lib/i18n-server";

/** Server Component: default CTAs come from the active language's site config. */
export async function CtaPair({
  className,
  dark,
  primary: primaryProp,
  secondary: secondaryProp,
}: {
  className?: string;
  dark?: boolean;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  const { site } = await getSite();
  const primary = primaryProp ?? site.primaryCta;
  const secondary = secondaryProp ?? site.secondaryCta;
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-3", className)}>
      <Button href={primary.href} variant={dark ? "light" : "primary"} arrow>
        {primary.label}
      </Button>
      <Button href={secondary.href} variant={dark ? "ghost" : "outline"}>
        {secondary.label}
      </Button>
    </div>
  );
}
