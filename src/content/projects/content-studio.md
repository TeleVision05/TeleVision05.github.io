---
title: 'Content Studio'
summary: 'A local-first tool for producing fact-checked 9:16 science explainer videos of 20 seconds or less, from research to render, with a person approving each stage.'
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

Content Studio produces short vertical engineering and science explainer videos. Every video is 20 seconds at most, with a hook of 7 words or fewer spoken in the first 3.5 seconds. A project moves from topic to research, script, storyboard, voiceover, captions, audio mix, render, quality checks, approval and export. Claude can draft the research, script and storyboard, but a person signs each one off. Nothing is uploaded automatically.

The vertical clip below is the helicopter example as the pipeline renders it. I approved it on 2026-11-14 after lengthening its scenes to fit the narration. The walkthrough and stills come from the dashboard's mock mode, which runs on in-browser sample data. Nothing was saved and no approval was clicked. The data is a recorded copy of the helicopter example (a 14.7 second run), not the 13.4 second video the demo command renders today, and a MOCK DATA banner stays on screen. Its quality report shows 34 checks, the same count as a real run today.

## How it works

- Visuals are rendered in code with Remotion, a library that draws video frames with React. Narration is synthesised locally with Kokoro, a text-to-speech model. Captions are timed with whisper.cpp, a local speech recogniser. FFmpeg does the render and export.
- Everything is stored as files under a data folder with a SQLite index.
- Drafting runs through my local Claude Code login with no API key, or through a copy-and-paste provider.
- Approval is gated. Every factual claim must trace to a research source whose link opened, quality checks must pass, and a claim that is only true from a future date blocks approval until then.
- As of 2026-11-13 there are 34 automated quality checks (22 critical, 11 warning, 1 info). They cover length, hook timing, plain language, text overlap, number integrity and the caption band, among others.
- The API and dashboard listen on 127.0.0.1 only and have no login, by design. It is a tool for one person on one computer.
- `pnpm demo` takes a fresh clone to a rendered video. As of 2026-11-13 a fresh-clone run took 3 min 20 s with warm caches.
- As of 2026-11-14, lint, format check and typecheck passed, and 2,155 tests passed across 251 test files.
- As of 2026-11-14 the two committed examples run 13.4 and 12.7 seconds. A third folder, `phone-memory-3d-opening-draft`, is a draft of the phone example with a 3D opening shot.

## What's next

- The phone example is not approved yet. Only the helicopter example is shown on this page.
- An independent AI critic scored the examples 5 and 6 out of 10. The biggest weakness was opening on a flat 2D diagram. I have a draft of the phone example with a 3D opening shot. As of 2026-11-14 its headline no longer overlaps the 3D block and its label is on screen from the first frame, but I have not approved it.
- As of 2026-11-14 this work is merged into main, and both CI jobs (automated checks on GitHub) passed on the last pull request. The Linux job renders the helicopter example with estimated caption timing (no whisper.cpp) and produced a 13.3 second 1080x1920 video. Only macOS on Apple Silicon is a supported platform for the full pipeline. Windows and Intel Macs are untested.
