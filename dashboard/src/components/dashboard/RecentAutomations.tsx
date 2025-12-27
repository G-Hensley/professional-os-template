'use client';

import Link from 'next/link';
import { Card } from '../ui/Card';
import { Skeleton } from '@/src/components/ui';
import { useRecentAutomations } from '@/src/hooks';

function AutomationsListSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading recent automations"
      className="space-y-2"
    >
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-lg grid grid-cols-[140px_1fr_30px] gap-2 py-2 px-3 items-center surface-3"
        >
          <Skeleton width="w-28" height="h-5" />
          <Skeleton width="w-32" height="h-4" />
          <Skeleton width="w-2" height="h-2" rounded className="justify-self-end" />
        </div>
      ))}
      <span className="sr-only">Loading recent automations...</span>
    </div>
  );
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'success':
      return 'Completed successfully';
    case 'running':
      return 'Currently running';
    default:
      return 'Failed';
  }
}

function RecentAutomations() {
  const { data: recentAutomations, isLoading, isError } = useRecentAutomations();

  return (
    <Card className="w-fit" aria-labelledby="recent-automations-heading">
      <h2
        id="recent-automations-heading"
        className="text-lg font-bold text-orange-400 text-center"
      >
        Recent Automations
      </h2>

      {isLoading ? (
        <AutomationsListSkeleton />
      ) : isError ? (
        <p role="alert" className="text-red-400">
          Error loading automations.
        </p>
      ) : recentAutomations.length === 0 ? (
        <p className="text-cyan-200">No recent automations found.</p>
      ) : (
        <ul className="space-y-2" aria-label="Recent automations list">
          {recentAutomations.map((automation) => (
            <li key={automation.url}>
              <a
                href={automation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg grid grid-cols-[140px_1fr_30px] gap-2 py-2 px-3 items-center hover:bg-cyan-800/30 transition-colors duration-200 surface-3 interactive hover:border-cyan-400/60"
                aria-label={`${automation.name}, ${getStatusLabel(automation.status)}, ${new Date(automation.timestamp).toLocaleString()} (opens in new tab)`}
              >
                <span className="text-cyan-200 truncate">{automation.name}</span>
                <span className="text-orange-400 text-left">
                  {new Date(automation.timestamp).toLocaleString()}
                </span>
                <span
                  className={`w-2 h-2 rounded-full justify-self-end ${
                    automation.status === 'success'
                      ? 'bg-green-400'
                      : automation.status === 'running'
                        ? 'bg-yellow-400 animate-pulse'
                        : 'bg-red-500'
                  }`}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/automations"
        className="btn-secondary text-sm mt-2 font-mono block text-center w-fit mx-auto"
        aria-label="View all automations"
      >
        View Automations
      </Link>
    </Card>
  );
}

export { RecentAutomations };
