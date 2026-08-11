import { Product } from '../../types';

export const urbanProducts: Product[] = [
  {
    id: 'prod-urban-1',
    title: 'Urban Thread Italian Full-Grain Leather Weekender Duffle Bag',
    brand: 'Urban Thread',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Unisex',
    price: 4999,
    originalPrice: 8999,
    discountPercent: 44,
    rating: 4.9,
    reviewCount: 280,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Cognac Saddle Brown', hex: '#78350f' },
      { name: 'Espresso Dark Brown', hex: '#451a03' },
      { name: 'Matte Onyx Black', hex: '#09090b' }
    ],
    sizes: ['45 Liters Travel Size'],
    material: '100% Vegetable-Tanned Italian Full-Grain Calfskin Leather',
    style: 'Luxury',
    inStock: true,
    stockCount: 15,
    isBestSeller: true,
    tags: ['duffle bag', 'travel bag', 'leather', 'weekender', 'urban thread'],
    features: ['Reinforced leather handles & detachable padded shoulder strap', 'Brass YKK zippers', 'Dedicated padded shoe compartment'],
    specifications: {
      'Capacity': '45 Liters',
      'Dimensions': '52cm x 28cm x 26cm',
      'Care': 'Condition with leather balm'
    },
    compatibilityTags: ['shoes_loafers', 'top_blazer'],
    viewsCount: 4200,
    purchasesCount: 560,
    createdAt: '2026-01-15'
  },
  {
    id: 'prod-urban-2',
    title: 'Urban Thread Commuter Slim Leather Laptop Backpack',
    brand: 'Urban Thread',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Unisex',
    price: 3499,
    originalPrice: 6299,
    discountPercent: 44,
    rating: 4.8,
    reviewCount: 310,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Pitch Black Leather', hex: '#09090b' },
      { name: 'Vintage Chestnut', hex: '#92400e' }
    ],
    sizes: ['15.6" Laptop Compartment'],
    material: 'Water-Resistant Full-Grain Leather & Cotton Twill Lining',
    style: 'Minimalist',
    inStock: true,
    stockCount: 22,
    tags: ['backpack', 'laptop bag', 'leather', 'commuter', 'urban thread'],
    features: ['Padded 15.6" laptop sleeve', 'Luggage pass-through strap for suitcase handles', 'Concealed anti-theft back pocket'],
    specifications: {
      'Capacity': '18 Liters',
      'Dimensions': '42cm x 30cm x 12cm'
    },
    compatibilityTags: ['top_suit', 'shoes_oxford'],
    viewsCount: 3800,
    purchasesCount: 480,
    createdAt: '2026-01-20'
  },
  {
    id: 'prod-urban-3',
    title: 'Urban Thread Minimalist Leather Crossbody Sling Bag',
    brand: 'Urban Thread',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Unisex',
    price: 1999,
    originalPrice: 3499,
    discountPercent: 42,
    rating: 4.7,
    reviewCount: 190,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Tan Brown', hex: '#b45309' },
      { name: 'Black Nappa', hex: '#18181b' }
    ],
    sizes: ['One Size'],
    material: 'Soft Nappa Leather with Brass Hardware',
    style: 'Casual',
    inStock: true,
    stockCount: 30,
    tags: ['sling bag', 'crossbody', 'leather', 'urban thread'],
    features: ['Adjustable webbed leather strap', 'Dual zippered compartments', 'Key clip lanyard inside'],
    specifications: {
      'Dimensions': '24cm x 16cm x 6cm'
    },
    compatibilityTags: ['top_jacket', 'shoes_sneakers'],
    viewsCount: 2700,
    purchasesCount: 350,
    createdAt: '2026-01-28'
  },
  {
    id: 'prod-urban-4',
    title: 'Urban Thread RFID-Blocking Leather Passport Travel Wallet',
    brand: 'Urban Thread',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Unisex',
    price: 1299,
    originalPrice: 2299,
    discountPercent: 43,
    rating: 4.9,
    reviewCount: 160,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Havana Saddle', hex: '#78350f' },
      { name: 'Nero Black', hex: '#09090b' }
    ],
    sizes: ['One Size'],
    material: 'Italian Calfskin Leather with Metal Shield Lining',
    style: 'Luxury',
    inStock: true,
    stockCount: 40,
    tags: ['passport wallet', 'travel wallet', 'leather', 'urban thread'],
    features: ['Holds 2 passports + 8 cards + boarding pass', 'RFID blocking protection layer', 'Pen loop & SIM card slot'],
    specifications: {
      'Dimensions': '20cm x 11cm x 2cm'
    },
    compatibilityTags: [],
    viewsCount: 2200,
    purchasesCount: 310,
    createdAt: '2026-01-10'
  },
  {
    id: 'prod-urban-5',
    title: 'Urban Thread Structured Leather Messenger Briefcase',
    brand: 'Urban Thread',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Men',
    price: 4299,
    originalPrice: 7999,
    discountPercent: 46,
    rating: 4.8,
    reviewCount: 210,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Antique Brown', hex: '#451a03' },
      { name: 'Jet Black', hex: '#09090b' }
    ],
    sizes: ['14" Laptop Fit'],
    material: 'Hand-Waxed Top Grain Leather',
    style: 'Formal',
    inStock: true,
    stockCount: 18,
    tags: ['briefcase', 'messenger bag', 'leather', 'urban thread'],
    features: ['Dual push-lock flap closure', 'Organizer panel for pens and cards', 'Detachable shoulder strap'],
    specifications: {
      'Dimensions': '38cm x 28cm x 9cm'
    },
    compatibilityTags: ['top_suit', 'shoes_oxford'],
    viewsCount: 3100,
    purchasesCount: 420,
    createdAt: '2026-01-22'
  },
  {
    id: 'prod-urban-6',
    title: 'Urban Thread Water-Resistant Canvas & Leather Tote',
    brand: 'Urban Thread',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Unisex',
    price: 2499,
    originalPrice: 4299,
    discountPercent: 41,
    rating: 4.7,
    reviewCount: 145,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Khaki & Tan Leather', hex: '#d4b185' },
      { name: 'Olive & Dark Brown', hex: '#3f6212' }
    ],
    sizes: ['One Size (22 Liters)'],
    material: '20oz Waxed Canvas & Thick Italian Leather Straps',
    style: 'Casual',
    inStock: true,
    stockCount: 25,
    tags: ['tote bag', 'waxed canvas', 'leather tote', 'urban thread'],
    features: ['Zippered top main entry', 'Interior padded tablet sleeve', 'Brass feet studs on bottom base'],
    specifications: {
      'Dimensions': '40cm x 32cm x 14cm'
    },
    compatibilityTags: ['top_coat', 'shoes_boots'],
    viewsCount: 2400,
    purchasesCount: 320,
    createdAt: '2026-01-25'
  },
  {
    id: 'prod-urban-7',
    title: 'Urban Thread Toiletry Dopp Kit Leather Bag',
    brand: 'Urban Thread',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Unisex',
    price: 1199,
    originalPrice: 2199,
    discountPercent: 45,
    rating: 4.8,
    reviewCount: 230,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Saddle Tan', hex: '#78350f' },
      { name: 'Charcoal Black', hex: '#18181b' }
    ],
    sizes: ['One Size'],
    material: 'Waterproof Nylon Interior & Full-Grain Leather Exterior',
    style: 'Travel',
    inStock: true,
    stockCount: 35,
    tags: ['dopp kit', 'toiletry bag', 'leather', 'urban thread'],
    features: ['Waterproof wipeable lining', 'Double zipper wide doctor-bag opening', 'Side leather grab handle'],
    specifications: {
      'Dimensions': '25cm x 14cm x 12cm'
    },
    compatibilityTags: [],
    viewsCount: 2100,
    purchasesCount: 380,
    createdAt: '2026-01-12'
  },
  {
    id: 'prod-urban-8',
    title: 'Urban Thread Italian Leather Reversible Dress Belt',
    brand: 'Urban Thread',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Men',
    price: 1499,
    originalPrice: 2699,
    discountPercent: 44,
    rating: 4.8,
    reviewCount: 320,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Black / Brown Reversible', hex: '#09090b' }
    ],
    sizes: ['32', '34', '36', '38', '40'],
    material: '100% Genuine Italian Full-Grain Leather',
    style: 'Formal',
    inStock: true,
    stockCount: 50,
    tags: ['belt', 'leather belt', 'reversible', 'urban thread'],
    features: ['360-degree twist buckle mechanism', 'Black on one side, Tan on the other', 'Feathered edge stitch'],
    specifications: {
      'Width': '32mm'
    },
    compatibilityTags: ['bottom_chinos', 'bottom_trousers'],
    viewsCount: 2900,
    purchasesCount: 460,
    createdAt: '2026-01-05'
  },
  {
    id: 'prod-urban-9',
    title: 'Urban Thread Roll-Top Tactical Leather & Canvas Backpack',
    brand: 'Urban Thread',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Unisex',
    price: 3899,
    originalPrice: 6999,
    discountPercent: 44,
    rating: 4.9,
    reviewCount: 175,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Stealth Olive & Tan', hex: '#3f6212' },
      { name: 'Charcoal Black', hex: '#18181b' }
    ],
    sizes: ['25-30 Liters Expandable'],
    material: '22oz Heavy Duty Waxed Canvas & Oil-Tanned Leather',
    style: 'Streetwear',
    inStock: true,
    stockCount: 16,
    tags: ['rolltop', 'backpack', 'canvas', 'urban thread'],
    features: ['Expandable rolltop capacity with strap closure', 'Side zipper access to laptop compartment', 'Ergonomic padded shoulder straps'],
    specifications: {
      'Capacity': '25L - 30L',
      'Dimensions': '48cm x 32cm x 15cm'
    },
    compatibilityTags: ['top_jacket', 'shoes_boots'],
    viewsCount: 2800,
    purchasesCount: 390,
    createdAt: '2026-01-18'
  },
  {
    id: 'prod-urban-10',
    title: 'Urban Thread Key Organizer & Cardholder Set',
    brand: 'Urban Thread',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Unisex',
    price: 999,
    originalPrice: 1799,
    discountPercent: 44,
    rating: 4.7,
    reviewCount: 180,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Cognac Leather', hex: '#78350f' },
      { name: 'Matte Black', hex: '#09090b' }
    ],
    sizes: ['One Size'],
    material: 'Premium Top Grain Leather & Stainless Steel Bolt',
    style: 'Minimalist',
    inStock: true,
    stockCount: 45,
    tags: ['key organizer', 'cardholder', 'leather gift', 'urban thread'],
    features: ['Holds up to 7 keys quietly without jingling', 'Ultra-slim card holder fits 5 cards', 'Car key fob D-ring ring'],
    specifications: {
      'Includes': 'Key bar + RFID slim card wallet'
    },
    compatibilityTags: [],
    viewsCount: 1900,
    purchasesCount: 310,
    createdAt: '2026-01-08'
  },
  {
    id: 'prod-urban-11',
    title: 'Urban Thread Wheeled Leather Carry-On Suitcase',
    brand: 'Urban Thread',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Unisex',
    price: 8999,
    originalPrice: 15999,
    discountPercent: 43,
    rating: 4.9,
    reviewCount: 110,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Vintage Saddle Tan', hex: '#78350f' },
      { name: 'Nero Black Leather', hex: '#09090b' }
    ],
    sizes: ['20" Cabin Size Approved'],
    material: 'Hand-Finished Italian Leather over Aluminum Frame',
    style: 'Luxury',
    inStock: true,
    stockCount: 8,
    isNewArrival: true,
    tags: ['suitcase', 'luggage', 'carry on', 'leather', 'urban thread'],
    features: ['360-degree Japanese Hinomoto silent spinner wheels', 'TSA approved combination lock', 'Telescopic aircraft grade aluminum handle'],
    specifications: {
      'Dimensions': '55cm x 35cm x 23cm',
      'Weight': '3.8kg'
    },
    compatibilityTags: ['top_suit', 'top_coat'],
    viewsCount: 3600,
    purchasesCount: 410,
    createdAt: '2026-02-01'
  },
  {
    id: 'prod-urban-12',
    title: 'Urban Thread Leather Tech Cable & Cord Organizer Case',
    brand: 'Urban Thread',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Unisex',
    price: 1399,
    originalPrice: 2499,
    discountPercent: 44,
    rating: 4.8,
    reviewCount: 205,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Chestnut Brown', hex: '#92400e' },
      { name: 'Jet Black', hex: '#09090b' }
    ],
    sizes: ['One Size'],
    material: 'Soft Pebble Grain Leather with Elastic Loop Loops',
    style: 'Travel',
    inStock: true,
    stockCount: 30,
    tags: ['cable organizer', 'tech pouch', 'leather case', 'urban thread'],
    features: ['Elastic loops for cables, chargers, power banks & SD cards', 'Zippered mesh compartment', 'Rolls up compactly with peg tie'],
    specifications: {
      'Dimensions': '22cm x 15cm x 5cm'
    },
    compatibilityTags: [],
    viewsCount: 2300,
    purchasesCount: 340,
    createdAt: '2026-01-14'
  },
  {
    id: 'prod-urban-13',
    title: 'Urban Thread Leather Camera Messenger Bag',
    brand: 'Urban Thread',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Unisex',
    price: 3699,
    originalPrice: 6499,
    discountPercent: 43,
    rating: 4.8,
    reviewCount: 130,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Vintage Oak Brown', hex: '#78350f' }
    ],
    sizes: ['Fits DSLR + 2 Lenses'],
    material: 'Shockproof Velvet Padded Inserts & Italian Leather Shell',
    style: 'Travel',
    inStock: true,
    stockCount: 14,
    tags: ['camera bag', 'messenger', 'leather', 'urban thread'],
    features: ['Customizable velcro padded divider compartments', 'Quick magnet buckle access', 'Weatherproof rain flap'],
    specifications: {
      'Dimensions': '32cm x 22cm x 12cm'
    },
    compatibilityTags: ['top_jacket', 'shoes_boots'],
    viewsCount: 2500,
    purchasesCount: 310,
    createdAt: '2026-01-27'
  },
  {
    id: 'prod-urban-14',
    title: 'Urban Thread Slim Minimalist Leather Front-Pocket Bifold',
    brand: 'Urban Thread',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Men',
    price: 1099,
    originalPrice: 1999,
    discountPercent: 45,
    rating: 4.7,
    reviewCount: 290,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Tan Saddle', hex: '#78350f' },
      { name: 'Onyx Black', hex: '#09090b' }
    ],
    sizes: ['One Size'],
    material: 'Top-Grain Italian Leather',
    style: 'Minimalist',
    inStock: true,
    stockCount: 45,
    tags: ['wallet', 'bifold', 'leather wallet', 'urban thread'],
    features: ['Quick pull-tab card slot', 'ID window slot', 'Ultra slim 6mm profile'],
    specifications: {
      'Dimensions': '10.5cm x 8cm x 0.6cm'
    },
    compatibilityTags: [],
    viewsCount: 2700,
    purchasesCount: 430,
    createdAt: '2026-01-07'
  },
  {
    id: 'prod-urban-15',
    title: 'Urban Thread Canvas & Leather Garment Travel Bag',
    brand: 'Urban Thread',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Unisex',
    price: 4599,
    originalPrice: 7999,
    discountPercent: 42,
    rating: 4.9,
    reviewCount: 95,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Slate Grey & Black', hex: '#374151' },
      { name: 'Olive & Tan', hex: '#3f6212' }
    ],
    sizes: ['Converts into 50L Duffle'],
    material: '2-in-1 Hanging Garment Suit Bag that Zips into Duffle',
    style: 'Travel',
    inStock: true,
    stockCount: 12,
    tags: ['garment bag', 'suit bag', 'duffle', 'travel', 'urban thread'],
    features: ['Keeps suits wrinkle-free during transit', 'Includes shoe pocket & tie organizer', 'Water repellent fabric'],
    specifications: {
      'Capacity': '50 Liters when zipped into duffle'
    },
    compatibilityTags: ['top_suit'],
    viewsCount: 2900,
    purchasesCount: 360,
    createdAt: '2026-01-29'
  },
  {
    id: 'prod-urban-16',
    title: 'Urban Thread Leather AirTag Key Fob Case 2-Pack',
    brand: 'Urban Thread',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Unisex',
    price: 699,
    originalPrice: 1299,
    discountPercent: 46,
    rating: 4.8,
    reviewCount: 240,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Tan & Black Pair', hex: '#78350f' }
    ],
    sizes: ['2-Pack Set'],
    material: 'Genuine Leather with Brass Snap Ring',
    style: 'Accessories',
    inStock: true,
    stockCount: 60,
    tags: ['airtag holder', 'keychain', 'leather accessories', 'urban thread'],
    features: ['Snug snap enclosure protects AirTag', 'Heavy duty brass key ring'],
    specifications: {
      'Compatibility': 'Apple AirTag'
    },
    compatibilityTags: [],
    viewsCount: 2100,
    purchasesCount: 380,
    createdAt: '2026-01-02'
  },
  {
    id: 'prod-urban-17',
    title: 'Urban Thread Heavyweight Canvas Utility Shoulder Bag',
    brand: 'Urban Thread',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Unisex',
    price: 1799,
    originalPrice: 3199,
    discountPercent: 43,
    rating: 4.6,
    reviewCount: 160,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Military Khaki', hex: '#d4b185' },
      { name: 'Onyx Black', hex: '#18181b' }
    ],
    sizes: ['One Size'],
    material: '18oz Stonewashed Cotton Canvas & Leather Trim',
    style: 'Streetwear',
    inStock: true,
    stockCount: 28,
    tags: ['shoulder bag', 'canvas bag', 'utility', 'urban thread'],
    features: ['Multiple exterior cargo flap pockets', 'Adjustable wide shoulder strap', 'Padded tablet sleeve'],
    specifications: {
      'Dimensions': '30cm x 24cm x 10cm'
    },
    compatibilityTags: ['top_hoodie', 'shoes_sneakers'],
    viewsCount: 2200,
    purchasesCount: 310,
    createdAt: '2026-01-21'
  },
  {
    id: 'prod-urban-18',
    title: 'Urban Thread Handmade Leather Watch Travel Roll',
    brand: 'Urban Thread',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Unisex',
    price: 1899,
    originalPrice: 3299,
    discountPercent: 42,
    rating: 4.9,
    reviewCount: 115,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Espresso Brown', hex: '#451a03' },
      { name: 'Cognac Tan', hex: '#78350f' }
    ],
    sizes: ['Holds 3 Watches'],
    material: 'Soft Suede Interior & Full-Grain Leather Outer Shell',
    style: 'Luxury',
    inStock: true,
    stockCount: 20,
    tags: ['watch roll', 'watch case', 'leather roll', 'urban thread'],
    features: ['Removable watch cushions', 'Snap button closures', 'Scratchproof suede lining'],
    specifications: {
      'Capacity': '3 Timepieces up to 52mm diameter'
    },
    compatibilityTags: ['accessory_watch'],
    viewsCount: 2400,
    purchasesCount: 330,
    createdAt: '2026-01-16'
  },
  {
    id: 'prod-urban-19',
    title: 'Urban Thread Leather Belt Bag Fanny Pack',
    brand: 'Urban Thread',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Unisex',
    price: 1699,
    originalPrice: 2999,
    discountPercent: 43,
    rating: 4.7,
    reviewCount: 140,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Saddle Tan', hex: '#78350f' },
      { name: 'Jet Black', hex: '#09090b' }
    ],
    sizes: ['One Size'],
    material: 'Soft Cowhide Pebble Leather with Gunmetal Buckle',
    style: 'Casual',
    inStock: true,
    stockCount: 25,
    tags: ['fanny pack', 'belt bag', 'leather', 'urban thread'],
    features: ['Adjustable waist / cross-body belt strap', 'Rear hidden zip pocket', 'Smooth glide YKK zippers'],
    specifications: {
      'Dimensions': '28cm x 14cm x 8cm'
    },
    compatibilityTags: ['top_tee', 'bottom_jeans'],
    viewsCount: 2000,
    purchasesCount: 280,
    createdAt: '2026-01-31'
  },
  {
    id: 'prod-urban-20',
    title: 'Urban Thread Executive Leather Writing Folio Notebook Cover',
    brand: 'Urban Thread',
    category: 'Accessories',
    subCategory: 'Bags & Backpacks',
    gender: 'Unisex',
    price: 1599,
    originalPrice: 2899,
    discountPercent: 44,
    rating: 4.8,
    reviewCount: 125,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Chestnut Brown', hex: '#92400e' },
      { name: 'Onyx Black', hex: '#09090b' }
    ],
    sizes: ['Fits A5 / Letter Pads'],
    material: 'Hand-Stitched Full Grain Italian Leather',
    style: 'Formal',
    inStock: true,
    stockCount: 22,
    tags: ['notebook cover', 'folio', 'leather journal', 'urban thread'],
    features: ['Includes refillable 100gsm cream paper pad', 'Business card slots & pen sleeve', 'Snap button leather latch'],
    specifications: {
      'Dimensions': '23cm x 17cm x 2cm'
    },
    compatibilityTags: [],
    viewsCount: 2100,
    purchasesCount: 290,
    createdAt: '2026-02-03'
  }
];