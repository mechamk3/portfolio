import type { ProjectItem } from "./types";

const en = {
  meta: {
    title: "MohammadJavad Tolou — Software Engineer",
    description:
      "Software engineer building fast, reliable web applications with TypeScript, React and Next.js.",
  },
  nav: { menu: "Menu", home: "Home", projects: "Projects", about: "About", contact: "Contact" },
  footer: { rights: "© 2026 MohammadJavad Tolou - All rights reserved.", ver: "1.0.0" },
  home: {
    status: "Open to new opportunities",
    name: "MohammadJavad Tolou",
    role: "Software Engineer",
    tagline: [
      "I turn ideas into software,",
      "from designing the systems behind it",
      "to building the interface and shaping the experience of using it.",
    ],
    viewWork: "View my work",
    contactMe: "Get in touch",
    stackLabel: "What I work with",
    stack: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Python", "FastAPI", "PostgreSQL", "MongoDB"],
    work: { label: "Selected work" },
  },
  projects: {
    meta: {
      title: "Projects — MohammadJavad Tolou",
      description: "Selected work — applications and tools I've designed and built.",
    },
    label: "Projects",
    featured: "Featured project",
    heading: "Things I've built.",
    intro: "A look at the projects I've worked on, the technologies I've used, and the ideas I've brought to life.",
    caseStudy: "Read the case study",
    comingSoon: "Case study coming soon",
    kindLabel: {
      work: "Work",
      personal: "Personal",
    },
    items: [
      {
        name: "HRIS — Human Resources Information System",
        slug: "hris",
        detailsReady: true,
        cover: "/projects/hris/admin-home.webp",
        badge: "In production — 100–150 employees",
        status: "In production",
        tone: "ok",
        kind: "work",
        year: "2025",
        tagline: "An employee information system built to centralize employee records and replace paper-based and spreadsheet workflows.",
        description:
          "Replaced scattered personnel records (paper, Excel, Access) with a single source of data: employees enter their own information, HR approves every record, and managers build custom reports from a visual report builder — no more manual reconciliation.",
        stack: ["PostgreSQL", "Python", "FastAPI", "JavaScript", "React", "Create React App", "Tailwind CSS"],
      },
      {
        name: "SMS Gateway",
        slug: "smsGateway",
        status: "In production",
        tone: "ok",
        kind: "work",
        year: "2026",
        tagline: "A shared Messaging service for our internal applications, with a web interface for managing contacts and contact groups, sending messages, and viewing message history.",
        stack: ["PostgreSQL", "Python", "FastAPI", "TypeScript", "React", "Vite", "Ant Design"],
      },
      {
        name: "Spoola: a Self-Hosted Music Radio",
        slug: "spoola",
        status: "In development",
        tone: "pilot",
        kind: "personal",
        year: "2026",
        tagline: "A self-hosted music radio that turns your local music library into a continuous, automatically shuffled listening experience, accessible through a web interface.",
        stack: ["SQLite", "Python", "TypeScript", "React"],
      },

    ] as ProjectItem[],
    AllLabel: "All Projects",
    AllText: "Explore all my projects, from internal tools to personal experiments.",
    cta: {
      heading: "Have a project in mind?",
      button: "Get in touch",
    },
    viewAll: "View all projects",
    underConstruction: {
      title: "Project Details",
      text: "still working on this page. check back soon! ;)",
      go2p: "Projects",
      go2h: "Homepage",
    },
  },
  about: {
    label: "About",
    heading: "I've always liked building things.",
    intro: [
      "Long before software engineering, I enjoyed sketching, designing, assembling things, and exploring how things were made. Software eventually became a medium where all of those instincts could come together: understanding a problem, designing a system, shaping an experience, and bringing an idea into existence.",
      "Over time, working on real projects taught me that building software is rarely a straight line. The first version can be rough, decisions can be wrong, and requirements can change. What matters is being willing to step back, acknowledge mistakes, learn from them, fix what isn't working, and keep improving.",
      "I'm still early in my engineering journey, with a lot left to learn. I'm working toward becoming the kind of engineer people can trust with difficult systems — someone who can build systems that scale, last, and stand up to real-world use.",
    ],
  },
  contact: {
    meta: {
      title: "Contact — MohammadJavad Tolou",
      description: "Get in touch — I'm open to opportunities and interesting projects.",
    },
    label: "Contact",
    heading: "Feel free to reach out.",
    text: "I'm currently open to new opportunities and interesting projects. If my work resonates with you, my inbox is the best starting point.",
    cta: "Say hello",
    channelsLabel: "Direct lines",
    channels: {
      email: { label: "Email", value: "mohammadjavadtolou@gmail.com", note: "" },
      github: { label: "GitHub", value: "@mechamk3", note: "" },
      linkedin: { label: "LinkedIn", value: "in/mohammadjavadtolou", note: "" },
    },
    detailsLabel: "Details",
    details: {
      status: { label: "Status", value: "Open to opportunities" },
      location: { label: "Based in", value: "Your City" },
      response: { label: "Response time", value: "Usually within a day" },
      timezone: { label: "Time zone", value: "UTC+3:30" },
    },
    // en.ts
    resume: {
      label: "Resume",
    },
  },
  // en.ts
  // dictionaries/en.ts
  notFound: {
    code: "404",
    text: "the page you're looking for doesn't exist :(",
    home: "Back to home",
  },
};

export type Dictionary = typeof en;
export default en;