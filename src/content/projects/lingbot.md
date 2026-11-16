---
title: 'Lingbot'
summary: 'A runner around a fork of lingbot-map that turns a walkthrough video into a 3D point cloud on a Mac with no GPU.'
category: 'robotics'
status: 'working'
year: 2026
stack: ['Python', 'PyTorch', 'Bash', 'viser', 'trimesh']
repo: 'https://github.com/TeleVision05/Lingbot'
repoPrivate: false
live: ''
play: ''
featured: true
order: 3
---

## What it does

Lingbot reconstructs a video of a room into a 3D point cloud you can orbit in a browser viewer, export as GLB or PLY, or render as an orbit video. It wraps lingbot-map, an open-source model that predicts camera poses and depth from video, and my fork makes it run on Apple Silicon and plain CPU.

## How it works

- My fork of lingbot-map carries the Mac and CPU fixes and is pinned as a git submodule.
- One setup script creates the Python environment, picks CUDA or CPU PyTorch wheels, and downloads the roughly 4.3 GB model weights.
- The model predicts a camera pose and depth map for each frame. Windowed inference processes long videos in chunks, and the points from each window are merged into one cloud.
- Export writes GLB (with camera overlays when available), PLY and the raw predictions. A software orbit renderer turns the PLY into an MP4 with ffmpeg.
- A full run on 487 frames took about 59 minutes on Apple Silicon and produced about 1.4 million points.

## What's next

- The GPU path is untested.
- The export script needs one more full end-to-end run after a refactor.
