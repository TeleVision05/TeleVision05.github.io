---
title: 'EVOMORPH'
summary: 'A software-only evolutionary robotics lab that evolves creature bodies and their gaits together in MuJoCo physics, with no hardware.'
category: 'simulation'
status: 'in progress'
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

EVOMORPH breeds simulated walking creatures. Each creature has a genome (a list of numbers that describes it) for both its body and its gait. Evolution changes both, and MuJoCo (a physics engine) decides whether the result can actually walk. There is no physical robot. Everything runs on a laptop CPU.

The research question comes from my brief: does evolving the body and the controller together give more robust and more varied walking than evolving only the controller for a fixed body? I do not assume the answer is yes.

As of 2026-11-13, a quick single-seed run of the genetic algorithm (6000 simulations) evolved an eight-legged creature with two-segment legs and a metachronal gait (a wave that runs down the legs) at 2.24 Hz. It covered about 6.6 m in 10 s, and its fitness on held-out spawn seeds (1.028) was no worse than on the seeds it was selected on (1.021). For comparison, the best of 300 random creatures went 1.98 m in 10 s.

## How it works

- **Bodies.** A generator turns a genome into MJCF (MuJoCo's XML model format): a torso with 2, 4, 6 or 8 legs in symmetric pairs, each leg one or two segments long, with sizes, masses and joint limits drawn from fixed ranges. Invalid genomes are repaired so they always build.
- **Gaits.** Each creature runs a central pattern generator, a set of oscillators that send rhythmic targets to every joint. Frequency, amplitudes, phase offsets and the gait pattern (alternating, diagonal, tripod or a metachronal wave) are all genes.
- **Scoring.** The creature settles for 1 s, then walks for 10 s in 2 ms physics steps. Fitness is forward speed multiplied by quality factors for staying upright, going straight, not spinning, saving energy, not slipping and not hopping, minus penalties for falling or standing still. So speed alone cannot win.
- **Search.** There are two engines: a genetic algorithm with elitism and diversity mechanisms, and MAP-Elites, a quality-diversity method that keeps the best creature for each combination of speed and energy efficiency in a 10 x 10 grid.
- **Terrain.** Besides flat ground there are slopes, uneven fields with low obstacles, friction changes and random mixes. Training and held-out test terrains are kept separate, so I can check whether a gait generalises.
- **Experiment.** The comparison runs four conditions on equal simulation budgets: controller-only on a fixed quadruped, body-only with a fixed baseline controller, joint evolution with the GA, and joint evolution with MAP-Elites. It reports bootstrap intervals, Mann-Whitney tests and a computed verdict.
- **Dashboard.** A Streamlit dashboard reads a run folder and shows six views: evolution progress, creature inspection, the MAP-Elites archive, statistics, side-by-side comparison and generation history. Every picture is a real genome rendered in MuJoCo.
- **Checks.** CI runs ruff, a file and function size check and the fast pytest suite on every push. Results are bit-identical between runs, but only within one MuJoCo version.

## What's next

- As of 2026-11-13 the full comparison (5 seeds, 4 conditions, 1441 simulations per run) is running and has finished its first run of 20. I have no result for the research question yet.
- The 2-seed smoke test of that experiment cannot answer the question. Its computed verdict was "not shown", and most of its champions were worse than the hand-designed quadruped.
- The evolved walkers skate. About 70% of the GA champion's foot load is delivered while its feet slide, and friction barely changes its distance. Fixing that needs a change to the physics or the score, which I have not made.
- MAP-Elites kept behaviours apart but not bodies: 54 of its 62 elites in the quick run share one six-legged body plan.
- 1441 simulations is very little evolution. A longer overnight run is the one I would trust more.
- New controller types plug in through a registered interface, but I have not built a neural network controller yet.
