"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import type { TabId, TabItem } from "@/components/home/SectionTabs";

// Layout effect on client (measure before paint, no flash), plain effect on server.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Mobile (<lg) section switcher — a floating segmented pill.
 *  • Sticky under the header → reachable inside long panels
 *  • Sliding thumb measured from the DOM → RTL-safe, survives font swaps
 *  • Overflow-x + snap + edge fade only when labels actually overflow
 *  • Same keyboard contract as the desktop rail (roving tabindex, arrows)
 */
export default function SectionTabsBar({
  tabs,
  active,
  onSelect,
}: {
  tabs: TabItem[];
  active: TabId;
  onSelect: (id: TabId) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null); // overflow-x container
  const rowRef = useRef<HTMLDivElement>(null);      // chip row → thumb's measuring host
  const btnRefs = useRef(new Map<TabId, HTMLButtonElement>());

  const [thumb, setThumb] = useState<{ x: number; w: number } | null>(null);
  const [overflows, setOverflows] = useState(false);

  const ready = thumb !== null;

  const measure = useCallback(() => {
    const row = rowRef.current;
    const btn = btnRefs.current.get(active);
    if (!row || !btn) return;
    const rowBox = row.getBoundingClientRect();
    const btnBox = btn.getBoundingClientRect();
    setThumb({ x: btnBox.left - rowBox.left, w: btnBox.width });

    const sc = scrollerRef.current;
    if (sc) setOverflows(sc.scrollWidth - sc.clientWidth > 4);
  }, [active]);

  useIsoLayoutEffect(measure, [measure]);

  // Rotation, font swap, locale switch → re-measure.
  useEffect(() => {
    const sc = scrollerRef.current;
    if (!sc) return;
    const ro = new ResizeObserver(measure);
    ro.observe(sc);
    btnRefs.current.forEach((b) => ro.observe(b));
    return () => ro.disconnect();
  }, [measure]);

  // Deep links (/en#contact) & arrow keys → keep the active chip in view.
  useEffect(() => {
    const btn = btnRefs.current.get(active);
    if (!btn) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    btn.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest", inline: "center" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = tabs.findIndex((tb) => tb.id === active);
    if (e.key === "Home") { e.preventDefault(); onSelect(tabs[0].id); return; }
    if (e.key === "End") { e.preventDefault(); onSelect(tabs[tabs.length - 1].id); return; }
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
    const step = (e.key === "ArrowRight" ? 1 : -1) * (rtl ? -1 : 1);
    onSelect(tabs[(i + step + tabs.length) % tabs.length].id);
  };

  return (
    <div className="animate-rise [animation-delay:640ms] mt-8 mb-8 flex justify-center lg:hidden">
      <div
        ref={scrollerRef}
        className={`max-w-full touch-manipulation select-none overflow-x-auto rounded-full border border-line bg-surface snap-x snap-mandatory scrollbar-none ${overflows
          ? "mask-[linear-gradient(to_right,transparent,#000_14px,#000_calc(100%_-_14px),transparent)]"
          : ""
          }`}
      >
        <div
          ref={rowRef}
          role="tablist"
          aria-label="Sections"
          onKeyDown={onKeyDown}
          className="relative flex w-max items-center gap-1 p-1"
        >
          {/* sliding thumb */}
          {thumb && (
            <span
              aria-hidden
              style={{ width: thumb.w, transform: `translateX(${thumb.x}px)` }}
              className="absolute inset-y-1 left-0 rounded-full bg-ink shadow-sm animate-[lb-fade_0.2s_ease-out_both] transition-[width,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
            />
          )}

          {tabs.map((tab) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  if (el) btnRefs.current.set(tab.id, el);
                  else btnRefs.current.delete(tab.id);
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="section-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => onSelect(tab.id)}
                className={`relative z-10 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent ${isActive && ready ? "text-canvas" : "text-ink-2 hover:bg-ink/[0.04] hover:text-ink"
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}