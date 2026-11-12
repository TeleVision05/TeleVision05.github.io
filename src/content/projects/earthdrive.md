---
title: 'EarthDrive'
summary: 'A prototype browser driving sandbox that fetches live OpenStreetMap buildings and roads around San Francisco and places them as boxes.'
category: 'simulation'
status: 'experimental'
year: 2026
stack: ['JavaScript', 'Three.js', 'OpenStreetMap Overpass']
repo: 'https://github.com/TeleVision05/earthdrive'
repoPrivate: true
live: ''
play: ''
featured: false
order: 5
---

## What it does

EarthDrive is a small sandbox for the idea of driving around a real-world map. A simple car you steer with WASD moves over a flat world, and buildings and roads are fetched live from OpenStreetMap near a fixed point in San Francisco. It is a prototype, and the map rendering is placeholder boxes.

## How it works

- Map data comes from the public Overpass API, queried by a bounding box around the car.
- A small geo module converts latitude and longitude into scene units, builds the query box, finds the centroid of each building outline and decides when the car has moved far enough to re-centre the map.
- The vehicle physics module computes speed, heading and displacement per frame. It has no DOM or three.js dependency, so it can be tested alone.
- The car is a box with four cylinders, followed by a chase camera.
- The physics and geo modules are covered by offline `node --test` suites. The three.js-facing files are only syntax-checked.
- There is no build step: the page loads three.js from a CDN through an import map.

## What's next

- Map rendering is placeholder boxes, so real building footprints and road geometry come first.
- The roadmap lists a re-centre bug that can hammer the public Overpass service.
- Mouse look does nothing, because the follow camera overrides OrbitControls every frame.
