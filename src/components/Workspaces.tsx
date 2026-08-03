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

const panelClass = 'border border-white/10 bg-white/[0.07] shadow-2xl shadow-black/25 backdrop-blur-xl'

export function Workspaces({ activeWorkspace, onOpenCommand, onOpenProject }: WorkspacesProps) {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-28 pt-8 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 14 }}
      key={activeWorkspace}
      transition={{ duration: 0.28, ease: 'easeOut' }}
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
      {principles.map(([title, copy], index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-4 ${panelClass}`}
          initial={{ opacity: 0, y: 14 }}
          key={title}
          transition={{ delay: index * 0.06, duration: 0.24 }}
        >
          <p className="text-sm font-semibold text-stone-50">{title}</p>
          <p className="mt-2 text-sm leading-6 text-stone-400">{copy}</p>
        </motion.div>
      ))}
      <button
        className="rounded-2xl border border-amber-300/20 bg-stone-50 p-4 text-left text-stone-950 shadow-2xl shadow-amber-300/10 transition hover:-translate-y-0.5 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-300 sm:col-span-3"
        onClick={onOpenCommand}
        type="button"
      >
        <span className="text-xs uppercase tracking-[0.18em] text-amber-700">Command center</span>
        <span className="mt-3 block text-xl font-semibold">Press Cmd K or tap here to move through the portfolio.</span>
      </button>
    </div>
  )
}

function ProjectsWorkspace({ onOpenProject }: { onOpenProject: (projectId: ProjectId) => void }) {
  return (
    <div className={`overflow-hidden rounded-[1.75rem] ${panelClass}`}>
      <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-white/10 px-4 py-4 sm:px-5">
        <div>
          <h2 className="text-base font-semibold text-stone-50">Project Files</h2>
          <p className="mt-1 text-sm text-stone-500">Open a themed workspace for each project.</p>
        </div>
        <span className="self-start rounded-md bg-stone-50 px-2 py-1 text-xs font-medium text-stone-950">
          04
        </span>
      </div>

      <div className="divide-y divide-white/10">
        {projects.map((project, index) => {
          const Icon = project.icon

          return (
            <button
              className="group grid w-full gap-4 px-4 py-5 text-left transition hover:bg-white/[0.08] focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:grid-cols-[4.5rem_1fr] sm:px-5"
              key={project.id}
              onClick={() => onOpenProject(project.id)}
              type="button"
            >
              <div className="flex items-center gap-3 sm:block">
                <span className="block text-xs font-semibold tabular-nums text-stone-500">
                  0{index + 1}
                </span>
                <span
                  className={`mt-0 grid size-9 place-items-center rounded-lg ${project.accent} text-white shadow-lg shadow-black/20 transition group-hover:scale-105 sm:mt-4`}
                >
                  <Icon aria-hidden="true" className="size-4" />
                </span>
              </div>

              <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                    {project.context}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold leading-tight text-stone-50">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-stone-400">{project.summary}</p>
                </div>

                <div className="rounded-xl bg-white/[0.06] p-4">
                  <p className="text-sm leading-6 text-stone-300">{project.signal}</p>
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
    <div className={`overflow-hidden rounded-[1.75rem] ${panelClass}`}>
      <div className="grid gap-4 border-b border-white/10 px-4 py-5 sm:grid-cols-[1fr_16rem] sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">
            Story Mode
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-50">From banking releases to product systems</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-400">
            A more useful timeline than a stack list. It shows the move from banking frontend
            delivery into payments, spatial computing, architecture, AI workflows, and SaaS product building.
          </p>
        </div>
        <div className="rounded-xl bg-stone-50 p-4 text-stone-950">
          <p className="text-sm font-semibold">Current direction</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Front-end engineering, React Native, secure product flows, practical AI, and mobile-first systems.
          </p>
        </div>
      </div>

      <div className="relative px-4 py-2 sm:px-6">
        <div className="absolute bottom-8 left-[2.7rem] top-8 hidden w-px bg-white/10 sm:block" />
        {timeline.map((item, index) => (
          <article
            className="relative grid gap-4 border-b border-white/10 py-6 last:border-b-0 sm:grid-cols-[5.5rem_1fr]"
            key={item.title}
          >
            <div className="flex items-center gap-3 sm:block">
              <span className="relative z-10 grid size-9 place-items-center rounded-full bg-stone-50 text-xs font-semibold text-stone-950 shadow-lg shadow-black/35">
                {index + 1}
              </span>
              <span className="text-sm font-semibold text-amber-300 sm:mt-3 sm:block">{item.year}</span>
            </div>
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                  {item.eyebrow}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-stone-50">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-400">{item.detail}</p>
              </div>
              <ul className="grid gap-2 rounded-xl bg-white/[0.06] p-4">
                {item.points.map((point) => (
                  <li className="flex gap-3 text-sm leading-6 text-stone-300" key={point}>
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-300" />
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
        <div className={`rounded-2xl p-5 ${panelClass}`}>
          <h2 className="text-xl font-semibold text-stone-50">Hafis Firosh</h2>
          <p className="mt-2 text-sm leading-6 text-stone-400">
            Front-End / React Native Developer with 4+ years building scalable mobile and web
            applications for fintech and digital banking platforms.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {['Vision Pro lead', 'Easy Payment Plan', 'AI + MCP workflows'].map((item) => (
              <div className="rounded-xl bg-white/[0.06] p-3" key={item}>
                <p className="text-xs font-semibold text-stone-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-amber-300/15 bg-stone-50 p-5 text-stone-950 shadow-2xl shadow-amber-300/10">
          <h2 className="text-lg font-semibold">Core stack</h2>
          <p className="mt-3 text-sm leading-6 text-stone-600">
            React Native, React.js, TypeScript, JavaScript, Redux, Swift, Node.js, SDK/API
            integrations, CI/CD, micro-frontends, Supabase, PostgreSQL, Docker, and Tailwind CSS.
          </p>
        </div>
      </section>

      <section className={`overflow-hidden rounded-2xl ${panelClass}`}>
        <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-stone-50">CV Preview</h2>
            <p className="mt-1 text-sm text-stone-500">Open it in-browser or download the PDF.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.08] px-3 text-sm font-semibold text-stone-100 transition hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-amber-300"
              href={cvUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Eye aria-hidden="true" className="size-4" />
              Preview
            </a>
            <a
              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-stone-50 px-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-300"
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
          <p className="rounded-xl bg-white/[0.06] p-4 text-sm leading-6 text-stone-300">
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
      <section className="rounded-2xl border border-amber-300/15 bg-stone-50 p-5 text-stone-950 shadow-2xl shadow-amber-300/10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
          Contact
        </p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight">Let’s build something people remember.</h2>
        <p className="mt-4 text-sm leading-6 text-stone-600">
          Best for frontend, React Native, fintech, AI workflow, and product engineering roles.
        </p>
      </section>

      <section className="grid gap-3">
        <ContactLink href={`mailto:${email}`} icon={Mail} label="Email" value={email} />
        <ContactLink href={`tel:${phone.replace(/\s/g, '')}`} icon={Phone} label="Phone" value={phone} />
        <ContactLink href={linkedInUrl} icon={ExternalLink} label="LinkedIn" value="hafis-firosh-211a06185" />
      </section>
    </div>
  )
}

function ContactLink({
  href,
  icon: Icon,
  label,
  value,
}: {
  href: string
  icon: typeof Mail
  label: string
  value: string
}) {
  return (
    <a
      className={`flex min-h-16 items-center gap-3 rounded-2xl p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.10] focus:outline-none focus:ring-2 focus:ring-amber-300 ${panelClass}`}
      href={href}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      target={href.startsWith('http') ? '_blank' : undefined}
    >
      <span className="grid size-10 place-items-center rounded-xl bg-stone-50 text-stone-950">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <span>
        <span className="block text-sm font-semibold text-stone-50">{label}</span>
        <span className="text-sm text-stone-400">{value}</span>
      </span>
    </a>
  )
}
