import Link from "next/link";

import { getDictionary, monoClass, type Locale } from "@/lib/i18n";
import type { ProjectItem } from "@/dictionaries/types";

export default function UnderConstruction({
  locale,
  project,
}: {
  locale: Locale;
  project: ProjectItem;
}) {
  const t = getDictionary(locale).projects.underConstruction;

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center select-none">
      {/* ambient backdrop — matches home */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-dvh mask-[linear-gradient(to_bottom,#000_30%,transparent_70%)]"
      >
        <div className="dot-grid absolute inset-0" />
        <div className="absolute left-1/2 -top-45 h-100 w-[min(640px,100vw)] -translate-x-1/2 rounded-full bg-accent/15 blur-[110px] dark:bg-accent/10" />
        <div className="grain absolute inset-0 opacity-[0.05] dark:opacity-[0.08]" />
      </div>

      <div className="animate-rise relative flex max-w-lg flex-col items-center">
        <span
          className={`inline-flex items-center gap-2 rounded-full border border-dashed border-line-strong px-4 py-1.5 text-xs text-ink-3 ${monoClass(locale)}`}
        >
          {t.title}
        </span>

        <h1 className="mt-8 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {project.name}
        </h1>

        <p className="mt-8 max-w-md text-balance text-ink-2">{t.text}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="rounded-full border border-line px-3 py-1 text-xs text-ink-3">
              {tech}
            </span>
          ))}
        </div>

        <div className="animate-rise mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/${locale}`}
            className="rounded-full bg-accent px-7 py-3 text-sm font-medium text-canvas transition-colors hover:bg-accent-strong"
          >
            {t.go2h}
          </Link>
          <Link
            href={`/${locale}/projects`}
            className="rounded-full border border-line-strong px-7 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {t.go2p}
          </Link>
        </div>
      </div>
    </main>
  );
}