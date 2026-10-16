-- 02_url_tag_audit.sql
-- Share of spend on ads whose creative url_tags lack {{ad.id}}.
WITH spend_by_ad AS (
  SELECT ad_id, SUM(spend) AS spend
  FROM ad_insights_daily
  WHERE date_start BETWEEN :start_date AND :end_date
  GROUP BY ad_id
),
latest_creative AS (
  SELECT a.ad_id, a.creative_id
  FROM ads a
  WHERE a.snapshot_date = :end_date
)
SELECT
  SUM(CASE WHEN c.url_tags LIKE '%{{ad.id}}%' THEN s.spend ELSE 0 END) AS tagged_spend,
  SUM(s.spend) AS total_spend,
  1 - SUM(CASE WHEN c.url_tags LIKE '%{{ad.id}}%' THEN s.spend ELSE 0 END) / NULLIF(SUM(s.spend), 0) AS untagged_share
FROM spend_by_ad s
JOIN latest_creative lc ON lc.ad_id = s.ad_id
JOIN ad_creatives c ON c.creative_id = lc.creative_id;
-- [CHECK] confirm on a sample that the API returns url_tags with the literal {{ad.id}} token.
