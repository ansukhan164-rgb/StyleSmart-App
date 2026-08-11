import React, { useState } from 'react';
import { Palette, Upload, Check, RotateCcw, Image as ImageIcon, Globe, Shield, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { validateAvatarFile, compressAndResizeAvatar } from '../../lib/avatarUtils';

export const AdminBrandingView: React.FC = () => {
  const { adminBranding, updateAdminBranding, showToast } = useApp();

  const [portalName, setPortalName] = useState(adminBranding.portalName);
  const [portalSubtitle, setPortalSubtitle] = useState(adminBranding.portalSubtitle);
  const [portalLogo, setPortalLogo] = useState(adminBranding.portalLogo);
  const [faviconUrl, setFaviconUrl] = useState(adminBranding.faviconUrl);

  const [isSaving, setIsSaving] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [faviconUploading, setFaviconUploading] = useState(false);

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
      const compressed = await compressAndResizeAvatar(file, 300, 0.9);
      setPortalLogo(compressed);
      showToast('Logo image uploaded and compressed successfully!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to process logo image.', 'warning');
    } finally {
      setLogoUploading(false);
    }
  };

  const handleFaviconFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateAvatarFile(file);
    if (!validation.valid) {
      showToast(validation.error || 'Invalid favicon file.', 'warning');
      return;
    }

    try {
      setFaviconUploading(true);
      const compressed = await compressAndResizeAvatar(file, 128, 0.9);
      setFaviconUrl(compressed);
      showToast('Favicon uploaded successfully!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to process favicon.', 'warning');
    } finally {
      setFaviconUploading(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portalName.trim()) {
      showToast('Portal name cannot be empty.', 'warning');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      updateAdminBranding({
        portalName: portalName.trim(),
        portalSubtitle: portalSubtitle.trim(),
        portalLogo: portalLogo.trim(),
        faviconUrl: faviconUrl.trim()
      });
      setIsSaving(false);
    }, 500);
  };

  const handleCancel = () => {
    setPortalName(adminBranding.portalName);
    setPortalSubtitle(adminBranding.portalSubtitle);
    setPortalLogo(adminBranding.portalLogo);
    setFaviconUrl(adminBranding.faviconUrl);
    showToast('Unsaved changes reverted.', 'info');
  };

  const handleResetDefault = () => {
    const defaultBranding = {
      portalName: 'Ansar Khan',
      portalSubtitle: 'ADMIN CONSOLE',
      portalLogo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      faviconUrl: ''
    };
    setPortalName(defaultBranding.portalName);
    setPortalSubtitle(defaultBranding.portalSubtitle);
    setPortalLogo(defaultBranding.portalLogo);
    setFaviconUrl(defaultBranding.faviconUrl);
    updateAdminBranding(defaultBranding);
  };

  const presetLogos = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Palette className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100 tracking-tight">Portal Branding & Identity</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Customize the administrator portal name, brand logo, subtitle, and browser favicon. Changes apply instantly and persist securely.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetDefault}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition-all self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Branding Configuration Form */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <form onSubmit={handleSave} className="space-y-5 text-xs">
            {/* Portal Name */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Admin Portal Name</label>
              <input
                type="text"
                value={portalName}
                onChange={e => setPortalName(e.target.value)}
                placeholder="e.g. StyleSmart Enterprise"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                required
              />
              <p className="text-[11px] text-slate-500 mt-1">Ansar Khan Admin Portal branding configuration.</p>
            </div>

            {/* Portal Subtitle */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Portal Subtitle / Badge</label>
              <input
                type="text"
                value={portalSubtitle}
                onChange={e => setPortalSubtitle(e.target.value)}
                placeholder="e.g. ADMIN CONSOLE"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              <p className="text-[11px] text-slate-500 mt-1">Subtitle text appearing under the portal name in navigation.</p>
            </div>

            {/* Portal Logo / Image Upload */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <label className="block text-slate-300 font-semibold">Admin Portal Logo / Brand Image</label>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-slate-950 border-2 border-indigo-500/40 overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
                  {portalLogo ? (
                    <img src={portalLogo} alt="Portal Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-slate-600" />
                  )}
                </div>

                <div className="space-y-2 flex-1 w-full">
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-md transition-all flex items-center gap-2 text-xs">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{logoUploading ? 'Processing...' : 'Upload Logo File'}</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleLogoFileChange}
                        disabled={logoUploading}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[11px] text-slate-400">JPG, PNG, WebP up to 5MB</span>
                  </div>

                  <input
                    type="url"
                    value={portalLogo}
                    onChange={e => setPortalLogo(e.target.value)}
                    placeholder="Or paste image URL (https://...)"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Preset Logos */}
              <div>
                <p className="text-[11px] text-slate-400 mb-1.5">Or choose from curated brand presets:</p>
                <div className="flex items-center gap-2">
                  {presetLogos.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPortalLogo(url)}
                      className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all ${
                        portalLogo === url ? 'border-indigo-500 ring-2 ring-indigo-500/30 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Favicon URL / Upload */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <label className="block text-slate-300 font-semibold">Browser Favicon</label>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center shrink-0">
                  {faviconUrl ? (
                    <img src={faviconUrl} alt="Favicon" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <Globe className="w-5 h-5 text-indigo-400" />
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-all flex items-center gap-1.5 text-xs">
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
                  <input
                    type="url"
                    value={faviconUrl}
                    onChange={e => setFaviconUrl(e.target.value)}
                    placeholder="Or paste favicon image URL..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                <span>{isSaving ? 'Saving Changes...' : 'Save Branding Changes'}</span>
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Instant Live Preview</span>
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
              LIVE
            </span>
          </div>
          <p className="text-xs text-slate-400">This is how your administrator portal header and sidebar branding will appear in real time.</p>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-4 shadow-inner">
            {/* Simulated Sidebar Header Preview */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-400 p-0.5 shrink-0 flex items-center justify-center shadow-md">
                <img src={portalLogo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'} alt="Logo Preview" className="w-full h-full rounded-[10px] object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="leading-tight overflow-hidden">
                <span className="font-bold text-sm tracking-tight text-white block truncate">
                  {portalName || 'StyleSmart'}
                </span>
                <span className="text-[10px] text-indigo-400 font-mono block mt-0.5 truncate">
                  {portalSubtitle || 'ADMIN CONSOLE'}
                </span>
              </div>
            </div>

            {/* Simulated Browser Tab Preview */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-slate-400">Browser Window Title & Tab</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-950 rounded-lg border border-slate-800/60">
                {faviconUrl ? (
                  <img src={faviconUrl} alt="Favicon" className="w-4 h-4 rounded object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <Shield className="w-4 h-4 text-indigo-400" />
                )}
                <span className="text-xs font-medium text-slate-200 truncate">{portalName} Admin Portal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
