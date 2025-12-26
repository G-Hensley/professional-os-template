## Fixes Implemented

All issues from the original review have been resolved.

### 1. Monthly Assessment Job-Search Counts ✅ FIXED
- **File**: `automation/scripts/monthly-assessment-generator.js`
- **Issue**: Was aggregating `applications`/`interviews` with `Object.values` on wrapper objects
- **Fix**: Now reads `applicationsFile.applications` / `interviewsFile.interviews` and filters empty placeholders (lines 138-140)

### 2. LinkedIn Post Week Selection ✅ FIXED
- **File**: `automation/scripts/linkedin-post-generator.js`
- **Issue**: `getWeekDates` was anchoring to next Monday instead of current week
- **Fix**: Now calculates `daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1` to anchor to current week's Monday (lines 46-51)

### 3. Job Monitor Filtering ✅ FIXED
- **File**: `automation/scripts/job-posting-monitor.js`
- **Issue**: `requiredTerms` and `location` in `SEARCH_CONFIG` were unused
- **Fix**: Now enforces location check (lines 198-211) and validates `requiredTerms` if specified (lines 213-218)

### 4. Dashboard API Schedule Mismatch ✅ FIXED
- **File**: `dashboard/app/api/automations/route.ts`
- **Issue**: Hardcoded pipeline schedules didn't match actual workflow files
- **Fix**: Created `dashboard/lib/workflow-parser.ts` that reads schedules dynamically from `.github/workflows/*.yml` files

### 5. Dashboard API Path Fragility ✅ FIXED
- **Files**: `dashboard/app/api/*/route.ts`
- **Issue**: Used `join(process.cwd(), '..', relativePath)` which assumed specific directory structure
- **Fix**: Created `dashboard/lib/repo-path.ts` utility that:
  - Uses `REPO_ROOT` env var if set (for production/Vercel)
  - Falls back to detecting repo root based on presence of `CLAUDE.md`
  - All API routes now use `repoPath()` for consistent path resolution

---

## Open Issues

### 6. Missing Dashboard Pages ⚠️ OPEN
- **Status**: Home + Profile pages done, others not implemented
- **Missing**: Projects, Automations, Content, Jobs pages
- **Impact**: Dashboard is ~30% complete
- **Wireframes**: See `dashboard/WIREFRAMES.md` for planned layouts

### 7. Empty Data Files ℹ️ LOW PRIORITY
- **Files**: `linkedin/*-metrics.json` (all 0 bytes)
- **File**: `projects/completed.json` (empty - no shipped projects yet)
- **Note**: LinkedIn metrics documented as manual entry. Completed projects will populate as you ship.

### 8. Dashboard Jobs API Path + Schema Mismatch ⚠️ OPEN
- **Files**: `dashboard/app/api/jobs/route.ts`, `automation/scripts/job-posting-monitor.js`
- **Issue**: Dashboard reads `logs/job-monitor/*.json` and expects `monitorResults.jobs`, but the job monitor writes to `job-applications/opportunities/` and uses `all_jobs`
- **Impact**: Jobs dashboard will show no opportunities even when the monitor runs

### 9. Dashboard Content API Path + Schema Mismatch ⚠️ OPEN
- **Files**: `dashboard/app/api/content/route.ts`, `automation/scripts/linkedin-post-generator.js`
- **Issue**: Dashboard reads `logs/linkedin-posts/*.json` and expects `posts[].content/hashtags`, but generator writes to `linkedin/drafts/<week>/metadata.json` with a different schema
- **Impact**: Content dashboard will appear empty even when drafts are generated

### 10. Context Snapshot Job Search Counts Incorrect ✅ FIXED
- **File**: `automation/scripts/context-snapshot.js`
- **Issue**: Uses `Object.values` on wrapper objects and doesn't filter placeholder entries in `job-applications/*.json`
- **Fix**: Now reads `applicationsFile.applications` / `interviewsFile.interviews` and filters empty placeholders (lines 310-327)

### 11. Dashboard Job Stats Field/Status Mismatch ⚠️ OPEN
- **File**: `dashboard/src/hooks/useJobs.ts`
- **Issue**: UI types expect `applied_date` and `offered` status, but schema uses `date_applied` and `offer`
- **Impact**: Job stats can be inaccurate and TypeScript types don't reflect real data

### 12. Dashboard Project Type Mismatch ⚠️ OPEN
- **File**: `dashboard/src/types/project.ts`
- **Issue**: Project types/status/priority/target_audience don't match JSON schema (string unions vs actual values, `target_audience` is an array, `priority` is numeric)
- **Impact**: Dashboard typing and derived logic can be incorrect

### 13. Weekly Summary Logs Not Persisted ✅ FIXED
- **Files**: `.github/workflows/weekly-summary.yml`
- **Issue**: Generator writes logs to `logs/weekly-summary/`, but workflow had `contents: read` and no commit step
- **Fix**: Changed to `contents: write` and added commit/push step for `logs/weekly-summary/`

### 14. Tests README Out of Date ✅ FIXED
- **File**: `tests/README.md`
- **Issue**: Listed only two test folders, but repo now has multiple test suites
- **Fix**: Updated to document all 7 test suites with usage examples

---

## Future Hardening (Optional)

- Add fixture tests for each script's parsing/filtering to prevent silent regressions
- Add unit tests for date calculations in linkedin-post-generator.js
- Add integration tests with mock API responses for job-posting-monitor.js
- Add TypeScript types/schemas for all JSON data files
