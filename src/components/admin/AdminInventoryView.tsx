import React, { useState } from 'react';
import { Boxes, Search, AlertTriangle, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminInventoryView: React.FC = () => {
  const { products, updateInventory } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  const filteredProducts = products.filter(p => {
    const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLowStock = showLowStockOnly ? p.stockCount < 10 : true;
    return matchesQuery && matchesLowStock;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Real-Time Inventory & Stock Matrix</h2>
          <p className="text-xs text-slate-400">Monitor stock levels, restock alerts, and bulk updates</p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
            <input
              type="checkbox"
              checked={showLowStockOnly}
              onChange={e => setShowLowStockOnly(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600"
            />
            <span>Show Low Stock (&lt;10 Units) Only</span>
          </label>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search SKU, product title, brand..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="p-4">Item SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Current Stock</th>
                <th className="p-4">Threshold Status</th>
                <th className="p-4 text-right">Instant Stock Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt={p.title} className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-800 shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-100">{p.title}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{p.brand} • {p.id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-slate-300">
                    {p.category} / {p.subCategory}
                  </td>

                  <td className="p-4 font-mono font-bold text-slate-100">
                    <span className={p.stockCount < 10 ? 'text-amber-400 text-sm' : 'text-slate-100'}>
                      {p.stockCount} units
                    </span>
                  </td>

                  <td className="p-4">
                    {p.stockCount === 0 ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 flex items-center gap-1 w-fit">
                        <AlertTriangle className="w-3 h-3" /> Out of Stock
                      </span>
                    ) : p.stockCount < 10 ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 flex items-center gap-1 w-fit">
                        <AlertTriangle className="w-3 h-3" /> Reorder Warning
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3" /> Healthy Level
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => updateInventory(p.id, Math.max(0, p.stockCount - 5))}
                        className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                        title="Deduct 5 items"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <input
                        type="number"
                        value={p.stockCount}
                        onChange={e => updateInventory(p.id, Math.max(0, Number(e.target.value)))}
                        className="w-16 px-2 py-1 bg-slate-950 border border-slate-800 rounded-lg text-center font-mono font-bold text-slate-100 focus:outline-none focus:border-indigo-500"
                      />

                      <button
                        onClick={() => updateInventory(p.id, p.stockCount + 10)}
                        className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                        title="Restock 10 items"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
