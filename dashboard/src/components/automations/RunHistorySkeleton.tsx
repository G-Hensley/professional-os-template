'use client';

import { Skeleton } from '@/src/components/ui';

function RunHistorySkeleton() {
  return (
    <div role="status" aria-label="Loading run history" className="space-y-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-4 py-3">
          <Skeleton width="w-16" height="h-4" />
          <Skeleton width="w-12" height="h-4" />
          <Skeleton width="w-40" height="h-5" />
          <Skeleton width="w-20" height="h-4" />
          <Skeleton width="w-16" height="h-4" />
        </div>
      ))}
      <span className="sr-only">Loading run history...</span>
    </div>
  );
}

export { RunHistorySkeleton };
