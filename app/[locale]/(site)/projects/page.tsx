import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary, isLocale } from "@/lib/i18n";
import Breadcrumb from "@/components/Breadcrumb";
import ProjectCard from "@/components/ProjectCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return { title: t.projects.meta.title, description: t.projects.meta.description };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <main>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <section className="animate-rise pb-12 pt-10 sm:pb-16 sm:pt-14">
          <Breadcrumb items={[{ label: t.nav.home, href: `/${locale}` }, { label: t.nav.projects }]} />

          <h1 className="mt-10 font-display text-5xl font-medium tracking-tight text-ink sm:text-7xl">
            {t.projects.heading}
          </h1>
          <p className="mt-6 max-w-2xl font-display text-xl leading-9 text-ink-2 sm:text-2xl sm:leading-10">
            {t.projects.intro}
          </p>
        </section>

        <section className="border-t border-line pb-20 pt-10 sm:pb-28">
          <div className="max-w-4xl">
            {t.projects.items.map((project, i) => (
              <ProjectCard
                key={project.name}
                project={project}
                labels={t.projects}
                locale={locale}
                priority={i === 0}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
