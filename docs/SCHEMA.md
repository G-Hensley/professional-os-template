# Data Schema Reference

Complete field definitions for all JSON files in the Professional OS repository.

---

## Skill Levels

All skill ratings use this 6-tier scale:

| Level | Description |
|-------|-------------|
| `none` | No experience or knowledge |
| `novice` | Basic understanding, can perform simple tasks with guidance |
| `apprentice` | Moderate understanding, can perform tasks with some supervision |
| `adept` | Good understanding, can perform tasks independently |
| `expert` | Advanced understanding, can perform complex tasks and mentor others |
| `master` | Comprehensive authority, recognized expert in the field |

---

## Profile Data

### contact.json

Basic contact and identity information.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Your full name |
| `title` | string | Yes | Professional title (e.g., "Full-Stack Software Engineer") |
| `phone` | string | No | Phone number |
| `email` | string | Yes | Primary email address |
| `recent_employer` | string | No | Current or most recent employer |
| `location.city` | string | Yes | City |
| `location.state` | string | Yes | State/province abbreviation |
| `location.timezone` | string | Yes | Timezone abbreviation (e.g., "EST") |
| `location.remote_only` | boolean | No | Whether you only work remotely |
| `links.linkedin` | string | No | LinkedIn profile URL |
| `links.github` | string | No | GitHub profile URL |
| `links.portfolio` | string | No | Portfolio website URL |
| `links.credly` | string | No | Credly profile URL |

<details>
<summary>Example</summary>

```json
{
  "name": "Your Name",
  "title": "Full-Stack Software Engineer",
  "email": "you@example.com",
  "location": {
    "city": "Your City",
    "state": "ST",
    "timezone": "EST",
    "remote_only": true
  },
  "links": {
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername"
  }
}
```

</details>

---

### skills.json

