# Daily Shaper

Daily Shaper is a fitness and habit tracker built for desk workers and students who sit for long hours. It helps users stay active, lose weight, care for their knees/neck/posture, track hydration, and manage daily calorie targets.

**Live app:** https://dodda3li.github.io/daily_shaper/

## Features
- Personalized onboarding wizard (age, sex, height, weight, activity level) that calculates BMR/TDEE and a daily calorie target
- Editable knee and arm rehab tracks with progressive difficulty levels
- Daily food checklist, workout checklist, and study-break timer
- Weight logging with trend history
- Hydration log
- Achievements and streak tracking
- Data persists locally per device (works standalone, no backend required)

## Built for TestSprite Hackathon Season 3 — "Build the Loop"

This project uses the TestSprite CLI as the Checker in a real Maker → Checker loop against the live deployed app (not localhost).

**Loop summary** (full detail in [LOOP.md](./LOOP.md)):
- 4 automated frontend tests created against the live URL: onboarding, food checklist, weight logging, study-break timer
- One test (weight-log flow) came back **blocked** on first run — TestSprite caught a real bug: editing an existing profile silently dropped the activity level, knee/arm levels, and goal selections because `showOnboarding()` only pre-filled 6 of the profile's fields
- Root-caused, fixed in `app.js`, pushed, and re-verified with `testsprite test rerun` — passed 24/24 steps
- All 4 tests pass as of the latest commit

## Tech
Single-page app: `index.html`, `style.css`, `app.js`. No build step, no backend — deployable as static files (GitHub Pages).

## Local setup
Just open `index.html` in a browser, or serve the folder with any static file server.
