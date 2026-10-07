"use client";

import { ArrowUpRightIcon } from "@/components/icons";

export type TabId = "work" | "experience" | "about" | "contact";
export type TabItem = { id: TabId; index: string; label: string };

export default function SectionTabs({
  tabs,
  active,
  onSelect,
}: {
  tabs: TabItem[];
  active: TabId;
  onSelect: (id: TabId) => void;
}) {
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const i = tabs.findIndex((t2) => t2.id === active);
    onSelect(tabs[(i + (e.key === "ArrowDown" ? 1 : -1) + tabs.length) % tabs.length].id);
  };

  return (
    <>
      {/* desktop: vertical rail */}
      <div
        role="tablist"
        aria-label="Sections"
        onKeyDown={onKeyDown}
        className="hidden flex-col gap-1 lg:flex"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelect(tab.id)}
              className={`group relative flex w-full items-center gap-3 rounded-xl py-2.5 pe-3 ps-4 text-start transition-colors duration-200 ${
                isActive
                  ? "bg-ink/5 dark:bg-ink/10"
                  : "hover:bg-ink/[0.03] dark:hover:bg-ink/[0.06]"
              }`}
            >
              <span
                aria-hidden
                className={`absolute inset-y-1.5 start-0 w-[3px] rounded-full bg-accent transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
              <span
                className={`font-mono text-xs tabular-nums transition-colors ${
                  isActive ? "text-accent" : "text-ink-3"
                }`}
              >
                {tab.index}
              </span>
              <span
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-ink"
                    : "text-ink-2 group-hover:text-ink"
                }`}
              >
                {tab.label}
              </span>
              <ArrowUpRightIcon
                className={`ms-auto size-4 transition-all duration-200 rtl:-scale-x-100 ${
                  isActive ? "text-ink opacity-100" : "text-ink-3 opacity-0 group-hover:opacity-40"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* mobile: glass pill row */}
      <div
        role="tablist"
        aria-label="Sections"
        className="glass flex gap-1 overflow-x-auto rounded-full p-1 lg:hidden"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(tab.id)}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-ink text-canvas"
                  : "text-ink-2 hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </>
  );
}