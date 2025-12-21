# Repository TODO

Tasks to complete before this knowledge base is fully operational. Separate from business roadmaps and project TODOs.

## Philosophy: Automation First

**If it can be automated, it should be automated.** Manual "reminder" tasks are anti-patterns. Instead of reminders to do things, we build pipelines that actually do the work.

## Priority Legend
- 🔴 **P0** - Blocking. Must complete before using the repo effectively
- 🟠 **P1** - High value. Complete soon for major benefits
- 🟡 **P2** - Medium. Improves workflow but not critical
- 🟢 **P3** - Nice to have. Do when time permits

---

## Automation Pipeline Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DATA COLLECTION                              │
│  GitHub Activity Log (Daily) ──────────────────────────────────────▶│
│  LinkedIn Metrics (Manual/Extension) ─────────────────────────────▶│
│  Job Posting Monitor (TBD) ───────────────────────────────────────▶│
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         ANALYSIS & UPDATES                           │
│  ┌─────────────────────┐  ┌─────────────────────┐                   │
│  │ Skill Analysis      │  │ Project Status      │                   │
│  │ (Weekly)            │  │ Management (Weekly) │                   │
│  │ - Parse commits     │  │ - Stale detection   │                   │
│  │ - Update skills.json│  │ - Auto-move status  │                   │
│  │ - Create PR         │  │ - Create PR         │                   │
│  └─────────────────────┘  └─────────────────────┘                   │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         CONTENT GENERATION                           │
│  ┌─────────────────────┐  ┌─────────────────────┐                   │
│  │ LinkedIn Draft Gen  │  │ Monthly Assessment  │                   │
│  │ (Weekly)            │  │ (1st of month)      │                   │
│  │ - Parse activity    │  │ - Aggregate data    │                   │
│  │ - Apply pillars     │  │ - Generate report   │                   │
│  │ - Write drafts      │  │ - Create PR         │                   │
│  └─────────────────────┘  └─────────────────────┘                   │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         WEEKLY SUMMARY                               │
│  (Replaces "Task Reminder" - reports what automations DID)          │
│  - Skills updated this week                                         │
│  - Projects status changes                                          │
│  - Content drafts generated                                         │
│  - Action items that REQUIRE human input                            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔴 P0: Blocking Tasks - COMPLETE

All P0 tasks have been completed. AI tools configured, data complete.

<details>
<summary>View completed P0 tasks</summary>

### AI Tool Configuration
- [x] Create Gemini CLI configuration (`/.gemini/GEMINI.md`)
- [x] Review Codex configuration (moved to `~/.codex/prompts/`)
- [x] Define AI tool responsibilities (`AI_TOOLS.md`)

### Data Completeness
- [x] Fill in Codaissance design-system.json (colors, typography, golden ratio, glassmorphism)
- [x] Sync projects with strategy files

</details>

---

## 🟠 P1: Automation Pipelines

### Phase 1: Data Collection - COMPLETE

- [x] **GitHub Activity Logging**
  - Daily runs at 6 AM UTC
  - Pulls commits, PRs, issues via GraphQL API
  - Writes to `/logs/github-activity/YYYY-MM.json`
  - Supports manual trigger with daily/weekly/backfill modes

### Phase 2: Analysis & Auto-Updates

- [x] **Skill Analysis Pipeline** - COMPLETE
  - Weekly runs Monday at 7 AM UTC
  - Detects skills from file extensions, package.json, requirements.txt, config folders
  - Detection rules embedded in action (not skills.json) for clean separation
  - Writes analysis to `/logs/skill-analysis/latest-analysis.json`
  - Creates PR with skill decay warnings and usage suggestions
  - **Human Action**: Review and merge PR

- [x] **Project Status Automation** - COMPLETE
  - Weekly runs Tuesday at 7 AM UTC
  - Checks last commit date for each active project via GitHub API
  - 14+ days no commits → marks as stale
  - 30+ days no commits → suggests move to `planned.json`
  - Detects completion signals: v1.0 tag, `[SHIP]` in commit, all issues closed
  - Respects `blocked_by` field for planned projects
  - Creates PR with proposed changes (never commits directly)
  - **Human Action**: Review and merge PR

### Phase 3: Content Generation

