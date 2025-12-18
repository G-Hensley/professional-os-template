# Idea Validation & Refinement Guide

This document provides instructions for AI tools to validate and refine project ideas before they move to the planning stage.

## When to Use This Guide

Use this process when:
- A new idea is added to any `ideas.json` file
- An existing idea needs deeper validation before becoming a project
- You want to assess whether an idea is worth pursuing

## Validation Process

### 1. Market Research

**Objective**: Understand the market landscape and demand.

- Identify the target market size (TAM, SAM, SOM if applicable)
- Research current trends in the problem space
- Find evidence of demand (Reddit threads, Twitter discussions, forum posts, reviews)
- Identify potential customer segments
- Note any timing considerations (emerging trend vs saturated market)

### 2. Competitor Analysis

**Objective**: Understand existing solutions and positioning opportunities.

- List direct competitors (solve the same problem)
- List indirect competitors (solve adjacent problems)
- For each competitor, note:
  - Pricing model
  - Key features
  - Strengths and weaknesses
  - User complaints/gaps (from reviews, Reddit, etc.)
- Identify differentiation opportunities
- Assess barriers to entry

### 3. Problem Validation

**Objective**: Confirm the problem is real and worth solving.

- Articulate the problem in one clear sentence
- Identify who experiences this problem most acutely
- Quantify the pain (time lost, money lost, frustration level)
- Determine if people are actively seeking solutions
- Check if people are paying for existing solutions

### 4. Solution Validation

**Objective**: Ensure the proposed solution addresses the problem effectively.

- Does the solution directly address the core problem?
- Is the solution technically feasible with current skills?
- What's the unique value proposition?
- Are there simpler solutions that would work?

### 5. Effort vs Impact Assessment

**Objective**: Prioritize based on ROI.

| Factor | Score (1-5) |
|--------|-------------|
| Technical complexity | |
| Time to MVP | |
| Potential revenue | |
| Learning opportunity | |
| Personal interest | |
| Market demand | |

## Output: Project Scope Documents

After validation, generate two scope documents:

### Full Project Scope

Complete vision of the product:
- All planned features
- Full tech stack
- Monetization strategy
- Growth/marketing plan
- Long-term roadmap

### MVP Scope (Critical)

**The MVP must be ruthlessly minimal.** It should:
- Solve ONE core problem for ONE user type
- Be buildable in 1-2 weeks of focused work
- Have no more than 3-5 core features
- Skip: auth (if possible), payments, admin dashboards, analytics
- Use the simplest tech that works

**MVP Checklist**:
- [ ] Can be described in one sentence
- [ ] Core value is testable within first use
- [ ] No "nice to have" features included
- [ ] Launch timeline is realistic (< 2 weeks)
- [ ] Success metrics are defined

## Validation Output Template

```markdown
# [Idea Name] Validation Report

## Summary
- **Verdict**: Proceed / Needs refinement / Pass
- **Confidence**: High / Medium / Low
- **Priority**: 1-10

## Market Research
[Findings]

## Competitor Analysis
| Competitor | Pricing | Key Features | Gaps |
|------------|---------|--------------|------|
| | | | |

## Problem Statement
[One sentence]

## Target User
[Specific persona]

## Unique Value Proposition
[One sentence]

## MVP Definition
**Core feature**: [Single most important feature]
**Additional features**: [2-4 max]
**Out of scope for MVP**: [List what's NOT included]
**Tech stack**: [Simplest viable stack]
**Timeline**: [Realistic estimate]
**Success metric**: [How to know if MVP works]

## Full Project Vision
[Brief description of where this could go]

## Risks & Concerns
- [List potential issues]

## Next Steps
1. [Action items if proceeding]
```

## Notes

- Be honest about competition - "no competitors" usually means no market
- Avoid scope creep in MVP - the goal is to test the idea, not build the full product
- Personal/learning projects can skip market research but should still define clear MVP
- Ideas that fail validation aren't bad - they save time by failing fast
