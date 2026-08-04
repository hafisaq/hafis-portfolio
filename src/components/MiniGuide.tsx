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
      'I build production mobile and web products across fintech, Vision Pro, AI workflows, and full-stack SaaS.',
    workspace: 'recruiter' as const,
    cta: 'Open recruiter mode',
    keywords: ['why', 'hire', 'fit', 'summary', 'recruiter'],
    icon: BriefcaseBusiness,
  },
  {
    id: 'best-proof',
    label: 'Best proof?',
    answer:
      'Vision Pro ownership, payment platform delivery, wallet integrations, micro-frontends, and SaaS product work.',
    workspace: 'projects' as const,
    cta: 'Open projects',
    keywords: ['proof', 'projects', 'strongest', 'award', 'banking'],
    icon: Layers3,
  },
  {
    id: 'not-only-frontend',
    label: 'Only frontend?',
    answer:
      'No. I work across React Native, React.js, Supabase Auth, RBAC, PostgreSQL, APIs, CI/CD, Docker, and AI features.',
    workspace: 'recruiter' as const,
    cta: 'Open recruiter mode',
    keywords: ['frontend', 'fullstack', 'backend', 'supabase', 'node', 'api'],
    icon: Sparkles,
  },
  {
    id: 'ai-work',
    label: 'AI work?',
    answer:
      'Practical AI work: agent workflows, Copilot instructions, MCP integrations, docs, debugging, and engineering automation.',
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
      'The timeline connects education, banking production work, payments, spatial UI, AI workflows, and full-stack range.',
    workspace: 'experience' as const,
    cta: 'Open story',
    keywords: ['story', 'timeline', 'career', 'experience'],
    icon: MessageCircle,
  },
  {
    id: 'cv',
    label: 'Open CV',
    answer:
      'The resume view has a fast scan, PDF preview, download action, core stack, and role-fit highlights.',
    workspace: 'resume' as const,
    cta: 'Open resume',
    keywords: ['cv', 'resume', 'download', 'pdf'],
    icon: FileDown,
  },
  {
    id: 'contact',
    label: 'Contact',
    answer:
      'Use Contact for email, phone, and LinkedIn. Best fit: product engineering, mobile, fintech, AI workflow, and frontend systems.',
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
            className="mb-3 flex max-h-[calc(100svh-7.5rem)] w-[min(calc(100vw-1.5rem),28rem)] flex-col overflow-hidden rounded-2xl border border-stone-950/10 bg-white/94 shadow-2xl shadow-stone-950/15 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-[#0d0c0b]/94 dark:shadow-black/30 sm:max-h-[calc(100svh-6rem)]"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-stone-950/10 px-3 py-2.5 dark:border-white/10 sm:px-4 sm:py-3">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-xl bg-stone-950 text-stone-50">
                  <Bot aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-stone-950 dark:text-stone-50">Mini Hafis</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">Quick answers</p>
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
            <div className="min-h-0 overflow-y-auto p-3 sm:p-4">
              <div className="hidden items-center gap-2 rounded-xl border border-stone-950/10 bg-stone-950/[0.035] px-3 dark:border-white/10 dark:bg-white/[0.07] sm:flex">
                <Search aria-hidden="true" className="size-4 text-stone-500 dark:text-stone-400" />
                <input
                  aria-label="Ask Mini Hafis"
                  className="min-h-11 flex-1 bg-transparent text-sm text-stone-950 outline-none placeholder:text-stone-500 dark:text-stone-50 dark:placeholder:text-stone-500"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Ask about AI, banking, CV, full-stack..."
                  value={query}
                />
              </div>
              <div className="rounded-2xl bg-stone-950 p-3 text-stone-50 sm:mt-3 sm:p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-200">
                  {activePrompt.label}
                </p>
                <p className="mt-2 text-sm leading-5 text-stone-300 sm:leading-6">{activePrompt.answer}</p>
                <button
                  className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-xl bg-stone-50 px-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-300 sm:mt-4"
                  onClick={openActiveWorkspace}
                  type="button"
                >
                  {activePrompt.cta}
                  <ChevronRight aria-hidden="true" className="size-4" />
                </button>
              </div>
              <div className="mt-2 grid gap-1.5 sm:mt-3 sm:gap-2">
                {filteredPrompts.map((prompt) => {
                  const Icon = prompt.icon

                  return (
                    <button
                      className="group flex min-h-10 items-center gap-2.5 rounded-xl px-3 text-left text-sm font-medium text-stone-700 transition hover:bg-stone-950/7 focus:outline-none focus:ring-2 focus:ring-stone-950 dark:text-stone-200 dark:hover:bg-white/10 dark:focus:ring-stone-50 sm:min-h-11 sm:gap-3"
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
