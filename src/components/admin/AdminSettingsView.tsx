import React, { useState } from 'react';
import { Settings, ShieldCheck, KeyRound, Lock, Eye, EyeOff, Save, CheckCircle2, UserCircle, Upload, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { validateAvatarFile, compressAndResizeAvatar } from '../../lib/avatarUtils';
import defaultAdminAvatar from '../../assets/images/regenerated_image_1786367497123.png';

export const AdminSettingsView: React.FC = () => {
  const { auditLogs, showToast, adminUser, updateAdminAvatar, updateAdminProfile } = useApp();

  const [portalName, setPortalName] = useState('StyleSmart Admin Portal');
  const [portalSubtitle, setPortalSubtitle] = useState('Restricted system — authorized personnel only');
  const [portalLogo, setPortalLogo] = useState(adminUser?.avatar || defaultAdminAvatar);
  const [faviconUrl, setFaviconUrl] = useState(defaultAdminAvatar);
  const [logoUploading, setLogoUploading] = useState(false);
  const [faviconUploading, setFaviconUploading] = useState(false);

  const [storeName, setStoreName] = useState('StyleSmart AI Fashion Store');
  const [supportEmail, setSupportEmail] = useState('support@stylesmart.ai');
  const [currency, setCurrency] = useState('INR (₹)');
  const [taxRate, setTaxRate] = useState(12);

  // Profile
  const [adminName, setAdminName] = useState(adminUser?.name || 'Ansar Khan');
  const [adminEmail, setAdminEmail] = useState(adminUser?.email || 'admin@stylesmart.ai');
  const [avatarUrl, setAvatarUrl] = useState(adminUser?.avatar || defaultAdminAvatar);
  const [avatarUploading, setAvatarUploading] = useState(false);

  // Security
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSaveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Store configuration saved successfully!', 'success');
  };

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Portal identity and branding saved successfully!', 'success');
  };

  const handleResetBranding = () => {
    setPortalName('StyleSmart Admin Portal');
    setPortalSubtitle('Restricted system — authorized personnel only');
    setPortalLogo(defaultAdminAvatar);
    setFaviconUrl(defaultAdminAvatar);
    showToast('Branding reset to default.');
  };

  const handleLogoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateAvatarFile(file);
    if (!validation.valid) {
      showToast(validation.error || 'Invalid image file.', 'warning');
      return;
    }

    try {
      setLogoUploading(true);
      const compressed = await compressAndResizeAvatar(file, 250, 0.9);
      setPortalLogo(compressed);
      setAvatarUrl(compressed);
      updateAdminAvatar(compressed);
      showToast('Portal logo updated successfully!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to process image.', 'warning');
    } finally {
      setLogoUploading(false);
    }
  };

  const handleFaviconFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setFaviconUploading(true);
      const compressed = await compressAndResizeAvatar(file, 64, 0.9);
      setFaviconUrl(compressed);
      showToast('Favicon updated successfully!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to process favicon.', 'warning');
    } finally {
      setFaviconUploading(false);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminName.trim()) {
      showToast('Admin name cannot be empty.', 'warning');
      return;
    }
    updateAdminProfile(adminName.trim(), adminEmail.trim());
    if (avatarUrl && avatarUrl !== adminUser?.avatar) {
      updateAdminAvatar(avatarUrl.trim());
    }
    showToast('Admin profile updated successfully!', 'success');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass || newPass.length < 6) {
      showToast('Password must be at least 6 characters.', 'warning');
      return;
    }
    showToast('Admin password updated successfully.', 'success');
    setOldPass('');
    setNewPass('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">System & Security Settings</h2>
        <p className="text-xs text-slate-400">Manage portal branding identity, admin profile, credentials, and security audit logs</p>
      </div>

      {/* Portal Identity Card (Matching user screenshot) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h3 className="text-sm font-bold text-slate-100">Portal Identity</h3>
        </div>

        <form onSubmit={handleSaveBranding} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Admin Portal Name</label>
              <input
                type="text"
                value={portalName}
                onChange={e => setPortalName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Portal Subtitle</label>
              <input
                type="text"
                value={portalSubtitle}
                onChange={e => setPortalSubtitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Admin Logo / Image */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">Admin Logo / Image</span>
                <span className="text-[10px] text-slate-500 font-mono">PNG, JPG, WEBP • 5MB max</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-slate-900 border border-indigo-500/40 overflow-hidden shrink-0 shadow">
                  <img
                    src={portalLogo}
                    alt="Portal Logo"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 mb-2">Recommended: square image, 200x200 or larger.</p>
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl text-xs transition-all shadow-md shadow-indigo-600/20">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{logoUploading ? 'Uploading...' : 'Upload Logo'}</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleLogoFileChange}
                      disabled={logoUploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Favicon */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">Favicon</span>
                <span className="text-[10px] text-slate-500 font-mono">PNG, JPG, WEBP • 5MB max</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-slate-900 border border-sky-500/40 overflow-hidden shrink-0 shadow flex items-center justify-center">
                  <img
                    src={faviconUrl}
                    alt="Favicon Preview"
                    className="w-10 h-10 object-contain rounded"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 mb-2">Displayed in browser tabs and bookmarks.</p>
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-xl text-xs transition-all shadow-md shadow-sky-600/20">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{faviconUploading ? 'Uploading...' : 'Upload Favicon'}</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleFaviconFileChange}
                      disabled={faviconUploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Branding</span>
            </button>
            <button
              type="button"
              onClick={handleResetBranding}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl border border-slate-700/80 transition-all"
            >
              Cancel / Reset
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Admin Profile & Avatar Management */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <UserCircle className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-100">Admin Profile & Rename Settings</h3>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-950 border-2 border-indigo-500/50 overflow-hidden shrink-0 shadow-md">
                <img
                  src={avatarUrl || adminUser?.avatar || defaultAdminAvatar}
                  alt="Admin Avatar Preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-1 flex-1">
                <p className="font-semibold text-slate-200">{adminUser?.name || 'Ansar Khan'}</p>
                <p className="text-[11px] text-slate-400 font-mono">{adminUser?.email}</p>
                <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/40 font-mono">
                  {adminUser?.role || 'SUPER_ADMIN'}
                </span>
              </div>
            </div>

            {/* Rename Inputs */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Admin Display Name</label>
                <input
                  type="text"
                  value={adminName}
                  onChange={e => setAdminName(e.target.value)}
                  placeholder="e.g. Ansar Khan"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Admin Email Address</label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={e => setAdminEmail(e.target.value)}
                  placeholder="admin@stylesmart.ai"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Local Image Upload */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <label className="block text-slate-300 font-semibold">Profile Picture (Local File / URL)</label>
              <div className="flex items-center gap-2">
                <label className="cursor-pointer px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all flex items-center gap-2 text-xs">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{avatarUploading ? 'Processing...' : 'Upload from Device'}</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        setAvatarUploading(true);
                        const compressed = await compressAndResizeAvatar(file, 200, 0.9);
                        setAvatarUrl(compressed);
                        updateAdminAvatar(compressed);
                        showToast('Profile picture uploaded successfully!', 'success');
                      } catch (err: any) {
                        showToast(err.message || 'Failed to process image.', 'warning');
                      } finally {
                        setAvatarUploading(false);
                      }
                    }}
                    disabled={avatarUploading}
                    className="hidden"
                  />
                </label>
                <span className="text-[10px] text-slate-400">JPG, PNG, WebP</span>
              </div>
              <input
                type="url"
                value={avatarUrl}
                onChange={e => setAvatarUrl(e.target.value)}
                placeholder="Or paste avatar image URL..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/20 transition-all">
              Save Profile & Rename Changes
            </button>
          </form>
        </div>

        {/* Store Parameters */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-100">Store Parameters</h3>
          </div>

          <form onSubmit={handleSaveStoreSettings} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 mb-1">Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={e => setStoreName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={e => setSupportEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 mb-1">Default Currency</label>
                <input
                  type="text"
                  value={currency}
                  readOnly
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">GST Tax Rate (%)</label>
                <input
                  type="number"
                  value={taxRate}
                  onChange={e => setTaxRate(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <button type="submit" className="w-full py-2 bg-slate-800 hover:bg-indigo-600/20 text-slate-200 hover:text-indigo-300 font-semibold text-xs rounded-xl border border-slate-700/60 transition-all">
              Save Store Config
            </button>
          </form>
        </div>

        {/* Security & Password */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-sky-400" />
            <h3 className="text-sm font-bold text-slate-100">Admin Security & Password</h3>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 mb-1">Current Password</label>
              <input
                type="password"
                value={oldPass}
                onChange={e => setOldPass(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={newPass}
                  onChange={e => setNewPass(e.target.value)}
                  placeholder="Enter strong new password"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-sky-600/20 transition-all">
              Update Admin Password
            </button>
          </form>
        </div>
      </div>

      {/* Security Audit Trail */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-slate-100">Live Security Audit Log</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-2">Admin Name</th>
                <th className="pb-2">Action Description</th>
                <th className="pb-2">Category</th>
                <th className="pb-2">Timestamp</th>
                <th className="pb-2">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-800/40">
                  <td className="py-2.5 font-semibold text-slate-200">{log.adminName}</td>
                  <td className="py-2.5 text-slate-300">{log.action}</td>
                  <td className="py-2.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/40 font-mono">
                      {log.category}
                    </span>
                  </td>
                  <td className="py-2.5 text-slate-400 font-mono">{log.timestamp}</td>
                  <td className="py-2.5 text-slate-500 font-mono">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
