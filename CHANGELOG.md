# Changelog

## Unreleased
- Thumbstop rate (3-second views ÷ impressions) and hook rate (15-second views ÷ 3-second views) are separate metrics. Removed "often called hook rate" from the README and docs. This spec computes thumbstop, not hook rate.

## 0.1.0 (unreleased draft)
- First spec: step plan, entities, join keys, field lists checked against Meta Graph API v26.0 (Oct 15, 2026), metrics, caveats, example SQL, schemas, synthetic sample, join diagram.
- Dropped the separate hook rate (15-second views ÷ 3-second views) from the computed metrics. It is a different metric from thumbstop (see Unreleased). Added hold rate = ThruPlays (`video_thruplay_watched_actions`) ÷ 3-second views. Renamed `video_15s_or_complete` to `video_thruplays`.
