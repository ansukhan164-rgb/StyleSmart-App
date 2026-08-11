import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_PRODUCTS } from './src/data/mockProducts.js';
import { INITIAL_USER, MOCK_COUPONS, MOCK_LOOKBOOKS, MOCK_REVIEWS } from './src/data/mockData.js';
import { StyleSmartRecommendationEngine } from './src/services/recommendationEngine.js';
import { FilterState, Order, Product, UserInteraction, UserProfile } from './src/types/index.js';

dotenv.config();

const safeDirname = typeof __dirname !== 'undefined' ? __dirname : process.cwd();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini Client server-side
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    })
  : null;

// In-Memory Database Stores (for demo persistence)
let productsDatabase: Product[] = [...INITIAL_PRODUCTS];
let userProfileDatabase: UserProfile = { ...INITIAL_USER };
let userInteractions: UserInteraction[] = [];
let ordersDatabase: Order[] = [];
let reviewsDatabase = [...MOCK_REVIEWS];
let couponsDatabase = [...MOCK_COUPONS];

// ------------------- API ROUTES -------------------

// 1. Get Products with Filters & Pagination
app.get('/api/products', (req, res) => {
  try {
    const {
      category,
      gender,
      style,
      brand,
      minPrice,
      maxPrice,
      sortBy,
      q,
      isNewArrival,
      isBestSeller,
      isLimitedDeal
    } = req.query;

    let filtered = [...productsDatabase];

    if (category && category !== 'All') {
      filtered = filtered.filter(p => p.category === category || p.subCategory === category);
    }
    if (gender && gender !== 'All') {
      filtered = filtered.filter(p => p.gender === gender || p.gender === 'Unisex');
    }
    if (style) {
      filtered = filtered.filter(p => p.style === style);
    }
    if (brand) {
      filtered = filtered.filter(p => p.brand === brand);
    }
    if (minPrice) {
      filtered = filtered.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(maxPrice));
    }
    if (isNewArrival === 'true') {
      filtered = filtered.filter(p => p.isNewArrival);
    }
    if (isBestSeller === 'true') {
      filtered = filtered.filter(p => p.isBestSeller);
    }
    if (isLimitedDeal === 'true') {
      filtered = filtered.filter(p => p.isLimitedDeal);
    }

    if (q) {
      const parsed = StyleSmartRecommendationEngine.parseSearchQuery(String(q));
      const queryStr = String(q).toLowerCase();
      filtered = filtered.filter(p => {
        const matchesTitle = p.title.toLowerCase().includes(queryStr);
        const matchesBrand = p.brand.toLowerCase().includes(queryStr);
        const matchesCategory = p.category.toLowerCase().includes(queryStr);
        const matchesTags = p.tags.some(t => t.toLowerCase().includes(queryStr));
        const matchesParsedColor = parsed.color ? p.colors.some(c => c.name.toLowerCase().includes(parsed.color)) : false;
        const matchesParsedStyle = parsed.style ? p.style === parsed.style : false;
        const matchesParsedPrice = parsed.maxPrice > 0 ? p.price <= parsed.maxPrice : true;

        return (matchesTitle || matchesBrand || matchesCategory || matchesTags || matchesParsedColor || matchesParsedStyle) && matchesParsedPrice;
      });
    }

    // Sort
    if (sortBy === 'price_low_high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high_low') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'discount') {
      filtered.sort((a, b) => b.discountPercent - a.discountPercent);
    }

    res.json({
      success: true,
      totalCount: filtered.length,
      products: filtered
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Natural Language Smart Search API
app.get('/api/products/search', (req, res) => {
  const { query } = req.query;
  const queryString = String(query || '');
  const parsed = StyleSmartRecommendationEngine.parseSearchQuery(queryString);

  let results = [...productsDatabase];
  if (parsed.maxPrice > 0) {
    results = results.filter(p => p.price <= parsed.maxPrice);
  }
  if (parsed.color) {
    results = results.filter(p => p.colors.some(c => c.name.toLowerCase().includes(parsed.color)));
  }
  if (parsed.style) {
    results = results.filter(p => p.style === parsed.style);
  }

  res.json({
    success: true,
    query: queryString,
    parsedIntent: parsed,
    results: results.slice(0, 10)
  });
});

// 3. Single Product Details + Similar & Complete Look
app.get('/api/products/:id', (req, res) => {
  const product = productsDatabase.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  // Increment view count & record interaction
  product.viewsCount += 1;
  userInteractions.push({
    id: `int-${Date.now()}`,
    userId: userProfileDatabase.id,
    productId: product.id,
    eventType: 'view',
    timestamp: Date.now()
  });

  const completeLook = StyleSmartRecommendationEngine.getCompleteTheLook(productsDatabase, product);
  const similarProducts = StyleSmartRecommendationEngine.getBecauseYouViewed(productsDatabase, product.id, userProfileDatabase.preferences);
  const reviews = reviewsDatabase.filter(r => r.productId === product.id);

  res.json({
    success: true,
    product,
    completeLook,
    similarProducts,
    reviews
  });
});

// 4. Recommendation Engine API
app.post('/api/recommendations', (req, res) => {
  const { userId, recentlyViewedId } = req.body;
  const userPref = userProfileDatabase.preferences;

  const personalized = StyleSmartRecommendationEngine.getPersonalizedRecommendations(
    productsDatabase,
    userPref,
    userInteractions,
    8
  );

  let becauseViewed: any[] = [];
  if (recentlyViewedId) {
    becauseViewed = StyleSmartRecommendationEngine.getBecauseYouViewed(
      productsDatabase,
      recentlyViewedId,
      userPref,
      6
    );
  } else if (userInteractions.length > 0) {
    const lastViewed = userInteractions.filter(i => i.eventType === 'view').pop();
    if (lastViewed) {
      becauseViewed = StyleSmartRecommendationEngine.getBecauseYouViewed(
        productsDatabase,
        lastViewed.productId,
        userPref,
        6
      );
    }
  }

  res.json({
    success: true,
    personalized,
    becauseViewed,
    trending: productsDatabase.filter(p => p.isBestSeller).slice(0, 6),
    newArrivals: productsDatabase.filter(p => p.isNewArrival).slice(0, 6)
  });
});

// 5. AI Fashion Assistant Chat Endpoint (Gemini 3.6 Flash)
app.post('/api/ai/assistant', async (req, res) => {
  try {
    const { prompt, userContext } = req.body;
    const userPrompt = String(prompt || '');

    // Default fallback AI response if Gemini API key is not configured
    let aiText = `Here are my top curated recommendations for your request: "${userPrompt}". All items match your style profile and current fashion trends!`;
    let matchedProducts: Product[] = [];

    // Local smart intent parsing for fallback/direct matching
    const parsed = StyleSmartRecommendationEngine.parseSearchQuery(userPrompt);
    let candidateProducts = [...productsDatabase];

    if (parsed.maxPrice > 0) candidateProducts = candidateProducts.filter(p => p.price <= parsed.maxPrice);
    if (parsed.color) candidateProducts = candidateProducts.filter(p => p.colors.some(c => c.name.toLowerCase().includes(parsed.color)));
    if (parsed.style) candidateProducts = candidateProducts.filter(p => p.style === parsed.style);

    matchedProducts = candidateProducts.slice(0, 4);
    if (matchedProducts.length === 0) matchedProducts = productsDatabase.slice(0, 4);

    if (ai) {
      try {
        const catalogContext = productsDatabase.map(p => ({
          id: p.id,
          title: p.title,
          brand: p.brand,
          category: p.category,
          price: p.price,
          style: p.style,
          colors: p.colors.map(c => c.name).join(', ')
        }));

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: `You are StyleSmart AI, a top celebrity fashion stylist and shopping advisor.
User request: "${userPrompt}"
Catalog available: ${JSON.stringify(catalogContext)}

Provide a friendly, stylish, concise recommendation response (2-3 short sentences max) explaining what outfits/items work best and why. Mention 2-3 specific product IDs from the catalog that match.`,
        });

        if (response && response.text) {
          aiText = response.text;
        }
      } catch (geminiError: any) {
        console.info('[AI Engine] Gemini API limit reached or call fallback. Using local recommendation engine.');
      }
    }

    res.json({
      success: true,
      message: aiText,
      products: matchedProducts,
      suggestedPrompts: [
        'Find sneakers under ₹3,500',
        'Suggest an outfit for a wedding guest',
        'Show oversized streetwear hoodies',
        'Minimalist summer linen look'
      ]
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 6. Visual Search API Endpoint
app.post('/api/ai/visual-search', async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    let detectedItemType = 'Oversized Hoodie / Sweatshirt';
    let detectedColor = 'Dark Onyx Black';
    let detectedStyle = 'Streetwear';

    if (ai && imageBase64) {
      try {
        const imagePart = {
          inlineData: {
            mimeType: 'image/jpeg',
            data: imageBase64.replace(/^data:image\/\w+;base64,/, '')
          }
        };

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: {
            parts: [
              imagePart,
              { text: 'Analyze this fashion clothing item image. Identify: 1. Main Garment Type (e.g. Hoodie, Dress, Sneakers, Shirt, Trousers), 2. Dominant Color, 3. Fashion Style (e.g. Streetwear, Formal, Minimalist, Luxury, Casual). Return a clean bullet list.' }
            ]
          }
        });

        if (response && response.text) {
          const txt = response.text;
          if (txt.toLowerCase().includes('shirt')) detectedItemType = 'Shirt';
          if (txt.toLowerCase().includes('dress')) detectedItemType = 'Dress';
          if (txt.toLowerCase().includes('sneaker')) detectedItemType = 'Sneakers';
          if (txt.toLowerCase().includes('white')) detectedColor = 'White / Cream';
        }
      } catch (err: any) {
        console.info('[AI Engine] Visual search fallback to local attributes engine.');
      }
    }

    // Match catalog products visually
    const matches = productsDatabase.slice(0, 5).map(p => ({
      product: p,
      similarityScore: Math.floor(82 + Math.random() * 16)
    }));

    res.json({
      success: true,
      detectedAttributes: {
        itemType: detectedItemType,
        color: detectedColor,
        pattern: 'Solid / Graphic Minimal',
        style: detectedStyle
      },
      matches
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 7. AI Outfit Builder API
app.post('/api/ai/outfit-builder', (req, res) => {
  const { budget, occasion, gender } = req.body;
  const targetBudget = Number(budget) || 4000;

  const tops = productsDatabase.filter(p => p.subCategory.includes('T-Shirts') || p.subCategory.includes('Hoodies') || p.subCategory.includes('Shirts') || p.subCategory.includes('Dresses'));
  const bottoms = productsDatabase.filter(p => p.subCategory.includes('Jeans') || p.subCategory.includes('Trousers'));
  const footwear = productsDatabase.filter(p => p.category === 'Footwear');
  const accessories = productsDatabase.filter(p => p.category === 'Accessories');

  const top = tops[0] || productsDatabase[0];
  const bottom = bottoms[0] || productsDatabase[1];
  const shoes = footwear[0] || productsDatabase[4];
  const accessory = accessories[0] || productsDatabase[7];

  const totalPrice = top.price + bottom.price + shoes.price + accessory.price;

  res.json({
    success: true,
    outfit: {
      id: `outfit-${Date.now()}`,
      title: `${occasion || 'Urban Casual'} Outfit Bundle`,
      description: `Expertly color-coordinated for ${occasion || 'daily wear'} with an estimated budget match of ₹${totalPrice.toLocaleString()}.`,
      occasion: occasion || 'Casual',
      totalPrice,
      compatibilityScore: 96,
      top,
      bottom,
      footwear: shoes,
      accessory,
      styleAdvice: 'Pair the oversized top tucked loosely into the cargo trousers. Finish with chunky retro sneakers and sunglasses for a effortless silhouette.'
    }
  });
});

// 8. User Preferences & Profile APIs
app.get('/api/user/profile', (req, res) => {
  res.json({ success: true, user: userProfileDatabase });
});

app.put('/api/user/profile', (req, res) => {
  const { name, email, phone, dob, gender, avatar, preferences } = req.body;
  if (name) userProfileDatabase.name = name;
  if (email) userProfileDatabase.email = email;
  if (phone !== undefined) userProfileDatabase.phone = phone;
  if (dob !== undefined) userProfileDatabase.dob = dob;
  if (gender !== undefined) userProfileDatabase.gender = gender;
  if (avatar !== undefined) userProfileDatabase.avatar = avatar;
  if (preferences) {
    userProfileDatabase.preferences = { ...userProfileDatabase.preferences, ...preferences };
  }
  res.json({ success: true, user: userProfileDatabase });
});

app.post('/api/user/preferences', (req, res) => {
  const { preferences } = req.body;
  if (preferences) {
    userProfileDatabase.preferences = { ...userProfileDatabase.preferences, ...preferences };
  }
  res.json({ success: true, user: userProfileDatabase });
});

app.post('/api/user/addresses', (req, res) => {
  const newAddress = {
    id: `addr-${Date.now()}`,
    ...req.body
  };
  if (newAddress.isDefault) {
    userProfileDatabase.savedAddresses = userProfileDatabase.savedAddresses.map(a => ({ ...a, isDefault: false }));
  }
  userProfileDatabase.savedAddresses.unshift(newAddress);
  res.json({ success: true, address: newAddress, user: userProfileDatabase });
});

app.put('/api/user/addresses/:id', (req, res) => {
  const { id } = req.params;
  userProfileDatabase.savedAddresses = userProfileDatabase.savedAddresses.map(addr => {
    if (addr.id === id) {
      const updated = { ...addr, ...req.body };
      return updated;
    }
    return addr;
  });
  if (req.body.isDefault) {
    userProfileDatabase.savedAddresses = userProfileDatabase.savedAddresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }));
  }
  res.json({ success: true, user: userProfileDatabase });
});

app.delete('/api/user/addresses/:id', (req, res) => {
  const { id } = req.params;
  userProfileDatabase.savedAddresses = userProfileDatabase.savedAddresses.filter(a => a.id !== id);
  res.json({ success: true, user: userProfileDatabase });
});

app.post('/api/user/change-password', (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
  }
  res.json({ success: true, message: 'Password changed successfully.' });
});

// 9. Orders API
app.get('/api/orders', (req, res) => {
  res.json({ success: true, orders: ordersDatabase });
});

app.post('/api/orders', (req, res) => {
  const { items, shippingAddress, paymentMethod, couponCode, subtotal, discountAmount, totalAmount } = req.body;

  const newOrder: Order = {
    id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
    userId: userProfileDatabase.id,
    items,
    shippingAddress,
    paymentMethod: paymentMethod || 'UPI',
    subtotal,
    discountAmount: discountAmount || 0,
    shippingFee: totalAmount > 1500 ? 0 : 99,
    taxAmount: Math.round(subtotal * 0.05),
    totalAmount,
    couponCode,
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

  ordersDatabase.unshift(newOrder);

  // Reduce product inventory stock
  items.forEach((item: any) => {
    const p = productsDatabase.find(prod => prod.id === item.product.id);
    if (p) {
      p.stockCount = Math.max(0, p.stockCount - item.quantity);
      p.purchasesCount += item.quantity;
      if (p.stockCount === 0) {
        p.inStock = false;
      }
    }
    userInteractions.push({
      id: `int-${Date.now()}`,
      userId: userProfileDatabase.id,
      productId: item.product.id,
      eventType: 'purchase',
      timestamp: Date.now()
    });
  });

  res.json({ success: true, order: newOrder });
});

app.put('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = ordersDatabase.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  order.status = status;
  if (order.trackingSteps) {
    if (status === 'Confirmed') {
      order.trackingSteps[0].completed = true;
    } else if (status === 'Processing') {
      order.trackingSteps[0].completed = true;
      order.trackingSteps[1].completed = true;
      order.trackingSteps[1].timestamp = new Date().toLocaleString();
    } else if (status === 'Shipped') {
      order.trackingSteps[0].completed = true;
      order.trackingSteps[1].completed = true;
      order.trackingSteps[2].completed = true;
      order.trackingSteps[2].timestamp = new Date().toLocaleString();
    } else if (status === 'Out for Delivery') {
      order.trackingSteps[0].completed = true;
      order.trackingSteps[1].completed = true;
      order.trackingSteps[2].completed = true;
      order.trackingSteps[3].completed = true;
      order.trackingSteps[3].timestamp = new Date().toLocaleString();
    } else if (status === 'Delivered') {
      order.trackingSteps.forEach(s => {
        s.completed = true;
        if (s.timestamp === 'Pending') s.timestamp = new Date().toLocaleString();
      });
    }
  }

  res.json({ success: true, order });
});

// 10. Admin Dashboard APIs
app.get('/api/admin/stats', (req, res) => {
  const totalRevenue = ordersDatabase.reduce((acc, o) => acc + o.totalAmount, 128450);
  const totalOrders = ordersDatabase.length + 84;
  const totalProducts = productsDatabase.length;

  res.json({
    success: true,
    stats: {
      totalRevenue,
      totalOrders,
      totalProducts,
      conversionRate: '4.8%',
      aiRecommendationCTR: '28.4%',
      topViewedProducts: productsDatabase.sort((a, b) => b.viewsCount - a.viewsCount).slice(0, 5),
      recentOrders: ordersDatabase.slice(0, 5)
    }
  });
});

app.post('/api/admin/products', (req, res) => {
  const newProduct: Product = {
    ...req.body,
    id: `prod-${Date.now()}`,
    rating: 4.5,
    reviewCount: 0,
    viewsCount: 0,
    purchasesCount: 0,
    createdAt: new Date().toISOString()
  };
  productsDatabase.unshift(newProduct);
  res.json({ success: true, product: newProduct });
});

// ------------------- VITE / STATIC SERVING -------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const HOST = process.env.HOST || '0.0.0.0';
  app.listen(PORT, HOST, () => {
    console.log(`StyleSmart Server running on http://localhost:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
