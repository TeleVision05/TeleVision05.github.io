---
title: 'Gaze tracker'
summary: 'A webcam gaze tracker built from geometry alone: dlib landmarks, a pupil centroid and a calibrated quadratic map to screen position.'
category: 'robotics'
status: 'experimental'
year: 2026
stack: ['Python', 'OpenCV', 'dlib', 'NumPy', 'tkinter']
repo: 'https://github.com/TeleVision05/gaze-tracker'
repoPrivate: false
live: ''
play: ''
featured: false
order: 5
---

## What it does

You look at nine green dots on a fullscreen window, and then a red circle follows where you look. It needs only a laptop webcam. I wrote it to see how far plain geometry can go without a trained gaze model.

## How it works

- dlib's 68-point face landmark model finds the eyes, and the eye corners and lids define an eye box.
- The pupil centre is the centroid of the darkest region in the eye crop, found with OpenCV.
- The pupil position is expressed as a ratio relative to the eye corners, which keeps it independent of where the face is in the frame.
- Calibration collects those ratios at nine known screen points and fits a quadratic map to screen coordinates by least squares.
- A live vertical-gain control compensates for weaker vertical tracking.

## Limits

- Accuracy is a few degrees at best, and the head must stay still, because the map assumes a fixed head pose.

## What's next

- Account for head movement, or replace the geometry with a learned gaze model.
