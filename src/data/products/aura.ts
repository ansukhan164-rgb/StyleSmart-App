import { Product } from '../../types';

export const auraProducts: Product[] = [
  {
    id: 'prod-aura-1',
    title: 'AURA Oversized Heavyweight Cotton Hoodie',
    brand: 'AURA Studio',
    category: 'Men',
    subCategory: 'Hoodies & Sweatshirts',
    gender: 'Men',
    price: 1899,
    originalPrice: 3499,
    discountPercent: 45,
    rating: 4.8,
    reviewCount: 342,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#18181b' },
      { name: 'Sage Green', hex: '#657153' },
      { name: 'Slate Gray', hex: '#475569' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    material: '450 GSM French Terry Cotton',
    style: 'Streetwear',
    inStock: true,
    stockCount: 45,
    isNewArrival: true,
    isBestSeller: true,
    tags: ['oversized', 'streetwear', 'hoodie', 'winter', 'black', 'aura'],
    features: ['Double-stitched drop shoulder', 'Kangaroo pocket', 'Pre-shrunk organic fabric'],
    specifications: {
      'Fit': 'Oversized Boxy Fit',
      'Sleeve': 'Long Sleeve with Ribbed Cuffs',
      'Care': 'Machine wash cold inside out'
    },
    compatibilityTags: ['bottom_cargo', 'shoes_high_top', 'accessory_cap'],
    viewsCount: 2890,
    purchasesCount: 420,
    createdAt: '2026-01-15'
  },
  {
    id: 'prod-aura-2',
    title: 'AURA Geometric Acetate Polarized Sunglasses',
    brand: 'AURA Studio',
    category: 'Accessories',
    subCategory: 'Sunglasses',
    gender: 'Unisex',
    price: 1299,
    originalPrice: 2499,
    discountPercent: 48,
    rating: 4.6,
    reviewCount: 156,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Tortoiseshell Amber', hex: '#78350f' },
      { name: 'Pitch Black', hex: '#09090b' }
    ],
    sizes: ['Medium'],
    material: 'Hand-Cut Italian Acetate',
    style: 'Boho',
    inStock: true,
    stockCount: 40,
    tags: ['sunglasses', 'polarized', 'eyewear', 'summer', 'aura'],
    features: ['UV400 100% Protection', 'Anti-glare TAC polarized lenses', 'Reinforced 5-barrel hinges'],
    specifications: {
      'Lens Category': 'Category 3 Polarized',
      'Includes': 'Hard leather case + microfiber cloth'
    },
    compatibilityTags: ['top_linen_shirt', 'top_summer_dress'],
    viewsCount: 1400,
    purchasesCount: 210,
    createdAt: '2026-02-02'
  },
  {
    id: 'prod-aura-3',
    title: 'AURA Tailored Double-Breasted Wool Coat',
    brand: 'AURA Studio',
    category: 'Men',
    subCategory: 'Jackets & Coats',
    gender: 'Men',
    price: 4599,
    originalPrice: 8999,
    discountPercent: 48,
    rating: 4.9,
    reviewCount: 128,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Camel Tan', hex: '#b45309' },
      { name: 'Charcoal Black', hex: '#18181b' }
    ],
    sizes: ['M', 'L', 'XL'],
    material: '70% Australian Merino Wool Blend',
    style: 'Formal',
    inStock: true,
    stockCount: 18,
    isBestSeller: true,
    tags: ['coat', 'wool', 'tailored', 'winter', 'luxury', 'aura'],
    features: ['Peak lapel collar', 'Satin lining', 'Deep welt hand pockets'],
    specifications: {
      'Fit': 'Structured Slim Fit',
      'Care': 'Professional dry clean only'
    },
    compatibilityTags: ['top_turtleneck', 'shoes_chelsea_boots'],
    viewsCount: 3200,
    purchasesCount: 390,
    createdAt: '2026-01-20'
  },
  {
    id: 'prod-aura-4',
    title: 'AURA Relaxed Fit Tapered Chino Trousers',
    brand: 'AURA Studio',
    category: 'Men',
    subCategory: 'Trousers & Chinos',
    gender: 'Men',
    price: 1999,
    originalPrice: 3499,
    discountPercent: 42,
    rating: 4.7,
    reviewCount: 210,
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Stone Beige', hex: '#d1d5db' },
      { name: 'Navy Blue', hex: '#1e3a8a' }
    ],
    sizes: ['30', '32', '34', '36'],
    material: '98% Organic Cotton, 2% Elastane',
    style: 'Casual',
    inStock: true,
    stockCount: 35,
    tags: ['chinos', 'trousers', 'casual', 'aura', 'cotton'],
    features: ['Flex stretch waistband', 'Back welt pockets', 'Pre-washed for extra softness'],
    specifications: {
      'Fit': 'Relaxed Tapered',
      'Care': 'Machine wash cold'
    },
    compatibilityTags: ['top_polo', 'shoes_loafers'],
    viewsCount: 1900,
    purchasesCount: 280,
    createdAt: '2026-01-18'
  },
  {
    id: 'prod-aura-5',
    title: 'AURA Minimalist Puffer Jacket',
    brand: 'AURA Studio',
    category: 'Men',
    subCategory: 'Jackets & Coats',
    gender: 'Men',
    price: 3299,
    originalPrice: 5999,
    discountPercent: 45,
    rating: 4.8,
    reviewCount: 185,
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Matte Black', hex: '#09090b' },
      { name: 'Ice Grey', hex: '#9ca3af' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: 'Waterproof Nylon with Synthetic Down Insulation',
    style: 'Streetwear',
    inStock: true,
    stockCount: 25,
    isNewArrival: true,
    tags: ['puffer', 'jacket', 'winter', 'warm', 'aura'],
    features: ['High funnel neck collar', 'Internal phone pocket', 'Fleece-lined pockets'],
    specifications: {
      'Warmth Index': 'High (-5°C)',
      'Care': 'Hand wash recommended'
    },
    compatibilityTags: ['bottom_jeans', 'shoes_sneakers'],
    viewsCount: 2400,
    purchasesCount: 310,
    createdAt: '2026-02-01'
  },
  {
    id: 'prod-aura-6',
    title: 'AURA Ribbed Merino Wool Crewneck Sweater',
    brand: 'AURA Studio',
    category: 'Men',
    subCategory: 'Hoodies & Sweatshirts',
    gender: 'Men',
    price: 2299,
    originalPrice: 3999,
    discountPercent: 42,
    rating: 4.7,
    reviewCount: 94,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Oatmeal Beige', hex: '#e5e7eb' },
      { name: 'Forest Green', hex: '#14532d' }
    ],
    sizes: ['M', 'L', 'XL'],
    material: '100% Australian Merino Wool',
    style: 'Minimalist',
    inStock: true,
    stockCount: 20,
    tags: ['sweater', 'merino wool', 'knitwear', 'aura'],
    features: ['Non-itchy fine gauge knit', 'Ribbed cuffs and collar', 'Thermoregulating fiber'],
    specifications: {
      'Fit': 'Regular Fit',
      'Care': 'Hand wash in cold water'
    },
    compatibilityTags: ['bottom_chinos', 'shoes_oxford'],
    viewsCount: 1600,
    purchasesCount: 190,
    createdAt: '2026-01-22'
  },
  {
    id: 'prod-aura-7',
    title: 'AURA Boxy Fit Heavyweight Graphic Tee',
    brand: 'AURA Studio',
    category: 'Men',
    subCategory: 'T-Shirts & Tops',
    gender: 'Men',
    price: 1199,
    originalPrice: 1999,
    discountPercent: 40,
    rating: 4.8,
    reviewCount: 290,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Off-White', hex: '#fafafa' },
      { name: 'Washed Black', hex: '#27272a' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '260 GSM Heavyweight Organic Cotton',
    style: 'Streetwear',
    inStock: true,
    stockCount: 50,
    tags: ['tshirt', 'graphic', 'streetwear', 'aura'],
    features: ['High-density typography print', 'Reinforced collar band', 'Dropped shoulders'],
    specifications: {
      'Fit': 'Boxy Oversized',
      'Care': 'Machine wash cold inside out'
    },
    compatibilityTags: ['bottom_cargo', 'shoes_sneakers'],
    viewsCount: 3100,
    purchasesCount: 480,
    createdAt: '2026-01-10'
  },
  {
    id: 'prod-aura-8',
    title: 'AURA Structure Trench Coat with Belt',
    brand: 'AURA Studio',
    category: 'Women',
    subCategory: 'Jackets & Coats',
    gender: 'Women',
    price: 4999,
    originalPrice: 8999,
    discountPercent: 44,
    rating: 4.9,
    reviewCount: 160,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Classic Khaki', hex: '#d4b185' },
      { name: 'Jet Black', hex: '#09090b' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: 'Water-Repellent Cotton Gabardine',
    style: 'Luxury',
    inStock: true,
    stockCount: 14,
    isBestSeller: true,
    tags: ['trench coat', 'women', 'classic', 'outerwear', 'aura'],
    features: ['Double-breasted front button fastening', 'Adjustable waist belt', 'Storm flap on back'],
    specifications: {
      'Length': 'Long (Below Knee)',
      'Care': 'Dry clean only'
    },
    compatibilityTags: ['bottom_trouser', 'shoes_heels'],
    viewsCount: 2700,
    purchasesCount: 310,
    createdAt: '2026-01-28'
  },
  {
    id: 'prod-aura-9',
    title: 'AURA Minimal Silk Satin Camisole Top',
    brand: 'AURA Studio',
    category: 'Women',
    subCategory: 'T-Shirts & Tops',
    gender: 'Women',
    price: 1499,
    originalPrice: 2799,
    discountPercent: 46,
    rating: 4.7,
    reviewCount: 110,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#fde047' },
      { name: 'Midnight Black', hex: '#09090b' }
    ],
    sizes: ['S', 'M', 'L'],
    material: '100% Silk Satin',
    style: 'Luxury',
    inStock: true,
    stockCount: 22,
    tags: ['top', 'silk', 'camisole', 'women', 'aura'],
    features: ['Adjustable spaghetti straps', 'Cowls neckline', 'Smooth Bias cut'],
    specifications: {
      'Fit': 'Regular Fit',
      'Care': 'Hand wash cold or dry clean'
    },
    compatibilityTags: ['bottom_blazer', 'shoes_heels'],
    viewsCount: 1800,
    purchasesCount: 220,
    createdAt: '2026-02-03'
  },
  {
    id: 'prod-aura-10',
    title: 'AURA High-Waisted Wide Leg Tailored Trousers',
    brand: 'AURA Studio',
    category: 'Women',
    subCategory: 'Trousers & Chinos',
    gender: 'Women',
    price: 2399,
    originalPrice: 4299,
    discountPercent: 44,
    rating: 4.8,
    reviewCount: 245,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Charcoal Grey', hex: '#374151' },
      { name: 'Cream Ivory', hex: '#fef3c7' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    material: 'Poly-Viscose Stretch Crepe',
    style: 'Formal',
    inStock: true,
    stockCount: 30,
    isBestSeller: true,
    tags: ['trousers', 'wide leg', 'tailored', 'women', 'aura'],
    features: ['Front pleats for elongated silhouette', 'Hidden side zip fastening', 'Belt loops'],
    specifications: {
      'Rise': 'High Rise (12 inches)',
      'Care': 'Machine wash cold on gentle cycle'
    },
    compatibilityTags: ['top_blazer', 'top_camisole', 'shoes_pumps'],
    viewsCount: 3500,
    purchasesCount: 510,
    createdAt: '2026-01-14'
  },
  {
    id: 'prod-aura-11',
    title: 'AURA Utility Pocket Canvas Crossbody Bag',
    brand: 'AURA Studio',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Unisex',
    price: 1599,
    originalPrice: 2999,
    discountPercent: 46,
    rating: 4.6,
    reviewCount: 132,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Olive Green', hex: '#3f6212' },
      { name: 'Stealth Black', hex: '#18181b' }
    ],
    sizes: ['One Size'],
    material: '16oz Heavyweight Canvas & YKK Zippers',
    style: 'Streetwear',
    inStock: true,
    stockCount: 40,
    tags: ['bag', 'crossbody', 'canvas', 'utility', 'aura'],
    features: ['3 Zippered compartments', 'Adjustable seatbelt webbing strap', 'Key leash hook inside'],
    specifications: {
      'Capacity': '4 Liters',
      'Dimensions': '24cm x 16cm x 8cm'
    },
    compatibilityTags: ['top_hoodie', 'bottom_cargo'],
    viewsCount: 1700,
    purchasesCount: 230,
    createdAt: '2026-01-25'
  },
  {
    id: 'prod-aura-12',
    title: 'AURA Textured Knit Cardigan Sweater',
    brand: 'AURA Studio',
    category: 'Men',
    subCategory: 'Hoodies & Sweatshirts',
    gender: 'Men',
    price: 2499,
    originalPrice: 4499,
    discountPercent: 44,
    rating: 4.7,
    reviewCount: 98,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Taupe Brown', hex: '#78350f' },
      { name: 'Charcoal Black', hex: '#18181b' }
    ],
    sizes: ['M', 'L', 'XL'],
    material: 'Cotton Wool Blend Chunk Knit',
    style: 'Casual',
    inStock: true,
    stockCount: 18,
    tags: ['cardigan', 'knitwear', 'casual', 'aura'],
    features: ['V-neck collar with tortoiseshell buttons', 'Front slip pockets', 'Soft brushed finish'],
    specifications: {
      'Fit': 'Relaxed Fit',
      'Care': 'Hand wash only'
    },
    compatibilityTags: ['top_tee', 'bottom_jeans'],
    viewsCount: 1500,
    purchasesCount: 180,
    createdAt: '2026-01-30'
  },
  {
    id: 'prod-aura-13',
    title: 'AURA Embossed Leather Minimalist Belt',
    brand: 'AURA Studio',
    category: 'Accessories',
    subCategory: 'Watches',
    gender: 'Men',
    price: 999,
    originalPrice: 1899,
    discountPercent: 47,
    rating: 4.8,
    reviewCount: 175,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Espresso Brown', hex: '#451a03' },
      { name: 'Onyx Black', hex: '#09090b' }
    ],
    sizes: ['32', '34', '36', '38'],
    material: '100% Genuine Full-Grain Leather',
    style: 'Minimalist',
    inStock: true,
    stockCount: 45,
    tags: ['belt', 'leather', 'accessories', 'aura'],
    features: ['Matte brushed gunmetal buckle', 'Debossed brand logo detail', 'Durable edge coating'],
    specifications: {
      'Width': '35mm',
      'Material': 'Full Grain Leather'
    },
    compatibilityTags: ['bottom_chinos', 'bottom_trousers'],
    viewsCount: 1400,
    purchasesCount: 260,
    createdAt: '2026-01-08'
  },
  {
    id: 'prod-aura-14',
    title: 'AURA Oversized Oxford Cotton Button-Down Shirt',
    brand: 'AURA Studio',
    category: 'Men',
    subCategory: 'Shirts',
    gender: 'Men',
    price: 1799,
    originalPrice: 3299,
    discountPercent: 45,
    rating: 4.7,
    reviewCount: 210,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Sky Blue', hex: '#0284c7' },
      { name: 'Crisp White', hex: '#ffffff' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '100% Premium Oxford Weave Cotton',
    style: 'Casual',
    inStock: true,
    stockCount: 32,
    tags: ['shirt', 'oxford', 'button down', 'aura'],
    features: ['Button-down collar points', 'Single chest patch pocket', 'Curved hemline'],
    specifications: {
      'Fit': 'Oversized Relaxed',
      'Care': 'Machine wash warm, iron medium'
    },
    compatibilityTags: ['bottom_chinos', 'shoes_sneakers'],
    viewsCount: 2200,
    purchasesCount: 340,
    createdAt: '2026-01-16'
  },
  {
    id: 'prod-aura-15',
    title: 'AURA Pleated Midi Shirt Dress',
    brand: 'AURA Studio',
    category: 'Women',
    subCategory: 'Dresses & Jumpsuits',
    gender: 'Women',
    price: 2999,
    originalPrice: 5499,
    discountPercent: 45,
    rating: 4.8,
    reviewCount: 140,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Olive Green', hex: '#4d7c0f' },
      { name: 'Midnight Navy', hex: '#1e3a8a' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: 'Poplin Cotton Stretch',
    style: 'Casual',
    inStock: true,
    stockCount: 20,
    tags: ['dress', 'midi', 'shirt dress', 'women', 'aura'],
    features: ['Fabric belt tie at waist', 'Full-length front button closure', 'In-seam side pockets'],
    specifications: {
      'Length': 'Midi Length',
      'Care': 'Machine wash cold'
    },
    compatibilityTags: ['shoes_sandals', 'accessory_bag'],
    viewsCount: 2100,
    purchasesCount: 280,
    createdAt: '2026-01-26'
  },
  {
    id: 'prod-aura-16',
    title: 'AURA Fleece-Lined Track Jogger Pants',
    brand: 'AURA Studio',
    category: 'Men',
    subCategory: 'Trousers & Chinos',
    gender: 'Men',
    price: 1699,
    originalPrice: 2999,
    discountPercent: 43,
    rating: 4.6,
    reviewCount: 220,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Heather Charcoal', hex: '#4b5563' },
      { name: 'Deep Black', hex: '#09090b' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '380 GSM Fleece Cotton Poly Blend',
    style: 'Activewear',
    inStock: true,
    stockCount: 40,
    tags: ['joggers', 'sweatpants', 'fleece', 'aura'],
    features: ['Elasticated cuff ankles', 'Deep zipped side pockets', 'Drawstring waistband'],
    specifications: {
      'Fit': 'Tapered Athleisure Fit',
      'Care': 'Machine wash cold'
    },
    compatibilityTags: ['top_hoodie', 'shoes_sneakers'],
    viewsCount: 2500,
    purchasesCount: 390,
    createdAt: '2026-01-12'
  },
  {
    id: 'prod-aura-17',
    title: 'AURA Textured Cotton Bucket Hat',
    brand: 'AURA Studio',
    category: 'Accessories',
    subCategory: 'Sunglasses',
    gender: 'Unisex',
    price: 799,
    originalPrice: 1499,
    discountPercent: 46,
    rating: 4.5,
    reviewCount: 88,
    images: [
      'https://images.unsplash.com/photo-1521369984125-65d26b0463b4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Stone Khaki', hex: '#d6c0b3' },
      { name: 'Washed Black', hex: '#27272a' }
    ],
    sizes: ['S/M', 'L/XL'],
    material: '100% Heavy Twill Cotton',
    style: 'Streetwear',
    inStock: true,
    stockCount: 50,
    tags: ['hat', 'bucket hat', 'streetwear', 'aura'],
    features: ['Wide sun brim', 'Embroidered tone-on-tone logo', 'Packable foldable design'],
    specifications: {
      'Brim Width': '6.5cm',
      'Care': 'Hand wash only'
    },
    compatibilityTags: ['top_oversized_tee', 'bottom_cargo'],
    viewsCount: 1300,
    purchasesCount: 190,
    createdAt: '2026-02-04'
  },
  {
    id: 'prod-aura-18',
    title: 'AURA Slim-Fit Stretch Denim Jacket',
    brand: 'AURA Studio',
    category: 'Men',
    subCategory: 'Jackets & Coats',
    gender: 'Men',
    price: 2799,
    originalPrice: 4999,
    discountPercent: 44,
    rating: 4.8,
    reviewCount: 165,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Vintage Washed Blue', hex: '#3b82f6' },
      { name: 'Raw Black', hex: '#18181b' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '13.5 oz Denim with 2% Elastane',
    style: 'Casual',
    inStock: true,
    stockCount: 22,
    tags: ['denim jacket', 'jacket', 'casual', 'aura'],
    features: ['Branded metal shank buttons', 'Dual chest button flap pockets', 'Side welt hand pockets'],
    specifications: {
      'Fit': 'Slim Structured Fit',
      'Care': 'Wash cold inside out to prevent fading'
    },
    compatibilityTags: ['top_tee', 'bottom_chinos', 'shoes_sneakers'],
    viewsCount: 2300,
    purchasesCount: 310,
    createdAt: '2026-01-22'
  },
  {
    id: 'prod-aura-19',
    title: 'AURA Seamless Crop Top Tank',
    brand: 'AURA Studio',
    category: 'Women',
    subCategory: 'T-Shirts & Tops',
    gender: 'Women',
    price: 899,
    originalPrice: 1599,
    discountPercent: 43,
    rating: 4.7,
    reviewCount: 190,
    images: [
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Dusty Nude', hex: '#d4a373' },
      { name: 'Charcoal Black', hex: '#18181b' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: 'Ribbed Seamless Microfiber Spandex',
    style: 'Casual',
    inStock: true,
    stockCount: 35,
    tags: ['crop top', 'tank top', 'seamless', 'aura'],
    features: ['4-Way stretch compression knit', 'Racerback shoulder straps', 'Built-in double fabric layer'],
    specifications: {
      'Fit': 'Form Fitting Crop',
      'Care': 'Machine wash cold'
    },
    compatibilityTags: ['bottom_wide_leg_jeans', 'shoes_sneakers'],
    viewsCount: 2900,
    purchasesCount: 420,
    createdAt: '2026-01-19'
  },
  {
    id: 'prod-aura-20',
    title: 'AURA Quilted Utility Vest Outerwear',
    brand: 'AURA Studio',
    category: 'Men',
    subCategory: 'Jackets & Coats',
    gender: 'Men',
    price: 2199,
    originalPrice: 3999,
    discountPercent: 45,
    rating: 4.7,
    reviewCount: 115,
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Military Olive', hex: '#3f6212' },
      { name: 'Matte Black', hex: '#09090b' }
    ],
    sizes: ['M', 'L', 'XL'],
    material: 'Ripstop Polyester with Thermal Padding',
    style: 'Streetwear',
    inStock: true,
    stockCount: 20,
    tags: ['vest', 'gilet', 'quilted', 'utility', 'aura'],
    features: ['Full front zipper closure', 'Dual cargo chest pockets', 'Windproof outer shell'],
    specifications: {
      'Fit': 'Layering Fit',
      'Care': 'Machine wash cold'
    },
    compatibilityTags: ['top_hoodie', 'bottom_cargo'],
    viewsCount: 1900,
    purchasesCount: 250,
    createdAt: '2026-02-05'
  }
];
