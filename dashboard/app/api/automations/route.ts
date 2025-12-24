import { NextResponse } from 'next/server';

const GITHUB_OWNER = 'G-Hensley';
const GITHUB_REPO = 'myself';

interface GitHubWorkflowRun {
  id: number;
  name: string;
  status: string;
  conclusion: string | null;
  created_at: string;
  html_url: string;
}

interface GitHubApiResponse {
  workflow_runs: GitHubWorkflowRun[];
}

interface AutomationRun {
  name: string;
  type: string;
  timestamp: string;
  status: 'success' | 'error' | 'running';
  url: string;
}

interface Pipeline {
  name: string;
  schedule: string;
  type: string;
}

// Map workflow names to their schedule info
const workflowSchedules: Record<string, { schedule: string; type: string }> = {
  'Context Snapshot': { schedule: 'Daily @ 5:00 AM', type: 'daily' },
  'GitHub Activity Logging': { schedule: 'Daily @ 6:00 AM', type: 'daily' },
  'Daily Date Update': { schedule: 'Daily @ 12:30 AM', type: 'daily' },
  'Project Status Automation': { schedule: 'Daily @ 7:00 AM', type: 'daily' },
  'Job Posting Monitor': { schedule: 'Daily @ 9:00 AM', type: 'daily' },
  'LinkedIn Post Generator': { schedule: 'Sundays @ 8:00 AM', type: 'weekly' },
  'Weekly Summary': { schedule: 'Sundays @ 8:00 PM', type: 'weekly' },
  'Skill Analysis': { schedule: 'Saturdays @ 10:00 AM', type: 'weekly' },
  'Monthly Assessment': { schedule: '1st of month @ 10:00 AM', type: 'monthly' },
};

async function fetchGitHubWorkflowRuns(): Promise<AutomationRun[]> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn('GITHUB_TOKEN not set - cannot fetch workflow runs');
    return [];
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/runs?per_page=20`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    );

    if (!response.ok) {
      console.error('GitHub API error:', response.status, response.statusText);
      return [];
    }

    const data: GitHubApiResponse = await response.json();

    return data.workflow_runs.map((run) => ({
      name: run.name,
      type: workflowSchedules[run.name]?.type ?? 'daily',
      timestamp: run.created_at,
      status: run.status === 'in_progress' || run.status === 'queued'
        ? 'running'
        : run.conclusion === 'success'
          ? 'success'
          : 'error',
      url: run.html_url,
    }));
  } catch (error) {
    console.error('Failed to fetch GitHub workflow runs:', error);
    return [];
  }
}

export async function GET() {
  const runs = await fetchGitHubWorkflowRuns();

  // Build pipelines list from known workflows
  const pipelines: Pipeline[] = Object.entries(workflowSchedules).map(
    ([name, info]) => ({
      name,
      schedule: info.schedule,
      type: info.type,
    })
  );

  return NextResponse.json({
    pipelines,
    runs,
  });
}
