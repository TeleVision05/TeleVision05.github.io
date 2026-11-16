---
title: 'Cricket ball detection'
summary: 'A CPU-only pipeline for finding a cricket ball in match video: frame extraction, assisted labelling, YOLOv5n training and detection.'
category: 'robotics'
status: 'experimental'
year: 2026
stack: ['Python', 'PyTorch', 'ultralytics YOLOv5n', 'OpenCV', 'albumentations']
repo: 'https://github.com/TeleVision05/cricket-ball-detection'
repoPrivate: true
live: ''
play: ''
featured: false
order: 7
---

## What it does

This pipeline takes match video and ends with a trained model that finds the ball in new images or clips, writing annotated output plus CSV and JSON results. It is built to run on a Mac laptop with no GPU, which shapes most of the design choices.

## How it works

- Frames are extracted from each video.
- Labelling is assisted. A YOLO model suggests boxes, and I either accept them above a confidence threshold or review them in a small labelling tool.
- Augmentation uses an albumentations pipeline tuned for small, fast-moving objects, since a ball can be only a few pixels wide.
- Training fine-tunes YOLOv5n through ultralytics on CPU. A fast variant uses 100 training images at 416 px and finishes in roughly 10 to 15 minutes.
- Detection runs on images, videos or directories, filters by ball size and passes detections through a Kalman filter step.
- All paths and hyperparameters live in one `config.yaml`.

## What's next

- The Kalman step does not yet link detections across frames, so it is not real tracking.
- The example workflow skips augmentation and detection because of a frame-path bug.
