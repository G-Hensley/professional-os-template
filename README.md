# myself

Personal and business knowledge base — the single source of truth for professional profile, businesses, projects, and growth tracking.

## What This Is

A structured data repository designed to be consumed by AI tools (Claude Code, Codex, Gemini CLI) to assist with:

- **Resume generation** — Tailored resumes from skills, experience, and project data
- **Business strategy** — Marketing plans, personas, content from brand files
- **Project planning** — Specs and roadmaps from structured templates
- **Self-assessment** — Periodic evaluations across technical, business, and career areas
- **Content creation** — LinkedIn posts, website copy from design systems and brand voice

## Quick Start for AI Tools

| Tool | Config File | Best For |
|------|-------------|----------|
| Claude Code | `CLAUDE.md` | Code editing, file changes, slash commands |
| Gemini CLI | `.gemini/GEMINI.md` | Research, web search, summarization |
| Codex | `.codex/commands/` | Quick tasks, focused prompts |

**See [`AI_TOOLS.md`](AI_TOOLS.md) for detailed guidance on when to use each tool.**

## Available Commands

### Claude Code (`/.claude/commands/`)

| Command | Description |
|---------|-------------|
| `/assessment` | Run a comprehensive self-assessment across all areas |
| `/log-application` | Log a new job application |

### Codex (`/.codex/commands/`)

| Command | Description |
|---------|-------------|
| `assessment` | Assessment prompt template |
| `job-application` | Job application logging prompt |

## Key Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Instructions for Claude Code |
| `CONTEXT.md` | Repository overview for humans and AI |
| `profile/resume.md` | Current resume |
| `profile/RESUME_GENERATION.md` | Resume generation instructions |
| `business/BUSINESS_GOALS.md` | High-level business objectives |

## Businesses

### Codaissance
Product studio building developer tools and SaaS applications. Files in `business/codaissance/` include strategy, personas, brand voice, design system, marketing, goals, and financials.

### TamperTantrum Labs
AppSec consulting business. Files in `business/tampertantrum-labs/` include strategy, 7 personas, competitors, design system (with full color palette), marketing, goals, and financials.

<details>
<summary><strong>📁 Full Repository Structure</strong></summary>

```
myself/
├── CLAUDE.md                 # Claude Code instructions
├── CONTEXT.md                # Repository overview
├── README.md                 # This file
│
├── profile/                  # Professional data
│   ├── skills.json           # Technical skills (6-tier proficiency)
│   ├── experience.json       # Work history
│   ├── education.json        # Degrees and certifications
│   ├── contact.json          # Contact info and social links
│   ├── preferences.json      # Work style preferences
│   ├── resume.md             # Formatted resume
│   └── RESUME_GENERATION.md  # Resume generation guide
│
├── projects/                 # Project tracking
│   ├── active.json           # In development
│   ├── planned.json          # Planning/blocked
│   ├── completed.json        # Finished
│   └── planning/             # Planning templates
│
├── business/                 # Business documentation
│   ├── BUSINESS_GOALS.md     # High-level objectives
│   │
│   ├── codaissance/          # Product studio
│   │   ├── strategy.json     # Business model, positioning
│   │   ├── personas.json     # 4 personas + anti-personas
│   │   ├── brand.json        # Voice, tone, messages
│   │   ├── design-system.json# Colors, typography, specs
│   │   ├── marketing.json    # Content pillars, channels
│   │   ├── goals.md          # SMART goals
│   │   ├── financials.json   # Revenue tracking
│   │   └── assets/           # Logo files
│   │
│   └── tampertantrum-labs/   # AppSec consulting
│       ├── strategy.json     # Mission, values, services
│       ├── personas.json     # 7 target personas
│       ├── competitors.json  # Competitive analysis
│       ├── design-system.json# Full color palette, fonts
│       ├── marketing.json    # Content pillars, ideas
│       ├── goals.md          # SMART goals, financials
│       ├── financials.json   # Consulting tracking
│       └── assets/           # Logo files
│
├── job-applications/         # Career tracking
│   ├── JOB_SEARCH.md         # Target roles, preferences
│   ├── applications.json     # Applications submitted
│   └── interviews.json       # Interview tracking
│
├── learning/                 # Skill development
│   ├── roadmap.json          # Learning paths
│   └── completed.json        # Completed courses
│
├── ideas/                    # Idea capture
│   ├── IDEA_VALIDATION_REFINEMENT.md
│   ├── personal/ideas.json
│   └── business/
│       ├── codaissance/ideas.json
│       └── tampertantrum-labs/ideas.json
│
├── linkedin/                 # Social presence
│   ├── profile.json          # 3 account profiles
│   ├── METRICS.md            # Tracking guide
│   └── *-metrics.json        # Per-account metrics
│
├── github/                   # GitHub presence
│   └── README.md             # Profile README
│
├── assessments/              # Self-assessments
│
├── automation/               # Scripts and workflows
│   ├── IDEAS.md              # Automation roadmap
│   ├── github-actions/
│   └── scripts/
│
├── .claude/commands/         # Claude Code commands
│   ├── assessment.md
│   └── log-application.md
│
└── .codex/commands/          # Codex prompts
    ├── assessment.md
    └── job-application.md
```

</details>

## Data Conventions

- **Skill levels:** none → novice → apprentice → adept → expert → master
- **Dates:** `YYYY-MM-DD` format, `"Present"` for ongoing
- **Assessments:** `YYYY-MM-DD-assessment.md` or `YYYY-MM-DD-{area}-assessment.md`

## Owner

**Gavin Hensley** — Full-Stack Software Engineer
B.S. Software Engineering (WGU 2025) • React/Next.js/TypeScript • Portsmouth, OH (Remote)

---

*This repository is designed as a personal knowledge base. Feel free to fork and adapt the structure for your own use.*
