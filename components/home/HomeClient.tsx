"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Dictionary } from "@/dictionaries/en";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import SectionHeader from "@/components/SectionHeader";
import SectionTabs, { type TabId } from "@/components/home/SectionTabs";
import TechIcon from "@/components/TechIcon";
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon, MailIcon, FileTextIcon, DownloadIcon } from "@/components/icons";

const TAB_IDS: TabId[] = ["work", "experience", "about", "contact"];
const GITHUB_URL = "https://github.com/you";
const LINKEDIN_URL = "https://linkedin.com/in/you";

type PanelProps = { t: Dictionary; locale: string; mono: string };

export default function HomeClient({ t, locale, mono }: PanelProps) {
  const [tab, setTab] = useState<TabId>("work");
  const contentRef = useRef<HTMLDivElement>(null);

  // Deep links & back/forward: /en#contact opens the contact tab
  useEffect(() => {
    const apply = () => {
      const hash = window.location.hash.slice(1);
      if (!(TAB_IDS as string[]).includes(hash)) return;
      setTab(hash as TabId);
      requestAnimationFrame(() =>
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const select = useCallback((next: TabId) => {
    setTab(next);
    history.replaceState(null, "", `#${next}`);
    requestAnimationFrame(() => {
      const el = contentRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top < 64 || top > window.innerHeight * 0.65) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, []);

  const tabs = [
    { id: "work" as const, index: "01", label: t.projects.label },
    { id: "experience" as const, index: "02", label: t.experience.label },
    { id: "about" as const, index: "03", label: t.about.label },
    { id: "contact" as const, index: "04", label: t.contact.label },
  ];

  return (
    <main className="relative overflow-x-clip">
      {/* ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-64px] -z-10 h-[964px] mask-[linear-gradient(to_bottom,#000_55%,transparent_100%)]"
      >
        <div className="dot-grid absolute inset-0 mask-[radial-gradient(ellipse_70%_65%_at_50%_0%,#000_55%,transparent_100%)]" />
        <div className="absolute left-1/2 top-[-180px] h-[400px] w-[min(640px,100vw)] -translate-x-1/2 rounded-full bg-accent/15 blur-[110px] dark:bg-accent/10" />
        <div className="grain absolute inset-0 opacity-[0.05] dark:opacity-[0.08]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12">
          {/* ============ hero (col 1, row 1) ============ */}
          <section className="pt-12 lg:col-start-1 lg:row-start-1">
            <h1 className="animate-rise [animation-delay:80ms] wrap-break-word bg-linear-to-b from-ink to-accent bg-clip-text text-4xl font-bold leading-[1.15] tracking-tight text-transparent sm:text-6xl">
              {t.home.name}
            </h1>

            <p className={`animate-rise [animation-delay:160ms] mt-5 flex items-center gap-3 text-sm font-medium text-accent ${mono}`}>
              <span aria-hidden className="h-px w-10 bg-linear-to-r from-accent to-transparent rtl:bg-linear-to-l" />
              {t.home.role}
            </p>

            <p className="animate-rise [animation-delay:240ms] mt-5 max-w-xl text-base leading-8 text-ink-2 sm:text-lg">
              {t.home.tagline}
            </p>

            <div className="animate-rise [animation-delay:400ms] mt-7">
              <p className={`text-xs text-ink-3 ${mono}`}>{t.home.stackLabel}</p>
              <ul className="mt-3.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {t.home.stack.map((item) => (
                  <li
                    key={item}
                    className="group flex items-center gap-2.5 rounded-lg border border-line bg-surface/60 px-2.5 py-1.5 transition-colors duration-200 hover:border-line-strong"
                  >
                    <TechIcon name={item} className="size-4 shrink-0 text-ink-3" />
                    <span className="text-[13px] text-ink-2 transition-colors duration-200 group-hover:text-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ============ tab rail (col 2, spans rows; sticky on desktop) ============ */}
          <aside className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            {/* mobile pill — between hero and content */}
            <div className="pt-8 pb-6 lg:hidden">
              <SectionTabs tabs={tabs} active={tab} onSelect={select} />
            </div>

            {/* desktop rail — spacer aligns it with the hero, then it sticks */}
            <div className="hidden lg:block">
              <div aria-hidden className="h-36" />
              <nav className="sticky top-24">
                <SectionTabs tabs={tabs} active={tab} onSelect={select} />
              </nav>
            </div>
          </aside>

          {/* ============ active panel (col 1, row 2) ============ */}
          <div ref={contentRef} className="scroll-mt-24 pb-12 lg:col-start-1 lg:row-start-2">
            {/* key={tab} replays the entrance on every switch */}
            <div
              key={tab}
              role="tabpanel"
              className="animate-rise border-line"
            >
              {tab === "work" && <WorkPanel t={t} locale={locale} mono={mono} />}
              {tab === "experience" && <ExperiencePanel t={t} locale={locale} mono={mono} />}
              {tab === "about" && <AboutPanel t={t} locale={locale} mono={mono} />}
              {tab === "contact" && <ContactPanel t={t} locale={locale} mono={mono} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ================= 01 · Work ================= */

function WorkPanel({ t, locale, mono }: PanelProps) {
  const featured = t.projects.items[0];
  if (!featured) return null;

  return (
    <div>
      <SectionHeader label={t.projects.label} mono={locale === "en"} />

      <SpotlightCard className="group relative mt-7 overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_1px_2px_rgba(13,19,33,0.06),0_20px_48px_-20px_rgba(13,19,33,0.18)] transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(13,19,33,0.06),0_28px_64px_-20px_rgba(13,19,33,0.25)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_20px_48px_-20px_rgba(0,0,0,0.6)]">
        {featured.slug && (
          <Link
            href={`/${locale}/projects/${featured.slug}`}
            aria-label={featured.name}
            className="after:absolute after:inset-0 after:z-10 focus-visible:after:ring-2 focus-visible:after:ring-accent"
          />
        )}

        {featured.cover && (
          <div className="border-b border-line">
            <div className="flex h-11 items-center justify-center border-b border-line bg-linear-to-b from-surface-2/70 to-surface-2/40 px-4">
              <span className="inline-flex max-w-[80%] items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1 shadow-sm">
                <i className="size-2 shrink-0 rounded-[3px] bg-accent" aria-hidden />
                <span className={`truncate font-mono text-[11px] text-ink-2 ${mono}`}>
                  {featured.name}
                </span>
              </span>
            </div>
            <div className="overflow-hidden">
              <Image
                src={featured.cover}
                alt={featured.name}
                width={1600}
                height={1000}
                priority
                sizes="(min-width: 1100px) 820px, 100vw"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{featured.name}</h2>
              <p className="mt-1.5 text-sm text-ink-2">{featured.tagline}</p>
            </div>
            <ArrowUpRightIcon className="mt-1 size-5 shrink-0 text-ink-3 transition-all duration-200 group-hover:translate-x-1 group-hover:text-ink rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
          </div>

          <ul className="mt-5 flex flex-wrap gap-2">
            {featured.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-ink-2"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </SpotlightCard>

      <div className="mt-6 flex items-center gap-5 rounded-2xl border border-dashed border-line-strong px-6 py-6 sm:px-8">
        <span className="font-mono text-sm text-accent/70">02</span>
        <div>
          <p className={`text-xs font-medium text-ink-3 ${mono}`}>{t.projects.moreLabel}</p>
          <p className="mt-1 max-w-md text-sm leading-6 text-ink-2">{t.projects.moreText}</p>
        </div>
      </div>

      <Link
        href={`/${locale}/projects`}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 underline-offset-4 transition-colors hover:text-ink hover:underline"
      >
        {t.projects.viewAll}
        <ArrowUpRightIcon className="size-4 rtl:-scale-x-100" />
      </Link>
    </div>
  );
}

/* ================= 02 · Experience ================= */

function ExperiencePanel({ t, mono }: PanelProps) {
  return (
    <div>
      <SectionHeader label={t.experience.label} mono={mono !== ""} />

      <ol className="relative mt-7 border-s border-line ps-8">
        {t.experience.items.map((job, i) => (
          <li key={job.company} className="relative pb-10 last:pb-0">
            {/* dot centered on the spine: ps-8 (32px) + half dot (6px) → -start-[38px] */}
            <span aria-hidden className="absolute -start-[38px] top-1 flex size-3">
              {job.current && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              )}
              <span
                className={`relative inline-flex size-3 rounded-full ring-4 ring-canvas ${job.current ? "bg-accent" : "bg-line-strong"
                  }`}
              />
            </span>

            <Reveal delay={i * 80}>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{job.company}</h3>
                <span className="text-sm text-ink-3">{job.location}</span>
              </div>

              <div className="mt-2.5 space-y-1.5">
                {job.roles.map((r) => (
                  <p key={r.role} className="flex flex-wrap items-baseline gap-x-3 text-sm">
                    <span className={`font-medium ${r.current ? "text-ink" : "text-ink-2"}`}>
                      {!r.current && <span className="italic">{t.experience.previouslyLabel}· </span>}
                      {r.role}
                    </span>
                    <span className={`font-mono text-xs ${r.current ? "text-accent" : "text-ink-3"}`}>
                      {r.period}
                    </span>
                  </p>
                ))}
              </div>

              <div className="mt-4 max-w-2xl space-y-3.5 text-[15px] leading-7 text-ink-2">
                {job.summary.map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </div>

              <p className={`mt-7 text-[11px] text-ink-3 ${mono}`}>
                {t.experience.selectedWorkLabel}
              </p>
              <ul className="mt-1.5 divide-y divide-line">
                {job.projects.map((project) => (
                  <li key={project.name} className="py-4">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <h4 className="text-sm font-semibold tracking-tight text-ink">{project.name}</h4>
                      <StatusPill status={project.status} tone={project.tone} />
                    </div>
                    <div className="mt-1.5 max-w-2xl space-y-2.5 text-sm leading-6 text-ink-2">
                      {project.description.map((paragraph, j) => (
                        <p key={j}>{paragraph}</p>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>

              {job.footnote && (
                <p className="mt-5 max-w-2xl border-s-2 border-accent/40 ps-4 text-sm leading-6 text-ink-2">
                  {job.footnote}
                </p>
              )}
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ================= 03 · About ================= */

function AboutPanel({ t, locale }: PanelProps) {
  return (
    <div>
      <SectionHeader label={t.about.label} mono={locale === "en"} />

      <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div>
          <h2 className="text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
            {t.about.heading}
          </h2>
          <span
            aria-hidden
            className="mt-5 block h-px w-16 bg-linear-to-r from-accent to-transparent rtl:bg-linear-to-l"
          />
        </div>

        <div className="space-y-5 text-[15px] leading-8 text-ink-2 sm:text-base">
          {t.about.intro.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= 04 · Contact ================= */

function ContactPanel({ t, locale, mono }: PanelProps) {
  const email = t.contact.channels.email.value;
  const channels = [
    { Icon: MailIcon, href: `mailto:${email}`, external: false, ...t.contact.channels.email },
    { Icon: GitHubIcon, href: GITHUB_URL, external: true, ...t.contact.channels.github },
    { Icon: LinkedInIcon, href: LINKEDIN_URL, external: true, ...t.contact.channels.linkedin },
  ];

  return (
    <div>
      <SectionHeader label={t.contact.label} mono={mono !== ""} />

      <h2 className="mt-7 text-2xl font-bold tracking-tight sm:text-3xl">{t.contact.heading}</h2>

      <ul className="mt-7 divide-y divide-line rounded-2xl border border-line">
        {channels.map(({ Icon, href, external, label, value, note }) => (
          <li key={label}>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-2/60 sm:gap-5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-ink-2 transition-colors group-hover:border-line-strong group-hover:text-accent">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-ink">{label}</span>
                <span className="mt-0.5 block truncate font-mono text-xs text-ink-2">{value}</span>
              </span>
              <span className="hidden max-w-44 text-end text-sm leading-6 text-ink-2 sm:block">
                {note}
              </span>
              <ArrowUpRightIcon className="size-4 shrink-0 text-ink-3 transition-all duration-200 group-hover:translate-x-1 group-hover:text-ink rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
            </a>
          </li>
        ))}

        {/* Resume — downloads in the language the visitor is reading */}
        <li>
          <a
            href={`/resume/resume-${locale}.pdf`}
            download={`MohammadJavadTolou-Resume-${locale.toUpperCase()}.pdf`}
            className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-2/60 sm:gap-5"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-ink-2 transition-colors group-hover:border-line-strong group-hover:text-accent">
              <FileTextIcon className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-ink">{t.contact.resume.label}</span>
              <span className="mt-0.5 block truncate font-mono text-xs text-ink-2">
                {`resume-${locale}.pdf`}
              </span>
            </span>
            <DownloadIcon className="size-4 shrink-0 text-ink-3 transition-all duration-200 group-hover:translate-y-0.5 group-hover:text-ink" />
          </a>
        </li>
      </ul>
    </div>
  );
}

function StatusPill({ status, tone }: { status: string; tone: "ok" | "pilot" }) {
  const styles = {
    ok: "bg-accent/10 text-accent",
    pilot: "bg-ink/5 text-ink-2",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${styles[tone]}`}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}