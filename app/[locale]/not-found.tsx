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
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center select-none">
      {/* ambient backdrop — matches home */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-dvh mask-[linear-gradient(to_bottom,#000_55%,transparent_100%)]"
      >
      <div className="dot-grid absolute inset-0" />
        <div className="absolute left-1/2 -top-45 h-100 w-[min(640px,100vw)] -translate-x-1/2 rounded-full bg-accent/15 blur-[110px] dark:bg-accent/10" />
        <div className="grain absolute inset-0 opacity-[0.05] dark:opacity-[0.08]" />
      </div>

      <div className="animate-rise relative flex flex-col items-center">

        <p className="text-8xl font-bold tracking-tighter text-ink sm:text-9xl">
          {t.notFound.code}
        </p>

        <p className="mt-2 max-w-sm text-balance text-ink-2">{t.notFound.text}</p>

        <Link
          href={`/${locale}`}
          className="mt-10 rounded-full bg-accent px-7 py-3 text-sm font-medium text-canvas transition-colors hover:bg-accent-strong"
        >
          {t.notFound.home}
        </Link>
      </div>
    </main>
  );
}