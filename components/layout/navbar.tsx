import Link from "next/link";

import { getDictionary, type Locale } from "@/lib/i18n";
import { SECTION_IDS } from "@/lib/site";
import ThemeToggle from "@/components/layout/ThemeToggle";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import NavLinks from "@/components/layout/NavLinks";

export default function Navbar({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const labels = {
    work: t.nav.projects,
    experience: t.nav.experience,
    about: t.nav.about,
    contact: t.nav.contact,
  };
  const items = SECTION_IDS.map((id) => ({ id, label: labels[id] }));

  return (
    <header className="glass sticky top-0 z-40 border-b border-line">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-4 sm:gap-5 sm:px-8">
        {/* the name itself is the logo */}
        {/* equal-width side columns keep the links centred on the page */}
        <div className="me-auto md:me-0 md:flex-1">
          <Link
            href={`/${locale}`}
            className="whitespace-nowrap font-display text-base font-medium tracking-tight text-ink transition-colors hover:text-accent sm:text-xl rtl:text-lg rtl:font-bold"
          >
            {t.home.name}
          </Link>
        </div>

        <NavLinks locale={locale} items={items} menuLabel={t.nav.menu} />

        <div className="flex items-center justify-end gap-2 md:flex-1">
          <LanguageSwitcher />
          <ThemeToggle variant="swap" />
        </div>
      </div>
    </header>
  );
}
