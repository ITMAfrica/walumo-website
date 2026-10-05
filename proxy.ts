import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Locale routing: English lives at `/`, French at `/fr`.
 * Internally every page sits under `app/[lang]`, so English requests are rewritten to `/en/...`.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/fr" || pathname.startsWith("/fr/")) return;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (images, favicon, sitemap.xml…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
