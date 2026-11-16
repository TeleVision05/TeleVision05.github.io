---
title: 'Apex Turismo'
summary: 'A Gran Turismo-style racing game in the browser with ten real circuits, 46 cars and a hand-written rigid-body vehicle model.'
category: 'simulation'
status: 'working'
year: 2026
stack: ['TypeScript', 'Three.js', 'Vite', 'Vitest', 'Blender']
repo: 'https://github.com/TeleVision05/apex-turismo'
repoPrivate: false
live: ''
play: '/play/apex-turismo/'
featured: true
order: 1
---

## What it does

Apex Turismo is a 3D racing game that runs entirely in the browser, with no framework and no backend. It has ten circuits traced from OpenStreetMap, 46 cars across seven classes, AI opponents, weather, replays and a career mode. I built it to see how much real vehicle dynamics fits in a browser game.

## How it works

- Tracks are traced from OpenStreetMap with real elevation and corner names, and include Suzuka, Monza, Spa-Francorchamps and Silverstone.
- The vehicle is a rigid body with four spring-damper wheels, Ackermann steering, weight transfer and aero.
- Tyres use a combined-slip model with load sensitivity and relaxation length, so grip builds up over distance rather than instantly.
- The drivetrain has a torque-curve engine and an automatic gearbox that does not hunt between gears, with ABS and traction-control assists.
- AI cars follow an optimised racing line and can overtake and recover.
- Car models go through a headless Blender pipeline, and engine audio comes from Web Audio. Input works from keyboard, gamepad or steering wheel.

## What's next

- AI lap times were about 30 percent slower than real-world times at the last measurement, before the tyre rework.
- The game ships as one 989 kB bundle, so lazy loading is the planned fix.
