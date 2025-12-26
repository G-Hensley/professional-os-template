/**
 * Context Snapshot Generator
 *
 * Generates a comprehensive snapshot of the repository state for AI context.
 * Run daily or on-demand before AI sessions to reduce token usage.
 *
 * Usage:
 *   node automation/scripts/context-snapshot.js
 *   DRY_RUN=true node automation/scripts/context-snapshot.js
 */

const fs = require('fs');
const path = require('path');

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
    // Silently fail
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

// List files in a directory (non-recursive)
function listFiles(dirPath) {
  try {
    const fullPath = path.join(REPO_ROOT, dirPath);
    if (fs.existsSync(fullPath)) {
      return fs.readdirSync(fullPath).filter(f => !f.startsWith('.'));
    }
  } catch (e) {
    // Ignore
  }
  return [];
}

// Get folder structure as a simple tree string (like `tree` command)
function getFolderTree() {
  const lines = [];
  const skipDirs = new Set(['node_modules', 'dist', '.git', 'coverage', 'assets']);
  const skipFiles = new Set(['.DS_Store']);

  function walk(dir, prefix = '', isLast = true) {
    const items = fs.readdirSync(path.join(REPO_ROOT, dir))
      .filter(item => {
        if (skipFiles.has(item)) return false;
        if (item.startsWith('.') && !['github', 'claude', 'gemini', 'codex'].includes(item.replace('.', ''))) {
          return false;
        }
        if (skipDirs.has(item)) return false;
        return true;
      })
      .sort((a, b) => {
        // Directories first
        const aIsDir = fs.statSync(path.join(REPO_ROOT, dir, a)).isDirectory();
        const bIsDir = fs.statSync(path.join(REPO_ROOT, dir, b)).isDirectory();
        if (aIsDir && !bIsDir) return -1;
        if (!aIsDir && bIsDir) return 1;
        return a.localeCompare(b);
      });

    items.forEach((item, index) => {
      const itemPath = path.join(dir, item);
      const fullPath = path.join(REPO_ROOT, itemPath);
      const isDirectory = fs.statSync(fullPath).isDirectory();
      const isLastItem = index === items.length - 1;
      const connector = isLastItem ? '└── ' : '├── ';
      const newPrefix = prefix + (isLastItem ? '    ' : '│   ');

      lines.push(prefix + connector + item + (isDirectory ? '/' : ''));

      if (isDirectory) {
        walk(itemPath, newPrefix, isLastItem);
      }
    });
  }

  lines.push('myself/');
  walk('', '');
  return lines.join('\n');
}

// Count skills by level
function getSkillsSummary(skills) {
  if (!skills) return null;

  const levels = { master: 0, expert: 0, adept: 0, apprentice: 0, novice: 0, none: 0 };
  const topSkills = { expert: [], adept: [] };

  for (const [category, skillSet] of Object.entries(skills)) {
    if (category === 'skill levels') continue;

    for (const [skill, level] of Object.entries(skillSet)) {
      if (levels.hasOwnProperty(level)) {
        levels[level]++;
        if (level === 'expert' && topSkills.expert.length < 10) {
          topSkills.expert.push(skill);
        }
        if (level === 'adept' && topSkills.adept.length < 10) {
          topSkills.adept.push(skill);
        }
      }
    }
  }

  return { totals: levels, top_expert: topSkills.expert, top_adept: topSkills.adept };
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

  // Active projects - more detail
  for (const [key, proj] of Object.entries(active)) {
    summary.active.push({
      key,
      name: proj.name,
      type: proj.type,
      priority: proj.priority,
      status: proj.status,
      tagline: proj.tagline,
      repo_url: proj.repo_url || null,
      technologies: proj.technologies?.slice(0, 6),
      due_date: proj.due_date,
      success_milestone: proj.success_milestone
    });
  }

  // Planned projects
  for (const [key, proj] of Object.entries(planned)) {
    summary.planned.push({
      key,
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
      key,
      name: proj.name,
      type: proj.type
    });
  }

  // Sort by priority
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

        const nameMatch = content.match(/^name:\s*(.+)$/m);
        const name = nameMatch ? nameMatch[1].trim() : file.replace('.yml', '');

        const cronMatch = content.match(/cron:\s*['"](.+)['"]/);
        const schedule = cronMatch ? cronMatch[1] : null;

        // Parse cron to human-readable
        let scheduleDesc = null;
        if (schedule) {
          const [min, hour, dom, mon, dow] = schedule.split(' ');
          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          if (dow === '*') {
            scheduleDesc = `Daily at ${hour}:${min.padStart(2, '0')} UTC`;
          } else {
            scheduleDesc = `${days[parseInt(dow)]} at ${hour}:${min.padStart(2, '0')} UTC`;
          }
        }

        workflows.push({ name, schedule: scheduleDesc || schedule });
      } catch (e) {
        // Skip
      }
    }
  }

  return workflows;
}

