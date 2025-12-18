# Generate LinkedIn Post

Generate a LinkedIn post draft for one of the three accounts.

## Context Files

Read based on the account specified:

**Personal Account:**
- `linkedin/profile.json` - Account details and voice
- `projects/active.json` - What I'm building
- `profile/experience.json` - Professional context

**Codaissance Account:**
- `business/codaissance/brand.json` - Brand voice and messaging
- `business/codaissance/marketing.json` - Content pillars and themes
- `business/codaissance/personas.json` - Target audience
- `business/codaissance/design-system.json` - Brand style

**TamperTantrum Labs Account:**
- `business/tampertantrum-labs/brand.json` - Brand voice (if exists)
- `business/tampertantrum-labs/marketing.json` - Content pillars and themes
- `business/tampertantrum-labs/personas.json` - Target audience
- `business/tampertantrum-labs/design-system.json` - Brand style

## Instructions

1. **Identify the account** from user input (personal, codaissance, ttl)

2. **Understand the topic**:
   - User may provide a specific topic
   - Or ask for suggestions based on recent activity/content pillars

3. **Generate post draft** that:
   - Matches the brand voice for that account
   - Hooks in the first line (pattern interrupt or curiosity)
   - Provides value (insight, lesson, tip, story)
   - Includes a call-to-action or engagement prompt
   - Uses appropriate hashtags (3-5 max)
   - Stays under 3000 characters (LinkedIn limit)

4. **Suggest variations**:
   - Provide 2-3 hook alternatives
   - Suggest best posting time
   - Recommend any visuals/images to pair

5. **Save draft** to `linkedin/drafts/YYYY-MM-DD-{account}.md`

## Usage

```
/generate-post

Account: codaissance
Topic: Just shipped a new feature for Dev Genesis
Tone: excited but professional
```

Or for suggestions:
```
/generate-post

Account: personal
Topic: suggest based on recent activity
```

## Post Structure Templates

**Story Post:**
- Hook (1 line)
- Setup/context (2-3 lines)
- The challenge/insight (3-4 lines)
- The lesson/takeaway (2-3 lines)
- CTA (1 line)

**Tip Post:**
- Hook with the tip (1 line)
- Why it matters (2 lines)
- How to do it (3-5 bullet points)
- CTA (1 line)

**Building in Public:**
- What I shipped/learned (1-2 lines)
- The journey/struggle (2-3 lines)
- Numbers/results if any (1-2 lines)
- What's next (1 line)
- CTA (1 line)
