# GitHub Activity Logs

Automated daily logs of GitHub activity including commits, pull requests, and issues.

## Log Format

Each month gets a JSON file (`YYYY-MM.json`) with the following structure:

```json
{
  "month": "2025-12",
  "generated_at": "2025-12-18T06:00:00Z",
  "monthly_summary": {
    "total_commits": 45,
    "total_prs_created": 3,
    "total_prs_merged": 2,
    "total_issues_created": 5,
    "total_issues_closed": 4,
    "active_days": 15,
    "entries_count": 18
  },
  "entries": [
    {
      "date": "2025-12-18",
      "logged_at": "2025-12-18T06:00:00Z",
      "mode": "daily",
      "summary": {
        "total_commits": 5,
        "repos_with_commits": 2,
        "pull_requests_created": 1,
        "pull_requests_merged": 0,
        "issues_created": 0,
        "issues_closed": 1
      },
      "commits": [...],
      "pull_requests": [...],
      "issues": [...]
    }
  ]
}
```

## Schedule

- **Daily**: Runs at 6 AM UTC (1 AM EST) every day
- **Manual**: Can be triggered manually with `daily`, `weekly`, or `backfill` modes

## Usage

This data feeds into:
- Monthly assessments (`/assessment` command)
- LinkedIn post generation (`/generate-post` command)
- Quick status checks (`/quick-check` command)
- Content calendar planning

## Manual Trigger

To run manually:
1. Go to Actions tab in GitHub
2. Select "GitHub Activity Logging"
3. Click "Run workflow"
4. Choose mode (daily/weekly/backfill)
