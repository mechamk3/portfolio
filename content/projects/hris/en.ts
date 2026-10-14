type Capability = { label: string; note?: string; value: string; tone: "full" | "limited" | "none" };
type HrisRole = { name: string; code: string; landing: string; capabilities: Capability[] };
type Shot = { src: string; title: string; caption: string };

const en = {
  meta: {
    title: "Human Resources Information System · Project Details",
    description:
      "An internal HR information system in production for 100–150 employees: a single source of data, employee self-service entry with HR approval, and a custom report builder. Built end-to-end by one engineer.",
  },
  backToProjects: "All projects",
  badge: "In production in the organization since late 2025 — 100–150 users",
  name: "Human Resources Information System",
  title: "Ending scattered personnel data and manual data collection",
  roleLabel: "My role",
  role: "Software Engineer",
  lead: "This application was built for organizations whose personnel data is scattered across physical files, Excel and Access — where every quarterly management report means collecting data from several sources by hand. The fix: one single source of data with a report builder on top, and data collected by employees themselves instead of manual HR entry — with final approval on every record.",
  stackLabel: "Stack",
  stack: ["PostgreSQL", "Python", "FastAPI", "JavaScript", "React(CRA)", "Tailwind CSS", "Nginx"],
  overviewLabel: "Project overview",
  overview: [
    { label: "Status", value: "In production — operational" },
    { label: "Users", value: "100–120 Users (Organization employees)" },
  ],
  audience: [
    {
      title: "When is it useful?",
      text: "When employee records are scattered across different files, collecting and updating them requires constant follow-ups with employees, and the same information has to be entered repeatedly in different forms. This system brings employee records together in one place, making them easier to maintain and simplifying access to information and the preparation of reports.",
    },
  ],
  tocLabel: "Sections",
  hint: "Click any screenshot to view it full-size.",
  problem1: {
    nav: "Problem 1 — Scattered data",
    tag: "Problem 1",
    heading: "Personnel information lived in several disconnected sources",
    lead: "Recording or editing one person's information wasn't the hard part. The trouble started at the end of every quarter, when management asked for the usual HR reports — or other combined reports on the state of the personnel. When data has no single source, building such a report out of scattered files is genuinely difficult.",
    sources: [
      { name: "Physical files", note: "Paper and folders" },
      { name: "Excel files", note: "Multiple copies, multiple owners" },
      { name: "Access", note: "A separate database" },
    ],
    consequenceLabel: "The result",
    consequence:
      "Each source holds one piece of the picture. A quarterly report combining several fields of active personnel — education, department, seniority and contract status in one table — has to be extracted from each source by hand and matched together. The more fields management asks for, the slower and more error-prone it gets.",
    solutionTitle: "A single source of data: the application's database",
    solutionText:
      "All personnel information lives in one place, and managerial roles can build any report they need directly from it — choosing fields, filters and sorting — without manually reconciling multiple files.",
    shots: [
      {
        src: "/projects/hris/report-builder.webp",
        title: "Report builder",
        caption: "The manager picks report fields from everything registered in the system, filters and sorts the records, previews the result and downloads a complete Excel export — the same report that used to be assembled by hand from several sources.",
      },
      {
        src: "/projects/hris/personnel-list.webp",
        title: "Personnel list",
        caption: "Every record in one searchable, filterable list — instead of being spread across files and folders.",
      },
    ],
  },
  problem2: {
    nav: "Problem 2 — Data collection",
    tag: "Problem 2",
    heading: "Collecting everyone's information was hard work, even with a single source",
    lead: "A single source wasn't enough; someone still had to collect every employee's information and enter it into that source. The solution was to make the application itself role-driven: every employee signs in with their own account and enters their own data. And so this wouldn't come at the cost of wrong data, every employee input must be approved by HR before it becomes final.",
    orderNoteTitle: "An important note on the order of work",
    orderNote:
      "Registering a person and creating their user account are two separate steps. First, a manager creates a base personnel record (personnel number, full name, general info). Then, separately, a user account is created and connected to that person's still-unlinked record.",
    steps: [
      {
        who: "Manager",
        title: "Creates the base personnel record",
        text: "The manager creates a new personnel record with just a personnel number, first and last name, and a few general fields (one at a time, in batch, or from a CSV file).",
      },
      {
        who: "Superadmin",
        title: "Creates the user account and connects it to that record",
        text: "In the account creation form, a username, password and role are set, and the person's still-unlinked personnel record is picked from a searchable dropdown, connecting the account to it.",
      },
      {
        who: "Employee",
        title: "Signs in and completes their own information",
        text: "With the freshly created account, the employee signs into their personal dashboard, fills in the required fields, and uploads and submits their documents (ID card, insurance documents, education documents, and so on).",
      },
      {
        who: "HR",
        title: "Reviews and approves",
        text: "The employee's request arrives in the manager's requests inbox. If HR finds the information correct, it is approved; otherwise it is rejected.",
      },
    ],
    resultTitle: "The result: a complete, permanent record",
    resultText: "Once approved, that person's information is fully registered in the application and remains available to authorized roles for good.",
    shots: [
      {
        src: "/projects/hris/user-management.webp",
        title: "User management",
        caption: "The account creation form: username, password, role, and a searchable dropdown of unlinked personnel records to connect the account to the right person.",
      },
      {
        src: "/projects/hris/requests-inbox.webp",
        title: "Requests inbox",
        caption: "Every edit and every document an employee submits waits here for HR approval before it is applied.",
      },
      {
        src: "/projects/hris/employee-dashboard.webp",
        title: "Employee dashboard",
        caption: "The dashboard an employee sees after signing in — where they complete their information and documents.",
      },
    ],
  },
  myRole: {
    nav: "My role & stack",
    heading: "My role: from design to deployment and support",
    text: "I built this entire project from scratch, from the first design to deployment on the server — and supporting the application has been mine as well: database design, building the backend and the frontend, implementing every feature, deploying to the server, and supporting it afterwards.",
    stack: [
      { label: "Database", value: "PostgreSQL" },
      { label: "Backend", value: "Python, FastAPI" },
      { label: "Frontend", value: "React (CRA), JavaScript, Tailwind CSS" },
      { label: "Deployment", value: "Nginx, systemd" },
    ],
    deployLabel: "Deployment",
    deploy: [
      { node: "User's browser", note: "" },
      { node: "Nginx", note: "reverse proxy on ports 80 & 443" },
      { node: "React frontend", note: "separate systemd service" },
      { node: "FastAPI backend", note: "separate systemd service" },
      { node: "PostgreSQL", note: "" },
    ],
  },
  roles: {
    nav: "User roles",
    heading: "Four user roles",
    lead: "Each user's access is limited by their role. The high-level roles (superadmin, admin and report user) can reach the personnel management area; the employee sees only their own personal dashboard.",
    roles: [
      {
        name: "Superadmin",
        code: "superadmin",
        landing: "The only role with access to the user management module — meaning the only one that can create an account and connect it to a personnel record. Full access everywhere else.",
        capabilities: [
          { label: "Access to the personnel management area", value: "Full access", tone: "full" },
          { label: "View personnel information", value: "All records", tone: "full" },
          { label: "Create new personnel records", value: "Full access", tone: "full" },
          { label: "Edit information & documents", note: "Editing their own info needs no approval either", value: "No approval needed", tone: "full" },
          { label: "Report builder & exports", value: "Full access", tone: "full" },
          { label: "SMS sending", note: "Permission is granted per account", value: "Separate permission", tone: "limited" },
          { label: "Review employee requests", value: "Approve or reject", tone: "full" },
          { label: "Create & connect user accounts", value: "Full access", tone: "full" },
        ],
      },
      {
        name: "Admin",
        code: "admin",
        landing: "Has almost every superadmin permission except the user management module — it cannot create user accounts or connect them to personnel records.",
        capabilities: [
          { label: "Access to the personnel management area", value: "Full access", tone: "full" },
          { label: "View personnel information", value: "All records", tone: "full" },
          { label: "Create new personnel records", value: "Full access", tone: "full" },
          { label: "Edit information & documents", note: "Editing their own info needs no approval either", value: "No approval needed", tone: "full" },
          { label: "Report builder & exports", value: "Full access", tone: "full" },
          { label: "SMS sending", note: "Permission is granted per account", value: "Separate permission", tone: "limited" },
          { label: "Review employee requests", value: "Approve or reject", tone: "full" },
          { label: "Create & connect user accounts", value: "No access", tone: "none" },
        ],
      },
      {
        name: "Report user",
        code: "report_user",
        landing: "A high-level role with limited, read-only access: it sees the records and exports reports from them, but creates and edits nothing.",
        capabilities: [
          { label: "Access to the personnel management area", value: "Limited access", tone: "limited" },
          { label: "View personnel information", value: "View only", tone: "limited" },
          { label: "Create new personnel records", value: "No access", tone: "none" },
          { label: "Edit information & documents", value: "No access", tone: "none" },
          { label: "Report builder & exports", note: "Excel or PDF export", value: "Full access", tone: "full" },
          { label: "SMS sending", note: "Permission is granted per account", value: "Separate permission", tone: "limited" },
          { label: "Review employee requests", value: "No access", tone: "none" },
          { label: "Create & connect user accounts", value: "No access", tone: "none" },
        ],
      },
      {
        name: "Regular user (employee)",
        code: "user",
        landing: "The employee. Sees only their own personal dashboard, and every change they make is registered as a request for a manager to approve.",
        capabilities: [
          { label: "Access to the personnel management area", value: "No access", tone: "none" },
          { label: "View personnel information", value: "Own info only", tone: "limited" },
          { label: "Create new personnel records", value: "No access", tone: "none" },
          { label: "Edit information & documents", note: "Edit info, upload and delete documents", value: "On request, approved by a manager", tone: "limited" },
          { label: "Report builder & exports", value: "No access", tone: "none" },
          { label: "SMS sending", value: "No access", tone: "none" },
          { label: "Review employee requests", value: "No access", tone: "none" },
          { label: "User account", value: "Own account only", tone: "limited" },
        ],
      },
    ] as HrisRole[],
  },
  employee: {
    nav: "Employee experience",
    heading: "The employee experience in four pages",
    lead: "The same dashboard you saw in step three of the data-collection flow has these four parts.",
    pages: [
      { title: "My information", text: "Personal, family, education, job and financial information in separate tabs. The edit button registers a change request." },
      { title: "My documents", text: "Upload, download and delete personal documents, organized by document type." },
      { title: "My requests", text: "Request history with each request's status and the old and new values of every changed field." },
      { title: "User account", text: "Username, mobile number, email and access type." },
    ],
  },
  modules: {
    nav: "Additional modules",
    heading: "Additional modules",
    lead: "These parts aren't the reason the application exists, but they make day-to-day work easier for managers.",
    groups: [
      {
        name: "Management home",
        text: "The entry point managers land on after the “personnel management” button: three status cards (active personnel, contracts near expiry, expired contracts), six shortcut cards to the main sections, two round buttons for notifications and requests, and organizational charts (education, department, age group, gender, hiring trend and seniority).",
        shots: [
          { src: "/projects/hris/admin-home.webp", title: "Management home", caption: "The managers' entry point: status cards, six shortcut cards and organizational charts." },
        ],
      },
      {
        name: "Three ways to create a base record",
        text: "As you saw in problem two, the manager creates the base personnel record in one of these three ways; completing the rest is the employee's own job.",
        shots: [
          { src: "/projects/hris/add-batch.webp", title: "Batch entry", caption: "A few required fields per person (personnel number, first and last name) plus optional ones; “Add new record” lets several people be entered at once and submitted together." },
          { src: "/projects/hris/add-from-file.webp", title: "Entry from file", caption: "The manager downloads the CSV template, fills it in and uploads it back; each row in the file becomes a record. The fastest way to onboard a large number of personnel." },
          { src: "/projects/hris/add-single.webp", title: "Single entry", caption: "Every field of one person in a six-tab form: personal, family & contact, education, job, financial, and work history at the company." },
        ],
      },
      {
        name: "Personnel details & PDF export",
        text: "From the personnel list, each person's full details open in six tabs; from there you can go to their documents or edit them, or export a PDF of the complete information with a dedicated letterhead.",
        shots: [
          { src: "/projects/hris/personnel-details.webp", title: "Personnel details", caption: "Each person's full information in six tabs, with access to edit and documents." },
          { src: "/projects/hris/personnel-pdf.webp", title: "PDF export", caption: "A PDF report with a dedicated letterhead of one person's details." },
        ],
      },
      {
        name: "Personnel documents",
        text: "Every person has their own documents page; documents are organized into tabs like photo, identity and education documents, and each row can be downloaded or deleted.",
        shots: [
          { src: "/projects/hris/personnel-documents.webp", title: "Personnel documents", caption: "Upload, download and delete each person's documents by document type." },
        ],
      },
      {
        name: "SMS messaging",
        text: "The application is connected to the same SMS provider used for OTP. The manager picks recipients manually or by organizational unit, previews the message, then sends or saves a draft; the full send history can be filtered by date range.",
        shots: [
          { src: "/projects/hris/sms-send.webp", title: "SMS composer", caption: "Pick recipients manually or by organizational unit, then send or save a draft." },
          { src: "/projects/hris/sms-history.webp", title: "Message history", caption: "Sent messages with status, recipients and a date-range filter." },
        ],
      },
      {
        name: "Contract notifications",
        text: "The round notifications button lists contracts ending soon (within the next 45 days — yellow) and contracts past their end date (red); each notification links straight to that person's details.",
        shots: [
          { src: "/projects/hris/contract-notifications.webp", title: "Notifications", caption: "Contracts near expiry and past due, separated into yellow and red." },
        ],
      },
    ],
  },
  summary: {
    nav: "Summary",
    heading: "In summary",
    points: [
      { title: "One source of data", text: "All personnel information in one database; combined reports without manually reconciling files." },
      { title: "A report builder for any report", text: "Choose fields, filters and sorting, with preview and Excel export." },
      { title: "Employees enter their own data", text: "Each employee enters their own information and documents; the manual collection burden comes off HR." },
      { title: "Managerial approval on every change", text: "Edits and documents are reviewed and approved by HR before they take effect." },
      { title: "Personnel record and user account, separated", text: "The base record is created by a manager; the user account is created separately and connected to it." },
      { title: "Role-based access control", text: "Four roles with clear scopes; only the superadmin creates user accounts." },
      { title: "High-volume data entry", text: "A batch form, a CSV template file and a full single-entry form for creating base records." },
      { title: "A Persian-first interface", text: "A fully RTL design with dates displayed in the Jalali (Shamsi) calendar." },
    ],
  },
  gallery: {
    nav: "App tour",
    heading: "App tour",
    lead: "A full pass through the application's screens, in one place.",
    shots: [
      { src: "/projects/hris/login.webp", title: "Sign-in", caption: "The sign-in screen with two methods: username and password, or mobile number (SMS verification code)." },
      { src: "/projects/hris/admin-home.webp", title: "Management home", caption: "The managers' entry point: status cards, six shortcut cards and organizational charts." },
      { src: "/projects/hris/personnel-list.webp", title: "Personnel list", caption: "A table of all records with search, filtering, sorting and pagination." },
      { src: "/projects/hris/personnel-list-filters.webp", title: "Personnel list with filter drawer", caption: "Filter by status, department, job group and subgroup, job band, skill level and employment type." },
      { src: "/projects/hris/add-batch.webp", title: "Add personnel: batch entry", caption: "Several base records at once, with only a few required fields." },
      { src: "/projects/hris/add-from-file.webp", title: "Add personnel: batch entry from file", caption: "Download the CSV template, fill it in and upload it back for group entry." },
      { src: "/projects/hris/add-single.webp", title: "Add personnel: single entry, full form", caption: "The complete six-tab form for entering all of one person's information at once." },
      { src: "/projects/hris/personnel-details.webp", title: "Personnel details", caption: "Each person's full information in six tabs, with access to edit and documents." },
      { src: "/projects/hris/personnel-pdf.webp", title: "Personnel PDF export", caption: "A PDF report with a dedicated letterhead of one person's details." },
      { src: "/projects/hris/personnel-documents.webp", title: "Personnel documents", caption: "Upload, download and delete each person's documents by document type." },
      { src: "/projects/hris/report-builder.webp", title: "Report builder", caption: "Choose any fields, filters and sorting, with preview and Excel export." },
      { src: "/projects/hris/sms-send.webp", title: "SMS composer", caption: "Pick recipients manually or by organizational unit, then send or save a draft." },
      { src: "/projects/hris/sms-history.webp", title: "Message history", caption: "Sent messages with status, recipients and a date-range filter." },
      { src: "/projects/hris/contract-notifications.webp", title: "Contract & welfare-card notifications", caption: "Contracts near expiry and past due, separated into yellow and red." },
      { src: "/projects/hris/requests-inbox.webp", title: "Requests inbox", caption: "Review and approve or reject employees' information and document requests." },
      { src: "/projects/hris/user-management.webp", title: "User management", caption: "Create a user account and connect it to an unlinked personnel record; superadmin only." },
      { src: "/projects/hris/employee-dashboard.webp", title: "Employee dashboard", caption: "The dashboard view an employee sees after signing in." },
      { src: "/projects/hris/employee-info.webp", title: "My information (employee)", caption: "The employee's personal, family, education, job and financial information in separate tabs." },
      { src: "/projects/hris/employee-documents.webp", title: "My documents (employee)", caption: "The employee uploads, downloads and deletes their own documents." },
      { src: "/projects/hris/employee-requests.webp", title: "My requests (employee)", caption: "The employee's request history with the old and new values of changed fields." },
      { src: "/projects/hris/employee-account.webp", title: "User account (employee)", caption: "The employee's username, mobile number, email and access type." },
    ],
  },
  demo: {
    nav: "Live demo",
    heading: "A sanitized live demo is on the way",
    text: "A demo environment with fictional data is being prepared so the product can be explored firsthand.",
    notices: [
      "The demo runs on fictional data only",
      "Production source code is private and belongs to the organization",
      "No organizational data is exposed anywhere on this page",
    ],
  },
  info: {
    heading: "Project information",
    facts: [
      { label: "Technologies", value: "PostgreSQL · Python · FastAPI · React · Tailwind CSS · Nginx · systemd" },
      { label: "Status", value: "Operational — in production since late 2025" },
      { label: "Users", value: "100–150 employees" },
      { label: "Source code", value: "Proprietary — not published" },
    ],
    privacy:
      "This is an internal enterprise system built for a real organization. The production source code belongs to the organization and cannot be published; this case study describes the work at a high level, and no organizational data appears on this page.",
  },
};

export type HrisContent = typeof en;
export default en;