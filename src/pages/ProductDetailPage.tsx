import React, { useEffect, useState } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  Sparkles,
  Truck,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Ruler,
  Share2,
  ArrowRight,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { fetchProductById } from '../services/api';
import { Product, RecommendationResult } from '../types';
import { ProductGrid } from '../components/product/ProductGrid';
import { SizeRecommenderModal } from '../components/product/SizeRecommenderModal';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    addToCart,
    buyNow,
    toggleWishlist,
    isInWishlist,
    addRecentlyViewed,
    showToast,
    setCurrentView,
    products
  } = useApp();

  const [productData, setProductData] = useState<{
    product: Product;
    completeLook: RecommendationResult[];
    similarProducts: RecommendationResult[];
  } | null>(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [pincode, setPincode] = useState('110001');
  const [deliveryAvailable, setDeliveryAvailable] = useState<boolean | null>(null);

  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'reviews'>('details');

  // Customer Reviews State
  const [reviewsList, setReviewsList] = useState([
    {
      id: 'rev-1',
      author: 'Rohan Sharma',
      rating: 5,
      date: 'Feb 02, 2026',
      fit: 'True to Size',
      title: 'Flawless heavy-cotton drop and fit!',
      comment: 'The fabric weight is thick and structured as advertised. AI size recommender suggested L and it fits perfectly with slight oversize.',
      photo: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=400',
      verified: true
    },
    {
      id: 'rev-2',
      author: 'Priya V.',
      rating: 4,
      date: 'Jan 28, 2026',
      fit: 'Slightly Large',
      title: 'Super stylish streetwear staple',
      comment: 'Loved the stitching quality and deep color saturation. Highly recommend pairing with cargo pants.',
      verified: true
    }
  ]);

  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newFit, setNewFit] = useState('True to Size');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newComment.trim()) {
      showToast('Please enter review title and comment', 'warning');
      return;
    }
    const created = {
      id: `rev-${Date.now()}`,
      author: 'Alex Rivera',
      rating: newRating,
      date: 'Just now',
      fit: newFit,
      title: newTitle,
      comment: newComment,
      photo: newPhotoUrl || undefined,
      verified: true
    };
    setReviewsList([created, ...reviewsList]);
    setIsWritingReview(false);
    setNewTitle('');
    setNewComment('');
    setNewPhotoUrl('');
    showToast('Thank you! Your photo review has been published.');
  };

  useEffect(() => {
    if (selectedProductId) {
      fetchProductById(selectedProductId).then(data => {
        if (data) {
          setProductData(data);
          setSelectedSize(data.product.sizes[0] || 'M');
          addRecentlyViewed(data.product);
        }
      });
    } else if (products.length > 0) {
      fetchProductById(products[0].id).then(data => {
        if (data) {
          setProductData(data);
          setSelectedSize(data.product.sizes[0] || 'M');
          addRecentlyViewed(data.product);
        }
      });
    }
  }, [selectedProductId]);

  if (!productData) {
    return (
      <div className="py-20 text-center animate-pulse">
        <Sparkles className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-2" />
        <p className="text-xs text-zinc-500">Loading StyleSmart AI product details...</p>
      </div>
    );
  }

  const { product, completeLook, similarProducts } = productData;
  const inWishlist = isInWishlist(product.id);
  const activeColor = product.colors[selectedColorIndex] || product.colors[0];

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setDeliveryAvailable(true);
      showToast(`Express delivery available to ${pincode} by day after tomorrow!`);
    } else {
      setDeliveryAvailable(false);
    }
  };

  const handleAddBundleToCart = () => {
    addToCart(product, activeColor, selectedSize);
    completeLook.forEach(rec => addToCart(rec.product));
    showToast('Complete Outfit Bundle added to cart with 10% discount!');
  };

  return (
    <div className="space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-zinc-500">
        <button onClick={() => setCurrentView('home')} className="hover:underline">Home</button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={() => setCurrentView('shop')} className="hover:underline">{product.category}</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-zinc-900 dark:text-white font-bold truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
        {/* Left Image Column (7 cols) */}
        <div className="lg:col-span-7">
          {/* Main Large Image Box */}
          <div className="w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 relative shadow-lg flex items-center justify-center p-6 h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              src={product.images[0] || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800'}
              alt={product.title}
              className="w-full h-full max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-contain transition-transform duration-500 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-black uppercase shadow-md">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Right Product Purchase Details Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 font-bold text-xs text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-zinc-400 font-normal">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight mt-1">
              {product.title}
            </h1>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 mt-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80">
              <span className="text-2xl font-black text-zinc-900 dark:text-white">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-zinc-400 line-through">
                  MRP ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 ml-auto">
                Inclusive of all taxes
              </span>
            </div>
          </div>

          {/* Color Selection Swatches */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex justify-between">
              <span>Select Color: <strong>{activeColor.name}</strong></span>
            </label>
            <div className="flex gap-2.5">
              {product.colors.map((c, idx) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColorIndex(idx)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColorIndex === idx ? 'scale-110 border-indigo-600 ring-2 ring-indigo-500/20' : 'border-zinc-300 dark:border-zinc-700'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection Pills */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-zinc-700 dark:text-zinc-300">Select Size</span>
              <button
                onClick={() => setIsSizeModalOpen(true)}
                className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-bold"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>AI Size Recommender</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.sizes.map(sz => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    selectedSize === sz
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                      : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => addToCart(product, activeColor, selectedSize)}
              className="flex-1 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD TO BAG</span>
            </button>

            <button
              onClick={() => buyNow(product, activeColor, selectedSize)}
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <Sparkles className="w-4 h-4" />
              <span>BUY NOW</span>
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`p-4 rounded-2xl border transition-all ${
                inWishlist
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-rose-500'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Pincode & Shipping Checker */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-600" />
              <span>Delivery & Availability Check</span>
            </h4>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={e => setPincode(e.target.value)}
                placeholder="Enter Pincode..."
                className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-xs font-bold"
              >
                Check
              </button>
            </form>
            {deliveryAvailable && (
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Standard Delivery available in 2-3 business days</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* COMPLETE THE LOOK - AI Outfit Bundle Box */}
      {completeLook.length > 0 && (
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-violet-950 via-zinc-950 to-indigo-950 text-white border border-indigo-500/30 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/40 text-[11px] font-extrabold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 fill-violet-300" />
                <span>AI COMPLETE THE LOOK</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                Styled Look Bundle
              </h3>
              <p className="text-xs text-zinc-300 mt-0.5">
                Handpicked matching accessories & footwear paired by our AI Fashion Intelligence.
              </p>
            </div>

            <button
              onClick={handleAddBundleToCart}
              className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buy Entire Look (10% OFF Bundle)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {completeLook.map(rec => (
              <div
                key={rec.product.id}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center gap-3"
              >
                <img
                  src={rec.product.images[0]}
                  alt={rec.product.title}
                  className="w-16 h-20 object-cover rounded-xl shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase">{rec.product.brand}</span>
                  <h5 className="text-xs font-bold text-white truncate">{rec.product.title}</h5>
                  <span className="text-xs font-extrabold text-amber-300 block mt-1">₹{rec.product.price.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tabs Section (Details, Material, Reviews) */}
      <section className="border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6">
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 gap-8 text-sm font-bold">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'details' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-zinc-400'
            }`}
          >
            Product Overview
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'care' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-zinc-400'
            }`}
          >
            Material & Care
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'reviews' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-zinc-400'
            }`}
          >
            Customer Reviews ({product.reviewCount || 12})
          </button>
        </div>

        {activeTab === 'details' && (
          <div className="space-y-4 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
            <p>{(product as any).description || product.features?.join('. ') || `${product.title} by ${product.brand}`}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div><strong className="text-zinc-900 dark:text-white block">Fabric:</strong> {product.material}</div>
              <div><strong className="text-zinc-900 dark:text-white block">Fit Type:</strong> {product.style}</div>
              <div><strong className="text-zinc-900 dark:text-white block">Category:</strong> {product.subCategory}</div>
            </div>
          </div>
        )}

        {activeTab === 'care' && (
          <div className="text-xs text-zinc-600 dark:text-zinc-300 space-y-2">
            <p>• Machine wash cold on delicate cycle with like colors.</p>
            <p>• Do not bleach or tumble dry high heat.</p>
            <p>• Warm iron inside out if necessary.</p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <span>Customer Reviews & Photos</span>
                  <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                    ★ {product.rating} / 5.0
                  </span>
                </h4>
                <p className="text-xs text-zinc-500 mt-0.5">88% of customers report "True to Size" fit</p>
              </div>

              <button
                onClick={() => setIsWritingReview(!isWritingReview)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 text-xs font-bold transition-colors"
              >
                {isWritingReview ? 'Cancel Form' : 'Write a Photo Review'}
              </button>
            </div>

            {/* Review Submission Form */}
            {isWritingReview && (
              <form onSubmit={handleAddReview} className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-4">
                <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">Submit Your Fit Review & Photos</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Star Rating</label>
                    <select
                      value={newRating}
                      onChange={e => setNewRating(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                    >
                      <option value={5}>★★★★★ (5/5) Excellent</option>
                      <option value={4}>★★★★☆ (4/5) Great</option>
                      <option value={3}>★★★☆☆ (3/5) Average</option>
                      <option value={2}>★★☆☆☆ (2/5) Poor</option>
                      <option value={1}>★☆☆☆☆ (1/5) Terrible</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Garment Fit Metric</label>
                    <select
                      value={newFit}
                      onChange={e => setNewFit(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                    >
                      <option value="Runs Small">Runs Small</option>
                      <option value="True to Size">True to Size</option>
                      <option value="Runs Large">Runs Large</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Review Headline</label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      placeholder="e.g. Perfect oversized drape, thick material!"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Detailed Review</label>
                    <textarea
                      required
                      rows={3}
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                      placeholder="Share details on fabric, fit around shoulders/waist, and styling tips..."
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Customer Photo URL (Optional)</label>
                    <input
                      type="text"
                      value={newPhotoUrl}
                      onChange={e => setNewPhotoUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 shadow-md transition-colors"
                >
                  Publish Review
                </button>
              </form>
            )}

            {/* List of Reviews */}
            <div className="space-y-4">
              {reviewsList.map(rev => (
                <div key={rev.id} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-zinc-900 dark:text-white">{rev.author}</span>
                      {rev.verified && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-zinc-400 font-mono">{rev.date}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-amber-400 font-bold">{'★'.repeat(rev.rating)}</span>
                    <span className="text-zinc-400 font-medium">Fit: <strong className="text-indigo-600 dark:text-indigo-400">{rev.fit}</strong></span>
                  </div>

                  <h6 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{rev.title}</h6>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{rev.comment}</p>

                  {rev.photo && (
                    <img
                      src={rev.photo}
                      alt="Customer photo review"
                      className="w-20 h-24 object-cover rounded-xl bg-zinc-800 border border-zinc-700 mt-2"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Size Recommender Modal */}
      <SizeRecommenderModal
        product={product}
        isOpen={isSizeModalOpen}
        onClose={() => setIsSizeModalOpen(false)}
        onSelectRecommendedSize={sz => setSelectedSize(sz)}
      />
    </div>
  );
};
