# Setup Guide

Get your Professional OS repository up and running in under 30 minutes.

## Prerequisites

- **Git** installed ([download](https://git-scm.com/downloads))
- **Node.js 18+** installed ([download](https://nodejs.org/))
- **pnpm** installed (`npm install -g pnpm`)
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

## Step 2: Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/your-repo-name.git
cd your-repo-name/dashboard
pnpm install
```

---

## Step 3: Configure Environment

```bash
cp .env.example .env
```

Add your GitHub token to `.env`:

```env
GITHUB_TOKEN=ghp_your_token_here
```

<details>
<summary>How to create a GitHub token</summary>

1. Go to GitHub Settings > Developer Settings > Personal Access Tokens > Tokens (classic)
2. Generate new token with `repo` and `workflow` scopes
3. Copy the token and paste it in your `.env` file

</details>

---

## Step 4: Run the Dashboard

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) - you should see the dashboard with template data.

---

## Step 5: Replace Template Data

See the [Customization Guide](./CUSTOMIZATION.md) for detailed instructions.

**Essential files to update first:**

| Folder | Files | What to Add |
|--------|-------|-------------|
| `profile/` | `contact.json`, `skills.json`, `experience.json` | Your info |
| `projects/` | `active.json`, `planned.json` | Your projects |
| `job-applications/` | `applications.json`, `JOB_SEARCH.md` | Your job search |
| Root | `CLAUDE.md` | Update context section |

---

## Step 6: Enable Automations (Optional)

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

## Step 7: Use AI Commands

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
<summary>Dashboard won't start</summary>

```bash
cd dashboard
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

</details>

<details>
<summary>API routes return empty data</summary>

- Check that your JSON files are valid (no trailing commas, proper quotes)
- Validate JSON: `cat profile/skills.json | python -m json.tool`
- Check terminal for error messages

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
