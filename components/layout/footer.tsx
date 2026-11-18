import { getDictionary, type Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>{t.footer.rights}</p>
        <p>{locale === "en" ? `v${t.footer.ver}` : t.footer.ver}</p>
      </div>
    </footer>
  );
}
