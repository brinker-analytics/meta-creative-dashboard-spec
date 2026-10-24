# Step plan

Run in order. Each step: what you need, what you build, and how to check it.

## 1. Confirm the prerequisites
- **Need:** Meta insights, ads, and creatives landing in the warehouse; a GA4 export; an order table.
- **Check:** every ID column is a string. Note the Meta API version your ETL calls.

## 2. Audit URL tags
- **Build:** for each active ad, does its creative's `url_tags` contain `{{ad.id}}`? (`sql/02_url_tag_audit.sql`)
- **Check:** report the share of spend on untagged ads. If it's large, stop and tell the user. Everything downstream inherits this blind spot.

## 3. Build the ad → creative → post map
- **Build:** `ads.creative.id` → `ad_creatives.id` → `effective_object_story_id` → `page_posts.id` (`sql/01_ad_to_post.sql`).
- **Check:** count ads with no post ID (dynamic and catalog formats often lack one). Count posts shared by several ads.

## 4. Pull posts, attachments, and comments
- **Build:** `page_posts` (`message`, `created_time`, `permalink_url`, `full_picture`, `attachments`), comment counts via `comments?summary=1`, and, if the user wants themes, comment text with names and handles stripped.
- **Check:** comment `message` and `created_time` are [CHECK] in v26.0. Confirm them on a sample.

## 5. Build GA4 and order tables keyed by ad ID
- **Build:** `ga4_sessions` and `orders` with `utm_content` parsed as `ad_id` (`sql/03_ga4_and_orders_by_ad.sql`).
- **Check:** match rate: the share of tagged sessions and orders whose ad ID exists in `ads`.

## 6. Compute the metrics
- **Build:** `docs/metrics.md` formulas (`sql/04_metrics.sql`).
- **Check:** seconds per impression is computed from total seconds (average × plays), not from the average alone.

## 7. Build the Meta vs first-party comparison
- **Build:** per ad and per post: Meta purchases (stated window), GA4 purchases, tagged orders, and the ratio (`sql/05_meta_vs_first_party.sql`).
- **Check:** each side was aggregated before the join.

## 8. Weekly review
- Sort by seconds per impression, thumbstop (often called hook rate), hold rate, and first-party orders per 1,000 impressions. Note the biggest Meta-to-first-party gaps. Pick ONE idea to test with a holdout or geo test.
