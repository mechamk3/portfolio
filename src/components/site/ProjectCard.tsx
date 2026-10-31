import { Link } from "@tanstack/react-router";
import type { ProjectItem } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { ArrowUpRightIcon } from "@/components/icons/misc";
import { KindBadge, StatusPill, TechIcon, trackSpotlight } from "./bits";

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
      onMouseMove={trackSpotlight}
      className={`spotlight group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface/70 p-6 shadow-card backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-signal/40 sm:p-8 ${
        featured ? "md:col-span-2 md:min-h-80" : "min-h-72"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs text-ink-3">
          {String(index + 1).padStart(2, "0")} <span className="text-ink-3/50">/</span> {project.year}
        </span>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-ink-2 transition-all duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-signal-foreground">
          <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:rotate-45 rtl:-scale-x-100" />
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <KindBadge kind={project.kind} label={t.projects.kindLabel[project.kind]} />
        <StatusPill status={project.status} tone={project.tone} />
      </div>

      <h3
        className={`mt-4 font-semibold leading-tight tracking-tight text-ink ${
          featured ? "text-2xl sm:text-3xl" : "text-xl"
        }`}
      >
        {project.name}
      </h3>
      <p className={`mt-3 text-sm leading-7 text-ink-2 ${featured ? "max-w-2xl sm:text-base sm:leading-8" : ""}`}>
        {project.tagline}
      </p>

      <div className="mt-auto flex items-end justify-between gap-4 pt-8">
        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.stack.map((tech) => (
            <li
              key={tech}
              title={tech}
              className="group flex size-9 items-center justify-center rounded-xl border border-line bg-surface-2/70"
            >
              <TechIcon name={tech} className="size-5 text-ink-2" />
            </li>
          ))}
        </ul>
        <span className="hidden shrink-0 text-sm font-medium text-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:inline">
          {t.projects.caseStudy}
        </span>
      </div>
    </Link>
  );
}
