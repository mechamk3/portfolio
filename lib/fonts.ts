// Persian: https://github.com/amiryxe/next-persian-fonts
// English: Clash Display, self-hosted from Fontshare (fonts/clash-display).
import localFont from "next/font/local";
import { arad } from "next-persian-fonts/arad";

const persian = arad;

const clash = localFont({
  src: [
    { path: "../fonts/clash-display/ClashDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/clash-display/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/clash-display/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/clash-display/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
});

/** Put on <html>: loads both families and exposes their CSS variables. */
export const fontClassName = `${persian.variable} ${clash.variable}`;
export const fontStyle = {
  "--font-persian": persian.style.fontFamily,
} as React.CSSProperties;
