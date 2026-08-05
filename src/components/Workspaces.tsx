import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Code2,
  Download,
  ExternalLink,
  GitBranch,
  GitCommit,
  Eye,
  Gauge,
  Mail,
  Moon,
  PackageCheck,
  Phone,
  Play,
  RefreshCcw,
  Rocket,
  Server,
  Sparkles,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { trackEvent } from '../analytics'
import type { ProjectId, WorkspaceId } from '../data/portfolio'
import { projects, timeline } from '../data/portfolio'
import packageJson from '../../package.json'

const cvUrl = '/assets/CV_HAFIS_FIROSH.pdf'
const memojiVideoUrl = '/assets/aqmemoji.mov'
const email = 'hafisaq@gmail.com'
const phone = '+971585017102'
const linkedInUrl = 'https://www.linkedin.com/in/hafis-firosh-211a06185/'
const scanFindings = [
  {
    title: 'Mobile-first shell',
    detail: 'The layout starts from the phone view, then expands to desktop without changing the core flow.',
    target: 'viewport',
  },
  {
    title: 'Command navigation',
    detail: 'The command palette and dock both route into the same workspace system.',
    target: 'navigation',
  },
  {
    title: 'Focused project screens',
    detail: 'Projects open as their own focused surfaces so the important evidence is easier to scan.',
    target: 'workspace',
  },
  {
    title: 'Resume PDF actions',
    detail: 'Recruiters can preview or download the CV without losing the portfolio context.',
    target: 'resume',
  },
  {
    title: 'Reduced-motion support',
    detail: 'Motion is restrained, and the app respects reduced-motion preferences for comfort.',
    target: 'accessibility',
  },
]
const aiBuildStages = [
  {
    title: 'Direction',
    copy: 'The portfolio started from a clear product direction: mobile-first, clean, command-driven, and not heavy or gimmicky.',
  },
  {
    title: 'Instructions',
    copy: 'AI was guided with constraints for performance, accessibility, reduced motion, restrained animation, and a premium product feel.',
  },
  {
    title: 'Agent Build',
    copy: 'Codex worked as an implementation agent: creating branches, editing React components, checking builds, and opening PRs.',
  },
  {
    title: 'Human Review',
    copy: 'The design changed through your feedback: less vibe-coded, cleaner copy, better project screens, and this build scan.',
  },
  {
    title: 'Polish Loop',
    copy: 'Each pass ended with lint, production build, browser smoke tests, and visual checks on mobile.',
  },
]
const ciCdStages = [
  {
    title: 'Commit',
    detail: 'Changes land on a feature branch with a scoped PR.',
    icon: GitCommit,
    branch: 'feature',
  },
  {
    title: 'Validate',
    detail: 'GitHub Actions runs lint and production build checks.',
    icon: CheckCircle2,
    branch: 'main',
  },
  {
    title: 'Replica',
    detail: 'A staging copy receives the build for review before production.',
    icon: GitBranch,
    branch: 'replica',
  },
  {
    title: 'Release',
    detail: 'Approved changes move through the release branch.',
    icon: Rocket,
    branch: 'release',
  },
  {
    title: 'Hostinger',
    detail: 'The final static build deploys to the live domain.',
    icon: Server,
    branch: 'live',
  },
]

type WorkspacesProps = {
  activeWorkspace: WorkspaceId
  onOpenProject: (projectId: ProjectId) => void
  onOpenCommand: () => void
}

export function Workspaces({ activeWorkspace, onOpenCommand, onOpenProject }: WorkspacesProps) {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className={`mx-auto w-full max-w-6xl px-4 pb-28 sm:px-6 lg:px-8 ${
        activeWorkspace === 'overview' ? 'pt-8' : 'pt-4'
      }`}
      initial={{ opacity: 0, y: 10 }}
      key={activeWorkspace}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {activeWorkspace === 'overview' ? <OverviewWorkspace onOpenCommand={onOpenCommand} /> : null}
      {activeWorkspace === 'recruiter' ? <RecruiterWorkspace onOpenProject={onOpenProject} /> : null}
      {activeWorkspace === 'projects' ? <ProjectsWorkspace onOpenProject={onOpenProject} /> : null}
      {activeWorkspace === 'experience' ? <ExperienceWorkspace /> : null}
      {activeWorkspace === 'resume' ? <ResumeWorkspace /> : null}
      {activeWorkspace === 'contact' ? <ContactWorkspace /> : null}
      {activeWorkspace === 'build' ? <BuildWorkspace /> : null}
    </motion.section>
  )
}

