import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Plus,
  Trash2,
  Share2,
  Bookmark,
  RefreshCw,
  SlidersHorizontal,
  Check,
  Zap,
  Tag,
  ChevronRight,
  Layers,
  Palette,
  Info,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const OutfitStudioPage: React.FC = () => {
  const { products, addToCart, showToast, setCurrentView, activeOutfitItems, setActiveOutfitItems } = useApp();

  // Catalog search & category filter in sidebar
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'all' | 'tops' | 'bottoms' | 'footwear' | 'accessories'>('all');

  // Filtered products for wardrobe selection
  const filteredCatalogProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedCategoryTab === 'tops') return p.category === 'Men' || p.category === 'Women' || p.subCategory.includes('Hoodies') || p.subCategory.includes('T-Shirts') || p.subCategory.includes('Shirts') || p.subCategory.includes('Jackets');
    if (selectedCategoryTab === 'bottoms') return p.subCategory.includes('Trousers') || p.subCategory.includes('Chinos') || p.subCategory.includes('Jeans') || p.subCategory.includes('Pants');
    if (selectedCategoryTab === 'footwear') return p.category === 'Footwear';
    if (selectedCategoryTab === 'accessories') return p.category === 'Accessories' || p.subCategory.includes('Watches') || p.subCategory.includes('Bags');
    return true;
  });

  // Selected Outfit slots
  const [selectedTop, setSelectedTop] = useState<Product | null>(null);
  const [selectedBottom, setSelectedBottom] = useState<Product | null>(null);
  const [selectedFootwear, setSelectedFootwear] = useState<Product | null>(null);
  const [selectedAccessory, setSelectedAccessory] = useState<Product | null>(null);

  useEffect(() => {
    if (activeOutfitItems && activeOutfitItems.length > 0) {
      const topItem = activeOutfitItems.find(p => p.category === 'Men' || p.category === 'Women' || p.subCategory.includes('Hoodies') || p.subCategory.includes('T-Shirts') || p.subCategory.includes('Shirts') || p.subCategory.includes('Jackets')) || activeOutfitItems[0];
      const bottomItem = activeOutfitItems.find(p => p.subCategory.includes('Trousers') || p.subCategory.includes('Jeans') || p.subCategory.includes('Chinos') || p.subCategory.includes('Pants')) || activeOutfitItems[1];
      const shoesItem = activeOutfitItems.find(p => p.category === 'Footwear');
      const accItem = activeOutfitItems.find(p => p.category === 'Accessories' || p.subCategory.includes('Watches') || p.subCategory.includes('Bags'));

      if (topItem) setSelectedTop(topItem);
      if (bottomItem) setSelectedBottom(bottomItem);
      if (shoesItem) setSelectedFootwear(shoesItem);
      if (accItem) setSelectedAccessory(accItem);

      setActiveOutfitItems([]);
    } else if (!selectedTop && products.length > 0) {
      setSelectedTop(products.find(p => p.category === 'Men' || p.category === 'Women') || products[0]);
      setSelectedBottom(products.find(p => p.subCategory.includes('Jeans') || p.subCategory.includes('Trousers')) || products[1]);
      setSelectedFootwear(products.find(p => p.category === 'Footwear') || products[2]);
      setSelectedAccessory(products.find(p => p.category === 'Accessories') || products[3]);
    }
  }, [activeOutfitItems, products]);

  const [outfitName, setOutfitName] = useState('Weekend Urban Casual Look');
  const [savedLookbooks, setSavedLookbooks] = useState<{ id: string; name: string; items: Product[]; score: number }[]>([
    {
      id: 'look-1',
      name: 'Monochrome Streetwear',
      items: [products[0], products[1], products[3]].filter(Boolean),
      score: 96
    }
  ]);

  // Calculate prices & score
  const selectedItems = [selectedTop, selectedBottom, selectedFootwear, selectedAccessory].filter(
    (item): item is Product => item !== null
  );

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const bundleDiscount = Math.round(totalPrice * 0.15); // 15% outfit bundle discount
  const finalPrice = totalPrice - bundleDiscount;

  // AI Style Score calculation
  const colorMatchScore = selectedItems.length >= 3 ? 94 : 85;
  const occasionScore = 92;
  const overallOutfitScore = Math.round((colorMatchScore + occasionScore + 90) / 3);

  const handleAddOutfitToCart = () => {
    if (selectedItems.length === 0) {
      showToast('Select at least one garment to create an outfit!', 'warning');
      return;
    }
    selectedItems.forEach(item => {
      addToCart(item, item.colors[0], item.sizes[0] || 'M');
    });
    showToast(`Added full "${outfitName}" outfit to cart with 15% Bundle Discount!`);
  };

  const handleSaveLookbook = () => {
    if (selectedItems.length === 0) return;
    const newLookbook = {
      id: `look-${Date.now()}`,
      name: outfitName || 'Custom Outfit Look',
      items: selectedItems,
      score: overallOutfitScore
    };
    setSavedLookbooks(prev => [newLookbook, ...prev]);
    showToast(`Lookbook "${newLookbook.name}" saved to your profile!`);
  };

  const handleDeleteLookbook = (id: string) => {
    setSavedLookbooks(prev => prev.filter(l => l.id !== id));
    showToast('Lookbook deleted successfully.', 'info');
  };

  const handleShareLookbook = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Outfit lookbook link copied to clipboard!');
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, product: Product) => {
    e.dataTransfer.setData('application/json', JSON.stringify(product));
  };

  const handleDropOnCanvas = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const data = e.dataTransfer.getData('application/json');
      if (data) {
        const product: Product = JSON.parse(data);
        if (product.category === 'Footwear') {
          setSelectedFootwear(product);
        } else if (product.category === 'Accessories' || product.subCategory.includes('Watches') || product.subCategory.includes('Bags')) {
          setSelectedAccessory(product);
        } else if (product.subCategory.includes('Trousers') || product.subCategory.includes('Chinos') || product.subCategory.includes('Jeans') || product.subCategory.includes('Pants')) {
          setSelectedBottom(product);
        } else {
          setSelectedTop(product);
        }
        showToast(`Added ${product.title} to Outfit Canvas!`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleProductClickAssign = (product: Product) => {
    if (product.category === 'Footwear') {
      setSelectedFootwear(product);
    } else if (product.category === 'Accessories' || product.subCategory.includes('Watches') || product.subCategory.includes('Bags')) {
      setSelectedAccessory(product);
    } else if (product.subCategory.includes('Trousers') || product.subCategory.includes('Chinos') || product.subCategory.includes('Jeans') || product.subCategory.includes('Pants')) {
      setSelectedBottom(product);
    } else {
      setSelectedTop(product);
    }
    showToast(`Assigned ${product.title} to canvas slot!`);
  };

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-violet-950 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              AI Outfit Studio & Builder
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Mix, Match & Style Complete Looks
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Automatically load items from the entire store catalog. Drag-and-drop or click any product to assemble your bespoke lookbook with instant 15% bundle savings.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={handleSaveLookbook}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-md transition-all flex items-center gap-2"
          >
            <Bookmark className="w-4 h-4 text-indigo-400" />
            <span>Save Lookbook</span>
          </button>
          <button
            onClick={handleShareLookbook}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Outfit</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Wardrobe Catalog Drawer with Search & Filters */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4 max-h-[800px] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Catalog & Wardrobe ({filteredCatalogProducts.length})</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Drag or click to assign</span>
          </div>

          {/* Search Catalog */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search store catalog..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1 text-[11px] font-bold">
            {(['all', 'tops', 'bottoms', 'footwear', 'accessories'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedCategoryTab(tab)}
                className={`px-3 py-1.5 rounded-lg capitalize whitespace-nowrap transition-all ${
                  selectedCategoryTab === tab
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Products List */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {filteredCatalogProducts.map(product => {
              const isSelected = selectedTop?.id === product.id ||
                                 selectedBottom?.id === product.id ||
                                 selectedFootwear?.id === product.id ||
                                 selectedAccessory?.id === product.id;
              return (
                <div
                  key={product.id}
                  draggable
                  onDragStart={e => handleDragStart(e, product)}
                  onClick={() => handleProductClickAssign(product)}
                  className={`p-2.5 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-950/80 border-indigo-500 shadow-md shadow-indigo-500/20 ring-1 ring-indigo-500/50'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-28 object-cover rounded-xl bg-slate-800 mb-2"
                      referrerPolicy="no-referrer"
                    />
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] shadow">
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-wide">{product.brand}</span>
                    <p className="text-[11px] font-semibold text-slate-200 truncate">{product.title}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] font-mono font-bold text-white">₹{product.price.toLocaleString()}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">{product.rating}★</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCatalogProducts.length === 0 && (
            <div className="py-12 text-center text-slate-500 text-xs">
              No matching catalog items found.
            </div>
          )}
        </div>

        {/* Center: Interactive Visual Outfit Canvas */}
        <div
          onDragOver={e => e.preventDefault()}
          onDrop={handleDropOnCanvas}
          className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between min-h-[700px] shadow-2xl relative overflow-hidden"
        >
          {/* Background grid accent */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

          {/* Canvas Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 relative z-10">
            <div className="space-y-1">
              <input
                type="text"
                value={outfitName}
                onChange={e => setOutfitName(e.target.value)}
                className="bg-transparent text-white font-bold text-base focus:outline-none border-b border-transparent focus:border-indigo-500 transition-colors w-full"
                placeholder="Lookbook Name..."
              />
              <p className="text-[11px] text-slate-400">Drag items from catalog or click to populate slots</p>
            </div>
            <button
              onClick={() => {
                setSelectedTop(null);
                setSelectedBottom(null);
                setSelectedFootwear(null);
                setSelectedAccessory(null);
                showToast('Canvas cleared', 'info');
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Clear Canvas"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Mannequin / Slot Layout */}
          <div className="flex-1 flex flex-col items-center justify-center gap-6 py-6 relative z-10">
            {/* Top / Outerwear Slot */}
            {selectedTop ? (
              <div className="relative group w-48 sm:w-56">
                <img
                  src={selectedTop.images[0]}
                  alt={selectedTop.title}
                  className="w-full h-40 object-contain rounded-2xl bg-slate-900/90 p-2 border border-indigo-500/40 shadow-xl"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedTop(null)}
                  className="absolute -top-2 -right-2 p-1.5 bg-rose-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
                <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] text-white font-medium truncate border border-slate-800">
                  {selectedTop.title}
                </div>
              </div>
            ) : (
              <div className="w-56 h-36 rounded-2xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-500 text-xs bg-slate-950/30">
                <Plus className="w-5 h-5 mb-1 text-indigo-500/60" />
                <span>+ Drop Top / Jacket Here</span>
              </div>
            )}

            {/* Bottoms Slot */}
            {selectedBottom ? (
              <div className="relative group w-48 sm:w-56">
                <img
                  src={selectedBottom.images[0]}
                  alt={selectedBottom.title}
                  className="w-full h-40 object-contain rounded-2xl bg-slate-900/90 p-2 border border-violet-500/40 shadow-xl"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedBottom(null)}
                  className="absolute -top-2 -right-2 p-1.5 bg-rose-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
                <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] text-white font-medium truncate border border-slate-800">
                  {selectedBottom.title}
                </div>
              </div>
            ) : (
              <div className="w-56 h-36 rounded-2xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-500 text-xs bg-slate-950/30">
                <Plus className="w-5 h-5 mb-1 text-violet-500/60" />
                <span>+ Drop Bottom / Jeans Here</span>
              </div>
            )}

            {/* Footwear & Accessories Row */}
            <div className="flex items-center gap-4 w-full justify-center">
              {selectedFootwear ? (
                <div className="relative group w-36 sm:w-40">
                  <img
                    src={selectedFootwear.images[0]}
                    alt={selectedFootwear.title}
                    className="w-full h-28 object-contain rounded-2xl bg-slate-900/90 p-2 border border-amber-500/40 shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    onClick={() => setSelectedFootwear(null)}
                    className="absolute -top-2 -right-2 p-1 bg-rose-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                  </button>
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-lg text-[9px] text-white font-medium truncate border border-slate-800">
                    {selectedFootwear.title}
                  </div>
                </div>
              ) : (
                <div className="w-36 sm:w-40 h-28 rounded-2xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-500 text-[11px] bg-slate-950/30">
                  <span>+ Shoes</span>
                </div>
              )}

              {selectedAccessory ? (
                <div className="relative group w-36 sm:w-40">
                  <img
                    src={selectedAccessory.images[0]}
                    alt={selectedAccessory.title}
                    className="w-full h-28 object-contain rounded-2xl bg-slate-900/90 p-2 border border-emerald-500/40 shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    onClick={() => setSelectedAccessory(null)}
                    className="absolute -top-2 -right-2 p-1 bg-rose-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                  </button>
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-lg text-[9px] text-white font-medium truncate border border-slate-800">
                    {selectedAccessory.title}
                  </div>
                </div>
              ) : (
                <div className="w-36 sm:w-40 h-28 rounded-2xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-500 text-[11px] bg-slate-950/30">
                  <span>+ Accessory</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Canvas Summary Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs relative z-10">
            <span className="text-slate-400 font-medium">{selectedItems.length} items in current outfit</span>
            <span className="font-mono font-bold text-indigo-400">Total: ₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Right Side: AI Harmony Breakdown, Pricing & Lookbooks */}
        <div className="lg:col-span-3 space-y-6">
          {/* AI Score Box */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-indigo-500/30 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>AI Style Harmony</span>
              </h3>
              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {overallOutfitScore}/100 Match
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Color Palette Match</span>
                <span className="font-bold text-emerald-400">{colorMatchScore}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${colorMatchScore}%` }} />
              </div>

              <div className="flex justify-between text-xs pt-1">
                <span className="text-slate-400">Occasion Versatility</span>
                <span className="font-bold text-indigo-400">{occasionScore}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${occasionScore}%` }} />
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              ✨ <strong>Stylist Note:</strong> The selected garments exhibit high tonal harmony and balanced streetwear silhouette, ideal for modern urban outings.
            </p>
          </div>

          {/* Pricing & Checkout Breakdown */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Outfit Pricing Breakdown</h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal ({selectedItems.length} items)</span>
                <span className="font-mono">₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>15% Bundle Discount</span>
                <span className="font-mono">-₹{bundleDiscount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white font-black text-sm pt-2 border-t border-slate-800">
                <span>Total Final Price</span>
                <span className="font-mono text-indigo-400">₹{finalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleAddOutfitToCart}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buy Entire Outfit Now</span>
            </button>
          </div>

          {/* Saved Lookbooks Feed */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Saved Custom Lookbooks</h3>
            {savedLookbooks.length === 0 && (
              <p className="text-xs text-slate-500">No saved lookbooks yet. Click 'Save Lookbook' above.</p>
            )}
            {savedLookbooks.map(look => (
              <div key={look.id} className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate">{look.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-indigo-400">{look.score}/100</span>
                    <button
                      onClick={() => handleDeleteLookbook(look.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="flex gap-1 overflow-x-auto">
                  {look.items.map((item, idx) => (
                    <img
                      key={idx}
                      src={item.images[0]}
                      alt={item.title}
                      className="w-10 h-10 rounded-lg object-cover bg-slate-800 border border-slate-700"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
