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
  role: string
  summary: string
  accent: string
  icon: LucideIcon
  metrics: string[]
  tags: string[]
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
    name: 'RAKBANK Digital Platform',
    role: 'Frontend engineer shipping production banking flows',
    summary:
      'Built secure, responsive customer journeys with a focus on reliability, release quality, and day-to-day product velocity.',
    accent: 'from-sky-500 to-cyan-300',
    icon: Banknote,
    metrics: ['Banking UX', 'Production releases', 'Accessibility-minded UI'],
    tags: ['React', 'TypeScript', 'Design systems'],
  },
  {
    id: 'ai-workflows',
    name: 'AI Workflow Systems',
    role: 'Automation and agentic product experiments',
    summary:
      'Designed practical AI-assisted workflows that reduce repetitive work without hiding core product decisions from users.',
    accent: 'from-violet-500 to-fuchsia-300',
    icon: BrainCircuit,
    metrics: ['Human-in-loop flows', 'Internal tools', 'Prompted interfaces'],
    tags: ['OpenAI', 'Node.js', 'Product automation'],
  },
  {
    id: 'vision-pro',
    name: 'Spatial Product Concepts',
    role: 'VisionOS-inspired interaction prototypes',
    summary:
      'Explored depth, focus states, and workspace-style navigation patterns that feel premium while staying browser-friendly.',
    accent: 'from-slate-500 to-zinc-200',
    icon: Cpu,
    metrics: ['Spatial UI', 'Motion language', 'Prototype systems'],
    tags: ['React', 'Motion', 'Interaction design'],
  },
  {
    id: 'saas',
    name: 'SaaS Web Platform',
    role: 'Dashboard and workflow architecture',
    summary:
      'Created fast, scannable interface patterns for operational software where repeated use matters more than decoration.',
    accent: 'from-amber-500 to-rose-300',
    icon: Sparkles,
    metrics: ['Dashboards', 'Command surfaces', 'Mobile-first layouts'],
    tags: ['Vite', 'Tailwind CSS', 'React'],
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
