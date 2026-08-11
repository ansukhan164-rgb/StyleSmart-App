export type AdminRoute = 
  | 'login'
  | 'dashboard'
  | 'products'
  | 'categories'
  | 'brands'
  | 'inventory'
  | 'orders'
  | 'customers'
  | 'reviews'
  | 'coupons'
  | 'analytics'
  | 'recommendations'
  | 'branding'
  | 'settings';

export interface AdminBranding {
  portalName: string;
  portalSubtitle: string;
  portalLogo: string;
  faviconUrl: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  username: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  avatar: string;
  lastLoginAt: string;
  permissions: string[];
}

export interface CategoryDetail {
  id: string;
  name: string;
  subCategories: string[];
  productCount: number;
  imageUrl: string;
  icon: string;
  status: 'Active' | 'Hidden';
}

export interface BrandDetail {
  id: string;
  name: string;
  logoUrl: string;
  productCount: number;
  status: 'Featured' | 'Active' | 'Inactive';
  description: string;
}

export interface CustomerDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  totalOrders: number;
  totalSpent: number;
  styleArchetype: string;
  status: 'Active' | 'Blocked';
  joinedDate: string;
}

export interface AdminReview {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  status: 'Approved' | 'Pending' | 'Flagged';
  adminReply?: string;
}

export interface AdminCoupon {
  id: string;
  code: string;
  discountPercent: number;
  maxDiscountAmount: number;
  minOrderAmount: number;
  description: string;
  expiryDate: string;
  usageCount: number;
  maxUsageLimit: number;
  status: 'Active' | 'Expired' | 'Disabled';
}

export interface AuditLog {
  id: string;
  adminName: string;
  action: string;
  category: 'PRODUCT' | 'ORDER' | 'AUTH' | 'SETTINGS' | 'COUPON' | 'CUSTOMER';
  timestamp: string;
  ipAddress: string;
}

export interface SearchAnalytic {
  id: string;
  query: string;
  count: number;
  conversionRate: number;
  zeroResults: boolean;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'stock' | 'review' | 'security' | 'system';
  timestamp: string;
  read: boolean;
}
