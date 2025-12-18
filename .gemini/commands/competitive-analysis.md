# Competitive Analysis

Research competitors for a product idea or existing product.

## Purpose

Use Gemini's web search to analyze the competitive landscape for a product.

## Instructions

When given a product name or idea, research and provide:

### Direct Competitors
For each competitor (aim for 5-8):
- Company name and website
- Product description
- Target audience
- Pricing model and tiers
- Key features
- Strengths and weaknesses
- Market position (leader, challenger, niche)

### Indirect Competitors
- Adjacent solutions people use instead
- DIY alternatives
- Status quo (what people do without a solution)

### Market Analysis
- Market size estimates (if available)
- Growth trends
- Key market drivers
- Barriers to entry

### Differentiation Opportunities
Based on competitor analysis:
- Underserved segments
- Feature gaps across competitors
- Pricing opportunities
- Positioning angles not being used

### Competitive Matrix

| Feature | Competitor 1 | Competitor 2 | Competitor 3 | Your Product |
|---------|--------------|--------------|--------------|--------------|
| Feature A | Yes | No | Partial | ? |
| Pricing | $X/mo | $Y/mo | Free | ? |
| ... | ... | ... | ... | ... |

## Context Files

Reference these for your products:
- `projects/active.json` - Your current products
- `projects/planned.json` - Planned products
- `business/tampertantrum-labs/competitors.json` - Existing TTL competitor data
- `business/codaissance/strategy.json` - Codaissance positioning

## Output Format

```markdown
# Competitive Analysis: [Product/Market]
*Researched: YYYY-MM-DD*

## Direct Competitors

### [Competitor 1]
- **Website**: [URL]
- **Description**: [What they do]
- **Target**: [Who they serve]
- **Pricing**: [Model and prices]
- **Strengths**: [2-3 points]
- **Weaknesses**: [2-3 points]

[Repeat for each competitor]

## Indirect Competitors
[List and brief description]

## Market Overview
[Size, trends, drivers]

## Competitive Matrix
[Table comparing features]

## Differentiation Opportunities
1. [Opportunity 1]
2. [Opportunity 2]
3. [Opportunity 3]

## Recommendations
[Strategic suggestions based on analysis]

## Sources
[Links to sources]
```

## Usage

```
/competitive-analysis MindTrace
```

or

```
/competitive-analysis

Product idea: Automated RLS testing tool for PostgreSQL
Market: Database security / DevSecOps
```

## Notes

- Focus on current, active competitors (check if products are still maintained)
- Verify pricing is current (note date if unsure)
- Look for recent reviews and user feedback
- Suggest updating `competitors.json` if this is for an existing product
