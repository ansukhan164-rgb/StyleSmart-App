import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw,
  KeyRound,
  Check,
  ChevronDown,
  Globe,
  Fingerprint
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { authService, CountryCodes, CountryCode } from '../../services/authService';
import { UserProfile } from '../../types';
import { INITIAL_USER_PREFERENCES } from '../../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register' | 'forgot';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login'
}) => {
  const { setUser, setIsLoggedIn, showToast, setCurrentView, currentView } = useApp();

  // Primary Mode State
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(CountryCodes.list[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP Verification State
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpTimer, setOtpTimer] = useState(30);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [mockSentOtp, setMockSentOtp] = useState<string | null>(null);

  // Password Reset State
  const [resetStep, setResetStep] = useState<'request' | 'verify'>('request');

  // UI Status
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sync mode when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMessage(null);
      setSuccessMessage(null);
      setOtpSent(false);
      setOtpCode('');
    }
  }, [isOpen, initialMode]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval: any = null;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setCanResendOtp(true);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [otpSent, otpTimer]);

  if (!isOpen) return null;

  // Clear messages on input edit
  const clearStatus = () => {
    if (errorMessage) setErrorMessage(null);
    if (successMessage) setSuccessMessage(null);
  };

  // Password Strength Calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-slate-800' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 25, label: 'Weak', color: 'bg-rose-500' };
    if (score === 2 || score === 3) return { score: 65, label: 'Medium', color: 'bg-amber-500' };
    return { score: 100, label: 'Strong & Secure', color: 'bg-emerald-500' };
  };

  const passStrength = getPasswordStrength(password);

  // Handle Request OTP
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    clearStatus();
    setLoading(true);

    try {
      const res = await authService.sendPhoneOTP(selectedCountry.code, phoneNumber);
      setOtpSent(true);
      setOtpTimer(30);
      setCanResendOtp(false);
      if (res.mockOTP) setMockSentOtp(res.mockOTP);
      setSuccessMessage(res.message);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to send OTP code');
    } finally {
      setLoading(false);
    }
  };

  // Handle Login Submit
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearStatus();
    setLoading(true);

    try {
      if (loginMethod === 'phone') {
        if (!otpSent) {
          await handleSendOtp();
          return;
        }
        const loggedUser = await authService.verifyPhoneOTP(selectedCountry.code, phoneNumber, otpCode);
        setUser(loggedUser);
        setIsLoggedIn(true);
        showToast(`Welcome back, ${loggedUser.name}! Logged in successfully.`);
        if (currentView === 'auth') setCurrentView('profile');
        onClose();
      } else {
        const loggedUser = await authService.loginWithEmail(email, password);
        setUser(loggedUser);
        setIsLoggedIn(true);
        showToast(`Welcome back, ${loggedUser.name}!`);
        if (currentView === 'auth') setCurrentView('profile');
        onClose();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Registration Submit
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    clearStatus();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match! Please verify both password fields.');
      return;
    }

    if (!otpSent) {
      await handleSendOtp();
      return;
    }

    setLoading(true);

    try {
      const registeredUser = await authService.registerUser({
        fullName,
        email,
        countryCode: selectedCountry.code,
        phone: phoneNumber,
        pass: password,
        otp: otpCode
      });

      setUser(registeredUser);
      setIsLoggedIn(true);
      showToast(`Account created successfully! Welcome to StyleSmart, ${registeredUser.name}.`);
      if (currentView === 'auth') setCurrentView('profile');
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Forgot Password Submit
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearStatus();
    setLoading(true);

    try {
      if (resetStep === 'request') {
        const msg = await authService.requestPasswordReset(email || phoneNumber);
        setResetStep('verify');
        setOtpSent(true);
        setOtpTimer(30);
        setSuccessMessage(msg);
      } else {
        if (password !== confirmPassword) {
          setErrorMessage('New passwords do not match!');
          return;
        }
        await authService.resetPassword(email || phoneNumber, otpCode, password);
        showToast('Password updated successfully! Please sign in with your new password.');
        setMode('login');
        setResetStep('request');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle Social Authentication
  const handleSocialAuth = async (provider: 'Google' | 'Apple') => {
    clearStatus();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const socialUser: UserProfile = {
        id: `usr-${provider.toLowerCase()}-${Date.now()}`,
        name: `${provider} Fashion User`,
        email: `user.${provider.toLowerCase()}@stylesmart.ai`,
        phone: '+91 9876543210',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
        role: 'customer',
        preferences: {
          ...INITIAL_USER_PREFERENCES,
          sizePreferences: { tops: 'M', bottoms: '30', shoes: 'UK 8' }
        },
        styleScore: 88,
        styleArchetype: 'Modern Minimalist',
        savedAddresses: [
          {
            id: `addr-${Date.now()}`,
            name: `${provider} Fashion User`,
            phone: '+91 9876543210',
            street: '100 Innovation Way',
            city: 'Bengaluru',
            state: 'Karnataka',
            pincode: '560002',
            type: 'Home',
            isDefault: true
          }
        ],
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUser(socialUser);
      setIsLoggedIn(true);
      showToast(`Successfully authenticated with ${provider}!`);
      if (currentView === 'auth') setCurrentView('profile');
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Futuristic Glow Orb Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="w-full max-w-lg bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-indigo-950/50 relative overflow-hidden my-auto backdrop-blur-2xl">
        {/* Futuristic Top Bar Accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all border border-transparent hover:border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Header & Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow" />
            <span>AI StyleSmart Auth Protocol</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {mode === 'login' && 'Sign In to Your Account'}
            {mode === 'register' && 'Create Your StyleSmart Account'}
            {mode === 'forgot' && 'Reset Account Password'}
          </h2>

          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {mode === 'login' && 'Access personalized AI recommendations, 3D try-on, and saved lookbooks'}
            {mode === 'register' && 'Join StyleSmart for instant AI wardrobe curation & custom deals'}
            {mode === 'forgot' && 'Verification OTP will be sent to recover your credentials'}
          </p>
        </div>

        {/* Main Switcher: Sign In vs Register */}
        {mode !== 'forgot' && (
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-slate-950/80 border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                clearStatus();
              }}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Fingerprint className="w-4 h-4" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMode('register');
                clearStatus();
              }}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                mode === 'register'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Register</span>
            </button>
          </div>
        )}

        {/* Error / Success Status Alerts */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold">Authentication Error</span>
              <p className="text-[11px] text-rose-300 leading-snug">{errorMessage}</p>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold">Success</span>
              <p className="text-[11px] text-emerald-300 leading-snug">{successMessage}</p>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* MODE 1: SIGN IN FORM                      */}
        {/* ========================================== */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Login Method Toggle: Phone OTP vs Email */}
            <div className="flex justify-center border-b border-slate-800 pb-3 gap-6">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod('phone');
                  clearStatus();
                }}
                className={`text-xs font-bold transition-all flex items-center gap-1.5 pb-1 relative ${
                  loginMethod === 'phone' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Phone + OTP</span>
                {loginMethod === 'phone' && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-500 rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setLoginMethod('email');
                  clearStatus();
                }}
                className={`text-xs font-bold transition-all flex items-center gap-1.5 pb-1 relative ${
                  loginMethod === 'email' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email & Password</span>
                {loginMethod === 'email' && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-500 rounded-full" />
                )}
              </button>
            </div>

            {/* Method A: Phone Number + OTP */}
            {loginMethod === 'phone' && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                    <span>Mobile Phone Number</span>
                    <span className="text-[10px] text-slate-500">Country Code Required</span>
                  </label>
                  <div className="flex gap-2">
                    {/* Country Code Selector */}
                    <div className="relative shrink-0">
                      <select
                        value={selectedCountry.code}
                        onChange={e => {
                          const found = CountryCodes.list.find(c => c.code === e.target.value);
                          if (found) setSelectedCountry(found);
                        }}
                        className="appearance-none h-11 pl-3 pr-7 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-indigo-500"
                      >
                        {CountryCodes.list.map(c => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code} ({c.country})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Phone Input */}
                    <div className="relative flex-1">
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={e => {
                          setPhoneNumber(e.target.value.replace(/\D/g, ''));
                          clearStatus();
                        }}
                        placeholder={`Enter ${selectedCountry.digits}-digit number`}
                        className="w-full pl-9 pr-4 h-11 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                      />
                      <Smartphone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                {/* OTP Input Field when code sent */}
                {otpSent && (
                  <div className="space-y-2 p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 animate-fadeIn">
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-bold text-indigo-300 flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Enter 6-Digit OTP Code</span>
                      </label>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {otpTimer > 0 ? `Resend in ${otpTimer}s` : 'Code expired'}
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        maxLength={6}
                        required
                        value={otpCode}
                        onChange={e => {
                          setOtpCode(e.target.value.replace(/\D/g, ''));
                          clearStatus();
                        }}
                        placeholder="••••••"
                        className="w-full tracking-widest text-center text-lg font-mono font-black h-11 rounded-xl bg-slate-950 border border-indigo-500/50 text-indigo-200 focus:outline-none focus:border-indigo-400"
                      />
                    </div>

                    {/* Fast Test Auto-fill Button */}
                    {mockSentOtp && (
                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="text-slate-400 font-mono">SMS Code: <strong className="text-emerald-400">{mockSentOtp}</strong></span>
                        <button
                          type="button"
                          onClick={() => setOtpCode(mockSentOtp)}
                          className="text-xs font-bold text-indigo-400 hover:underline"
                        >
                          Auto-fill OTP
                        </button>
                      </div>
                    )}

                    {canResendOtp && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 mt-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Resend OTP Code</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Method B: Email + Password */}
            {loginMethod === 'email' && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                        clearStatus();
                      }}
                      placeholder="alex@example.com"
                      className="w-full pl-9 pr-4 h-11 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300">Password</label>
                    <button
                      type="button"
                      onClick={() => {
                        setMode('forgot');
                        clearStatus();
                      }}
                      className="text-[11px] font-semibold text-indigo-400 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value);
                        clearStatus();
                      }}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 h-11 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Verifying...</span>
                </div>
              ) : (
                <>
                  <span>
                    {loginMethod === 'phone'
                      ? otpSent
                        ? 'Verify OTP & Sign In'
                        : 'Send Login OTP'
                      : 'Sign In to Account'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* ========================================== */}
        {/* MODE 2: REGISTER / CREATE ACCOUNT FORM    */}
        {/* ========================================== */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => {
                    setFullName(e.target.value);
                    clearStatus();
                  }}
                  placeholder="e.g. Alex Rivera"
                  className="w-full pl-9 pr-4 h-10 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    clearStatus();
                  }}
                  placeholder="alex@example.com"
                  className="w-full pl-9 pr-4 h-10 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Phone Number + Country Code */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Phone Number (For OTP Verification)</label>
              <div className="flex gap-2">
                <div className="relative shrink-0">
                  <select
                    value={selectedCountry.code}
                    onChange={e => {
                      const found = CountryCodes.list.find(c => c.code === e.target.value);
                      if (found) setSelectedCountry(found);
                    }}
                    className="appearance-none h-10 pl-2.5 pr-6 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-indigo-500"
                  >
                    {CountryCodes.list.map(c => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-500 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="relative flex-1">
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={e => {
                      setPhoneNumber(e.target.value.replace(/\D/g, ''));
                      clearStatus();
                    }}
                    placeholder={`Mobile number`}
                    className="w-full pl-9 pr-4 h-10 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                  <Smartphone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Password & Confirm Password Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                      clearStatus();
                    }}
                    placeholder="Min 8 chars"
                    className="w-full pl-9 pr-9 h-10 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={e => {
                      setConfirmPassword(e.target.value);
                      clearStatus();
                    }}
                    placeholder="Repeat password"
                    className="w-full pl-9 pr-9 h-10 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                  <ShieldCheck className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Password Strength:</span>
                  <span className="font-bold text-slate-200">{passStrength.label}</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${passStrength.color} transition-all duration-300`}
                    style={{ width: `${passStrength.score}%` }}
                  />
                </div>
              </div>
            )}

            {/* Registration OTP Step */}
            {otpSent && (
              <div className="space-y-2 p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 animate-fadeIn">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-indigo-300">Enter SMS Verification Code</label>
                  {mockSentOtp && (
                    <button
                      type="button"
                      onClick={() => setOtpCode(mockSentOtp)}
                      className="text-[11px] text-indigo-400 hover:underline"
                    >
                      Fill OTP ({mockSentOtp})
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpCode}
                  onChange={e => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full tracking-widest text-center text-base font-mono font-bold h-10 rounded-xl bg-slate-950 border border-indigo-500/50 text-indigo-200 focus:outline-none"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 mt-3"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  <span>{otpSent ? 'Complete Registration' : 'Send OTP & Register'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* ========================================== */}
        {/* MODE 3: FORGOT PASSWORD FORM               */}
        {/* ========================================== */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                {resetStep === 'request' ? 'Registered Email or Mobile Number' : 'Enter Reset Verification OTP'}
              </label>

              {resetStep === 'request' ? (
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={email || phoneNumber}
                    onChange={e => {
                      if (e.target.value.includes('@')) setEmail(e.target.value);
                      else setPhoneNumber(e.target.value);
                      clearStatus();
                    }}
                    placeholder="Enter email or mobile number"
                    className="w-full pl-9 pr-4 h-11 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-indigo-500"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={otpCode}
                    onChange={e => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit OTP code"
                    className="w-full tracking-widest text-center text-base font-mono font-bold h-11 rounded-xl bg-slate-950 border border-indigo-500/50 text-indigo-200 focus:outline-none"
                  />

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Min 8 characters"
                        className="w-full pl-9 pr-9 h-10 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none"
                      />
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Repeat new password"
                        className="w-full pl-9 pr-9 h-10 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none"
                      />
                      <ShieldCheck className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <span>{resetStep === 'request' ? 'Send Reset OTP' : 'Update Password'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setMode('login');
                clearStatus();
              }}
              className="w-full text-center text-xs text-indigo-400 font-semibold hover:underline block pt-2"
            >
              ← Back to Sign In
            </button>
          </form>
        )}

        {/* Social Login Options */}
        {mode !== 'forgot' && (
          <div className="space-y-3 pt-2 border-t border-slate-800/80">
            <div className="relative flex items-center justify-center">
              <span className="bg-slate-900 px-3 text-[11px] font-medium text-slate-500">
                Or fast authenticate with
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialAuth('Google')}
                className="py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-2 hover:bg-slate-900"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.4 0 15.3s.7 5.6 1.9 8l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                  />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialAuth('Apple')}
                className="py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-2 hover:bg-slate-900"
              >
                <span className="font-serif text-sm font-bold"></span>
                <span>Apple ID</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Switch Footer */}
        <div className="text-center pt-2">
          {mode === 'login' && (
            <p className="text-xs text-slate-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  clearStatus();
                }}
                className="font-bold text-indigo-400 hover:text-indigo-300 hover:underline"
              >
                Register Now
              </button>
            </p>
          )}

          {mode === 'register' && (
            <p className="text-xs text-slate-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  clearStatus();
                }}
                className="font-bold text-indigo-400 hover:text-indigo-300 hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
