import { readdirSync, existsSync, statSync } from 'fs';
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

function getLogFiles(
  subdir: string,
  displayName: string,
  type: 'daily' | 'weekly' | 'monthly'
): AutomationRun[] {
  try {
    const logsDir = join(process.cwd(), '..', 'logs', subdir);
    if (!existsSync(logsDir)) return [];

    const files = readdirSync(logsDir)
      .filter(f => f.endsWith('.json') && !f.includes('README'))
      .map(f => {
        const filePath = join(logsDir, f);
        const stats = statSync(filePath);
        return {
          name: displayName,
          type,
          timestamp: stats.mtime.toISOString(),
          status: 'success' as const,
          file: `logs/${subdir}/${f}`,
          filename: f,
        };
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Return only the most recent file per automation type (avoid duplicates like latest.json)
    return files.slice(0, 1);
  } catch {
    return [];
  }
}

function getContextSnapshots(): AutomationRun[] {
  try {
    const contextDir = join(process.cwd(), '..', 'logs', 'context');
    if (!existsSync(contextDir)) return [];

    const files = readdirSync(contextDir)
      // Only get date-based files (YYYY-MM-DD.json), exclude latest.json and compact
      .filter(f => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
      .map(f => {
        const filePath = join(contextDir, f);
        const stats = statSync(filePath);
        return {
          name: 'Context Snapshot',
          type: 'daily',
          timestamp: stats.mtime.toISOString(),
          status: 'success' as const,
          file: `logs/context/${f}`,
        };
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return files.slice(0, 5); // Last 5 context snapshots
  } catch {
    return [];
  }
}

export async function GET() {
  const runs: AutomationRun[] = [];

  // Context snapshots (daily)
  runs.push(...getContextSnapshots());

  // GitHub activity (daily/monthly)
  runs.push(...getLogFiles('github-activity', 'GitHub Activity', 'daily'));

  // Project status
  runs.push(...getLogFiles('project-status', 'Project Status', 'daily'));

  // Skill analysis
  runs.push(...getLogFiles('skill-analysis', 'Skill Analysis', 'weekly'));

  // Sort all by timestamp
  runs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const pipelines = [
    {
      name: 'Daily Context Snapshot',
      schedule: 'Daily @ 6:00 AM',
      type: 'daily',
    },
    {
      name: 'GitHub Activity',
      schedule: 'Daily',
      type: 'daily',
    },
    {
      name: 'Project Status',
      schedule: 'On demand',
      type: 'daily',
    },
    {
      name: 'Skill Analysis',
      schedule: 'Weekly',
      type: 'weekly',
    },
  ];

  return NextResponse.json({
    pipelines,
    runs: runs.slice(0, 20), // Last 20 runs across all automations
  });
}
