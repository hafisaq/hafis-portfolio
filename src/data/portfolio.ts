import type { LucideIcon } from 'lucide-react'
import {
  Banknote,
  BrainCircuit,
  BriefcaseBusiness,
  Contact,
  Cpu,
  FileDown,
  Layers3,
  Mail,
  PanelsTopLeft,
  Sparkles,
} from 'lucide-react'

export type WorkspaceId = 'overview' | 'projects' | 'experience' | 'resume' | 'contact'
export type ProjectId = 'rakbank' | 'ai-workflows' | 'vision-pro' | 'saas'

export type Project = {
  id: ProjectId
  name: string
  context: string
  summary: string
  signal: string
  accent: string
  surface: string
  theme: string
  icon: LucideIcon
  metrics: string[]
  focusTitle: string
  focusIntro: string
  proof: string[]
  buildNotes: string[]
}

export type TimelineItem = {
  year: string
  title: string
  eyebrow: string
  detail: string
  points: string[]
}

export type CommandAction = {
  id: string
  label: string
  hint: string
  icon: LucideIcon
  workspace: WorkspaceId
  external?: string
}

export const workspaces: Array<{
  id: WorkspaceId
  label: string
  description: string
  icon: LucideIcon
}> = [
  {
    id: 'overview',
    label: 'Home',
    description: 'Portfolio OS launch surface',
    icon: PanelsTopLeft,
  },
  {
    id: 'projects',
    label: 'Projects',
    description: 'Selected product engineering work',
    icon: Layers3,
  },
  {
    id: 'experience',
    label: 'Story',
    description: 'Career timeline and operating style',
    icon: BriefcaseBusiness,
  },
  {
    id: 'resume',
    label: 'Resume',
    description: 'Fast scan for recruiters',
    icon: FileDown,
  },
  {
    id: 'contact',
    label: 'Contact',
    description: 'Email and professional links',
    icon: Contact,
  },
]

export const projects: Project[] = [
  {
    id: 'rakbank',
    name: 'Digital Banking',
    context: 'RAKBANK / React Native + React.js',
    summary:
      'Scalable mobile and web banking experiences across secure customer-facing flows.',
    signal: 'The signal here is production maturity: payments, biometric auth, notifications, analytics, release pipelines, and UI states that need to hold up in banking.',
    accent: 'bg-cyan-500',
    surface: 'from-cyan-500/16 via-white/8 to-stone-950',
    theme: 'Banking-grade flows',
    icon: Banknote,
    metrics: ['Digital banking', 'SDK/API integrations', 'CI/CD'],
    focusTitle: 'Secure banking flows that cannot feel fragile.',
    focusIntro:
      'This workspace is about production discipline: React Native and React.js surfaces, secure integrations, and the unglamorous UI states that make banking feel trustworthy.',
    proof: [
      'Built scalable mobile and web banking applications for customer-facing digital banking flows.',
      'Integrated payment gateways, biometric authentication, analytics, notifications, and security SDKs.',
      'Built bilingual support, push notification flows, and customer engagement features from scratch.',
    ],
    buildNotes: ['React Native', 'React.js', 'TypeScript', 'Redux', 'SDK/API integration'],
  },
  {
    id: 'ai-workflows',
    name: 'AI + MCP Workflows',
    context: 'Engineering productivity systems',
    summary:
      'Reusable AI agent workflows and MCP integrations for development, debugging, documentation, and project context.',
    signal: 'Not a chatbot wrapper. The work is about connecting agents to useful tools and context so engineering work gets faster without becoming vague.',
    accent: 'bg-violet-500',
    surface: 'from-violet-500/18 via-fuchsia-400/8 to-stone-950',
    theme: 'AI as workflow infrastructure',
    icon: BrainCircuit,
    metrics: ['MCP', 'AI agents', 'Dev workflows'],
    focusTitle: 'AI that helps engineering work, not AI pasted on top.',
    focusIntro:
      'The point is tool access and context. Copilot instructions, reusable agent workflows, and MCP integrations make AI useful for debugging, docs, and project understanding.',
    proof: [
      'Created Copilot custom instructions and reusable AI agent workflows.',
      'Built MCP-based integrations to connect agents with tools, documentation, APIs, and internal workflows.',
      'Focused on improving developer productivity and access to project context.',
    ],
    buildNotes: ['MCP', 'AI agents', 'OpenAI-style workflows', 'Documentation automation'],
  },
  {
    id: 'vision-pro',
    name: 'Vision Pro',
    context: 'Product owner + lead developer',
    summary:
      'A spatial computing application led from concept to delivery for immersive customer experiences.',
    signal: 'This is one of the strongest proof points: ownership, new platform thinking, and delivery from scratch inside a banking environment.',
    accent: 'bg-slate-500',
    surface: 'from-slate-300/20 via-white/10 to-stone-950',
    theme: 'Spatial product ownership',
    icon: Cpu,
    metrics: ['Performance award', 'Spatial computing', 'Concept to delivery'],
    focusTitle: 'A new platform delivered from scratch.',
    focusIntro:
      'The Vision Pro work matters because it was not just UI polish. It meant ownership, product thinking, spatial interaction, and delivery inside a serious banking environment.',
    proof: [
      'Served as Product Owner and Lead Developer for a Vision Pro spatial computing application.',
      'Delivered immersive customer experiences from concept to delivery.',
      'Received a RAKBANK performance award for leading the application from scratch.',
    ],
    buildNotes: ['Vision Pro', 'Spatial computing', 'Product ownership', 'Swift'],
  },
  {
    id: 'saas',
    name: 'SaaS Platform',
    context: 'Personal full-stack product',
    summary:
      'A full-stack SaaS platform with auth, RBAC, Supabase, PostgreSQL, REST APIs, billing, analytics, and AI-powered features.',
    signal: 'This shows the range outside banking: backend structure, database design, admin UX, security rules, and deployment thinking.',
    accent: 'bg-amber-500',
    surface: 'from-amber-400/18 via-rose-300/8 to-stone-950',
    theme: 'Full-stack product system',
    icon: Sparkles,
    metrics: ['Supabase RLS', 'Microservices', 'Docker + CI/CD'],
    focusTitle: 'A SaaS product surface beyond frontend-only work.',
    focusIntro:
      'This project shows the broader product system: auth, RBAC, data model, admin dashboard, billing, analytics, AI-powered features, Docker, and CI/CD.',
    proof: [
      'Designed and developed a full-stack SaaS web application with React.js, Node.js, Express.js, TypeScript, Supabase, and PostgreSQL.',
      'Implemented Supabase Auth, RBAC, session management, normalized schemas, and Row Level Security.',
      'Built admin dashboard, subscription billing, analytics, automated email workflows, Docker, and CI/CD.',
    ],
    buildNotes: ['React.js', 'Node.js', 'Supabase', 'PostgreSQL', 'Docker'],
  },
]

