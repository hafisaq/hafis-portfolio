import { motion } from 'motion/react'
import type { WorkspaceId } from '../data/portfolio'
import { projects, timeline } from '../data/portfolio'

type WorkspacesProps = {
  activeWorkspace: WorkspaceId
  onOpenCommand: () => void
}

export function Workspaces({ activeWorkspace, onOpenCommand }: WorkspacesProps) {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-6xl px-4 pb-28 pt-8 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 10 }}
      key={activeWorkspace}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {activeWorkspace === 'overview' ? <OverviewWorkspace onOpenCommand={onOpenCommand} /> : null}
      {activeWorkspace === 'projects' ? <ProjectsWorkspace /> : null}
      {activeWorkspace === 'experience' ? <ExperienceWorkspace /> : null}
      {activeWorkspace === 'resume' ? <ResumeWorkspace /> : null}
      {activeWorkspace === 'contact' ? <ContactWorkspace /> : null}
    </motion.section>
  )
}

function OverviewWorkspace({ onOpenCommand }: { onOpenCommand: () => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {['Frontend systems', 'Product feel', 'Mobile performance'].map((item) => (
        <div className="rounded-2xl border border-stone-950/10 bg-white/70 p-4 shadow-sm" key={item}>
          <p className="text-sm font-semibold text-stone-950">{item}</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Built to feel like a product surface: direct navigation, quiet motion, and content that is easy to scan.
          </p>
        </div>
      ))}
      <button
        className="rounded-2xl border border-stone-950 bg-stone-950 p-4 text-left text-stone-50 shadow-xl shadow-stone-950/15 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-400 sm:col-span-3"
        onClick={onOpenCommand}
        type="button"
      >
        <span className="text-xs uppercase tracking-[0.18em] text-amber-200">Command center</span>
        <span className="mt-3 block text-xl font-semibold">Press Cmd K or tap here to move through the portfolio.</span>
      </button>
    </div>
  )
}

function ProjectsWorkspace() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {projects.map((project) => {
        const Icon = project.icon

        return (
          <article
            className="rounded-2xl border border-stone-950/10 bg-white/75 p-4 shadow-sm sm:p-5"
            key={project.id}
          >
            <div className="flex items-start gap-3">
              <span className={`grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${project.accent}`}>
                <Icon aria-hidden="true" className="size-5 text-white" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-stone-950">{project.name}</h2>
                <p className="mt-1 text-sm font-medium text-stone-600">{project.role}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-stone-700">{project.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span className="rounded-full border border-stone-950/10 px-3 py-1 text-xs text-stone-600" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        )
      })}
    </div>
  )
}

function ExperienceWorkspace() {
  return (
    <div className="rounded-2xl border border-stone-950/10 bg-white/75 p-4 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold text-stone-950">Story Mode</h2>
      <div className="mt-5 grid gap-4">
        {timeline.map((item) => (
          <div className="grid gap-3 border-l border-stone-950/10 pl-4 sm:grid-cols-[6rem_1fr]" key={item.title}>
            <span className="text-sm font-semibold text-amber-700">{item.year}</span>
            <div>
              <h3 className="font-semibold text-stone-950">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-stone-600">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ResumeWorkspace() {
  return (
    <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-2xl border border-stone-950/10 bg-white/75 p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-stone-950">Hafis Firosh</h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Frontend engineer focused on polished product interfaces, TypeScript systems, and practical AI workflows.
        </p>
      </section>
      <section className="rounded-2xl border border-stone-950/10 bg-stone-950 p-5 text-stone-50 shadow-xl shadow-stone-950/15">
        <h2 className="text-lg font-semibold">Core stack</h2>
        <p className="mt-3 text-sm leading-6 text-stone-300">
          React, TypeScript, Tailwind CSS, Motion, accessibility, responsive UI, and production release habits.
        </p>
      </section>
    </div>
  )
}

function ContactWorkspace() {
  return (
    <div className="rounded-2xl border border-stone-950/10 bg-white/75 p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-stone-950">Contact</h2>
      <p className="mt-2 text-sm leading-6 text-stone-600">
        Keep this lightweight for v1: direct email, LinkedIn, GitHub, and resume download actions can be wired to final URLs next.
      </p>
      <a
        className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-stone-950 px-4 text-sm font-semibold text-stone-50 transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
        href="mailto:hello@hafis.dev"
      >
        Email Hafis
      </a>
    </div>
  )
}
