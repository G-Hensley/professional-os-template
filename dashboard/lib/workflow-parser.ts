import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { repoPath } from './repo-path';

interface WorkflowInfo {
  name: string;
  filename: string;
  cron: string | null;
  schedule: string;
  type: 'daily' | 'weekly' | 'monthly';
}

/**
 * Parse a cron expression into a human-readable schedule.
 * GitHub Actions uses standard cron: minute hour day month weekday
 */
function cronToHuman(cron: string): { schedule: string; type: 'daily' | 'weekly' | 'monthly' } {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) {
    return { schedule: cron, type: 'daily' };
  }

  const [minute, hour, dayOfMonth, , dayOfWeek] = parts;

  // Convert hour to 12-hour format with AM/PM
  const hourNum = parseInt(hour, 10);
  const hour12 = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
  const ampm = hourNum >= 12 ? 'PM' : 'AM';
  const timeStr = `${hour12}:${minute.padStart(2, '0')} ${ampm} UTC`;

  // Monthly: runs on specific day of month
  if (dayOfMonth !== '*') {
    const daySuffix = dayOfMonth === '1' ? 'st' : dayOfMonth === '2' ? 'nd' : dayOfMonth === '3' ? 'rd' : 'th';
    return { schedule: `${dayOfMonth}${daySuffix} of month @ ${timeStr}`, type: 'monthly' };
  }

  // Weekly: runs on specific day of week
  if (dayOfWeek !== '*') {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = days[parseInt(dayOfWeek, 10)] || dayOfWeek;
    return { schedule: `${dayName} @ ${timeStr}`, type: 'weekly' };
  }

  // Daily: runs every day
  return { schedule: `Daily @ ${timeStr}`, type: 'daily' };
}

/**
 * Parse a single workflow YAML file to extract name and schedule.
 */
function parseWorkflowFile(filepath: string): WorkflowInfo | null {
  try {
    const content = readFileSync(filepath, 'utf8');

    // Extract workflow name (first 'name:' at root level)
    const nameMatch = content.match(/^name:\s*(.+)$/m);
    const name = nameMatch ? nameMatch[1].trim() : null;

    if (!name) return null;

    // Extract cron schedule
    const cronMatch = content.match(/cron:\s*['"]?([^'"}\n]+)['"]?/);
    const cron = cronMatch ? cronMatch[1].trim() : null;

    const filename = filepath.split('/').pop() || '';

    if (!cron) {
      return {
        name,
        filename,
        cron: null,
        schedule: 'Manual only',
        type: 'daily',
      };
    }

    const { schedule, type } = cronToHuman(cron);

    return {
      name,
      filename,
      cron,
      schedule,
      type,
    };
  } catch {
    return null;
  }
}

/**
 * Get all workflow schedules from the .github/workflows directory.
 */
export function getWorkflowSchedules(): WorkflowInfo[] {
  const workflowsDir = repoPath('.github', 'workflows');

  try {
    const files = readdirSync(workflowsDir).filter(
      (f) => f.endsWith('.yml') || f.endsWith('.yaml')
    );

    const workflows: WorkflowInfo[] = [];

    for (const file of files) {
      const info = parseWorkflowFile(join(workflowsDir, file));
      if (info) {
        workflows.push(info);
      }
    }

    // Sort: daily first, then weekly, then monthly
    const typeOrder = { daily: 0, weekly: 1, monthly: 2 };
    workflows.sort((a, b) => typeOrder[a.type] - typeOrder[b.type]);

    return workflows;
  } catch (error) {
    console.error('Failed to read workflow files:', error);
    return [];
  }
}

/**
 * Get a map of workflow names to their schedule info.
 * Used for matching GitHub API workflow runs to schedules.
 */
export function getWorkflowScheduleMap(): Record<string, { schedule: string; type: string }> {
  const workflows = getWorkflowSchedules();
  const map: Record<string, { schedule: string; type: string }> = {};

  for (const workflow of workflows) {
    map[workflow.name] = {
      schedule: workflow.schedule,
      type: workflow.type,
    };
  }

  return map;
}
