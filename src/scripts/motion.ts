/* Smooth scroll, intro, Men/Women curtain, scroll reveals, counters, parallax, header behaviour. */
import Lenis from 'lenis';
import { $, $$, moveInd, reduced } from './ui';

export let lenis: Lenis | null = null;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
if (!reduced && fine) {
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
  const raf = (t: number) => { lenis!.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}
export const lockScroll = (on: boolean) => {
  document.body.classList.toggle('is-locked', on);
  if (on) lenis?.stop(); else lenis?.start();
};

/* ---------- intro loader ---------- */
const loader = document.getElementById('loader');
if (loader) setTimeout(() => { loader.classList.add('is-done'); setTimeout(() => loader.remove(), 1200); }, 1150);

/* ---------- Men/Women curtain ---------- */
const curtain = $('#curtain');
if (curtain.classList.contains('is-cover')) {
  setTimeout(() => {
    curtain.className = 'curtain is-out';
    setTimeout(() => (curtain.className = 'curtain'), 900);
  }, 150);
}
const genderInd = $('#genderInd');
const activeGender = $<HTMLElement>('.gender a[aria-current="true"]');
const placeGender = () => moveInd(genderInd, activeGender);
placeGender();
document.fonts?.ready.then(placeGender);
$$<HTMLAnchorElement>('.gender a[data-gender]').forEach((a) => a.addEventListener('click', (e) => {
  if (reduced || a.getAttribute('aria-current') || e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  moveInd(genderInd, a);
  const word = a.dataset.gender === 'men' ? 'Men' : 'Women';
  $('#curtainWord').textContent = word;
  curtain.className = 'curtain is-in';
  try { sessionStorage.setItem('ascel:curtain', word); } catch { /* ignore */ }
  setTimeout(() => { location.href = a.href; }, 950);
}));
/* Back/forward cache: never restore a page with the curtain down. */
addEventListener('pageshow', (e) => { if ((e as PageTransitionEvent).persisted) curtain.className = 'curtain'; });

/* ---------- reveals + counters ---------- */
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  e.target.classList.add('is-in');
  io.unobserve(e.target);
  $$<HTMLElement>('[data-count]', e.target).forEach(countUp);
}), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
export const observe = (root: ParentNode = document) =>
  $$('[data-reveal]:not(.is-in), [data-clip]:not(.is-in), [data-big]:not(.is-in), .tiles:not([hidden]):not(.is-in)', root).forEach((el) => io.observe(el));
observe();

function countUp(el: HTMLElement) {
  const to = +el.dataset.count!, dec = +(el.dataset.dec || 0), suf = el.dataset.suffix || '';
  const fmt = (v: number) => (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-IN')) + suf;
  if (reduced) { el.textContent = fmt(to); return; }
  const t0 = performance.now(), dur = 1800;
  const step = (t: number) => {
    const k = Math.min(1, (t - t0) / dur);
    el.textContent = fmt(to * (1 - Math.pow(1 - k, 4)));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---------- header + parallax ---------- */
const header = $('#header');
const parallax = $$<HTMLElement>('[data-parallax]');
let lastY = scrollY, ticking = false;
function frame() {
  ticking = false;
  const y = scrollY;
  header.classList.toggle('is-scrolled', y > 10);
  const lockedOpen = document.body.classList.contains('is-locked');
  if (!lockedOpen) header.classList.toggle('is-hidden', y > lastY && y > 420);
  lastY = y;
  if (reduced) return;
  for (const img of parallax) {
    const box = img.parentElement!.getBoundingClientRect();
    if (box.bottom < 0 || box.top > innerHeight) continue;
    const prog = (box.top + box.height / 2 - innerHeight / 2) / innerHeight;
    img.style.transform = `translate3d(0, ${(prog * -+img.dataset.parallax! * 100).toFixed(2)}%, 0)`;
  }
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
frame();
