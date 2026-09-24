import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.about.meta.title,
    description: t.about.meta.description,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  // Persian script breaks with uppercase/letter-spacing (letter joining!)
  const monoLabel =
    locale === "en" ? "font-mono uppercase tracking-[0.2em]" : "";

  return (
    <main className="mx-auto w-full max-w-4xl px-6">
      {/* ---------- Header ---------- */}
      <section className="pb-20 pt-20 sm:pt-28">
        <p
          className={`text-xs font-medium text-emerald-600 dark:text-emerald-400 ${monoLabel}`}
        >
          {t.about.label}
        </p>

        <h1 className="animate-rise mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          {t.about.heading}
        </h1>

        <div className="mt-8 max-w-2xl space-y-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {t.about.intro.map((paragraph, i) => (
            <p
              key={i}
              className="animate-rise"
              style={{ animationDelay: `${(i + 1) * 80}ms` }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* ---------- Snapshot ---------- */}
      <section className="border-t border-zinc-200 py-14 dark:border-zinc-800">
        <p
          className={`text-xs font-medium text-zinc-500 dark:text-zinc-400 ${monoLabel}`}
        >
          {t.about.snapshot.label}
        </p>

        <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {[
            [t.about.snapshot.role, t.about.snapshot.roleValue],
            [t.about.snapshot.focus, t.about.snapshot.focusValue],
            [t.about.snapshot.location, t.about.snapshot.locationValue],
            [t.about.snapshot.availability, t.about.snapshot.availabilityValue],
          ].map(([term, value]) => (
            <div key={term}>
              <dt
                className={`text-xs text-zinc-400 dark:text-zinc-500 ${monoLabel}`}
              >
                {term}
              </dt>
              <dd className="mt-1.5 font-medium text-zinc-900 dark:text-zinc-100">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- Principles ---------- */}
      <section className="border-t border-zinc-200 py-14 dark:border-zinc-800">
        <p
          className={`text-xs font-medium text-zinc-500 dark:text-zinc-400 ${monoLabel}`}
        >
          {t.about.principlesLabel}
        </p>

        <div className="mt-8 space-y-9">
          {t.about.principles.map((principle, i) => (
            <div key={principle.title} className="flex gap-5">
              <span className="pt-0.5 font-mono text-sm text-emerald-600 dark:text-emerald-400">
                0{i + 1}
              </span>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  {principle.title}
                </h2>
                <p className="mt-2 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">
                  {principle.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="border-t border-zinc-200 py-20 dark:border-zinc-800">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t.about.cta.text}
        </h2>
        <Link
          href={`/${locale}/projects`}
          className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-300"
        >
          {t.about.cta.link}
          <ArrowUpRightIcon className="size-4 rtl:-scale-x-100" />
        </Link>
      </section>
    </main>
  );
}

function ArrowUpRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}