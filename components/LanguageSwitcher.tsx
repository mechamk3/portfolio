"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { locales, type Locale } from "@/lib/i18n";

const codes: Record<Locale, string> = { en: "EN", fa: "FA" };

function setLocaleCookie(locale: Locale) {
  document.cookie = `locale=${locale};path=/;max-age=31536000;samesite=lax`;
}

/* ---------- shared plumbing for all expandable variants ---------- */

/**
 * Enforces closed-ness of an expandable control:
 *  - outside pointerdown (fires at gesture start — swipes included) → close
 *  - Escape → close
 *  - real scroll (> 64px from open position) → close — scrolling is how the
 *    user moves between navbar and floating variants; open state must not
 *    survive it (both instances stay mounted, so unmount alone can't help)
 */
function useAutoClose(
  ref: React.RefObject<HTMLElement | null>,
  isOpen: boolean,
  close: () => void
) {
  // unmount close (route changes)
  useEffect(() => () => close(), [close]);

  // outside + escape close
  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, ref]);

  // scroll close — threshold measured from where it was opened, so momentum
  // ticks and tap-jitter don't slam it shut, but any real scroll does
  useEffect(() => {
    if (!isOpen) return;
    const startY = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 64) close();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen, close]);
}

/**
 * Hover intent, mouse-only. Touch "enters" are taps — handled by click.
 * A pointer that has never moved can't "enter" with intent: the moved-once gate
 * swallows the synthetic pointerenter that fires when a component mounts under
 * a stationary cursor (e.g. navbar ↔ floating swap while the mouse rests where
 * the new control appears).
 */
function useHoverIntent() {
  const [hovered, setHovered] = useState(false);
  const hasMoved = useRef(false);

  useEffect(() => {
    const onMove = () => {
      hasMoved.current = true;
      window.removeEventListener("pointermove", onMove);
    };
    window.addEventListener("pointermove", onMove, { once: true, passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const onPointerEnter = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "mouse" && hasMoved.current) setHovered(true);
    },
    []
  );
  const onPointerLeave = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") setHovered(false);
    },
    []
  );

  return { hovered, setHovered, onPointerEnter, onPointerLeave };
}

/* ---------- component ---------- */

export default function LanguageSwitcher({
  variant = "navbar",
}: {
  variant?: "navbar" | "floating";
}) {
  const pathname = usePathname();
  const current = (pathname.split("/")[1] ?? "en") as Locale;

  const hrefFor = useCallback(
    (locale: Locale) => {
      const segments = pathname.split("/");
      segments[1] = locale;
      return segments.join("/") || `/${locale}`;
    },
    [pathname]
  );

  return variant === "floating" ? (
    <FloatingVariant current={current} hrefFor={hrefFor} />
  ) : (
    <NavbarVariant current={current} hrefFor={hrefFor} />
  );
}

/* ---------- navbar: 44px circle → vertical capsule; globe pinned on top, options unfold below ---------- */
function NavbarVariant({
  current,
  hrefFor,
}: {
  current: Locale;
  hrefFor: (l: Locale) => string;
}) {
  const [pinned, setPinned] = useState(false);
  const { hovered, setHovered, onPointerEnter, onPointerLeave } = useHoverIntent();
  const rootRef = useRef<HTMLDivElement>(null);
  const isOpen = pinned || hovered;

  const close = useCallback(() => {
    setPinned(false);
    setHovered(false);
  }, []);

  useAutoClose(rootRef, isOpen, close);

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label="Language"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={`glass flex w-11 shrink-0 flex-col items-center overflow-hidden rounded-full p-[3px] transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "h-[138px]" : "h-11"
        }`}
    >
      {/* the globe — first child = top edge; its position never changes */}
      <button
        type="button"
        aria-label="Language options"
        aria-expanded={isOpen}
        onClick={() => setPinned((o) => !o)}
        className="flex h-9 w-9 shrink-0 items-center justify-center text-ink-2"
      >
        <GlobeIcon className="size-5" />
      </button>

      {/* options track — unfolds downward: 12 | EN 32 | 6 | FA 32 | 12 = 94px */}
      <div
        className={`flex w-9 shrink-0 flex-col items-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "h-[94px] py-[12px] opacity-100" : "h-0 opacity-0"
          }`}
      >
        {locales.map((locale, i) => (
          <Link
            key={locale}
            href={hrefFor(locale)}
            onClick={() => {
              setLocaleCookie(locale);
              close();
            }}
            aria-current={locale === current ? "true" : undefined}
            tabIndex={current === locale ? -1 : 0}
            className={`flex h-8 w-9 shrink-0 items-center justify-center font-sans text-[11px] font-bold transition-colors duration-200 ${i === 1 ? "mt-[6px]" : ""} ${locale === current ? "text-ink" : "text-ink-3 hover:text-ink"
              }`}
          >
            {codes[locale]}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ---------- floating: 44px circle → horizontal pill; globe pinned at the screen edge ---------- */
function FloatingVariant({
  current,
  hrefFor,
}: {
  current: Locale;
  hrefFor: (l: Locale) => string;
}) {
  const [pinned, setPinned] = useState(false);
  const { hovered, setHovered, onPointerEnter, onPointerLeave } = useHoverIntent();
  const rootRef = useRef<HTMLDivElement>(null);
  const isOpen = pinned || hovered;

  const close = useCallback(() => {
    setPinned(false);
    setHovered(false);
  }, []);

  useAutoClose(rootRef, isOpen, close);

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label="Language"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={`glass flex h-11 shrink-0 items-center overflow-hidden rounded-full p-[3px] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "w-[138px]" : "w-11"
        }`}
    >
      {/* options track — grows toward the page (inline-start) */}
      <div
        className={`flex shrink-0 items-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "w-[94px] px-[12px] opacity-100" : "w-0 opacity-0"
          }`}
      >
        {locales.map((locale, i) => (
          <Link
            key={locale}
            href={hrefFor(locale)}
            onClick={() => {
              setLocaleCookie(locale);
              close();
            }}
            aria-current={locale === current ? "true" : undefined}
            tabIndex={current === locale ? -1 : 0}
            className={`flex h-9 w-8 shrink-0 items-center justify-center font-sans text-[11px] font-bold transition-colors duration-200 ${i === 1 ? "ms-[6px]" : ""} ${locale === current ? "text-ink" : "text-ink-3 hover:text-ink"
              }`}
          >
            {codes[locale]}
          </Link>
        ))}
      </div>

      {/* the globe — last child = inline-end = pinned edge; never moves */}
      <button
        type="button"
        aria-label="Language options"
        aria-expanded={isOpen}
        onClick={() => setPinned((o) => !o)}
        className="flex h-9 w-9 shrink-0 items-center justify-center text-ink-2"
      >
        <GlobeIcon className="size-5" />
      </button>
    </div>
  );
}

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14.5 14.5 0 0 0 0 18 14.5 14.5 0 0 0 0-18" />
    </svg>
  );
}