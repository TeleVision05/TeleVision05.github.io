import { solve, jointAngles, restPose, LINKS, type Vec } from './ik';
import { reducedMotion } from './motion';

const REACH = LINKS[0] + LINKS[1] + LINKS[2];
const css = (v: string) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();

/** Renders the IK leg on a canvas and drives it from the pointer or an idle gait cycle. */
export class IkView {
  private ctx: CanvasRenderingContext2D;
  private joints: Vec[] = restPose();
  private target: Vec = { ...this.joints[3] };
  private goal: Vec = { ...this.target };
  private trail: Vec[] = [];
  private pointerActive = false;
  private lastPointer = 0;
  private visible = true;
  private raf = 0;
  private t0 = performance.now();
  private scale = 1;
  private origin = { x: 0, y: 0 };
  private w = 0;
  private h = 0;

  constructor(
    private canvas: HTMLCanvasElement,
    private out: { angles: HTMLElement[]; xy: HTMLElement; state: HTMLElement },
  ) {
    this.ctx = canvas.getContext('2d')!;
    this.bind();
    this.resize();
    this.wake();
  }

  private bind() {
    const c = this.canvas;
    c.addEventListener('pointermove', (e) => this.onPointer(e));
    c.addEventListener('pointerdown', (e) => this.onPointer(e));
    c.addEventListener('pointerleave', () => this.release());
    window.addEventListener('blur', () => this.release());
    new ResizeObserver(() => this.resize()).observe(c);
    new IntersectionObserver(([entry]) => this.setVisible(entry.isIntersecting)).observe(c);
    document.addEventListener('visibilitychange', () => this.setVisible(!document.hidden));
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => this.draw(true));
  }

  private setVisible(v: boolean) {
    this.visible = v && !document.hidden;
    this.wake();
  }

  private release() {
    this.pointerActive = false;
    this.t0 = performance.now();
    this.wake();
  }

  private onPointer(e: PointerEvent) {
    if (e.pointerType !== 'mouse' && e.type === 'pointermove' && !e.buttons) return;
    const r = this.canvas.getBoundingClientRect();
    this.goal = {
      x: (e.clientX - r.left - this.origin.x) / this.scale,
      y: -(e.clientY - r.top - this.origin.y) / this.scale,
    };
    this.pointerActive = true;
    this.lastPointer = performance.now();
    this.wake();
  }

  private resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = rect.width;
    this.h = rect.height;
    this.canvas.width = Math.round(this.w * dpr);
    this.canvas.height = Math.round(this.h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Size the leg to the plot: the hip sits upper-left, the gait path lands lower-right.
    this.scale = Math.min(this.w / (REACH * 1.55), this.h / (REACH * 1.2));
    this.origin = { x: this.w * 0.36, y: this.h * 0.24 };
    this.draw(true);
  }

  private idleGoal(now: number): Vec {
    // A walking-style foot path: swing arc above, flat stance phase on the ground.
    const a = (((now - this.t0) / 2600) % 1) * Math.PI * 2;
    return { x: 70 + Math.cos(a) * 60, y: -150 + Math.max(0, Math.sin(a)) * 42 };
  }

  private wake() {
    if (!this.raf && this.visible) this.raf = requestAnimationFrame((t) => this.step(t));
  }

  private step(now: number) {
    this.raf = 0;
    const still = reducedMotion();
    if (this.pointerActive && now - this.lastPointer > 2500) this.pointerActive = false;
    if (!this.pointerActive && !still) this.goal = this.idleGoal(now);
    const k = still ? 1 : 0.22;
    this.target = {
      x: this.target.x + (this.goal.x - this.target.x) * k,
      y: this.target.y + (this.goal.y - this.target.y) * k,
    };
    const res = solve(this.target, this.joints);
    this.joints = res.joints;
    this.trail.push({ ...this.joints[3] });
    if (this.trail.length > 70) this.trail.shift();
    this.draw(res.reached);
    this.readout(res.reached);
    const settled = Math.hypot(this.goal.x - this.target.x, this.goal.y - this.target.y) < 0.2;
    if (!settled || (!this.pointerActive && !still)) this.wake();
  }

  private readout(reached: boolean) {
    jointAngles(this.joints).forEach((a, i) => {
      if (this.out.angles[i]) this.out.angles[i].textContent = `${a.toFixed(1)}°`;
    });
    const f = this.joints[3];
    this.out.xy.textContent = `${Math.round(f.x)}, ${Math.round(f.y)} mm`;
    this.out.state.textContent = !reached
      ? 'out of reach'
      : this.pointerActive
        ? 'tracking'
        : 'gait cycle';
    this.out.state.classList.toggle('warn', !reached);
  }

  private screen(p: Vec) {
    return { x: this.origin.x + p.x * this.scale, y: this.origin.y - p.y * this.scale };
  }

  private draw(reached: boolean) {
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.drawGrid();
    this.drawBody();
    this.drawTrail();
    this.drawLeg();
    this.drawTarget(reached);
  }

  private drawGrid() {
    const c = this.ctx;
    const step = 20 * this.scale;
    c.lineWidth = 1;
    c.strokeStyle = css('--rule');
    c.beginPath();
    for (let x = this.origin.x % step; x < this.w; x += step) c.rect(x, 0, 0, this.h);
    for (let y = this.origin.y % step; y < this.h; y += step) c.rect(0, y, this.w, 0);
    c.globalAlpha = 0.55;
    c.stroke();
    c.globalAlpha = 1;
    c.setLineDash([4, 6]);
    c.strokeStyle = css('--graphite');
    c.beginPath();
    c.arc(this.origin.x, this.origin.y, REACH * this.scale, 0, Math.PI * 2);
    c.stroke();
    c.setLineDash([]);
  }

  private drawBody() {
    const c = this.ctx;
    const width = 70 * this.scale + 40;
    c.fillStyle = css('--panel');
    c.strokeStyle = css('--ink');
    c.lineWidth = 1.5;
    c.beginPath();
    c.roundRect(this.origin.x - width, this.origin.y - 14, width, 28, 6);
    c.fill();
    c.stroke();
  }

  private drawTrail() {
    const c = this.ctx;
    c.fillStyle = css('--z');
    this.trail.forEach((p, i) => {
      const s = this.screen(p);
      c.globalAlpha = (i / this.trail.length) * 0.5;
      c.beginPath();
      c.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
      c.fill();
    });
    c.globalAlpha = 1;
  }

  private drawLeg() {
    const c = this.ctx;
    const pts = this.joints.map((p) => this.screen(p));
    const ink = css('--ink');
    c.lineCap = 'round';
    c.strokeStyle = ink;
    [10, 8, 6].forEach((width, i) => {
      c.lineWidth = width;
      c.beginPath();
      c.moveTo(pts[i].x, pts[i].y);
      c.lineTo(pts[i + 1].x, pts[i + 1].y);
      c.stroke();
    });
    c.fillStyle = css('--paper');
    c.lineWidth = 2;
    pts.slice(0, 3).forEach((p) => {
      c.beginPath();
      c.arc(p.x, p.y, 7, 0, Math.PI * 2);
      c.fill();
      c.stroke();
    });
    // Foot frame, robotics convention: x red, y green.
    const f = pts[3];
    const ang = Math.atan2(pts[3].y - pts[2].y, pts[3].x - pts[2].x);
    const axes: [number, string][] = [
      [ang, css('--x')],
      [ang - Math.PI / 2, css('--y')],
    ];
    c.lineWidth = 2.5;
    for (const [a, col] of axes) {
      c.strokeStyle = col;
      c.beginPath();
      c.moveTo(f.x, f.y);
      c.lineTo(f.x + Math.cos(a) * 22, f.y + Math.sin(a) * 22);
      c.stroke();
    }
  }

  private drawTarget(reached: boolean) {
    const c = this.ctx;
    const g = this.screen(this.target);
    c.strokeStyle = reached ? css('--z') : css('--x');
    c.lineWidth = 1.5;
    c.beginPath();
    c.arc(g.x, g.y, 9, 0, Math.PI * 2);
    c.moveTo(g.x - 15, g.y);
    c.lineTo(g.x + 15, g.y);
    c.moveTo(g.x, g.y - 15);
    c.lineTo(g.x, g.y + 15);
    c.stroke();
  }
}
