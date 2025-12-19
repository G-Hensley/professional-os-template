# Tests

Local test scripts for automation pipelines. These mirror the logic in GitHub Actions so you can iterate locally before deploying.

## Structure

```
tests/
├── skill-analysis/     # Skill Analysis Pipeline tests
│   └── run.js          # Test cross-repo skill detection
├── project-status/     # Project Status Automation tests
│   └── run.js          # Test project activity checking
└── README.md
```

## Usage

Run tests from the repository root:

```bash
# Skill Analysis Pipeline
node tests/skill-analysis/run.js

# Project Status Automation (dry run)
DRY_RUN=true node tests/project-status/run.js

# Project Status Automation (with file changes)
node tests/project-status/run.js
```

## Requirements

- Node.js 20+
- GitHub CLI (`gh`) authenticated
- Activity logs in `logs/github-activity/`