Technical skills organized by category.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `skill_levels` | object | Yes | Definitions for each skill level (don't modify) |
| `programming_languages` | object | No | Languages with skill level values |
| `frameworks_and_libraries` | object | No | Frameworks/libraries with skill level values |
| `apis_and_protocols` | object | No | API technologies with skill level values |
| `databases` | object | No | Database technologies with skill level values |
| `cloud_and_devops` | object | No | Cloud/DevOps tools with skill level values |
| `testing & monitoring` | object | No | Testing tools with skill level values |
| `tools` | object | No | Development tools with skill level values |
| `AI` | object | No | AI tools with skill level values |
| `other` | object | No | Soft skills and other competencies |

<details>
<summary>Example</summary>

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
    "Next.js": "adept"
  }
}
```

</details>

---

### experience.json

Work history with roles and responsibilities.

Each job is keyed by company name:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `role` | string | Yes | Job title(s) |
| `start_date` | string | Yes | Start date (YYYY-MM-DD) |
| `end_date` | string | Yes | End date (YYYY-MM-DD) or "Present" |
| `location` | string | Yes | "Remote" or city/state |
| `job_type` | string | Yes | "Full-time", "Part-time", "Contract", "Freelance", "Self-employed" |
| `salary` | number | No | Annual salary |
| `salary_currency` | string | No | Currency code (e.g., "USD") |
| `responsibilities` | array | Yes | List of job responsibilities |
| `performance_metrics` | array | No | Quantifiable achievements |
| `technologies` | array | No | Technologies used in role |
| `skills` | array | No | Skills developed/used |
| `project_url` | string | No | URL to related project |

<details>
<summary>Example</summary>

```json
{
  "Company Name": {
    "role": "Software Engineer",
    "start_date": "2024-01-15",
    "end_date": "Present",
    "location": "Remote",
    "job_type": "Full-time",
    "salary": 85000,
    "salary_currency": "USD",
    "responsibilities": [
      "Develop features using React and Node.js",
      "Collaborate with design team on UI/UX"
    ],
    "performance_metrics": [
      "Reduced API response time by 40%"
    ]
  }
}
```

</details>

---

### education.json

Educational background and certifications.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `[degree_key].institution` | string | Yes | School/university name |
| `[degree_key].location` | string | Yes | Location or "Online" |
| `[degree_key].degree` | string | Yes | Degree type |
| `[degree_key].field_of_study` | string | Yes | Major/field |
| `[degree_key].graduation_year` | string | Yes | Year of graduation |
| `[degree_key].areas_of_study` | array | No | Relevant coursework |
| `certifications` | array | No | Professional certifications |
| `certifications[].name` | string | Yes | Certification name |
| `certifications[].date_obtained` | string | Yes | Date received |
| `certifications[].issuing_organization` | string | Yes | Issuing body |
| `certifications[].credential_id` | string | No | Credential ID |
| `certificates` | array | No | Simple list of certificate names |

<details>
<summary>Example</summary>

```json
{
  "bachelor_of_science": {
    "institution": "University Name",
    "location": "City, ST",
    "degree": "Bachelor of Science",
    "field_of_study": "Computer Science",
    "graduation_year": "2024",
    "areas_of_study": ["Data Structures", "Algorithms"]
  },
  "certifications": [
    {
      "name": "AWS Certified Cloud Practitioner",
      "date_obtained": "April 2025",
      "issuing_organization": "Amazon Web Services",
      "credential_id": "ABC123"
    }
  ]
}
```

</details>

---

### preferences.json

Work style and environment preferences.

| Field | Type | Description |
|-------|------|-------------|
| `learning.style` | string | Primary learning style |
| `learning.preferred_resources` | array | Preferred learning resources |
| `learning.avoids` | array | Learning methods to avoid |
| `work_environment.communication.preferred` | string | Sync or Async |
| `work_environment.communication.channels` | array | Preferred channels |
| `work_environment.meetings.preference` | string | Meeting frequency preference |
| `work_environment.collaboration_style` | string | Independent or Collaborative |
| `work_environment.management_style.autonomy` | string | Preferred autonomy level |
| `schedule.timezone` | string | Timezone |
| `schedule.typical_hours` | string | Working hours |
| `schedule.remote_required` | boolean | Remote work requirement |
| `coding_style.paradigm` | string | Preferred paradigm (OOP, FP, etc.) |
| `coding_style.formatting` | object | Code formatting preferences |
| `coding_style.principles` | array | Coding principles followed |
| `tools` | object | Preferred tools by category |

---

## Projects Data

### active.json / planned.json / completed.json

Projects are keyed by a slug (e.g., "my-project"):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Display name |
| `repo_url` | string | Yes | GitHub repository URL |
| `type` | string | Yes | "SaaS", "Digital Product", "Open Source", etc. |
| `description` | string | Yes | Full description |
| `technologies` | array | Yes | Tech stack used |
| `monetization_strategy` | string | Yes | How it makes money (or "Open-source") |
| `status` | string | Yes | "In Progress", "Planned", "Completed", "Blocked" |
| `problem` | string | Yes | Problem being solved |
| `solution` | string | Yes | How project solves the problem |
| `target_audience` | array | Yes | Who it's for |
| `mission_statement` | string | Yes | Core mission |
| `priority` | number | No | 1-10, higher = more important |
| `completion_percentage` | number | No | 0-100, for active projects |
| `due_date` | string | No | Target completion (YYYY-MM-DD) |
| `success_milestone` | string | No | What defines success |
| `tagline` | string | No | Short marketing tagline |
| `blocked_by` | string | No | What's blocking progress |
| `spec_folder` | string | No | Path to project specs |

<details>
<summary>Example</summary>

```json
{
  "my-saas": {
    "name": "My SaaS Product",
    "repo_url": "https://github.com/user/my-saas",
    "type": "SaaS",
    "description": "A tool that helps developers do X faster.",
    "technologies": ["Next.js", "TypeScript", "Supabase"],
    "monetization_strategy": "$10/month subscription",
    "status": "In Progress",
    "priority": 8,
    "completion_percentage": 60,
    "due_date": "2026-03-15",
    "problem": "Developers spend too much time on X",
    "solution": "Automate X with AI assistance",
    "target_audience": ["Solo developers", "Small teams"],
    "mission_statement": "Make X effortless for every developer",
    "success_milestone": "100 paying customers in first quarter"
  }
}
```

</details>

---

## Job Applications Data

### applications.json

Track job applications:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier |
| `company` | string | Yes | Company name |
| `role` | string | Yes | Job title |
| `url` | string | No | Job posting URL |
| `source` | string | Yes | "linkedin", "wellfound", "hn", "direct", "referral", "other" |
| `date_applied` | string | Yes | Date applied (YYYY-MM-DD) |
| `status` | string | Yes | "applied", "screening", "interviewing", "offer", "rejected", "withdrawn", "ghosted" |
| `salary_range.min` | number | No | Minimum salary |
| `salary_range.max` | number | No | Maximum salary |
| `salary_range.currency` | string | No | Currency code |
| `location` | string | Yes | "remote", "hybrid", "onsite" |
| `job_description_summary` | string | No | Brief summary of role |
| `why_interested` | string | No | Why you want this job |
| `skills_match` | array | No | Skills that match requirements |
| `skills_gap` | array | No | Skills you'd need to develop |
| `resume_version` | string | No | Which resume version was used |
| `cover_letter` | boolean | No | Whether cover letter was included |
| `referral` | string | No | Referral contact name |
| `notes` | string | No | Additional notes |
| `follow_up_date` | string | No | When to follow up (YYYY-MM-DD) |
| `last_updated` | string | Yes | Last update date (YYYY-MM-DD) |
| `outcome` | string | No | Final outcome |

---

### interviews.json

Track interview rounds:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier |
| `application_id` | string | Yes | Links to application |
| `company` | string | Yes | Company name |
| `role` | string | Yes | Job title |
| `round` | number | Yes | Interview round number |
| `type` | string | Yes | "phone_screen", "technical", "behavioral", "system_design", "panel", "final", "other" |
| `date` | string | Yes | Interview date (YYYY-MM-DD) |
| `time` | string | No | Interview time (HH:MM) |
| `duration_minutes` | number | No | Expected duration |
| `interviewer` | string | No | Interviewer name |
| `interviewer_role` | string | No | Interviewer's title |
| `format` | string | Yes | "video", "phone", "onsite" |
| `platform` | string | No | "zoom", "google_meet", "teams", "phone", "other" |
| `prep_notes` | string | No | Preparation notes |
| `questions_asked` | array | No | Questions they asked |
| `my_questions` | array | No | Questions you asked |
| `granola_notes` | string | No | Notes from Granola or similar |
| `went_well` | array | No | What went well |
| `could_improve` | array | No | Areas to improve |
| `follow_up_sent` | boolean | No | Whether thank-you was sent |
| `outcome` | string | No | "passed", "rejected", "pending", "unknown" |
| `feedback_received` | string | No | Any feedback received |
| `next_steps` | string | No | What happens next |
| `notes` | string | No | Additional notes |

---

## Date Formats

All dates should use `YYYY-MM-DD` format:
- `2026-01-15` - Specific date
- `"Present"` - For ongoing positions/projects

---

## File Naming Conventions

- Use lowercase with hyphens: `my-file.json`
- Assessments: `YYYY-MM-DD-assessment.md`
- Keep names short but descriptive
