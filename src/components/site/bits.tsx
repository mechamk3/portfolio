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
      className={`inline-flex items-center gap-1.5 rounded-none border px-2.5 py-0.5 text-[11px] font-semibold ${styles[tone]}`}
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
    <span className="inline-flex items-center gap-1.5 rounded-none border border-line bg-surface-2 px-2.5 py-0.5 text-[11px] text-ink-2">
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
      {index && <span className="section-label-index flex size-8 shrink-0 items-center justify-center bg-signal font-mono text-xs font-bold text-signal-foreground">{index}</span>}
      <span className={`text-xs font-medium text-ink-2 ${mono}`}>{label}</span>
      <span aria-hidden className="h-px flex-1 bg-line-strong" />
    </div>
  );
}

/** A quiet canvas shared by all locale pages. */
export function Backdrop() {
  return (
    <div aria-hidden className="app-backdrop pointer-events-none fixed inset-0 -z-10" />
  );
}

