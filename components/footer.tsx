import { getDictionary, type Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex w-full max-w-4xl flex-col justify-between gap-2 px-6 py-8 text-sm text-zinc-500 dark:text-zinc-400 sm:flex-row sm:items-center">
        <p>{t.footer.rights}</p>
        <p className="text-xs">{t.footer.ver}</p>
      </div>
    </footer>
  );
}