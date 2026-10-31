import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type Shot = { src: string; title: string; caption?: string };

const Ctx = createContext<{ open: (src: string) => void } | null>(null);
export const useLightbox = () => useContext(Ctx);

export function LightboxRoot({ shots, children }: { shots: Shot[]; children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  const open = useCallback(
    (src: string) => {
      const i = shots.findIndex((s) => s.src === src);
      if (i !== -1) setIndex(i);
    },
    [shots],
  );

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const step = useCallback(
    (dir: 1 | -1) => setIndex((c) => (c === null ? c : (c + dir + shots.length) % shots.length)),
    [shots.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const rtl = document.documentElement.dir === "rtl";
      step((e.key === "ArrowRight") !== rtl ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, step]);

  const shot = index === null ? null : shots[index];

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
        aria-label={shot?.title}
        className="fixed inset-0 m-0 h-full max-h-full w-full max-w-full bg-transparent p-0 backdrop:bg-scrim backdrop:backdrop-blur-md"
      >
        <div className="flex h-full flex-col text-ink">
          <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-line px-4 sm:px-6">
            <span className="font-mono text-sm tabular-nums text-ink-3">
              {index === null ? "" : `${index + 1} / ${shots.length}`}
            </span>
            <span className="truncate font-mono text-xs text-ink-2">{shot?.title}</span>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className="flex size-10 items-center justify-center rounded-none text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              ✕
            </button>
          </header>
          <div className="h-px shrink-0 bg-line">
            <div
              className="h-full bg-signal transition-[width] duration-300"
              style={{ width: index === null ? 0 : `${((index + 1) / shots.length) * 100}%` }}
            />
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-10">
            {shot && (
              <img
                key={shot.src}
                src={shot.src}
                alt={shot.caption ?? shot.title}
                className="max-h-full w-auto max-w-full rounded-none object-contain shadow-card ring-1 ring-line motion-safe:animate-[lb-pop_.28s_cubic-bezier(0.16,1,0.3,1)]"
              />
            )}
            {(["prev", "next"] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => step(dir === "next" ? 1 : -1)}
                aria-label={dir === "next" ? "Next" : "Previous"}
                className={`glass absolute top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-none text-ink transition-colors hover:text-signal sm:flex ${
                  dir === "next" ? "end-4" : "start-4"
                }`}
              >
                <span className="rtl:-scale-x-100">{dir === "next" ? "→" : "←"}</span>
              </button>
            ))}
          </div>
          <footer className="shrink-0 border-t border-line px-4 py-3 sm:px-6">
            <p className="mx-auto line-clamp-2 max-w-4xl text-center text-sm leading-6 text-ink-2">{shot?.caption}</p>
          </footer>
        </div>
      </dialog>
    </Ctx.Provider>
  );
}

export function Screenshot({ src, title, caption }: Shot) {
  const lb = useLightbox();
  return (
    <figure>
      <div className="group overflow-hidden rounded-none border border-line bg-surface shadow-card transition-colors hover:border-signal/40">
        <div className="flex h-10 items-center gap-2 border-b border-line bg-surface-2/60 px-4">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="ms-2 truncate font-mono text-[11px] text-ink-3">{title}</span>
        </div>
        <button
          type="button"
          onClick={() => (lb ? lb.open(src) : window.open(src, "_blank"))}
          aria-label={title}
          className="relative block w-full cursor-zoom-in overflow-hidden"
        >
          <img
            src={src}
            alt={caption ?? title}
            width={1600}
            height={1000}
            loading="lazy"
            className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <span className="absolute bottom-4 end-4 flex size-10 items-center justify-center rounded-none bg-signal text-signal-foreground opacity-0 transition-opacity group-hover:opacity-100">
            ⤢
          </span>
        </button>
      </div>
      {caption && <figcaption className="mt-3 text-sm leading-7 text-ink-2">{caption}</figcaption>}
    </figure>
  );
}
