import { Link } from "@tanstack/react-router";
import type { ProjectItem } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { KindBadge, StatusPill, TechIcon } from "./bits";

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
    <article className="group relative flex min-w-0 flex-col border border-line-strong bg-surface p-6 transition-colors duration-200 hover:border-signal sm:p-7">
      <div className="flex items-center justify-between gap-3 font-mono text-xs text-ink-3">
        <span>
          <span className="text-signal">{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-2 text-ink-3/50">/</span>
          {project.year}
        </span>
        <KindBadge kind={project.kind} label={t.projects.kindLabel[project.kind]} />
      </div>

      <h3 className="mt-5 text-xl font-semibold leading-snug text-ink sm:text-2xl">
        {project.name}
      </h3>

      <div className="mt-3">
        <StatusPill status={project.status} tone={project.tone} />
      </div>

      <p className="mt-4 text-sm leading-7 text-ink-2">{project.tagline}</p>

      <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2" aria-label="Technologies">
        {project.stack.map((tech) => (
          <li key={tech} title={tech}>
            <TechIcon name={tech} className="size-6 text-ink-3" />
            <span className="sr-only">{tech}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex justify-end pt-6">
        <Link
          {...linkProps}
          className="group/btn relative inline-flex h-10 shrink-0 items-center overflow-hidden border border-signal bg-signal px-4 text-sm font-semibold text-surface transition-colors duration-400 hover:bg-surface hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
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
    </article>
  );
}
