---
title: 'Nova'
summary: 'A local-first voice assistant for macOS where speech, language model and speech output all run on the machine, with tool calls gated by risk.'
category: 'apps'
status: 'experimental'
year: 2026
stack: ['Python', 'FastAPI', 'whisper.cpp', 'Ollama', 'WebSocket']
repo: 'https://github.com/TeleVision05/nova'
repoPrivate: true
live: ''
play: ''
featured: false
order: 3
---

## What it does

Nova is a voice assistant that runs on my Mac. A browser page works as a control panel while a FastAPI server does the work: it listens through the microphone, transcribes speech, asks a local language model what to do and speaks the answer. Nothing is sent to a cloud service for speech or language.

## How it works

- Speech-to-text uses whisper.cpp, the language model runs through Ollama (default `qwen2.5:7b-instruct`), and speech output uses the macOS `say` command.
- Audio is captured on the Mac, not in the browser. The page connects over a WebSocket and is only a control surface.
- Tool calls follow a risk-tiered policy. Read-only tools run automatically, while writes and destructive actions wait for an Approve click.
- Every tool request and decision is appended to an audit log.
- Four layers stop Nova hearing itself: waiting for quiet after speech, skipping warm-up frames, a strict barge-in threshold, and dropping transcripts that mostly repeat what it just said.

## What's next

- It has not been verified on real hardware in a repeatable way.
- In CLI voice-approval mode, Nova hearing its own approval prompt could approve a tool, because that prompt bypasses the echo guard.
