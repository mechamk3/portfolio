import { useState } from "react";
import { Check, ChevronDown, Copy } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { ExperienceItem } from "@/content/types";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getDictionary, monoClass, toLocale, type Locale } from "@/lib/i18n";
import { Section, StatusPill } from "@/components/site/bits";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ArrowUpRightIcon } from "@/components/icons/misc";
import { GitHubIcon, MailIcon } from "@/components/icons/socials";

const GITHUB_URL = "https://github.com/mechamk3";

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

      <Section id="projects" index="01" label={t.projects.label} mono={mono} wide>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl rtl:leading-snug">{t.projects.heading}</h2>
          <Link
            to="/$locale/projects"
            params={{ locale }}
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink-2 transition-colors hover:text-signal"
          >
            {t.projects.viewAll}
            <ArrowUpRightIcon className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {t.projects.items.slice(0, 3).map((p, i) => (
            <ProjectCard key={p.slug} project={p} locale={locale} index={i} />
          ))}
        </div>
      </Section>

      <Section id="experience" index="02" label={t.experience.label} mono={mono}>
        <h2 className="text-3xl font-bold text-ink sm:text-4xl rtl:leading-snug">{t.experience.heading}</h2>

        <div className="mt-10 space-y-6">
          {t.experience.items.map((job) => (
            <ExperienceCard key={job.company} job={job} locale={locale} />
          ))}
        </div>
      </Section>

      <Section id="about" index="03" label={t.about.label} mono={mono}>
        <h2 className="max-w-3xl text-3xl font-bold leading-tight text-ink sm:text-4xl rtl:leading-[1.4]">
          {t.about.heading}
        </h2>
        <div className="mt-8 max-w-2xl space-y-5">
          {t.about.intro.map((p, i) => (
            <p key={i} className="text-base leading-8 text-ink-2">{p}</p>
          ))}
        </div>
      </Section>


      <Contact locale={locale} />
    </main>
  );
}

function ExperienceCard({ job, locale }: { job: ExperienceItem; locale: Locale }) {
  const t = getDictionary(locale);
  const mono = monoClass(locale);
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border border-line-strong bg-surface">
      <div className="p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
          <div className="flex items-center gap-3">
            {job.current && (
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-signal" />
              </span>
            )}
            <h3 className="text-2xl font-semibold text-ink">{job.company}</h3>
          </div>
          <p className="text-sm text-ink-3">{job.location}</p>
        </div>

        <ol className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {job.roles.map((r) => (
            <li
              key={r.role}
              data-current={r.current}
              className="border-s-2 border-line-strong ps-4 data-[current=true]:border-signal"
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

      <CollapsibleTrigger className="group flex w-full cursor-pointer items-center justify-between gap-4 border-t border-line px-6 py-3.5 text-start text-sm font-medium text-ink-2 transition-colors hover:text-signal focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-signal sm:px-7">
        {open ? t.experience.hideDetails : t.experience.showDetails}
        <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>

      <CollapsibleContent className="border-t border-line data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-1">
        <div className="space-y-4 p-6 text-[15px] leading-8 text-ink-2 sm:p-7">
          {job.summary.map((p, i) => (
            <p key={i} className={i === 0 ? "text-lg text-ink" : ""}>{p}</p>
          ))}
        </div>

        <div className="border-t border-line p-6 sm:p-7">
          <p className={`text-[11px] text-ink-3 ${mono}`}>{t.experience.selectedWorkLabel}</p>
          <ul className="mt-4 divide-y divide-line">
            {job.projects.map((project) => (
              <li
                key={project.name}
                className="grid gap-4 py-6 first:pt-2 last:pb-0 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-8"
              >
                <div className="flex flex-col items-start gap-3">
                  <h4 className="text-lg font-semibold leading-snug text-ink">{project.name}</h4>
                  <StatusPill status={project.status} tone={project.tone} />
                </div>
                <div className="space-y-2.5 text-sm leading-7 text-ink-2">
                  {project.description.map((d, j) => (
                    <p key={j}>{d}</p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          {job.footnote && (
            <p className="mt-6 border-s-2 border-line-strong ps-5 text-sm leading-7 text-ink-2">{job.footnote}</p>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const mono = monoClass(locale);

  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-28 sm:pt-32 sm:pb-36">
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] text-ink wrap-break-word min-[420px]:text-5xl sm:text-6xl rtl:leading-[1.4]">
          {t.home.name}
        </h1>
        <p className={`mt-5 text-sm font-medium text-signal ${mono}`}>{t.home.role}</p>
        <p className="mt-6 max-w-xl text-lg leading-8 text-ink-2 sm:text-xl sm:leading-9">
          {t.home.tagline}
        </p>
      </div>
    </section>
  );
}

function Contact({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const mono = monoClass(locale);
  const { email, github } = t.contact.channels;
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard can be unavailable; the mailto link still works. */
    }
  };

  const card =
    "group relative flex items-center gap-4 border border-line-strong bg-surface px-5 py-4 transition-colors duration-200 hover:border-signal sm:gap-5 sm:px-6";
  const icon = "size-5 shrink-0 text-ink-3 transition-colors group-hover:text-signal";
  const label = `w-16 shrink-0 text-[11px] text-ink-3 sm:w-20 ${mono}`;
  const value = "min-w-0 flex-1 truncate pe-6 font-mono text-sm text-ink sm:text-lg";
  const arrow =
    "size-5 shrink-0 text-ink-3 transition-[color,transform] duration-200 group-hover:text-signal";
  const arrowMove =
    "group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5";

  return (
    <Section id="contact" index="04" label={t.contact.label} mono={mono}>
      <h2 className="text-3xl font-bold text-ink sm:text-4xl rtl:leading-snug">{t.contact.heading}</h2>

      <div className="mt-10 grid w-fit max-w-full gap-4">
        <button
          type="button"
          onClick={copyEmail}
          aria-label={`${copied ? t.contact.copied : t.contact.copy}: ${email.value}`}
          className={`${card} cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal`}
        >
          <MailIcon className={icon} />
          <span className={label}>{email.label}</span>
          <span dir="ltr" className={value}>
            {email.value}
          </span>
          {copied ? <Check className={`${arrow} text-success`} /> : <Copy className={arrow} />}
        </button>

        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={card}>
          <GitHubIcon className={icon} />
          <span className={label}>{github.label}</span>
          <span dir="ltr" className={value}>
            {github.value}
          </span>
          <ArrowUpRightIcon className={`${arrow} ${arrowMove}`} />
        </a>
      </div>
    </Section>
  );
}
