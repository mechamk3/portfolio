import type { ComponentType, SVGProps } from "react";

import {
  TypeScriptIcon,
  JavaScriptIcon,
  TailwindIcon,
  ViteIcon,
  AntDesignIcon,
  MantineIcon,
  PostgreSQLIcon,
  MongoDBIcon,
  PythonIcon,
  FastAPIIcon,
  NextJsIcon,
  ReactIcon,
} from "@/components/icons/tech";

type Entry = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  hover: string;
};

// ⚠️ hover classes must be complete literal strings — Tailwind's scanner
// can't see dynamically built class names. Hexes are official brand colors.
// All icons are self-hosted inline SVGs — no runtime requests, no icon library.
const TECH_ICONS: Record<string, Entry> = {
  TypeScript: { Icon: TypeScriptIcon, hover: "group-hover:text-[#3178C6]" },
  JavaScript: { Icon: JavaScriptIcon, hover: "group-hover:text-[#F7DF1E]" },
  "Tailwind CSS": { Icon: TailwindIcon, hover: "group-hover:text-[#06B6D4]" },
  // Next.js brand is black — invisible on the dark canvas. `text-ink` solves it
  // with tokens: near-black in light mode, cream in dark mode.
  "Next.js": { Icon: NextJsIcon, hover: "group-hover:text-ink" },
  Vite: { Icon: ViteIcon, hover: "group-hover:text-[#646CFF]" },
  "Ant Design": { Icon: AntDesignIcon, hover: "group-hover:text-[#0170FE]" },
  Mantine: { Icon: MantineIcon, hover: "group-hover:text-[#339AF0]" },
  Python: { Icon: PythonIcon, hover: "group-hover:text-[#3776AB]" },
  FastAPI: { Icon: FastAPIIcon, hover: "group-hover:text-[#009688]" },
  PostgreSQL: { Icon: PostgreSQLIcon, hover: "group-hover:text-[#4169E1]" },
  MongoDB: { Icon: MongoDBIcon, hover: "group-hover:text-[#47A248]" },
  React: { Icon: ReactIcon, hover: "group-hover:text-[#61DAFB]" },
};

export default function TechIcon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const entry = TECH_ICONS[name];
  if (!entry) return null; // graceful fallback: unmapped techs render without an icon

  const { Icon, hover } = entry;
  return <Icon aria-hidden className={`transition-colors duration-200 ${hover} ${className}`} />;
}