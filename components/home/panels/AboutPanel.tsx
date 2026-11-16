import type { PanelProps } from "./types";

export default function AboutPanel({ t }: PanelProps) {
  const [first, ...rest] = t.about.intro;

  return (
    <div className="max-w-2xl">
      <p className="font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
        {t.about.heading}
      </p>

      {/* the opening paragraph reads as a lead-in; the rest as body text */}
      <p className="mt-8 font-display text-xl leading-9 text-ink sm:text-[1.4rem] sm:leading-10">{first}</p>

      <div className="mt-6 space-y-5 text-[17px] leading-8 text-ink-2">
        {rest.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
