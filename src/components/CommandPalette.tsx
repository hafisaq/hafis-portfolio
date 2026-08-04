import { AnimatePresence, motion } from 'motion/react'
import { Search, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { trackEvent } from '../analytics'
import type { CommandAction, WorkspaceId } from '../data/portfolio'

type CommandPaletteProps = {
  actions: CommandAction[]
  isOpen: boolean
  onClose: () => void
  onSelectWorkspace: (workspace: WorkspaceId) => void
}

export function CommandPalette({
  actions,
  isOpen,
  onClose,
  onSelectWorkspace,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredActions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return actions
    }

    return actions.filter((action) => {
      return `${action.label} ${action.hint}`.toLowerCase().includes(normalizedQuery)
    })
  }, [actions, query])

  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      return
    }

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 80)
    return () => window.clearTimeout(focusTimer)
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const runAction = (action: CommandAction) => {
    trackEvent('command_action_select', {
      action_id: action.id,
      action_label: action.label,
      workspace: action.workspace,
      has_external: Boolean(action.external),
    })
    onSelectWorkspace(action.workspace)
    onClose()

    if (action.external) {
      window.location.href = action.external
    }
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          aria-labelledby="command-palette-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-start justify-center bg-stone-950/40 px-3 pt-[max(1rem,env(safe-area-inset-top))] backdrop-blur-sm sm:px-6 sm:pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
        >
          <motion.div
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/14 bg-[#11100f]/95 shadow-2xl shadow-black/40"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search aria-hidden="true" className="size-5 text-stone-400" />
              <div className="sr-only" id="command-palette-title">
                Command palette
              </div>
              <input
                ref={inputRef}
                aria-label="Search portfolio commands"
                className="min-h-11 flex-1 bg-transparent text-base text-stone-50 outline-none placeholder:text-stone-500"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects, story, resume, made..."
                value={query}
              />
              <button
                aria-label="Close command palette"
                className="grid size-9 place-items-center rounded-lg text-stone-400 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                onClick={onClose}
                type="button"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>
            <div className="max-h-[min(58vh,22rem)] overflow-y-auto p-2 sm:max-h-[58vh]">
              {filteredActions.map((action) => {
                const Icon = action.icon

                return (
                  <button
                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    key={action.id}
                    onClick={() => runAction(action)}
                    type="button"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/8 text-amber-200">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-stone-50">
                        {action.label}
                      </span>
                      <span className="block truncate text-sm text-stone-400">{action.hint}</span>
                    </span>
                    <span className="hidden rounded-md border border-white/10 px-2 py-1 text-xs text-stone-500 sm:inline">
                      Enter
                    </span>
                  </button>
                )
              })}
              {filteredActions.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-stone-400">
                  No matching command.
                </p>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