- [x] **LinkedIn Post Generation Pipeline** - COMPLETE
  - Weekly runs Monday at 8 AM UTC (after activity log)
  - Uses GPT-4o-mini to generate posts based on:
    - Content pillars and calendar from `/linkedin/content-ideas.json`
    - GitHub activity from `/logs/github-activity/*.json`
    - Active projects from `/projects/active.json`
  - Outputs to `/linkedin/drafts/YYYY-MM-DD/`:
    - `posts.md` - All posts formatted for copy/paste
    - `metadata.json` - Full data with image suggestions (screenshot or AI-generated prompts)
  - Local test: `node tests/linkedin-post-generator/run.js`
  - Requires `OPENAI_API_KEY` secret in GitHub repo settings
  - **Human Action**: Review drafts, edit as needed, post manually

- [ ] **Monthly Assessment Generation**
  - **Trigger**: 1st of each month
  - **Input**: All logs, project status, skills changes
  - **Process**: Aggregate and analyze month's data
  - **Output**: PR with `/assessments/YYYY-MM-assessment.md`
  - **Human Action**: Review and merge PR

### Phase 4: Weekly Summary (NOT a reminder)

- [ ] **Weekly Automation Summary**
  - **Trigger**: Sunday evening
  - **Purpose**: Report what automations accomplished, not remind you to do things
  - **Content**:
    - Skills analysis results (if any changes proposed)
    - Project status changes detected
    - Content drafts generated and awaiting review
    - PRs awaiting merge
    - Items that genuinely require human input (e.g., LinkedIn metrics entry)
  - **Output**: GitHub Issue (auto-closes after 7 days)

---

## 🟡 P2: Job Search & Context Automation

- [x] **Context Snapshot Generator** - COMPLETE
  - Daily runs at 5 AM UTC (before other automations)
  - Outputs to `/logs/context/` with dated files (`YYYY-MM-DD.json`), `latest.json`, and `latest-compact.json`
  - Includes: folder tree, profile summary, project details, skill counts, automation schedules, available commands, key files
  - Historical tracking: dated snapshots allow analyzing repo evolution over time
  - Local test: `node tests/context-snapshot/run.js`
  - **Human Action**: Prepend to AI context for accurate repo awareness

- [ ] **Job Posting Monitor**
  - Scrape/monitor target company career pages
  - Filter against criteria in `JOB_SEARCH.md`
  - Write matches to `/job-applications/opportunities.json`
  - Notify on high-match roles

- [ ] **Interview Prep Auto-Generator**
  - Trigger: Calendar event with "interview" created
  - Research company (Gemini API)
  - Generate prep doc from profile data
  - Write to `/job-applications/prep/YYYY-MM-DD-company.md`

- [ ] **Application Response Tracker**
  - Monitor email for responses from applied companies
  - Auto-update application status in `applications.json`
  - Trigger interview prep when interview scheduled

---

## 🟢 P3: Integrations & Sync

- [ ] **GitHub Profile README Sync**
  - Trigger: Changes to `/github/README.md`
  - Auto-push to GitHub profile repo

- [ ] **Portfolio Site Auto-Deploy**
  - Trigger: Changes to profile data
  - Rebuild and deploy portfolio site

- [ ] **Certification Announcement Flow**
  - Trigger: New cert added to `education.json`
  - Generate LinkedIn post draft
  - Update portfolio
  - Create PR for GitHub profile README

- [ ] **LinkedIn Metrics Capture** (Browser Extension)
  - Build extension to export analytics
  - Write to `/linkedin/*-metrics.json`
  - Only manual step in the pipeline (LinkedIn has no API)

---

## Data & Content (Non-Automation)

- [x] **Content Calendar Structure** - COMPLETE
  - `/linkedin/content-ideas.json` - Full content strategy
  - Content pillars for all 3 accounts (personal, Codaissance, TamperTantrum)
  - Weekly calendar mapping days to pillars
  - Post structure rules (hook, body, CTA, hashtags)
  - Style constraints (150 words, 3 emojis, no em dashes)
  - Feeds into post generation pipeline

- [x] **Project Planning Template** - COMPLETE
  - `/projects/planning/PROJECT_PLANNING.md` - Full template
  - MVP and Post-MVP spec sections
  - `/projects/specs/{project}/` folder structure
  - Filled specs for dev-genesis, tempered-ui, mindtrace

