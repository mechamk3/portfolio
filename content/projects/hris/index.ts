import type { Locale } from "@/lib/i18n";
import en from "./en";
import fa from "./fa";

const content = { en, fa } as const;

export function getHrisContent(locale: Locale) {
  return content[locale];
}