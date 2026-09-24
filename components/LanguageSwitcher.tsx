"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales, type Locale } from "@/lib/i18n";

// Latin codes keep the navbar compact — swap for endonyms if you prefer:
// { en: "English", fa: "فارسی" }
const labels: Record<Locale, string> = { en: "EN", fa: "FA" };

function setLocaleCookie(locale: Locale) {
  document.cookie = `locale=${locale};path=/;max-age=31536000;samesite=lax`;
}

export default function LanguageSwitcher() {
  const pathname = usePathname(); // e.g. "/en/about"
  const current = pathname.split("/")[1]; // "en"

  function hrefFor(locale: Locale) {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-0.5 rounded-lg border border-zinc-200 p-0.5 dark:border-zinc-800"
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={hrefFor(locale)}
            onClick={() => setLocaleCookie(locale)}
            aria-current={active ? "true" : undefined}
            className={`rounded-md px-2 py-1 text-xs font-semibold transition-colors ${
              active
                ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            {labels[locale]}
          </Link>
        );
      })}
    </div>
  );
}