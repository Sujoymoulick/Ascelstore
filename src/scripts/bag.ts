/* Bag drawer: line items, free-shipping meter, coupon, totals. */
import { STORE, byId, money } from '../data/products';
import { img } from '../lib/img';
import { applyCoupon, onChange, setQty, state, totals } from './store';
import { lockScroll } from './motion';
import { $, bump, toast, trapFocus } from './ui';

const drawer = $('#drawer');
const scrim = $('#scrim');
let lastFocus: HTMLElement | null = null;

export function openBag() {
  lastFocus = document.activeElement as HTMLElement;
  drawer.classList.add('is-on'); scrim.classList.add('is-on');
  drawer.setAttribute('aria-hidden', 'false'); drawer.removeAttribute('inert');
  lockScroll(true);
  setTimeout(() => $<HTMLElement>('[data-close-bag]', drawer).focus(), 60);
}
export function closeBag() {
  if (!drawer.classList.contains('is-on')) return;
  drawer.classList.remove('is-on'); scrim.classList.remove('is-on');
  drawer.setAttribute('aria-hidden', 'true'); drawer.setAttribute('inert', '');
  lockScroll(false);
  lastFocus?.focus?.();
}

let prevCount = -1;
function render() {
  const t = totals();
  const badge = $('#bagCount');
  badge.textContent = String(t.count);
  badge.classList.toggle('is-on', t.count > 0);
  if (prevCount >= 0 && t.count > prevCount) bump(badge);
  prevCount = t.count;
  const wish = $('#wishCount');
  wish.textContent = String(state.wish.length);
  wish.classList.toggle('is-on', state.wish.length > 0);

  $('#bagTitleCount').textContent = t.count ? `(${t.count})` : '';
  $('#shipMsg').innerHTML = t.sub === 0
    ? `Free shipping on orders over <b>${money(STORE.freeShipAt)}</b>`
    : t.toFree > 0 ? `Add <b>${money(t.toFree)}</b> more for free shipping` : 'You’ve unlocked <b>free shipping</b>';
  $('#shipFill').style.width = `${Math.min(100, (t.sub / STORE.freeShipAt) * 100)}%`;

  const items = $('#bagItems');
  items.innerHTML = state.lines.length
    ? state.lines.map((l) => {
      const p = byId(l.id)!;
      return `<div class="line">
        <a href="/products/${p.id}"><img src="${img(p.images[0], 160, 200)}" alt="" loading="lazy" /></a>
        <div><h3><a href="/products/${p.id}">${p.name}</a></h3><small>${p.type} · Size ${l.size}</small>
          <div class="qty" role="group" aria-label="Quantity for ${p.name}"><button type="button" data-k="${l.key}" data-d="-1" aria-label="Decrease">−</button><output>${l.qty}</output><button type="button" data-k="${l.key}" data-d="1" aria-label="Increase">+</button></div>
        </div>
        <div class="line__right"><span>${money(p.price * l.qty)}</span><button class="line__rm" type="button" data-rm="${l.key}">Remove</button></div>
      </div>`;
    }).join('')
    : `<div class="empty" style="padding:60px 0"><h3>Your bag is empty</h3><p>Good things are waiting.</p><a class="btn" href="/men/all?new=1">Shop new in</a></div>`;

  $('#bagFoot').hidden = !state.lines.length;
  $('#subTotal').textContent = money(t.sub);
  $('#discRow').hidden = !t.disc;
  $('#discTotal').textContent = `−${money(t.disc)} (${state.coupon})`;
  $('#shipTotal').textContent = t.sub === 0 ? '—' : t.ship ? money(t.ship) : 'Free';
  $('#grandTotal').textContent = money(t.total);
  if (state.coupon) $<HTMLInputElement>('#couponIn').value = state.coupon;
}

export function initBag() {
  drawer.addEventListener('click', (e) => {
    const el = e.target as HTMLElement;
    const d = el.closest<HTMLElement>('[data-d]');
    if (d) { const l = state.lines.find((x) => x.key === d.dataset.k); if (l) setQty(l.key, l.qty + +d.dataset.d!); return; }
    const rm = el.closest<HTMLElement>('[data-rm]');
    if (rm) { setQty(rm.dataset.rm!, 0); return; }
    if (el.closest('[data-close-bag], a[href]')) closeBag();
  });
  scrim.addEventListener('click', closeBag);
  drawer.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeBag(); trapFocus(drawer, e); });
  $('#couponForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = applyCoupon($<HTMLInputElement>('#couponIn').value);
    $('#couponMsg').textContent = ok ? 'Code applied.' : 'That code isn’t valid.';
  });
  $('#checkoutBtn').addEventListener('click', () => {
    // TODO: hand the bag to your checkout (Shopify Storefront cart, Razorpay, Stripe…).
    toast('Checkout isn’t connected yet. Hook up a payment provider to go live.');
  });
  $('#bagBtn').addEventListener('click', openBag);
  onChange(render);
  render();
}
