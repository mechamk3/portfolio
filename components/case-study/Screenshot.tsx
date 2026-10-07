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
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_1px_2px_rgba(13,19,33,0.06),0_16px_40px_-16px_rgba(13,19,33,0.2)] transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(13,19,33,0.06),0_24px_56px_-16px_rgba(13,19,33,0.28)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_20px_48px_-16px_rgba(0,0,0,0.65)]">
        {/* ---------- browser chrome ---------- */}
        <div className="flex h-11 items-center justify-center border-b border-line bg-linear-to-b from-surface-2/70 to-surface-2/40 px-4">
          <span className="inline-flex max-w-[80%] items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1 shadow-sm">
            <i className="size-2 shrink-0 rounded-[3px] bg-accent" aria-hidden />
            <span className="truncate font-mono text-[11px] text-ink-2">{title}</span>
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
            className="absolute bottom-4 end-4 flex size-10 items-center justify-center rounded-full bg-ink/85 text-canvas opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover/btn:opacity-100"
          >
            <MagnifierIcon className="size-4" />
          </span>
        </button>
      </div>

      {caption && (
        <figcaption className="mt-3.5 max-w-3xl text-sm leading-7 text-ink-2">
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