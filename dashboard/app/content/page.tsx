import { TopBar, SideBar, Footer } from '@/src/components/layout';
import { PostList } from '@/src/components/content';
import { FileText, CalendarRange, Sparkles } from 'lucide-react';

export default function ContentPage() {
  return (
    <main className="flex flex-col min-h-screen px-6 relative pt-24 pb-10 gap-8 text-strong">
      <TopBar />
      <section className="mx-auto flex w-full max-w-7xl flex-col xl:flex-row gap-8 flex-1">
        <SideBar />
        <div className="flex-1 flex flex-col gap-6">
          <header className="surface-1-opaque section-shell">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-3">
                <p className="section-eyebrow text-muted">Personal OS</p>
                <h1 className="text-3xl lg:text-4xl font-semibold title-gradient flex items-center gap-3">
                  <FileText className="h-6 w-6 text-orange-300" aria-hidden="true" />
                  Content
                </h1>
                <p className="text-muted max-w-xl">
                  Review weekly LinkedIn drafts, copy prompts, and keep your voice consistent.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <span className="chip text-xs font-mono text-cyan-200">
                  <CalendarRange className="h-3.5 w-3.5" aria-hidden="true" />
                  Weekly Drafts
                </span>
                <span className="chip text-xs font-mono text-cyan-200">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  AI Prompts
                </span>
              </div>
            </div>
          </header>

          <PostList />
        </div>
      </section>
      <Footer />
    </main>
  );
}
