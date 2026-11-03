import type { ReactNode } from "react";
import { MessageSquare, Server, Radio, AudioLines } from "lucide-react";

function Screen({ children }: { children: ReactNode }) {
  return (
    <div className="project-screen absolute inset-x-7 top-9 overflow-hidden rounded-none border border-line-strong bg-surface sm:inset-x-10 sm:top-12">
      <div className="flex h-7 items-center gap-1.5 border-b border-line bg-surface-2 px-3">
        <span className="size-1.5 rounded-full bg-ink-3" />
        <span className="size-1.5 rounded-full bg-ink-3" />
        <span className="size-1.5 rounded-full bg-signal" />
        <span className="ms-auto h-1 w-16 rounded-none bg-line-strong" />
      </div>
      {children}
    </div>
  );
}

export function ProjectVisual({ slug }: { slug: string }) {
  return (
    <div
      aria-hidden
      dir="ltr"
      data-project={slug}
      className="project-visual relative isolate aspect-16/11 overflow-hidden border-b-2 border-ink md:aspect-auto md:border-b-0 md:border-e-2"
    >
      {slug === "hris" ? (
        <Screen>
          <img
            src="/projects/hris/project-cover.webp"
            alt=""
            loading="lazy"
            width="1680"
            height="919"
            className="block h-auto w-full"
          />
        </Screen>
      ) : slug === "smsGateway" ? (
        <Screen>
          <div className="flex aspect-[1680/919] items-center justify-center gap-4 bg-artwork">
            <div className="flex flex-col gap-5 text-glow">
              <MessageSquare className="size-5" />
              <MessageSquare className="size-5 opacity-50" />
            </div>
            <span className="h-px w-6 bg-glow/50" />
            <span className="flex size-14 items-center justify-center border border-glow/40 bg-surface">
              <Server className="size-7 text-glow" strokeWidth={1.3} />
            </span>
            <span className="h-px w-6 bg-glow/50" />
            <div className="flex flex-col gap-5 text-glow">
              <MessageSquare className="size-5 opacity-50" />
              <MessageSquare className="size-5" />
            </div>
          </div>
        </Screen>
      ) : (
        <Screen>
          <div className="flex aspect-[1680/919] items-center justify-center gap-5 bg-artwork">
            <div className="project-record flex size-24 items-center justify-center rounded-full border border-line-strong">
              <span className="flex size-9 items-center justify-center rounded-full border border-warning/40 bg-surface">
                <Radio className="size-4 text-warning" strokeWidth={1.3} />
              </span>
            </div>
            <AudioLines className="size-12 text-warning/70" strokeWidth={1} />
          </div>
        </Screen>
      )}
      <span className="absolute start-4 top-4 size-2 border-s border-t border-ink-3/50" />
      <span className="absolute end-4 bottom-4 size-2 border-e border-b border-ink-3/50" />
    </div>
  );
}