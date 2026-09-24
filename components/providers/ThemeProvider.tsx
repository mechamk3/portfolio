"use client";

import { useServerInsertedHTML } from "next/navigation";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark";
type Setting = Theme | "system";

const STORAGE_KEY = "theme";

type ThemeContextValue = {
  theme: Setting;
  resolvedTheme: Theme;
  setTheme: (setting: Setting) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => { },
});

export function useTheme() {
  return useContext(ThemeContext);
}

function applyTheme(setting: Setting): Theme {
  const resolved: Theme =
    setting === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : setting;

  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved; // native scrollbars/inputs follow too
  return resolved;
}

const themeScript = `(function(){try{var s=localStorage.getItem("theme");var d=s==="dark"||(s!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;r.classList.add(d?"dark":"light");r.style.colorScheme=d?"dark":"light"}catch(e){}})()`;

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useServerInsertedHTML(() => (
    <script dangerouslySetInnerHTML={{ __html: themeScript }} />
  ));

  const [theme, setThemeState] = useState<Setting>("system");
  const [resolvedTheme, setResolvedTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial: Setting =
      stored === "light" || stored === "dark" || stored === "system"
        ? stored
        : "system";

    setThemeState(initial);
    setResolvedTheme(applyTheme(initial));

    // Follow the OS preference while the user hasn't picked explicitly
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if ((localStorage.getItem(STORAGE_KEY) ?? "system") === "system") {
        setResolvedTheme(applyTheme("system"));
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((setting: Setting) => {
    // Suppress transitions for one frame so the switch is instant, not animated
    const style = document.createElement("style");
    style.textContent = "*, *::before, *::after { transition: none !important }";
    document.head.appendChild(style);

    localStorage.setItem(STORAGE_KEY, setting);
    setThemeState(setting);
    setResolvedTheme(applyTheme(setting));

    requestAnimationFrame(() => requestAnimationFrame(() => style.remove()));
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}