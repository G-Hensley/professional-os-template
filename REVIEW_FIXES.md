## Fixes to Implement

1) **Monthly assessment job-search counts**  
   - File: `automation/scripts/monthly-assessment-generator.js`  
   - Issue: Aggregates `applications`/`interviews` with `Object.values` on the wrapper objects, so counts/status tables include placeholder rows and default to `unknown`. Needs to read `applications.applications` / `interviews.interviews` and ignore empty placeholders.

2) **LinkedIn post week selection**  
   - File: `automation/scripts/linkedin-post-generator.js`  
   - Issue: `getWeekDates` anchors to the *next* Monday, so “current week” runs can be shifted a week forward unless executed on Sun/Mon. Re-anchor to the current week’s Monday (`now.getDate() - (dayOfWeek ? dayOfWeek - 1 : 6)`) before applying `WEEK_OFFSET`.

3) **Job monitor filtering**  
   - File: `automation/scripts/job-posting-monitor.js`  
   - Issue: `requiredTerms` and `location` in `SEARCH_CONFIG` are unused. Filter on location and enforce required terms before scoring/clustering to drop irrelevant roles.

Optional hardening: add small fixture tests for each script’s parsing/filtering to prevent silent regressions.
