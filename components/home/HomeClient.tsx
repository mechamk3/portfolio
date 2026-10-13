"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import SectionTabs, { type TabId } from "@/components/home/SectionTabs";
import SectionTabsBar from "@/components/home/SectionTabBar";
import TechIcon from "@/components/TechIcon";

import WorkPanel from "./panels/WorkPanel";
import ExperiencePanel from "./panels/ExperiencePanel";
import AboutPanel from "./panels/AboutPanel";
import ContactPanel from "./panels/ContactPanel";
import type { PanelProps } from "./panels/types";

const TAB_IDS: TabId[] = ["work", "experience", "about", "contact"];

export default function HomeClient({ t, locale, mono }: PanelProps) {
  const [tab, setTab] = useState<TabId>("work");
  const contentRef = useRef<HTMLDivElement>(null);

  // Deep links & back/forward: /en#contact opens the contact tab
  useEffect(() => {
    const apply = () => {
      const hash = window.location.hash.slice(1);
      if (!(TAB_IDS as string[]).includes(hash)) return;
      setTab(hash as TabId);
      requestAnimationFrame(() =>
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const select = useCallback((next: TabId) => {
    setTab(next);
    history.replaceState(null, "", `#${next}`);
    requestAnimationFrame(() => {
      const el = contentRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top < 64 || top > window.innerHeight * 0.65) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, []);

  const tabs = [
    { id: "work" as const, index: "01", label: t.projects.label },
    { id: "experience" as const, index: "02", label: t.experience.label },
    { id: "about" as const, index: "03", label: t.about.label },
    { id: "contact" as const, index: "04", label: t.contact.label },
  ];

  return (
    <main className="relative overflow-x-clip select-none">
      {/* ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-16 -z-10 h-241 mask-[linear-gradient(to_bottom,#000_55%,transparent_100%)]"
      >
        <div className="dot-grid absolute inset-0 mask-[radial-gradient(ellipse_70%_65%_at_50%_0%,#000_55%,transparent_100%)]" />
        <div className="absolute left-1/2 -top-45 h-100 w-[min(640px,100vw)] -translate-x-1/2 rounded-full bg-accent/15 blur-[110px] dark:bg-accent/10" />
        <div className="grain absolute inset-0 opacity-[0.05] dark:opacity-[0.08]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12">
          {/* ============ hero (col 1, row 1) ============ */}
          <section className="pt-12 lg:col-start-1 lg:row-start-1">
            <h1 className="animate-rise [animation-delay:80ms] wrap-break-word bg-linear-to-b from-ink to-accent bg-clip-text text-4xl font-bold leading-[1.15] tracking-tight text-transparent sm:text-6xl">
              {t.home.name}
            </h1>

            <p className={`animate-rise [animation-delay:160ms] mt-5 flex items-center gap-3 text-sm font-medium text-accent ${mono}`}>
              <span aria-hidden className="h-px w-10 bg-linear-to-r from-accent to-transparent rtl:bg-linear-to-l" />
              {t.home.role}
            </p>

            <p className="animate-rise [animation-delay:240ms] mt-5 max-w-xl text-base leading-8 text-ink-2 sm:text-lg">
              {t.home.tagline}
            </p>

            <div className="animate-rise [animation-delay:400ms] mt-7">
              <p className={`text-xs text-ink-3 ${mono}`}>{t.home.stackLabel}</p>
              <ul className="mt-3.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {t.home.stack.map((item) => (
                  <li
                    key={item}
                    className="group flex items-center gap-2.5 rounded-lg border border-line bg-surface/60 px-2.5 py-1.5 transition-colors duration-200 hover:border-line-strong"
                  >
                    <TechIcon name={item} className="size-6 shrink-0 text-ink-3" />
                    <span className="font-sans text-[13px] text-ink-2 transition-colors duration-200 group-hover:text-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <SectionTabsBar tabs={tabs} active={tab} onSelect={select} />

          {/* ============ tab rail ============ */}
          <aside className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <nav aria-label="Sections" className="hidden lg:sticky lg:top-24 lg:block">
              <SectionTabs tabs={tabs} active={tab} onSelect={select} />
            </nav>
          </aside>

          {/* ============ active panel (col 1, row 2) ============ */}
          <div ref={contentRef} className="scroll-mt-24 pb-12 lg:col-start-1 lg:row-start-2">
            {/* key={tab} replays the entrance on every switch */}
            <div
              key={tab}
              role="tabpanel"
              className="animate-rise border-line"
            >
              {tab === "work" && <WorkPanel t={t} locale={locale} mono={mono} />}
              {tab === "experience" && <ExperiencePanel t={t} locale={locale} mono={mono} />}
              {tab === "about" && <AboutPanel t={t} locale={locale} mono={mono} />}
              {tab === "contact" && <ContactPanel t={t} locale={locale} mono={mono} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}