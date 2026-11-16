import { getDictionary, type Locale } from "@/lib/i18n";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/site";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { email, github, linkedin } = t.contact.channels;
  const ext = { target: "_blank", rel: "noopener noreferrer" };

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>{t.footer.rights}</p>

        <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href={`mailto:${email.value}`} className="link text-ink-2!">
            {email.label}
          </a>
          <a href={GITHUB_URL} {...ext} className="link text-ink-2!">
            {github.label}
          </a>
          <a href={LINKEDIN_URL} {...ext} className="link text-ink-2!">
            {linkedin.label}
          </a>
          <span>{locale === "en" ? `v${t.footer.ver}` : t.footer.ver}</span>
        </p>
      </div>
    </footer>
  );
}
