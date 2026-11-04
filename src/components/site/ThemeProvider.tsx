import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "dark" | "light";

/** Swatch hue per accent; the real palette is defined by `[data-accent]` rules in styles.css. */
export const ACCENTS = [
  { id: "blue", hue: 258 },
  { id: "orchid", hue: 340 },
  { id: "violet", hue: 292 },
  { id: "teal", hue: 188 },
  { id: "amber", hue: 62 },
  { id: "vermilion", hue: 30 },
  { id: "mono", hue: null },
] as const;
export type Accent = (typeof ACCENTS)[number]["id"];

export const DEFAULT_THEME: Theme = "light";
export const DEFAULT_ACCENT: Accent = "blue";
export const THEME_KEY = "portfolio-theme";
export const ACCENT_KEY = "portfolio-accent";

/**
 * Runs in <head> before the first paint, so the saved theme and accent are on <html>
 * before anything is drawn. It must stay in step with `applyToDocument` below.
 */
export const themeInitScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem("${THEME_KEY}"),a=localStorage.getItem("${ACCENT_KEY}"),k=${JSON.stringify(
  ACCENTS.map((x) => x.id),
)};if(t==="dark"){d.classList.add("dark");d.style.colorScheme="dark"}if(a&&k.indexOf(a)>-1)d.setAttribute("data-accent",a)}catch(e){}})();`;

function readStored(): { theme: Theme; accent: Accent } {
  let theme: Theme = DEFAULT_THEME;
  let accent: Accent = DEFAULT_ACCENT;
  try {
    const t = localStorage.getItem(THEME_KEY);
    if (t === "light" || t === "dark") theme = t;
    const a = localStorage.getItem(ACCENT_KEY);
    if (ACCENTS.some((x) => x.id === a)) accent = a as Accent;
  } catch {
    /* Storage can be unavailable; the defaults still work. */
  }
  return { theme, accent };
}

/** Writes the choice to <html> with transitions off for one frame, so the whole page switches at once. */
function applyToDocument(theme: Theme, accent: Accent) {
  const root = document.documentElement;
  root.setAttribute("data-switching", "");
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  root.setAttribute("data-accent", accent);
  requestAnimationFrame(() => requestAnimationFrame(() => root.removeAttribute("data-switching")));
}

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
  accent: Accent;
  setAccent: (accent: Accent) => void;
}>({
  theme: DEFAULT_THEME,
  toggleTheme: () => {},
  accent: DEFAULT_ACCENT,
  setAccent: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [accent, setAccentState] = useState<Accent>(DEFAULT_ACCENT);

  // The head script already styled the page; this only brings React state in line with it.
  useEffect(() => {
    const stored = readStored();
    setThemeState(stored.theme);
    setAccentState(stored.accent);
    const root = document.documentElement;
    if (root.classList.contains("dark") !== (stored.theme === "dark")) applyToDocument(stored.theme, stored.accent);
  }, []);

  const save = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* Optional persistence. */
    }
  };

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyToDocument(next, accent);
    save(THEME_KEY, next);
    setThemeState(next);
  }, [theme, accent]);

  const setAccent = useCallback(
    (next: Accent) => {
      applyToDocument(theme, next);
      save(ACCENT_KEY, next);
      setAccentState(next);
    },
    [theme],
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, accent, setAccent }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() { return useContext(ThemeContext); }
