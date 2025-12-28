'use client';

import { Card, Skeleton } from '@/src/components/ui';
import { useJobStats } from '@/src/hooks';
import { Briefcase, ClipboardCheck, Sparkles, XCircle, BadgeCheck } from 'lucide-react';

const STAT_ITEMS = [
  { key: 'toApply', label: 'To Apply', icon: Sparkles },
  { key: 'applied', label: 'Applied', icon: Briefcase },
  { key: 'interviewing', label: 'Interviewing', icon: ClipboardCheck },
  { key: 'offered', label: 'Offers', icon: BadgeCheck },
  { key: 'rejected', label: 'Rejected', icon: XCircle },
] as const;

function JobStatsSkeleton() {
  return (
    <div role="status" aria-label="Loading job stats" className="space-y-3">
      {STAT_ITEMS.map((item) => (
        <div key={item.key} className="flex items-center justify-between border-b border-cyan-900/40 pb-2 last:border-0 last:pb-0">
          <Skeleton width="w-28" height="h-4" />
          <Skeleton width="w-10" height="h-4" />
        </div>
      ))}
    </div>
  );
}

function JobStats() {
  const { data, isLoading } = useJobStats();

  return (
    <Card className="w-full" aria-labelledby="job-stats-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="job-stats-heading" className="text-lg font-semibold text-accent-strong">
          Job Funnel
        </h2>
        <span className="text-xs text-muted">Total: {data?.total ?? 0}</span>
      </div>

      {isLoading ? (
        <JobStatsSkeleton />
      ) : (
        <div className="space-y-3">
          {STAT_ITEMS.map((item) => {
            const Icon = item.icon;
            const value = data ? data[item.key] : 0;
            return (
              <div
                key={item.key}
                className="flex items-center justify-between border-b border-cyan-900/40 pb-2 last:border-0 last:pb-0"
              >
                <span className="text-sm text-cyan-200 flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-cyan-300/70" aria-hidden="true" />
                  {item.label}
                </span>
                <span className="text-sm font-mono text-cyan-100">{value}</span>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

export { JobStats };
