import { Product } from '../types';
import { auraProducts } from './products/aura';
import { kuroProducts } from './products/kuro';
import { solsticeProducts } from './products/solstice';
import { verveProducts } from './products/verve';
import { elysianProducts } from './products/elysian';
import { velvetProducts } from './products/velvet';
import { zenithProducts } from './products/zenith';
import { urbanProducts } from './products/urban';
import { chronosProducts } from './products/chronos';
import { glowrxProducts } from './products/glowrx';
import { maisonProducts } from './products/maison';
import { livingProducts } from './products/living';
import { littleStarsProducts } from './products/littlestars';

const rawProducts: Product[] = [
  ...auraProducts,
  ...kuroProducts,
  ...solsticeProducts,
  ...verveProducts,
  ...elysianProducts,
  ...velvetProducts,
  ...zenithProducts,
  ...urbanProducts,
  ...chronosProducts,
  ...glowrxProducts,
  ...maisonProducts,
  ...livingProducts,
  ...littleStarsProducts
];

// Deduplicate products by ID and sanitize images
const seenIds = new Set<string>();
const defaultPlaceholder = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800';

export const INITIAL_PRODUCTS: Product[] = rawProducts
  .filter(p => {
    if (!p.id || seenIds.has(p.id)) return false;
    seenIds.add(p.id);
    return true;
  })
  .map(product => {
    const primaryImg = (product.images && product.images.length > 0 && product.images[0]) ? product.images[0] : defaultPlaceholder;
    return {
      ...product,
      images: [primaryImg]
    };
  });

