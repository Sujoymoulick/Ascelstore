/* Home page content per gender: hero slides, category tiles, editorial blocks. */
import type { Gender, Section } from './products';
import type { PhotoKey } from '../lib/img';

export interface Slide { img: PhotoKey; eyebrow: string; l1: string; l2: string; text: string; cta: string; href: string }
export interface HomeContent {
  hero: Slide[];
  nav: [string, string][];
  tiles: Record<Section, [string, PhotoKey][]>;
  edit: { img: PhotoKey; eyebrow: string; l1: string; l2: string; cta: string; href: string };
  split: { title: string; sub: string; img: PhotoKey; href: string }[];
  about: PhotoKey;
}

export const HOME: Record<Gender, HomeContent> = {
  men: {
    hero: [
      { img: 'leather', eyebrow: 'New season', l1: 'Built for', l2: 'the street.', text: 'Leather, heavyweight cotton and cuts that hold their shape.', cta: 'Shop jackets', href: '/men/winterwear?type=Jackets' },
      { img: 'circle', eyebrow: 'Winter ’26', l1: 'Layer up,', l2: 'stay easy.', text: 'Overshirts, knits and hoodies made for cold mornings.', cta: 'Shop winterwear', href: '/men/winterwear' },
      { img: 'mtn', eyebrow: 'Essentials', l1: 'Tees that', l2: 'last.', text: '240 GSM cotton tees from ₹799. Boxy, oversized or classic.', cta: 'Shop tees', href: '/men/topwear' },
    ],
    nav: [['New in', '/men/all?new=1'], ['T-shirts', '/men/topwear?type=T-shirts'], ['Oversized', '/men/topwear?type=Oversized%20T-shirts'], ['Shirts', '/men/topwear?type=Shirts'], ['Hoodies', '/men/winterwear?type=Hoodies'], ['Jackets', '/men/winterwear?type=Jackets'], ['Bottoms', '/men/bottomwear'], ['Sneakers', '/men/accessories?type=Sneakers'], ['Accessories', '/men/accessories']],
    tiles: {
      topwear: [['T-shirts', 'hangerTee'], ['Shirts', 'shirt'], ['Oversized T-shirts', 'tee'], ['Blush & pastels', 'pink']],
      bottomwear: [['Jeans', 'denim'], ['Chinos', 'chino'], ['Relaxed jeans', 'jeansDark'], ['Pair with tees', 'pinkM']],
      winterwear: [['Hoodies', 'hoodie'], ['Jackets', 'bomber'], ['Sweatshirts', 'sweat'], ['Leather', 'leatherFlat']],
      accessories: [['Sneakers', 'court'], ['Caps', 'cap'], ['Backpacks', 'bag'], ['Runners', 'runner']],
    },
    edit: { img: 'rack2', eyebrow: 'Winter ’26 Collection', l1: 'The Cold', l2: 'Edit', cta: 'Explore winterwear', href: '/men/winterwear' },
    split: [
      { title: 'Heavy hoodies', sub: 'From ₹2,199', img: 'hoodie', href: '/men/winterwear?type=Hoodies' },
      { title: 'Boxy tees', sub: 'From ₹799', img: 'black', href: '/men/topwear?type=T-shirts' },
    ],
    about: 'store',
  },
  women: {
    hero: [
      { img: 'wRed', eyebrow: 'New season', l1: 'Loud colour,', l2: 'soft cotton.', text: 'Statement tees and easy layers for every day of the week.', cta: 'Shop new in', href: '/women/all?new=1' },
      { img: 'wMilan', eyebrow: 'Winter ’26', l1: 'Coats worth', l2: 'travelling in.', text: 'Long coats, checks and knits, cut to layer over anything.', cta: 'Shop winterwear', href: '/women/winterwear' },
      { img: 'wSun', eyebrow: 'Essentials', l1: 'Everyday,', l2: 'elevated.', text: 'Crops, tanks and tees from ₹699. Made to mix.', cta: 'Shop topwear', href: '/women/topwear' },
    ],
    nav: [['New in', '/women/all?new=1'], ['T-shirts', '/women/topwear?type=T-shirts'], ['Crop tops', '/women/topwear?type=Crop%20tops'], ['Co-ords', '/women/topwear?type=Co-ords'], ['Knitwear', '/women/winterwear?type=Knits'], ['Coats', '/women/winterwear?type=Coats'], ['Jeans', '/women/bottomwear?type=Jeans'], ['Sneakers', '/women/accessories?type=Sneakers'], ['Accessories', '/women/accessories']],
    tiles: {
      topwear: [['T-shirts', 'wTee'], ['Crop tops', 'wSkull'], ['Tanks', 'wTank'], ['Jumpsuits', 'wJump']],
      bottomwear: [['Jeans', 'wJeans2'], ['Joggers', 'wJogger'], ['Wide-leg', 'wWide'], ['Straight fit', 'wJeans']],
      winterwear: [['Sweaters', 'wOrange'], ['Knits', 'wKnit'], ['Jackets', 'wField'], ['Coats', 'wCoat']],
      accessories: [['Sneakers', 'runner'], ['Caps', 'cap'], ['Bags', 'bag'], ['Statement pieces', 'wSun']],
    },
    edit: { img: 'wMilan', eyebrow: 'Winter ’26 Collection', l1: 'The Cold', l2: 'Edit', cta: 'Explore winterwear', href: '/women/winterwear' },
    split: [
      { title: 'Soft knits', sub: 'From ₹1,599', img: 'wOrange', href: '/women/winterwear?type=Knits' },
      { title: 'Graphic tees', sub: 'From ₹899', img: 'wTee', href: '/women/topwear' },
    ],
    about: 'rack',
  },
};

/** Map a tile label to a listing URL: real product types filter, anything else opens the section. */
export function tileHref(g: Gender, s: Section, label: string, types: string[]) {
  return types.includes(label) ? `/${g}/${s}?type=${encodeURIComponent(label)}` : `/${g}/${s}`;
}
