import { Footer, TopBar, SideBar, Shell } from "@components/layout";
import { ProfileCard, QuickStats, RecentAutomations, ActiveProjectsMini, JobSearchStatus } from "@/src/components/dashboard";

export default function Home() {
  return (
    <main className="flex flex-col h-fit min-h-screen px-4 relative pt-20 pb-4 gap-8">
      <TopBar />
      <section className="h-full flex items-center gap-8 flex-1">
        <SideBar />
        <Shell>
          <div className="break-inside-avoid mb-6">
            <ProfileCard />
          </div>
          <div className="break-inside-avoid mb-6">
            <QuickStats />
          </div>
          <div className="break-inside-avoid mb-6">
            <JobSearchStatus />
          </div>
          <div className="break-inside-avoid mb-6">
            <RecentAutomations />
          </div>
          <div className="break-inside-avoid mb-6">
            <ActiveProjectsMini />
          </div>
        </Shell>
      </section>
      <Footer />
    </main>
  );
}