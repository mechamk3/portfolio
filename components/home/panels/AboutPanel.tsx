import SectionHeader from "@/components/SectionHeader";

import type { PanelProps } from "./types";

export default function AboutPanel({ t, locale }: PanelProps) {
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