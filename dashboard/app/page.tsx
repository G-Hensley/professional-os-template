import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-strong">
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[28rem] w-[28rem] rounded-full bg-orange-500/15 blur-[140px]" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-24 pt-24">
        <section className="surface-1-opaque rounded-[2.5rem] px-10 py-12 rotating-glow">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-muted">Personal OS</p>
              <h1 className="text-4xl font-semibold leading-tight title-gradient sm:text-5xl">
                Your version-controlled professional identity.
              </h1>
              <p className="text-base text-muted">
                Stop re-explaining yourself to every AI tool. Professional OS turns your career
                data into structured files that power resumes, content, and job search workflows.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/dashboard"
                  className="rounded-full border border-orange-300/80 bg-orange-400 px-5 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-orange-300"
                >
                  Launch Dashboard
                </Link>
                <button className="rounded-full border border-cyan-300/50 bg-cyan-950/40 px-5 py-2 text-sm text-cyan-100 transition-colors hover:bg-cyan-900/60">
                  View the Template
                </button>
              </div>
            </div>
            <div className="grid w-full max-w-md gap-4">
              <div className="surface-2 rounded-3xl p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Status</p>
                <p className="mt-2 text-2xl font-semibold text-strong">Context synced</p>
                <p className="text-sm text-muted">Skills, projects, and content in one repo</p>
              </div>
              <div className="surface-2 rounded-3xl p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Focus</p>
                <p className="mt-2 text-2xl font-semibold text-strong">Generate + Apply</p>
                <p className="text-sm text-muted">Resumes, posts, and prep in minutes</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Single Source of Truth",
              body: "Skills, experience, projects, and content live in structured files that AI can read.",
            },
            {
              title: "AI-Native Outputs",
              body: "Generate resumes, LinkedIn posts, and interview prep directly from your data.",
            },
            {
              title: "Hosted Dashboard",
              body: "Connect your repo and visualize everything with automation history and analytics.",
            },
          ].map((card) => (
            <div key={card.title} className="surface-2 rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-strong">{card.title}</h3>
              <p className="mt-2 text-sm text-muted">{card.body}</p>
              <div className="mt-6 h-1 w-10 rounded-full bg-orange-400/70" />
            </div>
          ))}
        </section>

        <section className="surface-1 rounded-[2.5rem] px-10 py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl space-y-4">
              <h2 className="text-3xl font-semibold text-strong">
                Context that compounds instead of resets.
              </h2>
              <p className="text-sm text-muted">
                Version control your professional identity and let automations handle the
                repetitive work so you can keep shipping.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="chip text-xs font-mono text-cyan-200">GitHub Template</span>
              <span className="chip text-xs font-mono text-cyan-200">AI Commands</span>
              <span className="chip text-xs font-mono text-cyan-200">Automation Pro</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
