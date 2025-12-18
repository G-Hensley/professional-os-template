# LinkedIn Metrics Tracking

This document defines how LinkedIn metrics should be tracked across all three accounts.

## Accounts

| Account | Type | Purpose |
|---------|------|---------|
| Personal (g-hensley) | Profile | Job search, networking, thought leadership |
| Codaissance | Company Page | SaaS business visibility, product updates |
| TamperTantrum Labs | Company Page | AppSec consulting visibility, industry content |

## Metrics Schema

### Personal Profile Metrics

Track in `personal-metrics.json`:

```json
{
  "entries": [
    {
      "date": "YYYY-MM-DD",
      "followers": 0,
      "connections": 0,
      "profile_views": 0,
      "search_appearances": 0,
      "post_impressions": 0,
      "ssi_score": null
    }
  ]
}
```

**Frequency**: Weekly (Mondays)

**Key Metrics**:
- **Followers/Connections**: Network growth
- **Profile Views**: Interest from recruiters/peers
- **Search Appearances**: Discoverability
- **Post Impressions**: Content reach
- **SSI Score**: LinkedIn's Social Selling Index (0-100)

### Company Page Metrics

Track in `codaissance-metrics.json` and `tampertantrum-metrics.json`:

```json
{
  "entries": [
    {
      "date": "YYYY-MM-DD",
      "followers": 0,
      "page_views": 0,
      "unique_visitors": 0,
      "post_impressions": 0,
      "engagement_rate": 0.0,
      "button_clicks": 0
    }
  ]
}
```

**Frequency**: Weekly (Mondays)

**Key Metrics**:
- **Followers**: Page audience size
- **Page Views**: Traffic to company page
- **Unique Visitors**: Distinct viewers
- **Post Impressions**: Content visibility
- **Engagement Rate**: Likes + comments + shares / impressions
- **Button Clicks**: CTA effectiveness

## Post-Level Metrics

For high-performing posts, capture in `content-ideas.json` or a separate `posts/` folder:

```json
{
  "post_url": "",
  "date_posted": "YYYY-MM-DD",
  "account": "personal|codaissance|tampertantrum",
  "content_type": "text|image|video|carousel|poll|article",
  "topic": "",
  "impressions": 0,
  "reactions": 0,
  "comments": 0,
  "reposts": 0,
  "engagement_rate": 0.0,
  "notes": ""
}
```

## Where to Find Metrics

### Personal Profile
1. Go to your profile → "Analytics" section
2. Click "Show all analytics"
3. Available data: Profile views, search appearances, post impressions

### Company Pages
1. Go to company page → "Analytics" tab
2. Sections: Visitors, Followers, Leads, Content, Competitors

### SSI Score
- Visit: https://www.linkedin.com/sales/ssi
- Requires LinkedIn login

## Manual vs Automated Tracking

### Current: Manual
- Log metrics weekly in JSON files
- Update `last_updated` field in profile.json

### Future: Automated (See automation/IDEAS.md)
- LinkedIn API requires Marketing Developer Platform approval
- Phantom Buster or similar scraping tools (ToS risk)
- Browser extension to export analytics

## Growth Targets

| Metric | Current | 3-Month Goal | 6-Month Goal |
|--------|---------|--------------|--------------|
| Personal Followers | - | - | - |
| Personal Connections | - | 500+ | - |
| Profile Views/Week | - | 100+ | - |
| Codaissance Followers | - | 100 | 500 |
| TTL Followers | - | 50 | 200 |

*Fill in current values and adjust goals as needed*

## Content Strategy Notes

### Personal Account
- Building in public updates
- Technical insights and lessons learned
- Career journey and job search transparency
- Engage with dev community

### Codaissance
- Product development updates
- SaaS building journey
- Technical deep dives
- Launches and milestones

### TamperTantrum Labs
- API security insights
- AppSec industry news
- Consulting wins (anonymized)
- Thought leadership on security
