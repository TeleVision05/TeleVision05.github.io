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
export type Solution = { joints: Vec[]; reached: boolean; footAngle: number };

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

/** Hip/knee/ankle chain for one foot angle, or null if the ankle is out of reach or over its limit. */
function chain(target: Vec, phi: number): Vec[] | null {
  const wx = target.x - L3 * Math.cos(phi);
  const wy = target.y - L3 * Math.sin(phi);
  const d = Math.hypot(wx, wy);
  if (d > MAX || d < MIN) return null;
  const cosKnee = (d * d - L1 * L1 - L2 * L2) / (2 * L1 * L2);
  const knee = -Math.acos(Math.min(1, Math.max(-1, cosKnee))); // knee-up branch
  const hip = Math.atan2(wy, wx) - Math.atan2(L2 * Math.sin(knee), L1 + L2 * Math.cos(knee));
  if (Math.abs(wrap(phi - hip - knee)) > ANKLE_LIMIT) return null;
  const p1 = { x: L1 * Math.cos(hip), y: L1 * Math.sin(hip) };
  const p2 = { x: p1.x + L2 * Math.cos(hip + knee), y: p1.y + L2 * Math.sin(hip + knee) };
  return [{ x: 0, y: 0 }, p1, p2, { x: target.x, y: target.y }];
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
 * down). For a moving target use `track`, which keeps the foot angle continuous between frames.
 */
export function solve(target: Vec, hint: number = FOOT_DOWN): Solution {
  const phi = nearestFeasible(target, hint);
  if (phi !== null) return { joints: chain(target, phi)!, reached: true, footAngle: phi };
  // Out of reach: stretch the whole leg straight toward the target.
  const a = Math.atan2(target.y, target.x);
  const u = { x: Math.cos(a), y: Math.sin(a) };
  let s = 0;
  const joints = [0, ...LINKS].map((l) => {
    s += l;
    return { x: u.x * s, y: u.y * s };
  });
  return { joints, reached: false, footAngle: a };
}

// Per frame, the foot angle relaxes back toward pointing down by at most this much (radians)...
const FOOT_RELAX = 0.06;
// ...and by less when that alone would swing a joint further than this (mm). Near a straight
// knee a small foot turn moves the whole leg, so this keeps the relaxing foot from flicking.
const RELAX_JUMP = 3;

/**
 * Frame-to-frame solve for a moving target: search from the previous foot angle, eased toward
 * FOOT_DOWN, so the foot turns continuously instead of snapping between solutions.
 */
export function track(target: Vec, prev: Solution): Solution {
  let relax = Math.max(-FOOT_RELAX, Math.min(FOOT_RELAX, wrap(FOOT_DOWN - prev.footAngle)));
  let res = solve(target, prev.footAngle + relax);
  const jump = (s: Solution) =>
    Math.max(
      ...[1, 2].map((i) =>
        Math.hypot(s.joints[i].x - prev.joints[i].x, s.joints[i].y - prev.joints[i].y),
      ),
    );
  for (let i = 0; i < 6 && relax !== 0 && jump(res) > RELAX_JUMP; i++) {
    relax /= 2;
    res = solve(target, prev.footAngle + relax);
  }
  return res;
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
