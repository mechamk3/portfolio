"use client";

import { useTheme } from "@/components/providers/ThemeProvider";

export default function ThemeToggle({
  variant = "switch",
}: {
  variant?: "switch" | "swap";
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return variant === "swap" ? (
    <SwapToggle onToggle={toggle} />
  ) : (
    <SwitchToggle isDark={resolvedTheme === "dark"} onToggle={toggle} />
  );
}

/* ---- header: day/night switch (unused right now, kept ready) ---- */
function SwitchToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
      onClick={onToggle}
      className="relative h-7 w-12 rounded-full border border-line-strong bg-surface-2 shadow-inner transition-colors duration-300"
    >
      <SunIcon className="absolute inset-s-1.5 top-1/2 size-3.5 -translate-y-1/2 text-ink-2 transition-opacity duration-300 dark:opacity-40" />
      <MoonIcon className="absolute inset-e-1.5 top-1/2 size-3.5 -translate-y-1/2 text-ink-2 opacity-40 transition-opacity duration-300 dark:opacity-100" />
      {/* knob — inverted like the primary buttons: navy in light, cream in dark */}
      <span
        aria-hidden
        className="absolute inset-s-0.5 top-1/2 size-5 -translate-y-1/2 rounded-full bg-ink shadow-md transition-transform duration-300 dark:translate-x-5 dark:bg-canvas dark:rtl:-translate-x-5"
      />
    </button>
  );
}

/* ---- floating pill: icon shows current theme, swaps on hover to preview the click ---- */
function SwapToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={onToggle}
      className="group/th flex size-9 items-center justify-center rounded-full text-ink-2 transition-colors hover:text-ink"
    >
      <span className="relative block size-5">
        <SunIcon className="absolute inset-0 size-5 rotate-0 scale-100 opacity-100 transition-all duration-300 group-hover/th:rotate-90 group-hover/th:scale-0 group-hover/th:opacity-0 dark:rotate-90 dark:scale-0 dark:opacity-0 dark:group-hover/th:rotate-0 dark:group-hover/th:scale-100 dark:group-hover/th:opacity-100" />
        <MoonIcon className="absolute inset-0 size-5 -rotate-90 scale-0 opacity-0 transition-all duration-300 group-hover/th:rotate-0 group-hover/th:scale-100 group-hover/th:opacity-100 dark:rotate-0 dark:scale-100 dark:opacity-100 dark:group-hover/th:-rotate-90 dark:group-hover/th:scale-0 dark:group-hover/th:opacity-0" />
      </span>
    </button>
  );
}

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}