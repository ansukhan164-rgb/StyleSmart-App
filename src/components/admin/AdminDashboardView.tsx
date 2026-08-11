import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Package,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Sparkles,
  Eye,
  Percent,
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';
import { useApp } from '../../context/AppContext';

// Mock charts data
const SALES_TREND = [
  { day: 'Mon', sales: 42000, orders: 18 },
  { day: 'Tue', sales: 58000, orders: 24 },
  { day: 'Wed', sales: 64000, orders: 29 },
  { day: 'Thu', sales: 72000, orders: 35 },
  { day: 'Fri', sales: 91000, orders: 42 },
  { day: 'Sat', sales: 118000, orders: 56 },
  { day: 'Sun', sales: 137450, orders: 64 }
];

const CATEGORY_PERFORMANCE = [
  { category: 'Men', revenue: 210000, items: 340 },
  { category: 'Women', revenue: 185000, items: 290 },
  { category: 'Footwear', revenue: 112000, items: 180 },
  { category: 'Accessories', revenue: 75000, items: 125 },
  { category: 'Beauty', revenue: 42000, items: 85 }
];

export const AdminDashboardView: React.FC = () => {
  const { products, orders, customers, setAdminRoute, updateOrderStatus } = useApp();

  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('week');

  // Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0) + 524000;
  const totalOrdersCount = orders.length + 220;
  const totalCustomersCount = customers.length + 1400;
  const totalProductsCount = products.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending');
  const lowStockProducts = products.filter(p => p.stockCount < 10);
  const bestSellers = products.filter(p => p.isBestSeller || p.purchasesCount > 10).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Banner Alert if Low Stock exists */}
      {lowStockProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold">Inventory Alert: {lowStockProducts.length} Items Low in Stock</p>
              <p className="text-[11px] text-amber-300/80">Some best-selling items have fallen below 10 units threshold.</p>
            </div>
          </div>
          <button
            onClick={() => setAdminRoute('inventory')}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors shrink-0"
          >
            Manage Inventory
          </button>
        </motion.div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Total Revenue</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            ₹{totalRevenue.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% vs last month</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Total Orders</span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {totalOrdersCount}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-sky-400 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+12.1% sales volume</span>
          </div>
        </div>

        {/* Total Customers */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Active Customers</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {totalCustomersCount}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-indigo-400 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+8.7% new accounts</span>
          </div>
        </div>

        {/* AI Style Conversion */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">AI Conversion Uplift</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Brain className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            3.84%
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-purple-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>+24.8% style match conversion</span>
          </div>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-100">Revenue & Sales Trend</h3>
              <p className="text-xs text-slate-400">Weekly sales trajectory and transaction volume</p>
            </div>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {(['week', 'month', 'year'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-2.5 py-1 rounded-lg capitalize text-xs font-medium transition-colors ${
                    timeframe === t ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_TREND}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={v => `₹${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                  formatter={(val: any) => [`₹${val.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Chart */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-100">Category Sales Split</h3>
            <p className="text-xs text-slate-400">Revenue generation per apparel category</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_PERFORMANCE} layout="vertical">
                <XAxis type="number" stroke="#64748b" fontSize={10} tickFormatter={v => `₹${v / 1000}k`} />
                <YAxis dataKey="category" type="category" stroke="#64748b" fontSize={11} width={70} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  formatter={(val: any) => [`₹${val.toLocaleString()}`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#38bdf8" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables Row: Recent Orders & Best Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-100">Recent Customer Orders</h3>
              <p className="text-xs text-slate-400">Real-time fulfillment queue</p>
            </div>
            <button
              onClick={() => setAdminRoute('orders')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-medium">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {orders.slice(0, 5).map(o => (
                  <tr key={o.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 font-mono text-slate-300 font-medium">{o.id}</td>
                    <td className="py-3 font-semibold text-slate-100">₹{o.totalAmount.toLocaleString()}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          o.status === 'Delivered'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : o.status === 'Shipped'
                            ? 'bg-sky-500/20 text-sky-300'
                            : o.status === 'Pending'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <select
                        value={o.status}
                        onChange={e => updateOrderStatus(o.id, e.target.value as any)}
                        className="bg-slate-950 border border-slate-800 rounded-lg text-[10px] px-2 py-1 text-slate-300 focus:outline-none focus:border-indigo-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Best Selling Products */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-100">Best-Selling Items</h3>
              <p className="text-xs text-slate-400">Highest grossing product catalog</p>
            </div>
            <button
              onClick={() => setAdminRoute('products')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
            >
              <span>Manage Products</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {bestSellers.map(product => (
              <div
                key={product.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                  />
                  <div className="truncate">
                    <p className="text-xs font-semibold text-slate-200 truncate">{product.title}</p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {product.brand} • <span className="text-indigo-400 font-bold">₹{product.price.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="block text-xs font-bold text-slate-100">{product.purchasesCount || 48} sales</span>
                  <span className={`text-[10px] font-medium ${product.stockCount < 10 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {product.stockCount} in stock
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