function RecruiterWorkspace({ onOpenProject }: { onOpenProject: (projectId: ProjectId) => void }) {
  const [activeRole, setActiveRole] = useState('Product Engineer')
  const [activePlaybackStep, setActivePlaybackStep] = useState(0)
  const fitSignals = [
    ['01', 'Production fintech', '4+ years shipping React Native and React.js banking products.'],
    ['02', 'Owns ambiguity', 'Vision Pro product owner and lead developer from concept to delivery.'],
    ['03', 'Beyond frontend', 'Auth, APIs, databases, CI/CD, analytics, Docker, and AI workflows.'],
  ]
  const hiringAngles = [
    ['Hire signal', 'I ship polished interfaces without losing sight of reliability, release quality, and product constraints.'],
    ['Strongest proof', 'Banking flows, payment platform ownership, Vision Pro delivery, AI workflows, and full-stack SaaS range.'],
    ['Role fit', 'Product engineering, React Native, fintech, frontend systems, AI workflow, and full-stack product roles.'],
  ]
  const roleProfiles = [
    {
      label: 'Product Engineer',
      headline: 'Interfaces, systems, and ownership.',
      proof: ['Vision Pro ownership', 'Fintech product delivery', 'Full-stack SaaS range'],
    },
    {
      label: 'React Native',
      headline: 'Mobile banking work with real production constraints.',
      proof: ['React Native apps', 'SDK/API integrations', 'Payments and biometrics'],
    },
    {
      label: 'Fintech',
      headline: 'Secure flows where reliability and trust matter.',
      proof: ['Digital banking', 'Easy Payment Plan', '3D Secure alternative'],
    },
    {
      label: 'AI Workflow',
      headline: 'AI used as engineering infrastructure.',
      proof: ['MCP integrations', 'Agent workflows', 'Copilot instructions'],
    },
    {
      label: 'Full-stack',
      headline: 'Enough backend range to move beyond UI-only work.',
      proof: ['Supabase Auth/RLS', 'PostgreSQL', 'Docker and CI/CD'],
    },
  ]
  const playbackSteps = [
    ['Education', 'First Class Honours, AI sign language project, UAE Golden Visa recognition.'],
    ['Banking', 'React Native and React.js customer-facing digital banking flows.'],
    ['Payments', 'Easy Payment Plan, 3D Secure alternative, SDK and gateway integrations.'],
    ['Spatial', 'Vision Pro product owner and lead developer from scratch.'],
    ['Systems', 'Micro-frontends, CI/CD, tests, AI workflows, and MCP integrations.'],
    ['SaaS', 'Full-stack SaaS platform with auth, RBAC, database, billing, analytics, and AI features.'],
  ]
  const activeRoleProfile = roleProfiles.find((role) => role.label === activeRole) ?? roleProfiles[0]

  useEffect(() => {
    const timer = window.setTimeout(
      () => setActivePlaybackStep((currentStep) => (currentStep + 1) % playbackSteps.length),
      1800,
    )

    return () => window.clearTimeout(timer)
  }, [activePlaybackStep, playbackSteps.length])

  return (
    <div className="grid gap-4">
      <section className="relative overflow-hidden rounded-[1.75rem] border border-stone-950/10 bg-stone-950 text-stone-50 shadow-2xl shadow-stone-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,191,36,.22),transparent_32%),radial-gradient(circle_at_90%_20%,rgba(14,165,233,.18),transparent_28%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />
        <div className="relative grid gap-7 p-5 sm:p-7 lg:grid-cols-[1.02fr_0.98fr] lg:p-8">
          <div className="flex min-h-[26rem] flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">
              Recruiter Mode
            </p>
            <h2 className="mt-4 max-w-3xl text-5xl font-semibold leading-[0.95] sm:text-7xl">
              Product engineer worth shortlisting.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-300 sm:text-lg">
              I build engaging user experiences across mobile, web, and AI, with production
              banking depth and enough full-stack range to move through the whole product system.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {['React Native', 'React.js', 'TypeScript', 'Fintech', 'Vision Pro', 'AI workflows', 'Supabase'].map((skill) => (
                <span className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-stone-200" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            {fitSignals.map(([number, title, copy], index) => (
              <motion.div
                className="grid min-h-32 grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/10 bg-white/[0.075] p-4 backdrop-blur"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.2 }}
                key={title}
              >
                <span className="grid size-11 place-items-center rounded-xl bg-amber-200 text-sm font-semibold text-stone-950">
                  {number}
                </span>
                <span>
                  <span className="block text-xl font-semibold">{title}</span>
                  <span className="mt-2 block text-sm leading-6 text-stone-300">{copy}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 rounded-[1.75rem] border border-stone-950/10 bg-white/82 p-4 shadow-xl shadow-stone-950/10 dark:border-white/10 dark:bg-white/[0.07] sm:p-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-200">
            Role Switcher
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-950 dark:text-stone-50">
            Reframe the same proof for the role.
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {roleProfiles.map((role) => (
              <button
                aria-pressed={role.label === activeRole}
                className={`min-h-10 rounded-xl px-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-stone-950 dark:focus:ring-stone-50 ${
                  role.label === activeRole
                    ? 'bg-stone-950 text-stone-50 dark:bg-stone-50 dark:text-stone-950'
                    : 'border border-stone-950/10 bg-white/70 text-stone-700 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-stone-200 dark:hover:bg-white/15'
                }`}
                key={role.label}
                onClick={() => {
                  trackEvent('recruiter_role_switch', { role: role.label })
                  setActiveRole(role.label)
                }}
                type="button"
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>
        <motion.div
          className="rounded-2xl bg-stone-950 p-5 text-stone-50"
          key={activeRoleProfile.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">
            {activeRoleProfile.label}
          </p>
          <p className="mt-3 text-2xl font-semibold leading-tight">{activeRoleProfile.headline}</p>
          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {activeRoleProfile.proof.map((proof) => (
              <span className="rounded-xl border border-white/10 bg-white/[0.08] p-3 text-sm leading-5 text-stone-300" key={proof}>
                {proof}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="grid gap-4">
        <div className="overflow-hidden rounded-[1.75rem] border border-stone-950/10 bg-stone-950 p-5 text-stone-50 shadow-2xl shadow-stone-950/20">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">
                Proof Timeline Playback
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Play the proof, not a resume list.</h2>
            </div>
            <button
              aria-label="Play next proof timeline step"
              className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/10 transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-amber-300"
              onClick={() => {
                trackEvent('recruiter_timeline_playback_next')
                setActivePlaybackStep((currentStep) => (currentStep + 1) % playbackSteps.length)
              }}
              type="button"
            >
              <Play aria-hidden="true" className="size-4 fill-current" />
            </button>
          </div>
          <div className="mt-5 grid gap-3">
            {playbackSteps.map(([label, detail], index) => {
              const isActive = index === activePlaybackStep

              return (
                <button
                  className={`grid grid-cols-[auto_1fr] gap-3 rounded-2xl border p-3 text-left transition focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                    isActive ? 'border-amber-200/50 bg-amber-200/14' : 'border-white/10 bg-white/[0.06] hover:bg-white/[0.09]'
                  }`}
                  key={label}
                  onClick={() => setActivePlaybackStep(index)}
                  type="button"
                >
                  <span className={`mt-1 size-2.5 rounded-full ${isActive ? 'bg-amber-200' : 'bg-white/25'}`} />
                  <span>
                    <span className="block text-sm font-semibold">{label}</span>
                    <span className="mt-1 block text-sm leading-6 text-stone-300">{detail}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="grid gap-3">
          {hiringAngles.map(([title, copy]) => (
            <article className="rounded-2xl border border-stone-950/10 bg-white/78 p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.07]" key={title}>
              <p className="text-sm font-semibold text-stone-950 dark:text-stone-50">{title}</p>
              <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">{copy}</p>
            </article>
          ))}
        </section>

        <section className="overflow-hidden rounded-2xl border border-stone-950/10 bg-white/78 shadow-sm dark:border-white/10 dark:bg-white/[0.07]">
          <div className="border-b border-stone-950/10 p-4 dark:border-white/10">
            <h2 className="text-lg font-semibold text-stone-950 dark:text-stone-50">Open strongest proof</h2>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              Quick routes into the project screens recruiters usually care about first.
            </p>
          </div>
          <div className="divide-y divide-stone-950/10 dark:divide-white/10">
            {projects.slice(0, 4).map((project) => {
              const Icon = project.icon

              return (
                <button
                  className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-4 text-left transition hover:bg-stone-950/[0.035] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-950 dark:hover:bg-white/[0.05] dark:focus:ring-stone-50"
                  key={project.id}
                  onClick={() => onOpenProject(project.id)}
                  type="button"
                >
                  <span className={`grid size-10 place-items-center rounded-xl ${project.accent} text-white`}>
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-stone-950 dark:text-stone-50">
                      {project.name}
                    </span>
                    <span className="mt-1 block text-sm leading-5 text-stone-500 dark:text-stone-400">
                      {project.metrics.join(' / ')}
                    </span>
                  </span>
                  <ChevronRight aria-hidden="true" className="size-4 text-stone-400 transition group-hover:translate-x-0.5 group-hover:text-amber-600 dark:group-hover:text-amber-200" />
                </button>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

function OverviewWorkspace({ onOpenCommand }: { onOpenCommand: () => void }) {
  const principles = [
    ['Frontend systems', 'Interfaces that hold up under real product constraints.'],
    ['Product feel', 'Motion and layout used to guide attention, not decorate the page.'],
    ['Mobile first', 'The small screen gets the real experience, not a compressed desktop.'],
  ]

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-3">
        {principles.map(([title, copy]) => (
          <motion.div
            className="rounded-2xl border border-stone-950/10 bg-white/70 p-4 shadow-sm transition-colors dark:border-white/10 dark:bg-white/[0.07]"
            initial={{ opacity: 0, y: 16 }}
            key={title}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-80px' }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm font-semibold text-stone-950 dark:text-stone-50">{title}</p>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">{copy}</p>
          </motion.div>
        ))}
      </div>

      <ScrollProofShowcase onOpenCommand={onOpenCommand} />
    </div>
  )
}

function ScrollProofShowcase({ onOpenCommand }: { onOpenCommand: () => void }) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const railScale = useTransform(scrollYProgress, [0.12, 0.9], [0, 1])
  const scanY = useTransform(scrollYProgress, [0.12, 0.9], ['4%', '90%'])
  const panelY = useTransform(scrollYProgress, [0.08, 0.55, 0.9], shouldReduceMotion ? [0, 0, 0] : [16, -6, -14])
  const panelRotate = useTransform(scrollYProgress, [0.08, 0.9], shouldReduceMotion ? [0, 0] : [-1.4, 1.4])
  const orbX = useTransform(scrollYProgress, [0.1, 0.5, 0.9], shouldReduceMotion ? ['50%', '50%', '50%'] : ['16%', '72%', '36%'])
  const orbY = useTransform(scrollYProgress, [0.1, 0.5, 0.9], shouldReduceMotion ? ['38%', '38%', '38%'] : ['18%', '42%', '70%'])
  const glowOpacity = useTransform(scrollYProgress, [0.16, 0.42, 0.74, 0.92], [0.25, 0.95, 0.55, 0.8])
  const evidence = [
    {
      label: '01',
      title: 'It starts like a product, not a page.',
      detail: 'The first scan is direct: product engineer, mobile, web, AI, fintech, and proof routes without forcing a recruiter to hunt.',
      chip: 'Positioning',
      stat: '6 sec',
    },
    {
      label: '02',
      title: 'The evidence unlocks in layers.',
      detail: 'Banking delivery, Vision Pro ownership, AI workflows, and SaaS range come forward as separate proof moments.',
      chip: 'Evidence',
      stat: '4 tracks',
    },
    {
      label: '03',
      title: 'Every control has a job.',
      detail: 'Command, dock, Mini Hafis, and project workspaces all route into a focused reading path.',
      chip: 'Interaction',
      stat: 'cmd+k',
    },
    {
      label: '04',
      title: 'The build itself becomes proof.',
      detail: 'Motion, accessibility, analytics, release flow, and AI-assisted workflow are visible as product decisions.',
      chip: 'System',
      stat: 'ship',
    },
  ]

  return (
    <section
      className="relative overflow-hidden rounded-[2rem] border border-stone-950/10 bg-stone-950 text-stone-50 shadow-2xl shadow-stone-950/20 dark:border-white/10"
      ref={sectionRef}
    >
      <motion.div
        className="absolute h-80 w-80 rounded-full bg-amber-200/20 blur-3xl"
        style={{ left: orbX, opacity: glowOpacity, top: orbY, translateX: '-50%', translateY: '-50%' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(251,191,36,.24),transparent_30%),radial-gradient(circle_at_88%_22%,rgba(14,165,233,.18),transparent_28%),linear-gradient(135deg,rgba(255,255,255,.08),transparent_42%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60" />

      <div className="relative grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.92fr_1.08fr] lg:p-8">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
            Interactive Scroll System
          </p>
          <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[0.96] sm:text-5xl">
            The page starts building the case as you move.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-stone-300 sm:text-base">
            This is the kind of motion that should feel like a system turning on: evidence,
            interface, and story all moving together.
          </p>

          <div className="mt-7 grid gap-3 rounded-[1.75rem] border border-white/10 bg-white/[0.07] p-3 backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
                Recruiter Lens
              </span>
              <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-semibold text-emerald-200">
                live
              </span>
            </div>

            <motion.div
              className="relative min-h-[18rem] overflow-hidden rounded-2xl border border-white/10 bg-black/50 p-4"
              style={{ rotate: panelRotate, y: panelY }}
            >
              <motion.div
                className="absolute left-0 right-0 h-24 bg-gradient-to-b from-amber-200/0 via-amber-200/24 to-amber-200/0 blur-sm"
                style={{ opacity: glowOpacity, top: scanY }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                className="absolute -right-16 -top-16 size-40 rounded-full border border-dashed border-amber-200/30"
                transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
              />
              <div className="relative flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-red-400" />
                <span className="size-2.5 rounded-full bg-amber-300" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
                <span className="ml-auto text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-stone-500">
                  HAFIS.SIGNAL
                </span>
              </div>

              <div className="relative mt-6 grid grid-cols-[0.76fr_1fr] gap-3">
                <div className="rounded-2xl border border-amber-200/25 bg-amber-200/12 p-4">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-amber-100">
                    Mode
                  </p>
                  <p className="mt-5 text-4xl font-semibold leading-none text-white">Hire</p>
                  <p className="mt-2 text-xs leading-5 text-stone-300">signal density: high</p>
                </div>
                <div className="grid gap-2">
                  {['Product engineer', 'React Native + React.js', 'Fintech production depth', 'AI workflow systems'].map(
                  (item, index) => (
                    <motion.div
                      className="rounded-2xl border border-white/10 bg-white/[0.08] px-3 py-2.5"
                      initial={{ opacity: 0.55, x: 12 }}
                      key={item}
                      transition={{ delay: index * 0.04, duration: 0.3 }}
                      viewport={{ once: false, margin: '-80px' }}
                      whileInView={{ opacity: 1, x: 0 }}
                    >
                      <span className="block text-[0.58rem] font-semibold text-amber-100">0{index + 1}</span>
                      <span className="mt-1 block text-xs font-semibold text-stone-100">{item}</span>
                    </motion.div>
                  ),
                )}
                </div>
              </div>

              <div className="relative mt-3 grid grid-cols-3 gap-2">
                {['scan', 'match', 'open'].map((item, index) => (
                  <motion.div
                    animate={{ opacity: [0.45, 1, 0.45] }}
                    className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-center text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-stone-300"
                    key={item}
                    transition={{ delay: index * 0.35, duration: 1.8, repeat: Infinity }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <button
              className="grid min-h-12 grid-cols-[1fr_auto] items-center rounded-2xl bg-stone-50 px-4 text-left text-sm font-semibold text-stone-950 transition hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
              onClick={onOpenCommand}
              type="button"
            >
              Open command center
              <ChevronRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>

        <div className="relative grid gap-4 py-2 lg:py-4">
          <div className="absolute bottom-8 left-5 top-8 hidden w-px bg-white/10 sm:block">
            <motion.div
              className="absolute left-0 top-0 h-full w-px origin-top bg-amber-200"
              style={{ scaleY: railScale }}
            />
          </div>

          {evidence.map((item, index) => (
            <motion.article
              className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.08] p-5 shadow-xl shadow-black/15 backdrop-blur sm:ml-12 sm:p-6"
              initial={{ opacity: 0, y: 34, scale: 0.97 }}
              key={item.title}
              transition={{ duration: 0.38, delay: index * 0.035, ease: 'easeOut' }}
              viewport={{ once: false, margin: '-12% 0px -12% 0px' }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
            >
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-amber-200/8 to-transparent" />
              <span className="absolute -left-[3.38rem] top-7 hidden size-4 rounded-full border border-amber-200 bg-stone-950 shadow-[0_0_0_8px_rgba(251,191,36,.12)] sm:block" />
              <div className="relative grid gap-5 lg:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-amber-200 px-2.5 py-1 text-xs font-bold text-stone-950">
                      {item.label}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-semibold text-stone-300">
                      {item.chip}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold leading-tight sm:text-4xl">{item.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">{item.detail}</p>
                </div>
                <div className="grid gap-2 sm:grid-cols-4 lg:w-44 lg:grid-cols-1">
                  <span className="rounded-2xl border border-amber-200/30 bg-amber-200/10 px-4 py-3 text-xl font-semibold text-amber-100">
                    {item.stat}
                  </span>
                  {['readable', 'focused', 'fast'].map((pill, pillIndex) => (
                    <motion.span
                      className="rounded-2xl border border-white/10 bg-white/[0.07] px-3 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone-300"
                      initial={{ opacity: 0, y: 12 }}
                      key={pill}
                      transition={{ delay: pillIndex * 0.06, duration: 0.24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                    >
                      {pill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsWorkspace({ onOpenProject }: { onOpenProject: (projectId: ProjectId) => void }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-950/10 bg-white/78 shadow-sm transition-colors dark:border-white/10 dark:bg-white/[0.07]">
      <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-stone-950/10 px-4 py-3 sm:px-5 dark:border-white/10">
        <div>
          <h2 className="text-base font-semibold text-stone-950 dark:text-stone-50">Project Files</h2>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            A quick read of what each piece is really showing.
          </p>
        </div>
        <span className="self-start rounded-md bg-stone-950 px-2 py-1 text-xs font-medium text-stone-50 dark:bg-stone-50 dark:text-stone-950">
          04
        </span>
      </div>

      <div className="divide-y divide-stone-950/10 dark:divide-white/10">
        {projects.map((project, index) => {
          const Icon = project.icon

          return (
            <button
              className="group grid w-full gap-4 px-4 py-5 text-left transition hover:bg-amber-100/35 focus:bg-amber-100/35 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:grid-cols-[4.5rem_1fr] sm:px-5 dark:hover:bg-amber-300/[0.07] dark:focus:bg-amber-300/[0.07] dark:focus:ring-amber-200"
              key={project.id}
              onClick={() => onOpenProject(project.id)}
              type="button"
            >
              <div className="flex items-center gap-3 sm:block">
                <span className="block text-xs font-semibold tabular-nums text-stone-400 dark:text-stone-500">
                  0{index + 1}
                </span>
                <span
                  className={`mt-0 grid size-9 place-items-center rounded-lg ${project.accent} text-white sm:mt-4`}
                >
                  <Icon aria-hidden="true" className="size-4" />
                </span>
              </div>

              <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
                    {project.context}
                  </p>
                  <span className="mt-2 flex items-center gap-2">
                    <h3 className="text-2xl font-semibold leading-tight text-stone-950 dark:text-stone-50">
                      {project.name}
                    </h3>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 text-stone-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-600 dark:group-hover:text-amber-200"
                    />
                  </span>
                  <p className="mt-3 text-sm leading-6 text-stone-650 dark:text-stone-300">{project.summary}</p>
                  <span className="mt-4 inline-flex min-h-9 items-center gap-2 rounded-xl border border-stone-950/15 bg-stone-950 px-3 text-xs font-semibold text-stone-50 shadow-sm transition group-hover:border-amber-400 group-hover:bg-amber-300 group-hover:text-stone-950 dark:border-white/10 dark:bg-stone-50 dark:text-stone-950 dark:group-hover:bg-amber-200">
                    Open project
                    <ChevronRight aria-hidden="true" className="size-3.5" />
                  </span>
                </div>

                <div className="rounded-xl bg-stone-950/[0.035] p-4 dark:bg-white/[0.06]">
                  <p className="text-sm leading-6 text-stone-700 dark:text-stone-200">{project.signal}</p>
                  <dl className="mt-4 grid gap-2 sm:grid-cols-3">
                    {project.metrics.map((metric) => (
                      <div key={metric}>
                        <dt className="sr-only">Signal</dt>
                        <dd className="text-xs font-medium text-stone-500 dark:text-stone-400">{metric}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ExperienceWorkspace() {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-950/10 bg-white/78 shadow-sm transition-colors dark:border-white/10 dark:bg-white/[0.07]">
      <div className="grid gap-4 border-b border-stone-950/10 px-4 py-5 sm:grid-cols-[1fr_16rem] sm:px-6 dark:border-white/10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-200">
            Story Mode
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-950 dark:text-stone-50">
            From banking releases to product systems
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600 dark:text-stone-300">
            A more useful timeline than a stack list. It shows the move from banking frontend
            delivery into payments, spatial computing, architecture, AI workflows, and SaaS product building.
          </p>
        </div>
        <div className="rounded-xl bg-stone-950 p-4 text-stone-50">
          <p className="text-sm font-semibold">Current direction</p>
          <p className="mt-2 text-sm leading-6 text-stone-300">
            Front-end engineering, React Native, secure product flows, practical AI, and mobile-first systems.
          </p>
        </div>
      </div>

      <div className="relative px-4 py-2 sm:px-6">
        <div className="absolute bottom-8 left-[2.7rem] top-8 hidden w-px bg-stone-950/10 sm:block dark:bg-white/10" />
        {timeline.map((item, index) => (
          <article
            className="relative grid gap-4 border-b border-stone-950/10 py-6 last:border-b-0 sm:grid-cols-[5.5rem_1fr] dark:border-white/10"
            key={item.title}
          >
            <div className="flex items-center gap-3 sm:block">
              <span className="relative z-10 grid size-9 place-items-center rounded-full bg-stone-950 text-xs font-semibold text-stone-50 shadow-lg shadow-stone-950/15 dark:bg-stone-50 dark:text-stone-950">
                {index + 1}
              </span>
              <span className="text-sm font-semibold text-amber-700 sm:mt-3 sm:block dark:text-amber-200">
                {item.year}
              </span>
            </div>
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
                  {item.eyebrow}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-stone-950 dark:text-stone-50">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-650 dark:text-stone-300">{item.detail}</p>
              </div>
              <ul className="grid gap-2 rounded-xl bg-stone-950/[0.035] p-4 dark:bg-white/[0.06]">
                {item.points.map((point) => (
                  <li className="flex gap-3 text-sm leading-6 text-stone-650 dark:text-stone-300" key={point}>
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function ResumeWorkspace() {
  const [isPdfLoaded, setIsPdfLoaded] = useState(false)
  const [showPdfFallback, setShowPdfFallback] = useState(false)

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => setShowPdfFallback(true), 3500)

    return () => window.clearTimeout(fallbackTimer)
  }, [])

  return (
    <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
      <section className="grid gap-4">
        <div className="rounded-2xl border border-stone-950/10 bg-white/75 p-5 shadow-sm transition-colors dark:border-white/10 dark:bg-white/[0.07]">
          <h2 className="text-xl font-semibold text-stone-950 dark:text-stone-50">Hafis Firosh</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
            Front-End / React Native Developer with 4+ years building scalable mobile and web
            applications for fintech and digital banking platforms.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {['Vision Pro lead', 'Easy Payment Plan', 'AI + MCP workflows'].map((item) => (
              <div className="rounded-xl bg-stone-950/[0.035] p-3 dark:bg-white/[0.06]" key={item}>
                <p className="text-xs font-semibold text-stone-600 dark:text-stone-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-stone-950/10 bg-stone-950 p-5 text-stone-50 shadow-xl shadow-stone-950/15">
          <h2 className="text-lg font-semibold">Core stack</h2>
          <p className="mt-3 text-sm leading-6 text-stone-300">
            React Native, React.js, TypeScript, JavaScript, Redux, Swift, Node.js, SDK/API
            integrations, CI/CD, micro-frontends, Supabase, PostgreSQL, Docker, and Tailwind CSS.
          </p>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-stone-950/10 bg-white/78 shadow-sm transition-colors dark:border-white/10 dark:bg-white/[0.07]">
        <div className="flex flex-col gap-3 border-b border-stone-950/10 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          <div>
            <h2 className="text-lg font-semibold text-stone-950 dark:text-stone-50">CV Preview</h2>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">Open it in-browser or download the PDF.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-stone-950/10 bg-white px-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-950 dark:border-white/10 dark:bg-white/10 dark:text-stone-100 dark:hover:bg-white/15 dark:focus:ring-stone-50"
              href={cvUrl}
              onClick={() => trackEvent('resume_preview', { source: 'resume_header' })}
              rel="noreferrer"
              target="_blank"
            >
              <Eye aria-hidden="true" className="size-4" />
              Preview
            </a>
            <a
              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-stone-950 px-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-stone-50 dark:text-stone-950 dark:hover:bg-stone-200"
              download="Hafis_Firosh_CV.pdf"
              href={cvUrl}
              onClick={() => trackEvent('resume_download', { source: 'resume_header' })}
            >
              <Download aria-hidden="true" className="size-4" />
              Download
            </a>
          </div>
        </div>
        <div className="relative hidden h-[34rem] bg-stone-100 sm:block dark:bg-stone-950">
          {!isPdfLoaded ? (
            <div className="absolute inset-0 z-10 grid place-items-center bg-stone-100 px-5 text-center dark:bg-stone-950">
              <div className="w-full max-w-sm rounded-2xl border border-stone-950/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.07]">
                <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-stone-950 text-stone-50 dark:bg-stone-50 dark:text-stone-950">
                  <Eye aria-hidden="true" className="size-5" />
                </div>
                <p className="mt-4 text-sm font-semibold text-stone-950 dark:text-stone-50">
                  Loading CV preview
                </p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-stone-950/10 dark:bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-amber-400"
                    animate={{ x: ['-45%', '145%'] }}
                    transition={{ duration: 1.1, ease: 'easeInOut', repeat: Infinity }}
                    style={{ width: '55%' }}
                  />
                </div>
                {showPdfFallback ? (
                  <div className="mt-4">
                    <p className="text-sm leading-6 text-stone-600 dark:text-stone-300">
                      Browser PDF previews can be slow. Open or download the CV if the preview stays blank.
                    </p>
                    <div className="mt-3 flex justify-center gap-2">
                      <a
                        className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-stone-950/10 px-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-950 dark:border-white/10 dark:text-stone-100 dark:hover:bg-white/10 dark:focus:ring-stone-50"
                        href={cvUrl}
                        onClick={() => trackEvent('resume_preview', { source: 'pdf_fallback' })}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <Eye aria-hidden="true" className="size-4" />
                        Preview
                      </a>
                      <a
                        className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-stone-950 px-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-stone-50 dark:text-stone-950 dark:hover:bg-stone-200"
                        download="Hafis_Firosh_CV.pdf"
                        href={cvUrl}
                        onClick={() => trackEvent('resume_download', { source: 'pdf_fallback' })}
                      >
                        <Download aria-hidden="true" className="size-4" />
                        Download
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
          <iframe
            className="h-full w-full"
            onLoad={() => setIsPdfLoaded(true)}
            src={`${cvUrl}#toolbar=0&navpanes=0`}
            title="Hafis Firosh CV preview"
          />
        </div>
        <div className="p-4 sm:hidden">
          <p className="rounded-xl bg-stone-950/[0.035] p-4 text-sm leading-6 text-stone-650 dark:bg-white/[0.06] dark:text-stone-300">
            Mobile browsers handle embedded PDFs differently. Use Preview to open it, or Download
            to save the CV.
          </p>
        </div>
      </section>
    </div>
  )
}

function ContactWorkspace() {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="relative overflow-hidden rounded-2xl border border-stone-950/10 bg-stone-950 text-stone-50 shadow-xl shadow-stone-950/15">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_10%,rgba(251,191,36,.22),transparent_30%),radial-gradient(circle_at_86%_70%,rgba(14,165,233,.16),transparent_28%)]" />
        <div className="relative grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight">Let’s build something people remember.</h2>
            <p className="mt-4 text-sm leading-6 text-stone-300">
              Best for frontend, React Native, fintech, AI workflow, and product engineering roles.
            </p>
          </div>
          <div className="relative mx-auto grid size-36 shrink-0 place-items-end overflow-hidden rounded-3xl border border-white/10 bg-white/[0.08] shadow-2xl shadow-black/20 sm:mx-0 sm:size-44">
            <video
              aria-label="Animated Hafis memoji"
              autoPlay
              className="h-full w-full object-cover"
              loop
              muted
              playsInline
              preload="metadata"
              src={memojiVideoUrl}
            />
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
          </div>
        </div>
      </section>

      <section className="grid gap-3">
        <a
          className="group flex min-h-16 items-center gap-3 rounded-2xl border border-stone-950/10 bg-white/75 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-400/60 hover:bg-amber-100/45 hover:shadow-lg hover:shadow-stone-950/10 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:border-white/10 dark:bg-white/[0.07] dark:hover:bg-amber-300/[0.08] dark:focus:ring-amber-200"
          href={`mailto:${email}`}
          onClick={() => trackEvent('contact_click', { method: 'email' })}
        >
          <span className="grid size-10 place-items-center rounded-xl bg-stone-950 text-stone-50">
            <Mail aria-hidden="true" className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-stone-950 dark:text-stone-50">Email</span>
            <span className="block truncate text-sm text-stone-600 dark:text-stone-300">{email}</span>
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-stone-950 px-2.5 py-1 text-xs font-semibold text-stone-50 transition group-hover:bg-amber-300 group-hover:text-stone-950 dark:bg-stone-50 dark:text-stone-950 dark:group-hover:bg-amber-200">
            Mail
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </span>
        </a>
        <a
          className="group flex min-h-16 items-center gap-3 rounded-2xl border border-stone-950/10 bg-white/75 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-400/60 hover:bg-amber-100/45 hover:shadow-lg hover:shadow-stone-950/10 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:border-white/10 dark:bg-white/[0.07] dark:hover:bg-amber-300/[0.08] dark:focus:ring-amber-200"
          href={`tel:${phone.replace(/\s/g, '')}`}
          onClick={() => trackEvent('contact_click', { method: 'phone' })}
        >
          <span className="grid size-10 place-items-center rounded-xl bg-stone-950 text-stone-50">
            <Phone aria-hidden="true" className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-stone-950 dark:text-stone-50">Phone</span>
            <span className="block truncate text-sm text-stone-600 dark:text-stone-300">{phone}</span>
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-stone-950 px-2.5 py-1 text-xs font-semibold text-stone-50 transition group-hover:bg-amber-300 group-hover:text-stone-950 dark:bg-stone-50 dark:text-stone-950 dark:group-hover:bg-amber-200">
            Call
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </span>
        </a>
        <a
          className="group flex min-h-16 items-center gap-3 rounded-2xl border border-stone-950/10 bg-white/75 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-400/60 hover:bg-amber-100/45 hover:shadow-lg hover:shadow-stone-950/10 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:border-white/10 dark:bg-white/[0.07] dark:hover:bg-amber-300/[0.08] dark:focus:ring-amber-200"
          href={linkedInUrl}
          onClick={() => trackEvent('contact_click', { method: 'linkedin' })}
          rel="noreferrer"
          target="_blank"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-stone-950 text-stone-50">
            <ExternalLink aria-hidden="true" className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-stone-950 dark:text-stone-50">LinkedIn</span>
            <span className="block truncate text-sm text-stone-600 dark:text-stone-300">hafis-firosh-211a06185</span>
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-stone-950 px-2.5 py-1 text-xs font-semibold text-stone-50 transition group-hover:bg-amber-300 group-hover:text-stone-950 dark:bg-stone-50 dark:text-stone-950 dark:group-hover:bg-amber-200">
            Open
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </span>
        </a>
      </section>
    </div>
  )
}

function BuildWorkspace() {
  const stack = [
    {
      title: 'Vite + React + TypeScript',
      copy: 'Fast local development, typed components, and a small production bundle for the first version.',
      icon: Code2,
    },
    {
      title: 'Tailwind CSS',
      copy: 'A restrained design system using utility classes, responsive spacing, and custom light/dark surfaces.',
      icon: Sparkles,
    },
    {
      title: 'Motion',
      copy: 'Short transitions for workspace changes, startup, command surfaces, and focused project screens.',
      icon: Gauge,
    },
    {
      title: 'Lazy-loaded workspaces',
      copy: 'The heavier portfolio sections load after the shell so the first screen stays quick.',
      icon: PackageCheck,
    },
    {
      title: 'Accessible controls',
      copy: 'Keyboard command navigation, focus rings, semantic dialogs, visible labels, and reduced-motion support.',
      icon: Moon,
    },
  ]
  const systemStatus = [
    ['Version', `v${packageJson.version}`, 'Read from package metadata at build time.'],
    ['Analytics', 'enabled', 'GA page views and key portfolio interactions are tracked.'],
    ['SEO', 'ready', 'Sitemap, robots, canonical tags, and social preview metadata are configured.'],
    ['Release', 'single push', 'Promote release merges main, bumps version, validates, then deploys once.'],
    ['Compiler', 'stable TS 5', 'Pinned away from TypeScript prerelease builds for Hostinger reliability.'],
  ]
  const [revealedCount, setRevealedCount] = useState(0)
  const [activeFinding, setActiveFinding] = useState(0)
  const [activeAiStage, setActiveAiStage] = useState(0)
  const [activeCiStage, setActiveCiStage] = useState(0)
  const [scanRun, setScanRun] = useState(0)
  const activeScan = scanFindings[Math.min(activeFinding, scanFindings.length - 1)]
  const isScanComplete = revealedCount >= scanFindings.length

  useEffect(() => {
    setRevealedCount(0)
    setActiveFinding(0)
    setActiveAiStage(0)
    setActiveCiStage(0)

    const timers = scanFindings.map((_, index) =>
      window.setTimeout(() => {
        setRevealedCount(index + 1)
        setActiveFinding(index)
      }, 650 + index * 520),
    )

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [scanRun])

  const replayScan = () => {
    trackEvent('made_scan_replay')
    setScanRun((currentRun) => currentRun + 1)
  }

  useEffect(() => {
    if (!isScanComplete) {
      return
    }

    const timers = ciCdStages.map((_, index) =>
      window.setTimeout(() => setActiveCiStage(index), 420 + index * 560),
    )

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [isScanComplete])

  return (
    <div className="grid gap-4">
      <section className="relative min-h-[34rem] overflow-hidden rounded-2xl border border-stone-950/10 bg-stone-950 text-stone-50 shadow-2xl shadow-stone-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(251,191,36,.22),transparent_28%),radial-gradient(circle_at_88%_82%,rgba(14,165,233,.22),transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] bg-[size:36px_36px]" />
        {!isScanComplete ? (
          <motion.div
            aria-hidden="true"
            key={scanRun}
            className="absolute inset-x-0 top-0 z-10 h-32 border-y border-amber-200/35 bg-gradient-to-b from-transparent via-amber-200/18 to-transparent shadow-[0_0_54px_rgba(251,191,36,.28)]"
            initial={{ y: '-45%' }}
            animate={{ y: '430%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3.35, ease: 'easeInOut' }}
          />
        ) : null}
        <div className="relative z-20 grid gap-6 p-5 lg:grid-cols-[0.9fr_1.1fr] lg:p-6">
          <div className="flex flex-col justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">
                  Page Scan
                </p>
                <span className="rounded-md bg-white/10 px-2 py-1 text-xs font-semibold text-stone-300">
                  {isScanComplete ? 'complete' : 'scanning'}
                </span>
              </div>
              <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight sm:text-5xl">
                Scan the portfolio and reveal how it works.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-stone-300">
                This view treats the site like an interface inspection: scan the page, detect the
                important layers, then show the stack behind the experience.
              </p>
              <button
                className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 text-sm font-semibold transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-amber-300"
                onClick={replayScan}
                type="button"
              >
                <RefreshCcw aria-hidden="true" className="size-4" />
                Rescan
              </button>
            </div>
            <div className="grid gap-2" aria-label="Scan findings">
              {scanFindings.map((finding, index) => {
                const isRevealed = index < revealedCount
                const isActive = index === activeFinding

                return (
                  <motion.button
                    aria-pressed={isActive}
                    className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border px-3 py-3 text-left backdrop-blur transition focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                      isActive
                        ? 'border-amber-200/50 bg-amber-200/14'
                        : 'border-white/10 bg-white/[0.07] hover:border-white/20 hover:bg-white/[0.1]'
                    } ${isRevealed ? '' : 'pointer-events-none opacity-35'}`}
                    disabled={!isRevealed}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: isRevealed ? 1 : 0.35, x: isRevealed ? 0 : -12 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    key={finding.title}
                    onClick={() => {
                      trackEvent('made_scan_finding_select', {
                        finding: finding.title,
                        target: finding.target,
                      })
                      setActiveFinding(index)
                    }}
                    type="button"
                  >
                    <span
                      className={`size-2 rounded-full ${
                        isRevealed
                          ? 'bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,.65)]'
                          : 'bg-stone-600'
                      }`}
                    />
                    <span>
                      <span className="block text-sm font-medium">{finding.title}</span>
                      {isActive ? (
                        <span className="mt-1 block text-xs leading-5 text-stone-300">{finding.detail}</span>
                      ) : null}
                    </span>
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-semibold ${
                        isRevealed
                          ? 'bg-emerald-300/12 text-emerald-200'
                          : 'bg-white/5 text-stone-500'
                      }`}
                    >
                      {isRevealed ? (isActive ? 'active' : 'inspect') : '...'}
                    </span>
                  </motion.button>
                )
              })}
            </div>
            {isScanComplete ? (
              <motion.div
                className="relative overflow-hidden rounded-2xl border border-cyan-200/20 bg-cyan-200/[0.08] p-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-cyan-200/14 text-cyan-100">
                    <Bot aria-hidden="true" className="size-5" />
                  </span>
                  <div className="relative">
                    <p className="text-sm font-semibold text-cyan-50">AI Build Pipeline</p>
                    <p className="mt-1 text-sm leading-6 text-stone-300">
                      {aiBuildStages[activeAiStage].copy}
                    </p>
                  </div>
                </div>
                <div className="relative mt-4 grid gap-2">
                  <div className="absolute bottom-4 left-4 top-4 w-px bg-cyan-200/18" />
                  {aiBuildStages.map((stage, index) => (
                    <button
                      className={`relative grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border px-3 py-2 text-left text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 ${
                        activeAiStage === index
                          ? 'border-cyan-200/40 bg-cyan-200/16 text-cyan-50'
                          : 'border-white/10 bg-white/[0.06] text-stone-300 hover:border-white/20 hover:bg-white/[0.1]'
                      }`}
                      key={stage.title}
                      onClick={() => {
                        trackEvent('made_ai_stage_select', {
                          stage: stage.title,
                        })
                        setActiveAiStage(index)
                      }}
                      type="button"
                    >
                      <span
                        className={`relative z-10 size-2 rounded-full ${
                          activeAiStage === index ? 'bg-cyan-100' : 'bg-cyan-200/45'
                        }`}
                      />
                      <span>{stage.title}</span>
                      <span className="text-[0.65rem] tabular-nums text-cyan-100/60">0{index + 1}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </div>

          <div className="relative h-[32rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#f8f4eb] p-3 text-stone-950 shadow-2xl shadow-black/30 lg:h-[34rem]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(28,25,23,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(28,25,23,.06)_1px,transparent_1px)] bg-[size:30px_30px]" />
            {!isScanComplete ? (
              <motion.div
                aria-hidden="true"
                key={`mock-scan-${scanRun}`}
                className="absolute inset-x-0 top-0 z-20 h-20 border-y border-amber-500/45 bg-gradient-to-b from-transparent via-amber-300/28 to-transparent"
                initial={{ y: '-35%' }}
                animate={{ y: '560%' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3.35, ease: 'easeInOut' }}
              />
            ) : null}
            <div className="relative grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden rounded-[1.35rem] border border-stone-950/10 bg-white/74 p-3 backdrop-blur">
              <div className="flex items-center justify-between border-b border-stone-950/10 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-400" />
                  <span className="size-2.5 rounded-full bg-amber-400" />
                  <span className="size-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-stone-500">
                  HafisFirosh.dev
                </span>
              </div>

              <div className="min-h-0 overflow-y-auto pr-1">
                <div className="grid gap-3 sm:grid-cols-[1fr_0.8fr]">
                  <motion.div
                    className={`rounded-2xl bg-stone-950 p-4 text-stone-50 transition ${
                      activeScan.target === 'viewport' || activeScan.target === 'workspace'
                        ? 'ring-2 ring-amber-300'
                        : ''
                    }`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: revealedCount >= 1 ? 1 : 0.2, y: revealedCount >= 1 ? 0 : 12 }}
                    transition={{ duration: 0.22 }}
                  >
                    <p className="text-xs uppercase tracking-[0.16em] text-amber-200">Hero</p>
                    <p className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">Product work.</p>
                    <div className="mt-5 grid gap-2">
                      <span className="h-2 rounded-full bg-white/18" />
                      <span className="h-2 w-4/5 rounded-full bg-white/18" />
                      <span className="h-2 w-3/5 rounded-full bg-white/18" />
                    </div>
                  </motion.div>
                  <motion.div
                    className={`grid gap-2 rounded-2xl border border-stone-950/10 bg-stone-950/[0.04] p-3 transition ${
                      activeScan.target === 'navigation' ? 'ring-2 ring-amber-300' : ''
                    }`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: revealedCount >= 2 ? 1 : 0.2, y: revealedCount >= 2 ? 0 : 12 }}
                    transition={{ duration: 0.22 }}
                  >
                    {['Projects', 'Story', 'Resume'].map((item) => (
                      <span
                        className="flex min-h-10 items-center justify-between rounded-xl bg-white px-3 text-sm font-semibold shadow-sm"
                        key={item}
                      >
                        {item}
                        <span className="size-2 rounded-full bg-amber-400" />
                      </span>
                    ))}
                  </motion.div>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {['Motion', 'Tailwind', 'A11y'].map((item, index) => (
                  <motion.div
                    className={`rounded-2xl border border-stone-950/10 bg-white p-3 shadow-sm transition ${
                      (activeScan.target === 'accessibility' && item === 'A11y') ||
                      (activeScan.target === 'resume' && item === 'Tailwind')
                        ? 'ring-2 ring-amber-400'
                        : ''
                    }`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: revealedCount >= 3 + index ? 1 : 0.18, y: revealedCount >= 3 + index ? 0 : 12 }}
                    transition={{ duration: 0.2 }}
                    key={item}
                  >
                    <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
                      layer
                    </span>
                    <span className="mt-2 block text-sm font-semibold">{item}</span>
                  </motion.div>
                ))}
                </div>
                <motion.div
                  className="mt-3 rounded-2xl border border-amber-400/30 bg-amber-50 p-3 text-stone-950"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: revealedCount > 0 ? 1 : 0, y: revealedCount > 0 ? 0 : 8 }}
                  transition={{ duration: 0.18 }}
                >
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                    Inspecting
                  </span>
                  <span className="mt-1 block text-sm font-semibold">{activeScan.title}</span>
                  <span className="mt-1 block text-xs leading-5 text-stone-600">{activeScan.detail}</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-stone-950/10 bg-white/78 shadow-sm transition-colors dark:border-white/10 dark:bg-white/[0.07]">
        <div className="grid gap-2 border-b border-stone-950/10 px-4 py-4 dark:border-white/10 sm:grid-cols-[1fr_auto] sm:items-end sm:px-5">
          <div>
            <h2 className="text-lg font-semibold text-stone-950 dark:text-stone-50">Detected Build Layers</h2>
            <p className="mt-1 text-sm leading-6 text-stone-500 dark:text-stone-400">
              The scan resolves into the actual tools and product decisions behind the page.
            </p>
          </div>
          <p className="rounded-xl bg-stone-950 px-3 py-2 text-xs font-semibold text-stone-50 dark:bg-stone-50 dark:text-stone-950">
            05 layers
          </p>
        </div>
        <div className="divide-y divide-stone-950/10 dark:divide-white/10">
          {stack.map((item, index) => {
            const Icon = item.icon
            const isUnlocked = index < revealedCount

            return (
              <motion.article
                className={`grid gap-3 px-4 py-4 transition sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-5 ${
                  isUnlocked ? '' : 'opacity-35'
                } ${index === activeFinding ? 'bg-amber-400/[0.08]' : ''}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: isUnlocked ? 1 : 0.35, y: isUnlocked ? 0 : 12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                key={item.title}
              >
                <span className="grid size-11 place-items-center rounded-xl bg-stone-950 text-stone-50 dark:bg-stone-50 dark:text-stone-950">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <span>
                  <span className="block text-base font-semibold text-stone-950 dark:text-stone-50">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-stone-600 dark:text-stone-300">
                    {item.copy}
                  </span>
                </span>
                <span className="hidden text-xs font-semibold tabular-nums text-stone-400 sm:block">
                  0{index + 1}
                </span>
              </motion.article>
            )
          })}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-stone-950/10 bg-white/78 shadow-sm transition-colors dark:border-white/10 dark:bg-white/[0.07]">
        <div className="grid gap-2 border-b border-stone-950/10 px-4 py-4 dark:border-white/10 sm:grid-cols-[1fr_auto] sm:items-end sm:px-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-200">
              Live System Status
            </p>
            <h2 className="mt-2 text-lg font-semibold text-stone-950 dark:text-stone-50">
              Current portfolio health
            </h2>
          </div>
          <span className="w-fit rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white dark:bg-emerald-300 dark:text-stone-950">
            live-ready
          </span>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5">
          {systemStatus.map(([label, value, detail], index) => (
            <motion.article
              className="rounded-2xl border border-stone-950/10 bg-stone-950/[0.035] p-4 dark:border-white/10 dark:bg-white/[0.06]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              key={label}
            >
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
                {label}
              </span>
              <span className="mt-2 block text-xl font-semibold text-stone-950 dark:text-stone-50">
                {value}
              </span>
              <span className="mt-2 block text-xs leading-5 text-stone-600 dark:text-stone-300">
                {detail}
              </span>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-stone-950/10 bg-stone-950 text-stone-50 shadow-2xl shadow-stone-950/20">
        <div className="grid gap-2 border-b border-white/10 px-4 py-4 sm:grid-cols-[1fr_auto] sm:items-end sm:px-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">
              CI/CD Strategy
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Main → Replica → Release → Hostinger</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-300">
              This is the deployment flow we can wire once the Hostinger access details are ready.
              The UI shows the planned release path before the automation exists.
            </p>
          </div>
          <span className="w-fit rounded-xl bg-emerald-300/12 px-3 py-2 text-xs font-semibold text-emerald-200">
            planned pipeline
          </span>
        </div>

        <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[1fr_0.82fr]">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className="absolute left-8 top-10 hidden h-[calc(100%-5rem)] w-px bg-white/12 sm:block" />
            <div className="grid gap-3">
              {ciCdStages.map((stage, index) => {
                const Icon = stage.icon
                const isActive = index === activeCiStage
                const isPassed = index < activeCiStage

                return (
                  <motion.button
                    className={`relative grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border px-3 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                      isActive
                        ? 'border-amber-200/50 bg-amber-200/14'
                        : 'border-white/10 bg-white/[0.05] hover:border-white/20 hover:bg-white/[0.09]'
                    }`}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.22 }}
                    key={stage.title}
                    onClick={() => {
                      trackEvent('made_cicd_stage_select', {
                        stage: stage.title,
                        branch: stage.branch,
                      })
                      setActiveCiStage(index)
                    }}
                    type="button"
                  >
                    <span
                      className={`relative z-10 grid size-11 place-items-center rounded-xl ${
                        isActive || isPassed
                          ? 'bg-amber-200 text-stone-950'
                          : 'bg-white/10 text-stone-400'
                      }`}
                    >
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{stage.title}</span>
                      <span className="mt-1 block text-xs leading-5 text-stone-400">{stage.detail}</span>
                    </span>
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-semibold ${
                        isActive || isPassed
                          ? 'bg-emerald-300/12 text-emerald-200'
                          : 'bg-white/5 text-stone-500'
                      }`}
                    >
                      {isPassed ? 'done' : isActive ? 'active' : stage.branch}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </div>

          <div className="grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
                Branch Model
              </p>
              <div className="mt-4 grid gap-3">
                {[
                  ['main', 'source of truth after PR review'],
                  ['replica', 'staging environment for review'],
                  ['release', 'production-ready deploy branch'],
                ].map(([branch, detail], index) => (
                  <motion.div
                    className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-xl bg-white/[0.06] p-3"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.08, duration: 0.2 }}
                    key={branch}
                  >
                    <span className="rounded-lg bg-white/10 px-2 py-1 text-xs font-semibold text-amber-200">
                      {branch}
                    </span>
                    <span className="text-sm leading-6 text-stone-300">{detail}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] p-4">
              <p className="text-sm font-semibold text-emerald-100">
                {ciCdStages[activeCiStage].title}
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-300">
                {ciCdStages[activeCiStage].detail}
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-emerald-300"
                  animate={{ width: `${((activeCiStage + 1) / ciCdStages.length) * 100}%` }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
