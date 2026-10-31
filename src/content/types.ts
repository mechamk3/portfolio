export type ProjectKind = "work" | "personal";
export type ExperienceTone = "ok" | "pilot";

export type ProjectItem = {
  name: string;
  slug: string;
  year: string;
  tagline: string;
  stack: string[];
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
