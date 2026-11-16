/** Canonical outbound links — shared by the hero, contact section and footer. */
export const GITHUB_URL = "https://github.com/mechamk3";
export const LINKEDIN_URL = "https://www.linkedin.com/in/mohammadjavadtolou/";

/** Home-page section anchors, in reading order. */
export const SECTION_IDS = ["work", "experience", "about", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];
