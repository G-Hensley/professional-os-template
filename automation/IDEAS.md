# Automation Ideas

This file tracks automation ideas for this repository. The goal is to reduce manual effort and make maintaining this knowledge base as effortless as possible.

## Philosophy: Automation First

**If it can be automated, it should be automated.** Manual "reminder" tasks are anti-patterns. Instead of reminders to do things, we build pipelines that actually do the work and report what they accomplished.

## Priority Legend
- 🟢 **High** - High value, relatively easy to implement
- 🟡 **Medium** - Valuable but more complex
- 🔴 **Low** - Nice to have, complex or fragile

## Implementation Types
- **GitHub Action** - Runs on schedule or events within this repo
- **n8n Workflow** - External orchestration with AI APIs and integrations
- **Webhook** - Triggered by external events (email, calendar, etc.)
- **Browser Extension** - Manual trigger with automated data capture

---

## COMPLETED

### GitHub Activity Logging
**Status**: COMPLETE
**Type**: GitHub Action
**File**: `.github/workflows/github-activity-log.yml`

Automatically log GitHub activity across all repos to build a historical record.

**What it does**:
- Runs daily at 6 AM UTC
- Uses GitHub GraphQL API to pull commits, PRs, issues for user `G-Hensley`
- Writes to `/logs/github-activity/YYYY-MM.json`
- Supports manual trigger with daily/weekly/backfill modes
- Calculates monthly summary aggregations

**Feeds into**:
- Skill Analysis Pipeline (tech detection from commits)
- LinkedIn Post Generation (activity-based content)
- Monthly Assessment Generation
- Weekly Summary

---

## 🟢 High Priority

### LinkedIn Content Draft Generation
**Status**: Not Started
**Complexity**: Medium
**Value**: High
**Type**: n8n + Claude API

Generate weekly LinkedIn post drafts for all three accounts.

