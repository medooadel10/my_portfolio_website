export const profile = {
  name: "Mohammed Adel",
  role: "Flutter Developer & Mobile Software Engineer",
  location: "Cairo, Egypt",
  email: "m.adeldev10@gmail.com",
  github: "https://github.com/medooadel10",
  linkedin: "https://www.linkedin.com/in/mohammedadel10",
  cv: "/Mohammed-Adel-Flutter-CV.pdf",
  description: "Flutter developer building production Android and iOS apps. Explore Mohammed Adel’s work across education, enterprise, delivery, and maintenance.",
};

export type Screen = {
  id: string;
  caption: string;
  kind: "phone" | "composition" | "landscape";
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  color: string;
  ink: string;
  tagline: string;
  summary: string;
  role: string;
  company: string;
  stack: string[];
  problem: string;
  contribution: string;
  features: { title: string; description: string }[];
  outcome: string;
  screens: Screen[];
  related?: string;
  store?: { label: string; href: string };
};

const phone = (id: string, caption: string): Screen => ({ id, caption, kind: "phone", width: 640, height: 1391 });
const composition = (id: string, caption: string): Screen => ({ id, caption, kind: "composition", width: 640, height: 1280 });

export const projects: Project[] = [
  {
    slug: "elkanteen", name: "ElKanteen", category: "Education · Payments", color: "#fff0d9", ink: "#9b5100",
    tagline: "A better school day, one meal at a time.",
    summary: "Three connected apps. One simpler canteen experience for families, students, and cashiers.",
    role: "End-to-end Flutter development", company: "Solvytix", stack: ["Flutter", "BLoC / Cubit", "REST APIs", "FCM"],
    problem: "School canteens connect several very different users. Parents need visibility into spending, students need a simple way to order, and cashiers need a practical checkout workflow.",
    contribution: "I led the development of the Parent, Student, and Cashier POS apps, owning planning, architecture, implementation, and API integration across the three experiences.",
    features: [
      { title: "A wallet for the family", description: "Built child profiles, wallet management, and purchase visibility for parents." },
      { title: "Lunch, planned ahead", description: "Implemented menu browsing, pre-orders, and push notifications for parents and students." },
      { title: "A practical point of sale", description: "Built QR and student-code lookup, product sales, wallet payments, pre-order processing, item-level refunds, and transaction management." },
    ],
    outcome: "Delivered three connected Flutter applications covering family management, student ordering, and cashier operations.",
    screens: [
      composition("canteen-parent", "Parent app · A family wallet and child profiles"),
      composition("canteen-student", "Student app · Browse the canteen menu"),
      { id: "canteen-pos", caption: "Cashier POS · Student lookup and checkout", kind: "landscape", width: 1120, height: 630 },
      composition("canteen-preorder", "Parent app · Order lunch ahead of time"),
      composition("canteen-ingredients", "Student app · Product ingredients and allergens"),
    ],
  },
  {
    slug: "weevo", name: "Weevo", category: "Logistics · Delivery", color: "#e8efff", ink: "#2654a4",
    tagline: "Keeping deliveries—and the app—moving.",
    summary: "Real-time delivery workflows, production app migrations, and a focus on smoother performance.",
    role: "Flutter development & optimization", company: "Weevo", stack: ["Flutter", "Firebase", "REST APIs", "CI/CD"],
    problem: "A delivery platform depends on reliable coordination between merchants, captains, and customers. Its mobile apps also need to remain responsive and maintainable as the platform evolves.",
    contribution: "I develop and maintain Weevo’s delivery apps, working on real-time order synchronization, authentication, and payment integration. The screens shown here are from the Merchant app.",
    features: [
      { title: "Connected delivery workflows", description: "Built real-time order synchronization and integrated authentication and payments." },
      { title: "Performance and stability", description: "My CV reports a 60% app performance improvement through optimization and refactoring, addressing startup time, UI jank, and reported production crashes." },
      { title: "A maintainable release path", description: "Migrated two production apps from Flutter 2.10 to Flutter 3.x, and set up automated testing and CI/CD for builds and store releases." },
    ],
    outcome: "Published and maintained delivery apps on Google Play and the App Store, alongside production migrations and performance work.",
    screens: [phone("weevo-home", "Merchant app · Delivery services"), phone("weevo-orders", "Merchant app · Order status overview"), phone("weevo-create", "Merchant app · Start a delivery request"), phone("weevo-login", "Merchant app · Account sign-in")],
  },
  {
    slug: "ceb-lms", name: "CEB LMS", category: "Education · Learning", color: "#eee7f8", ink: "#68419a",
    tagline: "A learning journey, connected.",
    summary: "Courses, training sessions, assessments, and progress brought into one mobile learning experience.",
    role: "Flutter development", company: "Solvytix", stack: ["Flutter", "BLoC", "REST APIs"],
    problem: "Learners need to move between course content, training sessions, attendance, and assessments without losing sight of their progress.",
    contribution: "I built the CEB learning app as part of the CEB platform, implementing learning-management features in Flutter with BLoC and REST API integration.",
    features: [
      { title: "Courses in one place", description: "Implemented courses and training-session workflows with progress tracking." },
      { title: "Learning beyond content", description: "Built assignments, quizzes, and certificates as part of the learner journey." },
      { title: "Attendance connected to training", description: "Implemented QR attendance and session attendance workflows." },
    ],
    outcome: "Delivered a mobile learning experience covering courses, participation, assessments, and completion.",
    screens: [phone("ceb-lms-dashboard", "Learner dashboard · Courses and upcoming sessions"), phone("ceb-lms-courses", "My courses · Enrollment and progress"), phone("ceb-lms-attendance", "Training · Session attendance"), phone("ceb-lms-content", "Course content · Lesson playback")],
    related: "ceb-workspace",
  },
  {
    slug: "ceb-workspace", name: "CEB Workspace", category: "Enterprise · HR", color: "#e8eee9", ink: "#3f6654",
    tagline: "The working day, made simpler.",
    summary: "Employee attendance, leave, and approvals in a focused mobile workspace.",
    role: "Flutter development", company: "Solvytix", stack: ["Flutter", "BLoC", "REST APIs"],
    problem: "Everyday HR tasks span attendance, leave requests, and approval workflows. Employees and managers need clear access to the actions relevant to their roles.",
    contribution: "I built the CEB HR app alongside its learning companion, implementing attendance, leave, approval workflows, performance reviews, and role-based access.",
    features: [
      { title: "The daily essentials", description: "Implemented attendance workflows so employees can access their working-day information." },
      { title: "Leave without the friction", description: "Built leave management and approval workflows for employees and managers." },
      { title: "The right access", description: "Implemented role-based access and performance-review features across the HR experience." },
    ],
    outcome: "Delivered the HR side of the CEB platform with everyday employee and manager workflows accessible on mobile.",
    screens: [phone("ceb-work-dashboard", "Employee workspace · Attendance and daily overview"), phone("ceb-work-attendance", "Attendance · History and corrections"), phone("ceb-work-leave", "Leave · Balance overview"), phone("ceb-work-requests", "Leave · Request status and approvals")],
    related: "ceb-lms",
  },
  {
    slug: "cognitech-workspace", name: "Cognitech Workspace", category: "Enterprise · Operations", color: "#e5f1f6", ink: "#246780",
    tagline: "Enterprise workflows, in your pocket.",
    summary: "Attendance, leave, payroll, and approvals with Arabic and English support.",
    role: "Flutter development", company: "Solvytix", stack: ["Flutter", "BLoC", "REST APIs", "Localization"],
    problem: "Enterprise operations require coordinated employee and approval workflows, with secure access across tenants and a usable experience in both Arabic and English.",
    contribution: "I built Cognitech’s enterprise operations app as part of a two-app platform, implementing attendance, leave, payroll, and approvals with secure multi-tenant access and Arabic/English support. This case study focuses on Workspace.",
    features: [
      { title: "Everyday operations", description: "Built attendance and leave workflows in a mobile workspace." },
      { title: "Connected approvals", description: "Implemented payroll and approval experiences alongside enterprise operations." },
      { title: "Built for different teams", description: "Delivered secure multi-tenant access and Arabic/English localization." },
    ],
    outcome: "Delivered enterprise operations on mobile as part of the broader Cognitech learning and enterprise platform.",
    screens: [phone("cognitech-home", "Workspace · Daily overview and approvals"), phone("cognitech-overview", "Workspace · Leave balance and payslips"), phone("cognitech-attendance", "Attendance · History and working hours"), phone("cognitech-leave", "Leave · Requests and balances")],
  },
  {
    slug: "linesteel", name: "LineSteel", category: "Services · Maintenance", color: "#e2efeb", ink: "#166a65",
    tagline: "From service request to job done.",
    summary: "Connected customer and technician apps for maintenance requests and job management.",
    role: "Flutter development", company: "Solvytix", stack: ["Flutter", "REST APIs", "Payments"],
    problem: "A maintenance request passes between a customer and a technician. Both sides need a clear way to manage requests, follow updates, and complete the service.",
    contribution: "I built the customer app for maintenance requests, tracking, payments, and support chat, alongside a technician app for job management and status updates.",
    features: [
      { title: "Request and track", description: "Implemented customer maintenance requests and request tracking." },
      { title: "Keep the service connected", description: "Built payments and support chat in the customer experience." },
      { title: "Tools for the technician", description: "Delivered job management and status updates in a dedicated technician app." },
    ],
    outcome: "Delivered two complementary Flutter apps connecting maintenance customers and technicians.",
    screens: [phone("linesteel-client", "Customer app · Browse spare parts"), phone("linesteel-tech", "Technician app · Incoming maintenance jobs"), phone("linesteel-parts", "Customer app · New service request"), phone("linesteel-report", "Technician app · Service report")],
  },
];

