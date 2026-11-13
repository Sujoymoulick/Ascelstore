/* Product card markup. Shared by Astro pages (server) and client renders (wishlist, filters). */
import { money, offPct, type Product } from '../data/products';
import { img, srcset } from './img';

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));

export const heartSVG = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>';

export function cardHTML(p: Product, opts: { eager?: boolean; sizes?: string } = {}) {
  const sizes = opts.sizes ?? '(max-width: 600px) 60vw, (max-width: 1100px) 30vw, 300px';
  const load = opts.eager ? 'eager' : 'lazy';
  const off = offPct(p);
  const alt = p.images[1];
  return `<article class="card" data-id="${p.id}" data-price="${p.price}" data-type="${esc(p.type)}" data-new="${p.isNew ? 1 : 0}" data-hot="${p.hot ? 1 : 0}" data-rating="${p.rating}">
  <div class="card__media">
    ${p.badge ? `<span class="badge${/stock|seller/i.test(p.badge) ? ' badge--red' : ''}">${esc(p.badge)}</span>` : ''}
    <button class="heart" type="button" data-wish="${p.id}" aria-label="Save ${esc(p.name)}" aria-pressed="false">${heartSVG}</button>
    <a href="/products/${p.id}" class="card__link" aria-label="${esc(p.name)}">
      <img class="card__img" src="${img(p.images[0], 600, 750)}" srcset="${srcset(p.images[0], [400, 600, 800], 1.25)}" sizes="${sizes}" alt="${esc(p.name)}" loading="${load}" decoding="async" width="600" height="750" />
      ${alt ? `<img class="card__img card__img--alt" src="${img(alt, 600, 750)}" alt="" loading="lazy" decoding="async" width="600" height="750" />` : ''}
    </a>
    <div class="quick" role="group" aria-label="Quick add ${esc(p.name)}">
      <p>Quick add</p>
      <div class="quick__sizes">${(p.section === 'accessories' ? ['One size'] : ['S', 'M', 'L', 'XL']).map((s) => `<button type="button" data-add="${p.id}" data-size="${s}">${s}</button>`).join('')}</div>
    </div>
  </div>
  <a href="/products/${p.id}" class="card__info">
    <h3>${esc(p.name)}</h3>
    <span class="card__type">${esc(p.type)}</span>
    <span class="card__price">${money(p.price)}${p.compare ? `<s>${money(p.compare)}</s><em>${off}% off</em>` : ''}</span>
  </a>
</article>`;
}
