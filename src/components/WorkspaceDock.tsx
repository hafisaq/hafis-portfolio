import { motion } from 'motion/react'
import type { WorkspaceId } from '../data/portfolio'
import { workspaces } from '../data/portfolio'

type WorkspaceDockProps = {
  activeWorkspace: WorkspaceId
  onSelectWorkspace: (workspace: WorkspaceId) => void
}

export function WorkspaceDock({ activeWorkspace, onSelectWorkspace }: WorkspaceDockProps) {
  const dockWorkspaces = workspaces.filter((workspace) => workspace.id !== 'recruiter')

  return (
    <nav
      aria-label="Portfolio workspaces"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-900/10 bg-[#f8f4eb]/88 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-2xl shadow-stone-950/10 backdrop-blur-xl transition-all duration-200 lg:bottom-5 lg:left-1/2 lg:right-auto lg:w-auto lg:-translate-x-1/2 lg:rounded-2xl lg:border lg:pb-2 lg:hover:px-3 lg:hover:py-3 dark:border-white/10 dark:bg-[#0d0c0b]/88 dark:shadow-black/30"
    >
      <div className="mx-auto grid max-w-lg grid-cols-6 gap-1 lg:flex lg:max-w-none lg:items-end lg:gap-2">
        {dockWorkspaces.map((workspace) => {
          const Icon = workspace.icon
          const isActive = workspace.id === activeWorkspace

          return (
            <motion.button
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex min-h-12 items-center justify-center gap-2 rounded-xl px-2 text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-stone-950 lg:min-w-28 lg:px-4 lg:hover:z-10 lg:hover:min-w-[8.5rem] lg:hover:-translate-y-2 lg:hover:shadow-xl lg:hover:shadow-stone-950/12 dark:lg:hover:shadow-black/30 ${
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
              <span className="hidden lg:inline">{workspace.label}</span>
              <span className="sr-only lg:hidden">{workspace.label}</span>
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
