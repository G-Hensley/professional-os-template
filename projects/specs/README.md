# Project Specs

Detailed planning documents for each project. Each folder contains:

- `README.md` - Filled planning template (MVP + Post-MVP specs)
- Additional docs, diagrams, research as needed

## Structure

```
specs/
├── professional-os/   # AI-ready professional knowledge base (CURRENT)
├── dev-genesis/       # GitHub Template for project setup
├── vibiom/            # Multi-agent AI orchestrator CLI
├── tempered-ui/       # Security-first React component library
├── mindtrace/         # Student behavior logging SaaS
├── devgauntlet/       # Professional dev training platform
├── scopecreep/        # Automated RLS testing for databases
├── openorbit/         # Build-in-public social platform
├── instapi/           # Instant mock API generator
└── {new-project}/     # Create folder when planning new project
```

## Creating a New Project Spec

1. Create folder: `mkdir specs/{project-key}`
2. Copy template: `cp ../planning/PROJECT_PLANNING.md specs/{project-key}/README.md`
3. Fill out all sections
4. Add JSON entry to `active.json` or `planned.json`

See [PROJECT_PLANNING.md](../planning/PROJECT_PLANNING.md) for the full template.
