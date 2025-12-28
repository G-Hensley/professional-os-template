'use client';

import { Skeleton } from '@/src/components/ui';

function PostListSkeleton() {
  return (
    <div role="status" aria-label="Loading posts" className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 surface-3 rounded-lg space-y-3">
          <Skeleton width="w-48" height="h-5" />
          <div className="space-y-2">
            <Skeleton width="w-full" height="h-4" />
            <Skeleton width="w-full" height="h-4" />
            <Skeleton width="w-3/4" height="h-4" />
          </div>
          <Skeleton width="w-64" height="h-4" />
          <div className="flex gap-2 pt-3">
            <Skeleton width="w-20" height="h-6" />
            <Skeleton width="w-28" height="h-6" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading posts...</span>
    </div>
  );
}

export { PostListSkeleton };
