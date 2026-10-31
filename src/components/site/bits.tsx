import type { ComponentType, SVGProps } from "react";
import {
  TypeScriptIcon, JavaScriptIcon, TailwindIcon, ViteIcon, AntDesignIcon,
  PostgreSQLIcon, MongoDBIcon, PythonIcon, FastAPIIcon,
  NextJsIcon, ReactIcon, SQLiteIcon, NginxIcon, CreateReactAppIcon,
} from "@/components/icons/tech";
import { BriefcaseIcon, UserIcon } from "@/components/icons/misc";

const TECH_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  React: ReactIcon,
  TypeScript: TypeScriptIcon,
  JavaScript: JavaScriptIcon,
  "Tailwind CSS": TailwindIcon,
  "Next.js": NextJsIcon,
  "Create React App": CreateReactAppIcon,
  "React(CRA)": CreateReactAppIcon,
  Vite: ViteIcon,
  "Ant Design": AntDesignIcon,
  Python: PythonIcon,
  FastAPI: FastAPIIcon,
  SQLite: SQLiteIcon,
  PostgreSQL: PostgreSQLIcon,
  MongoDB: MongoDBIcon,
  Nginx: NginxIcon,
};

export function TechIcon({ name, className = "" }: { name: string; className?: string }) {
  const Icon = TECH_ICONS[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

export function StatusPill({ status, tone }: { status: string; tone: "ok" | "pilot" }) {
  const styles = {
    ok: "border-success/30 bg-success/10 text-success",
    pilot: "border-warning/30 bg-warning/10 text-warning",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${styles[tone]}`}
    >
      <span className="relative flex size-1.5">
        {tone === "ok" && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
        )}
        <span className="relative inline-flex size-1.5 rounded-full bg-current" />
      </span>
      {status}
    </span>
  );
}

export function KindBadge({ kind, label }: { kind: "work" | "personal"; label: string }) {
  const Icon = kind === "work" ? BriefcaseIcon : UserIcon;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-[11px] text-ink-2">
      <Icon className="size-3 shrink-0" />
      {label}
    </span>
  );
}

export function SectionLabel({
  index,
  label,
  mono,
}: {
  index?: string;
  label: string;
  mono: string;
}) {
  return (
    <div className="flex items-center gap-4">
      {index && <span className="font-mono text-xs text-signal">{index}</span>}
      <span className={`text-xs font-medium text-ink-2 ${mono}`}>{label}</span>
      <span aria-hidden className="h-px flex-1 bg-linear-to-r from-line-strong to-transparent rtl:bg-linear-to-l" />
    </div>
  );
}

/** Ambient background: grid lines + drifting glow orbs. */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-60 mask-[radial-gradient(ellipse_80%_60%_at_50%_0%,#000_30%,transparent_80%)]" />
      <div className="absolute -top-40 start-[10%] size-[42rem] animate-float rounded-full bg-signal/10 blur-[140px]" />
      <div className="absolute top-[30%] -end-40 size-[36rem] animate-float rounded-full bg-glow/10 blur-[140px] [animation-delay:-4s]" />
    </div>
  );
}

/** Mouse-follow spotlight for cards with the `spotlight` utility. */
export function trackSpotlight(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}
