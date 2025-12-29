# Customization Guide

How to replace the template data with your own professional information.

---

## Quick Start

1. Start with `profile/contact.json` - your basic identity
2. Add your skills to `profile/skills.json`
3. Fill in `profile/experience.json` with work history
4. Update `CLAUDE.md` with your context

The dashboard will automatically display your data once the JSON files are valid.

---

## Profile Files

### contact.json

Replace with your information:

```json
{
  "name": "Your Full Name",
  "title": "Your Professional Title",
  "email": "your@email.com",
  "location": {
    "city": "Your City",
    "state": "ST",
    "timezone": "EST",
    "remote_only": true
  },
  "links": {
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername",
    "portfolio": "https://yoursite.com"
  }
}
```

---

### skills.json

Keep the `skill_levels` section as-is. Update each category with your skills:

```json
{
  "skill_levels": { ... },
  "programming_languages": {
    "JavaScript": "expert",
    "Python": "adept",
    "Go": "novice"
  },
  "frameworks_and_libraries": {
    "React": "expert",
    "Vue": "apprentice"
  }
}
```

<details>
<summary>Skill level guide</summary>

| Level | When to use |
|-------|-------------|
| `none` | Haven't used it |
| `novice` | Tutorial-level, need guidance |
| `apprentice` | Can do tasks with some help |
| `adept` | Work independently |
| `expert` | Complex tasks, can mentor |
| `master` | Industry authority |

Be honest - overrating skills hurts resume tailoring.

</details>

<details>
<summary>Adding new categories</summary>

You can add new skill categories as needed:

```json
{
  "mobile_development": {
    "React Native": "adept",
    "Flutter": "novice"
  },
  "data_engineering": {
    "Apache Spark": "apprentice",
    "Airflow": "novice"
  }
}
```

</details>

---

### experience.json

Add each job as a key-value pair:

```json
{
  "Company Name": {
    "role": "Your Title",
    "start_date": "2024-01-15",
    "end_date": "Present",
    "location": "Remote",
    "job_type": "Full-time",
    "responsibilities": [
      "First responsibility with specific details",
      "Second responsibility with metrics if possible"
    ],
    "performance_metrics": [
      "Reduced deployment time by 50%",
      "Led team of 3 engineers"
    ]
  }
}
```

<details>
<summary>Tips for better resume generation</summary>

- Use action verbs: "Developed", "Led", "Reduced", "Implemented"
- Include numbers: "Handled 500+ requests/day", "Improved by 40%"
- Be specific: "Built React dashboard" not "Worked on frontend"
- List technologies used in each role
- Focus on impact, not just tasks

</details>

---

### education.json

Add degrees, certifications, and self-taught areas:

```json
{
  "bachelors_degree": {
    "institution": "University Name",
    "location": "City, ST",
    "degree": "Bachelor of Science",
    "field_of_study": "Computer Science",
    "graduation_year": "2024"
  },
  "certifications": [
    {
      "name": "AWS Solutions Architect",
      "date_obtained": "March 2024",
      "issuing_organization": "Amazon Web Services",
      "credential_id": "ABC123XYZ"
    }
  ]
}
```

---

### preferences.json

Update with your actual preferences. These help AI tools understand your work style:

- Learning preferences (how you prefer to learn new things)
- Communication style (async vs sync, preferred channels)
- Schedule (timezone, hours, remote requirements)
- Coding style (formatting, principles)

---

## Projects Files

### active.json

Projects you're currently working on:

```json
{
  "project-slug": {
    "name": "Project Name",
    "repo_url": "https://github.com/you/project",
    "type": "SaaS",
    "description": "What it does",
    "technologies": ["Next.js", "TypeScript"],
    "monetization_strategy": "$10/month",
    "status": "In Progress",
    "priority": 8,
    "completion_percentage": 60,
    "problem": "The problem it solves",
    "solution": "How it solves it",
    "target_audience": ["Developers"],
    "mission_statement": "Why it exists"
  }
}
```

### planned.json

Projects you plan to build. Same schema, but typically with:
- `status`: "Planned" or "Blocked"
- `blocked_by`: What's blocking you (if applicable)
- No `completion_percentage`

### completed.json

Finished projects. Same schema with:
- `status`: "Completed"
- `completion_percentage`: 100

---

## Job Application Files

### JOB_SEARCH.md

Update with your job search criteria:

- Target roles and titles
- Salary requirements
- Location preferences
- Dealbreakers
- Nice-to-haves

### applications.json

Start with an empty applications array:

```json
{
  "applications": []
}
```

Use `/log-application` command to add applications as you apply.

### interviews.json

Start with an empty interviews array:

```json
{
  "interviews": []
}
```

Add interviews as they're scheduled.

---

## CLAUDE.md

The most important file for AI context. Update the "Key Context" section:

```markdown
## Key Context

- Owner: Your Name - Your Title
- Current role: Your current job and company
- Primary tech stack: Your main technologies
- Learning style: How you prefer to learn
- Location: Your city (remote work preferences)
- Goal: What you're working toward
```

<details>
<summary>What to include in CLAUDE.md</summary>

This file tells AI tools about:
- Who you are professionally
- Your current situation
- Your goals and preferences
- How the repository is structured

Keep it concise but comprehensive. AI tools read this file to understand context before helping you.

</details>

---

## Validation

After updating files, verify they're valid JSON:

```bash
# Check a single file
cat profile/skills.json | python -m json.tool

# Or run the dashboard
cd dashboard && pnpm dev
```

Common JSON errors:
- Trailing commas (not allowed in JSON)
- Missing quotes around strings
- Unescaped special characters

---

## What NOT to Customize

- `.github/workflows/` - Keep automation intact
- `dashboard/` - Leave the app code alone
- `docs/` - Reference documentation
- Schema structure - Keep required fields

---

## Next Steps

After customizing your data:

1. Run `pnpm dev` in the dashboard folder to verify everything works
2. Try `/generate-resume` with a job posting to test resume generation
3. Use `/quick-check` to see a status overview
4. Commit your changes to start version-controlling your professional data
