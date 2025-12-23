import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

function readJSON(relativePath: string) {
  try {
    const fullPath = join(process.cwd(), '..', relativePath);
    return JSON.parse(readFileSync(fullPath, 'utf-8'));
  } catch {
    return null;
  }
}

function getLatestJobMonitorResults() {
  try {
    const logsDir = join(process.cwd(), '..', 'logs', 'job-monitor');
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
