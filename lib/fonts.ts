import { Inter, JetBrains_Mono, Newsreader, Vazirmatn } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
});

/** Serif for headlines and margin notes (Latin only — Persian falls back to Vazirmatn). */
export const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

/** All font CSS variables — put this on <html>. */
export const fontVariables = `${inter.variable} ${vazirmatn.variable} ${newsreader.variable} ${jetbrainsMono.variable}`;
