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
  featured = false,
}: {
  project: ProjectItem;
  locale: Locale;
  index: number;
  featured?: boolean;
}) {
  const t = getDictionary(locale);
  const linkProps =
    project.slug === "hris"
      ? ({ to: "/$locale/projects/hris", params: { locale } } as const)
      : ({ to: "/$locale/projects/$slug", params: { locale, slug: project.slug } } as const);

  return (
    <div
      className={`project-card group relative grid overflow-hidden rounded-none border border-line-strong bg-surface shadow-card transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-signal/60 ${featured ? "md:col-span-2 md:grid-cols-2" : "grid-cols-1"
        }`}
    >
      <ProjectVisual slug={project.slug} featured={featured} />
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

        <h3
          className={`mt-5 font-semibold leading-snug text-ink ${featured ? "text-2xl sm:text-3xl" : "text-2xl"
            }`}
        >
          {project.name}
        </h3>

        <p
          className={`mt-3 text-sm leading-7 text-ink-2 ${featured ? "max-w-2xl sm:text-base sm:leading-8" : ""
            }`}
        >
          {project.tagline}
        </p>

        <div className="mt-auto flex flex-col gap-4 pt-3">
          {/* Tech icons — row */}
          <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.stack.map((tech) => (
              <li
                key={tech}
                title={tech}
                className="flex size-10 items-center justify-center rounded-none border border-line bg-surface-2/60"
              >
                <TechIcon name={tech} className="size-7 text-ink-2" />
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