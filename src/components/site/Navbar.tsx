import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { getDictionary, swapLocalePath, type Locale } from "@/lib/i18n";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export function Navbar({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { theme, toggleTheme } = useTheme();
  const themeLabel = theme === "dark" ? t.nav.lightMode : t.nav.darkMode;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const other: Locale = locale === "en" ? "fa" : "en";
  const sections = [
    { hash: "experience", label: t.nav.experience },
    { hash: "about", label: t.nav.about },
    { hash: "contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line-strong bg-canvas select-none">
      <nav
        className={`mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 rounded-none px-6 transition-colors ${
          scrolled ? "bg-canvas" : "bg-transparent"
        }`}
      >
        <Link
          to="/$locale"
          params={{ locale }}
          aria-label={t.home.name}
          className="group flex items-center gap-3 rounded-none ps-1 pe-3"
        >
          <span className="flex size-10 items-center justify-center rounded-none bg-signal font-mono text-sm font-bold text-signal-foreground">
            MT
          </span>
          <span className="hidden text-sm font-semibold text-ink sm:block">{t.home.name}</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to="/$locale/projects"
            params={{ locale }}
            className="rounded-none px-3 py-2 text-sm text-ink-2 transition-colors hover:text-ink"
            activeProps={{ className: "text-ink" }}
          >
            {t.nav.projects}
          </Link>
          {sections.map((s) => (
            <Link
              key={s.hash}
              to="/$locale"
              params={{ locale }}
              hash={s.hash}
              className="hidden rounded-none px-3 py-2 text-sm text-ink-2 transition-colors hover:text-ink md:block"
              activeOptions={{ includeHash: true }}
            >
              {s.label}
            </Link>
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
            className="ms-1 size-10 shrink-0 rounded-none border-line-strong text-ink"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          <a
            href={swapLocalePath(pathname, other)}
            lang={other}
            className="ms-1 flex h-10 min-w-10 items-center justify-center rounded-none border border-line-strong px-3 font-mono text-xs font-semibold text-ink transition-colors hover:border-signal hover:text-signal"
          >
            {other === "en" ? "EN" : "فا"}
          </a>
        </div>
      </nav>
    </header>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <footer className="border-t border-line select-none">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-6 py-8 text-sm text-ink-3 sm:flex-row sm:items-center">
        <p>{t.footer.rights}</p>
        <p className="font-mono text-xs">{t.footer.ver}</p>
      </div>
    </footer>
  );
}
