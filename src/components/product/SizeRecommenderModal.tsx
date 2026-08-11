import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Ruler, CheckCircle2 } from 'lucide-react';
import { Product } from '../../types';

interface SizeRecommenderModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSelectRecommendedSize: (size: string) => void;
}

export const SizeRecommenderModal: React.FC<SizeRecommenderModalProps> = ({
  product,
  isOpen,
  onClose,
  onSelectRecommendedSize
}) => {
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('70');
  const [chest, setChest] = useState('40');
  const [fitPreference, setFitPreference] = useState<'Tight' | 'Regular' | 'Oversized'>('Regular');

  const [recommendedSize, setRecommendedSize] = useState<string | null>(null);

  if (!isOpen) return null;

  const calculateSize = () => {
    const w = Number(weight);
    let size = 'M';
    if (w < 60) size = 'S';
    else if (w >= 60 && w < 75) size = 'M';
    else if (w >= 75 && w < 88) size = 'L';
    else if (w >= 88) size = 'XL';

    if (fitPreference === 'Oversized' && size !== 'XL') {
      const sizes = ['S', 'M', 'L', 'XL'];
      const idx = sizes.indexOf(size);
      if (idx > -1 && idx < sizes.length - 1) size = sizes[idx + 1];
    }
    setRecommendedSize(size);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-5"
      >
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-base text-zinc-900 dark:text-white">
              AI Size Recommender
            </h3>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!recommendedSize ? (
          <div className="space-y-4">
            <p className="text-xs text-zinc-500">
              Enter your body measurements to get our AI fit recommendation for <strong>{product.title}</strong>.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={e => setHeight(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                Chest/Bust (inches)
              </label>
              <input
                type="number"
                value={chest}
                onChange={e => setChest(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                Fit Preference
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Tight', 'Regular', 'Oversized'] as const).map(fit => (
                  <button
                    key={fit}
                    type="button"
                    onClick={() => setFitPreference(fit)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      fitPreference === fit
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800'
                    }`}
                  >
                    {fit}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculateSize}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Calculate My Size</span>
            </button>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs text-zinc-400 block uppercase font-bold tracking-wider">Recommended Size</span>
              <div className="text-4xl font-extrabold text-zinc-900 dark:text-white my-1">
                {recommendedSize}
              </div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                98% Fit Confidence for {fitPreference} fit
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  onSelectRecommendedSize(recommendedSize);
                  onClose();
                }}
                className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs"
              >
                Apply Size {recommendedSize}
              </button>
              <button
                onClick={() => setRecommendedSize(null)}
                className="px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold"
              >
                Recalculate
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
