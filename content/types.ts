export type ProjectKind = "work" | "personal";
export type ExperienceTone = "ok" | "pilot";

export type ProjectItem = {
  name: string;
  year: string;
  tagline: string;
  description?: string;
  stack: string[];
  slug?: string;
  /** true once the project has a real details page (otherwise the card does not link) */
  detailsReady?: boolean;
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