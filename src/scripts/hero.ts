/* Hero slider: autoplay with progress bars, pause on hover/hidden tab, swipe on touch. */
import { $, $$, reduced } from './ui';

export function initHero() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const slides = $$<HTMLElement>('.slide', hero);
  const dots = $$<HTMLButtonElement>('.hero__dots button', hero);
  const num = $('#heroNum');
  const DUR = 6000;
  let i = 0, t = 0, left = DUR, started = 0, paused = false;

  const go = (n: number) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => {
      const on = k === i;
      s.classList.toggle('is-on', on);
      s.setAttribute('aria-hidden', String(!on));
      $$<HTMLElement>('a', s).forEach((a) => (a.tabIndex = on ? 0 : -1));
    });
    dots.forEach((d, k) => {
      d.classList.toggle('is-on', k === i); d.classList.toggle('is-past', k < i);
      d.style.setProperty('--dur', `${DUR}ms`);
      const bar = d.firstElementChild as HTMLElement; bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = '';
    });
    num.textContent = `0${i + 1} / 0${slides.length}`;
    left = DUR; schedule();
  };
  const schedule = () => {
    clearTimeout(t);
    if (reduced || paused) return;
    started = performance.now();
    t = window.setTimeout(() => go(i + 1), left);
  };
  const pause = (on: boolean) => {
    if (on === paused) return;
    paused = on; hero.classList.toggle('is-paused', on);
    if (on) { clearTimeout(t); left = Math.max(300, left - (performance.now() - started)); } else schedule();
  };

  dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
  hero.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && pause(true));
  hero.addEventListener('pointerleave', (e) => e.pointerType === 'mouse' && pause(false));
  hero.addEventListener('focusin', () => pause(true));
  hero.addEventListener('focusout', () => pause(false));
  document.addEventListener('visibilitychange', () => pause(document.hidden));

  let sx = 0, sy = 0;
  hero.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  hero.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(i + (dx < 0 ? 1 : -1));
  });
  go(0);
}
