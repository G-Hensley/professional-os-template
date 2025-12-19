#!/usr/bin/env node

/**
 * Project Status Automation - Cross-Repo Scanner
 * Runs as part of GitHub Action workflow
 *
 * Features:
 * - Checks last commit date for each project with a repo_url
 * - Marks projects as stale after 14 days of inactivity
 * - Suggests moving to planned.json after 30 days
 * - Detects completion signals (v1.0 tag, [SHIP] commit, all issues closed)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ============================================================
// CONFIGURATION
// ============================================================

const STALE_THRESHOLD_DAYS = 14;
const MOVE_TO_PLANNED_THRESHOLD_DAYS = 30;

// ============================================================
// GITHUB API FUNCTIONS
// ============================================================

function ghApi(endpoint) {
  try {
    const result = execSync(`gh api ${endpoint} 2>/dev/null`, {
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024
    });
    return JSON.parse(result);
  } catch (e) {
    return null;
  }
}

function getRepoFromUrl(url) {
  if (!url) return null;
  const match = url.match(/github\.com\/([^\/]+\/[^\/]+)/);
  return match ? match[1].replace(/\.git$/, '') : null;
}

function getLastCommitDate(repo) {
  const commits = ghApi(`repos/${repo}/commits?per_page=1`);
  if (commits && commits.length > 0) {
    return new Date(commits[0].commit.committer.date);
  }
  return null;
}

function getTags(repo) {
  const tags = ghApi(`repos/${repo}/tags?per_page=10`);
  return tags || [];
}

function getRecentCommits(repo, since) {
  const sinceStr = since.toISOString();
  const commits = ghApi(`repos/${repo}/commits?since=${sinceStr}&per_page=50`);
  return commits || [];
}

function getOpenIssues(repo) {
  const issues = ghApi(`repos/${repo}/issues?state=open&per_page=100`);
  // Filter out pull requests (they show up in issues API)
  return (issues || []).filter(i => !i.pull_request);
}

function hasCompletionTag(tags) {
  const completionPatterns = [/^v?1\.0(\.0)?$/, /^v?1$/];
  return tags.some(tag =>
    completionPatterns.some(pattern => pattern.test(tag.name))
  );
}

function hasShipCommit(commits) {
  return commits.some(c =>
    c.commit.message.toLowerCase().includes('[ship]') ||
    c.commit.message.toLowerCase().includes('shipped') ||
    c.commit.message.toLowerCase().includes('🚀 ship')
  );
}

// ============================================================
// ANALYSIS FUNCTIONS
// ============================================================

function analyzeProject(projectKey, project, now) {
  const result = {
    key: projectKey,
    name: project.name,
    repo_url: project.repo_url,
    current_status: project.status,
    has_repo: false,
    days_since_commit: null,
    is_stale: false,
    suggest_move_to_planned: false,
    suggest_move_to_completed: false,
    completion_signals: [],
    warnings: [],
    info: []
  };

  // No repo URL - skip API checks
  if (!project.repo_url) {
    result.info.push('No repository URL configured');
    return result;
  }

  const repo = getRepoFromUrl(project.repo_url);
  if (!repo) {
    result.warnings.push(`Invalid repository URL: ${project.repo_url}`);
    return result;
  }

  result.has_repo = true;
  result.repo = repo;

  // Check last commit
  const lastCommit = getLastCommitDate(repo);
  if (lastCommit) {
    const daysSinceCommit = Math.floor((now - lastCommit) / (1000 * 60 * 60 * 24));
    result.days_since_commit = daysSinceCommit;
    result.last_commit = lastCommit.toISOString();

    if (daysSinceCommit >= MOVE_TO_PLANNED_THRESHOLD_DAYS) {
      result.is_stale = true;
      result.suggest_move_to_planned = true;
      result.warnings.push(`No commits for ${daysSinceCommit} days - consider moving to planned.json`);
    } else if (daysSinceCommit >= STALE_THRESHOLD_DAYS) {
      result.is_stale = true;
      result.warnings.push(`No commits for ${daysSinceCommit} days - marked as stale`);
    } else {
      result.info.push(`Active: last commit ${daysSinceCommit} days ago`);
    }
  } else {
    result.warnings.push('Could not fetch commit history');
  }

  // Check for completion signals
  const tags = getTags(repo);
  if (hasCompletionTag(tags)) {
    result.completion_signals.push('Has v1.0 or v1 tag');
  }

  // Check recent commits for [SHIP] keyword
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const recentCommits = getRecentCommits(repo, thirtyDaysAgo);
  if (hasShipCommit(recentCommits)) {
    result.completion_signals.push('[SHIP] found in recent commit message');
  }

  // Check if all issues are closed (only if there were issues)
  const openIssues = getOpenIssues(repo);
  if (openIssues.length === 0 && recentCommits.length > 0) {
    // Only count as completion signal if there's been recent activity
    // (to avoid flagging empty repos)
    const closedIssues = ghApi(`repos/${repo}/issues?state=closed&per_page=1`);
    if (closedIssues && closedIssues.length > 0) {
      result.completion_signals.push('All issues are closed');
    }
  }

  // If multiple completion signals, suggest move to completed
  if (result.completion_signals.length >= 2) {
    result.suggest_move_to_completed = true;
  } else if (result.completion_signals.length === 1) {
    result.info.push(`Completion signal detected: ${result.completion_signals[0]}`);
  }

  return result;
}

function generateReport(activeProjects, plannedProjects, now) {
  const report = {
    generated_at: now.toISOString(),
    thresholds: {
      stale_days: STALE_THRESHOLD_DAYS,
      move_to_planned_days: MOVE_TO_PLANNED_THRESHOLD_DAYS
    },
    summary: {
      active_count: Object.keys(activeProjects).length,
      planned_count: Object.keys(plannedProjects).length,
      stale_count: 0,
      suggest_move_to_planned: 0,
      suggest_move_to_completed: 0
    },
    active_analysis: [],
    planned_analysis: [],
    proposed_changes: [],
    warnings: [],
    info: []
  };

  // Analyze active projects
  for (const [key, project] of Object.entries(activeProjects)) {
    process.stdout.write(`  - ${project.name}... `);

    const analysis = analyzeProject(key, project, now);
    report.active_analysis.push(analysis);

    if (analysis.is_stale) {
      report.summary.stale_count++;
      process.stdout.write('STALE ');
    }

    if (analysis.suggest_move_to_planned) {
      report.summary.suggest_move_to_planned++;
      report.proposed_changes.push({
        type: 'move_to_planned',
        project: key,
        name: project.name,
        reason: `No commits for ${analysis.days_since_commit} days`
      });
      process.stdout.write('→planned ');
    }

    if (analysis.suggest_move_to_completed) {
      report.summary.suggest_move_to_completed++;
      report.proposed_changes.push({
        type: 'move_to_completed',
        project: key,
        name: project.name,
        reason: analysis.completion_signals.join(', ')
      });
      process.stdout.write('→completed ');
    }

    if (analysis.is_stale && !analysis.suggest_move_to_planned) {
      report.proposed_changes.push({
        type: 'mark_stale',
        project: key,
        name: project.name,
        reason: `No commits for ${analysis.days_since_commit} days`
      });
    }

    report.warnings.push(...analysis.warnings.map(w => `${project.name}: ${w}`));
    report.info.push(...analysis.info.map(i => `${project.name}: ${i}`));

    console.log('');
  }

  // Analyze planned projects that might have become active
  for (const [key, project] of Object.entries(plannedProjects)) {
    if (!project.repo_url) continue;

    process.stdout.write(`  - ${project.name} (planned)... `);

    const repo = getRepoFromUrl(project.repo_url);
    if (!repo) {
      console.log('invalid URL');
      continue;
    }

    const lastCommit = getLastCommitDate(repo);
    if (lastCommit) {
      const daysSinceCommit = Math.floor((now - lastCommit) / (1000 * 60 * 60 * 24));

      // If planned project has recent commits, suggest moving to active
      if (daysSinceCommit < STALE_THRESHOLD_DAYS && project.status !== 'Blocked') {
        report.proposed_changes.push({
          type: 'move_to_active',
          project: key,
          name: project.name,
          reason: `Has recent commits (${daysSinceCommit} days ago) - consider moving to active.json`
        });
        console.log(`ACTIVE? (${daysSinceCommit}d ago)`);
      } else {
        console.log(`${daysSinceCommit}d ago`);
      }

      report.planned_analysis.push({
        key,
        name: project.name,
        days_since_commit: daysSinceCommit,
        status: project.status,
        blocked_by: project.blocked_by
      });
    } else {
      console.log('no commits');
    }
  }

  return report;
}

// ============================================================
// FILE MODIFICATION FUNCTIONS
// ============================================================

function applyChanges(report, activeProjects, plannedProjects, completedProjects) {
  let modified = false;
  const changes = [];

  for (const change of report.proposed_changes) {
    if (change.type === 'mark_stale') {
      if (activeProjects[change.project]) {
        activeProjects[change.project].stale = true;
        activeProjects[change.project].stale_since = new Date().toISOString().split('T')[0];
        modified = true;
        changes.push(`Marked ${change.name} as stale`);
      }
    }

    if (change.type === 'move_to_planned') {
      if (activeProjects[change.project]) {
        const project = activeProjects[change.project];
        project.status = 'Paused';
        project.stale = true;
        project.paused_at = new Date().toISOString().split('T')[0];
        plannedProjects[change.project] = project;
        delete activeProjects[change.project];
        modified = true;
        changes.push(`Moved ${change.name} to planned.json`);
      }
    }

    if (change.type === 'move_to_completed') {
      if (activeProjects[change.project]) {
        const project = activeProjects[change.project];
        project.status = 'Completed';
        project.completed_at = new Date().toISOString().split('T')[0];
        delete project.stale;
        delete project.stale_since;
        completedProjects[change.project] = project;
        delete activeProjects[change.project];
        modified = true;
        changes.push(`Moved ${change.name} to completed.json`);
      }
    }

    if (change.type === 'move_to_active') {
      if (plannedProjects[change.project]) {
        const project = plannedProjects[change.project];
        project.status = 'In Progress';
        delete project.stale;
        delete project.paused_at;
        activeProjects[change.project] = project;
        delete plannedProjects[change.project];
        modified = true;
        changes.push(`Moved ${change.name} to active.json`);
      }
    }
  }

  return { modified, changes };
}

// ============================================================
// MAIN
// ============================================================

console.log('=== Project Status Automation ===');

const now = new Date();

// Read project files
console.log('\nReading project files...');
let activeProjects, plannedProjects, completedProjects;

try {
  activeProjects = JSON.parse(fs.readFileSync('projects/active.json', 'utf8'));
  console.log(`  Active projects: ${Object.keys(activeProjects).length}`);
} catch (e) {
  console.error('Could not read projects/active.json:', e.message);
  process.exit(1);
}

try {
  plannedProjects = JSON.parse(fs.readFileSync('projects/planned.json', 'utf8'));
  console.log(`  Planned projects: ${Object.keys(plannedProjects).length}`);
} catch (e) {
  console.error('Could not read projects/planned.json:', e.message);
  process.exit(1);
}

try {
  completedProjects = JSON.parse(fs.readFileSync('projects/completed.json', 'utf8'));
  console.log(`  Completed projects: ${Object.keys(completedProjects).length}`);
} catch (e) {
  completedProjects = {};
  console.log('  Completed projects: 0 (file empty or missing)');
}

// Analyze projects
console.log('\nAnalyzing active projects via GitHub API...');
const report = generateReport(activeProjects, plannedProjects, now);

// Write report
const reportDir = 'logs/project-status';
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}
fs.writeFileSync(path.join(reportDir, 'latest-analysis.json'), JSON.stringify(report, null, 2));

// Summary
console.log('\n=== Analysis Summary ===');
console.log(`Active projects: ${report.summary.active_count}`);
console.log(`Planned projects: ${report.summary.planned_count}`);
console.log(`Stale projects: ${report.summary.stale_count}`);
console.log(`Proposed changes: ${report.proposed_changes.length}`);

if (report.proposed_changes.length > 0) {
  console.log('\nProposed Changes:');
  for (const change of report.proposed_changes) {
    const arrow = change.type === 'mark_stale' ? '⚠️' :
                  change.type === 'move_to_planned' ? '📋' :
                  change.type === 'move_to_completed' ? '✅' : '🔄';
    console.log(`  ${arrow} ${change.type}: ${change.name}`);
    console.log(`     Reason: ${change.reason}`);
  }
}

if (report.warnings.length > 0) {
  console.log('\nWarnings:');
  for (const w of report.warnings) {
    console.log(`  ⚠️  ${w}`);
  }
}

// Apply changes if not in dry-run mode
const dryRun = process.env.DRY_RUN === 'true';
if (!dryRun && report.proposed_changes.length > 0) {
  console.log('\nApplying changes...');
  const { modified, changes } = applyChanges(report, activeProjects, plannedProjects, completedProjects);

  if (modified) {
    fs.writeFileSync('projects/active.json', JSON.stringify(activeProjects, null, 2));
    fs.writeFileSync('projects/planned.json', JSON.stringify(plannedProjects, null, 2));
    fs.writeFileSync('projects/completed.json', JSON.stringify(completedProjects, null, 2));

    console.log('Changes applied:');
    for (const c of changes) {
      console.log(`  ✓ ${c}`);
    }
  }
} else if (dryRun) {
  console.log('\n(Dry run - no changes applied)');
}

// Write summary for PR decision
fs.writeFileSync('/tmp/project-status-summary.json', JSON.stringify({
  proposed_changes: report.proposed_changes.length,
  stale_count: report.summary.stale_count,
  has_changes: report.proposed_changes.length > 0
}));

console.log('\nDone!');
