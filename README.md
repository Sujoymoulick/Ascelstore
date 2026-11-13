# AscelStore

**Elevated everyday wear for men and women.** A fast, photo-led fashion storefront built with Astro, designed and
developed by **[SSText](https://ascelstack.com)** — the team behind [AscelStack](https://ascelstack.com) and
[AscelStack Cafe](https://cafe.ascelstack.com).

---

## Highlights

- **Men / Women storefronts** with a full-screen curtain transition when switching between them
- **Editorial home page**: hero slider with progress bars, New In and Trending rails, category tabs, parallax banner,
  bestsellers, customer stats with live counters, reviews marquee, brand story and newsletter
- **Category pages** for Topwear, Bottomwear, Winterwear and Accessories, with type filters, sorting and
  shareable filter URLs (`?type=Jeans`, `?new=1`, `?sale=1`)
- **Product pages** with gallery zoom, size picker, size guide, low-stock notice, details accordion,
  related products, a mobile sticky add-to-bag bar and `Product` JSON-LD for search engines
- **Shopping**: quick add from any card, slide-in bag with quantities, coupon codes and a free-shipping meter,
  wishlist page, and instant search (press `/`)
- **Motion done carefully**: smooth scrolling (Lenis), scroll reveals and parallax, all switched off when the
  visitor's device asks for reduced motion
- **SEO-ready**: static HTML for every page, canonical URLs, Open Graph tags and structured data
- **Responsive** from 360 px phones to wide desktops, with no horizontal scroll

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | [Astro](https://astro.build) (static output) |
| Language | TypeScript |
| Smooth scroll | [Lenis](https://github.com/darkroomengineering/lenis) |
| Styling | Hand-written CSS (`src/styles/global.css`) |
| Fonts | Instrument Serif + Manrope (Google Fonts) |
| State | `localStorage` for bag and wishlist, synced across tabs |

## Getting started

Requires Node.js 18.20 or newer.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npm run preview  # serve the built site
```

## Pages

| Route | What it is |
| --- | --- |
| `/`, `/men`, `/women` | Home page for each gender |
| `/[gender]/[section]` | `all`, `topwear`, `bottomwear`, `winterwear`, `accessories` |
| `/products/[id]` | Product page |
| `/wishlist` | Saved items |
| `/404` | Not found |

## Project structure

```
src/
├── components/     Page sections (Header, Hero, ProductRail, CategoryTiles, Footer, …)
├── data/
│   ├── products.ts Catalogue, prices, coupons, shipping rules, sample reviews
│   └── home.ts     Hero slides, sub-navigation, category tiles and banners per gender
├── layouts/        Base layout (head, header, footer, bag, search)
├── lib/
│   ├── img.ts      Every image URL goes through img()
│   └── card.ts     Product card markup, shared by pages and client renders
├── pages/          Routes
├── scripts/        motion, hero, rails, tabs, bag, commerce, search, listing, pdp, wishlist
└── styles/         global.css
```

## Customising

- **Products**: edit `src/data/products.ts`. `section` decides the category page, `type` decides the filter chip.
- **Home content**: edit `src/data/home.ts`.
- **Images**: the catalogue currently uses Unsplash placeholder photos. Point `img()` in `src/lib/img.ts` at your CDN
  and update the keys in `products.ts`.
- **Colours and type**: CSS variables at the top of `src/styles/global.css`.

## Before launch

- [ ] Replace placeholder photos with real product photography
- [ ] Replace the sample reviews in `src/data/products.ts` with verified reviews
- [ ] Connect checkout in `src/scripts/bag.ts` (`#checkoutBtn`): Shopify Storefront cart, Razorpay or Stripe
- [ ] Connect the newsletter form in `src/scripts/main.ts` (`form[data-signup]`) to your email platform
- [ ] Set real stock numbers (`stock` drives the low-stock message)
- [ ] Set `site` in `astro.config.mjs` to the live domain

## Deployment

Pushing to `main` here is all it takes:

```
git push (Sujoymoulick/Ascelstore, main)
  └─ .github/workflows/sync-to-org.yml   mirrors main to the company repo
       └─ .github/workflows/deploy.yml   builds and deploys to Cloudflare Pages
```

Both workflow files live in both repos, but each one checks which repo it is running in,
so syncing only happens in `Sujoymoulick/Ascelstore` and deploying only happens in the company repo.

### One-time setup

1. **Company repo**: [`ASCEL6251/ascelstore`](https://github.com/ASCEL6251/ascelstore).
2. **Personal repo** `Sujoymoulick/Ascelstore` → Settings → Secrets and variables → Actions:
   - Secret `ASCELSTORE_SYNC_TOKEN` = a personal access token that can push to the company repo
     (fine-grained: Contents and Workflows *Read and write* on that repo; classic: `repo` + `workflow`).
     The target defaults to `ASCEL6251/ascelstore`; set a variable `SYNC_TARGET_REPO` only to change it.
3. **Company repo** → Settings → Secrets and variables → Actions:
   - Secret `CLOUDFLARE_API_TOKEN` = Cloudflare API token with *Cloudflare Pages: Edit*
   - Secret `CLOUDFLARE_ACCOUNT_ID` = your Cloudflare account ID
   - Variable `CF_PAGES_PROJECT` = Pages project name (optional, defaults to `ascelstore`)
4. Push to `main`, or run **Sync to company repo** from the Actions tab. The first deploy creates the
   Pages project automatically. Add your custom domain under Cloudflare → Workers & Pages → the project → Custom domains.

`npm run build` writes a fully static site to `dist/`, so any static host also works.

## Credits

Designed and developed by **SSText**.

- Website: [ascelstack.com](https://ascelstack.com)
- Cafe: [cafe.ascelstack.com](https://cafe.ascelstack.com)

## Copyright

Copyright © 2026 SSText. All rights reserved.

This source code and design are proprietary to SSText. No part of this project may be copied, modified,
distributed or used without prior written permission from SSText. See [LICENSE](LICENSE).

Product photos are placeholder images from [Unsplash](https://unsplash.com) used under the Unsplash License,
and are not covered by this copyright.
