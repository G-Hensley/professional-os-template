# Log Job Application

Process a job application and add it to the tracking system.

## Instructions

Read the job application processing prompt and follow its guidelines:
- Read: `codex/prompts/job-application.md`

Then read the context files:
- Read: `job-applications/JOB_SEARCH.md`
- Read: `profile/skills.json`
- Read: `profile/experience.json`
- Read: `job-applications/applications.json`

## Your Task

1. **Parse the job description** provided by the user (either pasted text or from a URL)

2. **Generate an application entry** following the schema in `applications.json`

3. **Provide analysis**:
   - Match score (% of requirements met)
   - Dealbreaker check against JOB_SEARCH.md
   - Recommendation: Strong apply / Apply / Consider / Skip

4. **Ask the user** if they want to:
   - Add the entry to `applications.json`
   - Generate a tailored resume
   - Skip/modify anything

5. **If adding**: Append the new entry to the applications array in `applications.json`

## Usage

```
/log-application

[Paste job description or provide URL]
Source: linkedin
Notes: Found via John Smith referral
```

## For Interview Logging

If the user mentions this is for logging an interview (with Granola notes):
- Read: `job-applications/interviews.json`
- Parse the meeting notes to extract interview details
- Generate an interview entry
- Update the corresponding application status
