import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, monoClass } from "@/lib/i18n";
import { MergeArrows, DeployNode, DeployConnector } from "@/components/case-study/Diagrams"
import { DatabaseIcon, ChevronIcon, InfoIcon } from "@/components/icons/misc";
import TechIcon from "@/components/TechIcon";
import SectionHeader from "@/components/SectionHeader";
import ScrollProgress from "@/components/case-study/ScrollProgress";
import Toc from "@/components/case-study/Toc";
import Screenshot from "@/components/case-study/Screenshot";
import { getHrisContent } from "@/content/hris";
import LightboxRoot from "@/components/case-study/Lightbox";
import RoleTabs from "@/components/case-study/RoleTabs";

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
  const dict = getDictionary(locale);

  const tocItems = [
    { id: "problem-1", label: t.problem1.nav },
    { id: "problem-2", label: t.problem2.nav },
    { id: "role", label: t.myRole.nav },
    { id: "roles", label: t.roles.nav },
    { id: "employee", label: t.employee.nav },
    { id: "modules", label: t.modules.nav },
    { id: "summary", label: t.summary.nav },
    { id: "gallery", label: t.gallery.nav },
  ];

  return (
    <main className="relative overflow-x-clip select-none">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-16 -z-10 h-241 mask-[linear-gradient(to_bottom,#000_55%,transparent_100%)]"
      >
        <div className="dot-grid absolute inset-0 mask-[radial-gradient(ellipse_70%_65%_at_50%_0%,#000_55%,transparent_100%)]" />
        <div className="absolute left-1/2 -top-45 h-100 w-[min(640px,100vw)] -translate-x-1/2 rounded-full bg-accent/15 blur-[110px] dark:bg-accent/10" />
        <div className="grain absolute inset-0 opacity-[0.05] dark:opacity-[0.08]" />
      </div>

      <ScrollProgress />

      <div className="mx-auto w-full max-w-6xl px-6">
        {/* ---------- Hero ---------- */}
        <LightboxRoot shots={t.gallery.shots}>
          <section className="pb-10 pt-1">

            <nav aria-label="Breadcrumb" className={`mt-10 text-xs ${mono}`}>
              <ol className="flex items-center gap-2 text-ink-3">
                <li className="shrink-0">
                  <Link href={`/${locale}`} className="transition-colors hover:text-ink">
                    {dict.nav.home}
                  </Link>
                </li>
                <li aria-hidden="true" className="shrink-0 text-ink-3/60">
                  <ChevronIcon />
                </li>
                <li className="shrink-0">
                  <Link href={`/${locale}/projects`} className="transition-colors hover:text-ink">
                    {dict.nav.projects}
                  </Link>
                </li>
                <li aria-hidden="true" className="shrink-0 text-ink-3/60">
                  <ChevronIcon />
                </li>
                <li aria-current="page" className="min-w-0 truncate text-ink-2">
                  {t.name}
                </li>
              </ol>
            </nav>

            <p className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-success/30 bg-success/10 px-3.5 py-1.5 text-xs font-medium text-success">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
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

            <p className={`mt-6 text-xs text-ink-2 ${mono}`}>{t.stackLabel}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {t.stack.map((tech) => (
                <li
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-2 px-2.5 py-1 text-xs text-ink-2"
                >
                  <TechIcon name={tech} className="size-3.5 shrink-0" />
                  <span className={mono}>{tech}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-5 grid-cols-1">
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
              <section id="problem-1" className="scroll-mt-16 border-line pb-6 pt-3">
                <SectionHeader index="01" label={t.problem1.tag} mono={locale === "en"} />
                <h2 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">{t.problem1.heading}</h2>
                <p className="mt-3 max-w-4xl leading-8 text-ink-2">{t.problem1.lead}</p>

                <div className="mt-5 rounded-xl border-s-4 border-danger bg-danger/5 p-5">
                  <p className="text-sm font-semibold text-danger">{t.problem1.consequenceLabel}</p>
                  <p className="mt-2 max-w-4xl leading-8 text-ink-2">{t.problem1.consequence}</p>
                </div>

                <div className="mt-5 rounded-xl border-s-4 border-success bg-success/5 p-5">
                  <p className="text-sm font-semibold text-success">{t.problem1.solutionTitle}</p>
                  <p className="mt-2 max-w-4xl leading-8 text-ink-2">{t.problem1.solutionText}</p>
                </div>

                {/* scattered sources → one unified database */}
                <div className="mx-auto mt-8 w-full max-w-md sm:max-w-lg lg:max-w-xl">
                  <ul className="grid grid-cols-3 gap-2.5 sm:gap-4">
                    {t.problem1.sources.map(({ name, note }) => (
                      <li
                        key={name}
                        className="flex items-center justify-center gap-3 rounded-2xl border border-dashed border-line-strong bg-surface-2/40 p-3 text-start sm:p-4"
                      >
                        <SourceIcon name={name} />
                        <span className="min-w-0">
                          <span className="block text-[11px] font-medium leading-4 text-ink">
                            {name}
                          </span>
                          <span className="mt-0.5 block text-[10px] leading-3.5 text-ink-2">
                            {note}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  <MergeArrows className="h-10 w-full text-ink-3 sm:h-14" />

                  <div className="flex items-center justify-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-4 sm:gap-4 sm:p-5">
                    <DatabaseIcon className="size-8 shrink-0 text-accent sm:size-10" />
                    <span className="text-start">
                      <span className="block text-sm font-semibold text-ink sm:text-base">
                        {t.problem1.dbLabel}
                      </span>
                      <span className="block text-xs text-ink-2 sm:text-sm">{t.problem1.dbNote}</span>
                    </span>
                  </div>
                </div>

                <p className={`mt-10 text-xs text-ink-3 ${mono}`}>{t.hint}</p>
                <div className="mt-3 space-y-10">
                  {t.problem1.shots.map((shot) => (
                    <Screenshot key={shot.src} src={shot.src} title={shot.title} caption={shot.caption} priority />
                  ))}
                </div>
              </section>

              {/* 02 · Problem 2 */}
              <section id="problem-2" className="scroll-mt-16 border-line py-6">
                <SectionHeader index="02" label={t.problem2.tag} mono={locale === "en"} />
                <h2 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">{t.problem2.heading}</h2>
                <p className="mt-4 max-w-4xl leading-8 text-ink-2">{t.problem2.lead}</p>

                <div className="mt-8 rounded-xl border-s-4 border-warning bg-warning/5 p-5">
                  <p className="text-sm font-semibold text-warning">{t.problem2.orderNoteTitle}</p>
                  <p className="mt-2 max-w-4xl leading-8 text-ink-2">{t.problem2.orderNote}</p>
                </div>

                <ol className="mt-8">
                  {t.problem2.steps.map((step, i) => {
                    const last = i === t.problem2.steps.length - 1;
                    return (
                      <li key={step.title} className={`relative flex gap-4 sm:gap-5 ${last ? "" : "pb-8"}`}>
                        {!last && (
                          <span
                            aria-hidden
                            className="absolute top-8 bottom-0 inset-s-4 border-s border-dashed border-line-strong"
                          />
                        )}
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-sm font-medium text-canvas">
                          {i + 1}
                        </span>
                        <div className="min-w-0 pt-1">
                          <p className="font-semibold text-ink">
                            {step.title}
                            <span className="ms-3 rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-ink-2">
                              {step.who}
                            </span>
                          </p>
                          <p className="mt-1.5 max-w-3xl text-sm leading-7 text-ink-2">{step.text}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-6 rounded-xl border-s-4 border-success bg-success/5 p-5">
                  <p className="text-sm font-semibold text-success">{t.problem2.resultTitle}</p>
                  <p className="mt-2 max-w-3xl leading-8 text-ink-2">{t.problem2.resultText}</p>
                </div>

                <p className={`mt-10 text-xs text-ink-3 ${mono}`}>{t.hint}</p>
                <div className="mt-3 space-y-8">
                  {t.problem2.shots.map((shot) => (
                    <Screenshot key={shot.src} src={shot.src} title={shot.title} caption={shot.caption} />
                  ))}
                </div>
              </section>

              {/* 03 · My role & stack */}
              <section id="role" className="scroll-mt-16 border-line py-6">
                <SectionHeader index="03" label={t.myRole.nav} mono={locale === "en"} />
                <h2 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">{t.myRole.heading}</h2>
                <p className="mt-4 max-w-2xl leading-8 text-ink-2">{t.myRole.text}</p>

                <dl className="mt-8 grid gap-x-10 gap-y-5 border-line sm:grid-cols-2">
                  {t.myRole.stack.map(({ label, value }) => (
                    <div key={label}>
                      <dt className={`text-xs text-ink-3 ${mono}`}>{label}</dt>
                      <dd className="mt-1 font-medium text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mx-auto mt-12 w-full max-w-sm">
                  <DeployNode title={t.myRole.deploy[0].node} note={t.myRole.deploy[0].note} />

                  <DeployConnector label="https · :443" />

                  <DeployNode title={t.myRole.deploy[1].node} note={t.myRole.deploy[1].note} />

                  {/* nginx routes: / → frontend · /api → backend */}
                  <div className="relative pt-2">
                    <span
                      aria-hidden
                      className="absolute inset-s-1/2 top-0 h-2 border-s border-dashed border-line-strong"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-x-1/4 top-2 border-t border-dashed border-line-strong"
                    />
                    <div className="grid grid-cols-2 gap-x-4">
                      <div className="flex flex-col items-center">
                        <span aria-hidden className="h-3 border-s border-dashed border-line-strong" />
                        <span className="mt-1 font-mono text-[10px] leading-none text-ink-3">/</span>
                        <DeployNode
                          className="mt-1.5"
                          title={t.myRole.deploy[2].node}
                          note={t.myRole.deploy[2].note}
                        />
                      </div>

                      <div className="flex flex-col items-center">
                        <span aria-hidden className="h-3 border-s border-dashed border-line-strong" />
                        <span className="mt-1 font-mono text-[10px] leading-none text-ink-3">/api</span>
                        <DeployNode
                          className="mt-1.5"
                          title={t.myRole.deploy[3].node}
                          note={t.myRole.deploy[3].note}
                        />
                        <DeployConnector label="read · write" />
                        <DeployNode title={t.myRole.deploy[4].node} note={t.myRole.deploy[4].note} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 04 · Roles & permissions */}
              <section id="roles" className="scroll-mt-16 border-line py-6">
                <SectionHeader index="04" label={t.roles.nav} mono={locale === "en"} />
                <h2 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">{t.roles.heading}</h2>
                <p className="mt-4 max-w-2xl leading-8 text-ink-2">{t.roles.lead}</p>

                <div className="mt-8">
                  <RoleTabs label={t.roles.nav} roles={t.roles.roles} />
                </div>
              </section>

              {/* 05 · Employee experience */}
              <section id="employee" className="scroll-mt-16 border-line py-6">
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
              <section id="modules" className="scroll-mt-16 border-line py-6">
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
              <section id="summary" className="scroll-mt-16 border-line py-6">
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
              <section id="gallery" className="scroll-mt-16 border-line py-6">
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

              {/* Disclaimer */}
              <section className="border-line pt-6 pb-14">
                <div className="flex max-w-3xl gap-3 rounded-xl border-s-4 border-warning bg-warning/5 p-5">
                  <InfoIcon className="mt-1 size-4 shrink-0 text-warning" />
                  <p className="text-sm leading-7 text-ink-2">{t.info.privacy}</p>
                </div>
              </section>
            </div>
          </div>
        </LightboxRoot>
      </div>
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
  const cls = "size-8 shrink-0 text-ink-3";
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