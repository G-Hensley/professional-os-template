# Update Project

Update project status, details, or move between active/planned/completed.

## Context Files

- `projects/active.json` - Currently in development
- `projects/planned.json` - Planning or blocked
- `projects/completed.json` - Finished projects

## Instructions

1. **Identify the project** from user input (by name or partial match)

2. **Determine the update type**:
   - **Status change**: Update status field (e.g., "In Progress" to "On Hold")
   - **Move**: Move between files (planned → active, active → completed)
   - **Detail update**: Modify specific fields (description, technologies, etc.)
   - **Priority change**: Update priority number
   - **Blocker update**: Add/remove blocked_by

3. **Make the changes**:
   - Read the appropriate JSON file(s)
   - Apply the requested changes
   - Preserve all other data
   - Update `due_date` if relevant

4. **Confirm with user** before saving:
   - Show the before/after diff
   - Highlight what changed

5. **Save changes** to the appropriate file(s)

## Usage

### Update status
```
/update-project

Project: MindTrace
Status: On Hold
Reason: Focusing on Dev Genesis first
```

### Move to completed
```
/update-project

Project: Dev Genesis
Action: move to completed
Completion notes: Shipped v1.0, 50+ stars
```

### Update details
```
/update-project

Project: TemperedUI
Update: Add Storybook to technologies
New due date: 2026-02-01
```

### Update blockers
```
/update-project

Project: Vibiom
Remove blocker: Dev Genesis
Add note: Ready to start planning phase
```

## Project Schema Reference

```json
{
  "name": "Project Name",
  "repo_url": "https://github.com/...",
  "type": "SaaS Web Application",
  "description": "...",
  "technologies": ["Next.js", "TypeScript", ...],
  "monetization_strategy": "SaaS Subscription",
  "status": "In Progress | On Hold | Blocked | Not Started | Completed",
  "priority": 1-10,
  "due_date": "YYYY-MM-DD",
  "blocked_by": "Other Project Name",
  "problem": "...",
  "solution": "...",
  "target_audience": [...],
  "mission_statement": "...",
  "success_milestone": "...",
  "tagline": "..."
}
```

## Valid Status Values

- `In Progress` - Actively being worked on
- `On Hold` - Paused temporarily
- `Blocked` - Waiting on another project (use blocked_by)
- `Not Started` - Planned but not begun
- `Completed` - Finished and shipped
