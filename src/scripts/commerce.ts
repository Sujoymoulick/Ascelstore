/* Card + product-page actions anywhere on the page: wishlist hearts and quick add. */
import { byId } from '../data/products';
import { img } from '../lib/img';
import { addLine, onChange, state, toggleWish } from './store';
import { openBag } from './bag';
import { $$, bump, toast } from './ui';

export function syncHearts(root: ParentNode = document) {
  $$<HTMLElement>('[data-wish]', root).forEach((h) => h.setAttribute('aria-pressed', String(state.wish.includes(h.dataset.wish!))));
}

export function addToBag(id: string, size: string, open = false) {
  const p = byId(id);
  if (!p) return;
  addLine(id, size);
  toast(`Added ${p.name} · ${size}`, img(p.images[0], 80, 80));
  if (open) setTimeout(openBag, 250);
}

export function initCommerce() {
  document.addEventListener('click', (e) => {
    const el = e.target as HTMLElement;
    const heart = el.closest<HTMLElement>('[data-wish]');
    if (heart) {
      e.preventDefault();
      const on = toggleWish(heart.dataset.wish!);
      bump(heart);
      toast(on ? 'Saved to your wishlist' : 'Removed from your wishlist');
      return;
    }
    const add = el.closest<HTMLElement>('[data-add]');
    if (add) { e.preventDefault(); addToBag(add.dataset.add!, add.dataset.size!); }
  });
  onChange(() => syncHearts());
  syncHearts();
}
