import { Product } from '../../types';

export const kuroProducts: Product[] = [
  {
    id: 'prod-kuro-1',
    title: 'Kuro Utility Multi-Pocket Cargo Trousers',
    brand: 'Kuro Streetwear',
    category: 'Men',
    subCategory: 'Trousers & Chinos',
    gender: 'Men',
    price: 2499,
    originalPrice: 4299,
    discountPercent: 41,
    rating: 4.7,
    reviewCount: 215,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Tactical Olive', hex: '#4b5320' },
      { name: 'Onyx Black', hex: '#18181b' },
      { name: 'Khaki Beige', hex: '#c2b280' }
    ],
    sizes: ['28', '30', '32', '34', '36'],
    material: 'Durable Ripstop Cotton Blend',
    style: 'Streetwear',
    inStock: true,
    stockCount: 28,
    isBestSeller: true,
    tags: ['cargo', 'utility', 'pants', 'streetwear', 'olive', 'kuro'],
    features: ['8 Functional pockets', 'Adjustable drawstring ankle hems', 'Elastic waistband with belt loops'],
    specifications: {
      'Fit': 'Relaxed Tapered Fit',
      'Closure': 'Zipper Fly & Button',
      'Care': 'Machine wash with dark colors'
    },
    compatibilityTags: ['top_oversized_hoodie', 'shoes_chunkey_sneakers'],
    viewsCount: 3100,
    purchasesCount: 380,
    createdAt: '2026-01-10'
  },
  {
    id: 'prod-kuro-2',
    title: 'Kuro Graphic Vintage Acid-Wash T-Shirt',
    brand: 'Kuro Streetwear',
    category: 'Men',
    subCategory: 'T-Shirts & Tops',
    gender: 'Men',
    price: 999,
    originalPrice: 1999,
    discountPercent: 50,
    rating: 4.6,
    reviewCount: 420,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Acid Washed Black', hex: '#27272a' },
      { name: 'Washed Charcoal', hex: '#52525b' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    material: '240 GSM Heavy Weight Combed Cotton',
    style: 'Streetwear',
    inStock: true,
    stockCount: 60,
    isLimitedDeal: true,
    dealEndsAt: '2026-08-18T23:59:59Z',
    tags: ['tshirt', 'black', 'graphic', 'oversized', 'streetwear', 'kuro'],
    features: ['High-density puff graphic screen print', 'Ribbed crewneck collar', 'Relaxed drop-shoulder silhouette'],
    specifications: {
      'Fit': 'Oversized Street Fit',
      'Care': 'Wash cold inside out'
    },
    compatibilityTags: ['bottom_cargo', 'shoes_sneakers'],
    viewsCount: 3900,
    purchasesCount: 610,
    createdAt: '2026-02-01'
  },
  {
    id: 'prod-kuro-3',
    title: 'Kuro Cyberpunk Water-Resistant Techwear Windbreaker',
    brand: 'Kuro Streetwear',
    category: 'Men',
    subCategory: 'Jackets & Coats',
    gender: 'Men',
    price: 3699,
    originalPrice: 6999,
    discountPercent: 47,
    rating: 4.9,
    reviewCount: 180,
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#09090b' },
      { name: 'Cyber Neon Green Accents', hex: '#22c55e' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '3-Layer Waterproof DWR Coated Polyester Shell',
    style: 'Streetwear',
    inStock: true,
    stockCount: 20,
    isNewArrival: true,
    tags: ['windbreaker', 'techwear', 'jacket', 'waterproof', 'kuro'],
    features: ['Taped waterproof zippers', 'Reflective Kanji graphic back print', 'Storm hood with adjustable cord locks'],
    specifications: {
      'Waterproof Rating': '10,000mm',
      'Care': 'Wipe clean or hand wash cold'
    },
    compatibilityTags: ['bottom_cargo', 'shoes_high_tops'],
    viewsCount: 4200,
    purchasesCount: 520,
    createdAt: '2026-01-25'
  },
  {
    id: 'prod-kuro-4',
    title: 'Kuro Heavyweight Distressed Denim Jacket',
    brand: 'Kuro Streetwear',
    category: 'Men',
    subCategory: 'Jackets & Coats',
    gender: 'Men',
    price: 3299,
    originalPrice: 5999,
    discountPercent: 45,
    rating: 4.8,
    reviewCount: 140,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Vintage Acid Washed', hex: '#4b5563' },
      { name: 'Pitch Black Denim', hex: '#18181b' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    material: '14 oz Heavyweight Rigid Cotton Denim',
    style: 'Streetwear',
    inStock: true,
    stockCount: 22,
    tags: ['denim jacket', 'distressed', 'streetwear', 'kuro'],
    features: ['Custom hand-abraded distressing', 'Branded gunmetal buttons', 'Relaxed drop-shoulder cut'],
    specifications: {
      'Fit': 'Oversized Boxy Fit',
      'Care': 'Machine wash cold inside out'
    },
    compatibilityTags: ['top_hoodie', 'bottom_joggers', 'shoes_sneakers'],
    viewsCount: 2800,
    purchasesCount: 360,
    createdAt: '2026-01-18'
  },
  {
    id: 'prod-kuro-5',
    title: 'Kuro Tactical Chest Rig Harness Bag',
    brand: 'Kuro Streetwear',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Unisex',
    price: 1499,
    originalPrice: 2799,
    discountPercent: 46,
    rating: 4.7,
    reviewCount: 95,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Matte Black', hex: '#09090b' }
    ],
    sizes: ['Adjustable Universal Fit'],
    material: '1000D Cordura Nylon with Heavy-Duty Buckles',
    style: 'Streetwear',
    inStock: true,
    stockCount: 30,
    tags: ['chest rig', 'harness', 'bag', 'techwear', 'kuro'],
    features: ['Quick-release tactical chest buckles', 'MOLLE webbing loops', 'Waterproof zipper pouch'],
    specifications: {
      'Dimensions': '22cm x 15cm x 5cm',
      'Weight': '280g'
    },
    compatibilityTags: ['top_oversized_tee', 'top_hoodie'],
    viewsCount: 2100,
    purchasesCount: 290,
    createdAt: '2026-02-02'
  },
  {
    id: 'prod-kuro-6',
    title: 'Kuro Oversized Fleece Kanji Zip-Up Hoodie',
    brand: 'Kuro Streetwear',
    category: 'Men',
    subCategory: 'Hoodies & Sweatshirts',
    gender: 'Men',
    price: 2699,
    originalPrice: 4899,
    discountPercent: 45,
    rating: 4.9,
    reviewCount: 230,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Shadow Black', hex: '#18181b' },
      { name: 'Glacier White', hex: '#f8fafc' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    material: '400 GSM Heavy Brushed Fleece Cotton',
    style: 'Streetwear',
    inStock: true,
    stockCount: 35,
    isBestSeller: true,
    tags: ['hoodie', 'zip up', 'kanji', 'streetwear', 'kuro'],
    features: ['Heavyweight double zipper', 'High-density sleeve embroidery', 'Deep hood profile'],
    specifications: {
      'Fit': 'Loose Oversized Fit',
      'Care': 'Machine wash cold gentle'
    },
    compatibilityTags: ['bottom_cargo', 'shoes_sneakers'],
    viewsCount: 3800,
    purchasesCount: 540,
    createdAt: '2026-01-15'
  },
  {
    id: 'prod-kuro-7',
    title: 'Kuro Japanese Streetwear Haori Kimono Jacket',
    brand: 'Kuro Streetwear',
    category: 'Men',
    subCategory: 'Jackets & Coats',
    gender: 'Unisex',
    price: 2199,
    originalPrice: 3999,
    discountPercent: 45,
    rating: 4.8,
    reviewCount: 165,
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#09090b' },
      { name: 'Crimson Red Graphic', hex: '#991b1b' }
    ],
    sizes: ['Free Size (Fits S-XXL)'],
    material: 'Lightweight Breathable Cotton-Linen Blend',
    style: 'Streetwear',
    inStock: true,
    stockCount: 18,
    tags: ['kimono', 'haori', 'streetwear', 'japanese', 'kuro'],
    features: ['Open-front tie closure', 'Wide 3/4 kimono sleeves', 'Subtle dragon back artwork'],
    specifications: {
      'Fit': 'Flowing Oversized',
      'Care': 'Hand wash cold'
    },
    compatibilityTags: ['top_tee', 'bottom_cargo', 'shoes_slides'],
    viewsCount: 2900,
    purchasesCount: 370,
    createdAt: '2026-01-20'
  },
  {
    id: 'prod-kuro-8',
    title: 'Kuro Embroidered Streetwear Bucket Hat',
    brand: 'Kuro Streetwear',
    category: 'Accessories',
    subCategory: 'Sunglasses',
    gender: 'Unisex',
    price: 899,
    originalPrice: 1699,
    discountPercent: 47,
    rating: 4.6,
    reviewCount: 110,
    images: [
      'https://images.unsplash.com/photo-1521369984125-65d26b0463b4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#09090b' },
      { name: 'Military Khaki', hex: '#78716c' }
    ],
    sizes: ['One Size'],
    material: '100% Cotton Canvas',
    style: 'Streetwear',
    inStock: true,
    stockCount: 45,
    tags: ['bucket hat', 'hat', 'streetwear', 'kuro'],
    features: ['3D embroidered Kuro emblem', 'Internal sweatband', 'Foldable construction'],
    specifications: {
      'Brim': '6.5cm',
      'Care': 'Hand wash'
    },
    compatibilityTags: ['top_graphic_tee', 'bottom_cargo'],
    viewsCount: 1600,
    purchasesCount: 220,
    createdAt: '2026-01-28'
  },
  {
    id: 'prod-kuro-9',
    title: 'Kuro Tapered Techwear Joggers with Buckles',
    brand: 'Kuro Streetwear',
    category: 'Men',
    subCategory: 'Trousers & Chinos',
    gender: 'Men',
    price: 2299,
    originalPrice: 3999,
    discountPercent: 42,
    rating: 4.7,
    reviewCount: 195,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Midnight Black', hex: '#09090b' }
    ],
    sizes: ['30', '32', '34', '36'],
    material: 'Water-Resistant Stretch Nylon Blend',
    style: 'Streetwear',
    inStock: true,
    stockCount: 25,
    tags: ['techwear', 'joggers', 'buckles', 'kuro'],
    features: ['Side hanging strap buckles', 'Ankle zipper expansion', 'Concealed security pockets'],
    specifications: {
      'Fit': 'Slim Tapered',
      'Care': 'Machine wash cold'
    },
    compatibilityTags: ['top_oversized_tee', 'shoes_high_tops'],
    viewsCount: 2700,
    purchasesCount: 380,
    createdAt: '2026-01-14'
  },
  {
    id: 'prod-kuro-10',
    title: 'Kuro Longline Curved Hem Layering Tee',
    brand: 'Kuro Streetwear',
    category: 'Men',
    subCategory: 'T-Shirts & Tops',
    gender: 'Men',
    price: 899,
    originalPrice: 1599,
    discountPercent: 44,
    rating: 4.5,
    reviewCount: 140,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Off White', hex: '#fafafa' },
      { name: 'Onyx Black', hex: '#18181b' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '200 GSM Soft Slub Cotton',
    style: 'Streetwear',
    inStock: true,
    stockCount: 50,
    tags: ['longline', 'layering tee', 'curved hem', 'kuro'],
    features: ['Extended length curved scoop hem', 'Raw edge sleeve cuffs', 'Soft pre-shrunk cotton'],
    specifications: {
      'Fit': 'Slim Longline',
      'Care': 'Machine wash cold'
    },
    compatibilityTags: ['top_hoodie', 'bottom_jeans'],
    viewsCount: 1900,
    purchasesCount: 310,
    createdAt: '2026-01-05'
  },
  {
    id: 'prod-kuro-11',
    title: 'Kuro Oversized Heavyweight Crewneck Sweatshirt',
    brand: 'Kuro Streetwear',
    category: 'Men',
    subCategory: 'Hoodies & Sweatshirts',
    gender: 'Men',
    price: 1999,
    originalPrice: 3599,
    discountPercent: 44,
    rating: 4.8,
    reviewCount: 175,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Washed Sage', hex: '#4d7c0f' },
      { name: 'Charcoal Black', hex: '#18181b' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '360 GSM Organic Fleece',
    style: 'Streetwear',
    inStock: true,
    stockCount: 30,
    tags: ['sweatshirt', 'crewneck', 'fleece', 'kuro'],
    features: ['Minimalist chest debossed logo', 'Ribbed cuffs and hem', 'Relaxed drop shoulder'],
    specifications: {
      'Fit': 'Oversized Boxy',
      'Care': 'Machine wash cold inside out'
    },
    compatibilityTags: ['bottom_cargo', 'shoes_sneakers'],
    viewsCount: 2400,
    purchasesCount: 350,
    createdAt: '2026-01-22'
  },
  {
    id: 'prod-kuro-12',
    title: 'Kuro Mesh Layered Streetwear Shorts',
    brand: 'Kuro Streetwear',
    category: 'Men',
    subCategory: 'Trousers & Chinos',
    gender: 'Men',
    price: 1399,
    originalPrice: 2499,
    discountPercent: 44,
    rating: 4.6,
    reviewCount: 115,
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Jet Black', hex: '#09090b' },
      { name: 'Monochrome Grey', hex: '#4b5563' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: 'Double-Layer Athletic Poly Mesh',
    style: 'Streetwear',
    inStock: true,
    stockCount: 40,
    tags: ['shorts', 'mesh', 'streetwear', 'kuro'],
    features: ['Drawstring elastic waist with metal aglets', 'Deep zippered pockets', 'Relaxed basketball cut'],
    specifications: {
      'Inseam': '7 Inches',
      'Care': 'Machine wash gentle'
    },
    compatibilityTags: ['top_graphic_tee', 'shoes_chunky_sneakers'],
    viewsCount: 1800,
    purchasesCount: 260,
    createdAt: '2026-02-03'
  },
  {
    id: 'prod-kuro-13',
    title: 'Kuro Water-Repellent Sling Bag',
    brand: 'Kuro Streetwear',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Unisex',
    price: 1199,
    originalPrice: 2199,
    discountPercent: 45,
    rating: 4.7,
    reviewCount: 150,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#18181b' }
    ],
    sizes: ['One Size'],
    material: '600D Waterproof Cordura Fabric',
    style: 'Streetwear',
    inStock: true,
    stockCount: 35,
    tags: ['sling bag', 'crossbody', 'waterproof', 'kuro'],
    features: ['Adjustable cross-body strap', 'Earphone cord port', 'Internal mesh divider'],
    specifications: {
      'Capacity': '2.5 Liters',
      'Dimensions': '20cm x 14cm x 6cm'
    },
    compatibilityTags: ['top_tee', 'bottom_cargo'],
    viewsCount: 2000,
    purchasesCount: 310,
    createdAt: '2026-01-16'
  },
  {
    id: 'prod-kuro-14',
    title: 'Kuro Padded Bomber Jacket with Sleeve Pocket',
    brand: 'Kuro Streetwear',
    category: 'Men',
    subCategory: 'Jackets & Coats',
    gender: 'Men',
    price: 3499,
    originalPrice: 6299,
    discountPercent: 44,
    rating: 4.8,
    reviewCount: 190,
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Sage Olive', hex: '#3f6212' },
      { name: 'Pitch Black', hex: '#09090b' }
    ],
    sizes: ['M', 'L', 'XL'],
    material: 'Satin Finish Nylon Shell with Polyfill Insulation',
    style: 'Streetwear',
    inStock: true,
    stockCount: 18,
    isBestSeller: true,
    tags: ['bomber jacket', 'ma-1', 'padded', 'kuro'],
    features: ['Classic MA-1 utility zip pocket on sleeve', 'Orange safety lining interior', 'Heavy-duty rib collar and cuffs'],
    specifications: {
      'Fit': 'Boxy Flight Jacket Fit',
      'Care': 'Dry clean recommended'
    },
    compatibilityTags: ['top_graphic_tee', 'bottom_jeans', 'shoes_sneakers'],
    viewsCount: 3200,
    purchasesCount: 430,
    createdAt: '2026-01-12'
  },
  {
    id: 'prod-kuro-15',
    title: 'Kuro Distressed Raw Hem Cargo Skirt',
    brand: 'Kuro Streetwear',
    category: 'Women',
    subCategory: 'Dresses & Jumpsuits',
    gender: 'Women',
    price: 1899,
    originalPrice: 3299,
    discountPercent: 42,
    rating: 4.6,
    reviewCount: 85,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Khaki Beige', hex: '#d4b185' },
      { name: 'Onyx Black', hex: '#18181b' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: '100% Cotton Canvas Twill',
    style: 'Streetwear',
    inStock: true,
    stockCount: 22,
    tags: ['skirt', 'cargo skirt', 'women', 'kuro'],
    features: ['Side flap utility pockets', 'High waist fit with belt loops', 'Frayed bottom hem'],
    specifications: {
      'Length': 'Mini Length',
      'Care': 'Machine wash cold'
    },
    compatibilityTags: ['top_crop_top', 'shoes_boots'],
    viewsCount: 1700,
    purchasesCount: 210,
    createdAt: '2026-01-29'
  },
  {
    id: 'prod-kuro-16',
    title: 'Kuro Cyberpunk Face Mask Bandana',
    brand: 'Kuro Streetwear',
    category: 'Accessories',
    subCategory: 'Sunglasses',
    gender: 'Unisex',
    price: 499,
    originalPrice: 999,
    discountPercent: 50,
    rating: 4.5,
    reviewCount: 210,
    images: [
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1521369984125-65d26b0463b4?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Black Kanji Print', hex: '#09090b' }
    ],
    sizes: ['One Size'],
    material: 'Breathable Moisture-Wicking Seamless Polyester',
    style: 'Streetwear',
    inStock: true,
    stockCount: 80,
    tags: ['mask', 'bandana', 'cyberpunk', 'kuro'],
    features: ['UV protection stretch fabric', 'Dust-proof multi-wear style', 'Washable reusable design'],
    specifications: {
      'Wear Options': 'Mask, Neck gaiter, Headband'
    },
    compatibilityTags: ['top_hoodie'],
    viewsCount: 1500,
    purchasesCount: 380,
    createdAt: '2026-01-02'
  },
  {
    id: 'prod-kuro-17',
    title: 'Kuro Oversized Thermal Long Sleeve Tee',
    brand: 'Kuro Streetwear',
    category: 'Men',
    subCategory: 'T-Shirts & Tops',
    gender: 'Men',
    price: 1299,
    originalPrice: 2299,
    discountPercent: 43,
    rating: 4.7,
    reviewCount: 130,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Washed Slate', hex: '#475569' },
      { name: 'Pitch Black', hex: '#09090b' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '280 GSM Waffle Knit Thermal Cotton',
    style: 'Streetwear',
    inStock: true,
    stockCount: 32,
    tags: ['thermal', 'long sleeve', 'waffle knit', 'kuro'],
    features: ['Ribbed cuffs and crew neck', 'Thumbholes on sleeve cuffs', 'Heavier weight fabric structure'],
    specifications: {
      'Fit': 'Oversized Boxy',
      'Care': 'Machine wash cold'
    },
    compatibilityTags: ['bottom_cargo', 'shoes_sneakers'],
    viewsCount: 1800,
    purchasesCount: 260,
    createdAt: '2026-01-21'
  },
  {
    id: 'prod-kuro-18',
    title: 'Kuro Techwear Ankle Strap combat Trousers',
    brand: 'Kuro Streetwear',
    category: 'Men',
    subCategory: 'Trousers & Chinos',
    gender: 'Men',
    price: 2599,
    originalPrice: 4599,
    discountPercent: 43,
    rating: 4.8,
    reviewCount: 170,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Tactical Black', hex: '#09090b' }
    ],
    sizes: ['30', '32', '34', '36'],
    material: 'Ripstop Water-Deflecting Nylon Poly Blend',
    style: 'Streetwear',
    inStock: true,
    stockCount: 24,
    tags: ['combat', 'techwear', 'pants', 'straps', 'kuro'],
    features: ['Adjustable velcro ankle cuffs', 'D-ring attachment loops', '6 Expandable bellow pockets'],
    specifications: {
      'Fit': 'Tapered Tactical Fit',
      'Care': 'Machine wash cold'
    },
    compatibilityTags: ['top_techwear_jacket', 'shoes_boots'],
    viewsCount: 2600,
    purchasesCount: 340,
    createdAt: '2026-01-27'
  },
  {
    id: 'prod-kuro-19',
    title: 'Kuro Graphic Embroidered Denim Shorts',
    brand: 'Kuro Streetwear',
    category: 'Men',
    subCategory: 'Jeans & Denim',
    gender: 'Men',
    price: 1599,
    originalPrice: 2899,
    discountPercent: 44,
    rating: 4.6,
    reviewCount: 95,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1582418702059-97ebdfb35d09?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Vintage Light Blue', hex: '#60a5fa' },
      { name: 'Washed Black Denim', hex: '#27272a' }
    ],
    sizes: ['30', '32', '34', '36'],
    material: '100% Rigid Denim Cotton',
    style: 'Streetwear',
    inStock: true,
    stockCount: 28,
    tags: ['denim shorts', 'jorts', 'streetwear', 'kuro'],
    features: ['Baggy 90s silhouette', 'Back pocket Kanji embroidery', 'Frayed hem edge option'],
    specifications: {
      'Length': 'Below Knee (Baggy Jorts)',
      'Care': 'Wash inside out'
    },
    compatibilityTags: ['top_graphic_tee', 'shoes_sneakers'],
    viewsCount: 2100,
    purchasesCount: 290,
    createdAt: '2026-02-04'
  },
  {
    id: 'prod-kuro-20',
    title: 'Kuro Heavyweight Graphic Pullover Hoodie',
    brand: 'Kuro Streetwear',
    category: 'Men',
    subCategory: 'Hoodies & Sweatshirts',
    gender: 'Men',
    price: 2399,
    originalPrice: 4299,
    discountPercent: 44,
    rating: 4.8,
    reviewCount: 205,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Deep Onyx', hex: '#09090b' },
      { name: 'Olive Green', hex: '#3f6212' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '420 GSM Heavy Terry Cotton',
    style: 'Streetwear',
    inStock: true,
    stockCount: 30,
    tags: ['hoodie', 'pullover', 'graphic', 'kuro'],
    features: ['Cyberpunk Tokyo back graphic print', 'Ribbed waistband and wrist cuffs', 'Kangaroo pocket'],
    specifications: {
      'Fit': 'Oversized Boxy Cut',
      'Care': 'Machine wash cold inside out'
    },
    compatibilityTags: ['bottom_cargo', 'shoes_sneakers'],
    viewsCount: 3300,
    purchasesCount: 460,
    createdAt: '2026-01-11'
  }
];
