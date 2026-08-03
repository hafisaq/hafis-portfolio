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
  const principles = [
    ['Frontend systems', 'Interfaces that hold up under real product constraints.'],
    ['Product feel', 'Motion and layout used to guide attention, not decorate the page.'],
    ['Mobile first', 'The small screen gets the real experience, not a compressed desktop.'],
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {principles.map(([title, copy]) => (
        <div className="rounded-2xl border border-stone-950/10 bg-white/70 p-4 shadow-sm" key={title}>
          <p className="text-sm font-semibold text-stone-950">{title}</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            {copy}
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
    <div className="overflow-hidden rounded-2xl border border-stone-950/10 bg-white/78 shadow-sm">
      <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-stone-950/10 px-4 py-3 sm:px-5">
        <div>
          <h2 className="text-base font-semibold text-stone-950">Project Files</h2>
          <p className="mt-1 text-sm text-stone-500">A quick read of what each piece is really showing.</p>
        </div>
        <span className="self-start rounded-md bg-stone-950 px-2 py-1 text-xs font-medium text-stone-50">
          04
        </span>
      </div>

      <div className="divide-y divide-stone-950/10">
        {projects.map((project, index) => {
          const Icon = project.icon

          return (
            <article
              className="grid gap-4 px-4 py-5 transition hover:bg-stone-950/[0.025] sm:grid-cols-[4.5rem_1fr] sm:px-5"
              key={project.id}
            >
              <div className="flex items-center gap-3 sm:block">
                <span className="block text-xs font-semibold tabular-nums text-stone-400">
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
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                    {project.context}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold leading-tight text-stone-950">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-stone-650">{project.summary}</p>
                </div>

                <div className="rounded-xl bg-stone-950/[0.035] p-4">
                  <p className="text-sm leading-6 text-stone-700">{project.signal}</p>
                  <dl className="mt-4 grid gap-2 sm:grid-cols-3">
                    {project.metrics.map((metric) => (
                      <div key={metric}>
                        <dt className="sr-only">Signal</dt>
                        <dd className="text-xs font-medium text-stone-500">{metric}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </article>
          )
        })}
      </div>
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
