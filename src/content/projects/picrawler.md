---
title: 'PiCrawler'
summary: 'A four-legged crab robot on a Raspberry Pi 5, planned around my own leg kinematics, gait code, ROS 2 and a simulated twin.'
category: 'robotics'
status: 'in progress'
year: 2026
stack: ['Python', 'C++', 'ROS 2', 'MuJoCo', 'Raspberry Pi']
repo: ''
repoPrivate: false
live: ''
play: ''
featured: true
order: 1
---

## What it does

This is my current project, and nothing is built yet. The goal is a SunFounder PiCrawler-style crab robot: a Raspberry Pi 5 with a Robot HAT driving 12 servos, plus a camera and an ultrasonic distance sensor. I want to write the control stack myself instead of using the vendor library, then move it from a hobby kit toward something that looks like a real robotics pipeline.

## How it works

This is the plan, in the order I intend to build it.

- Leg inverse kinematics: given a foot target, solve the three joint angles for each leg, first in Python and then rewritten in C++.
- A gait generator for creep, trot and wave gaits, which sequences foot trajectories and keeps the body stable while legs swing.
- ROS 2 Jazzy nodes for the servos and sensors, with a URDF (a robot description file) so the robot can be visualised in RViz.
- A digital twin in MuJoCo or Isaac Lab, a physics simulator where a gait can be trained with reinforcement learning, then deployed back to the Pi.
- Camera and ultrasonic behaviours organised as a state machine, for example approach, stop and avoid.
- Teleoperation of body pose from a Meta Quest headset.

## What's next

- Assemble the kit and confirm all 12 servos move, with calibrated zero positions.
- Write and unit-test the leg inverse kinematics before any gait work.
- Get one stable gait walking on the real robot before starting the simulation side.
