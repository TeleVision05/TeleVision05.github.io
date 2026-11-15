/**
 * Planar 3-link walking leg with inverse kinematics.
 * A point target leaves one spare degree of freedom: the foot's angle. For any chosen foot angle
 * the ankle position is fixed, and the hip and knee follow in closed form by the law of cosines
 * (always the knee-up branch, so the leg never flips). The solver picks the foot angle nearest a
 * preferred one (pointing straight down, as a robot plants its foot) that keeps the ankle in
 * reach and the ankle inside its joint limit. Below the body that is simply "foot down"; above,
 * beside or behind the hip the foot rotates out, so the whole circle of reach is usable.
 * Units are millimetres in a frame whose origin is the hip joint, +x right, +y up.
 */
export type Vec = { x: number; y: number };
/**
 * `angles` are hip (from +x), knee and ankle (each relative to the previous link), in radians.
 * `footAngle` is the foot angle the solver is aiming for; while `track` is still blending toward
 * it, the drawn foot (`joints[3]`) can lag behind the target for a few frames.
 */
export type Solution = { joints: Vec[]; angles: number[]; reached: boolean; footAngle: number };

export const LINKS = [92, 78, 46]; // femur, tibia, foot (mm)
const [L1, L2, L3] = LINKS;
const MAX = L1 + L2 - 1e-6;
const MIN = Math.abs(L1 - L2) + 1e-6;
/** Foot pointing straight down. */
export const FOOT_DOWN = -Math.PI / 2;
/** Ankle joint limit: the foot may bend at most this far from the line of the shin. */
export const ANKLE_LIMIT = (135 * Math.PI) / 180;
const SEARCH_STEP = Math.PI / 360; // 0.5 degrees
const BISECT = 14;

const wrap = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

/** Forward kinematics: joint positions from hip, knee and ankle angles. */
function fk([hip, knee, ankle]: number[]): Vec[] {
  const out = [{ x: 0, y: 0 }];
  let a = 0;
  [hip, knee, ankle].forEach((rel, i) => {
    a += rel;
    const p = out[i];
    out.push({ x: p.x + LINKS[i] * Math.cos(a), y: p.y + LINKS[i] * Math.sin(a) });
  });
  return out;
}

/** Hip/knee/ankle angles for one foot angle, or null if the ankle is out of reach or over its limit. */
function chain(target: Vec, phi: number): number[] | null {
  const wx = target.x - L3 * Math.cos(phi);
  const wy = target.y - L3 * Math.sin(phi);
  const d = Math.hypot(wx, wy);
  if (d > MAX || d < MIN) return null;
  const cosKnee = (d * d - L1 * L1 - L2 * L2) / (2 * L1 * L2);
  const knee = -Math.acos(Math.min(1, Math.max(-1, cosKnee))); // knee-up branch
  const hip = Math.atan2(wy, wx) - Math.atan2(L2 * Math.sin(knee), L1 + L2 * Math.cos(knee));
  const ankle = wrap(phi - hip - knee);
  return Math.abs(ankle) > ANKLE_LIMIT ? null : [hip, knee, ankle];
}

/** Walk outward from `start` on both sides and return the nearest feasible foot angle. */
function nearestFeasible(target: Vec, start: number): number | null {
  if (chain(target, start)) return start;
  for (let k = 1; k * SEARCH_STEP <= Math.PI; k++) {
    for (const side of [1, -1]) {
      const phi = start + side * k * SEARCH_STEP;
      if (!chain(target, phi)) continue;
      // Bisect back toward `start` so the answer moves smoothly instead of in 0.5 degree steps.
      let lo = start + side * (k - 1) * SEARCH_STEP; // infeasible
      let hi = phi; // feasible
      for (let i = 0; i < BISECT; i++) {
        const mid = (lo + hi) / 2;
        if (chain(target, mid)) hi = mid;
        else lo = mid;
      }
      return hi;
    }
  }
  return null;
}

