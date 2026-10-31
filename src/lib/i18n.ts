import en from "@/content/en";
import fa from "@/content/fa";
import hrisEn from "@/content/hris/en";
import hrisFa from "@/content/hris/fa";

export const locales = ["en", "fa"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fa";

const dictionaries = { en, fa } as const;
const hris = { en: hrisEn, fa: hrisFa } as const;

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function toLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function getHrisContent(locale: Locale) {
  return hris[locale];
}

/** Small uppercase mono labels only read well in Latin script. */
export function monoClass(locale: Locale) {
  return locale === "en" ? "font-mono uppercase tracking-[0.2em]" : "";
}

/** Swap the locale segment of a path: /en/projects -> /fa/projects */
export function swapLocalePath(pathname: string, next: Locale) {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) parts[1] = next;
  else parts.splice(1, 0, next);
  return parts.join("/") || `/${next}`;
}
