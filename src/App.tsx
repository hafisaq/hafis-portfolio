import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { Command, Menu, Zap } from 'lucide-react'
import { CommandPalette } from './components/CommandPalette'
import { MiniGuide } from './components/MiniGuide'
import { ProjectFocus } from './components/ProjectFocus'
import { ProjectOrbit } from './components/ProjectOrbit'
import { WorkspaceDock } from './components/WorkspaceDock'
import {
  commandActions,
  getProjectById,
  workspaces,
  type ProjectId,
  type WorkspaceId,
} from './data/portfolio'

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

    const bootTimer = window.setTimeout(() => setIsBooting(false), 1450)
    return () => window.clearTimeout(bootTimer)
  }, [reducedMotion])

  const openCommand = () => setIsCommandOpen(true)
  const activeProject = activeProjectId ? getProjectById(activeProjectId) ?? null : null
  const activeWorkspaceMeta = workspaces.find((workspace) => workspace.id === activeWorkspace)
  const isHome = activeWorkspace === 'overview'

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
              <span className="block text-sm font-semibold">Hafis Portfolio</span>
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

        <AnimatePresence mode="wait">
          {isHome ? (
            <motion.section
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 px-4 pb-8 pt-4 sm:px-6 sm:pt-10 lg:grid-cols-[1.08fr_0.92fr] lg:px-8"
              exit={{ opacity: 0, y: -12 }}
              id="top"
              initial={{ opacity: 0, y: 12 }}
              key="hero"
              transition={{ duration: 0.24, ease: 'easeOut' }}
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
                  Product work, opened like a focused workspace.
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
                <ProjectOrbit onOpenProject={setActiveProjectId} />
              </motion.div>
            </motion.section>
          ) : (
            <WorkspaceStage
              activeWorkspace={activeWorkspace}
              description={activeWorkspaceMeta?.description ?? ''}
              label={activeWorkspaceMeta?.label ?? ''}
              onOpenCommand={openCommand}
            />
          )}
        </AnimatePresence>

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
  const bootLines = ['Loading profile', 'Preparing project workspaces', 'Ready']

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          aria-live="polite"
          className="fixed inset-0 z-[60] grid place-items-center bg-[#0d0c0b] px-6 text-stone-50"
          exit={{ opacity: 0 }}
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

function WorkspaceStage({
  activeWorkspace,
  description,
  label,
  onOpenCommand,
}: {
  activeWorkspace: WorkspaceId
  description: string
  label: string
  onOpenCommand: () => void
}) {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-2 pt-6 sm:px-6 sm:pt-10 lg:px-8"
      exit={{ opacity: 0, y: -12 }}
      id="top"
      initial={{ opacity: 0, y: 12 }}
      key={activeWorkspace}
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      <div className="overflow-hidden rounded-[1.75rem] border border-stone-950/10 bg-stone-950 text-stone-50 shadow-2xl shadow-stone-950/20">
        <div className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-end sm:p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
              Workspace
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-6xl">{label}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-300">{description}</p>
          </div>
          <button
            className="inline-flex min-h-11 w-fit items-center rounded-xl border border-white/10 bg-white/10 px-4 text-sm font-semibold text-stone-50 transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-amber-300"
            onClick={onOpenCommand}
            type="button"
          >
            Command
          </button>
        </div>
      </div>
    </motion.section>
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
