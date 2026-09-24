import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, monoClass } from "@/lib/i18n";
import SectionHeader from "@/components/SectionHeader";
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";

// Target URLs aren't translatable content — they live in code.
// Displayed labels/handles live in the dictionaries.
const GITHUB_URL = "https://github.com/you";
const LINKEDIN_URL = "https://linkedin.com/in/you";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return { title: t.contact.meta.title, description: t.contact.meta.description };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const email = t.contact.channels.email.value;

  const channels = [
    { Icon: MailIcon, href: `mailto:${email}`, external: false, ...t.contact.channels.email },
    { Icon: GitHubIcon, href: GITHUB_URL, external: true, ...t.contact.channels.github },
    { Icon: LinkedInIcon, href: LINKEDIN_URL, external: true, ...t.contact.channels.linkedin },
  ];

  return (
    <main className="mx-auto w-full max-w-4xl px-6">
      {/* ---------- Header ---------- */}
      <section className="pb-20 pt-20 sm:pt-28">
        <SectionHeader label={t.contact.label} mono={locale === "en"} />

        <h1 className="animate-rise mt-8 text-4xl font-bold tracking-tight sm:text-5xl">
          {t.contact.heading}
        </h1>
        <p className="animate-rise [animation-delay:80ms] mt-5 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {t.contact.text}
        </p>

        <div className="animate-rise [animation-delay:160ms] mt-8">
          <a
            href={`mailto:${email}`}
            className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-300"
          >
            {t.contact.cta}
          </a>
        </div>
      </section>

      {/* ---------- Channels ---------- */}
      <section className="border-t border-zinc-200 py-14 dark:border-zinc-800">
        <SectionHeader label={t.contact.channelsLabel} mono={locale === "en"} />

        <ul className="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800">
          {channels.map(({ Icon, href, external, label, value, note }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-4 py-5 sm:gap-5"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-500 transition-colors group-hover:border-zinc-300 group-hover:text-emerald-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:group-hover:border-zinc-700 dark:group-hover:text-emerald-400">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-zinc-900 dark:text-zinc-100">{label}</span>
                  <span className="mt-0.5 block truncate font-mono text-sm text-zinc-500 dark:text-zinc-400">
                    {value}
                  </span>
                </span>
                <span className="hidden max-w-44 text-end text-sm leading-6 text-zinc-500 dark:text-zinc-400 sm:block">
                  {note}
                </span>
                <ArrowUpRightIcon className="size-4 shrink-0 text-zinc-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-zinc-900 dark:text-zinc-600 dark:group-hover:text-white rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Details (mirrors the about snapshot) ---------- */}
      <section className="border-t border-zinc-200 py-20 dark:border-zinc-800">
        <SectionHeader label={t.contact.detailsLabel} mono={locale === "en"} />

        <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {[
            t.contact.details.status,
            t.contact.details.location,
            t.contact.details.response,
            t.contact.details.timezone,
          ].map(({ label, value }) => (
            <div key={label}>
              <dt className={`text-xs text-zinc-400 dark:text-zinc-500 ${monoClass(locale)}`}>
                {label}
              </dt>
              <dd className="mt-1.5 font-medium text-zinc-900 dark:text-zinc-100">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}