import type { ComponentType, SVGProps } from "react";
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiPython,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";

type Entry = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  hover: string;
};

// ⚠️ hover classes must be complete literal strings — Tailwind's scanner
// can't see dynamically built class names like `group-hover:text-[${color}]`.
// Hexes are the official Simple Icons brand colors.
const TECH_ICONS: Record<string, Entry> = {
  TypeScript: { Icon: SiTypescript, hover: "group-hover:text-[#3178C6]" },
  JavaScript: { Icon: SiJavascript, hover: "group-hover:text-[#F7DF1E]" },
  React: { Icon: SiReact, hover: "group-hover:text-[#61DAFB]" },
  // Next.js brand is black — invisible on the dark canvas. `text-ink` solves it
  // with tokens: ink is near-black in light mode, cream in dark mode — accurate
  // in light, legible in dark, on-palette in both.
  "Next.js": { Icon: SiNextdotjs, hover: "group-hover:text-ink" },
  Python: { Icon: SiPython, hover: "group-hover:text-[#3776AB]" },
  FastAPI: { Icon: SiFastapi, hover: "group-hover:text-[#009688]" },
  PostgreSQL: { Icon: SiPostgresql, hover: "group-hover:text-[#4169E1]" },
  MongoDB: { Icon: SiMongodb, hover: "group-hover:text-[#47A248]" },
  "Tailwind CSS": { Icon: SiTailwindcss, hover: "group-hover:text-[#06B6D4]" },
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

  return (
    <Icon
      aria-hidden
      className={`transition-colors duration-200 ${hover} ${className}`}
    />
  );
}