---
title: 'BallTracker'
summary: 'Cricket bowling analytics from a phone video filmed behind the bowler: camera calibration from the stumps, a ball track, and a physics fit for release speed, pitch point and turn.'
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

BallTracker measures a cricket delivery from a video filmed behind the bowler's stumps. It reports release speed, where the ball pitched (line and length) and how much it turned off the pitch. I built it as a camera-based alternative to radar guns and ball-tracking hardware. It is a research prototype.

It has three parts: an analytics package with a Streamlit app and command line, an Android app that records high-speed clips, and BallTrace, a separate experiment that detects the ball with a local vision-language model through Ollama.

`balltracker demo` simulates a 134 km/h delivery, renders it as a 1080p, 120 fps clip and runs the real pipeline on it. In the run shown here the speed reads 142.8 km/h against a true 134.0.

## How it works

- Calibration uses the stumps as known landmarks. You mark the stump bases, and a perspective-n-point solve gives the camera pose in pitch coordinates.
- On the Android app you drag markers onto the stump bases while recording, so a phone clip skips the clicking step.
- Ball detection has colour, motion and hybrid modes. Hybrid can use MediaPipe pose to find the release point and a CSRT tracker to follow the ball.
- The trajectory is fitted separately before and after the bounce, using a gravity model with optional drag.
- Metrics come from the fitted path in pitch coordinates, so they do not depend on where the camera sat.
- A delivery simulator renders test video, and `balltracker benchmark` reports accuracy over many simulated deliveries.

## What's next

- It does not work on real footage yet. My only two real clips (24 fps stock nets footage) gave no believable speed or bounce.
- On 500 simulated deliveries with phone-like noise, the median error is 7.9 km/h for speed, 2 cm for line and 94 cm for length. Swing is not estimated and always reads 0 degrees.
