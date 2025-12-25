import { Footer, TopBar, SideBar, Shell } from "@components/layout";
import { ProfileCard, QuickStats, RecentAutomations, ActiveProjectsMini } from "@/src/components/dashboard";

export default function Home() {
  return (
    <main className="flex flex-col h-screen min-h-fit px-4 relative pt-20 pb-4 gap-8">
      <TopBar />
      <section className="h-full flex items-center gap-8 flex-1">
        <SideBar />
        <Shell>
          <div data-swapy-slot="profile" className="break-inside-avoid mb-4">
            <div data-swapy-item="profile">
              <ProfileCard />
            </div>
          </div>

          <div data-swapy-slot="automations" className="break-inside-avoid mb-4">
            <div data-swapy-item="automations">
              <RecentAutomations />
            </div>
          </div>

          <div data-swapy-slot="projects" className="break-inside-avoid mb-4">
            <div data-swapy-item="projects">
              <ActiveProjectsMini />
            </div>
          </div>

          <div data-swapy-slot="stats" className="break-inside-avoid mb-4">
            <div data-swapy-item="stats">
              <QuickStats />
            </div>
          </div>
        </Shell>
      </section>
      <Footer />
    </main>
  );
}