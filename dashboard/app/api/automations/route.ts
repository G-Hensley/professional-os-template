import { readFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

interface AutomationRun {
  name: string;
  type: string;
  timestamp: string;
  status: 'success' | 'error';
  file: string;
  summary?: string;
}

function getLogFiles(subdir: string, type: string): AutomationRun[] {
  try {
    const logsDir = join(process.cwd(), '..', 'logs', subdir);
    if (!existsSync(logsDir)) return [];

    const files = readdirSync(logsDir)
      .filter(f => f.endsWith('.json') || f.endsWith('.md'))
      .map(f => {
        const filePath = join(logsDir, f);
        const stats = statSync(filePath);
        return {
          name: subdir.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          type,
          timestamp: stats.mtime.toISOString(),
          status: 'success' as const,
          file: `logs/${subdir}/${f}`,
        };
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return files.slice(0, 10); // Last 10 runs
  } catch {
    return [];
  }
}

function getLatestContextSnapshot(): AutomationRun | null {
  try {
    const contextPath = join(process.cwd(), '..', 'logs', 'context', 'CONTEXT_SNAPSHOT.md');
    if (!existsSync(contextPath)) return null;

    const stats = statSync(contextPath);
    return {
      name: 'Context Snapshot',
      type: 'daily',
      timestamp: stats.mtime.toISOString(),
      status: 'success',
      file: 'logs/context/CONTEXT_SNAPSHOT.md',
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const runs: AutomationRun[] = [];

  // Context snapshot
  const contextRun = getLatestContextSnapshot();
  if (contextRun) runs.push(contextRun);

  // Weekly summaries
  runs.push(...getLogFiles('weekly-summary', 'weekly'));

  // LinkedIn posts
  runs.push(...getLogFiles('linkedin-posts', 'weekly'));

  // Job monitor
  runs.push(...getLogFiles('job-monitor', 'daily'));

  // Monthly assessments
  runs.push(...getLogFiles('assessments', 'monthly'));

  // Sort all by timestamp
  runs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const pipelines = [
    {
      name: 'Daily Context Snapshot',
      schedule: 'Daily @ 6:00 AM',
      type: 'daily',
    },
    {
      name: 'Weekly Summary',
      schedule: 'Sundays @ 8:00 PM',
      type: 'weekly',
    },
    {
      name: 'LinkedIn Post Generator',
      schedule: 'Sundays @ 9:00 PM',
      type: 'weekly',
    },
    {
      name: 'Job Posting Monitor',
      schedule: 'Daily @ 9:00 AM',
      type: 'daily',
    },
    {
      name: 'Monthly Assessment',
      schedule: '1st of month @ 10:00 AM',
      type: 'monthly',
    },
  ];

  return NextResponse.json({
    pipelines,
    runs: runs.slice(0, 20), // Last 20 runs across all automations
  });
}
