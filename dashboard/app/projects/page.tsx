import { TopBar, SideBar, Footer } from "@/src/components/layout"
import { FolderKanban, ClipboardList, Flame, Rocket } from "lucide-react";
import { ProjectsTable } from "@/src/components/projects"

export default function ProjectsPage() {
  return (
    <main className="flex flex-col min-h-screen px-6 relative pt-24 pb-10 gap-8 text-strong">
      <TopBar />
      <section className="mx-auto flex w-full flex-col xl:flex-row gap-8 flex-1">
        <SideBar />
        <div className="flex-1 flex flex-col gap-6">
          <header className="surface-1-opaque section-shell">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-3">
                <p className="section-eyebrow text-muted">Personal OS</p>
                <h1 className="text-3xl lg:text-4xl font-semibold title-gradient flex items-center gap-3">
                  <FolderKanban className="h-6 w-6 text-orange-300" aria-hidden="true" />
                  Projects
                </h1>
                <p className="text-muted max-w-xl">
                  Track status, priorities, and blockers across everything you are shipping.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <span className="chip text-xs font-mono text-cyan-200">
                  <ClipboardList className="h-3.5 w-3.5" aria-hidden="true" />
                  Active Pipeline
                </span>
                <span className="chip text-xs font-mono text-cyan-200">
                  <Flame className="h-3.5 w-3.5" aria-hidden="true" />
                  Planning Mode
                </span>
                <span className="chip text-xs font-mono text-cyan-200">
                  <Rocket className="h-3.5 w-3.5" aria-hidden="true" />
                  Ship Focus
                </span>
              </div>
            </div>
          </header>

          <ProjectsTable />
        </div>
      </section>
      <Footer />
    </main>
  )
}
