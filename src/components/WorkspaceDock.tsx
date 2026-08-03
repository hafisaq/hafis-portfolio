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
      className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-900/10 bg-[#f8f4eb]/88 px-2 py-2 shadow-2xl shadow-stone-950/10 backdrop-blur-xl transition-colors sm:bottom-5 sm:left-1/2 sm:right-auto sm:w-auto sm:-translate-x-1/2 sm:rounded-2xl sm:border dark:border-white/10 dark:bg-[#0d0c0b]/88 dark:shadow-black/30"
    >
      <div className="mx-auto grid max-w-lg grid-cols-6 gap-1 sm:flex sm:max-w-none">
        {workspaces.map((workspace) => {
          const Icon = workspace.icon
          const isActive = workspace.id === activeWorkspace

          return (
            <button
              aria-current={isActive ? 'page' : undefined}
              className={`flex min-h-12 items-center justify-center gap-2 rounded-xl px-2 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-stone-950 sm:min-w-28 sm:px-4 ${
                isActive
                  ? 'bg-stone-950 text-stone-50 shadow-lg shadow-stone-950/20 dark:bg-stone-50 dark:text-stone-950 dark:shadow-black/30'
                  : 'text-stone-600 hover:bg-stone-950/7 hover:text-stone-950 dark:text-stone-400 dark:hover:bg-white/10 dark:hover:text-stone-50'
              }`}
              key={workspace.id}
              onClick={() => onSelectWorkspace(workspace.id)}
              type="button"
            >
              <Icon aria-hidden="true" className="size-5 shrink-0" />
              <span className="hidden sm:inline">{workspace.label}</span>
              <span className="sr-only sm:hidden">{workspace.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
