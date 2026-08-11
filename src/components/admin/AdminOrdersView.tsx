import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, Filter, Eye, Truck, CheckCircle2, Clock, AlertCircle, X, Printer, User, MapPin, Phone } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';

export const AdminOrdersView: React.FC = () => {
  const { orders, updateOrderStatus, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(o => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.shippingAddress.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.shippingAddress.phone.includes(searchQuery);

    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Orders & Fulfillment Pipeline</h2>
          <p className="text-xs text-slate-400">Track customer purchases, update shipping status, inspect invoices</p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search Order ID, customer, phone..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Order Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Return Requested">Return Requested</option>
            <option value="Returned">Returned</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Items Count</th>
                <th className="p-4">Total Value</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <p className="font-mono font-bold text-slate-100">{order.id}</p>
                      <p className="text-[11px] text-slate-400">{order.createdAt}</p>
                    </td>

                    <td className="p-4">
                      <p className="font-semibold text-slate-200">{order.shippingAddress.name}</p>
                      <p className="text-[11px] text-slate-400">{order.shippingAddress.city}, {order.shippingAddress.pincode}</p>
                    </td>

                    <td className="p-4 font-mono font-medium text-slate-300">
                      {order.items.reduce((acc, i) => acc + i.quantity, 0)} items
                    </td>

                    <td className="p-4 font-semibold text-slate-100">
                      ₹{order.totalAmount.toLocaleString()}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : order.status === 'Shipped'
                            ? 'bg-sky-500/20 text-sky-300'
                            : order.status === 'Pending'
                            ? 'bg-amber-500/20 text-amber-300'
                            : order.status === 'Return Requested'
                            ? 'bg-purple-500/20 text-purple-300'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <select
                          value={order.status}
                          onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                          className="bg-slate-950 border border-slate-800 rounded-lg text-[11px] px-2 py-1 text-slate-300 focus:outline-none focus:border-indigo-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Return Requested">Return Requested</option>
                          <option value="Returned">Returned</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>

                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white"
                          title="Inspect Order Details"
                        >
                          <Eye className="w-4 h-4" />
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

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold text-indigo-400">Fulfillment Document</span>
                  <h3 className="text-lg font-bold text-slate-100">Order #{selectedOrder.id}</h3>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-slate-400 block mb-1">Customer Shipping Info</span>
                  <p className="font-semibold text-slate-200">{selectedOrder.shippingAddress.name}</p>
                  <p className="text-slate-400">{selectedOrder.shippingAddress.street}</p>
                  <p className="text-slate-400">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}</p>
                  <p className="text-slate-400 font-mono">Phone: {selectedOrder.shippingAddress.phone}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-slate-400 block mb-1">Courier & Tracking</span>
                  <p className="text-slate-200 font-semibold">Partner: BlueDart Express</p>
                  <p className="text-slate-400 font-mono">Tracking: {selectedOrder.trackingNumber || 'AWB-99823011'}</p>
                  <p className="text-slate-400">Payment: {selectedOrder.paymentMethod}</p>
                  <p className="text-indigo-400 font-bold">Est. Delivery: {selectedOrder.estimatedDeliveryDate}</p>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-300 block mb-2">Purchased Items</span>
                <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <img src={item.product.images[0]} alt={item.product.title} className="w-9 h-9 rounded-lg object-cover" />
                        <div>
                          <p className="font-semibold text-slate-200">{item.product.title}</p>
                          <p className="text-[10px] text-slate-400">Color: {item.selectedColor.name} | Size: {item.selectedSize} | Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-100">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-bold">
                <span className="text-slate-400">Total Order Paid</span>
                <span className="text-lg text-emerald-400">₹{selectedOrder.totalAmount.toLocaleString()}</span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => showToast('Packing slip sent to printer simulator.')}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-2 hover:bg-slate-700"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Packing Slip</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
