import { Footer, TopBar, SideBar } from "@components/layout";

export default function Home() {
  return (
    <main className="flex flex-col h-screen min-h-fit px-2 relative">
      <TopBar />
      <section className="h-full flex items-center">
        <SideBar />
      </section>
      <Footer />
    </main>
  );
}