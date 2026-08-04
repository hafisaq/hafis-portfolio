import { motion } from 'motion/react'
import type { WorkspaceId } from '../data/portfolio'
import { workspaces } from '../data/portfolio'

type WorkspaceDockProps = {
  activeWorkspace: WorkspaceId
  onSelectWorkspace: (workspace: WorkspaceId) => void
}

export function WorkspaceDock({ activeWorkspace, onSelectWorkspace }: WorkspaceDockProps) {
  const mobileWorkspaces = workspaces.filter(
    (workspace) => workspace.id !== 'recruiter' && workspace.id !== 'build',
  )

  return (
    <>
      <nav
        aria-label="Mobile portfolio workspaces"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-900/10 bg-[#f8f4eb]/90 px-3 pb-[max(0.55rem,env(safe-area-inset-bottom))] pt-2 shadow-2xl shadow-stone-950/10 backdrop-blur-xl lg:hidden dark:border-white/10 dark:bg-[#0d0c0b]/90 dark:shadow-black/30"
      >
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
          {mobileWorkspaces.map((workspace) => {
            const Icon = workspace.icon
            const isActive = workspace.id === activeWorkspace

            return (
              <button
                aria-current={isActive ? 'page' : undefined}
                className={`grid min-h-12 place-items-center rounded-xl transition focus:outline-none focus:ring-2 focus:ring-stone-950 ${
                  isActive
                    ? 'bg-stone-950 text-stone-50 shadow-lg shadow-stone-950/20 dark:bg-stone-50 dark:text-stone-950 dark:shadow-black/30'
                    : 'text-stone-600 active:bg-stone-950/7 active:text-stone-950 dark:text-stone-400 dark:active:bg-white/10 dark:active:text-stone-50'
                }`}
                key={workspace.id}
                onClick={() => onSelectWorkspace(workspace.id)}
                type="button"
              >
                <Icon aria-hidden="true" className="size-5" />
                <span className="sr-only">{workspace.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      <nav
        aria-label="Portfolio workspaces"
        className="fixed bottom-5 left-1/2 z-40 hidden w-auto -translate-x-1/2 rounded-2xl border border-stone-900/10 bg-[#f8f4eb]/88 px-2 py-2 shadow-2xl shadow-stone-950/10 backdrop-blur-xl transition-all duration-200 hover:px-3 hover:py-3 lg:block dark:border-white/10 dark:bg-[#0d0c0b]/88 dark:shadow-black/30"
      >
        <div className="flex max-w-none items-end gap-2">
          {workspaces.map((workspace) => {
            const Icon = workspace.icon
            const isActive = workspace.id === activeWorkspace

            return (
              <motion.button
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex min-h-12 min-w-28 items-center justify-center gap-2 rounded-xl px-4 text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-stone-950 hover:z-10 hover:min-w-[8.5rem] hover:-translate-y-2 hover:shadow-xl hover:shadow-stone-950/12 dark:hover:shadow-black/30 ${
                  isActive
                    ? 'bg-stone-950 text-stone-50 shadow-lg shadow-stone-950/20 dark:bg-stone-50 dark:text-stone-950 dark:shadow-black/30'
                    : 'text-stone-600 hover:bg-stone-950/7 hover:text-stone-950 dark:text-stone-400 dark:hover:bg-white/10 dark:hover:text-stone-50'
                }`}
                key={workspace.id}
                onClick={() => onSelectWorkspace(workspace.id)}
                transition={{ duration: 0.16, ease: 'easeOut' }}
                type="button"
                whileTap={{ scale: 0.98, y: 0 }}
              >
                <Icon aria-hidden="true" className="size-5 shrink-0" />
                <span>{workspace.label}</span>
              </motion.button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
