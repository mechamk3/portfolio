import Link from "next/link";

import { getDictionary, type Locale } from "@/lib/i18n";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import NavLink from "@/components/NavLink";

export default function Navbar({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <nav className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between px-6">
        <Link
          href={`/${locale}`}
          className="font-semibold tracking-tight text-zinc-900 dark:text-white"
        >
          {t.home.name}
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink href={`/${locale}`}>{t.nav.home}</NavLink>
          <NavLink href={`/${locale}/projects`}>{t.nav.projects}</NavLink>
          <NavLink href={`/${locale}/about`}>{t.nav.about}</NavLink>
          <NavLink href={`/${locale}/contact`}>{t.nav.contact}</NavLink>

          <span className="mx-1 h-5 w-px bg-zinc-200 dark:bg-zinc-800" aria-hidden />

          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}