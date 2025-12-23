'use client';

import { Card } from '../ui/Card';
import { useRecentAutomations, useAutomations } from "@/src/hooks";

function RecentAutomations() {
  const { data: recentAutomations, isLoading, isError } = useRecentAutomations();
  const { data: allAutomations } = useAutomations();
  console.log(allAutomations);
  console.log(recentAutomations);

  return (
    <Card>
      <h2 className="text-lg font-bold mb-4 text-orange-400">Recent Automations</h2>
      {isLoading ? (
        <p className="text-cyan-200">Loading...</p>
      ) : isError ? (
        <p className="text-red-400">Error loading automations.</p>
      ) : recentAutomations.length === 0 ? (
        <p className="text-cyan-200">No recent automations found.</p>
      ) : (
        <ul className="space-y-2">
          {recentAutomations.map((automation) => (
            <li key={automation.timestamp} className="p-2 border border-cyan-800 rounded">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-cyan-100">{automation.name}</p>
                  <p className="text-sm text-cyan-300">{new Date(automation.timestamp).toLocaleString()}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    automation.status === 'success' ? 'bg-green-600 text-green-100' : 'bg-red-600 text-red-100'
                  }`}
                >
                  {automation.status}
                </span>
              </div>
              {automation.summary && (
                <p className="mt-1 text-sm text-cyan-200">{automation.summary}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

export { RecentAutomations };