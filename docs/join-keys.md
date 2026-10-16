# Join keys

| # | Join | Key | Cardinality | Failure modes |
|---|---|---|---|---|
| 1 | `ad_insights_daily` → `ads` | `ad_id` = `ads.ad_id` | many days : 1 ad | IDs stored as numbers lose precision; deleted ads missing from `ads` |
| 2 | `ads` → `ad_creatives` | `ads.creative_id` = `ad_creatives.creative_id` | many ads : 1 creative (and creatives change over time) | use the snapshot valid on the insights date |
| 3 | `ad_creatives` → `page_posts` | `effective_object_story_id` = `post_id` | many creatives/ads : 1 post | dynamic, catalog, and some Advantage+ formats may have no single post; `object_story_id` is null for posts created with the ad, so don't use it |
| 4 | `page_posts` → `post_comments` | `post_id` | 1 : many | permissions (Page token); comment IDs need the MODERATE task under Page Public Content Access; deleted comments |
| 5 | `ga4_sessions` → `ads` | `utm_content` = `ad_id` | many sessions : 1 ad | untagged ads; consent-mode gaps; mistyped templates; `{{ad.id}}` left unresolved in odd placements |
| 6 | `orders` → `ads` | parsed `utm_content` = `ad_id` | many orders : 1 ad | orders without a landing URL; checkout redirects that drop parameters; returning customers arriving untagged |

**Rule:** aggregate sessions and orders per `ad_id` (and day) before joining to `ad_insights_daily`.
