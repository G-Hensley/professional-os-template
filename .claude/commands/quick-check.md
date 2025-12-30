# Quick Check

A brief status check on key metrics and priorities. Lighter than a full assessment.

## Context Files

Quickly scan these files:
- `projects/active.json` - Current project statuses
- `job-applications/applications.json` - Recent applications
- `business/my-saas/goals.md` - Business goals
- `business/BUSINESS_GOALS.md` - High-level objectives

## Instructions

Generate a brief status report covering:

### 1. Active Projects Status
- List each active project with current status
- Flag any that seem stalled (no recent updates)
- Note upcoming due dates

### 2. Job Search Pulse
- Applications in last 7/30 days
- Pending responses
- Upcoming interviews

### 3. Goals Check
- Quick progress indicator for each major goal
- Any at-risk goals needing attention

### 4. This Week's Focus
- What should be the #1 priority this week?
- Any blockers to address?

### 5. Quick Wins
- 2-3 small tasks that would move things forward

## Output Format

Keep it concise - aim for a quick read (under 2 minutes):

```markdown
# Quick Check - YYYY-MM-DD

## Projects
- Project A: In Progress (due 2025-03-15) - on track
- Project B: In Progress - needs attention (no commits 5 days)
- Project C: In Progress - on track

## Job Search
- Applications (7d): 2 | (30d): 8
- Pending: 3 | Interviews scheduled: 1

## Goals
- Revenue: $0 / $1000 (0%) - at risk
- Ship 3 products: 0/3 - on track if Project A ships this month

## This Week
Focus: Ship Project A v1.0
Blocker: None identified

## Quick Wins
- [ ] Update Project A README
- [ ] Log pending application responses
- [ ] Schedule 30 min for Project B planning
```

## Usage

```
/quick-check
```

No additional input needed - just runs the check.

## When to Use

- Weekly reviews (every Monday)
- Before starting a work session
- When feeling overwhelmed (what should I focus on?)
- Quick pulse check between full assessments
