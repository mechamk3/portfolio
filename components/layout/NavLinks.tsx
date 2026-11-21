"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Item = { id: string; label: string };

/**
 * Primary navigation.
 *  • md+  → inline links in the header
 *  • <md  → menu button + dropdown sheet under the header
 * On the home page the link of the section in view is underlined;
 * on /projects pages the "work" link is.
 */
export default function NavLinks({
  locale,
  items,
  menuLabel,
}: {
  locale: string;
  items: Item[];
  menuLabel: string;
}) {
  const pathname = usePathname();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const [inView, setInView] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Scroll-spy (home only). Nothing is marked while the hero is in view.
  useEffect(() => {
    if (!isHome) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      // the active section is the last one whose top edge has passed the upper third
      const line = window.innerHeight * 0.33;
      let current: string | null = null;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // the last section may be too short to ever reach that line
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setInView(atBottom && current ? items[items.length - 1].id : current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome, items]);

  // Escape closes the mobile sheet
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const active = isHome ? inView : pathname.includes("/projects") ? "work" : null;
  const hrefFor = (id: string) => `/${locale}#${id}`;

  return (
    <>
      {/* ---------- desktop ---------- */}
      <nav aria-label={menuLabel} className="hidden md:block">
        <ul className="flex items-center gap-7 lg:gap-9">
          {items.map(({ id, label }) => (
            <li key={id}>
              <Link
                href={hrefFor(id)}
                aria-current={active === id ? "true" : undefined}
                className={`text-[15px] text-ink transition-opacity hover:opacity-55 ${
                  active === id ? "opacity-100" : "opacity-90"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ---------- mobile ---------- */}
      <button
        type="button"
        aria-label={menuLabel}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((o) => !o)}
        className="order-last flex size-9 shrink-0 items-center justify-center text-ink transition-opacity hover:opacity-55 md:hidden"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="size-5" aria-hidden>
          {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
        </svg>
      </button>

      {open && (
        <nav
          id="mobile-nav"
          aria-label={menuLabel}
          className="absolute inset-x-0 top-full bg-canvas motion-safe:animate-[lb-fade_0.18s_ease-out] md:hidden"
        >
          <ul className="mx-auto w-full px-5 py-2 sm:px-8">
            {items.map(({ id, label }) => (
              <li key={id}>
                <Link
                  href={hrefFor(id)}
                  onClick={() => setOpen(false)}
                  aria-current={active === id ? "true" : undefined}
                  className={`block py-3 font-display text-2xl text-ink ${active === id ? "opacity-100" : "opacity-80"}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
