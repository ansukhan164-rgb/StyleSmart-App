import React, { useRef, useState } from 'react';
import {
  LayoutDashboard,
  Package,
  Layers,
  Award,
  Boxes,
  ShoppingBag,
  Users,
  Star,
  Ticket,
  BarChart3,
  Brain,
  Settings,
  Palette,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  ExternalLink,
  Upload,
  Pencil,
  Check,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminRoute } from '../../types/admin';
import { validateAvatarFile, compressAndResizeAvatar } from '../../lib/avatarUtils';

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen
}) => {
  const {
    adminRoute,
    setAdminRoute,
    adminLogout,
    adminUser,
    adminBranding,
    products,
    orders,
    adminReviews,
    setCurrentView,
    updateAdminAvatar,
    updateAdminProfile,
    showToast
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(adminUser?.name || 'Ansar Khan');

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateAvatarFile(file);
    if (!validation.valid) {
      showToast(validation.error || 'Invalid image file.', 'warning');
      return;
    }

    try {
      setUploading(true);
      const compressed = await compressAndResizeAvatar(file, 200, 0.9);
      updateAdminAvatar(compressed);
      showToast('Profile picture updated successfully from device!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to process image.', 'warning');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    updateAdminProfile(newName.trim(), adminUser?.email || 'admin@stylesmart.ai');
    setIsEditingName(false);
    showToast('Admin name updated successfully!', 'success');
  };

  // Badges
  const lowStockCount = products.filter(p => p.stockCount < 10).length;
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;
  const pendingReviewsCount = adminReviews.filter(r => r.status === 'Pending').length;

  const NAV_ITEMS: {
    id: AdminRoute;
    label: string;
    icon: React.ElementType;
    badge?: number;
    badgeColor?: string;
  }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'brands', label: 'Brands', icon: Award },
    { id: 'inventory', label: 'Inventory & Stock', icon: Boxes, badge: lowStockCount, badgeColor: 'bg-amber-500/20 text-amber-300' },
    { id: 'orders', label: 'Orders & Fulfillment', icon: ShoppingBag, badge: pendingOrdersCount, badgeColor: 'bg-sky-500/20 text-sky-300' },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'reviews', label: 'Reviews & Rating', icon: Star, badge: pendingReviewsCount, badgeColor: 'bg-indigo-500/20 text-indigo-300' },
    { id: 'coupons', label: 'Coupons & Offers', icon: Ticket },
    { id: 'analytics', label: 'Business Analytics', icon: BarChart3 },
    { id: 'recommendations', label: 'AI Performance', icon: Brain },
    { id: 'branding', label: 'Portal Branding', icon: Palette },
    { id: 'settings', label: 'System Settings', icon: Settings }
  ];

  const handleNavClick = (route: AdminRoute) => {
    setAdminRoute(route);
    if (isMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 bottom-0 z-40 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-400 p-0.5 shrink-0 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] overflow-hidden flex items-center justify-center">
                {adminBranding?.portalLogo ? (
                  <img src={adminBranding.portalLogo} alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <ShieldAlert className="w-5 h-5 text-sky-400" />
                )}
              </div>
            </div>
            {!isCollapsed && (
              <div className="leading-none truncate">
                <span className="font-bold text-sm tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent truncate block">
                  {adminBranding?.portalName || 'StyleSmart'}
                </span>
                <span className="block text-[10px] text-indigo-400 font-mono mt-0.5 truncate">
                  {adminBranding?.portalSubtitle || 'ADMIN CONSOLE'}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = adminRoute === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/30 to-sky-500/20 text-white border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-sky-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />

                {!isCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                      item.badgeColor || 'bg-indigo-500/20 text-indigo-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-800 space-y-2">
          {/* Quick Storefront View */}
          <button
            onClick={() => setCurrentView('home')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors group"
            title="View Live Customer Storefront"
          >
            <ExternalLink className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-sky-400" />
            {!isCollapsed && <span className="truncate">Exit to Storefront</span>}
          </button>

          {/* User Profile Card & Logout */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="hidden"
              />
              <div 
                onClick={handleAvatarClick}
                className="relative group/avatar cursor-pointer shrink-0"
                title="Click to upload profile picture from device"
              >
                <img
                  src={adminUser?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'}
                  alt={adminUser?.name || 'Admin'}
                  className="w-8 h-8 rounded-lg object-cover ring-1 ring-indigo-500/40 group-hover/avatar:opacity-80 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                  <Upload className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              {!isCollapsed && (
                <div className="truncate text-left leading-tight flex-1">
                  {isEditingName ? (
                    <form onSubmit={handleSaveName} className="flex items-center gap-1">
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full bg-slate-900 border border-indigo-500 rounded px-1.5 py-0.5 text-xs text-white focus:outline-none"
                        autoFocus
                      />
                      <button type="submit" className="p-1 text-emerald-400 hover:text-emerald-300" title="Save name">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" onClick={() => setIsEditingName(false)} className="p-1 text-slate-400 hover:text-slate-200" title="Cancel">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  ) : (
                    <div className="flex items-center gap-1.5 group/name">
                      <p className="text-xs font-semibold text-slate-200 truncate">{adminUser?.name || 'Ansar Khan'}</p>
                      <button
                        onClick={() => {
                          setNewName(adminUser?.name || 'Ansar Khan');
                          setIsEditingName(true);
                        }}
                        className="opacity-0 group-hover/name:opacity-100 text-slate-400 hover:text-indigo-400 transition-opacity"
                        title="Rename profile"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <p className="text-[10px] text-slate-400 truncate font-mono">{adminUser?.role || 'SUPER_ADMIN'}</p>
                </div>
              )}
            </div>

            <button
              onClick={adminLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Sign Out of Admin Console"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
