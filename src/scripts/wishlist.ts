/* Wishlist page: renders saved products from local state. */
import { byId } from '../data/products';
import { cardHTML } from '../lib/card';
import { onChange, state } from './store';
import { syncHearts } from './commerce';

export function initWishlist() {
  const grid = document.getElementById('wishGrid');
  if (!grid) return;
  const render = () => {
    const items = state.wish.map(byId).filter(Boolean);
    grid.innerHTML = items.map((p, i) => cardHTML(p!, { eager: i < 4 })).join('');
    [...grid.children].forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i)));
    document.getElementById('wishEmpty')!.hidden = items.length > 0;
    document.getElementById('wishInfo')!.textContent = items.length ? `${items.length} saved` : '';
    syncHearts(grid);
  };
  onChange(render);
  render();
}
