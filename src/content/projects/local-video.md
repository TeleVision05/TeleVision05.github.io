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

You type a prompt in a browser page and get an MP4 with synchronized audio on disk. Nothing is uploaded anywhere. It is a FastAPI job queue and a single-page UI around the LTX-2.3 video model, which runs on a pure MLX port that talks to Metal directly. It is single user and macOS only by design.

## How it works

- The 22B-parameter model runs in int8 weights, about 21 GB, because bf16 would need 64 GB of RAM and fp8 is not supported by Metal.
- Jobs run one at a time through a queue, and progress streams to the page over server-sent events.
- Three presets trade speed for quality: Fast, Balanced and Best.
- The UI enforces the model's constraints, such as frame counts of 8k+1 and width and height in multiples of 64, which prevents silent cropping.
- Block streaming loads the transformer from memory-mapped files instead of holding it resident. On a 32 GB M2 Max, a 25-frame clip dropped from 16 min 42 s to 1 min 56 s.

## What's next

- Validate preset, frame rate and precision values, since an unknown preset currently falls back to Balanced.
