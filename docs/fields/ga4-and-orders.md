# GA4 and order columns (minimal)

These aren't Meta fields. Names depend on your export and your order system. **[CHECK]** every one against your own schema.

## ga4_sessions
| Column | Meaning |
|---|---|
| `session_id` | your session key |
| `session_date` | date |
| `utm_content` | campaign content for the session (= Meta ad ID). In the GA4 BigQuery export, look at the collected or session traffic-source content fields **[CHECK]** |
| `utm_source`, `utm_medium` | to filter Meta traffic |
| `engaged_session` | 0/1 |
| `add_to_carts`, `purchases`, `purchase_revenue` | counts per session |

## orders
| Column | Meaning |
|---|---|
| `order_id`, `order_date` | |
| `landing_url` | the order's landing-site URL (Shopify keeps one, for example) **[CHECK]** |
| `utm_content` | parsed from `landing_url` or the order's UTM fields (= Meta ad ID) |
| `revenue` | net of what your finance team nets out |
| `is_new_customer` | first order for the customer |

Never put personal data in a UTM.
