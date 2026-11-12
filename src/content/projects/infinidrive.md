---
title: 'InfiniDrive'
summary: 'An endless procedural driving sim in the browser: generated terrain, road networks with junctions and freeways, and hand-written car physics.'
category: 'simulation'
status: 'working'
year: 2026
stack: ['TypeScript', 'Three.js', 'Vite', 'Vitest']
repo: 'https://github.com/TeleVision05/infinidrive'
repoPrivate: true
live: ''
play: ''
featured: false
order: 4
---

## What it does

InfiniDrive lets you drive forever along a generated road network through endless terrain, with no loading screens. It is in the spirit of slowroads.io. Three.js is the only runtime dependency, so the physics, world generation and interface are plain TypeScript.

## How it works

- Terrain is a noise-based height field, streamed in chunks around the car so the world has no edge.
- The road network is structured rather than random: a clean four-way spawn, at-grade junctions, local streets, arterial roads and multi-lane freeways with ramps onto elevated decks, plus lane markings and traffic signals.
- Buildings, trees and roadside structures are placed by district and kept clear of the asphalt.
- Arcade vehicle physics has six gears plus reverse, speed-sensitive steering, a handbrake, real gravity over crests, and grip that depends on the surface (street, highway or off-road).
- A smoothed follow camera looks ahead of the car, and a minimap shows nearby roads and building footprints.
- As of 2026-09-25 there were 13 passing tests (noise, terrain and road layout) and a clean strict-mode build.

## What's next

- The master volume and invert-Y settings exist but are not wired to anything.
- Only keyboard input works; gamepad and touch are planned, along with an optional manual transmission mode.
- The vehicle physics has little test coverage, and the road module needs splitting.
- Traffic on the roads and a hosted deployment are open questions.
