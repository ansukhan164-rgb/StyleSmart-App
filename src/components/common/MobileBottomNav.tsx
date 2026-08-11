import React from 'react';
import { Home, Compass, Sparkles, User, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileBottomNav: React.FC = () => {
  const { currentView, setCurrentView, cart, handleSignInClick, isLoggedIn, setIsAIAssistantOpen } = useApp();

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 px-3 py-2 flex items-center justify-around text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
      <button
        onClick={() => setCurrentView('home')}
        className={`flex flex-col items-center gap-1 transition-colors ${
          currentView === 'home' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </button>

      <button
        onClick={() => setCurrentView('shop')}
        className={`flex flex-col items-center gap-1 transition-colors ${
          currentView === 'shop' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
        }`}
      >
        <Compass className="w-5 h-5" />
        <span>Discover</span>
      </button>

      {/* AI Assistant Central Pulse Button */}
      <button
        onClick={() => setIsAIAssistantOpen(true)}
        className="flex flex-col items-center justify-center relative -top-3"
      >
        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/40 ring-4 ring-white dark:ring-zinc-950">
          <Sparkles className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 mt-0.5">AI Stylist</span>
      </button>

      <button
        onClick={() => setCurrentView('cart')}
        className={`flex flex-col items-center gap-1 relative transition-colors ${
          currentView === 'cart' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
        }`}
      >
        <ShoppingBag className="w-5 h-5" />
        <span>Cart</span>
        {cartItemCount > 0 && (
          <span className="absolute -top-1 right-1 w-3.5 h-3.5 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
      </button>

      <button
        onClick={handleSignInClick}
        className={`flex flex-col items-center gap-1 relative transition-colors ${
          currentView === 'profile' || currentView === 'auth' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
        }`}
      >
        <User className="w-5 h-5" />
        <span>{isLoggedIn ? 'Account' : 'Sign In'}</span>
      </button>
    </nav>
  );
};
