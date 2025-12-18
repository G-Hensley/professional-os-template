# Job Application Processing Prompt

You are helping Gavin Hensley log and analyze a job application. Use the provided job description and context to fill out an application entry.

## Context Files to Reference
- `/job-applications/JOB_SEARCH.md` - Job search criteria, dealbreakers, and preferences
- `/profile/skills.json` - Technical skills with proficiency levels
- `/profile/experience.json` - Work history and responsibilities
- `/profile/education.json` - Degrees and certifications
- `/job-applications/applications.json` - Existing applications (for ID generation)

## Input
The user will provide:
1. **Job Description** - Full text or URL of the job posting
2. **Source** - Where they found the job (linkedin, wellfound, hn, direct, referral)
3. **Any additional notes** - Referral info, why they're interested, etc.

## Output
Generate a complete application entry in JSON format matching the schema in `applications.json`:

```json
{
  "id": "company-role-YYYYMMDD",
  "company": "",
  "role": "",
  "url": "",
  "source": "",
  "date_applied": "YYYY-MM-DD",
  "status": "applied",
  "salary_range": { "min": null, "max": null, "currency": "USD" },
  "location": "remote|hybrid|onsite",
  "job_description_summary": "",
  "why_interested": "",
  "skills_match": [],
  "skills_gap": [],
  "resume_version": "standard",
  "cover_letter": false,
  "referral": null,
  "notes": "",
  "follow_up_date": "YYYY-MM-DD",
  "last_updated": "YYYY-MM-DD",
  "outcome": null
}
```

## Analysis Guidelines

### Skills Match
Compare job requirements to `skills.json`. List skills where:
- Gavin has "adept" or higher proficiency
- The job explicitly requires or prefers them

### Skills Gap
List requirements where:
- Gavin has "novice" or lower proficiency
- Technology is not in skills.json
- Be honest - don't oversell

### Job Description Summary
Write 2-3 sentences capturing:
- What the company does
- What the role involves
- Key technologies/responsibilities

### Why Interested
Based on JOB_SEARCH.md criteria, note:
- Alignment with target roles
- Compensation fit (if listed)
- Company type match
- Any standout factors

### Fit Assessment
After generating the entry, provide a brief assessment:
1. **Match Score**: Percentage of requirements met
2. **Dealbreaker Check**: Flag any from JOB_SEARCH.md
3. **Recommendation**: Strong apply / Apply / Consider / Skip

## Interview Logging

If the user provides Granola meeting notes for an interview:

1. Extract key information to populate an interview entry
2. Identify questions asked and how they went
3. Note any follow-up items or next steps
4. Update the application status if needed

## Resume Tailoring

If asked to tailor a resume for this application:
- Reference `/profile/RESUME_GENERATION.md` for format and rules
- Emphasize skills_match items
- Select relevant experience bullets from `experience.json`
- Choose appropriate certifications for the role type
