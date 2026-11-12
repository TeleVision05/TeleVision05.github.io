---
title: 'LocalVideo'
summary: 'A browser UI for fully local text-to-video and image-to-video on an Apple Silicon Mac, with a streaming mode that ran 8.6 times faster.'
category: 'apps'
status: 'working'
year: 2026
stack: ['Python', 'FastAPI', 'MLX', 'LTX-2.3', 'HTML']
repo: 'https://github.com/TeleVision05/local-video-ui'
repoPrivate: true
live: ''
play: ''
featured: false
order: 4
---

## What it does

You type a prompt in a browser page and get an MP4 with synchronized audio on disk. Nothing is uploaded anywhere. The repo is a FastAPI job queue and a single-page UI around the LTX-2.3 video model, which runs on a pure MLX port that talks to Metal directly. Real generations were last made through it on 2026-08-16.

## How it works

- The 22B-parameter model runs in int8 weights, about 21 GB, because bf16 would need 64 GB of RAM and fp8 is not supported by Metal.
- Jobs run one at a time through a queue, and progress streams to the page over server-sent events.
- Three presets trade speed for quality: Fast (distilled two-stage), Balanced (two-stage with TeaCache) and Best (high-quality sampler).
- The UI enforces model constraints: frame counts of 8k+1, and width and height as multiples of 64, which prevents silent cropping.
- Block streaming loads the transformer from memory-mapped files instead of holding it resident. On a 32 GB M2 Max, a 25-frame clip dropped from 16 min 42 s to 1 min 56 s, measured on 2026-08-16.
- Eleven tests run against a fake engine subprocess, so they need no weights or GPU.

## What's next

- Preset, frame rate and precision values are not validated, so an unknown preset silently falls back to Balanced.
- The streaming and enhance options are stored as ad-hoc attributes, so they are lost when a job is reloaded.
- The startup hook uses a deprecated FastAPI pattern.
- It is single user and macOS only by design.
