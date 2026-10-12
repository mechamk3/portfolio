"use client";

import { useEffect, useState } from "react";

import ThemeToggle from "@/components/layout/ThemeToggle";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

const THRESHOLD = 96;

export default function FloatingControls() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!shown}
      inert={!shown}
      className={`fixed inset-e-4 top-4 z-50 flex flex-col items-end gap-2 transition-all duration-300 ease-out ${
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-4 opacity-0"
      }`}
    >
      {/* theme circle */}
      <div className="glass flex size-11 items-center justify-center rounded-full">
        <ThemeToggle variant="swap" />
      </div>

      {/* language circle — extends into a pill on hover */}
      <LanguageSwitcher variant="floating" />
    </div>
  );
}