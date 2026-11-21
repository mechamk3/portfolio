import Link from "next/link";

import { getDictionary, type Locale } from "@/lib/i18n";
import { SECTION_IDS } from "@/lib/site";
import ThemeToggle from "@/components/layout/ThemeToggle";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import NavLinks from "@/components/layout/NavLinks";

function monogram(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return last ? `${first}.${last}.` : `${first}.`;
}

export default function Navbar({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const labels = {
    work: t.nav.projects,
    about: t.nav.about,
    contact: t.nav.contact,
  };
  const items = SECTION_IDS.map((id) => ({ id, label: labels[id] }));

  return (
    <header className="relative sticky top-0 z-40 bg-canvas">
      <div className="mx-auto flex h-16 w-full items-center gap-3 px-5 sm:h-20 sm:px-8 lg:px-16">
        <Link
          href={`/${locale}`}
          className="whitespace-nowrap font-display text-lg font-semibold tracking-tight text-ink transition-opacity hover:opacity-60 sm:text-xl"
        >
          {monogram(t.home.name)}
        </Link>

        <div className="ms-auto flex items-center gap-2 sm:gap-4">
          <NavLinks locale={locale} items={items} menuLabel={t.nav.menu} />
          <LanguageSwitcher />
          <ThemeToggle variant="swap" />
        </div>
      </div>
    </header>
  );
}
