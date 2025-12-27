'use client';

import { useState } from 'react';
import { Card } from '@/src/components/ui';
import { useWeeklyPosts } from '@/src/hooks';
import { WeekSelector } from './WeekSelector';
import { PostDraft } from './PostDraft';
import { PostListSkeleton } from './PostListSkeleton';

function PostList() {
  const { data: weeklyPosts, isLoading } = useWeeklyPosts();
  const [weekIndex, setWeekIndex] = useState(0);

  const currentWeek = weeklyPosts[weekIndex] ?? null;
  const hasPrevious = weekIndex < weeklyPosts.length - 1;
  const hasNext = weekIndex > 0;

  const handlePrevious = () => {
    if (hasPrevious) {
      setWeekIndex((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setWeekIndex((prev) => prev - 1);
    }
  };

  return (
    <section aria-labelledby="content-heading">
      <Card className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 id="content-heading" className="text-lg font-bold text-orange-400">
            LinkedIn Drafts
          </h2>
          {!isLoading && weeklyPosts.length > 0 && (
            <WeekSelector
              currentWeekStart={currentWeek?.weekStart ?? ''}
              currentWeekEnd={currentWeek?.weekEnd ?? ''}
              onPrevious={handlePrevious}
              onNext={handleNext}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
            />
          )}
        </div>

        {isLoading ? (
          <PostListSkeleton />
        ) : !currentWeek || currentWeek.posts.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No posts generated for this week. Run the LinkedIn Post Generator automation to create drafts.
          </p>
        ) : (
          <div className="space-y-4">
            {currentWeek.posts.map((post, index) => (
              <PostDraft key={`${currentWeek.weekStart}-${post.day}-${post.theme}-${index}`} post={post} />
            ))}
          </div>
        )}

        {currentWeek?.generatedAt && (
          <p className="text-xs text-gray-500 mt-4">
            Generated: {new Date(currentWeek.generatedAt).toLocaleString()}
          </p>
        )}
      </Card>
    </section>
  );
}

export { PostList };