export const experience = [
  { company: "Solvytix", title: "Mobile Software Engineer", date: "Jan 2025 — Present", detail: "Developing and maintaining 11 production Flutter apps across LMS, ERP/HR, maintenance, and more.", tag: "Cairo, Egypt" },
  { company: "Weevo", title: "Mobile Software Engineer · Part-time", date: "Jul 2024 — Present", detail: "Delivery apps, performance optimization, Flutter migrations, and automated release workflows.", tag: "Remote" },
  { company: "Geeks Tech", title: "Flutter Developer · Part-time", date: "Mar 2026 — Present", detail: "Arabic party and word games, shared game-kit integrations, offline gameplay, ads, and in-app purchases.", tag: "Remote · Amman" },
  { company: "Information Technology Institute", title: "Flutter Instructor", date: "Jul — Nov 2025", detail: "Taught Dart, state management, APIs, Firebase, and Clean Architecture. Mentored trainees through practical projects.", tag: "Cairo, Egypt" },
  { company: "Mahatech Academy", title: "Android & Flutter Developer", date: "Jan 2021 — Jan 2023", detail: "Built and released native Android and Flutter apps, from planning through Google Play publishing.", tag: "Cairo, Egypt" },
];

export const expertise = [
  { number: "01", title: "Built to grow", description: "Clean Architecture, BLoC/Cubit, and modular code that supports evolving products.", link: "elkanteen", example: "Three apps, one ecosystem" },
  { number: "02", title: "Connected by design", description: "REST APIs, Firebase, payments, and notifications connected to real product workflows.", link: "weevo", example: "Delivery workflows at Weevo" },
  { number: "03", title: "Ready for real life", description: "Performance optimization, testing, CI/CD, and store releases for production apps.", link: "weevo", example: "Production migrations & releases" },
  { number: "04", title: "Made for your users", description: "Arabic and English localization, RTL layouts, and interfaces for different roles.", link: "cognitech-workspace", example: "A localized enterprise workspace" },
];

export function getProject(slug: string) { return projects.find((project) => project.slug === slug); }
