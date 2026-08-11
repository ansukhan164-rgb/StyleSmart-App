import { Product, RecommendationPreference, RecommendationResult, UserInteraction } from '../types';

export class StyleSmartRecommendationEngine {
  /**
   * Calculate hybrid recommendation score (0 - 100) for a product based on user preferences and interaction history.
   */
  public static calculateProductScore(
    product: Product,
    userPreferences: RecommendationPreference,
    interactions: UserInteraction[] = [],
    contextProductId?: string
  ): { score: number; confidenceLabel: string; reasons: string[] } {
    let score = 50; // baseline
    const reasons: string[] = [];

    // 1. Category & Subcategory Match (Weight: +15 max)
    if (userPreferences.preferredCategories.includes(product.category)) {
      score += 10;
      reasons.push(`In your favorite ${product.category} category`);
    }
    if (userPreferences.preferredSubCategories.includes(product.subCategory)) {
      score += 5;
    }

    // 2. Gender Preference Match (Weight: +10 max)
    if (product.gender === userPreferences.genderPreference || product.gender === 'Unisex') {
      score += 10;
    } else {
      score -= 15;
    }

    // 3. Style Preference Match (Weight: +15 max)
    if (userPreferences.preferredStyles.includes(product.style)) {
      score += 15;
      reasons.push(`Matches your ${product.style} aesthetic`);
    }

    // 4. Favorite Brands Match (Weight: +10 max)
    if (userPreferences.favoriteBrands.includes(product.brand)) {
      score += 10;
      reasons.push(`From your favorite brand ${product.brand}`);
    }

    // 5. Price Band Match (Weight: +15 max)
    if (
      product.price >= userPreferences.budgetMin &&
      product.price <= userPreferences.budgetMax
    ) {
      score += 15;
      reasons.push(`Fits your ₹${userPreferences.budgetMin.toLocaleString()} - ₹${userPreferences.budgetMax.toLocaleString()} budget`);
    } else if (product.price < userPreferences.budgetMin) {
      score += 5; // budget friendly
    } else {
      // higher price
      score -= 10;
    }

    // 6. User Behavior & Interactions Score (Weight: +20 max)
    const productInteractions = interactions.filter(i => i.productId === product.id);
    let behaviorPoints = 0;
    productInteractions.forEach(interaction => {
      if (interaction.eventType === 'purchase') behaviorPoints += 15;
      else if (interaction.eventType === 'cart') behaviorPoints += 10;
      else if (interaction.eventType === 'wishlist') behaviorPoints += 8;
      else if (interaction.eventType === 'click') behaviorPoints += 4;
      else if (interaction.eventType === 'view') behaviorPoints += 2;
    });
    if (behaviorPoints > 0) {
      score += Math.min(20, behaviorPoints);
      reasons.push(`Based on your recent browsing interactions`);
    }

    // 7. Popularity / Trending Boost (Weight: +10 max)
    if (product.rating >= 4.7) {
      score += 5;
    }
    if (product.isBestSeller || product.purchasesCount > 300) {
      score += 5;
      reasons.push('Highly rated by top fashion shoppers');
    }

    // 8. Contextual Product Similarity (if viewing a specific product)
    if (contextProductId && product.id !== contextProductId) {
      // check if tags or compatibility match
      if (product.compatibilityTags.some(tag => tag.includes('top') || tag.includes('bottom') || tag.includes('shoes'))) {
        score += 10;
        reasons.push('Stylistically compatible for a complete outfit');
      }
    }

    // Clamp score between 0 and 99
    const finalScore = Math.min(99, Math.max(25, Math.round(score)));
    const confidenceLabel = `${finalScore}% AI Match`;

    // Ensure at least 1-2 distinct explainable reasons
    if (reasons.length === 0) {
      reasons.push(`Curated based on top trending ${product.category} styles`);
    }

    return {
      score: finalScore,
      confidenceLabel,
      reasons: Array.from(new Set(reasons)).slice(0, 3)
    };
  }

