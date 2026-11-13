/* Cart + wishlist state, persisted per browser. */
import { STORE, byId } from '../data/products';

export interface Line { key: string; id: string; size: string; qty: number }

const read = <T>(k: string, d: T): T => {
  try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : d; } catch { return d; }
};
const write = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage blocked */ } };

const listeners = new Set<() => void>();
export const state = {
  lines: read<Line[]>('ascel:bag2', []).filter((l) => byId(l.id)),
  wish: read<string[]>('ascel:wish2', []).filter((id) => byId(id)),
  coupon: read<string>('ascel:coupon', ''),
};

const emit = () => {
  write('ascel:bag2', state.lines); write('ascel:wish2', state.wish); write('ascel:coupon', state.coupon);
  listeners.forEach((f) => f());
};
export const onChange = (f: () => void) => { listeners.add(f); };

/* Keep tabs in sync. */
addEventListener('storage', (e) => {
  if (!e.key?.startsWith('ascel:')) return;
  state.lines = read<Line[]>('ascel:bag2', []).filter((l) => byId(l.id));
  state.wish = read<string[]>('ascel:wish2', []).filter((id) => byId(id));
  state.coupon = read<string>('ascel:coupon', '');
  listeners.forEach((f) => f());
});

export function addLine(id: string, size: string, qty = 1) {
  const key = `${id}|${size}`;
  const ex = state.lines.find((l) => l.key === key);
  if (ex) ex.qty = Math.min(10, ex.qty + qty);
  else state.lines.push({ key, id, size, qty });
  emit();
}
export function setQty(key: string, qty: number) {
  const l = state.lines.find((x) => x.key === key);
  if (!l) return;
  if (qty <= 0) state.lines = state.lines.filter((x) => x.key !== key);
  else l.qty = Math.min(10, qty);
  emit();
}
export function toggleWish(id: string): boolean {
  const on = !state.wish.includes(id);
  state.wish = on ? [...state.wish, id] : state.wish.filter((x) => x !== id);
  emit();
  return on;
}
export function applyCoupon(code: string): boolean {
  const c = code.trim().toUpperCase();
  if (!(c in STORE.coupons)) return false;
  state.coupon = c; emit(); return true;
}

export function totals() {
  const count = state.lines.reduce((a, l) => a + l.qty, 0);
  const sub = state.lines.reduce((a, l) => a + byId(l.id)!.price * l.qty, 0);
  const disc = state.coupon ? Math.round(sub * (STORE.coupons[state.coupon] ?? 0)) : 0;
  const ship = sub === 0 || sub >= STORE.freeShipAt ? 0 : STORE.shipFee;
  return { count, sub, disc, ship, total: sub - disc + ship, toFree: Math.max(0, STORE.freeShipAt - sub) };
}
