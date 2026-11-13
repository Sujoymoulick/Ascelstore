/* AscelStore catalogue.
 * Replace with your real catalogue (or fetch from Shopify Storefront API / your backend).
 * `section` drives the category pages, `type` drives the filter chips.
 */
import type { PhotoKey } from '../lib/img';

export type Gender = 'men' | 'women';
export type Section = 'topwear' | 'bottomwear' | 'winterwear' | 'accessories';

export interface Product {
  id: string; name: string; gender: Gender; section: Section; type: string;
  price: number; compare?: number; rating: number; reviews: number;
  stock?: number; badge?: string; hot?: boolean; isNew?: boolean;
  images: PhotoKey[]; fit: string; desc: string; fabric: string;
}
export interface Review { name: string; city: string; product: string; text: string; stars: number }

export const SECTIONS: { id: Section; label: string }[] = [
  { id: 'topwear', label: 'Topwear' },
  { id: 'bottomwear', label: 'Bottomwear' },
  { id: 'winterwear', label: 'Winterwear' },
  { id: 'accessories', label: 'Accessories' },
];

const TEE = '100% combed cotton, 240 GSM single jersey. Machine wash cold, inside out.';
const FLEECE = '100% organic cotton, 480 GSM brushed fleece. Pre-shrunk. Cold wash, dry flat.';
const DENIM = '98% cotton, 2% elastane denim. Wash cold with similar colours.';

const p = (x: Omit<Product, 'rating' | 'reviews'> & Partial<Pick<Product, 'rating' | 'reviews'>>): Product =>
  ({ rating: 4.7, reviews: 120, ...x });

