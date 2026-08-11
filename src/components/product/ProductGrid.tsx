import React from 'react';
import { ProductCard } from './ProductCard';
import { Product, RecommendationResult } from '../../types';
import { ShoppingBag } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  recommendationResults?: RecommendationResult[];
  isLoading?: boolean;
  emptyMessage?: string;
  gridCols?: 2 | 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  recommendationResults,
  isLoading = false,
  emptyMessage = 'No products found matching your filter criteria.',
  gridCols = 4
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse bg-zinc-100 dark:bg-zinc-800/60 rounded-2xl aspect-[3/4] p-4 flex flex-col justify-end"
          >
            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2 mb-2" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0 && (!recommendationResults || recommendationResults.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">No Fashion Match</h3>
        <p className="text-sm text-zinc-500 max-w-sm">{emptyMessage}</p>
      </div>
    );
  }

  const colsClass =
    gridCols === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : gridCols === 3
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';

  if (recommendationResults && recommendationResults.length > 0) {
    return (
      <div className={`grid ${colsClass} gap-4 sm:gap-6`}>
        {recommendationResults.map(rec => (
          <ProductCard
            key={rec.product.id}
            product={rec.product}
            matchScore={rec.score}
            confidenceLabel={rec.confidenceLabel}
            reason={rec.reasons[0]}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid ${colsClass} gap-4 sm:gap-6`}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
