# Tests

Local test scripts for automation pipelines. These mirror the logic in GitHub Actions so you can iterate locally before deploying.

## Structure

```
tests/
├── skill-analysis/     # Skill Analysis Pipeline tests
│   └── run.js          # Test cross-repo skill detection
└── README.md
```

## Usage

Run tests from the repository root:

```bash
# Skill Analysis Pipeline
node tests/skill-analysis/run.js
```

## Requirements

- Node.js 20+
- GitHub CLI (`gh`) authenticated
- Activity logs in `logs/github-activity/`
