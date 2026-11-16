---
title: 'Cricket bowling animations'
summary: 'A pipeline that turns broadcast bowling footage into game-ready Unity animations using monocular mocap, numpy cleanup and Blender retargeting.'
category: 'robotics'
status: 'experimental'
year: 2026
stack: ['Python', 'NumPy', 'Blender', 'GVHMR', 'Unity']
repo: 'https://github.com/TeleVision05/cricket-bowling-anims'
repoPrivate: true
live: ''
play: ''
featured: false
order: 8
---

## What it does

This pipeline converts video of a real bowler into a clean animation clip for a Unity Humanoid character. It exists to give my cricket games realistic bowling actions without hand-animating them. One bowler has been taken all the way from broadcast footage to an FBX file in Unity.

## How it works

- GVHMR recovers body pose from a single camera, run through a custom wrapper for Apple Silicon that is not in the repo yet.
- A conversion step turns its output into a motion file of SMPL body parameters.
- NumPy cleanup filters the motion and retimes slow-motion footage back to real time at 60 fps.
- Helpers assemble a full take from a clean run-up cycle plus the captured delivery.
- Blender scripts retarget the motion onto a Quaternius rig, detect the ball release to place finger grips, pin the feet to stop sliding and render QA stills.
- A comparison video puts the reference footage next to the rig, and a final stage exports FBX for Unity.

## What's next

- Setup on another machine needs edits, because the project path is hard-coded.
- Only one bowler has been through the full pipeline.
