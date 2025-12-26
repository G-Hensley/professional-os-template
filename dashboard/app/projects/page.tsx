import { TopBar, SideBar, Footer, Shell } from "@/src/components/layout"
import { ProjectsTable } from "@/src/components/projects"

export default function ProjectsPage() {
  return (
    <main className="flex flex-col h-fit min-h-screen px-4 relative pt-20 pb-4 gap-8">
      <TopBar />
      <section className="h-full flex items-center gap-8 flex-1">
        <SideBar />
        <Shell>
          <div className="break-inside-avoid mb-6">
            <ProjectsTable />
          </div>
        </Shell>
      </section>
      <Footer />
    </main>
  )
}