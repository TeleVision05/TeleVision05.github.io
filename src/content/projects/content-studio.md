---
title: 'Content Studio'
summary: 'A local-first tool for producing fact-checked vertical science explainer videos of 20 seconds or less, from research to render, with a person approving each stage.'
category: 'apps'
status: 'working'
year: 2026
stack: ['TypeScript', 'Remotion', 'React', 'Node.js', 'FFmpeg', 'SQLite']
repo: 'https://github.com/TeleVision05/content-studio'
repoPrivate: true
live: ''
play: ''
featured: false
order: 5
---

## What it does

Content Studio produces short vertical engineering and science explainer videos. Every video is 20 seconds at most, with a hook of 7 words or fewer in the first 3.5 seconds. A project moves from topic to research, script, storyboard, voiceover, captions, audio mix, render, quality checks, approval and export. Claude can draft the research, script and storyboard, but a person signs each one off, and nothing is uploaded automatically.

The video above is the helicopter example as the pipeline renders it. The walkthrough and stills come from the dashboard's mock mode, which runs on in-browser sample data, so a MOCK DATA banner stays on screen.

## How it works

- Visuals are drawn in code with Remotion, a library that renders video frames with React. Narration is synthesised locally with Kokoro, captions are timed with whisper.cpp, and FFmpeg does the render and export.
- Everything is stored as files with a SQLite index. Drafting runs through my local Claude Code login with no API key.
- Approval is gated. Every factual claim must trace to a research source whose link opened, and the critical automated quality checks must pass. They cover length, hook timing, plain language, text overlap, number integrity and the caption band.
- `pnpm demo` takes a fresh clone to a rendered video in about 3 minutes with warm caches.
- The API and dashboard listen on 127.0.0.1 only and have no login. It is a tool for one person on one computer.

## Limits

- The full pipeline runs only on Apple Silicon Macs. The source is private.
- Only the helicopter example is shown here. The phone example is not approved yet.