- [ ] **Interview Question Bank**
  - `/job-applications/questions/` by category
  - Technical, behavioral, system design

---

## Folder Structure Needed

```
/logs/
  github-activity/           # ✅ Created - Daily activity logs
  skill-analysis/            # ✅ Created - Weekly skill reports
  project-status/            # ✅ Created - Weekly status reports
  context/                   # ✅ Created - Context snapshots
    YYYY-MM-DD.json          # Dated full snapshots (historical)
    latest.json              # Most recent full snapshot
    latest-compact.json      # Most recent compact snapshot

/linkedin/
  content-ideas.json         # ✅ Created - Pillars, calendar, post rules
  drafts/                    # ✅ Created - Generated post drafts
    YYYY-MM-DD/              # Week folder (Monday date)
      posts.md               # All posts formatted for copy/paste
      metadata.json          # Full data with image suggestions

/job-applications/
  postings/                  # Pending - Saved job postings
  resumes/                   # Pending - Generated tailored resumes
  prep/                      # Pending - Interview prep docs
  questions/                 # Pending - Interview question bank
  opportunities.json         # Pending - Auto-discovered jobs

/assessments/
  YYYY-MM-assessment.md      # Pending - Monthly assessments
  weekly/                    # Pending - Weekly summaries

/projects/
  planning/PROJECT_PLANNING.md  # ✅ Created - Planning template
  specs/{project}/README.md     # ✅ Created - Per-project specs

/tests/
  skill-analysis/run.js      # ✅ Created - Local test runner
  project-status/run.js      # ✅ Created - Local test runner
  context-snapshot/run.js    # ✅ Created - Local test runner
  linkedin-post-generator/run.js # ✅ Created - Local test runner
```

---

## Completed

### Repository Setup
- [x] Create repository structure
- [x] Set up profile data (skills, experience, education, contact)
- [x] Create business folders with full documentation
- [x] Set up job-applications system
- [x] Create ideas folder with validation framework
- [x] Create linkedin folder with metrics tracking
- [x] Create README.md
- [x] Update CLAUDE.md and CONTEXT.md

### AI Tool Configuration
- [x] Create Gemini CLI configuration
- [x] Create AI_TOOLS.md with tool responsibilities
- [x] Create Claude Code commands (`/generate-resume`, `/generate-post`, `/update-project`, `/prep-interview`, `/quick-check`)
- [x] Create Gemini CLI commands (`/research-company`, `/competitive-analysis`, `/market-research`, `/salary-research`)
- [x] Create Codex CLI commands
- [x] Create assessment command
- [x] Create log-application command

### Design Systems
- [x] Fill in Codaissance design-system.json (golden ratio, glassmorphism, Cosmic Renaissance theme)
- [x] Update TamperTantrum Labs design-system.json (golden ratio, glassmorphism/neumorphism)
- [x] Sync projects with strategy files

### Automation Pipelines (Dec 2025)
- [x] **GitHub Activity Logging** - Daily at 6 AM UTC
- [x] **Skill Analysis Pipeline** - Weekly Monday at 7 AM UTC, cross-repo scanning
- [x] **Project Status Automation** - Weekly Tuesday at 7 AM UTC, stale/completion detection
- [x] **Local test runners** - `tests/skill-analysis/run.js`, `tests/project-status/run.js`

### Content & Planning (Dec 2025)
- [x] **LinkedIn content strategy** - Pillars, calendar, post structure rules
- [x] **Project planning template** - MVP/Post-MVP specs, folder structure
- [x] **Project specs** - Filled specs for dev-genesis, tempered-ui, mindtrace
- [x] Expand automation/IDEAS.md
- [x] **Context Snapshot Generator** - Daily at 5 AM UTC, dated snapshots with historical tracking
- [x] **LinkedIn Post Generator** - Weekly Monday at 8 AM UTC, GPT-4o-mini powered drafts with image suggestions

---

## Notes

- **Automation first**: If you're doing something repeatedly, automate it
- **PRs over direct commits**: Automations should create PRs for review, not commit directly
- **Fail gracefully**: All automations should handle errors without breaking the repo
- **Idempotent**: Safe to re-run any automation
- See `automation/IDEAS.md` for detailed implementation notes
