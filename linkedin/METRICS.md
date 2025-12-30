# LinkedIn Metrics Tracking

This document defines how LinkedIn metrics should be tracked.

## Accounts

| Account | Type | Purpose |
|---------|------|---------|
| Personal | Profile | Job search, networking, thought leadership |
| Business (optional) | Company Page | Business visibility, product updates |

## Metrics Schema

### Personal Profile Metrics

Track in `personal-metrics.json`:

```json
{
  "weekly_snapshots": [
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

### Company Page Metrics (Optional)

If you have a company page, track in a separate metrics file:

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

## Post-Level Metrics

For high-performing posts, capture in `content-ideas.json`:

```json
{
  "post_url": "",
  "date_posted": "YYYY-MM-DD",
  "account": "personal|business",
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

### Future: Automated
- LinkedIn API requires Marketing Developer Platform approval
- Browser extension to export analytics
- Custom automation scripts

## Growth Targets

| Metric | Current | 3-Month Goal | 6-Month Goal |
|--------|---------|--------------|--------------|
| Followers | - | - | - |
| Connections | - | 500+ | - |
| Profile Views/Week | - | 100+ | - |

*Fill in current values and adjust goals as needed*

## Content Strategy Notes

### Personal Account
- Building in public updates
- Technical insights and lessons learned
- Career journey
- Engage with dev community

### Business Account (if applicable)
- Product development updates
- Company milestones
- Technical deep dives
- Industry thought leadership
