"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { locales, type Locale } from "@/lib/i18n";

/**
 * How each language appears in the menu. To add a language: add it to
 * `locales` in lib/i18n.ts and give it an entry here — nothing else changes.
 */
const names: Record<Locale, { short: string; full: string; font: string }> = {
  en: { short: "EN", full: "English", font: "font-sans" },
  fa: { short: "فا", full: "فارسی", font: "font-fa" },
};

function setLocaleCookie(locale: Locale) {
  document.cookie = `locale=${locale};path=/;max-age=31536000;samesite=lax`;
}

/** Language menu: a globe button showing the current language, opening a list of all of them. */
export default function LanguageSwitcher() {
  const pathname = usePathname();
  const current = (pathname.split("/")[1] ?? "en") as Locale;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const hrefFor = (locale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  };

  // Close on outside press and on Escape
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const label = names[current] ?? names.en;

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-label="Language"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="language-menu"
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 items-center gap-1 px-2 text-sm text-ink transition-opacity hover:opacity-55"
      >
        <span className={`leading-none ${label.font}`}>{label.short}</span>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          className={`size-3.5 shrink-0 text-ink-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M4 6.5 8 10l4-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          id="language-menu"
          className="absolute end-0 top-full z-50 mt-2 min-w-40 overflow-hidden rounded-xl border border-line bg-surface p-1 shadow-lift motion-safe:animate-[lb-fade_0.15s_ease-out]"
        >
          {locales.map((locale) => {
            const isCurrent = locale === current;
            const { full, font } = names[locale];
            return (
              <li key={locale}>
                <Link
                  href={hrefFor(locale)}
                  lang={locale}
                  aria-current={isCurrent ? "true" : undefined}
                  onClick={() => {
                    setLocaleCookie(locale);
                    setOpen(false);
                  }}
                  className={`flex items-center justify-between gap-6 rounded-lg px-3 py-2 text-sm transition-colors focus-visible:-outline-offset-2 ${font} ${
                    isCurrent ? "font-medium text-ink" : "text-ink-2 hover:bg-surface-2 hover:text-ink"
                  }`}
                >
                  {full}
                  {isCurrent && (
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4 shrink-0 text-accent">
                      <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

