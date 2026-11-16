---
title: 'Relighting'
summary: 'Interactive relighting of a 3D Gaussian Splatting scene from a single baked file, by splitting surface colour from lighting and re-shading it.'
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

A 3D Gaussian Splatting file stores a scene as many small 3D blobs, with the lighting baked into their colour. This tool splits that colour into surface colour and lighting, then lets you add new lights and see the scene re-lit in the browser. It works from one `.ply` file with no training step. It is experimental.

The live demo runs on a lab scene, a mobile equipment cart in a room (196,410 splats, 11.0 MB). Nothing is uploaded; the scene and the code run on your device. The background is blurry and has floaters because it is a splat capture, and the relit view is a plausible re-shading, not a physically exact one. The demo scene is not covered by the repo's MIT licence.

## How it works

- The baked colour in each splat's base spherical-harmonic term is split into a smooth irradiance field and an intrinsic albedo, in the style of Retinex.
- Per-splat normals come from each Gaussian's shortest axis, blended toward a voxel-smoothed field to reduce noise.
- Re-shading uses a Cook-Torrance BRDF with a GGX distribution and up to 8 directional, point or spot lights. Shadows are ray-marched through a density volume built from the splats.
- The viewer is WebGL2 in plain ES modules, with a split view of the baked reference against the relit result, six debug views, four lighting presets and a model picker.
- A NumPy CPU renderer is the reference the viewer is checked against. On the baked and normals views the mean difference is under 1 out of 255.
- In a rough test on an Apple M2 Max the demo scene loads in about 0.5 s and the viewer draws both panes in about 20 ms.

## What's next

- Use the higher-order colour terms, which I currently ignore, to help separate specular from diffuse light.
