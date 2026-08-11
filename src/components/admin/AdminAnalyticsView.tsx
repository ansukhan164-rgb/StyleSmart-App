import React from 'react';
import { BarChart3, Search, Heart, TrendingUp, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INITIAL_SEARCH_ANALYTICS } from '../../data/mockAdminData';

export const AdminAnalyticsView: React.FC = () => {
  const { wishlist, products } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Deep Business Analytics & Search Queries</h2>
        <p className="text-xs text-slate-400">Wishlist demand forecasting and customer search trends</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wishlist Demand Insights */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400" />
            <h3 className="text-sm font-bold text-slate-100">Top Wishlisted Products (High Intent)</h3>
          </div>

          <div className="space-y-3">
            {wishlist.slice(0, 5).map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-3">
                  <img src={item.images[0]} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-semibold text-slate-200">{item.title}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{item.brand} • ₹{item.price.toLocaleString()}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-rose-400 font-mono">142 Wishlists</span>
              </div>
            ))}
          </div>
        </div>

        {/* Search Query Analytics */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-sky-400" />
            <h3 className="text-sm font-bold text-slate-100">Popular Search Queries</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="pb-2">Search Term</th>
                  <th className="pb-2">Searches</th>
                  <th className="pb-2">Conv. Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {INITIAL_SEARCH_ANALYTICS.map(sa => (
                  <tr key={sa.id} className="hover:bg-slate-800/40">
                    <td className="py-2.5 font-medium text-slate-200 flex items-center gap-2">
                      <span>"{sa.query}"</span>
                      {sa.zeroResults && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-rose-500/20 text-rose-300 font-bold">
                          Zero Results
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 font-mono text-slate-400">{sa.count}</td>
                    <td className="py-2.5 font-mono font-bold text-emerald-400">{sa.conversionRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
