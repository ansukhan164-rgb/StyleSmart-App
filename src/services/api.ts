import {
  CartItem,
  FilterState,
  Order,
  Product,
  RecommendationResult,
  UserProfile
} from '../types';
import { INITIAL_PRODUCTS } from '../data/mockProducts';
import { INITIAL_USER } from '../data/mockData';
import { StyleSmartRecommendationEngine } from './recommendationEngine';

export async function fetchProducts(filters?: Partial<FilterState>): Promise<{ products: Product[]; totalCount: number }> {
  try {
    const params = new URLSearchParams();
    if (filters?.category && filters.category !== ('All' as any)) params.append('category', filters.category);
    if (filters?.gender && filters.gender !== ('All' as any)) params.append('gender', filters.gender);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.searchQuery) params.append('q', filters.searchQuery);
    if (filters?.priceRange) {
      params.append('minPrice', String(filters.priceRange[0]));
      params.append('maxPrice', String(filters.priceRange[1]));
    }

    const res = await fetch(`/api/products?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      return { products: data.products, totalCount: data.totalCount };
    }
  } catch (err) {
    console.warn('API fetch products fallback:', err);
  }

  // Client-side local fallback filtering
  let result = [...INITIAL_PRODUCTS];
  if (filters?.category && (filters.category as string) !== 'All') {
    result = result.filter(p => p.category === filters.category || p.subCategory === (filters.category as any));
  }
  if (filters?.gender && (filters.gender as string) !== 'All') {
    result = result.filter(p => p.gender === filters.gender || p.gender === 'Unisex');
  }
  if (filters?.searchQuery) {
    const queryStr = filters.searchQuery.toLowerCase();
    result = result.filter(p => p.title.toLowerCase().includes(queryStr) || p.brand.toLowerCase().includes(queryStr));
  }
  return { products: result, totalCount: result.length };
}

export async function fetchProductById(id: string): Promise<{ product: Product; completeLook: RecommendationResult[]; similarProducts: RecommendationResult[] } | null> {
  try {
    const res = await fetch(`/api/products/${id}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn('API product by id fallback:', err);
  }

  const p = INITIAL_PRODUCTS.find(item => item.id === id);
  if (!p) return null;

  return {
    product: p,
    completeLook: StyleSmartRecommendationEngine.getCompleteTheLook(INITIAL_PRODUCTS, p),
    similarProducts: StyleSmartRecommendationEngine.getBecauseYouViewed(INITIAL_PRODUCTS, p.id, INITIAL_USER.preferences)
  };
}

export async function fetchRecommendations(recentlyViewedId?: string): Promise<{ personalized: RecommendationResult[]; becauseViewed: RecommendationResult[] }> {
  try {
    const res = await fetch('/api/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: INITIAL_USER.id, recentlyViewedId })
    });
    if (res.ok) {
      const data = await res.json();
      return { personalized: data.personalized, becauseViewed: data.becauseViewed || [] };
    }
  } catch (err) {
    console.warn('API recommendations fallback:', err);
  }

  return {
    personalized: StyleSmartRecommendationEngine.getPersonalizedRecommendations(INITIAL_PRODUCTS, INITIAL_USER.preferences, [], 8),
    becauseViewed: recentlyViewedId ? StyleSmartRecommendationEngine.getBecauseYouViewed(INITIAL_PRODUCTS, recentlyViewedId, INITIAL_USER.preferences, 6) : []
  };
}

export async function sendAIAssistantMessage(prompt: string): Promise<{ message: string; products: Product[]; suggestedPrompts: string[] }> {
  try {
    const res = await fetch('/api/ai/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('AI Assistant API fallback:', err);
  }

  // Fallback assistant response
  const parsed = StyleSmartRecommendationEngine.parseSearchQuery(prompt);
  let matched = [...INITIAL_PRODUCTS];
  if (parsed.maxPrice > 0) matched = matched.filter(p => p.price <= parsed.maxPrice);
  if (parsed.color) matched = matched.filter(p => p.colors.some(c => c.name.toLowerCase().includes(parsed.color)));

  return {
    message: `Here are my top AI-styled picks matching your query: "${prompt}".`,
    products: matched.slice(0, 4),
    suggestedPrompts: [
      'Find sneakers under ₹3,500',
      'Suggest an outfit for a wedding guest',
      'Show oversized streetwear hoodies'
    ]
  };
}

export async function uploadVisualSearchImage(imageBase64: string) {
  try {
    const res = await fetch('/api/ai/visual-search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64 })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Visual Search API fallback:', err);
  }

  return {
    success: true,
    detectedAttributes: {
      itemType: 'Oversized Hoodie',
      color: 'Onyx Black',
      pattern: 'Solid Minimal',
      style: 'Streetwear'
    },
    matches: INITIAL_PRODUCTS.slice(0, 4).map(p => ({ product: p, similarityScore: 94 }))
  };
}

export async function createOrder(orderPayload: {
  items: CartItem[];
  shippingAddress: any;
  paymentMethod: string;
  couponCode?: string;
  subtotal: number;
  discountAmount: number;
  totalAmount: number;
}): Promise<{ success: boolean; order?: Order }> {
  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Create Order API fallback:', err);
  }

  const fallbackOrder: Order = {
    id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
    userId: INITIAL_USER.id,
    items: orderPayload.items,
    shippingAddress: orderPayload.shippingAddress,
    paymentMethod: orderPayload.paymentMethod as any,
    subtotal: orderPayload.subtotal,
    discountAmount: orderPayload.discountAmount,
    shippingFee: 0,
    taxAmount: Math.round(orderPayload.subtotal * 0.05),
    totalAmount: orderPayload.totalAmount,
    status: 'Processing',
    createdAt: new Date().toISOString(),
    estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    trackingNumber: `STST${Math.floor(10000000 + Math.random() * 90000000)}IN`
  };

  return { success: true, order: fallbackOrder };
}
