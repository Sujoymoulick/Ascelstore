/* Client entry: wires every interactive part of the store. Each module no-ops when its markup is absent. */
import './motion';
import { initHero } from './hero';
import { initRails } from './rails';
import { initTabs } from './tabs';
import { initBag } from './bag';
import { initCommerce } from './commerce';
import { initSearch } from './search';
import { initListing } from './listing';
import { initPdp } from './pdp';
import { initWishlist } from './wishlist';
import { $$ } from './ui';

initBag();
initCommerce();
initSearch();
initHero();
initRails();
initTabs();
initListing();
initPdp();
initWishlist();

/* Email sign-up. TODO: POST to your email platform (Klaviyo, Mailchimp, Shopify customer API). */
$$<HTMLFormElement>('form[data-signup]').forEach((f) => f.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = f.parentElement!.querySelector('[data-signup-msg]');
  if (msg) msg.textContent = 'You’re in. Use code ASCEL10 for 10% off your first order.';
  f.reset();
}));
