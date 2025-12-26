import { NextResponse } from 'next/server';
import { getWorkflowSchedules, getWorkflowScheduleMap } from '@/lib/workflow-parser';

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

async function fetchGitHubWorkflowRuns(): Promise<AutomationRun[]> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn('GITHUB_TOKEN not set - cannot fetch workflow runs');
    return [];
  }

  // Get schedule map dynamically from workflow files
  const workflowSchedules = getWorkflowScheduleMap();

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

  // Build pipelines list dynamically from workflow files
  const workflows = getWorkflowSchedules();
  const pipelines: Pipeline[] = workflows.map((workflow) => ({
    name: workflow.name,
    schedule: workflow.schedule,
    type: workflow.type,
  }));

  return NextResponse.json({
    pipelines,
    runs,
  });
}
