import Link from "next/link";

import { ChevronIcon } from "@/components/icons/misc";

/** Breadcrumb trail — the last item is the current page (no href). */
export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-ink-3">
        {items.map(({ label, href }, i) => (
          <li key={label} className={`flex items-center gap-2 ${href ? "shrink-0" : "min-w-0"}`}>
            {i > 0 && <ChevronIcon className="shrink-0 text-ink-3/70" />}
            {href ? (
              <Link href={href} className="transition-colors hover:text-ink">
                {label}
              </Link>
            ) : (
              <span aria-current="page" className="truncate text-ink-2">
                {label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
