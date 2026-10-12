import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

function detectLocale(request: NextRequest): string {
  // Returning visitors: respect the language they picked in the switcher
  const saved = request.cookies.get("locale")?.value;
  if (saved && (locales as readonly string[]).includes(saved)) return saved;

  // First visit: use browser language
  const accept = request.headers.get("accept-language") ?? "";
  const preferred = accept.split(",")[0]?.trim().slice(0, 2).toLowerCase();
  return (locales as readonly string[]).includes(preferred ?? "")
    ? preferred!
    : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (hasLocale) {
    // Tag the request so not-found.tsx can read the locale
    // (not-found.tsx doesn't receive params in the App Router)
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", pathname.split("/")[1]);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const locale = detectLocale(request);
  return NextResponse.redirect(
    new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
  );
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};