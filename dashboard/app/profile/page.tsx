import { TopBar, Footer, SideBar, Shell } from "@/src/components/layout";
import { ProfileCard, SkillsGrid } from "@/src/components/profile";

export default function ProfilePage() {
  return (
    <main className="flex flex-col h-fit min-h-screen px-4 relative pt-20 pb-4 gap-8">
      <TopBar />
      <section className="h-full flex items-center gap-8 flex-1">
        <SideBar />
        <Shell>
          <div className="break-inside-avoid">
            <ProfileCard />
          </div>
          <div className="break-inside-avoid">
            <SkillsGrid />
          </div>
        </Shell>
      </section>
      <Footer />
    </main>
  );
}