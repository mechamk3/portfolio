"use client";

import Image from "next/image";
import { useRef } from "react";

// All screenshots are exported at the same size — match these to your files.
const WIDTH = 1600;
const HEIGHT = 1000;

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
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <figure>
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-2.5 dark:border-zinc-800">
          <span className="flex gap-1.5" aria-hidden>
            <i className="size-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <i className="size-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <i className="size-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          </span>
          <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
            {title}
          </span>
        </div>
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          aria-label={`View full size: ${title}`}
          className="block w-full cursor-zoom-in"
        >
          <Image
            src={src}
            alt={caption ?? title}
            width={WIDTH}
            height={HEIGHT}
            priority={priority}
            sizes="(min-width: 1100px) 900px, 100vw"
            className="h-auto w-full"
          />
        </button>
      </div>

      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current.close();
        }}
        className="m-auto bg-transparent p-0 backdrop:bg-zinc-950/85"
      >
        <div className="relative">
          <Image
            src={src}
            alt={caption ?? title}
            width={WIDTH}
            height={HEIGHT}
            sizes="94vw"
            className="max-h-[88vh] w-auto max-w-[94vw] rounded-lg border border-zinc-800 bg-white object-contain"
          />
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
            className="absolute -inset-e-3 -top-3 flex size-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-sm text-zinc-300 hover:text-white"
          >
            ✕
          </button>
        </div>
      </dialog>

      {caption && (
        <figcaption className="mt-3 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}