import { TopBar, Footer, SideBar, Shell } from "@/src/components/layout";

export default function ProfilePage() {
  return (
    <main className="flex flex-col h-fit min-h-screen px-4 relative pt-20 pb-4 gap-8">
      <TopBar />
      <section className="h-full flex items-center gap-8 flex-1">
        <SideBar />
        <Shell>
          <div className="break-inside-avoid mb-6">
          </div>
        </Shell>
      </section>
      <Footer />
    </main>
  );
}