// Get available commands
function getAvailableCommands() {
  const commands = {
    claude: [],
    gemini: [],
    codex: []
  };

  // Claude commands
  const claudeDir = path.join(REPO_ROOT, '.claude/commands');
  if (fs.existsSync(claudeDir)) {
    commands.claude = fs.readdirSync(claudeDir)
      .filter(f => f.endsWith('.md'))
      .map(f => '/' + f.replace('.md', ''));
  }

  // Gemini commands
  const geminiDir = path.join(REPO_ROOT, '.gemini/commands');
  if (fs.existsSync(geminiDir)) {
    commands.gemini = fs.readdirSync(geminiDir)
      .filter(f => f.endsWith('.toml'))
      .map(f => '/' + f.replace('.toml', ''));
  }

  // Codex commands
  const codexDir = path.join(REPO_ROOT, '.codex/commands');
  if (fs.existsSync(codexDir)) {
    commands.codex = fs.readdirSync(codexDir)
      .filter(f => f.endsWith('.md'))
      .map(f => '/prompts:' + f.replace('.md', ''));
  }

  return commands;
}

// Get business summary with more detail
function getBusinessSummary() {
  const result = {};

  // Codaissance
  const codStrat = readJSON('business/codaissance/strategy.json');
  const codBrand = readJSON('business/codaissance/brand.json');
  const codGoals = listFiles('business/codaissance');

  if (codStrat || codBrand) {
    result.codaissance = {
      tagline: codStrat?.tagline || codBrand?.tagline,
      type: 'SaaS product studio',
      files: codGoals.filter(f => f.endsWith('.json') || f.endsWith('.md'))
    };
  }

  // TamperTantrum Labs
  const ttStrat = readJSON('business/tampertantrum-labs/strategy.json');
  const ttGoals = listFiles('business/tampertantrum-labs');

  if (ttStrat) {
    result.tampertantrum_labs = {
      tagline: ttStrat.tagline,
      type: 'AppSec consulting',
      files: ttGoals.filter(f => f.endsWith('.json') || f.endsWith('.md'))
    };
  }

  return result;
}

// Get job search status
function getJobSearchStatus() {
  const applicationsFile = readJSON('job-applications/applications.json');
  const interviewsFile = readJSON('job-applications/interviews.json');

  const status = {
    total_applications: 0,
    by_status: {},
    recent_interviews: 0
  };

  if (applicationsFile) {
    // Access the nested applications array and filter out empty placeholders
    const apps = (applicationsFile.applications || []).filter(app => app.id && app.company);
    status.total_applications = apps.length;

    for (const app of apps) {
      const s = app.status || 'unknown';
      status.by_status[s] = (status.by_status[s] || 0) + 1;
    }
  }

  if (interviewsFile) {
    // Access the nested interviews array and filter out empty placeholders
    const ints = (interviewsFile.interviews || []).filter(i => i.id && i.company);
    // Count interviews in last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    status.recent_interviews = ints.filter(i => new Date(i.date) >= thirtyDaysAgo).length;
  }

  return status;
}

