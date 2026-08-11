import {
  CategoryDetail,
  BrandDetail,
  CustomerDetail,
  AdminReview,
  AdminCoupon,
  AuditLog,
  SearchAnalytic,
  AdminNotification
} from '../types/admin';

export const INITIAL_CATEGORIES: CategoryDetail[] = [
  {
    id: 'cat-1',
    name: 'Men',
    subCategories: ['T-Shirts & Tops', 'Shirts', 'Jeans & Denim', 'Trousers & Chinos', 'Jackets & Coats', 'Hoodies & Sweatshirts'],
    productCount: 65,
    imageUrl: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=400',
    icon: 'User',
    status: 'Active'
  },
  {
    id: 'cat-2',
    name: 'Women',
    subCategories: ['Dresses & Jumpsuits', 'T-Shirts & Tops', 'Ethnic & Festive Wear', 'Jeans & Denim', 'Jackets & Coats'],
    productCount: 55,
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400',
    icon: 'UserCheck',
    status: 'Active'
  },
  {
    id: 'cat-3',
    name: 'Footwear',
    subCategories: ['Sneakers', 'Formal Shoes', 'Sandals & Slides'],
    productCount: 30,
    imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=400',
    icon: 'Footprints',
    status: 'Active'
  },
  {
    id: 'cat-4',
    name: 'Accessories',
    subCategories: ['Bags & Backpacks', 'Watches', 'Sunglasses'],
    productCount: 40,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400',
    icon: 'Watch',
    status: 'Active'
  },
  {
    id: 'cat-5',
    name: 'Beauty',
    subCategories: ['Skincare & Makeup', 'Fragrances'],
    productCount: 40,
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400',
    icon: 'Sparkles',
    status: 'Active'
  },
  {
    id: 'cat-6',
    name: 'Home & Lifestyle',
    subCategories: ['Home Decor'],
    productCount: 20,
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400',
    icon: 'Home',
    status: 'Active'
  },
  {
    id: 'cat-7',
    name: 'Kids',
    subCategories: ['Kids & Baby'],
    productCount: 20,
    imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400',
    icon: 'Smile',
    status: 'Active'
  }
];

export const INITIAL_BRANDS: BrandDetail[] = [
  {
    id: 'brd-1',
    name: 'AURA Studio',
    logoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    productCount: 20,
    status: 'Featured',
    description: 'Contemporary high-fashion tailored outerwear & minimalist basics.'
  },
  {
    id: 'brd-2',
    name: 'Kuro Streetwear',
    logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    productCount: 20,
    status: 'Featured',
    description: 'Tokyo-inspired oversized streetwear & dystopian techwear.'
  },
  {
    id: 'brd-3',
    name: 'Solstice Minimal',
    logoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    productCount: 20,
    status: 'Active',
    description: 'Sustainable organic linen and muted monochromatic essentials.'
  },
  {
    id: 'brd-4',
    name: 'Verve Luxe',
    logoUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=200',
    productCount: 20,
    status: 'Featured',
    description: 'European haute couture, silk wrap silhouettes, & tailored luxury.'
  },
  {
    id: 'brd-5',
    name: 'Elysian Footwear',
    logoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200',
    productCount: 20,
    status: 'Featured',
    description: 'Ergonomic luxury sneakers and handcrafted leather footwear.'
  },
  {
    id: 'brd-6',
    name: 'Velvet & Vine',
    logoUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=200',
    productCount: 20,
    status: 'Active',
    description: 'Handcrafted royal ethnic ensembles, silk zari sarees & festive wear.'
  },
  {
    id: 'brd-7',
    name: 'Zenith Active',
    logoUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=200',
    productCount: 20,
    status: 'Active',
    description: 'Seamless high-compression activewear and technical performance gear.'
  },
  {
    id: 'brd-8',
    name: 'Urban Thread',
    logoUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=200',
    productCount: 20,
    status: 'Active',
    description: 'Italian leather travel carry-ons, backpacks, and commuter accessories.'
  },
  {
    id: 'brd-9',
    name: 'Chronos',
    logoUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=200',
    productCount: 20,
    status: 'Featured',
    description: 'Swiss-movement sapphire crystal skeleton mechanical timepieces.'
  },
  {
    id: 'brd-10',
    name: 'GlowRx Beauty',
    logoUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=200',
    productCount: 20,
    status: 'Active',
    description: 'Dermatologist-formulated vegan skincare, serums & radiance boosters.'
  },
  {
    id: 'brd-11',
    name: 'Maison Parfums',
    logoUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=200',
    productCount: 20,
    status: 'Active',
    description: 'Artisanal niche fragrances, pure oud extracts & luxury extraits.'
  },
  {
    id: 'brd-12',
    name: 'Solstice Living',
    logoUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=200',
    productCount: 20,
    status: 'Active',
    description: 'Sculptural ceramic home decor, ambient lighting & artisanal textiles.'
  },
  {
    id: 'brd-13',
    name: 'Little Stars',
    logoUrl: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=200',
    productCount: 20,
    status: 'Active',
    description: 'Organic cotton childrenswear, gentle hypoallergenic clothing & footwear.'
  }
];

