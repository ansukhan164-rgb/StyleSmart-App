import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminLoginPage } from './AdminLoginPage';
import { AdminDashboardView } from './AdminDashboardView';
import { AdminProductsView } from './AdminProductsView';
import { AdminCategoriesView } from './AdminCategoriesView';
import { AdminBrandsView } from './AdminBrandsView';
import { AdminInventoryView } from './AdminInventoryView';
import { AdminOrdersView } from './AdminOrdersView';
import { AdminCustomersView } from './AdminCustomersView';
import { AdminReviewsView } from './AdminReviewsView';
import { AdminCouponsView } from './AdminCouponsView';
import { AdminAnalyticsView } from './AdminAnalyticsView';
import { AdminRecommendationsView } from './AdminRecommendationsView';
import { AdminSettingsView } from './AdminSettingsView';
import { AdminBrandingView } from './AdminBrandingView';

export const AdminLayout: React.FC = () => {
  const { isAdminLoggedIn, adminRoute } = useApp();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // If not authenticated or on login page, render AdminLoginPage
  if (!isAdminLoggedIn || adminRoute === 'login') {
    return <AdminLoginPage />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Sidebar */}
      <AdminSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminHeader setIsMobileOpen={setIsMobileOpen} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {adminRoute === 'dashboard' && <AdminDashboardView />}
          {adminRoute === 'products' && <AdminProductsView />}
          {adminRoute === 'categories' && <AdminCategoriesView />}
          {adminRoute === 'brands' && <AdminBrandsView />}
          {adminRoute === 'inventory' && <AdminInventoryView />}
          {adminRoute === 'orders' && <AdminOrdersView />}
          {adminRoute === 'customers' && <AdminCustomersView />}
          {adminRoute === 'reviews' && <AdminReviewsView />}
          {adminRoute === 'coupons' && <AdminCouponsView />}
          {adminRoute === 'analytics' && <AdminAnalyticsView />}
          {adminRoute === 'recommendations' && <AdminRecommendationsView />}
          {adminRoute === 'branding' && <AdminBrandingView />}
          {adminRoute === 'settings' && <AdminSettingsView />}
        </main>
      </div>
    </div>
  );
};
