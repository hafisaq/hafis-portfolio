import { AnimatePresence, motion } from 'motion/react'
import { Bot, BriefcaseBusiness, ChevronRight, FileDown, Layers3, Mail, MessageCircle, Search, Sparkles, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { trackEvent } from '../analytics'
import type { ProjectId, WorkspaceId } from '../data/portfolio'

type MiniGuideProps = {
  onOpenProject: (projectId: ProjectId) => void
  onSelectWorkspace: (workspace: WorkspaceId) => void
}

const guidePrompts = [
  {
    id: 'why-hafis',
    label: 'Why Hafis?',
    answer:
      'I have 4+ years building production mobile and web experiences across fintech, secure payments, Vision Pro delivery, AI/MCP workflows, and full-stack SaaS systems.',
    workspace: 'recruiter' as const,
    cta: 'Open recruiter mode',
    keywords: ['why', 'hire', 'fit', 'summary', 'recruiter'],
    icon: BriefcaseBusiness,
  },
  {
    id: 'best-proof',
    label: 'Best proof?',
    answer:
      'Vision Pro ownership, Easy Payment Plan delivery, 3D Secure alternative work, wallet integrations, micro-frontends, and the SaaS platform.',
    workspace: 'projects' as const,
    cta: 'Open projects',
    keywords: ['proof', 'projects', 'strongest', 'award', 'banking'],
    icon: Layers3,
  },
  {
    id: 'not-only-frontend',
    label: 'Only frontend?',
    answer:
      'No. The strongest signal is product range: React Native and React.js depth, plus Supabase Auth, RBAC, PostgreSQL, Docker, analytics, CI/CD, APIs, and AI-powered SaaS features.',
    workspace: 'recruiter' as const,
    cta: 'Open recruiter mode',
    keywords: ['frontend', 'fullstack', 'backend', 'supabase', 'node', 'api'],
    icon: Sparkles,
  },
  {
    id: 'ai-work',
    label: 'AI work?',
    answer:
      'The AI work is practical: reusable agent workflows, Copilot instructions, MCP integrations, documentation flows, debugging support, and context-aware engineering automation.',
    workspace: 'projects' as const,
    cta: 'Open AI project',
    projectId: 'ai-workflows' as const,
    keywords: ['ai', 'mcp', 'agents', 'automation', 'copilot'],
    icon: Bot,
  },
  {
    id: 'story',
    label: 'Show story',
    answer:
      'The timeline connects education, RAKBANK production work, payment platforms, spatial UI, AI workflows, and full-stack product range.',
    workspace: 'experience' as const,
    cta: 'Open story',
    keywords: ['story', 'timeline', 'career', 'experience'],
    icon: MessageCircle,
  },
  {
    id: 'cv',
    label: 'Open CV',
    answer:
      'The resume view is built for fast scanning, with a PDF preview, download action, core stack, and role-fit highlights.',
    workspace: 'resume' as const,
    cta: 'Open resume',
    keywords: ['cv', 'resume', 'download', 'pdf'],
    icon: FileDown,
  },
  {
    id: 'contact',
    label: 'Contact',
    answer:
      'Use the contact workspace for email, phone, and LinkedIn. Best fit: product engineering, React Native, fintech, AI workflow, and frontend systems roles.',
    workspace: 'contact' as const,
    cta: 'Open contact',
    keywords: ['contact', 'email', 'phone', 'linkedin'],
    icon: Mail,
  },
]

export function MiniGuide({ onOpenProject, onSelectWorkspace }: MiniGuideProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activePrompt, setActivePrompt] = useState(guidePrompts[0])
  const filteredPrompts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return guidePrompts
    }

    return guidePrompts.filter((prompt) =>
      [prompt.label, prompt.answer, prompt.workspace, ...prompt.keywords]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    )
  }, [query])

  const runPrompt = (prompt: (typeof guidePrompts)[number]) => {
    setActivePrompt(prompt)
    trackEvent('mini_hafis_prompt_select', {
      prompt_id: prompt.id,
      workspace: prompt.workspace,
    })
  }

  const openActiveWorkspace = () => {
    trackEvent('mini_hafis_cta_select', {
      prompt_id: activePrompt.id,
      workspace: activePrompt.workspace,
    })
    onSelectWorkspace(activePrompt.workspace)
    if ('projectId' in activePrompt) {
      window.setTimeout(() => onOpenProject(activePrompt.projectId), 180)
    }
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-24 right-3 z-40 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="mb-3 flex max-h-[calc(100svh-8rem)] w-[min(calc(100vw-1.5rem),28rem)] flex-col overflow-hidden rounded-2xl border border-stone-950/10 bg-white/94 shadow-2xl shadow-stone-950/15 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-[#0d0c0b]/94 dark:shadow-black/30 sm:max-h-[calc(100svh-6rem)]"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-stone-950/10 px-4 py-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-xl bg-stone-950 text-stone-50">
                  <Bot aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-stone-950 dark:text-stone-50">Mini Hafis</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">Portfolio concierge</p>
                </div>
              </div>
              <button
                aria-label="Close Mini Hafis"
                className="grid size-8 place-items-center rounded-lg text-stone-500 hover:bg-stone-950/7 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-950 dark:text-stone-400 dark:hover:bg-white/10 dark:hover:text-stone-50 dark:focus:ring-stone-50"
                onClick={() => {
                  trackEvent('mini_hafis_close', { source: 'panel_close' })
                  setIsOpen(false)
                }}
                type="button"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>
            <div className="min-h-0 overflow-y-auto p-4">
              <div className="flex items-center gap-2 rounded-xl border border-stone-950/10 bg-stone-950/[0.035] px-3 dark:border-white/10 dark:bg-white/[0.07]">
                <Search aria-hidden="true" className="size-4 text-stone-500 dark:text-stone-400" />
                <input
                  aria-label="Ask Mini Hafis"
                  className="min-h-11 flex-1 bg-transparent text-sm text-stone-950 outline-none placeholder:text-stone-500 dark:text-stone-50 dark:placeholder:text-stone-500"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Ask about AI, banking, CV, full-stack..."
                  value={query}
                />
              </div>
              <div className="mt-3 rounded-2xl bg-stone-950 p-4 text-stone-50">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-200">
                  {activePrompt.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-300">{activePrompt.answer}</p>
                <button
                  className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl bg-stone-50 px-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  onClick={openActiveWorkspace}
                  type="button"
                >
                  {activePrompt.cta}
                  <ChevronRight aria-hidden="true" className="size-4" />
                </button>
              </div>
              <div className="mt-3 grid gap-2">
                {filteredPrompts.map((prompt) => {
                  const Icon = prompt.icon

                  return (
                    <button
                      className="group flex min-h-11 items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-stone-700 transition hover:bg-stone-950/7 focus:outline-none focus:ring-2 focus:ring-stone-950 dark:text-stone-200 dark:hover:bg-white/10 dark:focus:ring-stone-50"
                      key={prompt.id}
                      onClick={() => runPrompt(prompt)}
                      type="button"
                    >
                      <Icon aria-hidden="true" className="size-4 text-stone-500 dark:text-stone-400" />
                      <span className="flex-1">{prompt.label}</span>
                      <ChevronRight
                        aria-hidden="true"
                        className="size-4 text-stone-400 transition group-hover:translate-x-0.5 group-hover:text-stone-950 dark:group-hover:text-stone-50"
                      />
                    </button>
                  )
                })}
                {filteredPrompts.length === 0 ? (
                  <p className="rounded-xl bg-stone-950/[0.045] p-3 text-sm leading-6 text-stone-600 dark:bg-white/[0.07] dark:text-stone-300">
                    Try “AI”, “banking”, “full-stack”, “CV”, or “contact”.
                  </p>
                ) : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <button
        className="ml-auto grid size-12 place-items-center rounded-2xl bg-stone-950 text-sm font-semibold text-stone-50 shadow-2xl shadow-stone-950/20 transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 sm:flex sm:min-h-12 sm:w-auto sm:gap-2 sm:px-4"
        onClick={() =>
          setIsOpen((current) => {
            trackEvent(current ? 'mini_hafis_close' : 'mini_hafis_open', {
              source: 'launcher',
            })
            return !current
          })
        }
        type="button"
      >
        <Bot aria-hidden="true" className="size-4" />
        <span className="sr-only sm:not-sr-only">Ask Hafis</span>
      </button>
    </div>
  )
}
