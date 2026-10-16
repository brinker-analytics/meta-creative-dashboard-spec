# Ad, creative, Page post, and comment fields

Sources (v26.0, checked Oct 15, 2026): Ad https://developers.facebook.com/documentation/ads-commerce/marketing-api/reference/adgroup · Creative https://developers.facebook.com/documentation/ads-commerce/marketing-api/reference/ad-creative · Post https://developers.facebook.com/docs/graph-api/reference/post/ · Attachment https://developers.facebook.com/docs/graph-api/reference/story-attachment/ · Comments edge https://developers.facebook.com/docs/graph-api/reference/object/comments/ · Comment https://developers.facebook.com/docs/graph-api/reference/comment/

## Ad
`id`, `name`, `creative` (expand `creative{id}`), `adset_id`, `campaign_id`, `effective_status`, `created_time`. Verified.

## Creative
| Field | Note | Status |
|---|---|---|
| `id` | | verified |
| `effective_object_story_id` | "The ID of a page post to use in an ad, regardless of whether it's an organic or unpublished page post" | verified |
| `object_story_id` | null when the post was created with the ad; don't join on it | verified |
| `url_tags` | "query string parameters which will replace or be appended to urls clicked from page post ads…" | verified |
| `thumbnail_url` (+ `thumbnail_width`, `thumbnail_height`) | | verified |
| `image_url`, `video_id`, `body`, `title` | | verified |
| `effective_instagram_media_id`, `instagram_permalink_url` | Instagram fallbacks | verified |

Creative updates accept only `account_id`, `adlabels`, `name`, `status`, so `url_tags` can't be edited in place.

## Page post
`id`, `message`, `created_time`, `permalink_url`, `full_picture` (resized to 720 px max). Edges: `attachments`, `comments`. Verified. Reading needs a Page access token (see the Post reference for permissions).

Attachment subfields: `title`, `description`, `media`, `media_type`, `type`, `url`, `subattachments`. Verified on the StoryAttachment reference; **[CHECK]** on a live sample.

## Comments
- Edge params: `summary=1` (adds `total_count`), `filter=toplevel|stream`. Verified. `total_count` depends on the filter and can exceed the comments returned.
- Comment fields verified for reading: `id`, `like_count`, `comment_count`, `parent`.
- **[CHECK]** `message` and `created_time`: in v26.0 these appear only as publish parameters. Confirm on a sample.
- Comment IDs need the MODERATE task on the Page when using Page Public Content Access.
- **Privacy:** never request or store `from`. Strip names and handles from text before storage.
