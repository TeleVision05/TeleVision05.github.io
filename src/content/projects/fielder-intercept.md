---
title: 'Fielder intercept'
summary: 'A cricket simulation that solves which fielders can reach a hit ball, where, and how soon, using an exact intercept equation.'
category: 'robotics'
status: 'experimental'
year: 2026
stack: ['Python', 'NumPy', 'matplotlib', 'pygame', 'pytest']
repo: 'https://github.com/TeleVision05/fielder-intercept'
repoPrivate: false
live: ''
play: ''
featured: false
order: 6
---

## What it does

Given a ball leaving the bat with some velocity and a ring of fielders with known positions and running speeds, this finds which fielders can reach the ball, at what point, and how soon. The maths lives in a pure module with no display code, and three throwaway front-ends sit on top of it: a matplotlib animation, a pygame 2D game and an untested ursina 3D prototype.

## How it works

- The intercept is a pursuit problem: find the earliest time at which a fielder running at fixed speed can reach a point on the ball's path. That reduces to a quadratic in time, with a separate linear case when the speeds are equal.
- Fielders are ranked by interception time, with a fallback chase for balls nobody can catch.
- Positions use one unit-circle convention with the batter at the origin, and each named fielding position is an angle and a fraction of the boundary radius, so the same table drives different field sizes.
- Field sets come from that table and are checked for their off-side and leg-side counts.
- The pytest suite covers a stationary ball, a ball running away, a head-on ball and the equal-speed branch, and checks that importing the package pulls in no graphics libraries.

## What's next

- The pygame game compiles and its position mapping is tested, but I have not played it end to end in this repo.
- The ursina 3D prototype is untested.
- Fielder ranking and catch finding are tested only in the pure module; the front-ends are throwaway prototypes.
