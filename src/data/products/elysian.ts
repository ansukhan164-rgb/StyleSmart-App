import { Product } from '../../types';

export const elysianProducts: Product[] = [
  {
    id: 'prod-elysian-1',
    title: 'Elysian Chunky Platform Retro Sneakers',
    brand: 'Elysian Footwear',
    category: 'Footwear',
    subCategory: 'Sneakers',
    gender: 'Unisex',
    price: 3499,
    originalPrice: 6999,
    discountPercent: 50,
    rating: 4.8,
    reviewCount: 620,
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Vintage White & Teal', hex: '#0d9488' },
      { name: 'Monochrome Black', hex: '#18181b' },
      { name: 'Retro Cream & Tan', hex: '#d97706' }
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    material: 'Full-Grain Vegan Leather & Suede Accent',
    style: 'Streetwear',
    inStock: true,
    stockCount: 50,
    isNewArrival: true,
    tags: ['sneakers', 'footwear', 'chunky', 'retro', 'white', 'elysian'],
    features: ['Memory foam high-density insole', 'Anti-slip lugged rubber outsole', 'Breathable mesh lining'],
    specifications: {
      'Closure': 'Lace-Up',
      'Sole': 'Phylon Midsole + Rubber Outsole',
      'Weight': '380g per shoe'
    },
    compatibilityTags: ['top_oversized_hoodie', 'bottom_cargo', 'bottom_denim'],
    viewsCount: 5200,
    purchasesCount: 890,
    createdAt: '2026-02-03'
  },
  {
    id: 'prod-elysian-2',
    title: 'Elysian Handcrafted Leather Oxford Dress Shoes',
    brand: 'Elysian Footwear',
    category: 'Footwear',
    subCategory: 'Formal Shoes',
    gender: 'Men',
    price: 3999,
    originalPrice: 7999,
    discountPercent: 50,
    rating: 4.9,
    reviewCount: 210,
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Hand-Burnished Tan', hex: '#92400e' },
      { name: 'Formal Onyx Black', hex: '#09090b' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    material: 'Full-Grain Italian Calfskin Leather',
    style: 'Formal',
    inStock: true,
    stockCount: 16,
    tags: ['shoes', 'formal', 'oxford', 'leather', 'wedding', 'men'],
    features: ['Goodyear welted sole for lifetime durability', 'Cushioned leather lining with arch support', 'Hand-burnished toe box accent'],
    specifications: {
      'Upper': '100% Italian Leather',
      'Sole': 'Genuine Leather Sole + Anti-slip rubber heel'
    },
    compatibilityTags: ['top_suit', 'accessory_watch'],
    viewsCount: 2400,
    purchasesCount: 310,
    createdAt: '2026-01-08'
  },
  {
    id: 'prod-elysian-3',
    title: 'Elysian Minimalist Suede Penny Loafers',
    brand: 'Elysian Footwear',
    category: 'Footwear',
    subCategory: 'Formal Shoes',
    gender: 'Men',
    price: 2899,
    originalPrice: 5499,
    discountPercent: 47,
    rating: 4.7,
    reviewCount: 180,
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Chocolate Suede', hex: '#451a03' },
      { name: 'Sand Taupe', hex: '#d4b185' }
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    material: 'Water-Resistant Premium Calf Suede',
    style: 'Casual',
    inStock: true,
    stockCount: 25,
    isBestSeller: true,
    tags: ['loafers', 'suede', 'casual shoes', 'elysian'],
    features: ['Slip-on design with elastic side gores', 'Latex padded footbed', 'Flexible rubber outsole'],
    specifications: {
      'Sole': 'TPR Rubber Sole',
      'Upper': 'Natural Suede Leather'
    },
    compatibilityTags: ['bottom_chinos', 'top_linen_shirt'],
    viewsCount: 3100,
    purchasesCount: 420,
    createdAt: '2026-01-15'
  },
  {
    id: 'prod-elysian-4',
    title: 'Elysian High-Top Leather Streetwear Sneakers',
    brand: 'Elysian Footwear',
    category: 'Footwear',
    subCategory: 'Sneakers',
    gender: 'Unisex',
    price: 3799,
    originalPrice: 6999,
    discountPercent: 46,
    rating: 4.8,
    reviewCount: 340,
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Pitch Black & White', hex: '#18181b' },
      { name: 'All White Grain', hex: '#ffffff' }
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    material: 'Tumbled Action Leather with Ankle Padding',
    style: 'Streetwear',
    inStock: true,
    stockCount: 35,
    tags: ['high top', 'sneakers', 'leather', 'elysian'],
    features: ['Padded collar support', 'Vulcanized thick rubber midsole', 'Reinforced heel cap'],
    specifications: {
      'Closure': '8-Eyelet Lace Up',
      'Sole': 'High Traction Rubber'
    },
    compatibilityTags: ['bottom_cargo', 'top_hoodie'],
    viewsCount: 3900,
    purchasesCount: 560,
    createdAt: '2026-01-19'
  },
  {
    id: 'prod-elysian-5',
    title: 'Elysian Italian Calfskin Leather Chelsea Boots',
    brand: 'Elysian Footwear',
    category: 'Footwear',
    subCategory: 'Formal Shoes',
    gender: 'Men',
    price: 4499,
    originalPrice: 8499,
    discountPercent: 47,
    rating: 4.9,
    reviewCount: 220,
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Deep Chestnut', hex: '#78350f' },
      { name: 'Onyx Black', hex: '#09090b' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    material: 'Hand-Waxed Aniline Leather',
    style: 'Formal',
    inStock: true,
    stockCount: 18,
    isNewArrival: true,
    tags: ['chelsea boots', 'boots', 'leather', 'elysian'],
    features: ['Heavy elastic side panels for easy entry', 'Rear leather pull tab', 'Cushioned sheepskin sockliner'],
    specifications: {
      'Sole': 'Leather + Rubber Insert Sole',
      'Heel Height': '28mm'
    },
    compatibilityTags: ['bottom_jeans', 'top_coat', 'top_blazer'],
    viewsCount: 3300,
    purchasesCount: 410,
    createdAt: '2026-01-28'
  },
  {
    id: 'prod-elysian-6',
    title: 'Elysian Stiletto Pointed Toe Leather Pumps',
    brand: 'Elysian Footwear',
    category: 'Footwear',
    subCategory: 'Formal Shoes',
    gender: 'Women',
    price: 3299,
    originalPrice: 5999,
    discountPercent: 45,
    rating: 4.8,
    reviewCount: 195,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Nude Beige', hex: '#e2d3c1' },
      { name: 'Classic Black', hex: '#09090b' },
      { name: 'Crimson Red', hex: '#991b1b' }
    ],
    sizes: ['UK 3', 'UK 4', 'UK 5', 'UK 6', 'UK 7'],
    material: 'Patent Leather with Memory Foam Footbed',
    style: 'Luxury',
    inStock: true,
    stockCount: 22,
    tags: ['pumps', 'heels', 'stiletto', 'women', 'elysian'],
    features: ['85mm slim stiletto heel', 'Gel padded ball-of-foot cushion', 'Slip-resistant rubber heel tap'],
    specifications: {
      'Heel Height': '85mm (3.3 inches)',
      'Upper': 'Genuine Patent Leather'
    },
    compatibilityTags: ['top_dress', 'bottom_trouser'],
    viewsCount: 2900,
    purchasesCount: 380,
    createdAt: '2026-01-22'
  },
  {
    id: 'prod-elysian-7',
    title: 'Elysian Ultra Light Mesh Performance Running Shoes',
    brand: 'Elysian Footwear',
    category: 'Footwear',
    subCategory: 'Sneakers',
    gender: 'Unisex',
    price: 2999,
    originalPrice: 5499,
    discountPercent: 45,
    rating: 4.7,
    reviewCount: 480,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Electric Blue', hex: '#2563eb' },
      { name: 'Stealth Charcoal', hex: '#374151' }
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    material: 'Engineered Flyknit Mesh & Nitrogen-Infused Midsole',
    style: 'Activewear',
    inStock: true,
    stockCount: 45,
    tags: ['running shoes', 'sneakers', 'mesh', 'activewear', 'elysian'],
    features: ['Responsive rebound foam midsole', '3D printed arch collar', 'Ultra lightweight 210g frame'],
    specifications: {
      'Drop': '8mm Heel-to-Toe Drop',
      'Weight': '210g per shoe'
    },
    compatibilityTags: ['bottom_joggers', 'top_activewear'],
    viewsCount: 4500,
    purchasesCount: 680,
    createdAt: '2026-01-10'
  },
  {
    id: 'prod-elysian-8',
    title: 'Elysian Braided Leather Slide Sandals',
    brand: 'Elysian Footwear',
    category: 'Footwear',
    subCategory: 'Sandals & Slides',
    gender: 'Women',
    price: 1699,
    originalPrice: 2999,
    discountPercent: 43,
    rating: 4.6,
    reviewCount: 140,
    images: [
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Tan Gold', hex: '#d4b185' },
      { name: 'Ivory White', hex: '#ffffff' }
    ],
    sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'],
    material: 'Soft Nappa Leather Upper & Molded Cork Footbed',
    style: 'Casual',
    inStock: true,
    stockCount: 30,
    tags: ['sandals', 'slides', 'leather', 'summer', 'elysian'],
    features: ['Hand-braided leather strap', 'Anatomically contoured cork sole', 'Durable non-slip outsole'],
    specifications: {
      'Sole Height': '20mm',
      'Footbed': 'Genuine Suede Covered Cork'
    },
    compatibilityTags: ['top_linen_dress', 'bottom_shorts'],
    viewsCount: 2200,
    purchasesCount: 310,
    createdAt: '2026-01-26'
  },
  {
    id: 'prod-elysian-9',
    title: 'Elysian Hand-Burnished Leather Brogue Shoes',
    brand: 'Elysian Footwear',
    category: 'Footwear',
    subCategory: 'Formal Shoes',
    gender: 'Men',
    price: 3899,
    originalPrice: 7299,
    discountPercent: 47,
    rating: 4.9,
    reviewCount: 165,
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Cognac Brown', hex: '#78350f' },
      { name: 'Onyx Black', hex: '#09090b' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    material: 'Full Grain Calf Leather with Wingtips Punch Detail',
    style: 'Formal',
    inStock: true,
    stockCount: 15,
    tags: ['brogues', 'formal shoes', 'wingtip', 'elysian'],
    features: ['Intricate medallion brogue hole perforation', 'Goodyear welted sole', 'Soft sheepskin lining'],
    specifications: {
      'Upper': '100% Calf Leather',
      'Sole': 'Leather Sole with Rubber Heel'
    },
    compatibilityTags: ['top_suit', 'bottom_chinos'],
    viewsCount: 2600,
    purchasesCount: 340,
    createdAt: '2026-01-14'
  },
  {
    id: 'prod-elysian-10',
    title: 'Elysian Chunky Platform Ankle Combat Boots',
    brand: 'Elysian Footwear',
    category: 'Footwear',
    subCategory: 'Formal Shoes',
    gender: 'Women',
    price: 3699,
    originalPrice: 6999,
    discountPercent: 47,
    rating: 4.8,
    reviewCount: 210,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Matte Onyx Black', hex: '#09090b' }
    ],
    sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'],
    material: 'Waterproof Action Leather with Heavy Rubber Tread',
    style: 'Streetwear',
    inStock: true,
    stockCount: 20,
    tags: ['boots', 'combat boots', 'chunky', 'women', 'elysian'],
    features: ['Side zipper for easy access', '8-eyelet front speed lace', '45mm lugged platform sole'],
    specifications: {
      'Platform Height': '45mm',
      'Closure': 'Lace-Up + Side Zipper'
    },
    compatibilityTags: ['bottom_skirt', 'top_leather_jacket'],
    viewsCount: 3100,
    purchasesCount: 420,
    createdAt: '2026-02-01'
  },
  {
    id: 'prod-elysian-11',
    title: 'Elysian Minimalist Canvas Slip-On Sneakers',
    brand: 'Elysian Footwear',
    category: 'Footwear',
    subCategory: 'Sneakers',
    gender: 'Unisex',
    price: 1899,
    originalPrice: 3299,
    discountPercent: 42,
    rating: 4.6,
    reviewCount: 290,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Off White', hex: '#ffffff' },
      { name: 'Black Checker', hex: '#18181b' }
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    material: 'Heavy 14oz Canvas Upper with Rubber Toe Guard',
    style: 'Casual',
    inStock: true,
    stockCount: 40,
    tags: ['slip on', 'sneakers', 'canvas', 'casual', 'elysian'],
    features: ['Elastic side gores', 'Cushioned arch support insole', 'Flexible waffle rubber outsole'],
    specifications: {
      'Sole': 'Vulcanized Rubber',
      'Care': 'Wipe clean'
    },
    compatibilityTags: ['bottom_shorts', 'bottom_jeans'],
    viewsCount: 2800,
    purchasesCount: 410,
    createdAt: '2026-01-11'
  },
  {
    id: 'prod-elysian-12',
    title: 'Elysian Suede Moccasin Driving Shoes',
    brand: 'Elysian Footwear',
    category: 'Footwear',
    subCategory: 'Formal Shoes',
    gender: 'Men',
    price: 2799,
    originalPrice: 4999,
    discountPercent: 44,
    rating: 4.7,
    reviewCount: 155,
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Navy Blue Suede', hex: '#1e3a8a' },
      { name: 'Tan Suede', hex: '#d4b185' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    material: 'Italian Calf Suede with Pebble Rubber Sole',
    style: 'Casual',
    inStock: true,
    stockCount: 22,
    tags: ['moccasins', 'driving shoes', 'suede', 'elysian'],
    features: ['Hand-stitched vamp detail', 'Grip rubber pebble studs on sole & heel', 'Unlined soft upper'],
    specifications: {
      'Sole': 'Rubber Pebble Grip',
      'Upper': '100% Suede'
    },
    compatibilityTags: ['bottom_chinos', 'top_polo'],
    viewsCount: 2300,
    purchasesCount: 310,
    createdAt: '2026-01-20'
  },
  {
    id: 'prod-elysian-13',
    title: 'Elysian Block Heel Leather Ankle Booties',
    brand: 'Elysian Footwear',
    category: 'Footwear',
    subCategory: 'Formal Shoes',
    gender: 'Women',
    price: 3499,
    originalPrice: 6499,
    discountPercent: 46,
    rating: 4.8,
    reviewCount: 170,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Cognac Leather', hex: '#78350f' },
      { name: 'Jet Black', hex: '#09090b' }
    ],
    sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'],
    material: 'Full Grain Leather with Stacked Leather Heel',
    style: 'Casual',
    inStock: true,
    stockCount: 18,
    tags: ['ankle boots', 'heels', 'block heel', 'women', 'elysian'],
    features: ['60mm comfortable block heel', 'Side zip closure', 'Pointed almond toe shape'],
    specifications: {
      'Heel Height': '60mm (2.3 inches)',
      'Upper': '100% Genuine Leather'
    },
    compatibilityTags: ['bottom_jeans', 'top_coat'],
    viewsCount: 2700,
    purchasesCount: 350,
    createdAt: '2026-01-16'
  },
  {
    id: 'prod-elysian-14',
    title: 'Elysian Plush Cloud Memory Foam Slides',
    brand: 'Elysian Footwear',
    category: 'Footwear',
    subCategory: 'Sandals & Slides',
    gender: 'Unisex',
    price: 1199,
    originalPrice: 2199,
    discountPercent: 45,
    rating: 4.8,
    reviewCount: 520,
    images: [
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Bone White', hex: '#e2d3c1' },
      { name: 'Charcoal Grey', hex: '#374151' },
      { name: 'Sage Green', hex: '#657153' }
    ],
    sizes: ['UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    material: 'Waterproof High-Density EVA Compression Foam',
    style: 'Casual',
    inStock: true,
    stockCount: 60,
    isBestSeller: true,
    tags: ['slides', 'cloud slides', 'foam', 'comfortable', 'elysian'],
    features: ['4cm thick shock-absorbing sole', 'Deep heel cup & toe grip mold', '100% Waterproof washable'],
    specifications: {
      'Sole Thickness': '40mm',
      'Weight': '140g per slide'
    },
    compatibilityTags: ['bottom_joggers', 'top_hoodie'],
    viewsCount: 4800,
    purchasesCount: 790,
    createdAt: '2026-01-05'
  },
  {
    id: 'prod-elysian-15',
    title: 'Elysian Double Monk Strap Leather Dress Shoes',
    brand: 'Elysian Footwear',
    category: 'Footwear',
    subCategory: 'Formal Shoes',
    gender: 'Men',
    price: 4199,
    originalPrice: 7999,
    discountPercent: 47,
    rating: 4.9,
    reviewCount: 130,
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Hand-Antique Tan', hex: '#92400e' },
      { name: 'Formal Black', hex: '#09090b' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    material: 'Top-Grain Italian Leather with Brass Buckles',
    style: 'Formal',
    inStock: true,
    stockCount: 14,
    tags: ['monk strap', 'formal shoes', 'leather', 'elysian'],
    features: ['Dual adjustable brass buckle straps', 'Cap toe construction', 'Leather lined cushioned sock'],
    specifications: {
      'Sole': 'Leather Sole with Rubber Traction Pad',
      'Upper': '100% Top Grain Leather'
    },
    compatibilityTags: ['top_suit', 'accessory_watch'],
    viewsCount: 2200,
    purchasesCount: 290,
    createdAt: '2026-01-23'
  },
  {
    id: 'prod-elysian-16',
    title: 'Elysian Espadrille Wedge Ankle Strap Sandals',
    brand: 'Elysian Footwear',
    category: 'Footwear',
    subCategory: 'Sandals & Slides',
    gender: 'Women',
    price: 2499,
    originalPrice: 4499,
    discountPercent: 44,
    rating: 4.7,
    reviewCount: 110,
    images: [
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Natural Jute Sand', hex: '#d4b185' },
      { name: 'Black Suede', hex: '#18181b' }
    ],
    sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'],
    material: 'Natural Braided Jute Platform with Canvas Ankle Ribbon',
    style: 'Boho',
    inStock: true,
    stockCount: 20,
    tags: ['espadrilles', 'wedges', 'sandals', 'summer', 'elysian'],
    features: ['70mm jute wrapped wedge heel', 'Soft ankle wrap ribbons', 'Cushioned footbed'],
    specifications: {
      'Heel Height': '70mm Wedge',
      'Platform': '20mm'
    },
    compatibilityTags: ['top_linen_dress', 'top_summer_skirt'],
    viewsCount: 1900,
    purchasesCount: 260,
    createdAt: '2026-01-31'
  },
  {
    id: 'prod-elysian-17',
    title: 'Elysian Waterproof Leather Trail Hiking Boots',
    brand: 'Elysian Footwear',
    category: 'Footwear',
    subCategory: 'Formal Shoes',
    gender: 'Unisex',
    price: 4299,
    originalPrice: 7999,
    discountPercent: 46,
    rating: 4.9,
    reviewCount: 180,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Earth Brown & Orange', hex: '#78350f' },
      { name: 'Olive Tactical', hex: '#3f6212' }
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    material: 'Waterproof Nubuck Leather & Vibram High-Grip Rubber Sole',
    style: 'Activewear',
    inStock: true,
    stockCount: 16,
    tags: ['hiking boots', 'trail', 'waterproof', 'elysian'],
    features: ['Waterproof breathable membrane lining', 'Speed lace metal hardware hooks', 'Impact absorption EVA midsole'],
    specifications: {
      'Waterproof': '100% Sealed Seams',
      'Sole': 'Vibram Traction Rubber'
    },
    compatibilityTags: ['bottom_cargo', 'top_puffer_jacket'],
    viewsCount: 2900,
    purchasesCount: 370,
    createdAt: '2026-01-17'
  },
  {
    id: 'prod-elysian-18',
    title: 'Elysian Mule Slippers with Gold Horsebit Buckle',
    brand: 'Elysian Footwear',
    category: 'Footwear',
    subCategory: 'Formal Shoes',
    gender: 'Women',
    price: 2199,
    originalPrice: 3999,
    discountPercent: 45,
    rating: 4.8,
    reviewCount: 145,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Onyx Black Leather', hex: '#09090b' },
      { name: 'Ivory Cream Leather', hex: '#fef3c7' }
    ],
    sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'],
    material: 'Smooth Calfskin Leather with Brass Horsebit Hardware',
    style: 'Luxury',
    inStock: true,
    stockCount: 22,
    tags: ['mules', 'slippers', 'horsebit', 'luxury', 'elysian'],
    features: ['Backless slip-on silhouette', 'Polished gold horsebit detail', 'Padded leather sockliner'],
    specifications: {
      'Heel Height': '10mm Flat',
      'Upper': '100% Calf Leather'
    },
    compatibilityTags: ['bottom_cropped_trousers', 'top_blazer'],
    viewsCount: 2400,
    purchasesCount: 320,
    createdAt: '2026-01-27'
  },
  {
    id: 'prod-elysian-19',
    title: 'Elysian Chunky Sole Canvas High Top Platform Sneakers',
    brand: 'Elysian Footwear',
    category: 'Footwear',
    subCategory: 'Sneakers',
    gender: 'Women',
    price: 2899,
    originalPrice: 5199,
    discountPercent: 44,
    rating: 4.7,
    reviewCount: 310,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Black Canvas', hex: '#18181b' },
      { name: 'Pure White', hex: '#ffffff' }
    ],
    sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'],
    material: '16oz Cotton Canvas with 40mm Platform Midsole',
    style: 'Streetwear',
    inStock: true,
    stockCount: 30,
    tags: ['platform sneakers', 'high top', 'canvas', 'elysian'],
    features: ['40mm lightweight elevated rubber platform', 'Contrast white stitch accent', 'Cushioned foam insole'],
    specifications: {
      'Platform Height': '40mm (1.5 inches)',
      'Sole': 'Vulcanized Rubber'
    },
    compatibilityTags: ['bottom_wide_leg_jeans', 'top_crop_top'],
    viewsCount: 3500,
    purchasesCount: 490,
    createdAt: '2026-01-13'
  },
  {
    id: 'prod-elysian-20',
    title: 'Elysian Suede Desert Chukka Boots',
    brand: 'Elysian Footwear',
    category: 'Footwear',
    subCategory: 'Formal Shoes',
    gender: 'Men',
    price: 3199,
    originalPrice: 5799,
    discountPercent: 44,
    rating: 4.8,
    reviewCount: 160,
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Sand Beige Suede', hex: '#d4b185' },
      { name: 'Dark Oak Suede', hex: '#451a03' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    material: 'Natural Suede Leather with Natural Crepe Rubber Sole',
    style: 'Casual',
    inStock: true,
    stockCount: 20,
    tags: ['chukka boots', 'desert boots', 'suede', 'elysian'],
    features: ['2-Eyelet lace fastening', 'Ultra-flexible crepe rubber sole', 'Soft unlined interior footbed'],
    specifications: {
      'Sole': '100% Natural Rubber Crepe',
      'Upper': 'Calf Suede'
    },
    compatibilityTags: ['bottom_chinos', 'bottom_denim', 'top_sweater'],
    viewsCount: 2300,
    purchasesCount: 310,
    createdAt: '2026-02-02'
  }
];
