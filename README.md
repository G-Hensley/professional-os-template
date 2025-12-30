# Professional OS

Your career as code. A version-controlled knowledge base that makes AI tools genuinely useful for job searching, project management, and personal branding.

## Why This Exists

AI coding assistants are powerful, but they lack context about *you*. Professional OS solves this by giving them structured access to your skills, experience, projects, and goals — enabling things like:

- **One-command resume generation** tailored to specific job postings
- **Automated job search** that finds and filters opportunities while you sleep
- **Project tracking** that detects stale repos and generates status updates
- **Interview prep** generated automatically when meetings are scheduled
- **LinkedIn content** drafted from your actual work and projects

## Quick Start

```bash
# 1. Use this template (click "Use this template" on GitHub)
# 2. Clone your new repo
git clone https://github.com/YOUR_USERNAME/your-repo-name.git
cd your-repo-name

# 3. Update your profile
# Edit: profile/contact.json, profile/skills.json, profile/experience.json
```

**Full setup guide:** [`docs/SETUP.md`](docs/SETUP.md)

## What's Included

### AI Commands (Claude Code, Codex, Gemini)

| Command | What It Does |
|---------|--------------|
| `/generate-resume` | Creates tailored resume from a job posting |
| `/log-application` | Logs application with status tracking |
| `/prep-interview` | Generates company research + talking points |
| `/assessment` | Monthly self-evaluation across all areas |
| `/generate-post` | Drafts LinkedIn content from recent work |

### Automated Pipelines (GitHub Actions)

| Pipeline | Schedule | Output |
|----------|----------|--------|
| GitHub Activity Log | Daily | `logs/github-activity/` |
| Skill Analysis | Weekly | Detects skills from your repos |
| Project Status | Weekly | Flags stale projects, suggests updates |
| Weekly Summary | Sundays | Progress report across all areas |
| Monthly Assessment | 1st of month | Comprehensive self-assessment |

### Dashboard (Hosted)

Visualize your data at [professional-os.app](https://professional-os.app):
- Connect your repo via GitHub OAuth
- View profile, skills, projects, and job applications
- Track automation history
- Free tier available, Pro features for subscribers

## Repository Structure

```
professional-os/
├── profile/           # Your professional identity (skills, experience, education)
├── projects/          # Project tracking (active, planned, completed)
├── business/          # Business docs (strategy, personas, marketing)
├── job-applications/  # Applications, interviews, job search criteria
├── linkedin/          # Profile data, content ideas, metrics
├── learning/          # Skill roadmap and completed courses
├── logs/              # Automation outputs
├── .github/workflows/ # Automation pipelines
└── .claude/commands/  # AI slash commands
```

<details>
<summary>Full structure with all files</summary>

See [`docs/SCHEMA.md`](docs/SCHEMA.md) for complete field definitions.

</details>

## Documentation

| Doc | Purpose |
|-----|---------|
| [`docs/SETUP.md`](docs/SETUP.md) | Installation and configuration |
| [`docs/SCHEMA.md`](docs/SCHEMA.md) | JSON field definitions |
| [`docs/CUSTOMIZATION.md`](docs/CUSTOMIZATION.md) | How to add your data |

## Data Conventions

- **Skill levels:** `none` → `novice` → `apprentice` → `adept` → `expert` → `master`
- **Dates:** `YYYY-MM-DD` format, `"Present"` for ongoing
- **Project status:** `In Progress`, `Planned`, `Blocked`, `Completed`

---

**This is a template.** Click "Use this template" and start tracking your career.
