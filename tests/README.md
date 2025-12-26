# Tests

Local test scripts for automation pipelines. These mirror the logic in GitHub Actions so you can iterate locally before deploying.

## Structure

```
tests/
├── context-snapshot/       # Context Snapshot tests
│   └── run.js
├── job-posting-monitor/    # Job Posting Monitor tests
│   └── run.js
├── linkedin-post-generator/# LinkedIn Post Generator tests
│   └── run.js
├── monthly-assessment/     # Monthly Assessment tests
│   └── run.js
├── project-status/         # Project Status Automation tests
│   └── run.js
├── skill-analysis/         # Skill Analysis Pipeline tests
│   └── run.js
├── weekly-summary/         # Weekly Summary tests
│   └── run.js
└── README.md
```

## Usage

Run tests from the repository root:

```bash
# Context Snapshot
DRY_RUN=true node tests/context-snapshot/run.js

# Job Posting Monitor
DRY_RUN=true node tests/job-posting-monitor/run.js

# LinkedIn Post Generator
DRY_RUN=true node tests/linkedin-post-generator/run.js

# Monthly Assessment
DRY_RUN=true node tests/monthly-assessment/run.js

# Project Status Automation
DRY_RUN=true node tests/project-status/run.js

# Skill Analysis Pipeline
node tests/skill-analysis/run.js

# Weekly Summary
DRY_RUN=true node tests/weekly-summary/run.js
```

## Environment Variables

- `DRY_RUN=true` - Run without writing files or creating issues/PRs
- `MONTH=YYYY-MM` - For monthly assessment, specify which month to assess

## Requirements

- Node.js 20+
- GitHub CLI (`gh`) authenticated
- Activity logs in `logs/github-activity/`
