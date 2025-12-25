'use client';

import { Card, Skeleton } from '@/src/components/ui';
import { useProjects, useCurrentWeekPosts, useJobStats } from '@/src/hooks';

function QuickStatsSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading quick stats"
      className="flex flex-col gap-1 justify-center items-center"
    >
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex gap-3 justify-between w-3xs border-b border-cyan-600 pb-1 px-1"
        >
          <Skeleton width="w-28" height="h-5" />
          <Skeleton width="w-6" height="h-5" />
        </div>
      ))}
      <span className="sr-only">Loading quick stats...</span>
    </div>
  );
}

function QuickStats() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: currentWeekPosts, isLoading: postsLoading } = useCurrentWeekPosts();
  const { data: jobStats, isLoading: jobsLoading } = useJobStats();

  const isLoading = projectsLoading || postsLoading || jobsLoading;

  const stats = [
    { label: 'Active Projects', value: projects?.active.length ?? 0 },
    { label: 'Planned Projects', value: projects?.planned.length ?? 0 },
    { label: 'Job Applications', value: jobStats?.total ?? 0 },
    { label: 'LinkedIn Drafts', value: currentWeekPosts?.posts.length ?? 0 },
  ];

  return (
    <Card className="w-fit" aria-labelledby="quick-stats-heading">
      <h2
        id="quick-stats-heading"
        className="text-lg font-bold text-orange-400 text-center"
      >
        Quick Stats
      </h2>

      {isLoading ? (
        <QuickStatsSkeleton />
      ) : (
        <dl className="flex flex-col gap-1 justify-center items-center">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex gap-3 justify-between w-3xs border-b border-cyan-600 pb-1 px-1"
            >
              <dt className="text-cyan-200">{stat.label}:</dt>
              <dd className="font-mono text-cyan-100">{stat.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </Card>
  );
}

export { QuickStats };