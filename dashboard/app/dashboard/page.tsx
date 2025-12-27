import { Footer, TopBar, SideBar } from "@components/layout";
import { FolderKanban, LayoutDashboard, Briefcase, FileText, Workflow } from "lucide-react";
import { ProfileCard, QuickStats, RecentAutomations, ActiveProjectsMini, JobSearchStatus } from "@/src/components/dashboard";

export default function DashboardPage() {
  return (
    <main className="flex flex-col min-h-screen px-6 relative pt-24 pb-10 gap-8 text-strong w-full">
      <TopBar />
      <section className="mx-auto flex w-full flex-col xl:flex-row gap-8 flex-1">
        <SideBar />
        <div className="flex-1 flex flex-col gap-6">
          <header className="surface-1-opaque section-shell">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-3">
                <p className="section-eyebrow text-muted">Personal OS</p>
                <h1 className="text-3xl lg:text-4xl font-semibold title-gradient flex items-center gap-3">
                  <LayoutDashboard className="h-6 w-6 text-orange-300" aria-hidden="true" />
                  Dashboard
                </h1>
                <p className="text-muted max-w-xl">
                  Your version-controlled professional identity, synced into one command center.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <span className="chip text-xs font-mono text-cyan-200">
                  <Workflow className="h-3.5 w-3.5" aria-hidden="true" />
                  Automations Live
                </span>
                <span className="chip text-xs font-mono text-cyan-200">
                  <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                  Content Pipeline
                </span>
                <span className="chip text-xs font-mono text-cyan-200">
                  <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                  Hiring Mode
                </span>
                <button className="btn-primary text-sm">
                  <FolderKanban className="h-4 w-4" aria-hidden="true" />
                  Open Projects
                </button>
                <button className="btn-secondary text-sm">
                  <Workflow className="h-4 w-4" aria-hidden="true" />
                  View Automations
                </button>
              </div>
            </div>
          </header>

          <section className="gap-4 flex flex-wrap items-center justify-center">
            <ProfileCard />
            <QuickStats />
            <JobSearchStatus />
            <ActiveProjectsMini />
            <RecentAutomations />
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
