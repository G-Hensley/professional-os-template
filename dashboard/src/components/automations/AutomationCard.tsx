'use client';

import { Card } from '@/src/components/ui';
import { Clock, History, Play } from 'lucide-react';

interface Pipeline {
  name: string;
  schedule: string;
  type: string;
}

interface AutomationRun {
  name: string;
  type: string;
  timestamp: string;
  status: 'success' | 'error' | 'running';
  url: string;
}

function getStatusIcon(status: AutomationRun['status']): string {
  switch (status) {
    case 'success':
      return '✓';
    case 'error':
      return '✗';
    case 'running':
      return '⟳';
    default:
      return '○';
  }
}

function getStatusColor(status: AutomationRun['status']): string {
  switch (status) {
    case 'success':
      return 'text-green-400';
    case 'error':
      return 'text-red-400';
    case 'running':
      return 'text-yellow-400';
    default:
      return 'text-gray-400';
  }
}

function formatLastRun(
  runs: AutomationRun[],
  pipelineName: string
): { label: string; status: AutomationRun['status'] } | null {
  const matchingRuns = runs.filter((run) => run.name === pipelineName);
  if (matchingRuns.length === 0) return null;

  const lastRun = matchingRuns.reduce((latest, run) => {
    return new Date(run.timestamp).getTime() > new Date(latest.timestamp).getTime()
      ? run
      : latest;
  }, matchingRuns[0]);

  const date = new Date(lastRun.timestamp);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  let label: string;
  if (diffDays === 0) {
    label = 'Today';
  } else if (diffDays === 1) {
    label = 'Yesterday';
  } else {
    label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  return { label, status: lastRun.status };
}

interface AutomationCardProps {
  pipeline: Pipeline;
  runs: AutomationRun[];
  onViewLatest?: () => void;
  onViewHistory?: () => void;
}

function AutomationCard({ pipeline, runs, onViewLatest, onViewHistory }: AutomationCardProps) {
  const lastRun = formatLastRun(runs, pipeline.name);

  return (
    <Card className="w-full" aria-labelledby={`pipeline-${pipeline.name.replace(/\s+/g, '-')}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3
            id={`pipeline-${pipeline.name.replace(/\s+/g, '-')}`}
            className="text-cyan-200 font-medium"
          >
            {pipeline.name}
          </h3>
          <p className="text-sm text-muted flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-cyan-300/70" aria-hidden="true" />
            Runs: {pipeline.schedule}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {lastRun && (
            <p className={`text-sm ${getStatusColor(lastRun.status)}`}>
              Last Run: {getStatusIcon(lastRun.status)} {lastRun.label}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-2 mt-1">
        {onViewLatest && (
          <button
            onClick={onViewLatest}
            className="btn-secondary text-xs"
            aria-label={`View latest run for ${pipeline.name}`}
          >
            <Play className="h-3.5 w-3.5" aria-hidden="true" />
            View Latest
          </button>
        )}
        {onViewHistory && (
          <button
            onClick={onViewHistory}
            className="btn-secondary text-xs"
            aria-label={`View run history for ${pipeline.name}`}
          >
            <History className="h-3.5 w-3.5" aria-hidden="true" />
            View History
          </button>
        )}
      </div>
    </Card>
  );
}

export { AutomationCard };
export type { Pipeline, AutomationRun };
