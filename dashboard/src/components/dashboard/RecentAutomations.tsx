'use client';

import { Card } from '../ui/Card';
import { useRecentAutomations } from "@/src/hooks";

function RecentAutomations() {
  const { data: recentAutomations, isLoading, isError } = useRecentAutomations();
  console.log(recentAutomations);

  return (
    <Card>
      <h2 className="text-lg font-bold text-orange-400 text-center">Recent Automations</h2>
      {isLoading ? (
        <p className="text-cyan-200">Loading...</p>
      ) : isError ? (
        <p className="text-red-400">Error loading automations.</p>
      ) : recentAutomations.length === 0 ? (
        <p className="text-cyan-200">No recent automations found.</p>
      ) : (
        <ul className="space-y-2">
          {recentAutomations.map((automation) => (
            <a
              key={automation.url}
              href={automation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg grid grid-cols-[140px_1fr_30px] gap-2 py-2 px-3 items-center hover:bg-cyan-800/30 transition-colors
              duration-200 neumorphic"
            >
              <span className='text-cyan-200 truncate'>{automation.name}</span>
              <span className='text-orange-400 text-left'>{new Date(automation.timestamp).toLocaleString()}</span>
              <span className={`w-2 h-2 rounded-full justify-self-end ${
                automation.status === 'success'
                  ? 'bg-green-400'
                  : automation.status === 'running'
                    ? 'bg-yellow-400 animate-pulse'
                    : 'bg-red-500'
              }`}></span>
            </a>
          ))}
        </ul>
      )}
    </Card>
  );
}

export { RecentAutomations };