import { TopBar, Footer, SideBar } from "@/src/components/layout";
import { ProfileCard, SkillsGrid } from "@/src/components/profile";
import { User, Sparkles, Globe } from "lucide-react";

export default function ProfilePage() {
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
                  <User className="h-6 w-6 text-orange-300" aria-hidden="true" />
                  Profile
                </h1>
                <p className="text-muted max-w-xl">
                  Keep your public identity synced and highlight the skills that power your work.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <span className="chip text-xs font-mono text-cyan-200">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  AI-Ready Profile
                </span>
                <span className="chip text-xs font-mono text-cyan-200">
                  <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                  Public Links
                </span>
              </div>
            </div>
          </header>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,390px)_minmax(0,1fr)]">
            <ProfileCard />
            <SkillsGrid />
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
