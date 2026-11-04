import { createFileRoute, Link } from "@tanstack/react-router";
import { getDictionary, getHrisContent, monoClass, toLocale } from "@/lib/i18n";
import { SectionLabel, TechIcon } from "@/components/site/bits";
import { ChevronIcon, InfoIcon } from "@/components/icons/misc";
import { LightboxRoot, Screenshot } from "@/components/case-study/Lightbox";
import {
  Callout,
  Diagram,
  RoleTabs,
  ScrollProgress,
  Toc,
} from "@/components/case-study/parts";

export const Route = createFileRoute("/$locale/projects/hris")({
  head: ({ params }) => {
    const t = getHrisContent(toLocale(params.locale));
    return {
      meta: [
        { title: t.meta.title },
        { name: "description", content: t.meta.description },
        { property: "og:title", content: t.meta.title },
        { property: "og:description", content: t.meta.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: HrisCaseStudy,
});

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-8 text-2xl font-bold tracking-tight text-ink sm:text-4xl">{children}</h2>;
}
function Lead({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 max-w-3xl leading-8 text-ink-2">{children}</p>;
}

function HrisCaseStudy() {
  const locale = toLocale(Route.useParams().locale);
  const t = getHrisContent(locale);
  const dict = getDictionary(locale);
  const mono = monoClass(locale);

  const toc = [
    { id: "problem-1", label: t.problem1.nav },
    { id: "problem-2", label: t.problem2.nav },
    { id: "role", label: t.myRole.nav },
    { id: "roles", label: t.roles.nav },
    { id: "employee", label: t.employee.nav },
    { id: "modules", label: t.modules.nav },
    { id: "summary", label: t.summary.nav },
    { id: "gallery", label: t.gallery.nav },
  ];
  const section = "scroll-mt-28 py-5";

  return (
    <main className="mx-auto max-w-6xl px-6 pb-24">
      <ScrollProgress />
      <LightboxRoot shots={t.gallery.shots}>
        {/* ---------- Hero ---------- */}
        <section className="pt-14 pb-10">
          <nav aria-label="Breadcrumb" className={`text-xs ${mono}`}>
            <ol className="flex items-center gap-2 text-ink-3">
              <li className="shrink-0">
                <Link to="/$locale" params={{ locale }} className="hover:text-ink">{dict.nav.home}</Link>
              </li>
              <li aria-hidden><ChevronIcon /></li>
              <li className="shrink-0">
                <Link to="/$locale/projects" params={{ locale }} className="hover:text-ink">{dict.nav.projects}</Link>
              </li>
              <li aria-hidden><ChevronIcon /></li>
              <li aria-current="page" className="min-w-0 truncate text-ink-2">HRIS</li>
            </ol>
          </nav>

          <p className="animate-rise mt-10 inline-flex items-center gap-2.5 rounded-none border border-success/30 bg-success/10 px-3.5 py-1.5 text-xs font-medium text-success">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            {t.badge}
          </p>

          <h1 className="animate-rise mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-gradient [animation-delay:80ms] sm:text-6xl sm:leading-[1.1]">
            {t.title}
          </h1>
          <p className="animate-rise mt-5 text-sm font-medium text-signal [animation-delay:120ms]">
            {t.name} · {t.roleLabel}: {t.role}
          </p>
          <p className="animate-rise mt-6 max-w-3xl text-lg leading-8 text-ink-2 [animation-delay:160ms]">{t.lead}</p>

          <div className="animate-rise mt-8 flex flex-wrap items-center gap-2 [animation-delay:200ms]">
            <span className="me-2 text-xs text-ink-3">{t.stackLabel}</span>
            {t.stack.map((tech) => (
              <span key={tech} className="group inline-flex items-center gap-1.5 rounded-none border border-line bg-surface-2/70 px-3 py-1 text-xs text-ink-2">
                <TechIcon name={tech} className="size-3.5 shrink-0" />
                <span dir="ltr">{tech}</span>
              </span>
            ))}
          </div>

          {t.audience.map(({ title, text }) => (
            <div key={title} className="mt-10 rounded-none border border-line bg-surface/60 p-6 shadow-card sm:p-8">
              <h2 className="font-semibold text-ink">{title}</h2>
              <p className="mt-2 leading-8 text-ink-2">{text}</p>
            </div>
          ))}
        </section>

        <div className="lg:grid lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-14">
          <aside>
            <Toc label={t.tocLabel} items={toc} />
          </aside>

          <div className="min-w-0">
            {/* 01 */}
            <section id="problem-1" className={section}>
              <SectionLabel index="01" label={t.problem1.tag} mono={mono} />
              <H2>{t.problem1.heading}</H2>
              <Lead>{t.problem1.lead}</Lead>
              <Callout tone="danger" title={t.problem1.consequenceLabel}>{t.problem1.consequence}</Callout>
              <Callout tone="success" title={t.problem1.solutionTitle}>{t.problem1.solutionText}</Callout>

              <Diagram
                src="/projects/hris/scattered_sources_to_single_source.webp"
                alt={t.problem1.diagramAlt}
                width={1879}
                height={999}
                className="mx-auto mt-10 max-w-3xl"
              />

              <p className="mt-12 text-xs text-ink-3">{t.hint}</p>
              <div className="mt-4 space-y-10">
                {t.problem1.shots.map((s) => <Screenshot key={s.src} {...s} />)}
              </div>
            </section>

            {/* 02 */}
            <section id="problem-2" className={section}>
              <SectionLabel index="02" label={t.problem2.tag} mono={mono} />
              <H2>{t.problem2.heading}</H2>
              <Lead>{t.problem2.lead}</Lead>
              <Callout tone="warning" title={t.problem2.orderNoteTitle}>{t.problem2.orderNote}</Callout>

              <ol className="mt-10">
                {t.problem2.steps.map((step, i) => {
                  const last = i === t.problem2.steps.length - 1;
                  return (
                    <li key={step.title} className={`relative flex gap-5 ${last ? "" : "pb-8"}`}>
                      {!last && <span aria-hidden className="absolute inset-s-4 top-9 bottom-0 border-s border-dashed border-line-strong" />}
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-none bg-signal font-mono text-sm font-bold text-signal-foreground">
                        {i + 1}
                      </span>
                      <div className="min-w-0 pt-1">
                        <p className="font-semibold text-ink">
                          {step.title}
                          <span className="ms-3 rounded-none border border-line bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-ink-2">{step.who}</span>
                        </p>
                        <p className="mt-1.5 max-w-3xl text-sm leading-7 text-ink-2">{step.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <Callout tone="success" title={t.problem2.resultTitle}>{t.problem2.resultText}</Callout>

              <p className="mt-12 text-xs text-ink-3">{t.hint}</p>
              <div className="mt-4 space-y-10">
                {t.problem2.shots.map((s) => <Screenshot key={s.src} {...s} />)}
              </div>
            </section>

            {/* 03 */}
            <section id="role" className={section}>
              <SectionLabel index="03" label={t.myRole.nav} mono={mono} />
              <H2>{t.myRole.heading}</H2>
              <Lead>{t.myRole.text}</Lead>

              <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
                <dl className="grid gap-3">
                  {t.myRole.stack.map(({ label, value }) => (
                    <div key={label} className="rounded-none border border-line bg-surface/60 p-4">
                      <dt className="text-xs text-ink-3">{label}</dt>
                      <dd className="mt-1 font-medium text-ink" dir="ltr">{value}</dd>
                    </div>
                  ))}
                </dl>

                <Diagram
                  src="/projects/hris/deployment.webp"
                  alt={t.myRole.diagramAlt}
                  width={1878}
                  height={1685}
                  className="mx-auto w-full max-w-md"
                />
              </div>
            </section>

            {/* 04 */}
            <section id="roles" className={section}>
              <SectionLabel index="04" label={t.roles.nav} mono={mono} />
              <H2>{t.roles.heading}</H2>
              <Lead>{t.roles.lead}</Lead>
              <div className="mt-8">
                <RoleTabs label={t.roles.nav} roles={t.roles.roles} />
              </div>
            </section>

            {/* 05 */}
            <section id="employee" className={section}>
              <SectionLabel index="05" label={t.employee.nav} mono={mono} />
              <H2>{t.employee.heading}</H2>
              <Lead>{t.employee.lead}</Lead>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {t.employee.pages.map(({ title, text }, i) => (
                  <div key={title} className="rounded-none border border-line bg-surface/60 p-6 transition-colors hover:border-signal/40">
                    <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 font-semibold text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink-2">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 06 */}
            <section id="modules" className={section}>
              <SectionLabel index="06" label={t.modules.nav} mono={mono} />
              <H2>{t.modules.heading}</H2>
              <Lead>{t.modules.lead}</Lead>
              <div className="mt-10 space-y-14">
                {t.modules.groups.map((g) => (
                  <div key={g.name}>
                    <h3 className="text-xl font-semibold tracking-tight text-ink">{g.name}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-2">{g.text}</p>
                    <div className={`mt-6 grid gap-8 ${g.shots.length > 1 ? "sm:grid-cols-2" : ""}`}>
                      {g.shots.map((s) => <Screenshot key={s.src} {...s} />)}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 07 */}
            <section id="summary" className={section}>
              <SectionLabel index="07" label={t.summary.nav} mono={mono} />
              <H2>{t.summary.heading}</H2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {t.summary.points.map(({ title, text }) => (
                  <div key={title} className="rounded-none border border-line bg-surface/60 p-5">
                    <h3 className="flex items-center gap-2.5 font-semibold text-ink">
                      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-signal" />
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-7 text-ink-2">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 08 */}
            <section id="gallery" className={section}>
              <SectionLabel index="08" label={t.gallery.nav} mono={mono} />
              <H2>{t.gallery.heading}</H2>
              <Lead>{t.gallery.lead}</Lead>
              <p className="mt-2 text-xs text-ink-3">{t.hint}</p>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                {t.gallery.shots.map((s) => <Screenshot key={s.src} {...s} />)}
              </div>
            </section>

            <section className="pt-10">
              <div className="flex max-w-3xl gap-3 rounded-none border-s-4 border-warning bg-warning/5 p-5">
                <InfoIcon className="mt-1 size-4 shrink-0 text-warning" />
                <p className="text-sm leading-7 text-ink-2">{t.info.privacy}</p>
              </div>
            </section>
          </div>
        </div>
      </LightboxRoot>
    </main>
  );
}
