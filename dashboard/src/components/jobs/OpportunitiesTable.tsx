'use client';

import { Card, Skeleton } from '@/src/components/ui';
import { useJobOpportunities } from '@/src/hooks';
import { formatDate } from '@/src/lib/utils';
import { ExternalLink, Radar } from 'lucide-react';

function OpportunitiesSkeleton() {
  return (
    <div role="status" aria-label="Loading opportunities" className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 surface-3 rounded-lg space-y-2">
          <Skeleton width="w-40" height="h-4" />
          <Skeleton width="w-28" height="h-4" />
        </div>
      ))}
    </div>
  );
}

function OpportunitiesTable() {
  const { data: opportunities, isLoading, lastMonitorRun } = useJobOpportunities();

  return (
    <Card className="w-full h-fit max-h-88 scroll-fade" aria-labelledby="opportunities-heading">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 id="opportunities-heading" className="text-lg font-semibold text-accent-strong flex items-center gap-2">
            <Radar className="h-4 w-4 text-cyan-200" aria-hidden="true" />
            Opportunities
          </h2>
          <span className="text-xs text-muted">
            Last run: {lastMonitorRun ? formatDate(lastMonitorRun) : '—'}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 pb-8">
          {isLoading ? (
            <OpportunitiesSkeleton />
          ) : opportunities.length === 0 ? (
            <p className="text-muted text-sm">No new opportunities yet.</p>
          ) : (
            <div className="space-y-3">
              {opportunities.map((opp) => (
                <a
                  key={opp.id}
                  href={opp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface-3 rounded-lg p-3 flex items-center justify-between gap-3 interactive hover:border-cyan-400/60"
                >
                  <div>
                    <p className="text-sm text-cyan-200 font-medium">{opp.title}</p>
                    <p className="text-xs text-muted">
                      {opp.company} • {opp.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-cyan-200">
                    {opp.score !== undefined && (
                      <span className="font-mono text-cyan-100">{opp.score}%</span>
                    )}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export { OpportunitiesTable };
