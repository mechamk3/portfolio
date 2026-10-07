import { getDictionary, type Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <footer className="border-t border-line">
      <div className="flex w-full flex-col justify-between gap-2 px-6 py-6 text-sm text-ink-2 sm:flex-row sm:items-center sm:px-6">
        <p>{t.footer.rights}</p>
        <p className="text-xs">{t.footer.ver}</p>
      </div>
    </footer>
  );
}