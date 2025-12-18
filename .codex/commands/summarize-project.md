# Summarize Project

Generate a quick summary or pitch for a project.

## Context Files

- `projects/active.json` - Active projects
- `projects/planned.json` - Planned projects
- `projects/completed.json` - Completed projects

## Instructions

1. Find the project by name in project files
2. Generate the requested summary type

### Summary Types

**Elevator Pitch** (30 seconds)
- One sentence: what it is
- One sentence: who it's for
- One sentence: why it matters

**LinkedIn Summary** (for posts)
- Hook line
- Problem it solves
- Key differentiator
- Call to action

**Portfolio Entry**
- Project name and type
- Technologies used
- Problem and solution
- Key features or accomplishments
- Link to repo/demo

**Interview Answer**
- STAR format story about building it
- Technical challenges overcome
- Results or impact

## Output Format

```markdown
## [Project Name] - [Summary Type]

[Generated summary]

---
*Word count: X | Reading time: X seconds*
```

## Usage

```
summarize-project

Project: Dev Genesis
Type: elevator pitch
```

or

```
summarize-project MindTrace linkedin
```

or

```
summarize-project TemperedUI interview
```

## Notes

- Match the tone to the context (formal for portfolio, casual for LinkedIn)
- Use actual data from project files (don't make up features)
- Keep summaries concise and punchy
