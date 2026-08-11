import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Search,
  ExternalLink,
  Shield,
  CheckCircle2,
  AlertTriangle,
  ShoppingBag,
  LogOut,
  Sparkles,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AdminHeaderProps {
  setIsMobileOpen: (open: boolean) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ setIsMobileOpen }) => {
  const {
    adminRoute,
    adminUser,
    adminLogout,
    setCurrentView,
    adminNotifications,
    markNotificationRead
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadNotifs = adminNotifications.filter(n => !n.read);

  // Format title
  const routeTitles: Record<string, string> = {
    dashboard: 'Analytics Dashboard Overview',
    products: 'Product Inventory & Catalog',
    categories: 'Categories & Subcategories Management',
    brands: 'Brand Partners Directory',
    inventory: 'Real-time Stock Monitor',
    orders: 'Orders & Fulfillment Pipeline',
    customers: 'Registered Customer Accounts',
    reviews: 'Reviews & Customer Feedback Moderation',
    coupons: 'Promotional Coupons & Offer Codes',
    analytics: 'Deep Business Analytics',
    recommendations: 'AI Recommendation Performance Metrics',
    branding: 'Portal Branding & Identity',
    settings: 'System & Security Settings'
  };

  return (
    <header className="h-16 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between gap-4">
      {/* Left side: Mobile Toggle & Route Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
            <span>ADMIN</span>
            <span>/</span>
            <span className="capitalize text-indigo-400 font-medium">{adminRoute}</span>
          </div>
          <h1 className="text-sm font-semibold text-slate-100 hidden sm:block">
            {routeTitles[adminRoute] || 'Admin Control Panel'}
          </h1>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="flex-1 max-w-md hidden md:block relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search products, orders, customers, SKUs..."
          className="w-full pl-9 pr-4 py-1.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        />
      </div>

      {/* Right side: Quick Actions & Profile */}
      <div className="flex items-center gap-3">
        {/* Live Storefront Button */}
        <button
          onClick={() => setCurrentView('home')}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-slate-700/60 transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Store</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sky-400 ring-2 ring-slate-900 animate-pulse" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-semibold text-slate-100">System Notifications</span>
                </div>
                <button
                  onClick={() => setIsNotifOpen(false)}
                  className="text-slate-500 hover:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                {adminNotifications.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4">No new notifications</p>
                ) : (
                  adminNotifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-2.5 rounded-xl text-xs cursor-pointer transition-colors border ${
                        n.read
                          ? 'bg-slate-950/40 border-slate-800/60 text-slate-400'
                          : 'bg-slate-800/80 border-indigo-500/30 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold text-[11px] mb-1">
                        <span className={n.type === 'stock' ? 'text-amber-400' : 'text-sky-400'}>
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-500">{n.timestamp}</span>
                      </div>
                      <p className="text-[11px] leading-snug">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <img
              src={adminUser?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'}
              alt="Admin"
              className="w-8 h-8 rounded-lg object-cover ring-1 ring-indigo-500/40"
            />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50">
              <div className="p-2 border-b border-slate-800 mb-2">
                <p className="text-xs font-semibold text-slate-100">{adminUser?.name || 'Ansar Khan'}</p>
                <p className="text-[10px] text-slate-400 font-mono">{adminUser?.email || 'admin@stylesmart.ai'}</p>
              </div>

              <div className="space-y-1">
                <div className="px-2 py-1.5 rounded-lg text-xs text-indigo-300 bg-indigo-950/40 border border-indigo-800/30 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Role: {adminUser?.role || 'SUPER_ADMIN'}</span>
                </div>

                <button
                  onClick={adminLogout}
                  className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
