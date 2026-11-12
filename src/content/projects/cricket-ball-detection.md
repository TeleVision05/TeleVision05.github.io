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

- Frames are extracted from each video into a per-video folder.
- Labelling is assisted: a YOLO model suggests boxes, and I either accept them automatically above a confidence threshold or review them in a matplotlib or tkinter tool.
- Augmentation uses an albumentations pipeline tuned for small, fast-moving objects, since a ball can be only a few pixels wide.
- Training fine-tunes a YOLOv5n model through ultralytics on CPU. A fast variant subsamples to 100 training images at 416 px with no augmentation, which finishes in roughly 10 to 15 minutes.
- Detection runs on images, videos or directories, applies a ball-size filter (20 to 200 px by default) and passes detections through a Kalman filter step.
- All paths and hyperparameters live in one `config.yaml`. Twelve tests cover the utility module.

## What's next

- Only the utility module has tests. Detection, training, augmentation and labelling are checked by hand.
- The Kalman step corrects one filter once per detection, so it does not yet associate detections across frames and is not real tracking.
- The example workflow silently skips augmentation and detection because of a frame-path bug.
- A fresh clone fails the installation check until the git-ignored data folders are created.
