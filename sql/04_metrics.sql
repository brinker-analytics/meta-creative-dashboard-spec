-- 04_metrics.sql
-- Per-ad metrics over a period. Sum first, divide once.
SELECT
  i.ad_id,
  SUM(i.impressions)                                                    AS impressions,
  SUM(i.spend)                                                          AS spend,
  -- seconds viewed per impression: rebuild total seconds (avg per play x plays), divide by impressions once
  SUM(i.video_avg_time_watched_s * i.video_plays) / NULLIF(SUM(i.impressions), 0)   AS sec_per_impression,
  SUM(i.video_views_3s) / NULLIF(SUM(i.impressions), 0)                 AS thumbstop_rate,
  SUM(i.video_thruplays) / NULLIF(SUM(i.video_views_3s), 0)             AS hold_rate,      -- numerator: ThruPlays (video_thruplay_watched_actions); see docs/metrics.md
  SUM(i.inline_link_clicks) / NULLIF(SUM(i.video_views_3s), 0)          AS cta_strength_clicks,
  SUM(s.sessions) / NULLIF(SUM(i.video_views_3s), 0)                    AS cta_strength_sessions,
  1000.0 * SUM(o.tagged_orders) / NULLIF(SUM(i.impressions), 0)         AS orders_per_1000_impr,
  SUM(i.spend) / NULLIF(SUM(i.video_views_3s), 0)                       AS cpv_contrast_only
FROM ad_insights_daily i
LEFT JOIN sessions_by_ad_day s ON s.ad_id = i.ad_id AND s.date_start = i.date_start
LEFT JOIN orders_by_ad_day   o ON o.ad_id = i.ad_id AND o.date_start = i.date_start
WHERE i.date_start BETWEEN :start_date AND :end_date
GROUP BY i.ad_id;
-- Both right-hand tables are already one row per ad per day, so the joins don't fan out.
