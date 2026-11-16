import Link from "next/link";

import { getDictionary, type Locale } from "@/lib/i18n";
import type { ProjectItem } from "@/content/types";

export default function UnderConstruction({
  locale,
  project,
}: {
  locale: Locale;
  project: ProjectItem;
}) {
  const t = getDictionary(locale).projects.underConstruction;

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="animate-rise relative flex max-w-lg flex-col items-center">
        <span className="eyebrow">{t.title}</span>

        <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          {project.name}
        </h1>

        <p className="mt-5 max-w-md text-balance text-lg leading-8 text-ink-2">{t.text}</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Link href={`/${locale}`} className="btn btn-primary">
            {t.go2h}
          </Link>
          <Link href={`/${locale}/projects`} className="link text-[15px]">
            {t.go2p}
          </Link>
        </div>
      </div>
    </main>
  );
}
