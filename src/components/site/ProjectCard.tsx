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
    <Link
      {...linkProps}
      className={`project-card group relative grid overflow-hidden rounded-none border border-line-strong bg-surface shadow-card transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-signal/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal ${
        featured ? "md:col-span-2 md:grid-cols-2" : "grid-cols-1"
      }`}
    >
      <ProjectVisual slug={project.slug} featured={featured} />
      <div className="flex min-w-0 flex-col p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-xs text-ink-3">
          <span className="text-signal">{String(index + 1).padStart(2, "0")}</span> <span className="mx-2 text-ink-3/50">/</span> {project.year}
        </span>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-none border border-line-strong text-ink-2 transition-colors duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-signal-foreground">
          <ArrowUpRightIcon className="size-4 rtl:-scale-x-100" />
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <KindBadge kind={project.kind} label={t.projects.kindLabel[project.kind]} />
        <StatusPill status={project.status} tone={project.tone} />
      </div>

      <h3
        className={`mt-5 font-semibold leading-snug text-ink ${
          featured ? "text-2xl sm:text-3xl" : "text-2xl"
        }`}
      >
        {project.name}
      </h3>
      <p className={`mt-3 text-sm leading-7 text-ink-2 ${featured ? "max-w-2xl sm:text-base sm:leading-8" : ""}`}>
        {project.tagline}
      </p>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-7">
        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.stack.map((tech) => (
            <li
              key={tech}
              title={tech}
              className="flex size-8 items-center justify-center rounded-none border border-line bg-surface-2/70"
            >
                <TechIcon name={tech} className="size-4 text-ink-2" />
            </li>
          ))}
        </ul>
        <span className="shrink-0 text-xs font-medium text-ink-2 transition-colors group-hover:text-signal">
          {t.projects.caseStudy}
        </span>
      </div>
      </div>
    </Link>
  );
}
