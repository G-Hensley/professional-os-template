import Link from "next/link";
import { ArrowUpRight, GitBranch, LayoutDashboard, Sparkles, Database, Cpu } from "lucide-react";

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
                  className="btn-primary text-sm"
                >
                  <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                  Launch Dashboard
                </Link>
                <button className="btn-secondary text-sm">
                  <GitBranch className="h-4 w-4" aria-hidden="true" />
                  View the Template
                </button>
              </div>
            </div>
            <div className="grid w-full max-w-md gap-4">
              <div className="surface-2 rounded-3xl p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-muted flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-200" aria-hidden="true" />
                  Status
                </p>
                <p className="mt-2 text-2xl font-semibold text-strong">Context synced</p>
                <p className="text-sm text-muted">Skills, projects, and content in one repo</p>
              </div>
              <div className="surface-2 rounded-3xl p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-muted flex items-center gap-2">
                  <ArrowUpRight className="h-3.5 w-3.5 text-cyan-200" aria-hidden="true" />
                  Focus
                </p>
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
              icon: Database,
            },
            {
              title: "AI-Native Outputs",
              body: "Generate resumes, LinkedIn posts, and interview prep directly from your data.",
              icon: Sparkles,
            },
            {
              title: "Hosted Dashboard",
              body: "Connect your repo and visualize everything with automation history and analytics.",
              icon: Cpu,
            },
          ].map((card) => (
            <div key={card.title} className="surface-2 rounded-3xl p-6">
              <div className="flex items-center gap-2 text-cyan-200">
                <card.icon className="h-4 w-4" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-strong">{card.title}</h3>
              </div>
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
              <span className="chip text-xs font-mono text-cyan-200">
                <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
                GitHub Template
              </span>
              <span className="chip text-xs font-mono text-cyan-200">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                AI Commands
              </span>
              <span className="chip text-xs font-mono text-cyan-200">
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                Automation Pro
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
