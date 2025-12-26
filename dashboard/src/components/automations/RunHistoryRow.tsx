'use client';

import type { AutomationRun } from './AutomationCard';

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

function formatTimestamp(timestamp: string): { date: string; time: string } {
  const d = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));

  let date: string;
  if (diffDays === 0) {
    date = 'Today';
  } else if (diffDays === 1) {
    date = 'Yesterday';
  } else {
    date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return { date, time };
}

interface RunHistoryRowProps {
  run: AutomationRun;
}

function RunHistoryRow({ run }: RunHistoryRowProps) {
  const { date, time } = formatTimestamp(run.timestamp);

  return (
    <tr className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
      <td className="py-3 pr-4 text-gray-400 text-sm">
        {date}
      </td>
      <td className="py-3 pr-4 text-gray-400 text-sm">
        {time}
      </td>
      <td className="py-3 pr-4 text-cyan-200 font-medium">
        {run.name}
      </td>
      <td className={`py-3 pr-4 ${getStatusColor(run.status)}`}>
        {getStatusIcon(run.status)} {run.status}
      </td>
      <td className="py-3">
        <a
          href={run.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-cyan-400 hover:text-cyan-300 underline"
          aria-label={`View log for ${run.name} run on ${date}`}
        >
          View Log
        </a>
      </td>
    </tr>
  );
}

export { RunHistoryRow };
