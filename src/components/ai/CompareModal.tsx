import React from 'react';
import { motion } from 'motion/react';
import { X, Scale, Star, ShoppingBag, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CompareModal: React.FC = () => {
  const { compareList, toggleCompare, clearCompare, isCompareOpen, setIsCompareOpen, addToCart } = useApp();

  if (!isCompareOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-5xl bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-base text-zinc-900 dark:text-white">
              Compare Products ({compareList.length}/4)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1 mr-4"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsCompareOpen(false)}
              className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-x-auto overflow-y-auto">
          {compareList.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-zinc-500">No products added for comparison yet.</p>
              <p className="text-xs text-zinc-400 mt-1">Click the scale icon on any product card to compare.</p>
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr>
                  <th className="p-3 bg-zinc-50 dark:bg-zinc-900 font-bold text-zinc-500 w-32 min-w-[120px]">
                    Attribute
                  </th>
                  {compareList.map(prod => (
                    <th key={prod.id} className="p-3 min-w-[200px] align-top">
                      <div className="relative group">
                        <button
                          onClick={() => toggleCompare(prod)}
                          className="absolute -top-1 -right-1 p-1 rounded-full bg-rose-500 text-white shadow hover:scale-110 transition-transform"
                          title="Remove from comparison"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <img
                          src={prod.images[0]}
                          alt={prod.title}
                          className="w-full aspect-square object-cover rounded-xl mb-2"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-[10px] font-bold text-indigo-600 uppercase block">
                          {prod.brand}
                        </span>
                        <h4 className="font-bold text-zinc-900 dark:text-white line-clamp-1">
                          {prod.title}
                        </h4>
                        <div className="mt-2">
                          <button
                            onClick={() => addToCart(prod)}
                            className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center justify-center gap-1 text-[11px]"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                <tr>
                  <td className="p-3 font-semibold bg-zinc-50 dark:bg-zinc-900">Price</td>
                  {compareList.map(p => (
                    <td key={p.id} className="p-3 font-bold text-zinc-900 dark:text-white">
                      ₹{p.price.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold bg-zinc-50 dark:bg-zinc-900">Rating</td>
                  {compareList.map(p => (
                    <td key={p.id} className="p-3">
                      <div className="flex items-center gap-1 font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{p.rating}</span>
                        <span className="text-[10px] text-zinc-400">({p.reviewCount})</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold bg-zinc-50 dark:bg-zinc-900">Material</td>
                  {compareList.map(p => (
                    <td key={p.id} className="p-3">{p.material}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold bg-zinc-50 dark:bg-zinc-900">Style</td>
                  {compareList.map(p => (
                    <td key={p.id} className="p-3 font-medium">{p.style}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold bg-zinc-50 dark:bg-zinc-900">Sizes</td>
                  {compareList.map(p => (
                    <td key={p.id} className="p-3">{p.sizes.join(', ')}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold bg-zinc-50 dark:bg-zinc-900">Colors</td>
                  {compareList.map(p => (
                    <td key={p.id} className="p-3">
                      <div className="flex items-center gap-1">
                        {p.colors.map(c => (
                          <span
                            key={c.name}
                            className="w-3.5 h-3.5 rounded-full border border-zinc-400"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </div>
  );
};
