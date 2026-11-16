
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
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="animate-rise relative flex flex-col items-center">
        <p className="font-display text-8xl font-medium tracking-tight text-ink sm:text-9xl">
          {t.notFound.code}
        </p>

        <p className="mt-5 max-w-sm text-balance text-lg leading-8 text-ink-2">
          {t.notFound.text}
        </p>

        <Link
          href={`/${locale}`}
          className="btn btn-primary mt-10"
        >
          {t.notFound.home}
        </Link>
      </div>
    </main>
  );
}
