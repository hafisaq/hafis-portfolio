import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { Command, Menu, Zap } from 'lucide-react'
import { CommandPalette } from './components/CommandPalette'
import { MiniGuide } from './components/MiniGuide'
import { ProjectFocus } from './components/ProjectFocus'
import { ProjectOrbit } from './components/ProjectOrbit'
import { WorkspaceDock } from './components/WorkspaceDock'
import { commandActions, getProjectById, type ProjectId, type WorkspaceId } from './data/portfolio'

const Workspaces = lazy(() =>
  import('./components/Workspaces').then((module) => ({ default: module.Workspaces })),
)

function App() {
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceId>('overview')
  const [activeProjectId, setActiveProjectId] = useState<ProjectId | null>(null)
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const [isBooting, setIsBooting] = useState(true)
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

  useEffect(() => {
    if (reducedMotion) {
      setIsBooting(false)
      return
    }

    const bootTimer = window.setTimeout(() => setIsBooting(false), 1150)
    return () => window.clearTimeout(bootTimer)
  }, [reducedMotion])

  const openCommand = () => setIsCommandOpen(true)
  const activeProject = activeProjectId ? getProjectById(activeProjectId) ?? null : null
  const heroLines = ['Product work,', 'opened like', 'a focused', 'workspace.']

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'user'}>
      <main className="min-h-svh overflow-hidden bg-[#070706] text-stone-50">
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(251,191,36,.28),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(14,165,233,.24),transparent_28%),radial-gradient(circle_at_68%_82%,rgba(139,92,246,.18),transparent_32%)]"
          animate={{ opacity: [0.75, 1, 0.82], scale: [1, 1.03, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(180deg,rgba(7,7,6,.28),rgba(7,7,6,.92)_72%)]" />

        <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a
            className="flex min-h-11 items-center gap-3 rounded-xl pr-3 text-left focus:outline-none focus:ring-2 focus:ring-amber-300"
            href="#top"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-stone-50 text-sm font-bold text-stone-950 shadow-lg shadow-amber-300/10">
              HF
            </span>
            <span>
              <span className="block text-sm font-semibold text-stone-50">Hafis Portfolio</span>
              <span className="block text-xs text-stone-500">live workspace / {currentTime}</span>
            </span>
          </a>
          <button
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.08] px-3 text-sm font-medium text-stone-100 shadow-sm backdrop-blur transition hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-amber-300"
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
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-3 py-2 text-xs font-semibold text-stone-200 shadow-sm backdrop-blur"
              initial={{ opacity: 0, y: 8 }}
              transition={{ delay: 0.1, duration: 0.22 }}
            >
              <Zap aria-hidden="true" className="size-4 text-amber-300" />
              Mobile-first product portfolio
            </motion.div>
            <h1 className="mt-5 max-w-3xl text-balance text-5xl font-semibold leading-[0.98] tracking-normal text-stone-50 sm:text-7xl lg:text-8xl">
              {heroLines.map((line, index) => (
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.18 + index * 0.08, duration: 0.48, ease: 'easeOut' }}
                  key={line}
                >
                  {line}
                </motion.span>
              ))}
            </h1>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 max-w-xl text-base leading-7 text-stone-300 sm:text-lg"
              initial={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.58, duration: 0.3 }}
            >
              A focused place to scan my work, open the important details fast, and see how I
              think through product interfaces.
            </motion.p>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.68, duration: 0.3 }}
            >
              <button
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-stone-50 px-5 text-sm font-semibold text-stone-950 shadow-xl shadow-amber-300/10 transition hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-300"
                onClick={openCommand}
                type="button"
              >
                Open command center
              </button>
              <button
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/12 bg-white/[0.08] px-5 text-sm font-semibold text-stone-100 transition hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-amber-300"
                onClick={() => setActiveWorkspace('projects')}
                type="button"
              >
                View projects
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center pb-4 lg:pb-0"
            initial={{ opacity: 0, scale: 0.97 }}
            transition={{ delay: 0.08, duration: 0.34, ease: 'easeOut' }}
          >
            <ProjectOrbit onOpenProject={setActiveProjectId} />
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
            <Workspaces
              activeWorkspace={activeWorkspace}
              onOpenCommand={openCommand}
              onOpenProject={setActiveProjectId}
            />
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
        <MiniGuide onSelectWorkspace={setActiveWorkspace} />
        <ProjectFocus project={activeProject} onClose={() => setActiveProjectId(null)} />
        <BootIntro isVisible={isBooting} />
      </main>
    </MotionConfig>
  )
}

function BootIntro({ isVisible }: { isVisible: boolean }) {
  const bootLines = ['Syncing profile', 'Composing workspaces', 'Ready']

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          aria-live="polite"
          className="fixed inset-0 z-[60] grid place-items-center bg-[#0d0c0b] px-6 text-stone-50"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="status"
        >
          <motion.div
            className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/30"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-xl bg-stone-50 text-sm font-bold text-stone-950">
                HF
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                Portfolio
              </span>
            </div>
            <motion.div
              aria-hidden="true"
              className="mx-auto mt-2 size-24 rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(251,191,36,.22),transparent_62%)]"
              animate={{ rotate: 360, scale: [1, 1.04, 1] }}
              transition={{ rotate: { duration: 6, repeat: Infinity, ease: 'linear' }, scale: { duration: 1.2, repeat: Infinity } }}
            />
            <div className="mt-5 grid gap-2">
              {bootLines.map((line, index) => (
                <motion.div
                  className="flex items-center justify-between rounded-xl bg-white/[0.06] px-3 py-2 text-sm"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18 + index * 0.18, duration: 0.18 }}
                  key={line}
                >
                  <span className="text-stone-300">{line}</span>
                  <span className="text-amber-200">{index === bootLines.length - 1 ? 'done' : '...'}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-amber-300"
                initial={{ width: '12%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.05, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
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
