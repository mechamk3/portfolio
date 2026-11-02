import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "dark" | "light";

/** Swatch hue per accent; the real palette is defined by `[data-accent]` rules in styles.css. */
export const ACCENTS = [
  { id: "orchid", hue: 340 },
  { id: "violet", hue: 292 },
  { id: "blue", hue: 258 },
  { id: "teal", hue: 188 },
  { id: "amber", hue: 62 },
  { id: "vermilion", hue: 30 },
  { id: "mono", hue: null },
] as const;
export type Accent = (typeof ACCENTS)[number]["id"];
const DEFAULT_ACCENT: Accent = "orchid";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
  accent: Accent;
  setAccent: (accent: Accent) => void;
}>({
  theme: "dark",
  toggleTheme: () => {},
  accent: DEFAULT_ACCENT,
  setAccent: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [accent, setAccent] = useState<Accent>(DEFAULT_ACCENT);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-theme");
      if (saved === "light" || saved === "dark") setTheme(saved);
      const savedAccent = localStorage.getItem("portfolio-accent");
      if (ACCENTS.some((a) => a.id === savedAccent)) setAccent(savedAccent as Accent);
    } catch { /* The switch still works when storage is unavailable. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    document.documentElement.setAttribute("data-accent", accent);
    try {
      localStorage.setItem("portfolio-theme", theme);
      localStorage.setItem("portfolio-accent", accent);
    } catch { /* Optional persistence. */ }
  }, [theme, accent, ready]);

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme: () => setTheme(t => t === "dark" ? "light" : "dark"), accent, setAccent }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() { return useContext(ThemeContext); }
