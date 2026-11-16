import Link from "next/link";
import { headers } from "next/headers";
import { defaultLocale, getDictionary, isLocale, monoClass, type Locale } from "@/lib/i18n";

async function resolveLocale(): Promise<Locale> {
  try {
    const raw = (await headers()).get("x-locale") ?? "";
    if (isLocale(raw)) return raw;
  } catch {
    // no request scope during build-time prerender → fall back
  }
  return defaultLocale;
}

export async function generateMetadata() {
  const t = getDictionary(await resolveLocale());
  return { title: t.notFound, robots: { index: false } };
}

export default async function NotFound() {
  const locale = await resolveLocale();
  const t = getDictionary(locale);

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="animate-rise relative flex flex-col items-center">

        <p className="font-display text-8xl font-medium tracking-tight text-ink sm:text-9xl">
          {t.notFound.code}
        </p>

        <p className="mt-5 max-w-sm text-balance text-lg leading-8 text-ink-2">{t.notFound.text}</p>

        <Link
          href={`/${locale}`}
          className="btn btn-primary mt-10"
        >
          {t.notFound.home}
        </Link>
      </div>
    </main>
  );
}