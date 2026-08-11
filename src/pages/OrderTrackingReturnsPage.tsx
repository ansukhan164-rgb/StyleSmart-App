import React, { useState } from 'react';
import {
  Truck,
  RotateCcw,
  Search,
  Package,
  Clock,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  MapPin,
  RefreshCw,
  ShieldCheck,
  HelpCircle,
  Headset,
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order, CartItem, ReturnRequest } from '../types';
import { LiveOrderTracker } from '../components/orders/LiveOrderTracker';
import { ReturnInitiator } from '../components/orders/ReturnInitiator';

export const OrderTrackingReturnsPage: React.FC = () => {
  const { orders, setCurrentView, setIsAIAssistantOpen } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'in_transit' | 'delivered' | 'returns'>('all');

  // Selected Order for Tracking
  const [selectedOrder, setSelectedOrder] = useState<Order>(orders[0] || null);

  // Return Initiator Modal / View State
  const [initiatingReturnOrder, setInitiatingReturnOrder] = useState<{
    order: Order;
    item?: CartItem;
  } | null>(null);

  // Filtered Orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingAddress.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(i => i.product.title.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeTab === 'in_transit') return order.status === 'Shipped' || order.status === 'Processing';
    if (activeTab === 'delivered') return order.status === 'Delivered';
    if (activeTab === 'returns') return order.status === 'Return Requested' || order.status === 'Returned' || (order.returnRequests && order.returnRequests.length > 0);

    return true;
  });

  // Collect all Return Requests across all orders
  const allReturnRequests: ReturnRequest[] = orders.flatMap(o => o.returnRequests || []);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner Header */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
            <Truck className="w-4 h-4 text-indigo-400" />
            <span>StyleSmart Logistics & Returns Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Live Order Tracking & Returns
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Monitor real-time GPS courier progress, view package timelines, or initiate hassle-free 14-day doorstep returns & size exchanges.
          </p>

          {/* Quick Search Bar */}
          <div className="pt-2 max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by Order ID (e.g. ORD-2026-9812), AWB Tracking, or Product name..."
                className="w-full pl-10 pr-28 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-xl bg-indigo-600 text-white text-[10px] font-bold"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Tab Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All Orders ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('in_transit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'in_transit'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>In Transit ({orders.filter(o => o.status === 'Shipped' || o.status === 'Processing').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('delivered')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'delivered'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Delivered ({orders.filter(o => o.status === 'Delivered').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('returns')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'returns'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
            <span>Returns & Exchanges ({allReturnRequests.length})</span>
          </button>
        </div>

        <button
          onClick={() => setIsAIAssistantOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold hover:bg-purple-500/20 transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Ask AI Logistics Assistant</span>
        </button>
      </div>

      {/* Return Request Initiator Form View if Triggered */}
      {initiatingReturnOrder && (
        <div className="animate-fadeIn">
          <ReturnInitiator
            order={initiatingReturnOrder.order}
            preselectedItem={initiatingReturnOrder.item}
            onSuccess={() => setInitiatingReturnOrder(null)}
            onCancel={() => setInitiatingReturnOrder(null)}
          />
        </div>
      )}

      {/* Main Grid: Orders Sidebar + Detailed Order Tracker View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Orders List */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center justify-between">
            <span>Select Order to Track</span>
            <span className="text-xs text-slate-400 font-normal">{filteredOrders.length} Order(s)</span>
          </h3>

          {filteredOrders.length === 0 ? (
            <div className="p-8 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2">
              <Package className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs font-bold text-slate-300">No orders match your filter criteria.</p>
              <p className="text-[11px] text-slate-500">Try adjusting your search query or tab selection.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredOrders.map(order => {
                const isSelected = selectedOrder?.id === order.id;
                return (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                      isSelected
                        ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-950/40 ring-1 ring-indigo-500/40'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-indigo-300">{order.id}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            order.status === 'Delivered'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : order.status === 'Shipped'
                              ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Thumbnails Row */}
                    <div className="flex items-center gap-2">
                      {order.items.map((item, i) => (
                        <img
                          key={i}
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-10 h-12 object-cover rounded-lg bg-slate-950 border border-slate-800"
                        />
                      ))}
                      <div className="flex-1 min-w-0 pl-1">
                        <h4 className="text-xs font-bold text-white truncate">
                          {order.items[0]?.product.title}
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Total: <strong className="text-slate-200">₹{order.totalAmount.toLocaleString()}</strong>
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                    </div>

                    {/* Action buttons */}
                    <div className="pt-1 flex items-center justify-between text-[11px] border-t border-slate-800/80">
                      <span className="text-slate-400">
                        Courier: <strong className="text-slate-300">{order.courierPartner || 'BlueDart'}</strong>
                      </span>

                      {order.status === 'Delivered' && (
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            setInitiatingReturnOrder({ order });
                          }}
                          className="text-purple-400 font-bold hover:underline flex items-center gap-1"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Return / Exchange</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Active Return Requests Tracker Block */}
          {allReturnRequests.length > 0 && (
            <div className="p-5 rounded-3xl bg-slate-900/90 border border-purple-500/30 space-y-3 mt-6">
              <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-purple-400" />
                <span>Active Return / Exchange Requests ({allReturnRequests.length})</span>
              </h4>

              <div className="space-y-3">
                {allReturnRequests.map(req => (
                  <div key={req.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-purple-300">{req.id}</span>
                      <span className="px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                        {req.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      {req.itemImage && (
                        <img src={req.itemImage} alt={req.itemTitle} className="w-9 h-11 object-cover rounded-lg bg-slate-900" />
                      )}
                      <div>
                        <div className="font-bold text-white line-clamp-1">{req.itemTitle}</div>
                        <div className="text-[10px] text-slate-400">
                          {req.requestedAction === 'exchange_size' ? `Exchanging for Size ${req.exchangeSize}` : `Refund: ₹${req.refundAmount}`}
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-900">
                      <span>Pickup: <strong>{req.pickupDate}</strong> ({req.pickupTimeSlot})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Detailed Tracker View */}
        <div className="lg:col-span-7">
          {selectedOrder ? (
            <LiveOrderTracker
              order={selectedOrder}
              onInitiateReturn={(ord, item) => setInitiatingReturnOrder({ order: ord, item })}
            />
          ) : (
            <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <Truck className="w-12 h-12 text-slate-600 mx-auto animate-pulse" />
              <h3 className="text-base font-bold text-white">Select an Order to View Tracking</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Choose any order from the left sidebar to inspect live GPS courier movement, packing checkpoints, and delivery pins.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Return & Logistics FAQ Grid */}
      <div className="pt-8 border-t border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-400" />
          <span>Returns & Logistics Policy Guidelines</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              14-Day Free Returns
            </h4>
            <p className="text-[11px] text-slate-400 leading-snug">
              Every item is eligible for 100% free doorstep pickup within 14 days of delivery.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <h4 className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-purple-400" />
              Instant Size Exchange
            </h4>
            <p className="text-[11px] text-slate-400 leading-snug">
              Request a replacement size and our courier agent will deliver it during return pickup.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              ₹150 Bonus Wallet Cash
            </h4>
            <p className="text-[11px] text-slate-400 leading-snug">
              Choose StyleSmart Store Credit for your refund and receive a ₹150 bonus wallet credit instantly!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
