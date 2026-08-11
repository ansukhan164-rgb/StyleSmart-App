import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Trash2,
  Bookmark,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Tag,
  Truck,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  DollarSign,
  MapPin,
  Check,
  Lock,
  User,
  Phone,
  Sparkles,
  AlertCircle,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Address, Order } from '../types';

export const CartCheckoutPage: React.FC = () => {
  const {
    cart,
    savedForLater,
    removeFromCart,
    updateCartQuantity,
    saveForLater,
    moveToCartFromSaved,
    removeFromSavedForLater,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    currentView,
    setCurrentView,
    user,
    isLoggedIn,
    setIsLoggedIn,
    addAddress,
    placeOrder,
    showToast
  } = useApp();

  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>(
    currentView === 'checkout' ? 'checkout' : 'cart'
  );

  // Promo code local state
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  // Checkout address state
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    user.savedAddresses.find(a => a.isDefault)?.id || user.savedAddresses[0]?.id || ''
  );
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState<Omit<Address, 'id'>>({
    name: user.name || '',
    phone: user.phone || '9876543210',
    street: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    type: 'Home',
    isDefault: false
  });

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Inline Auth State if unauthenticated during checkout
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');

  // Placed Order Result
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Financial calculations
  const shippingFee = cartTotal > 1500 || cart.length === 0 ? 0 : 99;
  const taxAmount = Math.round((cartSubtotal - cartDiscount) * 0.05);
  const finalPayable = Math.max(0, cartSubtotal - cartDiscount + shippingFee + taxAmount);

  const handleApplyCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleSaveNewAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.name || !newAddr.street || !newAddr.pincode) {
      showToast('Please fill in required address fields', 'warning');
      return;
    }
    await addAddress(newAddr);
    setIsAddingAddress(false);
    // Auto select newly created address
    if (user.savedAddresses.length > 0) {
      setSelectedAddressId(user.savedAddresses[0].id);
    }
  };

  const handleQuickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim()) {
      showToast('Please enter your email', 'warning');
      return;
    }
    setIsLoggedIn(true);
    showToast('Logged in successfully! Proceeding with checkout...');
  };

  const handleFinalPlaceOrder = async () => {
    let addressToUse = user.savedAddresses.find(a => a.id === selectedAddressId);
    if (!addressToUse) {
      if (user.savedAddresses.length > 0) {
        addressToUse = user.savedAddresses[0];
      } else {
        showToast('Please add or select a shipping address first.', 'warning');
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const order = await placeOrder({
        shippingAddress: addressToUse,
        paymentMethod
      });

      if (order) {
        setPlacedOrder(order);
        setStep('success');
      }
    } catch (err) {
      showToast('An error occurred placing your order. Please try again.', 'warning');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------- SUCCESS VIEW ----------------
  if (step === 'success' && placedOrder) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto py-10 px-4 space-y-8"
      >
        <div className="text-center space-y-4 p-8 rounded-3xl bg-gradient-to-b from-emerald-500/10 via-zinc-900 to-zinc-950 border border-emerald-500/30 shadow-2xl">
          <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest border border-emerald-500/40">
            Order Confirmed & Payment Received
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Thank You for Your Order!
          </h1>
          <p className="text-sm text-zinc-300 max-w-md mx-auto">
            Order ID: <strong className="text-emerald-400 font-mono text-base">{placedOrder.id}</strong>
          </p>
          <p className="text-xs text-zinc-400">
            A confirmation receipt and tracking code have been dispatched to <strong>{user.email}</strong>.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setCurrentView('tracking')}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Track Order Progress</span>
            </button>
            <button
              onClick={() => setCurrentView('shop')}
              className="px-6 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs uppercase tracking-wider transition-all"
            >
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Order Details Breakdown Card */}
        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div>
              <h3 className="font-bold text-white text-base">Order Summary</h3>
              <p className="text-xs text-zinc-400">{placedOrder.items.length} item(s) • Placed on {new Date(placedOrder.createdAt).toLocaleDateString()}</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Estimated Delivery: {placedOrder.estimatedDeliveryDate}
            </span>
          </div>

          <div className="divide-y divide-zinc-800/60">
            {placedOrder.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center gap-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-16 h-20 rounded-xl object-cover border border-zinc-800 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">{item.product.brand}</span>
                  <h4 className="text-xs font-bold text-white truncate">{item.product.title}</h4>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Size: <strong>{item.selectedSize}</strong> | Color: <strong>{item.selectedColor.name}</strong> | Qty: <strong>{item.quantity}</strong>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-white">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
              <span className="font-bold text-zinc-400 flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                Shipping Address
              </span>
              <p className="font-bold text-white">{placedOrder.shippingAddress.name}</p>
              <p className="text-zinc-400">{placedOrder.shippingAddress.street}</p>
              <p className="text-zinc-400">{placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.state} - {placedOrder.shippingAddress.pincode}</p>
              <p className="text-zinc-400 font-mono">Phone: {placedOrder.shippingAddress.phone}</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-1.5">
              <span className="font-bold text-zinc-400 flex items-center gap-1.5 mb-1">
                <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                Payment & Billing
              </span>
              <div className="flex justify-between text-zinc-300">
                <span>Payment Mode:</span>
                <strong className="text-white">{placedOrder.paymentMethod}</strong>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Subtotal:</span>
                <span>₹{placedOrder.subtotal.toLocaleString()}</span>
              </div>
              {placedOrder.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount Saved:</span>
                  <span>-₹{placedOrder.discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-300">
                <span>GST Tax & Shipping:</span>
                <span>₹{(placedOrder.shippingFee + placedOrder.taxAmount).toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-zinc-800 flex justify-between font-black text-sm text-white">
                <span>Total Amount Paid:</span>
                <span className="text-emerald-400">₹{placedOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // ---------------- CART VIEW ----------------
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8 pb-12"
    >
      {/* Checkout Navigation Progress Bar */}
      <div className="flex items-center justify-center gap-4 text-xs font-bold border-b border-zinc-800 pb-4">
        <button
          onClick={() => setStep('cart')}
          className={`flex items-center gap-2 pb-1 border-b-2 transition-all ${
            step === 'cart' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-zinc-500'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] flex items-center justify-center font-bold">1</span>
          <span>Shopping Bag ({cart.reduce((a, c) => a + c.quantity, 0)})</span>
        </button>

        <ChevronRight className="w-4 h-4 text-zinc-600" />

        <button
          onClick={() => {
            if (cart.length > 0) setStep('checkout');
          }}
          disabled={cart.length === 0}
          className={`flex items-center gap-2 pb-1 border-b-2 transition-all ${
            step === 'checkout' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-zinc-500'
          } ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] flex items-center justify-center font-bold">2</span>
          <span>Checkout & Payment</span>
        </button>
      </div>

      {step === 'cart' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Main Cart Section (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-indigo-500" />
                <span>Your Shopping Bag</span>
              </h1>
              {cart.length > 0 && (
                <button
                  onClick={() => setCurrentView('shop')}
                  className="text-xs font-bold text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Continue Shopping</span>
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-5">
                <div className="w-16 h-16 rounded-3xl bg-zinc-800 text-zinc-500 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Your Shopping Bag is empty</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Explore our AI-styled fashion catalog to discover hoodies, sneakers, dresses, and streetwear.
                </p>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all inline-flex items-center gap-2"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, idx) => (
                  <motion.div
                    key={`${item.product.id}-${item.selectedColor.hex}-${item.selectedSize}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-4 sm:p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-zinc-700 transition-colors shadow-md"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl object-cover bg-zinc-950 shrink-0 border border-zinc-800"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400">
                          {item.product.brand}
                        </span>
                        <span className="text-sm font-black text-white">
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      <h3
                        onClick={() => {
                          setCurrentView('pdp');
                        }}
                        className="text-sm sm:text-base font-bold text-white hover:text-indigo-400 transition-colors cursor-pointer truncate"
                      >
                        {item.product.title}
                      </h3>

                      <div className="flex items-center gap-3 text-xs text-zinc-400 flex-wrap">
                        <span className="flex items-center gap-1.5 bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800">
                          <span>Color:</span>
                          <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: item.selectedColor.hex }} />
                          <strong className="text-white">{item.selectedColor.name}</strong>
                        </span>

                        <span className="bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800">
                          Size: <strong className="text-white">{item.selectedSize}</strong>
                        </span>

                        {item.product.stockCount < 5 && (
                          <span className="text-[11px] font-bold text-amber-400">
                            Only {item.product.stockCount} left in stock!
                          </span>
                        )}
                      </div>

                      {/* Quantity & Action controls */}
                      <div className="pt-2 flex items-center justify-between gap-4">
                        <div className="flex items-center border border-zinc-700 rounded-xl bg-zinc-950">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.selectedColor.hex, item.selectedSize, -1)}
                            className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold text-white font-mono">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.selectedColor.hex, item.selectedSize, 1)}
                            className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => saveForLater(item)}
                            className="text-xs text-zinc-400 hover:text-indigo-400 transition-colors flex items-center gap-1 font-semibold"
                          >
                            <Bookmark className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Save for Later</span>
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedColor.hex, item.selectedSize)}
                            className="text-xs text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1 font-semibold"
                            title="Remove from cart"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Saved for Later Items */}
            {savedForLater.length > 0 && (
              <div className="pt-6 border-t border-zinc-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-indigo-400" />
                  <span>Saved for Later ({savedForLater.length})</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedForLater.map((sItem, sIdx) => (
                    <div key={sIdx} className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-3">
                      <img
                        src={sItem.product.images[0]}
                        alt={sItem.product.title}
                        className="w-14 h-16 rounded-xl object-cover bg-zinc-950 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="text-xs font-bold text-white truncate">{sItem.product.title}</h4>
                        <p className="text-[11px] text-zinc-400">
                          ₹{sItem.product.price} | Size: {sItem.selectedSize}
                        </p>
                        <div className="flex items-center gap-3 pt-1">
                          <button
                            onClick={() => moveToCartFromSaved(sItem)}
                            className="text-[11px] font-bold text-indigo-400 hover:underline"
                          >
                            Move to Bag
                          </button>
                          <button
                            onClick={() => removeFromSavedForLater(sItem.product.id, sItem.selectedColor.hex, sItem.selectedSize)}
                            className="text-[11px] font-bold text-rose-400 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Promo Coupon Card */}
            <div className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <Tag className="w-4 h-4 text-violet-400" />
                <span>Apply Promo Coupon</span>
              </h3>

              {appliedCoupon ? (
                <div className="p-3.5 rounded-2xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-violet-300 block">{appliedCoupon.code}</span>
                    <span className="text-[11px] text-zinc-400">Saving {appliedCoupon.discountPercent}% off</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-rose-400 hover:text-rose-300 text-xs font-bold underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCouponSubmit} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="e.g. STYLESMRT20"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono uppercase text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-rose-400">{couponError}</p>}
                </form>
              )}

              {/* Sample Coupons Badges */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {['STYLESMRT20', 'FIRST10', 'VIP30'].map(code => (
                  <button
                    key={code}
                    onClick={() => {
                      setCouponInput(code);
                      applyCoupon(code);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/50 transition-colors"
                  >
                    + {code}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Breakdown Sidebar */}
            <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4 shadow-xl">
              <h3 className="text-sm font-black uppercase tracking-wider text-white border-b border-zinc-800 pb-3">
                Order Financial Summary
              </h3>

              <div className="space-y-2.5 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-white">₹{cartSubtotal.toLocaleString()}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon Discount</span>
                    <span className="font-semibold">-₹{cartDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  {shippingFee === 0 ? (
                    <span className="font-bold text-emerald-400 uppercase text-[11px]">FREE</span>
                  ) : (
                    <span>₹{shippingFee}</span>
                  )}
                </div>

                <div className="flex justify-between">
                  <span>Estimated GST (5%)</span>
                  <span>₹{taxAmount.toLocaleString()}</span>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex justify-between items-baseline font-black text-base text-white">
                  <span>Total Payable</span>
                  <span className="text-xl text-indigo-400">₹{finalPayable.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => setStep('checkout')}
                disabled={cart.length === 0}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>256-Bit SSL Encrypted Safe Checkout</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ---------------- CHECKOUT STEP ---------------- */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Checkout Setup Form (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Authentication Guard */}
            {!isLoggedIn ? (
              <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
                <div className="flex items-center gap-3 text-indigo-400 font-bold text-sm">
                  <User className="w-5 h-5" />
                  <span>Step 1: Account Login Required</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Please log in or enter your email to complete checkout and save order updates to your profile.
                </p>

                <form onSubmit={handleQuickLogin} className="space-y-3 max-w-md pt-2">
                  <div>
                    <label className="text-[11px] font-bold text-zinc-300 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={authEmail}
                      onChange={e => setAuthEmail(e.target.value)}
                      placeholder="alex.merchant@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-zinc-300 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={authName}
                      onChange={e => setAuthName(e.target.value)}
                      placeholder="Alex Merchant"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase"
                  >
                    Continue as Guest / Sign In
                  </button>
                </form>
              </div>
            ) : (
              /* Step 2: Shipping Address Selection */
              <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-500" />
                    <span>Select Shipping Address</span>
                  </h3>
                  <button
                    onClick={() => setIsAddingAddress(!isAddingAddress)}
                    className="text-xs font-bold text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>

                {isAddingAddress && (
                  <form onSubmit={handleSaveNewAddress} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                    <h4 className="text-xs font-bold text-white">Enter New Address Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <input
                        type="text"
                        placeholder="Full Name *"
                        required
                        value={newAddr.name}
                        onChange={e => setNewAddr({ ...newAddr, name: e.target.value })}
                        className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Phone Number *"
                        required
                        value={newAddr.phone}
                        onChange={e => setNewAddr({ ...newAddr, phone: e.target.value })}
                        className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Street / Flat / House No *"
                        required
                        value={newAddr.street}
                        onChange={e => setNewAddr({ ...newAddr, street: e.target.value })}
                        className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white sm:col-span-2"
                      />
                      <input
                        type="text"
                        placeholder="City *"
                        required
                        value={newAddr.city}
                        onChange={e => setNewAddr({ ...newAddr, city: e.target.value })}
                        className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
                      />
                      <input
                        type="text"
                        placeholder="State *"
                        required
                        value={newAddr.state}
                        onChange={e => setNewAddr({ ...newAddr, state: e.target.value })}
                        className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Pincode *"
                        required
                        maxLength={6}
                        value={newAddr.pincode}
                        onChange={e => setNewAddr({ ...newAddr, pincode: e.target.value })}
                        className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="px-5 py-2 rounded-xl bg-zinc-800 text-zinc-300 font-bold text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.savedAddresses.map(addr => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedAddressId === addr.id
                          ? 'bg-indigo-500/10 border-indigo-500 ring-2 ring-indigo-500/20'
                          : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-1">
                        <span className="font-bold text-white text-xs">{addr.name}</span>
                        {addr.isDefault && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">{addr.street}</p>
                      <p className="text-xs text-zinc-400">{addr.city}, {addr.state} - {addr.pincode}</p>
                      <p className="text-[11px] text-zinc-500 font-mono mt-2">Phone: {addr.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Payment Method Selection */}
            <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-5">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-500" />
                <span>Select Payment Method</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
                {[
                  { id: 'UPI', label: 'UPI / QR', icon: QrCode },
                  { id: 'Card', label: 'Credit / Debit', icon: CreditCard },
                  { id: 'NetBanking', label: 'Net Banking', icon: Building },
                  { id: 'COD', label: 'Cash on Delivery', icon: DollarSign }
                ].map(item => {
                  const IconComp = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPaymentMethod(item.id as any)}
                      className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                        paymentMethod === item.id
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/20'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Method Specific Inputs */}
              {paymentMethod === 'UPI' && (
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <p className="text-xs font-bold text-zinc-300">Enter VPA / UPI ID or scan QR</p>
                  <input
                    type="text"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="e.g. user@gpay or 9876543210@paytm"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                  <p className="text-[11px] text-zinc-500">Instant approval via Google Pay, PhonePe, Paytm or BHIM.</p>
                </div>
              )}

              {paymentMethod === 'Card' && (
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <input
                      type="text"
                      placeholder="Card Number (16 digits)"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white sm:col-span-3"
                    />
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={e => setCardExpiry(e.target.value)}
                      className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      maxLength={4}
                      value={cardCvv}
                      onChange={e => setCardCvv(e.target.value)}
                      className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Checkout Review Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-5 shadow-xl">
              <h3 className="text-sm font-black uppercase tracking-wider text-white border-b border-zinc-800 pb-3">
                Review & Place Order
              </h3>

              <div className="divide-y divide-zinc-800 max-h-60 overflow-y-auto">
                {cart.map((c, i) => (
                  <div key={i} className="py-2.5 flex items-center gap-3 text-xs">
                    <img src={c.product.images[0]} alt="p" className="w-10 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white truncate">{c.product.title}</p>
                      <p className="text-[11px] text-zinc-400">Qty: {c.quantity} | {c.selectedSize}</p>
                    </div>
                    <span className="font-bold text-white">₹{(c.product.price * c.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-zinc-800 space-y-2 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{cartSubtotal.toLocaleString()}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount:</span>
                    <span>-₹{cartDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST Tax:</span>
                  <span>₹{taxAmount.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-zinc-800 flex justify-between font-black text-base text-white">
                  <span>Final Total:</span>
                  <span className="text-indigo-400">₹{finalPayable.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleFinalPlaceOrder}
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Secure Payment...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>PLACE ORDER & PAY ₹{finalPayable.toLocaleString()}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setStep('cart')}
                className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs"
              >
                Back to Shopping Bag
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
