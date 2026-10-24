# Changelog

## 0.1.0 (unreleased draft)
- First spec: step plan, entities, join keys, field lists checked against Meta Graph API v26.0 (Oct 15, 2026), metrics, caveats, example SQL, schemas, synthetic sample, join diagram.
- Thumbstop is now noted as often called hook rate; the separate 15s ÷ 3s hook rate is removed. Added hold rate = ThruPlays (`video_thruplay_watched_actions`) ÷ 3-second views. Renamed `video_15s_or_complete` to `video_thruplays`.
