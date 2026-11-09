// app/[locale]/(site)/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { defaultLocale, getDictionary, isLocale } from "@/lib/i18n";
import UnderConstruction from "@/components/UnderConstruction";

const PLACEHOLDER_SLUGS = ["smsGateway", "spoola"] as const;

// Only the slugs above exist. Everything else → 404 automatically.
export const dynamicParams = false;

export async function generateStaticParams() {
  return PLACEHOLDER_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const project = getDictionary(locale).projects.items.find((i) => i.slug === slug);
  return {
    title: project?.name ?? "Under construction",
    robots: { index: false }, // don't let search engines index a stub
  };
}

export default async function PlaceholderProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const project = getDictionary(locale).projects.items.find((i) => i.slug === slug);
  if (!project) notFound(); // belt-and-braces; routing already guards this

  return <UnderConstruction locale={locale} project={project} />;
}