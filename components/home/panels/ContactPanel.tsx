import { GITHUB_URL, LINKEDIN_URL } from "@/lib/site";

import type { PanelProps } from "./types";

export default function ContactPanel({ t }: PanelProps) {
  const { email, github, linkedin } = t.contact.channels;
  const others = [
    { href: GITHUB_URL, ...github },
    { href: LINKEDIN_URL, ...linkedin },
  ];

  return (
    <div>
      <p className="font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
        {t.contact.heading}
      </p>

      {/* the address itself is the call to action */}
      <p className="mt-8">
        <a
          href={`mailto:${email.value}`}
          dir="ltr"
          className="link break-all font-display text-2xl decoration-accent decoration-2 underline-offset-[0.25em] sm:text-4xl"
        >
          {email.value}
        </a>
      </p>

      <dl className="mt-10 grid max-w-xl gap-x-10 gap-y-6 sm:grid-cols-2">
        {others.map(({ href, label, value }) => (
          <div key={label} className="border-t border-line pt-4">
            <dt className="eyebrow">{label}</dt>
            <dd className="mt-1.5">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="link font-sans text-[17px]"
              >
                {value}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
