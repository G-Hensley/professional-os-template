#!/usr/bin/env node

/**
 * Job Posting Monitor - Stage 1 of Job Search Pipeline
 *
 * Queries free job APIs, filters against criteria, and clusters similar jobs.
 *
 * Usage:
 *   node automation/scripts/job-posting-monitor.js
 *
 * Environment:
 *   DRY_RUN=true       - Preview without writing files
 *   ADZUNA_APP_ID      - Adzuna API app ID (optional, enhances results)
 *   ADZUNA_APP_KEY     - Adzuna API key (optional)
 *   OPENAI_API_KEY     - For AI job clustering (optional, uses simple clustering if not set)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO_ROOT = path.resolve(__dirname, '../..');
const DRY_RUN = process.env.DRY_RUN === 'true';

// Search configuration from JOB_SEARCH.md
const SEARCH_CONFIG = {
  keywords: [
    'react developer',
    'full stack engineer',
    'frontend engineer',
    'typescript developer',
    'node.js developer',
    'next.js developer',
    'software engineer react'
  ],
  minSalary: 90000,
  targetSalary: 120000,
  location: 'remote',
  excludeTerms: ['senior staff', 'principal', 'director', 'manager', 'lead architect', 'devops only', 'support engineer'],
  requiredTerms: [] // At least one of these in title/description
};

// ============================================================
// HTTP HELPERS
// ============================================================

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse JSON from ${url}: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

// ============================================================
// JOB API SOURCES
// ============================================================

async function fetchRemotiveJobs() {
  console.log('  Fetching from Remotive...');
  try {
    const data = await fetchJSON('https://remotive.com/api/remote-jobs?category=software-dev&limit=100');
    const jobs = (data.jobs || []).map(job => ({
      source: 'remotive',
      id: `remotive-${job.id}`,
      title: job.title,
      company: job.company_name,
      location: job.candidate_required_location || 'Remote',
      salary: parseSalary(job.salary),
      salaryRaw: job.salary || '',
      url: job.url,
      description: job.description?.slice(0, 500) || '',
      tags: job.tags || [],
      postedAt: job.publication_date
    }));
    console.log(`    Found ${jobs.length} jobs`);
    return jobs;
  } catch (e) {
    console.log(`    Error: ${e.message}`);
    return [];
  }
}

async function fetchHimalayasJobs() {
  console.log('  Fetching from Himalayas...');
  try {
    const data = await fetchJSON('https://himalayas.app/jobs/api?limit=100');
    const jobs = (data.jobs || []).map(job => ({
      source: 'himalayas',
      id: `himalayas-${job.id}`,
      title: job.title,
      company: job.companyName,
      location: job.location || 'Remote',
      salary: parseSalary(job.minSalary, job.maxSalary),
      salaryRaw: job.minSalary && job.maxSalary ? `$${job.minSalary}-$${job.maxSalary}` : '',
      url: job.applicationUrl || `https://himalayas.app/jobs/${job.id}`,
      description: job.description?.slice(0, 500) || '',
      tags: job.categories || [],
      postedAt: job.pubDate
    }));
    console.log(`    Found ${jobs.length} jobs`);
    return jobs;
  } catch (e) {
    console.log(`    Error: ${e.message}`);
    return [];
  }
}

async function fetchAdzunaJobs() {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  if (!appId || !appKey) {
    console.log('  Skipping Adzuna (no API credentials)');
    return [];
  }

  console.log('  Fetching from Adzuna...');
  const allJobs = [];

  for (const keyword of SEARCH_CONFIG.keywords.slice(0, 3)) { // Limit API calls
    try {
      const encodedKeyword = encodeURIComponent(keyword);
      const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${appId}&app_key=${appKey}&what=${encodedKeyword}&where=remote&results_per_page=20&salary_min=${SEARCH_CONFIG.minSalary}`;

      const data = await fetchJSON(url);
      const jobs = (data.results || []).map(job => ({
        source: 'adzuna',
        id: `adzuna-${job.id}`,
        title: job.title,
        company: job.company?.display_name || 'Unknown',
        location: job.location?.display_name || 'Remote',
        salary: parseSalary(job.salary_min, job.salary_max),
        salaryRaw: job.salary_min && job.salary_max ? `$${job.salary_min}-$${job.salary_max}` : '',
        url: job.redirect_url,
        description: job.description?.slice(0, 500) || '',
        tags: job.category?.tag ? [job.category.tag] : [],
        postedAt: job.created
      }));

      allJobs.push(...jobs);
      await sleep(500); // Rate limiting
    } catch (e) {
      console.log(`    Error fetching "${keyword}": ${e.message}`);
    }
  }

  // Deduplicate by URL
  const unique = [...new Map(allJobs.map(j => [j.url, j])).values()];
  console.log(`    Found ${unique.length} unique jobs`);
  return unique;
}

// ============================================================
// HELPERS
// ============================================================

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parseSalary(min, max) {
  if (typeof min === 'string') {
    // Parse salary string like "$100k-$150k" or "$120,000"
    const matches = min.match(/\$?([\d,]+)k?/gi);
    if (matches && matches.length >= 1) {
      const num = parseInt(matches[0].replace(/[$,k]/gi, ''), 10);
      return num > 1000 ? num : num * 1000;
    }
    return null;
  }
  if (typeof min === 'number') {
    return min;
  }
  return null;
}

function matchesKeywords(job) {
  const text = `${job.title} ${job.description}`.toLowerCase();
  const title = job.title.toLowerCase();

  // Check exclude terms in title only (descriptions often mention management for context)
  for (const term of SEARCH_CONFIG.excludeTerms) {
    if (title.includes(term.toLowerCase())) {
      return false;
    }
  }

  // Check for relevant tech OR relevant role titles
  const techTerms = ['react', 'typescript', 'javascript', 'node', 'next.js', 'nextjs', 'full stack', 'fullstack', 'frontend', 'front-end', 'web developer', 'software engineer', 'software developer'];
  const hasTech = techTerms.some(term => text.includes(term));

  return hasTech;
}

function meetsSalaryRequirement(job) {
  if (!job.salary) return true; // Include if salary unknown
  return job.salary >= SEARCH_CONFIG.minSalary;
}

function scoreJob(job) {
  let score = 0;
  const text = `${job.title} ${job.description}`.toLowerCase();

  // Salary score
  if (job.salary) {
    if (job.salary >= SEARCH_CONFIG.targetSalary) score += 30;
    else if (job.salary >= SEARCH_CONFIG.minSalary) score += 15;
  }

  // Tech stack match
  if (text.includes('react')) score += 20;
  if (text.includes('typescript')) score += 15;
  if (text.includes('next.js') || text.includes('nextjs')) score += 15;
  if (text.includes('node')) score += 10;
  if (text.includes('postgresql') || text.includes('postgres')) score += 10;
  if (text.includes('tailwind')) score += 5;

  // Role type
  if (text.includes('full stack') || text.includes('fullstack')) score += 10;
  if (text.includes('remote')) score += 10;

  // Negatives
  if (text.includes('senior staff') || text.includes('principal')) score -= 10;
  if (text.includes('contract') || text.includes('1099')) score -= 5;

  return score;
}

function clusterJobs(jobs) {
  // Simple clustering based on job characteristics
  const clusters = {
    'full-stack-react': {
      name: 'Full-Stack React/Node',
      description: 'Full-stack roles with React frontend and Node.js backend',
      jobs: []
    },
    'frontend-react': {
      name: 'Frontend React/TypeScript',
      description: 'Frontend-focused roles emphasizing React and TypeScript',
      jobs: []
    },
    'general-swe': {
      name: 'General Software Engineer',
      description: 'Software engineering roles with flexible tech requirements',
      jobs: []
    }
  };

  for (const job of jobs) {
    const text = `${job.title} ${job.description}`.toLowerCase();

    if ((text.includes('full stack') || text.includes('fullstack')) &&
        (text.includes('react') || text.includes('node'))) {
      clusters['full-stack-react'].jobs.push(job);
    } else if (text.includes('frontend') || text.includes('front-end') ||
               (text.includes('react') && !text.includes('node') && !text.includes('backend'))) {
      clusters['frontend-react'].jobs.push(job);
    } else {
      clusters['general-swe'].jobs.push(job);
    }
  }

  // Remove empty clusters
  return Object.fromEntries(
    Object.entries(clusters).filter(([_, cluster]) => cluster.jobs.length > 0)
  );
}

// ============================================================
// OUTPUT GENERATION
// ============================================================

function generateSummary(clusters, allJobs, filteredJobs) {
  const today = new Date().toISOString().slice(0, 10);

  let summary = `# Job Opportunities - ${today}\n\n`;
  summary += `**Found ${filteredJobs.length} matching jobs** (filtered from ${allJobs.length} total)\n\n`;

  summary += `## Search Criteria\n`;
  summary += `- Minimum salary: $${SEARCH_CONFIG.minSalary.toLocaleString()}\n`;
  summary += `- Location: Remote\n`;
  summary += `- Tech: React, TypeScript, Node.js, Next.js\n\n`;

  summary += `## Job Clusters\n\n`;

  for (const [clusterId, cluster] of Object.entries(clusters)) {
    summary += `### ${cluster.name} (${cluster.jobs.length} jobs)\n`;
    summary += `*${cluster.description}*\n\n`;

    // Top 5 jobs by score
    const topJobs = cluster.jobs
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    for (const job of topJobs) {
      summary += `- **${job.title}** at ${job.company}`;
      if (job.salaryRaw) summary += ` (${job.salaryRaw})`;
      summary += `\n  - Score: ${job.score} | Source: ${job.source}\n`;
      summary += `  - [Apply](${job.url})\n\n`;
    }

    if (cluster.jobs.length > 5) {
      summary += `*...and ${cluster.jobs.length - 5} more in this cluster*\n\n`;
    }
  }

  summary += `---\n\n`;
  summary += `## All Jobs by Score\n\n`;
  summary += `| Score | Title | Company | Salary | Source |\n`;
  summary += `|-------|-------|---------|--------|--------|\n`;

  const topAll = filteredJobs
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);

  for (const job of topAll) {
    summary += `| ${job.score} | [${job.title.slice(0, 40)}](${job.url}) | ${job.company.slice(0, 20)} | ${job.salaryRaw || 'N/A'} | ${job.source} |\n`;
  }

  summary += `\n---\n*Generated by Job Posting Monitor*\n`;

  return summary;
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║              JOB POSTING MONITOR                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);

  // Fetch from all sources
  console.log('\nFetching jobs from APIs...');
  const [remotiveJobs, himalayasJobs, adzunaJobs] = await Promise.all([
    fetchRemotiveJobs(),
    fetchHimalayasJobs(),
    fetchAdzunaJobs()
  ]);

  const allJobs = [...remotiveJobs, ...himalayasJobs, ...adzunaJobs];
  console.log(`\nTotal jobs fetched: ${allJobs.length}`);

  // Filter jobs
  console.log('\nFiltering jobs...');
  const filteredJobs = allJobs
    .filter(matchesKeywords)
    .filter(meetsSalaryRequirement)
    .map(job => ({ ...job, score: scoreJob(job) }))
    .sort((a, b) => b.score - a.score);

  console.log(`  Matching jobs: ${filteredJobs.length}`);

  // Cluster jobs
  console.log('\nClustering jobs...');
  const clusters = clusterJobs(filteredJobs);
  for (const [id, cluster] of Object.entries(clusters)) {
    console.log(`  ${cluster.name}: ${cluster.jobs.length} jobs`);
  }

  // Generate outputs
  const today = new Date().toISOString().slice(0, 10);
  const outputDir = path.join(REPO_ROOT, 'job-applications/opportunities');
  const jsonPath = path.join(outputDir, `${today}.json`);
  const mdPath = path.join(outputDir, `${today}.md`);
  const latestPath = path.join(outputDir, 'latest.json');

  const outputData = {
    generated_at: new Date().toISOString(),
    date: today,
    search_config: SEARCH_CONFIG,
    summary: {
      total_fetched: allJobs.length,
      total_matching: filteredJobs.length,
      clusters: Object.fromEntries(
        Object.entries(clusters).map(([id, c]) => [id, c.jobs.length])
      )
    },
    clusters,
    all_jobs: filteredJobs
  };

  const summaryMd = generateSummary(clusters, allJobs, filteredJobs);

  if (DRY_RUN) {
    console.log('\n[DRY RUN] Would write to:');
    console.log(`  - ${jsonPath}`);
    console.log(`  - ${mdPath}`);
    console.log(`  - ${latestPath}`);
    console.log('\n--- SUMMARY PREVIEW ---\n');
    console.log(summaryMd.slice(0, 2000));
    if (summaryMd.length > 2000) {
      console.log('\n... (truncated)');
    }
  } else {
    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(jsonPath, JSON.stringify(outputData, null, 2));
    fs.writeFileSync(mdPath, summaryMd);
    fs.writeFileSync(latestPath, JSON.stringify(outputData, null, 2));

    console.log(`\nFiles written:`);
    console.log(`  - ${jsonPath}`);
    console.log(`  - ${mdPath}`);
    console.log(`  - ${latestPath}`);
  }

  console.log('\n=== Job Posting Monitor Complete ===');

  // Return summary for GitHub Actions
  return {
    total: allJobs.length,
    matching: filteredJobs.length,
    clusters: Object.keys(clusters).length
  };
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
