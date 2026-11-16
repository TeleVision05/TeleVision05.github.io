---
title: 'CricketVR'
summary: 'A VR cricket batting game for Meta Quest in Unity, with pace and spin bowling profiles, AI fielders and shot distance readouts.'
category: 'simulation'
status: 'experimental'
year: 2024
stack: ['Unity', 'C#', 'Meta Quest', 'Oculus Integration']
repo: 'https://github.com/TeleVision05/StickCricketVR'
repoPrivate: true
live: ''
play: ''
featured: true
order: 3
---

## What it does

You bat against an animated bowler in VR on a Meta Quest. Bowling profiles vary in pace and spin, AI fielders chase the ball, and the game detects wides and boundaries. A heads-up display shows the score, release speed and how far you hit each shot. It was playable in the Unity Editor and on a Quest when I last worked on it in January 2024.

## How it works

- Bat and ball contact uses manual trigger-based collision in two scripts, rather than the engine's default physics response.
- A bowling profile manager selects each delivery type, and an animated bowler plays the matching action.
- A state machine in the main script drives the game flow, the settings menu and input mapping.
- Settings such as batting style, day or night, difficulty and physics tweakables are saved in Unity PlayerPrefs.
- In the Editor, the Quest buttons have keyboard fallbacks, so it can be tested without a headset.

## Limits

- It has not been rebuilt since January 2024 and has no automated tests.
