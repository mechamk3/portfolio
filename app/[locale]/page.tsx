import Link from "next/link";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, monoClass } from "@/lib/i18n";
import SectionHeader from "@/components/SectionHeader";
import { ArrowUpRightIcon } from "@/components/Icons";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const mono = monoClass(locale);
  const featured = t.projects.items[0];

  return (
    <main className="mx-auto w-full max-w-4xl px-6">
      {/* ---------- Hero ---------- */}
      <section className="pb-16 pt-20 sm:pt-28">
        <p className="animate-rise inline-flex items-center gap-2.5 rounded-full border border-zinc-200 px-3.5 py-1.5 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          {t.home.status}
        </p>

        <h1 className="animate-rise [animation-delay:80ms] mt-8 text-4xl font-bold tracking-tight sm:text-6xl">
          {t.home.name}
        </h1>

        <p className={`animate-rise [animation-delay:160ms] mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400 ${mono}`}>
          {t.home.role}
        </p>

        <p className="animate-rise [animation-delay:240ms] mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {t.home.tagline}
        </p>

        <div className="animate-rise [animation-delay:320ms] mt-10 flex flex-wrap items-center gap-3">
          <Link
            href={`/${locale}/projects`}
            className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-300"
          >
            {t.home.viewWork}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-medium transition-colors hover:border-zinc-900 dark:border-zinc-700 dark:hover:border-zinc-300"
          >
            {t.home.contactMe}
          </Link>
        </div>

        {/* Stack strip — no border-t anymore; the sections below provide the hairlines */}
        <div className="animate-rise [animation-delay:400ms] mt-14">
          <p className={`text-xs text-zinc-400 dark:text-zinc-500 ${mono}`}>
            {t.home.stackLabel}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            {t.home.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- 01 · Selected work (teaser) ---------- */}
      {featured && (
        <section className="border-t border-zinc-200 py-14 dark:border-zinc-800">
          <SectionHeader index="01" label={t.projects.label} mono={locale === "en"} />

          <Link
            href={`/${locale}/projects`}
            className="group mt-8 block rounded-2xl border border-zinc-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-400 hover:shadow-xl hover:shadow-zinc-200/50 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:shadow-black/40 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">{featured.name}</h2>
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                  {featured.tagline}
                </p>
              </div>
              <ArrowUpRightIcon className="mt-1 size-5 shrink-0 text-zinc-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-zinc-900 dark:text-zinc-600 dark:group-hover:text-white rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
            </div>

            <ul className="mt-5 flex flex-wrap gap-2">
              {featured.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Link>

          <Link
            href={`/${locale}/projects`}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-white"
          >
            {t.projects.viewAll}
            <ArrowUpRightIcon className="size-4 rtl:-scale-x-100" />
          </Link>
        </section>
      )}

      {/* ---------- 02 · How I work (teaser) ---------- */}
      <section className="border-t border-zinc-200 py-14 dark:border-zinc-800">
        <SectionHeader index="02" label={t.about.principlesLabel} mono={locale === "en"} />

        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {t.about.principles.map((principle, i) => (
            <div key={principle.title}>
              <span className="font-mono text-sm text-emerald-600 dark:text-emerald-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 text-lg font-semibold tracking-tight">
                {principle.title}
              </h2>
            </div>
          ))}
        </div>

        <Link
          href={`/${locale}/about`}
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-white"
        >
          {t.about.moreLink}
          <ArrowUpRightIcon className="size-4 rtl:-scale-x-100" />
        </Link>
      </section>

      {/* ---------- 03 · Contact (closing CTA) ---------- */}
      <section className="border-t border-zinc-200 py-20 dark:border-zinc-800">
        <SectionHeader index="03" label={t.contact.label} mono={locale === "en"} />

        <h2 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">
          {t.contact.heading}
        </h2>
        <p className="mt-4 max-w-xl leading-8 text-zinc-600 dark:text-zinc-400">
          {t.contact.text}
        </p>

        <Link
          href={`/${locale}/contact`}
          className="mt-8 inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-300"
        >
          {t.contact.cta}
          <ArrowUpRightIcon className="size-4 rtl:-scale-x-100" />
        </Link>
      </section>
    </main>
  );
}