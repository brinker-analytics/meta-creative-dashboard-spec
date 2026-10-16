# Meta Insights fields (ad level)

Source: Ad Insights edge reference, https://developers.facebook.com/documentation/ads-commerce/graph-api/reference/adgroup/insights (v26.0, checked Oct 15, 2026). Action types: https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/. Limits: https://developers.facebook.com/documentation/ads-commerce/marketing-api/insights/best-practices.

## Parameters
| Name | Value | Note |
|---|---|---|
| `level` | `ad` | |
| `time_increment` | `1` | one row per day |
| `action_attribution_windows` | e.g. `7d_click`, `1d_view` | default = `["7d_click","1d_view"]` |
| `use_unified_attribution_setting` | `true` | uses each ad set's setting |
| `breakdowns` | optional, e.g. `publisher_platform`; asset-level: `image_asset`, `video_asset`, `body_asset`, `title_asset` | check allowed combinations on the Breakdowns page |

## Fields
| Field | Meta's description (short) | Status |
|---|---|---|
| `ad_id`, `ad_name`, `adset_id`, `campaign_id` | IDs and name | verified |
| `date_start`, `date_stop` | row dates | verified |
| `attribution_setting` | the ad set's attribution window | verified |
| `impressions` | "The number of times your ads were on screen." | verified |
| `spend` | estimated amount spent | verified |
| `cpm`, `clicks`, `ctr` | | verified |
| `inline_link_clicks` | link clicks; "use a fixed 1-day-click attribution window" | verified |
| `inline_link_click_ctr` | | verified |
| `reach`, `frequency` | estimated | verified (see limits) |
| `actions`, `action_values` | lists of `{action_type, value}` | verified |
| `purchase_roas` | | verified |
| `video_play_actions` | "The number of times your video starts to play… counted for each impression… excludes replays." | verified |
| `video_avg_time_watched_actions` | "The average time a video was played, including any time spent replaying the video for a single impression." | verified name and definition; **[CHECK]** units (seconds) and per-play denominator on a sample |
| `video_time_watched_actions` | no definition on the page | **[CHECK]** units and meaning; cross-check only |
| `video_30_sec_watched_actions` | plays ≥30s (or nearly full length if shorter) | verified |
| `video_p25_watched_actions` … `video_p100_watched_actions` | plays reaching 25/50/75/95/100% | verified |
| `video_completed_view_or_15s_passed_actions` | no definition | **hook-rate numerator.** Caveat: undefined in the reference; the name implies "completed OR reached 15s", so short videos can count by finishing. Confirm on a sample |
| `video_play_curve_actions` | % of plays reaching each second (entries 0–14 = seconds 0–14; 15 = [15,20)) | verified; alternative 15-second source |
| `video_continuous_2_sec_watched_actions` | no definition | name verified; not used |
| `cost_per_thruplay` | | verified; not used |

## Action types used
| `action_type` | Meta label |
|---|---|
| `video_view` | 3-Second Video Views |
| `link_click` | Link Clicks |
| `landing_page_view` | Landing Page Views |
| `omni_purchase` | Purchases (grouped) |
| `offsite_conversion.fb_pixel_purchase` | Purchases (pixel) |
| `comment` | Post Comments |

Pick ONE purchase action type and keep it.

## Not in the v26.0 field list (don't use)
`video_15_sec_watched_actions`, `video_3_sec_watched_actions`. `video_thruplay_watched_actions` is mentioned on the Breakdowns page, but it isn't in the field list.

## Limits (Best Practices page)
- "Insights refresh every 15 minutes and do not change after 28 days of being reported." Re-pull the trailing 28 days.
- Reach and related fields are omitted for standard queries with breakdowns and start dates more than 13 months old. Async jobs allow up to 10 such requests per ad account per day (`x-Fb-Ads-Insights-Reach-Throttle` header).
- Watch `x-fb-ads-insights-throttle`. Use async jobs (`report_run_id`, expires after 30 days) for big pulls.
