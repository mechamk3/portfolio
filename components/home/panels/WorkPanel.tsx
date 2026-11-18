import Link from "next/link";

import { ChevronIcon } from "@/components/icons/misc";
import TechIcon from "@/components/TechIcon";

import type { PanelProps } from "./types";

export default function WorkPanel({ t, locale }: PanelProps) {
  const items = t.projects.items.slice(0, 3);

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
          {t.projects.heading}
        </p>
        <Link href={`/${locale}/projects`} className="group/view inline-flex items-center gap-1.5 text-[15px] text-ink-2 transition-colors hover:text-accent">
          {t.projects.viewAll}
          <ChevronIcon className="transition-transform duration-300 ease-out group-hover/view:translate-x-0.5 rtl:group-hover/view:-translate-x-0.5 motion-reduce:transition-none" />
        </Link>
      </div>

      <div className="@container mt-10">
      <ul className="grid gap-4 @[54rem]:grid-cols-3">
        {items.map((project) => (
            <li key={project.name} className="flex min-w-0">
              <article className="group flex h-full w-full min-w-0 flex-col border-2 border-line bg-surface p-5 shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-line-strong hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <p className="text-sm text-ink-3">{project.year}</p>
                <h3 className="mt-3 font-display text-xl font-medium leading-snug tracking-tight text-ink">
                  {project.name}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-ink-2">{project.tagline}</p>
                <div className="mt-auto flex flex-col pt-6">
                  <ul className="flex flex-nowrap items-center gap-1.5">
                    {project.stack.map((item) => (
                      <li key={item} title={item} className="shrink-0">
                        <TechIcon name={item} className="size-7 text-ink-3" />
                        <span className="sr-only">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {project.slug && (
                    <Link
                      href={`/${locale}/projects/${project.slug}`}
                      className="group/btn relative mt-5 flex w-full items-center justify-center overflow-hidden border-2 border-line px-4 py-2.5 text-[15px] font-medium text-ink"
                    >
                      <span>{t.projects.caseStudy}</span>
                      <span
                        aria-hidden
                        className="absolute inset-0 flex items-center justify-center bg-accent text-canvas [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-500 ease-out group-hover/btn:[clip-path:inset(0)] rtl:[clip-path:inset(0_0_0_100%)] rtl:group-hover/btn:[clip-path:inset(0)] motion-reduce:transition-none"
                      >
                        <span>{t.projects.caseStudy}</span>
                      </span>
                    </Link>
                  )}
                </div>
              </article>
            </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
