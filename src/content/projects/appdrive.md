---
title: 'appdrive'
summary: 'An agent-driven mobile QA tool that drives an app on a simulator through its accessibility tree and writes one evidence report.'
category: 'apps'
status: 'experimental'
year: 2026
stack: ['Node.js', 'Maestro', 'iOS Simulator', 'Android Emulator', 'ffmpeg']
repo: 'https://github.com/TeleVision05/appdrive'
repoPrivate: true
live: ''
play: ''
featured: false
order: 6
---

## What it does

appdrive boots a mobile app on an iOS simulator or Android emulator and lets an agent, or a person, drive it the way a tester would. Every step is recorded, and one self-contained HTML report comes out at the end. It aims to replace a human clicking through a build before a release, not to replace unit tests.

## How it works

- It keeps one warm Maestro session alive in a background daemon. Maestro cold-starts at about 36 seconds per command, while a screen read takes about 300 ms and a tap about 3 s with the warm session.
- The raw view hierarchy is flattened into a numbered list of labelled or tappable elements. Taps go by number, so an agent never types a label from memory.
- Every action saves a screenshot and a journal entry. The walkthrough video has each tap and swipe drawn onto it, and the report adds pass or fail results, defects and the app's own error lines from the device log.
- Secrets typed into the app are redacted from the journal and report.
- The journal can be exported as a Maestro YAML flow that replays in CI with no agent involved.
- A lifecycle layer boots the device, starts services such as a Metro dev server, installs and launches the build, then tears it all down.

## What's next

- Only the device half has been exercised by hand so far. I want to record a real Maestro session as a test fixture so it can be tested without a device.
