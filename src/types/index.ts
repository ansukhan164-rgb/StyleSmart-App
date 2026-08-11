export type Gender = 'Men' | 'Women' | 'Kids' | 'Girls' | 'Boys' | 'Unisex' | 'Home';

export type Category = 
  | 'Men' 
  | 'Women' 
  | 'Kids' 
  | 'Beauty' 
  | 'Footwear' 
  | 'Accessories' 
  | 'Home & Lifestyle'
  | 'Home'
  | 'New Arrivals'
  | 'Deals';

export type SubCategory =
  | 'T-Shirts & Tops'
  | 'Shirts'
  | 'Jeans & Denim'
  | 'Trousers & Chinos'
  | 'Dresses & Jumpsuits'
  | 'Ethnic & Festive Wear'
  | 'Jackets & Coats'
  | 'Hoodies & Sweatshirts'
  | 'Sneakers'
  | 'Formal Shoes'
  | 'Sandals & Slides'
  | 'Bags & Backpacks'
  | 'Watches'
  | 'Sunglasses'
  | 'Skincare & Makeup'
  | 'Fragrances'
  | 'Beauty & Skincare'
  | 'Home Decor'
  | 'Home & Living'
  | 'Kids & Baby';

export type FashionStyle = 
  | 'Casual' 
  | 'Streetwear' 
  | 'Formal' 
  | 'Minimalist' 
  | 'Ethnic' 
  | 'Activewear' 
  | 'Luxury' 
  | 'Boho'
  | 'Skincare'
  | 'Beauty'
  | 'Beauty Tool'
  | 'Home Fragrance'
  | 'Luxury Gift'
  | 'Accessories'
  | 'Travel'
  | 'Toy';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface SizeGuide {
  size: string;
  chestOrBust: string;
  waist: string;
  hip: string;
  length: string;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: Category;
  subCategory: SubCategory;
  gender: Gender;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  sizeGuide?: SizeGuide[];
  material: string;
  style: FashionStyle;
  inStock: boolean;
  stockCount: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isLimitedDeal?: boolean;
  dealEndsAt?: string;
  tags: string[];
  features: string[];
  specifications: Record<string, string>;
  compatibilityTags: string[]; // e.g. ["shoes_white_sneakers", "bottom_denim_jeans"]
  viewsCount: number;
  purchasesCount: number;
  createdAt: string;
}

export interface UserInteraction {
  id: string;
  userId: string;
  productId: string;
  eventType: 'view' | 'click' | 'wishlist' | 'cart' | 'purchase' | 'rating';
  timestamp: number;
  durationSeconds?: number;
}

export interface RecommendationPreference {
  preferredCategories: Category[];
  preferredSubCategories: SubCategory[];
  favoriteBrands: string[];
  preferredStyles: FashionStyle[];
  preferredColors: string[];
  budgetMin: number;
  budgetMax: number;
  genderPreference: Gender;
  sizePreferences: {
    tops?: string;
    bottoms?: string;
    shoes?: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dob?: string;
  gender?: Gender;
  avatar: string;
  role: 'customer' | 'admin';
  preferences: RecommendationPreference;
  styleScore: number;
  styleArchetype: string;
  savedAddresses: Address[];
  savedForLater?: CartItem[];
  createdAt: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  type?: 'Home' | 'Work' | 'Other';
  isDefault?: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscountAmount: number;
  minOrderAmount: number;
  description: string;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  productId: string;
  itemTitle: string;
  itemColorHex: string;
  itemColorName?: string;
  itemSize: string;
  itemImage?: string;
  reason: string;
  details?: string;
  requestedAction: 'return_refund' | 'exchange_size';
  exchangeSize?: string;
  refundPreference: 'store_credit' | 'original_payment';
  pickupAddress: Address;
  pickupDate: string;
  pickupTimeSlot: string;
  status: 'Initiated' | 'Pickup Scheduled' | 'In Transit to Hub' | 'Inspected & Approved' | 'Refund Processed' | 'Completed';
  createdAt: string;
  refundAmount: number;
}

export interface OrderTrackingStep {
  title: string;
  description: string;
  timestamp: string;
  location?: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  shippingAddress: Address;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  taxAmount: number;
  totalAmount: number;
  couponCode?: string;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled' | 'Return Requested' | 'Returned';
  createdAt: string;
  estimatedDeliveryDate: string;
  trackingNumber: string;
  courierPartner?: string;
  deliveryAgent?: {
    name: string;
    phone: string;
    vehicleNumber: string;
    deliveryPin: string;
  };
  trackingSteps?: OrderTrackingStep[];
  returnRequests?: ReturnRequest[];
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  images?: string[];
  helpfulCount: number;
}

export interface RecommendationResult {
  product: Product;
  score: number; // 0 to 100
  confidenceLabel: string; // e.g., "98% Match"
  reasons: string[]; // e.g. ["Matches your Casual Streetwear preference", "Fits your ₹1,500 - ₹3,000 budget"]
  recommendationType: 
    | 'personalized' 
    | 'because_viewed' 
    | 'similar' 
    | 'complete_look' 
    | 'trending' 
    | 'best_style_match' 
    | 'frequently_bought';
}

export interface LookbookItem {
  id: string;
  title: string;
  image: string;
  likes: number;
  author: string;
  authorAvatar: string;
  styleTag: string;
  taggedProductIds: string[];
}

export interface VisualSearchResult {
  detectedAttributes: {
    itemType: string;
    color: string;
    pattern: string;
    style: string;
  };
  matchedProducts: {
    product: Product;
    similarityScore: number;
  }[];
}

export interface OutfitSuggestion {
  id: string;
  title: string;
  description: string;
  occasion: string;
  totalPrice: number;
  compatibilityScore: number;
  top?: Product;
  bottom?: Product;
  footwear?: Product;
  accessory?: Product;
  styleAdvice: string;
}

export interface FilterState {
  category?: Category;
  subCategories: SubCategory[];
  gender?: Gender;
  brands: string[];
  styles: FashionStyle[];
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
  minRating: number;
  discountMin: number;
  inStockOnly: boolean;
  searchQuery: string;
  sortBy: 'relevance' | 'price_low_high' | 'price_high_low' | 'rating' | 'newest' | 'discount' | 'ai_score';
}
