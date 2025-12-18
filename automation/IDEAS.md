# Automation Ideas

This file tracks automation ideas for this repository. The goal is to reduce manual effort and make maintaining this knowledge base as effortless as possible.

## Priority Legend
- 🟢 **High** - High value, relatively easy to implement
- 🟡 **Medium** - Valuable but more complex
- 🔴 **Low** - Nice to have, complex or fragile

---

## 🟢 High Priority

### GitHub Activity Logging
**Status**: Not Started
**Complexity**: Low
**Value**: High

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

Generate daily LinkedIn post drafts for all three accounts.

**Implementation**:
- Script reads from:
  - `/projects/active.json` (what you're building)
  - `/logs/github-activity/` (recent work)
  - `/business/*/marketing.json` (brand voice, themes)
  - `/linkedin/content-calendar.json` (scheduled topics)
- AI generates 3 drafts (personal, Codaissance, TamperTantrum Labs)
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

## 🟡 Medium Priority

### LinkedIn Metrics Scraping
**Status**: Not Started
**Complexity**: Medium
**Value**: High

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

Generate tailored resumes for specific job postings.

**Implementation**:
- Save job postings to `/job-applications/postings/company-role.md`
- Script reads posting + profile data
- AI generates tailored resume emphasizing relevant skills/experience
- Outputs to `/job-applications/resumes/company-role.md`
- Could also generate cover letter draft

---

### Monthly Assessment Automation
**Status**: Not Started
**Complexity**: Medium
**Value**: Medium

Auto-generate monthly self-assessments.

**Implementation**:
- GitHub Action runs on 1st of each month
- Gathers data from:
  - GitHub activity logs
  - Project status changes
  - Job applications submitted
  - Skills updated
- Generates assessment prompt or calls AI API
- Writes to `/assessments/YYYY-MM-assessment.md`

---

### Skill Tracking from Activity
**Status**: Not Started
**Complexity**: High
**Value**: Medium

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

Automatically track and visualize project dependencies.

**Implementation**:
- Read `blocked_by` fields from project files
- Generate dependency graph (Mermaid diagram)
- Update when project statuses change
- Identify critical path to shipping

---

## 🔴 Lower Priority / Complex

### LinkedIn API Integration
**Status**: Not Recommended (Yet)
**Complexity**: High
**Value**: Medium

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

Sync reminders/deadlines with Google Calendar.

**Why Lower Priority**:
- Requires OAuth setup and token management
- External service dependency
- GitHub Issues/reminders may be sufficient

---

### Slack/Discord Notifications
**Status**: Not Started
**Complexity**: Medium
**Value**: Low

Push notifications to messaging apps.

**Why Lower Priority**:
- Adds external dependency
- GitHub notifications may be sufficient
- Easy to add later if needed

---

## Implementation Roadmap

### Phase 1: Foundation
1. GitHub Activity Logging
2. Weekly Task Reminders

### Phase 2: Content
3. LinkedIn Draft Generation
4. Stale Project Detection

### Phase 3: Career
5. Resume Generation Pipeline
6. Monthly Assessment Automation

### Phase 4: Advanced
7. Skill Tracking
8. Project Dependency Visualization

---

## Notes

- All automations should fail gracefully and not break the repo
- Prefer writing files over external integrations
- Keep actions idempotent (safe to re-run)
- Log automation runs for debugging
- Start simple, iterate based on actual usage

---

## Ideas Backlog

Add new automation ideas here as they come up:

- [ ] Auto-update GitHub profile README from this repo
- [x] Track LinkedIn post performance and log metrics (see LinkedIn Metrics Scraping)
- [ ] Generate weekly "building in public" summary
- [ ] Auto-create project planning docs from idea templates
- [ ] Sync certifications to LinkedIn when added to education.json
- [ ] Job posting scraper for target companies
- [ ] Portfolio site auto-deploy when profile data changes
