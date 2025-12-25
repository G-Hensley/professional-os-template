'use client';

import Link from 'next/link';
import { Card, Skeleton } from '@/src/components/ui';
import { useJobs } from '@/src/hooks';

function JobSearchSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading job search status"
      className="flex flex-col gap-1 justify-center items-center"
    >
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex gap-3 justify-between w-3xs border-b border-cyan-600 pb-1 px-1"
        >
          <Skeleton width="w-24" height="h-5" />
          <Skeleton width="w-6" height="h-5" />
        </div>
      ))}
      <span className="sr-only">Loading job search status...</span>
    </div>
  );
}

function JobSearchStatus() {
  const { data: jobs, isLoading, isError } = useJobs();

  const stats = [
    { label: 'Applications', value: jobs?.applications.length ?? 0 },
    { label: 'Interviews', value: jobs?.interviews.length ?? 0 },
    { label: 'Opportunities', value: jobs?.opportunities.length ?? 0 },
  ];

  return (
    <Card className="w-fit" aria-labelledby="job-search-heading">
      <h2
        id="job-search-heading"
        className="text-lg font-bold text-orange-400 text-center"
      >
        Job Search Status
      </h2>

      {isLoading ? (
        <JobSearchSkeleton />
      ) : isError ? (
        <p role="alert" className="text-red-400">
          Error loading job search status.
        </p>
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

      <Link
        href="/jobs"
        className="neumorphic px-3 py-1 rounded-4xl w-fit mx-auto text-orange-400 text-sm mt-2 font-mono block text-center transition-all duration-300 hover:bg-cyan-900"
        aria-label="View job dashboard"
      >
        View Job Dashboard
      </Link>
    </Card>
  );
}

export { JobSearchStatus };