export const getProjectById = (projectId: ProjectId) =>
  projects.find((project) => project.id === projectId)

export const timeline: TimelineItem[] = [
  {
    year: '2021 - 2023',
    title: 'First Class Honours in IT',
    eyebrow: 'Middlesex University Dubai',
    detail: 'Built the technical base before moving deeper into production product engineering.',
    points: [
      'Graduated with First Class Honours',
      'Built an AI sign language recognition project with Python, Flask, and HTML',
      'Earned UAE Golden Visa recognition for academic excellence',
    ],
  },
  {
    year: 'Jan 2022',
    title: 'Joined RAKBANK as Front-End Engineer',
    eyebrow: 'Digital banking',
    detail: 'Started building scalable React Native and React.js applications for mobile and web banking customers.',
    points: [
      'Built secure customer-facing mobile and web experiences',
      'Integrated SDKs and APIs across payments, biometrics, analytics, notifications, and security',
      'Worked across React Native, React.js, TypeScript, JavaScript, Redux, and Swift',
    ],
  },
  {
    year: '2023',
    title: 'Payment platform ownership',
    eyebrow: 'Secure transaction flows',
    detail: 'Led frontend work on payment products where trust, performance, and clarity matter.',
    points: [
      'Led frontend development for an Easy Payment Plan platform',
      'Engineered a secure 3D Secure payment gateway alternative',
      'Received a RAKBANK performance award for delivering the Easy Payment Plan platform',
    ],
  },
  {
    year: '2024',
    title: 'Spatial and wearable banking experiences',
    eyebrow: 'New platform delivery',
    detail: 'Moved beyond standard screens into Vision Pro, Apple Watch, and wallet integrations.',
    points: [
      'Served as Product Owner and Lead Developer for a Vision Pro application',
      'Led Apple Watch and Android Wallet integrations',
      'Received a RAKBANK performance award for leading the Vision Pro application from scratch',
    ],
  },
  {
    year: '2025',
    title: 'Architecture, automation, and AI workflows',
    eyebrow: 'Systems thinking',
    detail: 'Expanded from feature delivery into architecture, developer productivity, and AI-assisted engineering workflows.',
    points: [
      'Developed micro-front-end architecture for scalability and maintainability',
      'Built CI/CD pipelines and maintained Jest unit tests to reduce regressions',
      'Created Copilot custom instructions, AI agent workflows, and MCP-based integrations',
    ],
  },
  {
    year: 'Personal',
    title: 'Full-stack SaaS platform',
    eyebrow: 'Product range',
    detail: 'Built a SaaS web platform beyond frontend-only scope, covering backend, auth, database, admin UX, and deployments.',
    points: [
      'React.js, Node.js, Express.js, TypeScript, Supabase, PostgreSQL, and Tailwind CSS',
      'Implemented Supabase Auth, RBAC, session management, normalized schemas, and Row Level Security',
      'Added admin dashboard, subscription billing, analytics, AI-powered features, Docker, and CI/CD',
    ],
  },
]

export const commandActions: CommandAction[] = [
  {
    id: 'open-home',
    label: 'Open Home',
    hint: 'Return to launch surface',
    icon: PanelsTopLeft,
    workspace: 'overview',
  },
  {
    id: 'open-projects',
    label: 'Open Projects',
    hint: 'View selected workspaces',
    icon: Layers3,
    workspace: 'projects',
  },
  {
    id: 'open-story',
    label: 'Open Story Mode',
    hint: 'Career timeline',
    icon: BriefcaseBusiness,
    workspace: 'experience',
  },
  {
    id: 'open-resume',
    label: 'Open Resume',
    hint: 'Recruiter scan view',
    icon: FileDown,
    workspace: 'resume',
  },
  {
    id: 'email',
    label: 'Email Hafis',
    hint: 'Start a message',
    icon: Mail,
    workspace: 'contact',
    external: 'mailto:hello@hafis.dev',
  },
]
