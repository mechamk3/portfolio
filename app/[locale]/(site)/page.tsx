import { notFound } from "next/navigation";

import { getDictionary, isLocale, monoClass } from "@/lib/i18n";
import HomeSection from "@/components/home/HomeSection";
import WorkPanel from "@/components/home/panels/WorkPanel";
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

  return (
    <main>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* ============ hero ============ */}
        <section id="top" className="animate-rise pb-16 pt-14 sm:pb-24 sm:pt-24">
          <p className="eyebrow">{t.home.role}</p>

          <h1 className="mt-3 font-display text-[2.6rem] font-medium leading-[1.08] tracking-tight text-ink sm:text-8xl">
            {t.home.name}
            <span aria-hidden className="ms-[0.12em] inline-block size-[0.22em] translate-y-[-0.06em] bg-accent" />
          </h1>

          <p className="mt-10 max-w-2xl font-display text-[1.35rem] leading-9 text-ink-2 sm:text-[1.6rem] sm:leading-10">
            {t.home.tagline}
          </p>
        </section>

        <HomeSection id="work" label={t.projects.label}>
          <WorkPanel {...panel} />
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
