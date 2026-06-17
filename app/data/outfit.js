/**
 * Mock catalog for the OUTFIT® storefront replica.
 *
 * The original store is wired to Shopify; here we keep a static mock so the
 * focus stays on layout, motion and interaction. Every product shares one
 * placeholder image on purpose — swap `image` (or wire a loader) later to go
 * live without touching the presentation layer.
 */

export const SHARED_IMAGE = '/products/outfit-product.svg';

/** Sizes + colors are identical across the collection, like the real store. */
export const SIZES = ['S', 'M', 'L', 'XL', '2XL'];
export const COLORS = ['Black'];

/** @typedef {{id:string,handle:string,title:string,price:number,description:string,image:string}} OutfitProduct */

/** @type {OutfitProduct[]} */
export const PRODUCTS = [
  {
    handle: 'off-by-design',
    title: 'Off by Design',
    price: 36.5,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    handle: 'kerned-confidence',
    title: 'Kerned Confidence',
    price: 25.0,
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    handle: 'specimen-no-hh01',
    title: 'Specimen No. HH01',
    price: 30.0,
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    handle: 'grid-system-go',
    title: 'Grid System Go',
    price: 30.0,
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    handle: 'neutral-grotesk',
    title: 'Neutral Grotesk',
    price: 30.0,
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  },
  {
    handle: 'red-dot-not-award',
    title: 'Red Dot Not Award',
    price: 20.0,
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni.',
  },
  {
    handle: 'gridlocked',
    title: 'Gridlocked',
    price: 25.0,
    description:
      'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
  },
  {
    handle: 'hello-week-001',
    title: 'Hello Week 001',
    price: 30.0,
    description:
      'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
  },
  {
    handle: 'hello-week-002',
    title: 'Hello Week 002',
    price: 30.0,
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.',
  },
  {
    handle: 'monochrome-manifest',
    title: 'Monochrome Manifest',
    price: 30.0,
    description:
      'Et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis.',
  },
  {
    handle: 'positive-space',
    title: 'Positive Space',
    price: 30.0,
    description:
      'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut.',
  },
  {
    handle: 'whitespace-matters',
    title: 'Whitespace Matters',
    price: 33.0,
    description:
      'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias.',
  },
  {
    handle: 'command-k',
    title: 'Command + K',
    price: 15.0,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
  },
].map((p, i) => ({
  id: `gid://outfit/Product/${i + 1}`,
  // Real product photos lifted from the original site (see public/products/),
  // so hover/zoom reads correctly.
  image: `/products/p${i + 1}.jpg`,
  ...p,
}));

const BY_HANDLE = new Map(PRODUCTS.map((p) => [p.handle, p]));

/** @param {string} handle */
export function getProduct(handle) {
  return BY_HANDLE.get(handle) ?? null;
}

/** Format a number as the store's USD price string. */
export function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

/** Studio / footer metadata, lifted verbatim from the original site. */
export const STUDIO = {
  name: '++hellohello',
  tagline: 'Made to be worn. Or judged. Or both.',
  about:
    'Created by the ++hellohello team, this store and signature collection celebrates our collective creativity and passion for apparel. Carefully designed.',
  address: ['Libertad 2529 Office 102', 'Montevideo, Uruguay'],
  email: 'outfit@hellohello.is',
  year: 2026,
  socials: [
    {label: 'Dribbble', href: 'https://dribbble.com'},
    {label: 'Instagram', href: 'https://instagram.com'},
    {label: 'LinkedIn', href: 'https://linkedin.com'},
    {label: 'Twitter (X)', href: 'https://x.com'},
  ],
  nav: [
    {label: 'Work', href: '#'},
    {label: 'Services', href: '#'},
    {label: 'About', href: '#'},
    {label: 'Careers', href: '#'},
    {label: "Let's talk", href: '#'},
  ],
};
