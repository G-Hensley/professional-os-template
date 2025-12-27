import { TopBar, SideBar, Footer, Shell } from '@/src/components/layout';
import { PostList } from '@/src/components/content';

export default function ContentPage() {
  return (
    <main className="flex flex-col h-fit min-h-screen px-4 relative pt-20 pb-4 gap-8">
      <TopBar />
      <section className="h-full flex items-center gap-8 flex-1">
        <SideBar />
        <Shell>
          <div className="break-inside-avoid">
            <PostList />
          </div>
        </Shell>
      </section>
      <Footer />
    </main>
  );
}
