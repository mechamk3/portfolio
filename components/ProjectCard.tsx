import Image from "next/image";
import Link from "next/link";

import type { Dictionary } from "@/content/en";
import type { ProjectItem } from "@/content/types";
import { withBasePath } from "@/lib/assetPath";
import Arrow from "@/components/Arrow";
import { StatusPill } from "@/components/StatusPill";

/**
 * One project entry — shared by the home page and /projects.
 * Entries are separated by a rule rather than boxed. The title links to the
 * details page when there is one; otherwise the entry says it is on the way.
 */
export default function ProjectCard({
  project,
  labels,
  locale,
  priority = false,
}: {
  project: ProjectItem;
  labels: Dictionary["projects"];
  locale: string;
  priority?: boolean;
}) {
  const href = project.slug && project.detailsReady ? `/${locale}/projects/${project.slug}` : null;

  return (
    <article className="group relative flex flex-col gap-8 border-t border-line py-9 first:border-t-0 first:pt-0 sm:flex-row sm:items-start sm:gap-10">
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-ink-3">
          <span>{project.year}</span>
          <span aria-hidden>·</span>
          <span>{labels.kindLabel[project.kind]}</span>
          <span aria-hidden>·</span>
          <StatusPill status={project.status} tone={project.tone} />
        </p>

        <h3 className="mt-3 font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-[1.75rem]">
          {href ? (
            <Link
              href={href}
              className="transition-colors after:absolute after:inset-0 group-hover:text-accent"
            >
              {project.name}
            </Link>
          ) : (
            project.name
          )}
        </h3>

        <p className="mt-3 max-w-xl text-base leading-7 text-ink-2">{project.tagline}</p>

        <p className="mt-4 max-w-xl font-sans text-sm leading-6 text-ink-3 rtl:text-right" dir="ltr">
          {project.stack.join("  ·  ")}
        </p>

        <p className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
          {href ? (
            <span className="link group-hover:text-accent group-hover:decoration-current">
              {labels.caseStudy} <Arrow />
            </span>
          ) : (
            <span className="text-ink-3">{labels.comingSoon}</span>
          )}

          {project.liveUrl && project.live && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link relative z-10">
              {project.live}
            </a>
          )}
          {project.sourceUrl && project.source && (
            <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="link relative z-10">
              {project.source}
            </a>
          )}
        </p>
      </div>

      {/* a screenshot pinned slightly crooked; it straightens when you hover the entry */}
      {project.cover && (
        <div className="order-first w-full shrink-0 sm:order-none sm:w-[42%] sm:pt-1">
          <div className="relative aspect-16/11 overflow-hidden rounded-sm border border-line-strong bg-surface shadow-lift transition-transform duration-500 ease-out sm:-rotate-2 sm:group-hover:rotate-0 rtl:sm:rotate-2 rtl:sm:group-hover:rotate-0">
            <Image
              src={withBasePath(project.cover)}
              alt=""
              fill
              priority={priority}
              sizes="(min-width: 640px) 420px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      )}
    </article>
  );
}
