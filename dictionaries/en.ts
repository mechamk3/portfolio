const en = {
  meta: {
    title: "Your Name — Software Engineer",
    description:
      "Software engineer building fast, reliable web applications with TypeScript, React and Next.js.",
  },
  nav: { home: "Home", about: "About", projects: "Projects", contact: "Contact" },
  footer: { rights: "© 2026 MohammadJavad Tolou - All rights reserved.", ver: "v. 1.0.0" },
  home: {
    status: "Open to new opportunities",
    name: "Your Name",
    role: "Software Engineer",
    tagline:
      "I design and build web applications that are fast, accessible and easy to maintain — from database schema to the last pixel.",
    viewWork: "View my work",
    contactMe: "Get in touch",
    stackLabel: "Tech I work with",
    stack: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    work: { label: "Selected work" },
  },
  projects: {
    meta: {
      title: "Projects — Your Name",
      description: "Selected work — applications and tools I've designed and built.",
    },
    label: "Selected work",
    heading: "Things I've built.",
    intro:
      "Every project here started with a real problem I had — that's the filter I apply before writing the first line of code.",
    caseStudy: "Read the case study",
    items: [
      {
        name: "HRIS — Human Resources Information System",
        slug: "hris",
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
  about: {
    meta: {
      title: "About — Your Name",
      description:
        "Who I am, how I work, and what I care about as a software engineer.",
    },
    label: "About",
    heading: "Building products, not just pages.",
    intro: [
      "I'm a software engineer who cares about the whole product: the database behind it, the API that serves it, and the interface people actually touch. Most of my work lives in the TypeScript ecosystem — React and Next.js on the front, Node.js on the back.",
      "I like problems where correctness and speed matter: tools people rely on every day, dashboards that stay fast with real data, and features that ship without breaking the ones already in production.",
    ],
    snapshot: {
      label: "Snapshot",
      role: "Role",
      roleValue: "Software Engineer",
      focus: "Focus",
      focusValue: "Web apps — from database to UI",
      location: "Based in",
      locationValue: "Your City",
      availability: "Status",
      availabilityValue: "Open to opportunities",
    },
    principlesLabel: "How I work",
    principles: [
      {
        title: "Ship, then refine",
        text: "A working feature in users' hands beats a perfect one on a branch. I build in small, reviewable increments and iterate on real feedback.",
      },
      {
        title: "Boring where it counts",
        text: "Proven tools, typed code, clear boundaries. The innovation budget is best spent on the product, not the plumbing.",
      },
      {
        title: "Details are the product",
        text: "Loading states, empty states, keyboard focus, the 200ms that makes a page feel instant — polish isn't a phase, it's the work.",
      },
    ],
    cta: {
      text: "The best way to judge an engineer is their work.",
      link: "See my project",
    },
    moreLink: "More about me",
  },
  contact: {
    meta: {
      title: "Contact — Your Name",
      description: "Get in touch — I'm open to opportunities and interesting projects.",
    },
    label: "Contact",
    heading: "Let's build something.",
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
  },
};

export type Dictionary = typeof en;
export default en;