# Professional OS

Personal and business knowledge base — a version-controlled, AI-ready framework for managing your professional identity.

## What This Is

A structured data repository designed to be consumed by AI tools (Claude Code, Codex, Gemini CLI) to assist with:

- **Resume generation** — Tailored resumes from skills, experience, and project data
- **Business strategy** — Marketing plans, personas, content from brand files
- **Project planning** — Specs and roadmaps from structured templates
- **Self-assessment** — Periodic evaluations across technical, business, and career areas
- **Content creation** — LinkedIn posts, website copy from design systems and brand voice
- **Automation** — GitHub Actions pipelines that do the work, not just remind you
- **Dashboard** — Next.js app for visualizing all repo data in one place

## Quick Start

1. Clone or use this template
2. Update `profile/` files with your information
3. Run the dashboard: `cd dashboard && pnpm install && pnpm dev`
4. Use slash commands like `/generate-resume` to leverage AI automation

See [`docs/SETUP.md`](docs/SETUP.md) for detailed instructions.

## Automation Philosophy

**If it can be automated, it should be automated.**

| Pipeline | Schedule |
|----------|----------|
| Daily Date Update | Daily 12:05 AM UTC |
| Context Snapshot | Daily 5 AM UTC |
| GitHub Activity Log | Daily 6 AM UTC |
| Skill Analysis | Weekly Mon 7 AM UTC |
| Project Status | Weekly Tue 7 AM UTC |
| Weekly Summary | Weekly Sun 6 PM UTC |
| Monthly Assessment | Monthly 1st 9 AM UTC |

## Available Commands

### Claude Code (`/.claude/commands/`)

| Command | Description |
|---------|-------------|
| `/assessment` | Run a comprehensive self-assessment |
| `/log-application` | Log a new job application |
| `/generate-resume` | Create a tailored resume from a job posting |
| `/generate-post` | Create a LinkedIn post draft |
| `/update-project` | Update project status or details |
| `/prep-interview` | Generate interview preparation notes |
| `/quick-check` | Brief status check on key metrics |

## Key Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Instructions for Claude Code |
| `profile/resume.md` | Current resume |
| `profile/RESUME_GENERATION.md` | Resume generation instructions |
| `business/BUSINESS_GOALS.md` | High-level business objectives |
| `docs/SETUP.md` | Getting started guide |
| `docs/SCHEMA.md` | JSON field definitions |
| `docs/CUSTOMIZATION.md` | How to customize with your data |

<details>
<summary><strong>Full Repository Structure</strong></summary>

```
professional-os/
├── CLAUDE.md                 # Claude Code instructions
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
│   ├── planning/             # Planning templates
│   └── specs/                # Project specifications
│
├── business/                 # Business documentation
│   ├── BUSINESS_GOALS.md     # High-level objectives
│   └── my-saas/              # Example business folder
│       ├── strategy.json     # Business model, positioning
│       ├── personas.json     # Target audience
│       ├── marketing.json    # Content pillars, channels
│       ├── design-system.json# Colors, typography
│       ├── financials.json   # Revenue tracking
│       ├── goals.md          # Business goals
│       └── roadmap.md        # Product roadmap
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
│   └── business/my-saas/ideas.json
│
├── linkedin/                 # Social presence
│   ├── profile.json          # Profile data
│   ├── METRICS.md            # Tracking guide
│   ├── content-ideas.json    # Content calendar
│   └── personal-metrics.json # Metrics snapshots
│
├── github/                   # GitHub presence
│   └── README.md             # Profile README
│
├── assessments/              # Self-assessments
│
├── logs/                     # Automation output
│   ├── context/              # Daily snapshots
│   ├── github-activity/      # Activity logs
│   └── weekly-summary/       # Weekly reports
│
├── docs/                     # Documentation
│   ├── SETUP.md              # Getting started
│   ├── SCHEMA.md             # Field definitions
│   └── CUSTOMIZATION.md      # Customization guide
│
├── .github/workflows/        # GitHub Actions
│
├── .claude/commands/         # Claude Code commands
│
└── dashboard/                # Next.js dashboard app
    ├── app/                  # App Router pages
    ├── src/components/       # React components
    ├── src/hooks/            # TanStack Query hooks
    └── lib/                  # Utilities
```

</details>

## Data Conventions

- **Skill levels:** none → novice → apprentice → adept → expert → master
- **Dates:** `YYYY-MM-DD` format, `"Present"` for ongoing
- **Assessments:** `YYYY-MM-DD-assessment.md`

## Documentation

- [`docs/SETUP.md`](docs/SETUP.md) — Getting started guide
- [`docs/SCHEMA.md`](docs/SCHEMA.md) — JSON field definitions
- [`docs/CUSTOMIZATION.md`](docs/CUSTOMIZATION.md) — How to customize

---

*This is a template repository. Fork and customize with your own professional data.*
