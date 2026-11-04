import { useEffect, useState } from "react";

type Capability = { label: string; note?: string; value: string; tone: "full" | "limited" | "none" };
type Role = { name: string; code: string; landing: string; capabilities: Capability[] };

export function RoleTabs({ label, roles }: { label: string; roles: Role[] }) {
  const [active, setActive] = useState(0);
  const role = roles[active] ?? roles[0];
  if (!role) return null;
  const styles = {
    full: "bg-success/10 text-success",
    limited: "bg-warning/10 text-warning",
    none: "bg-danger/10 text-danger",
  } as const;
  const marks = { full: "✓", limited: "◐", none: "✕" } as const;

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className="scrollbar-none flex w-fit max-w-full gap-1 overflow-x-auto rounded-none border border-line bg-surface-2/50 p-1"
      >
        {roles.map((r, i) => (
          <button
            key={r.code}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`shrink-0 whitespace-nowrap rounded-none px-4 py-1.5 text-sm font-medium transition-colors ${
              active === i ? "bg-signal text-signal-foreground" : "text-ink-2 hover:text-ink"
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>

      <div key={role.code} role="tabpanel" className="animate-rise mt-6 rounded-none border border-line bg-surface/60 p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline gap-3">
          <h3 className="text-lg font-semibold tracking-tight text-ink">{role.name}</h3>
          <code className="rounded-none border border-line bg-surface-2 px-2 py-0.5 font-mono text-xs text-signal">{role.code}</code>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-ink-2">{role.landing}</p>
        <ul className="mt-5 border-t border-line">
          {role.capabilities.map((cap) => (
            <li key={cap.label} className="flex items-center justify-between gap-4 border-b border-line py-3">
              <span className="min-w-0 text-sm text-ink-2">
                {cap.label}
                {cap.note && <span className="mt-0.5 block text-xs text-ink-3">{cap.note}</span>}
              </span>
              <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-none px-3 py-1 text-xs font-semibold ${styles[cap.tone]}`}>
                <span aria-hidden>{marks[cap.tone]}</span>
                {cap.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Toc({ label, items }: { label: string; items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="hidden lg:sticky lg:top-28 lg:block">
      <p className="text-xs text-ink-3">{label}</p>
      <ol className="mt-4 space-y-1 border-s border-line">
        {items.map((i, n) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={`-ms-px flex gap-3 border-s py-1.5 ps-4 text-sm transition-colors ${
                active === i.id ? "border-signal text-ink" : "border-transparent text-ink-3 hover:text-ink-2"
              }`}
            >
              <span className="font-mono text-xs">{String(n + 1).padStart(2, "0")}</span>
              {i.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div aria-hidden className="fixed inset-x-0 top-[calc(4.5rem+1px)] z-30 h-0.5">
      <div className="h-full origin-left bg-signal-gradient rtl:origin-right" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}

/** Hand-drawn diagrams ship on opaque white, so the tile is the same white: a thin margin that blends in, no border. */
export function Diagram({ src, alt, width, height, className = "" }: { src: string; alt: string; width: number; height: number; className?: string }) {
  return (
    <div className={`bg-white p-3 sm:p-4 ${className}`}>
      <img src={src} alt={alt} width={width} height={height} loading="lazy" className="block h-auto w-full" />
    </div>
  );
}

export function Callout({
  tone,
  title,
  children,
}: {
  tone: "danger" | "success" | "warning";
  title?: string;
  children: React.ReactNode;
}) {
  const styles = {
    danger: "border-danger bg-danger/5 text-danger",
    success: "border-success bg-success/5 text-success",
    warning: "border-warning bg-warning/5 text-warning",
  } as const;
  return (
    <div className={`mt-5 rounded-none border-s-4 p-5 ${styles[tone]}`}>
      {title && <p className="text-sm font-semibold">{title}</p>}
      <div className="mt-2 leading-8 text-ink-2">{children}</div>
    </div>
  );
}
