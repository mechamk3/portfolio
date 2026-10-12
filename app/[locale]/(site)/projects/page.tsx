import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, monoClass } from "@/lib/i18n";
import SectionHeader from "@/components/SectionHeader";
import { GitHubIcon } from "@/components/icons/socials";
import { ArrowUpRightIcon } from "@/components/icons/misc";

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
  const mono = monoClass(locale);

  const [featured, ...rest] = t.projects.items;
  const nextSlot = String(t.projects.items.length + 1).padStart(2, "0");

  return (
    <main className="mx-auto w-full max-w-4xl px-6">
      {/* ---------- Header ---------- */}
      <section className="pb-16 pt-20 sm:pt-28">
        <SectionHeader
          label={t.projects.label}
          index={String(t.projects.items.length).padStart(2, "0")}
          mono={locale === "en"}
        />

        <h1 className="animate-rise mt-8 text-4xl font-bold tracking-tight sm:text-5xl">
          {t.projects.heading}
        </h1>
        <p className="animate-rise [animation-delay:80ms] mt-5 max-w-xl text-lg leading-8 text-ink-2">
          {t.projects.intro}
        </p>
      </section>

      {/* ---------- Featured project ---------- */}
      {featured && (
        <section className="border-t border-line py-14">
          <p className={`text-xs text-ink-3 ${mono}`}>{t.projects.featured}</p>

          <article className="group relative mt-5 overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_1px_2px_rgba(13,19,33,0.06),0_20px_48px_-20px_rgba(13,19,33,0.18)] transition-all duration-300 hover:border-line-strong hover:shadow-[0_1px_2px_rgba(13,19,33,0.06),0_28px_64px_-20px_rgba(13,19,33,0.25)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_20px_48px_-20px_rgba(0,0,0,0.6)]">
            {/* stretched link: makes the whole card clickable while external links stay on top */}
            {featured.slug && (
              <Link
                href={`/${locale}/projects/${featured.slug}`}
                aria-label={featured.name}
                className="after:absolute after:inset-0 after:z-10 focus-visible:after:ring-2 focus-visible:after:ring-accent"
              />
            )}

            {/* ---------- cover ---------- */}
            {featured.cover && (
              <div className="border-b border-line">
                <div className="flex h-11 items-center justify-center border-b border-line bg-linear-to-b from-surface-2/70 to-surface-2/40 px-4">
                  <span className="inline-flex max-w-[80%] items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1 shadow-sm">
                    <i className="size-2 shrink-0 rounded-[3px] bg-accent" aria-hidden />
                    <span className={`truncate font-mono text-[11px] text-ink-2 ${mono}`}>
                      {featured.name}
                    </span>
                  </span>
                </div>
                <div className="overflow-hidden">
                  <Image
                    src={featured.cover}
                    alt={featured.name}
                    width={1600}
                    height={1000}
                    priority
                    sizes="(min-width: 896px) 896px, 100vw"
                    className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            )}

            {/* ---------- body ---------- */}
            <div className="p-6 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {featured.badge && (
                  <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/10 px-3.5 py-1.5 text-xs font-medium text-accent">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                      <span className="relative inline-flex size-2 rounded-full bg-accent" />
                    </span>
                    {featured.badge}
                  </span>
                )}
                <span className="font-mono text-xs text-ink-3">{featured.year}</span>
              </div>

              <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
                {featured.name}
              </h2>
              <p className="mt-2 text-sm text-ink-2">{featured.tagline}</p>
              <p className="mt-5 max-w-2xl leading-8 text-ink-2">{featured.description}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {featured.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs text-ink-2"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              {(featured.slug || featured.liveUrl || featured.sourceUrl) && (
                <div className="relative z-20 mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6">
                  {featured.slug && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 group-hover:underline">
                      {t.projects.caseStudy}
                      <ArrowUpRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                    </span>
                  )}
                  {featured.liveUrl && featured.live && (
                    <a
                      href={featured.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-offset-4 hover:underline"
                    >
                      {featured.live}
                      <ArrowUpRightIcon className="size-4 rtl:-scale-x-100" />
                    </a>
                  )}
                  {featured.sourceUrl && featured.source && (
                    <a
                      href={featured.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 underline-offset-4 hover:text-ink hover:underline"
                    >
                      {featured.source}
                      <GitHubIcon className="size-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        </section>
      )}

      {/* ---------- Remaining projects (grid) ---------- */}
      {rest.length > 0 && (
        <section className="border-t border-line py-14">
          <div className="grid gap-8 sm:grid-cols-2">
            {rest.map((project, i) => {
              const hasLinks = Boolean(project.slug || project.liveUrl || project.sourceUrl);
              return (
                <article
                  key={project.name}
                  className="group relative flex flex-col rounded-2xl border border-line p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_12px_32px_-12px_rgba(13,19,33,0.2)] dark:hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-sm text-accent">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs text-ink-3">{project.year}</span>
                  </div>

                  <h2 className="mt-4 text-xl font-semibold tracking-tight">
                    {project.slug ? (
                      <Link href={`/${locale}/projects/${project.slug}`} className="after:absolute after:inset-0">
                        {project.name}
                      </Link>
                    ) : (
                      project.name
                    )}
                  </h2>
                  <p className="mt-1.5 text-sm text-ink-2">{project.tagline}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs text-ink-2"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {hasLinks && (
                    <div className="relative z-10 mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5 [&>a]:mt-5 [&>*:not(a)]:mt-5">
                      {project.liveUrl && project.live && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-offset-4 hover:underline"
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
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 underline-offset-4 hover:text-ink hover:underline"
                        >
                          {project.source}
                          <GitHubIcon className="size-4" />
                        </a>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}