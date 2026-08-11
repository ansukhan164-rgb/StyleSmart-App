import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Eye, Sparkles, Scale, Star, ArrowUpRight } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProductCardProps {
  product: Product;
  matchScore?: number;
  confidenceLabel?: string;
  reason?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  matchScore,
  confidenceLabel,
  reason
}) => {
  const {
    addToCart,
    buyNow,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    setSelectedProductId,
    setCurrentView,
    setQuickViewProduct
  } = useApp();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [isHovered, setIsHovered] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  const handleCardClick = () => {
    setSelectedProductId(product.id);
    setCurrentView('pdp');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images.length > 1) setCurrentImageIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
      className="group relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Media Image Container */}
      <div className="relative aspect-[3/4] bg-zinc-100 dark:bg-zinc-800 overflow-hidden cursor-pointer" onClick={handleCardClick}>
        <img
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* AI Match Score Badge */}
        {(matchScore || confidenceLabel) && (
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30 text-[10px] font-bold tracking-wide shadow-md">
            <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
            <span>{confidenceLabel || `${matchScore}% Match`}</span>
          </div>
        )}

        {/* Discount Tag */}
        {product.discountPercent > 0 && !(matchScore || confidenceLabel) && (
          <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-extrabold tracking-wider uppercase shadow-md">
            {product.discountPercent}% OFF
          </div>
        )}

        {/* Top Right Actions (Wishlist & Compare) */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5">
          <button
            onClick={e => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-2 rounded-full backdrop-blur-md shadow-md transition-all ${
              inWishlist
                ? 'bg-rose-500 text-white scale-110'
                : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-200 hover:bg-white dark:hover:bg-zinc-900 hover:text-rose-500'
            }`}
            title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={e => {
              e.stopPropagation();
              toggleCompare(product);
            }}
            className={`p-2 rounded-full backdrop-blur-md shadow-md transition-all ${
              inCompare
                ? 'bg-indigo-600 text-white'
                : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-200 hover:bg-white dark:hover:bg-zinc-900 hover:text-indigo-600'
            }`}
            title="Compare product"
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>

        {/* Hover Quick Size Bar Overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-zinc-950/90 via-zinc-950/60 to-transparent transition-opacity duration-300 flex flex-col gap-2 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Size Pills */}
          <div className="flex items-center justify-center gap-1 overflow-x-auto py-1">
            <span className="text-[10px] font-medium text-zinc-300 mr-1">Size:</span>
            {product.sizes.map(sz => (
              <button
                key={sz}
                onClick={e => {
                  e.stopPropagation();
                  setSelectedSize(sz);
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                  selectedSize === sz
                    ? 'bg-white text-zinc-950'
                    : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={e => {
                e.stopPropagation();
                addToCart(product, product.colors[0], selectedSize);
              }}
              className="flex-1 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-semibold flex items-center justify-center gap-1 shadow-md transition-colors"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>Bag</span>
            </button>
            <button
              onClick={e => {
                e.stopPropagation();
                buyNow(product, product.colors[0], selectedSize);
              }}
              className="flex-1 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow-md transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              <span>Buy Now</span>
            </button>
            <button
              onClick={e => {
                e.stopPropagation();
                setQuickViewProduct(product);
              }}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center justify-center transition-colors"
              title="Quick Preview"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Info Section */}
      <div className="p-4 flex flex-col justify-between flex-1 gap-2">
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-1">
            <span className="uppercase tracking-wider text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400">
              {product.brand}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-bold text-zinc-800 dark:text-zinc-200">{product.rating}</span>
              <span className="text-[10px] text-zinc-400">({product.reviewCount})</span>
            </div>
          </div>

          <h3
            onClick={handleCardClick}
            className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white line-clamp-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
          >
            {product.title}
          </h3>

          {/* Explainable AI reason snippet */}
          {reason && (
            <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium line-clamp-1 mt-1">
              💡 {reason}
            </p>
          )}
        </div>

        {/* Pricing */}
        <div className="flex items-baseline justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/60 mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-extrabold text-zinc-900 dark:text-white">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-zinc-400 line-through font-normal">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleCardClick}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
          >
            <span>View</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
