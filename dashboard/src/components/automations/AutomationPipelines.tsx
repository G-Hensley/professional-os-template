'use client';

import { Card, Skeleton } from '@/src/components/ui';
import { usePipelines, useAutomationRuns } from '@/src/hooks';
import { AutomationCard } from './AutomationCard';

function AutomationPipelinesSkeleton() {
  return (
    <div role="status" aria-label="Loading pipelines" className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-4 bg-slate-800 rounded-lg space-y-3">
          <div className="flex justify-between">
            <Skeleton width="w-48" height="h-5" />
            <Skeleton width="w-24" height="h-5" />
          </div>
          <Skeleton width="w-32" height="h-4" />
          <div className="flex gap-2">
            <Skeleton width="w-20" height="h-6" />
            <Skeleton width="w-24" height="h-6" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading automation pipelines...</span>
    </div>
  );
}

interface AutomationPipelinesProps {
  onViewHistory?: (pipelineName: string) => void;
}

function AutomationPipelines({ onViewHistory }: AutomationPipelinesProps) {
  const { data: pipelines, isLoading: pipelinesLoading } = usePipelines();
  const { data: runs, isLoading: runsLoading } = useAutomationRuns();

  const isLoading = pipelinesLoading || runsLoading;

  const handleViewLatest = (pipelineName: string) => {
    const latestRun = runs.find((run) => run.name === pipelineName);
    if (latestRun?.url) {
      window.open(latestRun.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section aria-labelledby="pipelines-heading">
      <Card className="w-full">
        <h2 id="pipelines-heading" className="text-lg font-bold text-orange-400 mb-4">
          Automation Pipelines
        </h2>

        {isLoading ? (
          <AutomationPipelinesSkeleton />
        ) : pipelines.length === 0 ? (
          <p className="text-gray-400 text-sm">No automation pipelines configured.</p>
        ) : (
          <div className="space-y-4">
            {pipelines.map((pipeline) => (
              <AutomationCard
                key={pipeline.name}
                pipeline={pipeline}
                runs={runs}
                onViewLatest={() => handleViewLatest(pipeline.name)}
                onViewHistory={onViewHistory ? () => onViewHistory(pipeline.name) : undefined}
              />
            ))}
          </div>
        )}
      </Card>
    </section>
  );
}

export { AutomationPipelines };
