import React, { useState } from 'react';
import { Ticket, Plus, Edit2, Trash2, X, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminCoupon } from '../../types/admin';

export const AdminCouponsView: React.FC = () => {
  const { adminCoupons, addCoupon, updateCoupon, deleteCoupon } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<AdminCoupon | null>(null);

  const [formCode, setFormCode] = useState('');
  const [formDiscountPercent, setFormDiscountPercent] = useState<number>(20);
  const [formMaxDiscount, setFormMaxDiscount] = useState<number>(1000);
  const [formMinOrder, setFormMinOrder] = useState<number>(1500);
  const [formDesc, setFormDesc] = useState('');
  const [formExpiry, setFormExpiry] = useState('2026-12-31');

  const handleOpenAdd = () => {
    setEditingCoupon(null);
    setFormCode('');
    setFormDiscountPercent(20);
    setFormMaxDiscount(1000);
    setFormMinOrder(1500);
    setFormDesc('');
    setFormExpiry('2026-12-31');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: AdminCoupon) => {
    setEditingCoupon(c);
    setFormCode(c.code);
    setFormDiscountPercent(c.discountPercent);
    setFormMaxDiscount(c.maxDiscountAmount);
    setFormMinOrder(c.minOrderAmount);
    setFormDesc(c.description);
    setFormExpiry(c.expiryDate);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: AdminCoupon = {
      id: editingCoupon ? editingCoupon.id : `coup-${Date.now()}`,
      code: formCode.trim().toUpperCase(),
      discountPercent: Number(formDiscountPercent),
      maxDiscountAmount: Number(formMaxDiscount),
      minOrderAmount: Number(formMinOrder),
      description: formDesc || `Get ${formDiscountPercent}% OFF`,
      expiryDate: formExpiry,
      usageCount: editingCoupon ? editingCoupon.usageCount : 0,
      maxUsageLimit: 1000,
      status: 'Active'
    };

    if (editingCoupon) {
      updateCoupon(payload);
    } else {
      addCoupon(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Promotional Coupons & Offer Codes</h2>
          <p className="text-xs text-slate-400">Configure discount percentages, minimum cart requirements, usage caps</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Create Coupon</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminCoupons.map(coupon => (
          <div key={coupon.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-indigo-950 border border-indigo-800 text-sky-400 font-mono font-bold text-sm tracking-wider">
                {coupon.code}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                coupon.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {coupon.status}
              </span>
            </div>

            <p className="text-xs text-slate-300 font-medium">{coupon.description}</p>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <div>Discount: <span className="text-slate-200 font-bold">{coupon.discountPercent}% OFF</span></div>
              <div>Max Cap: <span className="text-slate-200 font-bold">₹{coupon.maxDiscountAmount}</span></div>
              <div>Min Order: <span className="text-slate-200 font-bold">₹{coupon.minOrderAmount}</span></div>
              <div>Used: <span className="text-indigo-400 font-bold">{coupon.usageCount} times</span></div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-500">
              <span>Expires: {coupon.expiryDate}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => handleOpenEdit(coupon)} className="p-1 hover:text-sky-400">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => deleteCoupon(coupon.id)} className="p-1 hover:text-rose-400">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-100">
                {editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Coupon Code</label>
                <input
                  type="text"
                  value={formCode}
                  onChange={e => setFormCode(e.target.value)}
                  placeholder="e.g. FESTIVE30"
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Discount (%)</label>
                  <input
                    type="number"
                    value={formDiscountPercent}
                    onChange={e => setFormDiscountPercent(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Max Cap (₹)</label>
                  <input
                    type="number"
                    value={formMaxDiscount}
                    onChange={e => setFormMaxDiscount(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Min Order (₹)</label>
                  <input
                    type="number"
                    value={formMinOrder}
                    onChange={e => setFormMinOrder(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={formExpiry}
                    onChange={e => setFormExpiry(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Description Banner</label>
                <input
                  type="text"
                  value={formDesc}
                  onChange={e => setFormDesc(e.target.value)}
                  placeholder="Get 20% OFF on your order..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-2 text-slate-400">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl">
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
