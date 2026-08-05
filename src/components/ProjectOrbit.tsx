import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { projects, type ProjectId } from '../data/portfolio'

type ProjectOrbitProps = {
  onOpenProject: (projectId: ProjectId) => void
}

export function ProjectOrbit({ onOpenProject }: ProjectOrbitProps) {
  return (
    <motion.div
      aria-label="Featured project workspaces"
      className="relative mx-auto w-full max-w-[24rem] overflow-hidden rounded-[2rem] border border-stone-950/10 bg-[#0d0c0b] p-3 shadow-2xl shadow-stone-950/25 sm:p-4"
      initial={{ opacity: 0, rotateX: 8, y: 18 }}
      animate={{ opacity: 1, rotateX: 0, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(251,191,36,0.22),transparent_28%),radial-gradient(circle_at_82%_82%,rgba(14,165,233,0.2),transparent_30%)]" />
      <motion.div
        animate={{ y: ['-20%', '120%'] }}
        className="absolute left-0 right-0 top-0 h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent"
        transition={{ duration: 4.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.4 }}
      />
      <motion.span
        animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.25, 1] }}
        className="absolute right-6 top-6 size-2 rounded-full bg-emerald-300 shadow-[0_0_22px_rgba(110,231,183,.75)]"
        transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 420 320">
        <path
          className="motion-safe:animate-[dash_8s_linear_infinite]"
          d="M54 116 C130 26 280 36 344 124 C405 210 296 292 174 258 C76 230 16 160 54 116Z"
          fill="none"
          stroke="rgba(255,255,255,.22)"
          strokeDasharray="8 12"
          strokeWidth="1"
        />
        <path
          className="motion-safe:animate-[dash_10s_linear_infinite_reverse]"
          d="M92 238 C48 154 112 64 214 70 C326 78 380 176 294 240 C238 282 134 282 92 238Z"
          fill="none"
          stroke="rgba(251,191,36,.32)"
          strokeDasharray="6 10"
          strokeWidth="1"
        />
      </svg>
      <div className="relative rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-3 backdrop-blur">
        <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400/80" />
            <span className="size-2.5 rounded-full bg-amber-300/80" />
            <span className="size-2.5 rounded-full bg-emerald-300/80" />
          </div>
          <span className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-stone-400">
            Workspaces
          </span>
        </div>

        <div className="mb-3 grid grid-cols-3 gap-2">
          {['scan', 'route', 'open'].map((status, index) => (
            <motion.span
              animate={{ opacity: [0.45, 1, 0.45] }}
              className="rounded-full border border-white/10 bg-white/[0.07] px-2 py-1 text-center text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-stone-400"
              key={status}
              transition={{ delay: index * 0.4, duration: 1.8, repeat: Infinity }}
            >
              {status}
            </motion.span>
          ))}
        </div>

        <div className="grid gap-2.5">
          {projects.map((project, index) => {
            const Icon = project.icon

            return (
              <motion.button
                aria-label={`Open ${project.name} project`}
                className="group grid min-h-16 grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.085] px-3 py-2.5 text-left shadow-sm shadow-black/15 backdrop-blur transition hover:-translate-y-0.5 hover:border-amber-200/45 hover:bg-white/[0.14] hover:shadow-lg hover:shadow-amber-950/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
                initial={{ opacity: 0, x: 20 }}
                key={project.id}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + index * 0.06, duration: 0.28, ease: 'easeOut' }}
                whileHover={{ x: 4, scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => onOpenProject(project.id)}
                type="button"
              >
                <span className={`grid size-9 place-items-center rounded-xl ${project.accent} text-white`}>
                  <Icon className="size-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold leading-tight text-stone-50">
                    {project.name}
                  </span>
                  <span className="mt-0.5 block truncate text-[0.68rem] text-stone-400">
                    {project.context}
                  </span>
                </span>
                <span className="grid gap-1.5 justify-items-end">
                  <span className="text-[0.68rem] font-semibold tabular-nums text-stone-500">
                    0{index + 1}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-normal text-stone-300 transition group-hover:border-amber-200/40 group-hover:bg-amber-200 group-hover:text-stone-950">
                    Open
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
