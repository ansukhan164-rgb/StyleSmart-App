import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Star, Heart, ShoppingBag, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist, setSelectedProductId, setCurrentView } = useApp();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const inWishlist = isInWishlist(product.id);
  const activeSize = selectedSize || product.sizes[0] || 'Standard';

  const handleFullView = () => {
    setSelectedProductId(product.id);
    setCurrentView('pdp');
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden max-h-[90vh] flex flex-col md:flex-row relative"
      >
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:scale-110 transition-transform"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Column */}
        <div className="w-full md:w-1/2 p-4 bg-zinc-50 dark:bg-zinc-900 flex flex-col justify-between">
          <div className="aspect-[3/4] rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 relative">
            <img
              src={product.images[0] || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800'}
              alt={product.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Info Column */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              {product.brand}
            </span>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-1">
              {product.title}
            </h3>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 font-bold text-xs text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
              </div>
              <span className="text-xs text-zinc-400">({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-xl font-extrabold text-zinc-900 dark:text-white">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-zinc-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span className="text-xs font-bold text-rose-600">
                  ({product.discountPercent}% OFF)
                </span>
              )}
            </div>

            {/* Colors */}
            <div className="mt-4">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-2">
                Color: {product.colors[selectedColor]?.name}
              </label>
              <div className="flex gap-2">
                {product.colors.map((c, idx) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      selectedColor === idx ? 'scale-110 border-indigo-600' : 'border-zinc-300'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-4">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-2">
                Select Size
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                      activeSize === sz
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  addToCart(product, product.colors[selectedColor], activeSize);
                  setQuickViewProduct(null);
                }}
                className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-xl border text-xs font-semibold ${
                  inWishlist ? 'bg-rose-500 text-white border-rose-500' : 'border-zinc-300 dark:border-zinc-700'
                }`}
              >
                <Heart className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleFullView}
              className="w-full py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center justify-center gap-1"
            >
              <span>View Full Product Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
