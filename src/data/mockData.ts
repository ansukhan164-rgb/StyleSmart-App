import { Category, Coupon, LookbookItem, RecommendationPreference, Review, UserProfile } from '../types';

export const CATEGORIES: Category[] = [
  'Men',
  'Women',
  'Kids',
  'Beauty',
  'Footwear',
  'Accessories',
  'Home & Lifestyle',
  'New Arrivals',
  'Deals'
];

export const BRANDS = [
  'AURA Studio',
  'Kuro Streetwear',
  'Solstice Minimal',
  'Verve Luxe',
  'Elysian Footwear',
  'Velvet & Vine',
  'Zenith Active',
  'Urban Thread',
  'Chronos',
  'GlowRx Beauty',
  'Maison Parfums',
  'Solstice Living',
  'Little Stars'
];

export const STYLES = [
  'Streetwear',
  'Minimalist',
  'Casual',
  'Luxury',
  'Athleisure',
  'Bohemian',
  'Formal'
];

export const INITIAL_USER_PREFERENCES: RecommendationPreference = {
  preferredCategories: ['Men', 'Footwear', 'Accessories'],
  preferredSubCategories: ['Hoodies & Sweatshirts', 'Sneakers', 'Trousers & Chinos', 'Watches'],
  favoriteBrands: ['AURA Studio', 'Kuro Streetwear', 'Elysian Footwear'],
  preferredStyles: ['Streetwear', 'Minimalist'],
  preferredColors: ['#18181b', '#657153', '#f8fafc'],
  budgetMin: 1000,
  budgetMax: 5000,
  genderPreference: 'Men',
  sizePreferences: {
    tops: 'L',
    bottoms: '32',
    shoes: 'UK 9'
  }
};

export const INITIAL_USER: UserProfile = {
  id: 'user-1',
  name: 'Alex Rivera',
  email: 'alex.rivera@stylesmart.ai',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
  role: 'customer',
  preferences: INITIAL_USER_PREFERENCES,
  styleScore: 88,
  styleArchetype: 'Urban Street Minimalist',
  savedAddresses: [
    {
      id: 'addr-1',
      name: 'Alex Rivera',
      phone: '+91 98765 43210',
      street: '402 Skyline Towers, MG Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
      isDefault: true
    }
  ],
  createdAt: '2026-01-01'
};

export const MOCK_COUPONS: Coupon[] = [
  {
    code: 'STYLESMRT20',
    discountPercent: 20,
    maxDiscountAmount: 1000,
    minOrderAmount: 1500,
    description: 'Get 20% OFF on your order over ₹1,500'
  },
  {
    code: 'FIRST100',
    discountPercent: 25,
    maxDiscountAmount: 750,
    minOrderAmount: 1000,
    description: '25% OFF Welcome Bonus for new users'
  },
  {
    code: 'AIFESTIVE30',
    discountPercent: 30,
    maxDiscountAmount: 2000,
    minOrderAmount: 3000,
    description: '30% OFF AI Style Festival Special'
  }
];

export const MOCK_LOOKBOOKS: LookbookItem[] = [
  {
    id: 'lb-1',
    title: 'Cyberpunk Tokyo Night Out',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=800',
    likes: 1240,
    author: 'Kuro Studio',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    styleTag: 'Streetwear',
    taggedProductIds: ['prod-1', 'prod-2', 'prod-5']
  },
  {
    id: 'lb-2',
    title: 'Minimalist Resort Chic',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    likes: 980,
    author: 'Elena Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    styleTag: 'Minimalist',
    taggedProductIds: ['prod-3', 'prod-10', 'prod-17']
  },
  {
    id: 'lb-3',
    title: 'High-Society Gala Night',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800',
    likes: 2100,
    author: 'Verve Atelier',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    styleTag: 'Luxury',
    taggedProductIds: ['prod-4', 'prod-9', 'prod-12']
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    userId: 'u-101',
    userName: 'Rohan Sharma',
    rating: 5,
    comment: 'The French Terry cotton weight is insane! Super soft, fits boxy and oversized exactly like high-end designer hoodies. Worth every rupee.',
    date: '2026-02-01',
    verifiedPurchase: true,
    helpfulCount: 42
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    userId: 'u-102',
    userName: 'Priya Nair',
    rating: 5,
    comment: 'Bought this for my husband based on AI recommendations. The sage green is even better in person!',
    date: '2026-01-28',
    verifiedPurchase: true,
    helpfulCount: 19
  },
  {
    id: 'rev-3',
    productId: 'prod-5',
    userId: 'u-103',
    userName: 'David K.',
    rating: 5,
    comment: 'Most comfortable chunky sneakers I have owned. The memory foam insole is like walking on clouds.',
    date: '2026-02-04',
    verifiedPurchase: true,
    helpfulCount: 31
  }
];
