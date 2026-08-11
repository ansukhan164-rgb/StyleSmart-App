import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Package,
  Sparkles,
  X,
  Check,
  AlertCircle,
  Upload,
  Tag,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product, Category, SubCategory, FashionStyle, Gender } from '../../types';
import { CATEGORIES, BRANDS, STYLES } from '../../data/mockData';

export const AdminProductsView: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [stockFilter, setStockFilter] = useState<'All' | 'InStock' | 'LowStock' | 'OutOfStock'>('All');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formBrand, setFormBrand] = useState(BRANDS[0]);
  const [formCategory, setFormCategory] = useState<Category>('Men');
  const [formSubCategory, setFormSubCategory] = useState<SubCategory>('T-Shirts & Tops');
  const [formGender, setFormGender] = useState<Gender>('Men');
  const [formPrice, setFormPrice] = useState<number>(1999);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number>(2999);
  const [formStockCount, setFormStockCount] = useState<number>(25);
  const [formStyle, setFormStyle] = useState<FashionStyle>('Streetwear');
  const [formMaterial, setFormMaterial] = useState('100% Organic Heavyweight Cotton');
  const [formImages, setFormImages] = useState<string>('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800');
  const [formSizes, setFormSizes] = useState<string[]>(['S', 'M', 'L', 'XL']);

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesBrand = selectedBrand === 'All' || p.brand === selectedBrand;

    let matchesStock = true;
    if (stockFilter === 'InStock') matchesStock = p.stockCount >= 10;
    if (stockFilter === 'LowStock') matchesStock = p.stockCount > 0 && p.stockCount < 10;
    if (stockFilter === 'OutOfStock') matchesStock = p.stockCount === 0;

    return matchesSearch && matchesCategory && matchesBrand && matchesStock;
  });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormTitle('');
    setFormBrand(BRANDS[0]);
    setFormCategory('Men');
    setFormSubCategory('T-Shirts & Tops');
    setFormGender('Men');
    setFormPrice(1999);
    setFormOriginalPrice(2999);
    setFormStockCount(25);
    setFormStyle('Streetwear');
    setFormMaterial('100% Organic Cotton');
    setFormImages('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800');
    setFormSizes(['S', 'M', 'L', 'XL']);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormTitle(product.title);
    setFormBrand(product.brand);
    setFormCategory(product.category);
    setFormSubCategory(product.subCategory);
    setFormGender(product.gender);
    setFormPrice(product.price);
    setFormOriginalPrice(product.originalPrice);
    setFormStockCount(product.stockCount);
    setFormStyle(product.style);
    setFormMaterial(product.material);
    setFormImages(product.images.join('\n'));
    setFormSizes(product.sizes);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const imageUrls = formImages
      .split('\n')
      .map(url => url.trim())
      .filter(Boolean);

    const discount = formOriginalPrice > formPrice
      ? Math.round(((formOriginalPrice - formPrice) / formOriginalPrice) * 100)
      : 0;

    const productPayload: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      title: formTitle,
      brand: formBrand,
      category: formCategory,
      subCategory: formSubCategory,
      gender: formGender,
      price: Number(formPrice),
      originalPrice: Number(formOriginalPrice),
      discountPercent: discount,
      rating: editingProduct ? editingProduct.rating : 4.8,
      reviewCount: editingProduct ? editingProduct.reviewCount : 12,
      images: imageUrls.length > 0 ? imageUrls : ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800'],
      colors: editingProduct ? editingProduct.colors : [{ name: 'Black', hex: '#18181b' }],
      sizes: formSizes,
      material: formMaterial,
      style: formStyle,
      inStock: formStockCount > 0,
      stockCount: Number(formStockCount),
      tags: ['Admin Added', formStyle],
      features: ['Premium Stitching', 'Breathable Fabric'],
      specifications: { Fit: 'Regular', Washing: 'Machine Wash' },
      compatibilityTags: ['tops', 'bottoms'],
      viewsCount: editingProduct ? editingProduct.viewsCount : 45,
      purchasesCount: editingProduct ? editingProduct.purchasesCount : 8,
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString()
    };

    if (editingProduct) {
      updateProduct(productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deletingProductId) {
      deleteProduct(deletingProductId);
      setDeletingProductId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Product Inventory & Catalog</h2>
          <p className="text-xs text-slate-400">Total {products.length} products listed in active store catalog</p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search title, brand, product ID..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Brand Filter */}
          <select
            value={selectedBrand}
            onChange={e => setSelectedBrand(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Brands</option>
            {BRANDS.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={e => setStockFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Stock Status</option>
            <option value="InStock">In Stock (&ge;10)</option>
            <option value="LowStock">Low Stock (&lt;10)</option>
            <option value="OutOfStock">Out of Stock (0)</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No products matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-slate-800/40 transition-colors">
                    {/* Title & Thumbnail */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-800 shrink-0"
                        />
                        <div className="truncate max-w-xs">
                          <p className="font-semibold text-slate-100 truncate">{product.title}</p>
                          <p className="text-[11px] text-slate-400 font-mono">{product.brand} • {product.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4 text-slate-300">
                      <div>
                        <span className="font-medium text-slate-200">{product.category}</span>
                        <span className="block text-[11px] text-slate-500">{product.subCategory}</span>
                      </div>
                    </td>

                    {/* Price & Discount */}
                    <td className="p-4">
                      <div className="font-semibold text-slate-100">
                        ₹{product.price.toLocaleString()}
                      </div>
                      {product.discountPercent > 0 && (
                        <div className="text-[10px] text-emerald-400 font-bold">
                          {product.discountPercent}% OFF (MRP ₹{product.originalPrice.toLocaleString()})
                        </div>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="p-4 font-mono font-medium">
                      <span className={product.stockCount < 10 ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                        {product.stockCount} units
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          product.stockCount === 0
                            ? 'bg-rose-500/20 text-rose-300'
                            : product.stockCount < 10
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {product.stockCount === 0 ? 'Out of Stock' : product.stockCount < 10 ? 'Low Stock' : 'Active In Stock'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingProductId(product.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative my-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-sky-400" />
                  <h3 className="text-base font-bold text-slate-100">
                    {editingProduct ? 'Edit Product Details' : 'Add New Catalog Product'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Product Title</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    placeholder="e.g. AURA Oversized Cyber Minimalist Hoodie"
                    required
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Brand & Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Brand</label>
                    <select
                      value={formBrand}
                      onChange={e => setFormBrand(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                    >
                      {BRANDS.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Target Gender</label>
                    <select
                      value={formGender}
                      onChange={e => setFormGender(e.target.value as Gender)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Unisex">Unisex</option>
                      <option value="Kids">Kids</option>
                    </select>
                  </div>
                </div>

                {/* Category & Style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                    <select
                      value={formCategory}
                      onChange={e => setFormCategory(e.target.value as Category)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Fashion Style</label>
                    <select
                      value={formStyle}
                      onChange={e => setFormStyle(e.target.value as FashionStyle)}
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                    >
                      {STYLES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Pricing & Stock */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Selling Price (₹)</label>
                    <input
                      type="number"
                      value={formPrice}
                      onChange={e => setFormPrice(Number(e.target.value))}
                      required
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">MRP Price (₹)</label>
                    <input
                      type="number"
                      value={formOriginalPrice}
                      onChange={e => setFormOriginalPrice(Number(e.target.value))}
                      required
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Stock Units</label>
                    <input
                      type="number"
                      value={formStockCount}
                      onChange={e => setFormStockCount(Number(e.target.value))}
                      required
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Image URLs */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Image URLs (One per line)</label>
                  <textarea
                    rows={3}
                    value={formImages}
                    onChange={e => setFormImages(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    required
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Submit Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30"
                  >
                    {editingProduct ? 'Save Product Changes' : 'Create Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deletingProductId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-100">Delete Product?</h4>
                <p className="text-xs text-slate-400 mt-1">
                  This action will permanently remove the product from the catalog.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setDeletingProductId(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-300 bg-slate-800 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/20"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
