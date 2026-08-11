import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CategoryDetail } from '../../types/admin';

export const AdminCategoriesView: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<CategoryDetail | null>(null);

  const [formName, setFormName] = useState('');
  const [formSubCats, setFormSubCats] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');

  const handleOpenAdd = () => {
    setEditingCat(null);
    setFormName('');
    setFormSubCats('');
    setFormImageUrl('https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=400');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: CategoryDetail) => {
    setEditingCat(cat);
    setFormName(cat.name);
    setFormSubCats(cat.subCategories.join(', '));
    setFormImageUrl(cat.imageUrl);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subs = formSubCats.split(',').map(s => s.trim()).filter(Boolean);

    const payload: CategoryDetail = {
      id: editingCat ? editingCat.id : `cat-${Date.now()}`,
      name: formName,
      subCategories: subs.length > 0 ? subs : ['General'],
      productCount: editingCat ? editingCat.productCount : 0,
      imageUrl: formImageUrl,
      icon: 'Layers',
      status: 'Active'
    };

    if (editingCat) {
      updateCategory(payload);
    } else {
      addCategory(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Store Categories & Taxonomy</h2>
          <p className="text-xs text-slate-400">Manage categories, subcategories, and navigation structure</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div key={cat.id} className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl flex flex-col justify-between">
            <div className="relative h-36 bg-slate-950 overflow-hidden">
              <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <span className="text-lg font-bold text-white">{cat.name}</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-900/80 text-[10px] text-sky-400 border border-slate-700 font-mono">
                  {cat.productCount} Products
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Subcategories</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {cat.subCategories.map(sub => (
                    <span key={sub} className="px-2 py-0.5 rounded-md bg-slate-950 text-[11px] text-slate-300 border border-slate-800">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="p-1.5 text-xs text-slate-400 hover:text-sky-400 hover:bg-slate-800 rounded-lg flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="p-1.5 text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-slate-100">
                  {editingCat ? 'Edit Category' : 'Create Category'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Category Name</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    required
                    placeholder="e.g. Activewear & Fitness"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Subcategories (Comma separated)</label>
                  <input
                    type="text"
                    value={formSubCats}
                    onChange={e => setFormSubCats(e.target.value)}
                    placeholder="Tops, Bottoms, Outerwear"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Banner Image URL</label>
                  <input
                    type="text"
                    value={formImageUrl}
                    onChange={e => setFormImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-2 text-slate-400">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl">
                    Save Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
