import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, monoClass } from "@/lib/i18n";
import TechIcon from "@/components/TechIcon";
import { GitHubIcon } from "@/components/icons/socials";
import { ArrowUpRightIcon, ChevronIcon } from "@/components/icons/misc";
import { StatusPill } from "@/components/StatusPill";
import { KindBadge } from "@/components/KindBadge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return { title: t.projects.meta.title, description: t.projects.meta.description };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <main className="relative overflow-x-clip select-none">
      {/* ambient backdrop — matches home */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-16 -z-10 h-241 mask-[linear-gradient(to_bottom,#000_55%,transparent_100%)]"
      >
        <div className="dot-grid absolute inset-0 mask-[radial-gradient(ellipse_70%_65%_at_50%_0%,#000_55%,transparent_100%)]" />
        <div className="absolute left-1/2 -top-45 h-100 w-[min(640px,100vw)] -translate-x-1/2 rounded-full bg-accent/15 blur-[110px] dark:bg-accent/10" />
        <div className="grain absolute inset-0 opacity-[0.05] dark:opacity-[0.08]" />
      </div>

      <div className="mx-auto w-full max-w-4xl px-6">
        {/* ---------- Header ---------- */}
        <section className="pb-12 pt-12">
          <nav aria-label="Breadcrumb" className={monoClass(locale)}>
            <ol className="flex items-center gap-2 text-xs text-ink-3">
              <li>
                <Link href={`/${locale}`} className="transition-colors hover:text-ink">
                  {t.nav.home}
                </Link>
              </li>
              <li aria-hidden="true" className="text-ink-3/60">
                <ChevronIcon />
              </li>
              <li aria-current="page" className="text-ink-2">
                {t.nav.projects}
              </li>
            </ol>
          </nav>


          <h1 className="animate-rise mt-8 text-4xl font-bold tracking-tight sm:text-5xl">
            {t.projects.heading}
          </h1>
          <p className="animate-rise [animation-delay:80ms] mt-5 max-w-xl text-lg leading-8 text-ink-2">
            {t.projects.intro}
          </p>
        </section>

        {/* ---------- Projects — same cards as WorkPanel ---------- */}
        <section className="pb-20">
          <div className="flex flex-col gap-5">
            {t.projects.items.map((project) => (
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

                {/* footer — same style as WorkPanel, plus live/source when they exist */}
                {(project.slug || project.liveUrl || project.sourceUrl) && (
                  <div className="relative z-20 mt-auto flex flex-wrap gap-x-4 gap-y-1.5 border-line pt-4 *:mt-4">
                    {project.slug && (
                      <Link
                        href={`/${locale}/projects/${project.slug}`}
                        className="relative z-20 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-accent shadow-[0_0_0_0_rgba(0,0,0,0)] transition-all duration-300 hover:text-accent-strong"
                      >
                        {t.projects.caseStudy}
                        <ArrowUpRightIcon className="size-4 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                      </Link>
                    )}
                    {project.liveUrl && project.live && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-20 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-ink-2 transition-colors hover:text-ink"
                      >
                        {project.live}
                        <ArrowUpRightIcon className="size-4 rtl:-scale-x-100" />
                      </a>
                    )}
                    {project.sourceUrl && project.source && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-20 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-ink-2 transition-colors hover:text-ink"
                      >
                        {project.source}
                        <GitHubIcon className="size-4" />
                      </a>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}