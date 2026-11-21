// Persian: Gofteh, self-hosted (fonts/gofteh).
// English: Clash Display, self-hosted from Fontshare (fonts/clash-display).
import localFont from "next/font/local";

const persian = localFont({
  src: [
    { path: "../fonts/gofteh/Gofteh-extralight.woff2", weight: "200", style: "normal" },
    { path: "../fonts/gofteh/Gofteh-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/gofteh/Gofteh-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/gofteh/Gofteh-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/gofteh/Gofteh-Heavy.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-gofteh",
  display: "swap",
});

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
