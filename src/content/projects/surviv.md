---
title: 'Surviv'
summary: 'A single-player browser battle royale built from scratch: loot tables, bots, collision and line of sight, a shrinking storm and a 3D renderer.'
category: 'simulation'
status: 'experimental'
year: 2026
stack: ['JavaScript', 'Three.js', 'Rapier', 'Vite', 'Vitest']
repo: 'https://github.com/TeleVision05/surviv'
repoPrivate: true
live: ''
play: ''
featured: false
order: 6
---

## What it does

You spawn in the middle of a 3000 by 3000 map scattered with houses, rocks and loot crates. A handful of bots spawn around you, a poison storm closes in, and the last one standing wins. It is a personal sandbox for building a small game loop from scratch.

## How it works

- An entity system covers players, bots, houses, crates and ground pickups, and loot tables have rarity tiers for guns, ammo, scopes, backpacks and bandages.
- Collision uses axis-aligned bounding boxes, and bot vision uses line-of-sight raycasting.
- A storm manager handles timing and damage as the safe zone shrinks.
- The map generator places structures randomly, and tests use a seeded generator to check that generation is deterministic.
- The active front end is first-person Three.js with Rapier physics. An older 2D canvas version shares the same data model but is no longer used.

## What's next

- Fix a known storm bug in 3D mode.
- The game has only been hand-played, never soak-tested.
