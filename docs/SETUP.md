# Setup Guide

Get your Professional OS repository up and running in under 30 minutes.

## Prerequisites

- **Git** installed ([download](https://git-scm.com/downloads))
- A **GitHub account** ([sign up](https://github.com/join))
- An AI coding tool (Claude Code, Cursor, Copilot, or Windsurf)

---

## Step 1: Create Your Repository

**Recommended:** Click "Use this template" on GitHub, name it (e.g., `my-professional-os`), and make it **Private**.

<details>
<summary>Other options (Fork or Clone)</summary>

### Fork
1. Click "Fork" on the GitHub repo page
2. Uncheck "Copy the main branch only" if you want all branches
3. Click "Create fork"

### Clone Directly
```bash
git clone https://github.com/YOUR_USERNAME/professional-os.git my-professional-os
cd my-professional-os
git remote set-url origin https://github.com/YOUR_USERNAME/my-professional-os.git
```

</details>

---

## Step 2: Clone Your Repository

```bash
git clone https://github.com/YOUR_USERNAME/your-repo-name.git
cd your-repo-name
```

---

## Step 3: Replace Template Data

See the [Customization Guide](./CUSTOMIZATION.md) for detailed instructions.

**Essential files to update first:**

| Folder | Files | What to Add |
|--------|-------|-------------|
| `profile/` | `contact.json`, `skills.json`, `experience.json` | Your info |
| `projects/` | `active.json`, `planned.json` | Your projects |
| `job-applications/` | `applications.json`, `JOB_SEARCH.md` | Your job search |
| Root | `CLAUDE.md` | Update context section |

---

## Step 4: Connect to the Dashboard

Visit [professional-os.app](https://professional-os.app) and connect your GitHub repository:

1. Sign in with GitHub OAuth
2. Select your Professional OS repository
3. View your profile, projects, and job applications

The dashboard reads directly from your repo - any changes you commit will be reflected automatically.

---

## Step 5: Enable Automations (Optional)

<details>
<summary>Available GitHub Actions workflows</summary>

| Workflow | Schedule | What it Does |
|----------|----------|--------------|
| Daily Context Snapshot | 6:00 AM | Updates CONTEXT.md with repo state |
| Weekly Summary | Sundays 8:00 PM | Generates weekly progress summary |
| LinkedIn Post Generator | Sundays 9:00 PM | Creates draft LinkedIn posts |
| Job Posting Monitor | Daily 9:00 AM | Finds new job opportunities |
| Monthly Assessment | 1st of month | Generates self-assessment |

**To enable:**
1. Go to your repo on GitHub > Actions tab
2. Click "I understand my workflows, go ahead and enable them"
3. Add secrets in Settings > Secrets > Actions (e.g., `ANTHROPIC_API_KEY`)

</details>

---

## Step 6: Use AI Commands

<details>
<summary>Available slash commands</summary>

| Command | What it Does |
|---------|--------------|
| `/generate-resume` | Creates tailored resume from job description |
| `/assessment` | Generates periodic self-assessment |
| `/generate-post` | Creates LinkedIn post drafts |
| `/log-application` | Logs a job application |
| `/prep-interview` | Prepares interview notes |
| `/update-project` | Updates project status |
| `/quick-check` | Quick status overview |

**Example usage in Claude Code:**
```
/generate-resume

[paste job description here]
```

</details>

---

## Troubleshooting

<details>
<summary>JSON validation errors</summary>

Validate your JSON files:

```bash
cat profile/skills.json | python -m json.tool
```

Common errors:
- Trailing commas (not allowed in JSON)
- Missing quotes around strings
- Unescaped special characters

</details>

<details>
<summary>GitHub Actions not running</summary>

- Make sure Actions are enabled (Settings > Actions > General)
- Check that required secrets are set
- Look at the Actions tab for error logs

</details>

<details>
<summary>AI commands not working</summary>

- Ensure CLAUDE.md is in the root of your repository
- Check that your AI tool can read the repository files
- Try running the command from the repository root

</details>

---

## Next Steps

1. **Customize your data** - See [CUSTOMIZATION.md](./CUSTOMIZATION.md)
2. **Understand the schemas** - See [SCHEMA.md](./SCHEMA.md)
3. **Generate your first resume** - Use `/generate-resume` with a job posting
