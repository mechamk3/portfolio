import type { ExperienceItem, ProjectItem } from "./types";

const en = {
  meta: {
    title: "MohammadJavad Tolou — Software Engineer",
    description:
      "Software engineer building fast, reliable web applications with TypeScript, React and Next.js.",
  },
  nav: { home: "Home", projects: "Projects", experience: "Experience", about: "About", contact: "Contact" },
  footer: { rights: "© 2026 MohammadJavad Tolou - All rights reserved.", ver: "v. 1.0.0" },
  home: {
    name: "MohammadJavad Tolou",
    role: "Software Engineer",
    tagline:
      "I turn ideas into software, from designing the systems behind it to building the interface and shaping the experience of using it.",
    stackLabel: "What I work with",
    stack: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Python", "FastAPI", "PostgreSQL", "MongoDB"],
  },
  projects: {
    meta: {
      title: "Projects — MohammadJavad Tolou",
      description: "Selected work — applications and tools I've designed and built.",
    },
    label: "Projects",
    heading: "Things I've built.",
    intro: "A look at the projects I've worked on, the technologies I've used, and the ideas I've brought to life.",
    caseStudy: "Read more",
    kindLabel: {
      work: "Work",
      personal: "Personal",
    },
    items: [
      {
        name: "HRIS — Human Resources Information System",
        slug: "hris",
        status: "In production",
        tone: "ok",
        kind: "work",
        year: "2025",
        tagline: "An employee information system built to centralize employee records and replace paper-based and spreadsheet workflows.",
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
    viewAll: "View all projects",
    underConstruction: {
      title: "Project Details",
      text: "still working on this page. check back soon! ;)",
      go2p: "Projects",
      go2h: "Homepage",
    },
  },
  experience: {
    label: "Experience",
    heading: "Where I've worked.",
    previouslyLabel: "Previously",
    selectedWorkLabel: "Featured Projects",
    items: [
      {
        company: "Padisar Informatics",
        location: "Tehran, Iran",
        current: true,
        roles: [
          { role: "Software Development Specialist", period: "Feb 2025 – Present", current: true },
          { role: "Software Development Intern", period: "Dec 2024 – Feb 2025", current: false },
        ],
        summary: [
          "Started my professional career in software development here, progressing from small development and maintenance tasks to independently building, deploying, and maintaining internal systems.",
          "I've gained experience across all stages of the software development lifecycle, from requirements analysis and system design to implementation, testing, deployment, support, and documentation. I've independently developed two internal tools from scratch that are now in use across the company. I also contribute to the design and development of the company's ITSM platform.",
        ],
        projects: [
          {
            name: "HR Information System",
            status: "In production",
            tone: "ok",
            description: [
              "Independently designed and developed the company's HR information system from scratch, replacing paper-based processes and scattered Excel files. The system is actively used by the HR team and has undergone multiple iterations based on real business needs and user feedback.",
            ],
          },
          {
            name: "SMS Gateway",
            status: "In production",
            tone: "ok",
            description: [
              "Independently designed and developed a shared messaging platform for production use, consisting of an SMS gateway and a management panel. Integrated the platform with multiple internal systems for one-time login codes (OTPs), contract-expiration notifications, employee messaging, and Zabbix monitoring alerts. The platform also maintains message history and delivery-status records.",
            ],
          },
          {
            name: "ITSM SaaS Platform",
            status: "Pilot production · 2 tenants",
            tone: "pilot",
            description: [
              "Contribute to the design and development of a multi-tenant ITSM platform focused on customer support, ticketing, and service-delivery workflows.",
              "Designed and implemented the multi-tenant architecture, tenant-level authentication and access control with dynamic roles and permissions, and hierarchical structures for employees and customers. Also developed the core ticketing system and a service-request workflow for an infrastructure-services tenant, supporting ticket categorization and routing, multi-step review and approval, and process reporting. My work also spans frontend and backend development, database design, overall system architecture, and deployment.",
            ],
          },
        ],
        footnote:
          "Across these systems, I have also handled Linux-based deployments and maintained technical documentation for the systems I build.",
      },
    ] as ExperienceItem[],
  },
  about: {
    label: "About",
    heading: "I've always liked building things.",
    intro: [
      "Long before software engineering, I enjoyed sketching, designing, assembling things, and exploring how things were made. Software eventually became a medium where all of those instincts could come together: understanding a problem, designing a system, shaping an experience, and bringing an idea into existence.",
      "Over time, working on real products taught me that building software is rarely a straight line. The first version can be rough, decisions can be wrong, and requirements can change. What matters is being willing to step back, acknowledge mistakes, learn from them, fix what isn't working, and keep improving.",
      "I'm still early in my engineering journey, with a lot left to learn. I'm working toward becoming the kind of engineer people can trust with difficult systems — someone who can build systems that scale, last, and stand up to real-world use.",
    ],
  },
  contact: {
    label: "Contact",
    heading: "Feel free to reach out.",
    channels: {
      email: { label: "Email", value: "mohammadjavadtolou@gmail.com" },
      github: { label: "GitHub", value: "@mechamk3" },
      linkedin: { label: "LinkedIn", value: "in/yourname" },
    },
  },
  notFound: {
    code: "404",
    text: "the page you're looking for doesn't exist :(",
    home: "Back to home",
  },
};

export type Dictionary = typeof en;
export default en;