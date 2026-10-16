# Caveats

- **Attribution windows.** Meta's results depend on the window. Store `attribution_setting` and the requested windows on every row, and never mix them in one trend. View-through credit has no first-party counterpart.
- **Restatement.** Insights can change for up to 28 days. Re-pull a trailing window.
- **Reach.** Not returned for standard queries with breakdowns and start dates more than 13 months old. Async jobs allow 10 such requests per ad account per day.
- **Rate limits.** Use async jobs for big pulls. Back off on `x-fb-ads-insights-throttle`.
- **Join gaps.** Untagged ads; tag fixes that swap creatives; dynamic or Advantage+ ads with many assets under one ad ID (use asset breakdowns where allowed); catalog ads; posts reused across ads.
- **Privacy.** Comments are personal data: no names, handles, or commenter IDs; honor deletions; keep raw text out of the dashboard. GA4 consent gaps. No personal data in UTMs.
- **Correlation, not cause.** The dashboard shows patterns. To learn whether a creative caused sales, run a holdout or geo test: https://brinkeranalytics.com/insights/creative-performance-analytics#test
