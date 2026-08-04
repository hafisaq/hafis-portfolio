import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { Command, Compass, Eye, Layers3, Menu, Moon, Sun, Zap } from 'lucide-react'
import { CommandPalette } from './components/CommandPalette'
import { MiniGuide } from './components/MiniGuide'
import { ProjectFocus } from './components/ProjectFocus'
import { ProjectOrbit } from './components/ProjectOrbit'
import { WorkspaceDock } from './components/WorkspaceDock'
import { trackEvent } from './analytics'
import packageJson from '../package.json'
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

type ThemeMode = 'light' | 'dark'

function App() {
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceId>('overview')
  const [activeProjectId, setActiveProjectId] = useState<ProjectId | null>(null)
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const [isCommandPressed, setIsCommandPressed] = useState(false)
  const [isBooting, setIsBooting] = useState(true)
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') {
      return 'light'
    }

    const savedTheme = window.localStorage.getItem('hafis-theme')

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }

    return 'light'
  })
  const [isGuideOpen, setIsGuideOpen] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.localStorage.getItem('hafis-first-load-guide') !== 'seen'
  })
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
    let pressedTimer: number | undefined

    const handleKeyDown = (event: KeyboardEvent) => {
      const isCommandShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'

      if (isCommandShortcut) {
        event.preventDefault()
        window.clearTimeout(pressedTimer)
        setIsCommandPressed(true)
        setIsCommandOpen(true)
        trackEvent('command_open', { source: 'keyboard_shortcut' })
        pressedTimer = window.setTimeout(() => setIsCommandPressed(false), 180)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.clearTimeout(pressedTimer)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', themeMode === 'dark')
    window.localStorage.setItem('hafis-theme', themeMode)
  }, [themeMode])

  useEffect(() => {
    if (reducedMotion) {
      setIsBooting(false)
      return
    }

    const bootTimer = window.setTimeout(() => setIsBooting(false), 1450)
    return () => window.clearTimeout(bootTimer)
  }, [reducedMotion])

  const openCommand = (source = 'button') => {
    setIsCommandOpen(true)
    trackEvent('command_open', { source })
  }
  const selectWorkspace = (workspace: WorkspaceId, source = 'unknown') => {
    setActiveWorkspace(workspace)
    trackEvent('workspace_select', { workspace, source })
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
  }
  const openProject = (projectId: ProjectId, source = 'unknown') => {
    setActiveProjectId(projectId)
    trackEvent('project_open', { project_id: projectId, source })
  }
  const pressCommandButton = () => {
    setIsCommandPressed(true)
    window.setTimeout(() => setIsCommandPressed(false), 160)
  }
  const toggleTheme = () =>
    setThemeMode((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
      trackEvent('theme_toggle', { theme: nextTheme })
      return nextTheme
    })
  const closeGuide = () => {
    setIsGuideOpen(false)
    window.localStorage.setItem('hafis-first-load-guide', 'seen')
    trackEvent('first_visit_guide_close')
  }
  const activeProject = activeProjectId ? getProjectById(activeProjectId) ?? null : null
  const activeWorkspaceMeta = workspaces.find((workspace) => workspace.id === activeWorkspace)
  const isHome = activeWorkspace === 'overview'

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'user'}>
      <main className="min-h-svh overflow-hidden bg-[#f8f4eb] text-stone-950 transition-colors duration-300 dark:bg-[#080706] dark:text-stone-50">
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(28,25,23,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(28,25,23,.05)_1px,transparent_1px)] bg-[size:44px_44px] dark:bg-[linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.055)_1px,transparent_1px)]" />
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_48%_0%,rgba(251,191,36,.22),transparent_34%),linear-gradient(180deg,rgba(255,255,255,.7),transparent_34%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,.14),transparent_32%),linear-gradient(180deg,rgba(255,255,255,.055),transparent_36%)]" />

        <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a
            className="flex min-h-11 items-center gap-3 rounded-xl pr-3 text-left focus:outline-none focus:ring-2 focus:ring-stone-950 dark:focus:ring-stone-50"
            href="#top"
            onClick={(event) => {
              event.preventDefault()
              selectWorkspace('overview', 'header_logo')
            }}
          >
            <span className="grid size-10 place-items-center rounded-xl bg-stone-950 text-sm font-bold text-stone-50 dark:bg-stone-50 dark:text-stone-950">
              HF
            </span>
            <span>
              <span className="block text-sm font-semibold">Hafis Portfolio</span>
              <span className="block text-xs text-stone-500 dark:text-stone-400">
                v{packageJson.version} / {currentTime}
              </span>
            </span>
          </a>
          <div className="flex items-center gap-2">
            <button
              aria-label={`Switch to ${themeMode === 'dark' ? 'light' : 'night'} mode`}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-stone-950/10 bg-white/70 px-3 text-sm font-medium text-stone-800 shadow-sm backdrop-blur transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-stone-950 dark:border-white/10 dark:bg-white/10 dark:text-stone-100 dark:hover:bg-white/15 dark:focus:ring-stone-50"
              onClick={toggleTheme}
              type="button"
            >
              {themeMode === 'dark' ? (
                <Sun aria-hidden="true" className="size-4 text-amber-200" />
              ) : (
                <Moon aria-hidden="true" className="size-4" />
              )}
              <span className="hidden sm:inline">{themeMode === 'dark' ? 'Light' : 'Night'}</span>
            </button>
            <button
              aria-keyshortcuts="Meta+K Control+K"
              className={`inline-flex min-h-11 items-center gap-2 rounded-xl border border-stone-950/10 bg-white/70 px-3 text-sm font-medium text-stone-800 shadow-sm backdrop-blur transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-stone-950 active:scale-[0.98] dark:border-white/10 dark:bg-white/10 dark:text-stone-100 dark:hover:bg-white/15 dark:focus:ring-stone-50 ${
                isCommandPressed
                  ? 'scale-[0.98] ring-2 ring-amber-400 dark:ring-amber-300'
                  : ''
              }`}
              onClick={() => openCommand('header_button')}
              onPointerDown={pressCommandButton}
              type="button"
            >
              <Command aria-hidden="true" className="hidden size-4 sm:block" />
              <Menu aria-hidden="true" className="size-4 sm:hidden" />
              <span>Command</span>
              <kbd className="hidden rounded-md border border-stone-950/10 bg-stone-950/[0.04] px-1.5 py-0.5 text-[0.68rem] font-semibold text-stone-500 sm:inline dark:border-white/10 dark:bg-white/10 dark:text-stone-300">
                ⌘ K
              </kbd>
            </button>
          </div>
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
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-stone-950/10 bg-white/70 px-3 py-2 text-xs font-semibold text-stone-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-stone-200">
                  <Zap aria-hidden="true" className="size-4 text-amber-600" />
                  Mobile-first product portfolio
                </div>
                <h1 className="mt-5 max-w-3xl text-balance text-5xl font-semibold leading-[0.98] tracking-normal text-stone-950 sm:text-7xl lg:text-8xl dark:text-stone-50">
                  Creating enganging user experiences
                </h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-stone-650 sm:text-lg dark:text-stone-300">
                  I build fast, reliable interfaces across mobile, web, fintech, spatial products,
                  SaaS platforms, and practical AI workflows.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    className="inline-flex min-h-12 items-center justify-center rounded-xl bg-stone-950 px-5 text-sm font-semibold text-stone-50 shadow-xl shadow-stone-950/15 transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-stone-50 dark:text-stone-950 dark:hover:bg-stone-200"
                    onClick={() => openCommand('hero_primary')}
                    type="button"
                  >
                    Open command center
                  </button>
                  <button
                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-stone-950/12 bg-white/75 px-5 text-sm font-semibold text-stone-800 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-stone-950 dark:border-white/10 dark:bg-white/10 dark:text-stone-100 dark:hover:bg-white/15 dark:focus:ring-stone-50"
                    onClick={() => selectWorkspace('projects', 'hero_secondary')}
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
                <ProjectOrbit onOpenProject={(projectId) => openProject(projectId, 'hero_orbit')} />
              </motion.div>
            </motion.section>
          ) : (
            <WorkspaceStage
              activeWorkspace={activeWorkspace}
              description={activeWorkspaceMeta?.description ?? ''}
              label={activeWorkspaceMeta?.label ?? ''}
              onOpenCommand={() => openCommand('workspace_header')}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <Suspense
            fallback={
              <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-28 text-sm text-stone-500 sm:px-6 lg:px-8 dark:text-stone-400">
                Loading workspace...
              </div>
            }
          >
            <Workspaces
              activeWorkspace={activeWorkspace}
              onOpenCommand={() => openCommand('overview_workspace')}
              onOpenProject={(projectId) => openProject(projectId, 'projects_workspace')}
            />
          </Suspense>
        </AnimatePresence>

        <WorkspaceDock
          activeWorkspace={activeWorkspace}
          onSelectWorkspace={(workspace) => selectWorkspace(workspace, 'dock')}
        />
        <CommandPalette
          actions={commandActions}
          isOpen={isCommandOpen}
          onClose={() => setIsCommandOpen(false)}
          onSelectWorkspace={(workspace) => selectWorkspace(workspace, 'command_palette')}
        />
        <MiniGuide onSelectWorkspace={(workspace) => selectWorkspace(workspace, 'mini_hafis')} />
        <ProjectFocus
          project={activeProject}
          onClose={() => {
            trackEvent('project_close', { project_id: activeProject?.id })
            setActiveProjectId(null)
          }}
        />
        <BootIntro isVisible={isBooting} />
        <FirstLoadGuide
          isVisible={!isBooting && isGuideOpen}
          onClose={closeGuide}
          onOpenCommand={() => {
            closeGuide()
            openCommand('first_visit_guide')
          }}
          onSelectWorkspace={(workspace) => {
            closeGuide()
            selectWorkspace(workspace, 'first_visit_guide')
          }}
        />
      </main>
    </MotionConfig>
  )
}

