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

This pipeline converts video of a real bowler into a clean animation clip for a Unity Humanoid character. One bowler has been taken all the way from broadcast footage to an FBX file in Unity. It exists to give my cricket games realistic bowling actions without hand-animating them.

## How it works

- Monocular motion capture (body pose recovered from a single camera) comes from GVHMR, run through a custom wrapper for Apple Silicon.
- A conversion step turns the GVHMR output into a motion file of SMPL body parameters.
- Numpy cleanup filters the motion and retimes slow-motion footage back to real time at 60 fps.
- Helpers assemble a full take from a clean run-up cycle plus the captured delivery, or a continuous take from dense slow-motion capture.
- Blender scripts retarget the motion onto a Quaternius UE4-named rig, detect the ball release to place finger grips, pin the feet to stop sliding, and render QA stills.
- A comparison video puts the reference footage next to the rig, and a final stage exports FBX for Unity. The numpy helpers have 6 passing tests; the Blender and GVHMR stages are verified by hand.

## What's next

- The project path is hard-coded, and some scripts import torch at the top level, so setup on another machine needs edits.
- The custom GVHMR wrapper lives only in an ignored local clone and still has to be vendored into the repo.
- The Blender stages have no automated tests.
- Only one bowler has been taken through the full pipeline.
