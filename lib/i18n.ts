import en from "@/content/en";
import fa from "@/content/fa";

export const locales = ["en", "fa"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fa";

const dictionaries = { en, fa } as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function monoClass(locale: Locale) {
  return locale === "en" ? "font-mono uppercase tracking-[0.2em]" : "";
}