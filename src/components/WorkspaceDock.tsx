import { motion } from 'motion/react'
import type { WorkspaceId } from '../data/portfolio'
import { workspaces } from '../data/portfolio'

type WorkspaceDockProps = {
  activeWorkspace: WorkspaceId
  onSelectWorkspace: (workspace: WorkspaceId) => void
}

export function WorkspaceDock({ activeWorkspace, onSelectWorkspace }: WorkspaceDockProps) {
  return (
    <nav
      aria-label="Portfolio workspaces"
      className="fixed inset-x-0 bottom-0 z-40 overflow-x-auto border-t border-stone-900/10 bg-[#f8f4eb]/88 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-2xl shadow-stone-950/10 backdrop-blur-xl transition-all duration-200 [-ms-overflow-style:none] [scrollbar-width:none] sm:bottom-5 sm:left-1/2 sm:right-auto sm:w-auto sm:-translate-x-1/2 sm:overflow-visible sm:rounded-2xl sm:border sm:px-2 sm:py-2 sm:hover:px-3 sm:hover:py-3 [&::-webkit-scrollbar]:hidden dark:border-white/10 dark:bg-[#0d0c0b]/88 dark:shadow-black/30"
    >
      <div className="mx-auto flex w-max min-w-max items-center justify-center gap-1 sm:max-w-none sm:items-end sm:gap-2">
        {workspaces.map((workspace) => {
          const Icon = workspace.icon
          const isActive = workspace.id === activeWorkspace

          return (
            <motion.button
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex min-h-12 min-w-[3.25rem] shrink-0 items-center justify-center gap-2 rounded-xl px-2 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-stone-950 sm:min-w-28 sm:px-4 sm:hover:z-10 sm:hover:shadow-xl sm:hover:shadow-stone-950/12 dark:sm:hover:shadow-black/30 ${
                isActive
                  ? 'bg-stone-950 text-stone-50 shadow-lg shadow-stone-950/20 dark:bg-stone-50 dark:text-stone-950 dark:shadow-black/30'
                  : 'text-stone-600 hover:bg-stone-950/7 hover:text-stone-950 dark:text-stone-400 dark:hover:bg-white/10 dark:hover:text-stone-50'
              }`}
              key={workspace.id}
              onClick={() => onSelectWorkspace(workspace.id)}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              type="button"
              whileHover={{ minWidth: 136, y: -9 }}
              whileTap={{ scale: 0.98, y: 0 }}
            >
              <Icon aria-hidden="true" className="size-5 shrink-0" />
              <span className="hidden sm:inline">{workspace.label}</span>
              <span className="sr-only sm:hidden">{workspace.label}</span>
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
