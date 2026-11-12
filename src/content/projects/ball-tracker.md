---
title: 'BallTracker'
summary: 'Cricket bowling analytics from behind-the-stumps video: camera calibration from the stumps, a ball track, and a physics fit that gives speed, swing and turn.'
category: 'robotics'
status: 'working'
year: 2026
stack: ['Python', 'OpenCV', 'NumPy', 'Streamlit', 'FastAPI', 'React']
repo: 'https://github.com/TeleVision05/ball-tracker'
repoPrivate: false
live: ''
play: ''
featured: true
order: 2
---

## What it does

BallTracker takes a clip filmed from behind the stumps and reports release speed, swing, post-bounce turn, and where the ball pitched (line and length), with a plain-language summary. I built it as a camera-based alternative to radar guns and ball-tracking hardware. A second, separate tool in the repo, BallTrace, detects the ball with a local vision-language model.

## How it works

- Camera calibration uses the stumps as known landmarks. You click the stump corners, and PnP (perspective-n-point, which recovers a camera pose from known 3D points and their image positions) gives the camera pose in pitch coordinates.
- Ball detection has HSV colour, motion and hybrid modes, with an optional MediaPipe pose model to seed the release point and a CSRT tracker to follow the ball between detections.
- Trajectory fitting is segmented at the bounce: a gravity model (with optional drag) is fitted separately before and after the bounce, then checked by reprojection error and ray distance.
- Metrics are computed from the fitted trajectory in world coordinates, so they do not depend on where the camera sat.
- A synthetic delivery generator simulates deliveries and renders test video, so the pipeline is tested end to end without real footage.
- The repo has 14 root tests and 43 backend tests, and the frontend builds. As of 2026-09-25 these all passed.

## What's next

- Accuracy is validated on synthetic deliveries only. The first priority is labelling real deliveries with radar speed and a measured bounce marker.
- Publish measured error bands for speed and bounce position once real labels exist.
- Test the Ollama detection path and MediaPipe release seeding on real footage, which no automated check covers yet.
- Split the two oversized modules (the Streamlit app and the hybrid tracker) and add CI.
