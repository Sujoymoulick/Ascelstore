/* Horizontal product rails: mouse drag, arrow buttons, progress bar. */
import { $$ } from './ui';

export function initRails() {
  $$<HTMLElement>('[data-rail]').forEach((rail) => {
    const section = rail.closest('section')!;
    const bar = section.querySelector<HTMLElement>('[data-rail-bar]');
    const update = () => {
      if (!bar) return;
      const w = rail.clientWidth / rail.scrollWidth;
      const max = rail.scrollWidth - rail.clientWidth;
      bar.style.width = `${Math.min(100, w * 100)}%`;
      bar.style.transform = `translateX(${max > 0 ? (rail.scrollLeft / max) * ((1 - w) / w) * 100 : 0}%)`;
    };
    rail.addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();

    section.querySelectorAll<HTMLButtonElement>('[data-rail-dir]').forEach((b) =>
      b.addEventListener('click', () => rail.scrollBy({ left: +b.dataset.railDir! * rail.clientWidth * 0.8, behavior: 'smooth' })));

    let drag: { x: number; s: number; moved: boolean } | null = null;
    rail.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || (e.target as HTMLElement).closest('button')) return;
      drag = { x: e.clientX, s: rail.scrollLeft, moved: false };
    });
    addEventListener('pointermove', (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 6) { drag.moved = true; rail.classList.add('is-drag'); }
      if (drag.moved) rail.scrollLeft = drag.s - dx;
    });
    addEventListener('pointerup', () => {
      if (!drag) return;
      const moved = drag.moved; drag = null;
      rail.classList.remove('is-drag');
      // swallow the click that ends a drag so it doesn't open a product
      if (moved) rail.addEventListener('click', (ev) => { ev.preventDefault(); ev.stopPropagation(); }, { capture: true, once: true });
    });
    rail.addEventListener('dragstart', (e) => e.preventDefault());
  });
}
