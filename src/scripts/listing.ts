/* Category pages: type chips, sort, and URL params (?type= &new=1 &sale=1). */
import { $, $$ } from './ui';

export function initListing() {
  const grid = document.getElementById('grid');
  if (!grid) return;
  const cards = $$<HTMLElement>('.card', grid);
  cards.forEach((c, i) => (c.dataset.order = String(i)));
  const chips = $$<HTMLButtonElement>('#chips .chip');
  const sortSel = $<HTMLSelectElement>('#sortSel');
  const count = $('#listCount');
  const empty = $('#gridEmpty');
  const params = new URL(location.href).searchParams;
  let type = params.get('type') ?? '';
  const onlyNew = params.has('new');
  const onlySale = params.has('sale');
  if (!chips.some((c) => c.dataset.type === type)) type = '';
  if (onlyNew) sortSel.value = 'new';

  const apply = (animate = true) => {
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.type === type)));
    const v = sortSel.value;
    const key = (c: HTMLElement) =>
      v === 'low' ? +c.dataset.price! : v === 'high' ? -c.dataset.price! : v === 'rating' ? -c.dataset.rating!
        : v === 'new' ? -(+c.dataset.new!) * 1000 + +c.dataset.order! : +c.dataset.order!;
    let shown = 0;
    cards.sort((a, b) => key(a) - key(b)).forEach((c) => {
      const ok = (!type || c.dataset.type === type) && (!onlyNew || c.dataset.new === '1') && (!onlySale || !!c.querySelector('.card__price s'));
      c.hidden = !ok;
      if (ok) { c.style.setProperty('--i', String(shown++)); if (animate) { c.style.animation = 'none'; void c.offsetWidth; c.style.animation = ''; } }
      grid.insertBefore(c, empty);
    });
    count.textContent = `${shown} ${shown === 1 ? 'style' : 'styles'}${onlyNew ? ' · new in' : ''}${onlySale ? ' · on sale' : ''}`;
    empty.hidden = shown > 0;
  };
  chips.forEach((c) => c.addEventListener('click', () => {
    type = c.dataset.type!;
    const u = new URL(location.href);
    if (type) u.searchParams.set('type', type); else u.searchParams.delete('type');
    history.replaceState(null, '', u);
    apply();
  }));
  sortSel.addEventListener('change', () => apply());
  apply(false);
}
