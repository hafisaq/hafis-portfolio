import { motion } from 'motion/react'
import { Download, ExternalLink, Eye, Mail, Phone } from 'lucide-react'
import type { ProjectId, WorkspaceId } from '../data/portfolio'
import { projects, timeline } from '../data/portfolio'

const cvUrl = '/assets/CV_HAFIS_FIROSH.pdf'
const email = 'hafisaq@gmail.com'
const phone = '+971585017102'
const linkedInUrl = 'https://www.linkedin.com/in/hafis-firosh-211a06185/'

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
      {activeWorkspace === 'projects' ? <ProjectsWorkspace onOpenProject={onOpenProject} /> : null}
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

function ProjectsWorkspace({ onOpenProject }: { onOpenProject: (projectId: ProjectId) => void }) {
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
            <button
              className="grid w-full gap-4 px-4 py-5 text-left transition hover:bg-stone-950/[0.025] focus:bg-stone-950/[0.025] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-950 sm:grid-cols-[4.5rem_1fr] sm:px-5"
              key={project.id}
              onClick={() => onOpenProject(project.id)}
              type="button"
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
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ExperienceWorkspace() {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-950/10 bg-white/78 shadow-sm">
      <div className="grid gap-4 border-b border-stone-950/10 px-4 py-5 sm:grid-cols-[1fr_16rem] sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
            Story Mode
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-950">From banking releases to product systems</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
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
        <div className="absolute bottom-8 left-[2.7rem] top-8 hidden w-px bg-stone-950/10 sm:block" />
        {timeline.map((item, index) => (
          <article
            className="relative grid gap-4 border-b border-stone-950/10 py-6 last:border-b-0 sm:grid-cols-[5.5rem_1fr]"
            key={item.title}
          >
            <div className="flex items-center gap-3 sm:block">
              <span className="relative z-10 grid size-9 place-items-center rounded-full bg-stone-950 text-xs font-semibold text-stone-50 shadow-lg shadow-stone-950/15">
                {index + 1}
              </span>
              <span className="text-sm font-semibold text-amber-700 sm:mt-3 sm:block">{item.year}</span>
            </div>
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                  {item.eyebrow}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-stone-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-650">{item.detail}</p>
              </div>
              <ul className="grid gap-2 rounded-xl bg-stone-950/[0.035] p-4">
                {item.points.map((point) => (
                  <li className="flex gap-3 text-sm leading-6 text-stone-650" key={point}>
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
  return (
    <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
      <section className="grid gap-4">
        <div className="rounded-2xl border border-stone-950/10 bg-white/75 p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-stone-950">Hafis Firosh</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Front-End / React Native Developer with 4+ years building scalable mobile and web
            applications for fintech and digital banking platforms.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {['Vision Pro lead', 'Easy Payment Plan', 'AI + MCP workflows'].map((item) => (
              <div className="rounded-xl bg-stone-950/[0.035] p-3" key={item}>
                <p className="text-xs font-semibold text-stone-600">{item}</p>
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

      <section className="overflow-hidden rounded-2xl border border-stone-950/10 bg-white/78 shadow-sm">
        <div className="flex flex-col gap-3 border-b border-stone-950/10 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-stone-950">CV Preview</h2>
            <p className="mt-1 text-sm text-stone-500">Open it in-browser or download the PDF.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-stone-950/10 bg-white px-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-950"
              href={cvUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Eye aria-hidden="true" className="size-4" />
              Preview
            </a>
            <a
              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-stone-950 px-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              download="Hafis_Firosh_CV.pdf"
              href={cvUrl}
            >
              <Download aria-hidden="true" className="size-4" />
              Download
            </a>
          </div>
        </div>
        <iframe
          className="hidden h-[34rem] w-full bg-stone-100 sm:block"
          src={`${cvUrl}#toolbar=0&navpanes=0`}
          title="Hafis Firosh CV preview"
        />
        <div className="p-4 sm:hidden">
          <p className="rounded-xl bg-stone-950/[0.035] p-4 text-sm leading-6 text-stone-650">
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
      <section className="rounded-2xl border border-stone-950/10 bg-stone-950 p-5 text-stone-50 shadow-xl shadow-stone-950/15">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">
          Contact
        </p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight">Let’s build something people remember.</h2>
        <p className="mt-4 text-sm leading-6 text-stone-300">
          Best for frontend, React Native, fintech, AI workflow, and product engineering roles.
        </p>
      </section>

      <section className="grid gap-3">
        <a
          className="flex min-h-16 items-center gap-3 rounded-2xl border border-stone-950/10 bg-white/75 p-4 shadow-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-stone-950"
          href={`mailto:${email}`}
        >
          <span className="grid size-10 place-items-center rounded-xl bg-stone-950 text-stone-50">
            <Mail aria-hidden="true" className="size-5" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-stone-950">Email</span>
            <span className="text-sm text-stone-600">{email}</span>
          </span>
        </a>
        <a
          className="flex min-h-16 items-center gap-3 rounded-2xl border border-stone-950/10 bg-white/75 p-4 shadow-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-stone-950"
          href={`tel:${phone.replace(/\s/g, '')}`}
        >
          <span className="grid size-10 place-items-center rounded-xl bg-stone-950 text-stone-50">
            <Phone aria-hidden="true" className="size-5" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-stone-950">Phone</span>
            <span className="text-sm text-stone-600">{phone}</span>
          </span>
        </a>
        <a
          className="flex min-h-16 items-center gap-3 rounded-2xl border border-stone-950/10 bg-white/75 p-4 shadow-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-stone-950"
          href={linkedInUrl}
          rel="noreferrer"
          target="_blank"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-stone-950 text-stone-50">
            <ExternalLink aria-hidden="true" className="size-5" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-stone-950">LinkedIn</span>
            <span className="text-sm text-stone-600">hafis-firosh-211a06185</span>
          </span>
        </a>
      </section>
    </div>
  )
}
