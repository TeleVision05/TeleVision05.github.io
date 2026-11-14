---
title: 'EVOMORPH'
summary: 'A software-only evolutionary robotics lab that evolves creature bodies and their gaits in MuJoCo physics. Its first full experiment did not show that evolving both together helps.'
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

EVOMORPH breeds simulated walking creatures. Each creature has a genome (a list of numbers that describes it) for both its body and its gait. Evolution changes them, and MuJoCo (a physics engine) decides whether the result can actually walk. There is no physical robot. Everything runs on a laptop CPU.

The research question comes from my brief: does evolving the body and the controller together give more robust and more varied walking than evolving only the controller for a fixed body? I did not assume the answer was yes, and the answer I got is **not shown**.

As of 2026-11-13 the full comparison has finished: four conditions, 5 seeds each, 20 runs. Joint evolution of body and gait did not beat the alternatives on robustness (champion fitness on held-out terrain) or on behavioural diversity. No primary comparison is significant after correction for multiple tests. The best held-out champions came from morphology-only evolution (median fitness 0.327, against 0.078 for controller-only, 0.058 for joint and 0.120 for joint with MAP-Elites). That condition also started with a hand-designed gait, so it had a head start, and I did not run the control that would separate the head start from the body search. This is a null result, and it says little about the idea itself, because each run evolved only 131 genomes over 6 to 9 generations and 5 seeds can only call a near-complete separation significant. A result that is not significant is not evidence that the conditions are equal.

## How it works

- **Bodies.** A generator turns a genome into MJCF (MuJoCo's XML model format): a torso with 2, 4, 6 or 8 legs in symmetric pairs, each leg one or two segments long, with sizes, masses and joint limits drawn from fixed ranges. The generator checks that every model compiles before it is simulated, and an invalid genome is scored as a failure instead of crashing the run.
- **Gaits.** Each creature runs a central pattern generator, a set of oscillators that send rhythmic targets to every joint. Frequency, amplitudes, phase offsets and the gait pattern (alternating, diagonal, tripod or a metachronal wave) are all genes.
- **Scoring.** The creature settles for 1 s, then walks for 10 s in 2 ms physics steps. Fitness is forward speed multiplied by quality factors for staying upright, going straight, not spinning, saving energy, not slipping and not hopping, minus penalties for falling or standing still. So speed alone cannot win.
- **Search.** There are two engines: a genetic algorithm with elitism and diversity mechanisms, and MAP-Elites, a quality-diversity method that keeps the best creature for each combination of speed and energy efficiency in a 10 x 10 grid.
- **Terrain.** Besides flat ground there are slopes, uneven fields with low obstacles, friction changes and random mixes. Training and held-out test terrains are kept separate, so I can check whether a gait generalises.
- **Experiment.** Four conditions run on equal budgets of 1441 simulations each: A evolves the controller on a fixed quadruped, B evolves the body with the quadruped's own hand-designed gait, C evolves everything with the genetic algorithm, and D evolves everything with MAP-Elites. Creatures train on 11 terrains and are scored on 11 other held-out terrains, with fresh random seeds for the champions. The statistics were fixed before the run: bootstrap intervals and Mann-Whitney tests with Holm correction. A computed verdict reports whether the hypothesis is supported.
- **Dashboard.** A Streamlit dashboard reads a run folder and shows six views: evolution progress, creature inspection, the MAP-Elites archive, statistics, side-by-side comparison and generation history. Every picture is a real genome rendered in MuJoCo.
- **Checks.** CI runs ruff, a file and function size check and the fast pytest suite on every push. As of 2026-11-13 it passes on main. Earlier runs failed because a re-simulated fitness differed in the last digits between Mac and Linux. The tests now compare within a stated tolerance, and runs are bit-identical only within one MuJoCo version on one CPU architecture.
- **Validity.** All 20 runs came from three sessions over one day. Re-simulating the saved champions with the final code reproduced all 20 result records exactly, and the code at the start of the experiment differs from the code at that check only in two dashboard files. The commit was recorded once for the whole experiment, not per run.

## What's next

- The research question is still open. A longer overnight run (482 genomes per run) is the one I would trust more, and I have not made it.
- The comparison is not symmetric. I need a control such as controller-only evolution seeded with the hand-designed gait, to split the head start from the body search.
- I checked all 20 champions for exploits. Four spend over 20 percent of the time airborne (bounding rather than walking), and all 20 slide while their feet are loaded. Two of the five morphology-only champions bound and skate, so part of that condition's speed advantage (0.65 m/s against 0.16 to 0.29) is not clean walking. Without the four airborne champions, morphology-only is still first and joint MAP-Elites second. The fitness charges slip but does not forbid it.
- The held-out terrains are mostly about slope and roughness, so they test grip only weakly. A low-friction terrain costs the champions about a third compared with moderate friction (0.231 against 0.369 mean fitness, a post hoc comparison that is not corrected for repeat testing). I have not run a test built to isolate skating.
- Most champions in A, C and D are worse on held-out terrain than the hand-designed quadruped (0.173). Only 1 of 5 in C and 1 of 5 in D beat it, and none in A.
- New controller types plug in through a registered interface, but I have not built a neural network controller.
