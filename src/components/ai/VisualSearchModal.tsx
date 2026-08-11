import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Camera, Upload, X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { uploadVisualSearchImage } from '../../services/api';
import { Product } from '../../types';
import { ProductCard } from '../product/ProductCard';

export const VisualSearchModal: React.FC = () => {
  const { isVisualSearchOpen, setIsVisualSearchOpen } = useApp();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<{
    detectedAttributes?: any;
    matches: { product: Product; similarityScore: number }[];
  } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setSelectedImage(base64);
        runScan(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const runScan = async (base64: string) => {
    setIsScanning(true);
    setResults(null);

    try {
      const res = await uploadVisualSearchImage(base64);
      setResults(res);
    } catch (err) {
      console.warn('Visual search error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  if (!isVisualSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-base text-zinc-900 dark:text-white">
              AI Visual Product Search
            </h3>
          </div>
          <button
            onClick={() => setIsVisualSearchOpen(false)}
            className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* Upload Area */}
          {!selectedImage ? (
            <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-8 text-center flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 hover:border-indigo-500 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                <Upload className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-sm text-zinc-900 dark:text-white mb-1">
                Upload or drag a outfit photo
              </h4>
              <p className="text-xs text-zinc-500 mb-4 max-w-xs">
                Upload any picture of clothing, shoes, or accessories to find visually matching products in our catalog.
              </p>
              <label className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer transition-colors shadow-md">
                Select Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Image Preview with Scanning Animation */}
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                <img
                  src={selectedImage}
                  alt="Uploaded target"
                  className="w-full h-full object-cover"
                />

                {/* Laser scan line overlay */}
                {isScanning && (
                  <motion.div
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                    className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee]"
                  />
                )}

                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setResults(null);
                  }}
                  className="absolute top-2 right-2 px-2 py-1 rounded bg-black/60 text-white text-[10px] font-semibold backdrop-blur-md"
                >
                  Change Photo
                </button>
              </div>

              {/* Analysis & Detection Results */}
              <div className="md:col-span-2 space-y-4">
                {isScanning ? (
                  <div className="p-6 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-indigo-600 animate-spin" />
                    <div>
                      <h5 className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                        Analyzing visual attributes...
                      </h5>
                      <p className="text-[11px] text-indigo-700 dark:text-indigo-300">
                        Extracting fabric texture, sleeve cut, color palette, and pattern...
                      </p>
                    </div>
                  </div>
                ) : results ? (
                  <div className="space-y-4">
                    {/* Detected Attributes Badges */}
                    <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>AI Garment Feature Extraction</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-600 dark:text-zinc-400">
                        <div>Item Type: <strong className="text-zinc-900 dark:text-white">{results.detectedAttributes?.itemType}</strong></div>
                        <div>Color: <strong className="text-zinc-900 dark:text-white">{results.detectedAttributes?.color}</strong></div>
                        <div>Style: <strong className="text-zinc-900 dark:text-white">{results.detectedAttributes?.style}</strong></div>
                        <div>Pattern: <strong className="text-zinc-900 dark:text-white">{results.detectedAttributes?.pattern}</strong></div>
                      </div>
                    </div>

                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Visually Similar Products ({results.matches.length})
                    </h4>

                    {/* Matched Product Cards Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {results.matches.map(m => (
                        <ProductCard
                          key={m.product.id}
                          product={m.product}
                          matchScore={m.similarityScore}
                          confidenceLabel={`${m.similarityScore}% Visual Match`}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
