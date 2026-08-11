import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Address,
  CartItem,
  Coupon,
  FilterState,
  Order,
  Product,
  RecommendationPreference,
  ReturnRequest,
  UserProfile
} from '../types';
import {
  AdminRoute,
  AdminUser,
  CategoryDetail,
  BrandDetail,
  CustomerDetail,
  AdminReview,
  AdminCoupon,
  AuditLog,
  AdminNotification,
  AdminBranding
} from '../types/admin';
import { INITIAL_USER, MOCK_COUPONS } from '../data/mockData';
import { INITIAL_PRODUCTS } from '../data/mockProducts';
import { INITIAL_ORDERS } from '../data/mockOrders';
import {
  INITIAL_CATEGORIES,
  INITIAL_BRANDS,
  INITIAL_CUSTOMERS,
  INITIAL_REVIEWS,
  INITIAL_ADMIN_COUPONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_ADMIN_NOTIFICATIONS
} from '../data/mockAdminData';
import { adminAuthService } from '../services/adminAuthService';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export type ViewType = 
  | 'home' 
  | 'shop' 
  | 'pdp' 
  | 'cart' 
  | 'checkout' 
  | 'profile' 
  | 'admin' 
  | 'outfit-builder' 
  | 'auth' 
  | 'tracking'
  | 'admin-login'
  | 'admin-dashboard'
  | 'admin-products'
  | 'admin-categories'
  | 'admin-brands'
  | 'admin-inventory'
  | 'admin-orders'
  | 'admin-customers'
  | 'admin-reviews'
  | 'admin-coupons'
  | 'admin-analytics'
  | 'admin-recommendations'
  | 'admin-settings';

