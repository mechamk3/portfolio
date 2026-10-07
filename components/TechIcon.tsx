import type { ComponentType, SVGProps } from "react";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiPython,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";

const TECH_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  TypeScript: SiTypescript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  Python: SiPython,
  FastAPI: SiFastapi,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  "Tailwind CSS": SiTailwindcss,
};

export default function TechIcon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const Icon = TECH_ICONS[name];
  if (!Icon) return null; // graceful fallback: new dictionary techs render without an icon

  return (
    <Icon
      aria-hidden
      className={`transition-colors duration-200 group-hover:text-accent ${className}`}
    />
  );
}