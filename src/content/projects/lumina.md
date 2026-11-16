---
title: 'Lumina'
summary: 'Browser AR that reads the live camera, estimates the room lighting and lights a virtual 3D object to match. It runs live with a trained model, tested on synthetic data only.'
category: 'apps'
status: 'experimental'
year: 2026
stack: ['TypeScript', 'three.js', 'onnxruntime-web', 'Vite', 'Python', 'PyTorch']
repo: 'https://github.com/TeleVision05/lumina'
repoPrivate: false
live: 'https://television05.github.io/lumina/'
play: ''
featured: false
order: 7
---

## What it does

Lumina reads the live camera feed, estimates the room's lighting and lights a virtual 3D object with it, so the object's shading, colour cast and shadow follow the room. Try it in the [live demo](https://television05.github.io/lumina/).

It runs entirely in your browser, and camera frames stay on your device. I have only tested it with a fake camera, never a real webcam, and all measured results are on synthetic panoramas. The model's lighting estimate is weaker than I hoped and varies little between scenes.

## How it works

- Lighting is stored as spherical harmonics, nine numbers per colour channel.
- The model is a small residual CNN (1.59 million parameters, 6.4 MB, exported to ONNX). It takes a 128 x 96 image and returns the lighting coefficients. It runs in a Web Worker on WebGPU or WebAssembly, about 12 times a second.
- A smoothing filter steadies the estimate, and the app splits it into soft ambient light plus one directional light. If the model fails to load, it falls back to simple image statistics and says so.
- I trained it on 997 free Poly Haven HDRI panoramas, rendering each training image on the fly with random camera angle, exposure, white balance, noise and JPEG compression.
- On 103 held-out HDRIs, light direction is off by 30.1 degrees on directional scenes, against 53.1 for guessing the training average. Colour error is 5.5 degrees against 8.7 for the image's average colour.

## What's next

- The model's output barely varies, so lighting stays close to an average. On a plain room it can put the light behind the object when the lamp is upper left.
- Test on a real webcam, with a real-photo test set.
- Add camera tracking. The object does not stay put when the camera moves.
