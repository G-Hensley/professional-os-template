# Job Application Command

Use this command to log and analyze a job application following `.codex/prompts/job-application.md`. Generate the JSON entry and any fit assessment per the prompt, and update `job-applications/applications.json` (and related files if requested).

## How to run
1. Take the job description, source, and notes from the user.
2. Reference the context files listed in the prompt (skills, experience, education, JOB_SEARCH.md, existing applications).
3. Produce the JSON entry matching the schema and include the brief fit assessment.
4. Save or append to `job-applications/applications.json` as needed.
