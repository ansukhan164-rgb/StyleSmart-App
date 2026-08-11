import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Clock,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Tag,
  Star,
  CheckCircle2,
  Heart,
  Eye,
  ShoppingBag,
  Upload
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/product/ProductCard';
import { BRANDS, MOCK_LOOKBOOKS } from '../data/mockData';
import { StyleSmartRecommendationEngine } from '../services/recommendationEngine';
import { Category, Product } from '../types';
import customHeroImage from '../assets/images/regenerated_image_1786367497123.png';

export const HomePage: React.FC = () => {
  const {
    products,
    setCurrentView,
    setFilterState,
    recentlyViewed,
    setIsAIAssistantOpen,
    user,
    showToast
  } = useApp();

  const [heroIndex, setHeroIndex] = useState(0);
  const [activeRecTab, setActiveRecTab] = useState<'personalized' | 'becauseViewed' | 'trending' | 'newArrivals'>('personalized');
  const [customBannerImages, setCustomBannerImages] = useState<Record<number, string>>({
    0: customHeroImage
  });

  const handleDeviceImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        setCustomBannerImages(prev => ({ ...prev, [heroIndex]: result }));
        showToast('Hero banner image uploaded from device successfully!', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const heroBanners = [
    {
      id: 1,
      title: 'CYBERPUNK TOKYO STREETWEAR',
      subtitle: 'Heavyweight hoodies, utility cargo trousers & chunky retro silhouettes.',
      badge: 'NEW AI DROP • AUTUMN 2026',
      image: customHeroImage,
      cta: 'Explore Streetwear',
      category: 'Men' as Category
    },
    {
      id: 2,
      title: 'SILK & ETHEREAL COUTURE',
      subtitle: 'Elysian silk midi dresses & handcrafted zardosi festive wear.',
      badge: 'LUXURY ESSENTIALS',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1920',
      cta: 'Shop Women Collection',
      category: 'Women' as Category
    },
    {
      id: 3,
      title: 'RESORT LINEN & MINIMALIST FIT',
      subtitle: 'Organic European linen Cuban collar shirts for summer escapes.',
      badge: 'MINIMALIST LUXURY',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1920',
      cta: 'Shop Linen Series',
      category: 'Men' as Category
    }
  ];

  // Auto Hero Carousel timer
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroBanners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const categoriesList = [
    { name: "Men's Fashion", category: 'Men' as Category, img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=300' },
    { name: "Women's Couture", category: 'Women' as Category, img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=300' },
    { name: 'Footwear & Kicks', category: 'Footwear' as Category, img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=300' },
    { name: 'Accessories & Bags', category: 'Accessories' as Category, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=300' },
    { name: 'Beauty & Fragrance', category: 'Beauty' as Category, img: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=300' },
    { name: 'Kids Fashion', category: 'Kids' as Category, img: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=300' }
  ];

  const handleCategoryClick = (category: Category) => {
    setFilterState(prev => ({ ...prev, category }));
    setCurrentView('shop');
  };

  const trendingProducts = products.filter(p => p.isBestSeller).slice(0, 8);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 8);
  const limitedDeals = products.filter(p => p.isLimitedDeal).slice(0, 4);

  const getDisplayRecommendations = () => {
    if (activeRecTab === 'personalized') {
      return StyleSmartRecommendationEngine.getPersonalizedRecommendations(
        products,
        user.preferences,
        [],
        4
      );
    } else if (activeRecTab === 'becauseViewed') {
      const anchorId = recentlyViewed[0]?.id || products[0]?.id || '';
      return StyleSmartRecommendationEngine.getBecauseYouViewed(
        products,
        anchorId,
        user.preferences,
        4
      );
    } else {
      return products.filter(p => p.isBestSeller).slice(0, 4).map((p, idx) => ({
        product: p,
        score: 98 - idx * 2,
        confidenceLabel: 'Trending Peak Choice',
        reasons: [`Top bestseller with ${p.reviewCount} verified reviews`],
        recommendationType: 'trending' as const
      }));
    }
  };

  const displayRecs = getDisplayRecommendations();

  return (
    <div className="space-y-16">
      {/* 1. Hero Carousel Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-zinc-950 text-white min-h-[480px] sm:min-h-[560px] flex items-center shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0 bg-zinc-900"
          >
            <img
              src={customBannerImages[heroIndex] || heroBanners[heroIndex].image}
              alt={heroBanners[heroIndex].title}
              className="w-full h-full object-cover opacity-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/70 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-16 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold w-fit">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{heroBanners[heroIndex].badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-2xl leading-tight text-white drop-shadow-md">
            {heroBanners[heroIndex].title}
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 max-w-lg leading-relaxed font-medium">
            {heroBanners[heroIndex].subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => handleCategoryClick(heroBanners[heroIndex].category)}
              className="px-6 py-3.5 rounded-2xl bg-white text-zinc-950 text-xs sm:text-sm font-extrabold hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2"
            >
              <span>{heroBanners[heroIndex].cta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAIAssistantOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs sm:text-sm font-extrabold backdrop-blur-md hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Stylist</span>
            </button>

            <label className="cursor-pointer px-5 py-3.5 rounded-2xl bg-black/60 hover:bg-black/80 text-white text-xs sm:text-sm font-extrabold backdrop-blur-md border border-white/20 hover:scale-105 transition-all flex items-center gap-2 shadow-lg">
              <Upload className="w-4 h-4" />
              <span>Upload Device Image</span>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleDeviceImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="absolute right-6 bottom-6 z-10 flex items-center gap-2">
          <button
            onClick={() => setHeroIndex(prev => (prev === 0 ? heroBanners.length - 1 : prev - 1))}
            className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setHeroIndex(prev => (prev + 1) % heroBanners.length)}
            className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 2. Category Discovery (Circular Rounded Cards) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              DISCOVER BY CATEGORY
            </span>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
              Curated Fashion Realms
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('shop')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categoriesList.map(cat => (
            <motion.button
              key={cat.name}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => handleCategoryClick(cat.category)}
              className="group flex flex-col items-center text-center p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-indigo-500/50 hover:shadow-xl transition-all"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 border-2 border-zinc-200 dark:border-zinc-800 group-hover:border-indigo-500 transition-colors shadow-inner">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {cat.name}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* 3. AI RECOMMENDED FOR YOU (Core USP Section) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-indigo-950/40 via-zinc-950/80 to-zinc-950 border border-indigo-500/30 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[11px] font-extrabold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 fill-indigo-300" />
                <span>HYBRID AI RECOMMENDATION ENGINE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Personalized For {user.name.split(' ')[0]}
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Scored dynamically based on your {user.preferences.preferredStyles.join(', ')} aesthetic, budget, & interaction history.
              </p>
            </div>

            {/* Recommendation Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto text-xs font-bold">
              {[
                { id: 'personalized', label: 'Recommended For You' },
                { id: 'becauseViewed', label: 'Because You Viewed' },
                { id: 'trending', label: 'Trending For You' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveRecTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                    activeRecTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
            {displayRecs.map((rec) => (
              <ProductCard
                key={rec.product.id}
                product={rec.product}
                matchScore={rec.score}
                confidenceLabel={rec.confidenceLabel}
                reason={rec.reasons[0]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Trending Now (Horizontal Scroll) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Flame className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                Trending Right Now
              </h2>
              <p className="text-xs text-zinc-500">Most saved & purchased pieces this week</p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView('shop')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Limited-Time Deals (Countdown Timer Banner) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-950 via-zinc-950 to-amber-950 text-white border border-rose-500/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-extrabold uppercase">
            <Clock className="w-3.5 h-3.5 animate-spin" />
            <span>FLASH SALE • UP TO 50% OFF</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Limited-Time Style Steals
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Unbeatable price drops on European linen, heavy French Terry hoodies, & handcrafted leather footwear. Offer valid while stock lasts.
          </p>

          <button
            onClick={() => {
              setFilterState(prev => ({ ...prev, discountMin: 40 }));
              setCurrentView('shop');
            }}
            className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all flex items-center gap-2"
          >
            <Tag className="w-4 h-4" />
            <span>Shop Flash Sale Items</span>
          </button>
        </div>

        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
          {limitedDeals.slice(0, 2).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 6. Fashion Inspiration Lookbook Feed */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              LOOKBOOK & OUTFIT FEED
            </span>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
              Get Inspired By AI Stylists
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('outfit-builder')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>Launch Virtual Outfit Builder</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_LOOKBOOKS.map(lb => (
            <div
              key={lb.id}
              className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-lg aspect-[4/5] flex flex-col justify-end p-6 text-white"
            >
              <img
                src={lb.image}
                alt={lb.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2">
                  <img
                    src={lb.authorAvatar}
                    alt={lb.author}
                    className="w-7 h-7 rounded-full object-cover border border-white/30"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-xs font-bold text-zinc-200">{lb.author}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-md ml-auto">
                    {lb.styleTag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white line-clamp-1">{lb.title}</h3>

                <button
                  onClick={() => setCurrentView('outfit-builder')}
                  className="w-full py-2.5 rounded-xl bg-white/20 hover:bg-white text-white hover:text-zinc-950 text-xs font-extrabold backdrop-blur-md transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Shop This Look</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Brand Marquee */}
      <section className="py-8 bg-zinc-100 dark:bg-zinc-900/60 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 space-y-4">
        <h4 className="text-center text-xs font-bold uppercase tracking-widest text-zinc-400">
          Featured Premium Brands
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-8 px-6 text-sm font-extrabold tracking-wider text-zinc-600 dark:text-zinc-400 uppercase">
          {BRANDS.map(brand => (
            <span key={brand} className="hover:text-indigo-600 transition-colors cursor-pointer">
              {brand}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};
