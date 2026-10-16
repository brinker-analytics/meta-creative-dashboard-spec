# AGENTS.md

Instructions for the AI assistant (or person) building a Meta creative dashboard from this spec.

## Rules

1. **Run the steps in `docs/step-plan.md` in order.** Don't skip ahead. Each step lists its inputs, its output table, and a check.
2. **Never invent a field.** Use only the names in `docs/fields/`. Before you use one, confirm it against Meta's current reference for the API version you're calling AND against a live sample response. If a field is missing or renamed, stop and ask the user.
3. **Fields marked [CHECK] are unconfirmed.** Pull a small sample, show the user the raw JSON, and get a yes before building on them.
4. **Store every ID as a string.** Ad, ad set, campaign, creative, post, and Page IDs are long and will lose precision as numbers.
5. **Keep the attribution setting on every insights row.** Never mix windows in one trend.
6. **Aggregate before you join.** Sum orders and sessions per ad (and per day) BEFORE joining them to daily insights. Joining raw orders to daily rows duplicates impressions and spend.
7. **Don't compute averages of averages.** Rebuild totals (for example, total seconds watched = average × plays), then divide sums.
8. **Privacy first.** Never store commenter names, handles, or IDs. Strip names and handles from comment text before storage, keep raw text out of the dashboard, and honor deletions. Never put personal data in a URL parameter.
9. **No causal claims.** Report patterns and gaps. Don't write "this ad caused" anything. Suggest a test instead.
10. **Stop and ask** when data is missing, when the tag-coverage audit shows a large share of spend untagged, or when a join loses more rows than expected.

## Conventions

- Table names: `ad_insights_daily`, `ads`, `ad_creatives`, `page_posts`, `post_comments`, `ga4_sessions`, `orders` (see `schemas/`).
- SQL in `sql/` is ANSI-ish. Adapt the JSON or array functions to your warehouse.
- Writing style: "an MMM", never "MMM" alone as a noun. "first-party", not "1st-party".
- Licenses: code MIT (`LICENSE`), docs CC BY 4.0 (`LICENSE-docs`).

## Maintainer

Eric Brinker, Brinker Analytics (https://brinkeranalytics.com). Questions: eric@brinkeranalytics.com.
