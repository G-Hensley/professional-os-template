import { Footer, TopBar, SideBar, Shell } from "@components/layout";
import { ProfileCard, QuickStats, RecentAutomations, ActiveProjectsMini } from "@/src/components/dashboard";

export default function Home() {
  return (
    <main className="flex flex-col h-screen min-h-fit px-4 relative pt-20 pb-4 gap-8">
      <TopBar />
      <section className="h-full flex items-center gap-8 flex-1">
        <SideBar />
        <Shell>
          {/* Main dashboard content goes here */}
          <ProfileCard />
          <RecentAutomations />
          <ActiveProjectsMini />
          <QuickStats />
        </Shell>
      </section>
      <Footer />
    </main>
  );
}