
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  type Locale,
} from "@/lib/i18n";

export default function GlobalNotFoundContent() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const t = getDictionary(locale);



  useEffect(() => {
    const segments = window.location.pathname.split("/").filter(Boolean);
    const pathLocale = segments.find((segment) => isLocale(segment));

    // Prefer the URL locale; use the saved preference for unprefixed URLs.
    const cookieLocale = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("locale="))
      ?.split("=")[1];

    const resolvedLocale: Locale =
      pathLocale && isLocale(pathLocale)
        ? pathLocale
        : cookieLocale && isLocale(cookieLocale)
          ? cookieLocale
          : defaultLocale;

    setLocale(resolvedLocale);

    document.documentElement.lang = resolvedLocale;
    document.documentElement.dir = resolvedLocale === "fa" ? "rtl" : "ltr";

    document.documentElement.classList.remove("font-fa", "font-sans");
    document.documentElement.classList.add(
      resolvedLocale === "fa" ? "font-fa" : "font-sans",
    );
  }, []);


  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center select-none">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-dvh mask-[linear-gradient(to_bottom,#000_55%,transparent_100%)]"
      >
        <div className="dot-grid absolute inset-0" />
        <div className="absolute left-1/2 -top-45 h-100 w-[min(640px,100vw)] -translate-x-1/2 rounded-full bg-accent/15 blur-[110px] dark:bg-accent/10" />
        <div className="grain absolute inset-0 opacity-[0.05] dark:opacity-[0.08]" />
      </div>

      <div className="animate-rise relative flex flex-col items-center">
        <p className="text-8xl font-bold tracking-tighter text-ink sm:text-9xl">
          {t.notFound.code}
        </p>

        <p className="mt-2 max-w-sm text-balance text-ink-2">
          {t.notFound.text}
        </p>

        <Link
          href={`/${locale}`}
          className="mt-10 rounded-full bg-accent px-7 py-3 text-sm font-medium text-canvas transition-colors hover:bg-accent-strong"
        >
          {t.notFound.home}
        </Link>
      </div>
    </main>
  );
}
