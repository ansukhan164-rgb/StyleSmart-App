import { Product } from '../../types';

export const verveProducts: Product[] = [
  {
    id: 'prod-verve-1',
    title: 'Verve Luxe Silk Wrap Floral Midi Dress',
    brand: 'Verve Luxe',
    category: 'Women',
    subCategory: 'Dresses & Jumpsuits',
    gender: 'Women',
    price: 3299,
    originalPrice: 5999,
    discountPercent: 45,
    rating: 4.9,
    reviewCount: 512,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Emerald Green', hex: '#065f46' },
      { name: 'Ruby Red', hex: '#991b1b' },
      { name: 'Blush Pink', hex: '#fbcfe8' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    material: 'Mulberry Silk Satin Blend',
    style: 'Luxury',
    inStock: true,
    stockCount: 20,
    isBestSeller: true,
    tags: ['dress', 'midi', 'silk', 'luxury', 'party', 'verve'],
    features: ['Self-tie waist belt', 'Flowing asymmetrical hem', 'Lined body for zero transparency'],
    specifications: {
      'Length': 'Midi (Below Knee)',
      'Neckline': 'V-Neck Wrap',
      'Care': 'Dry clean only'
    },
    compatibilityTags: ['shoes_heels', 'accessory_clutch', 'accessory_necklace'],
    viewsCount: 4800,
    purchasesCount: 710,
    createdAt: '2026-01-20'
  },
  {
    id: 'prod-verve-2',
    title: 'Verve Luxe Tailored Double-Breasted Blazer',
    brand: 'Verve Luxe',
    category: 'Women',
    subCategory: 'Jackets & Coats',
    gender: 'Women',
    price: 3999,
    originalPrice: 7499,
    discountPercent: 47,
    rating: 4.8,
    reviewCount: 230,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Camel Tan', hex: '#b45309' },
      { name: 'Midnight Black', hex: '#09090b' },
      { name: 'Off White', hex: '#f8fafc' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: 'Premium Wool Blend Twill',
    style: 'Formal',
    inStock: true,
    stockCount: 16,
    tags: ['blazer', 'formal', 'jacket', 'office', 'luxury', 'verve'],
    features: ['Structured shoulder pads', 'Tortoise shell horn buttons', 'Interior silk lining with passport pocket'],
    specifications: {
      'Fit': 'Tailored Power Fit',
      'Care': 'Professional dry clean'
    },
    compatibilityTags: ['bottom_trouser', 'shoes_pumps', 'accessory_leather_bag'],
    viewsCount: 2900,
    purchasesCount: 310,
    createdAt: '2026-01-12'
  },
  {
    id: 'prod-verve-3',
    title: 'Verve Luxe Floor-Length Velvet Evening Gown',
    brand: 'Verve Luxe',
    category: 'Women',
    subCategory: 'Dresses & Jumpsuits',
    gender: 'Women',
    price: 5999,
    originalPrice: 11999,
    discountPercent: 50,
    rating: 4.9,
    reviewCount: 180,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Royal Burgundy', hex: '#881337' },
      { name: 'Midnight Navy', hex: '#1e3a8a' },
      { name: 'Onyx Black', hex: '#09090b' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: 'Plush Micro-Velvet with Crystal Rhinestone Trim',
    style: 'Luxury',
    inStock: true,
    stockCount: 12,
    isNewArrival: true,
    tags: ['gown', 'velvet', 'evening wear', 'luxury', 'verve'],
    features: ['Thigh-high side slit', 'Corset fitted bodice', 'Concealed back invisible zip'],
    specifications: {
      'Length': 'Maxi Floor Length',
      'Care': 'Specialist dry clean'
    },
    compatibilityTags: ['shoes_stiletto_heels', 'accessory_clutch'],
    viewsCount: 4200,
    purchasesCount: 490,
    createdAt: '2026-02-01'
  },
  {
    id: 'prod-verve-4',
    title: 'Verve Luxe Satin Button-Down Silk Blouse',
    brand: 'Verve Luxe',
    category: 'Women',
    subCategory: 'T-Shirts & Tops',
    gender: 'Women',
    price: 2199,
    originalPrice: 3999,
    discountPercent: 45,
    rating: 4.7,
    reviewCount: 210,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Ivory Cream', hex: '#fef3c7' },
      { name: 'Emerald Green', hex: '#065f46' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    material: '100% Stretch Silk Crepe de Chine',
    style: 'Formal',
    inStock: true,
    stockCount: 25,
    tags: ['blouse', 'silk shirt', 'formal', 'women', 'verve'],
    features: ['Mother-of-pearl buttons', 'French cuffs with button detail', 'Flowing draped silhouette'],
    specifications: {
      'Fit': 'Tailored Relaxed Fit',
      'Care': 'Hand wash cold or dry clean'
    },
    compatibilityTags: ['bottom_pencil_skirt', 'bottom_trouser', 'shoes_pumps'],
    viewsCount: 2800,
    purchasesCount: 390,
    createdAt: '2026-01-15'
  },
  {
    id: 'prod-verve-5',
    title: 'Verve Luxe Italian Cashmere Wrap Coat',
    brand: 'Verve Luxe',
    category: 'Women',
    subCategory: 'Jackets & Coats',
    gender: 'Women',
    price: 6999,
    originalPrice: 13999,
    discountPercent: 50,
    rating: 5.0,
    reviewCount: 145,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Rich Camel', hex: '#b45309' },
      { name: 'Nero Black', hex: '#09090b' }
    ],
    sizes: ['S', 'M', 'L'],
    material: '80% Cashmere, 20% Virgin Wool',
    style: 'Luxury',
    inStock: true,
    stockCount: 10,
    isBestSeller: true,
    tags: ['coat', 'cashmere', 'luxury coat', 'verve'],
    features: ['Oversized collar lapel', 'Self-tie wrap belt with gold hardware', 'Ultra-soft handfeel'],
    specifications: {
      'Length': 'Long (Mid-Calf)',
      'Care': 'Professional dry clean only'
    },
    compatibilityTags: ['shoes_leather_boots', 'accessory_leather_gloves'],
    viewsCount: 5100,
    purchasesCount: 620,
    createdAt: '2026-01-10'
  },
  {
    id: 'prod-verve-6',
    title: 'Verve Luxe High-Waisted Silk Palazzo Trousers',
    brand: 'Verve Luxe',
    category: 'Women',
    subCategory: 'Trousers & Chinos',
    gender: 'Women',
    price: 2799,
    originalPrice: 4999,
    discountPercent: 44,
    rating: 4.8,
    reviewCount: 165,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#fde047' },
      { name: 'Midnight Navy', hex: '#1e3a8a' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: 'Heavy Silk Satin Stretch Blend',
    style: 'Luxury',
    inStock: true,
    stockCount: 18,
    tags: ['trousers', 'palazzo', 'silk', 'verve'],
    features: ['Pleated front waistband', 'Floor-sweeping wide flare leg', 'Concealed side zipper'],
    specifications: {
      'Rise': 'High Rise (12.5 inches)',
      'Care': 'Dry clean'
    },
    compatibilityTags: ['top_silk_blouse', 'shoes_heels'],
    viewsCount: 2500,
    purchasesCount: 330,
    createdAt: '2026-01-22'
  },
  {
    id: 'prod-verve-7',
    title: 'Verve Luxe Pleated Metallic Accordion Midi Skirt',
    brand: 'Verve Luxe',
    category: 'Women',
    subCategory: 'Dresses & Jumpsuits',
    gender: 'Women',
    price: 2299,
    originalPrice: 4299,
    discountPercent: 46,
    rating: 4.7,
    reviewCount: 190,
    images: [
      'https://images.unsplash.com/photo-1582418702059-97ebdfb35d09?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Liquid Bronze Gold', hex: '#ca8a04' },
      { name: 'Silver Shimmer', hex: '#e5e7eb' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: 'Metallic Foil Knitted Lurex',
    style: 'Luxury',
    inStock: true,
    stockCount: 22,
    tags: ['skirt', 'pleated', 'metallic', 'verve'],
    features: ['Elasticated satin waistband', 'Permanent heat-set accordion pleats', 'Shimmer movement'],
    specifications: {
      'Length': 'Midi Length',
      'Care': 'Hand wash cold delicate'
    },
    compatibilityTags: ['top_blazer', 'shoes_stiletto_heels'],
    viewsCount: 3100,
    purchasesCount: 410,
    createdAt: '2026-01-18'
  },
  {
    id: 'prod-verve-8',
    title: 'Verve Luxe Tuxedo Blazer Dress',
    brand: 'Verve Luxe',
    category: 'Women',
    subCategory: 'Dresses & Jumpsuits',
    gender: 'Women',
    price: 3699,
    originalPrice: 6999,
    discountPercent: 47,
    rating: 4.9,
    reviewCount: 175,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Satin Lapel Black', hex: '#09090b' },
      { name: 'Ivory White Tux', hex: '#ffffff' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: 'Structure Crepe with Silk Satin Lapels',
    style: 'Luxury',
    inStock: true,
    stockCount: 14,
    tags: ['blazer dress', 'tuxedo', 'party', 'verve'],
    features: ['Satin peak lapel', 'Gold embossed lion buttons', 'Fitted silhouette'],
    specifications: {
      'Length': 'Mini Length',
      'Care': 'Dry clean only'
    },
    compatibilityTags: ['shoes_pumps', 'accessory_clutch'],
    viewsCount: 3600,
    purchasesCount: 480,
    createdAt: '2026-01-26'
  },
  {
    id: 'prod-verve-9',
    title: 'Verve Luxe Off-Shoulder Corset Satin Top',
    brand: 'Verve Luxe',
    category: 'Women',
    subCategory: 'T-Shirts & Tops',
    gender: 'Women',
    price: 1899,
    originalPrice: 3499,
    discountPercent: 45,
    rating: 4.8,
    reviewCount: 130,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Rosewood Pink', hex: '#be123c' },
      { name: 'Onyx Black', hex: '#09090b' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: 'Boned Satin Bustier Crepe',
    style: 'Luxury',
    inStock: true,
    stockCount: 20,
    tags: ['corset', 'satin top', 'off shoulder', 'verve'],
    features: ['Internal flexible boning supports bust', 'Exposed metal back zip', 'Off-shoulder draped sleeves'],
    specifications: {
      'Fit': 'Form Fitting Structured',
      'Care': 'Dry clean only'
    },
    compatibilityTags: ['bottom_wide_leg_trousers', 'shoes_heels'],
    viewsCount: 2900,
    purchasesCount: 370,
    createdAt: '2026-02-03'
  },
  {
    id: 'prod-verve-10',
    title: 'Verve Luxe Asymmetrical One-Shoulder Jumpsuit',
    brand: 'Verve Luxe',
    category: 'Women',
    subCategory: 'Dresses & Jumpsuits',
    gender: 'Women',
    price: 3499,
    originalPrice: 6299,
    discountPercent: 44,
    rating: 4.8,
    reviewCount: 110,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Cobalt Blue', hex: '#1d4ed8' },
      { name: 'Jet Black', hex: '#09090b' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: 'Heavyweight Stretch Crepe',
    style: 'Luxury',
    inStock: true,
    stockCount: 16,
    tags: ['jumpsuit', 'one shoulder', 'evening', 'verve'],
    features: ['Folded one-shoulder drape', 'Tapered legs with pressed crease', 'In-seam side pockets'],
    specifications: {
      'Fit': 'Tailored Slim Fit',
      'Care': 'Dry clean'
    },
    compatibilityTags: ['shoes_heels', 'accessory_earrings'],
    viewsCount: 2600,
    purchasesCount: 310,
    createdAt: '2026-01-28'
  },
  {
    id: 'prod-verve-11',
    title: 'Verve Luxe Tweed Patterned Structured Jacket',
    brand: 'Verve Luxe',
    category: 'Women',
    subCategory: 'Jackets & Coats',
    gender: 'Women',
    price: 4299,
    originalPrice: 7999,
    discountPercent: 46,
    rating: 4.9,
    reviewCount: 140,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Monochrome Bouclé', hex: '#374151' },
      { name: 'Blush & Gold Bouclé', hex: '#f43f5e' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: 'Woven French Bouclé Tweed with Metallic Thread',
    style: 'Luxury',
    inStock: true,
    stockCount: 12,
    tags: ['tweed jacket', 'boucle', 'luxury', 'verve'],
    features: ['Custom pearl and gold crest buttons', 'Fringed edge hem detailing', 'Silk lining'],
    specifications: {
      'Fit': 'Cropped Structured',
      'Care': 'Dry clean only'
    },
    compatibilityTags: ['bottom_skirt', 'bottom_jeans', 'shoes_flats'],
    viewsCount: 3400,
    purchasesCount: 410,
    createdAt: '2026-01-14'
  },
  {
    id: 'prod-verve-12',
    title: 'Verve Luxe Satin Bias Cut Slip Skirt',
    brand: 'Verve Luxe',
    category: 'Women',
    subCategory: 'Dresses & Jumpsuits',
    gender: 'Women',
    price: 1799,
    originalPrice: 3299,
    discountPercent: 45,
    rating: 4.7,
    reviewCount: 220,
    images: [
      'https://images.unsplash.com/photo-1582418702059-97ebdfb35d09?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Olive Bronze', hex: '#657153' },
      { name: 'Champagne Beige', hex: '#fef3c7' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: 'Heavy Silk Satin Stretch',
    style: 'Luxury',
    inStock: true,
    stockCount: 30,
    tags: ['skirt', 'satin skirt', 'bias cut', 'verve'],
    features: ['Concealed elastic waistband', 'Drapes fluidly around hips', 'Mid-calf length'],
    specifications: {
      'Length': 'Midi Length',
      'Care': 'Hand wash cold'
    },
    compatibilityTags: ['top_sweater', 'shoes_boots', 'shoes_heels'],
    viewsCount: 2800,
    purchasesCount: 390,
    createdAt: '2026-01-08'
  },
  {
    id: 'prod-verve-13',
    title: 'Verve Luxe Sheer Lace Detail Cocktail Mini Dress',
    brand: 'Verve Luxe',
    category: 'Women',
    subCategory: 'Dresses & Jumpsuits',
    gender: 'Women',
    price: 2899,
    originalPrice: 5499,
    discountPercent: 47,
    rating: 4.8,
    reviewCount: 160,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Gothic Noir Black', hex: '#09090b' },
      { name: 'Deep Burgundy', hex: '#881337' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: 'Eyelash Chantilly Lace over Nude Bodice Lining',
    style: 'Luxury',
    inStock: true,
    stockCount: 15,
    tags: ['cocktail dress', 'lace', 'mini dress', 'verve'],
    features: ['High illusion lace neckline', 'Long sheer sleeves', 'Back neck keyhole closure'],
    specifications: {
      'Length': 'Mini (Above Knee)',
      'Care': 'Dry clean only'
    },
    compatibilityTags: ['shoes_heels', 'accessory_earrings'],
    viewsCount: 3200,
    purchasesCount: 420,
    createdAt: '2026-01-30'
  },
  {
    id: 'prod-verve-14',
    title: 'Verve Luxe Wool Crepe Cigarette Trousers',
    brand: 'Verve Luxe',
    category: 'Women',
    subCategory: 'Trousers & Chinos',
    gender: 'Women',
    price: 2499,
    originalPrice: 4499,
    discountPercent: 44,
    rating: 4.7,
    reviewCount: 180,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Formal Black', hex: '#09090b' },
      { name: 'Camel Tan', hex: '#b45309' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    material: 'Stretch Wool Crepe',
    style: 'Formal',
    inStock: true,
    stockCount: 25,
    tags: ['trousers', 'cigarette pants', 'formal', 'verve'],
    features: ['Ankle grazing length', 'Front center pressed seam crease', 'Side slash pockets'],
    specifications: {
      'Fit': 'Slim Tailored Fit',
      'Care': 'Dry clean recommended'
    },
    compatibilityTags: ['top_blazer', 'shoes_pumps'],
    viewsCount: 2600,
    purchasesCount: 340,
    createdAt: '2026-01-16'
  },
  {
    id: 'prod-verve-15',
    title: 'Verve Luxe Draped Satin Cowl Neck Halter Top',
    brand: 'Verve Luxe',
    category: 'Women',
    subCategory: 'T-Shirts & Tops',
    gender: 'Women',
    price: 1599,
    originalPrice: 2999,
    discountPercent: 46,
    rating: 4.8,
    reviewCount: 115,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Liquid Gold', hex: '#eab308' },
      { name: 'Onyx Black', hex: '#09090b' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: '100% Heavy Satin Viscose',
    style: 'Luxury',
    inStock: true,
    stockCount: 20,
    tags: ['halter top', 'cowl neck', 'satin', 'verve'],
    features: ['High halter tie neck', 'Low back cut', 'Draped cowl front'],
    specifications: {
      'Fit': 'Relaxed Draped',
      'Care': 'Hand wash cold'
    },
    compatibilityTags: ['bottom_palazzo', 'shoes_heels'],
    viewsCount: 2300,
    purchasesCount: 310,
    createdAt: '2026-02-02'
  },
  {
    id: 'prod-verve-16',
    title: 'Verve Luxe Faux Fur Trimmed Wool Cape',
    brand: 'Verve Luxe',
    category: 'Women',
    subCategory: 'Jackets & Coats',
    gender: 'Women',
    price: 4999,
    originalPrice: 8999,
    discountPercent: 44,
    rating: 4.9,
    reviewCount: 95,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Winter Ivory', hex: '#ffffff' },
      { name: 'Midnight Black', hex: '#09090b' }
    ],
    sizes: ['Free Size'],
    material: 'Melton Wool Blend with Plush Faux Fox Fur Collar',
    style: 'Luxury',
    inStock: true,
    stockCount: 10,
    tags: ['cape', 'fur outerwear', 'winter', 'verve'],
    features: ['Detachable faux fur collar', 'Arm slit openings', 'Front hook and eye fastening'],
    specifications: {
      'Care': 'Specialist dry clean'
    },
    compatibilityTags: ['shoes_boots', 'accessory_gloves'],
    viewsCount: 2900,
    purchasesCount: 360,
    createdAt: '2026-01-24'
  },
  {
    id: 'prod-verve-17',
    title: 'Verve Luxe Sequined Plunge Neck Party Dress',
    brand: 'Verve Luxe',
    category: 'Women',
    subCategory: 'Dresses & Jumpsuits',
    gender: 'Women',
    price: 3899,
    originalPrice: 6999,
    discountPercent: 44,
    rating: 4.8,
    reviewCount: 210,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Midnight Emerald', hex: '#065f46' },
      { name: 'Champagne Sparkle', hex: '#fde047' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: 'Micro Sequin Mesh with Soft Stretch Jersey Lining',
    style: 'Luxury',
    inStock: true,
    stockCount: 14,
    tags: ['sequin dress', 'party dress', 'plunge neck', 'verve'],
    features: ['All-over hand stitched sequins', 'Plunging V-neckline', 'Long sleeves'],
    specifications: {
      'Length': 'Mini Length',
      'Care': 'Dry clean only'
    },
    compatibilityTags: ['shoes_heels', 'accessory_clutch'],
    viewsCount: 3800,
    purchasesCount: 520,
    createdAt: '2026-01-05'
  },
  {
    id: 'prod-verve-18',
    title: 'Verve Luxe High-Neck Pleated Chiffon Blouse',
    brand: 'Verve Luxe',
    category: 'Women',
    subCategory: 'T-Shirts & Tops',
    gender: 'Women',
    price: 1999,
    originalPrice: 3599,
    discountPercent: 44,
    rating: 4.7,
    reviewCount: 125,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Dusty Lavender', hex: '#c084fc' },
      { name: 'Off White', hex: '#f8fafc' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: 'Sheer Crinkle Chiffon with Camisole Lining',
    style: 'Formal',
    inStock: true,
    stockCount: 22,
    tags: ['blouse', 'chiffon', 'pleated top', 'verve'],
    features: ['Victorian pleated high neck collar', 'Puff sleeves with elastic cuffs', 'Keyhole back button'],
    specifications: {
      'Fit': 'Loose Draped',
      'Care': 'Hand wash cold'
    },
    compatibilityTags: ['bottom_pencil_skirt', 'shoes_heels'],
    viewsCount: 2100,
    purchasesCount: 290,
    createdAt: '2026-01-19'
  },
  {
    id: 'prod-verve-19',
    title: 'Verve Luxe Tailored Suit Vest Waistcoat',
    brand: 'Verve Luxe',
    category: 'Women',
    subCategory: 'Jackets & Coats',
    gender: 'Women',
    price: 1899,
    originalPrice: 3299,
    discountPercent: 42,
    rating: 4.8,
    reviewCount: 140,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Camel Tan', hex: '#b45309' },
      { name: 'Charcoal Black', hex: '#18181b' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: 'Suiting Twill Blend with Satin Backing',
    style: 'Formal',
    inStock: true,
    stockCount: 25,
    tags: ['waistcoat', 'vest', 'suiting', 'verve'],
    features: ['V-neck button front closure', 'Adjustable satin back slider strap', 'Welt faux pockets'],
    specifications: {
      'Fit': 'Cropped Fitted',
      'Care': 'Dry clean'
    },
    compatibilityTags: ['bottom_trouser', 'shoes_loafers'],
    viewsCount: 2500,
    purchasesCount: 360,
    createdAt: '2026-01-21'
  },
  {
    id: 'prod-verve-20',
    title: 'Verve Luxe Satin Wrap Kimono Robe Gown',
    brand: 'Verve Luxe',
    category: 'Women',
    subCategory: 'Dresses & Jumpsuits',
    gender: 'Women',
    price: 3199,
    originalPrice: 5999,
    discountPercent: 46,
    rating: 4.9,
    reviewCount: 165,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#fde047' },
      { name: 'Midnight Navy', hex: '#1e3a8a' }
    ],
    sizes: ['S/M', 'L/XL'],
    material: '100% Pure Silk Satin',
    style: 'Luxury',
    inStock: true,
    stockCount: 12,
    tags: ['robe', 'kimono gown', 'silk', 'verve'],
    features: ['Wide kimono sleeves with lace border trim', 'Matching wide waist sash', 'Internal tie fastening'],
    specifications: {
      'Length': 'Maxi Length',
      'Care': 'Hand wash cold'
    },
    compatibilityTags: ['shoes_slippers'],
    viewsCount: 3000,
    purchasesCount: 410,
    createdAt: '2026-02-04'
  }
];
