import Link from "next/link";

import { getDictionary, type Locale } from "@/lib/i18n";
import ThemeToggle from "@/components/layout/ThemeToggle";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import FloatingControls from "@/components/layout/FloatingControls";

export default function Navbar({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      {/* transparent header — scrolls away with the page */}
      <header className="relative z-30 select-none">
        <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6">
          <Link href={`/${locale}`} aria-label={t.home.name} className="shrink-0">
            {/* ---- logo placeholder — swap this span for your Image pair ---- */}
            <span className="flex size-11 items-center justify-center rounded-xl border border-dashed border-line-strong text-[10px] font-semibold text-ink-3">
              LOGO
            </span>
            {/* <Image src="/logo-light.png" alt="" width={44} height={44} priority className="block dark:hidden" />
                <Image src="/logo-dark.png" alt="" width={44} height={44} priority className="hidden dark:block" /> */}
          </Link>

          {/* two separate glass circles — pinned to the top so the language
              capsule can grow DOWNWARD without being re-centered by the row */}
          <div className="flex items-start gap-2 self-start pt-2.5">
            <div className="glass flex size-11 items-center justify-center rounded-full">
              <ThemeToggle variant="swap" />
            </div>
            <LanguageSwitcher variant="navbar" />
          </div>
        </div>
      </header>

      {/* controls return on scroll in floating form */}
      <FloatingControls />
    </>
  );
}