import React, { useState } from 'react';
import {
  Truck,
  PackageCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  RotateCcw,
  RefreshCw,
  Navigation,
  Sparkles,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Copy,
  Check,
  UserCheck
} from 'lucide-react';
import { Order, CartItem } from '../../types';
import { useApp } from '../../context/AppContext';

interface LiveOrderTrackerProps {
  order: Order;
  onInitiateReturn: (order: Order, item?: CartItem) => void;
}

export const LiveOrderTracker: React.FC<LiveOrderTrackerProps> = ({
  order,
  onInitiateReturn
}) => {
  const { showToast, updateOrderStatus } = useApp();
  const [isSimulating, setIsSimulating] = useState(false);
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order>(order);

  // Synchronize when order prop changes
  React.useEffect(() => {
    setCurrentOrder(order);
  }, [order]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTracking(true);
    showToast('Tracking number copied to clipboard!');
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  // Live simulation of delivery progress
  const handleSimulateUpdate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      let newStatus: Order['status'] = currentOrder.status;

      if (currentOrder.status === 'Pending') newStatus = 'Processing';
      else if (currentOrder.status === 'Processing') newStatus = 'Shipped';
      else if (currentOrder.status === 'Shipped') newStatus = 'Delivered';

      updateOrderStatus(currentOrder.id, newStatus);
      showToast(`Real-Time Update: Order status updated to "${newStatus}"!`);
    }, 1200);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Shipped':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'Processing':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Return Requested':
      case 'Returned':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Cancelled':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Status Header */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl relative overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-lg border border-indigo-500/30">
                {currentOrder.id}
              </span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(
                  currentOrder.status
                )}`}
              >
                ● {currentOrder.status}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Placed on {new Date(currentOrder.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} • {currentOrder.items.length} Item(s)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulateUpdate}
              disabled={isSimulating || currentOrder.status === 'Delivered' || currentOrder.status === 'Cancelled'}
              className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-40"
              title="Simulate live logistics update"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>Simulate Live Movement</span>
            </button>

            {currentOrder.status === 'Delivered' && (
              <button
                onClick={() => onInitiateReturn(currentOrder)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/20 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Initiate Return / Exchange</span>
              </button>
            )}
          </div>
        </div>

        {/* Tracking Code Bar */}
        <div className="flex flex-wrap items-center justify-between p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs gap-3">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-400">Courier Partner:</span>
            <strong className="text-white">{currentOrder.courierPartner || 'BlueDart Express'}</strong>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">AWB Tracking:</span>
            <span className="font-mono font-bold text-slate-200">{currentOrder.trackingNumber}</span>
            <button
              onClick={() => copyToClipboard(currentOrder.trackingNumber)}
              className="p-1 hover:text-indigo-400 text-slate-400 transition-colors"
              title="Copy tracking code"
            >
              {copiedTracking ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Estimated Delivery:</span>
            <strong className="text-amber-300">{currentOrder.estimatedDeliveryDate}</strong>
          </div>
        </div>
      </div>

      {/* Simulated Interactive GPS Delivery Map */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-indigo-400 animate-pulse" />
            <h3 className="text-sm font-bold text-white">Live Logistics GPS Radar</h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            GPS Active
          </span>
        </div>

        {/* Visual Map Canvas Representation */}
        <div className="relative w-full h-52 sm:h-60 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-4">
          {/* Subtle Map Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

          {/* Route Vector Graphic */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-indigo-500/40" strokeWidth="2" strokeDasharray="6 6">
            <path d="M 50 160 Q 200 40 450 160" fill="none" />
          </svg>

          {/* Location Pins */}
          <div className="relative z-10 flex justify-between items-center h-full px-4 sm:px-12">
            {/* Warehouse Pin */}
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-indigo-500/50 flex items-center justify-center text-indigo-400 shadow-lg">
                <PackageCheck className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-200">Fulfilment Hub</span>
              <span className="text-[10px] text-slate-500 font-mono">Bengaluru, IN</span>
            </div>

            {/* Courier Vehicle Moving Icon */}
            <div className="flex flex-col items-center gap-1 text-center -mt-6 animate-bounce">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-xl shadow-indigo-500/40 border border-indigo-400">
                <Truck className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-500/30">
                {currentOrder.status === 'Delivered' ? 'Arrived at Destination' : 'En Route to Hub'}
              </span>
            </div>

            {/* Customer Home Pin */}
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-200">Delivery Address</span>
              <span className="text-[10px] text-slate-500 font-mono">{currentOrder.shippingAddress.city}</span>
            </div>
          </div>

          {/* Live Delivery Agent Card if Out for Delivery or Shipped */}
          {currentOrder.deliveryAgent && (
            <div className="relative z-10 p-3 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white">{currentOrder.deliveryAgent.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Vehicle: {currentOrder.deliveryAgent.vehicleNumber}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Delivery Security PIN</span>
                  <span className="font-mono font-black text-indigo-300 text-xs tracking-wider">
                    {currentOrder.deliveryAgent.deliveryPin}
                  </span>
                </div>

                <a
                  href={`tel:${currentOrder.deliveryAgent.phone}`}
                  className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center gap-1 font-bold text-[11px]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Call Agent</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress Steps Timeline */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-400" />
          <span>Detailed Tracking Timeline</span>
        </h3>

        <div className="space-y-6 relative pl-4 sm:pl-6 before:absolute before:left-6 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
          {(currentOrder.trackingSteps && currentOrder.trackingSteps.length > 0
            ? currentOrder.trackingSteps
            : [
                { title: 'Order Placed & Confirmed', description: 'Payment verified successfully', timestamp: new Date(currentOrder.createdAt).toLocaleDateString(), location: 'StyleSmart System', completed: true },
                { title: 'Quality Check & Packing', description: 'Item verified for style & fit accuracy', timestamp: 'In Progress', location: 'Warehouse Hub', completed: currentOrder.status !== 'Pending' },
                { title: 'In Transit', description: 'Handed over to courier partner', timestamp: 'Pending', location: 'Regional Hub', completed: currentOrder.status === 'Shipped' || currentOrder.status === 'Delivered' },
                { title: 'Out for Delivery', description: 'Courier agent on the way', timestamp: 'Pending', location: 'Local Hub', completed: currentOrder.status === 'Delivered' },
                { title: 'Delivered', description: 'Order successfully delivered', timestamp: 'Pending', location: 'Shipping Address', completed: currentOrder.status === 'Delivered' }
              ]
          ).map((step, idx) => (
            <div key={idx} className="relative flex items-start gap-4">
              {/* Step Circle Indicator */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 text-xs font-bold ${
                  step.completed
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                    : step.current
                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/20 animate-pulse'
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                {step.completed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
              </div>

              {/* Step Info Box */}
              <div className="flex-1 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className={`text-xs font-bold ${step.completed ? 'text-white' : 'text-slate-400'}`}>
                    {step.title}
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">{step.timestamp}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">{step.description}</p>
                {step.location && (
                  <div className="text-[10px] text-indigo-400 font-medium flex items-center gap-1 pt-0.5">
                    <MapPin className="w-3 h-3 text-indigo-400" />
                    <span>{step.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Items Breakdown */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white">Order Items ({currentOrder.items.length})</h3>

        <div className="divide-y divide-slate-800/80">
          {currentOrder.items.map((item, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-14 h-16 object-cover rounded-xl bg-slate-950 border border-slate-800 shrink-0"
                />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white line-clamp-1">{item.product.title}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>Size: <strong className="text-slate-200">{item.selectedSize}</strong></span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      Color:
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-white/20 inline-block"
                        style={{ backgroundColor: item.selectedColor.hex }}
                      />
                    </span>
                    <span>•</span>
                    <span>Qty: <strong className="text-slate-200">{item.quantity}</strong></span>
                  </div>
                  <div className="text-xs font-bold text-indigo-400">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>

              {currentOrder.status === 'Delivered' && (
                <button
                  onClick={() => onInitiateReturn(currentOrder, item)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700 shrink-0"
                >
                  Return Item
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