/**
 * Solve for a foot target, searching for the foot angle outward from `hint` (default: straight
 * down). For a moving target use `track`, which keeps the leg continuous between frames.
 */
export function solve(target: Vec, hint: number = FOOT_DOWN): Solution {
  const phi = nearestFeasible(target, hint);
  if (phi !== null) {
    const angles = chain(target, phi)!;
    return { joints: fk(angles), angles, reached: true, footAngle: phi };
  }
  // Out of reach: stretch the whole leg straight toward the target.
  const a = Math.atan2(target.y, target.x);
  return { joints: fk([a, 0, 0]), angles: [a, 0, 0], reached: false, footAngle: a };
}

// Per frame, the foot angle relaxes back toward pointing down by at most this much (radians)...
const FOOT_RELAX = 0.06;
// ...and by less when that alone would swing a joint further than this (mm). Near a straight
// knee a small foot turn moves the whole leg, so this keeps the relaxing foot from flicking.
const RELAX_JUMP = 3;
// No joint turns more than this per frame (radians, about 11 degrees). Where the reachable foot
// angles split into separate ranges the solution jumps; this turns that jump into a short sweep.
const MAX_JOINT_STEP = 0.2;
// A foot-angle change smaller than this (radians, about 0.06 degrees) counts as settled.
const SETTLED_TURN = 1e-3;

/**
 * Frame-to-frame solve for a moving target: search from the previous foot angle, eased toward
 * FOOT_DOWN, then move the joints toward that solution at a capped speed so the leg never snaps.
 */
export function track(target: Vec, prev: Solution): Solution {
  let relax = Math.max(-FOOT_RELAX, Math.min(FOOT_RELAX, wrap(FOOT_DOWN - prev.footAngle)));
  let goal = solve(target, prev.footAngle + relax);
  const jump = (s: Solution) =>
    Math.max(
      ...[1, 2].map((i) =>
        Math.hypot(s.joints[i].x - prev.joints[i].x, s.joints[i].y - prev.joints[i].y),
      ),
    );
  for (let i = 0; i < 6 && relax !== 0 && jump(goal) > RELAX_JUMP; i++) {
    relax /= 2;
    goal = solve(target, prev.footAngle + relax);
  }
  // Settled: the foot is already on this target and the foot angle has stopped changing. Keep the
  // previous pose; near a straight knee the search's tiny round-off would otherwise move the knee
  // by ~1e-3 rad every frame and the animation would never go idle.
  const onTarget = Math.hypot(prev.joints[3].x - target.x, prev.joints[3].y - target.y) < 1e-3;
  if (onTarget && Math.abs(wrap(goal.footAngle - prev.footAngle)) < SETTLED_TURN) return prev;
  // The hip can turn either way round; knee and ankle stay inside their limits by moving
  // straight between two in-limit values, never wrapping through the folded pose.
  const delta = goal.angles.map((g, i) =>
    i === 0 ? wrap(g - prev.angles[0]) : g - prev.angles[i],
  );
  const k = Math.min(1, MAX_JOINT_STEP / Math.max(1e-9, ...delta.map(Math.abs)));
  if (k === 1) return goal;
  const angles = prev.angles.map((a, i) => a + delta[i] * k);
  return { joints: fk(angles), angles, reached: goal.reached, footAngle: goal.footAngle };
}

/** Relative joint angles in degrees: hip from +x, then each joint relative to the previous link. */
export function jointAngles(j: Vec[]): number[] {
  const abs = LINKS.map((_, i) => Math.atan2(j[i + 1].y - j[i].y, j[i + 1].x - j[i].x));
  return abs.map((a, i) => {
    const rel = i === 0 ? a : wrap(a - abs[i - 1]);
    return (rel * 180) / Math.PI;
  });
}

export function restPose(): Solution {
  // A crouched stance: foot planted down and out from the hip.
  return solve({ x: 70, y: -150 });
}
