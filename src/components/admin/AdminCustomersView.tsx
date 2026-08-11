import React, { useState } from 'react';
import { Users, Search, Ban, CheckCircle2, ShieldAlert, Sparkles, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminCustomersView: React.FC = () => {
  const { customers, updateCustomerStatus } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Registered Customer Accounts</h2>
          <p className="text-xs text-slate-400">Manage user profiles, style archetypes, and account security status</p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search customer name, email, phone..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCustomers.map(customer => (
          <div key={customer.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <img
                src={customer.avatar}
                alt={customer.name}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/30 shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-100">{customer.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    customer.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {customer.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">{customer.email}</p>
                <p className="text-[11px] text-slate-500">{customer.phone} • Joined {customer.joinedDate}</p>

                <div className="pt-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800/40 text-[10px] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    {customer.styleArchetype}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right space-y-2 shrink-0">
              <div>
                <span className="text-xs font-bold text-slate-100 block">₹{customer.totalSpent.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 font-mono">{customer.totalOrders} Orders</span>
              </div>

              {customer.status === 'Active' ? (
                <button
                  onClick={() => updateCustomerStatus(customer.id, 'Blocked')}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[10px] font-semibold flex items-center gap-1 ml-auto"
                >
                  <Ban className="w-3 h-3" /> Block
                </button>
              ) : (
                <button
                  onClick={() => updateCustomerStatus(customer.id, 'Active')}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold flex items-center gap-1 ml-auto"
                >
                  <CheckCircle2 className="w-3 h-3" /> Unblock
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
