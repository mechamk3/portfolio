import { createFileRoute, Link } from "@tanstack/react-router";
import { getDictionary, monoClass, toLocale } from "@/lib/i18n";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ChevronIcon } from "@/components/icons/misc";

export const Route = createFileRoute("/$locale/projects/")({
  head: ({ params }) => {
    const t = getDictionary(toLocale(params.locale));
    return {
      meta: [
        { title: t.projects.meta.title },
        { name: "description", content: t.projects.meta.description },
        { property: "og:title", content: t.projects.meta.title },
        { property: "og:description", content: t.projects.meta.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectsPage,
});

function ProjectsPage() {
  const locale = toLocale(Route.useParams().locale);
  const t = getDictionary(locale);

  return (
    <main>
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-28">
        <nav aria-label="Breadcrumb" className={`text-xs ${monoClass(locale)}`}>
          <ol className="flex items-center gap-2 text-ink-3">
            <li>
              <Link to="/$locale" params={{ locale }} className="transition-colors hover:text-ink">
                {t.nav.home}
              </Link>
            </li>
            <li aria-hidden>
              <ChevronIcon />
            </li>
            <li aria-current="page" className="text-ink-2">
              {t.nav.projects}
            </li>
          </ol>
        </nav>

        <h1 className="animate-rise mt-10 text-5xl font-bold tracking-tighter text-ink sm:text-7xl rtl:tracking-normal rtl:leading-tight">
          {t.projects.heading}
        </h1>
        <p className="animate-rise mt-6 max-w-2xl text-lg leading-8 text-ink-2 [animation-delay:80ms]">
          {t.projects.intro}
        </p>

        <div className="animate-rise mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3 [animation-delay:160ms]">
          {t.projects.items.map((p, i) => (
            <ProjectCard key={p.slug} project={p} locale={locale} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
