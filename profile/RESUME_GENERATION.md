# Resume Generation Guide

This document provides instructions for AI tools to generate tailored resumes from the profile data in this repository.

## Source Files

- `skills.json` - Technical skills with proficiency levels
- `experience.json` - Work history with detailed responsibilities and metrics
- `education.json` - Degrees, certifications, and areas of study
- `preferences.json` - Work style and coding preferences

## Resume Variants

### Full-Stack Software Engineer
**Primary focus**: React, Next.js, TypeScript, Node.js, PostgreSQL
**Emphasize**:
- Full-stack development experience from Codaissance, TamperTantrum Labs, BuiltInPublic
- API development and REST API expertise
- Cloud deployment (Vercel, AWS)
- Database design and optimization

### Frontend Engineer
**Primary focus**: React, Next.js, TypeScript, Tailwind CSS
**Emphasize**:
- UI/UX expertise and accessibility standards
- Component architecture and state management
- Performance optimization
- Responsive design and modern CSS

### Backend Engineer
**Primary focus**: Node.js, Express, PostgreSQL, REST APIs
**Emphasize**:
- API design and development
- Database management and optimization
- Authentication systems (OAuth 2.0, JWT)
- Cloud infrastructure and DevOps

### Product Engineer / Customer Success Engineer
**Primary focus**: Technical customer support, integrations, documentation
**Emphasize**:
- APIsec experience (current role)
- Custom script development for clients
- Technical documentation and training
- Cross-functional collaboration

### DevOps / Platform Engineer
**Primary focus**: CI/CD, Docker, cloud deployment
**Emphasize**:
- GitHub Actions and CI/CD pipelines
- Docker containerization
- Vercel and AWS deployment
- Monitoring and testing practices

## Generation Rules

### Skill Selection
1. Only include skills at "adept" level or higher unless specifically relevant
2. Group skills by category (Languages, Frameworks, Tools, etc.)
3. Lead with the most relevant skills for the target role
4. Limit to 10-15 top skills to avoid clutter

### Experience Formatting
1. Include 3-4 most relevant positions
2. Select 4-6 bullet points per role based on relevance to target job
3. Lead with quantifiable metrics when available
4. Use action verbs: Developed, Implemented, Designed, Optimized, Collaborated

### Metrics to Highlight
- APIsec: 77% of support tickets, <1 day turnaround, 15+ custom reports
- Concentrix: 1,000+ cases, 95%+ satisfaction rate, Tier 1 to Tier 2 progression

### Education & Certifications
1. B.S. Software Engineering - WGU (2025) always included
2. Select 3-4 most relevant certifications for the role
3. AWS Cloud Practitioner for cloud/DevOps roles
4. ITIL/Project+ for product/management roles
5. freeCodeCamp certs for development roles

### Formatting Guidelines
- Two pages preferred
- Clean, minimal design with clear section headers
- No photos or graphics
- Consistent date format (Month Year - Present) or (Month Year - Month Year)
- Location: "Portsmouth, OH (Remote)" or just "Remote"
- Use horizontal rules or spacing between major sections

## Resume Structure

Follow the exact structure from `resume.md`:

### 1. Header
```
# Gavin Hensley

606-939-6944 | gavinhensley@protonmail.com | https://www.linkedin.com/in/g-hensley/ | https://www.github.com/G-Hensley
```

### 2. Summary
50-60 words highlighting role focus, years of experience, and key strengths. Mention B.S. in Software Engineering.

### 3. Technical Skills
Organize by category on separate lines:
- **Languages:** JavaScript, TypeScript, Java, Python, HTML5, CSS3, Bash, SQL
- **Frameworks & Libraries:** React, Next.js, Express, TailwindCSS, Spring Boot
- **Databases:** PostgreSQL, MySQL, MongoDB, Supabase
- **APIs & Protocols:** REST APIs, GraphQL, WebSockets, OAuth 2.0, JWT, Bcrypt
- **Cloud & DevOps:** AWS, Vercel, Heroku, Docker, GitHub Actions, CI/CD
- **Testing & Monitoring:** Vitest, Jest, Postman, Lighthouse, Google Analytics, Burp Suite
- **Tools:** Git, Turborepo, Notion, ClickUp, Trello, VS Code, Figma, Asana, HubSpot, Jira

### 4. Work Experience
Format each role as:
```
### [Role Title] | [Company] | [Month Year - Present/Month Year]
- Bullet point with action verb, specific accomplishment, and metrics when available
- 4-6 bullets per role
```

### 5. Featured Projects
Format each project as:
```
### [Project Name]
**Tech Stack:** [Comma-separated technologies]
- 2-3 bullets describing what was built, key features, and measurable outcomes
```

### 6. Certifications
Simple bulleted list with certification names (abbreviate issuing org if needed)

### 7. Education
```
### [Degree] | [Institution] | [Month Year]
**Relevant Coursework:** [Comma-separated courses]
```

## Summary Statement Templates

### Full-Stack Engineer
"Full-Stack Software Engineer with expertise in React, Next.js, and Node.js. B.S. in Software Engineering with hands-on experience building SaaS applications and integrating APIs. Strong focus on clean architecture, security best practices, and delivering user-centric solutions."

### Frontend Engineer
"Frontend Engineer specializing in React and Next.js with a passion for building accessible, performant user interfaces. Expert in TypeScript, Tailwind CSS, and modern web standards. Committed to clean code, responsive design, and exceptional user experiences."

### Backend Engineer
"Backend Engineer with strong experience in Node.js, Express, and PostgreSQL. Skilled in REST API design, authentication systems, and database optimization. AWS certified with a focus on scalable, secure application architecture."

### Product/Customer Success Engineer
"Product Engineer with technical expertise in API security and customer success. Experienced in developing custom integrations, creating technical documentation, and providing high-touch support. Strong communicator who bridges technical and business requirements."

## Tailoring Instructions

When generating a resume for a specific job posting:

1. **Analyze the job description** for key technologies, requirements, and responsibilities
2. **Match skills** from skills.json that appear in the job posting
3. **Select experience bullets** that demonstrate relevant capabilities
4. **Prioritize certifications** that align with job requirements
5. **Adjust the summary** to reflect the specific role's focus

## ATS Optimization

- Use standard section headers (Experience, Education, Skills)
- Avoid tables, columns, or complex formatting
- Include keywords from job descriptions naturally
- Spell out acronyms on first use when appropriate
- Use standard fonts and formatting

## Output Formats

- **Markdown** - For version control and easy editing
- **Plain text** - For ATS submission
- **PDF** - For direct submission (generate externally)
