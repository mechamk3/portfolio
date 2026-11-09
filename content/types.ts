export type ProjectKind = "work" | "personal";
export type ExperienceTone = "ok" | "pilot";

export type ProjectItem = {
  name: string;
  year: string;
  tagline: string;
  description?: string;
  stack: string[];
  slug?: string;
  cover?: string;
  badge?: string;
  live?: string;
  liveUrl?: string;
  source?: string;
  sourceUrl?: string;
  status: string;
  tone: ExperienceTone;
  kind: ProjectKind;
};

export type ExperienceProject = {
  name: string;
  status: string;
  tone: ExperienceTone;
  description: string[];
};

export type ExperienceRole = { role: string; period: string; current: boolean };
export type ExperienceItem = {
  company: string;
  location: string;
  current: boolean;
  roles: ExperienceRole[];
  summary: string[];
  projects: ExperienceProject[];
  footnote?: string;
};