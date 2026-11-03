import { Link } from "@tanstack/react-router";
import type { ProjectItem } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { ArrowUpRightIcon } from "@/components/icons/misc";
import { KindBadge, StatusPill, TechIcon } from "./bits";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectCard({
  project,
  locale,
  index,
}: {
  project: ProjectItem;
  locale: Locale;
  index: number;
}) {
  const t = getDictionary(locale);
  const linkProps =
    project.slug === "hris"
      ? ({ to: "/$locale/projects/hris", params: { locale } } as const)
      : ({ to: "/$locale/projects/$slug", params: { locale, slug: project.slug } } as const);

  return (
    <div className="project-card group relative grid grid-cols-1 overflow-hidden rounded-none border-2 border-ink bg-surface shadow-card transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-signal md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <ProjectVisual slug={project.slug} />
      <div className="flex min-w-0 flex-col p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-xs text-ink-3">
            <span className="text-signal">{String(index + 1).padStart(2, "0")}</span>{" "}
            <span className="mx-2 text-ink-3/50">/</span> {project.year}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <KindBadge kind={project.kind} label={t.projects.kindLabel[project.kind]} />
          <StatusPill status={project.status} tone={project.tone} />
        </div>

        <h3 className="mt-5 text-2xl font-semibold leading-snug text-ink sm:text-3xl">
          {project.name}
        </h3>

        <p className="max-w-2xl text-sm leading-7 text-ink-2 sm:text-base sm:leading-8">
          {project.tagline}
        </p>

        <div className="mt-auto flex flex-col gap-4 pt-3">
          {/* Tech icons — row */}
          <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.stack.map((tech) => (
              <li
                key={tech}
                title={tech}
                className="flex size-11 items-center justify-center rounded-none border border-line bg-surface-2/60"
              >
                <TechIcon name={tech} className="size-8 text-ink-2" />
              </li>
            ))}
          </ul>

          {/* Button — row below, right side */}
          <div className="flex justify-end pt-6">
            <Link
              {...linkProps}
              className="group/btn relative inline-flex h-10 items-center font-semibold overflow-hidden border border-signal bg-signal px-4 text-sm text-surface transition-colors duration-400 hover:bg-surface hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
            >
              <span className="relative block overflow-hidden">
                <span className="block transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:-translate-y-full">
                  {t.projects.caseStudy}
                </span>
                <span className="absolute inset-0 block translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-y-0">
                  {t.projects.caseStudy}
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}