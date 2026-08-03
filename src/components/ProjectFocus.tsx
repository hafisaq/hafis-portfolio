import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, Check, ExternalLink, X } from 'lucide-react'
import { useEffect } from 'react'
import type { Project } from '../data/portfolio'

type ProjectFocusProps = {
  project: Project | null
  onClose: () => void
}

export function ProjectFocus({ project, onClose }: ProjectFocusProps) {
  useEffect(() => {
    if (!project) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, project])

  return (
    <AnimatePresence>
      {project ? (
        <motion.section
          aria-labelledby="project-focus-title"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 px-3 py-3 backdrop-blur-md sm:px-6 sm:py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
        >
          <motion.div
            className={`relative mx-auto min-h-[calc(100svh-1.5rem)] max-w-6xl overflow-hidden rounded-[1.75rem] border border-white/12 bg-gradient-to-br ${project.surface} text-stone-50 shadow-2xl shadow-black/40 sm:min-h-[calc(100svh-3rem)]`}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:42px_42px] opacity-25" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/10 to-transparent" />

            <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
              <button
                className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-white/10 px-3 text-sm font-medium text-stone-100 transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-amber-300"
                onClick={onClose}
                type="button"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Back
              </button>
              <button
                aria-label="Close project focus"
                className="grid size-10 place-items-center rounded-xl bg-white/10 text-stone-300 transition hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                onClick={onClose}
                type="button"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            <div className="relative grid gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-12">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-300">
                  {project.theme}
                </div>
                <h2
                  className="mt-5 max-w-2xl text-4xl font-semibold leading-[0.98] tracking-normal sm:text-6xl"
                  id="project-focus-title"
                >
                  {project.focusTitle}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-stone-300">
                  {project.focusIntro}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {project.metrics.map((metric) => (
                    <div className="rounded-2xl border border-white/10 bg-white/8 p-4" key={metric}>
                      <p className="text-sm font-semibold text-stone-100">{metric}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid content-start gap-4">
                <div className="rounded-3xl border border-white/10 bg-stone-950/38 p-4 shadow-2xl shadow-black/20 backdrop-blur">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-stone-100">Proof of work</p>
                    <ExternalLink aria-hidden="true" className="size-4 text-stone-500" />
                  </div>
                  <ul className="grid gap-3">
                    {project.proof.map((item) => (
                      <li className="flex gap-3 rounded-2xl bg-white/[0.06] p-3 text-sm leading-6 text-stone-300" key={item}>
                        <span className={`mt-1 grid size-5 shrink-0 place-items-center rounded-full ${project.accent}`}>
                          <Check aria-hidden="true" className="size-3 text-white" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
                  <p className="text-sm font-semibold text-stone-100">Build notes</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.buildNotes.map((note) => (
                      <span
                        className="rounded-lg border border-white/10 bg-stone-950/35 px-3 py-2 text-xs font-medium text-stone-300"
                        key={note}
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  )
}
