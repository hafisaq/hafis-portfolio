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
  }

  return (
    <div className="fixed bottom-20 right-3 z-40 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="mb-3 w-[min(calc(100vw-1.5rem),22rem)] overflow-hidden rounded-2xl border border-stone-950/10 bg-white/92 shadow-2xl shadow-stone-950/15 backdrop-blur-xl"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between border-b border-stone-950/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-xl bg-stone-950 text-stone-50">
                  <Bot aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-stone-950">Mini Hafis</p>
                  <p className="text-xs text-stone-500">Quick portfolio guide</p>
                </div>
              </div>
              <button
                aria-label="Close Mini Hafis"
                className="grid size-8 place-items-center rounded-lg text-stone-500 hover:bg-stone-950/7 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-950"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>
            <div className="p-4">
              <p className="rounded-xl bg-stone-950/[0.045] p-3 text-sm leading-6 text-stone-650">
                {activePrompt.answer}
              </p>
              <div className="mt-3 grid gap-2">
                {guidePrompts.map((prompt) => {
                  const Icon = prompt.icon

                  return (
                    <button
                      className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-stone-700 transition hover:bg-stone-950/7 focus:outline-none focus:ring-2 focus:ring-stone-950"
                      key={prompt.id}
                      onClick={() => runPrompt(prompt)}
                      type="button"
                    >
                      <Icon aria-hidden="true" className="size-4 text-stone-500" />
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
        className="ml-auto flex min-h-12 items-center gap-2 rounded-2xl bg-stone-950 px-4 text-sm font-semibold text-stone-50 shadow-2xl shadow-stone-950/20 transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <Bot aria-hidden="true" className="size-4" />
        Mini Hafis
      </button>
    </div>
  )
}
