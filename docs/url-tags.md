# URL tags

## Template
```
utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.id}}&utm_content={{ad.id}}
```
`utm_content={{ad.id}}` is the part that matters. Source, medium, and campaign values are your call. Meta fills in `{{ad.id}}`, `{{adset.id}}`, and `{{campaign.id}}` at click time (Meta Business Help, "About URL parameters"). Name tokens exist, but don't join on names.

In the API, the value lives on the creative's `url_tags`. It can't be edited on an existing creative. A fix means a new creative.

## Audit
1. List active ads with spend in the period.
2. Join to the creative valid on each date.
3. Flag `url_tags` that don't contain `{{ad.id}}` (or the ad ID itself).
4. Report the share of spend untagged, by campaign.

See `sql/02_url_tag_audit.sql`.
