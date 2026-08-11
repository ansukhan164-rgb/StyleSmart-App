import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { ToastContainer } from './components/common/ToastContainer';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { OutfitStudioPage } from './pages/OutfitStudioPage';
import { AuthPage } from './pages/AuthPage';
import { ProfilePage } from './pages/ProfilePage';
import { OrderTrackingReturnsPage } from './pages/OrderTrackingReturnsPage';
import { CartCheckoutPage } from './pages/CartCheckoutPage';
import { AdminLayout } from './components/admin/AdminLayout';
import { AIStyleAssistant } from './components/ai/AIStyleAssistant';
import { VisualSearchModal } from './components/ai/VisualSearchModal';
import { CompareModal } from './components/ai/CompareModal';
import { QuickViewModal } from './components/ai/QuickViewModal';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView, isLoggedIn, user } = useApp();

  useEffect(() => {
    console.log(`[AppContent Debug] View rendered: "${currentView}", isLoggedIn: ${isLoggedIn}, user: "${user?.name || 'Guest'}"`);
  }, [currentView, isLoggedIn, user]);

  const isAdminView = typeof currentView === 'string' && currentView.startsWith('admin');

  // Dedicated full-screen Admin Portal Layout
  if (isAdminView) {
    return (
      <ErrorBoundary onReset={() => setCurrentView('home')}>
        <AdminLayout />
        <ToastContainer />
      </ErrorBoundary>
    );
  }

  // View Resolver with Fallback and Route Alias Handling
  const renderViewContent = () => {
    const viewKey = String(currentView);
    switch (viewKey) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'pdp':
        return <ProductDetailPage />;
      case 'outfit-builder':
        return <OutfitStudioPage />;
      case 'auth':
      case 'login':
      case 'register':
        return <AuthPage />;
      case 'profile':
      case 'account':
      case 'orders':
      case 'addresses':
      case 'wishlist':
        return <ProfilePage />;
      case 'tracking':
        return <OrderTrackingReturnsPage />;
      case 'cart':
      case 'checkout':
        return <CartCheckoutPage />;
      default:
        console.warn(`[AppContent] Unrecognized view state "${currentView}". Rendering default fallback view.`);
        return isLoggedIn ? <ProfilePage /> : <HomePage />;
    }
  };

  // Customer Storefront Layout
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      <main className="flex-1 pb-20 md:pb-12 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <ErrorBoundary onReset={() => setCurrentView('home')}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView || 'home'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {renderViewContent()}
            </motion.div>
          </AnimatePresence>
        </ErrorBoundary>
      </main>

      <Footer />
      <MobileBottomNav />

      {/* AI Assistant Drawer */}
      <AIStyleAssistant />

      {/* Visual Search Modal */}
      <VisualSearchModal />

      {/* Product Comparison Modal */}
      <CompareModal />

      {/* Quick View Modal */}
      <QuickViewModal />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
