---
title: 'Relighting'
summary: 'Interactive relighting of a 3D Gaussian Splatting scene from a single baked file, by splitting albedo from lighting and re-shading it.'
category: 'robotics'
status: 'experimental'
year: 2026
stack: ['JavaScript', 'WebGL2', 'GLSL', 'Python', 'NumPy']
repo: 'https://github.com/TeleVision05/Relighting'
repoPrivate: false
live: ''
play: ''
featured: false
order: 4
---

## What it does

A standard 3D Gaussian Splatting file (a scene stored as many small 3D blobs, or splats) has its lighting baked into the colour. This tool separates that baked colour into surface colour and lighting, then lets you add new lights and see the scene re-lit in the browser. It works from one `.ply` file with no training step.

## How it works

- The baked colour in each splat's base spherical-harmonic term is split into a smooth irradiance field and an intrinsic albedo, in the style of Retinex (a classic method for separating lighting from surface colour).
- Per-splat normals come from each Gaussian's shortest axis, blended toward a voxel-smoothed field to reduce noise.
- Re-shading uses a Cook-Torrance BRDF with a GGX distribution, with up to 8 directional, point or spot lights.
- Shadows are ray-marched through a per-model density volume built from the splats.
- The viewer is a WebGL2 page with a split view of the baked reference against the relit result, six G-buffer debug modes and a model picker. A numpy CPU renderer serves as a reference for geometry and the lighting split.
- Eight tests pass on a synthetic splat file, covering PLY parsing, the lighting split, the CPU render modes and the servers.

## What's next

- The two renderers disagree on quaternion order, so CPU normals and orientations are wrong on real exports. Fixing this is the first milestone.
- The CPU renderer uses only one of the three Gaussian scales and loops per pixel in Python, so full-size renders take minutes.
- The WebGL viewer has no automated test; I only check it by hand.
- Higher-order colour terms are ignored, which discards view-dependent signal that could help separate specular from diffuse.
