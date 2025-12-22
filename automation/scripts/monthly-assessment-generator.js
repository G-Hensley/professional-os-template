#!/usr/bin/env node

/**
 * Monthly Assessment Generator
 *
 * Aggregates data from all logs and profile data to generate
 * a comprehensive monthly assessment report.
 *
 * Usage:
 *   node automation/scripts/monthly-assessment-generator.js
 *
 * Environment:
 *   DRY_RUN=true   - Preview without writing files
 *   MONTH=YYYY-MM  - Generate for specific month (default: previous month)
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '../..');
const DRY_RUN = process.env.DRY_RUN === 'true';

// Determine which month to assess (default: previous month)
function getTargetMonth() {
  if (process.env.MONTH) {
    return process.env.MONTH;
  }
  const now = new Date();
  now.setMonth(now.getMonth() - 1);
  return now.toISOString().slice(0, 7); // YYYY-MM
}

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

function getMonthName(monthStr) {
  const [year, month] = monthStr.split('-');
  const date = new Date(year, parseInt(month) - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

// ============================================================
// DATA AGGREGATION
// ============================================================

function getGitHubActivity(month) {
  const activityFile = readJSON(`logs/github-activity/${month}.json`);
  if (!activityFile || !activityFile.entries) {
    return { total_commits: 0, repos: [], prs_created: 0, prs_merged: 0, issues_created: 0, issues_closed: 0 };
  }

  // Aggregate across all entries in the month
  let totalCommits = 0;
  let prsCreated = 0;
  let prsMerged = 0;
  let issuesCreated = 0;
  let issuesClosed = 0;
  const repoMap = {};

  for (const entry of activityFile.entries) {
    if (entry.summary) {
      totalCommits += entry.summary.total_commits || 0;
      prsCreated += entry.summary.pull_requests_created || 0;
      prsMerged += entry.summary.pull_requests_merged || 0;
      issuesCreated += entry.summary.issues_created || 0;
      issuesClosed += entry.summary.issues_closed || 0;
    }

    if (entry.commits) {
      for (const commit of entry.commits) {
        const repoName = commit.repository.replace('G-Hensley/', '');
        if (!repoMap[repoName]) {
          repoMap[repoName] = { commits: 0, url: commit.url };
        }
        repoMap[repoName].commits += commit.total_commits || 0;
      }
    }
  }

  // Sort repos by commit count
  const repos = Object.entries(repoMap)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.commits - a.commits);

  return {
    total_commits: totalCommits,
    repos,
    prs_created: prsCreated,
    prs_merged: prsMerged,
    issues_created: issuesCreated,
    issues_closed: issuesClosed
  };
}

function getSkillsData() {
  const analysis = readJSON('logs/skill-analysis/latest-analysis.json');
  const skills = readJSON('profile/skills.json');

  return {
    detected_count: analysis?.skills_detected || 0,
    manual_count: analysis?.manual_only_count || 0,
    detected_skills: analysis?.detected_skills || {},
    profile_skills: skills || {}
  };
}

function getProjectsData() {
  const active = readJSON('projects/active.json') || {};
  const planned = readJSON('projects/planned.json') || {};
  const completed = readJSON('projects/completed.json') || {};

  return {
    active: Object.entries(active).map(([key, data]) => ({ key, ...data })),
    planned: Object.entries(planned).map(([key, data]) => ({ key, ...data })),
    completed: Object.entries(completed).map(([key, data]) => ({ key, ...data })),
    counts: {
      active: Object.keys(active).length,
      planned: Object.keys(planned).length,
      completed: Object.keys(completed).length
    }
  };
}

function getJobSearchData() {
  const applicationsFile = readJSON('job-applications/applications.json') || {};
  const interviewsFile = readJSON('job-applications/interviews.json') || {};

  // Access the nested arrays and filter out empty placeholder entries
  const appList = (applicationsFile.applications || []).filter(app => app.id && app.company);
  const interviewList = (interviewsFile.interviews || []).filter(interview => interview.id && interview.company);

  return {
    total_applications: appList.length,
    applications_by_status: appList.reduce((acc, app) => {
      const status = app.status || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {}),
    total_interviews: interviewList.length,
    interviews: interviewList
  };
}

function getBusinessData() {
  return {
    codaissance: {
      strategy: readJSON('business/codaissance/strategy.json'),
      goals: fs.existsSync(path.join(REPO_ROOT, 'business/codaissance/goals.md'))
        ? fs.readFileSync(path.join(REPO_ROOT, 'business/codaissance/goals.md'), 'utf8')
        : null,
      financials: readJSON('business/codaissance/financials.json')
    },
    tampertantrum: {
      strategy: readJSON('business/tampertantrum-labs/strategy.json'),
      goals: fs.existsSync(path.join(REPO_ROOT, 'business/tampertantrum-labs/goals.md'))
        ? fs.readFileSync(path.join(REPO_ROOT, 'business/tampertantrum-labs/goals.md'), 'utf8')
        : null,
      financials: readJSON('business/tampertantrum-labs/financials.json')
    }
  };
}

function getLearningData() {
  const roadmap = readJSON('learning/roadmap.json');
  const completed = readJSON('learning/completed.json');

  return {
    roadmap: roadmap || {},
    completed: completed || {}
  };
}

function getLinkedInData() {
  const personalMetrics = readJSON('linkedin/personal-metrics.json');
  const codaissanceMetrics = readJSON('linkedin/codaissance-metrics.json');
  const tampertrumMetrics = readJSON('linkedin/tampertantrum-metrics.json');

  return {
    personal: personalMetrics,
    codaissance: codaissanceMetrics,
    tampertantrum: tampertrumMetrics
  };
}

function getProfileData() {
  return {
    contact: readJSON('profile/contact.json'),
    experience: readJSON('profile/experience.json'),
    education: readJSON('profile/education.json'),
    preferences: readJSON('profile/preferences.json')
  };
}

// ============================================================
// REPORT GENERATION
// ============================================================

function generateAssessmentReport(month, data) {
  const monthName = getMonthName(month);
  const generatedAt = new Date().toISOString();

  let report = `# Monthly Assessment - ${monthName}

Generated: ${generatedAt}

---

## Executive Summary

This assessment covers your progress, achievements, and areas for improvement during ${monthName}.

---

## GitHub Activity

`;

  // GitHub Activity Section
  const gh = data.github;
  report += `### Overview

| Metric | Count |
|--------|-------|
| Total Commits | ${gh.total_commits} |
| PRs Created | ${gh.prs_created} |
| PRs Merged | ${gh.prs_merged} |
| Issues Created | ${gh.issues_created} |
| Issues Closed | ${gh.issues_closed} |

### Repository Breakdown

`;

  if (gh.repos.length > 0) {
    report += `| Repository | Commits |\n|------------|--------|\n`;
    for (const repo of gh.repos.slice(0, 10)) {
      report += `| [${repo.name}](${repo.url}) | ${repo.commits} |\n`;
    }
    if (gh.repos.length > 10) {
      report += `| *...and ${gh.repos.length - 10} more* | |\n`;
    }
  } else {
    report += `*No GitHub activity recorded for this month.*\n`;
  }

  // Projects Section
  report += `
---

## Projects

### Active Projects (${data.projects.counts.active})

`;

  if (data.projects.active.length > 0) {
    for (const project of data.projects.active) {
      report += `- **${project.name || project.key}**`;
      if (project.tagline) report += ` - ${project.tagline}`;
      if (project.priority) report += ` (P${project.priority})`;
      report += `\n`;
    }
  } else {
    report += `*No active projects.*\n`;
  }

  report += `
### Planned Projects (${data.projects.counts.planned})

`;

  if (data.projects.planned.length > 0) {
    for (const project of data.projects.planned) {
      report += `- **${project.name || project.key}**`;
      if (project.blocked_by) report += ` - *Blocked by: ${project.blocked_by}*`;
      report += `\n`;
    }
  } else {
    report += `*No planned projects.*\n`;
  }

  report += `
### Completed Projects (${data.projects.counts.completed})

`;

  if (data.projects.completed.length > 0) {
    for (const project of data.projects.completed) {
      report += `- **${project.name || project.key}**\n`;
    }
  } else {
    report += `*No completed projects this month.*\n`;
  }

  // Skills Section
  report += `
---

## Skills Development

### Skills Detected from Code

`;

  const skillEntries = Object.entries(data.skills.detected_skills);
  if (skillEntries.length > 0) {
    report += `| Skill | Repos Using |\n|-------|-------------|\n`;
    for (const [skill, details] of skillEntries.slice(0, 15)) {
      const repoCount = details.repos?.length || 0;
      report += `| ${skill} | ${repoCount} |\n`;
    }
    if (skillEntries.length > 15) {
      report += `| *...and ${skillEntries.length - 15} more* | |\n`;
    }
  } else {
    report += `*No skill detection data available.*\n`;
  }

  report += `
**Summary**: ${data.skills.detected_count} skills detected from code, ${data.skills.manual_count} skills tracked manually.

`;

  // Job Search Section
  report += `
---

## Job Search Progress

### Applications

| Status | Count |
|--------|-------|
`;

  const statusCounts = data.jobSearch.applications_by_status;
  for (const [status, count] of Object.entries(statusCounts)) {
    report += `| ${status} | ${count} |\n`;
  }

  if (Object.keys(statusCounts).length === 0) {
    report += `| *No applications* | 0 |\n`;
  }

  report += `
**Total Applications**: ${data.jobSearch.total_applications}
**Total Interviews**: ${data.jobSearch.total_interviews}

`;

  // Business Section
  report += `
---

## Business Progress

### Codaissance

`;

  if (data.business.codaissance.strategy) {
    const strat = data.business.codaissance.strategy;
    report += `- **Mission**: ${strat.mission || 'Not defined'}\n`;
    report += `- **Model**: ${strat.business_model || 'Not defined'}\n`;
  }

  if (data.business.codaissance.financials) {
    const fin = data.business.codaissance.financials;
    if (fin.revenue) {
      report += `- **MRR**: $${fin.revenue.mrr || 0}\n`;
    }
  }

  report += `
### TamperTantrum Labs

`;

  if (data.business.tampertantrum.strategy) {
    const strat = data.business.tampertantrum.strategy;
    report += `- **Mission**: ${strat.mission || 'Not defined'}\n`;
  }

  if (data.business.tampertantrum.financials) {
    const fin = data.business.tampertantrum.financials;
    if (fin.revenue) {
      report += `- **Monthly Revenue**: $${fin.revenue.monthly || 0}\n`;
    }
  }

  // Recommendations Section
  report += `
---

## Recommendations

### Technical Growth
1. Continue building with detected technologies (${data.skills.detected_count} active skills)
2. Focus on deepening expertise in most-used tools
3. Consider exploring new technologies for planned projects

### Project Focus
1. Prioritize P1 active projects before starting new ones
2. Review blocked projects and unblock dependencies
3. Set clear milestones for active projects

### Job Search
1. ${data.jobSearch.total_applications > 0 ? 'Follow up on pending applications' : 'Begin targeted job applications'}
2. ${data.jobSearch.total_interviews > 0 ? 'Prepare for upcoming interviews' : 'Optimize resume and portfolio for target roles'}
3. Leverage GitHub activity in applications (${gh.total_commits} commits this month)

### Business Development
1. Continue building in public to attract audience
2. Focus on shipping MVP for priority products
3. Document learnings for content creation

---

## Action Items

- [ ] Review and address any stale projects
- [ ] Update skills.json based on latest detection
- [ ] Follow up on pending job applications
- [ ] Create content based on this month's learnings
- [ ] Set goals for next month

---

## Next Assessment

**Scheduled**: 1st of next month

---

*Generated automatically by the Monthly Assessment Pipeline*
`;

  return report;
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           MONTHLY ASSESSMENT GENERATOR                      ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);

  const targetMonth = getTargetMonth();
  const monthName = getMonthName(targetMonth);
  console.log(`\nGenerating assessment for: ${monthName} (${targetMonth})`);

  // Aggregate all data
  console.log('\nAggregating data...');
  const data = {
    github: getGitHubActivity(targetMonth),
    skills: getSkillsData(),
    projects: getProjectsData(),
    jobSearch: getJobSearchData(),
    business: getBusinessData(),
    learning: getLearningData(),
    linkedin: getLinkedInData(),
    profile: getProfileData()
  };

  console.log(`  - GitHub: ${data.github.total_commits} commits, ${data.github.repos.length} repos`);
  console.log(`  - Skills: ${data.skills.detected_count} detected, ${data.skills.manual_count} manual`);
  console.log(`  - Projects: ${data.projects.counts.active} active, ${data.projects.counts.planned} planned`);
  console.log(`  - Job Search: ${data.jobSearch.total_applications} applications`);

  // Generate report
  console.log('\nGenerating assessment report...');
  const report = generateAssessmentReport(targetMonth, data);

  // Output paths
  const assessmentsDir = path.join(REPO_ROOT, 'assessments');
  const filename = `${targetMonth}-assessment.md`;
  const outputPath = path.join(assessmentsDir, filename);

  if (DRY_RUN) {
    console.log('\n[DRY RUN] Would write assessment to:', outputPath);
    console.log('\n--- PREVIEW ---\n');
    console.log(report.slice(0, 2000));
    console.log('\n... (truncated for preview)');
  } else {
    // Ensure directory exists
    if (!fs.existsSync(assessmentsDir)) {
      fs.mkdirSync(assessmentsDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, report);
    console.log(`\nAssessment written to: ${outputPath}`);
  }

  console.log('\n=== Assessment Generation Complete ===');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
