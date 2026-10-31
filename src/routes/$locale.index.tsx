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
      <section id="projects" className="portfolio-band band-projects scroll-mt-18">
        <div className="band-inner">
        <SectionLabel index="01" label={t.projects.label} mono={mono} />
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl text-3xl font-bold text-ink sm:text-4xl">
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
        </div>
      </section>

      {/* ---------- Experience ---------- */}
      <section id="experience" className="portfolio-band band-experience scroll-mt-18">
        <div className="band-inner">
        <SectionLabel index="02" label={t.experience.label} mono={mono} />
        <h2 className="mt-8 text-3xl font-bold text-ink sm:text-4xl">{t.experience.heading}</h2>

        {t.experience.items.map((job) => (
          <div key={job.company} className="mt-12 border-t border-line">
            <div className="grid gap-8 py-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
              <div className="relative">
                <div className="flex items-center gap-3">
                  {job.current && (
                    <span className="relative flex size-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                      <span className="relative inline-flex size-2.5 rounded-full bg-signal" />
                    </span>
                  )}
                  <h3 className="text-2xl font-semibold text-ink">{job.company}</h3>
                </div>
                <p className="mt-1 text-sm text-ink-3">{job.location}</p>
                <ol className="mt-8 space-y-3">
                  {job.roles.map((r) => (
                    <li
                      key={r.role}
                      className="border-s border-line-strong ps-4"
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

            <div className="border-t border-line py-8">
              <p className={`text-[11px] text-ink-3 ${mono}`}>{t.experience.selectedWorkLabel}</p>
              <ul className="mt-6 divide-y divide-line">
                {job.projects.map((project) => (
                  <li key={project.name} className="py-6 first:pt-0 last:pb-0">
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
                <p className="mt-8 border-s-2 border-line-strong ps-5 text-sm leading-7 text-ink-2">{job.footnote}</p>
              )}
            </div>
          </div>
        ))}
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section id="about" className="portfolio-band band-about scroll-mt-18">
        <div className="band-inner">
          <SectionLabel index="03" label={t.about.label} mono={mono} />
          <h2 className="mt-8 max-w-3xl text-3xl font-bold leading-tight text-ink sm:text-4xl rtl:leading-[1.4]">
            {t.about.heading}
          </h2>
          <div className="mt-8 max-w-3xl space-y-5">
            {t.about.intro.map((p, i) => (
              <p key={i} className="text-base leading-8 text-ink-2">{p}</p>
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

  return (
    <section className="portfolio-hero">
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-12 sm:pt-20">
      <div className="max-w-4xl">
        <p className={`text-sm font-medium text-signal ${mono}`}>{t.home.role}</p>
        <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.12] text-ink wrap-break-word sm:text-7xl rtl:leading-[1.4]">
          {t.home.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-2 sm:text-xl sm:leading-9">
          {t.home.tagline}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Link
            to="/$locale/projects"
            params={{ locale }}
            className="editorial-action group inline-flex items-center gap-2 border border-signal rounded-none bg-signal px-5 py-3 text-sm font-semibold text-signal-foreground transition-opacity hover:opacity-90"
          >
            {t.projects.viewAll}
            <ArrowUpRightIcon className="size-4 rtl:-scale-x-100" />
          </Link>
          <Link
            to="/$locale"
            params={{ locale }}
            hash="contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-2 transition-colors hover:text-signal"
          >
            {t.contact.label}
            <ArrowUpRightIcon className="size-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
      <div className="mt-14 border-t border-line pt-6">
        <p className={`text-xs text-ink-3 ${mono}`}>{t.home.stackLabel}</p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-4" dir="ltr">
          {t.home.stack.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <TechIcon name={item} className="size-4 shrink-0 text-ink-3" />
              <span className="text-sm text-ink-2">{item}</span>
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
    <section id="contact" className="portfolio-band band-contact scroll-mt-18">
      <div className="band-inner">
      <SectionLabel index="04" label={t.contact.label} mono={mono} />
      <div className="mt-8 border-t border-line pt-8">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">{t.contact.heading}</h2>
        <a
          href={`mailto:${email}`}
          dir="ltr"
          className="mt-6 inline-block break-all font-mono text-lg text-editorial transition-opacity hover:opacity-80 sm:text-2xl"
        >
          {email}
        </a>

        <ul className="mt-8 grid gap-6 sm:grid-cols-3">
          {channels.map(({ Icon, href, external, label, value }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-3 border-t border-line py-4 transition-colors hover:border-signal/50"
              >
                <span className="flex size-6 shrink-0 items-center justify-center text-ink-2 transition-colors group-hover:text-signal">
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
      </div>
    </section>
  );
}
