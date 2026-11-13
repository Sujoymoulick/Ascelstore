/* Small shared UI helpers. */
export const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector(s) as T;
export const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll(s)] as T[];
export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

let toastT = 0;
export function toast(msg: string, image?: string) {
  const t = $('#toast');
  t.innerHTML = '';
  if (image) { const i = new Image(); i.src = image; i.alt = ''; t.append(i); }
  t.append(msg);
  t.classList.add('is-on');
  clearTimeout(toastT);
  toastT = window.setTimeout(() => t.classList.remove('is-on'), 2600);
}

export function bump(el: Element | null) {
  if (!el) return;
  el.classList.remove('pop'); void (el as HTMLElement).offsetWidth; el.classList.add('pop');
}

/* Slide an underline indicator under the active control. */
export function moveInd(ind: HTMLElement | null, target: HTMLElement | null) {
  if (!ind || !target) return;
  ind.style.left = `${target.offsetLeft}px`;
  ind.style.width = `${target.offsetWidth}px`;
}

/* Keep Tab inside an open dialog. */
export function trapFocus(root: HTMLElement, e: KeyboardEvent) {
  if (e.key !== 'Tab') return;
  const f = $$<HTMLElement>('a[href],button:not([disabled]),input,select,summary,[tabindex]:not([tabindex="-1"])', root)
    .filter((x) => x.offsetParent !== null && !x.closest('[hidden]'));
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}
