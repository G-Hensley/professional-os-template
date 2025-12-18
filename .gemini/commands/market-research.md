# Market Research

Research market trends, opportunities, and industry insights.

## Purpose

Use Gemini's web search to gather market intelligence for strategic decisions.

## Instructions

When given a market or topic, research and provide:

### Market Overview
- Market definition and scope
- Current market size (with source)
- Growth rate and projections
- Key segments

### Trends
- Emerging trends (last 12-24 months)
- Technology shifts
- Buyer behavior changes
- Regulatory changes

### Key Players
- Market leaders and their share
- Rising challengers
- Recent entrants
- Notable exits or failures

### Opportunities
- Underserved segments
- Emerging needs
- Technology gaps
- Geographic expansion potential

### Threats & Challenges
- Market saturation concerns
- Regulatory risks
- Economic factors
- Technological disruption

### Relevance to Goals
Reference context files to assess fit:
- `business/codaissance/strategy.json` - Codaissance focus areas
- `business/tampertantrum-labs/strategy.json` - TTL focus areas
- `projects/planned.json` - Planned projects
- `ideas/` - Idea backlog

## Output Format

```markdown
# Market Research: [Market/Topic]
*Researched: YYYY-MM-DD*

## Market Overview
- **Size**: $X billion (YYYY)
- **Growth**: X% CAGR
- **Key segments**: [List]

## Current Trends
1. **[Trend 1]**: [Description and evidence]
2. **[Trend 2]**: [Description and evidence]
3. **[Trend 3]**: [Description and evidence]

## Key Players
| Company | Position | Notable |
|---------|----------|---------|
| [Name] | Leader | [Key fact] |

## Opportunities
[Bulleted list with reasoning]

## Threats & Challenges
[Bulleted list with reasoning]

## Relevance Assessment
- Fit with Codaissance: [High/Medium/Low] - [Why]
- Fit with TTL: [High/Medium/Low] - [Why]
- Recommended action: [Enter/Monitor/Ignore]

## Sources
[Links to sources used]
```

## Usage

```
/market-research developer tools 2025
```

or

```
/market-research

Topic: API security testing market
Focus: SMB segment opportunity
Timeframe: 2024-2026 projections
```

## Common Research Topics

- Developer tools and productivity
- API security and testing
- No-code/low-code platforms
- AI-assisted development
- DevSecOps tooling
- SaaS for educators
- Component libraries and design systems

## Notes

- Cite sources for all statistics
- Note when data is estimated vs reported
- Flag conflicting information from different sources
- Prioritize recent reports (2024-2025)
- Look for free snippets from paid reports (Gartner, Forrester, etc.)
