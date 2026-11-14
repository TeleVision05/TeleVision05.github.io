---
title: 'Lumina'
summary: 'Browser AR that reads the live camera, estimates the room lighting and lights a virtual 3D object to match. It runs live in the browser with a trained model, but it has been measured on synthetic data only.'
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

Lumina reads the live camera feed, estimates the lighting of the real room, and lights a virtual 3D object with it. The object's shading, colour cast and shadow follow the room. Lighting is stored as spherical harmonics (nine numbers per colour channel that describe light arriving from every direction).

The live app is embedded above and runs entirely in your browser. Camera frames stay on your device, and a test fails if the app makes any request to another origin. As of 2026-11-14 I have tested it only in headless Chromium with a fake camera, never a real webcam. The shipped model is the step-29,000 checkpoint of a training run, and its results are weaker than I would like, as described below.

## How it works

- I wrote a contract file that fixes the camera frame, the spherical harmonic basis, the mirroring rule for selfie cameras and the model's input and output. The Python and TypeScript code are both tested against the same shared test vectors.
- The model is an ONNX file (a portable model format) of 1.59 million parameters and 6.4 MB. It takes a 128 x 96 RGB image and returns a 9 x 3 array of lighting coefficients.
- The web app grabs a frame about 12 times a second, crops it to 4:3 and shrinks it to 128 x 96. Three estimators can run on it: the neural network in a Web Worker (WebGPU if available, else WebAssembly), simple image statistics, and a fixed studio light.
- A One Euro filter (a smoothing filter that reacts faster when the input moves faster) steadies the estimate. The app splits it into soft ambient light plus one directional light, and the shadow fades out in flat light. If the model fails to load, the app switches to image statistics and says so. A compare view shows the fixed studio light and Lumina side by side, as in the clip above.
- For training, I used 997 free (CC0) HDRIs (360-degree high dynamic range photos) from Poly Haven, split by scene into 792 train, 102 validation and 103 test. I hold out 48 HDRIs from ambientCG as an out-of-distribution test.
- Each training image is rendered on the fly from a panorama with a random camera angle, field of view, exposure, white balance, noise and JPEG compression. The label is the lighting of the whole panorama rotated into that camera's frame. The network is a compact residual CNN trained from random weights.
- I launched the run for 50,000 steps and stopped it at about step 29,000, after 1.84 hours on one laptop GPU. I picked that checkpoint by validation error, not by test results.
- As of 2026-11-14, on the 103 held-out test HDRIs (1,545 synthetic camera crops), the model beats three simple baselines on average error, with one exception: on scale-invariant error it is not clearly better than the average-colour baseline. Its colour error is 5.5 degrees against 8.7 for the image's average colour, and its light-direction error on directional scenes is 30.1 degrees against 53.1 for always guessing the training average. Its sRGB error is 37.1 levels (out of 255) against 99.7 for the training average. Ranges and all baselines are in the repo's evaluation file.
- On the 48 out-of-distribution ambientCG HDRIs it also beats every baseline on every metric.
- A truth test plays a clip with known lighting as the fake camera in the production build. As the environment turns, the estimated light direction follows the true one (agreement 0.99 in ten runs, against 0.03 to 0.07 for a reversed sweep), and the displayed light matches the true bright side in 99 to 100 percent of samples.
- As of 2026-11-14, with the shipped model on an M2 Max in headless Chromium, network inference took 4.1 to 4.4 ms median on WebAssembly and 5.5 to 7.4 ms on WebGPU, and the frame interval was 16.7 ms median.

## What's next

- **The model's output barely varies.** On the test crops the variance of its predicted coefficients is 1.0 percent of the label variance, so the lighting stays close to an average while still moving in the right direction and colour. It is wrong on some scenes. On a plain synthetic room it says the light is behind the object although the lamp is upper left.
- Nothing is measured on a real webcam, and there is no real-photo test set with ground-truth lighting. Every number above is on synthetic crops. Doing that comes first.
- Light direction is about 30 degrees off on average on directional scenes, and diffuse scenes have no meaningful direction. Brightness is only relative to the frame's exposure, and nine coefficients cannot show hard shadows or sharp highlights.
- I have not tried training longer. The 50,000-step schedule was stopped at about step 29,000, so a full run is untested.
- Test on real phones and other browsers.
- Add camera tracking. Today the object does not stay put when the camera moves, and the camera's field of view is assumed.
