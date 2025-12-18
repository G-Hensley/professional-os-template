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
- Using slash commands (`/assessment`, `/log-application`)
- Project planning and documentation
- Generating content from repo data

### Available Commands
| Command | Description |
|---------|-------------|
| `/assessment` | Comprehensive self-assessment across all areas |
| `/log-application` | Log a new job application |

### Example Tasks
```
"Update my skills.json to mark TypeScript as expert level"
"Generate a resume tailored for this job posting: [paste posting]"
"Run an assessment focused on my business strategy"
"Create a new project planning doc for [idea]"
"Update the project status for MindTrace to reflect current progress"
```

---

## Gemini CLI

**Role**: Research and analysis specialist — web search, summarization, market research

**Configuration**: `/.gemini/GEMINI.md`

### Best For
- Web searches for current information
- Company research for job applications
- Competitive analysis
- Market trend research
- Summarizing long documents or URLs
- Interview preparation research
- Finding pricing/feature comparisons

### Example Tasks
```
"Research Stripe's engineering culture and recent tech blog posts"
"Find competitors for MindTrace and compare their pricing"
"What are the current trends in developer tools for 2025?"
"Summarize this article: [URL]"
"Research what questions to expect in a senior frontend interview"
"Find recent news about APIsec from the last 3 months"
```

### Output Expectations
- Concise summaries, not raw data dumps
- Actionable recommendations
- Source URLs for key claims
- Suggestions for which repo files to update

---

## Codex

**Role**: Quick tasks and prompt-based workflows

**Configuration**: `/.codex/commands/`

### Best For
- Quick, focused code reviews
- Specific prompt-based tasks
- When you want a fresh context (no conversation history)
- Running predefined prompts

### Available Commands
| Command | Description |
|---------|-------------|
| `assessment` | Assessment prompt template |
| `job-application` | Job application logging prompt |

### Example Tasks
```
"Review this function for security issues"
"Explain what this code does"
"Suggest improvements for this component"
```

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
1. **Gemini**: Research the company (culture, tech stack, recent news)
2. **Claude Code**: Generate tailored resume with `/generate-resume` (when created)
3. **Claude Code**: Log application with `/log-application`

### Competitive Analysis Workflow
1. **Gemini**: Research competitors, pricing, features
2. **Claude Code**: Update `competitors.json` with findings
3. **Claude Code**: Adjust strategy based on analysis

### Interview Prep Workflow
1. **Gemini**: Research company and role
2. **Gemini**: Find common interview questions for the role
3. **Claude Code**: Update `interviews.json` with prep notes

---

## Adding New Tools

When adding a new AI tool to this repo:

1. Create a configuration file (e.g., `/.newtool/CONFIG.md`)
2. Define the tool's role and strengths
3. List what it should and shouldn't be used for
4. Add example tasks
5. Update this file with the new tool
6. Update `README.md` quick reference
