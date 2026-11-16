import { JetBrains_Mono, Newsreader } from "next/font/google";
// Pick any font from https://github.com/amiryxe/next-persian-fonts
// (e.g. estedad, sahel, shabnam, samim, vazirmatnVariable ...)
import { vazirmatnVariable } from "next-persian-fonts/vazirmatn-variable";

/* ------------------------------------------------------------------ *
 *  ✏️  CHANGE THE PERSIAN FONT HERE — edit only this one line
 *  (plus the import above to match).
 * ------------------------------------------------------------------ */
const persian = vazirmatnVariable;

/** Serif for headlines and margin notes (Latin only — Persian falls back to the Persian font). */
export const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

/** Put on <html>: loads every font and exposes the stable `--font-persian` alias used in globals.css. */
export const fontClassName = `${persian.variable} ${newsreader.variable} ${jetbrainsMono.variable}`;
export const fontStyle = {
  "--font-persian": persian.style.fontFamily,
} as React.CSSProperties;
