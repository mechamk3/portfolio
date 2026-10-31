import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getDictionary, monoClass, toLocale } from "@/lib/i18n";

/** Projects without a written case study yet. HRIS has its own page. */
const PLACEHOLDER_SLUGS = ["smsGateway", "spoola"];

export const Route = createFileRoute("/$locale/projects/$slug")({
  beforeLoad: ({ params }) => {
    if (!PLACEHOLDER_SLUGS.includes(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const t = getDictionary(toLocale(params.locale));
    const project = t.projects.items.find((i) => i.slug === params.slug);
    const title = `${project?.name ?? t.projects.underConstruction.title} — ${t.home.name}`;
    return {
      meta: [
        { title },
        { name: "description", content: project?.tagline ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: project?.tagline ?? "" },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: PlaceholderProject,
});

function PlaceholderProject() {
  const { locale: raw, slug } = Route.useParams();
  const locale = toLocale(raw);
  const t = getDictionary(locale);
  const project = t.projects.items.find((i) => i.slug === slug);
  const uc = t.projects.underConstruction;

  return (
    <main className="flex min-h-[70dvh] items-center justify-center px-6 py-20 text-center">
      <div className="animate-rise flex max-w-xl flex-col items-center">
        <span className={`rounded-full border border-dashed border-line-strong px-4 py-1.5 text-xs text-ink-3 ${monoClass(locale)}`}>
          {uc.title}
        </span>
        <h1 className="mt-8 text-4xl font-bold tracking-tight text-gradient sm:text-5xl">{project?.name}</h1>
        <p className="mt-6 text-ink-2">{project?.tagline}</p>
        <p className="mt-6 font-mono text-sm text-signal">
          {uc.text}
          <span className="ms-1 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-signal" aria-hidden />
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/$locale"
            params={{ locale }}
            className="rounded-full bg-signal px-6 py-3 text-sm font-semibold text-signal-foreground shadow-signal"
          >
            {uc.go2h}
          </Link>
          <Link
            to="/$locale/projects"
            params={{ locale }}
            className="rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-signal hover:text-signal"
          >
            {uc.go2p}
          </Link>
        </div>
      </div>
    </main>
  );
}
