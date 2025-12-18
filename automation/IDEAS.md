# Automation Ideas

This file tracks automation ideas for this repository. The goal is to reduce manual effort and make maintaining this knowledge base as effortless as possible.

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

## 🟢 High Priority

### GitHub Activity Logging
**Status**: Not Started
**Complexity**: Low
**Value**: High
**Type**: GitHub Action

Automatically log GitHub activity across all repos to build a historical record.

**Implementation**:
- GitHub Action runs daily/weekly
- Uses GitHub API to pull commits, PRs, issues for user `G-Hensley`
- Writes to `/logs/github-activity/YYYY-MM.json`
- Summarizes by repo, technology, and activity type

**Use Cases**:
- Feed for LinkedIn content generation
- Data for monthly assessments
- Resume/portfolio updates
- Track coding streaks and productivity patterns

---

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

### Weekly Task Reminders
**Status**: Not Started
**Complexity**: Low
**Value**: Medium
**Type**: GitHub Action

Automated reminders for weekly maintenance tasks.

**Implementation**:
- GitHub Action runs every Monday morning
- Creates a GitHub Issue with checklist:
  - [ ] Log any job applications
  - [ ] Update LinkedIn metrics
  - [ ] Capture new ideas
  - [ ] Review project statuses
- Issue auto-closes after 7 days or when completed

**Alternative**: Write to `/reminders/YYYY-WW.md` instead of Issues

---

### Stale Project Detection
**Status**: Not Started
**Complexity**: Low
**Value**: Medium
**Type**: GitHub Action

Flag projects that haven't had activity in a while.

**Implementation**:
- GitHub Action runs weekly
- Checks repos listed in `/projects/active.json`
- If no commits in 14+ days, creates alert
- Could update `status` field or create Issue

**Thresholds**:
- 14 days: Warning
- 30 days: Suggest moving to planned.json
- 60 days: Flag for review

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

### Job Posting Monitor
**Status**: Not Started
**Complexity**: Medium
**Value**: High
**Type**: n8n + Gemini API

Automatically find and filter job postings matching your criteria.

**Implementation**:
- n8n workflow runs daily
- Scrapes/monitors job boards (LinkedIn, Indeed, company career pages)
- Filters against criteria in `JOB_SEARCH.md`:
  - Remote required
  - Salary range
  - Tech stack match
  - Role type
- Calls Gemini API to score and summarize matches
- Writes new opportunities to `/job-applications/opportunities.json`
- Sends notification (email/Slack) for high-match roles

**Data Sources**:
- LinkedIn Jobs (via unofficial API or scraping)
- Indeed RSS feeds
- Target company career pages
- Hacker News Who's Hiring

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

### Skill Tracking from Activity
**Status**: Not Started
**Complexity**: High
**Value**: Medium
**Type**: GitHub Action + Claude API

Infer skill usage from GitHub commits.

**Implementation**:
- Parse commit diffs for technologies used
- Track which languages/frameworks appear in recent work
- Suggest skill level updates based on activity volume
- Flag skills that haven't been used in 6+ months

**Challenges**:
- Requires parsing code, not just commit messages
- Hard to infer "leveling up" vs just "using"

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

### Phase 1: GitHub Actions Foundation
1. GitHub Activity Logging
2. Weekly Task Reminders
3. Stale Project Detection
4. Profile README Sync

### Phase 2: n8n Core Workflows
5. Monthly Assessment Automation
6. LinkedIn Content Draft Generation
7. Daily Digest Agent

### Phase 3: Job Search Automation
8. Job Posting Monitor
9. Interview Prep Auto-Generator
10. Application Response Tracker

### Phase 4: Business Intelligence
11. Competitor Watch
12. Goal Progress Tracker
13. LinkedIn Metrics (browser extension)

### Phase 5: Advanced
14. Skill Tracking from Activity
15. Project Dependency Visualization
16. Learning Resource Finder

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
