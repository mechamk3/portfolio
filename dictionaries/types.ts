type ProjectItem = {
  name: string;
  year: string;
  tagline: string;
  description: string;
  stack: string[];
  slug?: string;
  cover?: string;
  badge?: string;
  live?: string;
  liveUrl?: string;
  source?: string;
  sourceUrl?: string;
};

type ExperienceTone = "ok" | "pilot";
type ExperienceProject = {
  name: string;
  status: string;
  tone: ExperienceTone;
  description: string[];
};
type ExperienceRole = { role: string; period: string; current: boolean };
type ExperienceItem = {
  company: string;
  location: String;
  current: boolean;
  roles: ExperienceRole[];
  summary: string[];
  projects: ExperienceProject[];
  footnote?: string;
};