// Get profile summary
function getProfileSummary() {
  const contact = readJSON('profile/contact.json');
  const experience = readJSON('profile/experience.json');
  const education = readJSON('profile/education.json');
  const preferences = readJSON('profile/preferences.json');

  const summary = {};

  if (contact) {
    summary.name = contact.name;
    summary.location = contact.location;
    summary.email = contact.email;
  }

  if (experience) {
    // Handle both array format and object format (company as key)
    let jobs = [];
    if (Array.isArray(experience)) {
      jobs = experience;
    } else if (experience.jobs) {
      jobs = experience.jobs;
    } else {
      // Object format: { "CompanyName": { role, start_date, end_date, ... } }
      jobs = Object.entries(experience).map(([company, data]) => ({
        company,
        title: data.role || data.title,
        end_date: data.end_date,
        salary: data.salary,
        current: data.end_date === 'Present'
      }));
    }
    const current = jobs.find(j => j.end_date === 'Present' || j.current);
    if (current) {
      summary.current_role = `${current.title || current.role} at ${current.company}`;
      summary.salary = current.salary;
    }
  }

  if (education) {
    // Handle both array format and object format
    let degrees = [];
    if (Array.isArray(education)) {
      degrees = education;
    } else if (education.degrees) {
      degrees = education.degrees;
    } else {
      // Object format: { "degree_key": { degree, institution, graduation_year, ... } }
      degrees = Object.values(education);
    }
    // Find most recent (highest graduation year)
    const sorted = degrees.sort((a, b) =>
      (parseInt(b.graduation_year) || 0) - (parseInt(a.graduation_year) || 0)
    );
    const recent = sorted[0];
    if (recent) {
      const school = recent.institution || recent.school;
      const field = recent.field_of_study ? ` in ${recent.field_of_study}` : '';
      summary.education = `${recent.degree}${field} - ${school} (${recent.graduation_year || recent.year})`;
    }
  }

  if (preferences) {
    summary.work_style = preferences.work_style || preferences.remote_preference;
  }

  return summary;
}

// Get key files with modification dates and descriptions
function getKeyFiles() {
  const files = [
    { path: 'profile/skills.json', desc: 'Technical skills with proficiency levels' },
    { path: 'profile/experience.json', desc: 'Work history' },
    { path: 'profile/resume.md', desc: 'Current resume' },
    { path: 'projects/active.json', desc: 'Active projects' },
    { path: 'projects/planned.json', desc: 'Planned/blocked projects' },
    { path: 'projects/completed.json', desc: 'Completed projects' },
    { path: 'business/BUSINESS_GOALS.md', desc: 'High-level business objectives' },
    { path: 'job-applications/JOB_SEARCH.md', desc: 'Job search criteria and preferences' },
    { path: 'job-applications/applications.json', desc: 'Job applications submitted' },
    { path: 'linkedin/content-ideas.json', desc: 'Content pillars and post strategy' },
    { path: 'learning/roadmap.json', desc: 'Skills to learn' },
    { path: 'REPO_TODO.md', desc: 'Repository automation roadmap' }
  ];

  return files.map(f => ({
    ...f,
    modified: getModTime(f.path)
  })).filter(f => f.modified);
}

// Get learning summary
function getLearningSummary() {
  const roadmap = readJSON('learning/roadmap.json');
  const completed = readJSON('learning/completed.json');

  return {
    roadmap_items: roadmap ? Object.keys(roadmap).length : 0,
    completed_items: completed ? (Array.isArray(completed) ? completed.length : Object.keys(completed).length) : 0
  };
}

