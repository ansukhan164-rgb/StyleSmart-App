import { Product } from '../../types';

export const solsticeProducts: Product[] = [
  {
    id: 'prod-solstice-1',
    title: 'Solstice Minimal Linen Cuban Collar Shirt',
    brand: 'Solstice Minimal',
    category: 'Men',
    subCategory: 'Shirts',
    gender: 'Men',
    price: 1599,
    originalPrice: 2999,
    discountPercent: 46,
    rating: 4.6,
    reviewCount: 184,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Ivory White', hex: '#f8fafc' },
      { name: 'Sand Beige', hex: '#e2d3c1' },
      { name: 'Ocean Blue', hex: '#3b82f6' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '100% Pure Organic European Linen',
    style: 'Minimalist',
    inStock: true,
    stockCount: 32,
    isLimitedDeal: true,
    dealEndsAt: '2026-08-15T23:59:59Z',
    tags: ['linen', 'shirt', 'summer', 'minimalist', 'white', 'solstice'],
    features: ['Breathable resort weave', 'Camp collar design', 'Natural wooden buttons'],
    specifications: {
      'Fit': 'Relaxed Fit',
      'Sleeve': 'Half Sleeve',
      'Care': 'Gentle hand wash or dry clean'
    },
    compatibilityTags: ['bottom_chinos', 'shoes_loafers', 'accessory_sunglasses'],
    viewsCount: 1950,
    purchasesCount: 290,
    createdAt: '2026-02-01'
  },
  {
    id: 'prod-solstice-2',
    title: 'Solstice High-Waisted Wide Leg Raw Hem Jeans',
    brand: 'Solstice Minimal',
    category: 'Women',
    subCategory: 'Jeans & Denim',
    gender: 'Women',
    price: 2199,
    originalPrice: 3999,
    discountPercent: 45,
    rating: 4.7,
    reviewCount: 390,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1582418702059-97ebdfb35d09?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Vintage Light Wash', hex: '#60a5fa' },
      { name: 'Deep Indigo', hex: '#1e3a8a' }
    ],
    sizes: ['26', '28', '30', '32'],
    material: '100% Rigid Heavyweight Cotton Denim',
    style: 'Minimalist',
    inStock: true,
    stockCount: 30,
    isBestSeller: true,
    tags: ['jeans', 'denim', 'wide leg', 'high waist', 'women'],
    features: ['Classic 5-pocket construction', 'High rise tummy sculpting waist', 'Frayed raw edge cuffs'],
    specifications: {
      'Fit': 'High-Rise Wide Leg',
      'Rise': '11.5 inches'
    },
    compatibilityTags: ['top_crop_top', 'top_linen_shirt', 'shoes_sneakers'],
    viewsCount: 3800,
    purchasesCount: 520,
    createdAt: '2026-01-14'
  },
  {
    id: 'prod-solstice-3',
    title: 'Solstice Organic Cotton Oversized Crewneck Tee',
    brand: 'Solstice Minimal',
    category: 'Men',
    subCategory: 'T-Shirts & Tops',
    gender: 'Unisex',
    price: 999,
    originalPrice: 1799,
    discountPercent: 44,
    rating: 4.8,
    reviewCount: 280,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Raw Natural Cream', hex: '#fef3c7' },
      { name: 'Sage Green', hex: '#657153' },
      { name: 'Charcoal Slate', hex: '#334155' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    material: '220 GSM GOTS Certified Organic Cotton',
    style: 'Minimalist',
    inStock: true,
    stockCount: 55,
    tags: ['tshirt', 'organic', 'minimalist', 'solstice'],
    features: ['Tagless neck design', 'Double-needle hem stitching', 'Pre-washed earth dye finish'],
    specifications: {
      'Fit': 'Relaxed Boxy',
      'Care': 'Machine wash cold'
    },
    compatibilityTags: ['bottom_shorts', 'bottom_chinos', 'shoes_slides'],
    viewsCount: 2900,
    purchasesCount: 430,
    createdAt: '2026-01-08'
  },
  {
    id: 'prod-solstice-4',
    title: 'Solstice Pure Linen Relaxed Drawstring Shorts',
    brand: 'Solstice Minimal',
    category: 'Men',
    subCategory: 'Trousers & Chinos',
    gender: 'Men',
    price: 1399,
    originalPrice: 2499,
    discountPercent: 44,
    rating: 4.6,
    reviewCount: 160,
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Sand Khaki', hex: '#d4b185' },
      { name: 'Earthy Olive', hex: '#4b5320' },
      { name: 'Pure White', hex: '#ffffff' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '100% French Flax Linen',
    style: 'Minimalist',
    inStock: true,
    stockCount: 40,
    tags: ['shorts', 'linen', 'summer', 'solstice'],
    features: ['Encased elastic waistband with linen drawstring', 'Deep side slant pockets', 'Breathable open weave'],
    specifications: {
      'Inseam': '6.5 Inches',
      'Care': 'Hand wash or gentle machine wash'
    },
    compatibilityTags: ['top_linen_shirt', 'shoes_espadrilles'],
    viewsCount: 2100,
    purchasesCount: 320,
    createdAt: '2026-01-18'
  },
  {
    id: 'prod-solstice-5',
    title: 'Solstice Knit Polo Shirt with Open Collar',
    brand: 'Solstice Minimal',
    category: 'Men',
    subCategory: 'Shirts',
    gender: 'Men',
    price: 1699,
    originalPrice: 2999,
    discountPercent: 43,
    rating: 4.7,
    reviewCount: 125,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Espresso Brown', hex: '#451a03' },
      { name: 'Cream Stone', hex: '#fef3c7' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '100% Fine Gauge Cotton Knit',
    style: 'Minimalist',
    inStock: true,
    stockCount: 25,
    tags: ['polo', 'knit polo', 'minimalist', 'solstice'],
    features: ['Johnny collar without buttons', 'Ribbed cuffs and bottom hem', 'Breathable porous structure'],
    specifications: {
      'Fit': 'Tailored Resort Fit',
      'Care': 'Hand wash cold flat dry'
    },
    compatibilityTags: ['bottom_trousers', 'shoes_loafers'],
    viewsCount: 2300,
    purchasesCount: 310,
    createdAt: '2026-01-25'
  },
  {
    id: 'prod-solstice-6',
    title: 'Solstice Linen Blend Slip Dress',
    brand: 'Solstice Minimal',
    category: 'Women',
    subCategory: 'Dresses & Jumpsuits',
    gender: 'Women',
    price: 2499,
    originalPrice: 4499,
    discountPercent: 44,
    rating: 4.8,
    reviewCount: 210,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Terracotta Rust', hex: '#9a3412' },
      { name: 'Natural Oatmeal', hex: '#e2d3c1' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: '55% Linen, 45% Organic Rayon',
    style: 'Minimalist',
    inStock: true,
    stockCount: 18,
    isNewArrival: true,
    tags: ['dress', 'slip dress', 'linen', 'women', 'solstice'],
    features: ['Adjustable slender shoulder straps', 'Subtle side slit hem', 'Fully lined bodice'],
    specifications: {
      'Length': 'Midi Length',
      'Care': 'Machine wash cold'
    },
    compatibilityTags: ['shoes_sandals', 'accessory_straw_bag'],
    viewsCount: 2600,
    purchasesCount: 340,
    createdAt: '2026-02-02'
  },
  {
    id: 'prod-solstice-7',
    title: 'Solstice Minimal Unstructured Linen Blazer',
    brand: 'Solstice Minimal',
    category: 'Men',
    subCategory: 'Jackets & Coats',
    gender: 'Men',
    price: 3899,
    originalPrice: 6999,
    discountPercent: 44,
    rating: 4.9,
    reviewCount: 150,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Beige Sand', hex: '#d4b185' },
      { name: 'Navy Blue', hex: '#1e3a8a' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '100% Pure Woven European Linen',
    style: 'Minimalist',
    inStock: true,
    stockCount: 15,
    tags: ['blazer', 'linen blazer', 'resort', 'solstice'],
    features: ['Unlined lightweight construction', 'Patch pockets', 'Horn button front'],
    specifications: {
      'Fit': 'Relaxed Fit',
      'Care': 'Dry clean only'
    },
    compatibilityTags: ['top_linen_shirt', 'bottom_chinos', 'shoes_loafers'],
    viewsCount: 3100,
    purchasesCount: 420,
    createdAt: '2026-01-16'
  },
  {
    id: 'prod-solstice-8',
    title: 'Solstice Pleated Straight-Leg Chino Trousers',
    brand: 'Solstice Minimal',
    category: 'Men',
    subCategory: 'Trousers & Chinos',
    gender: 'Men',
    price: 2199,
    originalPrice: 3899,
    discountPercent: 43,
    rating: 4.7,
    reviewCount: 175,
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Ivory Cream', hex: '#fef3c7' },
      { name: 'Charcoal Slate', hex: '#374151' }
    ],
    sizes: ['30', '32', '34', '36'],
    material: '100% Heavyweight Cotton Twill',
    style: 'Minimalist',
    inStock: true,
    stockCount: 28,
    tags: ['trousers', 'pleated', 'chinos', 'solstice'],
    features: ['Double front waist pleats', 'Side tab waistband adjusters', 'Straight cuff drape'],
    specifications: {
      'Fit': 'Relaxed Straight Leg',
      'Care': 'Machine wash warm'
    },
    compatibilityTags: ['top_polo', 'shoes_loafers'],
    viewsCount: 2200,
    purchasesCount: 310,
    createdAt: '2026-01-20'
  },
  {
    id: 'prod-solstice-9',
    title: 'Solstice Ribbed Cotton Tank Top',
    brand: 'Solstice Minimal',
    category: 'Women',
    subCategory: 'T-Shirts & Tops',
    gender: 'Women',
    price: 699,
    originalPrice: 1299,
    discountPercent: 46,
    rating: 4.6,
    reviewCount: 240,
    images: [
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Milk White', hex: '#ffffff' },
      { name: 'Charcoal Black', hex: '#18181b' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: '2X2 Ribbed Organic Cotton Spandex',
    style: 'Minimalist',
    inStock: true,
    stockCount: 60,
    tags: ['tank top', 'ribbed', 'basics', 'solstice'],
    features: ['High scoop neckline', 'Ultra-soft shape retaining stretch', 'Clean edge binding'],
    specifications: {
      'Fit': 'Snug Bodycon',
      'Care': 'Machine wash cold'
    },
    compatibilityTags: ['bottom_wide_leg_jeans', 'shoes_sandals'],
    viewsCount: 2800,
    purchasesCount: 450,
    createdAt: '2026-01-10'
  },
  {
    id: 'prod-solstice-10',
    title: 'Solstice Oversized Linen Wrap Kimono Cardigan',
    brand: 'Solstice Minimal',
    category: 'Women',
    subCategory: 'Jackets & Coats',
    gender: 'Women',
    price: 2799,
    originalPrice: 4999,
    discountPercent: 44,
    rating: 4.8,
    reviewCount: 130,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Oatmeal Taupe', hex: '#e2d3c1' },
      { name: 'Soft Sage', hex: '#84a98c' }
    ],
    sizes: ['S/M', 'L/XL'],
    material: '100% Washed Linen',
    style: 'Boho',
    inStock: true,
    stockCount: 16,
    tags: ['kimono', 'wrap', 'linen', 'solstice'],
    features: ['Detachable self-fabric waist sash belt', 'Dropped kimono sleeves', 'Flowing open draping'],
    specifications: {
      'Length': 'Longline',
      'Care': 'Gentle hand wash'
    },
    compatibilityTags: ['top_tank', 'bottom_jeans'],
    viewsCount: 2100,
    purchasesCount: 280,
    createdAt: '2026-01-29'
  },
  {
    id: 'prod-solstice-11',
    title: 'Solstice Minimalist Cashmere Blend Scarf',
    brand: 'Solstice Minimal',
    category: 'Accessories',
    subCategory: 'Watches',
    gender: 'Unisex',
    price: 1499,
    originalPrice: 2799,
    discountPercent: 46,
    rating: 4.9,
    reviewCount: 110,
    images: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1520903074185-8eca362b3dce?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Camel Tan', hex: '#b45309' },
      { name: 'Grey Heather', hex: '#9ca3af' }
    ],
    sizes: ['One Size (200cm x 70cm)'],
    material: '30% Mongolian Cashmere, 70% Fine Merino Wool',
    style: 'Luxury',
    inStock: true,
    stockCount: 22,
    tags: ['scarf', 'cashmere', 'winter', 'solstice'],
    features: ['Featherlight warmth insulation', 'Raw fringed edge trims', 'Hypoallergenic soft weave'],
    specifications: {
      'Dimensions': '200cm x 70cm',
      'Care': 'Dry clean only'
    },
    compatibilityTags: ['top_coat', 'top_sweater'],
    viewsCount: 1900,
    purchasesCount: 260,
    createdAt: '2026-01-15'
  },
  {
    id: 'prod-solstice-12',
    title: 'Solstice Linen Wide-Leg Jumpsuit',
    brand: 'Solstice Minimal',
    category: 'Women',
    subCategory: 'Dresses & Jumpsuits',
    gender: 'Women',
    price: 2999,
    originalPrice: 5299,
    discountPercent: 43,
    rating: 4.7,
    reviewCount: 145,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Terracotta', hex: '#9a3412' },
      { name: 'Charcoal Black', hex: '#18181b' }
    ],
    sizes: ['S', 'M', 'L'],
    material: '100% Linen',
    style: 'Minimalist',
    inStock: true,
    stockCount: 15,
    tags: ['jumpsuit', 'linen', 'women', 'solstice'],
    features: ['Square neckline with wide straps', 'Deep side pockets', 'Concealed back zip'],
    specifications: {
      'Inseam': '28 Inches',
      'Care': 'Machine wash cold'
    },
    compatibilityTags: ['shoes_sandals', 'accessory_hat'],
    viewsCount: 2300,
    purchasesCount: 310,
    createdAt: '2026-01-24'
  },
  {
    id: 'prod-solstice-13',
    title: 'Solstice Organic Cotton Heavyweight Hoodie',
    brand: 'Solstice Minimal',
    category: 'Men',
    subCategory: 'Hoodies & Sweatshirts',
    gender: 'Unisex',
    price: 2199,
    originalPrice: 3899,
    discountPercent: 43,
    rating: 4.8,
    reviewCount: 190,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Bone Beige', hex: '#e2d3c1' },
      { name: 'Slate Blue', hex: '#475569' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '400 GSM Unbrushed Loopback Organic Cotton',
    style: 'Minimalist',
    inStock: true,
    stockCount: 30,
    tags: ['hoodie', 'organic', 'minimalist', 'solstice'],
    features: ['No drawstrings clean double layer hood', 'Hidden side seam pockets', 'Boxy minimal cut'],
    specifications: {
      'Fit': 'Oversized Boxy',
      'Care': 'Machine wash cold'
    },
    compatibilityTags: ['bottom_chinos', 'shoes_sneakers'],
    viewsCount: 2700,
    purchasesCount: 380,
    createdAt: '2026-01-12'
  },
  {
    id: 'prod-solstice-14',
    title: 'Solstice Linen Mandarin Collar Long Shirt',
    brand: 'Solstice Minimal',
    category: 'Men',
    subCategory: 'Shirts',
    gender: 'Men',
    price: 1799,
    originalPrice: 3199,
    discountPercent: 43,
    rating: 4.6,
    reviewCount: 110,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Optic White', hex: '#ffffff' },
      { name: 'Sand Beige', hex: '#d4b185' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '100% Pure Linen',
    style: 'Minimalist',
    inStock: true,
    stockCount: 25,
    tags: ['mandarin shirt', 'linen', 'minimalist', 'solstice'],
    features: ['Band collar stand', 'Natural wooden buttons', 'Curved hemline'],
    specifications: {
      'Sleeve': 'Full Sleeve with Convertible Cuffs',
      'Care': 'Hand wash recommended'
    },
    compatibilityTags: ['bottom_linen_shorts', 'shoes_sandals'],
    viewsCount: 1800,
    purchasesCount: 250,
    createdAt: '2026-01-19'
  },
  {
    id: 'prod-solstice-15',
    title: 'Solstice High-Rise Tailored Linen Trousers',
    brand: 'Solstice Minimal',
    category: 'Women',
    subCategory: 'Trousers & Chinos',
    gender: 'Women',
    price: 2299,
    originalPrice: 3999,
    discountPercent: 42,
    rating: 4.7,
    reviewCount: 165,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Natural Sand', hex: '#e2d3c1' },
      { name: 'Pure White', hex: '#ffffff' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: '100% European Linen',
    style: 'Minimalist',
    inStock: true,
    stockCount: 20,
    tags: ['trousers', 'linen pants', 'women', 'solstice'],
    features: ['High elasticated back waist', 'Wide straight leg', 'Side welt pockets'],
    specifications: {
      'Inseam': '30 Inches',
      'Care': 'Hand wash cold'
    },
    compatibilityTags: ['top_crop_tank', 'shoes_mules'],
    viewsCount: 2400,
    purchasesCount: 330,
    createdAt: '2026-01-27'
  },
  {
    id: 'prod-solstice-16',
    title: 'Solstice Woven Straw Summer Tote Bag',
    brand: 'Solstice Minimal',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Women',
    price: 1399,
    originalPrice: 2499,
    discountPercent: 44,
    rating: 4.7,
    reviewCount: 92,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Natural Raffia', hex: '#d4b185' }
    ],
    sizes: ['One Size'],
    material: 'Handwoven Natural Raffia Palm Leaf & Tan Leather Handles',
    style: 'Boho',
    inStock: true,
    stockCount: 30,
    tags: ['tote bag', 'straw bag', 'summer', 'solstice'],
    features: ['Cotton drawstring inner lining', 'Reinforced leather shoulder straps', 'Hand-crafted artisan weave'],
    specifications: {
      'Dimensions': '38cm x 30cm x 15cm',
      'Capacity': '15 Liters'
    },
    compatibilityTags: ['top_linen_dress', 'shoes_sandals'],
    viewsCount: 1600,
    purchasesCount: 210,
    createdAt: '2026-02-01'
  },
  {
    id: 'prod-solstice-17',
    title: 'Solstice Fine Gauge Wool Turtleneck Knit',
    brand: 'Solstice Minimal',
    category: 'Men',
    subCategory: 'Hoodies & Sweatshirts',
    gender: 'Men',
    price: 2499,
    originalPrice: 4299,
    discountPercent: 41,
    rating: 4.8,
    reviewCount: 115,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Jet Black', hex: '#09090b' },
      { name: 'Camel', hex: '#b45309' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '100% Superfine Merino Wool',
    style: 'Minimalist',
    inStock: true,
    stockCount: 18,
    tags: ['turtleneck', 'merino wool', 'knitwear', 'solstice'],
    features: ['Fold-over ribbed neck collar', 'Silky ultra-soft touch', 'Thermoregulating weave'],
    specifications: {
      'Fit': 'Slim Fitted',
      'Care': 'Hand wash cold'
    },
    compatibilityTags: ['top_blazer', 'shoes_chelsea_boots'],
    viewsCount: 2100,
    purchasesCount: 290,
    createdAt: '2026-01-13'
  },
  {
    id: 'prod-solstice-18',
    title: 'Solstice Minimalist Leather Cardholder Wallet',
    brand: 'Solstice Minimal',
    category: 'Accessories',
    subCategory: 'Watches',
    gender: 'Unisex',
    price: 799,
    originalPrice: 1499,
    discountPercent: 46,
    rating: 4.9,
    reviewCount: 230,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Tan Brown', hex: '#78350f' },
      { name: 'Matte Black', hex: '#09090b' }
    ],
    sizes: ['One Size'],
    material: '100% Italian Vegetable Tanned Leather',
    style: 'Minimalist',
    inStock: true,
    stockCount: 50,
    tags: ['wallet', 'cardholder', 'leather', 'solstice'],
    features: ['6 Card slots + central cash pocket', 'RFID Blocking lining', 'Ultra-slim 4mm profile'],
    specifications: {
      'Dimensions': '10cm x 8cm x 0.4cm'
    },
    compatibilityTags: [],
    viewsCount: 2500,
    purchasesCount: 480,
    createdAt: '2026-01-04'
  },
  {
    id: 'prod-solstice-19',
    title: 'Solstice Linen Tiered Maxi Skirt',
    brand: 'Solstice Minimal',
    category: 'Women',
    subCategory: 'Dresses & Jumpsuits',
    gender: 'Women',
    price: 2199,
    originalPrice: 3899,
    discountPercent: 43,
    rating: 4.7,
    reviewCount: 105,
    images: [
      'https://images.unsplash.com/photo-1582418702059-97ebdfb35d09?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Olive Green', hex: '#4d7c0f' },
      { name: 'Cream Sand', hex: '#fef3c7' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    material: '100% Woven Linen',
    style: 'Boho',
    inStock: true,
    stockCount: 20,
    tags: ['skirt', 'maxi skirt', 'linen', 'solstice'],
    features: ['Comfy smocked elastic waistband', 'Tiered gathers design', 'Side pockets'],
    specifications: {
      'Length': 'Maxi (Ankle Length)',
      'Care': 'Machine wash cold'
    },
    compatibilityTags: ['top_crop_tank', 'shoes_sandals'],
    viewsCount: 1900,
    purchasesCount: 270,
    createdAt: '2026-01-23'
  },
  {
    id: 'prod-solstice-20',
    title: 'Solstice Relaxed Fit Linen T-Shirt',
    brand: 'Solstice Minimal',
    category: 'Men',
    subCategory: 'T-Shirts & Tops',
    gender: 'Men',
    price: 1199,
    originalPrice: 2199,
    discountPercent: 45,
    rating: 4.6,
    reviewCount: 140,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Terracotta', hex: '#9a3412' },
      { name: 'Soft Olive', hex: '#657153' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '100% Slub Linen Jersey',
    style: 'Minimalist',
    inStock: true,
    stockCount: 35,
    tags: ['linen tee', 'tshirt', 'minimalist', 'solstice'],
    features: ['Slub texture lightweight fabric', 'Crew neck collar', 'Relaxed drop sleeve'],
    specifications: {
      'Fit': 'Relaxed Fit',
      'Care': 'Hand wash or cold cycle'
    },
    compatibilityTags: ['bottom_linen_shorts', 'shoes_espadrilles'],
    viewsCount: 2000,
    purchasesCount: 310,
    createdAt: '2026-01-17'
  }
];