export const INITIAL_CUSTOMERS: CustomerDetail[] = [
  {
    id: 'cust-1',
    name: 'Alex Rivera',
    email: 'alex.rivera@stylesmart.ai',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    totalOrders: 6,
    totalSpent: 28490,
    styleArchetype: 'Urban Street Minimalist',
    status: 'Active',
    joinedDate: 'Jan 15, 2026'
  },
  {
    id: 'cust-2',
    name: 'Sophia Chen',
    email: 'sophia.chen@example.com',
    phone: '+91 98123 76543',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    totalOrders: 11,
    totalSpent: 64200,
    styleArchetype: 'European Luxury Chic',
    status: 'Active',
    joinedDate: 'Feb 02, 2026'
  },
  {
    id: 'cust-3',
    name: 'Rohan Sharma',
    email: 'rohan.sharma@example.com',
    phone: '+91 97788 11223',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    totalOrders: 3,
    totalSpent: 11450,
    styleArchetype: 'Casual Athleisure',
    status: 'Active',
    joinedDate: 'Mar 10, 2026'
  },
  {
    id: 'cust-4',
    name: 'Ananya Mehta',
    email: 'ananya.m@example.com',
    phone: '+91 99001 22334',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    totalOrders: 8,
    totalSpent: 42100,
    styleArchetype: 'Bohemian Minimalist',
    status: 'Active',
    joinedDate: 'Apr 05, 2026'
  }
];

export const INITIAL_REVIEWS: AdminReview[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    productTitle: 'AURA Oversized Cyber Hoodie',
    productImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=200',
    userName: 'Alex Rivera',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'The 3D Virtual Try-on predicted the exact fit size L! Premium heavy cotton feel.',
    date: 'Aug 04, 2026',
    verified: true,
    status: 'Approved',
    adminReply: 'Thanks Alex! We take pride in accurate AI fit recommendations.'
  },
  {
    id: 'rev-2',
    productId: 'prod-2',
    productTitle: 'Elysian Neo Runner Sneakers',
    productImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200',
    userName: 'Sophia Chen',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'Unbelievably comfortable sole cushioning. Fast express delivery too.',
    date: 'Aug 06, 2026',
    verified: true,
    status: 'Approved'
  },
  {
    id: 'rev-3',
    productId: 'prod-3',
    productTitle: 'Kuro Techwear Cargo Pants',
    productImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=200',
    userName: 'Rohan Sharma',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 4,
    comment: 'Water resistant straps are awesome. Fits slightly snug around thighs.',
    date: 'Aug 08, 2026',
    verified: true,
    status: 'Pending'
  }
];

export const INITIAL_ADMIN_COUPONS: AdminCoupon[] = [
  {
    id: 'coup-1',
    code: 'STYLESMRT20',
    discountPercent: 20,
    maxDiscountAmount: 1000,
    minOrderAmount: 1500,
    description: 'Get 20% OFF on orders over ₹1,500',
    expiryDate: '2026-12-31',
    usageCount: 342,
    maxUsageLimit: 1000,
    status: 'Active'
  },
  {
    id: 'coup-2',
    code: 'VIPEXCLUSIVE25',
    discountPercent: 25,
    maxDiscountAmount: 2000,
    minOrderAmount: 3000,
    description: '25% OFF for VIP Style Club members',
    expiryDate: '2026-09-30',
    usageCount: 118,
    maxUsageLimit: 500,
    status: 'Active'
  },
  {
    id: 'coup-3',
    code: 'WELCOME100',
    discountPercent: 15,
    maxDiscountAmount: 500,
    minOrderAmount: 999,
    description: 'First order 15% discount bonus',
    expiryDate: '2026-11-15',
    usageCount: 890,
    maxUsageLimit: 2000,
    status: 'Active'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-101',
    adminName: 'Elena Rostova',
    action: 'Updated price & stock count for "AURA Cyber Hoodie"',
    category: 'PRODUCT',
    timestamp: '2026-08-09 02:45 PM',
    ipAddress: '192.168.1.42'
  },
  {
    id: 'log-102',
    adminName: 'Elena Rostova',
    action: 'Approved customer review #rev-3',
    category: 'CUSTOMER',
    timestamp: '2026-08-09 01:12 PM',
    ipAddress: '192.168.1.42'
  },
  {
    id: 'log-103',
    adminName: 'Marcus Vance',
    action: 'Dispatched order #ORD-2026-8802 via BlueDart',
    category: 'ORDER',
    timestamp: '2026-08-08 11:30 AM',
    ipAddress: '192.168.1.88'
  },
  {
    id: 'log-104',
    adminName: 'Elena Rostova',
    action: 'Created new discount coupon code "VIPEXCLUSIVE25"',
    category: 'COUPON',
    timestamp: '2026-08-07 04:20 PM',
    ipAddress: '192.168.1.42'
  }
];

export const INITIAL_SEARCH_ANALYTICS: SearchAnalytic[] = [
  { id: 'sa-1', query: 'oversized hoodie streetwear', count: 1240, conversionRate: 18.2, zeroResults: false },
  { id: 'sa-2', query: 'black neo runner sneakers', count: 890, conversionRate: 24.5, zeroResults: false },
  { id: 'sa-3', query: 'waterproof cargo pants', count: 650, conversionRate: 14.8, zeroResults: false },
  { id: 'sa-4', query: 'linen summer shirts', count: 420, conversionRate: 12.1, zeroResults: false },
  { id: 'sa-5', query: 'cyberpunk trench coat', count: 310, conversionRate: 0.0, zeroResults: true }
];

export const INITIAL_ADMIN_NOTIFICATIONS: AdminNotification[] = [
  {
    id: 'notif-1',
    title: 'Low Stock Alert',
    message: 'AURA Minimal Denim Jacket has only 4 items left in stock.',
    type: 'stock',
    timestamp: '10m ago',
    read: false
  },
  {
    id: 'notif-2',
    title: 'New High Value Order',
    message: 'Order #ORD-2026-9901 worth ₹18,499 placed by Sophia Chen.',
    type: 'order',
    timestamp: '1h ago',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Review Moderation Required',
    message: '1 new review waiting for approval.',
    type: 'review',
    timestamp: '3h ago',
    read: true
  }
];
