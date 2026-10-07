const en = {
  meta: {
    title: "Your Name — Software Engineer",
    description:
      "Software engineer building fast, reliable web applications with TypeScript, React and Next.js.",
  },
  nav: { home: "Home", projects: "Projects", experience: "Experience", about: "About", contact: "Contact" },
  footer: { rights: "© 2026 MohammadJavad Tolou - All rights reserved.", ver: "v. 1.0.0" },
  home: {
    status: "Open to new opportunities",
    name: "MohammadJavad Tolou",
    role: "Software Engineer",
    tagline:
      "I turn ideas into software, from designing the systems behind it to building the interface and shaping the experience of using it.",
    viewWork: "View my work",
    contactMe: "Get in touch",
    stackLabel: "What I work with",
    stack: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Python", "FastAPI", "PostgreSQL", "MongoDB"],
    work: { label: "Selected work" },
  },
  projects: {
    meta: {
      title: "Projects — Your Name",
      description: "Selected work — applications and tools I've designed and built.",
    },
    label: "Projects",
    featured: "Featured project",
    heading: "Things I've built.",
    intro:
      "Every project here started with a real problem I had — that's the filter I apply before writing the first line of code.",
    caseStudy: "Read the case study",
    items: [
      {
        name: "HRIS — Human Resources Information System",
        slug: "hris",
        badge: "In production — 100–150 employees",
        year: "2025",
        tagline: "Internal HR system in production for 100–150 employees.",
        description:
          "Replaced scattered personnel records (paper, Excel, Access) with a single source of data: employees enter their own information, HR approves every record, and managers build custom reports from a visual report builder — no more manual reconciliation.",
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
      },
    ] as ProjectItem[],
    moreLabel: "Coming soon",
    moreText: "The next project is in development and will land here soon.",
    cta: {
      heading: "Have a project in mind?",
      button: "Get in touch",
    },
    viewAll: "View all projects",
  },
  experience: {
    label: "Experience",
    heading: "Where I've worked.",
    previouslyLabel: "Previously",
    selectedWorkLabel: "Selected work",
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
          "Started my professional software career here with no prior industry experience and gradually moved from small development and maintenance tasks to independently building, deploying, and maintaining internal systems.",
          "Today, I work across the full software development lifecycle — from requirements analysis and system design to implementation, testing, deployment, documentation, and iteration. I have taken ownership of multiple internal tools while also contributing to the development of Padisar's first software product.",
        ],
        projects: [
          {
            name: "HR Information System",
            status: "In production",
            tone: "ok",
            description: [
              "Built an internal HR information system from scratch, replacing paper- and spreadsheet-based workflows. The system is actively used by the HR team and has gone through multiple iterations as real requirements and feedback evolved.",
            ],
          },
          {
            name: "SMS Gateway",
            status: "In production",
            tone: "ok",
            description: [
              "Built and deployed an internal SMS platform with a management interface, contact management, contact grouping, and bulk messaging capabilities used by the marketing team.",
            ],
          },
          {
            name: "CRM Platform",
            status: "Pilot production · 2 tenants",
            tone: "pilot",
            description: [
              "Currently driving the technical development of a multi-tenant CRM focused on customer support, ticketing, and service workflows.",
              "Designed and implemented its multi-tenant architecture, tenant-level authentication and authorization, dynamic roles and permissions, and hierarchical employee and customer structures. Built the core ticketing system and a service-request workflow for an infrastructure-provider tenant, including ticket routing, customer problem categories, multi-step validations, decisions, and reporting. Contributed across the frontend, backend, database design, deployment, and overall system architecture.",
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
      "Over time, working on real products taught me that building software is rarely a straight line. The first version can be rough, decisions can be wrong, and requirements can change. What matters is being willing to step back, learn, fix what isn't working, and keep improving.",
      "I'm still early in my engineering journey, with a lot left to learn. I'm working toward becoming the kind of engineer people can trust with difficult systems — someone who can build things that scale, last, and stand up to real-world use.",
    ],
  },
  contact: {
    meta: {
      title: "Contact — Your Name",
      description: "Get in touch — I'm open to opportunities and interesting projects.",
    },
    label: "Contact",
    heading: "Feel free to reach out.",
    text: "I'm currently open to new opportunities and interesting projects. If my work resonates with you, my inbox is the best starting point.",
    cta: "Say hello",
    channelsLabel: "Direct lines",
    channels: {
      email: { label: "Email", value: "you@example.com", note: "Fastest way to reach me" },
      github: { label: "GitHub", value: "@yourname", note: "Code, experiments and this portfolio" },
      linkedin: { label: "LinkedIn", value: "in/yourname", note: "The professional timeline" },
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
};

export type Dictionary = typeof en;
export default en;