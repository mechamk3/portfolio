import { createFileRoute, Link } from "@tanstack/react-router";
import { getDictionary, monoClass, toLocale, type Locale } from "@/lib/i18n";
import { SectionLabel, StatusPill, TechIcon } from "@/components/site/bits";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ArrowUpRightIcon } from "@/components/icons/misc";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons/socials";

const GITHUB_URL = "https://github.com/mechamk3";
const LINKEDIN_URL = "https://linkedin.com/in/you";

export const Route = createFileRoute("/$locale/")({
  head: ({ params }) => {
    const t = getDictionary(toLocale(params.locale));
    return {
      meta: [
        { title: t.meta.title },
        { name: "description", content: t.meta.description },
        { property: "og:title", content: t.meta.title },
        { property: "og:description", content: t.meta.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Home,
});

function Home() {
  const locale = toLocale(Route.useParams().locale);
  const t = getDictionary(locale);
  const mono = monoClass(locale);

  return (
    <main className="overflow-x-clip">
      <Hero locale={locale} />

      {/* ---------- Projects ---------- */}
      <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
        <SectionLabel index="01" label={t.projects.label} mono={mono} />
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            {t.projects.heading}
          </h2>
          <Link
            to="/$locale/projects"
            params={{ locale }}
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink-2 transition-colors hover:text-signal"
          >
            {t.projects.viewAll}
            <ArrowUpRightIcon className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {t.projects.items.slice(0, 3).map((p, i) => (
            <ProjectCard key={p.slug} project={p} locale={locale} index={i} featured={i === 0} />
          ))}
        </div>
      </section>

      {/* ---------- Experience ---------- */}
      <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
        <SectionLabel index="02" label={t.experience.label} mono={mono} />
        <h2 className="mt-10 text-3xl font-bold tracking-tight text-ink sm:text-5xl">{t.experience.heading}</h2>

        {t.experience.items.map((job) => (
          <div key={job.company} className="mt-12 overflow-hidden rounded-[2rem] border border-line bg-surface/60 shadow-card backdrop-blur-md">
            <div className="relative grid gap-8 border-b border-line p-8 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              <div aria-hidden className="absolute -top-24 start-1/3 size-72 rounded-full bg-glow/10 blur-[100px]" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  {job.current && (
                    <span className="relative flex size-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                      <span className="relative inline-flex size-2.5 rounded-full bg-signal" />
                    </span>
                  )}
                  <h3 className="text-3xl font-bold tracking-tight text-ink">{job.company}</h3>
                </div>
                <p className="mt-1 text-sm text-ink-3">{job.location}</p>
                <ol className="mt-8 space-y-3">
                  {job.roles.map((r) => (
                    <li
                      key={r.role}
                      className={`rounded-2xl border p-4 ${r.current ? "border-signal/40 bg-signal/5" : "border-line bg-surface-2/40"}`}
                    >
                      <p className={`text-sm font-semibold ${r.current ? "text-ink" : "text-ink-2"}`}>
                        {!r.current && <span className="font-normal text-ink-3">{t.experience.previouslyLabel}: </span>}
                        {r.role}
                      </p>
                      <p className={`mt-1 font-mono text-xs ${r.current ? "text-signal" : "text-ink-3"}`}>{r.period}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="relative space-y-4 text-[15px] leading-8 text-ink-2 lg:pt-2">
                {job.summary.map((p, i) => (
                  <p key={i} className={i === 0 ? "text-lg leading-8 text-ink" : ""}>{p}</p>
                ))}
              </div>
            </div>

            <div className="p-8 sm:p-10">
              <p className={`text-[11px] text-ink-3 ${mono}`}>{t.experience.selectedWorkLabel}</p>
              <ul className="mt-6 divide-y divide-line">
                {job.projects.map((project, i) => (
                  <li key={project.name} className="group grid gap-4 py-7 first:pt-0 last:pb-0 sm:grid-cols-[5rem_minmax(0,1fr)]">
                    <span className="text-outline font-display text-5xl font-bold leading-none transition-colors group-hover:text-signal" dir="ltr">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="text-xl font-semibold tracking-tight text-ink">{project.name}</h4>
                        <StatusPill status={project.status} tone={project.tone} />
                      </div>
                      <div className="mt-3 space-y-2.5 text-sm leading-7 text-ink-2">
                        {project.description.map((d, j) => (
                          <p key={j}>{d}</p>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {job.footnote && (
                <p className="mt-8 rounded-2xl border border-dashed border-line-strong p-5 text-sm leading-7 text-ink-2">{job.footnote}</p>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* ---------- About ---------- */}
      <section id="about" className="relative scroll-mt-24 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel index="03" label={t.about.label} mono={mono} />
          <h2 className="mt-12 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-signal-gradient sm:text-7xl sm:leading-[1.05] rtl:leading-[1.3]">
            {t.about.heading}
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {t.about.intro.map((p, i) => (
              <div key={i} className="relative border-t border-line-strong pt-6">
                <span className="absolute -top-px start-0 h-px w-12 bg-signal" />
                <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 text-[15px] leading-8 text-ink-2">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact locale={locale} />
    </main>
  );
}

function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const mono = monoClass(locale);
  const marquee = [...t.home.stack, ...t.home.stack];
  const stack = t.home.stack;

  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-14 pb-12 sm:pt-20">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div>
          <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-3 py-1.5 font-mono text-xs text-signal">
            <span className="text-signal/60">{">"}</span>
            {t.home.role}
            <span className="h-3.5 w-1.5 animate-blink bg-signal" aria-hidden />
          </p>

          <h1 className="animate-rise mt-8 text-5xl font-bold leading-[0.95] tracking-tighter [animation-delay:80ms] wrap-break-word sm:text-6xl xl:text-7xl rtl:leading-[1.2] rtl:tracking-normal">
            {t.home.name.split(" ").map((w, i) => (
              <span key={i} className={`block ${i === 0 ? "text-gradient" : "text-signal-gradient"}`}>{w}</span>
            ))}
          </h1>

          <p className="animate-rise mt-8 max-w-xl border-s-2 border-signal/60 ps-5 text-lg leading-8 text-ink-2 [animation-delay:160ms] sm:text-xl sm:leading-9">
            {t.home.tagline}
          </p>

          <div className="animate-rise mt-10 flex flex-wrap gap-3 [animation-delay:240ms]">
            <Link
              to="/$locale/projects"
              params={{ locale }}
              className="group inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-signal-foreground shadow-signal transition-transform hover:-translate-y-0.5"
            >
              {t.projects.viewAll}
              <ArrowUpRightIcon className="size-4 transition-transform group-hover:rotate-45 rtl:-scale-x-100" />
            </Link>
            <Link
              to="/$locale"
              params={{ locale }}
              hash="contact"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-signal hover:text-signal"
            >
              {t.contact.label}
            </Link>
          </div>
        </div>

        {/* orbit of the tech stack around a monogram */}
        <div className="animate-rise relative mx-auto aspect-square w-full max-w-md [animation-delay:320ms]" dir="ltr" aria-hidden>
          <div className="absolute inset-[18%] rounded-full bg-signal/15 blur-[80px]" />
          <div className="absolute inset-0 rounded-full border border-line" />
          <div className="absolute inset-[16%] rounded-full border border-dashed border-line-strong" />
          <div className="absolute inset-[32%] flex items-center justify-center rounded-full border border-signal/40 bg-surface/80 shadow-signal backdrop-blur-md">
            <span className="font-display text-5xl font-bold text-signal-gradient">MT</span>
          </div>
          <div className="absolute inset-0 animate-orbit [--orbit-speed:60s]">
            {stack.map((s, i) => {
              const a = (i / stack.length) * Math.PI * 2;
              return (
                <span
                  key={s}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${50 + 50 * Math.cos(a)}%`, top: `${50 + 50 * Math.sin(a)}%` }}
                >
                  <span className="flex size-12 animate-counter-orbit items-center justify-center rounded-2xl border border-line-strong bg-surface shadow-card [--orbit-speed:60s]">
                    <TechIcon name={s} className="size-6 text-ink-2" />
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* stack marquee */}
      <div className="mt-20">
        <p className={`text-xs text-ink-3 ${mono}`}>{t.home.stackLabel}</p>
        <div className="relative mt-5 overflow-hidden mask-[linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]" dir="ltr">
          <ul className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
            {marquee.map((item, i) => (
              <li
                key={`${item}-${i}`}
                aria-hidden={i >= t.home.stack.length}
                className="group flex items-center gap-3 rounded-2xl border border-line bg-surface/60 px-5 py-3 backdrop-blur-sm"
              >
                <TechIcon name={item} className="size-6 shrink-0 text-ink-2" />
                <span className="whitespace-nowrap text-sm text-ink-2 group-hover:text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const mono = monoClass(locale);
  const email = t.contact.channels.email.value;
  const channels = [
    { Icon: MailIcon, href: `mailto:${email}`, external: false, ...t.contact.channels.email },
    { Icon: GitHubIcon, href: GITHUB_URL, external: true, ...t.contact.channels.github },
    { Icon: LinkedInIcon, href: LINKEDIN_URL, external: true, ...t.contact.channels.linkedin },
  ];

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-20 pb-28">
      <SectionLabel index="04" label={t.contact.label} mono={mono} />
      <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-line bg-surface/70 p-8 shadow-card backdrop-blur-md sm:p-14">
        <div aria-hidden className="absolute -top-32 end-0 size-96 rounded-full bg-signal/15 blur-[120px]" />
        <h2 className="relative text-4xl font-bold tracking-tight text-ink sm:text-6xl">{t.contact.heading}</h2>
        <a
          href={`mailto:${email}`}
          dir="ltr"
          className="relative mt-6 inline-block break-all font-mono text-lg text-signal-gradient transition-opacity hover:opacity-80 sm:text-2xl"
        >
          {email}
        </a>

        <ul className="relative mt-12 grid gap-3 sm:grid-cols-3">
          {channels.map(({ Icon, href, external, label, value }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-surface-2/60 p-4 transition-all hover:-translate-y-0.5 hover:border-signal/50"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-canvas text-ink-2 transition-colors group-hover:text-signal">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-ink">{label}</span>
                  <span className="mt-0.5 block truncate text-xs text-ink-3" dir="ltr">
                    {value}
                  </span>
                </span>
                <ArrowUpRightIcon className="size-4 shrink-0 text-ink-3 transition-all group-hover:text-signal rtl:-scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
