'use client';

import { TopBar, SideBar, Footer } from "@/src/components/layout";
import { useState } from "react";
import { AutomationPipelines, RunHistory } from "@/src/components/automations";
import { Activity, Workflow, Gauge } from "lucide-react";

export default function AutomationsPage() {
  const [selectedPipeline, setSelectedPipeline] = useState<string | undefined>(undefined);

  return (
    <main className="flex flex-col min-h-screen px-6 relative pt-24 pb-10 gap-8 text-strong">
      <TopBar />
      <section className="mx-auto flex w-full flex-col xl:flex-row gap-8 flex-1">
        <SideBar />
        <div className="flex-1 flex flex-col gap-6">
          <header className="surface-1-opaque section-shell">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-3">
                <p className="section-eyebrow text-muted">Personal OS</p>
                <h1 className="text-3xl lg:text-4xl font-semibold title-gradient flex items-center gap-3">
                  <Workflow className="h-6 w-6 text-orange-300" aria-hidden="true" />
                  Automations
                </h1>
                <p className="text-muted max-w-xl">
                  Monitor pipelines, verify run health, and drill into logs without leaving the command center.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <span className="chip text-xs font-mono text-cyan-200">
                  <Activity className="h-3.5 w-3.5" aria-hidden="true" />
                  Live Runs
                </span>
                <span className="chip text-xs font-mono text-cyan-200">
                  <Gauge className="h-3.5 w-3.5" aria-hidden="true" />
                  Health Checks
                </span>
              </div>
            </div>
          </header>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <AutomationPipelines onViewHistory={(pipeline) => setSelectedPipeline(pipeline)} />
            <RunHistory
              filterByPipeline={selectedPipeline}
              onClearFilter={() => setSelectedPipeline(undefined)}
            />
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
