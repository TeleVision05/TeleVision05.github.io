---
title: 'Content Studio'
summary: 'A local-first tool for producing fact-checked 9:16 science explainer videos, from research to render, with a person approving each stage.'
category: 'apps'
status: 'working'
year: 2026
stack: ['TypeScript', 'Remotion', 'Node.js', 'FFmpeg', 'SQLite']
repo: 'https://github.com/TeleVision05/content-studio'
repoPrivate: true
live: ''
play: ''
featured: false
order: 5
---

## What it does

Content Studio produces short vertical engineering and science explainer videos. A project moves from topic to research, script, storyboard, voiceover, captions, audio mix, render, quality checks, approval and export. Claude can draft research, script and storyboard, but a person signs each one off, and nothing is uploaded automatically.

## How it works

- Visuals are rendered in code with Remotion, and narration is synthesised locally with Kokoro. Captions are timed with whisper.cpp, and render and export use FFmpeg.
- Everything is stored as files under a data folder with a SQLite index.
- Drafting runs through the local Claude CLI under a subscription login with no API key, or through a manual copy-and-paste provider.
- Approval is gated: every factual claim must trace to a research source whose link has been checked, and claims that are only true from a date block approval until then.
- Quality control has 34 automated checks, including maximum length, hook timing, plain language, text overlap, number integrity and caption placement.
- As of 2026-11-06, lint and typecheck passed and 2,102 tests passed.
- Three example videos in the repo run 11.7 to 12.9 seconds.

## What's next

- The biggest weakness found by an independent review was videos opening on a flat 2D diagram; a 3D or real hero shot at frame 0 would help.
- The phone and Voyager topics need new 3D subjects.
- Platform behaviour beyond macOS on Apple Silicon is not verified.
