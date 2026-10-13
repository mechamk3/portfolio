import type { ComponentType, SVGProps } from "react";

import {
  TypeScriptIcon, JavaScriptIcon, TailwindIcon, ViteIcon, AntDesignIcon,
  MantineIcon, PostgreSQLIcon, MongoDBIcon, PythonIcon, FastAPIIcon,
  NextJsIcon, ReactIcon, SQLiteIcon, NginxIcon, DockerIcon, CreateReactAppIcon
} from "@/components/icons/tech";

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
  Mantine: MantineIcon,
  Python: PythonIcon,
  FastAPI: FastAPIIcon,
  SQLite: SQLiteIcon,
  PostgreSQL: PostgreSQLIcon,
  MongoDB: MongoDBIcon,
  Nginx :NginxIcon,
  Docker :DockerIcon,
};

export default function TechIcon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const Icon = TECH_ICONS[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}