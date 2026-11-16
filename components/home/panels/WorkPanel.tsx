import Link from "next/link";

import Arrow from "@/components/Arrow";
import ProjectCard from "@/components/ProjectCard";

import type { PanelProps } from "./types";

export default function WorkPanel({ t, locale }: PanelProps) {
  // the home page shows at most 3 projects; /projects lists everything
  const items = t.projects.items.slice(0, 3);

  return (
    <div>
      <p className="font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
        {t.projects.heading}
      </p>

      <div className="mt-10">
        {items.map((project, i) => (
          <ProjectCard
            key={project.name}
            project={project}
            labels={t.projects}
            locale={locale}
            priority={i === 0}
          />
        ))}
      </div>

      <p className="border-t border-line pt-7 text-[15px]">
        <Link href={`/${locale}/projects`} className="link">
          {t.projects.viewAll} <Arrow />
        </Link>
      </p>
    </div>
  );
}
