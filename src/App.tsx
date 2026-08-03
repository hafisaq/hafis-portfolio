import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { Command, Menu, Zap } from 'lucide-react'
import { CommandPalette } from './components/CommandPalette'
import { ProjectOrbit } from './components/ProjectOrbit'
import { WorkspaceDock } from './components/WorkspaceDock'
import { commandActions, type WorkspaceId } from './data/portfolio'

const Workspaces = lazy(() =>
  import('./components/Workspaces').then((module) => ({ default: module.Workspaces })),
)

function App() {
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceId>('overview')
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const currentTime = useMemo(
    () =>
      new Intl.DateTimeFormat('en', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date()),
    [],
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCommandShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'

      if (isCommandShortcut) {
        event.preventDefault()
        setIsCommandOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const openCommand = () => setIsCommandOpen(true)

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'user'}>
      <main className="min-h-svh overflow-hidden bg-[#f8f4eb] text-stone-950">
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(28,25,23,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(28,25,23,.05)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_48%_0%,rgba(251,191,36,.22),transparent_34%),linear-gradient(180deg,rgba(255,255,255,.7),transparent_34%)]" />

        <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a
            className="flex min-h-11 items-center gap-3 rounded-xl pr-3 text-left focus:outline-none focus:ring-2 focus:ring-stone-950"
            href="#top"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-stone-950 text-sm font-bold text-stone-50">
              HF
            </span>
            <span>
              <span className="block text-sm font-semibold">Hafis Portfolio OS</span>
              <span className="block text-xs text-stone-500">v0.1 / {currentTime}</span>
            </span>
          </a>
          <button
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-stone-950/10 bg-white/70 px-3 text-sm font-medium text-stone-800 shadow-sm backdrop-blur transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-stone-950"
            onClick={openCommand}
            type="button"
          >
            <Command aria-hidden="true" className="hidden size-4 sm:block" />
            <Menu aria-hidden="true" className="size-4 sm:hidden" />
            <span>Command</span>
          </button>
        </header>

        <section
          className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 px-4 pb-8 pt-4 sm:px-6 sm:pt-10 lg:grid-cols-[1.08fr_0.92fr] lg:px-8"
          id="top"
        >
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[58svh] flex-col justify-center"
            initial={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.34, ease: 'easeOut' }}
          >
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-stone-950/10 bg-white/70 px-3 py-2 text-xs font-semibold text-stone-700 shadow-sm backdrop-blur">
              <Zap aria-hidden="true" className="size-4 text-amber-600" />
              Mobile-first product portfolio
            </div>
            <h1 className="mt-5 max-w-3xl text-balance text-5xl font-semibold leading-[0.98] tracking-normal text-stone-950 sm:text-7xl lg:text-8xl">
              A portfolio that opens like an operating system.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-stone-650 sm:text-lg">
              A focused place to scan my work, open the important details fast, and see how I
              think through product interfaces.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-stone-950 px-5 text-sm font-semibold text-stone-50 shadow-xl shadow-stone-950/15 transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                onClick={openCommand}
                type="button"
              >
                Open command center
              </button>
              <button
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-stone-950/12 bg-white/75 px-5 text-sm font-semibold text-stone-800 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-stone-950"
                onClick={() => setActiveWorkspace('projects')}
                type="button"
              >
                View projects
              </button>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center pb-4 lg:pb-0"
            initial={{ opacity: 0, scale: 0.97 }}
            transition={{ delay: 0.08, duration: 0.34, ease: 'easeOut' }}
          >
            <ProjectOrbit />
          </motion.div>
        </section>

        <AnimatePresence mode="wait">
          <Suspense
            fallback={
              <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-28 text-sm text-stone-500 sm:px-6 lg:px-8">
                Loading workspace...
              </div>
            }
          >
            <Workspaces activeWorkspace={activeWorkspace} onOpenCommand={openCommand} />
          </Suspense>
        </AnimatePresence>

        <WorkspaceDock
          activeWorkspace={activeWorkspace}
          onSelectWorkspace={setActiveWorkspace}
        />
        <CommandPalette
          actions={commandActions}
          isOpen={isCommandOpen}
          onClose={() => setIsCommandOpen(false)}
          onSelectWorkspace={setActiveWorkspace}
        />
      </main>
    </MotionConfig>
  )
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)

    handleChange()
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

export default App
