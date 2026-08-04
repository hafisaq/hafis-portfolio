import { motion, useReducedMotion } from 'motion/react'
import { useRef, useState } from 'react'
import type { WorkspaceId } from '../data/portfolio'
import { workspaces } from '../data/portfolio'

type WorkspaceDockProps = {
  activeWorkspace: WorkspaceId
  onSelectWorkspace: (workspace: WorkspaceId) => void
}

export function WorkspaceDock({ activeWorkspace, onSelectWorkspace }: WorkspaceDockProps) {
  const shouldReduceMotion = useReducedMotion()
  const mobileDockRef = useRef<HTMLDivElement | null>(null)
  const dragStartXRef = useRef<number | null>(null)
  const [draggedWorkspace, setDraggedWorkspace] = useState<WorkspaceId | null>(null)
  const mobileWorkspaces = workspaces.filter(
    (workspace) => workspace.id !== 'recruiter' && workspace.id !== 'build',
  )
  const activeMobileWorkspace = mobileWorkspaces.some((workspace) => workspace.id === activeWorkspace)
    ? activeWorkspace
    : null
  const visibleMobileWorkspace = draggedWorkspace ?? activeMobileWorkspace
  const liquidTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 420, damping: 34, mass: 0.7 }

  const findMobileWorkspaceFromPoint = (clientX: number) => {
    const dockRect = mobileDockRef.current?.getBoundingClientRect()

    if (!dockRect) {
      return null
    }

    const itemWidth = dockRect.width / mobileWorkspaces.length
    const index = Math.min(
      mobileWorkspaces.length - 1,
      Math.max(0, Math.floor((clientX - dockRect.left) / itemWidth)),
    )

    return mobileWorkspaces[index]?.id ?? null
  }

  const previewMobileWorkspace = (clientX: number) => {
    if (shouldReduceMotion) {
      return
    }

    const workspace = findMobileWorkspaceFromPoint(clientX)

    if (workspace) {
      setDraggedWorkspace(workspace)
    }
  }

  const selectDraggedWorkspace = (clientX: number) => {
    const dragStartX = dragStartXRef.current
    dragStartXRef.current = null

    if (dragStartX === null || Math.abs(clientX - dragStartX) < 10) {
      setDraggedWorkspace(null)
      return
    }

    const workspace = draggedWorkspace ?? findMobileWorkspaceFromPoint(clientX)
    setDraggedWorkspace(null)

    if (workspace) {
      onSelectWorkspace(workspace)
    }
  }

  return (
    <>
      <nav
        aria-label="Mobile portfolio workspaces"
        className="fixed inset-x-3 bottom-2 z-40 rounded-[1.45rem] border border-white/55 bg-white/45 px-2 pb-[max(0.45rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_18px_50px_rgba(28,25,23,0.16),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-2xl backdrop-saturate-150 before:pointer-events-none before:absolute before:inset-x-4 before:top-1 before:h-px before:bg-white/75 after:pointer-events-none after:absolute after:inset-0 after:rounded-[1.45rem] after:bg-[linear-gradient(180deg,rgba(255,255,255,.34),transparent_42%,rgba(255,255,255,.12))] lg:hidden dark:border-white/12 dark:bg-stone-950/40 dark:shadow-[0_18px_52px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.14)] dark:before:bg-white/18 dark:after:bg-[linear-gradient(180deg,rgba(255,255,255,.12),transparent_44%,rgba(255,255,255,.04))]"
      >
        <motion.span
          aria-hidden="true"
          animate={shouldReduceMotion ? undefined : { x: ['-22%', '22%', '-22%'] }}
          className="pointer-events-none absolute inset-y-1 left-2 w-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,.55),transparent_64%)] blur-2xl"
          transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
        />
        <div
          className="relative z-10 mx-auto grid max-w-md touch-pan-y select-none grid-cols-5 gap-1"
          onPointerCancel={() => {
            dragStartXRef.current = null
            setDraggedWorkspace(null)
          }}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId)
            dragStartXRef.current = event.clientX
            previewMobileWorkspace(event.clientX)
          }}
          onPointerMove={(event) => previewMobileWorkspace(event.clientX)}
          onPointerUp={(event) => {
            event.currentTarget.releasePointerCapture(event.pointerId)
            selectDraggedWorkspace(event.clientX)
          }}
          ref={mobileDockRef}
        >
          {mobileWorkspaces.map((workspace) => {
            const Icon = workspace.icon
            const isActive = workspace.id === visibleMobileWorkspace

            return (
              <motion.button
                aria-current={isActive ? 'page' : undefined}
                className={`relative isolate grid min-h-12 place-items-center overflow-hidden rounded-[1rem] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                  isActive
                    ? 'text-stone-50 dark:text-stone-950'
                    : 'text-stone-650 active:bg-white/60 active:text-stone-950 dark:text-stone-300 dark:active:bg-white/12 dark:active:text-stone-50'
                }`}
                key={workspace.id}
                onClick={() => onSelectWorkspace(workspace.id)}
                type="button"
                whileTap={shouldReduceMotion ? undefined : { scale: 0.93, y: 1 }}
              >
                {isActive ? (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[1rem] bg-stone-950/92 shadow-[0_10px_24px_rgba(28,25,23,0.22),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-10px_18px_rgba(255,255,255,0.06)] dark:bg-stone-50/92 dark:shadow-[0_10px_26px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.78)]"
                    layoutId="mobile-dock-liquid"
                    transition={liquidTransition}
                  />
                ) : null}
                <motion.span
                  animate={isActive && !shouldReduceMotion ? { scale: 1.08, y: -1 } : { scale: 1, y: 0 }}
                  className="relative z-10 grid place-items-center"
                  transition={liquidTransition}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </motion.span>
                <span className="sr-only">{workspace.label}</span>
              </motion.button>
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
