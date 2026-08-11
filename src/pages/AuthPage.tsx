import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Lock,
  Smartphone,
  UserCheck,
  ArrowRight,
  Mail,
  User,
  Fingerprint,
  ChevronDown,
  KeyRound,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { authService, CountryCodes, CountryCode } from '../services/authService';
import { INITIAL_USER_PREFERENCES } from '../data/mockData';
import { UserProfile } from '../types';

export const AuthPage: React.FC = () => {
  const { isLoggedIn, setUser, setIsLoggedIn, setCurrentView, showToast } = useApp();

  // Mode state: 'login' | 'register' | 'forgot'
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(CountryCodes.list[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpTimer, setOtpTimer] = useState(30);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [mockSentOtp, setMockSentOtp] = useState<string | null>(null);

  // Statuses
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      setCurrentView('profile');
    }
  }, [isLoggedIn, setCurrentView]);

  // Countdown timer for OTP
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

  const clearStatus = () => {
    if (errorMessage) setErrorMessage(null);
    if (successMessage) setSuccessMessage(null);
  };

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
        showToast(`Welcome back, ${loggedUser.name}!`);
        setCurrentView('profile');
      } else {
        const loggedUser = await authService.loginWithEmail(email, password);
        setUser(loggedUser);
        setIsLoggedIn(true);
        showToast(`Welcome back, ${loggedUser.name}!`);
        setCurrentView('profile');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    clearStatus();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
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
      showToast(`Account created successfully! Welcome, ${registeredUser.name}.`);
      setCurrentView('profile');
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

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
      showToast(`Signed in with ${provider}!`);
      setCurrentView('profile');
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-[85vh] flex flex-col justify-center items-center py-8 sm:py-12 px-4 relative max-w-5xl mx-auto"
    >
      {/* Background Cyber Mesh Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-slate-950 to-indigo-950/40 pointer-events-none rounded-3xl overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Top Navigation Back Action */}
      <div className="w-full flex items-center justify-between mb-6 relative z-10">
        <button
          onClick={() => setCurrentView('home')}
          className="px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-300 hover:text-white transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Storefront</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Secure Authentication Hub</span>
        </div>
      </div>

      {/* Dedicated Login Card Layout */}
      <div className="w-full max-w-xl bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/60 relative z-10 backdrop-blur-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {mode === 'login' && 'Sign In to StyleSmart'}
            {mode === 'register' && 'Create Your Account'}
            {mode === 'forgot' && 'Reset Account Password'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            {mode === 'login' && 'Access AI Wardrobe curation, 3D Virtual Try-On, and synced lookbooks'}
            {mode === 'register' && 'Join StyleSmart for instant AI wardrobe curation & exclusive drops'}
            {mode === 'forgot' && 'Verification OTP will be sent to recover your credentials'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        {mode !== 'forgot' && (
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-slate-950/80 border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                clearStatus();
              }}
              className={`py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
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
              className={`py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
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

        {/* Status Alerts */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold">Authentication Error</span>
              <p className="text-[11px] text-rose-300">{errorMessage}</p>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold">Success</span>
              <p className="text-[11px] text-emerald-300">{successMessage}</p>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: mode === 'login' ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === 'login' ? 10 : -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* SIGN IN FORM */}
            {mode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
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

                {loginMethod === 'phone' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Mobile Phone Number</label>
                      <div className="flex gap-2">
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
                                {c.flag} {c.code}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                            placeholder={`Enter ${selectedCountry.digits}-digit number`}
                            className="w-full pl-9 pr-4 h-11 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                          />
                          <Smartphone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                    </div>

                    {otpSent && (
                      <div className="space-y-2 p-3.5 rounded-2xl bg-indigo-950/50 border border-indigo-500/30">
                        <div className="flex items-center justify-between text-xs">
                          <label className="font-bold text-indigo-300 flex items-center gap-1.5">
                            <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Enter 6-Digit OTP</span>
                          </label>
                          {mockSentOtp && (
                            <button
                              type="button"
                              onClick={() => setOtpCode(mockSentOtp)}
                              className="text-xs font-bold text-indigo-400 hover:underline"
                            >
                              Auto-fill ({mockSentOtp})
                            </button>
                          )}
                        </div>

                        <input
                          type="text"
                          maxLength={6}
                          required
                          value={otpCode}
                          onChange={e => setOtpCode(e.target.value.replace(/\D/g, ''))}
                          placeholder="••••••"
                          className="w-full tracking-widest text-center text-lg font-mono font-black h-11 rounded-xl bg-slate-950 border border-indigo-500/50 text-indigo-200 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                )}

                {loginMethod === 'email' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Email Address</label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
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
                          onClick={() => setMode('forgot')}
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
                          onChange={e => setPassword(e.target.value)}
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

            {/* REGISTER FORM */}
            {mode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. Alex Rivera"
                      className="w-full pl-9 pr-4 h-11 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full pl-9 pr-4 h-11 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

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
                        className="appearance-none h-11 pl-2.5 pr-6 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-indigo-500"
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
                        onChange={e => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="Mobile number"
                        className="w-full pl-9 pr-4 h-11 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                      />
                      <Smartphone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Min 8 chars"
                        className="w-full pl-9 pr-9 h-10 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                      />
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Repeat password"
                        className="w-full pl-9 pr-9 h-10 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                      />
                      <ShieldCheck className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                {otpSent && (
                  <div className="space-y-2 p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/30">
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-bold text-indigo-300">Enter SMS Code</label>
                      {mockSentOtp && (
                        <button
                          type="button"
                          onClick={() => setOtpCode(mockSentOtp)}
                          className="text-[11px] text-indigo-400 hover:underline"
                        >
                          Auto-fill ({mockSentOtp})
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 mt-3"
                >
                  {loading ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span>{otpSent ? 'Complete Registration' : 'Send OTP & Register'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* FORGOT PASSWORD FORM */}
            {mode === 'forgot' && (
              <form onSubmit={e => e.preventDefault()} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Registered Email or Mobile</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={email || phoneNumber}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter registered email or mobile"
                      className="w-full pl-9 pr-4 h-11 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-indigo-500"
                    />
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    showToast('Reset link sent to your registered contact.');
                    setMode('login');
                  }}
                  className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Send Reset Link</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="w-full text-center text-xs text-indigo-400 font-semibold hover:underline block"
                >
                  ← Back to Sign In
                </button>
              </form>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Social Authentication */}
        {mode !== 'forgot' && (
          <div className="space-y-3 pt-4 border-t border-slate-800/80">
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
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.4 0 15.3s.7 5.6 1.9 8l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
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
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl w-full mt-8 relative z-10">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1 text-center">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 w-max mx-auto">
            <Smartphone className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white">Instant SMS OTP</h3>
          <p className="text-[11px] text-slate-400">One-tap verification across international codes</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1 text-center">
          <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 w-max mx-auto">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white">2FA Security</h3>
          <p className="text-[11px] text-slate-400">Tokenized JWT protecting your sizing & history</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1 text-center">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 w-max mx-auto">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white">Synced Lookbooks</h3>
          <p className="text-[11px] text-slate-400">Sync cart and outfit creations across all devices</p>
        </div>
      </div>
    </motion.div>
  );
};
