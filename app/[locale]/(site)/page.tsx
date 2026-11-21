import { notFound } from "next/navigation";

import { getDictionary, isLocale, monoClass } from "@/lib/i18n";
import Hero from "@/components/home/Hero";
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
      <Hero t={t} />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
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
