# Repository TODO

Tasks to complete before this knowledge base is fully operational. Separate from business roadmaps and project TODOs.

## Priority Legend
- 🔴 **P0** - Blocking. Must complete before using the repo effectively
- 🟠 **P1** - High value. Complete soon for major benefits
- 🟡 **P2** - Medium. Improves workflow but not critical
- 🟢 **P3** - Nice to have. Do when time permits

---

## 🔴 P0: Blocking Tasks

### AI Tool Configuration

- [x] **Create Gemini CLI configuration** (`/.gemini/GEMINI.md`) ✅
  - Gemini excels at research, summarization, and web search
  - Created instructions file explaining repo structure
  - Defined what Gemini should be used for vs Claude/Codex

- [x] **Review Codex configuration** ✅
  - Moved prompts to correct global location (`~/.codex/prompts/`)
  - Added YAML frontmatter with descriptions and argument hints
  - Commands: `/prompts:assessment`, `/prompts:job-application`, `/prompts:review-resume`, `/prompts:summarize-project`

- [x] **Define AI tool responsibilities** (`AI_TOOLS.md`) ✅
  - Created comprehensive guide with quick reference table
  - Decision flowchart for choosing the right tool
  - Tool combination workflows for complex tasks

### Data Completeness

- [x] **Fill in Codaissance design-system.json** ✅
  - Added primary orange (#F37221) and gold (#FED700) from logo
  - Added accent blues: Spark Blue (#449DD6) and Deep Blue (#3B56A6)
  - Defined backgrounds, gradients, animations, shadows
  - Typography fonts left empty (user to specify)

- [x] **Sync projects with strategy files** ✅
  - Verified `projects/active.json` matches strategy (Dev Genesis, TemperedUI, MindTrace)
  - Verified `projects/planned.json` matches strategy (Vibiom, DevGauntlet, ScopeCreep, OpenOrbit, InstAPI)
  - Project statuses are current with proper blocked_by dependencies

---

## 🟠 P1: High Value Tasks

### Automation Foundation

- [ ] **Create GitHub Activity Logging action** (from automation/IDEAS.md)
  - Daily/weekly GitHub API pull for commits, PRs, issues
  - Write to `/logs/github-activity/YYYY-MM.json`
  - Foundation for content generation and assessments

- [ ] **Create Weekly Task Reminder action**
  - GitHub Action runs Monday morning
  - Creates Issue with maintenance checklist
  - Auto-closes after 7 days

- [ ] **Create LinkedIn Draft Generation script**
  - Read from projects, activity logs, marketing files
  - Generate 3 drafts (personal, Codaissance, TTL)
  - Write to `/linkedin/drafts/YYYY-MM-DD-{account}.md`

### Content & Planning

- [ ] **Create content calendar structure**
  - `/linkedin/content-calendar.json` - scheduled topics by week
  - Map content pillars to specific dates
  - Include posting frequency targets from marketing.json

- [ ] **Create project planning templates**
  - `/projects/planning/PROJECT_TEMPLATE.md`
  - Standard structure for new project specs
  - Include AI prompts for generating specs from ideas

### Commands & Prompts

- [x] **Create `/generate-resume` command** ✅
  - Takes job posting as input
  - Generates tailored resume from profile data
  - Outputs to `/job-applications/resumes/`

- [x] **Create `/generate-post` command** ✅
  - Takes topic/account as input
  - Uses brand voice, personas, content pillars
  - Generates draft post for review

- [x] **Create `/quick-check` command** ✅
  - Brief status check (vs full assessment)
  - Key metrics only, no deep analysis
  - Good for weekly reviews

---

## 🟡 P2: Medium Priority

### Automation Expansion

- [ ] **Create Stale Project Detection action**
  - Check repos in active.json for recent commits
  - Alert if no activity in 14+ days
  - Suggest moving to planned.json after 30 days

- [ ] **Create Monthly Assessment Automation**
  - Runs on 1st of each month
  - Gathers data from all sources
  - Generates `/assessments/YYYY-MM-assessment.md`

- [ ] **Create Resume Generation Pipeline**
  - Save job postings to `/job-applications/postings/`
  - Generate tailored resume + cover letter
  - Track which resume version sent to which company

### Data Enhancement

- [ ] **Add learning resources to skill categories**
  - Link courses, docs, tutorials to skills in skills.json
  - Makes skill improvement actionable

- [ ] **Create interview question bank**
  - `/job-applications/questions/` by category
  - Technical, behavioral, system design
  - Include answers/frameworks

- [ ] **Add project dependency visualization**
  - Generate Mermaid diagram from `blocked_by` fields
  - Show critical path to shipping

### Commands

- [ ] **Create `/idea-to-project` command**
  - Takes idea from ideas.json
  - Runs through validation framework
  - Generates project planning doc if validated

- [ ] **Create `/update-metrics` command**
  - Prompts for LinkedIn metrics
  - Updates appropriate metrics file
  - Calculates growth since last update

---

## 🟢 P3: Nice to Have

### Advanced Automation

- [ ] **LinkedIn Metrics Scraping** (browser extension approach)
  - Build extension to export analytics
  - Write to appropriate metrics files
  - See automation/IDEAS.md for details

- [ ] **Skill Tracking from Activity**
  - Parse GitHub commits for technologies used
  - Suggest skill level updates
  - Flag unused skills

- [ ] **Portfolio site auto-deploy**
  - Trigger deploy when profile data changes
  - Keep portfolio in sync with this repo

### Integration

- [ ] **GitHub README sync**
  - Auto-update GitHub profile README from `/github/README.md`
  - Trigger on changes to that file

- [ ] **Certification sync**
  - When education.json updated with new cert
  - Generate LinkedIn post draft
  - Update portfolio

### Research Commands

- [x] **Create `/research-company` command** (Gemini) ✅
  - Takes company name
  - Returns culture, tech stack, recent news
  - Useful for interview prep

- [x] **Create `/competitive-analysis` command** (Gemini) ✅
  - Takes product idea
  - Returns competitor landscape
  - Feeds into idea validation

---

## Folder/File Creation Needed

```
/logs/                       # Automation output
  github-activity/           # GitHub activity logs

/linkedin/
  drafts/                    # Generated post drafts
  content-calendar.json      # Scheduled content

/job-applications/
  postings/                  # Saved job postings
  resumes/                   # Generated tailored resumes
  questions/                 # Interview question bank

/projects/planning/
  PROJECT_TEMPLATE.md        # Standard project spec template
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
- [x] Create Gemini CLI configuration (`.gemini/GEMINI.md`)
- [x] Create AI_TOOLS.md with tool responsibilities and decision flowchart
- [x] Create Claude Code commands (`/generate-resume`, `/generate-post`, `/update-project`, `/prep-interview`, `/quick-check`)
- [x] Create Gemini CLI commands (`/research-company`, `/competitive-analysis`, `/market-research`, `/salary-research`)
- [x] Create Codex CLI commands (moved to `~/.codex/prompts/` with proper frontmatter)
- [x] Expand automation/IDEAS.md with n8n workflows and event-driven automations
- [x] Fill in Codaissance design-system.json with brand colors
- [x] Sync projects with strategy files

---

## Notes

- Focus on P0 tasks first - they're blocking effective use of the repo
- Automation tasks can be done incrementally
- Commands should be created as needs arise
- Review this list monthly and reprioritize
