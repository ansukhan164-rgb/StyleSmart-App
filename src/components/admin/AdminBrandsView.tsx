import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Plus, Edit2, Trash2, X, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandDetail } from '../../types/admin';

export const AdminBrandsView: React.FC = () => {
  const { brands, addBrand, updateBrand, deleteBrand } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<BrandDetail | null>(null);

  const [formName, setFormName] = useState('');
  const [formLogo, setFormLogo] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formStatus, setFormStatus] = useState<'Featured' | 'Active' | 'Inactive'>('Active');

  const handleOpenAdd = () => {
    setEditingBrand(null);
    setFormName('');
    setFormLogo('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200');
    setFormDesc('');
    setFormStatus('Active');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (brand: BrandDetail) => {
    setEditingBrand(brand);
    setFormName(brand.name);
    setFormLogo(brand.logoUrl);
    setFormDesc(brand.description);
    setFormStatus(brand.status);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: BrandDetail = {
      id: editingBrand ? editingBrand.id : `brd-${Date.now()}`,
      name: formName,
      logoUrl: formLogo,
      productCount: editingBrand ? editingBrand.productCount : 12,
      status: formStatus,
      description: formDesc
    };

    if (editingBrand) {
      updateBrand(payload);
    } else {
      addBrand(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Brand Partners & Designers</h2>
          <p className="text-xs text-slate-400">Featured designer labels and brand directory</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Brand Partner</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map(brand => (
          <div key={brand.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex items-start gap-4 relative">
            <img
              src={brand.logoUrl}
              alt={brand.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-800 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-100 truncate">{brand.name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  brand.status === 'Featured' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-300'
                }`}>
                  {brand.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{brand.description}</p>
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
                <span>{brand.productCount} Products</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleOpenEdit(brand)} className="p-1 hover:text-sky-400">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => deleteBrand(brand.id)} className="p-1 hover:text-rose-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-slate-100">
                  {editingBrand ? 'Edit Brand' : 'Add Brand Partner'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Status</label>
                  <select
                    value={formStatus}
                    onChange={e => setFormStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Featured">Featured</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Logo URL</label>
                  <input
                    type="text"
                    value={formLogo}
                    onChange={e => setFormLogo(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formDesc}
                    onChange={e => setFormDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-2 text-slate-400">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl">
                    Save Brand
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
