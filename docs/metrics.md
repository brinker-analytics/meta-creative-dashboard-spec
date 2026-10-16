# Metrics

Sum numerators and denominators across rows, then divide. Never average daily ratios.

| Metric | Formula | Use it to |
|---|---|---|
| **Seconds viewed per impression** | `SUM(video_avg_time_watched_actions × video_play_actions) / SUM(impressions)` | read attention without CPMs and the auction in it |
| Thumbstop rate | `SUM(actions[video_view]) / SUM(impressions)` | see whether the opening stops the scroll |
| Hook rate | `SUM(video_completed_view_or_15s_passed_actions) / SUM(actions[video_view])` | see whether people who stopped kept watching (see the caveat below) |
| CTA strength | `SUM(inline_link_clicks) / SUM(actions[video_view])`; after the GA4 join: `SUM(sessions) / SUM(actions[video_view])` | see whether viewers act |
| First-party orders per 1,000 impressions | `tagged_orders / SUM(impressions) × 1000` | reach the order on your own record |
| First-party revenue per 1,000 impressions | `tagged_revenue / SUM(impressions) × 1000` | same, in money |
| New-customer share | `new_customer_orders / tagged_orders` | see who the ad brings in |
| Meta-to-first-party ratio | `meta_purchases / tagged_orders` | spot credit your records can't see |
| Comments per 1,000 impressions | `total_count / SUM(impressions) × 1000`, by post | gauge conversation |
| Days since post created | `current_date − created_time` | watch for fatigue |
| CPV (contrast only) | `SUM(spend) / SUM(actions[video_view])` | show why cost metrics mix the auction into engagement |

## Seconds viewed per impression

Meta: `video_avg_time_watched_actions` is "The average time a video was played, including any time spent replaying the video for a single impression." "For a single impression" scopes replays. It's still an average per play, and an impression with no play isn't in it.

- Rebuild total seconds per row: average × `video_play_actions`. Then divide by `impressions` once.
- Don't divide the average by impressions (the double divide).
- Don't label the average "per impression."
- **[CHECK]** on a sample: the average is in seconds, and average × plays ≈ `video_time_watched_actions` (if that's total seconds).

Why prefer it over CPV: "It normalizes the engagement action. CPV is heavily a function of CPMs and bidding as well as engagement." (Eric Brinker)

## Hook rate numerator: definition caveat

The numerator is `video_completed_view_or_15s_passed_actions`. Meta's v26.0 reference lists the field but gives no definition. Going by its name, it counts views that reached 15 seconds OR finished the video, so a video shorter than 15 seconds can count a "15-second view" just by being watched to the end. Compare hook rates within similar video lengths, and confirm the field's behavior on a live sample.

## Cautions
- These metrics aren't guarantees of success. Test whether, and how, they move with your own results.
- Some marketers report in-app website previews counting as link clicks, which may not reflect real interest. Once GA4 is joined, use sessions.
- `inline_link_clicks` uses a fixed 1-day-click window.
