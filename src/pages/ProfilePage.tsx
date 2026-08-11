import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Mail,
  Calendar,
  Sparkles,
  ShoppingBag,
  Heart,
  ShieldCheck,
  LogOut,
  Sliders,
  Package,
  ArrowRight,
  CheckCircle2,
  Lock,
  Tag,
  Truck,
  Edit3,
  MapPin,
  Plus,
  Trash2,
  Phone,
  Clock,
  Eye,
  Check,
  AlertCircle,
  X,
  RotateCcw,
  Camera,
  Upload,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/product/ProductCard';
import { Address, Order, Gender } from '../types';
import { getAvatarUrl, validateAvatarFile, compressAndResizeAvatar } from '../lib/avatarUtils';

export const ProfilePage: React.FC = () => {
  const {
    user,
    isLoggedIn,
    logout,
    setCurrentView,
    wishlist,
    recentlyViewed,
    orders,
    showToast,
    updatePreferences,
    updateUserProfile,
    changePassword,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    submitReturnRequest,
    addToCart
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'wishlist' | 'preferences' | 'security'>('profile');

  // Profile Form State
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '9876543210');
  const [profileDob, setProfileDob] = useState(user?.dob || '1998-05-14');
  const [profileGender, setProfileGender] = useState<Gender>(user?.gender || 'Unisex');
  const [profileAvatar, setProfileAvatar] = useState(user?.avatar || '');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Avatar Photo Upload State & Handlers
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessingAvatar, setIsProcessingAvatar] = useState(false);

  const processAndSetAvatarFile = async (file: File) => {
    const validation = validateAvatarFile(file);
    if (!validation.valid) {
      showToast(validation.error || 'Invalid photo format or size.', 'warning');
      return;
    }

    try {
      setIsProcessingAvatar(true);
      const compressedDataUrl = await compressAndResizeAvatar(file, 400, 0.85);
      setProfileAvatar(compressedDataUrl);
      await updateUserProfile({ avatar: compressedDataUrl });
      showToast('Profile picture uploaded and updated successfully!', 'success');
    } catch (err) {
      console.error('Error processing uploaded avatar photo:', err);
      showToast('Failed to process uploaded photo. Please try another image.', 'warning');
    } finally {
      setIsProcessingAvatar(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAndSetAvatarFile(file);
    }
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processAndSetAvatarFile(file);
    }
  };

  const handleRemovePhoto = async () => {
    setProfileAvatar('');
    await updateUserProfile({ avatar: '' });
    showToast('Profile photo removed. Restored default user avatar.', 'info');
  };

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addrForm, setAddrForm] = useState<Omit<Address, 'id'>>({
    name: user?.name || '',
    phone: user?.phone || '9876543210',
    street: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    type: 'Home',
    isDefault: false
  });

  // Sync state when user object updates on sign-in
  React.useEffect(() => {
    if (user) {
      setProfileName(user.name || '');
      setProfileEmail(user.email || '');
      setProfilePhone(user.phone || '9876543210');
      setProfileDob(user.dob || '1998-05-14');
      setProfileGender(user.gender || 'Unisex');
      setProfileAvatar(user.avatar || '');
      setTopSize(user.preferences?.sizePreferences?.tops || 'M');
      setBottomSize(user.preferences?.sizePreferences?.bottoms || '32');
      setShoeSize(user.preferences?.sizePreferences?.shoes || 'UK 9');
      setAddrForm(prev => ({
        ...prev,
        name: user.name || prev.name,
        phone: user.phone || prev.phone
      }));
    }
  }, [user]);

  // Password Change Form State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);

  // Style Preferences State
  const [topSize, setTopSize] = useState(user.preferences?.sizePreferences?.tops || 'M');
  const [bottomSize, setBottomSize] = useState(user.preferences?.sizePreferences?.bottoms || '32');
  const [shoeSize, setShoeSize] = useState(user.preferences?.sizePreferences?.shoes || 'UK 9');
  const [isSavingPrefs, setIsSavingPrefs] = useState(false);

  // Order Detail Modal State
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [returnItem, setReturnItem] = useState<{ order: Order; item: any } | null>(null);
  const [returnReason, setReturnReason] = useState('Size fit issue');
  const [returnDetails, setReturnDetails] = useState('');

  if (!isLoggedIn) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto py-16 px-4 text-center space-y-6"
      >
        <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/10">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
          Sign In Required
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
          Please sign in or create an account to view your personalized AI wardrobe, order history, and saved addresses.
        </p>
        <button
          onClick={() => setCurrentView('auth')}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2 mx-auto"
        >
          <span>Open Sign In Portal</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    await updateUserProfile({
      name: profileName,
      email: profileEmail,
      phone: profilePhone,
      dob: profileDob,
      gender: profileGender,
      avatar: profileAvatar
    });
    setIsUpdatingProfile(false);
    showToast('Profile information successfully saved!', 'success');
  };

  const handleCancelProfile = () => {
    if (user) {
      setProfileName(user.name || '');
      setProfileEmail(user.email || '');
      setProfilePhone(user.phone || '9876543210');
      setProfileDob(user.dob || '1998-05-14');
      setProfileGender(user.gender || 'Unisex');
      setProfileAvatar(user.avatar || '');
    }
    showToast('Unsaved changes reverted.', 'info');
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      await updateAddress({ ...addrForm, id: editingAddress.id });
    } else {
      await addAddress(addrForm);
    }
    setIsAddressModalOpen(false);
    setEditingAddress(null);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      showToast('New passwords do not match!', 'warning');
      return;
    }
    setIsChangingPass(true);
    const res = await changePassword(currentPass, newPass);
    setIsChangingPass(false);
    if (res.success) {
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    }
  };

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnItem) return;

    submitReturnRequest({
      id: `RET-${Date.now()}`,
      orderId: returnItem.order.id,
      productId: returnItem.item.product.id,
      itemTitle: returnItem.item.product.title,
      itemColorHex: returnItem.item.selectedColor.hex,
      itemColorName: returnItem.item.selectedColor.name,
      itemSize: returnItem.item.selectedSize,
      itemImage: returnItem.item.product.images[0],
      reason: returnReason,
      details: returnDetails,
      requestedAction: 'return_refund',
      refundPreference: 'store_credit',
      pickupAddress: returnItem.order.shippingAddress,
      pickupDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pickupTimeSlot: '10:00 AM - 02:00 PM',
      status: 'Pickup Scheduled',
      createdAt: new Date().toISOString(),
      refundAmount: returnItem.item.product.price * returnItem.item.quantity
    });

    setReturnItem(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-8 max-w-6xl mx-auto pb-12"
    >
      {/* 1. Header Profile Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-zinc-900 via-indigo-950 to-slate-900 border border-indigo-500/20 p-6 sm:p-8 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative group shrink-0">
              <img
                src={getAvatarUrl(user?.avatar)}
                alt={user?.name || 'User Profile'}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-xl"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={() => {
                  setActiveTab('profile');
                  setTimeout(() => fileInputRef.current?.click(), 100);
                }}
                className="absolute -bottom-1 -right-1 p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg border border-indigo-400/30 transition-all hover:scale-110"
                title="Change Profile Photo"
                aria-label="Change Profile Photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[11px] font-bold uppercase tracking-wider">
                  VIP Fashion Member
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-zinc-400 flex-wrap">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-zinc-500" />
                  {user.phone || '+91 98765 43210'}
                </span>
              </div>
              <div className="pt-1 flex items-center gap-2 text-xs font-semibold text-indigo-400">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Style Score: <strong>{user.styleScore || 95}/100</strong> • Archetype: <strong>{user.styleArchetype || 'Urban Minimalist'}</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all flex items-center gap-2 shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* 2. Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800 text-xs font-bold scrollbar-none">
        {[
          { id: 'profile', label: 'Profile Details', icon: User },
          { id: 'orders', label: `My Orders (${orders.length})`, icon: Package },
          { id: 'addresses', label: `Addresses (${user?.savedAddresses?.length || 0})`, icon: MapPin },
          { id: 'wishlist', label: `Wishlist (${wishlist.length})`, icon: Heart },
          { id: 'preferences', label: 'AI Style Preferences', icon: Sliders },
          { id: 'security', label: 'Account Security', icon: Lock }
        ].map(tab => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 rounded-2xl flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. TAB CONTENT PANELS */}
      <div className="space-y-6">
        {/* TAB 1: PROFILE DETAILS */}
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 max-w-2xl">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-400" />
              <span>Personal Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-zinc-400 font-bold block mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={profileName}
                  onChange={e => setProfileName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={profileEmail}
                  onChange={e => setProfileEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={profilePhone}
                  onChange={e => setProfilePhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1.5">Date of Birth</label>
                <input
                  type="date"
                  value={profileDob}
                  onChange={e => setProfileDob(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1.5">Gender Preference</label>
                <select
                  value={profileGender}
                  onChange={e => setProfileGender(e.target.value as Gender)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="men">Men's Fashion</option>
                  <option value="women">Women's Fashion</option>
                  <option value="unisex">Unisex / Gender Neutral</option>
                </select>
              </div>

            </div>

            {/* Interactive Photo Uploader Card */}
            <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <label className="text-zinc-200 font-bold text-xs flex items-center gap-2">
                  <Camera className="w-4 h-4 text-indigo-400" />
                  <span>Profile Picture</span>
                </label>
                <span className="text-[11px] text-zinc-500 font-medium">
                  JPG, JPEG, PNG, WebP • Max 5MB
                </span>
              </div>

              {/* Drag & Drop Upload Container */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative p-5 rounded-2xl border-2 border-dashed transition-all flex flex-col sm:flex-row items-center justify-between gap-5 ${
                  isDragging
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/60'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  capture="user"
                  className="hidden"
                  onChange={handleFileInputChange}
                />

                <div className="flex items-center gap-4 text-left w-full sm:w-auto">
                  {/* Avatar Preview */}
                  <div className="relative shrink-0">
                    <img
                      src={getAvatarUrl(profileAvatar || user?.avatar)}
                      alt="Profile Avatar Preview"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-lg bg-zinc-900"
                      referrerPolicy="no-referrer"
                    />
                    {isProcessingAvatar && (
                      <div className="absolute inset-0 rounded-2xl bg-zinc-950/80 backdrop-blur-xs flex items-center justify-center text-indigo-400">
                        <Loader2 className="w-6 h-6 animate-spin" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white flex items-center gap-2 flex-wrap">
                      <span>{(profileAvatar || user?.avatar) ? 'Custom Photo Uploaded' : 'Default Profile Icon'}</span>
                      {(profileAvatar || user?.avatar) && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                          Active
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-zinc-400 leading-relaxed max-w-sm">
                      Upload a photo from your camera or gallery. Photos are automatically compressed & optimized for rapid loading across devices.
                    </p>
                  </div>
                </div>

                {/* Control Action Buttons */}
                <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/80">
                  <button
                    type="button"
                    disabled={isProcessingAvatar}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50"
                  >
                    {isProcessingAvatar ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>{(profileAvatar || user?.avatar) ? 'Change Photo' : 'Upload Photo'}</span>
                      </>
                    )}
                  </button>

                  {(profileAvatar || user?.avatar) && (
                    <button
                      type="button"
                      disabled={isProcessingAvatar}
                      onClick={handleRemovePhoto}
                      className="px-3.5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                      title="Remove Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Remove Photo</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isUpdatingProfile ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Save Profile Changes</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCancelProfile}
                disabled={isUpdatingProfile}
                className="px-5 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: MY ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
                <Package className="w-12 h-12 text-zinc-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No Orders Placed Yet</h3>
                <p className="text-xs text-zinc-400">Start exploring our AI catalog to make your first order.</p>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              orders.map(ord => (
                <div key={ord.id} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4 shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-zinc-800">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-white text-sm">{ord.id}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                          ord.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                          ord.status === 'Cancelled' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                          'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                        }`}>
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1">Placed on {new Date(ord.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details & Tracking</span>
                      </button>
                    </div>
                  </div>

                  <div className="divide-y divide-zinc-800/60">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img src={it.product.images[0]} alt="p" className="w-12 h-14 rounded-lg object-cover bg-zinc-950" referrerPolicy="no-referrer" />
                          <div>
                            <p className="text-xs font-bold text-white">{it.product.title}</p>
                            <p className="text-[11px] text-zinc-400">Color: {it.selectedColor.name} | Size: {it.selectedSize} | Qty: {it.quantity}</p>
                          </div>
                        </div>

                        <div className="text-right flex items-center gap-3">
                          <span className="text-xs font-bold text-white">₹{(it.product.price * it.quantity).toLocaleString()}</span>
                          {ord.status === 'Delivered' && (
                            <button
                              onClick={() => setReturnItem({ order: ord, item: it })}
                              className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400 text-[10px] font-bold flex items-center gap-1"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Return / Exchange</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-between items-center text-xs text-zinc-400">
                    <span>Payment: <strong>{ord.paymentMethod}</strong></span>
                    <span className="font-bold text-white text-sm">Total Paid: <strong className="text-emerald-400">₹{ord.totalAmount.toLocaleString()}</strong></span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: SAVED ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="space-y-4 max-w-4xl">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-400" />
                <span>Saved Delivery Addresses</span>
              </h3>
              <button
                onClick={() => {
                  setEditingAddress(null);
                  setAddrForm({
                    name: user.name,
                    phone: user.phone || '9876543210',
                    street: '',
                    city: 'Mumbai',
                    state: 'Maharashtra',
                    pincode: '400001',
                    type: 'Home',
                    isDefault: false
                  });
                  setIsAddressModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(user.savedAddresses || []).map(addr => (
                <div key={addr.id} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-white text-sm block">{addr.name}</span>
                      <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                        {addr.type || 'Home'}
                      </span>
                    </div>
                    {addr.isDefault ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                        Default
                      </span>
                    ) : (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-[10px] text-zinc-400 hover:text-white underline"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-zinc-300">{addr.street}</p>
                  <p className="text-xs text-zinc-300">{addr.city}, {addr.state} - {addr.pincode}</p>
                  <p className="text-xs text-zinc-400 font-mono">Phone: {addr.phone}</p>

                  <div className="pt-2 flex justify-end gap-3 border-t border-zinc-800 text-xs">
                    <button
                      onClick={() => {
                        setEditingAddress(addr);
                        setAddrForm(addr);
                        setIsAddressModalOpen(true);
                      }}
                      className="text-indigo-400 font-bold hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="text-rose-400 font-bold hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="space-y-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
              <span>Your Saved Wishlist ({wishlist.length})</span>
            </h3>

            {wishlist.length === 0 ? (
              <p className="text-xs text-zinc-400 py-8">Your wishlist is currently empty.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {wishlist.map(prod => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: AI STYLE PREFERENCES */}
        {activeTab === 'preferences' && (
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 max-w-2xl">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-violet-400" />
              <span>Fashion Fit & Size Profile</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="text-zinc-400 font-bold block mb-1">Tops / Hoodies Size</label>
                <select
                  value={topSize}
                  onChange={e => setTopSize(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white"
                >
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Bottoms / Waist Size</label>
                <select
                  value={bottomSize}
                  onChange={e => setBottomSize(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white"
                >
                  {['28', '30', '32', '34', '36', '38'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Sneaker / Shoe Size</label>
                <select
                  value={shoeSize}
                  onChange={e => setShoeSize(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white"
                >
                  {['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => showToast('Style preferences saved!')}
              className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-xs uppercase"
            >
              Save Size Profile
            </button>
          </div>
        )}

        {/* TAB 6: ACCOUNT SECURITY */}
        {activeTab === 'security' && (
          <form onSubmit={handlePasswordSubmit} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4 max-w-md">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-400" />
              <span>Change Password</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-zinc-400 font-bold block mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPass}
                  onChange={e => setCurrentPass(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">New Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPass}
                  onChange={e => setNewPass(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPass}
                  onChange={e => setConfirmPass(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isChangingPass}
              className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs uppercase"
            >
              Update Password
            </button>
          </form>
        )}
      </div>

      {/* Address Edit/Add Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAddressSubmit} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 w-full max-w-lg space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-base">{editingAddress ? 'Edit Address' : 'Add New Address'}</h3>
              <button type="button" onClick={() => setIsAddressModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={addrForm.name}
                onChange={e => setAddrForm({ ...addrForm, name: e.target.value })}
                className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white"
              />
              <input
                type="text"
                placeholder="Phone"
                required
                value={addrForm.phone}
                onChange={e => setAddrForm({ ...addrForm, phone: e.target.value })}
                className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white"
              />
              <input
                type="text"
                placeholder="Street / Flat"
                required
                value={addrForm.street}
                onChange={e => setAddrForm({ ...addrForm, street: e.target.value })}
                className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white col-span-2"
              />
              <input
                type="text"
                placeholder="City"
                required
                value={addrForm.city}
                onChange={e => setAddrForm({ ...addrForm, city: e.target.value })}
                className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white"
              />
              <input
                type="text"
                placeholder="State"
                required
                value={addrForm.state}
                onChange={e => setAddrForm({ ...addrForm, state: e.target.value })}
                className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white"
              />
              <input
                type="text"
                placeholder="Pincode"
                required
                value={addrForm.pincode}
                onChange={e => setAddrForm({ ...addrForm, pincode: e.target.value })}
                className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setIsAddressModalOpen(false)} className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-bold text-zinc-300">
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-xs font-bold text-white">
                Save Address
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Order Details & Tracking Timeline Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 w-full max-w-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-base font-black text-white">Order Details & Live Tracking</h3>
                <p className="text-xs font-mono text-indigo-400">{selectedOrder.id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tracking Steps Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Fulfillment Timeline</h4>
              <div className="space-y-2">
                {(selectedOrder.trackingSteps || []).map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-3 text-xs">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      step.completed ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <p className={`font-bold ${step.completed ? 'text-white' : 'text-zinc-500'}`}>{step.title}</p>
                      <p className="text-[11px] text-zinc-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setSelectedOrder(null)} className="w-full py-2.5 rounded-xl bg-zinc-800 text-white text-xs font-bold">
              Close Order View
            </button>
          </div>
        </div>
      )}

      {/* Return Request Modal */}
      {returnItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleReturnSubmit} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 w-full max-w-md space-y-4">
            <h3 className="font-bold text-white text-base">Submit Return Request</h3>
            <p className="text-xs text-zinc-400">Item: <strong>{returnItem.item.product.title}</strong></p>

            <div>
              <label className="text-xs text-zinc-400 font-bold block mb-1">Reason for Return</label>
              <select
                value={returnReason}
                onChange={e => setReturnReason(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
              >
                <option value="Size fit issue">Size fit issue</option>
                <option value="Defective or damaged">Defective or damaged</option>
                <option value="Item not as described">Item not as described</option>
                <option value="Changed mind">Changed mind</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setReturnItem(null)} className="px-4 py-2 rounded-xl bg-zinc-800 text-xs text-zinc-300 font-bold">
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 rounded-xl bg-amber-600 text-xs text-white font-bold">
                Confirm Return
              </button>
            </div>
          </form>
        </div>
      )}
    </motion.div>
  );
};
