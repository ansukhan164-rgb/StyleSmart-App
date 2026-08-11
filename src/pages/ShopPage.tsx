import React, { useState } from 'react';
import { SlidersHorizontal, X, Search, RotateCcw, Filter, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductGrid } from '../components/product/ProductGrid';
import { BRANDS, CATEGORIES, STYLES } from '../data/mockData';
import { Category } from '../types';

export const ShopPage: React.FC = () => {
  const { filterState, setFilterState, resetFilters, products } = useApp();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(4);

  // Filter products client-side
  const filteredProducts = products.filter(p => {
    if (filterState.category && filterState.category !== ('All' as any)) {
      if (p.category !== filterState.category && p.subCategory !== (filterState.category as any)) {
        return false;
      }
    }
    if (filterState.gender && filterState.gender !== ('All' as any)) {
      if (p.gender !== filterState.gender && p.gender !== 'Unisex') return false;
    }
    if (filterState.brands.length > 0 && !filterState.brands.includes(p.brand)) {
      return false;
    }
    if (filterState.styles.length > 0 && !filterState.styles.includes(p.style)) {
      return false;
    }
    if (p.price < filterState.priceRange[0] || p.price > filterState.priceRange[1]) {
      return false;
    }
    if (filterState.discountMin > 0 && p.discountPercent < filterState.discountMin) {
      return false;
    }
    if (filterState.searchQuery) {
      const query = filterState.searchQuery.toLowerCase();
      const match =
        p.title.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query));
      if (!match) return false;
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filterState.sortBy === 'price_low_high') return a.price - b.price;
    if (filterState.sortBy === 'price_high_low') return b.price - a.price;
    if (filterState.sortBy === 'rating') return b.rating - a.rating;
    if (filterState.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
    if (filterState.sortBy === 'discount') return b.discountPercent - a.discountPercent;
    return 0; // relevance
  });

  const toggleBrandFilter = (brand: string) => {
    setFilterState(prev => {
      const exists = prev.brands.includes(brand);
      return {
        ...prev,
        brands: exists ? prev.brands.filter(b => b !== brand) : [...prev.brands, brand]
      };
    });
  };

  const toggleStyleFilter = (style: any) => {
    setFilterState(prev => {
      const exists = prev.styles.includes(style);
      return {
        ...prev,
        styles: exists ? prev.styles.filter(s => s !== style) : [...prev.styles, style]
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Header & Page Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
            {filterState.category || 'All Fashion Catalog'}
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Showing {sortedProducts.length} curated products matching your criteria
          </p>
        </div>

        {/* Search Bar & Sorting Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={filterState.searchQuery}
              onChange={e => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
              placeholder="Search catalog..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 border border-transparent focus:border-indigo-500 focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <select
            value={filterState.sortBy}
            onChange={e => setFilterState(prev => ({ ...prev, sortBy: e.target.value as any }))}
            className="px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white border border-transparent font-medium focus:outline-none"
          >
            <option value="relevance">Sort by: AI Relevance</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="discount">Biggest Discount</option>
            <option value="newest">New Arrivals First</option>
          </select>

          {/* Mobile Filter Drawer Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden px-3.5 py-2 rounded-xl bg-zinc-900 text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Active Filter Pills Bar */}
      {(filterState.category || filterState.brands.length > 0 || filterState.styles.length > 0 || filterState.searchQuery) && (
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="font-bold text-zinc-400 mr-1">Active Filters:</span>
          {filterState.category && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
              Category: {filterState.category}
              <button onClick={() => setFilterState(prev => ({ ...prev, category: undefined }))}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filterState.brands.map(b => (
            <span key={b} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold">
              {b}
              <button onClick={() => toggleBrandFilter(b)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            onClick={resetFilters}
            className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1 ml-2"
          >
            <RotateCcw className="w-3 h-3" />
            Clear All Filters
          </button>
        </div>
      )}

      {/* Main Grid + Sidebar Layout */}
      <div className="flex gap-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-6 bg-white dark:bg-zinc-900/60 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 h-fit sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
              <span>Filters</span>
            </h3>
            <button onClick={resetFilters} className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
              Reset
            </button>
          </div>

          {/* Gender Chip Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Gender</h4>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold">
              {['All', 'Men', 'Women'].map(g => (
                <button
                  key={g}
                  onClick={() => setFilterState(prev => ({ ...prev, gender: g as any }))}
                  className={`py-1.5 rounded-lg border text-center transition-colors ${
                    (filterState.gender || 'All') === g
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Category List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Categories</h4>
            <div className="space-y-1 max-h-48 overflow-y-auto text-xs font-medium">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterState(prev => ({ ...prev, category: cat === filterState.category ? undefined : cat }))}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                    filterState.category === cat
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <span>{cat}</span>
                  {filterState.category === cat && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <h4 className="font-bold uppercase tracking-wider text-zinc-400">Max Price</h4>
              <span className="font-bold text-zinc-900 dark:text-white">₹{filterState.priceRange[1].toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="500"
              max="15000"
              step="500"
              value={filterState.priceRange[1]}
              onChange={e => setFilterState(prev => ({ ...prev, priceRange: [prev.priceRange[0], Number(e.target.value)] }))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          {/* Brands List Checkboxes */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Brands</h4>
            <div className="space-y-1.5 max-h-40 overflow-y-auto text-xs">
              {BRANDS.map(brand => (
                <label key={brand} className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterState.brands.includes(brand)}
                    onChange={() => toggleBrandFilter(brand)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Style Aesthetic Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Style Aesthetic</h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {STYLES.map(s => (
                <button
                  key={s}
                  onClick={() => toggleStyleFilter(s)}
                  className={`px-2.5 py-1 rounded-full border font-semibold transition-colors ${
                    filterState.styles.includes(s as any)
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1">
          <ProductGrid products={sortedProducts} gridCols={gridCols} />
        </div>
      </div>
    </div>
  );
};
