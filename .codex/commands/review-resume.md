# Review Resume

Quick review of a resume against a job posting or general best practices.

## Context Files

- `profile/skills.json` - Your skills for reference
- `profile/experience.json` - Your experience for reference
- `profile/RESUME_GENERATION.md` - Resume guidelines

## Instructions

1. Take the resume content (or read from `profile/resume.md`)
2. If job posting provided, compare against requirements
3. Provide quick feedback on:

### Content Review
- Does it highlight relevant skills?
- Are accomplishments quantified?
- Is experience presented effectively?
- Any gaps or red flags?

### Format Review
- Length appropriate (1-2 pages)?
- Clear sections and hierarchy?
- Consistent formatting?
- Easy to scan?

### ATS Optimization
- Keywords present?
- Standard section headers?
- Avoid graphics/tables that break parsing?

### Quick Fixes
- Top 3 improvements to make
- Specific line edits if obvious

## Output Format

```markdown
## Resume Review

**Overall**: [Good/Needs Work/Major Revision]

### Strengths
- [Point 1]
- [Point 2]

### Improvements Needed
1. [Most important fix]
2. [Second fix]
3. [Third fix]

### Job Fit (if posting provided)
- Match: [X]%
- Missing keywords: [List]
- Strongest selling points: [List]
```

## Usage

```
review-resume

[Paste resume content]
```

or with job posting:

```
review-resume

Resume: [paste or "use profile/resume.md"]
Job posting: [paste posting]
```
