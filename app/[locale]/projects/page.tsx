import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, monoClass } from "@/lib/i18n";
import SectionHeader from "@/components/SectionHeader";
import { ArrowUpRightIcon, GitHubIcon } from "@/components/Icons";

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
    <main className="mx-auto w-full max-w-4xl px-6">
      {/* ---------- Header ---------- */}
      <section className="pb-20 pt-20 sm:pt-28">
        <SectionHeader label={t.projects.label} mono={locale === "en"} />

        <h1 className="animate-rise mt-8 text-4xl font-bold tracking-tight sm:text-5xl">
          {t.projects.heading}
        </h1>
        <p className="animate-rise [animation-delay:80ms] mt-5 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {t.projects.intro}
        </p>
      </section>

      {/* ---------- Projects ---------- */}
      <section className="border-t border-zinc-200 py-14 dark:border-zinc-800">
        <div className="space-y-8">
          {t.projects.items.map((project, i) => (
            <article
              key={project.name}
              className="group rounded-2xl border border-zinc-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-400 hover:shadow-xl hover:shadow-zinc-200/50 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:shadow-black/40 sm:p-10"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-sm text-emerald-600 dark:text-emerald-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                  {project.year}
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-semibold tracking-tight">{project.name}</h2>
              <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">{project.tagline}</p>
              <p className="mt-5 max-w-2xl leading-8 text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-zinc-200 pt-6 dark:border-zinc-800">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-white"
                >
                  {project.live}
                  <ArrowUpRightIcon className="size-4 rtl:-scale-x-100" />
                </a>
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-white"
                >
                  {project.source}
                  <GitHubIcon className="size-4" />
                </a>
              </div>
            </article>
          ))}

          {/* Future slot — keeps the page honest and shaped for growth */}
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-zinc-300 px-6 py-10 text-center dark:border-zinc-800">
            <p className={`text-xs font-medium text-zinc-400 dark:text-zinc-500 ${monoClass(locale)}`}>
              {t.projects.moreLabel}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              {t.projects.moreText}
            </p>
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="border-t border-zinc-200 py-20 dark:border-zinc-800">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.projects.cta.heading}</h2>
        <Link
          href={`/${locale}/contact`}
          className="mt-8 inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-300"
        >
          {t.projects.cta.button}
          <ArrowUpRightIcon className="size-4 rtl:-scale-x-100" />
        </Link>
      </section>
    </main>
  );
}