// Main function
async function main() {
  console.log('Generating context snapshot...');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);

  const skills = readJSON('profile/skills.json');

  const snapshot = {
    generated_at: new Date().toISOString(),
    version: '2.0',

    // Profile summary
    profile: getProfileSummary(),

    // Project counts and details
    projects: getProjectsSummary(),

    // Skills summary with top skills listed
    skills: getSkillsSummary(skills),

    // Business info
    businesses: getBusinessSummary(),

    // Job search status
    job_search: getJobSearchStatus(),

    // Learning progress
    learning: getLearningSummary(),

    // Automation pipelines with human-readable schedules
    automations: getAutomationStatus(),

    // Available AI commands
    commands: getAvailableCommands(),

    // Key files with descriptions and modification dates
    key_files: getKeyFiles(),

    // Full folder tree
    folder_tree: getFolderTree()
  };

  // Console summary
  console.log('\n=== Context Snapshot Summary ===');
  console.log(`Profile: ${snapshot.profile.name || 'N/A'} - ${snapshot.profile.current_role || 'N/A'}`);
  console.log(`Projects: ${snapshot.projects.counts.active} active, ${snapshot.projects.counts.planned} planned`);
  console.log(`Skills: ${snapshot.skills?.totals?.expert || 0} expert, ${snapshot.skills?.totals?.adept || 0} adept`);
  console.log(`Job Search: ${snapshot.job_search.total_applications} applications`);
  console.log(`Automations: ${snapshot.automations.length} workflows`);
  console.log(`Commands: ${snapshot.commands.claude.length} Claude, ${snapshot.commands.gemini.length} Gemini`);

  // Build compact version
  const compact = {
    generated_at: snapshot.generated_at,
    profile: `${snapshot.profile.name} - ${snapshot.profile.current_role}`,
    projects: {
      active: snapshot.projects.active.map(p => `${p.name} (P${p.priority}): ${p.tagline}`),
      planned: snapshot.projects.planned.map(p => `${p.name}${p.blocked_by ? ` [blocked by: ${p.blocked_by}]` : ''}`),
    },
    skills: {
      expert: snapshot.skills?.top_expert || [],
      adept: snapshot.skills?.top_adept || []
    },
    automations: snapshot.automations.map(a => `${a.name}: ${a.schedule}`),
    commands: {
      claude: snapshot.commands.claude,
      gemini: snapshot.commands.gemini
    }
  };

  if (DRY_RUN) {
    console.log('\n[DRY RUN] Would write snapshots to logs/context/');
    console.log('\nSnapshot preview:');
    console.log(JSON.stringify(snapshot, null, 2));
  } else {
    // Ensure context directory exists
    const contextDir = path.join(REPO_ROOT, 'logs/context');
    if (!fs.existsSync(contextDir)) {
      fs.mkdirSync(contextDir, { recursive: true });
    }

    // Get date stamp for filename (YYYY-MM-DD)
    const dateStamp = new Date().toISOString().split('T')[0];

    // Write dated full snapshot
    const datedPath = path.join(contextDir, `${dateStamp}.json`);
    fs.writeFileSync(datedPath, JSON.stringify(snapshot, null, 2));
    console.log(`\nSnapshot written to ${datedPath}`);

    // Write latest.json (copy, not symlink for cross-platform compatibility)
    const latestPath = path.join(contextDir, 'latest.json');
    fs.writeFileSync(latestPath, JSON.stringify(snapshot, null, 2));
    console.log(`Latest snapshot written to ${latestPath}`);

    // Write compact version
    const compactPath = path.join(contextDir, 'latest-compact.json');
    fs.writeFileSync(compactPath, JSON.stringify(compact, null, 2));
    console.log(`Compact snapshot written to ${compactPath}`);

    // Clean up old root-level files if they exist (migration)
    const oldFull = path.join(REPO_ROOT, 'logs/context-snapshot.json');
    const oldCompact = path.join(REPO_ROOT, 'logs/context-snapshot-compact.json');
    if (fs.existsSync(oldFull)) {
      fs.unlinkSync(oldFull);
      console.log('Removed old logs/context-snapshot.json');
    }
    if (fs.existsSync(oldCompact)) {
      fs.unlinkSync(oldCompact);
      console.log('Removed old logs/context-snapshot-compact.json');
    }
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
