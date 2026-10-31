import { MessageSquare, Server, Radio, AudioLines } from "lucide-react";

/** Project-specific artwork uses real HRIS media and domain symbols, never invented product data. */
export function ProjectVisual({ slug, featured }: { slug: string; featured: boolean }) {
  return (
    <div aria-hidden className={`project-visual relative isolate overflow-hidden border-b border-line-strong ${featured ? "md:border-b-0 md:border-e" : ""}`} dir="ltr" data-project={slug}>
      {slug === "hris" ? (
        <div className="project-screen absolute inset-x-7 top-9 overflow-hidden rounded-none border border-line-strong bg-surface sm:inset-x-10 sm:top-12">
          <div className="flex h-7 items-center gap-1.5 border-b border-line bg-surface-2 px-3">
            <span className="size-1.5 rounded-full bg-ink-3" /><span className="size-1.5 rounded-full bg-ink-3" /><span className="size-1.5 rounded-full bg-signal" />
            <span className="ms-auto h-1 w-16 rounded-none bg-line-strong" />
          </div>
          <img src="/projects/hris/personnel-list.webp" alt="" loading="lazy" width="1440" height="900" className="block h-auto w-full" />
        </div>
      ) : slug === "smsGateway" ? (
        <div className="message-network absolute inset-0 flex items-center justify-center gap-6 sm:gap-10">
          <div className="flex flex-col gap-8 text-glow"><MessageSquare className="size-7" /><MessageSquare className="size-7 opacity-50" /></div>
          <span className="h-px w-8 bg-glow/50" />
          <span className="flex size-24 items-center justify-center rounded-none border border-glow/40 bg-surface shadow-card"><Server className="size-10 text-glow" strokeWidth={1.2} /></span>
          <span className="h-px w-8 bg-glow/50" />
          <div className="flex flex-col gap-8 text-glow"><MessageSquare className="size-7 opacity-50" /><MessageSquare className="size-7" /></div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center gap-8">
          <div className="project-record relative flex size-40 items-center justify-center rounded-full border border-line-strong sm:size-44">
            <span className="flex size-14 items-center justify-center rounded-full border border-warning/40 bg-surface"><Radio className="size-6 text-warning" strokeWidth={1.3} /></span>
          </div>
          <AudioLines className="size-20 text-warning/70" strokeWidth={1} />
        </div>
      )}
      <span className="absolute start-4 top-4 size-2 border-s border-t border-ink-3/50" />
      <span className="absolute end-4 bottom-4 size-2 border-e border-b border-ink-3/50" />
    </div>
  );
}
