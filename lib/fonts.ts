// Pick any font from https://github.com/amiryxe/next-persian-fonts
// (e.g. estedad, sahel, shabnam, samim, vazirmatnVariable ...)
import { rooyinFD } from "next-persian-fonts/rooyin-fd";

/* ------------------------------------------------------------------ *
 *  Site font — edit only this line (and the import above to match).
 *  Used for both Persian and English.
 * ------------------------------------------------------------------ */
const persian = rooyinFD;

/** Put on <html>: loads the font and exposes `--font-persian` for globals.css. */
export const fontClassName = persian.variable;
export const fontStyle = {
  "--font-persian": persian.style.fontFamily,
} as React.CSSProperties;
