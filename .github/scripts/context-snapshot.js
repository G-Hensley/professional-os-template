/**
 * Context Snapshot Generator
 *
 * Generates a comprehensive snapshot of the repository state for AI context.
 * Run daily or on-demand before AI sessions to reduce token usage.
 *
 * Usage:
 *   node .github/scripts/context-snapshot.js
 *   DRY_RUN=true node .github/scripts/context-snapshot.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DRY_RUN = process.env.DRY_RUN === 'true';
const REPO_ROOT = process.env.GITHUB_WORKSPACE || path.resolve(__dirname, '../..');

// Helper to read JSON file safely
function readJSON(filePath) {
  try {
    const fullPath = path.join(REPO_ROOT, filePath);
    if (fs.existsSync(fullPath)) {
      return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    }
  } catch (e) {
    console.error(`Error reading ${filePath}:`, e.message);
  }
  return null;
}

// Helper to get file modification time
function getModTime(filePath) {
  try {
    const fullPath = path.join(REPO_ROOT, filePath);
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      return stats.mtime.toISOString().split('T')[0];
    }
  } catch (e) {
    // Ignore
  }
  return null;
}

// Get folder structure (depth-limited tree)
function getFolderStructure(maxDepth = 2) {
  const structure = {};

  function walkDir(dir, depth, obj) {
    if (depth > maxDepth) return;

    try {
      const items = fs.readdirSync(path.join(REPO_ROOT, dir));

      for (const item of items) {
        // Skip hidden files (except .github, .claude, .gemini, .codex)
        if (item.startsWith('.') &&
            !['github', 'claude', 'gemini', 'codex'].includes(item.replace('.', ''))) {
          continue;
        }

        // Skip node_modules, dist, etc.
        if (['node_modules', 'dist', '.git', 'coverage'].includes(item)) {
          continue;
        }

        const itemPath = path.join(dir, item);
        const fullPath = path.join(REPO_ROOT, itemPath);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
          obj[item] = {};
          walkDir(itemPath, depth + 1, obj[item]);
        } else if (depth < maxDepth) {
          obj[item] = 'file';
        }
      }
    } catch (e) {
      // Directory not accessible
    }
  }

  walkDir('', 0, structure);
  return structure;
}

// Count skills by level
function getSkillsSummary(skills) {
  if (!skills) return null;

  const levels = { master: 0, expert: 0, adept: 0, apprentice: 0, novice: 0, none: 0 };
  const categories = {};

  for (const [category, skillSet] of Object.entries(skills)) {
    if (category === 'skill levels') continue;

    categories[category] = { total: 0, byLevel: {} };

    for (const [skill, level] of Object.entries(skillSet)) {
      if (levels.hasOwnProperty(level)) {
        levels[level]++;
        categories[category].total++;
        categories[category].byLevel[level] = (categories[category].byLevel[level] || 0) + 1;
      }
    }
  }

  return { totals: levels, byCategory: categories };
}

// Get project summary
function getProjectsSummary() {
  const active = readJSON('projects/active.json') || {};
  const planned = readJSON('projects/planned.json') || {};
  const completed = readJSON('projects/completed.json') || {};

  const summary = {
    counts: {
      active: Object.keys(active).length,
      planned: Object.keys(planned).length,
      completed: Object.keys(completed).length
    },
    active: [],
    planned: [],
    completed: []
  };

  // Active projects
  for (const [key, proj] of Object.entries(active)) {
    summary.active.push({
      name: proj.name,
      type: proj.type,
      priority: proj.priority,
      status: proj.status,
      tagline: proj.tagline,
      technologies: proj.technologies?.slice(0, 5), // First 5 techs
      due_date: proj.due_date
    });
  }

  // Planned projects
  for (const [key, proj] of Object.entries(planned)) {
    summary.planned.push({
      name: proj.name,
      type: proj.type,
      priority: proj.priority,
      status: proj.status,
      blocked_by: proj.blocked_by,
      tagline: proj.tagline
    });
  }

  // Completed projects
  for (const [key, proj] of Object.entries(completed)) {
    summary.completed.push({
      name: proj.name,
      type: proj.type
    });
  }

  // Sort active by priority
  summary.active.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  summary.planned.sort((a, b) => (b.priority || 0) - (a.priority || 0));

  return summary;
}

// Get automation status
function getAutomationStatus() {
  const workflows = [];
  const workflowDir = path.join(REPO_ROOT, '.github/workflows');

  if (fs.existsSync(workflowDir)) {
    const files = fs.readdirSync(workflowDir).filter(f => f.endsWith('.yml'));

    for (const file of files) {
      try {
        const content = fs.readFileSync(path.join(workflowDir, file), 'utf-8');

        // Extract name
        const nameMatch = content.match(/^name:\s*(.+)$/m);
        const name = nameMatch ? nameMatch[1].trim() : file.replace('.yml', '');

        // Extract schedule
        const cronMatch = content.match(/cron:\s*['"](.+)['"]/);
        const schedule = cronMatch ? cronMatch[1] : null;

        // Check if it has workflow_dispatch
        const hasManualTrigger = content.includes('workflow_dispatch');

        workflows.push({
          file,
          name,
          schedule,
          manual_trigger: hasManualTrigger
        });
      } catch (e) {
        console.error(`Error parsing ${file}:`, e.message);
      }
    }
  }

  return workflows;
}

// Get recent activity from logs
function getRecentActivity() {
  const activity = {
    github: null,
    skill_analysis: null,
    project_status: null
  };

  // Most recent GitHub activity log
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthStr = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;

  let githubLog = readJSON(`logs/github-activity/${currentMonth}.json`);
  if (!githubLog) {
    githubLog = readJSON(`logs/github-activity/${lastMonthStr}.json`);
  }

  if (githubLog) {
    // Get last 7 days of activity
    const entries = Object.entries(githubLog).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 7);
    activity.github = {
      days_with_data: entries.length,
      recent_commits: entries.reduce((sum, [_, data]) => sum + (data.commits?.length || 0), 0),
      recent_prs: entries.reduce((sum, [_, data]) => sum + (data.pull_requests?.length || 0), 0)
    };
  }

  // Skill analysis
  const skillAnalysis = readJSON('logs/skill-analysis/latest-analysis.json');
  if (skillAnalysis) {
    activity.skill_analysis = {
      date: skillAnalysis.generated_at,
      repos_analyzed: skillAnalysis.repos_analyzed,
      detected_skills_count: Object.keys(skillAnalysis.detected_skills || {}).length
    };
  }

  // Project status
  const projectStatus = readJSON('logs/project-status/latest-status.json');
  if (projectStatus) {
    activity.project_status = {
      date: projectStatus.generated_at,
      stale_projects: projectStatus.stale_projects?.length || 0,
      completion_candidates: projectStatus.completion_candidates?.length || 0
    };
  }

  return activity;
}

// Get key file modification dates
function getKeyFilesDates() {
  const keyFiles = [
    'profile/skills.json',
    'profile/experience.json',
    'profile/resume.md',
    'projects/active.json',
    'projects/planned.json',
    'business/BUSINESS_GOALS.md',
    'job-applications/JOB_SEARCH.md',
    'job-applications/applications.json',
    'linkedin/content-ideas.json',
    'REPO_TODO.md'
  ];

  const dates = {};
  for (const file of keyFiles) {
    const mod = getModTime(file);
    if (mod) {
      dates[file] = mod;
    }
  }

  return dates;
}

// Get business summary
function getBusinessSummary() {
  const codaissance = readJSON('business/codaissance/strategy.json');
  const tampertantrum = readJSON('business/tampertantrum-labs/strategy.json');

  return {
    codaissance: codaissance ? {
      tagline: codaissance.tagline,
      products: codaissance.products?.length || 0
    } : null,
    tampertantrum: tampertantrum ? {
      tagline: tampertantrum.tagline,
      services: tampertantrum.services?.length || 0
    } : null
  };
}

// Main function
async function main() {
  console.log('Generating context snapshot...');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);

  const skills = readJSON('profile/skills.json');

  const snapshot = {
    generated_at: new Date().toISOString(),
    version: '1.0',

    // High-level summary
    summary: {
      owner: 'Gavin Hensley',
      role: 'Full-Stack Software Engineer',
      primary_stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Supabase'],
      businesses: ['Codaissance (SaaS products)', 'TamperTantrum Labs (AppSec consulting)']
    },

    // Project counts and list
    projects: getProjectsSummary(),

    // Skills by level
    skills: getSkillsSummary(skills),

    // Automation pipelines
    automations: getAutomationStatus(),

    // Recent automation output
    recent_activity: getRecentActivity(),

    // Business summary
    businesses: getBusinessSummary(),

    // Key file modification dates
    key_files_modified: getKeyFilesDates(),

    // Folder structure (2 levels deep)
    folder_structure: getFolderStructure(2)
  };

  console.log('\n=== Context Snapshot Summary ===');
  console.log(`Projects: ${snapshot.projects.counts.active} active, ${snapshot.projects.counts.planned} planned, ${snapshot.projects.counts.completed} completed`);
  console.log(`Skills: ${snapshot.skills?.totals ? Object.entries(snapshot.skills.totals).filter(([k, v]) => v > 0).map(([k, v]) => `${v} ${k}`).join(', ') : 'N/A'}`);
  console.log(`Automations: ${snapshot.automations.length} workflows`);

  if (snapshot.recent_activity.github) {
    console.log(`Recent GitHub: ${snapshot.recent_activity.github.recent_commits} commits in last 7 days`);
  }

  if (DRY_RUN) {
    console.log('\n[DRY RUN] Would write snapshot to logs/context-snapshot.json');
    console.log('\nSnapshot preview:');
    console.log(JSON.stringify(snapshot, null, 2));
  } else {
    // Ensure logs directory exists
    const logsDir = path.join(REPO_ROOT, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    // Write snapshot
    const outputPath = path.join(logsDir, 'context-snapshot.json');
    fs.writeFileSync(outputPath, JSON.stringify(snapshot, null, 2));
    console.log(`\nSnapshot written to ${outputPath}`);

    // Also write a compact version for minimal context
    const compact = {
      generated_at: snapshot.generated_at,
      projects: {
        active: snapshot.projects.active.map(p => `${p.name} (${p.type})`),
        planned_count: snapshot.projects.counts.planned,
        completed_count: snapshot.projects.counts.completed
      },
      skills_summary: snapshot.skills?.totals,
      automations: snapshot.automations.map(a => a.name),
      key_files_modified: snapshot.key_files_modified
    };

    const compactPath = path.join(logsDir, 'context-snapshot-compact.json');
    fs.writeFileSync(compactPath, JSON.stringify(compact, null, 2));
    console.log(`Compact snapshot written to ${compactPath}`);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
