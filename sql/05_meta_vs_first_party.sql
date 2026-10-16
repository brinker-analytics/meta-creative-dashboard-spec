-- 05_meta_vs_first_party.sql
-- Meta's credit beside first-party orders, per ad. Each side aggregated first.
WITH meta AS (
  SELECT ad_id, attribution_setting,
         SUM(meta_purchases) AS meta_purchases,
         SUM(impressions)    AS impressions
  FROM ad_insights_daily
  WHERE date_start BETWEEN :start_date AND :end_date
  GROUP BY ad_id, attribution_setting
),
ga4 AS (
  SELECT ad_id, SUM(ga4_purchases) AS ga4_purchases
  FROM sessions_by_ad_day
  WHERE date_start BETWEEN :start_date AND :end_date
  GROUP BY ad_id
),
fp AS (
  SELECT ad_id, SUM(tagged_orders) AS tagged_orders, SUM(tagged_revenue) AS tagged_revenue
  FROM orders_by_ad_day
  WHERE date_start BETWEEN :start_date AND :end_date
  GROUP BY ad_id
)
SELECT m.ad_id, m.attribution_setting, m.meta_purchases, g.ga4_purchases, f.tagged_orders,
       m.meta_purchases / NULLIF(f.tagged_orders, 0) AS meta_to_first_party_ratio
FROM meta m
LEFT JOIN ga4 g ON g.ad_id = m.ad_id
LEFT JOIN fp  f ON f.ad_id = m.ad_id;
-- Roll up by post: join ad_id -> post_id via sql/01 first, then sum each column by post_id.
