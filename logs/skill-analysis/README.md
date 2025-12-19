# Skill Analysis Logs

Automated weekly analysis of skills detected from GitHub activity and repository files.

## How It Works

The Skill Analysis Pipeline runs weekly and detects skills from:

1. **File Extensions** - Languages like JavaScript (.js), TypeScript (.ts), Python (.py)
2. **package.json Dependencies** - Frameworks like React, Next.js, Tailwind CSS
3. **requirements.txt** - Python packages like TensorFlow, PyTorch
4. **Config Folders** - AI tools like .claude/, .codex/, .github/copilot

## Output

Each run generates `latest-analysis.json` with:

```json
{
  "generated_at": "2025-12-18T07:00:00Z",
  "skills_detected": 15,
  "detected_skills": {
    "TypeScript": {
      "last_detected": "2025-12-18T07:00:00Z",
      "detection_source": "file_extensions",
      "file_count": 42
    }
  },
  "skill_decay_warnings": [],
  "suggestions": []
}
```

## Schedule

- **Weekly**: Runs Monday at 7 AM UTC (after activity log updates)
- **Manual**: Can be triggered with optional dry_run mode

## Skills NOT Detected

Some skills cannot be detected from code and require manual tracking:

- External tools: Postman, Notion, Figma, Jira, etc.
- Soft skills: Communication, Time Management, Problem-Solving
- Methodologies: Agile, Project Management, UI/UX Principles

See the detection rules in `.github/workflows/skill-analysis.yml` for the complete mapping.
