---
title: 'AI life simulator'
summary: 'An agent-based city simulation where 30 people with needs, personalities and money work, trade and get hired in a small market economy.'
category: 'simulation'
status: 'experimental'
year: 2026
stack: ['Python', 'pygame', 'pytest']
repo: 'https://github.com/TeleVision05/ai-life-sim'
repoPrivate: true
live: ''
play: ''
featured: false
order: 7
---

## What it does

This is a pygame simulation of a grid city with houses, restaurants, offices, shops, a hospital, a mall and more. Thirty people live in it. They wander, work, eat, sleep, chat, argue and pay rent, while businesses hire them, pay wages and sometimes go bust. You can click a person to inspect them, pause, and run time from 1x to 100x.

## How it works

- Each person has Sims-style needs: hunger, energy, social, fun, hygiene, bladder and health.
- Personalities use the Big Five traits, and a continuous valence and arousal model represents emotion.
- People hold money, savings, debt and a credit score.
- Businesses produce goods into a market where prices respond to supply and demand, within bounds.
- A government taxes employed people and pays unemployment benefits, and an economic cycle of growth, peak, recession and recovery scales production.
- The code began as one 1,826-line file and is now a package. The pygame window is created only inside `main()`, so the economy and personality modules are testable without a display.

## What's next

- The model has never been balanced, and the numbers in `constants.py` are guesses.
- The tests cover market price bounds, hiring, wages, taxes, benefits and population statistics, but not the person decision logic.
- Nothing is saved to disk, so a run cannot be resumed.
