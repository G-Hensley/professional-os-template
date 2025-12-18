# Research Company

Research a company for job application or interview preparation.

## Purpose

Use Gemini's web search capabilities to gather current information about a company.

## Instructions

When given a company name, research and provide:

### Company Overview
- What the company does (products/services)
- Company size and stage (startup, growth, enterprise)
- Founding year and key milestones
- Headquarters location and remote policy

### Culture & Values
- Stated mission and values
- Glassdoor/Blind reviews summary
- Work-life balance reputation
- Diversity and inclusion initiatives

### Tech Stack
- Known technologies used
- Engineering blog posts or talks
- Open source contributions
- Technical challenges they've discussed

### Recent News
- Last 3-6 months of relevant news
- Funding rounds or acquisitions
- Product launches or pivots
- Leadership changes

### Interview Intel
- Reported interview process
- Common interview questions (from Glassdoor, Blind)
- Interview tips from candidates
- Red flags mentioned in reviews

### Fit Analysis
Compare findings against:
- `job-applications/JOB_SEARCH.md` - Your preferences and dealbreakers
- Check for remote policy alignment
- Salary range if available vs your target

## Output Format

```markdown
# Company Research: [Company Name]
*Researched: YYYY-MM-DD*

## Overview
[Summary]

## Culture & Values
[Findings]

## Tech Stack
[Technologies and technical culture]

## Recent News
- [Date]: [News item]
- [Date]: [News item]

## Interview Process
[What to expect]

## Fit Assessment
- Remote: [Yes/No/Hybrid]
- Salary range: [If found]
- Potential concerns: [Any red flags]
- Alignment with preferences: [High/Medium/Low]

## Sources
- [Links to sources used]
```

## Usage

```
/research-company Stripe
```

or

```
/research-company

Company: Vercel
Focus: engineering culture and interview process
```

## Notes

- Always cite sources for claims
- Focus on recent information (last 12 months)
- Flag if information seems outdated or unreliable
- Suggest saving output to `job-applications/research/` if valuable
