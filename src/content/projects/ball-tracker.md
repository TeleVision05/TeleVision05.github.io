---
title: 'BallTracker'
summary: 'Cricket bowling analytics from a phone video filmed behind the bowler: camera calibration from the stumps, a ball track, and a physics fit that gives release speed, where the ball pitched and how much it turned.'
category: 'robotics'
status: 'experimental'
year: 2026
stack:
  [
    'Python',
    'OpenCV',
    'NumPy',
    'MediaPipe',
    'Streamlit',
    'Kotlin',
    'Jetpack Compose',
    'FastAPI',
    'React',
  ]
repo: 'https://github.com/TeleVision05/ball-tracker'
repoPrivate: false
live: ''
play: ''
featured: true
order: 2
---

## What it does

BallTracker measures a cricket delivery from a video filmed behind the bowler's stumps. It reports release speed, where the ball pitched (line and length) and how much it turned off the pitch, with plain-language checks on every result. I built it as a camera-based alternative to radar guns and ball-tracking hardware. It is a research prototype.

There are three parts in the repo. The analytics package has a Streamlit app and a command line. An Android app records high-speed clips on the phone. BallTrace is a separate experiment that detects the ball with a local vision-language model through Ollama.

One command, `balltracker demo`, simulates a 134 km/h delivery, renders it as a 1920x1080, 120 fps clip and runs the real pipeline on it. In the run shown here the speed reads 142.8 km/h against a true 134.0, and the bounce is 0.56 m fuller than it really was.

## How it works

- Camera calibration uses the stumps as known landmarks. You click the stump bases, and PnP (perspective-n-point, which recovers a camera pose from known 3D points and their image positions) gives the camera pose in pitch coordinates.
- The Android app, written in Kotlin and Compose, lets you drag four markers onto the stump bases on the capture screen. It saves a JSON sidecar next to each clip with those marks, the camera's intrinsics and the frame timestamps, so a phone clip skips the clicking step.
- Ball detection has colour (red or white ball), motion and hybrid modes. The default hybrid mode can use a MediaPipe pose model to find the release point, and a CSRT tracker (an OpenCV object tracker) to follow the ball between detections.
- Trajectory fitting is split at the bounce. A gravity model, with optional drag, is fitted separately before and after the bounce.
- Metrics come from the fitted path in pitch coordinates, so they do not depend on where the camera sat.
- A delivery simulator renders test video, so the whole pipeline is tested without real footage. `balltracker benchmark` runs it over many simulated deliveries and writes an accuracy report.
- As of 2026-11-13, pytest collects 149 tests in the analytics package and 111 in the BallTrace backend, and the Android app has 13 unit tests. GitHub Actions CI is set up to run these, lint and the BallTrace frontend tests and build on every pull request and push to main.

## What's next

- As of 2026-11-13, accuracy is measured on synthetic deliveries only. Over 500 simulated deliveries with phone-like detection noise, the median error is 7.9 km/h for release speed, 2 cm for line and 94 cm for length.
- The biggest known error source is the tracker's outlier filter. It drops the frames around the bounce. Skipping it lowers the median speed error from 7.9 to 3.4 km/h in the same benchmark, so fixing it comes first.
- Swing is not estimated yet. It always reads 0 degrees.
- It does not work on real footage yet. As of 2026-11-13, 26 runs on the only two real clips I have (24 fps stock nets footage) gave no believable speed or bounce. No phone capture from the Android app has been analysed yet.
- Next I need to record at least 5 deliveries with the Android app, label at least 5 real deliveries with radar speed and a measured bounce marker, and publish measured error bands.
- As of 2026-11-13, most of this work is on a branch that is not merged into main. On its first CI run the analytics tests failed on both Python versions, because two test files could not import a shared test module. They pass locally, but not in CI yet.
- I also need to decide whether BallTrace feeds the physics fit or moves to its own repo, and split the one Android file still over 500 lines.
