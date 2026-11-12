import Lenis from 'lenis';
import { gsap } from 'gsap';

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;

/** Lenis is the site's only smooth-scroll engine, driven by GSAP's ticker. Off under reduced motion. */
export function initSmoothScroll() {
  if (lenis || reducedMotion()) return;
  lenis = new Lenis({ duration: 1.05, smoothWheel: true });
  const raf = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // In-page anchors go through Lenis so the header offset and easing stay consistent.
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!a || a.origin !== location.origin || a.pathname !== location.pathname) return;
    const target = a.hash && document.querySelector(a.hash);
    if (!target) return;
    e.preventDefault();
    lenis?.scrollTo(target as HTMLElement, { offset: -72 });
    history.pushState(null, '', a.hash);
  });

  window.addEventListener('pagehide', () => {
    gsap.ticker.remove(raf);
    lenis?.destroy();
    lenis = null;
  });
}

/**
 * Splits a heading into words for a staggered reveal. The heading keeps its accessible
 * name through aria-label; the split words are hidden from assistive technology.
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent?.trim() ?? '';
  el.setAttribute('aria-label', text);
  el.textContent = '';
  return text.split(/\s+/).map((word, i, all) => {
    const mask = document.createElement('span');
    mask.className = 'word-mask';
    mask.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span');
    inner.className = 'word';
    inner.textContent = word;
    mask.append(inner);
    el.append(mask);
    if (i < all.length - 1) el.append(' ');
    return inner;
  });
}
