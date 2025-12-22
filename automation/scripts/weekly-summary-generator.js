#!/usr/bin/env node

/**
 * Weekly Summary Generator
 *
 * Creates a GitHub Issue summarizing:
 * 1. What automations accomplished this week
 * 2. Actionable todos for things that require manual input
 *
 * Usage:
 *   node automation/scripts/weekly-summary-generator.js
 *
 * Environment:
 *   DRY_RUN=true       - Preview without creating issue
 *   GITHUB_TOKEN       - Required for creating issues (from GitHub Actions)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO_ROOT = path.resolve(__dirname, '../..');
const DRY_RUN = process.env.DRY_RUN === 'true';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'G-Hensley';
const REPO_NAME = 'myself';

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function readJSON(relativePath) {
  const fullPath = path.join(REPO_ROOT, relativePath);
  try {
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(REPO_ROOT, relativePath));
}

function getWeekRange() {
  const now = new Date();
  const dayOfWeek = now.getDay();

  // Get last Monday (start of reporting week)
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  monday.setHours(0, 0, 0, 0);

  // Get Sunday (end of reporting week / today)
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    start: monday.toISOString().slice(0, 10),
    end: sunday.toISOString().slice(0, 10),
    formatted: `${monday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${sunday.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
  };
}

function getFilesModifiedThisWeek(dir, weekStart) {
  const files = [];
  try {
    const entries = fs.readdirSync(path.join(REPO_ROOT, dir), { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile()) {
        const filePath = path.join(REPO_ROOT, dir, entry.name);
        const stats = fs.statSync(filePath);
        const mtime = stats.mtime.toISOString().slice(0, 10);
        if (mtime >= weekStart) {
          files.push({ name: entry.name, modified: mtime });
        }
      }
    }
  } catch (e) {
    // Directory doesn't exist
  }
  return files;
}

// ============================================================
// AUTOMATION REPORTING
// ============================================================

function getGitHubActivityReport(weekRange) {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const activity = readJSON(`logs/github-activity/${currentMonth}.json`);

  if (!activity || !activity.entries) {
    return { commits: 0, repos: [], prs: 0, issues: 0 };
  }

  // Filter entries for this week
  const weekEntries = activity.entries.filter(e => {
    const entryDate = e.date || e.fetched_at?.slice(0, 10);
    return entryDate >= weekRange.start && entryDate <= weekRange.end;
  });

  let totalCommits = 0;
  let prs = 0;
  let issues = 0;
  const repoSet = new Set();

  for (const entry of weekEntries) {
    if (entry.summary) {
      totalCommits += entry.summary.total_commits || 0;
      prs += (entry.summary.pull_requests_created || 0) + (entry.summary.pull_requests_merged || 0);
      issues += (entry.summary.issues_created || 0) + (entry.summary.issues_closed || 0);
    }
    if (entry.commits) {
      for (const commit of entry.commits) {
        repoSet.add(commit.repository?.replace('G-Hensley/', '') || 'unknown');
      }
    }
  }

  return {
    commits: totalCommits,
    repos: Array.from(repoSet),
    prs,
    issues
  };
}

function getSkillAnalysisReport() {
  const analysis = readJSON('logs/skill-analysis/latest-analysis.json');
  if (!analysis) {
    return null;
  }

  return {
    detected: analysis.skills_detected || 0,
    manual: analysis.manual_only_count || 0,
    decayWarnings: (analysis.skill_decay_warnings || []).length,
    suggestions: (analysis.suggestions || []).length,
    generatedAt: analysis.generated_at
  };
}

function getProjectStatusReport() {
  const active = readJSON('projects/active.json') || {};
  const planned = readJSON('projects/planned.json') || {};
  const completed = readJSON('projects/completed.json') || {};

  // Check for stale projects (no recent activity)
  const staleProjects = [];
  const now = new Date();

  for (const [key, project] of Object.entries(active)) {
    if (project.last_commit_date) {
      const lastCommit = new Date(project.last_commit_date);
      const daysSinceCommit = Math.floor((now - lastCommit) / (1000 * 60 * 60 * 24));
      if (daysSinceCommit > 14) {
        staleProjects.push({ name: project.name || key, days: daysSinceCommit });
      }
    }
  }

  return {
    activeCounts: Object.keys(active).length,
    plannedCount: Object.keys(planned).length,
    completedCount: Object.keys(completed).length,
    staleProjects
  };
}

function getLinkedInDraftsReport(weekRange) {
  // Check for drafts created this week
  const draftsDir = 'linkedin/drafts';
  const drafts = getFilesModifiedThisWeek(draftsDir, weekRange.start);

  // Also check for week-specific folders
  const weekFolders = [];
  try {
    const entries = fs.readdirSync(path.join(REPO_ROOT, draftsDir), { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name >= weekRange.start) {
        weekFolders.push(entry.name);
      }
    }
  } catch (e) {
    // Directory doesn't exist
  }

  return {
    folders: weekFolders,
    hasNew: weekFolders.length > 0
  };
}

function getContextSnapshotReport(weekRange) {
  const snapshots = getFilesModifiedThisWeek('logs/context', weekRange.start);
  return {
    count: snapshots.length,
    latest: snapshots.length > 0 ? snapshots[snapshots.length - 1].name : null
  };
}

// ============================================================
// MANUAL TODO DETECTION
// ============================================================

function getManualTodos(weekRange) {
  const todos = [];

  // 1. LinkedIn Metrics - check if updated this week
  const linkedinMetrics = [
    { file: 'linkedin/personal-metrics.json', name: 'Personal LinkedIn metrics' },
    { file: 'linkedin/codaissance-metrics.json', name: 'Codaissance LinkedIn metrics' },
    { file: 'linkedin/tampertantrum-metrics.json', name: 'TamperTantrum Labs LinkedIn metrics' }
  ];

  for (const metric of linkedinMetrics) {
    const data = readJSON(metric.file);
    if (!data || !data.entries || data.entries.length === 0) {
      todos.push({
        category: 'LinkedIn',
        task: `Update ${metric.name}`,
        reason: 'No metrics entries found',
        priority: 'medium',
        howTo: 'Go to LinkedIn Analytics, copy metrics into JSON file'
      });
    } else {
      // Check last entry date
      const lastEntry = data.entries[data.entries.length - 1];
      if (lastEntry.date < weekRange.start) {
        todos.push({
          category: 'LinkedIn',
          task: `Update ${metric.name}`,
          reason: `Last updated: ${lastEntry.date}`,
          priority: 'medium',
          howTo: 'Go to LinkedIn Analytics, copy metrics into JSON file'
        });
      }
    }
  }

  // 2. Interview tracking - check for pending interviews
  const interviews = readJSON('job-applications/interviews.json');
  if (interviews && interviews.interviews) {
    const realInterviews = interviews.interviews.filter(i => i.id && i.company);
    const pending = realInterviews.filter(i => i.outcome === 'pending');
    if (pending.length > 0) {
      todos.push({
        category: 'Job Search',
        task: `Update ${pending.length} pending interview outcome(s)`,
        reason: 'Interviews awaiting outcome update',
        priority: 'high',
        howTo: 'Update outcome field in interviews.json'
      });
    }
  }

  // 3. Application follow-ups - check for applications needing follow-up
  const applications = readJSON('job-applications/applications.json');
  if (applications && applications.applications) {
    const realApps = applications.applications.filter(a => a.id && a.company);
    const needsFollowUp = realApps.filter(a => {
      if (a.follow_up_date && a.follow_up_date <= weekRange.end) {
        return true;
      }
      // Also flag if applied > 2 weeks ago and still "applied" status
      if (a.status === 'applied' && a.date_applied) {
        const applied = new Date(a.date_applied);
        const now = new Date();
        const daysSince = Math.floor((now - applied) / (1000 * 60 * 60 * 24));
        return daysSince > 14;
      }
      return false;
    });

    if (needsFollowUp.length > 0) {
      todos.push({
        category: 'Job Search',
        task: `Follow up on ${needsFollowUp.length} application(s)`,
        reason: 'Applications may need follow-up or status update',
        priority: 'medium',
        howTo: 'Check application status, send follow-up emails'
      });
    }
  }

  // 4. Skills verification - if skill analysis found suggestions
  const skillAnalysis = readJSON('logs/skill-analysis/latest-analysis.json');
  if (skillAnalysis && skillAnalysis.suggestions && skillAnalysis.suggestions.length > 0) {
    todos.push({
      category: 'Profile',
      task: `Review ${skillAnalysis.suggestions.length} skill level suggestion(s)`,
      reason: 'Skill analysis detected usage patterns to verify',
      priority: 'low',
      howTo: 'Review suggestions in logs/skill-analysis/latest-analysis.json'
    });
  }

  // 5. LinkedIn drafts - if drafts were generated
  const draftFolders = getLinkedInDraftsReport(weekRange);
  if (draftFolders.hasNew) {
    todos.push({
      category: 'Content',
      task: `Review and post LinkedIn drafts`,
      reason: `${draftFolders.folders.length} draft folder(s) generated this week`,
      priority: 'medium',
      howTo: 'Review linkedin/drafts/, edit as needed, post to LinkedIn'
    });
  }

  // 6. Learning roadmap - check if actively learning anything
  const learning = readJSON('learning/roadmap.json');
  if (learning && learning.current_focus && learning.current_focus.length > 0) {
    todos.push({
      category: 'Learning',
      task: `Continue learning: ${learning.current_focus.map(s => s.skill || s).join(', ')}`,
      reason: 'Active learning items in roadmap',
      priority: 'low',
      howTo: 'Work through resources in learning/roadmap.json'
    });
  } else if (learning && learning.queue && learning.queue.length > 0) {
    const nextUp = learning.queue.filter(i => i.skill).slice(0, 2);
    if (nextUp.length > 0) {
      todos.push({
        category: 'Learning',
        task: `Start learning: ${nextUp.map(s => s.skill).join(', ')}`,
        reason: 'Items queued in learning roadmap',
        priority: 'low',
        howTo: 'Move items from queue to current_focus in learning/roadmap.json'
      });
    }
  }

  // 7. Open PRs from automations
  // This would require GitHub API - skip for now, can add later

  return todos;
}

// ============================================================
// ISSUE GENERATION
// ============================================================

function generateIssueContent(weekRange, automationReports, manualTodos) {
  const title = `Weekly Summary - ${weekRange.formatted}`;

  let body = `# Weekly Automation Summary

**Week of ${weekRange.formatted}**
Generated: ${new Date().toISOString()}

---

## What Automations Did This Week

`;

  // GitHub Activity
  const gh = automationReports.github;
  body += `### GitHub Activity Logged
- **${gh.commits}** commits tracked
- **${gh.prs}** PR activities
- **${gh.issues}** issue activities
- Active repos: ${gh.repos.length > 0 ? gh.repos.join(', ') : 'None this week'}

`;

  // Skill Analysis
  const skills = automationReports.skills;
  if (skills) {
    body += `### Skill Analysis
- **${skills.detected}** skills detected from code
- **${skills.manual}** skills tracked manually
- **${skills.decayWarnings}** skill decay warnings
- **${skills.suggestions}** usage suggestions
- Last analyzed: ${skills.generatedAt ? new Date(skills.generatedAt).toLocaleDateString() : 'Unknown'}

`;
  }

  // Project Status
  const projects = automationReports.projects;
  body += `### Project Status
- **${projects.activeCounts}** active projects
- **${projects.plannedCount}** planned projects
- **${projects.completedCount}** completed projects
`;

  if (projects.staleProjects.length > 0) {
    body += `- Stale projects (14+ days no commits):\n`;
    for (const p of projects.staleProjects) {
      body += `  - ${p.name} (${p.days} days)\n`;
    }
  }
  body += '\n';

  // LinkedIn Drafts
  const drafts = automationReports.linkedinDrafts;
  if (drafts.hasNew) {
    body += `### LinkedIn Post Drafts
- **${drafts.folders.length}** draft folder(s) generated
- Folders: ${drafts.folders.join(', ')}

`;
  }

  // Context Snapshots
  const context = automationReports.context;
  body += `### Context Snapshots
- **${context.count}** snapshots created this week
${context.latest ? `- Latest: ${context.latest}` : ''}

`;

  // Manual TODOs Section
  body += `---

## Action Items (Manual Input Required)

`;

  if (manualTodos.length === 0) {
    body += `*No manual action items this week. All caught up!*

`;
  } else {
    // Group by category
    const byCategory = {};
    for (const todo of manualTodos) {
      if (!byCategory[todo.category]) {
        byCategory[todo.category] = [];
      }
      byCategory[todo.category].push(todo);
    }

    for (const [category, todos] of Object.entries(byCategory)) {
      body += `### ${category}\n\n`;
      for (const todo of todos) {
        const priorityEmoji = todo.priority === 'high' ? '🔴' : todo.priority === 'medium' ? '🟡' : '🟢';
        body += `- [ ] ${priorityEmoji} **${todo.task}**\n`;
        body += `  - Reason: ${todo.reason}\n`;
        body += `  - How to: ${todo.howTo}\n\n`;
      }
    }
  }

  // Footer
  body += `---

## Quick Stats

| Metric | Value |
|--------|-------|
| Commits this week | ${gh.commits} |
| Active repos | ${gh.repos.length} |
| Skills tracked | ${skills ? skills.detected + skills.manual : 'N/A'} |
| Manual todos | ${manualTodos.length} |

---

*This issue was auto-generated by the Weekly Summary Pipeline.*
*It will auto-close in 7 days.*
`;

  return { title, body };
}

async function createGitHubIssue(title, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      title,
      body,
      labels: ['weekly-summary', 'automated']
    });

    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: `/repos/${REPO_OWNER}/${REPO_NAME}/issues`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Weekly-Summary-Generator',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        if (res.statusCode === 201) {
          const issue = JSON.parse(responseData);
          resolve(issue);
        } else {
          reject(new Error(`GitHub API error: ${res.statusCode} - ${responseData}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║              WEEKLY SUMMARY GENERATOR                       ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);

  const weekRange = getWeekRange();
  console.log(`\nWeek: ${weekRange.formatted}`);
  console.log(`  Start: ${weekRange.start}`);
  console.log(`  End: ${weekRange.end}`);

  // Gather automation reports
  console.log('\nGathering automation reports...');
  const automationReports = {
    github: getGitHubActivityReport(weekRange),
    skills: getSkillAnalysisReport(),
    projects: getProjectStatusReport(),
    linkedinDrafts: getLinkedInDraftsReport(weekRange),
    context: getContextSnapshotReport(weekRange)
  };

  console.log(`  - GitHub: ${automationReports.github.commits} commits, ${automationReports.github.repos.length} repos`);
  console.log(`  - Skills: ${automationReports.skills?.detected || 0} detected`);
  console.log(`  - Projects: ${automationReports.projects.activeCounts} active`);
  console.log(`  - LinkedIn drafts: ${automationReports.linkedinDrafts.folders.length} folders`);

  // Gather manual todos
  console.log('\nIdentifying manual action items...');
  const manualTodos = getManualTodos(weekRange);
  console.log(`  - Found ${manualTodos.length} action items requiring manual input`);

  for (const todo of manualTodos) {
    const priorityEmoji = todo.priority === 'high' ? '🔴' : todo.priority === 'medium' ? '🟡' : '🟢';
    console.log(`    ${priorityEmoji} [${todo.category}] ${todo.task}`);
  }

  // Generate issue content
  console.log('\nGenerating issue content...');
  const { title, body } = generateIssueContent(weekRange, automationReports, manualTodos);

  if (DRY_RUN) {
    console.log('\n[DRY RUN] Would create GitHub Issue:');
    console.log(`\n--- TITLE ---\n${title}`);
    console.log(`\n--- BODY (preview) ---\n${body.slice(0, 2000)}`);
    if (body.length > 2000) {
      console.log('\n... (truncated for preview)');
    }
  } else {
    if (!GITHUB_TOKEN) {
      console.error('\nError: GITHUB_TOKEN is required to create issues');
      process.exit(1);
    }

    console.log('\nCreating GitHub Issue...');
    try {
      const issue = await createGitHubIssue(title, body);
      console.log(`\nIssue created: ${issue.html_url}`);
    } catch (error) {
      console.error('\nFailed to create issue:', error.message);
      process.exit(1);
    }
  }

  console.log('\n=== Weekly Summary Generation Complete ===');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
