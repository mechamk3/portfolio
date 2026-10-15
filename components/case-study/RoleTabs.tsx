"use client";

import { useState } from "react";

type Capability = { label: string; note?: string; value: string; tone: "full" | "limited" | "none" };
type Role = { name: string; code: string; landing: string; capabilities: Capability[] };

export default function RoleTabs({ label, roles }: { label: string; roles: Role[] }) {
  const [active, setActive] = useState(0);
  const role = roles[active];

  return (
    <div>
      {/* segmented control */}
      {/* segmented control — hugs its content, capped to the column, scrolls if longer */}
      <div
        role="tablist"
        aria-label={label}
        className="scrollbar-none flex w-fit max-w-full gap-1 overflow-x-auto rounded-xl border border-line bg-surface-2/50 p-1"
      >
        {roles.map((r, i) => (
          <button
            key={r.code}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`shrink-0 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${active === i
              ? "bg-ink text-canvas shadow-sm"
              : "text-ink-2 hover:bg-surface-2 hover:text-ink"
              }`}
          >
            {r.name}
          </button>
        ))}
      </div>

      {/* active role panel */}
      <div
        key={role.code}
        role="tabpanel"
        className="mt-6 rounded-2xl border border-line p-6 motion-safe:animate-[lb-fade_.25s_ease-out] sm:p-8"
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-lg font-semibold tracking-tight">{role.name}</h3>
          <span className="rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-xs text-ink-2">
            {role.code}
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-ink-2">{role.landing}</p>

        <ul className="mt-5 border-t border-line">
          {role.capabilities.map((cap) => (
            <li
              key={cap.label}
              className="flex items-center justify-between gap-4 border-b border-line py-3"
            >
              <span className="min-w-0 text-sm text-ink-2">
                {cap.label}
                {cap.note && <span className="mt-0.5 block text-xs text-ink-3">{cap.note}</span>}
              </span>
              <CapabilityPill value={cap.value} tone={cap.tone} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CapabilityPill({ value, tone }: { value: string; tone: "full" | "limited" | "none" }) {
  const styles = {
    full: "bg-success/10 text-success",
    limited: "bg-warning/10 text-warning",
    none: "bg-danger/10 text-danger",
  } as const;
  const marks = { full: "✓", limited: "◐", none: "✕" } as const;

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${styles[tone]}`}
    >
      <span aria-hidden>{marks[tone]}</span>
      {value}
    </span>
  );
}