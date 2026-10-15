import SectionHeader from "@/components/SectionHeader";
import { StatusPill } from "@/components/StatusPill";

import type { PanelProps } from "./types";

export default function ExperiencePanel({ t, mono }: PanelProps) {
  return (
    <div>
      <SectionHeader label={t.experience.label} mono={mono !== ""} />

      <ol className="relative mt-7 border-s border-line ps-8">
        {t.experience.items.map((job) => (
          <li key={job.company} className="relative pb-10 last:pb-0">
            {/* dot centered on the spine: ps-8 (32px) + half dot (6px) → -start-[38px] */}
            <span aria-hidden className="absolute -inset-s-9.5 top-1 flex size-3">
              {job.current && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              )}
              <span
                className={`relative inline-flex size-3 rounded-full ring-4 ring-canvas ${job.current ? "bg-accent" : "bg-line-strong"
                  }`}
              />
            </span>

            <div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{job.company}</h3>
                <span className="text-sm text-ink-3">{job.location}</span>
              </div>

              <div className="mt-2.5 space-y-1.5">
                {job.roles.map((r) => (
                  <p key={r.role} className="flex flex-wrap items-baseline gap-x-3 text-sm">
                    <span className={`font-medium ${r.current ? "text-ink" : "text-ink-2"}`}>
                      {!r.current && <span>{t.experience.previouslyLabel}: </span>}
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
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}