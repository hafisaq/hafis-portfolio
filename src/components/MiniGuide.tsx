import { AnimatePresence, motion } from 'motion/react'
import { Bot, BriefcaseBusiness, Layers3, MessageCircle, X } from 'lucide-react'
import { useState } from 'react'
import type { WorkspaceId } from '../data/portfolio'

type MiniGuideProps = {
  onSelectWorkspace: (workspace: WorkspaceId) => void
}

const guidePrompts = [
  {
    id: 'why-hafis',
    label: 'Why Hafis?',
    answer:
      'He has 4+ years across React Native, React.js, fintech, secure payment flows, Vision Pro delivery, and practical AI/MCP workflows.',
    workspace: 'resume' as const,
    icon: BriefcaseBusiness,
  },
  {
    id: 'best-proof',
    label: 'Best proof?',
    answer:
      'Vision Pro ownership, Easy Payment Plan delivery, 3D Secure alternative work, wallet integrations, micro-frontends, and the SaaS platform.',
    workspace: 'projects' as const,
    icon: Layers3,
  },
  {
    id: 'story',
    label: 'Show story',
    answer:
      'The timeline connects education, RAKBANK production work, payment platforms, spatial UI, AI workflows, and full-stack product range.',
    workspace: 'experience' as const,
    icon: MessageCircle,
  },
]

export function MiniGuide({ onSelectWorkspace }: MiniGuideProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activePrompt, setActivePrompt] = useState(guidePrompts[0])

  const runPrompt = (prompt: (typeof guidePrompts)[number]) => {
    setActivePrompt(prompt)
    onSelectWorkspace(prompt.workspace)
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-24 right-3 z-40 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="mb-3 w-[min(calc(100vw-1.5rem),22rem)] overflow-hidden rounded-2xl border border-stone-950/10 bg-white/92 shadow-2xl shadow-stone-950/15 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-[#0d0c0b]/92 dark:shadow-black/30"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between border-b border-stone-950/10 px-4 py-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-xl bg-stone-950 text-stone-50">
                  <Bot aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-stone-950 dark:text-stone-50">Mini Hafis</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">Quick portfolio guide</p>
                </div>
              </div>
              <button
                aria-label="Close Mini Hafis"
                className="grid size-8 place-items-center rounded-lg text-stone-500 hover:bg-stone-950/7 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-950 dark:text-stone-400 dark:hover:bg-white/10 dark:hover:text-stone-50 dark:focus:ring-stone-50"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>
            <div className="p-4">
              <p className="rounded-xl bg-stone-950/[0.045] p-3 text-sm leading-6 text-stone-650 dark:bg-white/[0.07] dark:text-stone-300">
                {activePrompt.answer}
              </p>
              <div className="mt-3 grid gap-2">
                {guidePrompts.map((prompt) => {
                  const Icon = prompt.icon

                  return (
                    <button
                      className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-stone-700 transition hover:bg-stone-950/7 focus:outline-none focus:ring-2 focus:ring-stone-950 dark:text-stone-200 dark:hover:bg-white/10 dark:focus:ring-stone-50"
                      key={prompt.id}
                      onClick={() => runPrompt(prompt)}
                      type="button"
                    >
                      <Icon aria-hidden="true" className="size-4 text-stone-500 dark:text-stone-400" />
                      {prompt.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <button
        className="ml-auto grid size-12 place-items-center rounded-2xl bg-stone-950 text-sm font-semibold text-stone-50 shadow-2xl shadow-stone-950/20 transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 sm:flex sm:min-h-12 sm:w-auto sm:gap-2 sm:px-4"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <Bot aria-hidden="true" className="size-4" />
        <span className="sr-only sm:not-sr-only">Mini Hafis</span>
      </button>
    </div>
  )
}
