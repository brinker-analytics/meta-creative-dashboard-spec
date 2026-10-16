-- 03_ga4_and_orders_by_ad.sql
-- Aggregate sessions and orders per ad per day BEFORE joining to insights.
CREATE TABLE sessions_by_ad_day AS
SELECT
  utm_content AS ad_id,
  session_date AS date_start,
  COUNT(*)                 AS sessions,
  SUM(engaged_session)     AS engaged_sessions,
  SUM(add_to_carts)        AS add_to_carts,
  SUM(purchases)           AS ga4_purchases
FROM ga4_sessions
WHERE utm_source = 'facebook'
GROUP BY utm_content, session_date;

CREATE TABLE orders_by_ad_day AS
SELECT
  utm_content AS ad_id,
  order_date AS date_start,
  COUNT(DISTINCT order_id)                               AS tagged_orders,
  SUM(revenue)                                           AS tagged_revenue,
  SUM(CASE WHEN is_new_customer THEN 1 ELSE 0 END)       AS new_customer_orders
FROM orders
WHERE utm_content IS NOT NULL
GROUP BY utm_content, order_date;
