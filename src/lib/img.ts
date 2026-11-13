/* Image URLs.
 * Catalogue images are Unsplash photo ids for now (placeholder photography).
 * When real product shots are ready, change `img()` to point at your CDN — every page uses it.
 */
export const PHOTO = {
  // men
  tee: '1503341504253-dff4815485f1', hoodie: '1556821840-3a63f95609a7', leather: '1520975954732-35dd22299614',
  plaid: '1607345366928-199ea26cfe3e', white: '1586790170083-2f9ceadc732d', mtn: '1571945153237-4929e783af4a',
  chino: '1473966968600-fa801b869a1a', rider: '1487222477894-8943e31ef7b2', black: '1618517351616-38fb9c5210c6',
  pink: '1622470953794-aa9c70b0fb9d', pinkM: '1516826957135-700dedea698c', circle: '1488161628813-04466f872be2',
  hangerBlack: '1583743814966-8936f5b7be1a', hangerTee: '1618354691373-d851c5c3a990', leatherFlat: '1551028719-00167b16eac5',
  shirts: '1602810318383-e386cc2a3ccf', whiteTee: '1521572163474-6864f9cf17ab', backTee: '1564859228273-274232fdb516',
  jeansDark: '1624378439575-d8705ad7ae80', bomber: '1591047139829-d91aecb6caea', shirt: '1596755094514-f87e34085b2c',
  denim: '1542272604-787c3835535d', sweat: '1620799140408-edc6dcb6d633', cap: '1588850561407-ed78c282e89b',
  bag: '1553062407-98eeb64c6a62', court: '1549298916-b41d501d3772', runner: '1460353581641-37baddab0fa2',
  // women
  wSkull: '1503342217505-b0a15ec3261c', wYellow: '1515886657613-9f3515b0c78f', wOrange: '1578587018452-892bacefd3f2',
  wTee: '1554568218-0f1715e72254', wDenim: '1517841905240-472988babdf9', wField: '1544022613-e87ca75a784a',
  wTank: '1525171254930-643fc658b64e', wJeans: '1598554747436-c9293d6a588f', wPoncho: '1434389677669-e08b4cac3105',
  wCheck: '1485968579580-b6d095142e6e', wRed: '1529139574466-a303027c1d8b', wMilan: '1539109136881-3be0616acf4b',
  wSun: '1469334031218-e382a71b716b', wCoat: '1483985988355-763728e1935b', wJogger: '1594633312681-425c7b97ccd1',
  wPink: '1500917293891-ef795e70e1f6', wKnit: '1631541909061-71e349d1f203', wJeans2: '1475178626620-a4d074967452',
  wHanger: '1581655353564-df123a1eb820', wWide: '1509631179647-0177331693ae', wJump: '1495385794356-15371f348c31',
  wPocket: '1541099649105-f69ad21f3246',
  // store / editorial
  rack: '1490481651871-ab68de25d43d', rack2: '1578932750294-f5075e85f44a', store: '1441984904996-e0b6ba687e04',
} as const;

export type PhotoKey = keyof typeof PHOTO;

/** Cropped image URL. Omit `h` to keep the original aspect ratio. */
export function img(key: PhotoKey, w: number, h?: number, crop = 'entropy') {
  return `https://images.unsplash.com/photo-${PHOTO[key]}?w=${w}${h ? `&h=${h}` : ''}&fit=crop&crop=${crop}&q=75&auto=format`;
}

/** srcset for a fixed aspect ratio (h / w). */
export function srcset(key: PhotoKey, widths: number[], ratio?: number) {
  return widths.map((w) => `${img(key, w, ratio ? Math.round(w * ratio) : undefined)} ${w}w`).join(', ');
}
