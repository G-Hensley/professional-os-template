'use client';

import { Card } from "@components/ui";
import { useProjects } from "@/src/hooks";

function QuickStats() {
  const { data: projects, isLoading } = useProjects();
  
  const stats = [
    { label: 'Active Projects', value: projects?.active.length ?? 0 },
    { label: 'Planned Projects', value: projects?.planned.length ?? 0 },
  ]

  return (
    <Card>
      <h2 className="text-lg font-bold text-orange-400 text-center">Quick Stats</h2>
      {isLoading ? (
        <p className="text-cyan-200">Loading...</p>
      ) : (
        <div className="flex flex-col gap-1">
          {stats.map((stat) => (
            <div key={stat.label} className="flex justify-between gap-3">
              <span className="text-cyan-200">{stat.label}:</span>
              <span className="font-mono text-cyan-100">{stat.value}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export { QuickStats };