export const STORE: {
  currency: string; locale: string; freeShipAt: number; shipFee: number;
  coupons: Record<string, number>; sizes: string[]; products: Product[]; reviews: Review[];
} = {
  currency: 'INR',
  locale: 'en-IN',
  freeShipAt: 2999,
  shipFee: 99,
  coupons: { ASCEL10: 0.10 },
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  products: [
    /* ---------------- men ---------------- */
    p({ id: 'peace-sign-oversized-tee', name: 'Peace Sign Oversized Tee', gender: 'men', section: 'topwear', type: 'Oversized T-shirts', price: 999, compare: 1299, badge: 'Oversized fit', isNew: true, hot: true, rating: 4.8, reviews: 412,
      images: ['tee', 'hangerBlack'], fit: 'Oversized fit. Dropped shoulder, longer sleeve. Take your usual size.',
      desc: 'A heavyweight black tee with a hand-drawn peace sign printed in soft puff ink.', fabric: TEE }),
    p({ id: 'trail-pullover-hoodie', name: 'Trail Pullover Hoodie', gender: 'men', section: 'winterwear', type: 'Hoodies', price: 2199, badge: 'Heavy 480 GSM', isNew: true, hot: true, stock: 6, rating: 4.9, reviews: 318,
      images: ['hoodie', 'sweat'], fit: 'Relaxed fit. Size down for a closer cut.',
      desc: 'Loopwheel fleece with a double-layer hood and a kangaroo pocket that keeps its shape.', fabric: FLEECE }),
    p({ id: 'moto-leather-jacket', name: 'Moto Leather Jacket', gender: 'men', section: 'winterwear', type: 'Jackets', price: 5999, compare: 7499, badge: 'Low stock', stock: 3, isNew: true, rating: 4.9, reviews: 96,
      images: ['leather', 'leatherFlat'], fit: 'Regular fit. Room for a tee or a thin knit underneath.',
      desc: 'A classic asymmetric biker in buttery vegan leather with heavy silver hardware.', fabric: 'PU leather shell, polyester lining. Wipe clean.' }),
    p({ id: 'ridge-plaid-overshirt', name: 'Ridge Plaid Overshirt', gender: 'men', section: 'topwear', type: 'Shirts', price: 1699, badge: 'New', isNew: true,
      images: ['plaid', 'shirts'], fit: 'Relaxed fit. Wear it open as a light layer.',
      desc: 'Brushed flannel check with two chest pockets and a curved hem.', fabric: '100% cotton flannel. Machine wash cold.' }),
    p({ id: 'essential-crew-tee', name: 'Essential Crew Tee', gender: 'men', section: 'topwear', type: 'T-shirts', price: 799, isNew: true, hot: true, rating: 4.8, reviews: 640,
      images: ['white', 'whiteTee'], fit: 'Classic fit. True to size.',
      desc: 'The white tee you reach for every day. Ribbed collar that never ripples.', fabric: TEE }),
    p({ id: 'summit-graphic-tee', name: 'Summit Graphic Tee', gender: 'men', section: 'topwear', type: 'Oversized T-shirts', price: 1099, badge: 'Oversized fit', isNew: true,
      images: ['mtn', 'backTee'], fit: 'Oversized fit. Take your usual size.',
      desc: 'A boxy white tee with a front slogan and a mountain print on the back.', fabric: TEE }),
    p({ id: 'utility-chino', name: 'Utility Chino', gender: 'men', section: 'bottomwear', type: 'Chinos', price: 1899, isNew: true,
      images: ['chino', 'jeansDark'], fit: 'Tapered fit with a stretch waist.',
      desc: 'A relaxed-taper chino in brushed twill with flat pockets.', fabric: '98% cotton twill, 2% elastane. Machine wash cold.' }),
    p({ id: 'rider-jacket', name: 'Rider Jacket', gender: 'men', section: 'winterwear', type: 'Jackets', price: 4499, compare: 5299,
      images: ['rider', 'bomber'], fit: 'Regular fit.',
      desc: 'Tan rider jacket with a notch collar and a belted hem. Layers over denim.', fabric: 'PU suede shell, quilted lining. Spot clean.' }),
    p({ id: 'midnight-boxy-tee', name: 'Midnight Boxy Tee', gender: 'men', section: 'topwear', type: 'T-shirts', price: 899, badge: 'Bestseller', hot: true, rating: 4.9, reviews: 802,
      images: ['black', 'hangerTee'], fit: 'Boxy fit. Cropped body, wide sleeve.',
      desc: 'A 240 GSM boxy tee in deep black that holds its colour wash after wash.', fabric: TEE }),
    p({ id: 'blush-pocket-tee', name: 'Blush Pocket Tee', gender: 'men', section: 'topwear', type: 'T-shirts', price: 999,
      images: ['pink', 'pinkM'], fit: 'Classic fit. True to size.',
      desc: 'Garment-dyed pink tee with a small embroidered chest mark.', fabric: TEE }),
    p({ id: 'copper-bomber', name: 'Copper Bomber', gender: 'men', section: 'winterwear', type: 'Jackets', price: 3999, hot: true,
      images: ['bomber', 'leatherFlat'], fit: 'Regular fit with ribbed cuffs and hem.',
      desc: 'A light bomber in a warm copper tone with a two-way zip.', fabric: '100% recycled nylon. Machine wash cold.' }),
    p({ id: 'raw-straight-jeans', name: 'Raw Straight Jeans', gender: 'men', section: 'bottomwear', type: 'Jeans', price: 2299, hot: true,
      images: ['denim', 'jeansDark'], fit: 'Straight fit, mid rise.', desc: 'Deep indigo denim that fades with you.', fabric: DENIM }),
    p({ id: 'indigo-relaxed-jeans', name: 'Indigo Relaxed Jeans', gender: 'men', section: 'bottomwear', type: 'Jeans', price: 1999,
      images: ['jeansDark', 'denim'], fit: 'Relaxed fit, wide leg.', desc: 'A roomy five-pocket jean in rinse wash.', fabric: DENIM }),
    p({ id: 'pastel-crew-sweatshirt', name: 'Pastel Crew Sweatshirt', gender: 'men', section: 'winterwear', type: 'Sweatshirts', price: 1799,
      images: ['pinkM', 'sweat'], fit: 'Relaxed fit.', desc: 'A soft pink crewneck in brushed fleece.', fabric: FLEECE }),
    p({ id: 'cloud-sweatshirt', name: 'Cloud Sweatshirt', gender: 'men', section: 'winterwear', type: 'Sweatshirts', price: 1699,
      images: ['sweat', 'whiteTee'], fit: 'Relaxed fit.', desc: 'An off-white crew sweatshirt with raglan sleeves.', fabric: FLEECE }),
    p({ id: 'dot-denim-shirt', name: 'Dot Denim Shirt', gender: 'men', section: 'topwear', type: 'Shirts', price: 1499,
      images: ['shirt', 'shirts'], fit: 'Regular fit.', desc: 'Light chambray shirt with a tiny dot print.', fabric: '100% cotton chambray. Machine wash cold.' }),
    p({ id: 'tan-court-sneaker', name: 'Tan Court Sneaker', gender: 'men', section: 'accessories', type: 'Sneakers', price: 3499,
      images: ['court', 'runner'], fit: 'True to size.', desc: 'A suede-panel court sneaker with a gum-tone sole.', fabric: 'Suede and leather upper, rubber sole.' }),
    p({ id: 'grey-runner', name: 'Grey Runner', gender: 'men', section: 'accessories', type: 'Sneakers', price: 2999,
      images: ['runner', 'court'], fit: 'True to size.', desc: 'A light knit runner for long days on your feet.', fabric: 'Knit mesh upper, EVA sole.' }),
    p({ id: 'everyday-cap', name: 'Everyday Cap', gender: 'men', section: 'accessories', type: 'Caps', price: 599,
      images: ['cap'], fit: 'One size, adjustable strap.', desc: 'A clean six-panel cap in washed cotton.', fabric: '100% cotton twill.' }),
    p({ id: 'trek-backpack', name: 'Trek Backpack', gender: 'men', section: 'accessories', type: 'Backpacks', price: 2499,
      images: ['bag'], fit: '22 L. Fits a 15" laptop.', desc: 'A water-resistant daypack with a padded laptop sleeve.', fabric: 'Recycled polyester, water-repellent finish.' }),

    /* ---------------- women ---------------- */
    p({ id: 'skeleton-crop-tee', name: 'Skeleton Crop Tee', gender: 'women', section: 'topwear', type: 'Crop tops', price: 899, compare: 1099, badge: 'Oversized fit', isNew: true, hot: true, rating: 4.8, reviews: 287,
      images: ['wSkull', 'wHanger'], fit: 'Oversized, cropped at the waist.', desc: 'Black boxy crop tee with a skeleton-hand print.', fabric: TEE }),
    p({ id: 'sunshine-co-ord-set', name: 'Sunshine Co-ord Set', gender: 'women', section: 'topwear', type: 'Co-ords', price: 2499, badge: 'New', isNew: true,
      images: ['wYellow', 'wJogger'], fit: 'Relaxed hoodie and jogger set.', desc: 'A bright yellow cropped hoodie and jogger set in soft fleece.', fabric: FLEECE }),
    p({ id: 'ember-crew-sweater', name: 'Ember Crew Sweater', gender: 'women', section: 'winterwear', type: 'Sweaters', price: 1799, compare: 2299, badge: 'Bestseller', isNew: true, hot: true, rating: 4.9, reviews: 356,
      images: ['wOrange', 'wKnit'], fit: 'Relaxed fit. True to size.', desc: 'A burnt-orange crew knit that brightens grey days.', fabric: '70% cotton, 30% wool. Hand wash cold.' }),
    p({ id: 'graphic-boyfriend-tee', name: 'Graphic Boyfriend Tee', gender: 'women', section: 'topwear', type: 'T-shirts', price: 999, isNew: true,
      images: ['wTee', 'wTank'], fit: 'Boyfriend fit. Size down for a closer look.', desc: 'Washed white tee with a vintage graphic.', fabric: TEE }),
    p({ id: 'denim-hood-layer', name: 'Denim Hood Layer', gender: 'women', section: 'winterwear', type: 'Jackets', price: 2299, isNew: true,
      images: ['wDenim', 'wPocket'], fit: 'Regular fit.', desc: 'A denim trucker with a jersey hood built in.', fabric: DENIM }),
    p({ id: 'field-utility-jacket', name: 'Field Utility Jacket', gender: 'women', section: 'winterwear', type: 'Jackets', price: 3499, badge: 'Low stock', stock: 4, isNew: true,
      images: ['wField', 'bomber'], fit: 'Relaxed fit.', desc: 'Olive field jacket with four pockets and a drawcord waist.', fabric: '100% cotton canvas. Machine wash cold.' }),
    p({ id: 'ribbed-tank', name: 'Ribbed Tank', gender: 'women', section: 'topwear', type: 'Tanks', price: 699, hot: true,
      images: ['wPink', 'wTank'], fit: 'Slim fit.', desc: 'A fine-rib tank that layers under everything.', fabric: '95% cotton, 5% elastane rib.' }),
    p({ id: 'high-rise-straight-jeans', name: 'High-Rise Straight Jeans', gender: 'women', section: 'bottomwear', type: 'Jeans', price: 1999, isNew: true, hot: true,
      images: ['wJeans', 'wJeans2'], fit: 'High rise, straight leg.', desc: 'Mid-blue straight jeans with a raw hem.', fabric: DENIM }),
    p({ id: 'fringe-knit-poncho', name: 'Fringe Knit Poncho', gender: 'women', section: 'winterwear', type: 'Knits', price: 1599, isNew: true,
      images: ['wPoncho', 'wKnit'], fit: 'One size.', desc: 'An open-knit cream poncho with a fringe hem.', fabric: '100% acrylic knit. Hand wash cold.' }),
    p({ id: 'wool-check-coat', name: 'Wool Check Coat', gender: 'women', section: 'winterwear', type: 'Coats', price: 4999, compare: 5999, badge: 'New', isNew: true,
      images: ['wCheck', 'wCoat'], fit: 'Relaxed, longline.', desc: 'A navy check coat cut long enough to layer over knits.', fabric: '60% wool, 40% polyester. Dry clean.' }),
    p({ id: 'burgundy-wrap-coat', name: 'Burgundy Wrap Coat', gender: 'women', section: 'winterwear', type: 'Coats', price: 5499, hot: true,
      images: ['wCoat', 'wCheck'], fit: 'Regular fit with a tie belt.', desc: 'A deep burgundy wrap coat with a wide lapel.', fabric: '60% wool, 40% polyester. Dry clean.' }),
    p({ id: 'stripe-wide-leg-pant', name: 'Stripe Wide-Leg Pant', gender: 'women', section: 'bottomwear', type: 'Wide-leg', price: 1799,
      images: ['wWide'], fit: 'High rise, wide leg.', desc: 'Black and white pinstripe trousers with a fluid drape.', fabric: 'Viscose blend. Machine wash cold.' }),
    p({ id: 'teal-halter-jumpsuit', name: 'Teal Halter Jumpsuit', gender: 'women', section: 'topwear', type: 'Jumpsuits', price: 2799,
      images: ['wJump'], fit: 'Regular fit with a belted waist.', desc: 'A satin-finish halter jumpsuit for nights out.', fabric: 'Polyester satin. Gentle wash.' }),
    p({ id: 'blush-cargo-jogger', name: 'Blush Cargo Jogger', gender: 'women', section: 'bottomwear', type: 'Joggers', price: 1499,
      images: ['wJogger', 'wYellow'], fit: 'Relaxed with cuffed hem.', desc: 'Soft pink cargo joggers with zip pockets.', fabric: '98% cotton, 2% elastane.' }),
    p({ id: 'light-wash-skinny-jeans', name: 'Light Wash Skinny Jeans', gender: 'women', section: 'bottomwear', type: 'Jeans', price: 1899,
      images: ['wJeans2', 'wJeans'], fit: 'Skinny fit, mid rise.', desc: 'A light-wash skinny jean with real stretch.', fabric: DENIM }),
    p({ id: 'ripped-boyfriend-jeans', name: 'Ripped Boyfriend Jeans', gender: 'women', section: 'bottomwear', type: 'Jeans', price: 2099,
      images: ['wPocket', 'wJeans2'], fit: 'Relaxed boyfriend fit.', desc: 'Distressed boyfriend jeans with patch details.', fabric: DENIM }),
    p({ id: 'cream-cropped-knit', name: 'Cream Cropped Knit', gender: 'women', section: 'winterwear', type: 'Knits', price: 1999,
      images: ['wKnit', 'wPoncho'], fit: 'Cropped, relaxed.', desc: 'A chunky cropped knit in warm oat.', fabric: '70% cotton, 30% wool. Hand wash cold.' }),
    p({ id: 'cloud-runner', name: 'Cloud Runner', gender: 'women', section: 'accessories', type: 'Sneakers', price: 2999,
      images: ['runner', 'court'], fit: 'True to size.', desc: 'Light knit runners with a cushioned sole.', fabric: 'Knit mesh upper, EVA sole.' }),
    p({ id: 'washed-cap', name: 'Washed Cap', gender: 'women', section: 'accessories', type: 'Caps', price: 599,
      images: ['cap'], fit: 'One size, adjustable strap.', desc: 'A soft white cap in washed cotton.', fabric: '100% cotton twill.' }),
    p({ id: 'mini-backpack', name: 'Mini Backpack', gender: 'women', section: 'accessories', type: 'Bags', price: 2299,
      images: ['bag'], fit: '14 L.', desc: 'A compact daypack with a padded tablet sleeve.', fabric: 'Recycled polyester, water-repellent finish.' }),
  ],
  /* Sample reviews for layout only. Replace with real, verified reviews before launch. */
  reviews: [
    { name: 'Aarav M.', city: 'Bengaluru', product: 'Trail Pullover Hoodie', text: 'Heaviest hoodie I own. Ten washes in and the hood still stands up.', stars: 5 },
    { name: 'Riya S.', city: 'Mumbai', product: 'Wool Check Coat', text: 'Looks far more expensive than it was. Fits over a knit, as promised.', stars: 5 },
    { name: 'Kabir T.', city: 'Delhi', product: 'Utility Chino', text: 'Finally chinos that don’t balloon. The stretch waist is a big win.', stars: 5 },
    { name: 'Meera K.', city: 'Pune', product: 'Skeleton Crop Tee', text: 'The oversized tee drapes perfectly. Bought it in three colours.', stars: 5 },
    { name: 'Ishaan R.', city: 'Hyderabad', product: 'Midnight Boxy Tee', text: 'Delivery in two days and the return pickup was painless.', stars: 5 },
    { name: 'Ananya P.', city: 'Kolkata', product: 'Ember Crew Sweater', text: 'Soft, thick, zero pilling after a month of wearing it every day.', stars: 5 },
  ],
};

export const money = (n: number) =>
  new Intl.NumberFormat(STORE.locale, { style: 'currency', currency: STORE.currency, maximumFractionDigits: 0 }).format(n);

export const byId = (id: string) => STORE.products.find((x) => x.id === id);
export const forGender = (g: Gender) => STORE.products.filter((x) => x.gender === g);
export const offPct = (x: Product) => (x.compare ? Math.round((1 - x.price / x.compare) * 100) : 0);
export const sectionLabel = (s: Section) => SECTIONS.find((x) => x.id === s)!.label;
export const genderLabel = (g: Gender) => (g === 'men' ? 'Men' : 'Women');
