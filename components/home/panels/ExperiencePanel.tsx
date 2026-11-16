import { StatusPill } from "@/components/StatusPill";

import type { PanelProps } from "./types";

export default function ExperiencePanel({ t }: PanelProps) {
  return (
    <div>
      <p className="font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
        {t.experience.heading}
      </p>

      <ol className="mt-10 space-y-14">
        {t.experience.items.map((job) => (
          <li key={job.company}>
            <h3 className="font-display text-2xl font-medium tracking-tight text-ink sm:text-[1.75rem]">
              {job.company}
              <span className="ms-3 font-sans text-sm font-normal tracking-normal text-ink-3 rtl:font-fa">
                {job.location}
              </span>
            </h3>

            {/* ---- roles: title on one side, dates on the other ---- */}
            <ul className="mt-4 max-w-2xl">
              {job.roles.map((r) => (
                <li
                  key={r.role}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5 border-t border-line py-3 text-[15px] last:border-b"
                >
                  <span className={r.current ? "font-medium text-ink" : "text-ink-2"}>
                    {!r.current && <span className="text-ink-3">{t.experience.previouslyLabel}: </span>}
                    {r.role}
                  </span>
                  <span className="text-sm text-ink-3">{r.period}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 max-w-2xl space-y-5 text-[17px] leading-8 text-ink-2">
              {job.summary.map((paragraph, j) => (
                <p key={j}>{paragraph}</p>
              ))}
            </div>

            {/* ---- featured projects ---- */}
            <p className="eyebrow mt-12">{t.experience.selectedWorkLabel}</p>
            <ul className="mt-4 max-w-2xl">
              {job.projects.map((project) => (
                <li key={project.name} className="border-t border-line py-6 last:pb-0">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h4 className="text-lg font-semibold tracking-tight text-ink">{project.name}</h4>
                    <StatusPill status={project.status} tone={project.tone} />
                  </div>
                  <div className="mt-2.5 space-y-3 text-base leading-7 text-ink-2">
                    {project.description.map((paragraph, j) => (
                      <p key={j}>{paragraph}</p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>

            {job.footnote && (
              <p className="mt-8 max-w-2xl border-s-2 border-accent ps-5 font-display text-lg leading-8 text-ink-2 sm:text-xl">
                {job.footnote}
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
