'use client';

import { useState } from 'react';
import { Card, Tabs } from '@/src/components/ui';
import { useAutomationRuns } from '@/src/hooks';
import { RunHistoryRow } from './RunHistoryRow';
import { RunHistorySkeleton } from './RunHistorySkeleton';

type FilterType = 'all' | 'success' | 'error';

interface RunHistoryProps {
  filterByPipeline?: string;
}

function RunHistory({ filterByPipeline }: RunHistoryProps) {
  const { data: runs, isLoading } = useAutomationRuns();
  const [statusFilter, setStatusFilter] = useState<FilterType>('all');

  const filteredRuns = runs
    .filter((run) => {
      if (filterByPipeline && run.name !== filterByPipeline) return false;
      if (statusFilter === 'all') return true;
      return run.status === statusFilter;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'success', label: 'Success' },
    { value: 'error', label: 'Errors' },
  ];

  return (
    <section aria-labelledby="run-history-heading">
      <Card className="w-xl h-96 overflow-y-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <h2 id="run-history-heading" className="text-lg font-bold text-orange-400">
            {filterByPipeline ? `${filterByPipeline} History` : 'Recent Runs'}
          </h2>
          <Tabs value={statusFilter} options={filters} onChange={(value) => setStatusFilter(value as FilterType)} />
        </div>

        {isLoading ? (
          <RunHistorySkeleton />
        ) : filteredRuns.length === 0 ? (
          <p className="text-gray-400 text-sm">No runs found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-left">
                  <th className="py-2 pr-4 text-cyan-400 font-semibold">Date</th>
                  <th className="py-2 pr-4 text-cyan-400 font-semibold">Time</th>
                  <th className="py-2 pr-4 text-cyan-400 font-semibold">Pipeline</th>
                  <th className="py-2 pr-4 text-cyan-400 font-semibold">Status</th>
                  <th className="py-2 text-cyan-400 font-semibold">Log</th>
                </tr>
              </thead>
              <tbody>
                {filteredRuns.map((run) => (
                  <RunHistoryRow key={`${run.name}-${run.timestamp}`} run={run} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-4">
          Showing {filteredRuns.length} of {runs.length} runs
        </p>
      </Card>
    </section>
  );
}

export { RunHistory };
