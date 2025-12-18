# Interview Prep

Generate comprehensive interview preparation notes for a specific company/role.

## Context Files

- `profile/skills.json` - Your technical skills
- `profile/experience.json` - Your work history
- `projects/active.json` - Current projects to discuss
- `projects/completed.json` - Completed projects
- `job-applications/applications.json` - Application details (if logged)
- `job-applications/interviews.json` - Previous interviews (for patterns)
- `job-applications/JOB_SEARCH.md` - Your preferences and priorities

## Instructions

1. **Gather information** from user:
   - Company name
   - Role title
   - Interview type (phone screen, technical, behavioral, system design, final)
   - Interviewer name/role (if known)
   - Any specific topics mentioned

2. **Research the company** (use web search or ask user for details):
   - Company mission and values
   - Recent news or announcements
   - Tech stack (if available)
   - Company culture
   - Interview process reputation

3. **Generate prep document** with:

   **Company Overview**
   - What they do, mission, recent news
   - Why you're interested (genuine reasons)

   **Role Analysis**
   - Key responsibilities
   - Required skills vs your skills
   - Potential challenges in the role

   **Your Pitch**
   - 30-second intro tailored to this role
   - 3 key experiences to highlight
   - Projects that demonstrate relevant skills

   **STAR Stories**
   - 3-5 prepared stories using STAR format
   - Matched to likely behavioral questions
   - Quantified results where possible

   **Technical Prep** (if technical interview)
   - Key concepts to review
   - Likely coding patterns
   - System design considerations

   **Questions to Ask**
   - About the role (3-5)
   - About the team (2-3)
   - About the company (2-3)
   - Red flag questions (1-2)

   **Logistics**
   - Interview time and format
   - What to have ready
   - Backup plans

4. **Save prep doc** to `job-applications/prep/YYYY-MM-DD-{company}.md`

5. **Update interviews.json** with the scheduled interview

## Usage

```
/prep-interview

Company: Stripe
Role: Senior Frontend Engineer
Interview type: Technical phone screen
Date: 2025-01-15
Interviewer: Engineering Manager
Topics mentioned: React, TypeScript, system design
```

Or minimal:
```
/prep-interview

Company: Vercel
Role: Developer Advocate
```

## STAR Story Template

**Situation**: Brief context (1-2 sentences)
**Task**: What you needed to accomplish
**Action**: Specific steps YOU took (use "I", not "we")
**Result**: Quantified outcome + what you learned
