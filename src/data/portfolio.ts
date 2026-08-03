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

export type Project = {
  id: string
  name: string
  context: string
  summary: string
  signal: string
  accent: string
  icon: LucideIcon
  metrics: string[]
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
    name: 'RAKBANK',
    context: 'Production banking frontend',
    summary:
      'Customer-facing banking flows where broken states, slow pages, and unclear feedback are not acceptable.',
    signal: 'The signal here is discipline: careful UI states, release confidence, and screens that still work when the happy path breaks.',
    accent: 'bg-cyan-500',
    icon: Banknote,
    metrics: ['Banking UX', 'Production releases', 'Responsive flows'],
  },
  {
    id: 'ai-workflows',
    name: 'AI Workflows',
    context: 'Internal tools and experiments',
    summary:
      'Small systems that use AI to remove repetitive work while keeping the user in control.',
    signal: 'Not a chatbot wrapper. The work is about where AI belongs in a real workflow and where it should stay out of the way.',
    accent: 'bg-violet-500',
    icon: BrainCircuit,
    metrics: ['Human review', 'Automation', 'Prompted interfaces'],
  },
  {
    id: 'vision-pro',
    name: 'Spatial UI',
    context: 'VisionOS-inspired browser prototypes',
    summary:
      'Depth, focus, and workspace transitions translated into lightweight web interactions.',
    signal: 'The interesting part is restraint: making something feel spatial without turning the portfolio into a heavy demo.',
    accent: 'bg-slate-500',
    icon: Cpu,
    metrics: ['Focus mode', 'Motion language', 'Prototype systems'],
  },
  {
    id: 'saas',
    name: 'SaaS Platform',
    context: 'Operational product surfaces',
    summary:
      'Dashboards and task flows designed for people who have to use them every day.',
    signal: 'This is where layout density matters: fewer decorative cards, better scanning, clearer next actions.',
    accent: 'bg-amber-500',
    icon: Sparkles,
    metrics: ['Dashboards', 'Command surfaces', 'Mobile-first layouts'],
  },
]

export const timeline = [
  {
    year: '2022',
    title: 'Joined RAKBANK',
    detail: 'Moved into production product engineering with banking-grade expectations.',
  },
  {
    year: '2023',
    title: 'Shipped Core Flows',
    detail: 'Focused on stable releases, responsive interfaces, and clear UI states.',
  },
  {
    year: '2024',
    title: 'Expanded Product Scope',
    detail: 'Worked across dashboard, platform, and design-system style surfaces.',
  },
  {
    year: 'Now',
    title: 'Portfolio OS',
    detail: 'Building a memorable developer portfolio that behaves like a product.',
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
