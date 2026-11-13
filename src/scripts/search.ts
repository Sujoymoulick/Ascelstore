/* Search overlay: instant results across the catalogue. Opens with the header button or "/". */
import { STORE, money } from '../data/products';
import { img } from '../lib/img';
import { lockScroll } from './motion';
import { $, $$, trapFocus } from './ui';

export function initSearch() {
  const box = $('#search');
  const input = $<HTMLInputElement>('#searchIn');
  const out = $('#searchResults');
  let lastFocus: HTMLElement | null = null;
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));

  const render = () => {
    const words = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const hits = STORE.products.filter((p) => {
      const hay = `${p.name} ${p.type} ${p.section} ${p.gender} ${p.desc}`.toLowerCase();
      return words.every((w) => hay.includes(w.replace(/s$/, '')));
    });
    const list = words.length ? hits : STORE.products.filter((p) => p.hot);
    out.innerHTML = list.length
      ? list.slice(0, 18).map((p) => `<a href="/products/${p.id}"><img src="${img(p.images[0], 300, 375)}" alt="" loading="lazy" /><b>${esc(p.name)}</b><span>${p.gender === 'men' ? 'Men' : 'Women'} · ${money(p.price)}</span></a>`).join('')
      : `<p class="search__empty">No matches for “${esc(input.value)}”. Try “hoodie” or “jeans”.</p>`;
  };
  const open = () => {
    lastFocus = document.activeElement as HTMLElement;
    box.hidden = false; lockScroll(true); render();
    requestAnimationFrame(() => input.focus());
  };
  const close = () => { box.hidden = true; lockScroll(false); lastFocus?.focus?.(); };

  $$('[data-open-search]').forEach((b) => b.addEventListener('click', open));
  input.addEventListener('input', render);
  box.addEventListener('click', (e) => {
    const el = e.target as HTMLElement;
    const q = el.closest<HTMLElement>('[data-q]');
    if (q) { input.value = q.dataset.q!; render(); input.focus(); return; }
    if (el.closest('[data-close-search]')) close();
  });
  box.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'Enter' && e.target === input) { const first = $<HTMLAnchorElement>('a', out); if (first) location.href = first.href; }
    trapFocus(box, e);
  });
  addEventListener('keydown', (e) => {
    if (e.key === '/' && box.hidden && !(e.target as HTMLElement).closest('input, textarea, select')) { e.preventDefault(); open(); }
  });
}
