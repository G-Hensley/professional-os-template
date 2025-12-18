# Generate Tailored Resume

Generate a resume tailored to a specific job posting using profile data.

## Context Files

Read these files to understand the candidate profile:
- `profile/skills.json` - Technical skills with proficiency levels
- `profile/experience.json` - Work history with accomplishments
- `profile/education.json` - Degrees and certifications
- `profile/contact.json` - Contact information
- `projects/active.json` - Current projects (for relevant highlights)
- `projects/completed.json` - Completed projects
- `profile/RESUME_GENERATION.md` - Resume generation guidelines

## Instructions

1. **Parse the job posting** provided by the user (pasted text or URL)

2. **Analyze requirements**:
   - Required skills vs my skills (with proficiency match)
   - Required experience vs my experience
   - Nice-to-have skills I possess
   - Any gaps or areas to address

3. **Generate tailored resume** that:
   - Leads with most relevant experience for this role
   - Highlights skills that match requirements
   - Quantifies accomplishments where possible
   - Includes relevant projects that demonstrate capabilities
   - Uses keywords from the job posting naturally
   - Keeps to 1-2 pages maximum

4. **Provide analysis**:
   - Match percentage (required skills/experience coverage)
   - Strongest selling points for this role
   - Gaps to be aware of
   - Suggested talking points for cover letter

5. **Output options**:
   - Save to `job-applications/resumes/{company}-{role}.md`
   - Or display for copy/paste

## Usage

```
/generate-resume

[Paste job description]

Company: Stripe
Role: Senior Frontend Engineer
```

## Output Format

Generate the resume in clean markdown with:
- Contact header
- Professional summary (2-3 sentences tailored to role)
- Skills section (prioritized by relevance)
- Experience section (most relevant first)
- Education section
- Projects section (if space permits and relevant)
