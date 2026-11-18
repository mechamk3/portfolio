import { GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons/socials";

import type { PanelProps } from "./types";

export default function ContactPanel({ t }: PanelProps) {
  const { email, github, linkedin } = t.contact.channels;
  const channels = [
    { href: `mailto:${email.value}`, title: email.label, link: email.value, icon: MailIcon },
    { href: GITHUB_URL, title: github.label, link: github.value, icon: GitHubIcon, external: true },
    { href: LINKEDIN_URL, title: linkedin.label, link: linkedin.value, icon: LinkedInIcon, external: true },
  ];

  return (
    <ul className="flex flex-col gap-5">
      {channels.map(({ href, title, link, icon: Icon, external }) => (
        <li key={title} className="flex items-center gap-3">
          <Icon className="size-5 shrink-0 text-ink-3" />
          <span className="text-ink">{title}</span>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            dir="ltr"
            className="link text-ink-2"
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
  );
}
