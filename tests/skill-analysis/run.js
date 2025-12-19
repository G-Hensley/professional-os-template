#!/usr/bin/env node

/**
 * Skill Analysis Pipeline - Local Test
 * Run with: node tests/skill-analysis/run.js
 *
 * Features:
 * - Scans local repo for config files and extensions
 * - Reads activity logs to find all active repos
 * - Fetches package.json from each repo via GitHub API
 * - Fetches file tree to detect languages used across all repos
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ============================================================
// DETECTION RULES
// ============================================================

const DETECTION_RULES = {
  languages: {
    'JavaScript': ['.js', '.mjs', '.cjs', '.jsx'],
    'TypeScript': ['.ts', '.tsx'],
    'Python': ['.py', '.pyw'],
    'HTML': ['.html', '.htm'],
    'CSS': ['.css', '.scss', '.sass', '.less'],
    'SQL': ['.sql'],
    'Bash': ['.sh', '.bash', '.zsh'],
    'Java': ['.java'],
    'C#': ['.cs'],
    'C': ['.c', '.h']
  },

  frameworks: {
    'React': ['react', 'react-dom'],
    'Next.js': ['next'],
    'Angular': ['@angular/core'],
    'Node.js': ['express', 'fastify', 'koa', 'hapi'],
    'Express': ['express'],
    'Tailwind CSS': ['tailwindcss'],
    'Redux': ['redux', '@reduxjs/toolkit', 'react-redux'],
    'Prisma': ['prisma', '@prisma/client'],
    'Framer Motion': ['framer-motion'],
    'Electron': ['electron'],
    'React Native': ['react-native']
  },

  apis: {
    'GraphQL': ['graphql', '@apollo/client', 'apollo-server'],
    'WebSockets': ['ws', 'socket.io', 'socket.io-client'],
    'JWT': ['jsonwebtoken', 'jose'],
    'Bcrypt': ['bcrypt', 'bcryptjs']
  },

  databases: {
    'PostgreSQL': ['pg', 'postgres', '@prisma/client'],
    'MySQL': ['mysql', 'mysql2'],
    'MongoDB': ['mongodb', 'mongoose'],
    'Supabase': ['@supabase/supabase-js']
  },

  cloudDevops: {
    'Docker': ['Dockerfile', 'docker-compose.yml', 'docker-compose.yaml'],
    'GitHub Actions': ['.github/workflows'],
    'Vercel': ['vercel.json', '.vercel'],
    'AWS': ['aws-sdk', '@aws-sdk'],
    'Heroku': ['Procfile', 'heroku.yml']
  },

  testing: {
    'Vitest': ['vitest'],
    'Jest': ['jest'],
    'Cypress': ['cypress'],
    'Storybook': ['@storybook/react', 'storybook']
  },

  ai: {
    'OpenAI API': ['openai'],
    'Claude': ['@anthropic-ai/sdk'],
    'Claude Code': ['.claude'],
    'Codex': ['.codex'],
    'GitHub Copilot': ['.github/copilot'],
    'LangChain': ['langchain', '@langchain'],
    'TensorFlow': ['tensorflow', '@tensorflow/tfjs'],
    'PyTorch': ['torch', 'pytorch'],
    'Hugging Face': ['transformers', 'huggingface_hub'],
    'Groq API': ['groq-sdk']
  },

  tools: {
    'Git': ['.git', '.gitignore'],
    'Turborepo': ['turbo.json']
  }
};

const MANUAL_ONLY_SKILLS = [
  'REST APIs', 'OAuth 2.0', 'OWASP Security Practices',
  'Postman', 'Lighthouse', 'Google Analytics', 'Burp Suite', 'OWASP ZAP',
  'Notion', 'ClickUp', 'Trello', 'VS Code', 'Figma', 'Asana', 'HubSpot', 'Jira',
  'ChatGPT', 'Chatbot Development', 'AI Model Training', 'AI Ethics',
  'Design Driven Development', 'Agile Methodologies', 'Project Management',
  'UI/UX Principles', 'Accessibility Standards', 'SEO Best Practices',
  'GEO Targeting', 'Performance Optimization', 'Security Best Practices',
  'Technical Writing', 'Client Communication', 'Team Collaboration',
  'Time Management', 'Problem-Solving', 'Critical Thinking', 'Adaptability'
];

// ============================================================
// GITHUB API FUNCTIONS
// ============================================================

function ghApi(endpoint) {
  try {
    const result = execSync(`gh api ${endpoint} 2>/dev/null`, {
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024,
      stdio: ['pipe', 'pipe', 'pipe'] // Suppress stderr
    });
    return JSON.parse(result);
  } catch (e) {
    return null;
  }
}

function getReposFromActivityLogs() {
  const logsDir = 'logs/github-activity';
  const repos = new Set();

  if (!fs.existsSync(logsDir)) {
    console.log('   No activity logs found');
    return [];
  }

  const files = fs.readdirSync(logsDir).filter(f => f.endsWith('.json') && !f.includes('README'));

  for (const file of files) {
    try {
      const content = JSON.parse(fs.readFileSync(path.join(logsDir, file), 'utf8'));
      for (const entry of (content.entries || [])) {
        for (const commit of (entry.commits || [])) {
          if (commit.repository) {
            repos.add(commit.repository);
          }
        }
      }
    } catch (e) {
      console.error(`   Error reading ${file}:`, e.message);
    }
  }

  return Array.from(repos);
}

function fetchPackageJsonFromRepo(repo) {
  const data = ghApi(`repos/${repo}/contents/package.json`);
  if (data && data.content) {
    try {
      const decoded = Buffer.from(data.content, 'base64').toString('utf8');
      return JSON.parse(decoded);
    } catch (e) {
      return null;
    }
  }
  return null;
}

function fetchFileTreeFromRepo(repo) {
  const repoInfo = ghApi(`repos/${repo}`);
  if (!repoInfo) return [];

  const defaultBranch = repoInfo.default_branch || 'main';
  const tree = ghApi(`repos/${repo}/git/trees/${defaultBranch}?recursive=1`);

  if (tree && tree.tree) {
    return tree.tree.filter(t => t.type === 'blob').map(t => t.path);
  }
  return [];
}

function checkConfigFilesInRepo(repo) {
  const configs = {};
  const configChecks = {
    'Claude Code': '.claude',
    'Codex': '.codex',
    'Docker': 'Dockerfile',
    'GitHub Actions': '.github/workflows',
    'Vercel': 'vercel.json',
    'Turborepo': 'turbo.json'
  };

  for (const [skill, configPath] of Object.entries(configChecks)) {
    const data = ghApi(`repos/${repo}/contents/${configPath}`);
    if (data && !data.message) {
      configs[skill] = configPath;
    }
  }

  return configs;
}

// ============================================================
// ANALYSIS FUNCTIONS
// ============================================================

function analyzePackageJson(pkg, repoName, detected, now) {
  if (!pkg) return;

  const allDeps = {
    ...(pkg.dependencies || {}),
    ...(pkg.devDependencies || {})
  };

  const allChecks = {
    ...DETECTION_RULES.frameworks,
    ...DETECTION_RULES.apis,
    ...DETECTION_RULES.databases,
    ...DETECTION_RULES.testing,
    ...DETECTION_RULES.ai
  };

  for (const [skill, deps] of Object.entries(allChecks)) {
    if (!deps || !Array.isArray(deps)) continue;
    if (deps[0] && deps[0].startsWith('.')) continue;

    const found = deps.filter(d => allDeps[d]);
    if (found.length > 0) {
      if (!detected[skill]) {
        detected[skill] = {
          last_detected: now,
          detection_source: 'package.json',
          packages: found,
          repos: [repoName]
        };
      } else {
        if (!detected[skill].repos.includes(repoName)) {
          detected[skill].repos.push(repoName);
        }
      }
    }
  }
}

function analyzeFileTree(files, repoName, detected, now) {
  const extensions = {};

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext) {
      extensions[ext] = (extensions[ext] || 0) + 1;
    }
  }

  for (const [language, exts] of Object.entries(DETECTION_RULES.languages)) {
    const count = exts.reduce((sum, ext) => sum + (extensions[ext] || 0), 0);
    if (count > 0) {
      if (!detected[language]) {
        detected[language] = {
          last_detected: now,
          detection_source: 'file_extensions',
          file_count: count,
          repos: [repoName]
        };
      } else {
        detected[language].file_count = (detected[language].file_count || 0) + count;
        if (!detected[language].repos.includes(repoName)) {
          detected[language].repos.push(repoName);
        }
      }
    }
  }

  return extensions;
}

function detectLocalConfigFiles(detected, now) {
  const configChecks = {
    'Claude Code': ['.claude'],
    'Codex': ['.codex'],
    'GitHub Copilot': ['.github/copilot'],
    'Docker': ['Dockerfile', 'docker-compose.yml'],
    'GitHub Actions': ['.github/workflows'],
    'Vercel': ['vercel.json', '.vercel'],
    'Turborepo': ['turbo.json'],
    'Git': ['.git']
  };

  for (const [skill, paths] of Object.entries(configChecks)) {
    for (const p of paths) {
      if (fs.existsSync(p)) {
        detected[skill] = {
          last_detected: now,
          detection_source: 'config_file',
          path: p,
          repos: ['myself (local)']
        };
        break;
      }
    }
  }
}

function readCurrentSkills() {
  try {
    return JSON.parse(fs.readFileSync('profile/skills.json', 'utf8'));
  } catch (e) {
    console.error('Error reading skills.json:', e.message);
    return null;
  }
}

function generateReport(detected, currentSkills) {
  const report = {
    generated_at: new Date().toISOString(),
    skills_detected: Object.keys(detected).length,
    manual_only_count: MANUAL_ONLY_SKILLS.length,
    detected_skills: detected,
    suggestions: [],
    skill_decay_warnings: []
  };

  const allDetectableSkills = new Set([
    ...Object.keys(DETECTION_RULES.languages),
    ...Object.keys(DETECTION_RULES.frameworks),
    ...Object.keys(DETECTION_RULES.apis),
    ...Object.keys(DETECTION_RULES.databases),
    ...Object.keys(DETECTION_RULES.cloudDevops),
    ...Object.keys(DETECTION_RULES.testing),
    ...Object.keys(DETECTION_RULES.ai),
    ...Object.keys(DETECTION_RULES.tools)
  ]);

  const categories = [
    'programming languages', 'frameworks & libraries', 'apis & protocols',
    'databases', 'cloud & devops', 'testing & monitoring', 'tools', 'AI'
  ];

  for (const category of categories) {
    const skills = currentSkills[category];
    if (!skills) continue;

    for (const [skill, level] of Object.entries(skills)) {
      if (level === 'none') continue;
      if (MANUAL_ONLY_SKILLS.includes(skill)) continue;

      if (allDetectableSkills.has(skill) && !detected[skill]) {
        report.skill_decay_warnings.push({
          skill,
          current_level: level,
          category,
          reason: 'Not detected in any repository'
        });
      }
    }
  }

  for (const [skill, data] of Object.entries(detected)) {
    if (data.repos && data.repos.length >= 3) {
      report.suggestions.push({
        skill,
        suggestion: `Used in ${data.repos.length} repos - verify level is accurate`,
        repos: data.repos
      });
    }
  }

  return report;
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║       SKILL ANALYSIS PIPELINE - CROSS-REPO TEST            ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  const detected = {};
  const now = new Date().toISOString();

  // 1. Local config files
  console.log('\n📁 Checking local config files...');
  detectLocalConfigFiles(detected, now);
  console.log(`   Found ${Object.keys(detected).length} skills from local configs`);

  // 2. Get repos from activity logs
  console.log('\n📊 Reading activity logs for active repos...');
  const repos = getReposFromActivityLogs();
  console.log(`   Found ${repos.length} repos with recent activity`);

  // 3. Scan each repo
  console.log('\n🔍 Scanning repos via GitHub API...');
  for (const repo of repos) {
    process.stdout.write(`   • ${repo}... `);

    const pkg = fetchPackageJsonFromRepo(repo);
    if (pkg) {
      analyzePackageJson(pkg, repo, detected, now);
      process.stdout.write('📦 ');
    }

    const files = fetchFileTreeFromRepo(repo);
    if (files.length > 0) {
      analyzeFileTree(files, repo, detected, now);
      process.stdout.write(`📄(${files.length}) `);
    }

    const configs = checkConfigFilesInRepo(repo);
    for (const [skill, configPath] of Object.entries(configs)) {
      if (!detected[skill]) {
        detected[skill] = {
          last_detected: now,
          detection_source: 'config_file',
          path: configPath,
          repos: [repo]
        };
      } else if (!detected[skill].repos?.includes(repo)) {
        detected[skill].repos = detected[skill].repos || [];
        detected[skill].repos.push(repo);
      }
    }
    if (Object.keys(configs).length > 0) {
      process.stdout.write(`⚙️(${Object.keys(configs).length})`);
    }

    console.log('');
  }

  // 4. Read current skills
  console.log('\n📊 Reading current skills.json...');
  const currentSkills = readCurrentSkills();
  if (!currentSkills) {
    console.error('Could not read skills.json. Exiting.');
    process.exit(1);
  }

  // 5. Generate report
  const report = generateReport(detected, currentSkills);

  // 6. Summary
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                      ANALYSIS SUMMARY                       ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  console.log(`\n✅ Skills Detected: ${report.skills_detected}`);
  console.log(`📋 Manual-only Skills: ${report.manual_only_count}`);
  console.log(`⚠️  Skill Decay Warnings: ${report.skill_decay_warnings.length}`);
  console.log(`💡 Suggestions: ${report.suggestions.length}`);

  if (report.skill_decay_warnings.length > 0) {
    console.log('\n⚠️  SKILL DECAY WARNINGS:');
    for (const w of report.skill_decay_warnings) {
      console.log(`   • ${w.skill} (${w.current_level}) - ${w.category}`);
    }
  }

  if (report.suggestions.length > 0) {
    console.log('\n💡 SUGGESTIONS:');
    for (const s of report.suggestions) {
      console.log(`   • ${s.skill}: ${s.suggestion}`);
    }
  }

  console.log('\n📝 DETECTED SKILLS:');
  const sortedSkills = Object.entries(detected).sort((a, b) => {
    const aRepos = a[1].repos?.length || 0;
    const bRepos = b[1].repos?.length || 0;
    return bRepos - aRepos;
  });

  for (const [skill, data] of sortedSkills) {
    const repoCount = data.repos?.length || 1;
    const source = data.detection_source;
    console.log(`   • ${skill} (${source}, ${repoCount} repo${repoCount > 1 ? 's' : ''})`);
  }

  // 7. Write report
  const reportDir = 'logs/skill-analysis';
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const reportFile = path.join(reportDir, 'test-analysis.json');
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  console.log(`\n📄 Full report: ${reportFile}`);

  console.log('\n✨ Done!');
}

main().catch(console.error);