  /**
   * Get Personalized Recommendations
   */
  public static getPersonalizedRecommendations(
    products: Product[],
    userPreferences: RecommendationPreference,
    interactions: UserInteraction[] = [],
    limit = 8
  ): RecommendationResult[] {
    const scored = products.map(product => {
      const { score, confidenceLabel, reasons } = this.calculateProductScore(
        product,
        userPreferences,
        interactions
      );
      return {
        product,
        score,
        confidenceLabel,
        reasons,
        recommendationType: 'personalized' as const
      };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  /**
   * Get "Because You Viewed This"
   */
  public static getBecauseYouViewed(
    products: Product[],
    recentlyViewedProductId: string,
    userPreferences: RecommendationPreference,
    limit = 6
  ): RecommendationResult[] {
    const anchorProduct = products.find(p => p.id === recentlyViewedProductId);
    if (!anchorProduct) return [];

    const filtered = products.filter(p => p.id !== anchorProduct.id);

    const scored = filtered.map(product => {
      let similarityScore = 40;
      const reasons: string[] = [`Similar to ${anchorProduct.title}`];

      if (product.category === anchorProduct.category) similarityScore += 25;
      if (product.style === anchorProduct.style) {
        similarityScore += 20;
        reasons.push(`Shares the same ${product.style} aesthetic`);
      }
      if (product.brand === anchorProduct.brand) similarityScore += 15;

      const finalScore = Math.min(98, Math.max(30, similarityScore));

      return {
        product,
        score: finalScore,
        confidenceLabel: `${finalScore}% Style Match`,
        reasons,
        recommendationType: 'because_viewed' as const
      };
    });

    return scored.sort((a, b) => b.score - a.score).slice(0, limit);
  }

  /**
   * Get "Complete The Look" / Outfit pairings
   */
  public static getCompleteTheLook(
    products: Product[],
    baseProduct: Product,
    limit = 3
  ): RecommendationResult[] {
    const complementary = products.filter(p => {
      if (p.id === baseProduct.id) return false;
      // Pair tops with bottoms/shoes/accessories, or vice versa
      const baseIsTop = baseProduct.subCategory.includes('T-Shirts') || baseProduct.subCategory.includes('Shirts') || baseProduct.subCategory.includes('Hoodies');
      const baseIsBottom = baseProduct.subCategory.includes('Jeans') || baseProduct.subCategory.includes('Trousers');
      
      if (baseIsTop) {
        return p.subCategory.includes('Jeans') || p.subCategory.includes('Trousers') || p.category === 'Footwear' || p.category === 'Accessories';
      } else if (baseIsBottom) {
        return p.subCategory.includes('T-Shirts') || p.subCategory.includes('Shirts') || p.subCategory.includes('Hoodies') || p.category === 'Footwear';
      }
      return p.category !== baseProduct.category || p.style === baseProduct.style;
    });

    return complementary.map(p => {
      const matchScore = Math.min(99, 85 + Math.floor(Math.random() * 12));
      return {
        product: p,
        score: matchScore,
        confidenceLabel: `${matchScore}% Outfit Synergy`,
        reasons: [`Stylistically pairs with ${baseProduct.brand} ${baseProduct.subCategory}`],
        recommendationType: 'complete_look' as const
      };
    }).slice(0, limit);
  }

  /**
   * Natural Language Search Intent Parser
   */
  public static parseSearchQuery(query: string) {
    const lower = query.toLowerCase();
    const result = {
      color: '',
      style: '',
      category: '',
      gender: '',
      maxPrice: 0,
      keywords: lower
    };

    // Extract colors
    const colors = ['black', 'white', 'olive', 'green', 'blue', 'pink', 'tan', 'beige', 'red', 'yellow', 'gold'];
    colors.forEach(c => {
      if (lower.includes(c)) result.color = c;
    });

    // Extract styles
    if (lower.includes('oversized') || lower.includes('street') || lower.includes('hoodie')) result.style = 'Streetwear';
    else if (lower.includes('formal') || lower.includes('suit') || lower.includes('office')) result.style = 'Formal';
    else if (lower.includes('minimal') || lower.includes('linen') || lower.includes('clean')) result.style = 'Minimalist';
    else if (lower.includes('ethnic') || lower.includes('silk') || lower.includes('festive')) result.style = 'Ethnic';

    // Extract price constraints e.g. "under 2000", "under ₹1000", "< 3000"
    const priceMatch = lower.match(/(?:under|below|less than|<|₹|\$)\s*(\d+)/i);
    if (priceMatch) {
      result.maxPrice = parseInt(priceMatch[1], 10);
    }

    // Extract gender
    if (lower.includes('men') && !lower.includes('women')) result.gender = 'Men';
    else if (lower.includes('women')) result.gender = 'Women';
    else if (lower.includes('kid')) result.gender = 'Kids';

    return result;
  }
}
