"use client";

import { useEffect, useState } from "react";

export default function Toc({
  label,
  items,
}: {
  label: string;
  items: { id: string; label: string }[];
}) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-15% 0px -75% 0px" }
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="sticky top-24 hidden lg:block">
      <p className="text-xs text-ink-3">{label}</p>
      <ul className="mt-3 border-s border-line">
        {items.map(({ id, label: itemLabel }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`-ms-px block border-s-2 py-1.5 ps-4 text-sm leading-6 transition-colors ${active === id
                ? "border-ink font-medium text-ink"
                : "border-transparent text-ink-2 hover:text-ink"
                }`}
            >
              {itemLabel}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}