**Implementation**:
- n8n workflow runs Monday morning
- Reads from:
  - `/projects/active.json` (what you're building)
  - `/logs/github-activity/` (recent work)
  - `/business/*/marketing.json` (brand voice, themes)
  - `/linkedin/content-calendar.json` (scheduled topics)
- Calls Claude API to generate 3 drafts (personal, Codaissance, TamperTantrum Labs)
- Writes to `/linkedin/drafts/YYYY-MM-DD-{account}.md`
- You review, edit, and post manually

**Notes**:
- Full LinkedIn API automation is restrictive and breaks often
- Draft generation + manual posting is more reliable
- Could integrate with scheduling tools later

---

### Weekly Automation Summary
**Status**: Not Started
**Complexity**: Medium
**Value**: High
**Type**: GitHub Action

**NOT a task reminder** - this reports what the automations accomplished that week.

**Implementation**:
- GitHub Action runs Sunday evening (after all weekly automations complete)
- Creates a GitHub Issue summarizing:
  - Skills analysis results (proposed changes, if any)
  - Project status changes detected (stale, shipped, etc.)
  - LinkedIn drafts generated and awaiting review
  - PRs awaiting merge from automated pipelines
  - Items that genuinely require human input (e.g., LinkedIn metrics if extension not built)
- Issue auto-closes after 7 days

**Key Principle**: This summarizes automation OUTPUT, not tasks for humans to do manually.

---

### Project Status Automation
**Status**: Not Started
**Complexity**: Medium
**Value**: HIGH - Core automation pipeline
**Type**: GitHub Action

Automatically manage project lifecycle based on GitHub activity.

**Implementation**:
- GitHub Action runs weekly
- Reads `/projects/active.json` and checks each repo via GitHub API
- **Stale Detection**:
  - 14+ days no commits → add `stale: true` flag
  - 30+ days no commits → create PR to move to `planned.json`
- **Completion Detection**:
  - `[SHIP]` in commit message → trigger completion flow
  - v1.0/v1 tag pushed → suggest move to `completed.json`
  - All issues closed + recent activity → flag for review
- Creates PR with proposed changes (never commits directly)
- Human reviews and merges

**Thresholds**:
- 14 days: Add stale flag
- 30 days: Suggest move to planned.json
- Completion signals: tag, commit keyword, issue closure

---

### Monthly Assessment Automation
**Status**: Not Started
**Complexity**: Medium
**Value**: High
**Type**: GitHub Action + Claude API

Auto-generate monthly self-assessments.

**Implementation**:
- GitHub Action runs on 1st of each month
- Gathers data from:
  - GitHub activity logs
  - Project status changes
  - Job applications submitted
  - Skills updated
- Calls Claude API with assessment prompt
- Writes to `/assessments/YYYY-MM-assessment.md`
- Creates PR for review before merging

---

### Job Search Pipeline (3-Stage Automation)
**Status**: In Progress
**Complexity**: Medium-High
**Value**: High
**Type**: GitHub Actions + AI APIs

Full automated job search pipeline from discovery to application.

#### Stage 1: Job Discovery (Weekly - Sunday)
**Status**: Building
**File**: `.github/workflows/job-posting-monitor.yml`

Find and categorize job postings matching criteria.

**Implementation**:
- GitHub Action runs weekly (Sunday evening)
- Queries free job APIs:
  - Adzuna API (global aggregator, free tier)
  - Remotive API (remote-focused, no auth)
  - Himalayas API (remote jobs, free)
- Filters against `JOB_SEARCH.md` criteria:
  - Keywords: react, typescript, full-stack, node.js
  - Location: remote, US
  - Salary: $90k+ minimum
- AI clusters similar jobs into groups (jobs a single resume could cover)
- Writes to `/job-applications/opportunities/YYYY-MM-DD.json`:
  - Raw jobs with title, company, description, salary, url
  - Grouped by resume-type (e.g., "Full-Stack React", "Frontend TS", etc.)
- Creates GitHub Issue summarizing findings

#### Stage 2: Resume Generation (Weekly - Monday) - FUTURE
**Status**: Planned

Generate tailored resumes for each job cluster.

**Implementation**:
- Reads job clusters from Stage 1
- For each cluster (3-5 groups typically):
  - AI generates tailored resume emphasizing relevant skills
  - Outputs to `/job-applications/resumes/YYYY-MM-DD-{cluster}.md`
- Creates PR with generated resumes for review

#### Stage 3: Auto-Application (Weekly - Tuesday) - FUTURE
**Status**: Planned (Requires API research)

Automatically apply to jobs using generated resumes.

**Implementation**:
- Research which job boards have application APIs
- For jobs with API access:
  - Submit application with tailored resume
  - Log to `applications.json`
- For jobs without API:
  - Generate application package (resume + cover letter)
  - Create checklist for manual application
- Track success rates by cluster type

**Data Sources** (Free APIs):
- Adzuna API - https://developer.adzuna.com/
- Remotive API - https://remotive.com/api
- Himalayas API - https://himalayas.app/jobs/api
- Arbeitnow API - https://arbeitnow.com/api (Europe/Remote)

**NOT using** (too fragile):
- LinkedIn scraping (anti-bot detection)
- Indeed scraping (blocks aggressively)
- Custom career page scrapers (high maintenance)

---

### Daily Digest Agent
**Status**: Not Started
**Complexity**: Medium
**Value**: High
**Type**: n8n + Claude API

Morning summary of what changed and what needs attention.

**Implementation**:
- n8n workflow runs 7am daily
- Gathers:
  - GitHub commits from yesterday
  - Any new job opportunities found
  - Upcoming interviews (from calendar)
  - Stale projects needing attention
  - Goals progress check
- Calls Claude API to generate digest
- Sends via email or Slack

---

## 🟡 Medium Priority

### LinkedIn Metrics Scraping
**Status**: Not Started
**Complexity**: Medium
**Value**: High
**Type**: Browser Extension

Automatically capture LinkedIn analytics for all three accounts.

**Implementation Options**:

1. **Browser Extension** (Recommended)
   - Build custom extension to export analytics page data
   - Runs on-demand when viewing LinkedIn analytics
   - Writes to clipboard or downloads JSON
   - No API approval needed, no scraping risk

2. **Puppeteer/Playwright Script**
   - Headless browser automation
   - Login with credentials (store securely)
   - Navigate to analytics pages, extract data
   - Run weekly via GitHub Action with secrets
   - Risk: LinkedIn may detect and block

3. **Third-Party Tools**
   - Phantom Buster, Dux-Soup, etc.
   - Paid services, ToS gray area
   - May break with LinkedIn updates

**Data to Capture**:
- Profile views, search appearances (personal)
- Post impressions, engagement rates (all)
- Follower growth over time (all)
- SSI score (personal)

**Output**:
- Append to `/linkedin/*-metrics.json`
- Update `last_updated` in `profile.json`
- Generate weekly trends summary

**See Also**: `/linkedin/METRICS.md` for schema and manual tracking guide

---

### Resume Generation Pipeline
**Status**: Not Started
**Complexity**: Medium
**Value**: High
**Type**: n8n or Manual Command

Generate tailored resumes for specific job postings.

**Implementation**:
- Save job postings to `/job-applications/postings/company-role.md`
- Script reads posting + profile data
- AI generates tailored resume emphasizing relevant skills/experience
- Outputs to `/job-applications/resumes/company-role.md`
- Could also generate cover letter draft

**Note**: Also available as manual `/generate-resume` command

---

### Competitor Watch
**Status**: Not Started
**Complexity**: Medium
**Value**: Medium
**Type**: n8n + Gemini API

Monitor competitor activity and market changes.

**Implementation**:
- n8n workflow runs weekly
- Monitors:
  - Competitor websites for pricing/feature changes
  - Competitor social media for announcements
  - Product Hunt for new entrants
  - Hacker News mentions
- Calls Gemini API to summarize changes
- Updates `competitors.json` with new intel
- Alerts on significant changes (new features, pricing shifts)

---

### Interview Prep Auto-Generator
**Status**: Not Started
**Complexity**: Medium
**Value**: High
**Type**: Webhook (Calendar) + n8n + Claude API

Automatically generate interview prep when interview is scheduled.

**Implementation**:
- Webhook triggers when Google Calendar event with "interview" is created
- n8n workflow:
  1. Extracts company name from event
  2. Calls Gemini API to research company (recent news, culture, tech stack)
  3. Reads your profile data (skills, experience, projects)
  4. Calls Claude API to generate prep doc with:
     - Company overview
     - Role-specific talking points
     - Questions to ask
     - Your relevant experience highlights
  5. Writes to `/job-applications/prep/YYYY-MM-DD-company.md`
  6. Updates `interviews.json`
- Sends notification with link to prep doc

---

### Application Response Tracker
**Status**: Not Started
**Complexity**: Medium
**Value**: Medium
**Type**: Webhook (Email) + n8n

Automatically update application status from email responses.

**Implementation**:
- Gmail/Outlook webhook for emails from company domains in applications.json
- n8n workflow:
  1. Parses email for status keywords (interview, rejection, offer, etc.)
  2. Matches to application in `applications.json`
  3. Updates status field
  4. If interview scheduled, triggers Interview Prep workflow
- Reduces manual tracking burden

---

### Goal Progress Tracker
**Status**: Not Started
**Complexity**: Medium
**Value**: Medium
**Type**: n8n + Claude API (Weekly)

Weekly check on goal progress with recommendations.

**Implementation**:
- n8n workflow runs Sunday evening
- Reads goals from `business/*/goals.md`
- Gathers actual metrics:
  - Revenue from financials.json
  - GitHub activity for product progress
  - LinkedIn metrics for audience growth
- Calls Claude API to:
  - Compare actual vs targets
  - Identify at-risk goals
  - Suggest focus areas for next week
- Writes report to `/assessments/weekly/YYYY-WW.md`

---

### Skill Analysis Pipeline
**Status**: COMPLETE
**Type**: GitHub Action
**File**: `.github/workflows/skill-analysis.yml`

Automatically analyze repository to detect and track skills.

**What it does**:
- Runs weekly on Monday at 7 AM UTC
- Detects skills from:
  - File extensions (.ts, .py, .js, etc.)
  - package.json dependencies
  - requirements.txt (Python)
  - Config folders (.claude/, .codex/, .github/copilot)
- Detection rules embedded in action (keeps skills.json clean)
- Writes analysis to `/logs/skill-analysis/latest-analysis.json`
- Creates PR with:
  - Skill decay warnings (skills not detected)
  - Usage suggestions (heavily used skills)
- Human reviews and merges PR

**Skills NOT Detected** (manual only):
- External tools: Postman, Notion, Figma, Jira, etc.
- Soft skills: Communication, Time Management
- Methodologies: Agile, Project Management

---

### Project Dependency Tracking
**Status**: Not Started
**Complexity**: Medium
**Value**: Medium
**Type**: GitHub Action

Automatically track and visualize project dependencies.

**Implementation**:
- Read `blocked_by` fields from project files
- Generate dependency graph (Mermaid diagram)
- Update when project statuses change
- Identify critical path to shipping

---

### New Cert Announcements
**Status**: Not Started
**Complexity**: Low
**Value**: Medium
**Type**: n8n (Manual Trigger)

Generate announcement content when earning certifications.

**Implementation**:
- Trigger manually or when `education.json` updated
- n8n workflow:
  1. Reads new certification details
  2. Generates LinkedIn post draft (brand voice)
  3. Suggests portfolio updates
  4. Creates PR to update GitHub profile README
- Saves draft to `/linkedin/drafts/`

---

### Project Shipped Celebration
**Status**: Not Started
**Complexity**: Low
**Value**: Medium
**Type**: GitHub Action (on release) or n8n

Generate announcement when project ships.

**Implementation**:
- Triggers on GitHub release in tracked repos
- Or manual trigger when moving project to completed.json
- Generates:
  - LinkedIn post draft with launch story
  - Updates completed.json
  - Portfolio update suggestions
- Celebrates wins publicly!

---

## 🔴 Lower Priority / Complex

### LinkedIn API Integration
**Status**: Not Recommended (Yet)
**Complexity**: High
**Value**: Medium
**Type**: Direct API

Full automation of LinkedIn posting.

**Why Lower Priority**:
- LinkedIn API is restrictive (requires app approval)
- Rate limits and terms of service issues
- API changes frequently break integrations
- Draft generation + manual posting works fine

**Revisit When**: You have consistent content volume and manual posting becomes a bottleneck

---

### Calendar Integration
**Status**: Not Started
**Complexity**: High
**Value**: Low
**Type**: Google Calendar API

Sync reminders/deadlines with Google Calendar.

**Why Lower Priority**:
- Requires OAuth setup and token management
- External service dependency
- GitHub Issues/reminders may be sufficient

**Note**: Calendar webhooks for interview prep are handled via n8n, not full calendar sync

---

### Slack/Discord Notifications
**Status**: Not Started
**Complexity**: Medium
**Value**: Low
**Type**: Webhook

Push notifications to messaging apps.

**Why Lower Priority**:
- Adds external dependency
- Email notifications may be sufficient
- Easy to add later if needed

---

### Learning Resource Finder
**Status**: Not Started
**Complexity**: Medium
**Value**: Low
**Type**: n8n + Gemini API (Monthly)

Find learning resources for skills in your roadmap.

**Implementation**:
- Monthly n8n workflow
- Reads skills from `learning/roadmap.json`
- Searches for courses, tutorials, docs
- Writes suggestions to `learning/resources.json`

---

## Implementation Roadmap

### Phase 1: Data Collection (COMPLETE)
1. [x] GitHub Activity Logging - Daily data collection

### Phase 2: Analysis & Auto-Updates (IN PROGRESS)
2. [x] Skill Analysis Pipeline - Weekly skill detection and tracking
3. [ ] Project Status Automation - Stale detection, completion flows (NEXT)

### Phase 3: Content Generation
4. [ ] LinkedIn Post Generation - Activity → content drafts
5. [ ] Monthly Assessment Generation - Aggregate monthly reports
6. [ ] Weekly Automation Summary - Report what pipelines accomplished

### Phase 4: Job Search Automation
7. [ ] Job Posting Monitor - Scrape and filter opportunities
8. [ ] Interview Prep Auto-Generator - Calendar trigger → prep doc
9. [ ] Application Response Tracker - Email → status updates

### Phase 5: Integrations
10. [ ] GitHub Profile README Sync
11. [ ] Portfolio Site Auto-Deploy
12. [ ] LinkedIn Metrics Browser Extension

### Phase 6: Advanced
13. [ ] Goal Progress Tracker
14. [ ] Competitor Watch
15. [ ] Project Dependency Visualization

---

## Notes

- All automations should fail gracefully and not break the repo
- Prefer writing files over external integrations
- Keep actions idempotent (safe to re-run)
- Log automation runs for debugging
- Start simple, iterate based on actual usage
- n8n workflows should commit changes via GitHub API (not direct file writes)

---

## Ideas Backlog

Add new automation ideas here as they come up:

- [x] Auto-update GitHub profile README from this repo (see Profile README Sync)
- [x] Track LinkedIn post performance and log metrics (see LinkedIn Metrics Scraping)
- [x] Generate weekly "building in public" summary (see LinkedIn Draft Generation)
- [ ] Auto-create project planning docs from idea templates
- [x] Sync certifications to LinkedIn when added to education.json (see New Cert Announcements)
- [x] Job posting scraper for target companies (see Job Posting Monitor)
- [ ] Portfolio site auto-deploy when profile data changes
- [ ] Skill decay alerts (flag skills unused for 90+ days)
- [ ] Interview question bank generator from job descriptions
- [ ] Automated backup to cloud storage (Dropbox/Google Drive)
