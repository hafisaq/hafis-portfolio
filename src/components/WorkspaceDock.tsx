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
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0d0c0b]/86 px-2 py-2 shadow-2xl shadow-black/35 backdrop-blur-xl sm:bottom-5 sm:left-1/2 sm:right-auto sm:w-auto sm:-translate-x-1/2 sm:rounded-2xl sm:border"
    >
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1 sm:flex sm:max-w-none">
        {workspaces.map((workspace) => {
          const Icon = workspace.icon
          const isActive = workspace.id === activeWorkspace

          return (
            <button
              aria-current={isActive ? 'page' : undefined}
              className={`flex min-h-12 items-center justify-center gap-2 rounded-xl px-2 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-amber-300 sm:min-w-28 sm:px-4 ${
                isActive
                  ? 'bg-stone-50 text-stone-950 shadow-lg shadow-amber-300/10'
                  : 'text-stone-400 hover:bg-white/8 hover:text-stone-50'
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
