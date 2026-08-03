import { projects } from '../data/portfolio'

export function ProjectOrbit() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[19rem] overflow-hidden rounded-[2rem] border border-stone-950/10 bg-stone-950 p-4 shadow-2xl shadow-stone-950/25"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.28),transparent_32%),radial-gradient(circle_at_72%_76%,rgba(14,165,233,0.24),transparent_30%)]" />
      <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 320 320">
        <path
          className="motion-safe:animate-[dash_8s_linear_infinite]"
          d="M72 96 C128 20 238 56 248 142 C260 242 128 284 70 204 C38 160 42 124 72 96Z"
          fill="none"
          stroke="rgba(255,255,255,.22)"
          strokeDasharray="8 12"
          strokeWidth="1"
        />
        <path
          className="motion-safe:animate-[dash_10s_linear_infinite_reverse]"
          d="M94 226 C56 160 94 74 170 70 C260 66 290 178 224 232 C184 264 126 260 94 226Z"
          fill="none"
          stroke="rgba(251,191,36,.32)"
          strokeDasharray="6 10"
          strokeWidth="1"
        />
      </svg>
      <div className="relative grid h-full grid-cols-2 gap-3">
        {projects.map((project) => {
          const Icon = project.icon

          return (
            <div
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.07] p-3 text-left backdrop-blur"
              key={project.id}
            >
              <span className={`grid size-9 place-items-center rounded-xl bg-gradient-to-br ${project.accent}`}>
                <Icon className="size-5 text-white" />
              </span>
              <span className="text-[0.7rem] font-medium leading-tight text-stone-100">{project.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
