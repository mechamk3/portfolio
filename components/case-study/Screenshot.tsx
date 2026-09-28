"use client";

import Image from "next/image";

import { SHOT_WIDTH, SHOT_HEIGHT, useLightbox } from "./Lightbox";

export default function Screenshot({
  src,
  title,
  caption,
  priority = false,
}: {
  src: string;
  title: string;
  caption?: string;
  priority?: boolean;
}) {
  const lightbox = useLightbox();

  return (
    <figure>
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-16px_rgba(0,0,0,0.18)] transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_56px_-16px_rgba(0,0,0,0.26)] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_20px_48px_-16px_rgba(0,0,0,0.6)] dark:ring-1 dark:ring-white/5">
        {/* ---------- browser chrome (unchanged) ---------- */}
        <div className="flex h-11 items-center justify-center border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-zinc-100/60 px-4 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900/40">
          <span className="inline-flex max-w-[80%] items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-1 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-800">
            <i className="size-2 shrink-0 rounded-[3px] bg-emerald-500" aria-hidden />
            <span className="truncate font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
              {title}
            </span>
          </span>
        </div>

        {/* ---------- screenshot ---------- */}
        <button
          type="button"
          onClick={() => (lightbox ? lightbox.openBySrc(src) : window.open(src, "_blank"))}
          aria-label={`View full size: ${title}`}
          className="group/btn relative block w-full cursor-zoom-in"
        >
          <Image
            src={src}
            alt={caption ?? title}
            width={SHOT_WIDTH}
            height={SHOT_HEIGHT}
            priority={priority}
            sizes="(min-width: 1100px) 900px, 100vw"
            className="h-auto w-full"
          />
          <span
            aria-hidden
            className="absolute bottom-4 end-4 flex size-10 items-center justify-center rounded-full bg-zinc-900/80 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover/btn:opacity-100 dark:bg-white/90 dark:text-zinc-900"
          >
            <MagnifierIcon className="size-4" />
          </span>
        </button>
      </div>

      {caption && (
        <figcaption className="mt-3.5 max-w-3xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function MagnifierIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}