function FirstLoadGuide({
  isVisible,
  onClose,
  onOpenCommand,
  onSelectWorkspace,
}: {
  isVisible: boolean
  onClose: () => void
  onOpenCommand: () => void
  onSelectWorkspace: (workspace: WorkspaceId) => void
}) {
  const guideItems = [
    {
      title: 'Open workspaces',
      copy: 'Projects, Story, Resume, Contact, and Build each open as their own focused screen.',
      icon: Layers3,
    },
    {
      title: 'Use command',
      copy: 'Press ⌘ K or tap Command to jump anywhere without hunting through the page.',
      icon: Command,
    },
    {
      title: 'Scan the proof',
      copy: 'Project files and the timeline are built for quick recruiter reading first.',
      icon: Eye,
    },
  ]

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          aria-labelledby="first-load-guide-title"
          aria-modal="true"
          className="fixed inset-0 z-[70] overflow-y-auto bg-stone-950/45 px-3 py-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm sm:grid sm:place-items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
        >
          <motion.div
            className="mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-white/12 bg-[#11100f]/96 text-stone-50 shadow-2xl shadow-black/40 sm:my-auto sm:max-h-[calc(100svh-3rem)] sm:overflow-y-auto"
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="grid gap-4 p-4 sm:grid-cols-[0.9fr_1.1fr] sm:gap-5 sm:p-6">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-3 sm:p-4">
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 sm:mb-7">
                    <span className="grid size-9 place-items-center rounded-xl bg-stone-50 text-sm font-bold text-stone-950">
                      HF
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
                      Quick Tour
                    </span>
                  </div>
                  <div className="grid gap-2 sm:gap-3">
                    {['Home', 'Projects', 'Story', 'Resume', 'Build'].map((item, index) => (
                      <motion.div
                        className="flex min-h-10 items-center justify-between rounded-xl border border-white/10 bg-white/[0.07] px-3 sm:min-h-12"
                        key={item}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + index * 0.06, duration: 0.18 }}
                      >
                        <span className="text-sm font-medium">{item}</span>
                        <span className="text-xs tabular-nums text-stone-500">0{index + 1}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-amber-200">
                  <Compass aria-hidden="true" className="size-4" />
                  First visit
                </p>
                <h2 className="mt-3 text-2xl font-semibold leading-tight sm:mt-4 sm:text-4xl" id="first-load-guide-title">
                  This works more like a product than a normal portfolio.
                </h2>
                <div className="mt-4 grid gap-2 sm:mt-5 sm:gap-3">
                  {guideItems.map((item) => {
                    const Icon = item.icon

                    return (
                      <div className="grid grid-cols-[auto_1fr] gap-3 rounded-2xl bg-white/[0.06] p-3" key={item.title}>
                        <span className="grid size-9 place-items-center rounded-xl bg-white/10 text-amber-200 sm:size-10">
                          <Icon aria-hidden="true" className="size-5" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold">{item.title}</span>
                          <span className="mt-1 block text-sm leading-5 text-stone-300 sm:leading-6">{item.copy}</span>
                        </span>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row">
                  <button
                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-stone-50 px-4 text-sm font-semibold text-stone-950 transition hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    onClick={() => onSelectWorkspace('projects')}
                    type="button"
                  >
                    Show projects
                  </button>
                  <button
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 px-4 text-sm font-semibold transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    onClick={onOpenCommand}
                    type="button"
                  >
                    Open command
                  </button>
                  <button
                    className="inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold text-stone-300 transition hover:bg-white/10 hover:text-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    onClick={onClose}
                    type="button"
                  >
                    Got it
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
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
  const isBuildWorkspace = activeWorkspace === 'build'
  const workspaceTitle = isBuildWorkspace ? 'Behind the Build' : label

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
            <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-6xl">{workspaceTitle}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-300">{description}</p>
            {isBuildWorkspace ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {['Page scan', 'AI build pipeline', 'CI/CD release flow'].map((item) => (
                  <span
                    className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-stone-200"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
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
