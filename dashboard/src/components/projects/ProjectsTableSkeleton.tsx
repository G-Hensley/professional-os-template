'use client';

import { Skeleton } from '@/src/components/ui';

function ProjectsTableSkeleton() {
  return (
    <div role="status" aria-label="Loading projects" className="space-y-4">
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} width="w-20" height="h-8" />
        ))}
      </div>
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4 py-3">
            <Skeleton width="w-40" height="h-5" />
            <Skeleton width="w-24" height="h-5" />
            <Skeleton width="w-16" height="h-5" />
            <Skeleton width="w-32" height="h-5" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading projects...</span>
    </div>
  );
}

export { ProjectsTableSkeleton };
