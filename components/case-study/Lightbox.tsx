"use client";

import Image from "next/image";
import { withBasePath } from "@/lib/assetPath";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// Single source of truth for screenshot dimensions — Screenshot.tsx imports these.
export const SHOT_WIDTH = 1600;
export const SHOT_HEIGHT = 1000;

export type LightboxShot = { src: string; title: string; caption?: string };

type Labels = { close: string; prev: string; next: string; hint: string };

const DEFAULT_LABELS: Labels = {
  close: "Close",
  prev: "Previous screenshot",
  next: "Next screenshot",
  hint: "Esc to close · ← → to navigate",
};

const LightboxContext = createContext<{ openBySrc: (src: string) => void } | null>(null);

export function useLightbox() {
  return useContext(LightboxContext);
}

export default function LightboxRoot({
  shots,
  labels,
  children,
}: {
  shots: LightboxShot[];
  labels?: Partial<Labels>;
  children: React.ReactNode;
}) {
  const l = { ...DEFAULT_LABELS, ...labels };
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  const openBySrc = useCallback(
    (src: string) => {
      const i = shots.findIndex((s) => s.src === src);
      if (i !== -1) setIndex(i);
    },
    [shots]
  );

  // Keep the native <dialog> element in sync with state
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
  }, [isOpen]);

  // Lock page scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const step = useCallback(
    (dir: 1 | -1) =>
      setIndex((cur) =>
        cur === null ? cur : (cur + dir + shots.length) % shots.length
      ),
    [shots.length]
  );

  // Arrow-key navigation — flipped in RTL so "next" always moves visually forward
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const rtl = document.documentElement.dir === "rtl";
      const forward = (e.key === "ArrowRight") !== rtl;
      step(forward ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, step]);

  // Preload neighbors so navigation feels instant
  useEffect(() => {
    if (index === null) return;
    for (const d of [1, -1] as const) {
      const neighbor = shots[(index + d + shots.length) % shots.length];
      const img = new window.Image();
      img.src = withBasePath(neighbor.src);
    }
  }, [index, shots]);

  const shot = index === null ? null : shots[index];
  const counter = index === null ? "" : `${index + 1} / ${shots.length}`;
  const pct = index === null ? 0 : ((index + 1) / shots.length) * 100;
  const touchX = useRef<number | null>(null);

  return (
    <LightboxContext.Provider value={{ openBySrc }}>
      {children}

      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current.close();
        }}
        aria-label={shot?.title}
        className="fixed inset-0 h-full max-h-full w-full max-w-full select-none bg-transparent p-0 backdrop:bg-[#0d1321]/85 backdrop:backdrop-blur-md backdrop:animate-[lb-fade_.2s_ease-out]"
      >
        <div className="flex h-full flex-col">
          {/* ---------- header ---------- */}
          <header className="relative flex h-14 shrink-0 items-center justify-between border-b border-[#f0ebd8]/10 ps-4 pe-1 sm:ps-6 sm:pe-2">
            {/* title — absolute, so it stays dead-center and is NOT a flex item */}
            <span className="pointer-events-none absolute inset-x-0 flex justify-center overflow-hidden px-24">
              <span className="truncate font-mono text-xs text-[#f0ebd8]/85">{shot?.title}</span>
            </span>

            {/* far edge 1 */}
            <span className="font-mono text-sm tabular-nums text-[#f0ebd8]/55">{counter}</span>

            {/* far edge 2 */}
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={l.close}
              className="flex size-10 items-center justify-center rounded-full text-[#f0ebd8]/70 transition-colors hover:bg-[#f0ebd8]/10 hover:text-[#f0ebd8]"
            >
              <CloseIcon className="size-5" />
            </button>
          </header>

          {/* position line — grows from inline-start, so it mirrors in RTL for free */}
          <div className="h-px shrink-0 bg-[#f0ebd8]/10">
            <div
              className="h-full bg-accent transition-[width] duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>

          {/* ---------- stage ---------- */}
          <div
            className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center p-4 sm:p-8"
            onPointerDown={(e) => (touchX.current = e.clientX)}
            onPointerUp={(e) => {
              if (touchX.current === null) return;
              const dx = e.clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) < 60) return;
              const rtl = document.documentElement.dir === "rtl";
              const forward = dx < 0 !== rtl;
              step(forward ? 1 : -1);
            }}
          >
            {shot && (
              <Image
                key={shot.src}
                src={withBasePath(shot.src)}
                alt={shot.caption ?? shot.title}
                width={SHOT_WIDTH}
                height={SHOT_HEIGHT}
                priority
                sizes="92vw"
                draggable={false}
                className="max-h-full w-auto max-w-full rounded-xl bg-surface object-contain shadow-2xl ring-1 ring-[#f0ebd8]/10 motion-safe:animate-[lb-pop_.28s_cubic-bezier(0.16,1,0.3,1)]"
              />
            )}

            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={l.prev}
              className="absolute start-3 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#f0ebd8]/15 bg-[#f0ebd8]/10 text-[#f0ebd8] backdrop-blur-sm transition-colors hover:bg-[#f0ebd8]/20 sm:flex"
            >
              <ChevronLeftIcon className="size-5 rtl:-scale-x-100" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={l.next}
              className="absolute end-3 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#f0ebd8]/15 bg-[#f0ebd8]/10 text-[#f0ebd8] backdrop-blur-sm transition-colors hover:bg-[#f0ebd8]/20 sm:flex"
            >
              <ChevronRightIcon className="size-5 rtl:-scale-x-100" />
            </button>
          </div>

          {/* ---------- footer ---------- */}
          <footer className="shrink-0 border-t border-[#f0ebd8]/10 px-4 py-3 sm:px-6">
            <div className="mx-auto flex max-w-4xl items-center justify-between gap-6">
              <p className="line-clamp-2 text-sm leading-6 text-[#f0ebd8]/60">{shot?.caption}</p>
              <p className="hidden shrink-0 font-mono text-[11px] text-[#f0ebd8]/40 sm:block">{l.hint}</p>
            </div>
          </footer>
        </div>
      </dialog>
    </LightboxContext.Provider>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}