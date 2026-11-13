/* Category tabs on the home page (keyboard friendly) and the sliding indicator on listing pages. */
import { $, $$, moveInd } from './ui';
import { observe } from './motion';

export function initTabs() {
  $$<HTMLElement>('[data-tabs]').forEach((list) => {
    const tabs = $$<HTMLButtonElement>('[role="tab"]', list);
    const ind = $<HTMLElement>('[data-tabs-ind]', list);
    const select = (tab: HTMLButtonElement, focus = false) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls')!)!;
        if (on) { panel.hidden = false; panel.classList.remove('is-in'); requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add('is-in'))); }
        else panel.hidden = true;
      });
      moveInd(ind, tab);
      if (focus) tab.focus();
    };
    tabs.forEach((t, k) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) { e.preventDefault(); select(tabs[(k + d + tabs.length) % tabs.length], true); }
      });
    });
    const place = () => moveInd(ind, tabs.find((t) => t.getAttribute('aria-selected') === 'true') ?? tabs[0]);
    place(); document.fonts?.ready.then(place); addEventListener('resize', place);
    observe();
  });

  $$<HTMLElement>('[data-tabs-static]').forEach((list) => {
    const ind = $<HTMLElement>('[data-tabs-ind]', list);
    const cur = $<HTMLElement>('[aria-current="page"]', list);
    const place = () => moveInd(ind, cur);
    place(); document.fonts?.ready.then(place); addEventListener('resize', place);
    cur?.scrollIntoView({ block: 'nearest', inline: 'center' });
  });
}
