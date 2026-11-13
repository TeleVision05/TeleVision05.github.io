---
title: 'Relighting'
summary: 'Interactive relighting of a 3D Gaussian Splatting scene from a single baked file, by splitting albedo from lighting and re-shading it.'
category: 'robotics'
status: 'experimental'
year: 2026
stack: ['JavaScript', 'WebGL2', 'GLSL', 'Python', 'NumPy', 'Playwright']
repo: 'https://github.com/TeleVision05/Relighting'
repoPrivate: false
live: ''
play: ''
featured: false
order: 4
---

## What it does

A standard 3D Gaussian Splatting file (a scene stored as many small 3D blobs, or splats) has its lighting baked into the colour. This tool separates that baked colour into surface colour and lighting, then lets you add new lights and see the scene re-lit in the browser. It works from one `.ply` file with no training step. As of 2026-11-13 it is still experimental.

## How it works

- The baked colour in each splat's base spherical-harmonic term is split into a smooth irradiance field and an intrinsic albedo, in the style of Retinex (a classic method for separating lighting from surface colour).
- Per-splat normals come from each Gaussian's shortest axis, blended toward a voxel-smoothed field to reduce noise. A local plane fit is only trusted when at least 8 splats sit near it, so sparse areas keep their own axis.
- Re-shading uses a Cook-Torrance BRDF with a GGX distribution, with up to 8 directional, point or spot lights.
- Shadows are ray-marched through a per-model density volume built from the splats.
- The viewer is a WebGL2 page with a split view of the baked reference against the relit result, six G-buffer debug modes (views of one stored layer, such as albedo or normals), four lighting presets and a model picker. It is plain ES modules with no build step, and scenes load in a background worker with a progress bar.
- A NumPy CPU renderer is the reference the viewer is checked against. It now reads rotations in the same order as the viewer, builds each splat's shape from all three scales, uses the viewer's orbit camera and composites in tiles instead of a per-pixel Python loop. On one sample scene at 800x600, a render went from 24.9 s (neutral) and 40.3 s (relit) to about 4.3 s each. The two runs used different cameras.
- Tests cover PLY parsing, the lighting split, the CPU renderer's geometry and both local servers. Browser tests load the real viewer in headless Chromium on synthetic scenes with known shapes and check normals, lighting and shadows by image statistics. Node unit tests cover the viewer's pure modules.
- CI runs ruff, eslint, prettier, the Node tests, pytest on Python 3.10 and 3.12, and the browser tests on every pull request and push to main.

## What's next

- The CPU renderer still has one directional and one point light, no shadows and no normal smoothing, so its lit output cannot match the viewer yet.
- Commit a CPU render and a viewer screenshot of the same scene from the same camera, side by side, to show the two agree on geometry.
- Higher-order colour terms are ignored, which discards view-dependent signal that could help separate specular from diffuse.
- The viewer is not published online yet. I run it locally.
