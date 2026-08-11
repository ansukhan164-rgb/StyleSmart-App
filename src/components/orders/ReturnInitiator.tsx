import React, { useState } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Truck,
  ArrowRight,
  ShieldCheck,
  Gift,
  Check,
  Building,
  RefreshCw,
  X,
  Upload,
  Info
} from 'lucide-react';
import { Order, CartItem, ReturnRequest, Address } from '../../types';
import { useApp } from '../../context/AppContext';

interface ReturnInitiatorProps {
  order: Order;
  preselectedItem?: CartItem;
  onSuccess: () => void;
  onCancel: () => void;
}

const RETURN_REASONS = [
  'Size too small (Need larger size)',
  'Size too large (Need smaller size)',
  'Fit / Cut did not suit my body archetype',
  'Color / Fabric differs from photos',
  'Quality issue or loose threading',
  'Defective or damaged during shipment',
  'Received incorrect item / wrong size'
];

const TIME_SLOTS = [
  '09:00 AM - 12:00 PM',
  '12:00 PM - 03:00 PM',
  '03:00 PM - 06:00 PM',
  '06:00 PM - 09:00 PM'
];

export const ReturnInitiator: React.FC<ReturnInitiatorProps> = ({
  order,
  preselectedItem,
  onSuccess,
  onCancel
}) => {
  const { submitReturnRequest, showToast } = useApp();

  // Selected item state
  const [selectedItem, setSelectedItem] = useState<CartItem>(
    preselectedItem || order.items[0]
  );

  // Request type: Return & Refund vs Exchange
  const [requestType, setRequestType] = useState<'return_refund' | 'exchange_size'>('exchange_size');
  const [exchangeSize, setExchangeSize] = useState<string>('L');

  // Reason & Details
  const [reason, setReason] = useState<string>(RETURN_REASONS[0]);
  const [additionalDetails, setAdditionalDetails] = useState<string>('');

  // Pickup Method & Schedule
  const [pickupMethod, setPickupMethod] = useState<'doorstep' | 'dropoff'>('doorstep');
  const [pickupDate, setPickupDate] = useState<string>('2026-08-11');
  const [timeSlot, setTimeSlot] = useState<string>(TIME_SLOTS[0]);

  // Refund Preference
  const [refundPreference, setRefundPreference] = useState<'store_credit' | 'original_payment'>('store_credit');

  // UI status
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableSizes = selectedItem.product.sizes || ['S', 'M', 'L', 'XL', 'XXL'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const returnReq: ReturnRequest = {
        id: `RET-${Date.now().toString().slice(-6)}`,
        orderId: order.id,
        productId: selectedItem.product.id,
        itemTitle: selectedItem.product.title,
        itemColorHex: selectedItem.selectedColor.hex,
        itemColorName: selectedItem.selectedColor.name,
        itemSize: selectedItem.selectedSize,
        itemImage: selectedItem.product.images[0],
        reason,
        details: additionalDetails,
        requestedAction: requestType,
        exchangeSize: requestType === 'exchange_size' ? exchangeSize : undefined,
        refundPreference,
        pickupAddress: order.shippingAddress,
        pickupDate,
        pickupTimeSlot: timeSlot,
        status: 'Pickup Scheduled',
        createdAt: new Date().toISOString(),
        refundAmount: selectedItem.product.price * selectedItem.quantity
      };

      submitReturnRequest(returnReq);
      setIsSubmitting(false);
      onSuccess();
    }, 1000);
  };

  return (
    <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-2xl text-slate-100">
      {/* Top Bar Accent */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-violet-500" />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-1.5">
            <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
            <span>14-Day Free Returns & Exchange Portal</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Initiate Return / Size Exchange
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Order #{order.id} • Delivered on {order.estimatedDeliveryDate}
          </p>
        </div>

        <button
          onClick={onCancel}
          className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* STEP 1: Select Item to Return */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
              1
            </span>
            Select Item to Return / Exchange
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {order.items.map((item, idx) => {
              const isSelected = selectedItem.product.id === item.product.id;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedItem(item)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/30'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-12 h-14 object-cover rounded-xl bg-slate-900 shrink-0"
                  />
                  <div className="flex-1 space-y-0.5 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.product.title}</h4>
                    <p className="text-[11px] text-slate-400">
                      Size: <strong className="text-slate-200">{item.selectedSize}</strong> • ₹{item.product.price}
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'border-slate-700 bg-slate-900'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 2: Choose Resolution Type (Exchange vs Refund) */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
              2
            </span>
            What would you like to do?
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRequestType('exchange_size')}
              className={`p-4 rounded-2xl border text-left transition-all relative ${
                requestType === 'exchange_size'
                  ? 'bg-gradient-to-br from-indigo-950/80 to-purple-950/80 border-indigo-500 ring-2 ring-indigo-500/30'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
                  Free Size / Fit Exchange
                </span>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Fastest Option
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Exchange for a different size delivered right to your doorstep upon pickup.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setRequestType('return_refund')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                requestType === 'return_refund'
                  ? 'bg-gradient-to-br from-indigo-950/80 to-purple-950/80 border-indigo-500 ring-2 ring-indigo-500/30'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
                  Full Refund
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Return item for 100% refund into StyleSmart Cash or original bank account.
              </p>
            </button>
          </div>

          {/* If Exchange: Select New Desired Size with AI Confidence */}
          {requestType === 'exchange_size' && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  Select Desired Exchange Size:
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  AI Fit Recommendation: 96% Match
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {availableSizes.map(sz => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setExchangeSize(sz)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      exchangeSize === sz
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400'
                        : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    Size {sz}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* STEP 3: Reason for Return */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
              3
            </span>
            Reason for Return / Exchange
          </label>

          <select
            value={reason}
            onChange={e => setReason(e.target.value)}
            className="w-full h-11 px-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-indigo-500"
          >
            {RETURN_REASONS.map((r, i) => (
              <option key={i} value={r}>
                {r}
              </option>
            ))}
          </select>

          <textarea
            rows={2}
            value={additionalDetails}
            onChange={e => setAdditionalDetails(e.target.value)}
            placeholder="Additional comments or specific fit issues (optional)..."
            className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>

        {/* STEP 4: Pickup Schedule & Method */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
              4
            </span>
            Select Doorstep Pickup Schedule
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                Pickup Date
              </span>
              <input
                type="date"
                required
                value={pickupDate}
                onChange={e => setPickupDate(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                Preferred Time Slot
              </span>
              <select
                value={timeSlot}
                onChange={e => setTimeSlot(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-indigo-500"
              >
                {TIME_SLOTS.map((ts, i) => (
                  <option key={i} value={ts}>
                    {ts}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs flex items-center gap-2 text-slate-300">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="line-clamp-1">
              Pickup Address: <strong>{order.shippingAddress.street}, {order.shippingAddress.city} ({order.shippingAddress.pincode})</strong>
            </div>
          </div>
        </div>

        {/* STEP 5: Refund Preference (if return_refund) */}
        {requestType === 'return_refund' && (
          <div className="space-y-3 animate-fadeIn">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                5
              </span>
              Refund Method
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRefundPreference('store_credit')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  refundPreference === 'store_credit'
                    ? 'bg-indigo-950/80 border-indigo-500 ring-2 ring-indigo-500/30'
                    : 'bg-slate-950/80 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-amber-400" />
                    StyleSmart Wallet Credit
                  </span>
                  <span className="text-[9px] font-bold text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded">
                    + ₹150 Bonus
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Instant credit upon pickup scan for future orders.</p>
              </button>

              <button
                type="button"
                onClick={() => setRefundPreference('original_payment')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  refundPreference === 'original_payment'
                    ? 'bg-indigo-950/80 border-indigo-500 ring-2 ring-indigo-500/30'
                    : 'bg-slate-950/80 border-slate-800'
                }`}
              >
                <div className="text-xs font-bold text-white mb-0.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  Original Payment Source
                </div>
                <p className="text-[11px] text-slate-400">Refunded to Bank/UPI within 3-5 working days.</p>
              </button>
            </div>
          </div>
        )}

        {/* Submit Actions */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
          >
            {isSubmitting ? (
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
            ) : (
              <>
                <span>Confirm {requestType === 'exchange_size' ? 'Exchange' : 'Return'} Request</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
