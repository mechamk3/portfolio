import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { isLocale, monoClass } from "@/lib/i18n";
import SectionHeader from "@/components/SectionHeader";
import ScrollProgress from "@/components/case-study/ScrollProgress";
import Toc from "@/components/case-study/Toc";
import Screenshot from "@/components/case-study/Screenshot";
import { getHrisContent } from "@/content/projects/hris";
import LightboxRoot from "@/components/case-study/Lightbox";

import { ArrowLeftIcon, ArrowUpRightIcon } from "@/components/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getHrisContent(locale);
  return { title: t.meta.title, description: t.meta.description };
}

export default async function HrisCaseStudy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getHrisContent(locale);
  const mono = monoClass(locale);

  const tocItems = [
    { id: "problem-1", label: t.problem1.nav },
    { id: "problem-2", label: t.problem2.nav },
    { id: "role", label: t.myRole.nav },
    { id: "roles", label: t.roles.nav },
    { id: "employee", label: t.employee.nav },
    { id: "modules", label: t.modules.nav },
    { id: "summary", label: t.summary.nav },
    { id: "gallery", label: t.gallery.nav },
    { id: "demo", label: t.demo.nav },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-6">
      <ScrollProgress />

      {/* ---------- Hero ---------- */}
      <LightboxRoot shots={t.gallery.shots}>
        <section className="pb-14 pt-16 sm:pt-24">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-1.5 text-sm text-ink-2 transition-colors hover:text-ink"
          >
            <ArrowLeftIcon className="size-4 rtl:-scale-x-100" />
            {t.backToProjects}
          </Link>

          <p className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-ink-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {t.badge}
          </p>

          <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl sm:leading-tight">
            {t.title}
          </h1>

          <p className="mt-4 text-sm font-medium text-accent">
            {t.name} · {t.roleLabel}: {t.role}
          </p>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-2">{t.lead}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {t.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs text-ink-2"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-line p-6 sm:p-8">
            <p className={`text-xs text-ink-3 ${mono}`}>{t.overviewLabel}</p>
            <dl className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {t.overview.map(({ label, value }) => (
                <div key={label}>
                  <dt className={`text-xs text-ink-3 ${mono}`}>{label}</dt>
                  <dd className="mt-1 font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {t.audience.map(({ title, text }) => (
              <div key={title} className="rounded-2xl border border-line p-6">
                <h2 className="font-semibold text-ink">{title}</h2>
                <p className="mt-2 text-sm leading-7 text-ink-2">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Body + TOC ---------- */}
        <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-14">
          <aside>
            <Toc label={t.tocLabel} items={tocItems} />
          </aside>

          <div className="min-w-0">
            {/* 01 · Problem 1 */}
            <section id="problem-1" className="scroll-mt-24 border-t border-line py-14">
              <SectionHeader index="01" label={t.problem1.tag} mono={locale === "en"} />
              <h2 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">{t.problem1.heading}</h2>
              <p className="mt-4 max-w-2xl leading-8 text-ink-2">{t.problem1.lead}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {t.problem1.sources.map(({ name, note }) => (
                  <div
                    key={name}
                    className="rounded-xl border border-dashed border-line-strong p-5 text-center"
                  >
                    <SourceIcon name={name} />
                    <p className="mt-3 font-medium text-ink">{name}</p>
                    <p className="mt-1 text-sm text-ink-2">{note}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-xl border-s-4 border-line-strong bg-surface-2/50 p-5">
                <p className="text-sm font-semibold text-ink">{t.problem1.consequenceLabel}</p>
                <p className="mt-2 max-w-3xl leading-8 text-ink-2">{t.problem1.consequence}</p>
              </div>

              <div className="mt-5 rounded-2xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
                <p className="font-semibold text-accent">{t.problem1.solutionTitle}</p>
                <p className="mt-2 max-w-3xl leading-8 text-ink-2">{t.problem1.solutionText}</p>
              </div>

              <p className={`mt-10 text-xs text-ink-3 ${mono}`}>{t.hint}</p>
              <div className="mt-4 space-y-8">
                {t.problem1.shots.map((shot) => (
                  <Screenshot key={shot.src} src={shot.src} title={shot.title} caption={shot.caption} priority />
                ))}
              </div>
            </section>

            {/* 02 · Problem 2 */}
            <section id="problem-2" className="scroll-mt-24 border-t border-line py-14">
              <SectionHeader index="02" label={t.problem2.tag} mono={locale === "en"} />
              <h2 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">{t.problem2.heading}</h2>
              <p className="mt-4 max-w-2xl leading-8 text-ink-2">{t.problem2.lead}</p>

              <div className="mt-8 rounded-xl border border-line bg-surface-2/50 p-5">
                <p className="text-sm font-semibold text-ink">{t.problem2.orderNoteTitle}</p>
                <p className="mt-2 max-w-3xl leading-8 text-ink-2">{t.problem2.orderNote}</p>
              </div>

              <ol className="mt-8 border-t border-line">
                {t.problem2.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-5 border-b border-line py-6">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-sm font-medium text-canvas">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-ink">
                        {step.title}
                        <span className="ms-3 rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-ink-2">
                          {step.who}
                        </span>
                      </p>
                      <p className="mt-1.5 max-w-2xl text-sm leading-7 text-ink-2">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-6 rounded-2xl border border-accent/20 bg-accent/5 p-6">
                <p className="font-semibold text-accent">{t.problem2.resultTitle}</p>
                <p className="mt-2 max-w-3xl leading-8 text-ink-2">{t.problem2.resultText}</p>
              </div>

              <p className={`mt-10 text-xs text-ink-3 ${mono}`}>{t.hint}</p>
              <div className="mt-4 space-y-8">
                {t.problem2.shots.map((shot) => (
                  <Screenshot key={shot.src} src={shot.src} title={shot.title} caption={shot.caption} />
                ))}
              </div>
            </section>

            {/* 03 · My role & stack */}
            <section id="role" className="scroll-mt-24 border-t border-line py-14">
              <SectionHeader index="03" label={t.myRole.nav} mono={locale === "en"} />
              <h2 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">{t.myRole.heading}</h2>
              <p className="mt-4 max-w-2xl leading-8 text-ink-2">{t.myRole.text}</p>

              <dl className="mt-8 grid gap-x-10 gap-y-5 border-t border-line pt-6 sm:grid-cols-2">
                {t.myRole.stack.map(({ label, value }) => (
                  <div key={label}>
                    <dt className={`text-xs text-ink-3 ${mono}`}>{label}</dt>
                    <dd className="mt-1 font-medium text-ink">{value}</dd>
                  </div>
                ))}
              </dl>

              <p className={`mt-10 text-xs text-ink-3 ${mono}`}>{t.myRole.deployLabel}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {t.myRole.deploy.map((step, i) => (
                  <div key={step.node} className="flex items-center gap-3">
                    {i > 0 && (
                      <span aria-hidden className="text-ink-3 rtl:-scale-x-100">
                        →
                      </span>
                    )}
                    <div className="rounded-xl border border-line px-4 py-3">
                      <p className="font-mono text-sm font-medium text-ink">{step.node}</p>
                      {step.note && <p className="mt-0.5 text-xs text-ink-2">{step.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 04 · Roles & permissions */}
            <section id="roles" className="scroll-mt-24 border-t border-line py-14">
              <SectionHeader index="04" label={t.roles.nav} mono={locale === "en"} />
              <h2 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">{t.roles.heading}</h2>
              <p className="mt-4 max-w-2xl leading-8 text-ink-2">{t.roles.lead}</p>

              <div className="mt-8 space-y-8">
                {t.roles.roles.map((role) => (
                  <div key={role.code} className="rounded-2xl border border-line p-6 sm:p-8">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-lg font-semibold tracking-tight">{role.name}</h3>
                      <span className="rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-xs text-ink-2">
                        {role.code}
                      </span>
                    </div>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-ink-2">{role.landing}</p>

                    <ul className="mt-5 border-t border-line">
                      {role.capabilities.map((cap) => (
                        <li
                          key={cap.label}
                          className="flex items-center justify-between gap-4 border-b border-line py-3"
                        >
                          <span className="min-w-0 text-sm text-ink-2">
                            {cap.label}
                            {cap.note && (
                              <span className="mt-0.5 block text-xs text-ink-3">{cap.note}</span>
                            )}
                          </span>
                          <CapabilityPill value={cap.value} tone={cap.tone} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* 05 · Employee experience */}
            <section id="employee" className="scroll-mt-24 border-t border-line py-14">
              <SectionHeader index="05" label={t.employee.nav} mono={locale === "en"} />
              <h2 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">{t.employee.heading}</h2>
              <p className="mt-4 max-w-2xl leading-8 text-ink-2">{t.employee.lead}</p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {t.employee.pages.map(({ title, text }) => (
                  <div key={title} className="rounded-2xl border border-line p-6">
                    <h3 className="font-semibold text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink-2">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 06 · Additional modules */}
            <section id="modules" className="scroll-mt-24 border-t border-line py-14">
              <SectionHeader index="06" label={t.modules.nav} mono={locale === "en"} />
              <h2 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">{t.modules.heading}</h2>
              <p className="mt-4 max-w-2xl leading-8 text-ink-2">{t.modules.lead}</p>

              <div className="mt-10 space-y-12">
                {t.modules.groups.map((group) => (
                  <div key={group.name}>
                    <h3 className="text-lg font-semibold tracking-tight">{group.name}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-ink-2">{group.text}</p>
                    <div className={`mt-5 grid gap-8 ${group.shots.length > 1 ? "sm:grid-cols-2" : ""}`}>
                      {group.shots.map((shot) => (
                        <Screenshot key={shot.src} src={shot.src} title={shot.title} caption={shot.caption} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 07 · Summary */}
            <section id="summary" className="scroll-mt-24 border-t border-line py-14">
              <SectionHeader index="07" label={t.summary.nav} mono={locale === "en"} />
              <h2 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">{t.summary.heading}</h2>

              <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {t.summary.points.map(({ title, text }) => (
                  <div key={title}>
                    <h3 className="flex items-center gap-2.5 font-semibold text-ink">
                      <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-7 text-ink-2">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 08 · Gallery */}
            <section id="gallery" className="scroll-mt-24 border-t border-line py-14">
              <SectionHeader index="08" label={t.gallery.nav} mono={locale === "en"} />
              <h2 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">{t.gallery.heading}</h2>
              <p className="mt-4 max-w-2xl leading-8 text-ink-2">{t.gallery.lead}</p>
              <p className={`mt-2 text-xs text-ink-3 ${mono}`}>{t.hint}</p>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                {t.gallery.shots.map((shot) => (
                  <Screenshot key={shot.src} src={shot.src} title={shot.title} caption={shot.caption} />
                ))}
              </div>
            </section>

            {/* 09 · Live demo */}
            <section id="demo" className="scroll-mt-24 border-t border-line py-14">
              <SectionHeader index="09" label={t.demo.nav} mono={locale === "en"} />
              <h2 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">{t.demo.heading}</h2>
              <p className="mt-4 max-w-2xl leading-8 text-ink-2">{t.demo.text}</p>

              <ul className="mt-6 max-w-2xl rounded-2xl border border-line p-6">
                {t.demo.notices.map((notice) => (
                  <li key={notice} className="flex gap-2.5 text-sm leading-7 text-ink-2">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {notice}
                  </li>
                ))}
              </ul>
            </section>

            {/* Project information */}
            <section className="border-t border-line py-14">
              <h2 className="text-xl font-bold tracking-tight">{t.info.heading}</h2>
              <dl className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                {t.info.facts.map(({ label, value }) => (
                  <div key={label}>
                    <dt className={`text-xs text-ink-3 ${mono}`}>{label}</dt>
                    <dd className="mt-1 font-medium text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 max-w-3xl border-s-2 border-line-strong ps-4 text-sm leading-7 text-ink-2">
                {t.info.privacy}
              </p>
            </section>
          </div>
        </div>
      </LightboxRoot>
    </main>
  );
}

/* ---- local helpers ---- */

function CapabilityPill({ value, tone }: { value: string; tone: "full" | "limited" | "none" }) {
  const styles = {
    full: "bg-accent/10 text-accent",
    limited: "bg-ink/5 text-ink-2",
    none: "bg-surface-2 text-ink-3",
  } as const;
  const marks = { full: "✓", limited: "◐", none: "✕" } as const;

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${styles[tone]}`}
    >
      <span aria-hidden>{marks[tone]}</span>
      {value}
    </span>
  );
}

function SourceIcon({ name }: { name: string }) {
  const cls = "mx-auto size-8 text-ink-3";
  if (name === "Access")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={cls} aria-hidden>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
        <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
      </svg>
    );
  if (name === "Excel files" || name === "فایل‌های اکسل")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={cls} aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 9v12" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={cls} aria-hidden>
      <path d="M3 7l3-3h6l2 2h7v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z" />
    </svg>
  );
}