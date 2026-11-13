/* Product page: size picker, add to bag, sticky bar, image zoom, size guide. */
import { addToBag } from './commerce';
import { $, $$ } from './ui';

export function initPdp() {
  const root = document.querySelector<HTMLElement>('[data-pdp]');
  if (!root) return;
  const id = root.dataset.pdp!;
  const sizes = $<HTMLElement>('[data-sizes]', root);
  const btns = $$<HTMLButtonElement>('[data-size]', sizes);
  const msg = $('[data-size-msg]', root);
  const addBtn = $<HTMLButtonElement>('[data-pdp-add]', root);
  let size = btns.length === 1 ? btns[0].dataset.size! : '';

  const pick = (b: HTMLButtonElement) => {
    size = b.dataset.size!;
    btns.forEach((x) => { x.setAttribute('aria-checked', String(x === b)); x.tabIndex = x === b ? 0 : -1; });
    msg.textContent = '';
  };
  btns.forEach((b, k) => {
    b.tabIndex = k === 0 ? 0 : -1;
    b.addEventListener('click', () => pick(b));
    b.addEventListener('keydown', (e) => {
      const d = ['ArrowRight', 'ArrowDown'].includes(e.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(e.key) ? -1 : 0;
      if (d) { e.preventDefault(); const n = btns[(k + d + btns.length) % btns.length]; pick(n); n.focus(); }
    });
  });
  const add = () => {
    if (!size) {
      msg.textContent = 'Please choose a size first.';
      sizes.classList.remove('is-shake'); void sizes.offsetWidth; sizes.classList.add('is-shake');
      sizes.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    addToBag(id, size, true);
  };
  addBtn.addEventListener('click', add);

  const sticky = document.querySelector<HTMLElement>('[data-sticky-atc]');
  if (sticky) {
    new IntersectionObserver(([e]) => sticky.classList.toggle('is-on', !e.isIntersecting && e.boundingClientRect.top < 0)).observe(addBtn);
    $('button', sticky).addEventListener('click', add);
  }

  const guide = document.querySelector<HTMLDialogElement>('[data-guide]');
  document.querySelector('[data-size-guide]')?.addEventListener('click', () => guide?.showModal());

  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    $$<HTMLElement>('[data-gallery] figure').forEach((f) => {
      f.addEventListener('click', () => f.classList.toggle('is-zoom'));
      f.addEventListener('pointermove', (e) => {
        const r = f.getBoundingClientRect();
        f.style.setProperty('--ox', `${((e.clientX - r.left) / r.width) * 100}%`);
        f.style.setProperty('--oy', `${((e.clientY - r.top) / r.height) * 100}%`);
      });
      f.addEventListener('pointerleave', () => f.classList.remove('is-zoom'));
    });
  }
}
