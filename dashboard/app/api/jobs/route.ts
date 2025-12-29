import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';
import { repoPath } from '@/lib/repo-path';

// TODO: Phase 2 (Hosted Dashboard - April 2026)
// - Add Supabase auth with GitHub OAuth to get user's access token
// - Store user's connected repo in Supabase (users table: github_repo, access_token)
// - Fetch job-applications/*.json and logs/job-monitor/ from user's GitHub repo
// - Switch between local/GitHub based on NEXT_PUBLIC_DATA_SOURCE env var
// - Add caching layer to avoid GitHub API rate limits

function readJSON(relativePath: string) {
  try {
    const fullPath = repoPath(relativePath);
    return JSON.parse(readFileSync(fullPath, 'utf-8'));
  } catch {
    return null;
  }
}

function getLatestJobMonitorResults() {
  try {
    const logsDir = repoPath('logs', 'job-monitor');
    if (!existsSync(logsDir)) return null;

    const files = readdirSync(logsDir)
      .filter(f => f.endsWith('.json'))
      .sort()
      .reverse();

    if (files.length === 0) return null;

    const latestFile = join(logsDir, files[0]);
    return JSON.parse(readFileSync(latestFile, 'utf-8'));
  } catch {
    return null;
  }
}

export async function GET() {
  const applicationsFile = readJSON('job-applications/applications.json') || {};
  const interviewsFile = readJSON('job-applications/interviews.json') || {};
  const monitorResults = getLatestJobMonitorResults();

  const applications = (applicationsFile.applications || []).filter(
    (app: { id?: string; company?: string }) => app.id && app.company
  );
  const interviews = (interviewsFile.interviews || []).filter(
    (interview: { id?: string; company?: string }) => interview.id && interview.company
  );

  return NextResponse.json({
    applications,
    interviews,
    opportunities: monitorResults?.jobs || [],
    lastMonitorRun: monitorResults?.generated_at || null,
  });
}
