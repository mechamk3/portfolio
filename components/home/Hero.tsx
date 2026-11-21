import type { Dictionary } from "@/content/en";
import HeroAtmosphere from "@/components/home/HeroAtmosphere";

function splitName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return { first: name.trim(), last: "" };
  return {
    first: parts.slice(0, -1).join(" "),
    last: parts[parts.length - 1],
  };
}

export default function Hero({ t }: { t: Dictionary }) {
  const { first, last } = splitName(t.home.name);

  return (
    <section id="top" className="relative @container px-[5cqi] pb-[4cqi] pt-[3.5cqi]">
      <HeroAtmosphere />
      <div className="relative z-[1]">
        <p className="hero-rise text-[2.1cqi] leading-none text-ink-3">{t.home.role}</p>

        <h1 className="hero-name hero-rise hero-rise-late mt-[1.6cqi] font-display text-ink">
          <span>{first}</span>
          {last ? <span className="text-end">{last}</span> : null}
        </h1>

        <p className="hero-rise hero-rise-later mt-[3.2cqi] text-[2cqi] leading-[1.35] text-ink-2">
          {t.home.tagline.map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
