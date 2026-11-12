import SectionHeader from "@/components/SectionHeader";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons/socials";
import { ArrowUpRightIcon, DownloadIcon, FileTextIcon } from "@/components/icons/misc";

import type { PanelProps } from "./types";

const GITHUB_URL = "https://github.com/mechamk3";
const LINKEDIN_URL = "https://linkedin.com/in/mohammmadjavadtolou";

export default function ContactPanel({ t, locale, mono }: PanelProps) {
  const email = t.contact.channels.email.value;
  const channels = [
    { Icon: MailIcon, href: `mailto:${email}`, external: false, ...t.contact.channels.email },
    { Icon: GitHubIcon, href: GITHUB_URL, external: true, ...t.contact.channels.github },
    { Icon: LinkedInIcon, href: LINKEDIN_URL, external: true, ...t.contact.channels.linkedin },
  ];

  return (
    <div>
      <SectionHeader label={t.contact.label} mono={mono !== ""} />

      <h2 className="mt-7 text-2xl font-bold tracking-tight sm:text-3xl">{t.contact.heading}</h2>

      <ul className="mt-7 divide-y divide-line overflow-hidden rounded-2xl border border-line">
        {channels.map(({ Icon, href, external, label, value, note }) => (
          <li
            key={label}
            className="group transition-colors first:rounded-t-2xl last:rounded-b-2xl hover:bg-surface-2/60"
          >
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex items-center gap-4 px-5 py-4 sm:gap-5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-ink-2 transition-colors group-hover:border-line-strong group-hover:text-accent">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-ink">{label}</span>
                <span className="mt-0.5 block truncate text-xs text-ink-2">{value}</span>
              </span>
              <span className="hidden max-w-44 text-end text-sm leading-6 text-ink-2 sm:block">
                {note}
              </span>
              <ArrowUpRightIcon className="size-4 shrink-0 text-ink-3 transition-all duration-200 group-hover:translate-x-1 group-hover:text-ink rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
            </a>
          </li>
        ))}

        {/* Resume — downloads in the language the visitor is reading */}
        {/* <li>
					<a
						href={`/resume/resume-${locale}.pdf`}
						download={`MohammadJavadTolou-Resume-${locale.toUpperCase()}.pdf`}
						className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-2/60 sm:gap-5"
					>
						<span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-ink-2 transition-colors group-hover:border-line-strong group-hover:text-accent">
							<FileTextIcon className="size-5" />
						</span>
						<span className="min-w-0 flex-1">
							<span className="block text-sm font-medium text-ink">{t.contact.resume.label}</span>
							<span className="mt-0.5 block truncate font-mono text-xs text-ink-2">
								{`resume-${locale}.pdf`}
							</span>
						</span>
						<DownloadIcon className="size-4 shrink-0 text-ink-3 transition-all duration-200 group-hover:translate-y-0.5 group-hover:text-ink" />
					</a>
				</li> */}
      </ul>
    </div>
  );
}