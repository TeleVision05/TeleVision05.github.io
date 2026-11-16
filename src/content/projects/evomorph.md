---
title: 'EVOMORPH'
summary: 'A software-only lab that evolves the bodies and gaits of walking creatures in MuJoCo physics. Its first full experiment did not show that evolving both together helps.'
category: 'simulation'
status: 'experimental'
year: 2026
stack: ['Python', 'MuJoCo', 'NumPy', 'SciPy', 'Matplotlib', 'Streamlit', 'Plotly', 'pytest']
repo: 'https://github.com/TeleVision05/evomorph'
repoPrivate: false
live: ''
play: ''
featured: false
order: 8
---

## What it does

EVOMORPH breeds simulated walking creatures. Each creature has a genome for its body and one for its gait, evolution changes them, and the MuJoCo physics engine decides whether the result can walk. There is no physical robot. Everything runs on a laptop CPU.

The question: does evolving the body and the controller together give more robust and more varied walking than evolving only the controller on a fixed body? My first full experiment did not show that it does, and the question is still open. I ran four conditions with 5 seeds each (20 runs). Joint evolution did not beat the alternatives on robustness (fitness on held-out terrain) or on diversity, and no primary comparison was significant after correction.

The best held-out champions came from morphology-only evolution (median fitness 0.327, against 0.078 for controller-only and 0.058 for joint). That condition started with a hand-designed gait, so it had a head start I have not controlled for. Each run evolved only 131 genomes over 6 to 9 generations, so this is a null result and says little about the idea itself.

## How it works

- **Bodies.** A generator turns a genome into a MuJoCo model: a torso with 2, 4, 6 or 8 legs in symmetric pairs, each leg one or two segments long. Invalid genomes score as failures instead of crashing the run.
- **Gaits.** Each creature runs a central pattern generator, a set of oscillators that drive every joint. Frequency, amplitudes, phase offsets and gait pattern are all genes.
- **Scoring.** Fitness is forward speed times quality factors for staying upright, going straight, saving energy and not slipping, minus penalties for falling or standing still.
- **Search.** A genetic algorithm with elitism, and MAP-Elites, which keeps the best creature for each speed and efficiency combination.
- **Terrain.** Creatures train on 11 terrains (slopes, uneven fields, friction changes) and are scored on 11 held-out ones. A Streamlit dashboard shows the runs.

## What's next

- Run a control with the controller-only condition seeded with the hand-designed gait, to separate the head start from the body search.
- Some champions bound or skate rather than walk, so part of the morphology-only speed advantage is not clean walking.
