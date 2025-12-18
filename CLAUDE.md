# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a comprehensive personal and business knowledge base serving as the single source of truth for:

- **Professional profile** - Skills, experience, education, resume data for Gavin Hensley
- **Business operations** - Planning, marketing, and strategies for Codaissance (SaaS/software business) and TamperTantrum Labs (wife's business with marketing/planning support)
- **Project management** - Tracking SaaS products and projects across planning, active development, and completed stages
- **Learning & growth** - Roadmaps for skill development, project planning, and marketing strategies
- **Job search** - Tracking job applications and application status
- **Social/professional presence** - Post metrics from LinkedIn (personal and business accounts), content to add to GitHub, personal portfolio site, and LinkedIn profile

The repository is designed to be consumed by AI tools to assist with generating tailored resumes, project specs, business strategies, learning roadmaps, marketing plans, and tracking career/social metrics.

## Repository Structure

- **profile/** - Professional data in JSON format
  - `skills.json` - Technical skills with 6-tier proficiency levels
  - `experience.json` - Work history with roles, responsibilities, and metrics
  - `education.json` - Degrees, certifications, and learning areas
  - `preferences.json` - Learning preferences and work style
  - `resume.md` - Formatted resume document

- **projects/** - Project and product tracking
  - `planned.json` - Projects in planning stages
  - `active.json` - Currently in development
  - `completed.json` - Finished projects

## Data Conventions

- **Skill levels**: none → novice → apprentice → adept → expert → master (defined in `skills.json`)
- **Project schema**: name, repo_url, type, description, technologies, monetization_strategy, status, problem, solution, target_audience, mission_statement
- **Dates**: "YYYY-MM-DD" format, "Present" for ongoing

## Key Context

- Owner: Gavin Hensley - Full-Stack Software Engineer, B.S. in Software Engineering (WGU 2025)
- Primary tech stack: React, Next.js, TypeScript, Node.js, Tailwind CSS, PostgreSQL/Supabase
- Learning style: Hands-on project-based learning, official documentation, building without tutorials
