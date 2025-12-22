import { Footer, TopBar, SideBar } from "@components/layout";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen h-fit">
      <TopBar />
      <section>
        <SideBar />
      </section>
      <Footer />
    </main>
  );
}