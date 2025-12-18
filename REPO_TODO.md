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

- [ ] **Create Gemini CLI configuration** (`/.gemini/` or `GEMINI.md`)
  - Gemini excels at research, summarization, and web search
  - Create instructions file explaining repo structure
  - Define what Gemini should be used for vs Claude/Codex
  - Consider: research tasks, competitive analysis, market research, summarizing long docs

- [ ] **Review Codex configuration** (`/.codex/`)
  - Verify commands work properly (assessment, job-application)
  - Ensure Codex has proper context about repo structure
  - Consider: What tasks is Codex best suited for?

- [ ] **Define AI tool responsibilities**
  - Create `AI_TOOLS.md` documenting when to use each tool:
    - **Claude Code**: Complex edits, multi-file changes, code generation, assessments
    - **Codex**: Quick tasks, specific prompts, code review
    - **Gemini CLI**: Research, web search, summarization, competitive analysis
  - Include example prompts for each tool

### Data Completeness

- [ ] **Fill in Codaissance design-system.json**
  - Colors (primary, secondary, accent) - currently empty
  - Typography (fonts) - currently empty
  - TTL has full color palette; Codaissance needs same

- [ ] **Sync projects with strategy files**
  - Verify `projects/active.json` matches `business/codaissance/strategy.json` products list
  - Ensure project statuses are current

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

- [ ] **Create `/generate-resume` command**
  - Takes job posting as input
  - Generates tailored resume from profile data
  - Outputs to `/job-applications/resumes/`

- [ ] **Create `/generate-post` command**
  - Takes topic/account as input
  - Uses brand voice, personas, content pillars
  - Generates draft post for review

- [ ] **Create `/quick-check` command**
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

- [ ] **Create `/research-company` command** (Gemini)
  - Takes company name
  - Returns culture, tech stack, recent news
  - Useful for interview prep

- [ ] **Create `/competitive-analysis` command** (Gemini)
  - Takes product idea
  - Returns competitor landscape
  - Feeds into idea validation

---

## Folder/File Creation Needed

```
/.gemini/                    # Gemini CLI configuration
  instructions.md            # How Gemini should use this repo

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

AI_TOOLS.md                  # When to use each AI tool
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

---

## Notes

- Focus on P0 tasks first - they're blocking effective use of the repo
- Automation tasks can be done incrementally
- Commands should be created as needs arise
- Review this list monthly and reprioritize
