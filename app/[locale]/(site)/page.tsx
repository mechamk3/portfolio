import Link from "next/link";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, monoClass } from "@/lib/i18n";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import Arrow from "@/components/Arrow";
import Scribble from "@/components/Scribble";
import TechIcon from "@/components/TechIcon";
import HomeSection from "@/components/home/HomeSection";
import WorkPanel from "@/components/home/panels/WorkPanel";
import ExperiencePanel from "@/components/home/panels/ExperiencePanel";
import AboutPanel from "@/components/home/panels/AboutPanel";
import ContactPanel from "@/components/home/panels/ContactPanel";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const panel = { t, locale, mono: monoClass(locale) };
  const ext = { target: "_blank", rel: "noopener noreferrer" };

  return (
    <main>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* ============ hero ============ */}
        <section id="top" className="animate-rise pb-16 pt-14 sm:pb-24 sm:pt-24">
          <p className="eyebrow">{t.home.role}</p>

          <h1 className="mt-3 font-display text-[2.6rem] font-medium leading-[1.08] tracking-tight text-ink sm:text-8xl">
            <span className="relative inline-block">
              {t.home.name}
              <Scribble className="-bottom-2 h-3 sm:-bottom-3 sm:h-4" />
            </span>
          </h1>

          <p className="mt-10 max-w-2xl font-display text-[1.35rem] leading-9 text-ink-2 sm:text-[1.6rem] sm:leading-10">
            {t.home.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4 text-[15px]">
            <Link href={`/${locale}#work`} className="btn btn-primary">
              {t.home.viewWork} <Arrow />
            </Link>
            <Link href={`/${locale}#contact`} className="link">
              {t.home.contactMe}
            </Link>
            <a href={GITHUB_URL} {...ext} className="link">
              {t.contact.channels.github.label}
            </a>
            <a href={LINKEDIN_URL} {...ext} className="link">
              {t.contact.channels.linkedin.label}
            </a>
          </div>

          <div className="mt-16 sm:mt-24">
            <p className="eyebrow">{t.home.stackLabel}</p>
            <ul className="mt-4 flex max-w-3xl flex-wrap gap-x-7 gap-y-3">
              {t.home.stack.map((item) => (
                <li key={item} className="flex items-center gap-2 font-sans text-[15px] text-ink-2">
                  <TechIcon name={item} className="size-4.5 shrink-0 text-ink-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <HomeSection id="work" label={t.projects.label}>
          <WorkPanel {...panel} />
        </HomeSection>
        <HomeSection id="experience" label={t.experience.label}>
          <ExperiencePanel {...panel} />
        </HomeSection>
        <HomeSection id="about" label={t.about.label}>
          <AboutPanel {...panel} />
        </HomeSection>
        <HomeSection id="contact" label={t.contact.label}>
          <ContactPanel {...panel} />
        </HomeSection>
      </div>
    </main>
  );
}
