---
title: 'Relighting'
summary: 'Interactive relighting of a 3D Gaussian Splatting scene from a single baked file, by splitting albedo from lighting and re-shading it.'
category: 'robotics'
status: 'experimental'
year: 2026
stack: ['JavaScript', 'WebGL2', 'GLSL', 'Python', 'NumPy', 'Playwright']
repo: 'https://github.com/TeleVision05/Relighting'
repoPrivate: false
live: 'https://television05.github.io/Relighting/'
play: ''
featured: false
order: 4
---

## What it does

A standard 3D Gaussian Splatting file (a scene stored as many small 3D blobs, or splats) has its lighting baked into the colour. This tool separates that baked colour into surface colour and lighting, then lets you add new lights and see the scene re-lit in the browser. It works from one `.ply` file with no training step. As of 2026-11-13 it is still experimental.

The live demo runs the viewer in your browser on a lab scene (a mobile equipment cart in a room, 196,410 splats, 11.0 MB). Nothing is uploaded: the scene and the code run on your device. The scene is a 3D Gaussian Splatting capture, so the background is blurry and has floaters. The relit pane is a plausible re-shading, not a physically exact one. The demo scene is not covered by the repo's MIT licence.

## How it works

- The baked colour in each splat's base spherical-harmonic term is split into a smooth irradiance field and an intrinsic albedo, in the style of Retinex (a classic method for separating lighting from surface colour).
- Per-splat normals come from each Gaussian's shortest axis, blended toward a voxel-smoothed field to reduce noise. A local plane fit is only trusted when at least 8 splats sit near it, so sparse areas keep their own axis.
- Re-shading uses a Cook-Torrance BRDF with a GGX distribution, with up to 8 directional, point or spot lights.
- Shadows are ray-marched through a per-model density volume built from the splats.
- The viewer is a WebGL2 page with a split view of the baked reference against the relit result, six G-buffer debug modes (views of one stored layer, such as albedo or normals), four lighting presets and a model picker. It is plain ES modules with no build step, and scenes load in a background worker with a progress bar.
- A NumPy CPU renderer is the reference the viewer is checked against. It now reads rotations in the same order as the viewer, builds each splat's shape from all three scales, uses the viewer's orbit camera and composites in tiles instead of a per-pixel Python loop.
- Tests cover PLY parsing, the lighting split, the CPU renderer's geometry and both local servers. Browser tests load the real viewer in headless Chromium on synthetic scenes with known shapes and check normals, lighting and shadows by image statistics. Node unit tests cover the viewer's pure modules.
- A browser test checks the CPU renderer against the viewer on the same scene and camera. On the baked and normals views the mean difference is under 1 and the 99th percentile under 4, out of 255, on the test scenes.
- As of 2026-11-13 there are 470 Python tests (plus 36 browser tests) and 61 Node unit tests. CI runs ruff, eslint, prettier, the Node tests, pytest on Python 3.10 and 3.12, and the browser tests on every pull request and push to main. All four CI jobs passed on the open pull request, which is not merged into main yet.
- A GitHub Pages workflow publishes the viewer and its demo scene on every push to main. The demo scene is a slimmed copy of a larger capture: low-opacity small splats were dropped to fit 11 MB, and a person who walked into the capture was cropped out.
- As of 2026-11-13, on an Apple M2 Max the demo scene loads in about 0.5 s and the viewer draws both panes in about 20 ms, around 50 frames a second. That was measured in headless Chromium on the GPU while the machine was busy.

## What's next

- The CPU renderer still has one directional and one point light, no shadows and no normal smoothing, so its lit output cannot match the viewer. Only the baked and normals views are compared.
- Higher-order colour terms are ignored, which discards view-dependent signal that could help separate specular from diffuse.
- As of 2026-11-13, the CPU renderer takes about 1.7 s for an 800 by 600 image of the sample scene, on a busy laptop. The old per-pixel renderer took 25 to 110 s. I have not measured a quiet machine.