interface AppContextType {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Products & Search Filters
  products: Product[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  // Admin Product Management
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateInventory: (productId: string, newStock: number) => void;

  // Cart & Buy Now
  cart: CartItem[];
  savedForLater: CartItem[];
  addToCart: (product: Product, selectedColor?: any, selectedSize?: string, quantity?: number) => void;
  buyNow: (product: Product, selectedColor?: any, selectedSize?: string, quantity?: number) => void;
  removeFromCart: (productId: string, selectedColorHex: string, selectedSize: string) => void;
  updateCartQuantity: (productId: string, selectedColorHex: string, selectedSize: string, delta: number) => void;
  saveForLater: (item: CartItem) => void;
  moveToCartFromSaved: (item: CartItem) => void;
  removeFromSavedForLater: (productId: string, selectedColorHex: string, selectedSize: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Compare & Recently Viewed
  compareList: Product[];
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;

  // User & Personalization & Address Management
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLogged: boolean) => void;
  handleSignInClick: () => void;
  logout: () => void;
  updatePreferences: (newPrefs: Partial<RecommendationPreference>) => void;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  changePassword: (oldPass: string, newPass: string) => Promise<{ success: boolean; message: string }>;
  addAddress: (addr: Omit<Address, 'id'>) => Promise<void>;
  updateAddress: (addr: Address) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
  setDefaultAddress: (addressId: string) => Promise<void>;

  // Orders & Returns
  orders: Order[];
  addOrder: (order: Order) => void;
  placeOrder: (payload: { shippingAddress: Address; paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD' }) => Promise<Order | null>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  submitReturnRequest: (request: ReturnRequest) => void;

  // Active View & Modals
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;

  // ADMIN PORTAL STATE & ACTIONS
  adminUser: AdminUser | null;
  isAdminLoggedIn: boolean;
  adminRoute: AdminRoute;
  setAdminRoute: (route: AdminRoute) => void;
  adminLogin: (identifier: string, pass: string, remember?: boolean) => Promise<void>;
  adminLogout: () => void;
  updateAdminAvatar: (avatarUrl: string) => void;
  updateAdminProfile: (name: string, email: string) => void;
  adminBranding: AdminBranding;
  updateAdminBranding: (branding: AdminBranding) => void;
  
  categories: CategoryDetail[];
  addCategory: (cat: CategoryDetail) => void;
  updateCategory: (cat: CategoryDetail) => void;
  deleteCategory: (catId: string) => void;

  brands: BrandDetail[];
  addBrand: (brand: BrandDetail) => void;
  updateBrand: (brand: BrandDetail) => void;
  deleteBrand: (brandId: string) => void;

  customers: CustomerDetail[];
  updateCustomerStatus: (customerId: string, status: 'Active' | 'Blocked') => void;

  adminReviews: AdminReview[];
  updateReviewStatus: (reviewId: string, status: 'Approved' | 'Pending' | 'Flagged') => void;
  addReviewReply: (reviewId: string, reply: string) => void;
  deleteReview: (reviewId: string) => void;

  adminCoupons: AdminCoupon[];
  addCoupon: (coupon: AdminCoupon) => void;
  updateCoupon: (coupon: AdminCoupon) => void;
  deleteCoupon: (couponId: string) => void;

  auditLogs: AuditLog[];
  adminNotifications: AdminNotification[];
  markNotificationRead: (id: string) => void;

  // Modals state
  isAIAssistantOpen: boolean;
  setIsAIAssistantOpen: (open: boolean) => void;
  isVisualSearchOpen: boolean;
  setIsVisualSearchOpen: (open: boolean) => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Outfit Studio Integration
  activeOutfitItems: Product[];
  setActiveOutfitItems: React.Dispatch<React.SetStateAction<Product[]>>;
  loadOutfitIntoStudio: (items: Product[]) => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const DEFAULT_FILTER_STATE: FilterState = {
  subCategories: [],
  brands: [],
  styles: [],
  colors: [],
  sizes: [],
  priceRange: [0, 15000],
  minRating: 0,
  discountMin: 0,
  inStockOnly: false,
  searchQuery: '',
  sortBy: 'relevance'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTER_STATE);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedForLater, setSavedForLater] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [wishlist, setWishlist] = useState<Product[]>([INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[3]]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[1]]);

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('stylesmart_user');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.warn('Failed to restore user from localStorage:', err);
    }
    return INITIAL_USER;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('stylesmart_is_logged_in');
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.warn('Failed to restore isLoggedIn from localStorage:', err);
    }
    return false;
  });

  useEffect(() => {
    try {
      localStorage.setItem('stylesmart_user', JSON.stringify(user));
    } catch (err) {
      console.warn('Failed to save user to localStorage:', err);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('stylesmart_is_logged_in', JSON.stringify(isLoggedIn));
    } catch (err) {
      console.warn('Failed to save isLoggedIn to localStorage:', err);
    }
  }, [isLoggedIn]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // ADMIN PORTAL STATES
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => adminAuthService.getStoredAdmin());
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => adminAuthService.isAuthenticated());
  const [adminRoute, setAdminRouteState] = useState<AdminRoute>('dashboard');

  const [adminBranding, setAdminBranding] = useState<AdminBranding>(() => {
    try {
      const saved = localStorage.getItem('stylesmart_admin_branding');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      portalName: 'Ansar Khan',
      portalSubtitle: 'ADMIN CONSOLE',
      portalLogo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      faviconUrl: ''
    };
  });

  useEffect(() => {
    try {
      if (adminBranding.portalName) {
        document.title = `${adminBranding.portalName} Admin Portal`;
      }
      if (adminBranding.faviconUrl) {
        let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.head.appendChild(link);
        }
        link.href = adminBranding.faviconUrl;
      }
    } catch {}
  }, [adminBranding]);

  const [categories, setCategories] = useState<CategoryDetail[]>(INITIAL_CATEGORIES);
  const [brands, setBrands] = useState<BrandDetail[]>(INITIAL_BRANDS);
  const [customers, setCustomers] = useState<CustomerDetail[]>(INITIAL_CUSTOMERS);
  const [adminReviews, setAdminReviews] = useState<AdminReview[]>(INITIAL_REVIEWS);
  const [adminCoupons, setAdminCoupons] = useState<AdminCoupon[]>(INITIAL_ADMIN_COUPONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [adminNotifications, setAdminNotifications] = useState<AdminNotification[]>(INITIAL_ADMIN_NOTIFICATIONS);

  const [currentView, setCurrentViewState] = useState<ViewType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [activeOutfitItems, setActiveOutfitItems] = useState<Product[]>([]);
  const loadOutfitIntoStudio = (items: Product[]) => {
    setActiveOutfitItems(items);
    showToast(`Loaded ${items.length} items into Outfit Studio!`, 'success');
  };

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync window.location.pathname with view state
  const setCurrentView = (view: ViewType) => {
    setCurrentViewState(view);

    // Map view to path
    let path = '/';
    if (view === 'shop') path = '/products';
    else if (view === 'pdp' && selectedProductId) path = `/product/${selectedProductId}`;
    else if (view === 'cart') path = '/cart';
    else if (view === 'checkout') path = '/checkout';
    else if (view === 'profile') path = '/profile';
    else if (view === 'auth') path = '/login';
    else if (view === 'tracking') path = '/orders';
    else if (view === 'outfit-builder') path = '/ai-stylist';
    else if (view === 'admin-login') path = '/admin/login';
    else if (view.startsWith('admin-')) {
      const sub = view.replace('admin-', '');
      path = `/admin/${sub}`;
    }

    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  };

  const setAdminRoute = (route: AdminRoute) => {
    setAdminRouteState(route);
    if (!adminAuthService.isAuthenticated() && route !== 'login') {
      setCurrentView('admin-login');
    } else {
      setCurrentView(`admin-${route}` as ViewType);
    }
  };

  // Initial URL Router listener
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;

      if (path.startsWith('/admin')) {
        const sub = path.replace('/admin', '').replace('/', '') as AdminRoute;
        const targetRoute: AdminRoute = sub || 'dashboard';

        if (!adminAuthService.isAuthenticated()) {
          setAdminRouteState('login');
          setCurrentViewState('admin-login');
        } else {
          setAdminRouteState(targetRoute === ('login' as any) ? 'dashboard' : targetRoute);
          setCurrentViewState(`admin-${targetRoute === ('login' as any) ? 'dashboard' : targetRoute}` as ViewType);
        }
      } else if (path === '/login' || path === '/register') {
        setCurrentViewState('auth');
      } else if (path === '/products' || path === '/shop') {
        setCurrentViewState('shop');
      } else if (path.startsWith('/product/')) {
        const prodId = path.split('/product/')[1];
        if (prodId) setSelectedProductId(prodId);
        setCurrentViewState('pdp');
      } else if (path === '/cart') {
        setCurrentViewState('cart');
      } else if (path === '/checkout') {
        setCurrentViewState('checkout');
      } else if (path === '/profile' || path === '/wishlist') {
        setCurrentViewState('profile');
      } else if (path === '/orders') {
        setCurrentViewState('tracking');
      } else if (path === '/ai-stylist') {
        setCurrentViewState('outfit-builder');
      } else {
        setCurrentViewState('home');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // ADMIN AUTHENTICATION METHODS
  const adminLogin = async (identifier: string, pass: string, remember = true) => {
    const { user: authUser } = await adminAuthService.login(identifier, pass, remember);
    setAdminUser(authUser);
    setIsAdminLoggedIn(true);

    // Record Audit Log
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      adminName: authUser.name,
      action: `Admin logged in successfully (${authUser.role})`,
      category: 'AUTH',
      timestamp: new Date().toLocaleString(),
      ipAddress: '192.168.1.10'
    };
    setAuditLogs(prev => [newLog, ...prev]);

    showToast(`Welcome to Admin Control Center, ${authUser.name}!`);
    setAdminRoute('dashboard');
  };

  const adminLogout = () => {
    adminAuthService.logout();
    setAdminUser(null);
    setIsAdminLoggedIn(false);
    showToast('Admin session logged out safely.', 'info');
    setCurrentView('admin-login');
  };

  const updateAdminAvatar = (avatarUrl: string) => {
    const updated = adminAuthService.updateAvatar(avatarUrl);
    if (updated) {
      setAdminUser(updated);
      showToast('Admin profile image updated successfully.');
    }
  };

  const updateAdminProfile = (name: string, email: string) => {
    const updated = adminAuthService.updateProfile(name, email);
    if (updated) {
      setAdminUser(updated);
      showToast('Admin profile name and email updated successfully.');
    }
  };

  const updateAdminBranding = (newBranding: AdminBranding) => {
    setAdminBranding(newBranding);
    try {
      localStorage.setItem('stylesmart_admin_branding', JSON.stringify(newBranding));
    } catch {}
    showToast('Admin branding updated successfully!');
  };

  // CATEGORY MANAGEMENT
  const addCategory = (cat: CategoryDetail) => {
    setCategories(prev => [cat, ...prev]);
    showToast(`Category "${cat.name}" added successfully.`);
  };

  const updateCategory = (cat: CategoryDetail) => {
    setCategories(prev => prev.map(c => (c.id === cat.id ? cat : c)));
    showToast(`Category "${cat.name}" updated.`);
  };

  const deleteCategory = (catId: string) => {
    setCategories(prev => prev.filter(c => c.id !== catId));
    showToast('Category deleted.', 'warning');
  };

  // BRAND MANAGEMENT
  const addBrand = (brand: BrandDetail) => {
    setBrands(prev => [brand, ...prev]);
    showToast(`Brand "${brand.name}" added.`);
  };

  const updateBrand = (brand: BrandDetail) => {
    setBrands(prev => prev.map(b => (b.id === brand.id ? brand : b)));
    showToast(`Brand "${brand.name}" updated.`);
  };

  const deleteBrand = (brandId: string) => {
    setBrands(prev => prev.filter(b => b.id !== brandId));
    showToast('Brand deleted.', 'warning');
  };

  // CUSTOMER MANAGEMENT
  const updateCustomerStatus = (customerId: string, status: 'Active' | 'Blocked') => {
    setCustomers(prev => prev.map(c => (c.id === customerId ? { ...c, status } : c)));
    showToast(`Customer status updated to ${status}`);
  };

  // REVIEWS MODERATION
  const updateReviewStatus = (reviewId: string, status: 'Approved' | 'Pending' | 'Flagged') => {
    setAdminReviews(prev => prev.map(r => (r.id === reviewId ? { ...r, status } : r)));
    showToast(`Review status updated to ${status}`);
  };

  const addReviewReply = (reviewId: string, reply: string) => {
    setAdminReviews(prev => prev.map(r => (r.id === reviewId ? { ...r, adminReply: reply } : r)));
    showToast('Reply published to review.');
  };

  const deleteReview = (reviewId: string) => {
    setAdminReviews(prev => prev.filter(r => r.id !== reviewId));
    showToast('Review removed.', 'warning');
  };

  // COUPON MANAGEMENT
  const addCoupon = (coupon: AdminCoupon) => {
    setAdminCoupons(prev => [coupon, ...prev]);
    showToast(`Coupon code "${coupon.code}" created.`);
  };

  const updateCoupon = (coupon: AdminCoupon) => {
    setAdminCoupons(prev => prev.map(c => (c.id === coupon.id ? coupon : c)));
    showToast(`Coupon "${coupon.code}" updated.`);
  };

  const deleteCoupon = (couponId: string) => {
    setAdminCoupons(prev => prev.filter(c => c.id !== couponId));
    showToast('Coupon code deleted.', 'warning');
  };

  const markNotificationRead = (id: string) => {
    setAdminNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  // PRODUCT ACTIONS
  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
    showToast(`Product "${product.title}" added to inventory.`);
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => (p.id === product.id ? product : p)));
    showToast(`Product "${product.title}" updated successfully.`);
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Product removed from catalog.', 'warning');
  };

  const updateInventory = (productId: string, newStock: number) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, stockCount: newStock, inStock: newStock > 0 } : p
      )
    );
    showToast(`Stock updated to ${newStock} units.`);
  };

  // CART & CHECKOUT
  const addToCart = (product: Product, selectedColor = product.colors[0], selectedSize = product.sizes[0] || 'M', quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(
        i => i.product.id === product.id && i.selectedColor.hex === selectedColor.hex && i.selectedSize === selectedSize
      );
      if (existing) {
        return prev.map(i =>
          i === existing ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, selectedColor, selectedSize, quantity }];
    });
    showToast(`Added ${product.title} to bag!`);
  };

  const buyNow = (product: Product, selectedColor = product.colors[0], selectedSize = product.sizes[0] || 'M', quantity = 1) => {
    // Add or ensure item is in cart
    setCart(prev => {
      const existing = prev.find(
        i => i.product.id === product.id && i.selectedColor.hex === selectedColor.hex && i.selectedSize === selectedSize
      );
      if (existing) {
        return prev;
      }
      return [{ product, selectedColor, selectedSize, quantity }];
    });

    if (!isLoggedIn) {
      showToast('Please sign in to complete your instant checkout.', 'info');
      setCurrentView('auth');
    } else {
      setCurrentView('checkout');
    }
  };

  const saveForLater = (item: CartItem) => {
    removeFromCart(item.product.id, item.selectedColor.hex, item.selectedSize);
    setSavedForLater(prev => [...prev, item]);
    showToast(`Saved "${item.product.title}" for later.`);
  };

  const moveToCartFromSaved = (item: CartItem) => {
    setSavedForLater(prev =>
      prev.filter(
        i => !(i.product.id === item.product.id && i.selectedColor.hex === item.selectedColor.hex && i.selectedSize === item.selectedSize)
      )
    );
    addToCart(item.product, item.selectedColor, item.selectedSize, item.quantity);
  };

  const removeFromSavedForLater = (productId: string, selectedColorHex: string, selectedSize: string) => {
    setSavedForLater(prev =>
      prev.filter(
        i => !(i.product.id === productId && i.selectedColor.hex === selectedColorHex && i.selectedSize === selectedSize)
      )
    );
    showToast('Removed item from saved list.', 'info');
  };

  const removeFromCart = (productId: string, selectedColorHex: string, selectedSize: string) => {
    setCart(prev =>
      prev.filter(
        i => !(i.product.id === productId && i.selectedColor.hex === selectedColorHex && i.selectedSize === selectedSize)
      )
    );
    showToast('Item removed from cart.', 'info');
  };

  const updateCartQuantity = (productId: string, selectedColorHex: string, selectedSize: string, delta: number) => {
    setCart(prev =>
      prev
        .map(i => {
          if (i.product.id === productId && i.selectedColor.hex === selectedColorHex && i.selectedSize === selectedSize) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartDiscount = appliedCoupon
    ? Math.min((cartSubtotal * appliedCoupon.discountPercent) / 100, appliedCoupon.maxDiscountAmount)
    : 0;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = MOCK_COUPONS.find(c => c.code === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid or expired promo code.' };
    }
    if (cartSubtotal < found.minOrderAmount) {
      return { success: false, message: `Minimum cart value of ₹${found.minOrderAmount} required for this code.` };
    }
    setAppliedCoupon(found);
    showToast(`Applied ${found.code}! Saved ₹${Math.round((cartSubtotal * found.discountPercent) / 100)}`);
    return { success: true, message: `Promo code ${found.code} applied!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon code removed.');
  };

  // USER PROFILE & ADDRESS MANAGEMENT
  const updateUserProfile = async (data: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...data }));
    try {
      await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.warn('API profile update fallback:', err);
    }
    showToast('Profile details updated successfully!');
  };

  const changePassword = async (oldPass: string, newPass: string) => {
    if (!newPass || newPass.length < 6) {
      return { success: false, message: 'New password must be at least 6 characters long.' };
    }
    try {
      const res = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: oldPass, newPassword: newPass })
      });
      if (res.ok) {
        showToast('Password updated securely!');
        return { success: true, message: 'Password changed successfully!' };
      }
    } catch (err) {
      console.warn('API change password fallback:', err);
    }
    showToast('Password updated securely!');
    return { success: true, message: 'Password updated successfully!' };
  };

  const addAddress = async (addrData: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      ...addrData
    };
    setUser(prev => {
      let saved = [...(prev.savedAddresses || [])];
      if (newAddr.isDefault) {
        saved = saved.map(a => ({ ...a, isDefault: false }));
      }
      return { ...prev, savedAddresses: [newAddr, ...saved] };
    });
    try {
      await fetch('/api/user/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addrData)
      });
    } catch (err) {
      console.warn('API add address fallback:', err);
    }
    showToast('New address saved!');
  };

  const updateAddress = async (addr: Address) => {
    setUser(prev => {
      let saved = (prev.savedAddresses || []).map(a => (a.id === addr.id ? addr : a));
      if (addr.isDefault) {
        saved = saved.map(a => ({ ...a, isDefault: a.id === addr.id }));
      }
      return { ...prev, savedAddresses: saved };
    });
    try {
      await fetch(`/api/user/addresses/${addr.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addr)
      });
    } catch (err) {
      console.warn('API update address fallback:', err);
    }
    showToast('Address details updated.');
  };

  const deleteAddress = async (addressId: string) => {
    setUser(prev => ({
      ...prev,
      savedAddresses: (prev.savedAddresses || []).filter(a => a.id !== addressId)
    }));
    try {
      await fetch(`/api/user/addresses/${addressId}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('API delete address fallback:', err);
    }
    showToast('Address removed.', 'info');
  };

  const setDefaultAddress = async (addressId: string) => {
    setUser(prev => ({
      ...prev,
      savedAddresses: (prev.savedAddresses || []).map(a => ({ ...a, isDefault: a.id === addressId }))
    }));
    try {
      await fetch(`/api/user/addresses/${addressId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDefault: true })
      });
    } catch (err) {
      console.warn('API set default address fallback:', err);
    }
    showToast('Default address updated!');
  };

  // ORDER CREATION & STATUS SYNC
  const placeOrder = async (payload: { shippingAddress: Address; paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD' }): Promise<Order | null> => {
    if (cart.length === 0) {
      showToast('Your shopping bag is empty!', 'warning');
      return null;
    }

    const subtotal = cartSubtotal;
    const discountAmount = cartDiscount;
    const shippingFee = cartTotal > 1500 ? 0 : 99;
    const taxAmount = Math.round((subtotal - discountAmount) * 0.05);
    const totalAmount = subtotal - discountAmount + shippingFee + taxAmount;

    const orderPayload = {
      items: cart,
      shippingAddress: payload.shippingAddress,
      paymentMethod: payload.paymentMethod,
      couponCode: appliedCoupon?.code,
      subtotal,
      discountAmount,
      shippingFee,
      taxAmount,
      totalAmount
    };

    let createdOrder: Order | undefined;
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      if (res.ok) {
        const data = await res.json();
        createdOrder = data.order;
      }
    } catch (err) {
      console.warn('API place order fallback:', err);
    }

    if (!createdOrder) {
      createdOrder = {
        id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        userId: user.id,
        items: cart,
        shippingAddress: payload.shippingAddress,
        paymentMethod: payload.paymentMethod,
        subtotal,
        discountAmount,
        shippingFee,
        taxAmount,
        totalAmount,
        couponCode: appliedCoupon?.code,
        status: 'Confirmed',
        createdAt: new Date().toISOString(),
        estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        trackingNumber: `STST${Math.floor(10000000 + Math.random() * 90000000)}IN`,
        trackingSteps: [
          { title: 'Order Placed', description: 'Order confirmed and sent to fulfillment hub', timestamp: new Date().toLocaleString(), completed: true, current: true },
          { title: 'Processing & Quality Check', description: 'Preparing items and security inspection', timestamp: 'Pending', completed: false },
          { title: 'Shipped', description: 'Handed over to courier partner', timestamp: 'Pending', completed: false },
          { title: 'Out for Delivery', description: 'Agent assigned for final delivery', timestamp: 'Pending', completed: false },
          { title: 'Delivered', description: 'Package delivered to doorstep', timestamp: 'Pending', completed: false }
        ]
      };
    }

    // Deduct stock in client React state
    cart.forEach(item => {
      setProducts(prevProds =>
        prevProds.map(p => {
          if (p.id === item.product.id) {
            const nextStock = Math.max(0, p.stockCount - item.quantity);
            return {
              ...p,
              stockCount: nextStock,
              inStock: nextStock > 0,
              purchasesCount: p.purchasesCount + item.quantity
            };
          }
          return p;
        })
      );
    });

    setOrders(prev => [createdOrder!, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    showToast(`Order #${createdOrder.id} placed successfully!`, 'success');

    return createdOrder;
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status } : o)));
    try {
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (err) {
      console.warn('API order status update fallback:', err);
    }
    showToast(`Order #${orderId} status updated to "${status}"`);
  };

  // WISHLIST & COMPARE
  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast('Removed from Wishlist.', 'info');
        return prev.filter(p => p.id !== product.id);
      }
      showToast('Saved to Wishlist!');
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => wishlist.some(p => p.id === productId);

  const toggleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        showToast('You can compare up to 4 items at a time.', 'warning');
        return prev;
      }
      return [...prev, product];
    });
  };

  const isInCompare = (productId: string) => compareList.some(p => p.id === productId);
  const clearCompare = () => setCompareList([]);

  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  };

  const handleSignInClick = () => {
    if (isLoggedIn) {
      setCurrentView('profile');
    } else {
      setCurrentView('auth');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    showToast('You have been logged out successfully.', 'info');
    setCurrentView('home');
  };

  const updatePreferences = (newPrefs: Partial<RecommendationPreference>) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...newPrefs
      }
    }));
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    clearCart();
  };

  const submitReturnRequest = (request: ReturnRequest) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id === request.orderId) {
          const existingReturns = order.returnRequests || [];
          return {
            ...order,
            status: 'Return Requested',
            returnRequests: [request, ...existingReturns]
          };
        }
        return order;
      })
    );
    showToast(`Return request #${request.id} submitted! Pickup scheduled for ${request.pickupDate}.`);
  };

  const resetFilters = () => {
    setFilterState(DEFAULT_FILTER_STATE);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        products,
        filterState,
        setFilterState,
        resetFilters,
        addProduct,
        updateProduct,
        deleteProduct,
        updateInventory,
        cart,
        savedForLater,
        addToCart,
        buyNow,
        removeFromCart,
        updateCartQuantity,
        saveForLater,
        moveToCartFromSaved,
        removeFromSavedForLater,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        compareList,
        toggleCompare,
        isInCompare,
        clearCompare,
        recentlyViewed,
        addRecentlyViewed,
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        handleSignInClick,
        logout,
        updatePreferences,
        updateUserProfile,
        changePassword,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        orders,
        addOrder,
        placeOrder,
        updateOrderStatus,
        submitReturnRequest,
        currentView,
        setCurrentView,
        selectedProductId,
        setSelectedProductId,

        // ADMIN STATES & ACTIONS
        adminUser,
        isAdminLoggedIn,
        adminRoute,
        setAdminRoute,
        adminLogin,
        adminLogout,
        updateAdminAvatar,
        updateAdminProfile,
        adminBranding,
        updateAdminBranding,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        brands,
        addBrand,
        updateBrand,
        deleteBrand,
        customers,
        updateCustomerStatus,
        adminReviews,
        updateReviewStatus,
        addReviewReply,
        deleteReview,
        adminCoupons,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        auditLogs,
        adminNotifications,
        markNotificationRead,

        isAIAssistantOpen,
        setIsAIAssistantOpen,
        isVisualSearchOpen,
        setIsVisualSearchOpen,
        isCompareOpen,
        setIsCompareOpen,
        quickViewProduct,
        setQuickViewProduct,
        activeOutfitItems,
        setActiveOutfitItems,
        loadOutfitIntoStudio,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
