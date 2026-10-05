"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLang } from "@/components/ui/locale";
import { localizeHref } from "@/lib/i18n";

/** `next/link` that keeps the visitor in their language. */
export default function Link({ href, ...rest }: ComponentProps<typeof NextLink>) {
  const lang = useLang();
  const localized = typeof href === "string" ? localizeHref(href, lang) : href;
  return <NextLink href={localized} {...rest} />;
}
