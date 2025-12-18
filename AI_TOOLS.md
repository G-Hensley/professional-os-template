# AI Tools Guide

This document defines when to use each AI tool with this repository. Each tool has specific strengths—using the right tool for the task saves time and produces better results.

## Quick Reference

| Task | Best Tool | Why |
|------|-----------|-----|
| Edit code/files | Claude Code | Multi-file editing, shell access |
| Research companies | Gemini | Web search, current info |
| Generate resume | Claude Code | Needs to read/write files |
| Competitive analysis | Gemini | Web search, summarization |
| Run assessment | Claude Code | `/assessment` command |
| Interview prep research | Gemini | Company research, recent news |
| Create new files | Claude Code | File system access |
| Summarize long docs | Gemini | Fast summarization |
| Log job application | Claude Code | `/log-application` command |
| Market research | Gemini | Web search, trends |
| Update project status | Claude Code | File editing |
| Quick code review | Codex | Fast, focused review |

---

## Claude Code

**Role**: Primary development tool — code editing, file management, complex tasks

**Configuration**: `CLAUDE.md` + `/.claude/commands/`

### Best For
- Writing and editing code
- Creating and modifying files
- Multi-file refactoring
- Running shell commands
- Complex multi-step tasks
- Using slash commands for structured workflows
- Project planning and documentation
- Generating content from repo data

### Available Commands
| Command | Description |
|---------|-------------|
| `/assessment` | Comprehensive self-assessment across all areas |
| `/log-application` | Log a new job application |
| `/generate-resume` | Create a tailored resume from a job posting |
| `/generate-post` | Create a LinkedIn post draft for any account |
| `/update-project` | Update project status, details, or move between files |
| `/prep-interview` | Generate interview preparation notes |
| `/quick-check` | Brief status check on key metrics (weekly) |

### Example Tasks
```
"Update my skills.json to mark TypeScript as expert level"
"/generate-resume [paste job posting]"
"/assessment focused on my business strategy"
"/update-project MindTrace - move to completed"
"/quick-check"
"/generate-post codaissance - just shipped Dev Genesis v1"
```

---

## Gemini CLI

**Role**: Research and analysis specialist — web search, summarization, market research

**Configuration**: `/.gemini/GEMINI.md` + `/.gemini/commands/`

### Best For
- Web searches for current information
- Company research for job applications
- Competitive analysis
- Market trend research
- Summarizing long documents or URLs
- Interview preparation research
- Finding pricing/feature comparisons
- Salary and compensation research

### Available Commands
| Command | Description |
|---------|-------------|
| `/research-company` | Research a company for job applications |
| `/competitive-analysis` | Analyze competitors for a product |
| `/market-research` | Research market trends and opportunities |
| `/salary-research` | Research salary ranges for a role |

### Example Tasks
```
"/research-company Stripe"
"/competitive-analysis MindTrace"
"/market-research developer tools 2025"
"/salary-research Senior Frontend Engineer"
"Summarize this article: [URL]"
"Find recent news about APIsec from the last 3 months"
```

### Output Expectations
- Concise summaries, not raw data dumps
- Actionable recommendations
- Source URLs for key claims
- Suggestions for which repo files to update

---

## Codex CLI

**Role**: Quick tasks and prompt-based workflows

**Configuration**: `~/.codex/prompts/` (global) + `~/.codex/config.toml`

### Best For
- Quick, focused code reviews
- Specific prompt-based tasks
- When you want a fresh context (no conversation history)
- Running predefined prompts
- Backup when Claude Code tokens run out

### Available Commands
| Command | Description |
|---------|-------------|
| `/prompts:assessment` | Run a self-assessment |
| `/prompts:job-application` | Log and analyze a job application |
| `/prompts:review-resume` | Quick resume review and feedback |
| `/prompts:summarize-project` | Generate project summary or pitch |

### Example Tasks
```
/prompts:review-resume JOB="[paste job posting]"
/prompts:summarize-project PROJECT="Dev Genesis" TYPE="elevator"
/prompts:summarize-project PROJECT="TemperedUI" TYPE="linkedin"
/prompts:assessment FOCUS="technical"
/prompts:job-application SOURCE="linkedin"
```

### Notes
- Codex prompts are installed globally to `~/.codex/prompts/`
- Local `.codex/commands/` folder contains reference copies
- Type `/` in Codex to see available slash commands

---

## Decision Flowchart

```
What do you need to do?
│
├─► Need to search the web or research something?
│   └─► Use GEMINI
│
├─► Need to edit files or run commands?
│   └─► Use CLAUDE CODE
│
├─► Need a quick code review or explanation?
│   └─► Use CODEX
│
├─► Need to create/modify multiple files?
│   └─► Use CLAUDE CODE
│
├─► Need current market/company information?
│   └─► Use GEMINI
│
├─► Need to run a slash command?
│   └─► Use CLAUDE CODE
│
└─► Not sure?
    └─► Start with CLAUDE CODE (most versatile)
```

---

## Tool Combinations

Some tasks work best with multiple tools:

### Job Application Workflow
1. **Gemini**: `/research-company [company]` - Get company intel
2. **Gemini**: `/salary-research [role]` - Know your worth
3. **Claude Code**: `/generate-resume [paste posting]` - Tailored resume
4. **Claude Code**: `/log-application` - Track it

### Competitive Analysis Workflow
1. **Gemini**: `/competitive-analysis [product]` - Research competitors
2. **Claude Code**: Update `competitors.json` with findings
3. **Claude Code**: Adjust strategy based on analysis

### Interview Prep Workflow
1. **Gemini**: `/research-company [company]` - Deep dive on company
2. **Claude Code**: `/prep-interview` - Generate full prep doc
3. **Claude Code**: Update `interviews.json` with notes

### Content Creation Workflow
1. **Claude Code**: `/generate-post [account] [topic]` - Draft post
2. **Codex**: `/prompts:summarize-project PROJECT="[name]" TYPE="linkedin"` - Quick project pitch
3. Manual: Review, edit, and post

---

## Adding New Tools

When adding a new AI tool to this repo:

1. Create a configuration file (e.g., `/.newtool/CONFIG.md`)
2. Define the tool's role and strengths
3. List what it should and shouldn't be used for
4. Add example tasks
5. Update this file with the new tool
6. Update `README.md` quick reference
