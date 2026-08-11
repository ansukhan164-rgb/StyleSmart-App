import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Heart,
  ShoppingBag,
  User,
  Sun,
  Moon,
  Camera,
  SlidersHorizontal,
  ChevronDown,
  Menu,
  X,
  Zap,
  Tag,
  Truck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import { Category } from '../../types';
import { AuthModal } from './AuthModal';
import { getAvatarUrl } from '../../lib/avatarUtils';

export const Navbar: React.FC = () => {
  const {
    theme,
    toggleTheme,
    cart,
    wishlist,
    currentView,
    setCurrentView,
    filterState,
    setFilterState,
    setIsAIAssistantOpen,
    setIsVisualSearchOpen,
    user,
    isLoggedIn,
    handleSignInClick
  } = useApp();

  const [searchQuery, setSearchQuery] = useState(filterState.searchQuery);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterState(prev => ({ ...prev, searchQuery }));
    setCurrentView('shop');
  };

  const handleCategorySelect = (category: Category) => {
    if (category === 'Deals') {
      setFilterState(prev => ({ ...prev, category: undefined, discountMin: 30 }));
    } else if (category === 'New Arrivals') {
      setFilterState(prev => ({ ...prev, category: undefined }));
    } else {
      setFilterState(prev => ({ ...prev, category }));
    }
    setCurrentView('shop');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-200">
      {/* Top Banner Announcement */}
      <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-700 text-white text-xs font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-pulse" />
        <span>StyleSmart AI Fashion Festival: Extra 20% OFF with code <strong>STYLESMRT20</strong></span>
        <button
          onClick={() => setIsAIAssistantOpen(true)}
          className="underline ml-2 font-semibold hover:text-amber-200 transition-colors"
        >
          Ask AI Stylist
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button
              onClick={() => {
                setCurrentView('home');
                setFilterState(prev => ({ ...prev, searchQuery: '', category: undefined }));
              }}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                S
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-zinc-900 via-indigo-950 to-violet-900 dark:from-white dark:via-indigo-200 dark:to-purple-300 bg-clip-text text-transparent">
                  StyleSmart
                </span>
                <span className="hidden sm:inline-block ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 uppercase tracking-wider">
                  AI Fashion
                </span>
              </div>
            </button>
          </div>

          {/* Smart Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md relative items-center"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder='Search "black oversized hoodie under 2000" or brands...'
                className="w-full pl-10 pr-20 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-400 text-sm border border-transparent focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsVisualSearchOpen(true)}
                  title="Visual Search with Image"
                  className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>

          {/* Header Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Stylist Button */}
            <button
              onClick={() => setIsAIAssistantOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-500/25 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-4 h-4 fill-white/20 animate-spin-slow" />
              <span className="hidden sm:inline">AI Stylist</span>
            </button>

            {/* Light/Dark Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 transition-colors"
              title={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-300" />}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setCurrentView('profile')}
              className="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 transition-colors"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setCurrentView('cart')}
              className="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 transition-colors"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4.5 h-4.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Account Profile / Auth */}
            <div className="flex items-center gap-1.5">
              {!isLoggedIn ? (
                <button
                  onClick={handleSignInClick}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:scale-105"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              ) : (
                <button
                  onClick={() => setCurrentView('profile')}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  title="View Account Profile"
                >
                  <img
                    src={getAvatarUrl(user.avatar)}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-indigo-500/50"
                    referrerPolicy="no-referrer"
                  />
                  <span className="hidden xl:inline text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    {user.name.split(' ')[0]}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Categories Bar (Desktop Navigation) */}
        <nav className="hidden lg:flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/60 py-2.5 overflow-x-auto text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          <div className="flex items-center gap-6">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap flex items-center gap-1 ${
                  category === 'Deals' ? 'text-rose-600 dark:text-rose-400 font-bold' : ''
                } ${category === 'New Arrivals' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}`}
              >
                {category === 'Deals' && <Tag className="w-3.5 h-3.5" />}
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <button
              onClick={() => setCurrentView('tracking')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold"
            >
              <Truck className="w-3.5 h-3.5 text-indigo-500" />
              <span>Track Orders & Returns</span>
            </button>
            <button
              onClick={() => setCurrentView('outfit-builder')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-500" />
              <span>Outfit Builder</span>
            </button>
            <button
              onClick={() => setCurrentView('admin')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-mono"
            >
              Admin Portal
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search fashion, styles..."
              className="w-full pl-9 pr-10 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-sm"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsVisualSearchOpen(true);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
            >
              <Camera className="w-4 h-4" />
            </button>
          </form>

          {/* Mobile Auth CTA */}
          <div className="pb-2 border-b border-zinc-200 dark:border-zinc-800">
            {!isLoggedIn ? (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleSignInClick();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20"
              >
                <User className="w-4 h-4" />
                <span>Sign In / Register Account</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setCurrentView('profile');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold text-xs flex items-center justify-between border border-zinc-200 dark:border-zinc-800"
              >
                <div className="flex items-center gap-2">
                  <img src={getAvatarUrl(user.avatar)} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                  <span>My Profile & Dashboard</span>
                </div>
                <span className="text-[10px] text-indigo-500 font-bold">View →</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className="text-left px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-xs text-zinc-500">
            <button onClick={() => { setIsMobileMenuOpen(false); setCurrentView('outfit-builder'); }}>
              Virtual Outfit Builder
            </button>
            <button onClick={() => { setIsMobileMenuOpen(false); setCurrentView('admin'); }}>
              Admin Panel
            </button>
          </div>
        </div>
      )}

      {/* User Authentication & Account Management Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};
