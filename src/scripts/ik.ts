/**
 * Planar 3-link leg solved with FABRIK (Forward And Backward Reaching Inverse Kinematics).
 * Units are millimetres in a frame whose origin is the hip joint, +x right, +y up.
 */
export type Vec = { x: number; y: number };

export const LINKS = [92, 78, 46]; // femur, tibia, foot (mm)
const REACH = LINKS.reduce((a, b) => a + b, 0);

export function solve(
  target: Vec,
  joints: Vec[],
  iterations = 12,
): { joints: Vec[]; reached: boolean } {
  const base = { ...joints[0] };
  const d = Math.hypot(target.x - base.x, target.y - base.y);
  const p = joints.map((j) => ({ ...j }));

  if (d >= REACH) {
    // Out of reach: stretch straight toward the target.
    for (let i = 0; i < LINKS.length; i++) {
      const t = LINKS[i] / Math.hypot(target.x - p[i].x, target.y - p[i].y);
      p[i + 1] = { x: p[i].x + (target.x - p[i].x) * t, y: p[i].y + (target.y - p[i].y) * t };
    }
    return { joints: p, reached: false };
  }

  for (let k = 0; k < iterations; k++) {
    p[p.length - 1] = { ...target };
    for (let i = p.length - 2; i >= 0; i--) place(p, i, i + 1, LINKS[i]);
    p[0] = { ...base };
    for (let i = 0; i < p.length - 1; i++) place(p, i + 1, i, LINKS[i]);
    const end = p[p.length - 1];
    if (Math.hypot(end.x - target.x, end.y - target.y) < 0.05) break;
  }
  return { joints: p, reached: true };
}

function place(p: Vec[], move: number, anchor: number, len: number) {
  const dx = p[move].x - p[anchor].x;
  const dy = p[move].y - p[anchor].y;
  const r = Math.hypot(dx, dy) || 1e-6;
  p[move] = { x: p[anchor].x + (dx / r) * len, y: p[anchor].y + (dy / r) * len };
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
  // A crouched leg: femur up and out, tibia down, foot planted.
  const pts: Vec[] = [{ x: 0, y: 0 }];
  const abs = [0.55, -1.15, -1.75];
  abs.forEach((a, i) => {
    const prev = pts[i];
    pts.push({ x: prev.x + Math.cos(a) * LINKS[i], y: prev.y + Math.sin(a) * LINKS[i] });
  });
  return pts;
}
