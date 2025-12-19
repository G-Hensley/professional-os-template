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

- [ ] **Project Status Automation** - HIGH VALUE
  - **Trigger**: Weekly
  - **Input**: `projects/active.json`, GitHub API for each repo
  - **Process**:
    - Check last commit date for each active project
    - 14+ days stale → add `stale: true` flag
    - 30+ days stale → suggest move to `planned.json`
    - Detect completion signals: v1.0 tag, "shipped" in README, all issues closed
    - `[SHIP]` in commit message → trigger completion flow
  - **Output**: PR moving projects between status files
  - **Human Action**: Review and merge PR

### Phase 3: Content Generation

- [ ] **LinkedIn Post Generation Pipeline**
  - **Trigger**: Weekly (Monday, after activity log)
  - **Input**:
    - `/logs/github-activity/*.json` (what you built)
    - `/business/*/marketing.json` (brand voice, content pillars)
    - `/projects/active.json` (project context)
  - **Process**:
    - Identify post-worthy activity (shipped features, learning, milestones)
    - Match to content pillars
    - Generate 2-3 drafts per account using AI
  - **Output**: `/linkedin/drafts/YYYY-MM-DD-{account}-{topic}.md`
  - **Human Action**: Edit and post manually

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

- [ ] **Context Snapshot Generator**
  - **Trigger**: Daily or on-demand before AI sessions
  - **Output**: `/logs/context-snapshot.json`
  - **Contents**:
    - Current folder structure (auto-generated tree)
    - All projects with statuses from `active.json`, `planned.json`, `completed.json`
    - GitHub Actions workflows and schedules
    - Skills summary (count by level)
    - Last modified dates for key files
    - Stale flags or warnings
  - **Use Cases**:
    - Prepend to AI context for accurate repo awareness
    - Auto-update README.md structure section
    - Feed into Monthly Assessment generation
    - Diff against previous snapshot to track changes

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

- [ ] **Content Calendar Structure**
  - `/linkedin/content-calendar.json`
  - Map content pillars to weeks
  - Feeds into post generation pipeline

- [ ] **Project Planning Template**
  - `/projects/planning/PROJECT_TEMPLATE.md`
  - Standard structure for new project specs

- [ ] **Interview Question Bank**
  - `/job-applications/questions/` by category
  - Technical, behavioral, system design

---

## Folder Structure Needed

```
/logs/
  github-activity/           # Created

/linkedin/
  drafts/                    # Generated post drafts
  content-calendar.json      # Scheduled content

/job-applications/
  postings/                  # Saved job postings
  resumes/                   # Generated tailored resumes
  prep/                      # Interview prep docs
  questions/                 # Interview question bank
  opportunities.json         # Auto-discovered jobs

/assessments/
  YYYY-MM-assessment.md      # Monthly assessments
  weekly/                    # Weekly summaries

/projects/planning/
  PROJECT_TEMPLATE.md        # Standard project spec
```

---

## Completed

- [x] Create repository structure
- [x] Set up profile data (skills, experience, education, contact)
- [x] Create business folders with full documentation
- [x] Set up job-applications system
- [x] Create ideas folder with validation framework
- [x] Create linkedin folder with metrics tracking
- [x] Create assessment command
- [x] Create log-application command
- [x] Create README.md
- [x] Update CLAUDE.md and CONTEXT.md
- [x] Create Gemini CLI configuration
- [x] Create AI_TOOLS.md with tool responsibilities
- [x] Create Claude Code commands (`/generate-resume`, `/generate-post`, `/update-project`, `/prep-interview`, `/quick-check`)
- [x] Create Gemini CLI commands (`/research-company`, `/competitive-analysis`, `/market-research`, `/salary-research`)
- [x] Create Codex CLI commands
- [x] Expand automation/IDEAS.md
- [x] Fill in Codaissance design-system.json (including golden ratio, glassmorphism, Cosmic Renaissance theme)
- [x] Sync projects with strategy files
- [x] **Create GitHub Activity Logging action**

---

## Notes

- **Automation first**: If you're doing something repeatedly, automate it
- **PRs over direct commits**: Automations should create PRs for review, not commit directly
- **Fail gracefully**: All automations should handle errors without breaking the repo
- **Idempotent**: Safe to re-run any automation
- See `automation/IDEAS.md` for detailed implementation notes
