import Link from "next/link";

import SectionHeader from "@/components/SectionHeader";
import TechIcon from "@/components/TechIcon";
import { ArrowUpRightIcon } from "@/components/icons/misc";
import { StatusPill } from "@/components/StatusPill";
import { KindBadge } from "@/components/KindBadge";

import type { PanelProps } from "./types";

export default function WorkPanel({ t, locale }: PanelProps) {
  // show at most 3 projects, stacked full-width
  const items = t.projects.items.slice(0, 3);

  return (
    <div>
      <SectionHeader label={t.projects.label} mono={locale === "en"} />

      <div className="mt-7 flex flex-col gap-5">
        {items.map((project) => (
          <article
            key={project.name}
            className="group relative flex flex-col rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_16px_40px_-16px_rgba(13,19,33,0.25)] dark:hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.55)]"
          >
            {project.slug && (
              <Link
                href={`/${locale}/projects/${project.slug}`}
                aria-label={project.name}
                className="after:absolute after:inset-0 after:z-10 focus-visible:after:ring-2 focus-visible:after:ring-accent"
              />
            )}

            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <KindBadge kind={project.kind} label={t.projects.kindLabel[project.kind]} />
                <StatusPill status={project.status} tone={project.tone} />
              </div>
              <span className="shrink-0 font-mono text-xs text-ink-3">{project.year}</span>
            </div>

            <h2 className="mt-3 text-lg font-semibold leading-snug tracking-tight">{project.name}</h2>
            <p className="mt-1.5 max-w-2xl line-clamp-3 text-sm leading-6 text-ink-2">{project.tagline}</p>

            {/* tech icons */}
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  title={tech}
                  className="flex size-8 items-center justify-center rounded-lg border border-line bg-surface-2"
                >
                  <TechIcon
                    name={tech}
                    className="size-6 text-ink-2 transition-colors duration-200 group-hover:text-ink"
                  />
                </li>
              ))}
            </ul>

            {/* footer — only on cards that have somewhere to go */}
            {project.slug && (
              <div className="relative z-20 mt-auto flex flex-wrap gap-x-4 gap-y-1.5 border-line pt-4 *:mt-4">
                <Link
                  href={`/${locale}/projects/${project.slug}`}
                  className="relative z-20 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-accent shadow-[0_0_0_0_rgba(0,0,0,0)] transition-all duration-300 hover:text-accent-strong"
                >
                  {t.projects.caseStudy}
                  <ArrowUpRightIcon className="size-4 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                </Link>
              </div>
            )}
          </article>
        ))}

        {/* view all — full-width button below the stack */}
        <Link
          href={`/${locale}/projects`}
          className="mt-2 inline-flex items-center justify-center gap-1.5 self-center rounded-full border border-line-strong px-7 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          {t.projects.viewAll}
          <ArrowUpRightIcon className="size-4 rtl:-scale-x-100" />
        </Link>
      </div>
    </div>
  );
}