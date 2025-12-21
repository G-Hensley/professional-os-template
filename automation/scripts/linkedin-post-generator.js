#!/usr/bin/env node

/**
 * LinkedIn Post Generation Pipeline
 *
 * Uses OpenAI GPT-4o-mini to generate LinkedIn post drafts
 * based on content pillars, calendar schedule, and recent activity.
 *
 * Usage:
 *   node automation/scripts/linkedin-post-generator.js
 *
 * Environment:
 *   OPENAI_API_KEY - Required for AI generation
 *   DRY_RUN=true   - Preview without writing files or calling API
 *   WEEK_OFFSET=0  - Generate for current week (negative for past weeks)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO_ROOT = path.resolve(__dirname, '../..');
const DRY_RUN = process.env.DRY_RUN === 'true';
const WEEK_OFFSET = parseInt(process.env.WEEK_OFFSET || '0', 10);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

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

function getWeekDates(offset = 0) {
  const now = new Date();
  now.setDate(now.getDate() + (offset * 7));

  // Get Monday of the week
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    monday,
    sunday,
    weekStart: monday.toISOString().split('T')[0],
    weekEnd: sunday.toISOString().split('T')[0]
  };
}

function getActivityForWeek(weekDates) {
  const activityDir = path.join(REPO_ROOT, 'logs/github-activity');
  const activity = {
    commits: [],
    repos: new Set(),
    totalCommits: 0,
    repoDetails: {}
  };

  if (!fs.existsSync(activityDir)) return activity;

  const files = fs.readdirSync(activityDir).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const data = readJSON(`logs/github-activity/${file}`);
    if (!data || !data.entries) continue;

    for (const entry of data.entries) {
      const entryDate = new Date(entry.date);
      if (entryDate >= weekDates.monday && entryDate <= weekDates.sunday) {
        for (const commit of (entry.commits || [])) {
          activity.commits.push({
            repo: commit.repository,
            count: commit.total_commits,
            dates: commit.dates
          });
          activity.repos.add(commit.repository);
          activity.totalCommits += commit.total_commits;

          // Track per-repo details
          if (!activity.repoDetails[commit.repository]) {
            activity.repoDetails[commit.repository] = { commits: 0, dates: [] };
          }
          activity.repoDetails[commit.repository].commits += commit.total_commits;
          activity.repoDetails[commit.repository].dates.push(...(commit.dates || []));
        }
      }
    }
  }

  activity.repos = Array.from(activity.repos);
  return activity;
}

// ============================================================
// OPENAI API
// ============================================================

async function callOpenAI(messages, maxTokens = 2000) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: maxTokens,
      temperature: 0.7
    });

    const options = {
      hostname: 'api.openai.com',
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          if (response.error) {
            reject(new Error(response.error.message));
          } else {
            resolve(response.choices[0].message.content);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// ============================================================
// POST GENERATION
// ============================================================

function getScheduleForDay(calendar, dayName) {
  const day = calendar.schedule[dayName.toLowerCase()];
  if (!day) return { personal: null, codaissance: null, tampertantrum: null };
  return day;
}

function getPillarById(pillars, pillarId) {
  return pillars.find(p => p.id === pillarId);
}

function buildSystemPrompt() {
  return `You are a LinkedIn content strategist helping generate authentic, engaging posts.

CRITICAL RULES:
1. Max 150 words, 1300 characters per post
2. Use 1-3 emojis per post for emphasis (never as bullets). Posts without emojis feel flat.
3. NEVER use em dashes (—) - use commas or periods instead
4. NEVER start with "I'm excited to announce" or similar
5. NEVER use questions as the first line (LinkedIn hides them in feed)
6. Use short paragraphs (1-3 sentences max)
7. Be specific with numbers, examples, details
8. One main idea per post

POST STRUCTURE:
- Hook: First line stops the scroll. Specific, curiosity-driven, or relatable.
- Body: 2-4 short paragraphs. Problem/context → insight/solution → takeaway.
- CTA: Question or engagement prompt at the end.
- Hashtags: 3-5 relevant hashtags after a line break.

TONE BY ACCOUNT:
- Personal (Gavin): Authentic, reflective, humble confidence
- Codaissance: Professional, transparent, technically credible
- TamperTantrum Labs: Friendly expert, empowering, not fear-driven

Respond ONLY with valid JSON matching the requested schema.`;
}

function buildPostPrompt(account, pillar, config, activity, projects, contentBank) {
  const accountContext = {
    personal: {
      name: 'Gavin Hensley',
      description: 'Full-stack developer, building Codaissance products, finishing WGU degree',
      hashtags: ['#buildinpublic', '#softwareengineering', '#webdevelopment', '#careergrowth', '#learntocode']
    },
    codaissance: {
      name: 'Codaissance',
      description: 'Product studio building developer tools with security and quality built-in',
      hashtags: ['#buildinpublic', '#saas', '#indiehacker', '#startup', '#productdevelopment']
    },
    tampertantrum: {
      name: 'TamperTantrum Labs',
      description: 'AppSec consulting for startups and indie developers. Developer-friendly security.',
      hashtags: ['#appsec', '#cybersecurity', '#devsecops', '#webappsecurity', '#securitytips']
    }
  };

  const ctx = accountContext[account];
  const bankEntry = contentBank.find(b => b.pillar === pillar.id);
  const ideas = bankEntry ? bankEntry.ideas : [];

  // Build activity summary
  let activitySummary = 'No recent GitHub activity data available.';
  if (activity.totalCommits > 0) {
    const topRepos = Object.entries(activity.repoDetails)
      .sort((a, b) => b[1].commits - a[1].commits)
      .slice(0, 3)
      .map(([repo, data]) => `${repo.split('/')[1]}: ${data.commits} commits`)
      .join(', ');
    activitySummary = `This week: ${activity.totalCommits} commits across ${activity.repos.length} repos. Top activity: ${topRepos}`;
  }

  // Build project context
  let projectContext = 'No active projects data.';
  if (projects && projects.length > 0) {
    projectContext = projects.map(p => `- ${p.name}: ${p.tagline || p.description || 'No description'}`).join('\n');
  }

  return `Generate a LinkedIn post for ${ctx.name} (${account} account).

PILLAR: ${pillar.name}
DESCRIPTION: ${pillar.description}
FOCUS FOR TODAY: ${config.focus}

CONTENT TYPES FOR THIS PILLAR:
${pillar.content_types ? pillar.content_types.map(t => `- ${t}`).join('\n') : 'General content'}

EXAMPLE HOOKS (for inspiration, don't copy exactly):
${pillar.example_hooks ? pillar.example_hooks.slice(0, 3).map(h => `- "${h}"`).join('\n') : 'N/A'}

CONTENT IDEAS FROM BANK (pick one or create your own):
${ideas.slice(0, 5).map(i => `- ${i}`).join('\n')}

RECENT ACTIVITY:
${activitySummary}

ACTIVE PROJECTS:
${projectContext}

SUGGESTED HASHTAGS: ${ctx.hashtags.join(', ')}

Respond with JSON in this exact format:
{
  "hook": "The attention-grabbing first line",
  "body": "The main content with proper line breaks (use \\n\\n for paragraph breaks)",
  "cta": "The call-to-action or question",
  "hashtags": ["hashtag1", "hashtag2", "hashtag3"],
  "image": {
    "type": "screenshot" or "ai-generated",
    "description": "What the image should show",
    "ai_prompt": "If ai-generated, the DALL-E prompt. If screenshot, set to null"
  }
}

IMAGE GUIDANCE:
- For technical/code content: suggest screenshot (terminal, code editor, dashboard)
- For conceptual/philosophical content: suggest ai-generated with a clean, modern, minimalist prompt
- AI prompts should specify: style (isometric, flat, minimalist), colors, "no text", clean/modern`;
}

async function generatePost(account, pillar, config, date, dayName, activity, projects, contentBank) {
  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildPostPrompt(account, pillar, config, activity, projects, contentBank);

  const response = await callOpenAI([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ]);

  // Parse JSON response
  let parsed;
  try {
    // Handle potential markdown code blocks
    let jsonStr = response.trim();
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```json?\n?/, '').replace(/\n?```$/, '');
    }
    parsed = JSON.parse(jsonStr);
  } catch (e) {
    console.error(`  Failed to parse response for ${account}/${pillar.id}:`, e.message);
    console.error('  Raw response:', response.substring(0, 200));
    return null;
  }

  // Build full post text
  const fullPost = `${parsed.hook}

${parsed.body}

${parsed.cta}

${parsed.hashtags.map(h => h.startsWith('#') ? h : `#${h}`).join(' ')}`;

  return {
    id: `${dayName.toLowerCase()}-${account}-${pillar.id}`,
    account,
    day: dayName,
    date,
    pillar: pillar.name,
    pillar_id: pillar.id,
    content: {
      hook: parsed.hook,
      body: parsed.body,
      cta: parsed.cta,
      hashtags: parsed.hashtags
    },
    full_post: fullPost,
    image: parsed.image
  };
}

async function generateAllPosts(contentStrategy, activity, projects) {
  const posts = [];
  const weekDates = getWeekDates(WEEK_OFFSET);
  const calendar = contentStrategy.calendar;
  const accounts = contentStrategy.accounts;
  const contentBank = contentStrategy.content_bank;

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const dayName = dayNames[i];
    const schedule = getScheduleForDay(calendar, day);

    // Calculate date for this day
    const postDate = new Date(weekDates.monday);
    postDate.setDate(postDate.getDate() + i);
    const dateStr = postDate.toISOString().split('T')[0];

    for (const [account, config] of Object.entries(schedule)) {
      if (!config) continue;

      const accountData = accounts[account];
      if (!accountData) continue;

      const pillar = getPillarById(accountData.pillars, config.pillar);
      if (!pillar) continue;

      console.log(`  Generating: ${dayName} - ${account} - ${pillar.name}...`);

      // Filter projects for account
      const accountProjects = account === 'codaissance'
        ? projects.filter(p => p.type !== 'Personal')
        : projects;

      const accountBank = contentBank[account] || [];

      try {
        const post = await generatePost(
          account,
          pillar,
          config,
          dateStr,
          dayName,
          activity,
          accountProjects,
          accountBank
        );

        if (post) {
          posts.push(post);
          console.log(`    ✓ Generated`);
        }
      } catch (e) {
        console.error(`    ✗ Error: ${e.message}`);
      }

      // Small delay to avoid rate limits
      await new Promise(r => setTimeout(r, 500));
    }
  }

  return posts;
}

function generateMarkdown(posts, weekDates) {
  let md = `# LinkedIn Posts - Week of ${weekDates.weekStart}\n\n`;
  md += `Generated: ${new Date().toISOString()}\n\n`;
  md += `---\n\n`;

  // Group by day
  const byDay = {};
  for (const post of posts) {
    if (!byDay[post.day]) byDay[post.day] = [];
    byDay[post.day].push(post);
  }

  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  for (const day of dayOrder) {
    const dayPosts = byDay[day];
    if (!dayPosts || dayPosts.length === 0) continue;

    md += `## ${day} (${dayPosts[0].date})\n\n`;

    for (const post of dayPosts) {
      const accountLabel = {
        personal: '👤 Personal (Gavin)',
        codaissance: '🏢 Codaissance',
        tampertantrum: '🔐 TamperTantrum Labs'
      }[post.account];

      md += `### ${accountLabel} - ${post.pillar}\n\n`;
      md += `\`\`\`\n${post.full_post}\n\`\`\`\n\n`;

      // Image suggestion
      if (post.image) {
        md += `**Image:** ${post.image.type === 'screenshot' ? '📷' : '🎨'} `;
        md += `${post.image.type.toUpperCase()}\n`;
        md += `> ${post.image.description}\n`;
        if (post.image.ai_prompt) {
          md += `>\n> **AI Prompt:** ${post.image.ai_prompt}\n`;
        }
        md += `\n`;
      }

      md += `---\n\n`;
    }
  }

  return md;
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║         LINKEDIN POST GENERATION PIPELINE                   ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Week offset: ${WEEK_OFFSET}`);

  // Check for API key
  if (!DRY_RUN && !OPENAI_API_KEY) {
    console.error('\nError: OPENAI_API_KEY environment variable is required');
    console.error('Set it with: export OPENAI_API_KEY=your-key-here');
    process.exit(1);
  }

  const weekDates = getWeekDates(WEEK_OFFSET);
  console.log(`\nGenerating for week: ${weekDates.weekStart} to ${weekDates.weekEnd}`);

  // Load content strategy
  const contentStrategy = readJSON('linkedin/content-ideas.json');
  if (!contentStrategy) {
    console.error('Error: Could not read linkedin/content-ideas.json');
    process.exit(1);
  }

  // Load active projects
  const activeProjects = readJSON('projects/active.json');
  const projects = activeProjects ? Object.entries(activeProjects).map(([key, data]) => ({
    key,
    ...data
  })) : [];

  // Get activity for the week
  console.log('\n📊 Analyzing GitHub activity...');
  const activity = getActivityForWeek(weekDates);
  console.log(`  Commits: ${activity.totalCommits}`);
  console.log(`  Repos: ${activity.repos.length}`);
  if (activity.repos.length > 0) {
    console.log(`  Active: ${activity.repos.slice(0, 3).map(r => r.split('/')[1]).join(', ')}`);
  }

  // Count expected posts
  const calendar = contentStrategy.calendar;
  let expectedPosts = 0;
  for (const day of ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']) {
    const schedule = calendar.schedule[day];
    if (schedule) {
      expectedPosts += Object.values(schedule).filter(v => v !== null).length;
    }
  }
  console.log(`\n📝 Expected posts this week: ${expectedPosts}`);

  if (DRY_RUN) {
    console.log('\n[DRY RUN] Would generate posts with OpenAI API');
    console.log('Set DRY_RUN=false to actually generate posts');

    // Show what would be generated
    console.log('\nPosts that would be generated:');
    for (const day of ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']) {
      const schedule = calendar.schedule[day];
      if (!schedule) continue;
      for (const [account, config] of Object.entries(schedule)) {
        if (!config) continue;
        console.log(`  ${day}: ${account} - ${config.pillar}`);
      }
    }
    return;
  }

  // Generate posts
  console.log('\n🤖 Generating posts with GPT-4o-mini...');
  const posts = await generateAllPosts(contentStrategy, activity, projects);
  console.log(`\n✅ Generated ${posts.length} posts`);

  // Create output directory
  const outputDir = path.join(REPO_ROOT, 'linkedin/drafts', weekDates.weekStart);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write metadata.json
  const metadata = {
    week_start: weekDates.weekStart,
    week_end: weekDates.weekEnd,
    generated_at: new Date().toISOString(),
    activity_summary: {
      total_commits: activity.totalCommits,
      active_repos: activity.repos,
      repo_details: activity.repoDetails
    },
    post_count: posts.length,
    posts
  };

  const metadataPath = path.join(outputDir, 'metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  console.log(`\n📄 Written: ${metadataPath}`);

  // Write posts.md
  const markdown = generateMarkdown(posts, weekDates);
  const mdPath = path.join(outputDir, 'posts.md');
  fs.writeFileSync(mdPath, markdown);
  console.log(`📄 Written: ${mdPath}`);

  // Summary
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                        SUMMARY                              ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  const byAccount = {};
  for (const post of posts) {
    byAccount[post.account] = (byAccount[post.account] || 0) + 1;
  }

  console.log('Posts by account:');
  for (const [account, count] of Object.entries(byAccount)) {
    console.log(`  ${account}: ${count}`);
  }

  console.log(`\nOutput: linkedin/drafts/${weekDates.weekStart}/`);
  console.log('  - posts.md (formatted for copy/paste)');
  console.log('  - metadata.json (full data with image suggestions)');

  console.log('\n✨ Done!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
