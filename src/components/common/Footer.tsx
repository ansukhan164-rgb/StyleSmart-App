import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Truck, RotateCcw, Headset, ArrowRight, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentView, handleSignInClick, showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      showToast('Thank you for subscribing! You unlocked 15% OFF your next order.');
      setEmail('');
    }
  };

  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800 pt-16 pb-24 sm:pb-12 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Value Props Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-zinc-800/80">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Express Delivery</h4>
              <p className="text-xs text-zinc-400">Free shipping on orders over ₹1,500</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400 shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">14-Day Free Returns</h4>
              <p className="text-xs text-zinc-400">Hassle-free instant pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">100% Authentic</h4>
              <p className="text-xs text-zinc-400">Directly sourced luxury brands</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400 shrink-0">
              <Headset className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">24/7 AI Fashion Support</h4>
              <p className="text-xs text-zinc-400">Instant styling guidance</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white font-black text-base">
                S
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                StyleSmart
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Next-generation AI-powered fashion marketplace. Blending hyper-personalized recommendation scoring, virtual outfit building, and natural language style intelligence for modern shoppers.
            </p>
            <div className="flex items-center gap-3 pt-2 text-zinc-400">
              <a href="#" className="p-2 rounded-lg bg-zinc-900 hover:text-white hover:bg-zinc-800 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-zinc-900 hover:text-white hover:bg-zinc-800 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-zinc-900 hover:text-white hover:bg-zinc-800 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-zinc-900 hover:text-white hover:bg-zinc-800 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Shop Collections</h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button onClick={() => setCurrentView('shop')} className="hover:text-white transition-colors">Men's Streetwear</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('shop')} className="hover:text-white transition-colors">Women's Luxury Couture</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('shop')} className="hover:text-white transition-colors">Footwear & Sneakers</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('shop')} className="hover:text-white transition-colors">Accessories & Watches</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('shop')} className="hover:text-white transition-colors">Ethically Sourced Linen</button>
              </li>
            </ul>
          </div>

          {/* AI Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Customer Care & AI</h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li className="flex items-center gap-1.5 text-indigo-400 font-medium">
                <Truck className="w-3.5 h-3.5" />
                <button onClick={() => setCurrentView('tracking')} className="hover:text-white transition-colors text-indigo-400 font-bold">Live Order Tracking & Returns</button>
              </li>
              <li className="flex items-center gap-1.5 text-violet-400 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Style Score Engine</span>
              </li>
              <li>
                <button onClick={() => setCurrentView('outfit-builder')} className="hover:text-white transition-colors">Smart Outfit Builder</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('shop')} className="hover:text-white transition-colors">Visual Image Search</button>
              </li>
              <li>
                <button onClick={handleSignInClick} className="hover:text-white transition-colors">Sign In / My Account</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('profile')} className="hover:text-white transition-colors">Style & Fit Preferences</button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Stay Stylish</h4>
            <p className="text-xs text-zinc-400 mb-3">Subscribe for weekly AI fashion forecasts and secret drops.</p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address..."
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 StyleSmart AI. Made by Ansarul and Dibboo. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400">Terms of Service</a>
            <a href="#" className="hover:text-zinc-400">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
