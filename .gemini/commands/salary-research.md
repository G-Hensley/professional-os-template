# Salary Research

Research salary ranges and compensation data for specific roles.

## Purpose

Use Gemini's web search to gather current compensation data for job search decisions.

## Instructions

When given a role and parameters, research and provide:

### Salary Ranges
- Base salary range (25th, 50th, 75th, 90th percentiles)
- By experience level (junior, mid, senior, staff, principal)
- By location (or remote adjustment)
- By company size/stage

### Total Compensation
- Equity/stock options typical ranges
- Bonus structures
- Sign-on bonuses
- Other benefits (401k match, health, etc.)

### Data Sources
- Levels.fyi data
- Glassdoor reports
- LinkedIn salary insights
- Blind salary threads
- Compensation surveys

### Market Context
- Current hiring demand for this role
- Salary trend direction (up/down/flat)
- Remote vs on-site differential
- Hot skills commanding premiums

### Your Position
Reference context to assess:
- `job-applications/JOB_SEARCH.md` - Your target salary
- `profile/skills.json` - Your skill set
- `profile/experience.json` - Your experience level

## Output Format

```markdown
# Salary Research: [Role Title]
*Researched: YYYY-MM-DD*

## Base Salary Ranges (Annual, USD)

### By Experience
| Level | 25th | 50th (Median) | 75th | 90th |
|-------|------|---------------|------|------|
| Junior (0-2 yrs) | $X | $X | $X | $X |
| Mid (2-5 yrs) | $X | $X | $X | $X |
| Senior (5-8 yrs) | $X | $X | $X | $X |
| Staff (8+ yrs) | $X | $X | $X | $X |

### By Company Type
- FAANG/Big Tech: $X-$X
- Well-funded Startup: $X-$X
- Mid-size Company: $X-$X
- Small Startup/Agency: $X-$X

### Remote Adjustment
- SF/NYC on-site: +X%
- Remote (US): Base
- Remote (LCOL): -X% to -X%

## Total Compensation

### Equity
- Big Tech: $X-$X/year (RSUs)
- Startup: X-X% over 4 years

### Bonuses
- Target: X-X% of base
- Sign-on: $X-$X typical

## Market Context
[Current demand, trends, premium skills]

## Your Target Assessment
Based on your profile:
- Experience level: [X years]
- Relevant skills: [List]
- Location: [Remote/Location]
- **Suggested range**: $X-$X base
- **Reasoning**: [Why this range]

## Negotiation Notes
- [Key leverage points]
- [What to ask for]
- [Red flags in offers]

## Sources
[Links with dates]
```

## Usage

```
/salary-research Senior Frontend Engineer
```

or

```
/salary-research

Role: Full-Stack Software Engineer
Experience: 3 years
Location: Remote (Ohio based)
Company type: Startup
Skills focus: React, TypeScript, Node.js
```

## Notes

- Prioritize 2024-2025 data (salaries change quickly)
- Note if data is for US only or includes international
- levels.fyi is most reliable for tech roles
- Account for total comp, not just base
- Your target: $90k-$120k+ based on JOB_SEARCH.md
