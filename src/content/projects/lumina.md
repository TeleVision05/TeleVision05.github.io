---
title: 'Lumina'
summary: 'Browser AR that reads the live camera, estimates the room lighting and lights a virtual 3D object to match. The app runs; the trained model is still being built.'
category: 'apps'
status: 'in progress'
year: 2026
stack: ['TypeScript', 'three.js', 'onnxruntime-web', 'Vite', 'Python', 'PyTorch']
repo: 'https://github.com/TeleVision05/lumina'
repoPrivate: false
live: ''
play: ''
featured: false
order: 7
---

## What it does

Lumina reads the live camera feed, estimates the lighting of the real room, and lights a virtual 3D object with it. The goal is that the object's shading, colour cast and shadow follow the room. Lighting is stored as spherical harmonics (nine numbers per colour channel that describe light arriving from every direction).

As of 2026-11-13 the browser app runs, but the neural network inside it has random weights. The app says so on screen. The trained model is being built on a separate branch and is not in the app yet.

## How it works

- I wrote a contract file that fixes the camera frame, the spherical harmonic basis, the mirroring rule for selfie cameras and the model's input and output. The Python and TypeScript code are both tested against the same shared test vectors.
- A headless test lights a white sphere in three.js and compares it with a reference image rendered in Python. The mean error was 0.013 of an 8-bit level over 11,620 pixels, as of 2026-11-13.
- The model is an ONNX file (a portable model format). It takes a 128 x 96 RGB image and returns a 9 x 3 array of lighting coefficients.
- The web app grabs a frame about 12 times a second, crops it to 4:3 and shrinks it to 128 x 96. Three estimators can run on it: the neural network in a Web Worker (WebGPU if available, else WebAssembly), simple image statistics, and a fixed studio light.
- A One Euro filter (a smoothing filter that reacts faster when the input moves faster) steadies the estimate. The app splits it into soft ambient light plus one directional light. The shadow fades out in flat light.
- If the model fails to load, the app switches to image statistics and says so. A compare view shows the fixed studio light and Lumina side by side.
- With the placeholder model on an M2 Max in GPU-backed headless Chromium, inference took 0.8 ms median in WebAssembly and the frame interval was 16.6 ms median in the main view, as of 2026-11-13. A trained model will be slower.
- The test suite feeds a fake camera to headless Chromium. It covers lamp tracking, mirroring, camera denied or missing, the model failing to load, keyboard-only use and a phone layout.
- For training, I downloaded 997 free (CC0) HDRIs (360-degree high dynamic range photos) from Poly Haven. They are split by scene into 792 train, 102 validation and 103 test. I hold out 48 HDRIs from ambientCG as an out-of-distribution test.
- Each training image is rendered on the fly from a panorama with a random camera angle, field of view, exposure, white balance, noise and JPEG compression. The label is the lighting of the whole panorama rotated into that camera's frame.
- The network is a compact residual CNN of about 1.5 million parameters, trained from random weights with no ImageNet weights.

## What's next

- Commit an evaluation of the trained model. As of 2026-11-13 no evaluation result is committed. The plan is to report light-direction error in degrees and sphere shading error against three simple baselines, with 95% confidence intervals over HDRIs.
- Swap the trained model in for the placeholder, then re-measure WebGPU against WebAssembly speed.
- Merge the app and training branches into main and deploy the app to GitHub Pages. As of 2026-11-13, CI (automated checks on GitHub) has run once on main and passed.
- Test on real phones and other browsers. So far everything ran in headless Chromium only.
- Add camera tracking. Today the object does not stay put when the camera moves, and the camera's field of view is assumed.
