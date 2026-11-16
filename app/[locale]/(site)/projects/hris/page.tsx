import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { MergeArrows, DeployNode, DeployConnector } from "@/components/case-study/Diagrams"
import { DatabaseIcon, InfoIcon } from "@/components/icons/misc";
import Breadcrumb from "@/components/Breadcrumb";
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
    <main>
      <ScrollProgress />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <LightboxRoot shots={t.gallery.shots}>
          {/* ---------- Hero ---------- */}
          <section className="pb-14 pt-10 sm:pb-20 sm:pt-14">
            <Breadcrumb
              items={[
                { label: dict.nav.home, href: `/${locale}` },
                { label: dict.nav.projects, href: `/${locale}/projects` },
                { label: t.name },
              ]}
            />

            <p className="mt-10 inline-flex items-center gap-2.5 text-sm font-medium text-success">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              {t.badge}
            </p>

            <h1 className="mt-5 max-w-4xl font-display text-4xl font-medium leading-[1.12] tracking-tight text-ink sm:text-6xl sm:leading-[1.08]">
              {t.title}
            </h1>

            <p className="mt-7 max-w-3xl font-display text-xl leading-9 text-ink-2 sm:text-[1.4rem] sm:leading-10">{t.lead}</p>

            {/* facts strip */}
            <dl className="mt-12 grid gap-x-12 border-y border-line sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
              <div className="py-6">
                <dt className="eyebrow">{t.roleLabel}</dt>
                <dd className="mt-2 font-medium leading-6 text-ink">{t.role}</dd>
                <dd className="mt-1 text-sm text-ink-2">{t.name}</dd>
              </div>
              <div className="py-6">
                <dt className="eyebrow">{t.stackLabel.replace(/[:：]s*$/, "")}</dt>
                <dd className="mt-2.5">
                  <ul className="flex flex-wrap gap-x-5 gap-y-2">
                    {t.stack.map((tech) => (
                      <li
                        key={tech}
                        className="inline-flex items-center gap-1.5 font-sans text-sm text-ink-2"
                      >
                        <TechIcon name={tech} className="size-4 shrink-0 text-ink-3" />
                        {tech}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>

            <div className="mt-10 grid grid-cols-1 gap-8">
              {t.audience.map(({ title, text }) => (
                <div key={title} className="max-w-3xl border-s-2 border-accent ps-5">
                  <h2 className="font-semibold text-ink">{title}</h2>
                  <p className="mt-2 text-base leading-7 text-ink-2">{text}</p>
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
              <section id="problem-1" className="scroll-mt-24 border-t border-line py-12 sm:py-16">
                <SectionHeader index="01" label={t.problem1.tag} mono={locale === "en"} />
                <h2 className="mt-4 max-w-3xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl sm:leading-tight">{t.problem1.heading}</h2>
                <p className="mt-3 max-w-4xl leading-8 text-ink-2">{t.problem1.lead}</p>

                <div className="mt-5 border-s-2 border-danger bg-danger/5 px-5 py-4 sm:px-6 sm:py-5">
                  <p className="text-sm font-semibold text-danger">{t.problem1.consequenceLabel}</p>
                  <p className="mt-2 max-w-4xl leading-8 text-ink-2">{t.problem1.consequence}</p>
                </div>

                <div className="mt-5 border-s-2 border-success bg-success/5 px-5 py-4 sm:px-6 sm:py-5">
                  <p className="text-sm font-semibold text-success">{t.problem1.solutionTitle}</p>
                  <p className="mt-2 max-w-4xl leading-8 text-ink-2">{t.problem1.solutionText}</p>
                </div>

                {/* scattered sources → one unified database */}
                <div className="mx-auto mt-8 w-full max-w-md sm:max-w-lg lg:max-w-xl">
                  <ul className="grid grid-cols-3 gap-2.5 sm:gap-4">
                    {t.problem1.sources.map(({ name, note }) => (
                      <li
                        key={name}
                        className="flex items-center justify-center gap-3 rounded-lg border border-dashed border-line-strong bg-surface-2/40 p-3 text-start sm:p-4"
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

                  <div className="flex items-center justify-center gap-3 rounded-lg border border-accent/30 bg-accent/10 p-4 sm:gap-4 sm:p-5">
                    <DatabaseIcon className="size-8 shrink-0 text-accent sm:size-10" />
                    <span className="text-start">
                      <span className="block text-sm font-semibold text-ink sm:text-base">
                        {t.problem1.dbLabel}
                      </span>
                      <span className="block text-xs text-ink-2 sm:text-sm">{t.problem1.dbNote}</span>
                    </span>
                  </div>
                </div>

                <p className="mt-10 text-sm text-ink-3">{t.hint}</p>
                <div className="mt-3 space-y-10">
                  {t.problem1.shots.map((shot) => (
                    <Screenshot key={shot.src} src={shot.src} title={shot.title} caption={shot.caption} priority />
                  ))}
                </div>
              </section>

              {/* 02 · Problem 2 */}
              <section id="problem-2" className="scroll-mt-24 border-t border-line py-12 sm:py-16">
                <SectionHeader index="02" label={t.problem2.tag} mono={locale === "en"} />
                <h2 className="mt-4 max-w-3xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl sm:leading-tight">{t.problem2.heading}</h2>
                <p className="mt-4 max-w-4xl leading-8 text-ink-2">{t.problem2.lead}</p>

                <div className="mt-8 border-s-2 border-warning bg-warning/5 px-5 py-4 sm:px-6 sm:py-5">
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

                <div className="mt-6 border-s-2 border-success bg-success/5 px-5 py-4 sm:px-6 sm:py-5">
                  <p className="text-sm font-semibold text-success">{t.problem2.resultTitle}</p>
                  <p className="mt-2 max-w-3xl leading-8 text-ink-2">{t.problem2.resultText}</p>
                </div>

                <p className="mt-10 text-sm text-ink-3">{t.hint}</p>
                <div className="mt-3 space-y-8">
                  {t.problem2.shots.map((shot) => (
                    <Screenshot key={shot.src} src={shot.src} title={shot.title} caption={shot.caption} />
                  ))}
                </div>
              </section>

              {/* 03 · My role & stack */}
              <section id="role" className="scroll-mt-24 border-t border-line py-12 sm:py-16">
                <SectionHeader index="03" label={t.myRole.nav} mono={locale === "en"} />
                <h2 className="mt-4 max-w-3xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl sm:leading-tight">{t.myRole.heading}</h2>
                <p className="mt-4 max-w-2xl leading-8 text-ink-2">{t.myRole.text}</p>

                <dl className="mt-8 grid gap-x-12 sm:grid-cols-2">
                  {t.myRole.stack.map(({ label, value }) => (
                    <div key={label} className="border-t border-line py-4">
                      <dt className="eyebrow">{label}</dt>
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
              <section id="roles" className="scroll-mt-24 border-t border-line py-12 sm:py-16">
                <SectionHeader index="04" label={t.roles.nav} mono={locale === "en"} />
                <h2 className="mt-4 max-w-3xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl sm:leading-tight">{t.roles.heading}</h2>
                <p className="mt-4 max-w-2xl leading-8 text-ink-2">{t.roles.lead}</p>

                <div className="mt-8">
                  <RoleTabs label={t.roles.nav} roles={t.roles.roles} />
                </div>
              </section>

              {/* 05 · Employee experience */}
              <section id="employee" className="scroll-mt-24 border-t border-line py-12 sm:py-16">
                <SectionHeader index="05" label={t.employee.nav} mono={locale === "en"} />
                <h2 className="mt-4 max-w-3xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl sm:leading-tight">{t.employee.heading}</h2>
                <p className="mt-4 max-w-2xl leading-8 text-ink-2">{t.employee.lead}</p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {t.employee.pages.map(({ title, text }) => (
                    <div key={title} className="border-t border-line pt-5">
                      <h3 className="font-semibold text-ink">{title}</h3>
                      <p className="mt-2 text-sm leading-7 text-ink-2">{text}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 06 · Additional modules */}
              <section id="modules" className="scroll-mt-24 border-t border-line py-12 sm:py-16">
                <SectionHeader index="06" label={t.modules.nav} mono={locale === "en"} />
                <h2 className="mt-4 max-w-3xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl sm:leading-tight">{t.modules.heading}</h2>
                <p className="mt-4 max-w-2xl leading-8 text-ink-2">{t.modules.lead}</p>

                <div className="mt-10 space-y-12">
                  {t.modules.groups.map((group) => (
                    <div key={group.name}>
                      <h3 className="font-display text-2xl font-medium tracking-tight text-ink">{group.name}</h3>
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
              <section id="summary" className="scroll-mt-24 border-t border-line py-12 sm:py-16">
                <SectionHeader index="07" label={t.summary.nav} mono={locale === "en"} />
                <h2 className="mt-4 max-w-3xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl sm:leading-tight">{t.summary.heading}</h2>

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
              <section id="gallery" className="scroll-mt-24 border-t border-line py-12 sm:py-16">
                <SectionHeader index="08" label={t.gallery.nav} mono={locale === "en"} />
                <h2 className="mt-4 max-w-3xl font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl sm:leading-tight">{t.gallery.heading}</h2>
                <p className="mt-4 max-w-2xl leading-8 text-ink-2">{t.gallery.lead}</p>
                <p className="mt-2 text-sm text-ink-3">{t.hint}</p>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  {t.gallery.shots.map((shot) => (
                    <Screenshot key={shot.src} src={shot.src} title={shot.title} caption={shot.caption} />
                  ))}
                </div>
              </section>

              {/* Disclaimer */}
              <section className="border-t border-line pb-20 pt-12">
                <div className="flex max-w-3xl gap-3 border-s-2 border-warning bg-warning/5 px-5 py-4 sm:px-6 sm:py-5">
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