-- 01_ad_to_post.sql
-- ad -> creative -> Page post, one row per ad per day.
-- Column names follow schemas/*.yml (flattened from Meta's API fields).
SELECT
  i.date_start,
  i.ad_id,
  a.creative_id,
  c.effective_object_story_id AS post_id,      -- Meta creative field; NOT object_story_id
  p.message,
  p.permalink_url,
  p.full_picture,
  i.impressions,
  i.spend
FROM ad_insights_daily i
JOIN ads a
  ON a.ad_id = i.ad_id
 AND a.snapshot_date = i.date_start            -- the creative in effect that day
JOIN ad_creatives c
  ON c.creative_id = a.creative_id
LEFT JOIN page_posts p
  ON p.post_id = c.effective_object_story_id;
