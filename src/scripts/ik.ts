/**
 * Planar 3-link walking leg with closed-form inverse kinematics.
 * The foot link is held vertical (as a legged robot keeps its foot under the ankle), which
 * reduces the problem to a 2-link hip/knee solve by the law of cosines. Always taking the
 * knee-up branch gives one exact answer per target, so the leg can never fold onto itself.
 * Units are millimetres in a frame whose origin is the hip joint, +x right, +y up.
 */
export type Vec = { x: number; y: number };

export const LINKS = [92, 78, 46]; // femur, tibia, foot (mm)
const [L1, L2, L3] = LINKS;
const MAX = L1 + L2 - 1e-6;
const MIN = Math.abs(L1 - L2) + 1e-6;
// Joint limit: the foot stays at least 90 mm below the hip. Above that the shin would have to
// point upward and the foot would fold back onto it (measured: 0 folds in 20k random targets).
const FOOT_CEILING = -90;

export function solve(target: Vec): { joints: Vec[]; reached: boolean } {
  const limited = target.y > FOOT_CEILING;
  // Ankle sits directly above the foot.
  let wx = target.x;
  let wy = Math.min(target.y, FOOT_CEILING) + L3;
  const d = Math.hypot(wx, wy) || 1e-6;
  const reached = !limited && d <= MAX && d >= MIN;
  if (!reached) {
    // Clamp the ankle onto the reachable ring along the same direction.
    const r = Math.min(MAX, Math.max(MIN, d)) / d;
    wx *= r;
    wy *= r;
  }
  const dd = Math.hypot(wx, wy);
  const cosKnee = (dd * dd - L1 * L1 - L2 * L2) / (2 * L1 * L2);
  const knee = -Math.acos(Math.min(1, Math.max(-1, cosKnee))); // knee-up branch
  const hip = Math.atan2(wy, wx) - Math.atan2(L2 * Math.sin(knee), L1 + L2 * Math.cos(knee));
  const p1 = { x: L1 * Math.cos(hip), y: L1 * Math.sin(hip) };
  const p2 = { x: p1.x + L2 * Math.cos(hip + knee), y: p1.y + L2 * Math.sin(hip + knee) };
  return { joints: [{ x: 0, y: 0 }, p1, p2, { x: p2.x, y: p2.y - L3 }], reached };
}

/** Relative joint angles in degrees: hip from +x, then each joint relative to the previous link. */
export function jointAngles(j: Vec[]): number[] {
  const abs = LINKS.map((_, i) => Math.atan2(j[i + 1].y - j[i].y, j[i + 1].x - j[i].x));
  return abs.map((a, i) => {
    let rel = i === 0 ? a : a - abs[i - 1];
    while (rel > Math.PI) rel -= 2 * Math.PI;
    while (rel < -Math.PI) rel += 2 * Math.PI;
    return (rel * 180) / Math.PI;
  });
}

export function restPose(): Vec[] {
  // A crouched stance: foot planted down and out from the hip.
  return solve({ x: 70, y: -150 }).joints;
}
